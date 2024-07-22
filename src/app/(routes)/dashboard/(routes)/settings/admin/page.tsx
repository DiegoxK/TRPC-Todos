import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { notFound, redirect } from "next/navigation";

export default async function AdminSettings() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  if (session.user.userRole !== env.ADMIN_ROLE) {
    return notFound();
  }

  return <div>AdminSettings</div>;
}
