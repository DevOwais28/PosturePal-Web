import React from 'react'
import logoIcon from '../logo_icon.png'
import { ArrowUp } from 'lucide-react'

const MARQUEE_ITEMS = [
  'PERFECT FORM',
  'ZERO CLOUD STREAMING',
  '60 FPS BIOMECHANICS',
  '33 POSE VECTORS',
  'COACH JUNO VOICE',
  '100% OFFLINE',
  'AIR-GAPPED PRIVACY',
]

export default function Footer({ onOpenLegal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-[#06080E] relative overflow-hidden select-none">
      
      {/* ─── 1. BOLD RUNNING MARQUEE TICKER ─── */}
      <div className="py-8 border-b border-white/10 bg-[#070A12] overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-ticker">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
            <div key={idx} className="flex items-center gap-10 font-display text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider uppercase">
              <span className={idx % 2 === 1 ? 'italic text-[#38BDF8]' : 'text-white/80'}>{text}</span>
              <span className="text-[#38BDF8]">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. STATEMENT BRAND SECTION ─── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-12 pb-10 relative">
        
        {/* Full-Width Athletic Navigation Deck (No Squeezed Ovals or Clipped Links) */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#0E1322] border border-white/10 p-5 sm:p-7 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            
            {/* Brand mark & status */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={logoIcon}
                  alt="PosturePal"
                  width="28"
                  height="28"
                  className="w-7 h-7 rounded-md object-contain shrink-0"
                  style={{ width: 28, height: 28 }}
                />
                <span className="font-display text-lg font-bold text-white tracking-tight uppercase leading-none">
                  POSTURE<span className="italic text-[#38BDF8]">PAL</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OFFLINE AI
                </span>
              </div>

              {/* Mobile-only scroll to top button next to brand */}
              <button
                onClick={scrollToTop}
                className="md:hidden w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center hover:bg-[#38BDF8] transition cursor-pointer shrink-0 shadow-md"
                title="Scroll to top"
              >
                <ArrowUp size={15} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Quick links: Wrap cleanly on any screen with generous spacing */}
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
              <a href="#hero" className="hover:text-[#38BDF8] transition">Home</a>
              <a href="#features" className="hover:text-[#38BDF8] transition">Architecture</a>
              <a href="#walkthrough" className="hover:text-[#38BDF8] transition">Simulator</a>
              <a href="#download" className="hover:text-[#38BDF8] transition">Beta Access</a>
              <a href="#faq" className="hover:text-[#38BDF8] transition">FAQ</a>
            </nav>

            {/* Desktop-only back to top button */}
            <button
              onClick={scrollToTop}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-white/10 hover:shadow-lg shrink-0"
              title="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Colossal Watermark Brand Mark */}
        <div className="py-6 text-center overflow-hidden">
          <div className="font-display text-[8vw] font-bold italic text-white/5 hover:text-[#38BDF8]/15 transition-colors select-none leading-none tracking-tighter uppercase pointer-events-none">
            POSTUREPAL
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 POSTUREPAL · AIR-GAPPED ON-DEVICE BIOMETRICS · ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-[#38BDF8] transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-[#38BDF8] transition cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>

    </footer>
  )
}
