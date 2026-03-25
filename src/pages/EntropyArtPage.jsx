import CrystalDispersal from '../components/art/CrystalDispersal'
import EmergentOrder from '../components/art/EmergentOrder'
import HeatDeath from '../components/art/HeatDeath'
import ArrowOfTime from '../components/art/ArrowOfTime'

function EntropyArtPage() {
  return (
    <section className="entropy-art-page section">
      {/* Gothic page header */}
      <div className="page-header">
        <p className="eyebrow">⚗ Algorithmic Proof of the Fundamental Law ⚗</p>
        <h2 className="page-title">The Entropy of All Things</h2>
        <div className="title-ornament-line" aria-hidden="true" />
        <p className="section-intro entropy-art-intro">
          This page connects the story of Vindom to the language of physics.
          In this view, entropy is not just a scientific idea. It is one of the
          clearest ways to understand why change is built into reality itself.
          These four algorithmic works make that idea visible through motion and pattern.
        </p>
        <span className="entropy-formula" style={{ marginTop: '0.6rem' }}>
          S = k<sub>B</sub> · ln(Ω) — The Boltzmann Equation
        </span>
      </div>

      <div className="cosmology-rule" aria-hidden="true" />
      <p className="skull-row" aria-hidden="true" style={{ color: 'rgba(139,92,246,0.6)', letterSpacing: '0.4em' }}>&#9911; &#10015; &#9911; &#10015; &#9911; &#10015; &#9911; &#10015; &#9911;</p>

      {/* Philosophical preamble */}
      <div className="entropy-art-preamble">
        <p>
          In Vindom, Vin represents transformation and Ken represents order.
          This page imagines their relationship through thermodynamics: structure can appear,
          but it does not remain untouched forever. Over time, systems change, spread out,
          and move toward new states.
        </p>
        <p>
          The artworks below are not just decoration. They are visual meditations on a core
          Vindom idea: entropy is not only about decay. It is also part of how new forms,
          new structures, and new possibilities emerge.
        </p>
      </div>

      {/* The four algorithmic art pieces */}
      <CrystalDispersal />

      <div className="art-divider" aria-hidden="true">
        <span style={{ color: 'rgba(139,92,246,0.6)', fontSize: '1.1rem' }}>&#9911;</span>
        <span style={{ margin: '0 0.8rem', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(139,92,246,0.3)', borderBottom: '1px dashed rgba(139,92,246,0.25)', paddingBottom: '2px' }}>
          &#10015; &middot; &#10015; &middot; &#10015;
        </span>
        <span style={{ color: 'rgba(139,92,246,0.6)', fontSize: '1.1rem' }}>&#9911;</span>
      </div>

      <EmergentOrder />

      <div className="art-divider" aria-hidden="true">
        <span style={{ color: 'rgba(139,92,246,0.6)', fontSize: '1.1rem' }}>&#9911;</span>
        <span style={{ margin: '0 0.8rem', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(139,92,246,0.3)', borderBottom: '1px dashed rgba(139,92,246,0.25)', paddingBottom: '2px' }}>
          &#10015; &middot; &#10015; &middot; &#10015;
        </span>
        <span style={{ color: 'rgba(139,92,246,0.6)', fontSize: '1.1rem' }}>&#9911;</span>
      </div>

      <HeatDeath />

      <div className="art-divider" aria-hidden="true">
        <span style={{ color: 'rgba(139,92,246,0.6)', fontSize: '1.1rem' }}>&#9911;</span>
        <span style={{ margin: '0 0.8rem', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(139,92,246,0.3)', borderBottom: '1px dashed rgba(139,92,246,0.25)', paddingBottom: '2px' }}>
          &#10015; &middot; &#10015; &middot; &#10015;
        </span>
        <span style={{ color: 'rgba(139,92,246,0.6)', fontSize: '1.1rem' }}>&#9911;</span>
      </div>

      <ArrowOfTime />

      {/* Closing meditation */}
      <div className="entropy-art-coda">
        <div className="cosmology-rule" aria-hidden="true" />
        <p className="skull-row" aria-hidden="true">☽ ✦ ⚗ ✦ ☀</p>
        <h3>The Proof Is in the Algorithm</h3>
        <p>
          These works show a simple truth: even when a system follows clear rules,
          it still moves forward through irreversible change. Order appears, dissolves,
          and gives way to something else. Time does not stand still, and neither does the world.
        </p>
        <p>
          For Vindom, that is not a reason for despair. It is the reason life is possible.
          Without transformation there would be no stars, no growth, no thought, and no becoming.
          Ken gives shape, Vin carries that shape forward, and the universe lives through both.
        </p>
        <p className="coda-final">
          <em>ΔS ≥ 0. Change is not outside the universe. It is one of the ways the universe lives.</em>
        </p>
      </div>
    </section>
  )
}

export default EntropyArtPage
