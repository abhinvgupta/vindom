function GothicFooter() {
  return (
    <footer className="gothic-footer">
      {/* Blood drip separator at top */}
      <div className="footer-drip-row" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => {
          const h = 18 + Math.sin(i * 1.7 + 0.4) * 12
          const w = 4 + Math.cos(i * 2.1) * 2
          const delay = (i * 0.12).toFixed(2)
          return (
            <span
              key={i}
              className="footer-drip"
              style={{
                height: `${h}px`,
                width: `${w}px`,
                animationDelay: `${delay}s`,
              }}
            />
          )
        })}
      </div>

      <div className="footer-inner">
        {/* Ornament row */}
        <p className="footer-ornament" aria-hidden="true">
          ✟ ☠ ✟ ☠ ✟ ☠ ✟ ☠ ✟ ☠ ✟ ☠ ✟ ☠ ✟ ☠ ✟
        </p>

        {/* Brand with gargoyle silhouettes */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
          <svg viewBox="0 0 40 50" width="28" height="35" aria-hidden="true" style={{ opacity: 0.3 }}>
            <g fill="rgba(139,92,246,0.4)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5">
              <path d="M5,20 Q2,10 8,5 Q14,2 18,8 Q20,12 18,18 Z" />
              <path d="M35,20 Q38,10 32,5 Q26,2 22,8 Q20,12 22,18 Z" />
              <ellipse cx="20" cy="28" rx="10" ry="12" />
              <circle cx="20" cy="16" r="7" />
              <circle cx="17" cy="15" r="1.5" fill="rgba(139,92,246,0.5)" />
              <circle cx="23" cy="15" r="1.5" fill="rgba(139,92,246,0.5)" />
            </g>
          </svg>
          <p className="footer-brand" style={{ margin: 0, fontSize: '2rem', textShadow: '0 0 20px rgba(139,92,246,0.3)' }}>Vindom</p>
          <svg viewBox="0 0 40 50" width="28" height="35" aria-hidden="true" style={{ opacity: 0.3, transform: 'scaleX(-1)' }}>
            <g fill="rgba(139,92,246,0.4)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5">
              <path d="M5,20 Q2,10 8,5 Q14,2 18,8 Q20,12 18,18 Z" />
              <path d="M35,20 Q38,10 32,5 Q26,2 22,8 Q20,12 22,18 Z" />
              <ellipse cx="20" cy="28" rx="10" ry="12" />
              <circle cx="20" cy="16" r="7" />
              <circle cx="17" cy="15" r="1.5" fill="rgba(139,92,246,0.5)" />
              <circle cx="23" cy="15" r="1.5" fill="rgba(139,92,246,0.5)" />
            </g>
          </svg>
        </div>

        {/* Doctrine */}
        <p className="footer-doctrine">
          A religion of order, transformation, and becoming · Ken and Vin
        </p>

        {/* Three pillars */}
        <div className="footer-pillars">
          <div className="footer-pillar">
            <span className="footer-pillar-glyph">☽</span>
            <span className="footer-pillar-label">Vin</span>
            <span className="footer-pillar-sub">Goddess of Entropy</span>
          </div>
          <div className="footer-pillar-divider" aria-hidden="true">✟</div>
          <div className="footer-pillar">
            <span className="footer-pillar-glyph">☀</span>
            <span className="footer-pillar-label">Ken</span>
            <span className="footer-pillar-sub">Keeper of Order</span>
          </div>
        </div>

        {/* Closing verse */}
        <blockquote className="footer-verse">
          "What falls is not always lost. Sometimes it is being carried
          toward its next form."
        </blockquote>

        {/* Copyright / lore */}
        <p className="footer-lore">
          ΔS ≥ 0 · Change is part of reality · All forms are temporary
        </p>

        {/* Bottom ornament */}
        <p className="footer-ornament footer-ornament-bottom" aria-hidden="true">
          ✟ ✦ ✟
        </p>
      </div>
    </footer>
  )
}

export default GothicFooter
