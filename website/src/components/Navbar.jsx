import React, { useState, useEffect } from 'react'
import logoIcon from '../logo_icon.png'

const LINKS = [
  { label: 'Architecture',  href: '#features' },
  { label: 'Simulator',     href: '#walkthrough' },
  { label: 'Beta Access',   href: '#download' },
  { label: 'FAQ',           href: '#faq' },
]

export default function Navbar({ onOpenLegal }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed inset-x-5 top-5 z-50 transition-all duration-300 ${
      scrolled ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-12 opacity-0 pointer-events-none'
    }`}>
      <div
        className="max-w-5xl mx-auto px-5 py-2.5 flex items-center justify-between rounded-full border bg-[#090B10]/95 border-[#38BDF8]/30 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(56,189,248,0.15)] backdrop-blur-xl"
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0 text-decoration-none">
          <img
            src={logoIcon}
            alt="PosturePal"
            width="34"
            height="34"
            className="w-[34px] h-[34px] max-w-[34px] max-h-[34px] min-w-[34px] min-h-[34px] rounded-lg object-contain block shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            style={{ width: 34, height: 34 }}
          />
          <div className="flex items-center">
            <span className="font-display font-extrabold text-white text-lg tracking-tight">
              Posture<span className="italic text-[#38BDF8]">Pal</span>
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-2 py-0.5 rounded-full ml-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shadow-[0_0_6px_#34D399] animate-pulse" />
            Offline AI
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="px-3.5 py-1.5 text-sm font-medium text-slate-400 hover:text-[#38BDF8] hover:bg-[#38BDF8]/10 rounded-full transition-colors cursor-pointer"
            >
              Policies & Legal
            </button>
          </li>
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#download"
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-white hover:bg-slate-200 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get Early Access</span>
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1 p-2 text-white bg-transparent border-0 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white rounded transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="pointer-events-auto md:hidden max-w-sm mx-auto mt-2.5 p-4 bg-[#0E121B]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              onOpenLegal?.('privacy')
            }}
            className="px-4 py-2.5 text-left text-sm font-semibold text-[#38BDF8] hover:bg-[#38BDF8]/10 rounded-xl transition-colors cursor-pointer"
          >
            🔒 Privacy Policy & Legal Center
          </button>
          <a
            href="#download"
            onClick={() => setOpen(false)}
            className="mt-2 py-3 text-center text-sm font-bold text-[#070D18] bg-gradient-to-r from-[#38BDF8] to-[#0284C7] rounded-full shadow-[0_0_20px_rgba(56,189,248,0.35)]"
          >
            Get Early Access ⚡
          </a>
        </div>
      )}
    </nav>
  )
}
