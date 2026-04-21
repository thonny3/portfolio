'use client'

import { useEffect, useRef, useState } from 'react'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiJavascript,
  SiPhp, SiPython, SiNodedotjs, SiExpress, SiPostgresql, SiMongodb,
  SiMysql, SiGit, SiDocker, SiVercel, SiGithub, SiFirebase, SiSupabase, SiWebpack,
} from 'react-icons/si'

interface SkillCategory {
  name: string
  skills: Array<{
    name: string
    icon: React.ReactNode
    color: string
    level?: string
  }>
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Langages de programmation',
    skills: [
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 'Expert' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', level: 'Expert' },
      { name: 'PHP', icon: <SiPhp />, color: '#777BB4', level: 'Intermédiaire' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 'Intermédiaire' },
    ],
  },
  {
    name: 'Front-end',
    skills: [
      { name: 'React.js', icon: <SiReact />, color: '#61DAFB', level: 'Expert' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000', level: 'Expert' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4', level: 'Expert' },
      { name: 'HTML5 / CSS3', icon: <SiHtml5 />, color: '#E34F26', level: 'Expert' },
    ],
  },
  {
    name: 'Back-end',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 'Avancé' },
      { name: 'Express.js', icon: <SiExpress />, color: '#000000', level: 'Avancé' },
      { name: 'API REST', icon: <SiWebpack />, color: '#8DD6F9', level: 'Avancé' },
    ],
  },
  {
    name: 'SGBD',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1', level: 'Avancé' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 'Avancé' },
      { name: 'MySQL', icon: <SiMysql />, color: '#00758F', level: 'Avancé' },
    ],
  },
]

function SkillBadge({ skill, index, isVisible }: { skill: SkillCategory['skills'][number], index: number, isVisible: boolean }) {
  return (
    <div
      className={`group relative p-5 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <div 
          className="p-3 bg-foreground/5 rounded-xl transition-all duration-300 transform group-hover:rotate-6 flex items-center justify-center"
          style={{ color: skill.color }}
        >
          <div className="w-6 h-6">{skill.icon}</div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground tracking-tight">{skill.name}</h4>
          {skill.level && (
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{skill.level}</span>
          )}
        </div>
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
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Expertise</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Compétences <span className="text-foreground/40 font-light">Techniques</span>
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed">
            Un arsenal technologique moderne pour concevoir des produits robustes, 
            scalables et centrés sur l'expérience utilisateur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {skillCategories.map((category, catIndex) => (
            <div key={category.name} className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/30 pl-2">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill, sIndex) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    index={catIndex * 4 + sIndex}
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
