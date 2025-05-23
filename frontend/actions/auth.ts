"use server";
import { auth } from "@clerk/nextjs/server"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function checkIfSessionExists() {
  // Retrieve session information
  const { sessionId } = await auth();
  // Check if session exists
  if (!sessionId) {
    revalidatePath("/sign-in");
    redirect("/sign-in");
  }
}