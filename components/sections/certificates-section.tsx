"use client"

import { useState } from "react"
import {
  Award,
  ExternalLink,
  Calendar,
  Building,
  ChevronDown,
  ChevronUp,
  Trophy,
  Archive,
  Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// Featured certificates (shown in Bento grid)
const featuredCertificates = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    image: "/certificate-cloud-computing.jpg",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Architecture", "AWS Services", "Security"],
    featured: true,
  },
  {
    id: 2,
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2023",
    image: "/certificate-container-tech.jpg",
    credentialUrl: "https://docker.com/verify",
    skills: ["Containerization", "Docker Swarm", "Orchestration"],
    featured: true,
  },
  {
    id: 3,
    title: "Go Developer Certification",
    issuer: "Google Developers",
    date: "2024",
    image: "/certificate-programming.jpg",
    credentialUrl: "https://google.com/verify",
    skills: ["Go Programming", "Concurrency", "Testing"],
    featured: true,
  },
]

// Archive certificates (shown in compact list)
const archiveCertificates = [
  {
    id: 4,
    title: "PostgreSQL Professional",
    issuer: "PostgreSQL Global Development Group",
    date: "2023",
    credentialUrl: "https://postgresql.org/verify",
    category: "Database",
  },
  {
    id: 5,
    title: "Redis Certified Developer",
    issuer: "Redis Labs",
    date: "2023",
    credentialUrl: "https://redis.io/verify",
    category: "Database",
  },
  {
    id: 6,
    title: "Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    date: "2023",
    credentialUrl: "https://cncf.io/verify",
    category: "DevOps",
  },
  {
    id: 7,
    title: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    date: "2022",
    credentialUrl: "https://hashicorp.com/verify",
    category: "DevOps",
  },
  {
    id: 8,
    title: "Linux Foundation System Admin",
    issuer: "Linux Foundation",
    date: "2022",
    credentialUrl: "https://linuxfoundation.org/verify",
    category: "System",
  },
  {
    id: 9,
    title: "gRPC Fundamentals",
    issuer: "Google Cloud",
    date: "2022",
    credentialUrl: "https://cloud.google.com/verify",
    category: "API",
  },
  {
    id: 10,
    title: "RabbitMQ Certified Developer",
    issuer: "VMware",
    date: "2021",
    credentialUrl: "https://vmware.com/verify",
    category: "Messaging",
  },
]

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<(typeof featuredCertificates)[0] | null>(null)
  const [showArchive, setShowArchive] = useState(false)

  return (
    <section id="certificates" className="relative py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <p className="text-primary font-mono text-sm mb-2">{"// Professional credentials"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Certificates
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
        </div>

        {/* Featured Certificates - Bento Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Highlighted Certifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large featured card */}
            <Card
              className="md:col-span-2 group relative rounded-3xl border-2 border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
              onClick={() => setSelectedCert(featuredCertificates[0])}
            >
              {/* Spotlight glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Corner accent glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative grid md:grid-cols-2 h-full">
                {/* Image Section with dark container */}
                <div className="relative h-48 md:h-full min-h-[200px] bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/30 shadow-2xl bg-white/5">
                      <Image
                        src={featuredCertificates[0].image || "/placeholder.svg"}
                        alt={featuredCertificates[0].title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {/* Featured badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </div>
                  </div>
                </div>

                <CardContent className="relative p-6 flex flex-col justify-center">
                  <Badge className="w-fit mb-3 bg-primary/20 text-primary border-primary/30">Top Credential</Badge>
                  <h4 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {featuredCertificates[0].title}
                  </h4>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Building className="h-4 w-4" />
                    <span>{featuredCertificates[0].issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Issued {featuredCertificates[0].date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredCertificates[0].skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-secondary/50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    className="w-fit bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(featuredCertificates[0].credentialUrl, "_blank")
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Verify Credential
                  </Button>
                </CardContent>
              </div>
            </Card>

            <div className="flex flex-col gap-4">
              {featuredCertificates.slice(1).map((cert) => (
                <Card
                  key={cert.id}
                  className="flex-1 group relative rounded-2xl border-2 border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  {/* Spotlight glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex h-full">
                    {/* Image container with dark background */}
                    <div className="relative w-28 shrink-0 bg-gradient-to-br from-neutral-900 to-neutral-800">
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                          backgroundSize: "10px 10px",
                        }}
                      />
                      <div className="absolute inset-2 rounded-lg overflow-hidden border border-border/30">
                        <Image
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <CardContent className="relative p-4 flex flex-col justify-center">
                      <h4 className="font-semibold text-sm mb-1 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground font-mono">{cert.date}</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-5">
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full border border-border/50 bg-card/30 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
          >
            <Archive className="h-5 w-5" />
            <span className="font-medium">All Certifications ({archiveCertificates.length})</span>
            {showArchive ? (
              <ChevronUp className="h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
            ) : (
              <ChevronDown className="h-4 w-4 group-hover:translate-y-[2px] transition-transform" />
            )}
          </button>

          {showArchive && (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border/50 bg-muted/20">
                    <th className="px-4 py-3 font-medium">Year</th>
                    <th className="px-4 py-3 font-medium">Certificate</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Issuer</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 font-medium text-right">Verify</th>
                  </tr>
                </thead>
                <tbody>
                  {archiveCertificates.map((cert) => (
                    <tr key={cert.id} className="border-b border-border/30 hover:bg-primary/5 transition-colors group">
                      <td className="px-4 py-4 text-sm text-muted-foreground font-mono">{cert.date}</td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {cert.title}
                          </p>
                          <p className="text-sm text-muted-foreground sm:hidden mt-1">{cert.issuer}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground hidden sm:table-cell">{cert.issuer}</td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <Badge variant="outline" className="text-xs font-normal border-border/50">
                          {cert.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 hover:bg-primary/10 hover:text-primary"
                          asChild
                        >
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="w-full max-w-lg bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-3xl shadow-2xl overflow-hidden my-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />

              <div className="relative h-48 bg-gradient-to-br from-neutral-900 to-neutral-800">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute inset-4 rounded-xl overflow-hidden border border-border/30 shadow-xl">
                  <Image
                    src={selectedCert.image || "/placeholder.svg"}
                    alt={selectedCert.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{selectedCert.title}</h3>
                    <p className="text-muted-foreground">{selectedCert.issuer}</p>
                    <p className="text-sm text-muted-foreground font-mono">Issued: {selectedCert.date}</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {"skills" in selectedCert && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-secondary/50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all"
                    asChild
                  >
                    <a href={selectedCert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Verify Credential
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCert(null)}
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
