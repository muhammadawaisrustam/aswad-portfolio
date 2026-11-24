import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Mail, WhatsApp } from './icons.jsx'
import { contact, mailto } from '../data/contact.js'
import useReveal from './useReveal.js'
import './Contact.css'

const types = ['Brand film', 'Social media ads', 'Event / expo coverage', 'Editing only', 'Something else']

export default function Contact() {
  const [form, setForm] = useState({ name: '', type: types[0], message: '' })
  const ref = useReveal()

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  // No backend: compose the inquiry into the visitor's own mail app.
  const send = (e) => {
    e.preventDefault()
    const body = `Hi Aswad,\n\nProject type: ${form.type}\n\n${form.message}\n\n— ${form.name}`
    window.location.href = mailto(`${form.type} — inquiry from ${form.name || 'website'}`, body)
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="section__wrap">
        <div className="contact__grid reveal" ref={ref}>
          <div className="contact__lead">
            <span className="eyebrow"><b>04</b> Let’s work together</span>
            <h2 className="contact__title">Got footage?<br />Let’s make it <em>worth watching.</em></h2>
            <p>
              Tell me about your brand, your event or the reel you need. I usually reply within
              a few hours on WhatsApp.
            </p>

            <div className="contact__links">
              <a className="contact__link" href={contact.whatsapp} target="_blank" rel="noreferrer">
                <span className="contact__icon"><WhatsApp /></span>
                <span><small>WhatsApp</small>{contact.phone}</span>
                <ArrowUpRight className="contact__arrow" />
              </a>
              <a className="contact__link" href={mailto()}>
                <span className="contact__icon"><Mail /></span>
                <span><small>Email</small>{contact.email}</span>
                <ArrowUpRight className="contact__arrow" />
              </a>
            </div>
          </div>

          <form className="contact__form" onSubmit={send}>
            <label>
              <span>Your name</span>
              <input required value={form.name} onChange={update('name')} placeholder="Jane from Brand Co." autoComplete="name" />
            </label>
            <fieldset>
              <legend>What do you need?</legend>
              <div className="contact__types">
                {types.map((t) => (
                  <label key={t} className={`chip ${form.type === t ? 'is-on' : ''}`}>
                    <input type="radio" name="type" value={t} checked={form.type === t} onChange={update('type')} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
            <label>
              <span>Project details</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Timeline, budget, where it will be posted, links to references…"
              />
            </label>
            <button type="submit" className="btn btn--flame contact__submit">
              Send inquiry
              <span className="btn__dot" aria-hidden="true"><ArrowRight /></span>
            </button>
            <p className="contact__hint">Opens your email app with the details filled in.</p>
          </form>
        </div>
      </div>

      <footer className="footer">
        <span className="footer__mark" aria-hidden="true">ASWAD</span>
        <div className="footer__row">
          <span>© {new Date().getFullYear()} Muhammad Aswad Rustam. All rights reserved.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </section>
  )
}
