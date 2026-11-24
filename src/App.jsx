import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Player from './components/Player.jsx'

export default function App() {
  // One shared player so only a single Drive iframe ever exists on the page.
  const [playing, setPlaying] = useState(null)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero onPlay={setPlaying} />
        <Work onPlay={setPlaying} />
        <Services />
        <About />
        <Contact />
      </main>
      <Player video={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
