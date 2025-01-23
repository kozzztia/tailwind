import { useCallback, useLayoutEffect, useState } from "react";
import styles from "./styles.module.css"
import { FaMinus, FaPlus, FaClock } from "react-icons/fa6";


const Timer = () => {
  const date = new Date();
  const [time, setTime] = useState<Time>({
    hours: date.getHours().toString().padStart(2, "0"),
    minutes: date.getMinutes().toString().padStart(2, "0"),
    seconds: date.getSeconds().toString().padStart(2, "0"),
  });

  const memoizedSetTime = useCallback(() => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    setTime({ hours, minutes, seconds });
  }, []);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      memoizedSetTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [memoizedSetTime]);

  const arrTime = Object.values(time);
  const arrText = Object.keys(time)

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        {
          arrTime.map((item, index) => <TimeElement key={arrText[index]} number={item} name={arrText[arrTime.indexOf(item)]} />
          )
        }
      </div>
      <Display />
    </div>
  )
}

export default Timer

const TimeElement = ({ number, name }: { number: string, name: string }) => {
  return (
    <div className={styles.timeElement}>
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{name}</span>
    </div>
  )
}

const Display = () => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  const hourOnclick: (value: number) => void = (value) => {
    if (value === -1 && hour === 0) {
      setHour(23);
      return;
    } else if (hour === 23 && value === 1) {
      setHour(0);
    } else {
      setHour(prev => prev + value);
    }
  }

  const minuteOnclick: (value: number) => void = (value) => {
    if (value === -1 && minute === 0) {
      setMinute(59);
      return;
    } else if (minute === 59 && value === 1) {
      setMinute(0);
    } else {
      setMinute(prev => prev + value);
    }
  }

  return (
    <div className={styles.alert}>
      <div className={styles.hour}>
        <button onClick={() => hourOnclick(1)}>
          <FaPlus />
        </button>
        <span>{hour.toString().padStart(2, "0")}</span>
        <button onClick={() => hourOnclick(-1)}>
          <FaMinus />
        </button>
      </div>
      <div className={styles.minute}>
        <button onClick={() => minuteOnclick(1)}>
          <FaPlus />
        </button>
        <span>{minute.toString().padStart(2, "0")}</span>
        <button onClick={() => minuteOnclick(-1)}>
          <FaMinus />
        </button>
      </div>
      <div className={styles.menu}>
        <button>
          <FaClock/>
        </button>

      </div>

    </div>
  )
}


interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}