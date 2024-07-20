"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserRoundPlus } from "lucide-react";

import "react-image-crop/dist/ReactCrop.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import {
  Dialog,
  DialogClose,
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
import ImageField from "@/components/form/image-field";
import { type Dispatch, type SetStateAction, useState } from "react";

interface ProfileFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    userRole: "ADMIN" | "USER";
  };
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [croppedImage, setCroppedImage] = useState<string>();

  return (
    <div className="flex gap-8">
      <div className="w-fit space-y-4 border border-border bg-background p-8">
        <Avatar className="h-44 w-44">
          <AvatarImage src={croppedImage ?? user.image ?? undefined} />
          <AvatarFallback>
            <UserRoundPlus className="h-20 w-20" />
          </AvatarFallback>
        </Avatar>
        <Separator />
        <div>
          <h2 className="text-lg font-medium">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      {/* TODO: Responsive Inputs */}
      <div className="w-1/2 space-y-6">
        <UserNameForm user={user} />
        <UserImageForm
          setCroppedImage={setCroppedImage}
          croppedImage={croppedImage}
          user={user}
        />
      </div>
    </div>
  );
}

const UserNameForm = ({ user }: ProfileFormProps) => {
  const userNameSchema = z.object({
    username: z
      .string()
      .max(18, {
        message: "Username must be less than 18 characters",
      })
      .min(1, {
        message: "Username can't be empty",
      }),
  });

  const form = useForm({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      username: user.name ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof userNameSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="xXGamerProXx"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || !form.formState.isDirty}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

interface UserImageFormProps extends ProfileFormProps {
  croppedImage: string | undefined;
  setCroppedImage: Dispatch<SetStateAction<string | undefined>>;
}

const UserImageForm = ({
  user,
  croppedImage,
  setCroppedImage,
}: UserImageFormProps) => {
  const userImageSchema = z.object({
    img: z.instanceof(Blob).optional(),
  });

  const form = useForm({
    resolver: zodResolver(userImageSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof userImageSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Dialog>
          <div className="space-y-1">
            <FormLabel>Profile picture</FormLabel>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Select Image
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Select a profile picture.</DialogTitle>
              <DialogDescription>
                You can select a profile picture to use for your account!
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] rounded-lg pr-4">
              <ImageField<z.infer<typeof userImageSchema>>
                control={form.control}
                name="img"
                setCroppedImage={setCroppedImage}
              />
            </ScrollArea>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <div className="space-x-2">
          <Button disabled={!croppedImage} type="submit">
            Submit
          </Button>
          {croppedImage && (
            <Button
              onClick={() => {
                setCroppedImage(undefined);
                form.reset();
              }}
              variant="destructive"
            >
              Discard
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
