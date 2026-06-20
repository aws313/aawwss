"use client"

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Heart, MessageCircle, Share2 } from 'lucide-react'

const posts = [
  { id: 1, title: 'شركة أبواب   ', likes: 2341, comments: 89, color: '#00d4ff', size: 'large', image: '/images/15.webp' },
  { id: 2, title: 'شركة عقارات  ', likes: 1876, comments: 56, color: '#ff0080', size: 'medium', image: '/images/16.webp' },
  { id: 3, title: 'شركة طاقة شمسية  ', likes: 3102, comments: 124, color: '#8a2be2', size: 'medium', image: '/images/17.webp' },
  { id: 4, title: 'شركة مزاد سيارات  ', likes: 4521, comments: 201, color: '#00d4ff', size: 'large', image: '/images/18.webp' },
  { id: 5, title: '  شركة أبراج', likes: 1543, comments: 67, color: '#ff0080', size: 'small', image: '/images/19.webp' },
  { id: 6, title: '  منتجات طبية', likes: 2189, comments: 92, color: '#8a2be2', size: 'small', image: '/images/20.webp' },
  { id: 7, title: 'شركة سفر وسياحة  ', likes: 3678, comments: 156, color: '#00d4ff', size: 'medium', image: '/images/21.webp' },
  { id: 8, title: '   شركة حلول برمجية', likes: 2901, comments: 111, color: '#ff0080', size: 'large', image: '/images/22.webp' },
  { id: 9, title: ' شركة امنية', likes: 1987, comments: 78, color: '#8a2be2', size: 'small', image: '/images/23.webp' },
  { id: 10, title: '   شركة هواتف ', likes: 4102, comments: 189, color: '#00d4ff', size: 'medium', image: '/images/24.webp' },
  { id: 11, title: ' شركة نقل وسفر', likes: 2567, comments: 98, color: '#ff0080', size: 'small', image: '/images/25.webp' },
  { id: 12, title: '   شركة توصيل', likes: 5234, comments: 234, color: '#8a2be2', size: 'large', image: '/images/26.webp' },
]

export function PostsGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null)
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Generate random floating positions
  const getFloatingStyle = (index: number, size: string) => {
    const baseSize = size === 'large' ? 280 : size === 'medium' ? 220 : 160
    const randomX = Math.sin(index * 1.5) * 20
    const randomY = Math.cos(index * 1.2) * 15
    return {
      width: baseSize,
      height: baseSize,
      x: randomX,
      y: randomY,
    }
  }

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

      {/* Floating grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post, index) => {
            const floatStyle = getFloatingStyle(index, post.size)
            const isHovered = hoveredId === post.id

            return (
              <motion.div
                key={post.id}
                className={`relative cursor-pointer ${
                  post.size === 'large' ? 'col-span-2 row-span-2' : 
                  post.size === 'medium' ? 'col-span-1 row-span-2 md:col-span-1' : 
                  'col-span-1 row-span-1'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  x: isHovered ? 0 : floatStyle.x,
                } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  x: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                }}
                onHoverStart={() => setHoveredId(post.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => setSelectedPost(post)}
              >
                <motion.div
                  className="w-full h-full min-h-[200px] md:min-h-[250px] rounded-2xl overflow-hidden relative"
                  style={{
                    background: `linear-gradient(135deg, ${post.color}30 0%, ${post.color}10 100%)`,
                    border: `1px solid ${post.color}40`,
                  }}
                  animate={{
                    boxShadow: isHovered 
                      ? `0 0 40px ${post.color}50, 0 0 80px ${post.color}30, inset 0 0 30px ${post.color}20`
                      : `0 0 20px ${post.color}20`,
                    scale: isHovered ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  {post.image && (
                    <div className="absolute inset-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                    </div>
                  )}

                  {/* Grid pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(${post.color}40 1px, transparent 1px),
                        linear-gradient(90deg, ${post.color}40 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  {/* Hover overlay */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.p
                          className="text-foreground font-semibold text-center text-sm md:text-base mb-4"
                          initial={{ y: 10 }}
                          animate={{ y: 0 }}
                        >
                          {post.title}
                        </motion.p>
                        <div className="flex gap-4 text-muted-foreground text-xs md:text-sm">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" style={{ color: post.color }} />
                            {post.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" style={{ color: post.color }} />
                            {post.comments}
                          </span>
                        </div>
                        <motion.div
                          className="mt-4 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2"
                          style={{
                            background: `${post.color}20`,
                            border: `1px solid ${post.color}40`,
                            color: post.color,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <ExternalLink className="w-3 h-3" />
                          عرض المشروع
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Floating particles */}
                  {isHovered && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{ background: post.color }}
                          initial={{ 
                            x: '50%', 
                            y: '50%', 
                            opacity: 0 
                          }}
                          animate={{ 
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: [0, 1, 0],
                          }}
                          transition={{ 
                            duration: 1.5, 
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Expanded view modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="max-w-2xl w-full rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${selectedPost.color}20 0%, ${selectedPost.color}05 100%)`,
                border: `2px solid ${selectedPost.color}50`,
                boxShadow: `0 0 80px ${selectedPost.color}40`,
              }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image area */}
              <div className="aspect-video relative bg-black">
                {selectedPost.image && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Image
                      src={selectedPost.image}
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
      </AnimatePresence>
    </section>
  )
}
