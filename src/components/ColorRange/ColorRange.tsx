import { useCallback, useState } from 'react';
import styles from './style.module.css';

const ColorRange = () => {
  const [value, setValue] = useState<number>(() => {
    const rateColor = getComputedStyle(document.documentElement).getPropertyValue("--rate-color").trim();
    return parseFloat(rateColor) || 1;
  });
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
    e.currentTarget.setPointerCapture(e.pointerId); // Захват указателя
    updateValue(e.clientX, rect);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      updateValue(e.clientX, rect);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
  return (
    <div className={styles.rangeContainer}>
      <div className={styles.wiev}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>sign up</h2>
          <p>Join us now! Sign up to kick0start your journey.</p>
          <label>
            <span>Name</span>
            <input type="text" placeholder="Name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" placeholder="Email" />
          </label>
          
          <label>
            <span>Password</span>
            <input type="password" placeholder="Password" />
          </label>

          <button type="submit">Sing up</button>
        </form>
      </div>
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

export default ColorRange;
