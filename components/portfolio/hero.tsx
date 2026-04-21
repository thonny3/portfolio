'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-gray-50/80 to-background dark:via-gray-900/40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_20%_20%,rgba(120,120,120,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(120,120,120,0.12),transparent_35%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-foreground/10 blur-3xl -z-10"
      />
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Title */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8 flex justify-center">
            <Image
              src="/thonny.jpeg"
              alt="Photo de profil"
              width={180}
              height={180}
              className="h-40 w-40 sm:h-44 sm:w-44 rounded-full object-cover border-4 border-foreground/10 shadow-lg"
              priority
            />
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
            RANDRIANASOLO Jean Marc Thonny
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Développeur
            <span className="block text-gray-600 dark:text-gray-400">Front-End</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg sm:text-xl text-foreground/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Je conçois des interfaces web modernes, performantes et accessibles.
            Spécialisé en JavaScript, React, Next.js et technologies front-end modernes.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Voir mes projets
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-foreground/5 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Me contacter
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={scrollToProjects}
            className="flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/60 transition-colors animate-bounce"
          >
            <span className="text-sm font-medium">Découvrir</span>
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
