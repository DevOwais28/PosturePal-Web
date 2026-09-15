import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import logoIcon from "../logo_icon.png"
import styles from "./Screens.module.css"

const TABS = [
  {
    id: "workout",
    label: "Live Workout",
    points: [
      { dot: "violet",  text: "Real-time skeleton overlay via camera" },
      { dot: "violet",  text: "Automatic rep counting" },
      { dot: "cyan", text: "Instant form error alerts" },
      { dot: "cyan", text: "Voice coaching in English & Urdu" },
      { dot: "muted", text: "Pause / Resume anytime" },
    ],
  },
  {
    id: "stats",
    label: "Progress",
    points: [
      { dot: "violet", text: "Posture Score with trend chart" },
      { dot: "violet", text: "30-day workout history" },
      { dot: "cyan",   text: "Session streaks & milestones" },
      { dot: "cyan",  text: "Calories burned estimation" },
      { dot: "muted",  text: "Form improvement over time" },
    ],
  },
  {
    id: "rehab",
    label: "Rehab Mode",
    points: [
      { dot: "cyan",  text: "Gentler form thresholds" },
      { dot: "cyan",  text: "Recovery-focused voice cues" },
      { dot: "violet",   text: "Post-injury safe movement guidance" },
      { dot: "violet", text: "Adaptive intensity per session" },
      { dot: "muted",  text: "Physiotherapy exercise library" },
    ],
  },
]

// Fake screen contents per tab
function PhoneScreen({ tabId }) {
  if (tabId === "workout") {
    return (
      <div className={styles.fakeScreen}>
        <div className={styles.fsHeader}>
          <img src={logoIcon} className={styles.fsLogo} alt="logo" />
          <span className={styles.fsTitle}>PosturePal</span>
          <span className={styles.fsLive}>● LIVE</span>
        </div>
        <div className={styles.fsCam}>
          <svg viewBox="0 0 200 300" fill="none" className={styles.fsSkeleton}>
            <circle cx="100" cy="40" r="18" stroke="var(--cyan)" strokeWidth="2.5" fill="none"/>
            <line x1="100" y1="58" x2="100" y2="130" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="100" y1="80" x2="55" y2="115" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="100" y1="80" x2="145" y2="115" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="55" y1="115" x2="45" y2="150" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="145" y1="115" x2="155" y2="150" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="100" y1="130" x2="72" y2="195" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="100" y1="130" x2="128" y2="195" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="72" y1="195" x2="60" y2="255" stroke="var(--violet-2)" strokeWidth="2.5"/>
            <line x1="128" y1="195" x2="140" y2="255" stroke="var(--violet-2)" strokeWidth="2.5"/>
            {[[55,115],[145,115],[45,150],[155,150],[72,195],[128,195],[60,255],[140,255]].map(([cx,cy],i)=>(
              <circle key={i} cx={cx} cy={cy} r="5" fill="var(--cyan)" stroke="#000" strokeWidth="1.5"/>
            ))}
          </svg>
          <div className={styles.fsScan} />
          <div className={styles.fsTag}>✅ DEPTH: GOOD</div>
        </div>
        <div className={styles.fsRep}>
          <span className={styles.fsRepNum}>12</span>
          <span className={styles.fsRepLabel}>REPS</span>
          <div className={styles.fsCoach}>🎙 Keep chest up!</div>
        </div>
      </div>
    )
  }

  if (tabId === "stats") {
    return (
      <div className={styles.fakeScreen}>
        <div className={styles.fsHeader}>
          <img src={logoIcon} className={styles.fsLogo} alt="logo" />
          <span className={styles.fsTitle}>Progress</span>
        </div>
        <div className={styles.fsStats}>
          <div className={styles.fsScoreRing}>
            <svg viewBox="0 0 80 80" className={styles.fsRingsvg}>
              <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none"/>
              <circle cx="40" cy="40" r="32" stroke="url(#grad)" strokeWidth="6" fill="none"
                strokeDasharray="201" strokeDashoffset="36" strokeLinecap="round"
                transform="rotate(-90 40 40)"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--violet)"/>
                  <stop offset="100%" stopColor="var(--cyan)"/>
                </linearGradient>
              </defs>
            </svg>
            <div className={styles.fsScoreInner}>
              <span className={styles.fsScoreNum}>84%</span>
              <span className={styles.fsScoreLabel}>Posture</span>
            </div>
          </div>
          <div className={styles.fsStatCards}>
            <div className={styles.fsStatCard}>
              <span className={styles.fsStatVal}>🔥 15</span>
              <span className={styles.fsStatKey}>Day Streak</span>
            </div>
            <div className={styles.fsStatCard}>
              <span className={styles.fsStatVal}>248</span>
              <span className={styles.fsStatKey}>Sessions</span>
            </div>
            <div className={styles.fsStatCard}>
              <span className={styles.fsStatVal}>4.2k</span>
              <span className={styles.fsStatKey}>Cals burned</span>
            </div>
          </div>
          <div className={styles.fsChartWrap}>
            <span className={styles.fsChartLabel}>30-day reps</span>
            <svg viewBox="0 0 200 50" className={styles.fsChart}>
              <polyline
                points="0,40 25,32 50,28 75,35 100,20 125,15 150,22 175,10 200,8"
                stroke="var(--violet-2)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <polyline
                points="0,40 25,32 50,28 75,35 100,20 125,15 150,22 175,10 200,8 200,50 0,50"
                fill="url(#chartGrad)" opacity="0.2"
              />
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--violet-2)"/>
                  <stop offset="100%" stopColor="transparent"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    )
  }

  // rehab
  return (
    <div className={styles.fakeScreen}>
      <div className={styles.fsHeader}>
        <img src={logoIcon} className={styles.fsLogo} alt="logo" />
        <span className={styles.fsTitle}>Rehab Mode</span>
        <span className={styles.fsRehab}>♥ ACTIVE</span>
      </div>
      <div className={styles.fsRehabBody}>
        <div className={styles.fsRehabCard}>
          <span className={styles.fsRehabIcon}>🦵</span>
          <div>
            <div className={styles.fsRehabEx}>Knee Flexion</div>
            <div className={styles.fsRehabSub}>Low impact · 3 sets of 10</div>
          </div>
          <span className={styles.fsRehabBadge}>RECOVERY</span>
        </div>
        <div className={styles.fsRehabCard}>
          <span className={styles.fsRehabIcon}>🦶</span>
          <div>
            <div className={styles.fsRehabEx}>Ankle Circles</div>
            <div className={styles.fsRehabSub}>Mobility · 2 × 30s</div>
          </div>
          <span className={styles.fsRehabBadge}>MOBILITY</span>
        </div>
        <div className={styles.fsRehabCard}>
          <span className={styles.fsRehabIcon}>🧘</span>
          <div>
            <div className={styles.fsRehabEx}>Hip Flexor Stretch</div>
            <div className={styles.fsRehabSub}>Stretch · 45s hold</div>
          </div>
          <span className={styles.fsRehabBadge}>STRETCH</span>
        </div>
        <div className={styles.fsRehabNote}>
          🎙 Juno: "Go at your own pace. Form first, speed later."
        </div>
      </div>
    </div>
  )
}

export default function Screens() {
  const [active, setActive] = useState("workout")

  return (
    <section className={styles.section} id="screens">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>App Screens</span>
          <h2 className={styles.title}>Every screen built for athletes,<br />designed for humans.</h2>
        </div>

        <div className={styles.layout}>
          {/* Phone */}
          <div className={styles.phoneWrap}>
            <div className={styles.phoneGlow} />
            <div className={styles.phone}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className={styles.phoneContent}
                >
                  <PhoneScreen tabId={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Info panel */}
          <div className={styles.panel}>
            <div className={styles.tabs}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`${styles.tab} ${active === t.id ? styles.tabActive : ""}`}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {TABS.filter(t => t.id === active).map(t => (
                <motion.ul
                  key={t.id}
                  className={styles.points}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.28 }}
                >
                  {t.points.map((p, i) => (
                    <li key={i} className={styles.point}>
                      <span className={`${styles.dot} ${styles[`dot_${p.dot}`]}`} />
                      {p.text}
                    </li>
                  ))}
                </motion.ul>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
