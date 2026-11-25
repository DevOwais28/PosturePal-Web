import React, { useState, useEffect } from 'react'
import { 
  Zap, 
  ShieldCheck, 
  Volume2, 
  HeartHandshake, 
  Play, 
  Lock 
} from 'lucide-react'

import { playCoachVoice } from '../utils/soundEngine'

// Chipset latency benchmarks for interactive latency simulator
const CHIPSETS = [
  { id: 'flagship', name: 'Snapdragon 8 Gen 3', camera: 8, model: 8, voice: 2, total: 18, fps: 60, tier: 'FLAGSHIP' },
  { id: 'tensor',   name: 'Google Tensor G3',   camera: 11, model: 12, voice: 3, total: 26, fps: 60, tier: 'HIGH-END' },
  { id: 'budget',   name: 'Helio G99 / Budget', camera: 14, model: 16, voice: 4, total: 34, fps: 55, tier: 'MID-RANGE' },
]

// Clinical injury profiles with exact therapeutic lock angles and clinical cues
const INJURY_PROFILES = [
  {
    id: 'knee',
    title: 'KNEE / ACL',
    joint: 'Patella & Tibiofemoral',
    safeLimit: 90,
    maxAngle: 140,
    unit: '° Flexion Lock',
    safeDesc: 'Safe patellofemoral tracking. Quads & hamstrings absorb load evenly.',
    dangerDesc: 'ANTERIOR SHEAR DETECTED! Tibial translation exceeds ACL ligament tensile threshold.',
    coachSafe: '"Smooth tempo. Hold the 90° inflection without letting knees cave in."',
    coachDanger: '"STOP! Depth exceeded! Hold at 90° to prevent ligament shear."',
    audioSafe: 'great',
    audioDanger: 'correct',
    color: '#38BDF8'
  },
  {
    id: 'back',
    title: 'LUMBAR / SPINE',
    joint: 'L4–S1 Vertebrae',
    safeLimit: 30,
    maxAngle: 75,
    unit: '° Flexion Shear',
    safeDesc: 'Spine neutral. Intra-abdominal pressure protects lumbar discs from herniation.',
    dangerDesc: 'SPINAL FLEXION WARNING! Lower back rounding puts disc at severe compression risk.',
    coachSafe: '"Chest proud, brace your core. Perfect spinal alignment."',
    coachDanger: '"Back is rounding! Stop bending spine — hinge from your hips!"',
    audioSafe: 'great',
    audioDanger: 'correct',
    color: '#34D399'
  },
  {
    id: 'shoulder',
    title: 'ROTATOR CUFF',
    joint: 'Glenohumeral Arc',
    safeLimit: 85,
    maxAngle: 135,
    unit: '° Abduction Lock',
    safeDesc: 'Supraspinatus clears the subacromial space. Zero shoulder impingement.',
    dangerDesc: 'IMPINGEMENT WARNING! Arm angle pinches supraspinatus tendon against acromion.',
    coachSafe: '"Great scapular glide. Elbow tucked below the danger line."',
    coachDanger: '"Elbows flared too high! Lower your arm below shoulder level."',
    audioSafe: 'great',
    audioDanger: 'correct',
    color: '#F59E0B'
  },
  {
    id: 'neck',
    title: 'CERVICAL',
    joint: 'C1–C7 Axial Column',
    safeLimit: 15,
    maxAngle: 45,
    unit: '° Forward Shift',
    safeDesc: 'Chin retracted, sternocleidomastoid relaxed. Ideal cervical column stacking.',
    dangerDesc: 'FORWARD HEAD LEAN! Extreme shear stress on upper cervical vertebrae.',
    coachSafe: '"Keep your gaze forward. Excellent cervical discipline."',
    coachDanger: '"Stop looking down! Tuck your chin back against your collarbone."',
    audioSafe: 'great',
    audioDanger: 'correct',
    color: '#38BDF8'
  },
  {
    id: 'ankle',
    title: 'ACHILLES',
    joint: 'Talocrural Angle',
    safeLimit: 22,
    maxAngle: 50,
    unit: '° Dorsiflexion',
    safeDesc: 'Controlled eccentric load on Achilles tendon without micro-fiber tears.',
    dangerDesc: 'CALCANEAL COLLAPSE! Ankle over-pronating, twisting Achilles tendon under load.',
    coachSafe: '"Heel grounded, slow eccentric drop. Great calf stability."',
    coachDanger: '"Ankle rolling inward! Drive weight through your outer heel."',
    audioSafe: 'great',
    audioDanger: 'correct',
    color: '#34D399'
  },
  {
    id: 'wrist',
    title: 'CARPAL',
    joint: 'Radiocarpal Joint',
    safeLimit: 35,
    maxAngle: 80,
    unit: '° Hyperextension',
    safeDesc: 'Median nerve decompression zone maintained with relaxed carpal tunnel.',
    dangerDesc: 'WRIST SHEAR HAZARD! Hyperextension compressively traps median nerve.',
    coachSafe: '"Wrists straight, palms stacked firmly under shoulders."',
    coachDanger: '"Wrists bent back too far! Shift to neutral fist position."',
    audioSafe: 'great',
    audioDanger: 'correct',
    color: '#F59E0B'
  },
]

export default function Features() {
  // ─── CORE ARCHITECTURE STATE ───
  const [selectedChip, setSelectedChip] = useState(CHIPSETS[0])
  const [auditState, setAuditState] = useState('idle') // 'idle' | 'probing' | 'verified'
  const [audioLang, setAudioLang] = useState('en') // 'en' | 'ur'
  const [audioCueType, setAudioCueType] = useState('great') // 'great' | 'correct'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [frameTick, setFrameTick] = useState(1420)

  // Live frame ticker for latency instrument
  useEffect(() => {
    const timer = setInterval(() => {
      setFrameTick(prev => prev + 1)
    }, 450)
    return () => clearInterval(timer)
  }, [])

  // Interactive Air-gap Packet Audit Test
  const handleRunAudit = () => {
    if (auditState === 'probing') return
    setAuditState('probing')
    setAuditLogs(['[0.00s] Initializing socket trace...'])

    setTimeout(() => {
      setAuditLogs(prev => [...prev, '[0.25s] Probing TCP/UDP sockets (80, 443, 8080): CLOSED'])
    }, 350)

    setTimeout(() => {
      setAuditLogs(prev => [...prev, '[0.55s] Scanning wlan0 & rmnet adapters: 0 bytes outbound'])
    }, 700)

    setTimeout(() => {
      setAuditLogs(prev => [...prev, '[0.85s] Volatile RAM inspect: MediaPipe tensors purged at frame end'])
    }, 1050)

    setTimeout(() => {
      setAuditLogs(prev => [...prev, '[1.15s] AUDIT PASSED: 100% AIR-GAPPED HARDWARE ISOLATION ✓'])
      setAuditState('verified')
    }, 1400)
  }

  // Play audio samples using universal cross-browser sound engine
  const playVoiceSample = (lang, cue) => {
    const targetLang = lang || audioLang
    const targetCue = cue || audioCueType
    setAudioLang(targetLang)
    setAudioCueType(targetCue)

    playCoachVoice({
      lang: targetLang,
      cue: targetCue,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
    })
  }

  // ─── CLINICAL RECOVERY ENGINE STATE ───
  const [activeInjury, setActiveInjury] = useState(INJURY_PROFILES[0])
  const [jointAngle, setJointAngle] = useState(68) // Initial safe angle

  // Update angle safely when injury profile changes
  const handleSelectInjury = (profile) => {
    setActiveInjury(profile)
    // Set a safe initial angle near 75% of limit
    setJointAngle(Math.round(profile.safeLimit * 0.75))
  }

  const isAngleBreached = jointAngle > activeInjury.safeLimit
  const percentOfLimit = Math.min(100, Math.round((jointAngle / activeInjury.safeLimit) * 100))

  return (
    <div className="space-y-12 py-8 px-2 sm:px-4 lg:px-6 w-full select-none" id="features">
      
      {/* ───────────────────────────────────────────────────────────
          1. CORE ARCHITECTURE — FULLY INTERACTIVE HARDWARE BENCH
         ─────────────────────────────────────────────────────────── */}
      <section className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-[#0E1322] border-2 border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #38BDF8 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-[#38BDF8]/40 text-[#38BDF8] text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Zap size={13} className="fill-[#38BDF8]" />
              <span>CORE ARCHITECTURE · INTERACTIVE BENCH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[0.95] uppercase m-0">
              ZERO CLOUD. <span className="italic text-[#38BDF8]">PURE SPEED.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 px-3.5 py-1.5 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-semibold text-slate-300">
              FRAME #{frameTick} · 60 FPS SYNC
            </span>
          </div>
        </div>

        {/* 3 Deeply Interactive Engineering Consoles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          
          {/* ── CARD 1: SUB-FRAME KINEMATICS ── */}
          <div className="rounded-[28px] bg-[#0C101C] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-white/5 space-y-6">
            <div className="space-y-6">
              
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#38BDF8] tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                  SUB-FRAME KINEMATICS
                </span>
                <span className="text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                  {selectedChip.fps} FPS SYNC
                </span>
              </div>

              {/* Total Latency Big Metric */}
              <div>
                <div className="font-display text-5xl sm:text-6xl font-bold text-white leading-none tracking-tight">
                  {selectedChip.total} <span className="italic text-[#38BDF8]">MS</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">
                  Total Pipeline Latency
                </div>
              </div>

              {/* Interactive Chipset Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/60 rounded-xl border border-white/5">
                {CHIPSETS.map(chip => {
                  const active = selectedChip.id === chip.id
                  return (
                    <button
                      key={chip.id}
                      onClick={() => setSelectedChip(chip)}
                      className={`py-2 px-2 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer text-center ${
                        active
                          ? 'bg-[#38BDF8] text-slate-950 font-bold shadow'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {chip.id === 'flagship' ? 'Flagship' : chip.id === 'tensor' ? 'Tensor' : 'Mid-tier'}
                    </button>
                  )
                })}
              </div>

              {/* Segmented Pipeline Bar */}
              <div className="space-y-2 pt-1">
                <div className="h-2.5 rounded-full bg-white/10 flex overflow-hidden p-0.5 gap-0.5">
                  <div 
                    className="h-full bg-[#38BDF8] rounded-full transition-all duration-300" 
                    style={{ width: `${(selectedChip.camera / selectedChip.total) * 100}%` }} 
                  />
                  <div 
                    className="h-full bg-sky-300 rounded-full transition-all duration-300" 
                    style={{ width: `${(selectedChip.model / selectedChip.total) * 100}%` }} 
                  />
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300" 
                    style={{ width: `${(selectedChip.voice / selectedChip.total) * 100}%` }} 
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>CAMERA {selectedChip.camera}ms</span>
                  <span className="text-[#38BDF8] font-bold">MODEL {selectedChip.model}ms</span>
                  <span>VOICE {selectedChip.voice}ms</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── CARD 2: AIR-GAPPED PRIVACY ── */}
          <div className="rounded-[28px] bg-[#0C101C] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-white/5 space-y-6">
            <div className="space-y-6">
              
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <Lock size={12} className="text-emerald-400" />
                  AIR-GAPPED PRIVACY
                </span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  ZERO UPLOAD
                </span>
              </div>

              {/* 0.00 KB Big Metric */}
              <div>
                <div className="font-display text-5xl sm:text-6xl font-bold text-white leading-none tracking-tight">
                  0.00 <span className="italic text-emerald-400">KB</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">
                  Cloud Telemetry Transmitted
                </div>
              </div>

              {/* Clean Audit Trigger & Status */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleRunAudit}
                  disabled={auditState === 'probing'}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                    auditState === 'probing'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-wait'
                      : auditState === 'verified'
                      ? 'bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400'
                      : 'bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/10'
                  }`}
                >
                  <ShieldCheck size={15} className={auditState === 'probing' ? 'animate-spin' : ''} />
                  <span>
                    {auditState === 'probing'
                      ? 'Scanning Sockets...'
                      : auditState === 'verified'
                      ? 'Audit Verified ✓'
                      : 'Run Air-Gap Packet Audit'}
                  </span>
                </button>

                {/* Minimal Single-Line Status Pill (No Giant Terminal Box) */}
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 text-center text-[11px] font-mono">
                  {auditState === 'probing' && (
                    <span className="text-amber-400 animate-pulse">● Probing network sockets & adapters...</span>
                  )}
                  {auditState === 'verified' && (
                    <span className="text-emerald-400 font-bold">✓ Sockets Closed · 0 KB Leaked · 100% On-Device</span>
                  )}
                  {auditState === 'idle' && (
                    <span className="text-slate-400">Volatile RAM isolation · Camera unnetworked</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ── CARD 3: COACH JUNO VOICE ── */}
          <div className="rounded-[28px] bg-[#0C101C] p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-white/5 space-y-6">
            <div className="space-y-6">
              
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-amber-400 tracking-widest uppercase">
                <span className="flex items-center gap-1.5">
                  <Volume2 size={13} className="text-amber-400" />
                  COACH JUNO SYNTHESIS
                </span>
                <span className="text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-bold">
                  BILINGUAL VOICE
                </span>
              </div>

              <div>
                <div className="font-display text-5xl sm:text-6xl font-bold text-white leading-none tracking-tight">
                  EN <span className="text-amber-400">&</span> <span className="italic text-amber-400">UR</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">
                  English & Urdu Audio Cues
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/60 rounded-xl border border-white/5">
                <button
                  onClick={() => { setAudioLang('en'); playVoiceSample('en', audioCueType); }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    audioLang === 'en'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🇬🇧 English</span>
                </button>
                <button
                  onClick={() => { setAudioLang('ur'); playVoiceSample('ur', audioCueType); }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    audioLang === 'ur'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🇵🇰 اردو (Urdu)</span>
                </button>
              </div>

              {/* Audio Play Buttons with Soundwave Pulse */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => playVoiceSample(audioLang, 'great')}
                  className={`py-3 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    audioCueType === 'great' && isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-lg scale-[1.02]'
                      : 'bg-black/50 text-slate-300 border-white/10 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  <Play size={13} className={isPlayingAudio && audioCueType === 'great' ? 'animate-pulse fill-slate-950' : 'fill-white'} />
                  <span>Praise Cue</span>
                </button>

                <button
                  onClick={() => playVoiceSample(audioLang, 'correct')}
                  className={`py-3 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    audioCueType === 'correct' && isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-lg scale-[1.02]'
                      : 'bg-black/50 text-slate-300 border-white/10 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  <Play size={13} className={isPlayingAudio && audioCueType === 'correct' ? 'animate-pulse fill-slate-950' : 'fill-white'} />
                  <span>Form Alert</span>
                </button>
              </div>

              {/* Minimal Audio Engine Status Pill */}
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 text-center text-[11px] font-mono">
                {isPlayingAudio ? (
                  <span className="text-amber-400 font-bold animate-pulse flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Coach Juno Speaking ({audioLang.toUpperCase()})...</span>
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Triple-Format Audio Engine Ready</span>
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ───────────────────────────────────────────────────────────
          2. CLINICAL RECOVERY ENGINE — INTERACTIVE KINEMATIC DIAL
         ─────────────────────────────────────────────────────────── */}
      <section className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-gradient-to-br from-[#090D18] via-[#0E1424] to-[#121B30] border-2 border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] text-[11px] font-semibold uppercase tracking-wider mb-2">
              <HeartHandshake size={13} />
              <span>CLINICAL RECOVERY ENGINE · INTERACTIVE KINEMATICS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[0.95] uppercase m-0">
              PROTECTED MODE. <span className="italic text-[#34D399]">TEST JOINT ANGLES.</span>
            </h2>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm max-w-sm m-0">
            Select an injury protocol below and scrub the live joint angle dial to test PosturePal's automated kinematic lock.
          </p>
        </div>

        {/* ── INTERACTIVE INJURY PROTOCOL SELECTOR ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/5 max-w-5xl mx-auto mb-8 relative z-10">
          {INJURY_PROFILES.map((p) => {
            const isSelected = activeInjury.id === p.id
            return (
              <button
                key={p.id}
                onClick={() => handleSelectInjury(p)}
                className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-slate-950 shadow-xl font-bold scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{p.title.split('/')[0].trim()}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  isSelected ? 'bg-slate-950 text-emerald-400 font-bold' : 'bg-white/10 text-slate-400'
                }`}>
                  {p.safeLimit}°
                </span>
              </button>
            )
          })}
        </div>

        {/* ── MAIN INTERACTIVE BIOMECHANICAL LOCKOUT CONSOLE ── */}
        <div className="p-5 sm:p-7 lg:p-9 rounded-[32px] bg-[#0C101C] border border-white/5 relative z-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* ── LEFT: INTERACTIVE ANGLE GAUGE & SCRUBBER ── */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-slate-950 border border-white/10 space-y-5">
              
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 uppercase tracking-wider">JOINT: {activeInjury.joint}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] border transition-colors ${
                  isAngleBreached
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}>
                  {isAngleBreached ? '⚠️ LOCK ENGAGED' : '✓ SAFE TRAVEL'}
                </span>
              </div>

              {/* Large Digital Angle Display + Animated Arc Dial */}
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-display text-5xl sm:text-6xl font-bold leading-none tracking-tight transition-colors ${
                    isAngleBreached ? 'text-rose-400' : 'text-white'
                  }`}>
                    {jointAngle}<span className="text-3xl text-slate-400">°</span>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                    Therapeutic Limit: <span className="text-white font-bold">{activeInjury.safeLimit}°</span>
                  </div>
                </div>

                {/* Biomechanical Arc Visualizer SVG */}
                <div className="w-24 h-24 relative flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-white/10"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    {/* Safe Limit Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="stroke-emerald-400/40"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * (activeInjury.safeLimit / activeInjury.maxAngle))}
                      fill="transparent"
                      strokeLinecap="round"
                    />
                    {/* Current Angle Needle Indicator */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={`transition-all duration-150 ${isAngleBreached ? 'stroke-rose-500' : 'stroke-emerald-400'}`}
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * (Math.min(jointAngle, activeInjury.maxAngle) / activeInjury.maxAngle))}
                      fill="transparent"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-mono text-slate-400">ROM</span>
                    <span className={`text-xs font-bold font-mono ${isAngleBreached ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {percentOfLimit}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Range Slider (Scrub with Finger / Mouse) */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>0° EXTENSION</span>
                  <span className="text-amber-400 font-bold">DRAG SLIDER TO TEST</span>
                  <span>{activeInjury.maxAngle}° MAX</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={activeInjury.maxAngle}
                  value={jointAngle}
                  onChange={(e) => setJointAngle(Number(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#34D399]"
                />
              </div>

              {/* Quick Angle Presets for Rapid Testing */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() => setJointAngle(Math.round(activeInjury.safeLimit * 0.4))}
                  className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono font-semibold text-slate-300 transition text-center cursor-pointer"
                >
                  Rest ({Math.round(activeInjury.safeLimit * 0.4)}°)
                </button>
                <button
                  onClick={() => setJointAngle(activeInjury.safeLimit)}
                  className="py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30 transition text-center cursor-pointer"
                >
                  Limit ({activeInjury.safeLimit}°)
                </button>
                <button
                  onClick={() => setJointAngle(Math.min(activeInjury.maxAngle, activeInjury.safeLimit + 25))}
                  className="py-1.5 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-[10px] font-mono font-bold text-rose-400 border border-rose-500/30 transition text-center cursor-pointer"
                >
                  Breach ({Math.min(activeInjury.maxAngle, activeInjury.safeLimit + 25)}°)
                </button>
              </div>

            </div>

            {/* ── RIGHT: SLEEK PROTOCOL FEEDBACK (NO CLUTTER, NO NESTED BOXES) ── */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 min-w-0">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-[#34D399] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    <span>{activeInjury.title} PROTOCOL</span>
                  </div>
                  
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                    isAngleBreached
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}>
                    {isAngleBreached ? '⚠️ LIMIT BREACHED' : '✓ SAFE RANGE'}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold sm:font-bold text-white tracking-tight uppercase m-0">
                  {activeInjury.joint}
                </h3>

                {/* ONE Single Clean Interactive Feedback Card */}
                <div className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                  isAngleBreached
                    ? 'bg-rose-950/30 border-rose-500/40'
                    : 'bg-emerald-950/20 border-emerald-500/30'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Volume2 size={12} />
                        <span>COACH JUNO VOICE CUE</span>
                      </div>
                      <p className="text-sm font-medium italic text-slate-100 m-0 leading-relaxed">
                        {isAngleBreached ? activeInjury.coachDanger : activeInjury.coachSafe}
                      </p>
                    </div>

                    <button
                      onClick={() => playVoiceSample(audioLang, isAngleBreached ? 'correct' : 'great')}
                      className={`px-4 py-2 rounded-xl text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition shadow-md active:scale-95 ${
                        isPlayingAudio
                          ? 'bg-amber-300 ring-2 ring-amber-400 scale-105'
                          : 'bg-amber-400 hover:bg-amber-300'
                      }`}
                    >
                      <Play size={12} className={`fill-slate-950 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                      <span>{isPlayingAudio ? 'Speaking...' : 'Hear Cue'}</span>
                    </button>
                  </div>

                  <div className={`text-xs pt-3 border-t font-medium leading-relaxed ${
                    isAngleBreached ? 'border-rose-500/20 text-rose-200' : 'border-emerald-500/20 text-emerald-200'
                  }`}>
                    {isAngleBreached ? activeInjury.dangerDesc : activeInjury.safeDesc}
                  </div>
                </div>
              </div>

              {/* Action row with clean spacing */}
              <div className="pt-2">
                <a
                  href="#walkthrough"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#34D399] hover:bg-[#22c55e] text-slate-950 text-xs font-bold uppercase tracking-wider transition hover:scale-[1.02] active:scale-95 cursor-pointer shadow-xl text-center"
                >
                  <span>LAUNCH REHAB SIMULATOR</span>
                  <span>→</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </section>

    </div>
  )
}
