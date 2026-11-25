import React, { useState } from 'react'
import { Activity, Zap } from 'lucide-react'
import logoIcon from '../logo_icon.png'

const MODES = [
  {
    id: 'hud',
    label: '⚡ LIVE HUD SCREEN',
    badge: 'ATHLETIC MODE',
    stat: '60 FPS',
    statLabel: 'REAL-TIME MESH',
    lead: 'Real-time 33-point skeletal tracking in volatile RAM.',
    cues: ['Sub-50ms rep inflection counting', 'Knee valgus & lumbar rounding alerts', 'English & Urdu speech coaching']
  },
  {
    id: 'analytics',
    label: '📊 30-DAY ANALYTICS',
    badge: 'SQLITE VAULT',
    stat: '98.2%',
    statLabel: 'BILATERAL SYMMETRY',
    lead: 'Encrypted local telemetry stored completely offline on your device.',
    cues: ['Dynamic Posture Index per rep', '30-day volume & cadence charts', 'Local CSV/SQLite export']
  },
  {
    id: 'rehab',
    label: '🩺 INJURY REHAB',
    badge: 'PROTECTED MODE',
    stat: '90° LOCK',
    statLabel: 'ACL & PATELLA SAFE',
    lead: 'Adaptive joint angle restrictions for safe post-injury therapy.',
    cues: ['Knee flexion locked to 90° max', 'Zero-ballistic exercise filtering', 'Unhurried therapeutic pacing']
  }
]

export default function Walkthrough() {
  const [activeModeIdx, setActiveModeIdx] = useState(0)
  const current = MODES[activeModeIdx]

  return (
    <section className="py-8 px-2 sm:px-4 lg:px-6 w-full select-none" id="walkthrough">
      
      {/* ───────────────────────────────────────────────────────────
          FRAMED SPORT-TECH WALKTHROUGH (LESS TEXT, MORE EXPERIENCE)
         ─────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#0E1322] border-2 border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-[#38BDF8]/40 text-[#38BDF8] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Activity size={13} />
              <span>INTERFACE SIMULATOR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[0.95] uppercase m-0">
              APP EXPERIENCE. <span className="italic text-[#38BDF8]">TAP TO SWITCH MODES.</span>
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {MODES.map((m, idx) => {
              const isSelected = activeModeIdx === idx
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModeIdx(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#38BDF8] text-slate-950 border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.35)] scale-105'
                      : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left: Authentic Smartphone Screen (NO REPEATED GIFS) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] sm:w-[340px] h-[610px] rounded-[46px] bg-[#090C15] border-[3px] border-[#38BDF8]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(56,189,248,0.15)] overflow-hidden flex flex-col p-5 text-white select-none">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={logoIcon}
                    alt="PosturePal"
                    width="20"
                    height="20"
                    className="w-5 h-5 rounded-md object-contain shrink-0"
                    style={{ width: 20, height: 20 }}
                  />
                  <span className="font-extrabold text-xs text-white">PosturePal</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/15 border border-[#38BDF8]/30 px-2 py-0.5 rounded-full">
                  {current.badge}
                </span>
              </div>

              {/* Dynamic Screen Contents */}
              {activeModeIdx === 0 && (
                <div className="flex flex-col gap-3 flex-1">
                  <div className="relative h-[240px] rounded-2xl bg-gradient-to-b from-[#101726] to-[#0A0D15] border border-white/10 p-4 flex flex-col justify-between shadow-inner">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="px-2 py-0.5 bg-black/80 rounded-full text-emerald-400 border border-emerald-500/30">
                        Spine: 180° Aligned
                      </span>
                      <span className="px-2 py-0.5 bg-black/80 rounded-full text-[#38BDF8] border border-sky-500/30">
                        Knee: 90° Optimal
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#38BDF8]/40 flex items-center justify-center">
                        <Zap size={22} className="text-[#38BDF8]" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-2">60 FPS VECTOR SCAN</span>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="bg-black/80 px-2.5 py-1 rounded-lg border border-white/10">
                        <div className="text-sm font-bold text-[#38BDF8] leading-none">14 / 20</div>
                        <div className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Reps Done</div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-black/80 border-2 border-emerald-400 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-bold text-white leading-none">96%</span>
                        <span className="text-[5px] font-bold text-emerald-400 uppercase">Score</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121622]/90 border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-400">Inflection Point</span>
                      <span className="text-emerald-400">Valid Depth Hit</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
                    </div>
                  </div>

                  <div className="mt-auto p-3 rounded-xl bg-[#121622]/95 border border-[#38BDF8]/30">
                    <div className="text-[9px] font-bold text-[#38BDF8] uppercase mb-0.5">Coach Juno</div>
                    <p className="text-xs text-slate-200 m-0 italic">"Drive through your heels! Flawless depth."</p>
                  </div>
                </div>
              )}

              {activeModeIdx === 1 && (
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[#121622]/90 border border-[#38BDF8]/20">
                    <div className="w-14 h-14 rounded-full border-4 border-[#38BDF8] flex flex-col items-center justify-center shrink-0">
                      <span className="text-base font-bold text-white leading-none">94</span>
                      <span className="text-[7px] font-bold text-[#38BDF8] uppercase">SCORE</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Posture Accuracy Index</div>
                      <div className="text-[11px] text-[#34D399] font-bold mt-0.5">+6% This Week</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">320 Reps Validated Offline</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#121622]/90 border border-white/10 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Volume Progression</span>
                    <div className="flex items-end justify-between h-20 gap-1 pt-1">
                      {[45, 60, 50, 75, 90, 80, 95].map((h, i) => (
                        <div key={i} className="flex-1 h-full flex items-end">
                          <div
                            className="w-full rounded-t-sm"
                            style={{
                              height: `${h}%`,
                              background: i === 6 ? '#38BDF8' : 'rgba(56, 189, 248, 0.25)'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                      <span className="text-sm font-semibold text-white">384 kcal</span>
                      <span className="block text-[8px] text-slate-400 uppercase">Burned</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                      <span className="text-sm font-semibold text-[#34D399]">98.2%</span>
                      <span className="block text-[8px] text-slate-400 uppercase">Symmetry</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModeIdx === 2 && (
                <div className="flex flex-col gap-3 flex-1">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider block">INJURY GUARD</span>
                      <span className="text-xs font-semibold text-white">Patellofemoral Safe</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md">90° LOCK</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121622]/90 border border-[#34D399]/40 space-y-1">
                    <div className="text-xs font-bold text-[#34D399]">Protected ROM Active</div>
                    <p className="text-[11px] text-slate-300 leading-snug m-0">
                      Caps joint flexion to prevent ACL ligament shear stress.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121622]/90 border border-white/10 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Bilateral Balance</span>
                    <span className="font-bold text-emerald-400">97.8% (Even)</span>
                  </div>

                  <div className="mt-auto p-3 rounded-xl bg-[#121622]/95 border border-white/10">
                    <div className="text-[9px] font-bold text-emerald-400 uppercase mb-0.5">Gentle Pacing</div>
                    <p className="text-xs text-slate-200 m-0 italic">"Slow and steady. Hold for two seconds at 90°."</p>
                  </div>
                </div>
              )}

              {/* Bottom Nav */}
              <div className="mt-auto pt-2.5 border-t border-white/10 flex justify-around text-[9px] text-slate-500 font-bold">
                <span className={activeModeIdx === 0 ? 'text-[#38BDF8]' : ''}>TRAIN</span>
                <span className={activeModeIdx === 1 ? 'text-[#38BDF8]' : ''}>ANALYTICS</span>
                <span className={activeModeIdx === 2 ? 'text-emerald-400' : ''}>REHAB</span>
              </div>
            </div>
          </div>

          {/* Right: Pure High-Impact Stats & Feature Badges (NO LONG TEXT) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Big Stat Feature */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-[#0C101C] border border-white/5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">ACTIVE BENCHMARK</span>
                <span className="text-xs font-bold text-[#38BDF8] bg-[#38BDF8]/10 px-3 py-1 rounded-full uppercase border border-[#38BDF8]/20">
                  {current.badge}
                </span>
              </div>

              <div className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tight leading-none">
                <span className="italic">{current.stat}</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
                {current.statLabel}
              </div>

              <p className="text-slate-200 text-sm font-medium leading-relaxed m-0 pt-2 border-t border-white/5">
                {current.lead}
              </p>

              {/* 3 Rapid Feature Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                {current.cues.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/80 text-[11px] font-bold text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick 3-Step Setup Bar */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: '01', title: 'CALIBRATE', desc: 'Athletic or Rehab' },
                { num: '02', title: 'PROP PHONE', desc: '6–8 Feet Away' },
                { num: '03', title: 'EXECUTE', desc: 'Instant Audio Cues' }
              ].map(s => (
                <div key={s.num} className="p-3.5 sm:p-4 rounded-2xl bg-[#0C101C] border border-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#38BDF8]">{s.num}</div>
                  <div className="text-xs font-semibold text-white mt-1 uppercase">{s.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
