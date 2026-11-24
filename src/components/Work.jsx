import { useMemo, useState } from 'react'
import { Play } from './icons.jsx'
import { clients, driveThumb, videos } from '../data/videos.js'
import useReveal from './useReveal.js'
import './Work.css'

const byTitle = (title) => videos.find((v) => v.title === title)

// Hand-picked lead pieces. Wide films first, then a strip of vertical reels —
// one per brand — so each format is shown at its own shape.
const films = [
  'Expo Karachi — Highlights',
  'itel Energy — Cut 06',
  'itel Energy — Cut 08',
  'itel Energy — Expo Booth',
  'itel Energy — Cut 07',
].map(byTitle).filter(Boolean)

const reels = [
  'REVOO EV × itel Power Tank',
  'Hwoo Solar — Cut 01',
  'TalkDaily — Cut 05',
  'ZisComm USA — Cut 14',
  'ZisFone — Cut 02',
].map(byTitle).filter(Boolean)

const PAGE = 12

function Thumb({ video, size }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span className="card__fallback" aria-hidden="true">
        <span>{clients[video.client]}</span>
      </span>
    )
  }
  const src = driveThumb(video.id, size)
  return (
    <>
      {/* Vertical clips in a wide frame: blurred fill behind, full frame on top. */}
      {video.format === 'vertical' && <img className="card__fill" src={src} alt="" aria-hidden="true" loading="lazy" referrerPolicy="no-referrer" />}
      <img
        className="card__img"
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </>
  )
}

function Card({ video, onPlay, large = false, reel = false, index }) {
  return (
    <li className={`card ${large ? 'card--large' : ''} ${reel ? 'card--reel' : ''} is-${video.format}`}>
      <button type="button" className="card__btn" onClick={() => onPlay(video)} aria-label={`Play ${video.title}`}>
        <span className="card__media">
          <Thumb video={video} size={large ? 1000 : 640} />
          <span className="card__play" aria-hidden="true"><Play /></span>
          {index != null && <span className="card__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
        </span>
        <span className="card__meta">
          <span className="card__title">{video.title}</span>
          <span className="card__tags">
            <span>{clients[video.client]}</span>
            <span>{video.category}</span>
          </span>
        </span>
      </button>
    </li>
  )
}

export default function Work({ onPlay }) {
  const [filter, setFilter] = useState('all')
  const [shown, setShown] = useState(PAGE)
  const headRef = useReveal()
  const featRef = useReveal()
  const reelRef = useReveal()
  const archRef = useReveal()

  const filters = useMemo(() => {
    const counts = videos.reduce((acc, v) => ({ ...acc, [v.client]: (acc[v.client] || 0) + 1 }), {})
    return [{ key: 'all', label: 'All work', count: videos.length },
      ...Object.keys(counts).map((key) => ({ key, label: clients[key], count: counts[key] }))]
  }, [])

  const list = filter === 'all' ? videos : videos.filter((v) => v.client === filter)

  return (
    <section className="section work" id="work">
      <div className="section__wrap">
        <div className="section__head reveal" ref={headRef}>
          <div>
            <span className="eyebrow"><b>01</b> Selected work</span>
            <h2 className="section__title">Films that make<br />brands <em>move</em></h2>
          </div>
          <p className="section__lede">
            Expo coverage, product films and scroll-stopping social ads — shot on set and finished
            in the edit. Tap any piece to watch it.
          </p>
        </div>

        <ul className="work__featured reveal" ref={featRef}>
          {films.map((video, i) => (
            <Card key={video.id} video={video} onPlay={onPlay} large={i < 2} index={i} />
          ))}
        </ul>

        <div className="work__reels reveal" ref={reelRef}>
          <div className="work__reels-head">
            <h3>Reels &amp; social ads</h3>
            <span>Vertical · made for Instagram, TikTok &amp; Facebook</span>
          </div>
          <ul>
            {reels.map((video, i) => (
              <Card key={video.id} video={video} onPlay={onPlay} reel index={films.length + i} />
            ))}
          </ul>
        </div>

        <div className="work__archive reveal" ref={archRef}>
          <div className="work__archive-head">
            <h3>The full archive</h3>
            <div className="work__filters" role="tablist" aria-label="Filter by client">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.key}
                  className={`chip ${filter === f.key ? 'is-on' : ''}`}
                  onClick={() => { setFilter(f.key); setShown(PAGE) }}
                >
                  {f.label}<span>{f.count}</span>
                </button>
              ))}
            </div>
          </div>

          <ul className="work__grid">
            {list.slice(0, shown).map((video) => (
              <Card key={video.id} video={video} onPlay={onPlay} />
            ))}
          </ul>

          {shown < list.length && (
            <div className="work__more">
              <button type="button" className="btn btn--ghost" onClick={() => setShown((n) => n + PAGE)}>
                Show more <span className="work__more-count">{list.length - shown} left</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
