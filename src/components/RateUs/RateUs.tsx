import { useCallback, useState } from 'react'
import styles from './style.module.css'

const RateUs = () => {
    return (
        <div className={styles.container}>
            <RangeRate />


        </div>
    )
}

export default RateUs



const RangeRate = () => {
    const [value, setValue] = useState<number>(1); // Значение ползунка
    const min = 0; // Минимальное значение
    const max = 255; // Максимальное значение
    const steps = max - min; // Количество шагов
    const stepSize = 100 / steps; // Размер одного шага в процентах
    const [isDragging, setIsDragging] = useState(false); // Флаг для отслеживания зажатой мыши
  
    const updateValue = useCallback(
      (clientX: number, rect: DOMRect) => {
        const offsetX = clientX - rect.left; 
        const percentage = Math.max(0, Math.min(1, offsetX / rect.width)); 
        const newValue = Math.round(percentage * steps + min);
        document.documentElement.style.setProperty('--rate-color', newValue.toString());
        setValue(newValue);
      },
      [steps, min]
    );
  
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setIsDragging(true);
      updateValue(e.clientX, rect);
    };
  
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging) {
        const rect = e.currentTarget.getBoundingClientRect();
        updateValue(e.clientX, rect);
      }
    };
  
    const handlePointerUp = () => {
      setIsDragging(false);
    };
  
    return (
      <div className={styles.rangeContainer}>
        <div className={styles.wiev}>{value}</div>
        <div
          className={styles.label}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp} 
        >
          <div className={styles.track}>
            <div
              className={styles.filled}
              style={{ width: `${(value - min) * stepSize}%` }}
            ></div>
            <div
              className={styles.cursor}
              style={{ left: `${(value - min) * stepSize}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };