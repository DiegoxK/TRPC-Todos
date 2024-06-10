import { Button } from "@/components/ui/button";
import { CircleSlash, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  searchParams: {
    error: "Verification";
  };
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
  const { error } = searchParams;

  if (error === "Verification") {
    return <VerificationError />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex max-w-[400px] flex-col items-center gap-5 rounded-md bg-accent px-8 py-10 text-center shadow-md">
        <CircleSlash size={80} className="text-primary" />
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
          Unable to sign in
        </h1>
        <p className="text-center">
          An error occurred while trying to sign in.{" "}
          <Link className="text-primary" href="/auth/signin">
            Please try again.
          </Link>
        </p>
        <p className="text-sm text-accent-foreground">
          If the problem persists, please contact{" "}
          <Link className="text-primary" href="mailto:">
            support
          </Link>
        </p>
        <Link className="w-full" href="/auth/signin">
          <Button className="w-full">Sign in</Button>
        </Link>
      </div>
    </main>
  );
}

const VerificationError = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex max-w-[400px] flex-col items-center gap-5 rounded-md bg-accent px-8 py-10 text-center shadow-md">
        <ShieldAlert size={80} className="text-primary" />
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
          Unable to sign in
        </h1>
        <div className="space-y-1">
          <p className="text-center">The sign in code is invalid.</p>
          <p className="text-sm text-accent-foreground">
            It may have been used already or it may have expired.
          </p>
        </div>
        <Link replace className="w-full" href="/auth/verify-request">
          <Button className="w-full">Try again</Button>
        </Link>
      </div>
    </main>
  );
};
