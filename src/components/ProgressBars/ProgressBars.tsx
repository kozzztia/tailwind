import { useEffect, useState } from "react";
import React from "react";
import styles from "./styles.module.css";
import { steps } from "./consts";

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

      <StepCirceProgressBar count={4} progress={progress} />

      <StepProgressBar count={5} progress={progress} />

      <CirceProgressBar count={6} progress={progress} />

      <DecoreProgressBar count={7} progress={progress} />

      <DashedStepProgressBar count={8} progress={progress}  step={10}/>
    </div>
  );
};

export default ProgressBars;

const Container: React.FC<{ count: number; children: React.ReactNode; className?: string; }> = React.memo(({ count, children, className }) => {
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

const StepCirceProgressBar: React.FC<{ count: number; progress: number }> = React.memo(
  ({ count, progress }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    const [step, setStep] = useState<string>(steps[0]);

    useEffect(() => {
      const newStep = progress <= 10
        ? steps[0]
        : progress > 10 && progress <= 50
          ? steps[1]
          : progress > 50 && progress <= 90
            ? steps[2]
            : progress > 90
              ? steps[3]
              : "error";

      if (newStep !== step) {
        setStep(newStep);
      }
    }, [progress, step]);

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
          {steps.map((item) => (
            <div
              key={item}
              className={`${styles.step} ${step === item ? styles.active : styles.inactive}`}
            >
              {item}
            </div>
          ))}
        </div>
      </Container>
    );
  }
);

const StepProgressBar: React.FC<{ count: number; progress: number }> = React.memo(
  ({ count, progress }) => {
    const [step, setStep] = useState<string>(steps[0]);
    useEffect(() => {
      const newStep = progress <= 10
        ? steps[0]
        : progress > 10 && progress <= 50
          ? steps[1]
          : progress > 50 && progress <= 90
            ? steps[2]
            : progress > 90
              ? steps[3]
              : "error";

      if (newStep !== step) {
        setStep(newStep);
      }
    }, [progress, step]);

    return (
      <Container count={count} className={styles.stepProgressBar}>
        <div className={`${styles.section} ${styles.steps}`}>
          {steps.map((item) => (
            <div
              key={item}
              className={`${styles.step} ${step === item ? styles.active : styles.inactive}`}
            >
              {item}
            </div>
          ))}
        </div>
      </Container>
    );
  }
);

const CirceProgressBar: React.FC<{ count: number; progress: number }> = React.memo(
  ({ count, progress }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

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
      </Container>
    );
  }
);

const DecoreProgressBar: React.FC<{ count: number; progress: number }> = React.memo(
  ({ count, progress }) => {
    return (
      <Container count={count} className={styles.decoreProgressBar}>
        <div className={styles.line}>
          <div className={styles.procent} style={{ width: `${100 - progress}%` }}>
          </div>
        </div>
      </Container>
    );
  }
);

const DashedStepProgressBar: React.FC<{ count: number; progress: number, step: number }> = React.memo(({ count, progress ,step }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const [circleStep, setCircleStep] = useState<number>(0);
  const [progressStep, setProgressStep] = useState<number>(0);
  useEffect(() => {
    if(progress % step === 0 || progress === 0) {
      setCircleStep(progress * circumference / 100);
      setProgressStep(progress);
    }
  }, [circumference, progress, step]);

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
              strokeDashoffset={circumference - circleStep}
            ></circle>
            {/* Текст прогресса */}
            <text className={styles.text} x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
              {progressStep.toFixed(0)}%
            </text>
          </svg>
        </div>
      </div>   
    </Container>
  );
});
