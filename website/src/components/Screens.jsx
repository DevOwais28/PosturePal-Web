import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import logoIcon from "../logo_icon.png"
import styles from "./Screens.module.css"

const TABS = [
  {
    id: "workout",
    label: "Live Workout",
    points: [
      { dot: "blue",  text: "Real-time skeleton overlay via camera" },
      { dot: "blue",  text: "Automatic rep counting" },
      { dot: "orange", text: "Instant form error alerts" },
      { dot: "green", text: "Voice coaching in English & Urdu" },
      { dot: "muted", text: "Pause / Resume anytime" },
    ],
  },
  {
    id: "stats",
    label: "Progress",
    points: [
      { dot: "blue", text: "Posture Score with trend chart" },
      { dot: "blue", text: "30-day workout history" },
      { dot: "green",   text: "Session streaks & milestones" },
      { dot: "orange",  text: "Calories burned estimation" },
      { dot: "muted",  text: "Form improvement over time" },
    ],
  },
  {
    id: "rehab",
    label: "Rehab Mode",
    points: [
      { dot: "green",  text: "Gentler form thresholds" },
      { dot: "green",  text: "Recovery-focused voice cues" },
      { dot: "blue",   text: "Post-injury safe movement guidance" },
      { dot: "blue", text: "Adaptive intensity per session" },
      { dot: "muted",  text: "Physiotherapy exercise library" },
    ],
  },
]

function PhoneScreen({ tabId }) {
  if (tabId === "workout") {
    return (
      <div className={styles.fakeScreen}>
        <div className={styles.fsHeader}>
          <img src={logoIcon} className={styles.fsLogo} alt="logo" />
          <span className={styles.fsTitle}>PosturePal</span>
          <span className={styles.fsLive}>LIVE</span>
        </div>
        <div className={styles.fsAnalysis}>
          <div className={styles.fsAnalysisTitle}>Live Form Analysis</div>
          
          <div className={styles.fsBarGroup}>
            <div className={styles.fsBarTop}>
              <span className={styles.fsBarLbl}>Spine Alignment</span>
              <span className={styles.fsBarVal}>Perfect</span>
            </div>
            <div className={styles.fsBarTrack}>
              <div className={styles.fsBarFill} style={{width: '95%', background: 'var(--text)'}}></div>
            </div>
          </div>
          
          <div className={styles.fsBarGroup}>
            <div className={styles.fsBarTop}>
              <span className={styles.fsBarLbl}>Knee Tracking</span>
              <span className={styles.fsBarVal}>Good</span>
            </div>
            <div className={styles.fsBarTrack}>
              <div className={styles.fsBarFill} style={{width: '85%', background: 'var(--muted)'}}></div>
            </div>
          </div>
          
          <div className={styles.fsBarGroup}>
            <div className={styles.fsBarTop}>
              <span className={styles.fsBarLbl}>Depth</span>
              <span className={styles.fsBarVal} style={{color: 'var(--orange)'}}>Too High</span>
            </div>
            <div className={styles.fsBarTrack}>
              <div className={styles.fsBarFill} style={{width: '40%', background: 'var(--orange)'}}></div>
            </div>
          </div>
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
              <circle cx="40" cy="40" r="32" stroke="var(--border)" strokeWidth="8" fill="none"/>
              <circle cx="40" cy="40" r="32" stroke="var(--blue)" strokeWidth="8" fill="none"
                strokeDasharray="201" strokeDashoffset="36" strokeLinecap="round"
                transform="rotate(-90 40 40)"/>
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
          </div>
          <div className={styles.fsChartWrap}>
            <span className={styles.fsChartLabel}>30-day reps</span>
            <svg viewBox="0 0 200 50" className={styles.fsChart}>
              <polyline
                points="0,40 25,32 50,28 75,35 100,20 125,15 150,22 175,10 200,8"
                stroke="var(--blue)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.fakeScreen}>
      <div className={styles.fsHeader}>
        <img src={logoIcon} className={styles.fsLogo} alt="logo" />
        <span className={styles.fsTitle}>Rehab Mode</span>
      </div>
      <div className={styles.fsRehabBody}>
        <div className={styles.fsRehabCard}>
          <span className={styles.fsRehabIcon}>🦵</span>
          <div>
            <div className={styles.fsRehabEx}>Knee Flexion</div>
            <div className={styles.fsRehabSub}>Low impact · 3 sets of 10</div>
          </div>
        </div>
        <div className={styles.fsRehabCard}>
          <span className={styles.fsRehabIcon}>🦶</span>
          <div>
            <div className={styles.fsRehabEx}>Ankle Circles</div>
            <div className={styles.fsRehabSub}>Mobility · 2 × 30s</div>
          </div>
        </div>
        <div className={styles.fsRehabCard}>
          <span className={styles.fsRehabIcon}>🧘</span>
          <div>
            <div className={styles.fsRehabEx}>Hip Flexor Stretch</div>
            <div className={styles.fsRehabSub}>Stretch · 45s hold</div>
          </div>
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
          <h2 className={styles.title}>Clean, functional interfaces.</h2>
        </div>

        <div className={styles.layout}>
          {/* Phone */}
          <div className={styles.phoneWrap}>
            <div className={styles.phone}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
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
