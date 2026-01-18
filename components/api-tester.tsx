"use client"

import { useState } from "react"
import { X, Send, Copy, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
}

interface Project {
  id: number
  title: string
  apiEndpoints: ApiEndpoint[]
}

interface ApiTesterProps {
  project: Project
  onClose: () => void
}

const methodColors = {
  GET: "bg-green-500/20 text-green-500 border-green-500/30",
  POST: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  PUT: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  DELETE: "bg-red-500/20 text-red-500 border-red-500/30",
}

// Mock API responses
const mockResponses: Record<string, object> = {
  "/api/products": {
    success: true,
    data: [
      { id: 1, name: "Laptop Pro", price: 1299.99, stock: 45 },
      { id: 2, name: "Wireless Mouse", price: 29.99, stock: 150 },
      { id: 3, name: "Mechanical Keyboard", price: 89.99, stock: 78 },
    ],
    total: 3,
    page: 1,
  },
  "/api/products/:id": {
    success: true,
    data: {
      id: 1,
      name: "Laptop Pro",
      price: 1299.99,
      stock: 45,
      description: "High-performance laptop for professionals",
      category: "Electronics",
      created_at: "2024-01-15T10:30:00Z",
    },
  },
  "/api/orders": {
    success: true,
    message: "Order created successfully",
    data: {
      order_id: "ORD-2024-001234",
      status: "pending",
      total: 1329.98,
      created_at: new Date().toISOString(),
    },
  },
  "/api/rooms": {
    success: true,
    data: [
      { id: "room-1", name: "General", members: 25, last_message: "Hello everyone!" },
      { id: "room-2", name: "Tech Talk", members: 12, last_message: "Anyone using Go?" },
    ],
  },
  "/api/messages": {
    success: true,
    message: "Message sent successfully",
    data: {
      message_id: "msg-12345",
      sent_at: new Date().toISOString(),
    },
  },
  "/api/auth/login": {
    success: true,
    data: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      expires_in: 3600,
      user: { id: 1, email: "user@example.com", role: "user" },
    },
  },
  "/api/auth/register": {
    success: true,
    message: "User registered successfully",
    data: {
      user_id: 42,
      email: "newuser@example.com",
      created_at: new Date().toISOString(),
    },
  },
  "/api/auth/profile": {
    success: true,
    data: {
      id: 1,
      email: "user@example.com",
      name: "John Doe",
      role: "user",
      created_at: "2024-01-01T00:00:00Z",
    },
  },
}

export function ApiTester({ project, onClose }: ApiTesterProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(project.apiEndpoints[0])
  const [requestBody, setRequestBody] = useState('{\n  "key": "value"\n}')
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const [showEndpoints, setShowEndpoints] = useState(false)

  const sendRequest = async () => {
    setIsLoading(true)
    setResponse(null)

    const startTime = Date.now()

    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 200))

    const endTime = Date.now()
    setResponseTime(endTime - startTime)

    const mockResponse = mockResponses[selectedEndpoint.path] || {
      success: true,
      message: "Request processed successfully",
      timestamp: new Date().toISOString(),
    }

    setResponse(JSON.stringify(mockResponse, null, 2))
    setIsLoading(false)
  }

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <h3 className="font-mono text-sm font-medium truncate">API Tester - {project.title}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Request Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-border flex-1 overflow-y-auto">
          <div className="p-4 space-y-4 border-b md:border-b-0 border-border">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Request</h4>

            {/* Endpoint Selector */}
            <div className="relative">
              <button
                onClick={() => setShowEndpoints(!showEndpoints)}
                className="w-full flex items-center justify-between p-3 bg-muted rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={cn("font-mono text-xs", methodColors[selectedEndpoint.method])}>
                    {selectedEndpoint.method}
                  </Badge>
                  <span className="font-mono text-sm">{selectedEndpoint.path}</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", showEndpoints && "rotate-180")} />
              </button>

              {showEndpoints && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
                  {project.apiEndpoints.map((endpoint, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedEndpoint(endpoint)
                        setShowEndpoints(false)
                        setResponse(null)
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left",
                        selectedEndpoint.path === endpoint.path && "bg-muted",
                      )}
                    >
                      <Badge variant="outline" className={cn("font-mono text-xs", methodColors[endpoint.method])}>
                        {endpoint.method}
                      </Badge>
                      <div>
                        <p className="font-mono text-sm">{endpoint.path}</p>
                        <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Request Body (for POST/PUT) */}
            {(selectedEndpoint.method === "POST" || selectedEndpoint.method === "PUT") && (
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Request Body (JSON)</label>
                <Textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="font-mono text-sm h-32 bg-muted border-border"
                  placeholder='{"key": "value"}'
                />
              </div>
            )}

            {/* Send Button */}
            <Button
              onClick={sendRequest}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Request
                </span>
              )}
            </Button>
          </div>

          {/* Response Panel */}
          <div className="p-4 space-y-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Response</h4>
              {responseTime !== null && (
                <Badge variant="outline" className="text-xs">
                  {responseTime}ms
                </Badge>
              )}
            </div>

            {/* Response Display */}
            <div className="relative">
              <div className="h-48 md:h-64 overflow-auto bg-background rounded-lg border border-border p-4">
                {response ? (
                  <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">{response}</pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    Send a request to see the response
                  </div>
                )}
              </div>

              {response && (
                <Button variant="ghost" size="icon" onClick={copyResponse} className="absolute top-2 right-2">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>

            {/* Status indicator */}
            {response && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Status: 200 OK</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
