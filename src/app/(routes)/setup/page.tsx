import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import SetupForm from "./_components/setup-form";

export default async function SetupAccount() {
  const session = await getServerAuthSession();
  // TODO: Implement setup account page

  if (!session) {
    // If the user is not authenticated, redirect them to the sign in page
    return redirect("/auth/signin");
  }

  // This page should allow the user to setup their username and profile picture if they don't have one
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <SetupForm email={session.user.email} />
    </main>
  );
}
