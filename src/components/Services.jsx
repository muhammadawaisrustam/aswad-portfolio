import { services as glyphs } from './icons.jsx'
import useReveal from './useReveal.js'
import './Services.css'

const services = [
  { icon: 'edit', title: 'Video Editing', copy: 'Story-first cuts with tight pacing, clean transitions and sound that carries the edit — from 15-second ads to long-form brand films.' },
  { icon: 'camera', title: 'Videography', copy: 'On-set shooting for products, offices and people. Lighting, framing and B-roll planned around the final edit.' },
  { icon: 'social', title: 'Social Media Content', copy: 'Vertical reels and ad variations built to stop the scroll, with hooks, captions and platform-ready exports.' },
  { icon: 'event', title: 'Event & Expo Coverage', copy: 'Fast-turnaround highlight films from expos, summits and launches — delivered while the event is still trending.' },
  { icon: 'motion', title: 'Motion Graphics', copy: 'Titles, lower-thirds, logo reveals and animated callouts in After Effects that keep a brand consistent.' },
  { icon: 'grade', title: 'Colour & Sound', copy: 'Colour grading in DaVinci Resolve plus music, SFX and clean dialogue so every frame looks and sounds finished.' },
]

const process = [
  { step: 'Brief', copy: 'Goals, audience, references' },
  { step: 'Shoot', copy: 'Plan, light, capture' },
  { step: 'Edit', copy: 'Structure, pacing, story' },
  { step: 'Polish', copy: 'Colour, sound, motion' },
  { step: 'Deliver', copy: 'Every format, on time' },
]

export default function Services() {
  const headRef = useReveal()
  const gridRef = useReveal()
  const procRef = useReveal()

  return (
    <section className="section services" id="services">
      <div className="section__wrap">
        <div className="section__head reveal" ref={headRef}>
          <div>
            <span className="eyebrow"><b>02</b> What I do</span>
            <h2 className="section__title">From first frame<br />to final <em>export</em></h2>
          </div>
          <p className="section__lede">
            One person who can plan the shoot, hold the camera, cut the story and ship the
            social versions — so nothing gets lost between handoffs.
          </p>
        </div>

        <ul className="services__grid reveal" ref={gridRef}>
          {services.map((s, i) => (
            <li key={s.title} className="service">
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="service__icon">{glyphs[s.icon]}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </li>
          ))}
        </ul>

        <ol className="process reveal" ref={procRef} aria-label="How a project runs">
          {process.map((p, i) => (
            <li key={p.step}>
              <span className="process__dot" aria-hidden="true">{i + 1}</span>
              <strong>{p.step}</strong>
              <span>{p.copy}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
