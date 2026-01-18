"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, Trash2, Lock, Eye, EyeOff, RefreshCw, Clock, Mail, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getAllComments, approveComment, deleteComment, type Comment } from "@/app/actions/comments"

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function AdminCommentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all")

  async function loadComments() {
    setIsLoading(true)
    const data = await getAllComments()
    setComments(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadComments()
    }
  }, [isAuthenticated])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    // We'll validate the password when making actual API calls
    // This is just to show the admin UI
    if (password) {
      setIsAuthenticated(true)
    }
  }

  async function handleApprove(id: string) {
    setActionLoading(id)
    const result = await approveComment(id, password)
    if (result.success) {
      await loadComments()
    } else {
      alert(result.error)
    }
    setActionLoading(null)
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this comment?")) return

    setActionLoading(id)
    const result = await deleteComment(id, password)
    if (result.success) {
      await loadComments()
    } else {
      alert(result.error)
    }
    setActionLoading(null)
  }

  const filteredComments = comments.filter((comment) => {
    if (filter === "pending") return !comment.is_approved
    if (filter === "approved") return comment.is_approved
    return true
  })

  const pendingCount = comments.filter((c) => !c.is_approved).length
  const approvedCount = comments.filter((c) => c.is_approved).length

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">Enter your admin password to manage comments</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Comments Management</h1>
            <p className="text-muted-foreground">Approve or delete user comments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadComments} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:border-primary/50" onClick={() => setFilter("all")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{comments.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50" onClick={() => setFilter("pending")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50" onClick={() => setFilter("approved")}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter badges */}
        <div className="flex gap-2 mb-4">
          <Badge
            variant={filter === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("all")}
          >
            All
          </Badge>
          <Badge
            variant={filter === "pending" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("pending")}
          >
            Pending
          </Badge>
          <Badge
            variant={filter === "approved" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("approved")}
          >
            Approved
          </Badge>
        </div>

        {/* Comments List */}
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          </div>
        ) : filteredComments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No comments found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <Card key={comment.id} className={!comment.is_approved ? "border-yellow-500/50" : ""}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={comment.is_approved ? "default" : "secondary"}>
                          {comment.is_approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {comment.name}
                        </span>
                        <span className="flex items-center gap-1 truncate max-w-[200px]">
                          <Mail className="h-3 w-3 shrink-0" />
                          <span className="truncate">{comment.email}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(comment.created_at)}
                        </span>
                      </div>

                      <p className="text-foreground whitespace-pre-wrap">{comment.message}</p>
                    </div>

                    <div className="flex gap-2">
                      {!comment.is_approved && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(comment.id)}
                          disabled={actionLoading === comment.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(comment.id)}
                        disabled={actionLoading === comment.id}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
