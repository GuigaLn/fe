import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { APP_PATHS } from "../../shared/constants/app-paths";

export default async function DashboardPage() {
  const session = await getServerSession();

  if(!session) {
    redirect(APP_PATHS.public.sign_in);
  }
  return (
    <div>
      Bem vindo, {session?.user?.name}
    </div>
  );
}
