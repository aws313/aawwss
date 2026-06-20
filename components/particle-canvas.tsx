"use client"

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  const colors = [
    'rgba(0, 212, 255, ',   // Cyan
    'rgba(255, 0, 128, ',   // Magenta
    'rgba(138, 43, 226, ',  // Purple
  ]

  const createParticle = useCallback((x: number, y: number, isMouseParticle = false): Particle => {
    const colorBase = colors[Math.floor(Math.random() * colors.length)]
    return {
      x: isMouseParticle ? x : Math.random() * window.innerWidth,
      y: isMouseParticle ? y : Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * (isMouseParticle ? 2 : 0.5),
      vy: (Math.random() - 0.5) * (isMouseParticle ? 2 : 0.5),
      size: Math.random() * (isMouseParticle ? 3 : 2) + 1,
      color: colorBase,
      alpha: Math.random() * 0.5 + 0.3,
      life: 0,
      maxLife: isMouseParticle ? 100 : 500 + Math.random() * 500
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(createParticle(0, 0))
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Add particles on mouse move
      if (Math.random() > 0.7) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true))
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 8, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++
        
        // Subtle attraction to mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          particle.vx += dx * 0.00005
          particle.vy += dy * 0.00005
        }

        particle.x += particle.vx
        particle.y += particle.vy
        
        // Boundary wrap
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Calculate alpha based on life
        const lifeRatio = particle.life / particle.maxLife
        const currentAlpha = particle.alpha * (1 - lifeRatio)

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + currentAlpha + ')'
        ctx.fill()

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, particle.color + (currentAlpha * 0.5) + ')')
        gradient.addColorStop(1, particle.color + '0)')
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        return particle.life < particle.maxLife
      })

      // Maintain particle count
      while (particlesRef.current.length < 80) {
        particlesRef.current.push(createParticle(0, 0))
      }

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.03)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [createParticle])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
