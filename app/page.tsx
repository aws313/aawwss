"use client"

import { Navigation } from '@/components/navigation'
import { DesignToolField } from '@/components/design-tool-field'
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
      {/* Background design-tool icons */}
      <DesignToolField />

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

    </main>
  )
}
