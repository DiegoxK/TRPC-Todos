import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { InputOTPForm } from "./_components/otp-form";

import { Fingerprint } from "lucide-react";

export default function VerificationPage() {
  const email = cookies().get("otp-email")?.value;

  if (!email) {
    redirect("/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-5 text-center">
        <Fingerprint size={80} className="text-primary" />
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
          Check your email
        </h1>
        <InputOTPForm email={email} />
      </div>
    </main>
  );
}
