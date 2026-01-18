"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Comment {
  id: string
  name: string
  email: string
  message: string
  is_approved: boolean
  created_at: string
}

// Submit a new comment (goes to pending approval)
export async function submitComment(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validate inputs
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address" }
  }

  if (message.length < 10) {
    return { success: false, error: "Message must be at least 10 characters" }
  }

  if (message.length > 1000) {
    return { success: false, error: "Message must be less than 1000 characters" }
  }

  const { error } = await supabase.from("comments").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    is_approved: false,
  })

  if (error) {
    console.error("Error submitting comment:", error)
    return { success: false, error: "Failed to submit comment. Please try again." }
  }

  revalidatePath("/")
  return { success: true, message: "Your comment has been submitted and is pending approval." }
}

// Get all approved comments (public)
export async function getApprovedComments(): Promise<Comment[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }

  return data || []
}

// Get all comments (admin only - requires service role)
export async function getAllComments(): Promise<Comment[]> {
  // Using service role for admin operations
  const { createClient: createServiceClient } = await import("@supabase/supabase-js")
  const supabase = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { data, error } = await supabase.from("comments").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all comments:", error)
    return []
  }

  return data || []
}

// Approve a comment (admin only)
export async function approveComment(id: string, adminPassword: string) {
  // Simple admin password check (in production, use proper authentication)
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: "Unauthorized" }
  }

  const { createClient: createServiceClient } = await import("@supabase/supabase-js")
  const supabase = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { error } = await supabase.from("comments").update({ is_approved: true }).eq("id", id)

  if (error) {
    console.error("Error approving comment:", error)
    return { success: false, error: "Failed to approve comment" }
  }

  revalidatePath("/")
  revalidatePath("/admin/comments")
  return { success: true }
}

// Delete a comment (admin only)
export async function deleteComment(id: string, adminPassword: string) {
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: "Unauthorized" }
  }

  const { createClient: createServiceClient } = await import("@supabase/supabase-js")
  const supabase = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { error } = await supabase.from("comments").delete().eq("id", id)

  if (error) {
    console.error("Error deleting comment:", error)
    return { success: false, error: "Failed to delete comment" }
  }

  revalidatePath("/")
  revalidatePath("/admin/comments")
  return { success: true }
}
