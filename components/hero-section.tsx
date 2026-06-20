"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use window scroll instead of container-based scroll to avoid hydration issues
  const { scrollYProgress } = useScroll({
    layoutEffect: false
  })

  const y = useTransform(scrollYProgress, [0, 0.3], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const logoScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.5])

  useEffect(() => {
    setMounted(true)
  }, [])

  const nameLetters = "NAKRA SWA".split("")
  const titleWords = ["Senior graphic designer & video editor"]

  if (!mounted) return null

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, oklch(0.75 0.18 195) 0%, transparent 70%)',
            top: '10%',
            left: '20%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, oklch(0.65 0.25 330) 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4"
      >
        {/* Animated Logo Image */}
        <motion.div 
          className="flex justify-center mb-8 relative"
          style={{ scale: logoScale }}
        >
          {/* Glow effect behind logo */}
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div 
              className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full blur-[60px]"
              style={{
                background: 'radial-gradient(circle, oklch(0.75 0.18 195 / 0.6) 0%, oklch(0.65 0.25 330 / 0.3) 50%, transparent 70%)',
              }}
            />
          </motion.div>
          
          {/* Logo image with animations */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 20px oklch(0.75 0.18 195 / 0.8)) drop-shadow(0 0 40px oklch(0.75 0.18 195 / 0.4))',
                  'drop-shadow(0 0 30px oklch(0.65 0.25 330 / 0.8)) drop-shadow(0 0 60px oklch(0.65 0.25 330 / 0.4))',
                  'drop-shadow(0 0 20px oklch(0.75 0.18 195 / 0.8)) drop-shadow(0 0 40px oklch(0.75 0.18 195 / 0.4))',
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="NAKRA SWA Logo"
                  width={220}
                  height={220}
                  className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] object-contain"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05)',
                  }}
                  priority
                />
              </motion.div>
            </motion.div>
            
            {/* Orbiting particles around logo */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? 'oklch(0.75 0.18 195)' : 'oklch(0.65 0.25 330)',
                  boxShadow: i % 2 === 0 
                    ? '0 0 10px oklch(0.75 0.18 195), 0 0 20px oklch(0.75 0.18 195 / 0.5)'
                    : '0 0 10px oklch(0.65 0.25 330), 0 0 20px oklch(0.65 0.25 330 / 0.5)',
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((i * Math.PI * 2) / 6) * 130,
                    Math.cos((i * Math.PI * 2) / 6 + Math.PI) * 130,
                    Math.cos((i * Math.PI * 2) / 6) * 130,
                  ],
                  y: [
                    Math.sin((i * Math.PI * 2) / 6) * 130,
                    Math.sin((i * Math.PI * 2) / 6 + Math.PI) * 130,
                    Math.sin((i * Math.PI * 2) / 6) * 130,
                  ],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Glowing name */}
        <motion.div className="mb-6">
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
                style={{
                  color: letter === " " ? "transparent" : "oklch(0.95 0.01 270)",
                  textShadow: letter !== " " ? `
                    0 0 10px oklch(0.75 0.18 195 / 0.8),
                    0 0 20px oklch(0.75 0.18 195 / 0.6),
                    0 0 40px oklch(0.75 0.18 195 / 0.4),
                    0 0 80px oklch(0.75 0.18 195 / 0.2)
                  ` : "none"
                }}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  scale: 1.1,
                  textShadow: `
                    0 0 20px oklch(0.65 0.25 330 / 1),
                    0 0 40px oklch(0.65 0.25 330 / 0.8),
                    0 0 60px oklch(0.65 0.25 330 / 0.6)
                  `,
                  transition: { duration: 0.2 }
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase"
              style={{
                color: i % 2 === 0 ? 'oklch(0.75 0.18 195)' : 'oklch(0.65 0.25 330)'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.3 + i * 0.1,
                ease: "easeOut"
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        {/* Description removed — moved to About section per user request */}

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.a
            href="#about"
            className="group relative px-8 py-4 overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: 'inset 0 0 20px oklch(0.75 0.18 195 / 0.5), 0 0 30px oklch(0.75 0.18 195 / 0.3)'
              }}
            />
            <span className="relative z-10 text-primary-foreground font-semibold tracking-wider uppercase text-sm">
              استكشف
            </span>
          </motion.a>
          
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 overflow-hidden rounded-lg border border-primary/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
            <span className="relative z-10 text-primary font-semibold tracking-wider uppercase text-sm">
              تواصل
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">مرر</span>
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.75 0.18 195) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.75 0.18 195) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}
