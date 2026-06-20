"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  isActive: boolean
  direction?: 'up' | 'down'
}

export function PageTransition({ children, isActive, direction = 'up' }: PageTransitionProps) {
  const variants = {
    enter: {
      opacity: 0,
      y: direction === 'up' ? 100 : -100,
      scale: 0.95,
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: direction === 'up' ? -100 : 100,
      scale: 0.95,
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="page"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Text reveal animation
export function TextReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Image reveal animation
export function ImageReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary to-accent z-10"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{
          duration: 0.8,
          delay: delay + 0.2,
          ease: [0.16, 1, 0.3, 1]
        }}
      />
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          delay: delay + 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
