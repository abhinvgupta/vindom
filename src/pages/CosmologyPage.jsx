import { cosmologyPillars } from '../data/content'

function CosmologyPage() {
  return (
    <section className="cosmology-page section">
      {/* Gothic page header */}
      <div className="page-header">
        <p className="eyebrow">⚔ Doctrine of the Celestial Wheel ⚔</p>
        <h2 className="page-title">Cosmology</h2>
        <div className="title-ornament-line" aria-hidden="true" />
        <p className="section-intro cosmology-page-intro">
          This is the creation story of Vindom. It begins before stars or time,
          and it explains how Ken and Vin together make a universe that can both
          endure and change.
        </p>
      </div>

      <div className="cosmology-rule" aria-hidden="true" />

      {/* Flanking skull row */}
      <p className="skull-row" aria-hidden="true">
        ✦ ☠ ✦ ☠ ✦ ☠ ✦ ☠ ✦ ☠ ✦ ☠ ✦
      </p>

      <div className="cosmology-text-flow">
        {cosmologyPillars.map((pillar, index) => (
          <article key={pillar.title} className="cosmology-entry">
            <p className="cosmology-marker">Canticle {index + 1}</p>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CosmologyPage
