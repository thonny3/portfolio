'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  link: string
  github?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CRM EBAX - Interface Front-End',
    description: "Développement de l'interface front-end du CRM EBAX avec Next.js, en mettant l'accent sur l'ergonomie, la performance et la maintenabilité.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'API REST'],
    image: '/crm.PNG',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Projet Isalo - Application Web',
    description: "Réalisation du front-end de la plateforme Isalo avec Next.js, création de composants réutilisables et optimisation de l'expérience utilisateur.",
    technologies: ['Next.js', 'React', 'JavaScript', 'Tailwind CSS'],
    image: '/isalo.PNG',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Site Web EBAX - Front-End Next.js',
    description: "Conception et implémentation de l'interface utilisateur du site EBAX en Next.js avec une approche responsive et accessible.",
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS'],
    image: '/siteebax.PNG',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Soumission Projet EBAX - Plateforme Web',
    description: "Développement de l'interface de soumission de projets pour EBAX avec Next.js, formulaires dynamiques et intégration des endpoints API.",
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'API REST'],
    image: '/soummision.PNG',
    link: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'Site E-commerce Marcia - Front-End',
    description: "Création de la partie front-end d'un site e-commerce avec Next.js: pages produits, navigation fluide et expérience d'achat optimisée.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'API REST'],
    image: '/marcia.png',
    link: '#',
    github: '#',
  },
  {
    id: 6,
    title: 'MyJalako Web - Application Front-End',
    description: "Développement de l'application web MyJalako avec Next.js, architecture de pages modulaire et composants UI réutilisables.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/myjalako-web.png',
    link: '#',
    github: '#',
  },
  {
    id: 7,
    title: 'MyJalako Mobile - Interface Applicative',
    description: "Conception de l'interface mobile du projet MyJalako avec une approche orientée expérience utilisateur et navigation fluide.",
    technologies: ['React Native', 'JavaScript', 'API REST'],
    image: '/myjalako-mobile.png',
    link: '#',
    github: '#',
  },
  {
    id: 8,
    title: 'Budget Pro - Outil de Gestion Financière',
    description: "Application de suivi budgétaire professionnel avec tableaux de bord, gestion des entrées/sorties et visualisation des dépenses.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Chart.js'],
    image: '/budget-pro.png',
    link: '#',
    github: '#',
  },
  {
    id: 9,
    title: 'Gestion Stock - Application de Suivi',
    description: "Plateforme de gestion de stock avec suivi des mouvements, état des articles et interface d'administration front-end.",
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'API REST'],
    image: '/gestion-stock.png',
    link: '#',
    github: '#',
  },
  {
    id: 10,
    title: 'Budget Family - Gestion des Dépenses Familiales',
    description: "Application web dédiée au suivi du budget familial, catégorisation des dépenses et pilotage des objectifs financiers.",
    technologies: ['Next.js', 'React', 'JavaScript', 'Local Storage'],
    image: '/budget-family.png',
    link: '#',
    github: '#',
  },
  {
    id: 11,
    title: 'Plateforme de Formation en Ligne',
    description: "Plateforme e-learning front-end avec parcours de cours, suivi de progression et interfaces adaptées aux différents profils d'utilisateurs.",
    technologies: ['Next.js', 'React', 'TypeScript', 'API REST'],
    image: '/formation-en-ligne.png',
    link: '#',
    github: '#',
  },
  {
    id: 12,
    title: 'Backend Job MG - Interface Front-End',
    description: "Interface utilisateur d'une plateforme d'emploi, incluant recherche d'offres, filtres avancés et parcours de candidature.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/backend-job-mg.png',
    link: '#',
    github: '#',
  },
  {
    id: 13,
    title: 'NARUTO - Application JavaScript',
    description: "Projet front-end en JavaScript mettant en pratique manipulation du DOM, interactions dynamiques et structuration de composants UI.",
    technologies: ['JavaScript', 'HTML', 'CSS'],
    image: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    link: 'https://github.com/thonny3/NARUTO',
    github: 'https://github.com/thonny3/NARUTO',
  },
  {
    id: 14,
    title: 'Projet Python - Scripts et Automatisation',
    description: "Ensemble de scripts et mini-applications Python orientés résolution de problèmes, logique métier et automatisation de tâches.",
    technologies: ['Python'],
    image: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
    link: 'https://github.com/thonny3/ProjetPython',
    github: 'https://github.com/thonny3/ProjetPython',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageError, setImageError] = useState(false)
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
    <div
      ref={ref}
      className={`group relative bg-background border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
      }}
    >
      {/* Project Image */}
      <div
        className="h-48 w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
      >
        {!project.image.startsWith('linear-gradient') && !imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: project.image.startsWith('linear-gradient')
                ? project.image
                : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 text-foreground/70 rounded-full border border-gray-200 dark:border-gray-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <a
            href={project.link}
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            <ExternalLink size={16} />
            Voir le projet
          </a>
          {project.github && (
            <a
              href={project.github}
              className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              <Github size={16} />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Mes Projets
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Découvrez une sélection de mes récents projets et réalisations.
            Chaque projet démontre mes compétences en développement web moderne.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
