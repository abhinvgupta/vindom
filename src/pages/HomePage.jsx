import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EntropyRitual from "../components/EntropyRitual";

// ── Cosmic Background — Planets, orbits, nebulae ──────────────
function CosmicBackground() {
  return (
    <div className="cosmic-bg" aria-hidden="true">
      {/* Nebula layers */}
      <div className="cosmic-nebula cosmic-nebula-1" />
      <div className="cosmic-nebula cosmic-nebula-2" />
      <div className="cosmic-nebula cosmic-nebula-3" />

      {/* Orbital rings */}
      <div className="cosmic-orbit cosmic-orbit-1">
        <div className="cosmic-planet cosmic-planet-1" />
      </div>
      <div className="cosmic-orbit cosmic-orbit-2">
        <div className="cosmic-planet cosmic-planet-2" />
      </div>
      <div className="cosmic-orbit cosmic-orbit-3">
        <div className="cosmic-planet cosmic-planet-3" />
        <div className="cosmic-moon" />
      </div>

      {/* Distant gas giant */}
      <div className="cosmic-giant" />
      <div className="cosmic-giant-ring" />

      {/* Tiny distant stars */}
      {Array.from({ length: 40 }, (_, i) => (
        <span
          key={i}
          className="cosmic-star"
          style={{
            left: `${(i * 2.47 + Math.sin(i * 1.7) * 8) % 100}%`,
            top: `${(i * 3.1 + Math.cos(i * 2.3) * 12) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            animationDelay: `${(i * 0.3) % 5}s`,
            opacity: 0.15 + (i % 5) * 0.08,
          }}
        />
      ))}
    </div>
  )
}

// ── Gargoyle sentinel SVG ──────────────────────────────────────
function GargoyleSentinel({ side = 'left' }) {
  const flip = side === 'right'
  return (
    <svg className="gargoyle-sentinel" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ position: 'absolute', [side]: '-10px', top: '0', width: '90px', height: '135px', opacity: 0.3, transform: flip ? 'scaleX(-1)' : 'none', filter: 'drop-shadow(0 0 15px rgba(139,92,246,0.3))', pointerEvents: 'none' }}>
      <g fill="rgba(30,20,55,0.9)" stroke="rgba(120,70,220,0.4)" strokeWidth="0.8">
        <path d="M15,55 Q0,25 10,10 Q20,0 35,8 Q50,15 55,30 Q58,40 50,50 Z" />
        <path d="M20,50 Q8,30 12,15 Q18,5 30,10 Q42,18 48,35 Z" opacity="0.5" />
        <path d="M105,55 Q120,25 110,10 Q100,0 85,8 Q70,15 65,30 Q62,40 70,50 Z" />
        <path d="M100,50 Q112,30 108,15 Q102,5 90,10 Q78,18 72,35 Z" opacity="0.5" />
        <ellipse cx="60" cy="90" rx="28" ry="35" />
        <circle cx="60" cy="50" r="18" />
        <path d="M48,38 Q38,18 32,5" strokeWidth="2.5" fill="none" stroke="rgba(100,60,180,0.5)" />
        <path d="M72,38 Q82,18 88,5" strokeWidth="2.5" fill="none" stroke="rgba(100,60,180,0.5)" />
        <circle cx="53" cy="48" r="3.5" fill="rgba(139,92,246,0.8)" />
        <circle cx="67" cy="48" r="3.5" fill="rgba(139,92,246,0.8)" />
        <circle cx="53" cy="48" r="1.5" fill="rgba(200,160,255,0.9)" />
        <circle cx="67" cy="48" r="1.5" fill="rgba(200,160,255,0.9)" />
        <path d="M46,42 Q53,39 60,42 Q67,39 74,42" strokeWidth="1.5" fill="none" stroke="rgba(100,60,180,0.4)" />
        <path d="M55,58 L57,66 L59,58" fill="rgba(200,180,240,0.5)" />
        <path d="M61,58 L63,66 L65,58" fill="rgba(200,180,240,0.5)" />
        <path d="M35,120 L28,138 M38,122 L33,140 M42,123 L38,141" strokeWidth="1.8" fill="none" stroke="rgba(100,60,180,0.4)" />
        <path d="M85,120 L92,138 M82,122 L87,140 M78,123 L82,141" strokeWidth="1.8" fill="none" stroke="rgba(100,60,180,0.4)" />
        <path d="M60,125 Q70,148 88,158 Q98,162 105,152 Q108,145 100,148" strokeWidth="2" fill="none" stroke="rgba(100,60,180,0.4)" />
      </g>
    </svg>
  )
}

// ── Castle silhouette ──────────────────────────────────────────
function EnhancedCastleSilhouette() {
  return (
    <svg className="castle-silhouette" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <rect x="0" y="185" width="1200" height="20" fill="rgba(3,1,5,1)" />
      <rect x="0" y="120" width="50" height="65" fill="rgba(8,3,10,0.97)" />
      <polygon points="0,120 25,70 50,120" fill="rgba(8,3,10,0.97)" />
      <polygon points="18,80 25,45 32,80" fill="rgba(8,3,10,0.97)" />
      <rect x="21" y="135" width="4" height="16" fill="rgba(80,30,160,0.4)" />
      <rect x="18" y="141" width="10" height="4" fill="rgba(80,30,160,0.4)" />
      <rect x="70" y="105" width="40" height="80" fill="rgba(8,3,10,0.97)" />
      <polygon points="70,105 90,60 110,105" fill="rgba(8,3,10,0.97)" />
      <polygon points="84,70 90,40 96,70" fill="rgba(8,3,10,0.97)" />
      <rect x="86" y="125" width="4" height="14" fill="rgba(80,30,160,0.35)" />
      <rect x="50" y="155" width="130" height="30" fill="rgba(8,3,10,0.97)" />
      {[0,18,36,54,72,90,108].map(x => <rect key={`lw${x}`} x={52+x} y="143" width="12" height="14" fill="rgba(8,3,10,0.97)" />)}
      <path d="M170,115 Q145,90 120,155" stroke="rgba(8,3,10,0.97)" strokeWidth="6" fill="none" />
      <rect x="165" y="65" width="85" height="120" fill="rgba(6,2,8,0.98)" />
      <rect x="158" y="48" width="99" height="22" fill="rgba(6,2,8,0.98)" />
      <polygon points="158,48 207,5 257,48" fill="rgba(6,2,8,0.98)" />
      <polygon points="196,15 207,-15 218,15" fill="rgba(6,2,8,0.98)" />
      <rect x="198" y="85" width="6" height="24" fill="rgba(80,30,160,0.45)" />
      <rect x="275" y="85" width="35" height="100" fill="rgba(7,2,9,0.98)" />
      <polygon points="275,85 292,50 310,85" fill="rgba(7,2,9,0.98)" />
      <rect x="248" y="135" width="170" height="50" fill="rgba(7,2,9,0.97)" />
      {[0,24,48,72,96,120,144].map(x => <rect key={`cw${x}`} x={250+x} y="122" width="16" height="16" fill="rgba(7,2,9,0.97)" />)}
      <path d="M418,80 Q380,55 340,130" stroke="rgba(7,2,9,0.97)" strokeWidth="6" fill="none" />
      <rect x="400" y="5" width="130" height="180" fill="rgba(5,1,8,1)" />
      <rect x="390" y="-8" width="150" height="20" fill="rgba(5,1,8,1)" />
      <polygon points="390,-8 465,-70 540,-8" fill="rgba(5,1,8,1)" />
      <polygon points="448,-58 465,-95 482,-58" fill="rgba(5,1,8,1)" />
      <line x1="465" y1="-95" x2="465" y2="-108" stroke="rgba(139,92,246,0.25)" strokeWidth="1.5" />
      <line x1="459" y1="-102" x2="471" y2="-102" stroke="rgba(139,92,246,0.25)" strokeWidth="1.5" />
      <circle cx="465" cy="42" r="24" fill="none" stroke="rgba(139,92,246,0.22)" strokeWidth="2" />
      <circle cx="465" cy="42" r="16" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      <circle cx="465" cy="42" r="8" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="0.8" />
      <line x1="465" y1="18" x2="465" y2="66" stroke="rgba(139,92,246,0.18)" strokeWidth="1.2" />
      <line x1="441" y1="42" x2="489" y2="42" stroke="rgba(139,92,246,0.18)" strokeWidth="1.2" />
      <path d="M450 185 L450 115 Q465 90 480 115 L480 185 Z" fill="rgba(80,30,160,0.5)" />
      <path d="M453 185 L453 118 Q465 95 477 118 L477 185 Z" fill="rgba(139,92,246,0.12)" />
      <ellipse cx="465" cy="183" rx="20" ry="8" fill="rgba(139,92,246,0.12)" />
      <path d="M510,80 Q550,55 590,130" stroke="rgba(7,2,9,0.97)" strokeWidth="6" fill="none" />
      <rect x="520" y="135" width="170" height="50" fill="rgba(7,2,9,0.97)" />
      {[0,24,48,72,96,120,144].map(x => <rect key={`rw${x}`} x={522+x} y="122" width="16" height="16" fill="rgba(7,2,9,0.97)" />)}
      <rect x="620" y="85" width="35" height="100" fill="rgba(7,2,9,0.98)" />
      <polygon points="620,85 637,50 655,85" fill="rgba(7,2,9,0.98)" />
      <rect x="680" y="65" width="85" height="120" fill="rgba(6,2,8,0.98)" />
      <rect x="673" y="48" width="99" height="22" fill="rgba(6,2,8,0.98)" />
      <polygon points="673,48 722,5 772,48" fill="rgba(6,2,8,0.98)" />
      <polygon points="711,15 722,-15 733,15" fill="rgba(6,2,8,0.98)" />
      <rect x="716" y="85" width="6" height="24" fill="rgba(80,30,160,0.45)" />
      <path d="M760,115 Q785,90 810,155" stroke="rgba(8,3,10,0.97)" strokeWidth="6" fill="none" />
      <rect x="750" y="155" width="140" height="30" fill="rgba(8,3,10,0.97)" />
      {[0,18,36,54,72,90,108,126].map(x => <rect key={`rwl${x}`} x={752+x} y="143" width="12" height="14" fill="rgba(8,3,10,0.97)" />)}
      <rect x="900" y="105" width="40" height="80" fill="rgba(8,3,10,0.97)" />
      <polygon points="900,105 920,60 940,105" fill="rgba(8,3,10,0.97)" />
      <rect x="960" y="110" width="45" height="75" fill="rgba(8,3,10,0.97)" />
      <polygon points="960,110 982,65 1005,110" fill="rgba(8,3,10,0.97)" />
      <rect x="1005" y="155" width="100" height="30" fill="rgba(8,3,10,0.97)" />
      <rect x="1110" y="125" width="35" height="60" fill="rgba(8,3,10,0.97)" />
      <polygon points="1110,125 1127,90 1145,125" fill="rgba(8,3,10,0.97)" />
      <rect x="1145" y="160" width="55" height="25" fill="rgba(8,3,10,0.97)" />
      <rect x="0" y="183" width="1200" height="20" fill="rgba(3,1,5,1)" />
    </svg>
  )
}

// ── Creeper vine border ────────────────────────────────────────
function CreeperVine({ flip = false }) {
  return (
    <svg viewBox="0 0 800 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '40px', transform: flip ? 'scaleX(-1)' : 'none', opacity: 0.6 }}>
      <path d="M0,20 C30,5 50,35 80,20 C110,5 130,35 160,20 C190,5 210,35 240,20 C270,5 290,35 320,20 C350,5 370,35 400,20 C430,5 450,35 480,20 C510,5 530,35 560,20 C590,5 610,35 640,20 C670,5 690,35 720,20 C750,5 770,35 800,20"
        stroke="rgba(80,30,160,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="800" strokeDashoffset="0" style={{ animation: 'vine-grow 3s ease-out both' }} />
      {[40,120,200,280,360,440,520,600,680,760].map((x, i) => (
        <g key={x} transform={`translate(${x}, ${i % 2 === 0 ? 12 : 28})`}><ellipse cx="0" cy="0" rx="5" ry="3" fill="rgba(60,20,100,0.45)" transform="rotate(30)" /></g>
      ))}
    </svg>
  )
}

function SkullDivider({ label }) {
  return (
    <div className="skull-divider" aria-hidden="true">
      <span style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', top: '50%', left: '-35px', width: '30px', height: '1px', background: 'rgba(139,92,246,0.3)' }} />
        <span style={{ color: 'rgba(139,92,246,0.6)' }}>&#10015;</span>
      </span>
      {label && <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(139,92,246,0.5)' }}>{label}</span>}
      <span style={{ position: 'relative' }}>
        <span style={{ color: 'rgba(139,92,246,0.6)' }}>&#10015;</span>
        <span style={{ position: 'absolute', top: '50%', right: '-35px', width: '30px', height: '1px', background: 'rgba(139,92,246,0.3)' }} />
      </span>
    </div>
  )
}

// ── Scroll indicator ───────────────────────────────────────────
function ScrollIndicator() {
  return (
    <div className="hero-scroll-indicator" aria-hidden="true">
      <span className="hero-scroll-text">Descend</span>
      <svg width="20" height="30" viewBox="0 0 20 30">
        <path d="M10,0 L10,24" stroke="rgba(139,92,246,0.6)" strokeWidth="1" fill="none" />
        <path d="M4,18 L10,26 L16,18" stroke="rgba(139,92,246,0.6)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}

// ── Hero parallax ──────────────────────────────────────────────
function useHeroParallax() {
  const heroRef = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrolled = window.scrollY
      const img = heroRef.current.querySelector('.hero-image')
      const overlay = heroRef.current.querySelector('.hero-title-overlay')
      if (img) img.style.transform = `scale(1.12) translateY(${scrolled * 0.1}px)`
      if (overlay) overlay.style.transform = `translateY(${scrolled * -0.2}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return heroRef
}

// ══════════════════════════════════════════════════════════════
//  HOME PAGE
// ══════════════════════════════════════════════════════════════

function HomePage() {
  const heroRef = useHeroParallax()
  const [heroLoaded, setHeroLoaded] = useState(false)

  return (
    <main className="homepage">

      {/* ── COSMIC SPACE BACKGROUND (fixed behind everything) ── */}
      <CosmicBackground />

      {/* ── FULL-VIEWPORT HERO — cover image + text overlay ── */}
      <section className="hero-immersive" id="home" ref={heroRef}>
        <figure className="hero-media-full">
          <img
            src="/hero.png"
            alt="Two divine figures before a gothic cathedral under a blood moon"
            className="hero-image"
            onLoad={() => setHeroLoaded(true)}
          />
        </figure>

        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-fog-layer" aria-hidden="true" />

        {/* ── All hero text overlaid on image ── */}
        <div className={`hero-title-overlay ${heroLoaded ? 'hero-revealed' : ''}`}>
          <p className="hero-eyebrow-top">Hear the Ancient Wisdom</p>

          <h1 className="hero-grand-title">Vindom</h1>
          <p className="hero-grand-subtitle">Temple of the Dark Gods</p>

          <div className="hero-divider-line" aria-hidden="true" />

          <p className="hero-tagline">
            Between Ken and Vin, the whole of life is written.
          </p>
          <p className="hero-subtext">
            Order gives the world its bones. Transformation gives it breath.
          </p>

          <div className="hero-divider-thin" aria-hidden="true" />

          <p className="hero-tagline hero-tagline-second">
            What is built must endure. What endures must also change.
          </p>
          <p className="hero-subtext">
            Vindom is the path of learning when to hold fast, and when to let go.
          </p>

          <div className="hero-overlay-prose">
            <p className="hero-overlay-lead">
              At the heart of Vindom stand two sacred powers: <strong>Ken</strong>, who grants order and steadiness, and <strong>Vin</strong>, who brings change, renewal, and becoming.
            </p>
            <p className="hero-overlay-lead">
              This path does not ask us to choose one and cast aside the other. It asks us to learn when to build, when to release, and how both belong to a life of meaning.
            </p>
          </div>

          <div className="hero-pillars hero-pillars-overlay" aria-label="The two powers of Vindom">
            <div className="hero-pillar">
              <span className="hero-pillar-glyph" aria-hidden="true">&#10022;</span>
              <div>
                <strong>Ken</strong>
                <p>Order, discipline, law, and firm foundations.</p>
              </div>
            </div>
            <div className="hero-pillar">
              <span className="hero-pillar-glyph" aria-hidden="true">&#9760;</span>
              <div>
                <strong>Vin</strong>
                <p>Change, transformation, renewal, and growth.</p>
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ── ENTROPY RITUAL — Second Law visualization ──────── */}
      <EntropyRitual />


      {/* ── CASTLE SILHOUETTE ───────────────────────── */}
      <div aria-hidden="true" style={{ margin: '0 -1.5rem', lineHeight: 0, position: 'relative', zIndex: 1 }}>
        <EnhancedCastleSilhouette />
      </div>

      {/* ── THE TWO DARK POWERS ─────────────────────── */}
      <section className="section scroll-reveal" id="divine-powers" style={{ position: 'relative' }}>
        <GargoyleSentinel side="left" />
        <GargoyleSentinel side="right" />
        <div className="section-frame" aria-hidden="true"
          style={{ position: 'absolute', top: '6px', left: '6px', right: '6px', bottom: '6px', border: '1px solid rgba(139,92,246,0.1)', pointerEvents: 'none' }} />

        <p className="eyebrow">The Two Divine Powers</p>
        <h2>Vin and Ken</h2>

        <CreeperVine />

        <div className="deity-grid">
          <article className="deity-card vin-card">
            <div className="deity-image-wrap">
              <img src="/images/vin.jpeg" alt="Vin, goddess of transformation" className="deity-image" />
            </div>
            <div className="deity-content">
              <h3><span style={{ color: 'rgba(139,92,246,0.7)', marginRight: '0.4rem' }}>&#9760;</span> Vin &mdash; Goddess of Transformation</h3>
              <p>Vin is the power by which all forms are changed.</p>
              <p>She is present in endings, in growth, in sorrow, in healing, and in every hour when life asks us to loosen one form so another may appear.</p>
              <p>What seems like ruin at close hand is often, in Vindom, the universe preparing room for a deeper life.</p>
              <p>Through Vin, the cosmos does not lie still.</p>
              <p><strong style={{ color: 'rgba(160,110,255,0.9)' }}>It continues to become.</strong></p>
            </div>
          </article>

          <article className="deity-card ken-card">
            <div className="deity-image-wrap">
              <img src="/images/ken.png" alt="Ken, keeper of order" className="deity-image" />
            </div>
            <div className="deity-content">
              <h3><span style={{ color: 'rgba(139,92,246,0.7)', marginRight: '0.4rem' }}>&#10022;</span> Ken &mdash; Keeper of Order</h3>
              <p>Ken is the keeper of foundations.</p>
              <p>He is present in vows kept, homes built with care, habits that guard us, and every structure that helps life endure.</p>
              <p>Through Ken arise the patterns by which the world holds together: law, memory, discipline, and shared order.</p>
              <p>Without Ken, nothing would remain steady long enough to grow.</p>
              <p><strong style={{ color: 'var(--ivory)' }}>He gives life a firm place upon which to stand.</strong></p>
            </div>
          </article>
        </div>

        <CreeperVine flip />
      </section>

      {/* ── THE DOCTRINE ────────────────────────────── */}
      <section className="section scroll-reveal" id="doctrine">
        <p className="eyebrow">The Doctrine of Vindom</p>
        <h2>The Rhythm of the Cosmos</h2>
        <p className="lead" style={{ margin: '0 0 0.8rem' }}>
          Vindom teaches that life is best understood when we behold both sides of nature: what must be built, and what must be changed.
        </p>
        <SkullDivider />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '600px', margin: '1.5rem auto' }}>
          <div style={{ padding: '1.2rem', border: '1px solid rgba(80,30,160,0.5)', background: 'rgba(20,5,40,0.6)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.85rem', color: 'rgba(139,92,246,0.8)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>&#10022; Ken Builds</div>
            <p style={{ margin: 0, color: 'var(--bone-dark)', fontSize: '0.9rem' }}>Structure, law, pattern, and endurance</p>
          </div>
          <div style={{ padding: '1.2rem', border: '1px solid rgba(100,40,200,0.5)', background: 'rgba(25,5,50,0.6)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.85rem', color: 'rgba(160,110,255,0.85)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>&#9760; Vin Transforms</div>
            <p style={{ margin: 0, color: 'var(--bone-dark)', fontSize: '0.9rem' }}>Change, entropy, and renewal</p>
          </div>
        </div>
        <p className="lead" style={{ margin: '1rem auto 0.5rem' }}>If all things remained the same forever, life would harden into stillness. If all things changed without shape or care, life would fall into disorder.</p>
        <p className="lead">Vindom dwells in the balance between these truths: steady enough to endure, open enough to grow.</p>
        <p className="lead"><strong>To feel that rhythm within your own life is the beginning of wisdom.</strong></p>
      </section>

      {/* ── SACRED HYMNS ────────────────────────────── */}
      <section className="section scroll-reveal" id="hymns">
        <p className="eyebrow">Sacred Scriptures</p>
        <h2>The Sacred Hymns</h2>
        <p className="lead" style={{ margin: '0 0 0.6rem' }}>
          These hymns tell the story of Vindom in a more poetic and sacred voice. Here you may read the words of{' '}
          <strong style={{ color: 'rgba(160,110,255,0.9)' }}>Hymns of Vin</strong>{' '}and the{' '}
          <strong style={{ color: 'var(--ivory)' }}>Hymns of Ken</strong>.
        </p>
        <p className="lead">Within them you will find:</p>
        <ul className="scripture-list">
          <li>how worlds are built and changed</li>
          <li>why endings belong to life</li>
          <li>why discipline has its sacred use</li>
          <li>how transformation prepares the way for new life</li>
        </ul>
        <p className="lead">They are meant for reflection, not blind obedience.</p>
        <div className="hero-actions">
          <Link to="/hymns-vin" className="button">&#9760; Hymns of Vin</Link>
          <Link to="/hymns-ken" className="button button-secondary">&#10022; Hymns of Ken</Link>
        </div>
      </section>

      {/* ── PATH TO WISDOM ──────────────────────────── */}
      <section className="section scroll-reveal" id="path">
        <p className="eyebrow">Path to Wisdom</p>
        <h2>The Mortal Way</h2>
        <p className="lead" style={{ margin: '0 0 0.7rem' }}>
          In the common life of mortals, Vindom is not about choosing order over change. It is about learning when one is needed, when the other is called for, and how to live with both.
        </p>
        <p className="lead">Some seasons ask us to build habits, duties, and shelter.</p>
        <p className="lead">Other seasons ask us to release what has ended and step into a new form of life.</p>
        <p className="lead">The path to wisdom is learning to know these moments apart.</p>
        <div className="hero-actions">
          <Link to="/path-to-wisdom" className="button">Walk the Path</Link>
        </div>
      </section>

      {/* ── CLOSING QUOTE ───────────────────────────── */}
      <section className="section closing-section scroll-reveal" id="closing">
        <SkullDivider label="The Final Truth" />
        <blockquote className="closing-quote">
          Attend to the hidden rhythm beneath your life.
          <br /><br />
          When Ken calls for structure, build with devotion.
          <br />
          When Vin calls for transformation, release without fear.
          <br /><br />
          Between these two movements, a fuller life becomes possible.
        </blockquote>
        <div aria-hidden="true" style={{ marginTop: '2rem', fontFamily: "'UnifrakturMaguntia', serif", fontSize: '1.5rem', color: 'rgba(139,92,246,0.3)', letterSpacing: '0.3em', textAlign: 'center' }}>
          &#9760; Vindom &#9760;
        </div>
      </section>
    </main>
  )
}

export default HomePage
