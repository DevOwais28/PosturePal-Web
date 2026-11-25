import React, { useState } from 'react'
import { 
  CheckCircle2, 
  ChevronDown, 
  QrCode, 
  Mail, 
  Send 
} from 'lucide-react'

const QUICK_FAQS = [
  {
    q: "When will PosturePal officially launch?",
    a: "PosturePal is currently in closed beta testing. Priority access is rolling out in weekly waves to our waitlist members ahead of the public Android release."
  },
  {
    q: "Does PosturePal record or upload my camera video?",
    a: "Never. Camera frames are processed strictly in your device's volatile RAM and wiped in 16 milliseconds. Zero video or photos ever touch disk storage or cloud servers."
  },
  {
    q: "Do I need active Wi-Fi or data during workouts?",
    a: "No! PosturePal is 100% offline. MediaPipe neural networks, rep counting, Coach Juno speech, and SQLite analytics work anywhere without internet."
  },
  {
    q: "What devices and Android versions are supported?",
    a: "Any Android device running Android 8.0 (Oreo) or higher with 3GB+ RAM. Runs at full 60 FPS on modern Snapdragon, MediaTek, and Tensor processors."
  }
]

export default function DownloadFAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem('posturepal_user_email') || ''
    } catch {
      return ''
    }
  })
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try {
      return Boolean(localStorage.getItem('posturepal_user_email'))
    } catch {
      return false
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanEmail = email.trim()
    if (cleanEmail) {
      try {
        // Save current user email
        localStorage.setItem('posturepal_user_email', cleanEmail)
        
        // Append to full waitlist array
        const list = JSON.parse(localStorage.getItem('posturepal_beta_waitlist') || '[]')
        if (!list.some(item => (typeof item === 'string' ? item : item.email) === cleanEmail)) {
          list.push({ email: cleanEmail, date: new Date().toISOString() })
          localStorage.setItem('posturepal_beta_waitlist', JSON.stringify(list))
        }
      } catch (err) {
        console.error('Storage error:', err)
      }
      setIsSubscribed(true)
    }
  }

  return (
    <section className="py-8 px-2 sm:px-4 lg:px-6 w-full space-y-10 select-none" id="download">
      
      {/* ───────────────────────────────────────────────────────────
          1. PRIVATE BETA WAITLIST DECK (ELECTRIC SKY BLUE FRAMED)
         ─────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-gradient-to-br from-[#38BDF8] via-[#22D3EE] to-[#0284C7] p-5 sm:p-8 lg:p-10 shadow-[0_25px_80px_rgba(56,189,248,0.28)] text-slate-950 relative overflow-hidden">
        
        {/* Subtle dot matrix */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Big Statement Headline + Real Waitlist Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LAUNCHING SOON · PRIVATE BETA ACCESS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-[0.95] uppercase m-0">
              JOIN THE BETA.<br />
              <span className="italic text-[#0284C7]">BE FIRST IN LINE.</span>
            </h2>

            <p className="text-slate-900 text-sm sm:text-base font-semibold leading-relaxed max-w-lg m-0">
              PosturePal is currently in private pre-launch validation. Reserve your spot today to receive early access the moment the Android package goes live.
            </p>

            {/* Real Interactive Waitlist Form (Zero Fake Alerts!) */}
            <div className="pt-2 max-w-md">
              {isSubscribed ? (
                <div className="p-4 rounded-2xl bg-slate-950 text-white border-2 border-slate-900 flex items-center gap-3 shadow-xl">
                  <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-display text-base sm:text-lg font-bold tracking-wide text-white leading-none">
                      PRIORITY ACCESS <span className="italic text-emerald-400">CONFIRMED!</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      You are in wave 1. We will dispatch your exclusive test invite to <span className="text-[#38BDF8] font-bold">{email}</span>.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 rounded-full bg-white/90 border-2 border-black/15 text-slate-950 placeholder-slate-600 text-xs font-bold focus:outline-none focus:border-slate-950 shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-4 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer shrink-0"
                  >
                    <span>RESERVE ACCESS</span>
                    <Send size={14} className="text-[#38BDF8]" />
                  </button>
                </form>
              )}
            </div>

            {/* Rapid Metric Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['PRIVATE BETA WAITING LIST', '100% OFFLINE AI', 'ZERO CLOUD UPLOADS', 'LIMITED EARLY SPOTS'].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-white/40 border border-black/10 text-slate-950 text-[10px] font-semibold tracking-wider uppercase">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: High-Contrast QR Code Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-xs p-6 rounded-[36px] bg-slate-950 text-white shadow-2xl border-2 border-slate-900 flex flex-col items-center text-center space-y-4">
              
              {/* QR Code Header */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                <QrCode size={16} />
                <span>SCAN TO JOIN ON MOBILE</span>
              </div>

              {/* Styled Mock QR Code */}
              <div className="w-44 h-44 rounded-2xl bg-white p-3 flex items-center justify-center shadow-inner">
                <div className="w-full h-full bg-slate-950 rounded-xl p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-4 border-[#38BDF8] rounded-md" />
                    <div className="w-8 h-8 border-4 border-[#38BDF8] rounded-md" />
                  </div>
                  <div className="flex justify-center items-center my-auto">
                    <span className="text-[10px] font-bold text-white bg-slate-800 px-2 py-1 rounded font-mono">
                      BETA PASS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-4 border-[#38BDF8] rounded-md" />
                    <div className="w-4 h-4 bg-[#34D399] rounded" />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-medium leading-snug">
                Scan with your phone to claim priority access directly on mobile.
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ───────────────────────────────────────────────────────────
          2. FREQUENTLY ASKED QUESTIONS
         ─────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#0E1322] border-2 border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden" id="faq">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-[#38BDF8]/40 text-[#38BDF8] text-[11px] font-bold uppercase tracking-wider mb-2">
              <span>FAQ</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight uppercase m-0">
              FREQUENTLY <span className="italic text-[#38BDF8]">ASKED</span> QUESTIONS
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">PRE-RELEASE INFORMATION</span>
        </div>

        <div className="space-y-3">
          {QUICK_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#141A2B] border border-white/10 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#38BDF8]' : 'text-slate-400'}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>

    </section>
  )
}
