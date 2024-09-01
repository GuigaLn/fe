'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { authService } from '@/app/services/authService';

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const schema = z.object({
  name: z.string()
    .min(6, 'Nome deve conter no minímo 06 digítos'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string()
    .min(6, 'Senha deve conter no minímo 06 digítos'),
});
type FormData = z.infer<typeof schema>;

export default function SignUpForm() {
  const router = useRouter();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: FormData) => {
      return authService.signup(data)
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { success } = await mutateAsync(data);

      if(success) {
        toast.success('Cadastrado com sucesso!')
        navigateToSignIn()
        return;
      }
    } catch (error: any) {
      if(error?.response.data?.errors.length > 0) {
        toast.error(`${error?.response.data?.errors.join(',')}`);
        return;
      }

      toast.error('Ocorreu um erro ao realizar o cadastro!')
    }
  });

  const navigateToSignIn = () => {
    router.push('/auth/sign-in')
  }

  return (
    <div className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Cadastrar-se</CardTitle>
        <CardDescription>Realize seu cadastro</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type='text'
                placeholder="Nome"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type='email'
                placeholder="E-mail"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type='password'
                placeholder="Senha"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <div className="flex flex-col space-y-5">
              <Button type="submit">Cadastrar</Button>
              <Button type="button" variant="ghost" onClick={navigateToSignIn}>Login</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  )
}
