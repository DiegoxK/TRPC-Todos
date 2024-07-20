import { Separator } from "@/components/ui/separator";
import ProfileForm from "./_components/profile-form";

export default function SettingPage() {
  return (
    <>
      <h1 className="text-xl font-medium ">Settings</h1>
      <p className="text-sm">Profile configuration</p>
      <Separator className="mb-6 mt-5 bg-zinc-700" />
      <ProfileForm />
    </>
  );
}
