import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.css"
import { FaClock, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { FaPause, FaPlay, FaTimes } from "react-icons/fa";


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
      <Music />
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
  const [edit, setEdit] = useState<boolean>(false);

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

  const sendToLocalStorage = (value: string) => {
    localStorage.setItem('timer', value)
    setEdit(true);
  }
  const removeFromLocalStorage = () => {
    localStorage.removeItem('timer')
    setHour(0);
    setMinute(0);
    setEdit(false);
  }

  useLayoutEffect(() => {
    const time = localStorage.getItem('timer') || null;
    if (time) {
      const [hours, minutes] = time.split(':');
      setHour(parseInt(hours));
      setMinute(parseInt(minutes));
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [])

  return (
    <div className={styles.alert}>
      <div className={styles.hour}>
        <button onClick={() => hourOnclick(1)}>
          <FaCirclePlus />
        </button>
        <span>{hour.toString().padStart(2, "0")}</span>
        <button onClick={() => hourOnclick(-1)}>
          <FaCircleMinus />
        </button>
      </div>
      <div className={styles.minute}>
        <button onClick={() => minuteOnclick(1)}>
          <FaCirclePlus />
        </button>
        <span>{minute.toString().padStart(2, "0")}</span>
        <button onClick={() => minuteOnclick(-1)}>
          <FaCircleMinus />
        </button>
      </div>
      <div className={styles.menu}>
        {
          edit ?

            <button onClick={() => removeFromLocalStorage()}>
              <FaTimes />
            </button>
            :
            <button onClick={() => sendToLocalStorage(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)}>
              <FaClock />
            </button>

        }
      </div>
    </div>
  )
}

const Music = () => {
  const [hasTimer, setHasTimer] = useState<boolean>(false);


  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const storageTime = localStorage.getItem('timer');
    if (storageTime) {
      setHasTimer(true);
    } else {
      setHasTimer(false);
    }
  }, [])



  return (
    <div className={styles.music}>
      {
        hasTimer && (
          <>
            <audio
              ref={audioRef}
              src="../../../public/alarm/alarm.mp3"
              onCanPlay={() => setIsLoaded(true)}
              onEnded={() => setIsPlaying(false)}
              onError={() => console.error("Failed to load audio")}
            />
            <button onClick={togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            {!isLoaded && <p>Loading...</p>}
          </>
        )
      }
    </div>
  );
};

interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}