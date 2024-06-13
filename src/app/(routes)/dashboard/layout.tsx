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
      <main className="flex">
        <Sidebar />
        <section className="w-full">
          <Header session={session} />
          {children}
        </section>
      </main>
    );
  }

  redirect("/");
}
