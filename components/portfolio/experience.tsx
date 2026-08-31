'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, Calendar, GraduationCap } from 'lucide-react'

interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
  isLatest?: boolean
}

const experiences: Experience[] = [
  {
    id: 1,
    company: 'Entreprise Système Numérique UN-IT, Fianarantsoa',
    position: 'Développeur Front-End',
    period: '2024 - Présent',
    isLatest: true,
    description: "Développement d'interfaces web modernes et responsives avec React.js, Next.js et Vue.js. Création de composants réutilisables, intégration d'API REST et application des méthodologies Agile/Scrum avec revues de code en équipe.",
  },
  {
    id: 2,
    company: 'UN-IT, Fianarantsoa (Stage de fin d\'études)',
    position: 'Développeur Front-End',
    period: '2023 - 2024',
    description: "Conception et réalisation d'une plateforme de consultation en ligne (prise de rendez-vous, visioconférence/chat, gestion des utilisateurs) avec React.js, Node.js, MySQL, Tailwind CSS et WebSockets.",
  },
]

const education = [
  { degree: 'Master II en Informatique', school: "École Nationale d'Informatique — Université de Fianarantsoa", period: '2024 - 2025' },
  { degree: 'Licence Professionnelle en Informatique', school: "École Nationale d'Informatique — Université de Fianarantsoa", period: '2022 - 2023' },
]

function ExperienceItem({ experience, index, isVisible }: { experience: Experience, index: number, isVisible: boolean }) {
  return (
    <div
      className={`relative pl-8 sm:pl-12 pb-12 last:pb-0 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Connector Line */}
      <div className="absolute left-0 sm:left-[1.35rem] top-0 bottom-0 w-[2px] bg-foreground/10 last:bg-transparent" />
      
      {/* Dot */}
      <div className={`absolute left-[-5px] sm:left-[1rem] top-1.5 w-3 h-3 rounded-full border-2 border-background transition-colors duration-500 ${
        experience.isLatest ? 'bg-primary border-primary scale-125' : 'bg-foreground/20 border-foreground/40'
      }`} />

      <div className="group relative bg-card/40 backdrop-blur-sm border border-border p-6 rounded-2xl hover:border-primary/30 hover:bg-card transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {experience.position}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-foreground/40">
              <Briefcase size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">{experience.company}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-foreground/5 rounded-full border border-foreground/5 whitespace-nowrap">
            <Calendar size={12} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{experience.period}</span>
          </div>
        </div>

        <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
          {experience.description}
        </p>
      </div>
    </div>
  )
}

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="py-24 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={ref} className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Carrière</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Parcours <span className="text-primary/50 dark:text-foreground/40 font-light">Professionnel</span>
          </h2>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Formation */}
        <div
          className={`mt-8 pt-8 border-t border-foreground/10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.4em] text-foreground/30 mb-6">
            <GraduationCap size={14} className="text-primary" />
            Formation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div key={edu.degree} className="p-5 bg-card/40 border border-border rounded-xl">
                <p className="text-sm font-bold text-foreground">{edu.degree}</p>
                <p className="text-xs text-foreground/50 mt-1">{edu.school}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mt-2">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
