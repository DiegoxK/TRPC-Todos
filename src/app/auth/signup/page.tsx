import { Link } from "lucide-react";
import SignUpForm from "./_components/signup-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-5">
        <Link size={80} className="text-primary" />
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
          Sign Up!
        </h1>
        <SignUpForm />
      </div>
    </main>
  );
}
