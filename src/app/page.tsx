import { getServerAuthSession } from "@/server/auth";
import SignOut from "./_components/sign-out";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        {session ? (
          `Hello, ${session.user.email}!`
        ) : (
          <Link href="/api/auth/signin">Please sign in.</Link>
        )}
      </p>
      <SignOut />
    </div>
  );
}
