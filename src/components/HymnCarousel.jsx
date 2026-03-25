import { useState } from 'react'

function HymnCarousel({ hymns, deity = 'vin' }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const hymn = hymns[currentIndex]
  const total = hymns.length
  const isVin = deity === 'vin'

  const navigate = (next) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(next)
      setIsTransitioning(false)
    }, 220)
  }

  const goNext = () => navigate((currentIndex + 1) % total)
  const goPrevious = () => navigate((currentIndex - 1 + total) % total)

  return (
    <div className={`hymn-carousel hymn-carousel-${deity}`}>
      {/* Stone tablet frame */}
      <div className="hymn-tablet-frame">
        {/* Top stone rod with blood or gold tint */}
        <div className={`stone-rod stone-rod-top ${isVin ? 'rod-blood' : 'rod-gold'}`} aria-hidden="true" />

        <article
          className={`hymn-scroll-card hymn-tablet ${isTransitioning ? 'hymn-fade-out' : 'hymn-fade-in'} ${isVin ? 'tablet-vin' : 'tablet-ken'}`}
        >
          {/* Corner runes */}
          <span className="tablet-rune tablet-rune-tl" aria-hidden="true">᚛</span>
          <span className="tablet-rune tablet-rune-tr" aria-hidden="true">᚜</span>

          {/* Header bar */}
          <div className="hymn-header-bar">
            <span className="hymn-deity-glyph" aria-hidden="true">
              {isVin ? '☽' : '☀'}
            </span>
            <p className="hymn-counter">
              Hymn {currentIndex + 1} of {total}
            </p>
            <span className="hymn-deity-glyph" aria-hidden="true">
              {isVin ? '☽' : '☀'}
            </span>
          </div>

          {/* Divider */}
          <div className={`hymn-title-rule ${isVin ? 'rule-blood' : 'rule-gold'}`} aria-hidden="true" />

          {/* Title */}
          <h3>{hymn.title}</h3>

          {/* Second divider */}
          <div className={`hymn-body-rule ${isVin ? 'rule-blood' : 'rule-gold'}`} aria-hidden="true" />

          {/* Body text */}
          <p className="hymn-body">{hymn.text}</p>

          {/* Bottom runes */}
          <span className="tablet-rune tablet-rune-bl" aria-hidden="true">᚛</span>
          <span className="tablet-rune tablet-rune-br" aria-hidden="true">᚜</span>
        </article>

        <div className={`stone-rod stone-rod-bottom ${isVin ? 'rod-blood' : 'rod-gold'}`} aria-hidden="true" />
      </div>

      {/* Navigation */}
      <div className="hymn-controls">
        <button
          type="button"
          onClick={goPrevious}
          className={`hymn-btn ${isVin ? 'hymn-btn-vin' : 'hymn-btn-ken'}`}
          disabled={isTransitioning}
          aria-label="Previous hymn"
        >
          ← Previous
        </button>

        {/* Dot indicators */}
        <div className="hymn-dots" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`hymn-dot ${i === currentIndex ? 'active' : ''} ${isVin ? 'dot-vin' : 'dot-ken'}`}
              onClick={() => navigate(i)}
              aria-label={`Go to hymn ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className={`hymn-btn ${isVin ? 'hymn-btn-vin' : 'hymn-btn-ken'}`}
          disabled={isTransitioning}
          aria-label="Next hymn"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default HymnCarousel
