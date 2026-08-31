'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Github, Phone, MapPin } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      const result = await emailjs.send(
        'service_0moyut1',
        'template_9kypqym',
        {
          nom: formData.name,
          email: formData.email,
          message: formData.message,
          date: new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
        },
        'qZ5F9y35WJN_anztg'
      )

      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Message envoyé !',
          text: 'Merci de m\'avoir contacté. Je vous répondrai dès que possible.',
          confirmButtonColor: '#7c3aed',
        })
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.",
        confirmButtonColor: '#3f6d52',
      })
    } finally {
      setIsSending(false)
    }
  }

  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:randrianasolothonny3@gmail.com',
      label: 'Email',
    },
    {
      icon: Github,
      href: 'https://github.com/thonny3',
      label: 'GitHub',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Contact</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Parlons de votre <span className="text-primary/50 dark:text-foreground/40 font-light">projet</span>
          </h2>
          <p className="text-lg text-foreground/60">
            Vous avez un projet en tête? N'hésitez pas à me contacter.
            Je serais ravi de discuter de votre idée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-input/30 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-input/30 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-input/30 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:randrianasolothonny3@gmail.com"
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    randrianasolothonny3@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Téléphone</h3>
                  <a
                    href="tel:+261349165158"
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    +261 34 91 651 58
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">Localisation</h3>
                  <p className="text-foreground/60 text-sm">Tanambao, Fianarantsoa, Madagascar</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-between gap-4 p-5 bg-card border border-border rounded-2xl">
                <h3 className="text-sm font-bold text-foreground">
                  Me suivre
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="p-2.5 bg-primary/5 text-foreground rounded-lg border border-border hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all duration-200 transform hover:scale-110 active:scale-95"
                      >
                        <Icon size={18} />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="p-5 bg-primary/10 border border-primary/20 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <h3 className="text-sm font-bold text-foreground">
                    Disponibilité
                  </h3>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Actuellement ouvert à de nouveaux projets et opportunités.
                  N'hésitez pas à me contacter pour discuter de votre projet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
