import { cosmologyPillars } from '../data/content'

function CosmologyPage() {
  return (
    <section className="cosmology-page">
      <p className="eyebrow">Doctrine of the Celestial Wheel</p>
      <h2>Cosmology</h2>
      <p className="section-intro">
        In every age I repeat this truth: Vin and Ken are not enemies, but the
        two great powers through which the universe is made livable and alive.
        Ken gives form to the world. Vin transforms what form alone cannot
        complete.
      </p>
      <div className="cosmology-rule" aria-hidden="true" />
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
