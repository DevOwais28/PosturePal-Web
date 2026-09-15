import { motion } from "framer-motion"
import s from "./Features.module.css"

const fade = (i) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05, ease: [0.22,1,0.36,1] } },
})

const CARDS = [
  {
    size: "huge",
    icon: "🎯",
    tag: "Core Tech",
    title: "Real-Time Pose Detection",
    desc: "MediaPipe tracks 33 body landmarks through your camera. A local AI model recognizes exercises and catches form errors — all on-device, under 50ms latency.",
    extra: (
      <div className={s.statsRow}>
        <div className={s.statChip}><span>33</span>landmarks</div>
        <div className={s.statChip}><span>{"<50ms"}</span>latency</div>
        <div className={s.statChip}><span>0</span>cloud calls</div>
      </div>
    ),
  },
  {
    size: "normal",
    icon: "✅",
    title: "Live Form Correction",
    desc: "Instant alerts the moment your knees cave, back rounds, or depth drops — with exact corrective cues.",
  },
  {
    size: "normal",
    icon: "🔢",
    title: "Auto Rep Counting",
    desc: "Reps counted from movement patterns automatically. Squats, push-ups — no manual tap ever.",
  },
  {
    size: "wide",
    icon: "🫀",
    tag: "Adaptive",
    title: "Fitness & Rehab Modes",
    desc: "Fitness mode drives performance with strict thresholds. Rehabilitation mode uses gentler ranges with recovery-focused guidance — perfect for physiotherapy. The app adapts to your goals.",
    extra: (
      <div className={s.modeRow}>
        <div className={s.modeChip}>💪 Fitness Mode</div>
        <div className={s.modeChip}>🫀 Rehab Mode</div>
      </div>
    ),
  },
  {
    size: "normal",
    icon: "🎙",
    title: "Voice Coach",
    desc: "AI coach speaks in English or Urdu. Real natural-language cues.",
  },
  {
    size: "normal",
    icon: "📵",
    title: "100% Offline",
    desc: "No Wi-Fi, no subscription, no data leaving your phone. Works anywhere.",
  },
  {
    size: "normal",
    icon: "📊",
    title: "Progress Analytics",
    desc: "Session streaks, volume trends, form score over time.",
  },
  {
    size: "normal",
    icon: "🥗",
    title: "Nutrition Tracker",
    desc: "BMR/TDEE-based calorie targets personalized to your profile.",
  },
]

export default function Features() {
  return (
    <section className={s.section} id="features">
      <div className={s.inner}>
        <motion.div
          className={s.head}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={s.eyebrow}>Features</span>
          <h2 className={s.title}>
            Everything a great trainer gives you.
            <br />
            <span className={s.dim}>Nothing you don't need.</span>
          </h2>
        </motion.div>

        <div className={s.grid}>
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              className={`${s.card} ${s[c.size]}`}
              variants={fade(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={s.cardTop}>
                <span className={s.cardIcon}>{c.icon}</span>
                {c.tag && <span className={s.cardTag}>{c.tag}</span>}
              </div>
              <h3 className={s.cardTitle}>{c.title}</h3>
              <p className={s.cardDesc}>{c.desc}</p>
              {c.extra}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
