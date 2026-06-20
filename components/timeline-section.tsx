"use client"

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Award, GraduationCap, Rocket } from 'lucide-react'

const experiences = [
  {
    year: "2024",
    title: "مدير إبداعي أول",
    company: "Neon Studios",
    description: "قيادة فريق مكوّن من 12 مصممًا لإنشاء تجارب علامة تجارية غامرة لعملاء من فورتشن 500.",
    icon: Rocket,
    color: "oklch(0.75 0.18 195)"
  },
  {
    year: "2022",
    title: "مصمم بصري أول",
    company: "Digital Frontier",
    description: "صممت حملات حائزة على جوائز حققت أكثر من 50 مليون ظهور عبر المنصات الرقمية.",
    icon: Award,
    color: "oklch(0.65 0.25 330)"
  },
  {
    year: "2020",
    title: "مصمم هوية",
    company: "Pixel Perfect Agency",
    description: "ابتكرت هويات بصرية لأكثر من 30 شركة ناشئة، مع التركيز على الجمالية البسيطة والمستقبلية.",
    icon: Briefcase,
    color: "oklch(0.7 0.2 145)"
  },
  {
    year: "2018",
    title: "درجة في التصميم",
    company: "School of Visual Arts",
    description: "تخرجت مع مرتبة الشرف في التصميم الغرافيكي مع تركيز على الوسائط التفاعلية والموشن جرافيك.",
    icon: GraduationCap,
    color: "oklch(0.6 0.2 280)"
  }
]

function TimelineItem({ experience, index }: { experience: typeof experiences[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = experience.icon
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:text-left`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
        <motion.div
          className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: `inset 0 0 30px ${experience.color}20, 0 0 30px ${experience.color}10`
            }}
          />
          
          <span 
            className="text-sm font-mono tracking-wider"
            style={{ color: experience.color }}
          >
            {experience.year}
          </span>
          <h3 className="text-xl md:text-2xl font-bold mt-2 text-foreground">
            {experience.title}
          </h3>
          <p 
            className="text-sm mt-1"
            style={{ color: experience.color }}
          >
            {experience.company}
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed text-sm md:text-base">
            {experience.description}
          </p>
        </motion.div>
      </div>

      {/* Center dot */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${experience.color}40 0%, ${experience.color}10 100%)`,
            boxShadow: `0 0 30px ${experience.color}30, inset 0 0 20px ${experience.color}20`
          }}
        >
          <Icon 
            className="w-6 h-6" 
            style={{ color: experience.color }}
          />
        </div>
      </motion.div>

      {/* Empty space for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-20%" })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height
      
      // Calculate progress based on element position
      const start = windowHeight
      const end = -elementHeight
      const current = rect.top
      const progressValue = Math.max(0, Math.min(1, (start - current) / (start - end)))
      setProgress(progressValue)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView])

  return (
    <div ref={containerRef} className="relative py-32 px-4" id="experience">
      {/* Section header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-primary font-mono text-sm tracking-[0.3em] uppercase">المسار</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-glow-cyan">
          الخبرات
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          جدول زمني للمعالم الإبداعية والنمو المهني
        </p>
      </motion.div>

      {/* Timeline container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Animated line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
          <div className="absolute inset-0 bg-border" />
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-accent to-primary"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {/* Timeline items */}
        <div className="space-y-12 md:space-y-24">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
