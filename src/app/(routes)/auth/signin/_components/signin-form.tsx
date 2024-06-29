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
import { getBaseUrl } from "@/trpc/react";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export default function SigninForm() {
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const router = useRouter();

  const { toast } = useToast();

  const error = params.get("error");

  useEffect(() => {
    if (error) {
      toast({
        className: "[&_#toast-title]:text-destructive",
        variant: "destructive",
        title: "An error occurred while signing in",
        description:
          "Please try again, or contact support if the issue persists.",
        duration: 10000,
      });
      router.replace("/auth/signin");
    }
  }, [error, toast, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signIn("email", { email: values.email });
  }

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
                <FormLabel>Log in with your email address</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="example@todos.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="w-full bg-gradient-to-br from-primary to-secondary"
            type="submit"
          >
            {loading ? <div className="loader"></div> : <span>Submit</span>}
          </Button>
        </form>
      </Form>
      <div className="flex w-full items-center justify-center gap-4">
        <Separator className="w-[115px] bg-white" />
        <p>OR</p>
        <Separator className="w-[115px] bg-white" />
      </div>
      <Button
        disabled={loading}
        className="flex w-full items-center justify-between px-5 font-medium transition-colors hover:bg-secondary"
        size="lg"
        onClick={() =>
          signIn("discord", {
            callbackUrl: getBaseUrl(),
          })
        }
      >
        Sign in with Discord
        <Discord className="fill-foreground" width={33} height={33} />
      </Button>
    </>
  );
}
