
import styles from './styles.module.css'

const ProgressBars = () => {
  return (
    <div className={styles.container}>

        <DashedProgressBar count={1} />

        <div className={styles.progressBar}>
          progrree
        </div>

        <div className={styles.progressBar}>
          progrree
        </div>

        <div className={styles.progressBar}>
          progrree
        </div>
        <div className={styles.progressBar}>
          progrree
        </div>

        <div className={styles.progressBar}>
          progrree
        </div>

        <div className={styles.progressBar}>
          progrree
        </div>
        
        <div className={styles.progressBar}>
          progrree
        </div>

    </div>
  )
}

export default ProgressBars;


const ProgressBarContainer: React.FC<{count: number, children: React.ReactNode}> = ({count, children}) => {
  return (
    <div className={styles.progressBar}>
      <Counter count={count}/>
      {children}
    </div>
  )
}


const Counter: React.FC<{count: number}> = ({count}) => {
  return (
    <div className={styles.counter}>
      <span>{count}</span>
    </div>
  )
}

const DashedProgressBar: React.FC<{count: number}> = ({count}) => {
  return (
    <ProgressBarContainer count={count}>
      progrree
    </ProgressBarContainer>
  )
}