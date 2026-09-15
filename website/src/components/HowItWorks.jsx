import { motion } from 'framer-motion'
import styles from './HowItWorks.module.css'

const STEPS = [
  {
    num: '01',
    icon: '👤',
    title: 'Set your profile',
    desc: 'Tell the app your goals, body stats, and choose Fitness or Rehabilitation mode. Pick English or Urdu for Juno, your AI coach.',
  },
  {
    num: '02',
    icon: '📸',
    title: 'Point the camera & move',
    desc: 'Open the live workout view, select an exercise, and start. PosturePal maps your body instantly and draws your pose skeleton in real time.',
  },
  {
    num: '03',
    icon: '🏆',
    title: 'Get coached on every rep',
    desc: 'Bad form? Juno calls it out immediately. Perfect rep? Counted and saved. Every session goes into your history automatically.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className={styles.title}>Three steps from launch<br />to your best workout.</h2>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.stepLeft}>
                <div className={styles.stepNum}>{s.num}</div>
                {i < STEPS.length - 1 && <div className={styles.stepLine} />}
              </div>
              <div className={styles.stepBody}>
                <div className={styles.stepIcon}>{s.icon}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
