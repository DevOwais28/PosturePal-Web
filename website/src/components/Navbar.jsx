import { useState, useEffect } from 'react'
import logoIcon from '../logo_icon.png'
import s from './Navbar.module.css'

const LINKS = [
  { label: 'Features',      href: '#features' },
  { label: 'How It Works',  href: '#how-it-works' },
  { label: 'Screens',       href: '#screens' },
  { label: 'FAQ',           href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`${s.nav} ${scrolled ? s.solid : ''}`}>
      <div className={s.inner}>
        {/* Brand */}
        <a href="#" className={s.brand}>
          <img src={logoIcon} alt="PosturePal" className={s.logo} />
          <span className={s.name}>Posture<span className={s.accent}>Pal</span></span>
        </a>

        {/* Desktop links */}
        <ul className={s.links}>
          {LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} className={s.link}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#download" className={s.cta}>Early Access</a>

        {/* Hamburger */}
        <button
          className={`${s.burger} ${open ? s.burgerOpen : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={s.drawer}>
          {LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className={s.drawerLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#download" className={s.drawerCta} onClick={() => setOpen(false)}>
            Early Access
          </a>
        </div>
      )}
    </nav>
  )
}
