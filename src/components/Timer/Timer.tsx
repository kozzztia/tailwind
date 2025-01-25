import { FC, useLayoutEffect, useState } from "react";
import styles from "./styles.module.css"
import { FaClock, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
// import { FaPause, FaPlay, FaTimes } from "react-icons/fa";
import {getLocalStorageTime, getLocalTime, padedNumber, removeLocalStorageTime, setLocalStorageTime } from "./helper";
import { FaTrash } from "react-icons/fa";


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
        <TimeElement key={index} number={padedNumber(Object.values(time)[index])} name={item} />
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
  const [alertTime, setAlertTime] = useState<AlertTime>({ hour: 0, minute: 0 });
  const [edit, setEdit] = useState<boolean>(false);

  useLayoutEffect(() => {
    const alert = getLocalStorageTime();
    if (alert) {
      setEdit(true);
      setAlertTime(alert);
    }else{
      resetTime();
    }
  }, []);

  const updateTime = (type: "hour" | "minute", value: number) => {
    const current = Number(alertTime[type]);
    const max = type === "hour" ? 24 : 60;
    const newValue =
    current === 0 && value === -1
      ? max - 1
      : current === max - 1 && value === 1
      ? 0
      : (current + value + max) % max;

    setAlertTime((prev) => ({
      ...prev,
      [type]: newValue,
    }));
  };

  const setTime = () => {
    setLocalStorageTime(alertTime.hour, alertTime.minute);
    setEdit(true);
  }

  const removeTime = () => {
    removeLocalStorageTime();
    resetTime();
  }

  const resetTime = () => {
    setEdit(false);
    setAlertTime({ hour: 0, minute: 0 });
  };

  return (
    <div className={styles.alert}>
      <div className={styles.hour}>
        <button onClick={() => updateTime("hour", 1)}>
          <FaCirclePlus />
        </button>
        <span>{padedNumber(alertTime.hour)}</span>
        <button onClick={() => updateTime("hour", -1)}>
          <FaCircleMinus />
        </button>
      </div>
      <div className={styles.minute}>
        <button onClick={() => updateTime("minute", 1)}>
          <FaCirclePlus />
        </button>
        <span>{padedNumber(alertTime.minute)}</span>
        <button onClick={() => updateTime("minute", -1)}>
          <FaCircleMinus />
        </button>
      </div>
      <div className={styles.menu}>
        {
          edit ? (
            <button onClick={removeTime}>
              <FaTrash/>
            </button>
          ) : (
            <button onClick={setTime}>
              <FaClock />
            </button>
          )
        }
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
  hour: number;
  minute: number;
  second: number;
}

interface AlertTime {
  hour: number;
  minute: number;
}