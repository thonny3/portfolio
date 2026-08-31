'use client'

import { useEffect, useRef, useState } from 'react'
import { Workflow } from 'lucide-react'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiJavascript,
  SiPhp, SiPython, SiNodedotjs, SiExpress, SiPostgresql, SiMongodb,
  SiMysql, SiGit, SiDocker, SiVercel, SiGithub, SiFirebase, SiSupabase, SiWebpack,
  SiVuedotjs, SiLaravel, SiKubernetes,
} from 'react-icons/si'

type Level = 'Notions' | 'Intermédiaire' | 'Avancé' | 'Expert'

interface Skill {
  name: string
  icon: React.ReactNode
  color: string
  level: Level
}

interface SkillCategory {
  id: string
  name: string
  skills: Skill[]
}

const LEVEL_RANK: Record<Level, number> = {
  Notions: 1,
  Intermédiaire: 2,
  Avancé: 3,
  Expert: 4,
}

const skillCategories: SkillCategory[] = [
  {
    id: 'langages',
    name: 'Langages',
    skills: [
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 'Expert' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', level: 'Expert' },
      { name: 'PHP', icon: <SiPhp />, color: '#777BB4', level: 'Intermédiaire' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 'Intermédiaire' },
    ],
  },
  {
    id: 'frontend',
    name: 'Front-end',
    skills: [
      { name: 'React.js', icon: <SiReact />, color: '#61DAFB', level: 'Expert' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000', level: 'Expert' },
      { name: 'Vue.js', icon: <SiVuedotjs />, color: '#4FC08D', level: 'Avancé' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4', level: 'Expert' },
      { name: 'HTML5 / CSS3', icon: <SiHtml5 />, color: '#E34F26', level: 'Expert' },
    ],
  },
  {
    id: 'backend',
    name: 'Back-end',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 'Avancé' },
      { name: 'Express.js', icon: <SiExpress />, color: '#000000', level: 'Avancé' },
      { name: 'Laravel', icon: <SiLaravel />, color: '#FF2D20', level: 'Avancé' },
      { name: 'API REST', icon: <SiWebpack />, color: '#8DD6F9', level: 'Avancé' },
    ],
  },
  {
    id: 'sgbd',
    name: 'SGBD',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1', level: 'Avancé' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 'Avancé' },
      { name: 'MySQL', icon: <SiMysql />, color: '#00758F', level: 'Avancé' },
    ],
  },
  {
    id: 'outils',
    name: 'Outils & Méthodologie',
    skills: [
      { name: 'Git / GitHub', icon: <SiGit />, color: '#F05032', level: 'Expert' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED', level: 'Intermédiaire' },
      { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326CE5', level: 'Notions' },
      { name: 'Agile / Scrum', icon: <Workflow />, color: '#ea580c', level: 'Avancé' },
    ],
  },
]

function LevelDots({ level }: { level: Level }) {
  const rank = LEVEL_RANK[level]
  return (
    <div className="flex items-center gap-1" aria-label={level}>
      {[1, 2, 3, 4].map((dot) => (
        <span
          key={dot}
          className={`w-1.5 h-1.5 rounded-full ${dot <= rank ? 'bg-primary' : 'bg-foreground/15'}`}
        />
      ))}
    </div>
  )
}

function SkillCard({ skill, index, isVisible }: { skill: Skill, index: number, isVisible: boolean }) {
  return (
    <div
      className={`group relative p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 flex-shrink-0 bg-foreground/5 rounded-lg transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
          style={{ color: skill.color }}
        >
          <div className="w-5 h-5">{skill.icon}</div>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-foreground tracking-tight truncate">{skill.name}</h4>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40">{skill.level}</span>
            <LevelDots level={skill.level} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
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

  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)
  const visibleCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeCategory)

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Expertise</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Compétences <span className="text-primary/50 dark:text-foreground/40 font-light">Techniques</span>
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed">
            Un arsenal technologique moderne pour concevoir des produits robustes,
            scalables et centrés sur l'expérience utilisateur.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-foreground/60 border-border hover:border-primary/40 hover:text-foreground'
            }`}
          >
            Tout <span className="opacity-60">({totalSkills})</span>
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground/60 border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {category.name} <span className="opacity-60">({category.skills.length})</span>
            </button>
          ))}
        </div>

        {/* Skill Groups */}
        <div className="space-y-12">
          {visibleCategories.map((category) => (
            <div key={category.id}>
              {activeCategory === 'all' && (
                <h3 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-foreground/30 mb-5">
                  {category.name}
                  <span className="flex-1 h-px bg-border" />
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {category.skills.map((skill, sIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={sIndex}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0" />
    </section>
  )
}
