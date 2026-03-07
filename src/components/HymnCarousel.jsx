import { useState } from 'react'

function HymnCarousel({ hymns }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const hymn = hymns[currentIndex]
  const total = hymns.length

  const goNext = () => {
    setCurrentIndex((index) => (index + 1) % total)
  }

  const goPrevious = () => {
    setCurrentIndex((index) => (index - 1 + total) % total)
  }

  return (
    <div className="hymn-carousel">
      <div className="hymn-scroll-shell">
        <div className="scroll-rod top" aria-hidden="true" />
        <article className="hymn-scroll-card">
          <p className="hymn-counter">
            Hymn {currentIndex + 1} of {total}
          </p>
          <h3>{hymn.title}</h3>
          <p className="hymn-body">{hymn.text}</p>
        </article>
        <div className="scroll-rod bottom" aria-hidden="true" />
      </div>

      <div className="hymn-controls">
        <button type="button" onClick={goPrevious}>
          Previous Hymn
        </button>
        <button type="button" onClick={goNext}>
          Next Hymn
        </button>
      </div>
    </div>
  )
}

export default HymnCarousel
