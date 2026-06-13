import { useEffect, useRef, useState } from 'react'

// Returns [ref, inView]. Used on mobile to autoplay muted loops when a tile
// scrolls into view (no hover on touch).
export function useInView(options = { threshold: 0.6 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}

// True on coarse-pointer (touch) devices, where we autoplay-in-view instead of
// hover. Re-evaluates on resize so it stays correct across device rotation.
export function useIsTouch() {
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setTouch(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return touch
}

// Locks body scroll while a modal is open.
export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
