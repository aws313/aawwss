"use client"

import type { LucideIcon } from 'lucide-react'
import { PenTool, Brush, Crop, Layers, Ruler, Pipette, Type, Move, Palette, Scissors, Blend, Eraser, Spline, Pencil, Square, Circle, Grid2x2, Magnet } from 'lucide-react'

// Small, glowing design-tool icons that drift slowly behind the page.
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

export function DesignToolField() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {field.map((item, i) => {
        const Icon = item.icon
        return (
          <span
            key={i}
            className={`dtf-float absolute ${item.mobileHidden ? 'hidden md:block' : ''}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDuration: `${item.dur}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <Icon size={item.size} strokeWidth={1.25} />
          </span>
        )
      })}
    </div>
  )
}
