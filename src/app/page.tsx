import { getServerAuthSession } from "@/server/auth";
import SignOut from "./_components/sign-out";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
        Todo App
      </h1>
      <p className="text-center text-lg">The best todo app in the world!</p>
      {session ? <SignOut /> : null}
      <p>
        To get started,{" "}
        <Link className="text-primary hover:text-secondary" href="/auth/signin">
          please sign in
        </Link>
        .
      </p>
    </main>
  );
}
