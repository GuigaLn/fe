import { NavMenu } from "@/components/NavMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
