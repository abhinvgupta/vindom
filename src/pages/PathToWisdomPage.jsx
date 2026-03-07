import VerseCard from '../components/VerseCard'
import { wisdomPrinciples } from '../data/content'

function PathToWisdomPage() {
  return (
    <section className="section">
      <h2>Path to Wisdom</h2>
      <p className="section-intro">
        Walk these five disciplines and your spirit will not shatter when the heavens turn.
      </p>
      <div className="card-grid">
        {wisdomPrinciples.map((principle) => (
          <VerseCard key={principle.title} title={principle.title} text={principle.text} />
        ))}
      </div>
    </section>
  )
}

export default PathToWisdomPage
