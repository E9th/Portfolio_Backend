"use client"

import { useState } from "react"
import {
  ExternalLink,
  Github,
  Play,
  ChevronDown,
  ChevronUp,
  Folder,
  Zap,
  Youtube,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ApiTester } from "@/components/api-tester"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Optimized Image Component with loading state
function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  sizes,
  onLoad,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  onLoad?: () => void
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const isGif = src.includes(".gif")
  const isExternal = src.startsWith("http")

  // For GIFs and external URLs, use native img tag for better compatibility
  if (isGif || isExternal) {
    return (
      <div className={cn("relative", fill && "absolute inset-0")}>
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
        )}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
            Failed to load
          </div>
        ) : (
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className={cn(
              className,
              "transition-opacity duration-500",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => {
              setIsLoading(false)
              onLoad?.()
            }}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
          />
        )}
      </div>
    )
  }

  // For local images, use Next.js Image with optimization
  return (
    <div className={cn("relative", fill && "absolute inset-0")}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn(
          className,
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}

// Flexible button configuration type
type ProjectButton =
  | { type: "github"; url: string }
  | { type: "youtube"; url: string }
  | { type: "demo"; url: string }
  | { type: "apiTester" }

// Featured projects with configurable buttons
const featuredProjects = [
  {
    id: 1,
    title: "Development of Driver Drowsiness Detection System",
    description: "High-performance RESTful API with real-time inventory & payment processing.",
    fullDescription:
      "A comprehensive driver drowsiness detection system using computer vision and machine learning. The system monitors driver's eye aspect ratio (EAR) and mouth aspect ratio (MAR) in real-time to detect signs of fatigue. Built with Python, OpenCV, and deployed on Raspberry Pi for embedded applications.",
    image: "https://s12.gifyu.com/images/bh5av.gif",
    images: ["https://s12.gifyu.com/images/bh5av.gif", "https://i.ibb.co/60t8KJ6f/PRESENTAION-CUT-VER-4-2.webp", "https://i.ibb.co/cSw3sc05/PRESENTAION-CUT-VER-3.webp", "https://i.ibb.co/PvDx9wtt/PRESENTAION-CUT-VER-4-4.webp", "https://i.ibb.co/Q3Dq5fDs/PRESENTAION-CUT-VER-5.webp", "https://i.ibb.co/FbQqTKyZ/PRESENTAION-CUT-VER-4-6.webp", "https://i.ibb.co/HD8tDyVY/PRESENTAION-CUT-VER-4-5.webp"],
    tags: ["Python", "TypeScript", "RestfulAPI", "tailwind.css", "Next.js", "Go", "PostgreSQL", "Redis", "Docker", "Vercel", "Render", "Git", "Github"],
    featured: true,
    buttons: [
      /*{ type: "apiTester" },*/
      { type: "github", url: "https://github.com/E9th/flash-sale.git" },
      /*{ type: "youtube", url: "https://youtu.be/MOjGODNMYgU?si=UEkpjh0PuhQ2HwnI" },*/
    ] as ProjectButton[],
    hasApiTester: true,
    apiEndpoints: [
      { method: "GET", path: "/api/products", description: "List all products" },
      { method: "POST", path: "/api/orders", description: "Create new order" },
    ],
  },
  {
    id: 2,
    title: "Flash Sale System",
    description: "Secure microservice with JWT, OAuth2, and RBAC implementation.",
    // แก้ไขจุดนี้: เปลี่ยน " เป็น ` (Backtick)
    fullDescription: `Title: Load Testing Results (k6) Scenario: 100 Virtual Users flooding the system for 10 seconds.
      - Total Requests: ~19,400 Requests (~1,933 RPS)
      - Success Rate (Business Logic): 100%
          Explanation: The test verifies that every request receives either a 202 Accepted (Order Queued) or 400 Bad Request (Sold Out).
      - Error Rate (Server Crash): 0% (Zero 500 Errors)
      - Note on HTTP Failures: The 89.69% HTTP failure rate represents requests that were correctly rejected by the system because the inventory was sold out. This proves the system's ability to prevent overselling under high concurrency.`,
    image: "https://s12.gifyu.com/images/bk2yw.gif",
    images: ["https://s12.gifyu.com/images/bk2yw.gif", "https://i.ibb.co/v6JqLqfz/Screenshot-2026-01-18-094749.png"],
    tags: ["Go", "PostgreSQL", "Redis", "RabbitMQ", "NGINX", "Docker", "HTML", "CSS", "Javascript", "K6", "Git", "Github"],
    featured: true,
    buttons: [
      { type: "apiTester" },
      { type: "github", url: "https://github.com/E9th/flash-sale.git" },
    ] as ProjectButton[], // ถ้าเป็นไฟล์ .js ให้ลบ "as ProjectButton[]" ออก
    hasApiTester: true,
    apiEndpoints: [
      { method: "GET", path: "/api/products", description: "List all products" },
      { method: "POST", path: "/api/orders", description: "Create new order" },
    ],
},
  {
    id: 3,
    title: "Moshi Collar",
    description: "IoT Device for real-time Heat Stroke detection in cats with monitoring dashboard.",
    fullDescription:
      "An innovative IoT wearable device designed for cats to monitor body temperature and detect early signs of heat stroke. The collar uses temperature and humidity sensors connected to an Arduino board, with data transmitted to Google Cloud for real-time monitoring. Pet owners receive instant alerts through a mobile dashboard.",
    image: "https://s12.gifyu.com/images/bhDGP.gif",
    images: ["https://s12.gifyu.com/images/bhDGP.gif", "https://i.ibb.co/xKH52rzy/Moshi-Collar-2.webp", "https://i.ibb.co/sdzhgJpw/Moshi-Collar-7.webp", "https://i.ibb.co/TM0svHrc/Moshi-Collar-16.webp"],
    tags: ["Arduino", "C++", "Google App Script"],
    featured: true,
    buttons: [
      { type: "youtube", url: "https://www.youtube.com/watch?si=UEkpjh0PuhQ2HwnI&v=MOjGODNMYgU&feature=youtu.be" },
    ] as ProjectButton[],
    hasApiTester: false,
    apiEndpoints: [],
  },
]

// Archive projects (ข้อมูลเดิม)
const archiveProjects = [
  {
    id: 4,
    title: "Task Queue System",
    description: "Distributed task queue...",
    tags: ["Go", "RabbitMQ"],
    github: "#",
    year: "2024",
  },
  {
    id: 5,
    title: "URL Shortener",
    description: "High-performance link shortener...",
    tags: ["Go", "Redis"],
    github: "#",
    year: "2024",
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showArchive, setShowArchive] = useState(false)
  const [detailProject, setDetailProject] = useState<(typeof featuredProjects)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    if (detailProject) {
      setCurrentImageIndex((prev) => (prev + 1) % detailProject.images.length)
    }
  }

  const prevImage = () => {
    if (detailProject) {
      setCurrentImageIndex((prev) => (prev - 1 + detailProject.images.length) % detailProject.images.length)
    }
  }

  const openDetailModal = (project: (typeof featuredProjects)[0]) => {
    setDetailProject(project)
    setCurrentImageIndex(0)
  }

  return (
    <section id="projects" className="relative overflow-hidden py-10 pb-2.5">
      {/* Background Decorations (Optional) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

      <div className="container mx-auto px-4 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1 border-primary/20 bg-primary/5 text-primary">
            Build & Deploy
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of robust backend services, APIs, and full-stack applications.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Main Feature Card (Large) */}
          <div
            className="md:col-span-2 row-span-2 group relative rounded-3xl border-2 border-border/60 bg-gradient-to-br from-card/80 via-card/50 to-card/30 backdrop-blur-xl overflow-hidden hover:border-primary/70 transition-all duration-500 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
            onClick={() => openDetailModal(featuredProjects[0])}
          >
            {/* Spotlight Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Corner Accent Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

            <div className="relative flex flex-col h-full">
              {/* Image Section */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <OptimizedImage
                  src={featuredProjects[0].image}
                  alt={featuredProjects[0].title}
                  fill
                  priority
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Click to view hint */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    Click to view details
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="relative p-4 md:p-8 flex flex-col flex-grow justify-between bg-gradient-to-t from-card via-card/90 to-transparent">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 flex flex-wrap items-center gap-2 md:gap-3 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
                        <span className="break-words">{featuredProjects[0].title}</span>
                        
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed break-words">
                        {featuredProjects[0].description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProjects[0].tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary font-medium px-3 py-1 transition-colors text-xs md:text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Button Container */}
                <div
                  className="flex flex-wrap gap-2 md:gap-3 pt-5 border-t border-border/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ProjectActionButtons
                    project={featuredProjects[0]}
                    onTest={() => setSelectedProject(featuredProjects[0])}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Cards (Stacked on Right) */}
          <div className="flex flex-col gap-6 md:col-span-1">
            {featuredProjects.slice(1).map((project) => (
              <div
                key={project.id}
                className="group relative rounded-3xl border-2 border-border/60 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-primary/15 h-full flex flex-col cursor-pointer"
                onClick={() => openDetailModal(project)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-3 left-4 z-20">
                    <h4 className="font-bold text-lg text-foreground drop-shadow-lg">{project.title}</h4>
                  </div>
                  {/* Click to view hint */}
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-[10px] font-medium text-foreground">
                      View
                    </div>
                  </div>
                </div>

                <div className="relative p-4 md:p-5 flex flex-col flex-grow overflow-hidden">
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-shrink-0 mb-2">{project.description}</p>

                  <div className="space-y-4 flex-shrink-0 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-1 rounded-md bg-primary/15 text-primary font-semibold border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* StopPropagation for buttons */}
                    <div className="flex flex-wrap gap-2 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                      <ProjectActionButtons project={project} size="sm" onTest={() => setSelectedProject(project)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* Archive Section (Minimalist Table) */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Folder className="w-5 h-5 text-muted-foreground" />
              Archive Projects
            </h3>
            <Button
              variant="ghost"
              onClick={() => setShowArchive(!showArchive)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showArchive ? "Show Less" : "Show All"}
              {showArchive ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>

          {showArchive && (
            <div className="rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/30 text-muted-foreground">
                  <tr>
                    <th className="p-4 font-medium w-[100px]">Year</th>
                    <th className="p-4 font-medium">Project</th>
                    <th className="p-4 font-medium hidden md:table-cell">Built With</th>
                    <th className="p-4 font-medium text-right">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {archiveProjects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-muted-foreground font-mono text-xs">{proj.year}</td>
                      <td className="p-4 font-medium text-foreground">{proj.title}</td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex gap-2">
                          {proj.tags.map((t) => (
                            <span key={t} className="text-xs text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={proj.github}
                          target="_blank"
                          className="inline-flex items-center justify-center hover:text-primary transition-colors"
                          rel="noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* API Tester Modal */}
        {selectedProject && <ApiTester project={selectedProject} onClose={() => setSelectedProject(null)} />}

        {detailProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setDetailProject(null)}
          >
            <div
              className="w-full max-w-2xl bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-3xl shadow-2xl overflow-hidden my-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />

              {/* Close button */}
              <button
                onClick={() => setDetailProject(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-primary/50 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Slider Section */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Featured badge */}
                {detailProject.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Current Image */}
                <div className="absolute inset-4 rounded-xl overflow-hidden border border-border/30 shadow-xl">
                  <OptimizedImage
                    src={detailProject.images[currentImageIndex]}
                    alt={`${detailProject.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Navigation Arrows */}
                {detailProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-primary/50 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-primary/50 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dot Indicators */}
                {detailProject.images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {detailProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          index === currentImageIndex ? "bg-primary w-6" : "bg-foreground/30 hover:bg-foreground/50",
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="relative p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                      {detailProject.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {detailProject.fullDescription || detailProject.description}
                    </p>
                  </div>
                  {detailProject.featured && (
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/30 shrink-0">
                      <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {detailProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                  <ProjectActionButtons
                    project={detailProject}
                    onTest={() => {
                      setDetailProject(null)
                      setSelectedProject(detailProject)
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setDetailProject(null)}
                    className="border-border/50 hover:bg-muted/50"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectActionButtons({
  project,
  onTest,
  size = "default",
}: { project: any; onTest: () => void; size?: "default" | "sm" }) {
  const isSmall = size === "sm"

  return (
    <>
      {project.buttons?.map((button: ProjectButton, index: number) => {
        switch (button.type) {
          case "apiTester":
            return (
              <Button
                key={`${project.id}-apiTester-${index}`}
                size={size}
                onClick={onTest}
                className={cn(
                  "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5",
                  isSmall ? "h-8 px-3 text-xs" : "h-10 px-5",
                )}
              >
                <Play className={cn("mr-2 fill-current", isSmall ? "w-3 h-3" : "w-4 h-4")} />
                Test API
              </Button>
            )
          case "github":
            return (
              <Button
                key={`${project.id}-github-${index}`}
                variant="outline"
                size={size}
                asChild
                className={cn(
                  "bg-background/50 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5",
                  isSmall ? "h-8 px-3 text-xs" : "h-10 px-5",
                )}
              >
                <a href={button.url} target="_blank" rel="noopener noreferrer">
                  <Github className={cn("mr-2", isSmall ? "w-3 h-3" : "w-4 h-4")} />
                  Code
                </a>
              </Button>
            )
          case "youtube":
            return (
              <Button
                key={`${project.id}-youtube-${index}`}
                variant="ghost"
                size={size}
                asChild
                className={cn(
                  "hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 hover:-translate-y-0.5",
                  isSmall ? "h-8 px-3 text-xs" : "h-10 px-5",
                )}
              >
                <a href={button.url} target="_blank" rel="noopener noreferrer">
                  <Youtube className={cn("mr-2", isSmall ? "w-3 h-3" : "w-4 h-4")} />
                  Youtube
                </a>
              </Button>
            )
          case "demo":
            return (
              <Button
                key={`${project.id}-demo-${index}`}
                variant="ghost"
                size={size}
                asChild
                className={cn(
                  "hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5",
                  isSmall ? "h-8 px-3 text-xs" : "h-10 px-5",
                )}
              >
                <a href={button.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className={cn("mr-2", isSmall ? "w-3 h-3" : "w-4 h-4")} />
                  Demo
                </a>
              </Button>
            )
          default:
            return null
        }
      })}
    </>
  )
}
