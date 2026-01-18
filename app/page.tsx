"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CertificatesSection } from "@/components/sections/certificates-section"
import { ContactSection } from "@/components/sections/contact-section"
import { CommentsSection } from "@/components/sections/comments-section"
import { Footer } from "@/components/footer"

// Dynamic import for 3D background to avoid SSR issues
const DataFlowBackground = dynamic(() => import("@/components/3d/data-flow-background"), {
  ssr: false,
})

export default function Home() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="relative min-h-screen">
      {/* 3D Background */}
      {mounted && <DataFlowBackground isDark={resolvedTheme === "dark"} />}

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Comments/Guestbook Section */}
      <CommentsSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
