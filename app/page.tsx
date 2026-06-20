"use client"

import { ParticleCanvas } from '@/components/particle-canvas'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SpiralGallery } from '@/components/spiral-gallery'
import { PostsGrid } from '@/components/posts-grid'
import { VideosSection } from '@/components/videos-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Particle background */}
      <ParticleCanvas />
      
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <div className="relative z-10">
        {/* Page 1: Hero with Logo */}
        <HeroSection />
        
        {/* Page 2: About / Information */}
        <AboutSection />
        
        {/* Page 3: Visual Identities Spiral */}
        <SpiralGallery />
        
        {/* Page 4: Posts Grid */}
        <PostsGrid />
        
        {/* Page 5: Videos */}
        <VideosSection />
        
        {/* Contact */}
        <ContactSection />
        
        <Footer />
      </div>

      {/* Scan line effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, oklch(0.75 0.18 195 / 0.1) 2px, oklch(0.75 0.18 195 / 0.1) 4px)',
        }}
      />

      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, oklch(0.08 0.02 270 / 0.4) 100%)',
        }}
      />
    </main>
  )
}
