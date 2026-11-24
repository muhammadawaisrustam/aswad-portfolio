import { useState } from 'react'
import { Close } from './icons.jsx'
import useReveal from './useReveal.js'
import './About.css'

const roles = ['Senior Video Editor', 'Videographer', 'Social Media Manager', 'Graphic Designer']

const tools = [
  { name: 'Adobe Premiere Pro', note: 'Editing', src: 'media/tool-premiere.png' },
  { name: 'DaVinci Resolve', note: 'Colour & edit', src: 'media/tool-davinci.png' },
  { name: 'Adobe After Effects', note: 'Motion graphics', src: 'media/tool-aftereffects.png' },
  { name: 'CapCut', note: 'Social cuts', src: 'media/tool-capcut.png' },
  { name: 'Adobe Creative Cloud', note: 'Design suite', src: 'media/tool-creativecloud.png' },
]

const certs = [
  { name: 'DaVinci Resolve', src: 'media/cert-davinci.png' },
  { name: 'Social Media Management', src: 'media/cert-social.png' },
]

const logos = [
  ['itel Energy', 'media/client-itel.jpeg'],
  ['TalkDaily', 'media/client-talkdaily.png'],
  ['ZisComm', 'media/client-ziscomm.png'],
  ['ZisFone', 'media/client-zisfone.png'],
  ['Zis Consultants', 'media/client-zisconsultants.png'],
  ['Hwoo', 'media/client-hwoo.png'],
  ['DailyCare', 'media/client-dailycare.png'],
  ['Meeral', 'media/client-meeral.png'],
  ['MR Video Editor', 'media/client-mr.png'],
  ['Travel', 'media/client-travel.png'],
]

export default function About() {
  const [cert, setCert] = useState(null)
  const introRef = useReveal()
  const toolsRef = useReveal()
  const logosRef = useReveal()

  return (
    <section className="section about" id="about">
      <div className="section__wrap">
        <div className="about__intro reveal" ref={introRef}>
          <figure className="about__photo">
            <img src="media/aswad.png" alt="Portrait of Muhammad Aswad Rustam" loading="lazy" />
            <figcaption>
              <span className="about__live" aria-hidden="true" />
              Available for freelance &amp; full-time
            </figcaption>
          </figure>

          <div className="about__copy">
            <span className="eyebrow"><b>03</b> About me</span>
            <h2 className="section__title">The editor who<br />thinks like a <em>marketer</em></h2>
            <p>
              I’m <strong>Muhammad Aswad Rustam</strong>, a videographer and video editor who turns
              raw footage into stories that engage, inspire and leave a lasting impact. I care about
              pacing, sound and the small details that make people keep watching.
            </p>
            <p>
              At <strong>itel Energy</strong> I work as Senior Video Editor, Videographer, Social Media
              Manager and Graphic Designer — covering expos and summits, shooting product films and
              running social content. I’ve also produced ongoing ad campaigns for US telecom brands
              including TalkDaily, ZisComm and ZisFone, and solar brand Hwoo.
            </p>
            <ul className="about__roles">
              {roles.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </div>

        <div className="about__kit reveal" id="tools" ref={toolsRef}>
          <div className="about__tools">
            <h3>Toolkit</h3>
            <ul>
              {tools.map((t) => (
                <li key={t.name}>
                  <img src={t.src} alt="" loading="lazy" />
                  <span><strong>{t.name}</strong>{t.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about__certs">
            <h3>Certifications</h3>
            <ul>
              {certs.map((c) => (
                <li key={c.name}>
                  <button type="button" onClick={() => setCert(c)} aria-label={`View ${c.name} certificate`}>
                    <img src={c.src} alt="" loading="lazy" />
                    <span>{c.name}<small>View certificate</small></span>
                  </button>
                </li>
              ))}
              <li className="about__cert-plain">
                <span>Adobe Creative Suite<small>Certified</small></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="about__logos reveal" ref={logosRef}>
          <h3>Brands I’ve made videos for</h3>
          <ul>
            {logos.map(([name, src]) => (
              <li key={name}><img src={src} alt={name} loading="lazy" /></li>
            ))}
          </ul>
        </div>
      </div>

      {cert && (
        <div className="cert-view" role="dialog" aria-modal="true" aria-label={`${cert.name} certificate`} onClick={() => setCert(null)}>
          <button type="button" className="cert-view__close" aria-label="Close certificate" onClick={() => setCert(null)}>
            <Close />
          </button>
          <img src={cert.src} alt={`${cert.name} certificate`} />
        </div>
      )}
    </section>
  )
}
