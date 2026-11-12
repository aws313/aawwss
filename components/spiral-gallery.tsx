"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Visual identity projects
const identityProjects = [
  { id: 1, title: 'شعار', category: 'صيدلية  ', color: '#00d4ff', image: '/images/1.webp' },
  { id: 2, title: 'شعار', category: 'شركة أثاث ', color: '#ff0080', image: '/images/2.webp' },
  { id: 3, title: 'شعار', category: 'طب وعناية', color: '#8a2be2', image: '/images/3.webp' },
  { id: 4, title: 'شعار', category: 'شركة مظلات ', color: '#00d4ff', image: '/images/4.webp' },
  { id: 5, title: 'شعار', category: ' شركة حقائب', color: '#ff0080', image: '/images/5.webp' },
  { id: 6, title: 'شعار', category: 'سفر وسياحة ', color: '#8a2be2', image: '/images/6.webp' },
  { id: 7, title: 'شعار', category: 'شركة صوتيات ', color: '#00d4ff', image: '/images/7.webp' },
  { id: 8, title: 'شعار', category: 'الطاقة المتجددة', color: '#ff0080', image: '/images/8.webp' },
  { id: 9, title: 'شعار', category: 'شركة أبراج', color: '#8a2be2', image: '/images/9.webp' },
  { id: 10, title: 'شعار', category: 'أدوات احتياطية', color: '#00d4ff', image: '/images/10.webp' },
  { id: 11, title: 'شعار ', category: 'شركة تعليمية', color: '#ff0080', image: '/images/11.webp' },
  { id: 12, title: 'شعار', category: 'شركة عقارية', color: '#8a2be2', image: '/images/12.webp' },
]

const STEP_DEG = 360 / identityProjects.length

// Cylinder carousel styles: cards sit on a ring that turns backward.
// Hovering the ring pauses it so a logo can be inspected.
const ringStyles = `
  .identity-stage {
    perspective: 1400px;
    --ring-radius: 150px;
  }
  .identity-face {
    width: 88px;
    height: 88px;
  }
  @media (min-width: 768px) {
    .identity-stage { --ring-radius: 360px; }
    .identity-face { width: 208px; height: 208px; }
  }
  .identity-ring {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    transform-style: preserve-3d;
    animation: identity-spin 36s linear infinite;
  }
  .identity-stage:hover .identity-ring {
    animation-play-state: paused;
  }
  .identity-card {
    position: absolute;
    left: 0;
    top: 0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform;
  }
  @keyframes identity-spin {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(-360deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .identity-ring { animation: none; }
  }
`

export function SpiralGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

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
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden"
      ref={containerRef}
    >
      <style>{ringStyles}</style>

      {/* Section title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">المعرض</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow-cyan">
          الهويات البصرية
        </h2>
      </motion.div>

      {/* Rotating ring of logos */}
      <motion.div
        className="identity-stage relative w-full max-w-5xl h-[230px] md:h-[420px] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Soft glow beneath the ring */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-16 rounded-full blur-2xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.35) 0%, transparent 70%)' }}
        />

        <div className="identity-ring">
          {identityProjects.map((project, index) => {
            const isHovered = hoveredId === project.id
            return (
              <div
                key={project.id}
                className="identity-card"
                style={{
                  transform: `rotateY(${index * STEP_DEG}deg) translateZ(var(--ring-radius))`,
                }}
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="identity-face relative rounded-2xl overflow-hidden cursor-pointer bg-background"
                  style={{
                    border: `2px solid ${project.color}${isHovered ? 'cc' : '55'}`,
                    boxShadow: isHovered
                      ? `0 0 40px ${project.color}90, 0 0 80px ${project.color}40`
                      : `0 0 24px ${project.color}35`,
                  }}
                  animate={{ scale: isHovered ? 1.12 : 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => setSelectedId(project.id)}
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 208px, 88px"
                      className="object-contain p-2 md:p-4"
                    />
                  )}

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-x-0 bottom-0 bg-background/85 backdrop-blur-sm flex flex-col items-center justify-center py-2 px-2"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="text-xs md:text-sm font-semibold text-foreground truncate w-full text-center">
                          {project.title}
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground truncate w-full text-center">
                          {project.category}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <p className="mt-6 text-muted-foreground text-xs tracking-wide">مرّر المؤشر لإيقاف الدوران، وانقر لعرض التفاصيل</p>

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
                        <Image src={project.image} alt={project.title} fill className="object-contain p-6" />
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
