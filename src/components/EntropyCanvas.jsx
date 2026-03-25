import { useEffect, useRef, useState } from 'react'

const PARTICLE_COUNT = 180
const GRID_COLS = 18
const GRID_ROWS = 10
const CHAOS_SPEED = 0.00028
const MAX_ENTROPY = 1.0

// ── Color helpers ─────────────────────────────────────────
function tempColor(t) {
  // t: 0 = cold (deep indigo), 1 = hot (vivid purple/magenta)
  const r = Math.round(60 + t * 140)
  const g = Math.round(20 + t * 40)
  const b = Math.round(120 + t * 106)
  return { r, g, b }
}

function EntropyCanvas() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const animRef = useRef(null)
  const [displayEntropy, setDisplayEntropy] = useState(0)
  const [generation, setGeneration] = useState(0)

  const restartEntropy = () => {
    if (stateRef.current) {
      const canvas = canvasRef.current
      if (!canvas) return
      const w = canvas.width, h = canvas.height
      stateRef.current.entropy = 0
      stateRef.current.tick = 0
      stateRef.current.particles.forEach(p => {
        p.tx = w * 0.04 + Math.random() * w * 0.92
        p.ty = h * 0.04 + Math.random() * h * 0.92
        p.x = p.ox
        p.y = p.oy
      })
      setDisplayEntropy(0)
      setGeneration(g => g + 1)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ── Resize ────────────────────────────────────────────
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width  = rect.width  || 800
      canvas.height = Math.min(460, window.innerHeight * 0.55)
      if (stateRef.current) {
        repositionParticles(stateRef.current, canvas.width, canvas.height)
      }
    }

    // ── Particles ─────────────────────────────────────────
    const makeParticles = (w, h) => {
      const particles = []
      const cellW = (w * 0.55) / GRID_COLS
      const cellH = (h * 0.55) / GRID_ROWS
      const startX = w * 0.22
      const startY = h * 0.2

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const col = i % GRID_COLS
        const row = Math.floor(i / GRID_COLS)

        const ox = startX + col * cellW + cellW / 2
        const oy = startY + row * cellH + cellH / 2

        const tx = w * 0.04 + Math.random() * w * 0.92
        const ty = h * 0.04 + Math.random() * h * 0.92

        // Temperature: left half = hot, right half = cold (heat diffusion setup)
        const t = col < GRID_COLS / 2 ? 0.75 + Math.random() * 0.25 : 0.05 + Math.random() * 0.2
        const size = 1.5 + Math.random() * 2.5
        const phase = Math.random() * Math.PI * 2
        const speed = 0.2 + Math.random() * 0.5
        const angle = Math.random() * Math.PI * 2

        particles.push({
          ox, oy, tx, ty,
          x: ox, y: oy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          t, size, phase,
          glowSize: size * (2.5 + Math.random() * 2),
        })
      }
      return particles
    }

    const repositionParticles = (state, w, h) => {
      const cellW = (w * 0.55) / GRID_COLS
      const cellH = (h * 0.55) / GRID_ROWS
      const startX = w * 0.22
      const startY = h * 0.2

      state.particles.forEach((p, i) => {
        const col = i % GRID_COLS
        const row = Math.floor(i / GRID_COLS)
        p.ox = startX + col * cellW + cellW / 2
        p.oy = startY + row * cellH + cellH / 2
        p.tx = w * 0.04 + Math.random() * w * 0.92
        p.ty = h * 0.04 + Math.random() * h * 0.92
      })
    }

    resize()
    const w = canvas.width
    const h = canvas.height

    const state = {
      particles: makeParticles(w, h),
      entropy: 0,
      tick: 0,
    }
    stateRef.current = state

    // ── Draw ─────────────────────────────────────────────
    const draw = () => {
      const { particles, entropy, tick } = state
      const W = canvas.width
      const H = canvas.height

      // Slight persistence trail
      ctx.fillStyle = 'rgba(2, 2, 6, 0.82)'
      ctx.fillRect(0, 0, W, H)

      // ── Heat diffusion background gradient (fades as entropy rises) ──
      const bgAlpha = Math.max(0, 1 - entropy * 1.2) * 0.7
      if (bgAlpha > 0.02) {
        // Hot zone left
        const hotGrad = ctx.createLinearGradient(W * 0.15, 0, W * 0.5, 0)
        hotGrad.addColorStop(0, `rgba(180, 60, 200, ${bgAlpha * 0.18})`)
        hotGrad.addColorStop(1, `rgba(0, 0, 0, 0)`)
        ctx.fillStyle = hotGrad
        ctx.fillRect(0, 0, W, H)

        // Cold zone right
        const coldGrad = ctx.createLinearGradient(W * 0.5, 0, W * 0.85, 0)
        coldGrad.addColorStop(0, `rgba(0, 0, 0, 0)`)
        coldGrad.addColorStop(1, `rgba(40, 20, 160, ${bgAlpha * 0.14})`)
        ctx.fillStyle = coldGrad
        ctx.fillRect(0, 0, W, H)

        // Temperature divider line
        ctx.strokeStyle = `rgba(60, 50, 100, ${bgAlpha * 0.4})`
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(W * 0.5, H * 0.1)
        ctx.lineTo(W * 0.5, H * 0.9)
        ctx.stroke()
        ctx.setLineDash([])

        // Labels
        ctx.font = `${Math.floor(W * 0.014 + 8)}px 'Cinzel', serif`
        ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(180, 80, 220, ${bgAlpha * 0.7})`
        ctx.fillText('HOT', W * 0.28, H * 0.14)
        ctx.fillStyle = `rgba(80, 50, 200, ${bgAlpha * 0.7})`
        ctx.fillText('COLD', W * 0.72, H * 0.14)
      }

      // ── Grid reference lines ──
      const gridAlpha = Math.max(0, (1 - entropy * 2.8)) * 0.05
      if (gridAlpha > 0.004) {
        ctx.strokeStyle = `rgba(80, 70, 140, ${gridAlpha})`
        ctx.lineWidth = 0.5
        const cW = (W * 0.55) / GRID_COLS
        const cH = (H * 0.55) / GRID_ROWS
        const sx = W * 0.22, sy = H * 0.2
        ctx.beginPath()
        for (let c = 0; c <= GRID_COLS; c++) {
          ctx.moveTo(sx + c * cW, sy)
          ctx.lineTo(sx + c * cW, sy + GRID_ROWS * cH)
        }
        for (let r = 0; r <= GRID_ROWS; r++) {
          ctx.moveTo(sx, sy + r * cH)
          ctx.lineTo(sx + GRID_COLS * cW, sy + r * cH)
        }
        ctx.stroke()
      }

      // ── Update & draw particles ──────────────────────
      particles.forEach((p) => {
        const osc = Math.sin(tick * 0.015 + p.phase) * 0.5 + 0.5

        // Mix particle temperature toward equilibrium as entropy rises
        const equilibriumT = 0.4  // mid-temperature
        const mixedT = p.t + (equilibriumT - p.t) * entropy * 0.85
        const { r, g, b } = tempColor(mixedT)

        if (entropy < MAX_ENTROPY) {
          const e2 = entropy * entropy
          p.x = p.ox + (p.tx - p.ox) * e2 + Math.sin(tick * 0.018 + p.phase) * entropy * 7
          p.y = p.oy + (p.ty - p.oy) * e2 + Math.cos(tick * 0.014 + p.phase * 1.3) * entropy * 7
        } else {
          p.x += p.vx + Math.sin(tick * 0.012 + p.phase) * 0.35
          p.y += p.vy + Math.cos(tick * 0.01  + p.phase * 1.2) * 0.35
          if (p.x < 0) p.x = W
          if (p.x > W) p.x = 0
          if (p.y < 0) p.y = H
          if (p.y > H) p.y = 0
        }

        const alpha = entropy < 0.3
          ? 0.65 + osc * 0.35
          : (0.4 + osc * 0.4) * (0.6 + Math.random() * 0.4)

        // Glow
        const glowAlpha = (entropy * 0.25 + 0.04) * alpha
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowSize)
        grad.addColorStop(0, `rgba(${r},${g},${b},${glowAlpha})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fill()
      })

      // ── Entropy readout ───────────────────────────────
      const entPct = (entropy * 100).toFixed(1)
      const sValue = (entropy * 5.763 * Math.log(Math.max(1, entropy * PARTICLE_COUNT + 1))).toFixed(2)

      ctx.shadowColor = 'rgba(80,70,180,0.5)'
      ctx.shadowBlur = 10
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.font = `italic ${Math.floor(W * 0.022 + 9)}px 'IM Fell English', serif`
      ctx.fillStyle = `rgba(160,150,220,${0.25 + entropy * 0.45})`
      ctx.fillText(`ΔS = ${entPct}%  ·  S ≈ ${sValue} J/K`, W / 2, H - 16)
      ctx.shadowBlur = 0

      // ── Phase label ───────────────────────────────────
      const phase = entropy < 0.2 ? 'ORDER' : entropy < 0.6 ? 'DISSOLUTION' : entropy < 0.95 ? 'CHAOS' : 'MAXIMUM ENTROPY'
      ctx.font = `${Math.floor(W * 0.011 + 8)}px 'Cinzel', serif`
      ctx.fillStyle = `rgba(100,90,180,${Math.min(1, entropy * 1.8) * 0.55})`
      ctx.fillText(phase, W / 2, H * 0.97)
    }

    // ── Loop ─────────────────────────────────────────────
    const loop = () => {
      animRef.current = requestAnimationFrame(loop)
      state.tick++
      if (state.entropy < MAX_ENTROPY) {
        state.entropy = Math.min(MAX_ENTROPY, state.entropy + CHAOS_SPEED)
        if (state.tick % 4 === 0) setDisplayEntropy(state.entropy)
      }
      draw()
    }

    loop()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [generation])

  const entropyPct = (displayEntropy * 100).toFixed(1)
  const phase =
    displayEntropy < 0.15 ? 'Order'
    : displayEntropy < 0.4  ? 'Dissolution'
    : displayEntropy < 0.7  ? 'Chaos'
    : displayEntropy < 0.95 ? 'Entropy Rising'
    : 'Maximum Entropy — ΔS = ∞'

  const phaseColor =
    displayEntropy < 0.15 ? 'rgba(80,120,200,0.9)'
    : displayEntropy < 0.5 ? 'rgba(100,90,180,0.9)'
    : 'rgba(140,130,220,1)'

  return (
    <div className="entropy-section section">
      <div className="entropy-header">
        <p className="eyebrow">
          ⚗ The Second Law of Thermodynamics ⚗
        </p>
        <h2 style={{ marginBottom: '0.3rem', fontSize: 'clamp(1.2rem, 3vw, 1.9rem)' }}>
          The Entropy of Existence — ΔS ≥ 0
        </h2>
        <span className="entropy-formula">
          S = k<sub>B</sub> · ln(Ω)
        </span>
        <p className="entropy-desc">
          Hot particles (left) meet cold particles (right). As entropy grows,
          heat flows and order dissolves — a temperature equilibrium is reached
          and can never be reversed.
        </p>

        {/* Live readouts */}
        <div className="entropy-stats">
          <div className="entropy-stat">
            <span className="entropy-stat-label">Particles</span>
            <span className="entropy-stat-value" style={{ color: 'rgba(80,70,160,0.9)' }}>
              {PARTICLE_COUNT}
            </span>
          </div>
          <div className="entropy-stat entropy-stat-main">
            <span className="entropy-stat-label">ΔS</span>
            <span
              className="entropy-stat-value"
              style={{
                color: phaseColor,
                textShadow: `0 0 10px ${phaseColor}`,
                fontSize: '1.4rem',
                transition: 'color 0.8s ease, text-shadow 0.8s ease',
              }}
            >
              {entropyPct}%
            </span>
          </div>
          <div className="entropy-stat">
            <span className="entropy-stat-label">Phase</span>
            <span
              className="entropy-stat-value"
              style={{
                color: phaseColor,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                transition: 'color 0.8s ease',
              }}
            >
              {phase}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={restartEntropy}
          className="entropy-restart-btn"
        >
          ↺ Restore Order
        </button>
      </div>

      <div className="entropy-canvas-wrap">
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: 'auto' }}
          aria-label="Entropy visualization: hot and cold particles mixing, heat flowing, demonstrating the second law of thermodynamics"
          role="img"
        />
      </div>

      <p className="entropy-caption">
        Heat flows from hot to cold. Order dissolves into equilibrium.
        The universe cannot be wound back. <em>Vin reigns.</em>
      </p>
    </div>
  )
}

export default EntropyCanvas
