'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Github, ChevronDown, ChevronUp, Lock, Sparkles } from 'lucide-react'

type Category = 'pro' | 'perso'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  link: string
  github?: string
  category: Category
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
    category: 'pro',
  },
  {
    id: 2,
    title: 'Projet Isalo - Application Web',
    description: "Réalisation du front-end de la plateforme Isalo avec Next.js, création de composants réutilisables et optimisation de l'expérience utilisateur.",
    technologies: ['Next.js', 'React', 'JavaScript', 'Tailwind CSS'],
    image: '/isalo.PNG',
    link: '#',
    github: 'https://github.com/thonny3/fornt-isalo-dev',
    category: 'pro',
  },
  {
    id: 3,
    title: 'Site Web EBAX - Front-End Next.js',
    description: "Conception et implémentation de l'interface utilisateur du site EBAX en Next.js avec une approche responsive et accessible.",
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS'],
    image: '/siteebax.PNG',
    link: '#',
    github: '#',
    category: 'pro',
  },
  {
    id: 4,
    title: 'Soumission Projet EBAX - Plateforme Web',
    description: "Développement de l'interface de soumission de projets pour EBAX avec Next.js, formulaires dynamiques et intégration des endpoints API.",
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'API REST'],
    image: '/soummision.PNG',
    link: '#',
    github: '#',
    category: 'pro',
  },
  {
    id: 5,
    title: 'Site E-commerce Marcia - Front-End',
    description: "Création de la partie front-end d'un site e-commerce avec Next.js: pages produits, navigation fluide et expérience d'achat optimisée.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'API REST'],
    image: '/marcia.png',
    link: '#',
    github: '#',
    category: 'pro',
  },
  {
    id: 6,
    title: 'MyJalako Web - Application Front-End',
    description: "Développement de l'application web MyJalako avec Next.js, architecture de pages modulaire et composants UI réutilisables.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/myjalako-web.png',
    link: '#',
    github: 'https://github.com/thonny3/front-myjalako',
    category: 'pro',
  },
  {
    id: 7,
    title: 'MyJalako Mobile - Interface Applicative',
    description: "Conception de l'interface mobile du projet MyJalako avec une approche orientée expérience utilisateur et navigation fluide.",
    technologies: ['React Native', 'JavaScript', 'API REST'],
    image: '/myjalako-mobile.png',
    link: '#',
    github: 'https://github.com/thonny3/mobile_myjalako',
    category: 'pro',
  },
  {
    id: 8,
    title: 'Budget Pro - Outil de Gestion Financière',
    description: "Application de suivi budgétaire professionnel avec tableaux de bord, gestion des entrées/sorties et visualisation des dépenses.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Chart.js'],
    image: '/budget-pro.png',
    link: '#',
    github: 'https://github.com/thonny3/suivi_buget_perso',
    category: 'pro',
  },
  {
    id: 9,
    title: 'Gestion Stock - Application de Suivi',
    description: "Plateforme de gestion de stock avec suivi des mouvements, état des articles et interface d'administration front-end.",
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'API REST'],
    image: '/gestion-stock.png',
    link: '#',
    github: 'https://github.com/thonny3/gestion_magasin',
    category: 'pro',
  },
  {
    id: 10,
    title: 'Budget Family - Gestion des Dépenses Familiales',
    description: "Application web dédiée au suivi du budget familial, catégorisation des dépenses et pilotage des objectifs financiers.",
    technologies: ['Next.js', 'React', 'JavaScript', 'Local Storage'],
    image: '/budget-family.png',
    link: '#',
    github: 'https://github.com/thonny3/budget-family',
    category: 'pro',
  },
  {
    id: 11,
    title: 'Plateforme de Formation en Ligne',
    description: "Plateforme e-learning front-end avec parcours de cours, suivi de progression et interfaces adaptées aux différents profils d'utilisateurs.",
    technologies: ['Next.js', 'React', 'TypeScript', 'API REST'],
    image: '/formation-en-ligne.png',
    link: '#',
    github: 'https://github.com/thonny3/formation-Front',
    category: 'pro',
  },
  {
    id: 12,
    title: 'Backend Job MG - Interface Front-End',
    description: "Interface utilisateur d'une plateforme d'emploi, incluant recherche d'offres, filtres avancés et parcours de candidature.",
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/backend-job-mg.png',
    link: '#',
    github: '#',
    category: 'pro',
  },
  {
    id: 13,
    title: 'NARUTO - Application JavaScript',
    description: "Projet front-end en JavaScript mettant en pratique manipulation du DOM, interactions dynamiques et structuration de composants UI.",
    technologies: ['JavaScript', 'HTML', 'CSS'],
    image: '',
    link: 'https://github.com/thonny3/NARUTO',
    github: 'https://github.com/thonny3/NARUTO',
    category: 'perso',
  },
  {
    id: 14,
    title: 'Projet Python - Scripts et Automatisation',
    description: "Ensemble de scripts et mini-applications Python orientés résolution de problèmes, logique métier et automatisation de tâches.",
    technologies: ['Python'],
    image: '',
    link: 'https://github.com/thonny3/ProjetPython',
    github: 'https://github.com/thonny3/ProjetPython',
    category: 'perso',
  },
]

const INITIAL_COUNT = 6

function TechPills({ technologies, limit = 4 }: { technologies: string[]; limit?: number }) {
  const visible = technologies.slice(0, limit)
  const rest = technologies.length - visible.length
  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((tech) => (
        <span
          key={tech}
          className="text-xs px-3 py-1 bg-muted text-foreground/70 rounded-full border border-border"
        >
          {tech}
        </span>
      ))}
      {rest > 0 && (
        <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 font-medium">
          +{rest}
        </span>
      )}
    </div>
  )
}

function ProjectThumb({ project }: { project: Project }) {
  const [imageError, setImageError] = useState(false)
  const hasImage = Boolean(project.image) && !imageError

  if (hasImage) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setImageError(true)}
      />
    )
  }

  return (
    <div className="h-full w-full flex items-center justify-center relative bg-primary/10">
      <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:16px_16px] text-primary" />
      <span className="relative text-2xl font-black tracking-tight text-primary/70 px-6 text-center">
        {project.title.split(' ').slice(0, 2).join(' ')}
      </span>
    </div>
  )
}

function ProjectActions({ project }: { project: Project }) {
  const hasLink = project.link && project.link !== '#'
  const hasGithub = project.github && project.github !== '#'

  if (!hasLink && !hasGithub) {
    return (
      <span className="inline-flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-wider">
        <Lock size={14} />
        Projet privé
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {hasLink && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir le projet"
          onClick={(e) => e.stopPropagation()}
          className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform duration-200"
        >
          <ExternalLink size={17} />
        </a>
      )}
      {hasGithub && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir le code"
          onClick={(e) => e.stopPropagation()}
          className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform duration-200"
        >
          <Github size={17} />
        </a>
      )}
    </div>
  )
}

function FeaturedProjectCard({ project, isVisible }: { project: Project; isVisible: boolean }) {
  return (
    <div
      className={`group grid grid-cols-1 lg:grid-cols-2 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 mb-6 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="relative h-64 lg:h-auto overflow-hidden">
        <ProjectThumb project={project} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/0 lg:to-transparent" />
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest">
          <Sparkles size={12} />
          Projet phare
        </div>
      </div>
      <div className="p-8 lg:p-10 flex flex-col justify-center gap-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
            {project.category === 'pro' ? 'Professionnel' : 'Personnel'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
        <p className="text-foreground/60 leading-relaxed">{project.description}</p>
        <TechPills technologies={project.technologies} limit={6} />
        <div className="flex items-center gap-3 pt-2">
          {(project.link && project.link !== '#') || (project.github && project.github !== '#') ? (
            <>
              {project.link && project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink size={16} />
                  Voir le projet
                </a>
              )}
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-full text-sm font-semibold hover:border-primary/40 transition-colors"
                >
                  <Github size={16} />
                  Code
                </a>
              )}
            </>
          ) : (
            <span className="inline-flex items-center gap-2 text-foreground/40 text-xs font-medium italic">
              <Lock size={14} />
              Projet professionnel privé
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
    <div
      ref={ref}
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
      }}
    >
      {/* Project Image */}
      <div className="h-48 w-full relative overflow-hidden">
        <ProjectThumb project={project} />

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-background/70 border border-border text-foreground/70">
          {project.category === 'pro' ? 'Pro' : 'Perso'}
        </div>

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
          <ProjectActions project={project} />
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-foreground/60 text-sm mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <TechPills technologies={project.technologies} />
      </div>
    </div>
  )
}

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | Category>('all')
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

  const proCount = projects.filter((p) => p.category === 'pro').length
  const persoCount = projects.filter((p) => p.category === 'perso').length

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)

  const [featured, ...rest] = filteredProjects
  const displayedRest = showAll ? rest : rest.slice(0, INITIAL_COUNT - 1)

  const handleFilter = (filter: 'all' | Category) => {
    setActiveFilter(filter)
    setShowAll(false)
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Mes <span className="text-primary/50 dark:text-foreground/40 font-light">Projets</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Découvrez une sélection de mes récents projets et réalisations.
            Chaque projet démontre mes compétences en développement web moderne.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { key: 'all' as const, label: 'Tous', count: projects.length },
            { key: 'pro' as const, label: 'Professionnel', count: proCount },
            { key: 'perso' as const, label: 'Personnel', count: persoCount },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground/60 border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {filter.label} <span className="opacity-60">({filter.count})</span>
            </button>
          ))}
        </div>

        {/* Featured Project */}
        {featured && <FeaturedProjectCard project={featured} isVisible={isVisible} />}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedRest.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        {rest.length > INITIAL_COUNT - 1 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-card border border-border text-foreground font-semibold rounded-full transition-all duration-300 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 active:translate-y-0"
            >
              {showAll ? 'Voir moins' : 'Voir plus de projets'}
              {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
