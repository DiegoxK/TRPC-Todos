import { getServerAuthSession } from "@/server/auth";
import SignOut from "./_components/sign-out";
import Link from "next/link";
import { Verification } from "@/components/email/verification";
import { render } from "@react-email/render";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    // <div>
    //   <h1>Welcome!</h1>
    //   <p>
    //     {session ? (
    //       `Hello, ${session.user.email}!`
    //     ) : (
    //       <Link href="/api/auth/signin">Please sign in.</Link>
    //     )}
    //   </p>
    //   <SignOut />
    // </div>
    <Verification
      url="http//localhost:3000"
      picture="https://i.postimg.cc/jSKs6czT/e72044ab-00d1-4025-bc38-f59d9f8f0720.webp"
    />
  );
}
