import { FC, memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.css"
import { FaClock, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { audioSrc, calculateNewValue, getLocalStorageTime, getLocalTime, padedNumber, removeLocalStorageTime, setLocalStorageTime, } from "./helper";
import { FaMusic, FaPause, FaTrash } from "react-icons/fa";


const Timer: FC = () => {
  const [alert, setAlert] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <ViewTimer setAlert={setAlert} />
      <Display setAlert={setAlert}/>
      <Music isPlay={alert} />
    </div>
  )
};

export default Timer

const ViewTimer : FC<{ setAlert: (value: boolean) => void}>  = memo(({setAlert}) => {
  const [time, setTime] = useState<Time>(getLocalTime());
  const arr = ["hour", "minute", "second"];


  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTime());
      const storageTime = getLocalStorageTime();
      if (storageTime) {
        if (time.minute === storageTime?.minute && time.hour === storageTime?.hour) {
          setAlert(true); 
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [setAlert, time.hour, time.minute]);

  return (
    <div className={styles.viewTimer}>
      {arr.map((item, index) => (
        <ViewtimerElement key={index} number={padedNumber(Object.values(time)[index])} name={item} />
      ))}
    </div>
  )
});

const ViewtimerElement: FC<{ number: string; name: string }> = memo(({ number, name }) => {
  return (
    <div className={styles.timeElement}>
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{name}</span>
    </div>
  )
});

const Display: FC<{ setAlert: (value: boolean) => void}> = memo(({setAlert}) => {
  const [alertTime, setAlertTime] = useState<AlertTime | null>(null);
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
    if (!alertTime) return;
    const max = type === "hour" ? 24 : 60;
    setAlertTime((prev) => {
      if (!prev) return null; 
      return {
        ...prev,
        [type]: calculateNewValue(Number(prev[type]), value, max),
      };
    });
  };

  const setTime = () => {
    if (!alertTime) return;
    setLocalStorageTime(alertTime.hour, alertTime.minute);
    setEdit(true);
  };

  const removeTime = () => {
    removeLocalStorageTime();
    resetTime();
    disableAlert();
  };

  const disableAlert = () => {
      setAlert(false);
  };

  const resetTime = () => {
    setEdit(false);
    setAlertTime({ hour: 0, minute: 0 });
  };

  return (
    <div className={styles.alert}>
      {arr.map((item, index) => (
        <DisplayElement
          key={index}
          item={item as "hour" | "minute"}
          alertTime={alertTime}
          updateTime={updateTime}
          edit={edit}
        />
      ))}
      <div className={styles.menu}>
        {edit ? (
          <button onClick={removeTime}>
            <FaTrash />
          </button>
        ) : (
          <button onClick={setTime}>
            <FaClock />
          </button>
        )}
      </div>
    </div>
  );
});

const DisplayElement: FC<{ item: "hour" | "minute", edit: boolean, alertTime: AlertTime | null, updateTime: (type: "hour" | "minute", value: number) => void }> = memo(({ item, edit, alertTime, updateTime }) => {
  if(!alertTime) return null
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
});


const Music: React.FC<{ isPlay?: boolean}> = memo(({ isPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlay]);

  return (
    <div className={styles.music}>
      <audio ref={audioRef} src={audioSrc} />
      <button onClick={() => (audioRef.current ? audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause() : null)}>
        { isPlay ? <FaPause /> : <FaMusic />}
      </button>
    </div>
  );
});


interface Time {
  hour: number;
  minute: number;
  second: number;
};

interface AlertTime {
  hour: number;
  minute: number;
};