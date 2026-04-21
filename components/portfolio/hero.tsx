'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Github, Linkedin, MousePointer2, Download } from 'lucide-react'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setSpotlightPos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-background"
    >
      {/* 1. Subtle Professional Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-4">
           
            
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.1]">
                RANDRIANASOLO  <br />
              <span className="text-foreground/40 font-light">Jean Marc Thonny</span>
            </h1>
            
            <div className="inline-block px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg">
              <span className="text-lg sm:text-xl font-medium text-foreground/80  italic tracking-tight">
                Développeur <span className="text-primary font-bold">Front-End</span>
              </span>
            </div>
          </div>

          <p className="max-w-xl text-lg text-foreground/60 leading-relaxed font-medium">
            Expert en création d'expériences numériques de haute précision. Je combine rigueur technique et sensibilité esthétique pour donner vie à vos projets les plus ambitieux.
          </p>

          <div className="flex flex-wrap gap-6 items-center pt-4">
             <button
              onClick={scrollToProjects}
              className="px-10 py-4 bg-foreground text-background font-bold rounded-full hover:shadow-2xl hover:shadow-foreground/20 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group"
            >
              Voir les projets
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <a
              href="/CV_RANDRIANASOLO_Jean_Marc_Thonny.pdf"
              download
              className="px-8 py-4 bg-background text-foreground border border-foreground/10 font-bold rounded-full hover:bg-foreground/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group"
            >
              Mon CV
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            
            <div className="flex gap-5 items-center pl-4 border-l border-foreground/10">
              <a href="#" className="p-2 text-foreground/40 hover:text-primary transition-colors hover:scale-110"><Github size={22} /></a>
              <a href="#" className="p-2 text-foreground/40 hover:text-primary transition-colors hover:scale-110"><Linkedin size={22} /></a>
            </div>
          </div>
        </div>

        {/* Right Portrait (Professional Layout) */}
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto">
            {/* Geometric Decor */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-primary/20 rounded-bl-3xl" />
            
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] bg-card border border-foreground/5 group">
              <Image
                src="/thonny.jpeg"
                alt="Jean Marc Thonny"
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-105 dark:grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Status Indicator */}
              <div className="absolute top-6 left-6 px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Disponible</span>
              </div>
            </div>
            
            {/* Experience Card */}
            <div className="absolute -right-10 -bottom-10 p-6 bg-background border border-border rounded-2xl shadow-2xl hidden sm:block animate-in fade-in zoom-in duration-1000 delay-700">
               <p className="text-4xl font-black text-primary leading-none">3+</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1">Ans Expérience</p>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Background Text (Vertical) */}
      <div className="absolute right-10 bottom-10 hidden xl:flex flex-col items-center gap-6">
         <div className="w-px h-20 bg-gradient-to-b from-transparent to-foreground/20" />
         <p className="text-[10px] font-bold uppercase tracking-[1em] [writing-mode:vertical-lr] text-foreground/30">
           Curriculum Vitae / 2026
         </p>
      </div>
    </section>
  )
}
