import LoginForm from "@/components/LoginForm";

export default async function SignInPage() {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-muted hidden md:flex items-end justify-end p-4">
        <h1 className="font-bold">Influencer App</h1>
      </div>
      <div className="flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}
