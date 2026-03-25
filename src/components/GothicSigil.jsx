/**
 * GothicSigil — A rotating, pulsing occult sigil behind the hero title.
 * Pure SVG + CSS animation. Vivid indigo/violet tones with inscribed pentagram.
 */
export default function GothicSigil() {
  const points = 8
  const outerR = 160
  const innerR = 80
  const runeR = 130

  // Generate star polygon points
  const starPoints = Array.from({ length: points * 2 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / (points * 2) - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    return `${200 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`
  }).join(' ')

  // Rune positions around the circle
  const runes = ['\u16DB', '\u16DC', '\u263D', '\u2600', '\u16DB', '\u16DC', '\u2697', '\u2726']
  const runePositions = runes.map((rune, i) => {
    const angle = (Math.PI * 2 * i) / runes.length - Math.PI / 2
    return {
      x: 200 + runeR * Math.cos(angle),
      y: 200 + runeR * Math.sin(angle),
      char: rune,
    }
  })

  return (
    <div className="gothic-sigil-container" aria-hidden="true">
      <svg
        className="gothic-sigil"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sigil-glow">
            <stop offset="0%" stopColor="rgba(139,92,246,0.35)" />
            <stop offset="40%" stopColor="rgba(120,60,220,0.2)" />
            <stop offset="70%" stopColor="rgba(80,40,180,0.1)" />
            <stop offset="100%" stopColor="rgba(40,20,80,0)" />
          </radialGradient>
          <filter id="sigil-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="sigil-glow-filter">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Background glow — larger and brighter */}
        <circle cx="200" cy="200" r="190" fill="url(#sigil-glow)" />

        {/* Outer circle — brighter */}
        <circle
          cx="200" cy="200" r="175"
          fill="none"
          stroke="rgba(139,92,246,0.35)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
        />

        {/* Second circle */}
        <circle
          cx="200" cy="200" r="150"
          fill="none"
          stroke="rgba(139,92,246,0.25)"
          strokeWidth="0.8"
        />

        {/* Third decorative circle */}
        <circle
          cx="200" cy="200" r="115"
          fill="none"
          stroke="rgba(139,92,246,0.15)"
          strokeWidth="0.5"
          strokeDasharray="3 6"
        />

        {/* Star polygon — more vivid */}
        <polygon
          points={starPoints}
          fill="none"
          stroke="rgba(139,92,246,0.3)"
          strokeWidth="1.2"
          filter="url(#sigil-blur)"
        />
        {/* Glowing duplicate of star for more visibility */}
        <polygon
          points={starPoints}
          fill="none"
          stroke="rgba(160,110,255,0.12)"
          strokeWidth="2.5"
          filter="url(#sigil-glow-filter)"
        />

        {/* Inner octagram lines — brighter */}
        {Array.from({ length: points }, (_, i) => {
          const a1 = (Math.PI * 2 * i) / points - Math.PI / 2
          const a2 = (Math.PI * 2 * (i + Math.floor(points / 2))) / points - Math.PI / 2
          return (
            <line
              key={i}
              x1={200 + outerR * 0.6 * Math.cos(a1)}
              y1={200 + outerR * 0.6 * Math.sin(a1)}
              x2={200 + outerR * 0.6 * Math.cos(a2)}
              y2={200 + outerR * 0.6 * Math.sin(a2)}
              stroke="rgba(139,92,246,0.18)"
              strokeWidth="0.7"
            />
          )
        })}

        {/* Inscribed Pentagram — vivid */}
        {(() => {
          const pentR = 75
          const pentPoints = Array.from({ length: 5 }, (_, i) => {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
            return [200 + pentR * Math.cos(angle), 200 + pentR * Math.sin(angle)]
          })
          // Pentagram circle
          return (
            <g>
              <circle
                cx="200" cy="200" r={pentR}
                fill="none"
                stroke="rgba(139,92,246,0.15)"
                strokeWidth="0.6"
              />
              <g stroke="rgba(139,92,246,0.22)" strokeWidth="1" fill="none">
                {pentPoints.map((pt, i) => {
                  const next = pentPoints[(i + 2) % 5]
                  return <line key={i} x1={pt[0]} y1={pt[1]} x2={next[0]} y2={next[1]} />
                })}
              </g>
              {/* Glowing pentagram duplicate */}
              <g stroke="rgba(160,110,255,0.08)" strokeWidth="2.5" fill="none" filter="url(#sigil-glow-filter)">
                {pentPoints.map((pt, i) => {
                  const next = pentPoints[(i + 2) % 5]
                  return <line key={`g${i}`} x1={pt[0]} y1={pt[1]} x2={next[0]} y2={next[1]} />
                })}
              </g>
              {/* Pentagram vertices — small glowing dots */}
              {pentPoints.map((pt, i) => (
                <circle key={`pv${i}`} cx={pt[0]} cy={pt[1]} r="2.5" fill="rgba(139,92,246,0.3)" filter="url(#sigil-blur)" />
              ))}
            </g>
          )
        })()}

        {/* Inner circle — brighter */}
        <circle
          cx="200" cy="200" r="55"
          fill="none"
          stroke="rgba(139,92,246,0.28)"
          strokeWidth="1"
        />

        {/* Center glow point — LARGER and brighter */}
        <circle
          cx="200" cy="200" r="12"
          fill="rgba(139,92,246,0.15)"
          filter="url(#sigil-glow-filter)"
        />
        <circle
          cx="200" cy="200" r="6"
          fill="rgba(139,92,246,0.4)"
          filter="url(#sigil-blur)"
        />
        <circle
          cx="200" cy="200" r="2.5"
          fill="rgba(200,160,255,0.6)"
        />

        {/* Runes around the circle — brighter */}
        {runePositions.map((rune, i) => (
          <text
            key={i}
            x={rune.x}
            y={rune.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(139,92,246,0.35)"
            fontSize="16"
            fontFamily="serif"
          >
            {rune.char}
          </text>
        ))}
      </svg>
    </div>
  )
}
