import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import SignUpForm from "./_components/signup-form";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-5">
        <LinkIcon size={80} className="text-primary" />
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
          Register!
        </h1>
        {/* TODO: Add loading fallback */}
        <Suspense>
          <SignUpForm />
        </Suspense>
        <div className="flex gap-3">
          <Link href="/" className="text-primary hover:text-secondary">
            Home
          </Link>
          |
          <Link
            href="/auth/signin"
            className="text-primary hover:text-secondary"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
