import VerseCard from '../components/VerseCard'
import { kenTeachings, vinTeachings } from '../data/content'

function PathToWisdomPage() {
  return (
    <section className="section">
      {/* Gothic page header */}
      <div className="page-header">
        <p className="eyebrow">✝ The Ancient Path ✝</p>
        <h2 className="page-title">Path to Wisdom</h2>
        <div className="title-ornament-line" aria-hidden="true" />
        <p className="section-intro">
          These teachings explain what Vindom looks like in an ordinary human
          life. Vin teaches us how to change with compassion. Ken teaches us how
          to build with discipline. Wisdom comes from learning both.
        </p>
      </div>

      <p className="skull-row" aria-hidden="true">☽ ✦ ☠ ✦ ☀</p>

      <div className="teachings-group">
        <h3 className="teachings-heading vin-heading">
          <span className="heading-glyph">☽</span> Teachings of Vin
        </h3>
        <div className="card-grid">
          {vinTeachings.map((teaching) => (
            <VerseCard
              key={teaching.title}
              title={teaching.title}
              text={teaching.text}
              className="path-card vin-teaching"
            />
          ))}
        </div>
      </div>

      <div className="teachings-group">
        <h3 className="teachings-heading ken-heading">
          <span className="heading-glyph">☀</span> Teachings of Ken
        </h3>
        <div className="card-grid">
          {kenTeachings.map((teaching) => (
            <VerseCard
              key={teaching.title}
              title={teaching.title}
              text={teaching.text}
              className="path-card ken-teaching"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PathToWisdomPage
