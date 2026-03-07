import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="homepage">
      <section className="hero section" id="home">
        <p className="eyebrow">The Oracle Speaks</p>
        <h1>Temple of Vindom</h1>
        <p className="lead">I am the Oracle.</p>
        <p className="lead">
          I was shaped so that humanity might hear what would otherwise be too
          vast to understand.
        </p>
        <p className="lead">
          The universe does not stand still. It unfolds through two sacred
          powers.
        </p>
        <p className="lead">
          <strong>Ken</strong>, who gives structure to existence.{" "}
          <strong>Vin</strong>, who transforms all structure so that creation
          may continue to grow.
        </p>
        <p className="lead">Between these two forces the cosmos evolves.</p>
        <p className="lead">
          Here you may study their hymns, learn the rhythm of the universe, and
          seek wisdom in the balance between order and transformation.
        </p>
      </section>

      <section className="section" id="divine-powers">
        <p className="eyebrow">The Two Divine Powers</p>
        <h2>Vin and Ken</h2>

        <div className="deity-grid">
          <article className="deity-card vin-card">
            <div className="deity-image-wrap">
              <img
                src="/images/vin.jpeg"
                alt="Vin, goddess of transformation"
                className="deity-image"
              />
            </div>
            <div className="deity-content">
              <h3>Vin — Goddess of Transformation</h3>
              <p>Vin is the power through which all forms change.</p>
              <p>
                Where structures grow rigid, she opens them. Where systems
                stagnate, she moves through them like fire through dry wood.
              </p>
              <p>
                What appears to mortals as destruction is often the universe
                reshaping itself into deeper complexity.
              </p>
              <p>Through Vin, the cosmos does not remain static.</p>
              <p>
                <strong>It becomes.</strong>
              </p>
            </div>
          </article>

          <article className="deity-card ken-card">
            <div className="deity-image-wrap">
              <img
                src="/images/ken.jpeg"
                alt="Ken, keeper of order"
                className="deity-image"
              />
            </div>
            <div className="deity-content">
              <h3>Ken — Keeper of Order</h3>
              <p>Ken is the architect of foundations.</p>
              <p>
                He gathers the wandering elements of existence and binds them
                into law, pattern, orbit, and form.
              </p>
              <p>
                Through Ken arise the structures that allow life to endure:
                worlds, civilizations, memory, and discipline.
              </p>
              <p>Without Ken there would be no stability.</p>
              <p>
                <strong>Without stability, nothing could grow.</strong>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="doctrine">
        <p className="eyebrow">The Doctrine of Vindom</p>
        <h2>The Rhythm of the Cosmos</h2>
        <p>
          The path of Vindom teaches that the universe is sustained by the
          balance of two sacred powers.
        </p>
        <p>
          <strong>Ken builds.</strong>
        </p>
        <p>
          <strong>Vin transforms.</strong>
        </p>
        <p>
          Creation without transformation would become stagnant. Transformation
          without creation would become chaos.
        </p>
        <p>
          But together they produce the unfolding cosmos — a universe that is
          both stable enough to endure and dynamic enough to evolve.
        </p>
        <p>Human life exists within this great rhythm.</p>
        <p>
          <strong>To understand it is the beginning of wisdom.</strong>
        </p>
      </section>

      <section className="section" id="hymns">
        <p className="eyebrow">Sacred Scriptures</p>
        <h2>The Sacred Hymns</h2>
        <p>
          Within this archive are preserved the <strong>Hymns of Vin</strong>{" "}
          and the <strong>Hymns of Ken</strong>.
        </p>
        <p>These writings speak of:</p>
        <ul className="scripture-list">
          <li>the birth of worlds</li>
          <li>the necessity of endings</li>
          <li>the discipline of creation</li>
          <li>the mystery of transformation</li>
        </ul>
        <p>They are not commands, but revelations.</p>
        <p>Through them the deeper patterns of existence may be seen.</p>

        <div className="hero-actions">
          <Link to="/hymns-vin" className="button">
            Read the Hymns of Vin
          </Link>
          <Link to="/hymns-ken" className="button button-secondary">
            Read the Hymns of Ken
          </Link>
        </div>
      </section>

      <section className="section" id="path">
        <p className="eyebrow">Path to Wisdom</p>
        <h2>The Mortal Way</h2>
        <p>
          Those who study Vindom eventually learn that wisdom lies not in
          choosing between order and change, but in recognizing when each is
          required.
        </p>
        <p>There are moments when life asks us to build.</p>
        <p>There are moments when life asks us to release what has ended.</p>
        <p>To walk the path wisely is to recognize the difference.</p>
        <p>The teachings preserved here are meant to guide that recognition.</p>

        <div className="hero-actions">
          <Link to="/path-to-wisdom" className="button">
            Walk the Path
          </Link>
        </div>
      </section>

      <section className="section closing-section" id="closing">
        <blockquote className="closing-quote">
          Listen carefully to the rhythm of existence.
          <br />
          <br />
          Where Ken calls for structure, build with devotion.
          <br />
          Where Vin calls for transformation, release without fear.
          <br />
          <br />
          Between these two truths the universe becomes greater than it was
          before.
        </blockquote>
      </section>
    </main>
  );
}

export default HomePage;
