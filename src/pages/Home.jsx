import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import Hero from '../components/sections/Hero.jsx'
import Section from '../components/Section.jsx'
import MoodboardGrid from '../components/MoodboardGrid.jsx'
import QuickLookModal from '../components/QuickLookModal.jsx'
import Capabilities from '../components/sections/Capabilities.jsx'
import About from '../components/sections/About.jsx'
import ClientsAwards from '../components/sections/ClientsAwards.jsx'
import Contact from '../components/sections/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  const [active, setActive] = useState(null)

  return (
    <div className="min-h-screen bg-bone">
      <Nav />
      <main className="mx-auto max-w-editorial px-5 pb-10 md:px-8">
        <Hero />

        <Section no="01" label="Selected Work" id="work" className="mt-20 md:mt-28">
          <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-ink/70">
            A moodboard you can play with. Tiles hold the work; the color blocks are
            rest notes. Filter to focus, press &amp; hold to rearrange, tap any tile
            for a quick look.
          </p>
          <MoodboardGrid onOpen={setActive} />
        </Section>

        <Capabilities />
        <About />
        <ClientsAwards />
        <Contact />
        <Footer />
      </main>

      <QuickLookModal item={active} onClose={() => setActive(null)} />
    </div>
  )
}
