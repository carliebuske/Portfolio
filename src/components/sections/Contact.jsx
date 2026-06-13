import Section from '../Section.jsx'
import { PROFILE } from '../../data/site.js'

export default function Contact() {
  return (
    <Section no="05" label="Contact" id="contact" className="mt-20 md:mt-28">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Let’s build the
            <br />
            experience<span className="text-oxblood">.</span>
          </h2>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-6 inline-block font-display text-xl font-semibold tracking-tight text-oxblood underline decoration-1 underline-offset-4 hover:opacity-70 md:text-2xl"
          >
            {PROFILE.email}
          </a>
        </div>

        <dl className="grid grid-cols-2 gap-y-4 font-mono text-[12px] uppercase tracking-wider">
          <div>
            <dt className="text-caption">Based in</dt>
            <dd className="mt-1 text-ink">{PROFILE.location}</dd>
          </div>
          <div>
            <dt className="text-caption">Web</dt>
            <dd className="mt-1 text-ink">{PROFILE.domain}</dd>
          </div>
          <div>
            <dt className="text-caption">For</dt>
            <dd className="mt-1 text-ink">Experiential · Creative · Innovation</dd>
          </div>
          <div>
            <dt className="text-caption">References</dt>
            <dd className="mt-1 text-ink">On request</dd>
          </div>
        </dl>
      </div>
    </Section>
  )
}
