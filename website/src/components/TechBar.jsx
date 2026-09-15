import styles from './TechBar.module.css'

const TECHS = ['MediaPipe', 'TensorFlow Lite', 'React Native', 'BiLSTM AI', 'Expo SDK', 'SQLite', 'On-Device TTS', 'OpenCV']

export default function TechBar() {
  return (
    <div className={styles.bar}>
      <span className={styles.label}>Built with</span>
      <div className={styles.track}>
        <div className={styles.inner}>
          {[...TECHS, ...TECHS].map((t, i) => (
            <span key={i} className={styles.chip}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
