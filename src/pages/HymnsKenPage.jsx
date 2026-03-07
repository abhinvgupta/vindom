import HymnCarousel from "../components/HymnCarousel";
import { kenHymns } from "../data/content";

function HymnsKenPage() {
  return (
    <section className="section">
      <h2>Hymns of Ken</h2>
      <p className="section-intro">
        Attend now to Ken, lord of order, structure, vow, and measured creation.
        He teaches that what is worthy of life must be given form, and that
        mercy itself requires foundations strong enough to endure time.
      </p>
      <HymnCarousel hymns={kenHymns} />
    </section>
  );
}

export default HymnsKenPage;
