"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "thanapon.dongphuyaw@gmail.com",
    href: "mailto:your@email.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "093-196-0300",
    href: "tel:+66XXXXXXXX",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangkok, Thailand",
    href: null,
  },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/E9th" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  // { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="relative py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-7">
          <p className="text-primary font-mono text-sm mb-2">{"// Let's connect"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground">Get In Touch</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                Feel free to reach out!
              </p>

              <div className="space-y-3 md:space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="
                            text-sm md:text-base
                            text-foreground 
                            hover:text-primary 
                            transition-colors 
                            font-medium
                            pointer-events-none
                            cursor-default
                            break-all
                          "
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm md:text-base text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">Follow Me</h3>
              <div className="flex gap-2 md:gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 md:p-3 bg-muted hover:bg-primary/20 hover:text-primary rounded-lg transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground">Send a Message</h3>

              {submitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Send className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h4 className="text-base md:text-lg font-semibold mb-2">Message Sent!</h4>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="name" className="text-sm">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-muted border-border text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="email" className="text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-muted border-border text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="subject" className="text-sm">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="bg-muted border-border text-sm md:text-base"
                    />
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="message" className="text-sm">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={4}
                      required
                      className="bg-muted border-border resize-none text-sm md:text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
