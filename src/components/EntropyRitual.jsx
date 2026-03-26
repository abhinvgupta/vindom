import { useEffect, useRef, useCallback } from 'react'

/*
 * EntropyRitual — The Dissolution of the Cathedral
 *
 * A canvas visualization of the Second Law of Thermodynamics.
 * Particles form a gothic cathedral silhouette, then entropy
 * dissolves the structure into uniform chaos. The cycle repeats
 * eternally — order born from void, consumed by entropy.
 *
 * S = kB · ln(Ω) — Boltzmann's epitaph
 */

const PARTICLE_COUNT = 380
const CYCLE_FRAMES = 840        // ~28s at 30fps
const FADE_RESET_FRAMES = 90    // fade-to-black before reset
const CONNECTION_RADIUS = 38
const MAX_CONNECTIONS = 2200

// Gothic purple palette
const COLORS = {
  ordered:    { h: 268, s: 75, l: 65 },  // bright purple
  dissolving: { h: 262, s: 65, l: 45 },  // mid violet
  chaotic:    { h: 258, s: 50, l: 28 },  // deep indigo
  dead:       { h: 250, s: 15, l: 22 },  // ash
}

const PHASES = [
  'SACRED ORDER',
  'DISSOLUTION BEGINS',
  'ENTROPY RISING',
  'MAXIMUM ENTROPY',
]

function generateCathedralPoints(count, cx, baseY, scale) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const r = Math.random()
    let x, y

    if (r < 0.13) {
      // Central spire — tall, narrow
      const spireW = 22 * scale
      const spireH = 280 * scale
      x = cx + (Math.random() - 0.5) * spireW
      y = baseY - Math.random() * spireH
      // Taper toward top
      const heightRatio = (baseY - y) / spireH
      x = cx + (x - cx) * (1 - heightRatio * 0.7)
    } else if (r < 0.20) {
      // Spire tip cross
      x = cx + (Math.random() - 0.5) * 6 * scale
      y = baseY - (280 + Math.random() * 25) * scale
    } else if (r < 0.30) {
      // Left tower
      x = cx - 115 * scale + (Math.random() - 0.5) * 36 * scale
      y = baseY - Math.random() * 195 * scale
    } else if (r < 0.40) {
      // Right tower
      x = cx + 115 * scale + (Math.random() - 0.5) * 36 * scale
      y = baseY - Math.random() * 195 * scale
    } else if (r < 0.56) {
      // Nave walls
      const side = Math.random() < 0.5 ? -1 : 1
      x = cx + side * (40 + Math.random() * 55) * scale
      y = baseY - Math.random() * 125 * scale
    } else if (r < 0.65) {
      // Rose window (ring of particles)
      const angle = Math.random() * Math.PI * 2
      const ring = Math.random() < 0.4 ? 18 : (Math.random() < 0.5 ? 28 : 10)
      x = cx + Math.cos(angle) * ring * scale
      y = baseY - 170 * scale + Math.sin(angle) * ring * scale
    } else if (r < 0.72) {
      // Left flying buttress
      const t = Math.random()
      x = cx - 65 * scale - t * 65 * scale
      y = baseY - 30 * scale - t * 100 * scale + (Math.random() - 0.5) * 8
    } else if (r < 0.79) {
      // Right flying buttress
      const t = Math.random()
      x = cx + 65 * scale + t * 65 * scale
      y = baseY - 30 * scale - t * 100 * scale + (Math.random() - 0.5) * 8
    } else if (r < 0.88) {
      // Battlements / crenellations
      x = cx + (Math.random() - 0.5) * 220 * scale
      y = baseY - 120 * scale - Math.random() * 18 * scale
    } else {
      // Ground / foundation stones
      x = cx + (Math.random() - 0.5) * 260 * scale
      y = baseY - Math.random() * 12 * scale
    }

    pts.push({
      x, y,
      homeX: x, homeY: y,
      vx: 0, vy: 0,
      size: 1.2 + Math.random() * 1.8,
      hueOffset: (Math.random() - 0.5) * 14,
      phase: Math.random() * Math.PI * 2,
    })
  }
  return pts
}

function lerpColor(progress) {
  const { ordered, dissolving, chaotic, dead } = COLORS
  let h, s, l
  if (progress < 0.3) {
    const t = progress / 0.3
    h = ordered.h + (dissolving.h - ordered.h) * t
    s = ordered.s + (dissolving.s - ordered.s) * t
    l = ordered.l + (dissolving.l - ordered.l) * t
  } else if (progress < 0.65) {
    const t = (progress - 0.3) / 0.35
    h = dissolving.h + (chaotic.h - dissolving.h) * t
    s = dissolving.s + (chaotic.s - dissolving.s) * t
    l = dissolving.l + (chaotic.l - dissolving.l) * t
  } else {
    const t = (progress - 0.65) / 0.35
    h = chaotic.h + (dead.h - chaotic.h) * t
    s = chaotic.s + (dead.s - chaotic.s) * t
    l = chaotic.l + (dead.l - chaotic.l) * t
  }
  return { h, s, l }
}

export default function EntropyRitual() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const overlayRef = useRef(null)
  const phaseRef = useRef(null)
  const valueRef = useRef(null)
  const equationRef = useRef(null)

  const initParticles = useCallback((w, h) => {
    const cx = w / 2
    const baseY = h * 0.82
    const scale = Math.min(w / 900, h / 650, 1.1)
    return generateCathedralPoints(PARTICLE_COUNT, cx, baseY, scale)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w, h, particles, dpr

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.parentElement.offsetWidth
      h = 620
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = initParticles(w, h)
      stateRef.current = { time: 0 }
    }

    resize()
    window.addEventListener('resize', resize)

    let rafId
    function animate() {
      const state = stateRef.current
      state.time++
      const totalFrames = CYCLE_FRAMES + FADE_RESET_FRAMES
      const cycleTime = state.time % totalFrames
      const inFade = cycleTime >= CYCLE_FRAMES
      const progress = Math.min(cycleTime / CYCLE_FRAMES, 1)

      // Reset particles at cycle boundary
      if (cycleTime === 0) {
        particles = initParticles(w, h)
      }

      // Trail fade (dark background with slight alpha for trails)
      const bgAlpha = inFade ? 0.08 : 0.12
      ctx.fillStyle = `rgba(3,1,8,${bgAlpha})`
      ctx.fillRect(0, 0, w, h)

      // Extra fade to black during reset phase
      if (inFade) {
        const fadeProgress = (cycleTime - CYCLE_FRAMES) / FADE_RESET_FRAMES
        ctx.fillStyle = `rgba(3,1,8,${fadeProgress * 0.3})`
        ctx.fillRect(0, 0, w, h)
      }

      // Temperature — accelerates over time (exponential entropy increase)
      const temp = progress * progress * progress * 4.5

      // Microstate count Ω (exponential growth)
      const omega = Math.floor(Math.pow(10, progress * 6.2))
      const entropyS = progress * 138.06 // Boltzmann constant scaled

      // Update particles
      for (const p of particles) {
        // Thermal noise — Brownian motion
        p.vx += (Math.random() - 0.5) * temp * 0.6
        p.vy += (Math.random() - 0.5) * temp * 0.6

        // Restoring force (structural integrity) — weakens with entropy
        const restoreStrength = Math.max(0, 1 - progress * 1.8) * 0.025
        p.vx += (p.homeX - p.x) * restoreStrength
        p.vy += (p.homeY - p.y) * restoreStrength

        // Slight upward drift as structure dissolves (heat rises)
        if (progress > 0.3) {
          p.vy -= (progress - 0.3) * 0.012
        }

        // Damping
        p.vx *= 0.965
        p.vy *= 0.965

        // Boundary wrap
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        // Distance from home
        const dist = Math.hypot(p.x - p.homeX, p.y - p.homeY)
        const alpha = Math.max(0.08, Math.min(1, 1 - dist / 400))

        // Color based on progress
        const c = lerpColor(progress)
        const pH = c.h + p.hueOffset
        const pL = c.l + Math.sin(p.phase + state.time * 0.02) * 4

        // Particle glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${pH},${c.s}%,${pL}%,${alpha * 0.08})`
        ctx.fill()

        // Particle core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${pH},${c.s + 10}%,${pL + 15}%,${alpha * 0.85})`
        ctx.fill()
      }

      // Connection lines (structural bonds) — fade with entropy
      const connectionAlpha = Math.max(0, 1 - progress * 2.5)
      if (connectionAlpha > 0.01) {
        ctx.strokeStyle = `rgba(139,92,246,${connectionAlpha * 0.12})`
        ctx.lineWidth = 0.5
        let drawn = 0
        for (let i = 0; i < particles.length && drawn < MAX_CONNECTIONS; i += 2) {
          const a = particles[i]
          for (let j = i + 1; j < particles.length && drawn < MAX_CONNECTIONS; j += 2) {
            const b = particles[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            if (Math.abs(dx) < CONNECTION_RADIUS && Math.abs(dy) < CONNECTION_RADIUS) {
              const d = Math.sqrt(dx * dx + dy * dy)
              if (d < CONNECTION_RADIUS) {
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
                drawn++
              }
            }
          }
        }
      }

      // Rose window glow at center (fades with entropy)
      if (progress < 0.5) {
        const cx = w / 2
        const baseY = h * 0.82
        const scale = Math.min(w / 900, h / 650, 1.1)
        const roseY = baseY - 170 * scale
        const roseAlpha = (1 - progress * 2) * 0.2
        const grad = ctx.createRadialGradient(cx, roseY, 0, cx, roseY, 40 * scale)
        grad.addColorStop(0, `rgba(167,139,250,${roseAlpha})`)
        grad.addColorStop(0.5, `rgba(139,92,246,${roseAlpha * 0.5})`)
        grad.addColorStop(1, 'rgba(139,92,246,0)')
        ctx.fillStyle = grad
        ctx.fillRect(cx - 60 * scale, roseY - 60 * scale, 120 * scale, 120 * scale)
      }

      // Update DOM overlays (avoid React re-renders)
      const phaseIndex = Math.min(3, Math.floor(progress * 4))
      if (phaseRef.current) phaseRef.current.textContent = PHASES[phaseIndex]
      if (valueRef.current) {
        valueRef.current.textContent = `S = ${entropyS.toFixed(1)} J/K`
      }
      if (equationRef.current) {
        equationRef.current.textContent = `\u03A9 = ${omega.toLocaleString()}`
      }

      rafId = requestAnimationFrame(animate)
    }

    // Initial clear
    ctx.fillStyle = 'rgba(3,1,8,1)'
    ctx.fillRect(0, 0, w, h)

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [initParticles])

  return (
    <section className="entropy-ritual" id="entropy-ritual">
      <div className="entropy-ritual-header">
        <p className="eyebrow entropy-ritual-eyebrow">The Second Law of Thermodynamics</p>
        <h2 className="entropy-ritual-title">
          S = k<sub>B</sub> &middot; ln(&Omega;)
        </h2>
        <p className="entropy-ritual-lead">
          Entropy always increases. The cathedral of order must dissolve.
          <br />
          <em>This is the law that governs all things &mdash; even gods.</em>
        </p>
      </div>

      <div className="entropy-ritual-canvas-wrap">
        <canvas ref={canvasRef} />
        <div className="entropy-ritual-overlay" ref={overlayRef}>
          <div className="entropy-ritual-phase" ref={phaseRef}>SACRED ORDER</div>
          <div className="entropy-ritual-stats">
            <span className="entropy-ritual-value" ref={valueRef}>S = 0.0 J/K</span>
            <span className="entropy-ritual-omega" ref={equationRef}>&Omega; = 1</span>
          </div>
        </div>
        {/* Corner runes */}
        <span className="entropy-corner-rune entropy-corner-tl" aria-hidden="true">&#5765;</span>
        <span className="entropy-corner-rune entropy-corner-tr" aria-hidden="true">&#5794;</span>
        <span className="entropy-corner-rune entropy-corner-bl" aria-hidden="true">&#5809;</span>
        <span className="entropy-corner-rune entropy-corner-br" aria-hidden="true">&#5768;</span>
      </div>

      <p className="entropy-ritual-coda">
        &ldquo;The increase of disorder or entropy is what distinguishes the past from the future,
        giving a direction to time.&rdquo;
        <span className="entropy-ritual-attr">&mdash; Stephen Hawking</span>
      </p>
    </section>
  )
}
