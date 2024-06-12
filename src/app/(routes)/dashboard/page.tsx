import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (session) {
    const hasUserName = session.user.name;

    if (!hasUserName) {
      redirect("/setup");
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user.name}</p>
      {session?.user.image && (
        <Image
          src={session.user.image}
          alt="profile picture"
          width={200}
          height={200}
        />
      )}
    </div>
  );
}
