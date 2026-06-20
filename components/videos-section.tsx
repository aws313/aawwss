"use client"

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2, Clock, Eye } from 'lucide-react'

const videos = [
  { 
    id: 1, 
    title: 'فديو مجمع داماك', 
    duration: '2:34', 
    views: '12.4K',
    category: 'فديو اعلان ',
    color: '#00d4ff',
  featured: true,
  src: '/video/1.mp4',
  poster: '/video/1.jpg'
  },
  { 
    id: 2, 
    title: 'فديو شركة تصميم ', 
    duration: '1:45', 
    views: '8.7K',
    category: 'فديو موشن',
    color: '#ff0080',
  featured: false,
  src: '/video/2.mp4',
  poster: '/video/2.jpg'
  },
  { 
    id: 3, 
    title: 'فديو شركة الدبوس للتوزيع', 
    duration: '3:12', 
    views: '15.2K',
    category: 'فديو اعلان مع موشن',
    color: '#8a2be2',
  featured: false,
  src: '/video/3.mp4',
  poster: '/video/3.jpg'
  },
  { 
    id: 4, 
    title: '3D Product Visualization', 
    duration: '2:08', 
    views: '9.3K',
    category: '3D Design',
    color: '#00d4ff',
    featured: false 
  },
  { 
    id: 5, 
    title: 'Typography in Motion', 
    duration: '1:56', 
    views: '11.1K',
    category: 'Typography',
    color: '#ff0080',
    featured: false 
  },
  { 
    id: 6, 
    title: 'Abstract Visual Journey', 
    duration: '4:21', 
    views: '18.9K',
    category: 'Experimental',
    color: '#8a2be2',
    featured: false 
  },
]

export function VideosSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const featuredVideo = videos.find(v => v.featured)
  const otherVideos = videos.filter(v => !v.featured)

  // Prepare slots: 3 left (16:9) and 10 right (portrait 9:16)
  const leftSlots = Array.from({ length: 3 }).map((_, i) => videos[i % videos.length])
  // Build rightSlots from actual files 4..13 (ten portrait videos)
  const rightTitles: Record<number, string> = {
    4: 'شركة أبواب',
    5: 'شركة هواتف',
    6: 'شركة أبواب',
    7: 'موشن سياسي',
    8: 'شركة طباخات',
    9: 'شركة منتجات',
    10: 'منتجات طبية',
    11: 'شركة نضارات',
    12: 'شركة هواتف',
    13: 'شركة مصاعد نفذها',
  }

  const rightSlots = Array.from({ length: 10 }).map((_, i) => {
    const num = 4 + i // 4..13
    const colorCycle = ['#ff0080', '#8a2be2', '#00d4ff']
    return {
      id: num,
      title: rightTitles[num] ?? `فيديو ${num}`,
      duration: '0:30',
      views: '1.2K',
      category: 'عرض',
      color: colorCycle[i % colorCycle.length],
      featured: false,
      src: `/video/${num}.mp4`,
      poster: `/video/${num}.jpg`,
    }
  })

  return (
    <section 
      ref={containerRef}
      id="videos" 
      className="min-h-screen py-20 px-4"
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[oklch(0.6_0.2_280)] text-sm tracking-[0.3em] uppercase mb-4">عرض الأعمال</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-glow-cyan">أعمال</span>{' '}
          <span className="text-glow-magenta">الحركة</span>
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column: 3 wide 16:9 slots stacked */}
          <div className="flex-1 flex flex-col gap-6">
            {leftSlots.map((video, i) => (
              <motion.div
                key={`left-${i}-${video.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                onHoverStart={() => {
                  setHoveredId(video.id)
                  const el = document.getElementById(`preview-${video.id}`) as HTMLVideoElement | null
                  if (el) { el.play().catch(() => {}) }
                }}
                onHoverEnd={() => {
                  setHoveredId(null)
                  const el = document.getElementById(`preview-${video.id}`) as HTMLVideoElement | null
                  if (el) { el.pause(); el.currentTime = 0 }
                }}
                onClick={() => setSelectedVideo(video)}
                className="cursor-pointer"
              >
                <motion.div
                  className="w-full rounded-2xl overflow-hidden relative h-40 md:h-48 lg:h-56"
                  style={{
                    background: `linear-gradient(135deg, ${video.color}20 0%, ${video.color}05 100%)`,
                    border: `1px solid ${video.color}30`,
                  }}
                  animate={{
                    boxShadow: hoveredId === video.id ? `0 0 40px ${video.color}40` : `0 0 20px ${video.color}10`,
                    scale: hoveredId === video.id ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Preview video or placeholder */}
                  {video.src ? (
                    <video
                      id={`preview-${video.id}`}
                      src={video.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: `${video.color}30`, border: `2px solid ${video.color}60` }}
                        animate={{ scale: hoveredId === video.id ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: hoveredId === video.id ? Infinity : 0 }}
                      >
                        <Play className="w-6 h-6 ml-0.5" style={{ color: video.color }} fill="currentColor" />
                      </motion.div>
                    </div>
                  )}
                  <div 
                    className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium"
                    style={{ background: 'rgba(0,0,0,0.7)', color: video.color }}
                  >
                    {video.duration}
                  </div>
                </motion.div>

                <div className="mt-3">
                  <h4 className="font-semibold text-foreground">{video.title}</h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                    <span>{video.category}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views} مشاهدة
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right column: 10 portrait slots arranged 2 cols x 5 rows, smaller */}
          <div className="w-full md:w-1/4">
            <div className="grid grid-cols-2 gap-3">
              {rightSlots.map((video, i) => (
                <motion.div
                  key={`right-${i}-${video.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.05 + i * 0.03 }}
                  onHoverStart={() => {
                    setHoveredId(video.id)
                    const el = document.getElementById(`preview-${video.id}`) as HTMLVideoElement | null
                    if (el) { el.play().catch(() => {}) }
                  }}
                  onHoverEnd={() => {
                    setHoveredId(null)
                    const el = document.getElementById(`preview-${video.id}`) as HTMLVideoElement | null
                    if (el) { el.pause(); el.currentTime = 0 }
                  }}
                  onClick={() => setSelectedVideo(video)}
                  className="cursor-pointer"
                >
                  <div
                    className="rounded-xl overflow-hidden relative w-full"
                    style={{ aspectRatio: '9/16', height: '8.5rem', background: `linear-gradient(135deg, ${video.color}10 0%, ${video.color}02 100%)`, border: `1px solid ${video.color}20` }}
                  >
                    {video.src ? (
                      <video
                        id={`preview-${video.id}`}
                        src={video.src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${video.color}30`, border: `2px solid ${video.color}60` }}>
                          <Play className="w-4 h-4 ml-0.5" style={{ color: '#fff' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-1">
                    <h5 className="font-medium text-sm text-foreground truncate">{video.title}</h5>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="max-w-4xl w-full rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${selectedVideo.color}15 0%, ${selectedVideo.color}05 100%)`,
                border: `2px solid ${selectedVideo.color}50`,
                boxShadow: `0 0 100px ${selectedVideo.color}30`,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video player area */}
              <div className="aspect-video relative bg-black">
                {selectedVideo.src ? (
                  <video
                    src={selectedVideo.src}
                    poster={selectedVideo.poster}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-32 h-32 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${selectedVideo.color}60 0%, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span 
                      className="text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-2 inline-block"
                      style={{ 
                        background: `${selectedVideo.color}20`,
                        color: selectedVideo.color,
                      }}
                    >
                      {selectedVideo.category}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground">{selectedVideo.title}</h3>
                    <p className="text-muted-foreground mt-2">
                     فديو موشن جرافيك .
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p className="flex items-center gap-1 justify-end">
                      <Eye className="w-4 h-4" />
                      {selectedVideo.views} views
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -30;
          }
        }
      `}</style>
    </section>
  )
}
