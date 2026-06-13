import Section from '../Section.jsx'
import { CLIENTS, AWARDS } from '../../data/site.js'

// Word list — slash-separated, editorial. No logos, just names.
function WordList({ items }) {
  return (
    <p className="font-display text-2xl font-bold leading-tight tracking-tight md:text-4xl md:leading-[1.15]">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && (
            <span className="px-2 font-normal text-caption md:px-3">/</span>
          )}
        </span>
      ))}
    </p>
  )
}

export default function ClientsAwards() {
  return (
    <Section no="04" label="Clients + Awards" id="clients" className="mt-20 md:mt-28">
      <div className="space-y-12">
        <div>
          <span className="label mb-4 block">Clients &amp; Partners</span>
          <WordList items={CLIENTS} />
        </div>
        <div>
          <span className="label mb-4 block">Awards</span>
          <WordList items={AWARDS} />
        </div>
      </div>
    </Section>
  )
}
