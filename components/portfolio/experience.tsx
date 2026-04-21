'use client'

import { useEffect, useRef, useState } from 'react'

interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
}

const experiences: Experience[] = [
  {
    id: 1,
    company: 'Entreprise Système Numérique UN-IT, Fianarantsoa',
    position: 'Développeur Front-End',
    period: '2025 - Présent',
    description:
      "Développement et amélioration continue d'applications web métier. Conception d'interfaces performantes et accessibles avec React.js/Next.js, optimisation de l'expérience utilisateur et collaboration étroite avec l'équipe technique.",
  },
  {
    id: 2,
    company: 'Entreprise Système Numérique UN-IT, Fianarantsoa',
    position: 'Développeur Front-End',
    period: '2024 - 2025',
    description:
      "Participation au développement de plateformes web internes et clients. Intégration d'API REST, création de composants UI réutilisables et mise en place de bonnes pratiques de qualité de code en équipe Agile/Scrum.",
  },
  {
    id: 3,
    company: 'Entreprise Système Numérique UN-IT, Fianarantsoa',
    position: 'Développeur Front-End (Stage de Licence en Informatique)',
    period: '2023 - 2024',
    description:
      "Développement d'interfaces web modernes, responsives et accessibles avec React.js, Next.js et Vue.js. Création de composants réutilisables, maintenance d'un code clair et performant, intégration d'API REST et participation aux pratiques Agile/Scrum ainsi qu'aux revues de code. Thème: conception et réalisation d'une plateforme de consultation en ligne incluant prise de rendez-vous, consultation à distance (visioconférence/chat) et gestion des utilisateurs (patients/professionnels). Technologies utilisées: React.js, Node.js, MySQL, Tailwind CSS, API REST et WebSockets.",
  },
  {
    id: 4,
    company: 'Projet académique encadré (Licence Informatique)',
    position: 'Stagiaire Développeur Front-End',
    period: '2023',
    description:
      "Réalisation d'interfaces web responsives et ergonomiques, connexion aux services backend et validation des parcours utilisateurs. Focus sur la qualité visuelle, la performance et l'accessibilité.",
  },
  {
    id: 5,
    company: 'Projets personnels et universitaires',
    position: 'Développeur Web Front-End (Junior)',
    period: '2022 - 2023',
    description:
      "Conception de mini-applications web pour renforcer les bases en JavaScript, React et intégration API. Structuration de code maintenable, versionning avec Git/GitHub et déploiement de projets de démonstration.",
  },
  {
    id: 6,
    company: 'Stage d\'initiation (Informatique)',
    position: 'Stagiaire Développeur Web',
    period: '2022',
    description:
      "Première expérience professionnelle en développement web: participation à la création de pages dynamiques, correction de bugs UI et découverte des méthodes de travail en équipe sur des projets réels.",
  },
]

function ExperienceItem({
  experience,
  index,
  isVisible,
}: {
  experience: Experience
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={`relative transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
    >
      {/* Timeline dot */}
      <div className="hidden sm:block absolute left-[-12px] top-2 w-6 h-6 bg-foreground rounded-full border-4 border-background dark:border-gray-950" />

      <div className="bg-background border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 sm:ml-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-foreground">
            {experience.position}
          </h3>
          <span className="text-sm text-foreground/60 font-medium">
            {experience.period}
          </span>
        </div>

        <p className="text-foreground/70 font-semibold mb-3">
          {experience.company}
        </p>

        <p className="text-foreground/60 leading-relaxed">
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
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Expérience
          </h2>
          <p className="text-lg text-foreground/60">
            Mon parcours professionnel et mes expériences en développement web.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 sm:border-l-0 pl-8 sm:pl-0">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
