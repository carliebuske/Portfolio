import Section from '../Section.jsx'
import { ABOUT } from '../../data/site.js'

export default function About() {
  return (
    <Section no="03" label="About" id="about" className="mt-20 md:mt-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Narrative */}
        <div className="max-w-xl space-y-5">
          {ABOUT.body.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl'
                  : 'text-[15px] leading-relaxed text-ink/80'
              }
            >
              {p}
            </p>
          ))}
        </div>

        {/* Experience timeline */}
        <div className="space-y-8">
          {ABOUT.experience.map((job) => (
            <div key={job.role} className="border-t border-ink/15 pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-lg font-bold tracking-tight">{job.role}</h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-caption">
                  {job.dates}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-oxblood/80">
                {job.org}
              </p>
              <ul className="mt-3 space-y-1.5">
                {job.points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-snug text-ink/80">
                    <span className="text-caption">→</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Education */}
          <div className="border-t border-ink/15 pt-4">
            <span className="label">Education</span>
            <h3 className="mt-2 font-display text-lg font-bold tracking-tight">
              {ABOUT.education.school}
            </h3>
            <p className="mt-1 text-sm text-ink/70">
              {ABOUT.education.detail}{' '}
              <span className="font-mono text-[11px] tracking-wider text-caption">
                {ABOUT.education.dates}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
