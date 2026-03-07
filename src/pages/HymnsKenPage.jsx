import HymnCarousel from '../components/HymnCarousel'
import { kenHymns } from '../data/content'

function HymnsKenPage() {
  return (
    <section className="section">
      <h2>Hymns of Ken</h2>
      <p className="section-intro">
        Attend the secondary god: architect of law, keeper of pattern, patient builder of worlds
        that can bear the weight of becoming.
      </p>
      <HymnCarousel hymns={kenHymns} />
    </section>
  )
}

export default HymnsKenPage
