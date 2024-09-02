import { NavMenu } from "@/components/NavMenu";
import { getServerSession } from "next-auth";
import { APP_PATHS } from "../shared/constants/app-paths";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if(!session) {
    redirect(APP_PATHS.public.sign_in);
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
        <NavMenu />
      </div>
      <div className="flex-1 p-3 overflow-auto">
        {children}
      </div>
    </div>
  );
}
