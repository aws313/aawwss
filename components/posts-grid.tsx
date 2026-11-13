"use client"

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Heart, MessageCircle, Share2 } from 'lucide-react'
import { type Origin, originProps, openProps, measureOrigin, panelWidthFor } from './origin-reveal'

const posts = [
  { id: 1, title: 'شركة أبواب   ', likes: 2341, comments: 89, color: '#3b82f6', size: 'large', image: '/images/15.webp' },
  { id: 2, title: 'شركة عقارات  ', likes: 1876, comments: 56, color: '#e8eefc', size: 'medium', image: '/images/16.webp' },
  { id: 3, title: 'شركة طاقة شمسية  ', likes: 3102, comments: 124, color: '#1e3a8a', size: 'medium', image: '/images/17.webp' },
  { id: 4, title: 'شركة مزاد سيارات  ', likes: 4521, comments: 201, color: '#3b82f6', size: 'large', image: '/images/18.webp' },
  { id: 5, title: '  شركة أبراج', likes: 1543, comments: 67, color: '#e8eefc', size: 'small', image: '/images/19.webp' },
  { id: 6, title: '  منتجات طبية', likes: 2189, comments: 92, color: '#1e3a8a', size: 'small', image: '/images/20.webp' },
  { id: 7, title: 'شركة سفر وسياحة  ', likes: 3678, comments: 156, color: '#3b82f6', size: 'medium', image: '/images/21.webp' },
  { id: 8, title: '   شركة حلول برمجية', likes: 2901, comments: 111, color: '#e8eefc', size: 'large', image: '/images/22.webp' },
  { id: 9, title: ' شركة امنية', likes: 1987, comments: 78, color: '#1e3a8a', size: 'small', image: '/images/23.webp' },
  { id: 10, title: '   شركة هواتف ', likes: 4102, comments: 189, color: '#3b82f6', size: 'medium', image: '/images/24.webp' },
  { id: 11, title: ' شركة نقل وسفر', likes: 2567, comments: 98, color: '#e8eefc', size: 'small', image: '/images/25.webp' },
  { id: 12, title: '   شركة توصيل', likes: 5234, comments: 234, color: '#1e3a8a', size: 'large', image: '/images/26.webp' },
]

// Each company image is a 3x3 collage; the nine tiles are cut into /images/posts/{id}-{0..8}.webp
const tilesFor = (post: typeof posts[0]) => Array.from({ length: 9 }, (_, n) => `/images/posts/${post.id}-${n}.webp`)

export function PostsGrid() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null)
  const [selectedTile, setSelectedTile] = useState<string>('')
  const [origin, setOrigin] = useState<Origin | null>(null)
  const cardControls = useAnimation()
  const pendingOpen = useRef(false)
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Open the expanded view growing out of the tapped tile
  const openFrom = (post: typeof posts[0], tile: string, el: HTMLElement) => {
    pendingOpen.current = true
    setOrigin(measureOrigin(el, panelWidthFor(672)))
    setSelectedTile(tile)
    setSelectedPost(post)
  }

  // Animate back to the tapped post, then unmount the overlay
  const closeModal = async () => {
    if (!selectedPost) return
    if (origin) {
      await cardControls.start({ ...originProps(origin), transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } })
    }
    setSelectedPost(null)
  }

  // When the overlay mounts from a tap, start the panel at the post's position
  useEffect(() => {
    if (!selectedPost || !origin || !pendingOpen.current) return
    pendingOpen.current = false
    cardControls.set(originProps(origin))
    cardControls.start({ ...openProps, transition: { type: 'spring', stiffness: 170, damping: 22 } })
  }, [selectedPost, origin, cardControls])

  // Escape closes, and the page does not scroll behind the overlay
  useEffect(() => {
    if (!selectedPost) return
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost])

  return (
    <section 
      ref={containerRef}
      id="posts" 
      className="min-h-screen py-20 px-4"
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">المعرض</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow-magenta">
          منشورات مميزة
        </h2>
      </motion.div>

      {/* One horizontal strip per company, each showing its nine tiles. All strips move at once,
          alternating direction. Hovering a strip pauses it; tapping a tile opens it in place. */}
      <div className="space-y-4 md:space-y-6">
        {posts.map((post, bi) => (
          <div key={post.id} className="posts-band overflow-hidden">
            <div className={`posts-track flex gap-3 md:gap-4 pe-3 md:pe-4 w-max ${bi % 2 === 0 ? 'posts-track-left' : 'posts-track-right'}`}>
              {[...tilesFor(post), ...tilesFor(post)].map((tile, i) => (
                <button
                  key={`${post.id}-${i}`}
                  type="button"
                  aria-label={post.title}
                  onClick={(e) => openFrom(post, tile, e.currentTarget as HTMLElement)}
                  className="relative shrink-0 w-40 md:w-56 aspect-square rounded-xl overflow-hidden border"
                  style={{ borderColor: `${post.color}40` }}
                >
                  <Image src={tile} alt={post.title} fill sizes="(min-width: 768px) 224px, 160px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Expanded view: grows out of the tapped post. Rendered in a portal so page-level
          transforms cannot shift the fixed overlay away from the viewport. */}
      {mounted && createPortal(<AnimatePresence>
        {selectedPost && (
          <motion.div
            key="post-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-lg p-4"
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
            <motion.div
              className="max-w-2xl w-full rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${selectedPost.color}20 0%, ${selectedPost.color}05 100%)`,
                border: `2px solid ${selectedPost.color}50`,
                boxShadow: `0 0 80px ${selectedPost.color}40`,
              }}
              animate={cardControls}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image area */}
              <div className="aspect-square max-h-[70vh] mx-auto relative bg-black">
                {selectedPost.image && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Image
                      src={selectedTile}
                      alt={selectedPost.title}
                      width={1600}
                      height={900}
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(${selectedPost.color}40 1px, transparent 1px),
                      linear-gradient(90deg, ${selectedPost.color}40 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedPost.title}</h3>
                <p className="text-muted-foreground mb-4">
                  استكشاف اللون والشكل والجماليات الرقمية التي تدفع حدود التصميم البصري.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Heart className="w-5 h-5" style={{ color: selectedPost.color }} />
                      {selectedPost.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" style={{ color: selectedPost.color }} />
                      {selectedPost.comments}
                    </span>
                    <span className="flex items-center gap-2">
                      <Share2 className="w-5 h-5" style={{ color: selectedPost.color }} />
                      مشاركة
                    </span>
                  </div>
                    <motion.button
                      className="px-6 py-2 rounded-full font-medium"
                      style={{
                        background: selectedPost.color,
                        color: '#000',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      عرض المشروع بالكامل
                    </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </section>
  )
}
