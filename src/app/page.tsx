import { getServerAuthSession } from "@/server/auth";
import { signOut } from "next-auth/react";
import SignOut from "./_components/sign-out";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div>
      <h1>Welcome!</h1>
      <p>{session ? `Hello, ${session.user.name}!` : "Please sign in."}</p>
      <SignOut />
    </div>
  );
}
