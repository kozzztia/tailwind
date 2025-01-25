import { FC, useLayoutEffect, useState } from "react";
import styles from "./styles.module.css"
import { FaClock, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
// import { FaPause, FaPlay, FaTimes } from "react-icons/fa";
import {getLocalStorageTime, getLocalTime } from "./helper";


const Timer = () => {
  

  return (
    <div className={styles.container}>
      <ViewTimer/>
      <Display/>
      <Music/>
    </div>
  )
}

export default Timer

const ViewTimer = () => {
  const [time, setTime] = useState<Time>(getLocalTime());
  const arr = ["hour" , "minute", "second"];
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.viewTimer}>
      {arr.map((item, index) => (
        <TimeElement key={index} number={Object.values(time)[index]} name={item} />
      ))}
    </div>
  )
}

const TimeElement: FC<{number: string; name: string}> = ({ number, name}) => {
  return (
    <div className={styles.timeElement}>
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{name}</span>
    </div>
  )
}

const Display = () => {
  const [alertTime, setAlertTime] = useState<AlertTime>(getLocalStorageTime() || { hour: "00", minute: "00" });

  const updateTime = (type: "hour" | "minute", value: number) => {
    // Если alertTime отсутствует, задаем начальные значения
    const current = Number(alertTime[type]);
    const max = type === "hour" ? 24 : 60;
  
    // Обработка случаев перехода через границы
    if (current === 0 && value === -1) {
      setAlertTime({
        ...alertTime,
        [type]: (max - 1).toString().padStart(2, "0"),
      });
      return;
    }
  
    if (current === max - 1 && value === 1) {
      setAlertTime({
        ...alertTime,
        [type]: "00",
      });
      return;
    }
  
    // Общий случай
    const newValue = (current + value + max) % max;
    setAlertTime({
      ...alertTime,
      [type]: newValue.toString().padStart(2, "0"),
    });
  };
  

  return (
    <div className={styles.alert}>
      <div className={styles.hour}>
        <button onClick={() => updateTime("hour", 1)}>
          <FaCirclePlus />
        </button>
        <span>{alertTime.hour}</span>
        <button onClick={() => updateTime("hour", -1)}>
          <FaCircleMinus />
        </button>
      </div>
      <div className={styles.minute}>
        <button onClick={() => updateTime("minute", 1)}>
          <FaCirclePlus />
        </button>
        <span>{alertTime.minute}</span>
        <button onClick={() => updateTime("minute", -1)}>
          <FaCircleMinus />
        </button>
      </div>
      <div className={styles.menu}>
        <button >
          <FaClock />
        </button>
      </div>
    </div>
  )
}

const Music = () => {




  return (
    <div className={styles.music}>
      music
    </div>
  );
};

interface Time {
  hour: string;
  minute: string;
  second: string;
}

interface AlertTime {
  hour: string;
  minute: string;
}