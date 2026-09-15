import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQ.module.css'

const FAQS = [
  {
    q: "Is PosturePal really 100% offline?",
    a: "Yes. All AI inference — pose detection, form analysis, rep counting — runs entirely on your device using TFLite models. Nothing is ever sent to a server.",
  },
  {
    q: "Which exercises does it support at launch?",
    a: "The launch version supports squats and push-ups with full form correction. Lunges, deadlifts, and planks are on the roadmap.",
  },
  {
    q: "What's the difference between Fitness and Rehab mode?",
    a: "Fitness mode has stricter thresholds for performance athletes. Rehabilitation mode uses gentler ranges with recovery-focused cues — ideal for post-injury training or physiotherapy.",
  },
  {
    q: "Is it available on iOS?",
    a: "PosturePal launches on Android first. iOS support is planned. Sign up for early access and we'll keep you posted.",
  },
  {
    q: "Will it cost money?",
    a: "Free to download. Core features stay free forever. We may add optional premium features in a future update — nothing is locked right now.",
  },
  {
    q: "How accurate is the AI?",
    a: "The BiLSTM model is trained on landmark sequences from MediaPipe, which tracks 33 body keypoints at high frequency. Accuracy improves when you stay within full camera frame and have decent lighting.",
  },
]

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button
        className={styles.q}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        id={`faq-btn-${index}`}
      >
        <span>{item.q}</span>
        <svg
          className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={styles.aWrap}
          >
            <p className={styles.a}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.title}>Questions? Good.</h2>
          <p className={styles.sub}>Here are the ones we get asked most.</p>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <FaqItem key={i} item={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
