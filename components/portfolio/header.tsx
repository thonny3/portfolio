'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Code2, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Calculate scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)

      // Update active section
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsOpen(false)
    }
  }

  const navItems = [
    { label: 'Accueil', id: 'hero' },
    { label: 'À propos', id: 'about' },
    { label: 'Projets', id: 'projects' },
    { label: 'Compétences', id: 'skills' },
    { label: 'Expérience', id: 'experience' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3' 
          : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <nav 
          className={`relative transition-all duration-500 rounded-2xl flex items-center justify-between px-6 py-2.5 bg-background/20 backdrop-blur-md border border-white/5 shadow-2xl ${
            isScrolled
              ? 'bg-background/70 border-border/40'
              : 'bg-background/5 border-transparent'
          }`}
        >
          {/* Scroll Progress Bar (Top) */}
          <div className="absolute top-0 left-6 right-6 h-[1.5px] overflow-hidden rounded-full">
            <div 
              className="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_8px_rgba(var(--primary),0.8)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="group cursor-pointer flex items-center gap-3"
          >
            <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all group-hover:rotate-12 duration-300">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none">
                J.M. Thonny
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                Développeur Front-End
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl relative group ${
                  activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                   <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_-1px] shadow-primary/80" />
                )}
                <span className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl -z-10" />
              </button>
            ))}
            
            <div className="w-px h-5 bg-border/40 mx-3" />
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                aria-label="Toggle theme"
              >
                {mounted && (resolvedTheme === 'dark' ? <Sun size={19} /> : <Moon size={19} />)}
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="ml-2 pr-2 pl-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-3"
              >
                Me contacter
                <div className="p-1.5 bg-primary-foreground/10 rounded-lg">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground/70 hover:bg-foreground/5 rounded-xl transition-colors"
            >
              {mounted && (resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground/70 hover:bg-foreground/5 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full px-4 pt-3 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-background/90 backdrop-blur-2xl border border-border/40 rounded-2xl shadow-2xl p-4 space-y-2">
            {navItems.concat({ label: 'Contact', id: 'contact' }).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-5 py-3.5 text-base font-medium rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-foreground/70 border border-transparent hover:bg-foreground/5 hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
