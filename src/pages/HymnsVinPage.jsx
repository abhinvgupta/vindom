import HymnCarousel from "../components/HymnCarousel";
import { vinHymns } from "../data/content";

function HymnsVinPage() {
  return (
    <section className="section">
      <h2>Hymns of Vin</h2>
      <p className="section-intro">
        Hear now the voice of Vin, first among the divine powers: she who
        loosens all hardened forms, who reveals transformation within every
        ending, and who teaches that no true becoming is possible without
        surrender.
      </p>
      <HymnCarousel hymns={vinHymns} />
    </section>
  );
}

export default HymnsVinPage;
