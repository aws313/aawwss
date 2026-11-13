"use client"

import { useEffect, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { PenTool, Brush, Crop, Layers, Ruler, Pipette, Type, Move, Palette, Scissors, Blend, Eraser, Spline, Pencil, Square, Circle, Grid2x2, Magnet } from 'lucide-react'

// Small, glowing design-tool icons that drift slowly behind the page and react to the cursor.
// Each entry: icon, position (% of the viewport), size in px, drift speed in seconds, start delay.
const field: { icon: LucideIcon; x: number; y: number; size: number; dur: number; delay: number; mobileHidden?: boolean }[] = [
  { icon: PenTool, x: 6, y: 12, size: 22, dur: 26, delay: 0 },
  { icon: Brush, x: 88, y: 8, size: 20, dur: 30, delay: -6 },
  { icon: Crop, x: 22, y: 34, size: 18, dur: 24, delay: -10, mobileHidden: true },
  { icon: Layers, x: 72, y: 28, size: 24, dur: 28, delay: -3 },
  { icon: Ruler, x: 12, y: 58, size: 20, dur: 32, delay: -14 },
  { icon: Pipette, x: 92, y: 52, size: 18, dur: 27, delay: -8, mobileHidden: true },
  { icon: Type, x: 40, y: 18, size: 18, dur: 29, delay: -12, mobileHidden: true },
  { icon: Move, x: 54, y: 64, size: 20, dur: 25, delay: -5 },
  { icon: Palette, x: 30, y: 82, size: 22, dur: 31, delay: -16 },
  { icon: Scissors, x: 80, y: 84, size: 18, dur: 26, delay: -9, mobileHidden: true },
  { icon: Blend, x: 4, y: 90, size: 20, dur: 33, delay: -2 },
  { icon: Eraser, x: 62, y: 44, size: 16, dur: 28, delay: -18, mobileHidden: true },
  { icon: Spline, x: 46, y: 96, size: 22, dur: 30, delay: -11 },
  { icon: Pencil, x: 96, y: 30, size: 16, dur: 24, delay: -7, mobileHidden: true },
  { icon: Square, x: 16, y: 74, size: 14, dur: 34, delay: -20, mobileHidden: true },
  { icon: Circle, x: 66, y: 4, size: 14, dur: 27, delay: -13, mobileHidden: true },
  { icon: Grid2x2, x: 36, y: 50, size: 18, dur: 29, delay: -4 },
  { icon: Magnet, x: 84, y: 68, size: 18, dur: 31, delay: -15, mobileHidden: true },
]

const REACH = 180   // px: distance at which the cursor starts to affect an icon
const PUSH = 46     // px: maximum push away from the cursor

export function DesignToolField() {
  const holders = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    // Skip the cursor reaction on touch-only devices and for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover)').matches) return

    let frame = 0
    let mx = -9999
    let my = -9999

    const update = () => {
      frame = 0
      holders.current.forEach((el) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = cx - mx
        const dy = cy - my
        const d = Math.hypot(dx, dy)
        const s = d < REACH ? 1 - d / REACH : 0           // 0 far away, 1 right under the cursor
        const push = s * PUSH
        const ux = d > 0 ? dx / d : 0
        const uy = d > 0 ? dy / d : 0
        el.style.transform = `translate3d(${(ux * push).toFixed(1)}px, ${(uy * push).toFixed(1)}px, 0) scale(${(1 + s * 0.35).toFixed(3)})`
        el.style.setProperty('--glow', s.toFixed(3))
      })
    }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onLeave = () => {
      mx = -9999
      my = -9999
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {field.map((item, i) => {
        const Icon = item.icon
        return (
          <span
            key={i}
            ref={(el) => { holders.current[i] = el }}
            className={`dtf-holder absolute ${item.mobileHidden ? 'hidden md:block' : ''}`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            <span
              className="dtf-float block"
              style={{ animationDuration: `${item.dur}s`, animationDelay: `${item.delay}s` }}
            >
              <Icon size={item.size} strokeWidth={1.25} />
            </span>
          </span>
        )
      })}
    </div>
  )
}
