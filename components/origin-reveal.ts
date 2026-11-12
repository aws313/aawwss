// Shared helpers for "open from the tapped element" reveals.
// The expanded panel starts scaled and offset so it sits exactly over the tapped element,
// then springs to its full size in the centre of the screen.

export type Origin = { dx: number; dy: number; scale: number }

export const originProps = (o: Origin) => ({ x: o.dx, y: o.dy, scale: o.scale, opacity: 0.6, rotate: -8 })
export const openProps = { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }

// Measure where the tapped element sits relative to the viewport centre.
// panelWidth is the width the expanded panel will have once open.
export function measureOrigin(el: HTMLElement, panelWidth: number): Origin {
  const r = el.getBoundingClientRect()
  return {
    dx: r.left + r.width / 2 - window.innerWidth / 2,
    dy: r.top + r.height / 2 - window.innerHeight / 2,
    scale: r.width / panelWidth,
  }
}

// Panel width for the expanded view: the max width, or the screen minus side margins.
export function panelWidthFor(maxWidth: number): number {
  return Math.min(window.innerWidth * 0.92, maxWidth)
}
