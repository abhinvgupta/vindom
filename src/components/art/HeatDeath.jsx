import { useEffect, useRef, useState } from 'react'

/**
 * Heat Death — Stars cool to equilibrium. The universe's final state.
 * Demonstrates: Thermodynamic equilibrium, maximum entropy, heat death.
 */

const STAR_COUNT = 120

export default function HeatDeath() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const animRef = useRef(null)
  const [epoch, setEpoch] = useState(0)
  const [gen, setGen] = useState(0)

  const restart = () => {
    if (stateRef.current) {
      stateRef.current.time = 0
      const { stars, w, h } = stateRef.current
      stars.forEach(s => {
        s.temp = s.initTemp
        s.radius = s.initRadius
        s.alive = true
      })
      setEpoch(0)
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
    const seed = 271 + gen

    const rng = (function(s) {
      return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff }
    })(seed)

    const stars = []
    for (let i = 0; i < STAR_COUNT; i++) {
      const temp = 0.3 + rng() * 0.7 // 0=cold, 1=hot
      const radius = 2 + temp * 6 + rng() * 3
      stars.push({
        x: w * 0.08 + rng() * w * 0.84,
        y: h * 0.08 + rng() * h * 0.84,
        temp, initTemp: temp,
        radius, initRadius: radius,
        coolingRate: 0.0001 + rng() * 0.0004,
        phase: rng() * Math.PI * 2,
        alive: true,
        deathTime: -1,
      })
    }

    // Background stars (tiny, static)
    const bgStars = Array.from({ length: 300 }, () => ({
      x: rng() * w, y: rng() * h,
      size: 0.3 + rng() * 0.8,
      alpha: 0.1 + rng() * 0.3,
    }))

    const state = { stars, bgStars, time: 0, w, h }
    stateRef.current = state

    function tempToColor(t) {
      // Hot = blue-white, warm = yellow, cool = orange-red, cold = dark red, dead = dark gray
      if (t > 0.8) return { r: 200 + t * 55, g: 210 + t * 45, b: 255 }
      if (t > 0.5) return { r: 255, g: Math.floor(180 + t * 100), b: Math.floor(80 + t * 120) }
      if (t > 0.2) return { r: Math.floor(180 + t * 150), g: Math.floor(60 + t * 100), b: Math.floor(20 + t * 40) }
      return { r: Math.floor(60 + t * 200), g: Math.floor(15 + t * 50), b: Math.floor(15 + t * 30) }
    }

    const draw = () => {
      const { stars: ss, bgStars: bg, time: t } = state

      // Dark background
      ctx.fillStyle = 'rgba(2, 1, 8, 0.2)'
      ctx.fillRect(0, 0, w, h)

      // Background stars dim over time
      const universeFade = Math.max(0.05, 1 - t * 0.00008)
      bg.forEach(s => {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160, 140, 240, ${s.alpha * universeFade})`
        ctx.fill()
      })

      let aliveCount = 0
      let avgTemp = 0

      ss.forEach(s => {
        // Cool the star
        if (s.alive) {
          s.temp = Math.max(0, s.temp - s.coolingRate)
          s.radius = Math.max(0.5, s.radius - s.coolingRate * 3)

          if (s.temp < 0.02) {
            s.alive = false
            s.deathTime = t
          }
        }

        avgTemp += s.temp

        if (s.alive) {
          aliveCount++
          const { r, g, b } = tempToColor(s.temp)
          const pulse = Math.sin(t * 0.02 + s.phase) * 0.15 + 0.85
          const coreAlpha = 0.6 + s.temp * 0.4

          // Outer glow
          const glowR = s.radius * (3 + s.temp * 4)
          const gr = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
          gr.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${s.temp * 0.25 * pulse})`)
          gr.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${s.temp * 0.08})`)
          gr.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.beginPath()
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = gr
          ctx.fill()

          // Core
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.radius * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${coreAlpha})`
          ctx.fill()
        } else {
          // Dead star — dim ember
          const fade = Math.max(0, 1 - (t - s.deathTime) * 0.0005)
          if (fade > 0.01) {
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(40, 20, 60, ${fade * 0.5})`
            ctx.fill()
          }
        }
      })

      avgTemp /= ss.length
      const epochYears = (t * 1e7).toExponential(1)

      ctx.font = `italic ${Math.floor(w * 0.018 + 8)}px 'IM Fell English', serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(160, 150, 220, ${0.4 + (1 - avgTemp) * 0.3})`
      ctx.shadowColor = 'rgba(139,92,246,0.5)'
      ctx.shadowBlur = 8
      const status = aliveCount === 0 ? 'HEAT DEATH — Maximum Entropy' : `${aliveCount} stars burning  ·  T̄ = ${(avgTemp * 30000).toFixed(0)}K`
      ctx.fillText(`${status}  ·  t ≈ ${epochYears} years`, w / 2, h - 14)
      ctx.shadowBlur = 0
    }

    const loop = () => {
      animRef.current = requestAnimationFrame(loop)
      state.time++
      if (state.time % 8 === 0) setEpoch(state.time)
      draw()
    }
    loop()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect() }
  }, [gen])

  const aliveCount = stateRef.current ? stateRef.current.stars.filter(s => s.alive).length : STAR_COUNT
  const phase = aliveCount > STAR_COUNT * 0.7 ? 'Stelliferous Era' : aliveCount > STAR_COUNT * 0.3 ? 'Degenerate Era' : aliveCount > 0 ? 'Dark Era' : 'Heat Death'

  return (
    <div className="art-piece">
      <div className="art-header">
        <h3>III. Heat Death</h3>
        <p className="art-subtitle">Every star must die — the universe approaches maximum entropy</p>
        <div className="art-stats">
          <span className="art-stat">Stars: {aliveCount}/{STAR_COUNT}</span>
          <span className="art-stat art-stat-phase">{phase}</span>
        </div>
      </div>
      <div className="art-canvas-wrap">
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
      <div className="art-controls">
        <button type="button" onClick={restart} className="entropy-restart-btn">↺ Reignite Stars</button>
      </div>
      <p className="art-caption">
        {STAR_COUNT} stars burn at different temperatures, each radiating energy into the void.
        As they cool, the temperature gradient between stars and space narrows.
        When the last star dies, the universe reaches <em>thermodynamic equilibrium</em> — maximum entropy,
        no gradients, no work possible. Vin's final silence.
      </p>
    </div>
  )
}
