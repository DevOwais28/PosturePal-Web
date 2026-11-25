// ─────────────────────────────────────────────────────────────
// POSTUREPAL UNIVERSAL SOUND ENGINE
// Cross-platform audio support: Linux (Firefox/Chrome), Windows, macOS, Android, iOS
// Multi-Tier Strategy:
//   Tier 1: HTML5 Audio with OGG Vorbis (native Linux/Firefox), MP3, and WAV
//   Tier 2: Web Audio API (decodeAudioData via AudioContext) for bypass of HTML5 quirks
//   Tier 3: Browser SpeechSynthesisUtterance (Urdu & English)
//   Tier 4: Synthesized Coaching Chimes (Web Audio Oscillator) — guaranteed audio output
// ─────────────────────────────────────────────────────────────

import enGreatOgg from '../assets/audio/en_great.ogg'
import enCorrectOgg from '../assets/audio/en_correct.ogg'
import urGreatOgg from '../assets/audio/ur_great.ogg'
import urCorrectOgg from '../assets/audio/ur_correct.ogg'

import enGreatMp3 from '../assets/audio/en_great.mp3'
import enCorrectMp3 from '../assets/audio/en_correct.mp3'
import urGreatMp3 from '../assets/audio/ur_great.mp3'
import urCorrectMp3 from '../assets/audio/ur_correct.mp3'

import enGreatWav from '../assets/audio/en_great.wav'
import enCorrectWav from '../assets/audio/en_correct.wav'
import urGreatWav from '../assets/audio/ur_great.wav'
import urCorrectWav from '../assets/audio/ur_correct.wav'

export const COACH_CUES = {
  en: {
    great: 'Flawless depth! Keep driving through your heels.',
    correct: 'Stop! Knee cave detected. Push your knees outward.',
  },
  ur: {
    great: 'بہت زبردست! فارم بالکل درست ہے۔',
    correct: 'دھیان رکھیں! گھٹنے اندر کی طرف نہ جھکائیں۔',
  }
}

// Manifest containing Vite-hashed assets AND static public fallback paths
const AUDIO_SOURCES = {
  en: {
    great: [
      enGreatOgg,
      '/audio/en_great.ogg',
      enGreatMp3,
      '/audio/en_great.mp3',
      enGreatWav,
      '/audio/en_great.wav',
    ],
    correct: [
      enCorrectOgg,
      '/audio/en_correct.ogg',
      enCorrectMp3,
      '/audio/en_correct.mp3',
      enCorrectWav,
      '/audio/en_correct.wav',
    ],
  },
  ur: {
    great: [
      urGreatOgg,
      '/audio/ur_great.ogg',
      urGreatMp3,
      '/audio/ur_great.mp3',
      urGreatWav,
      '/audio/ur_great.wav',
    ],
    correct: [
      urCorrectOgg,
      '/audio/ur_correct.ogg',
      urCorrectMp3,
      '/audio/ur_correct.mp3',
      urCorrectWav,
      '/audio/ur_correct.wav',
    ],
  }
}

let activeAudio = null
let sharedAudioContext = null

/**
 * Get or resume shared AudioContext synchronously upon user click
 */
export function getSharedAudioContext() {
  if (typeof window === 'undefined') return null
  if (!sharedAudioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      sharedAudioContext = new AudioContextClass()
    }
  }
  if (sharedAudioContext && sharedAudioContext.state === 'suspended') {
    sharedAudioContext.resume().catch(() => {})
  }
  return sharedAudioContext
}

/**
 * Plays an athletic coaching chime via Web Audio Oscillator as the ultimate fallback
 */
function playAthleticChime(isAlert = false, onDone) {
  try {
    const ctx = getSharedAudioContext()
    if (!ctx) {
      onDone?.()
      return
    }

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = isAlert ? 'sawtooth' : 'sine'
    gain.gain.setValueAtTime(0.3, now)

    if (isAlert) {
      // Urgent descending alert: 520Hz -> 330Hz
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.3)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.35)
    } else {
      // Positive ascending chime: 440Hz -> 880Hz
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.25)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.35)
    }

    setTimeout(() => {
      onDone?.()
    }, 380)
  } catch (_e) {
    console.warn('Oscillator fallback failed:', _e)
    onDone?.()
  }
}

/**
 * Native SpeechSynthesis fallback
 */
function speakUtterance(lang, cue, onDone) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    playAthleticChime(cue === 'correct', onDone)
    return
  }

  try {
    window.speechSynthesis.cancel()

    const text = COACH_CUES[lang]?.[cue] || COACH_CUES.en[cue] || 'Form verified.'
    const utter = new SpeechSynthesisUtterance(text)

    utter.lang = lang === 'ur' ? 'ur-PK' : 'en-US'
    utter.rate = 1.05
    utter.volume = 1.0

    let finished = false
    const finishOnce = () => {
      if (!finished) {
        finished = true
        onDone?.()
      }
    }

    utter.onend = finishOnce
    utter.onerror = () => {
      playAthleticChime(cue === 'correct', onDone)
    }

    // Safety timeout in case speechSynthesis hangs (common in Linux Firefox without speech-dispatcher)
    setTimeout(() => {
      if (!finished) {
        finishOnce()
      }
    }, 2500)

    window.speechSynthesis.speak(utter)
  } catch (_err) {
    console.warn('SpeechSynthesis error:', _err)
    playAthleticChime(cue === 'correct', onDone)
  }
}

/**
 * Web Audio decodeAudioData player for maximum Linux Firefox / Chrome reliability
 */
async function playViaWebAudio(url, onDone) {
  try {
    const ctx = getSharedAudioContext()
    if (!ctx) return false

    const res = await fetch(url)
    if (!res.ok) return false

    const arrayBuffer = await res.arrayBuffer()
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer)

    const source = ctx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(ctx.destination)

    source.onended = () => {
      onDone?.()
    }
    source.start(0)
    return true
  } catch (_err) {
    console.warn(`WebAudio decode failed for ${url}:`, _err)
    return false
  }
}

/**
 * Universal voice player: Tries HTML5 Audio -> Web Audio API -> Speech Synthesis -> Chime
 */
export function playCoachVoice({ lang = 'en', cue = 'great', onStart, onEnd }) {
  if (typeof window === 'undefined') return

  // 1. Synchronously unlock Web Audio context on the user gesture
  getSharedAudioContext()

  // 2. Stop any existing audio
  if (activeAudio) {
    try {
      activeAudio.pause()
      activeAudio.currentTime = 0
    } catch {}
    activeAudio = null
  }

  onStart?.()

  const rawSources = AUDIO_SOURCES[lang]?.[cue] || AUDIO_SOURCES.en.great

  // Sort sources based on browser preference (Firefox on Linux strongly prefers OGG)
  const testEl = document.createElement('audio')
  const prefersOgg = testEl.canPlayType && testEl.canPlayType('audio/ogg; codecs="vorbis"') !== ''
  const orderedSources = [...rawSources].sort((a, b) => {
    if (prefersOgg) {
      if (a.includes('.ogg') && !b.includes('.ogg')) return -1
      if (!a.includes('.ogg') && b.includes('.ogg')) return 1
    }
    return 0
  })

  let index = 0
  let isFinished = false

  function markFinished() {
    if (!isFinished) {
      isFinished = true
      activeAudio = null
      onEnd?.()
    }
  }

  function tryNext() {
    if (index >= orderedSources.length) {
      // Fallback: Web Audio API on primary sources, then SpeechSynthesis, then Chime
      const primaryUrl = orderedSources[0]
      playViaWebAudio(primaryUrl, markFinished).then((ok) => {
        if (!ok) {
          speakUtterance(lang, cue, markFinished)
        }
      })
      return
    }

    const src = orderedSources[index]
    index++

    try {
      const audio = new Audio()
      activeAudio = audio
      audio.volume = 1.0
      audio.src = src

      audio.onended = () => {
        markFinished()
      }

      audio.onerror = () => {
        tryNext()
      }

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          tryNext()
        })
      }
    } catch {
      tryNext()
    }
  }

  tryNext()
}
