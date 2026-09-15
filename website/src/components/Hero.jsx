import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import logoIcon from "../logo_icon.png"
import s from "./Hero.module.css"

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let raf, t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const COLS = 22, ROWS = 12
      const cw = canvas.width / COLS
      const rh = canvas.height / ROWS
      for (let c = 0; c <= COLS; c++) {
        for (let r = 0; r <= ROWS; r++) {
          const wave = Math.sin(t * 0.7 + c * 0.45 + r * 0.45) * 0.5 + 0.5
          const alpha = wave * 0.15
          ctx.beginPath()
          ctx.arc(c * cw, r * rh, 1.3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(167,139,250,${alpha})`
          ctx.fill()
        }
      }
      t += 0.025
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  return (
    <section className={s.hero}>
      <canvas ref={canvasRef} className={s.canvas} aria-hidden />
      <div className={s.gradientBg} />

      <div className={s.wrap}>
        {/* ── LEFT COPY ── */}
        <div className={s.copy}>
          <motion.div
            className={s.badge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={s.badgeDot} />
            AI-Powered · Fully Offline · Android
          </motion.div>

          <motion.h1
            className={s.h1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            Your AI trainer.
            <br />
            <span className={s.highlight}>Always on you.</span>
          </motion.h1>

          <motion.p
            className={s.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            PosturePal watches your form through the camera, counts reps automatically,
            and coaches you in real time — in English or Urdu. No internet. No gym.
            Just you and your AI coach.
          </motion.p>

          <motion.div
            className={s.actions}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.27 }}
          >
            <a href="#download" className={s.btnPrimary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 16l-5-5h3V4h4v7h3l-5 5z"/>
                <path d="M5 20h14v-2H5v2z"/>
              </svg>
              Get Early Access
            </a>
            <a href="#features" className={s.btnOutline}>
              See Features
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>

          <motion.div
            className={s.pills}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
          >
            {["100% Offline", "On-Device AI", "English & Urdu", "No Subscription"].map(p => (
              <span key={p} className={s.pill}>
                <span className={s.pillCheck}>✓</span> {p}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT PHONE ── */}
        <motion.div
          className={s.phoneOuter}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Aura glow behind phone */}
          <div className={s.aura} />

          {/* Phone shell */}
          <div className={s.phone}>
            {/* Dynamic island style notch */}
            <div className={s.island} />

            {/* Status bar */}
            <div className={s.statusBar}>
              <span className={s.statusTime}>9:41</span>
              <div className={s.statusRight}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
                  <rect x="2" y="7" width="20" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <rect x="4" y="9" width="14" height="7" rx="1" fill="currentColor" opacity="0.8"/>
                  <path d="M23 11v3a1 1 0 000-3z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* App header bar */}
            <div className={s.appBar}>
              <img src={logoIcon} alt="" className={s.appBarLogo} />
              <span className={s.appBarName}>PosturePal</span>
              <span className={s.liveTag}>
                <span className={s.liveDot} />
                LIVE
              </span>
            </div>

            {/* Exercise name chip */}
            <div className={s.exerciseChip}>
              <span className={s.exerciseIcon}>🏃</span>
              <span>Burpee + Jump</span>
            </div>

            {/* ── CAMERA VIEW ── */}
            <div className={s.camView}>
              {/* The GIF — mix-blend-mode:screen removes white bg */}
              <img
                src="/Burpee and Jump Exercise.gif"
                alt="AI exercise pose tracking"
                className={s.exerciseGif}
              />

              {/* Vignette overlay */}
              <div className={s.vignette} />

              {/* Corner brackets */}
              <div className={s.cornerTL} />
              <div className={s.cornerTR} />
              <div className={s.cornerBL} />
              <div className={s.cornerBR} />

              {/* Scan line */}
              <div className={s.scanLine} />

              {/* Annotation badges */}
              <div className={`${s.ann} ${s.annLeft}`}>
                <span className={s.annDot} style={{background:"#22c55e", boxShadow:"0 0 6px #22c55e"}} />
                Back straight
              </div>
              <div className={`${s.ann} ${s.annRight}`}>
                <span className={s.annDot} style={{background:"var(--cyan)", boxShadow:"0 0 6px var(--cyan)"}} />
                Form: good
              </div>

              {/* AI label */}
              <div className={s.camLabel}>AI Pose Tracking Active</div>
            </div>

            {/* ── STATS STRIP ── */}
            <div className={s.statsStrip}>
              <div className={s.statBlock}>
                <span className={s.statNum}>12</span>
                <span className={s.statLbl}>Reps</span>
              </div>
              <div className={s.statDivider} />
              <div className={s.statBlock}>
                <span className={s.statNum} style={{color:"var(--cyan)"}}>94%</span>
                <span className={s.statLbl}>Form</span>
              </div>
              <div className={s.statDivider} />
              <div className={s.statBlock}>
                <span className={s.statNum} style={{color:"#22c55e"}}>🔥 3</span>
                <span className={s.statLbl}>Sets</span>
              </div>
            </div>

            {/* ── COACH STRIP ── */}
            <div className={s.coachStrip}>
              <span className={s.coachIcon}>🎙</span>
              <span className={s.coachText}>Keep your core tight on the way down!</span>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className={s.bottomNav}>
              {[
                { icon: "🏠", label: "Home" },
                { icon: "🏋️", label: "Train", active: true },
                { icon: "📊", label: "Stats" },
                { icon: "🤖", label: "Coach" },
              ].map(({ icon, label, active }) => (
                <div key={label} className={`${s.navItem} ${active ? s.navActive : ""}`}>
                  <span className={s.navIcon}>{icon}</span>
                  <span>{label}</span>
                  {active && <div className={s.navIndicator} />}
                </div>
              ))}
            </div>
          </div>

          {/* ── FLOATING CARDS ── */}
          <motion.div
            className={`${s.floater} ${s.floaterLeft}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={s.floaterIconWrap} style={{background:"rgba(124,58,237,0.15)"}}>🔥</div>
            <div>
              <div className={s.floaterVal}>12 Reps</div>
              <div className={s.floaterSub}>Perfect form · Burpee</div>
            </div>
          </motion.div>

          <motion.div
            className={`${s.floater} ${s.floaterRight}`}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          >
            <div className={s.floaterIconWrap} style={{background:"rgba(34,211,238,0.12)"}}>⚡</div>
            <div>
              <div className={s.floaterVal}>Form: 94%</div>
              <div className={s.floaterSub}>AI confidence score</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
