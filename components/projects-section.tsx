"use client"

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Play, Eye } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: "Quantum Interface",
    category: "شعارات الشركات  ",
    description: "نظام هوية مستقبلية لشركة حوسبة كمومية، يتضمن عناصر هولوجرافية وحركة ديناميكية.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    color: "oklch(0.75 0.18 195)",
    tags: ["Branding", "Motion", "3D"],
    stats: { views: "24K", likes: "1.2K" }
  },
  {
    id: 2,
    title: "Neural Dreams",
    category: "فن رقمي",
    description: "مجموعة فنية مولّدة بالذكاء الاصطناعي تستكشف حدود الإبداع البشري وتعلم الآلة.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&h=600&fit=crop",
    color: "oklch(0.65 0.25 330)",
    tags: ["AI Art", "Generative", "NFT"],
    stats: { views: "56K", likes: "3.8K" }
  },
  {
    id: 3,
    title: "Cyber Metropolis",
    category: "تصميم واجهات وتجربة المستخدم",
    description: "تجربة ويب غامرة لمدينة واقع افتراضي، مع تفاعلات ثلاثية الأبعاد في الوقت الفعلي.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    color: "oklch(0.7 0.2 145)",
    tags: ["WebGL", "Interactive", "VR"],
    stats: { views: "18K", likes: "980" }
  },
  {
    id: 4,
    title: "Pulse Protocol",
    category: "تصميم حركة",
    description: "هوية بصرية حركية لمنصة تكنولوجيا صحية، تتميز برسوم متحركة مستلهمة من القياسات الحيوية.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    color: "oklch(0.6 0.2 280)",
    tags: ["Motion", "Healthcare", "Animation"],
    stats: { views: "31K", likes: "2.1K" }
  },
  {
    id: 5,
    title: "Astral Projection",
    category: "رسوم توضيحية",
    description: "سلسلة رسوم كونية تصور الرحلة الإنسانية عبر الفضاء والوعي.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop",
    color: "oklch(0.75 0.2 85)",
    tags: ["Illustration", "Space", "Digital"],
    stats: { views: "42K", likes: "2.9K" }
  },
  {
    id: 6,
    title: "Neon Genesis",
    category: "حملة",
    description: "حملة إعلانية متعددة المنصات لعلامة مركبات كهربائية، بطابع سايبربنك.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=600&fit=crop",
    color: "oklch(0.75 0.18 195)",
    tags: ["Advertising", "EV", "Campaign"],
    stats: { views: "67K", likes: "4.5K" }
  }
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl glass-card"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
            crossOrigin="anonymous"
          />
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80"
          />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `linear-gradient(135deg, ${project.color}40 0%, oklch(0.08 0.02 270 / 0.9) 100%)`
            }}
          >
            <motion.button
              className="w-12 h-12 rounded-full flex items-center justify-center bg-foreground/10 backdrop-blur-sm border border-foreground/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 text-foreground fill-foreground" />
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-full flex items-center justify-center bg-foreground/10 backdrop-blur-sm border border-foreground/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5 text-foreground" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="px-2 py-1 rounded-full text-xs font-mono bg-background/50 backdrop-blur-sm flex items-center gap-1">
              <Eye className="w-3 h-3" /> {project.stats.views}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <span 
            className="text-xs font-mono tracking-wider uppercase"
            style={{ color: project.color }}
          >
            {project.category}
          </span>
          <h3 className="text-xl font-bold mt-2 text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full border border-border bg-secondary/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? `0 0 40px ${project.color}30, inset 0 0 40px ${project.color}10`
              : 'none'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-10%" })
  const [xOffset, setXOffset] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height
      
      const start = windowHeight
      const end = -elementHeight
      const current = rect.top
      const progressValue = Math.max(0, Math.min(1, (start - current) / (start - end)))
      setXOffset(progressValue * -100)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView])

  return (
    <div ref={containerRef} className="relative py-32 px-4" id="work">
      {/* Decorative text */}
      <motion.div 
        className="absolute top-20 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ x: xOffset }}
      >
        <span className="text-[15vw] font-bold text-foreground/[0.02] whitespace-nowrap">
          المشاريع • أعمال • تصاميم •
        </span>
      </motion.div>

      {/* Section header */}
      <motion.div
        className="text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-accent font-mono text-sm tracking-[0.3em] uppercase">المعرض</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-glow-magenta">
          أعمال مختارة
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          مجموعة مختارة من المشاريع التي تدفع حدود الإبداع
        </p>
      </motion.div>

      {/* Projects grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* View all button */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.button
          className="px-8 py-4 rounded-lg border border-primary/30 text-primary font-semibold tracking-wider uppercase text-sm relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
          <span className="relative z-10">عرض كل المشاريع</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
