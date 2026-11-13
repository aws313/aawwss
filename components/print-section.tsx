"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import Image from 'next/image'

// Print, branding and company-profile work
const prints = [
  { src: '/images/print/1.webp', alt: 'ستاند عرض لمنتجات بوب كورن' },
  { src: '/images/print/2.webp', alt: 'ستاند عرض لمنتجات جيلي بي الكوري' },
  { src: '/images/print/3.webp', alt: 'ستاند عرض لمنتجات ياشكينو' },
  { src: '/images/print/4.webp', alt: 'بانر رول أب لشركة الدبوس' },
  { src: '/images/print/5.webp', alt: 'بانر رول أب لجيلي بي الكوري' },
  { src: '/images/print/6.webp', alt: 'بروفايل شركة الدبوس للتجارة العامة' },
  { src: '/images/print/7.webp', alt: 'بروفايل شركة سما كربلاء لشبكات الغاز' },
  { src: '/images/print/8.webp', alt: 'بروفايل شركة هندسة بوابة العراق' },
  { src: '/images/print/9.webp', alt: 'مجلد أمانة بغداد دائرة الوحدات الإنتاجية' },
]

export function PrintSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Escape closes the viewer, and the page does not scroll behind it
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenIndex(null) }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex])

  const current = openIndex !== null ? prints[openIndex] : null

  return (
    <section ref={containerRef} id="print" className="min-h-screen py-20 px-4">
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">المطبوعات</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow-cyan">
          المطبوعات والبراندنج والبروفايلات
        </h2>
      </motion.div>

      {/* Rotating disc of the nine pieces. Hovering pauses it; tapping a piece opens it. */}
      <motion.div
        className="print-stage relative w-full max-w-5xl mx-auto h-[330px] md:h-[600px] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="print-glow" />
        <div className="print-ring">
          {prints.map((item, i) => (
            <div
              key={item.src}
              className="print-card"
              style={{ transform: `rotateY(${i * (360 / prints.length)}deg) translateZ(var(--print-radius))` }}
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  aria-label={item.alt}
                  onClick={() => setOpenIndex(i)}
                  className="print-face relative overflow-hidden rounded-xl md:rounded-2xl border border-primary/30 bg-card cursor-pointer"
                >
                  <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 280px, 150px" className="object-cover" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <p className="mt-6 text-center text-muted-foreground text-xs tracking-wide">مرّر المؤشر لإيقاف الدوران، وانقر لعرض التفاصيل</p>

      {/* Viewer: rendered in a portal so page transforms cannot shift the fixed overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {current && (
            <motion.div
              key="print-viewer"
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenIndex(null)}
            >
              <button
                type="button"
                aria-label="إغلاق"
                onClick={(e) => { e.stopPropagation(); setOpenIndex(null) }}
                className="fixed top-5 end-5 z-10 w-11 h-11 rounded-full border border-white/20 bg-background/70 text-foreground text-2xl leading-none flex items-center justify-center"
              >
                ×
              </button>
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                className="relative w-full max-w-3xl h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={current.src} alt={current.alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
