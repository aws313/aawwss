"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence, useAnimation } from 'framer-motion'

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

// Position of the tapped logo, relative to the viewport centre, and its scale
type Origin = { dx: number; dy: number; scale: number }

const originProps = (o: Origin) => ({ x: o.dx, y: o.dy, scale: o.scale, opacity: 0.6, rotate: -8 })
const openProps = { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }

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
  const [origin, setOrigin] = useState<Origin | null>(null)
  const [swapDir, setSwapDir] = useState<1 | -1>(1)
  const cardControls = useAnimation()
  const pendingOpen = useRef(false)
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const selected = identityProjects.find(p => p.id === selectedId) ?? null
  const selectedIndex = selected ? identityProjects.findIndex(p => p.id === selected.id) : -1
  const prevProject = selected ? identityProjects[(selectedIndex - 1 + identityProjects.length) % identityProjects.length] : null
  const nextProject = selected ? identityProjects[(selectedIndex + 1) % identityProjects.length] : null

  // Open the expanded view growing out of the tapped logo
  const openFrom = (id: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    const target = window.innerWidth >= 768 ? 340 : 240
    pendingOpen.current = true
    setSwapDir(1)
    setOrigin({
      dx: r.left + r.width / 2 - window.innerWidth / 2,
      dy: r.top + r.height / 2 - window.innerHeight / 2,
      scale: r.width / target,
    })
    setSelectedId(id)
  }

  // Animate back to the tapped logo, then unmount the overlay
  const closeModal = async () => {
    if (selectedId === null) return
    if (origin) {
      await cardControls.start({ ...originProps(origin), transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } })
    }
    setSelectedId(null)
  }

  // Switch to a neighbouring logo while the overlay stays open
  const goTo = (id: number, dir: 1 | -1) => {
    setSwapDir(dir)
    setSelectedId(id)
  }

  // When the overlay mounts from a tap, start the card at the logo's position
  useEffect(() => {
    if (selectedId === null || !origin || !pendingOpen.current) return
    pendingOpen.current = false
    cardControls.set(originProps(origin))
    cardControls.start({ ...openProps, transition: { type: 'spring', stiffness: 170, damping: 22 } })
  }, [selectedId, origin, cardControls])

  // Escape closes, and the page does not scroll behind the overlay
  useEffect(() => {
    if (selectedId === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
    // closeModal is recreated per render; the listener only needs the current selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

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
                    onClick={(e) => openFrom(project.id, e.currentTarget as HTMLElement)}
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

      {/* Expanded view: grows out of the tapped logo */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="identity-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeModal}
          >
            <button
              type="button"
              aria-label="إغلاق"
              onClick={(e) => { e.stopPropagation(); closeModal() }}
              className="fixed top-5 end-5 z-10 w-11 h-11 rounded-full border border-white/20 bg-background/70 text-foreground text-2xl leading-none flex items-center justify-center"
            >
              ×
            </button>

            <div
              className="relative w-60 h-60 md:w-[340px] md:h-[340px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Expanded logo card */}
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden bg-background"
                style={{
                  border: `2px solid ${selected.color}99`,
                  boxShadow: `0 0 60px ${selected.color}60, 0 0 120px ${selected.color}25`,
                }}
                animate={cardControls}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selected.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: swapDir * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -swapDir * 60 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Image
                      src={selected.image}
                      alt={selected.title}
                      fill
                      sizes="340px"
                      className="object-contain p-8"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Caption and neighbours sit below the card */}
              <motion.div
                className="absolute top-full mt-8 inset-x-0 flex flex-col items-center gap-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{selected.title}</p>
                  <p className="text-sm text-muted-foreground">{selected.category}</p>
                </div>

                <div className="flex items-center gap-4">
                  {[prevProject, nextProject].map((p, i) =>
                    p ? (
                      <motion.button
                        key={p.id}
                        type="button"
                        aria-label={`عرض ${p.category}`}
                        onClick={(e) => { e.stopPropagation(); goTo(p.id, i === 0 ? -1 : 1) }}
                        whileHover={{ scale: 1.08, opacity: 1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-background/60 opacity-70"
                        style={{ border: `2px solid ${p.color}66` }}
                      >
                        <Image src={p.image} alt={p.title} fill sizes="96px" className="object-contain p-2" />
                      </motion.button>
                    ) : null
                  )}
                </div>
              </motion.div>
            </div>

            <p className="fixed bottom-6 text-muted-foreground text-xs">انقر خارج الشعار أو اضغط Esc للإغلاق</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
