import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOut from "../../_components/sign-out";
import { api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    const hasUserName = await api.user.hasUserName({
      email: session.user.email,
    });

    if (!hasUserName) {
      redirect("/setup");
    } else if (hasUserName) {
      redirect("/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
        Todo App
      </h1>
      <p className="text-center text-lg">The best todo app in the world!</p>
      {session ? session.user.email : null}
      {session ? <SignOut /> : null}
      {session ? null : (
        <p>
          To get started,{" "}
          <Link
            className="text-primary hover:text-secondary"
            href="/auth/signin"
          >
            please sign in
          </Link>
          .
        </p>
      )}
    </main>
  );
}
