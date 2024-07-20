import { Separator } from "@/components/ui/separator";
import ProfileForm from "./_components/profile-form";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SettingPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  return (
    <>
      <h1 className="text-xl font-medium ">Settings</h1>
      <p className="text-sm">Profile configuration</p>
      <Separator className="mb-6 mt-5 bg-zinc-700" />
      <ProfileForm user={session.user} />
    </>
  );
}
