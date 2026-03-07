import VerseCard from '../components/VerseCard'
import { kenTeachings, vinTeachings } from '../data/content'

function PathToWisdomPage() {
  return (
    <section className="section">
      <h2>Path to Wisdom</h2>
      <p className="section-intro">
        Study the teachings of both divine powers. Vin teaches compassionate
        transformation. Ken teaches enduring structure.
      </p>

      <div className="teachings-group">
        <h3 className="teachings-heading vin-heading">Teachings of Vin</h3>
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
        <h3 className="teachings-heading ken-heading">Teachings of Ken</h3>
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
