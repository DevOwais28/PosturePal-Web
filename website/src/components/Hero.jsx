import React, { useState } from 'react'
import { 
  ArrowUpRight, 
  Play, 
  Volume2, 
  Sparkles, 
  Radio
} from 'lucide-react'
import logoIcon from '../logo_icon.png'
import { playCoachVoice } from '../utils/soundEngine'

const HERO_EXERCISES = [
  {
    id: 'squat',
    name: 'Olympic Deep Squat',
    joint: 'Knee: 88° (Olympic Depth)',
    spine: 'Spine: 178° (Aligned)',
    gif: '/exercises/squats.gif',
    reps: '12 Reps',
    posture: '97%',
    tag: 'POWERLIFTING & HYPERTROPHY',
    cue: 'Flawless parallel depth! Drive through your heels without lumbar flexion.'
  },
  {
    id: 'pushup',
    name: 'Strict Hollow Push-Up',
    joint: 'Elbow: 90° (Optimal)',
    spine: 'Spine: 180° (Plank Aligned)',
    gif: '/exercises/pushup.gif',
    reps: '15 Reps',
    posture: '95%',
    tag: 'CALISTHENICS CONTROL',
    cue: 'Full chest depth! Squeeze glutes and keep elbows tucked at 45 degrees.'
  },
  {
    id: 'lunges',
    name: 'Dynamic Walking Lunge',
    joint: 'Lead Knee: 90° (Square)',
    spine: 'Spine: 178° (Vertical)',
    gif: '/exercises/lunges.gif',
    reps: '16 Reps',
    posture: '94%',
    tag: 'REHAB & STABILITY',
    cue: 'Don’t let front knee drift past toes. Maintain an upright torso.'
  }
]

export default function Hero() {
  const [activeExIdx, setActiveExIdx] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const currentEx = HERO_EXERCISES[activeExIdx]

  const handlePlayVoice = () => {
    playCoachVoice({
      lang: 'en',
      cue: 'great',
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
    })
  }

  return (
    <section className="relative px-2 sm:px-4 lg:px-6 pt-3 sm:pt-4 pb-8 w-full select-none" id="hero">
      
      {/* ─────────────────────────────────────────────────────────────
          MASTER HIGH-ENERGY SPORT-TECH BOARD
          Electric Sky Blue (#38BDF8) + Deep Pitch Black Contrasts
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-gradient-to-br from-[#38BDF8] via-[#22D3EE] to-[#0284C7] p-5 sm:p-8 lg:p-10 xl:p-12 shadow-[0_25px_80px_rgba(56,189,248,0.28)] text-slate-950 overflow-hidden">
        
        {/* Subtle dynamic background athletic grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* ─── 1. INTEGRATED TOP NAV BAR ─── */}
        <header className="relative z-20 flex items-center justify-between gap-3 pb-8 sm:pb-10">
          
          {/* Left: Brand pill */}
          <div className="flex items-center gap-2 bg-slate-950 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg shrink-0">
            <img
              src={logoIcon}
              alt="PosturePal"
              width="22"
              height="22"
              className="w-5 sm:w-5.5 h-5 sm:h-5.5 rounded-md object-contain shrink-0"
              style={{ width: 22, height: 22 }}
            />
            <span className="font-display font-bold tracking-tight text-xs sm:text-base leading-none uppercase whitespace-nowrap">
              POSTURE<span className="italic text-[#38BDF8]">PAL</span>
            </span>
          </div>

          {/* Center: Floating Black Pill Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950 text-white px-2 py-1.5 rounded-full shadow-2xl backdrop-blur-md">
            <a
              href="#hero"
              className="bg-white text-slate-950 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-sm"
            >
              HOME
            </a>
            <a
              href="#features"
              className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
            >
              Architecture
            </a>
            <a
              href="#walkthrough"
              className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
            >
              App Simulator
            </a>
            <a
              href="#download"
              className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
            >
              Beta Access
            </a>
          </nav>

          {/* Right: Action Icon + Download CTA Button */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white text-slate-950 items-center justify-center shadow-md">
              <Sparkles size={18} className="text-slate-950" />
            </div>

            <a
              href="#download"
              className="bg-slate-950 text-white hover:bg-black px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span className="hidden sm:inline">GET EARLY ACCESS</span>
              <span className="sm:hidden">GET BETA</span>
            </a>
          </div>
        </header>

        {/* ─── 2. MAIN BOLD HERO CONTENT GRID ─── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ── LEFT COLUMN (COLS 1-7): MASSIVE HEADLINE + KICKER + CLEAN TELEMETRY WIDGETS ── */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            {/* Top Typography & Kicker */}
            <div className="space-y-4">
              
              {/* Refined Athletic Headline Balanced for All Screens */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold text-slate-950 tracking-tight leading-[0.94] uppercase m-0">
                STRONGER<br />
                <span className="italic text-[#0284C7] font-semibold">TODAY</span><br />
                BETTER<br />
                <span className="italic text-slate-900 font-semibold">TOMORROW</span>
              </h1>

              {/* Subtitle & Social Proof Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2 max-w-xl">
                
                {/* Text Block */}
                <div className="sm:col-span-8 space-y-1">
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-950" />
                    <span>TRAIN HARD.</span>
                    <span className="italic text-[#0284C7]">STAY AIR-GAPPED.</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed m-0">
                    Real-time 33-point MediaPipe joint tracking, instant bilingual voice coaching, and 100% offline biometric privacy.
                  </p>
                </div>

                {/* Social Proof Avatars */}
                <div className="sm:col-span-4 flex flex-col sm:items-end gap-1">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-[#38BDF8] bg-slate-950 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#38BDF8] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      MK
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#38BDF8] bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      AL
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-900">
                    ★ 4.9 (12K+ Lifters)
                  </span>
                </div>

              </div>

            </div>

            {/* ── UNIFIED ATHLETIC TELEMETRY DECK (NO DETACHED AI BENTO BOXES) ── */}
            <div className="pt-2">
              <div className="p-2 sm:p-2.5 rounded-3xl sm:rounded-full bg-slate-950 text-white shadow-2xl border-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl">
                
                {/* Metric 1: 33-Keypoint HUD */}
                <div className="flex items-center gap-3 px-3 py-1.5 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Radio size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="font-display text-base sm:text-lg font-bold text-white leading-none tracking-tight">
                      33 <span className="italic text-[#38BDF8]">KEYPOINTS</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      ± 1.2° Precision · 60 FPS
                    </div>
                  </div>
                </div>

                {/* Subtle Vertical Divider */}
                <div className="hidden sm:block w-px h-8 bg-white/10" />

                {/* Metric 2: Coach Juno Audio */}
                <div className="flex items-center gap-3 px-3 py-1.5 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Volume2 size={18} />
                  </div>
                  <div>
                    <div className="font-display text-base sm:text-lg font-bold text-white leading-none tracking-tight">
                      COACH <span className="italic text-amber-400">JUNO</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-mono mt-0.5 flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">EN & UR</span>
                      <span>·</span>
                      <span>&lt; 50ms Local</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Launch Button */}
                <a
                  href="#walkthrough"
                  className="w-full sm:w-11 h-10 sm:h-11 rounded-full bg-[#38BDF8] hover:bg-[#0ea5e9] text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer shrink-0 font-bold"
                  title="Launch App Simulator"
                >
                  <ArrowUpRight size={20} className="stroke-[3]" />
                </a>

              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN (COLS 8-12): CLEAN ATHLETE FRAME WITH CLEAN VIEWPORT ── */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            
            {/* The Signature Rounded Media Frame */}
            <div className="relative w-full rounded-[36px] sm:rounded-[44px] overflow-hidden bg-slate-950 border-[3px] border-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between p-4.5 sm:p-5">
              
              {/* Top Telemetry Pills inside Right Frame */}
              <div className="relative z-20 flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-[11px] font-bold border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentEx.joint}</span>
                </div>

                <div className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[#38BDF8] text-[11px] font-bold border border-white/10">
                  {currentEx.spine}
                </div>
              </div>

              {/* Clean White Interior Viewport (Makes GIF presentation 100% clean and natural) */}
              <div className="relative w-full h-[320px] sm:h-[350px] rounded-3xl bg-white overflow-hidden flex items-center justify-center p-3 shadow-inner">
                
                {/* AI Viewfinder Corner Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#38BDF8] z-20 shadow-[0_0_8px_#38BDF8]" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#38BDF8] z-20 shadow-[0_0_8px_#38BDF8]" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#38BDF8] z-20 shadow-[0_0_8px_#38BDF8]" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#38BDF8] z-20 shadow-[0_0_8px_#38BDF8]" />

                <img
                  key={currentEx.id}
                  src={currentEx.gif}
                  alt={currentEx.name}
                  className="w-full h-full object-contain"
                />

                {/* Floating START Button docked at bottom of the viewport */}
                <div className="absolute bottom-3 inset-x-3 z-30 flex justify-center">
                  <button
                    onClick={handlePlayVoice}
                    className="group flex items-center gap-2 bg-slate-950 hover:bg-black text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-2xl border border-white/20 hover:scale-105 active:scale-95 transition cursor-pointer"
                  >
                    <span className="font-display font-semibold tracking-wider text-xs sm:text-sm leading-none uppercase">
                      {isPlayingAudio ? (
                        <>COACH <span className="italic text-[#38BDF8]">SPEAKING...</span></>
                      ) : (
                        <>START <span className="italic text-[#38BDF8]">COACH JUNO</span></>
                      )}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#38BDF8] text-slate-950 flex items-center justify-center font-bold shadow-md group-hover:rotate-12 transition-transform">
                      <Play size={11} className="fill-slate-950 ml-0.5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Bottom Telemetry HUD */}
              <div className="relative z-20 mt-3 p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    {currentEx.tag}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {currentEx.name}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#38BDF8]">{currentEx.posture}</div>
                    <div className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">Posture Score</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Exercise Selector Pills Underneath */}
            <div className="flex items-center justify-center gap-2 pt-3.5">
              {HERO_EXERCISES.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => setActiveExIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition cursor-pointer border ${
                    activeExIdx === idx
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                      : 'bg-white/40 text-slate-900 border-black/10 hover:bg-white/70'
                  }`}
                >
                  {ex.name.split(' ')[0]}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
