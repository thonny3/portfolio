'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Github, Facebook } from 'lucide-react'
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
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        'qZ5F9y35WJN_anztg'
      )

      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Message envoyé !',
          text: 'Merci de m\'avoir contacté. Je vous répondrai dès que possible.',
          confirmButtonColor: '#000',
        })
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.",
        confirmButtonColor: '#000',
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
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
    },
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub',
    },
    {
      icon: Facebook,
      href: 'https://facebook.com',
      label: 'Facebook',
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
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contact
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
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
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
            <div className="space-y-8">
              {/* Email */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:randrianasolothonny3@gmail.com"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                 randrianasolothonny3@gmail.com
                </a>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Me suivre
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="p-3 bg-gray-100 dark:bg-gray-900 text-foreground rounded-lg border border-gray-200 dark:border-gray-800 hover:border-foreground/30 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 active:scale-95"
                      >
                        <Icon size={20} />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Disponibilité
                </h3>
                <p className="text-foreground/60">
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
