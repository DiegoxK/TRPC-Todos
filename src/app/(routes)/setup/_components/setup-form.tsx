"use client";

import "react-image-crop/dist/ReactCrop.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";

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

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRoundPlus } from "lucide-react";
import FileField from "./file-field";

const formSchema = z.object({
  username: z
    .string()
    .max(18, {
      message: "Username must be less than 18 characters",
    })
    .min(1, {
      message: "Username can't be empty",
    }),
  img: z.instanceof(Blob).optional(),
});

export default function SetupForm() {
  // TODO: Add image cropping modal and then upload the image to the uploadthing api

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    console.log("render");
  });

  //Cropped image
  const [croppedImage, setCroppedImage] = useState<string>();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex max-w-[600px] flex-col items-center gap-5">
      {/* Profile picture */}
      {croppedImage ? (
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-full"
            src={croppedImage}
            alt="Cropped"
            width="144"
            height="144"
          />
        </div>
      ) : (
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-accent">
          <UserRoundPlus
            size={70}
            className="mb-1 ml-[10px] text-accent-foreground"
          />
        </div>
      )}
      <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent">
        Let&apos;s get started!
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <Dialog>
            <FormLabel>Profile picture</FormLabel>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Select Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Select a profile picture.</DialogTitle>
                <DialogDescription>
                  You can select a profile picture to use for your account!
                </DialogDescription>
                <ScrollArea className="max-h-[74vh] rounded-lg pr-4">
                  <FileField<z.infer<typeof formSchema>>
                    control={form.control}
                    name="img"
                    setCroppedImage={setCroppedImage}
                  />
                </ScrollArea>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Register your username *</FormLabel>
                <FormControl>
                  <Input placeholder="xXGamerProXx" {...field} />
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
    </div>
  );
}
