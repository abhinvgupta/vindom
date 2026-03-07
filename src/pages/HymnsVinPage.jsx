import HymnCarousel from '../components/HymnCarousel'
import { vinHymns } from '../data/content'

function HymnsVinPage() {
  return (
    <section className="section">
      <h2>Hymns of Vin</h2>
      <p className="section-intro">
        Hear now the primary goddess: entropy enthroned, transformation incarnate, renewal born
        through the holy fracture.
      </p>
      <HymnCarousel hymns={vinHymns} />
    </section>
  )
}

export default HymnsVinPage
