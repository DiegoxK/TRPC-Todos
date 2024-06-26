import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/navigation/sidebar";
import Header from "@/components/navigation/header";

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session) {
    const hasUserName = session.user.name;

    if (!hasUserName) {
      redirect("/setup");
    }

    return (
      <div className="flex">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header session={session} />
          <main className="max-w-[calc(100vw-20rem-3px)] grow  bg-accent px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    );
  }

  redirect("/");
}
