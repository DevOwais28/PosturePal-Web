import { motion } from "framer-motion"
import s from "./Features.module.css"

const fade = (i) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: [0.22,1,0.36,1] } },
})

const CARDS = [
  {
    size: "wide",
    accent: "var(--violet)",
    icon: "🦴",
    tag: "Core AI",
    title: "Real-Time Pose Detection",
    desc: "MediaPipe tracks 33 body landmarks through your camera. A BiLSTM model trained on those sequences recognises exercises and catches form errors — all on-device, under 50ms latency.",
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
    accent: "var(--cyan)",
    icon: "✅",
    title: "Live Form Correction",
    desc: "Instant alerts the moment your knees cave, back rounds, or depth drops — with exact corrective cues.",
  },
  {
    size: "normal",
    accent: "var(--violet-2)",
    icon: "🔢",
    title: "Auto Rep Counting",
    desc: "Reps counted from movement patterns automatically. Squats, push-ups — no manual tap ever.",
  },
  {
    size: "normal",
    accent: "var(--orange)",
    icon: "🎙",
    title: "English & Urdu Coach",
    desc: "AI coach Juno speaks in English or Urdu. Real natural-language cues, not robotic beeps.",
  },
  {
    size: "normal",
    accent: "var(--violet)",
    icon: "📵",
    title: "100% Offline",
    desc: "No Wi-Fi, no subscription, no data leaving your phone. Works on a desert island.",
  },
  {
    size: "wide",
    accent: "var(--violet-2)",
    icon: "🫀",
    tag: "Smart Modes",
    title: "Fitness & Rehab Modes",
    desc: "Fitness mode drives performance with strict thresholds. Rehabilitation mode uses gentler ranges with recovery-focused guidance — perfect for physiotherapy or post-injury training. The AI adapts to you.",
    extra: (
      <div className={s.modeRow}>
        <div className={s.modeChip} style={{ "--c": "var(--violet-2)", "--bg": "var(--violet-dim)" }}>
          💪 Fitness
        </div>
        <div className={s.modeChip} style={{ "--c": "var(--cyan)", "--bg": "var(--cyan-dim)" }}>
          🫀 Rehab
        </div>
      </div>
    ),
  },
  {
    size: "normal",
    accent: "var(--cyan)",
    icon: "📊",
    title: "Progress Analytics",
    desc: "Session streaks, volume trends, form score over time — all stored locally, zero cloud.",
  },
  {
    size: "normal",
    accent: "var(--green)",
    icon: "🥗",
    title: "Nutrition Summary",
    desc: "BMR/TDEE-based calorie targets personalised to your profile. Computed on-device.",
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
              className={`${s.card} ${c.size === "wide" ? s.wide : ""}`}
              style={{ "--accent": c.accent }}
              variants={fade(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={s.cardGlow} />
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
