'use client'

import { useEffect, useRef, useState } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiJavascript,
  SiPhp,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiGit,
  SiDocker,
  SiVercel,
  SiGithub,
  SiFirebase,
  SiSupabase,
  SiWebpack,
} from 'react-icons/si'

interface SkillCategory {
  name: string
  skills: Array<{
    name: string
    icon: React.ReactNode
  }>
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Langages de programmation',
    skills: [
      { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8" /> },
      { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8" /> },
      { name: 'PHP', icon: <SiPhp className="w-8 h-8" /> },
      { name: 'Python', icon: <SiPython className="w-8 h-8" /> },
      { name: 'HTML/CSS', icon: <SiHtml5 className="w-8 h-8" /> },
    ],
  },
  {
    name: 'Front-end',
    skills: [
      { name: 'React', icon: <SiReact className="w-8 h-8" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="w-8 h-8" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8" /> },
    ],
  },
  {
    name: 'Back-end',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs className="w-8 h-8" /> },
      { name: 'Express', icon: <SiExpress className="w-8 h-8" /> },
      { name: 'API REST', icon: <SiWebpack className="w-8 h-8" /> },
    ],
  },
  {
    name: 'SGBD',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8" /> },
      { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8" /> },
      { name: 'MySQL', icon: <SiMysql className="w-8 h-8" /> },
    ],
  },
  {
    name: 'Outils & autres',
    skills: [
      { name: 'Git', icon: <SiGit className="w-8 h-8" /> },
      { name: 'Docker', icon: <SiDocker className="w-8 h-8" /> },
      { name: 'Vercel', icon: <SiVercel className="w-8 h-8" /> },
      { name: 'GitHub', icon: <SiGithub className="w-8 h-8" /> },
      { name: 'Firebase', icon: <SiFirebase className="w-8 h-8" /> },
      { name: 'Supabase', icon: <SiSupabase className="w-8 h-8" /> },
    ],
  },
]

function SkillBadge({
  skill,
  index,
  isVisible,
}: {
  skill: { name: string; icon: React.ReactNode }
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={`transition-all duration-500 ${
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
      }}
    >
      <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-900 text-foreground rounded-lg border border-gray-200 dark:border-gray-800 hover:border-foreground/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-default group">
        <div className="text-foreground/70 group-hover:text-foreground transition-colors">
          {skill.icon}
        </div>
        <span className="text-xs font-medium text-center">{skill.name}</span>
      </div>
    </div>
  )
}

export function Skills() {
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
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Compétences
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Maîtrise des technologies modernes et des meilleures pratiques
            de développement web.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.name}>
              <h3 className="text-xl font-bold text-foreground mb-6">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    index={categoryIndex * 6 + skillIndex}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
