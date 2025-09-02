import { getServerAuthSession } from "@/server/auth";
import ProfileForm from "./_components/profile-form";
import { redirect } from "next/navigation";

export default async function UserSettings() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  return <ProfileForm user={session.user} />;
}
