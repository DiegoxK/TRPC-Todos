import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { env } from "@/env";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCog } from "lucide-react";

export default async function SettingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium ">Settings</h1>
          <p className="text-sm">Profile configuration</p>
        </div>
        {session.user.userRole === env.ADMIN_ROLE && (
          <Link href="/dashboard/settings/admin">
            <Button className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        )}
      </div>
      <Separator className="mb-6 mt-5 bg-zinc-700" />
      {children}
    </>
  );
}
