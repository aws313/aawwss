"use client"

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">Designer</span>
            <span className="text-foreground">Aws</span>
          </motion.a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Designer Aws. صُنع بشغف وببكسلات.
          </p>

          {/* Back to top */}
          <motion.a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            العودة للأعلى
          </motion.a>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  )
}
