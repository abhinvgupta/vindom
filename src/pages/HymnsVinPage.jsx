import HymnCarousel from "../components/HymnCarousel";
import { vinHymns } from "../data/content";

function HymnsVinPage() {
  return (
    <section className="section hymns-page">
      {/* Gothic page header */}
      <div className="page-header page-header-vin">
        <p className="eyebrow eyebrow-blood">☽ The Sacred Texts of Vin ☽</p>
        <h2 className="page-title">Hymns of Vin</h2>
        <div className="title-blood-line" aria-hidden="true" />
        <p className="section-intro">
          These hymns speak in Vin's voice. They are about endings, change,
          grief, renewal, and the strange truth that letting go is often part
          of becoming something new.
        </p>
        {/* Gothic arch decoration */}
        <div className="gothic-arch-row" aria-hidden="true">
          <span className="arch-glyph">⟨ ✦ ⟩</span>
        </div>
      </div>
      <HymnCarousel hymns={vinHymns} deity="vin" />
    </section>
  );
}

export default HymnsVinPage;
