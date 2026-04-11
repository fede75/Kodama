"use server";

import { signIn, signOut } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/bonsais" });
}

export async function signUpWithGoogle() {
  await signIn("google", { redirectTo: "/bonsais" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
