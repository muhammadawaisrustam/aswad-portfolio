import { useEffect, useRef } from 'react'
import { Close } from './icons.jsx'
import { clients, drivePreview } from '../data/videos.js'
import './Player.css'

// A native <dialog> gives us focus trapping, Esc-to-close and an inert page for free.
export default function Player({ video, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (video && !dialog.open) dialog.showModal()
    if (!video && dialog.open) dialog.close()
  }, [video])

  return (
    <dialog
      ref={ref}
      className="player"
      aria-label={video ? `Playing ${video.title}` : 'Video player'}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
    >
      {video && (
        <div className={`player__box is-${video.format}`}>
          <div className="player__bar">
            <div>
              <strong>{video.title}</strong>
              <span>{clients[video.client]} · {video.category}</span>
            </div>
            <button type="button" className="player__close" onClick={onClose} aria-label="Close video">
              <Close />
            </button>
          </div>
          <div className="player__frame">
            <iframe
              key={video.id}
              src={drivePreview(video.id)}
              title={video.title}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </dialog>
  )
}
