import { Button } from "@/components/ui/button";
import { CircleSlash } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex max-w-[400px] flex-col items-center gap-5 rounded-md bg-accent px-8 py-10 text-center shadow-md">
        <CircleSlash size={80} className="text-primary" />
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
          Unable to sign in
        </h1>
        <p className="text-center">The sign in code is no longer valid.</p>
        <p>It may have been used already or it may have expired.</p>
        <Link className="w-full" href="/auth/signin">
          <Button className="w-full">Sign in</Button>
        </Link>
      </div>
    </main>
  );
}
