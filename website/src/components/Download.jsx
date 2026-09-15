import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Download.module.css'

export default function Download() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
  }

  return (
    <section className={styles.section} id="download">
      <div className={styles.bg}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.box}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.comingBadge}>🚀 Coming to Google Play</div>
          <h2 className={styles.title}>
            Train smarter.<br />
            <span className={styles.blue}>Start today.</span>
          </h2>
          <p className={styles.sub}>
            PosturePal is launching on Android soon. Drop your email — we'll ping you the second it goes live. That's it.
          </p>

          <div className={styles.playSection}>
            <a href="#" className={styles.playBtn} aria-label="Get it on Google Play — coming soon">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className={styles.playImg}
              />
            </a>
            <p className={styles.playNote}>Android · Free Download · No Subscription</p>
          </div>

          <div className={styles.divider}><span>or get notified first</span></div>

          {!done ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                id="notify-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={styles.input}
                required
              />
              <button type="submit" className={styles.submitBtn}>Notify Me</button>
            </form>
          ) : (
            <motion.div
              className={styles.successMsg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              🎉 You're on the list! We'll email you when PosturePal launches.
            </motion.div>
          )}
          <p className={styles.fine}>No spam. Unsubscribe any time.</p>
        </motion.div>
      </div>
    </section>
  )
}
