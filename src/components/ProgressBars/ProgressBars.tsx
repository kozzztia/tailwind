
import { useEffect, useState } from 'react';
import styles from './styles.module.css'

const ProgressBars = () => {
  const [progress, setProgress] = useState<number>(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 6 ? prev + 1 : 0)); 
    }, 500);

    return () => clearInterval(interval); 
  }, []);



  return (
    <div className={styles.container}>

      <DashedProgressBar count={1} progress={progress}/>

      <ProcentProgressBar count={2} progress={progress}/>

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


const ProgressBarContainer: React.FC<{ count: number, children: React.ReactNode, className?: string }> = ({ count, children, className }) => {
  return (
    <div className={[styles.progressBar, className].join(' ')}>
      <Counter count={count} />
      {children}
    </div>
  )
}


const Counter: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className={styles.counter}>
      <span>{count}</span>
    </div>
  )
}

const DashedProgressBar: React.FC<{ count: number, progress: number }> = ({ count, progress }) => {
  const arr = [1, 2, 3, 4, 5, 6]
  return (
    <ProgressBarContainer count={count} className={styles.dashedProgressBar}>
      <div className={styles.line}>
        {
          arr.map((item) => (
            <span key={item} className={`${styles.dashed} ${item <= progress ? styles.active : ''}`}>
            </span>
          ))
        }
      </div>
    </ProgressBarContainer>
  )
}

const ProcentProgressBar: React.FC<{ count: number; progress: number }> = ({ count, progress }) => {
  const clampedProgress = Math.min(Math.max(100 * (progress / 6), 0));

  return (
    <ProgressBarContainer count={count} className={styles.procentProgressBar}>
      <div
        className={styles.line}
        style={{ width: `${clampedProgress}%` }} 
      ></div>
    </ProgressBarContainer>
  );
};




