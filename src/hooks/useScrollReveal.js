import { useEffect, useRef, useState } from 'react'

/**
 * Adds scroll-triggered reveal animations to elements.
 * Returns a ref to attach and whether the element is visible.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // Once revealed, stay revealed
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

/**
 * Adds scroll-reveal to all .section elements on the page.
 * Call once in the root component.
 */
export function useGlobalScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    // Observe all sections and art pieces
    const targets = document.querySelectorAll('.section, .art-piece, .deity-card, .verse-card, .cosmology-entry, .entropy-art-preamble, .entropy-art-coda')
    targets.forEach(el => {
      el.classList.add('scroll-reveal')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}
