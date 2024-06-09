import { KeyRound } from "lucide-react";
import SigninForm from "./_components/signin-form";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-5">
        <KeyRound size={80} className="text-primary" />
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
          Welcome Back!
        </h1>
        <SigninForm />
        <div>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              replace
              href="/auth/register"
              className="text-primary hover:text-secondary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
