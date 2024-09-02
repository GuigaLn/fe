import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div>
      Bem vindo, {session?.user?.name}
    </div>
  );
}
