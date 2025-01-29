import { useState } from "react";
import styles from "./styles.module.css";

const Smile = () => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>( { x: 100, y: 100 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition(prev => prev);
    };

    return (
        <div className={styles.smile} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <Person mousePosition={mousePosition} />
            <Cursor x={mousePosition?.x} y={mousePosition?.y} />
        </div>
    );
};

export default Smile;

const Cursor = ({ x, y }: { x?: number; y?: number }) => {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.cursor}
            style={{ left: x, top: y }}
        >
            {/* Круглая муха */}
            <circle cx="100" cy="100" r="50" fill="black" />
        </svg>
    );
};

const Person = ({ mousePosition }: { mousePosition: { x: number; y: number } | null }) => {
    const eyeLeft = { x: 70, y: 80 };
    const eyeRight = { x: 130, y: 80 };
    const pupilRadius = 6;
    const eyeRadius = 12;

    const getPupilPosition = (eye: { x: number; y: number }) => {
        if (!mousePosition) {
            return { x: eye.x, y: eye.y };
        }

        const dx = mousePosition.x - eye.x;
        const dy = mousePosition.y - eye.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) {
            return {
                x: (eyeLeft.x + eyeRight.x) / 2,
                y: (eyeLeft.y + eyeRight.y) / 2
            };
        }

        if (distance <= eyeRadius) {
            return { x: mousePosition.x, y: mousePosition.y };
        } else {
            const angle = Math.atan2(dy, dx);
            return {
                x: eye.x + Math.cos(angle) * eyeRadius,
                y: eye.y + Math.sin(angle) * eyeRadius
            };
        }
    };

    const leftPupil = getPupilPosition(eyeLeft);
    const rightPupil = getPupilPosition(eyeRight);

    return (
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={styles.person}>
            {/* Лицо */}
            <circle className={styles.face} cx="100" cy="100" r="80" />
            {/* Глаза */}
            <circle className={styles.eye} cx={eyeLeft.x} cy={eyeLeft.y} r="20" />
            <circle className={styles.eye} cx={eyeRight.x} cy={eyeRight.y} r="20" />
            {/* Зрачки */}
            <circle className={styles.pupil} cx={leftPupil.x} cy={leftPupil.y} r={pupilRadius} />
            <circle className={styles.pupil} cx={rightPupil.x} cy={rightPupil.y} r={pupilRadius} />
            {/* Рот */}
            <path d="M 90 140 Q 100 160, 110 140 Q 100 120, 90 140" className={styles.mouth} />
        </svg>
    );
};
