import VerseCard from '../components/VerseCard'
import { cosmologyPillars } from '../data/content'

function CosmologyPage() {
  return (
    <section className="section">
      <h2>Cosmology</h2>
      <p className="section-intro">
        In every age I repeat this: Vin and Ken are not enemies, but complementary infinities.
        One turns the wheel; one sets the axle.
      </p>
      <div className="card-grid cosmology-grid">
        {cosmologyPillars.map((pillar) => (
          <VerseCard key={pillar.title} title={pillar.title} text={pillar.text} />
        ))}
      </div>
    </section>
  )
}

export default CosmologyPage
