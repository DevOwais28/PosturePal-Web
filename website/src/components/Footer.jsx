import logoIcon from '../logo_icon.png'
import s from './Footer.module.css'

const LINKS = [
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Screens',      href: '#screens' },
  { label: 'Download',     href: '#download' },
  { label: 'FAQ',          href: '#faq' },
]

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <img src={logoIcon} alt="PosturePal" className={s.logo} />
            <div>
              <div className={s.name}>Posture<span className={s.accent}>Pal</span></div>
              <div className={s.tagline}>Train · Track · Transform</div>
            </div>
          </div>

          <nav className={s.nav}>
            {LINKS.map(l => (
              <a key={l.label} href={l.href} className={s.link}>{l.label}</a>
            ))}
          </nav>
        </div>

        <div className={s.bottom}>
          <p className={s.copy}>© 2026 PosturePal. All rights reserved.</p>
          <p className={s.note}>Built with ❤️ in Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
