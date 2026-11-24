import { useEffect, useState } from 'react'
import { Close, Logo, Menu } from './icons.jsx'
import { contact } from '../data/contact.js'
import './Navbar.css'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Tools', href: '#tools' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="nav__brand" href="#main" aria-label="Aswad Rustam — back to top">
        <Logo className="nav__logo" />
        <span>Aswad<em>.</em></span>
      </a>

      <nav className="nav__pill" aria-label="Primary">
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav__actions">
        <a className="btn btn--light nav__cta" href={contact.whatsapp} target="_blank" rel="noreferrer">
          Hire me
        </a>
        <button
          className="nav__burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="nav__sheet">
          <ul>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--flame nav__sheet-cta"
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Hire me on WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
