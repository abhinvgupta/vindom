function VerseCard({ title, text, className = '' }) {
  return (
    <article className={`verse-card ${className}`.trim()}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default VerseCard
