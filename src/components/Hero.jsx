import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Pin, Play } from './icons.jsx'
import { driveThumb, videos } from '../data/videos.js'
import './Hero.css'

const stats = [
  { value: `${videos.length}+`, label: 'Videos shot & edited' },
  { value: '10', label: 'Brands served' },
  { value: '4-in-1', label: 'Shoot · Edit · Social · Design' },
]

const faces = [
  { src: 'media/client-itel.jpeg', name: 'itel' },
  { src: 'media/client-talkdaily.png', name: 'TalkDaily' },
  { src: 'media/client-hwoo.png', name: 'Hwoo' },
  { src: 'media/client-ziscomm.png', name: 'ZisComm' },
]

const trusted = ['itel Energy', 'TalkDaily', 'ZisComm USA', 'Hwoo Solar', 'ZisFone']

// The reel card on the right opens the Expo Karachi highlight film.
const reel = videos.find((v) => v.title === 'Expo Karachi — Highlights') ?? videos[0]

// Faint edit-timeline clips: [track, start %, width %]
const clips = [
  [0, 0, 22], [0, 24, 30], [0, 56, 18], [0, 76, 24],
  [1, 8, 16], [1, 40, 26], [1, 70, 12],
  [2, 0, 48], [2, 50, 50],
]

export default function Hero({ onPlay }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Some browsers block autoplay until the element is explicitly nudged.
    const play = video.play()
    if (play?.catch) play.catch(() => {})

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      setReady(true)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero__media">
        <video
          ref={videoRef}
          className={`hero__video ${ready ? 'is-ready' : ''}`}
          src="media/hero-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
        />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__rules" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>

      <div className="hero__inner">
        <div className="hero__lead">
          <p className="hero__note">
            <Pin className="hero__note-icon" />
            <span>Videographer &amp; Video Editor — Pakistan,<br />working with brands in Pakistan &amp; the USA</span>
          </p>

          <h1 className="hero__title">
            Raw Footage<br />
            Crafted into<br />
            Real <em>Stories</em>
          </h1>

          <p className="hero__sub">
            I’m Muhammad Aswad Rustam. I shoot, cut, grade and sound-design brand films,
            event coverage and social content that people actually stop and watch.
          </p>

          <div className="hero__cta">
            <a className="btn btn--flame hero__go" href="#work">
              View my work
              <span className="btn__dot" aria-hidden="true"><ArrowRight /></span>
            </a>

            <div className="hero__proof">
              <div className="hero__faces" aria-hidden="true">
                {faces.map((f) => <img key={f.name} src={f.src} alt="" />)}
              </div>
              <span className="hero__proof-text">
                <strong>10+ Brands</strong>
                Pakistan &amp; USA
              </span>
            </div>
          </div>

          <ul className="hero__stats">
            {stats.map((stat) => (
              <li key={stat.label} className="stat">
                <span className="stat__mark" aria-hidden="true">*</span>
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
                <span className="stat__rule" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>

        <aside className="hero__reel">
          <button
            type="button"
            className="reel__frame"
            onClick={() => onPlay(reel)}
            aria-label={`Play featured film: ${reel.title}`}
          >
            <img src={driveThumb(reel.id, 900)} alt="" loading="eager" />
            <span className="reel__rec" aria-hidden="true"><i /> REC</span>
            <span className="reel__tc" aria-hidden="true">00:00:24:12</span>
            <span className="reel__play" aria-hidden="true"><Play /></span>
            <span className="reel__caption">
              <small>Featured film</small>
              {reel.title}
            </span>
          </button>

          <div className="reel__timeline" aria-hidden="true">
            {['V2', 'V1', 'A1'].map((track, t) => (
              <div key={track} className="reel__track">
                <b>{track}</b>
                <div>
                  {clips.filter((c) => c[0] === t).map(([, left, width]) => (
                    <span key={left} style={{ left: `${left}%`, width: `${width}%` }} />
                  ))}
                </div>
              </div>
            ))}
            <i className="reel__head" />
          </div>
        </aside>
      </div>

      <div className="hero__foot">
        <span className="hero__watermark" aria-hidden="true">REEL</span>
        <div className="hero__partners">
          <span className="hero__partners-label">Trusted by</span>
          <ul>
            {trusted.map((name) => (
              <li key={name}><span className="hero__partners-dot" aria-hidden="true" />{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
