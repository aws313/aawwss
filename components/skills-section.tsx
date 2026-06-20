"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Palette, 
  Layers, 
  MonitorPlay, 
  Sparkles, 
  Code2, 
  Camera,
  Figma,
  PenTool
} from 'lucide-react'

const skills = [
  { name: "هويات بصرية", level: 95, icon: Palette, color: "oklch(0.75 0.18 195)" },
  { name: "تصميم واجهات وتجربة المستخدم", level: 90, icon: Layers, color: "oklch(0.65 0.25 330)" },
  { name: "تصميم الحركة", level: 88, icon: MonitorPlay, color: "oklch(0.7 0.2 145)" },
  { name: "ثلاثي الأبعاد وWebGL", level: 82, icon: Sparkles, color: "oklch(0.6 0.2 280)" },
  { name: "تطوير الواجهة الأمامية", level: 75, icon: Code2, color: "oklch(0.75 0.2 85)" },
  { name: "التصوير", level: 85, icon: Camera, color: "oklch(0.75 0.18 195)" },
]

const tools = [
  { name: "Figma", icon: Figma },
  { name: "Illustrator", icon: PenTool },
  { name: "After Effects", icon: MonitorPlay },
  { name: "Blender", icon: Sparkles },
  { name: "React", icon: Code2 },
  { name: "Three.js", icon: Layers },
]

function SkillBar({ skill, index }: { skill: typeof skills[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const Icon = skill.icon

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ 
              background: `${skill.color}20`,
              boxShadow: `0 0 20px ${skill.color}20`
            }}
          >
            <Icon className="w-5 h-5" style={{ color: skill.color }} />
          </div>
          <span className="font-medium text-foreground">{skill.name}</span>
        </div>
        <span 
          className="font-mono text-sm"
          style={{ color: skill.color }}
        >
          {skill.level}%
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}80 100%)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${skill.color}60 0%, transparent 100%)`,
            filter: 'blur(4px)'
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

function RadialChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const data = [
    { label: "الإبداع", value: 95, color: "oklch(0.75 0.18 195)" },
    { label: "تقني", value: 85, color: "oklch(0.65 0.25 330)" },
    { label: "التواصل", value: 90, color: "oklch(0.7 0.2 145)" },
    { label: "حل المشكلات", value: 88, color: "oklch(0.6 0.2 280)" },
    { label: "القيادة", value: 82, color: "oklch(0.75 0.2 85)" },
  ]

  const centerX = 150
  const centerY = 150
  const maxRadius = 120

  return (
    <div ref={ref} className="relative w-[300px] h-[300px] mx-auto">
      <svg width="300" height="300" className="overflow-visible">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={maxRadius * scale}
            fill="none"
            stroke="oklch(0.25 0.03 270)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        
        {/* Data polygon */}
        <motion.polygon
          points={data.map((d, i) => {
            const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2
            const radius = (d.value / 100) * maxRadius
            return `${centerX + Math.cos(angle) * radius},${centerY + Math.sin(angle) * radius}`
          }).join(' ')}
          fill="oklch(0.75 0.18 195 / 0.2)"
          stroke="oklch(0.75 0.18 195)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />
        
        {/* Data points */}
        {data.map((d, i) => {
          const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2
          const radius = (d.value / 100) * maxRadius
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius
          const labelX = centerX + Math.cos(angle) * (maxRadius + 30)
          const labelY = centerY + Math.sin(angle) * (maxRadius + 30)
          
          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r="6"
                fill={d.color}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                style={{ filter: `drop-shadow(0 0 8px ${d.color})` }}
              />
              <motion.text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                {d.label}
              </motion.text>
            </g>
          )
        })}
      </svg>
      
      {/* Center label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="text-center">
          <span className="text-3xl font-bold text-primary">88</span>
          <span className="block text-xs text-muted-foreground">Avg Score</span>
        </div>
      </motion.div>
    </div>
  )
}

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section ref={containerRef} className="relative py-32 px-4" id="skills">
      {/* Section header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-chart-3 font-mono text-sm tracking-[0.3em] uppercase">المهارات</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
          <span className="text-foreground">المهارات </span>
          <span className="text-glow-cyan text-primary">والقدرات</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          مزيج من الرؤية الإبداعية والكفاءة التقنية
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Skill bars */}
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          {/* Radial chart */}
          <div className="flex flex-col items-center">
            <RadialChart />
            
            {/* Tools */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-sm text-muted-foreground block text-center mb-4">الأدوات والتقنيات</span>
              <div className="flex flex-wrap justify-center gap-4">
                {tools.map((tool, i) => {
                  const Icon = tool.icon
                  return (
                    <motion.div
                      key={tool.name}
                      className="group flex items-center gap-2 px-4 py-2 rounded-lg glass-card cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 20px oklch(0.75 0.18 195 / 0.3)'
                      }}
                    >
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {tool.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
