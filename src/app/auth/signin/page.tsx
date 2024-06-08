"use client";
import { signIn } from "next-auth/react";
import { KeyRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Discord } from "@/components/vectors";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("email", { email: values.email });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-5">
        <KeyRound size={80} className="text-primary" />
        <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
          Welcome Back!
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sign in with your email address</FormLabel>
                  <FormControl>
                    <Input placeholder="example@todos.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="from-primary to-secondary w-full bg-gradient-to-br"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className="flex w-full items-center justify-center gap-4">
          <Separator className="w-[115px] bg-white" />
          <p>OR</p>
          <Separator className="w-[115px] bg-white" />
        </div>
        <Button
          className="hover:bg-secondary flex w-full items-center justify-between px-5 font-medium transition-colors"
          size="lg"
          onClick={() => signIn("discord")}
        >
          Sign in with Discord
          <Discord className="fill-foreground" width={33} height={33} />
        </Button>
        <div>
          <p>
            Don&apos;t have an account?{" "}
            <Link
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
