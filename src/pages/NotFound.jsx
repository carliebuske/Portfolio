import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bone px-6 text-center">
      <span className="font-mono text-[11px] uppercase tracking-label text-caption">
        404
      </span>
      <h1 className="mt-4 font-display text-5xl font-black tracking-tight md:text-7xl">
        Off the board<span className="text-oxblood">.</span>
      </h1>
      <p className="mt-4 max-w-md text-ink/70">
        That page isn’t part of the layout. Let’s get you back to the work.
      </p>
      <Link
        to="/"
        className="mt-8 font-mono text-[12px] uppercase tracking-label text-oxblood hover:opacity-70"
      >
        ← Back to home
      </Link>
    </div>
  )
}
