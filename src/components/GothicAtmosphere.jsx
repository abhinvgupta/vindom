import { useEffect, useRef } from 'react'

/**
 * GothicAtmosphere — Adds atmospheric layers to the entire site:
 * - Drifting fog/mist
 * - Flying bat silhouettes
 * - Occasional lightning flashes
 * - Gothic pointed arch viewport frame
 */

// Bat SVG path
const BAT_PATH = 'M0,4 C2,2 4,0 7,1 C8,0 10,0 12,2 C14,0 16,0 17,1 C20,0 22,2 24,4 C22,3 20,4 18,5 C16,4 14,5 12,4 C10,5 8,4 6,5 C4,4 2,3 0,4Z'

function FogLayer({ index }) {
  const speed = 80 + index * 30
  const opacity = 0.08 + (index % 3) * 0.025
  const yPos = 20 + index * 15
  const dir = index % 2 === 0 ? 1 : -1
  const height = 120 + index * 40

  return (
    <div
      className="fog-layer"
      style={{
        position: 'fixed',
        top: `${yPos}%`,
        left: dir === 1 ? '-100%' : '0',
        width: '200%',
        height: `${height}px`,
        background: `radial-gradient(ellipse at ${50 + index * 10}% 50%, rgba(60,18,110,${opacity}), rgba(118,18,44,${opacity * 0.45}) 34%, transparent 72%)`,
        animation: `fog-drift-${dir === 1 ? 'right' : 'left'} ${speed}s linear infinite`,
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.8,
      }}
    />
  )
}

function Bat({ index }) {
  const startX = -10 + (index * 37) % 100
  const startY = 10 + (index * 23) % 70
  const delay = index * 4.5
  const duration = 18 + (index % 5) * 6
  const size = 0.9 + (index % 4) * 0.3

  return (
    <svg
      className="flying-bat"
      viewBox="0 0 24 6"
      style={{
        position: 'fixed',
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${24 * size}px`,
        height: `${6 * size}px`,
        fill: `rgba(35,10,72,${0.65 + (index % 3) * 0.12})`,
        animation: `bat-fly ${duration}s linear ${delay}s infinite, bat-flap 0.4s ease-in-out infinite`,
        pointerEvents: 'none',
        zIndex: -1,
        filter: `drop-shadow(0 0 5px rgba(109,40,217,0.45))`,
      }}
    >
      <path d={BAT_PATH} />
    </svg>
  )
}

function RainLayer() {
  return (
    <div className="rain-layer" aria-hidden="true">
      {Array.from({ length: 55 }, (_, i) => {
        const left = (i * 0.93) % 100
        const delay = ((i * 0.17) % 3.6).toFixed(2)
        const duration = (0.95 + (i % 5) * 0.18).toFixed(2)
        const opacity = 0.08 + (i % 4) * 0.03
        const height = 70 + (i % 6) * 24

        return (
          <span
            key={i}
            className="rain-drop"
            style={{
              left: `${left}%`,
              height: `${height}px`,
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`,
              opacity,
            }}
          />
        )
      })}
    </div>
  )
}

function GothicArchFrame() {
  return (
    <div className="gothic-arch-frame" aria-hidden="true">
      {/* Top pointed arch */}
      <svg
        className="arch-top"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '60px',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="arch-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(2,2,6,1)" />
            <stop offset="100%" stopColor="rgba(2,2,6,0)" />
          </linearGradient>
        </defs>
        {/* Left creeper */}
        <rect x="0" y="0" width="3" height="60" fill="rgba(80,40,160,0.6)" />
        <rect x="3" y="0" width="1" height="60" fill="rgba(139,92,246,0.45)" />
        {/* Right creeper */}
        <rect x="1197" y="0" width="3" height="60" fill="rgba(80,40,160,0.6)" />
        <rect x="1196" y="0" width="1" height="60" fill="rgba(139,92,246,0.45)" />
      </svg>

      {/* Side iron bars */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '100vh',
          background: 'linear-gradient(180deg, rgba(30,25,60,0.5), rgba(20,15,40,0.2) 30%, rgba(20,15,40,0.2) 70%, rgba(30,25,60,0.5))',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '4px',
          height: '100vh',
          background: 'linear-gradient(180deg, rgba(30,25,60,0.5), rgba(20,15,40,0.2) 30%, rgba(20,15,40,0.2) 70%, rgba(30,25,60,0.5))',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      />

      {/* Corner ornaments */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => {
        const isTop = pos.includes('top')
        const isLeft = pos.includes('left')
        return (
          <div
            key={pos}
            style={{
              position: 'fixed',
              [isTop ? 'top' : 'bottom']: '8px',
              [isLeft ? 'left' : 'right']: '8px',
              width: '24px',
              height: '24px',
              borderTop: isTop ? '2px solid rgba(139,92,246,0.55)' : 'none',
              borderBottom: !isTop ? '2px solid rgba(139,92,246,0.55)' : 'none',
              borderLeft: isLeft ? '2px solid rgba(139,92,246,0.55)' : 'none',
              borderRight: !isLeft ? '2px solid rgba(139,92,246,0.55)' : 'none',
              zIndex: 51,
              pointerEvents: 'none',
            }}
          />
        )
      })}
    </div>
  )
}

function LightningFlash() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const flash = () => {
      canvas.style.opacity = '1'
      const x = 18 + Math.random() * 64
      const y = 4 + Math.random() * 22
      canvas.style.background = `
        radial-gradient(ellipse at ${x}% ${y}%, rgba(230,232,255,0.48), rgba(168,133,255,0.26) 18%, rgba(154,26,67,0.18) 34%, transparent 58%),
        linear-gradient(180deg, rgba(214,220,255,0.12), rgba(255,255,255,0) 45%)
      `

      setTimeout(() => {
        canvas.style.opacity = '0'
      }, 120 + Math.random() * 140)

      // Sometimes double-flash
      if (Math.random() > 0.42) {
        setTimeout(() => {
          canvas.style.opacity = '0.82'
          setTimeout(() => { canvas.style.opacity = '0' }, 70)
        }, 150)
      }
    }

    const schedule = () => {
      const delay = 2800 + Math.random() * 5500
      setTimeout(() => {
        flash()
        schedule()
      }, delay)
    }

    schedule()
  }, [])

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.05s ease',
      }}
    />
  )
}

export default function GothicAtmosphere() {
  return (
    <>
      {/* Fog layers */}
      {Array.from({ length: 4 }, (_, i) => (
        <FogLayer key={`fog-${i}`} index={i} />
      ))}

      {/* Rain */}
      <RainLayer />

      {/* Flying bats */}
      {Array.from({ length: 8 }, (_, i) => (
        <Bat key={`bat-${i}`} index={i} />
      ))}

      {/* Lightning flashes */}
      <LightningFlash />

      {/* Gothic arch viewport frame */}
      <GothicArchFrame />
    </>
  )
}
