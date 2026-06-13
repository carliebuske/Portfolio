// Numbered section header with a hairline rule — the core editorial motif.
export default function Section({ no, label, id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="hairline mb-8 flex items-baseline gap-3 pt-5">
        <span className="section-no">{no}</span>
        <span className="label">{label}</span>
      </div>
      {children}
    </section>
  )
}
