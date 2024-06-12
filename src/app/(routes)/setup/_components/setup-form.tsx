"use client";

import "react-image-crop/dist/ReactCrop.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ReactCrop, { type Crop } from "react-image-crop";

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

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { cropImage } from "@/lib/utils";
import { UserRoundPlus } from "lucide-react";

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

  //Image State
  const [selectedImage, setSelectedImage] = useState<string>();
  const [croppedImage, setCroppedImage] = useState<string>();
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const showCropped = (blob: Blob) => {
    if (croppedImage) {
      URL.revokeObjectURL(croppedImage);
    }

    const url = URL.createObjectURL(blob);
    setCroppedImage(url);
  };

  const imgRef = useRef<HTMLImageElement>(null);

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
                  <FormField
                    control={form.control}
                    name="img"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select a file</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            multiple={false}
                            onChange={(e) => {
                              const file = e.target.files![0];
                              if (file) {
                                setSelectedImage(URL.createObjectURL(file));
                                setCrop((prev) => ({
                                  ...prev,
                                  x: 0,
                                  y: 0,
                                  width: 0,
                                  height: 0,
                                }));
                              }
                            }}
                          />
                        </FormControl>
                        <ReactCrop
                          className="min-w-full border-4 border-accent"
                          aspect={1}
                          ruleOfThirds={true}
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          onDragEnd={async () => {
                            const blob = await cropImage(imgRef, crop);
                            if (blob) {
                              field.onChange(blob);
                              showCropped(blob);
                            } else {
                              setCroppedImage(undefined);
                            }
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="min-w-full"
                            alt="Selected Image"
                            ref={imgRef}
                            src={selectedImage}
                          />
                        </ReactCrop>
                        <FormMessage />
                      </FormItem>
                    )}
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
