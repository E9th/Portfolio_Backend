"use client"

import { Code2, Database, Server, Cloud, Container, GitBranch } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const skills = [
  {
    category: "Languages",
    icon: Code2,
    items: ["Go (Golang)", "JavaScript", "SQL", "Bash"],
  },
  {
    category: "Backend Platforms",
    icon: Server,
    items: ["Firebase", "Supabase"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["PostgreSQL", "Redis", "MongoDB"],
  },
  {
    category: "Infrastructure",
    icon: Server,
    items: ["NGINX", "RabbitMQ", "gRPC"],
  },
  {
    category: "DevOps",
    icon: Container,
    items: ["Docker", "Kubernetes", "CI/CD"],
  },
  {
    category: "Cloud",
    icon: Cloud,
    items: ["Vercel", "Render", "AWS"],
  },
  {
    category: "Tools",
    icon: GitBranch,
    items: ["Git", "GitHub", "Postman"],
  },
];


const techStack = [
  { name: "Go", icon: "/tech/go-logo.svg", color: "#00ADD8" },
  { name: "PostgreSQL", icon: "/tech/postgresql-logo.svg", color: "#336791" },
  { name: "Redis", icon: "/tech/redis-logo.svg", color: "#DC382D" },
  { name: "RabbitMQ", icon: "/tech/rabbitmq-logo.svg", color: "#FF6600" },
  { name: "Docker", icon: "/tech/docker-logo.svg", color: "#2496ED" },
  { name: "NGINX", icon: "/tech/nginx-logo.svg", color: "#009639" },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-9">
          <p className="text-primary font-mono text-sm mb-2">{"// Get to know me"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - About Text */}
          <div className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Who am I?</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {"I am a fresh graduate who loves backend development. During my university years, I worked while studying to gain real-world experience, ranging from UX/UI design to Business Analysis.\n\nThese experiences taught me not just how to code, but how to work as a team and understand business needs. Now, I’m fully focused on building scalable software with Go (Golang) and PostgreSQL. I know I still have a lot to learn, but I’m ready to take on the challenge."}
                </p>
                
                
              </div>
            </div>

            {/* Tech Stack Icons */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Primary Tech Stack</h3>
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <div className="w-6 h-6 relative">
                      <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} fill className="object-contain" />
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <Card
                key={skill.category}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3 min-w-0">
                    <skill.icon className="h-5 w-5 text-primary shrink-0" />
                    <h4 className="font-semibold text-foreground truncate">{skill.category}</h4>
                  </div>
                  <ul className="space-y-1">
                    {skill.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
