import VerseCard from "../components/VerseCard";
import { wisdomPrinciples } from "../data/content";

function PathToWisdomPage() {
  return (
    <section className="section">
      <h2>Path to Wisdom</h2>
      <p className="section-intro">
        These are the disciplines by which the seeker learns not merely to
        admire divine truth, but to live it. Walk them patiently, and your
        spirit will grow capable of both order and transformation.
      </p>
      <div className="card-grid">
        {wisdomPrinciples.map((principle) => (
          <VerseCard
            key={principle.title}
            title={principle.title}
            text={principle.text}
          />
        ))}
      </div>
    </section>
  );
}

export default PathToWisdomPage;
