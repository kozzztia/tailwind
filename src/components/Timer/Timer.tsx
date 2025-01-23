import { useCallback, useLayoutEffect, useState } from "react";
import styles from "./styles.module.css"

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
      <form className={styles.alert}> 
          <input type="text" name="hour" max={24}/>
          <input type="text" name="minute" max={60}/>
          <button type="submit">Submit</button>
      </form>
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



interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}