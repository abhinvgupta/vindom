import { useEffect, useRef, useState } from 'react'

/**
 * Arrow of Time — Entropy creates irreversibility. Time flows one way.
 * Demonstrates: Time-reversal asymmetry, irreversibility, broken symmetry.
 */

const DROP_COUNT = 80

export default function ArrowOfTime() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const animRef = useRef(null)
  const [direction, setDirection] = useState('forward')
  const [gen, setGen] = useState(0)

  const toggleDirection = () => {
    if (stateRef.current) {
      const newDir = direction === 'forward' ? 'reverse' : 'forward'
      stateRef.current.direction = newDir
      setDirection(newDir)
    }
  }

  const restart = () => {
    setDirection('forward')
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
    const seed = 314 + gen
    const centerX = w * 0.5, centerY = h * 0.45
    const dropRadius = Math.min(w, h) * 0.06

    const rng = (function(s) {
      return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff }
    })(seed)

    // Ink drops start concentrated, then diffuse
    const drops = []
    for (let i = 0; i < DROP_COUNT; i++) {
      const angle = rng() * Math.PI * 2
      const dist = rng() * dropRadius
      const ox = centerX + Math.cos(angle) * dist
      const oy = centerY + Math.sin(angle) * dist
      // Scattered target position
      const tAngle = rng() * Math.PI * 2
      const tDist = dropRadius * 2 + rng() * Math.min(w, h) * 0.35
      drops.push({
        ox, oy, // origin (concentrated)
        tx: centerX + Math.cos(tAngle) * tDist,
        ty: centerY + Math.sin(tAngle) * tDist,
        x: ox, y: oy,
        size: 2 + rng() * 3,
        phase: rng() * Math.PI * 2,
        hue: 275 + rng() * 30 - 15,
        trail: [],
        brownianVx: (rng() - 0.5) * 0.5,
        brownianVy: (rng() - 0.5) * 0.5,
      })
    }

    const state = { drops, tick: 0, progress: 0, direction: 'forward', w, h }
    stateRef.current = state

    // History for reverse tracking
    const history = []

    const draw = () => {
      const { drops: ds, tick: t, direction: dir } = state

      ctx.fillStyle = 'rgba(3, 1, 12, 0.12)'
      ctx.fillRect(0, 0, w, h)

      // Time arrow indicator
      const arrowY = h * 0.08
      ctx.save()
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(w * 0.15, arrowY)
      ctx.lineTo(w * 0.85, arrowY)
      ctx.stroke()
      ctx.setLineDash([])

      // Arrow head
      const arrowDir = dir === 'forward' ? 1 : -1
      const arrowX = dir === 'forward' ? w * 0.85 : w * 0.15
      ctx.fillStyle = `rgba(${dir === 'forward' ? '139, 92, 246' : '200, 80, 80'}, 0.6)`
      ctx.beginPath()
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(arrowX - arrowDir * 12, arrowY - 6)
      ctx.lineTo(arrowX - arrowDir * 12, arrowY + 6)
      ctx.fill()

      ctx.font = `${Math.floor(w * 0.013 + 7)}px 'Cinzel', serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(${dir === 'forward' ? '139, 92, 246' : '200, 80, 80'}, 0.5)`
      ctx.fillText(dir === 'forward' ? 'TIME →' : '← TIME (REVERSED)', w * 0.5, arrowY - 10)
      ctx.restore()

      if (dir === 'forward') {
        // Progress forward: concentrated → scattered
        state.progress = Math.min(1, state.progress + 0.0008)
        const p = state.progress
        const e2 = p * p

        // Save state to history
        if (t % 3 === 0) {
          history.push(ds.map(d => ({ x: d.x, y: d.y })))
          if (history.length > 600) history.shift()
        }

        ds.forEach(d => {
          const jx = Math.sin(t * 0.015 + d.phase) * p * 3
          const jy = Math.cos(t * 0.012 + d.phase * 1.3) * p * 3
          d.x = d.ox + (d.tx - d.ox) * e2 + jx
          d.y = d.oy + (d.ty - d.oy) * e2 + jy

          d.trail.push({ x: d.x, y: d.y })
          if (d.trail.length > 40) d.trail.shift()
        })
      } else {
        // Reverse: pop from history (but add noise — imperfect reversal)
        if (history.length > 0) {
          const snap = history.pop()
          ds.forEach((d, i) => {
            if (snap[i]) {
              // Add noise to reversal — entropy makes perfect reversal impossible
              d.x = snap[i].x + (Math.sin(t * 0.1 + d.phase) * 0.8)
              d.y = snap[i].y + (Math.cos(t * 0.1 + d.phase) * 0.8)
            }
            d.trail.push({ x: d.x, y: d.y })
            if (d.trail.length > 40) d.trail.shift()
          })
          state.progress = Math.max(0, state.progress - 0.0008)
        } else {
          // No more history — reversal fails, entropy wins
          ds.forEach(d => {
            d.x += d.brownianVx + Math.sin(t * 0.02 + d.phase) * 0.4
            d.y += d.brownianVy + Math.cos(t * 0.02 + d.phase) * 0.4
            d.trail.push({ x: d.x, y: d.y })
            if (d.trail.length > 40) d.trail.shift()
          })
        }
      }

      // Draw origin circle (ink drop)
      const originAlpha = Math.max(0, (1 - state.progress * 2)) * 0.15
      if (originAlpha > 0.01) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, dropRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120, 60, 220, ${originAlpha})`
        ctx.fill()
        ctx.strokeStyle = `rgba(100, 80, 180, ${originAlpha * 2})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw particles
      ds.forEach(d => {
        // Trail
        if (d.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(d.trail[0].x, d.trail[0].y)
          for (let i = 1; i < d.trail.length; i++) {
            ctx.lineTo(d.trail[i].x, d.trail[i].y)
          }
          const trailHue = dir === 'reverse' ? d.hue + 60 : d.hue
          ctx.strokeStyle = `hsla(${trailHue}, 50%, 40%, 0.12)`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        // Core
        const alpha = 0.5 + Math.sin(t * 0.02 + d.phase) * 0.2
        const coreHue = dir === 'reverse' ? d.hue + 60 : d.hue
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${coreHue}, 65%, 55%, ${alpha})`
        ctx.fill()

        // Glow
        const gr = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size * 2.5)
        gr.addColorStop(0, `hsla(${coreHue}, 60%, 50%, ${alpha * 0.2})`)
        gr.addColorStop(1, `hsla(${coreHue}, 60%, 40%, 0)`)
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = gr
        ctx.fill()
      })

      // Status text
      const reversalFailed = dir === 'reverse' && history.length === 0
      ctx.font = `italic ${Math.floor(w * 0.018 + 8)}px 'IM Fell English', serif`
      ctx.textAlign = 'center'
      ctx.shadowColor = 'rgba(139,92,246,0.5)'
      ctx.shadowBlur = 8

      if (reversalFailed) {
        ctx.fillStyle = 'rgba(200, 80, 80, 0.7)'
        ctx.fillText('REVERSAL FAILED — Entropy cannot decrease. The arrow of time is absolute.', w / 2, h - 14)
      } else {
        const pct = (state.progress * 100).toFixed(0)
        ctx.fillStyle = `rgba(160, 150, 220, 0.5)`
        ctx.fillText(`Diffusion: ${pct}%  ·  ${dir === 'forward' ? 'ΔS > 0 — entropy increasing' : 'Attempting ΔS < 0 — imperfect reversal'}`, w / 2, h - 14)
      }
      ctx.shadowBlur = 0
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
        <h3>IV. The Arrow of Time</h3>
        <p className="art-subtitle">Entropy defines the direction of time — irreversibility made visible</p>
        <div className="art-stats">
          <span className="art-stat">Direction: {direction}</span>
          <span className="art-stat art-stat-phase">{direction === 'forward' ? 'ΔS > 0' : 'ΔS < 0 (impossible)'}</span>
        </div>
      </div>
      <div className="art-canvas-wrap">
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
      <div className="art-controls">
        <button type="button" onClick={toggleDirection} className="entropy-restart-btn">
          {direction === 'forward' ? '⟵ Reverse Time' : '⟶ Forward Time'}
        </button>
        <button type="button" onClick={restart} className="entropy-restart-btn" style={{ marginLeft: '0.5rem' }}>
          ↺ Reset
        </button>
      </div>
      <p className="art-caption">
        A drop of ink diffuses through water — perfectly natural. Now try to reverse it.
        The laws of physics are time-symmetric, yet entropy imposes a direction.
        Reversal is <em>statistically impossible</em> — the probability of {DROP_COUNT} particles
        spontaneously reconverging approaches zero. <em>This is why time flows forward.</em>
      </p>
    </div>
  )
}
