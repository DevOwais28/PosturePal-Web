import { motion } from "framer-motion"
import logoIcon from "../logo_icon.png"
import s from "./Hero.module.css"

export default function Hero() {
  return (
    <section className={`${s.hero} meshBg`}>
      <div className={s.wrap}>
        {/* ── LEFT COPY ── */}
        <div className={s.copy}>
          <motion.div
            className={s.badge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Offline AI Personal Trainer
          </motion.div>

          <motion.h1
            className={s.h1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            Train smarter.<br />
            <span className={s.highlight}>Anywhere.</span>
          </motion.h1>

          <motion.p
            className={s.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            PosturePal watches your form through the camera, counts reps automatically,
            and coaches you in real time. No internet required.
          </motion.p>

          <motion.div
            className={s.actions}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.27 }}
          >
            <a href="#download" className={s.btnPrimary}>
              Get Early Access
            </a>
            <a href="#features" className={s.btnOutline}>
              See Features
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT PHONE ── */}
        <motion.div
          className={s.phoneOuter}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Phone shell */}
          <div className={s.phone}>
            {/* Dynamic island style notch */}
            <div className={s.island} />

            {/* Status bar */}
            <div className={s.statusBar}>
              <span className={s.statusTime}>9:41</span>
              <div className={s.statusRight}>
                <span className={s.statusIcon}>📶</span>
                <span className={s.statusIcon}>🔋</span>
              </div>
            </div>

            {/* App header bar */}
            <div className={s.appBar}>
              <img src={logoIcon} alt="" className={s.appBarLogo} />
              <span className={s.appBarName}>PosturePal</span>
              <span className={s.liveTag}>LIVE</span>
            </div>

            {/* Exercise name chip */}
            <div className={s.exerciseChip}>
              <span className={s.exerciseIcon}>🏃</span>
              <span>Burpee + Jump</span>
            </div>

            {/* ── CAMERA VIEW ── */}
            <div className={s.camView}>
              <img
                src="/Burpee and Jump Exercise.gif"
                alt="AI exercise pose tracking"
                className={s.exerciseGif}
              />
              <div className={s.cornerTL} />
              <div className={s.cornerTR} />
              <div className={s.cornerBL} />
              <div className={s.cornerBR} />

              <div className={`${s.ann} ${s.annLeft}`}>
                <span className={s.annDot} style={{background:"#000"}} />
                Back straight
              </div>
              <div className={`${s.ann} ${s.annRight}`}>
                <span className={s.annDot} style={{background:"#495057"}} />
                Form: good
              </div>
            </div>

            {/* ── STATS STRIP ── */}
            <div className={s.statsStrip}>
              <div className={s.statBlock}>
                <span className={s.statNum}>12</span>
                <span className={s.statLbl}>Reps</span>
              </div>
              <div className={s.statBlock}>
                <span className={s.statNum}>94%</span>
                <span className={s.statLbl}>Form</span>
              </div>
              <div className={s.statBlock}>
                <span className={s.statNum}>3</span>
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
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
