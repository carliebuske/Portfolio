import Section from '../Section.jsx'
import { CAPABILITIES } from '../../data/site.js'

export default function Capabilities() {
  return (
    <Section no="02" label="Capabilities" id="capabilities" className="mt-20 md:mt-28">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {CAPABILITIES.map((col) => (
          <div key={col.heading}>
            <h3 className="mb-3 border-b border-ink/20 pb-2 font-mono text-[11px] uppercase tracking-label text-ink">
              {col.heading}
            </h3>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item} className="text-sm leading-snug text-ink/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
