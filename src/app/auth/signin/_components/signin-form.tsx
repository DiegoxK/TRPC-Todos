"use client";
import { signIn } from "next-auth/react";
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

const formSchema = z.object({
  email: z.string().email(),
});

export default function SigninForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("email", { email: values.email });
  }

  // TODO: Add error handling
  // TODO: Add loading state
  // TODO: If the user is logged in, redirect them to the home page

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
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
            className="w-full bg-gradient-to-br from-primary to-secondary"
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
        className="flex w-full items-center justify-between px-5 font-medium transition-colors hover:bg-secondary"
        size="lg"
        onClick={() =>
          signIn("discord", {
            callbackUrl: "/",
          })
        }
      >
        Sign in with Discord
        <Discord className="fill-foreground" width={33} height={33} />
      </Button>
    </>
  );
}
