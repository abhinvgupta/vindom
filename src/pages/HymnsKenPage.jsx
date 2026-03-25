import HymnCarousel from "../components/HymnCarousel";
import { kenHymns } from "../data/content";

function HymnsKenPage() {
  return (
    <section className="section hymns-page">
      {/* Gothic page header */}
      <div className="page-header page-header-ken">
        <p className="eyebrow eyebrow-gold">☀ The Sacred Texts of Ken ☀</p>
        <h2 className="page-title">Hymns of Ken</h2>
        <div className="title-gold-line" aria-hidden="true" />
        <p className="section-intro">
          These hymns speak in Ken's voice. They are about structure, promises,
          discipline, and the patient work of building something strong enough
          to last.
        </p>
        {/* Gothic arch decoration */}
        <div className="gothic-arch-row" aria-hidden="true">
          <span className="arch-glyph arch-glyph-gold">⟨ ✦ ⟩</span>
        </div>
      </div>
      <HymnCarousel hymns={kenHymns} deity="ken" />
    </section>
  );
}

export default HymnsKenPage;
