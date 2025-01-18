import { useEffect, useMemo, useState } from "react";
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

      <StepProgressBar count={4} progress={progress} steps={["Start", "Search", "Refactor", "Save"]} />
    </div>
  );
};

export default ProgressBars;

const Container: React.FC<{count: number;children: React.ReactNode;className?: string;}> = React.memo(({ count, children, className }) => {
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
    return (
      <Container count={count} className={styles.procentProgressBar}>
        <div className={styles.line}>
          <div className={styles.progressOne} style={{ width: `${progress}%` }}>
            <div className={styles.procentOne}>{progress}</div>
          </div>
        </div>
      </Container>
    );
  }
);

const ProcentProgressBarTwo: React.FC<{ count: number; progress: number }> = React.memo(
  ({ count, progress }) => {
    return (
      <Container count={count} className={styles.procentProgressBar}>
        <div className={styles.line}>
          <div className={styles.procentTwo}>{progress}%</div>
          <div className={styles.progressTwo} style={{ width: `${progress}%` }}></div>
        </div>
      </Container>
    );
  }
);

const StepProgressBar: React.FC<{ count: number; progress: number; steps: string[] }> = React.memo(
  ({ count, progress, steps }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    // Определение текущего шага с использованием useMemo
    const step = useMemo(() => {
      if (progress <= 10 && progress > 0) return steps[0];
      if (progress > 10 && progress <= 50) return steps[1];
      if (progress > 50 && progress <= 90) return steps[2];
      if (progress > 90 && progress <= 100) return steps[3];
      return null;
    }, [progress, steps]);

    return (
      <Container count={count} className={styles.stepProgressBar}>
        {/* Круговой прогресс */}
        <div className={styles.section}>
          <div className={styles.circle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
              {/* Фон */}
              <circle
                className={styles.back}
                cx="25"
                cy="25"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset="0"
              ></circle>
              {/* Прогресс */}
              <circle
                className={styles.front}
                cx="25"
                cy="25"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              ></circle>
              {/* Текст прогресса */}
              <text className={styles.text} x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
                {progress}%
              </text>
            </svg>
          </div>
        </div>
        {/* Отображение текущего шага */}
        <div className={`${styles.section} ${styles.steps}`}>
          {
            steps.map((item) => (
              <div key={item} className={`${styles.step} ${step === item ? styles.active : styles.inactive}`}>
                {item}
              </div>
            ))
          }
        </div>
      </Container>
    );
  }
);