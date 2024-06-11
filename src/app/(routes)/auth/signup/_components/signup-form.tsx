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

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export default function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const { mutate: createUser } = api.user.createUser.useMutation({
    onSuccess: () => {
      router.push("/auth/signin");
    },
    onError: (error) => {
      // TODO: Check if the type of error is actually `UserAlreadyExistsError`
      toast({
        className: "[&_#toast-title]:text-destructive",
        variant: "destructive",
        title: error.message,
        description: "Please sign in with this email address.",
        duration: 5000,
      });

      setLoading(false);
    },
  });

  const email = params.get("email");

  useEffect(() => {
    if (email) {
      toast({
        className: "[&_#toast-title]:text-primary",
        title: "This email is not registered yet!",
        description: "Please register with this email address to continue.",
        duration: 5000,
      });
    }
  }, [email, toast]);

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
