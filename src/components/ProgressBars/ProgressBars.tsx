import { useEffect, useState } from "react";
import React from "react";
import styles from "./styles.module.css";

const ProgressBars = () => {
  const dashedCount = 10;
  const [progress, setProgress] = useState<number>(0);
  const [dashedProgress, setDashedProgress] = useState<number>(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDashedProgress(0);
          return 0;
        }

        const nextProgress = prev + 1;

        if (nextProgress % 10 === 0) {
          setDashedProgress(Math.min(nextProgress / 10, dashedCount));
        }

        return nextProgress;
      });
    }, 100); 

    return () => clearInterval(interval);
  }, [dashedCount]);

  return (
    <div className={styles.container}>
      <DashedProgressBar count={1} progress={dashedProgress} length={dashedCount} />

      <ProcentProgressBar count={2} progress={progress} />

      <ProcentProgressBarTwo count={3} progress={progress} />
    </div>
  );
};

export default ProgressBars;

const Container: React.FC<{
  count: number;
  children: React.ReactNode;
  className?: string;
}> = React.memo(({ count, children, className }) => {
  return (
    <div className={[styles.progressBar, className].join(" ")}>
      <Counter count={count} />
      {children}
    </div>
  );
});

const Counter: React.FC<{ count: number }> = React.memo(({ count }) => {
  return (
    <div className={styles.counter}>
      <span>{count}</span>
    </div>
  );
});

const DashedProgressBar: React.FC<{ count: number; progress: number; length: number }> = React.memo(
  ({ count, progress, length }) => {
    const arr = [...Array(length).keys()]; 
    console.log("dashed");
    return (
      <Container count={count} className={styles.dashedProgressBar}>
        <div className={styles.line}>
          {arr.map((item) => (
            <span
              key={item}
              className={`${styles.dashed} ${item < progress ? styles.active : ""}`}
            ></span>
          ))}
        </div>
      </Container>
    );
  }
);

const ProcentProgressBar: React.FC<{ count: number; progress: number }> = React.memo(
  ({ count, progress }) => {
    console.log("procent");
    return (
      <Container count={count} className={styles.procentProgressBar}>
        <div className={styles.line} style={{ width: `${progress}%` }}>
          <div className={styles.procent}>{progress}</div>
        </div>
      </Container>
    );
  }
);

const ProcentProgressBarTwo: React.FC<{ count: number; progress: number }> = React.memo(
  ({ count, progress }) => {
    console.log("procent");
    return (
      <Container count={count} className={styles.procentProgressBar}>
                  <div className={styles.procentTwo}>{progress}%</div>
        <div className={styles.line} style={{ width: `${progress}%` }}>
        </div>
      </Container>
    );
  }
);
