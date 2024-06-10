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
import { api, getBaseUrl } from "@/trpc/react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
});

export default function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { mutate: createUser } = api.user.createUser.useMutation({
    onSuccess: () => {
      router.push("/auth/signin");
    },
    onError: (error) => {
      // TODO: Show error with toaster
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    },
  });

  const email = params.get("email");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    createUser({
      email: values.email,
    });
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
                <FormLabel>Register with your email address</FormLabel>
                <FormControl>
                  <Input placeholder="example@todos.com" {...field} />
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
      {error && <p>{error}</p>}
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
