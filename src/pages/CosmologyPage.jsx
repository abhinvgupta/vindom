import VerseCard from "../components/VerseCard";
import { cosmologyPillars } from "../data/content";

function CosmologyPage() {
  return (
    <section className="section">
      <h2>Cosmology</h2>
      <p className="section-intro">
        In every age I repeat this truth: Vin and Ken are not enemies, but the
        two great powers through which the universe is made livable and alive.
        Ken gives form to the world. Vin transforms what form alone cannot
        complete.
      </p>
      <div className="card-grid cosmology-grid">
        {cosmologyPillars.map((pillar) => (
          <VerseCard
            key={pillar.title}
            title={pillar.title}
            text={pillar.text}
          />
        ))}
      </div>
    </section>
  );
}

export default CosmologyPage;
