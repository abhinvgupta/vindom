import { useEffect, useRef, useState } from 'react'

/**
 * Emergent Order — Chaos self-organizes into flocking patterns.
 * Demonstrates: Dissipative structures, entropy creating complexity.
 */

const BOID_COUNT = 200

export default function EmergentOrder() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const animRef = useRef(null)
  const [mode, setMode] = useState('chaos')
  const [gen, setGen] = useState(0)

  const toggleMode = () => {
    if (stateRef.current) {
      const newMode = mode === 'chaos' ? 'order' : 'chaos'
      stateRef.current.mode = newMode
      setMode(newMode)
    }
  }

  const restart = () => {
    setMode('chaos')
    setGen(g => g + 1)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width || 800
      canvas.height = Math.min(420, window.innerHeight * 0.5)
    }
    resize()

    const w = canvas.width, h = canvas.height
    const seed = 137 + gen

    const rng = (function(s) {
      return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff }
    })(seed)

    const boids = []
    for (let i = 0; i < BOID_COUNT; i++) {
      const angle = rng() * Math.PI * 2
      const speed = 1 + rng() * 2
      boids.push({
        x: rng() * w, y: rng() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        hue: 270 + rng() * 60 - 30,
        trail: [],
        size: 1.5 + rng() * 1.5,
      })
    }

    const state = { boids, tick: 0, mode: 'chaos', orderStrength: 0 }
    stateRef.current = state

    const draw = () => {
      const { boids: bs, tick: t, mode: m } = state

      // Target order strength
      const target = m === 'order' ? 1 : 0
      state.orderStrength += (target - state.orderStrength) * 0.008
      const os = state.orderStrength

      ctx.fillStyle = `rgba(3, 1, 12, ${0.08 + (1 - os) * 0.12})`
      ctx.fillRect(0, 0, w, h)

      bs.forEach(b => {
        let sepX = 0, sepY = 0, aliX = 0, aliY = 0, cohX = 0, cohY = 0
        let sepC = 0, aliC = 0, cohC = 0

        // Flocking forces (scale with orderStrength)
        if (os > 0.01) {
          for (const other of bs) {
            if (other === b) continue
            let dx = other.x - b.x, dy = other.y - b.y
            // Wrap distance
            if (dx > w / 2) dx -= w; if (dx < -w / 2) dx += w
            if (dy > h / 2) dy -= h; if (dy < -h / 2) dy += h
            const d = Math.sqrt(dx * dx + dy * dy)

            if (d < 25 && d > 0) { sepX -= dx / d; sepY -= dy / d; sepC++ }
            if (d < 60) { aliX += other.vx; aliY += other.vy; aliC++ }
            if (d < 80) { cohX += dx; cohY += dy; cohC++ }
          }
        }

        const strength = os * 0.15
        if (sepC > 0) { b.vx += sepX / sepC * strength * 2; b.vy += sepY / sepC * strength * 2 }
        if (aliC > 0) { b.vx += (aliX / aliC - b.vx) * strength * 0.5; b.vy += (aliY / aliC - b.vy) * strength * 0.5 }
        if (cohC > 0) { b.vx += cohX / cohC * strength * 0.01; b.vy += cohY / cohC * strength * 0.01 }

        // Chaos jitter (inversely proportional to order)
        const jitter = (1 - os) * 0.3
        b.vx += (Math.sin(t * 0.03 + b.x * 0.01) * jitter)
        b.vy += (Math.cos(t * 0.025 + b.y * 0.01) * jitter)

        // Speed limit
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
        const maxSpd = 1.5 + os * 1.5
        if (spd > maxSpd) { b.vx = b.vx / spd * maxSpd; b.vy = b.vy / spd * maxSpd }

        b.x += b.vx; b.y += b.vy
        // Wrap
        if (b.x < 0) b.x += w; if (b.x > w) b.x -= w
        if (b.y < 0) b.y += h; if (b.y > h) b.y -= h

        // Trail
        b.trail.push({ x: b.x, y: b.y })
        const maxTrail = Math.floor(5 + os * 25)
        if (b.trail.length > maxTrail) b.trail.shift()

        // Draw trail
        if (b.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(b.trail[0].x, b.trail[0].y)
          for (let i = 1; i < b.trail.length; i++) {
            const dx = Math.abs(b.trail[i].x - b.trail[i - 1].x)
            const dy = Math.abs(b.trail[i].y - b.trail[i - 1].y)
            if (dx > w / 2 || dy > h / 2) { ctx.moveTo(b.trail[i].x, b.trail[i].y); continue }
            ctx.lineTo(b.trail[i].x, b.trail[i].y)
          }
          ctx.strokeStyle = `hsla(${b.hue + os * 40}, ${50 + os * 30}%, ${35 + os * 20}%, ${0.15 + os * 0.25})`
          ctx.lineWidth = 0.5 + os * 0.5
          ctx.stroke()
        }

        // Core
        const alpha = 0.5 + os * 0.4
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${b.hue + os * 40}, ${60 + os * 20}%, ${45 + os * 20}%, ${alpha})`
        ctx.fill()

        // Glow when ordered
        if (os > 0.3) {
          const gr = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size * 3)
          gr.addColorStop(0, `hsla(${b.hue + os * 40}, 70%, 60%, ${(os - 0.3) * 0.3})`)
          gr.addColorStop(1, `hsla(${b.hue + os * 40}, 70%, 40%, 0)`)
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = gr
          ctx.fill()
        }
      })

      // Label
      const label = os < 0.2 ? 'BROWNIAN CHAOS' : os < 0.5 ? 'SELF-ORGANIZING' : os < 0.8 ? 'EMERGENT FLOCKING' : 'DISSIPATIVE STRUCTURE'
      ctx.font = `italic ${Math.floor(w * 0.018 + 8)}px 'IM Fell English', serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(180, 160, 240, ${0.3 + os * 0.4})`
      ctx.shadowColor = 'rgba(139,92,246,0.5)'
      ctx.shadowBlur = 8
      ctx.fillText(`${label}  ·  Local entropy ↓  ·  Total entropy ↑`, w / 2, h - 14)
      ctx.shadowBlur = 0

      // Subtle purple glow around canvas edges when in order mode
      if (os > 0.2) {
        const glowAlpha = (os - 0.2) * 0.15
        const edgeGlow = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7)
        edgeGlow.addColorStop(0, 'rgba(139, 92, 246, 0)')
        edgeGlow.addColorStop(1, `rgba(139, 92, 246, ${glowAlpha})`)
        ctx.fillStyle = edgeGlow
        ctx.fillRect(0, 0, w, h)
      }
    }

    const loop = () => {
      animRef.current = requestAnimationFrame(loop)
      state.tick++
      draw()
    }
    loop()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect() }
  }, [gen])

  return (
    <div className="art-piece">
      <div className="art-header">
        <h3>II. Emergent Order</h3>
        <p className="art-subtitle">Complexity arises from chaos — entropy drives self-organization</p>
        <div className="art-stats">
          <span className="art-stat">Mode: {mode === 'chaos' ? 'Brownian' : 'Flocking'}</span>
          <span className="art-stat art-stat-phase">N: {BOID_COUNT} agents</span>
        </div>
      </div>
      <div className="art-canvas-wrap">
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
      <div className="art-controls">
        <button type="button" onClick={toggleMode} className="entropy-restart-btn">
          {mode === 'chaos' ? '⟶ Activate Flocking' : '⟶ Return to Chaos'}
        </button>
        <button type="button" onClick={restart} className="entropy-restart-btn" style={{ marginLeft: '0.5rem' }}>
          ↺ Reset
        </button>
      </div>
      <p className="art-caption">
        Entropy does not only destroy — it creates. Living systems, convection cells, and flocking birds
        are <em>dissipative structures</em>: they decrease local entropy by increasing total entropy.
        Toggle between chaos and order to see Prigogine's insight made visible.
      </p>
    </div>
  )
}
