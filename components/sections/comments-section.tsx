"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageSquare, Send, User, Clock, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitComment, getApprovedComments, type Comment } from "@/app/actions/comments"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    loadComments()
  }, [])

  async function loadComments() {
    setIsLoading(true)
    const data = await getApprovedComments()
    setComments(data)
    setIsLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const data = new FormData()
    data.append("name", formData.name)
    data.append("email", formData.email)
    data.append("message", formData.message)

    const result = await submitComment(data)

    if (result.success) {
      setSubmitStatus({ type: "success", message: result.message || "Comment submitted!" })
      setFormData({ name: "", email: "", message: "" })
    } else {
      setSubmitStatus({ type: "error", message: result.error || "Failed to submit" })
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="relative py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-7">
          <p className="text-primary font-mono text-sm mb-2">{"// Leave a message"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Guestbook</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Comment Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Leave a Comment</h3>
              </div>

              {submitStatus && (
                <div
                  className={`p-4 rounded-lg mb-4 ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="comment-name">Name</Label>
                    <Input
                      id="comment-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-muted border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment-email">Email</Label>
                    <Input
                      id="comment-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-muted border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment-message">Message</Label>
                  <Textarea
                    id="comment-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={4}
                    required
                    minLength={10}
                    maxLength={1000}
                    className="bg-muted border-border resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">{formData.message.length}/1000</p>
                </div>

                <p className="text-xs text-muted-foreground">Your comment will be visible after approval.</p>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Submit Comment
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">Recent Comments</h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : comments.length === 0 ? (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No comments yet. Be the first to leave a message!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {comments.map((comment) => (
                  <Card key={comment.id} className="bg-card/50 backdrop-blur-sm border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{comment.name}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDate(comment.created_at)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{comment.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
