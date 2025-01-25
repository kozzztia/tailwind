import { FC, useLayoutEffect, useState } from "react";
import styles from "./styles.module.css"
import { FaClock, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
// import { FaPause, FaPlay, FaTimes } from "react-icons/fa";
import { calculateNewValue, getLocalStorageTime, getLocalTime, padedNumber, removeLocalStorageTime, setLocalStorageTime } from "./helper";
import { FaTrash } from "react-icons/fa";


const Timer: FC = () => {
  return (
    <div className={styles.container}>
      <ViewTimer />
      <Display />
      <Music />
    </div>
  )
}

export default Timer

const ViewTimer: FC = () => {
  const [time, setTime] = useState<Time>(getLocalTime());
  const arr = ["hour", "minute", "second"];
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.viewTimer}>
      {arr.map((item, index) => (
        <ViewtimerElement key={index} number={padedNumber(Object.values(time)[index])} name={item} />
      ))}
    </div>
  )
}

const ViewtimerElement: FC<{ number: string; name: string }> = ({ number, name }) => {
  return (
    <div className={styles.timeElement}>
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{name}</span>
    </div>
  )
}

const Display: FC = () => {
  const [alertTime, setAlertTime] = useState<AlertTime>({ hour: 0, minute: 0 });
  const [edit, setEdit] = useState<boolean>(false);
  const arr = ["hour", "minute"];

  useLayoutEffect(() => {
    const alert = getLocalStorageTime();
    if (alert) {
      setEdit(true);
      setAlertTime(alert);
    } else {
      resetTime();
    }
  }, []);

  const updateTime = (type: "hour" | "minute", value: number) => {
    const max = type === "hour" ? 24 : 60;
    setAlertTime((prev) => ({
      ...prev,
      [type]: calculateNewValue(Number(prev[type]), value, max),
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
      {
        arr.map((item, index) => (
          <DisplayElement
            key={index}
            item={item as "hour" | "minute"}
            alertTime={alertTime}
            updateTime={updateTime}
            edit={edit} />
        ))
      }
      <div className={styles.menu}>
        {
          edit ? (
            <button onClick={removeTime}>
              <FaTrash />
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

const DisplayElement: FC<{ item: "hour" | "minute", edit: boolean, alertTime: AlertTime, updateTime: (type: "hour" | "minute", value: number) => void }> = ({ item, edit, alertTime, updateTime }) => {
  return (
    <div className={`${styles[item]} ${edit && styles.disabled}`}>
      <button
        disabled={edit}
        onClick={() => updateTime(item as "hour" | "minute", -1)}>
        <FaCircleMinus />
      </button>
      <span >{padedNumber(alertTime[item as "hour" | "minute"])}</span>
      <button
        disabled={edit}
        onClick={() => updateTime(item as "hour" | "minute", 1)}>
        <FaCirclePlus />
      </button>
    </div>
  )
}


const Music: FC = () => {
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