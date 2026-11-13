"use client"

import { useEffect, type RefObject } from 'react'

// Keeps a 3D ring turning on its own. Dragging the stage turns the ring by hand, with momentum;
// on release it eases back to its turning speed. A tap still reaches the items on the ring.
export function useDragSpin(
  stageRef: RefObject<HTMLElement | null>,
  ringRef: RefObject<HTMLElement | null>,
  secondsPerTurn: number,
  dirSign: 1 | -1,
) {
  useEffect(() => {
    const stage = stageRef.current
    const ring = ringRef.current
    if (!stage || !ring) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const DEG_PER_PX = 0.35 // how far the ring turns for each pixel dragged
    const st = { angle: 0, v: 0, active: false, captured: false, lastX: 0, lastT: 0, vx: 0, moved: 0 }
    let raf = 0
    let last = 0

    const baseSpeed = () => (reduce ? 0 : (360 / secondsPerTurn) * dirSign)

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!st.active) {
        st.v += (baseSpeed() - st.v) * (1 - Math.exp(-dt * 2)) // ease back to the turning speed
        st.angle += st.v * dt
      }
      ring.style.transform = `rotateY(${st.angle}deg)`
      raf = requestAnimationFrame(tick)
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      st.active = true
      st.captured = false
      st.lastX = e.clientX
      st.lastT = performance.now()
      st.vx = 0
      st.moved = 0
    }
    const onMove = (e: PointerEvent) => {
      if (!st.active) return
      const now = performance.now()
      const dx = e.clientX - st.lastX
      const dt = (now - st.lastT) / 1000
      st.moved += Math.abs(dx)
      if (!st.captured && st.moved > 4) {
        try { stage.setPointerCapture(e.pointerId) } catch { /* pointer already released */ }
        st.captured = true
      }
      if (dt > 0) st.vx = 0.6 * st.vx + 0.4 * (dx / dt)
      st.angle += dx * DEG_PER_PX
      st.lastX = e.clientX
      st.lastT = now
    }
    const onUp = () => {
      if (!st.active) return
      st.active = false
      const idle = performance.now() - st.lastT > 100
      const limit = 720 // degrees per second
      st.v = idle ? 0 : Math.max(-limit, Math.min(limit, st.vx * DEG_PER_PX))
    }
    // After a drag, swallow the click so releasing a drag does not open an item
    const onClickCapture = (e: MouseEvent) => {
      if (st.moved > 6) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    const onDragStart = (e: Event) => e.preventDefault()

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('click', onClickCapture, true)
    stage.addEventListener('dragstart', onDragStart)
    raf = requestAnimationFrame((t) => { last = t; tick(t) })

    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('click', onClickCapture, true)
      stage.removeEventListener('dragstart', onDragStart)
    }
  }, [stageRef, ringRef, secondsPerTurn, dirSign])
}
