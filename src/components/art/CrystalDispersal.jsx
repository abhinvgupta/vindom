import { useEffect, useRef, useState } from 'react'

/**
 * Crystal Dispersal — Ordered lattice dissolves into maximum entropy.
 * Demonstrates: Second Law, microstate proliferation, irreversibility.
 */

const COLS = 20
const ROWS = 14
const COUNT = COLS * ROWS

function noise2D(x, y, seed) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 43758.5453) * 43758.5453
  return (n - Math.floor(n)) * 2 - 1
}

function smoothNoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy)
  const a = noise2D(ix, iy, seed)
  const b = noise2D(ix + 1, iy, seed)
  const c = noise2D(ix, iy + 1, seed)
  const d = noise2D(ix + 1, iy + 1, seed)
  return a + sx * (b - a) + sy * (c - a) + sx * sy * (a - b - c + d)
}

function fbm(x, y, seed, octaves = 4) {
  let val = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    val += amp * smoothNoise(x * freq, y * freq, seed + i * 100)
    amp *= 0.5
    freq *= 2
  }
  return val
}

export default function CrystalDispersal() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const animRef = useRef(null)
  const [entropy, setEntropy] = useState(0)
  const [gen, setGen] = useState(0)

  const restart = () => {
    if (stateRef.current) {
      stateRef.current.entropy = 0
      stateRef.current.tick = 0
      const { particles, w, h } = stateRef.current
      const cellW = (w * 0.6) / COLS
      const cellH = (h * 0.6) / ROWS
      const sx = w * 0.2, sy = h * 0.18
      particles.forEach((p, i) => {
        const col = i % COLS, row = Math.floor(i / COLS)
        p.ox = sx + col * cellW + cellW / 2
        p.oy = sy + row * cellH + cellH / 2
        p.x = p.ox; p.y = p.oy
      })
      setEntropy(0)
      setGen(g => g + 1)
    }
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
    const cellW = (w * 0.6) / COLS
    const cellH = (h * 0.6) / ROWS
    const sx = w * 0.2, sy = h * 0.18
    const seed = 42 + gen

    const particles = []
    for (let i = 0; i < COUNT; i++) {
      const col = i % COLS, row = Math.floor(i / COLS)
      const ox = sx + col * cellW + cellW / 2
      const oy = sy + row * cellH + cellH / 2
      const angle = fbm(col * 0.3, row * 0.3, seed) * Math.PI * 2
      particles.push({
        ox, oy, x: ox, y: oy,
        tx: w * 0.05 + Math.abs(noise2D(i, seed, 7)) * w * 0.9,
        ty: h * 0.05 + Math.abs(noise2D(seed, i, 13)) * h * 0.9,
        vx: Math.cos(angle) * 0.3,
        vy: Math.sin(angle) * 0.3,
        size: 2 + Math.abs(noise2D(i, 0, seed)) * 2,
        phase: i * 0.037,
        hue: 270 + noise2D(i, seed, 99) * 30,
      })
    }

    const state = { particles, entropy: 0, tick: 0, w, h }
    stateRef.current = state

    const draw = () => {
      const { particles: ps, entropy: e, tick: t } = state
      ctx.fillStyle = `rgba(3, 2, 12, ${0.15 + (1 - e) * 0.7})`
      ctx.fillRect(0, 0, w, h)

      // Grid lines fade with entropy
      const ga = Math.max(0, 1 - e * 3) * 0.12
      if (ga > 0.005) {
        ctx.strokeStyle = `rgba(120, 80, 200, ${ga})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        for (let c = 0; c <= COLS; c++) {
          ctx.moveTo(sx + c * cellW, sy)
          ctx.lineTo(sx + c * cellW, sy + ROWS * cellH)
        }
        for (let r = 0; r <= ROWS; r++) {
          ctx.moveTo(sx, sy + r * cellH)
          ctx.lineTo(sx + COLS * cellW, sy + r * cellH)
        }
        ctx.stroke()
      }

      // Connection lines between nearby particles (order visualization)
      if (e < 0.5) {
        const la = Math.max(0, 1 - e * 2.5) * 0.08
        ctx.strokeStyle = `rgba(139, 92, 246, ${la})`
        ctx.lineWidth = 0.3
        ctx.beginPath()
        for (let i = 0; i < ps.length; i++) {
          const col = i % COLS, row = Math.floor(i / COLS)
          if (col < COLS - 1) {
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[i + 1].x, ps[i + 1].y)
          }
          if (row < ROWS - 1 && i + COLS < ps.length) {
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[i + COLS].x, ps[i + COLS].y)
          }
        }
        ctx.stroke()
      }

      ps.forEach(p => {
        const e2 = e * e
        const noiseX = fbm(p.x * 0.003, p.y * 0.003, seed + t * 0.0005) * e * 8
        const noiseY = fbm(p.y * 0.003, p.x * 0.003, seed + 50 + t * 0.0005) * e * 8

        if (e < 1) {
          p.x = p.ox + (p.tx - p.ox) * e2 + noiseX + Math.sin(t * 0.012 + p.phase) * e * 4
          p.y = p.oy + (p.ty - p.oy) * e2 + noiseY + Math.cos(t * 0.01 + p.phase) * e * 4
        } else {
          p.x += p.vx + noiseX * 0.05
          p.y += p.vy + noiseY * 0.05
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        }

        const osc = Math.sin(t * 0.02 + p.phase) * 0.5 + 0.5
        const alpha = e < 0.3 ? 0.7 + osc * 0.3 : 0.4 + osc * 0.4
        const hShift = e * 60

        // Glow
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gr.addColorStop(0, `hsla(${p.hue + hShift}, 60%, ${40 + e * 20}%, ${alpha * 0.3})`)
        gr.addColorStop(1, `hsla(${p.hue + hShift}, 60%, 30%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gr
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue + hShift}, 70%, ${50 + e * 15}%, ${alpha})`
        ctx.fill()
      })

      // Microstate count
      const omega = Math.floor(Math.pow(COUNT, 1 + e * 3))
      ctx.font = `italic ${Math.floor(w * 0.018 + 8)}px 'IM Fell English', serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(180, 160, 240, ${0.3 + e * 0.4})`
      ctx.shadowColor = 'rgba(139,92,246,0.5)'
      ctx.shadowBlur = 8
      ctx.fillText(`Ω = ${omega.toLocaleString()} microstates  ·  S = k_B · ln(Ω)`, w / 2, h - 14)
      ctx.shadowBlur = 0
    }

    const loop = () => {
      animRef.current = requestAnimationFrame(loop)
      state.tick++
      if (state.entropy < 1) {
        state.entropy = Math.min(1, state.entropy + 0.00025)
        if (state.tick % 5 === 0) setEntropy(state.entropy)
      }
      draw()
    }
    loop()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect() }
  }, [gen])

  const phase = entropy < 0.15 ? 'Crystalline Order' : entropy < 0.4 ? 'Dissolution' : entropy < 0.8 ? 'Dispersal' : 'Maximum Entropy'

  return (
    <div className="art-piece">
      <div className="art-header">
        <h3>I. Crystal Dispersal</h3>
        <p className="art-subtitle">Order dissolves into chaos — the Second Law in motion</p>
        <div className="art-stats">
          <span className="art-stat">ΔS: {(entropy * 100).toFixed(0)}%</span>
          <span className="art-stat art-stat-phase">{phase}</span>
          <span className="art-stat">N: {COUNT}</span>
        </div>
      </div>
      <div className="art-canvas-wrap">
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
      <div className="art-controls">
        <button type="button" onClick={restart} className="entropy-restart-btn">↺ Restore Order</button>
      </div>
      <p className="art-caption">
        A perfect crystal lattice — {COUNT} particles in ordered positions — dissolves as entropy increases.
        The number of accessible microstates (Ω) explodes exponentially. <em>This process cannot be reversed.</em>
      </p>
    </div>
  )
}
