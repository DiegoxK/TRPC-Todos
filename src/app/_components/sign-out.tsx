"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  // TODO: At signout remove all session cookies
  // Delete them creating a trpc endpoint and from them use the cookie package to delete the cookies
  // Call this endpoint after the signout function promise is resolved
  return <button onClick={() => signOut()}>Logout</button>;
}
