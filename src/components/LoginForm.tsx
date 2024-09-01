'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string()
    .min(6, 'Senha deve conter no minímo 06 digítos'),
});

export default function LoginForm() {
  const router = useRouter();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if(response?.ok) {
      router.push('/dashboard')
      return;
    }

    return toast.error('Credenciais inválidas!');
  });

  const navigateToSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <div className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Realize seu login</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
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
              <Button type="submit">Login</Button>
              <Button type="button" variant="ghost" onClick={navigateToSignUp}>Cadastrar-se</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  )
}
