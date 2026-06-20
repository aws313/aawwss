"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Visual identity projects with placeholder images
const identityProjects = [
  { id: 1, title: 'شعار', category: 'صيدلية  ', color: '#00d4ff', image: '/images/1.png' },
  { id: 2, title: 'شعار', category: 'شركة أثاث ', color: '#ff0080', image: '/images/2.png' },
  { id: 3, title: 'شعار', category: 'طب وعناية', color: '#8a2be2', image: '/images/3.png' },
  { id: 4, title: 'شعار', category: 'شركة مظلات ', color: '#00d4ff', image: '/images/4.png' },
  { id: 5, title: 'شعار', category: ' شركة حقائب', color: '#ff0080', image: '/images/5.png' },
  { id: 6, title: 'شعار', category: 'سفر وسياحة ', color: '#8a2be2', image: '/images/6.png' },
  { id: 7, title: 'شعار', category: 'شركة صوتيات ', color: '#00d4ff', image: '/images/7.png' },
  { id: 8, title: 'شعار', category: 'الطاقة المتجددة', color: '#ff0080', image: '/images/8.png' },
  { id: 9, title: 'شعار', category: 'شركة أبراج', color: '#8a2be2', image: '/images/9.png' },
  { id: 10, title: 'شعار', category: 'أدوات احتياطية', color: '#00d4ff', image: '/images/10.png' },
  { id: 11, title: 'شعار ', category: 'شركة تعليمية', color: '#ff0080', image: '/images/11.png' },
  { id: 12, title: 'شعار', category: 'شركة عقارية', color: '#8a2be2', image: '/images/12.png' },
]

export function SpiralGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Calculate spiral positions
  const getSpiralPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 4 // 2 full rotations
    const radius = 150 + index * 25 // Expanding spiral
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y, angle }
  }

  // Get adjacent items for expanded view
  const getAdjacentItems = (id: number) => {
    const currentIndex = identityProjects.findIndex(p => p.id === id)
    const prevIndex = (currentIndex - 1 + identityProjects.length) % identityProjects.length
    const nextIndex = (currentIndex + 1) % identityProjects.length
    return [
      identityProjects[prevIndex],
      identityProjects[currentIndex],
      identityProjects[nextIndex]
    ]
  }

  return (
    <section 
      id="identities" 
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative"
      ref={containerRef}
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">المعرض</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow-cyan">
          الهويات البصرية
        </h2>
      </motion.div>

      {/* Spiral container */}
      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
        {/* Central glow */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Spiral items */}
        {identityProjects.map((project, index) => {
          const { x, y, angle } = getSpiralPosition(index, identityProjects.length)
          const isHovered = hoveredId === project.id
          const isAdjacent = hoveredId !== null && Math.abs(identityProjects.findIndex(p => p.id === hoveredId) - index) <= 1
          
          return (
            <motion.div
              key={project.id}
              className="absolute cursor-pointer"
              style={{ 
                left: '50%', 
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? {
                opacity: 1,
                scale: isHovered ? 1.8 : isAdjacent && hoveredId !== project.id ? 1.3 : 1,
                x: x,
                y: y,
                zIndex: isHovered ? 50 : isAdjacent ? 40 : 10,
              } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                scale: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedId(project.id)}
            >
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}20 100%)`,
                  border: `2px solid ${project.color}60`,
                  boxShadow: isHovered 
                    ? `0 0 40px ${project.color}80, 0 0 80px ${project.color}40`
                    : `0 0 20px ${project.color}30`,
                }}
                animate={{
                  rotate: isHovered ? 0 : angle * (180 / Math.PI) * 0.1,
                }}
              >
                {/* Project image (if provided) */}
                {project.image && (
                  <div className="absolute inset-0">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>
                )}

                {/* Logo/letter overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: project.color }}
                  >
                    {project.title.charAt(0)}
                  </span>
                </div>
                
                {/* Hover info */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-xs md:text-sm font-semibold text-foreground text-center truncate w-full">
                        {project.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-muted-foreground truncate w-full text-center">
                        {project.category}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${project.color}20 50%, transparent 100%)`,
                    backgroundSize: '100% 10px',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '0% 100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </motion.div>
          )
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {identityProjects.map((_, index) => {
            if (index === 0) return null
            const curr = getSpiralPosition(index, identityProjects.length)
            const prev = getSpiralPosition(index - 1, identityProjects.length)
            const centerX = 400
            const centerY = 400
            return (
              <motion.line
                key={index}
                x1={centerX + prev.x}
                y1={centerY + prev.y}
                x2={centerX + curr.x}
                y2={centerY + curr.y}
                stroke="rgba(0, 212, 255, 0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            )
          })}
        </svg>
      </div>

      {/* Expanded view modal */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="flex gap-8 items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {getAdjacentItems(selectedId).map((project, i) => (
                <motion.div
                  key={project.id}
                  className={`rounded-2xl overflow-hidden ${i === 1 ? 'w-80 h-80' : 'w-48 h-48 opacity-60'}`}
                  style={{
                    background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color}20 100%)`,
                    border: `2px solid ${project.color}60`,
                    boxShadow: i === 1 
                      ? `0 0 60px ${project.color}60`
                      : `0 0 30px ${project.color}30`,
                  }}
                  initial={{ x: i === 0 ? -100 : i === 2 ? 100 : 0, opacity: 0 }}
                  animate={{ x: 0, opacity: i === 1 ? 1 : 0.6 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
                    {project.image && i === 1 && (
                      <div className="absolute inset-0">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </div>
                    )}
                    <span 
                      className={`font-bold ${i === 1 ? 'text-8xl' : 'text-4xl'}`}
                      style={{ color: project.color }}
                    >
                      {project.title.charAt(0)}
                    </span>
                    {i === 1 && (
                      <>
                        <p className="text-xl font-semibold text-foreground mt-4">{project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <p className="absolute bottom-8 text-muted-foreground text-sm">انقر في أي مكان للإغلاق</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
