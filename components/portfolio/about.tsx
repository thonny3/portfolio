'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function About() {
  const [isVisible, setIsVisible] = useState(false)
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

  const facts = [
    { value: '3 ans', label: 'Expérience pro' },
    { value: 'Master II', label: 'Informatique' },
    { value: 'FR / MG', label: 'Malgache · Français' },
  ]

  const values = [
    'Code propre et lisible',
    'Attention aux détails',
    'Apprentissage continu',
    'Collaboration en équipe',
    'Performance optimisée',
    'Accessibilité inclusive',
  ]

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Profil</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight">
              À <span className="text-primary">propos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-12 lg:gap-16 items-start">
            {/* Photo column */}
            <div className="flex flex-col items-center lg:items-start gap-6 lg:sticky lg:top-32">
              <div className="relative">
                <div className="absolute -inset-3 bg-primary/15 rounded-3xl blur-xl" />
                <Image
                  src="/about.jpeg"
                  alt="Photo de profil"
                  width={320}
                  height={380}
                  className="relative rounded-2xl shadow-xl border border-border object-cover w-full max-w-[320px]"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-[320px]">
                {facts.map((fact) => (
                  <div key={fact.label} className="p-3 bg-card border border-border rounded-xl text-center">
                    <p className="text-sm font-bold text-foreground leading-none">{fact.value}</p>
                    <p className="text-[10px] text-foreground/50 mt-1.5 leading-tight">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content column */}
            <div className="space-y-10">
              <div className="space-y-5 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Ingénieur en informatique (Master II) basé à Fianarantsoa, Madagascar,
                  je suis développeur Front-End depuis 3 ans, avec une solide expérience
                  back-end acquise en parallèle. Mon cœur de métier est React.js / Next.js,
                  complété par Node.js, Laravel et les bases de données relationnelles pour
                  construire des produits complets de bout en bout.
                </p>

                <p>
                  Ma philosophie de développement repose sur la création de solutions
                  utilisateur-centrées, accessibles et maintenables. Je suis convaincu que
                  le code de qualité nécessite une attention particulière à la performance,
                  la sécurité et l'expérience utilisateur — et je travaille en méthodologie
                  Agile/Scrum avec des revues de code régulières.
                </p>

                <p>
                  Quand je ne suis pas en train de coder, j'aime contribuer à des projets
                  personnels, apprendre de nouvelles technologies et partager mes
                  connaissances avec la communauté développeur.
                </p>
              </div>

              <div className="pt-2 border-t border-border">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/30 mb-6 mt-8">
                  Valeurs principales
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {values.map((value) => (
                    <li
                      key={value}
                      className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl text-foreground/70 hover:border-primary/30 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0 bg-primary" />
                      <span className="text-sm font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] -z-0" />
    </section>
  )
}
