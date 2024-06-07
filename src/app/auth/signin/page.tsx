"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => signIn("discord")}>Sign in with Discord</button>
      <button onClick={() => signIn("email")}>Sign in with Email</button>
    </div>
  );
}
