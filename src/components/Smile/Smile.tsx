import { createElement, memo, useState } from "react";
import styles from "./styles.module.css";
import { getPosition, products } from "./helpers";
import { IconType } from "react-icons";

const Smile = () => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
    const [activeProduct, setActiveProduct] = useState<string | null>(null);


    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        setMousePosition(getPosition(e));
    };

    const handleMouseLeave = () => {
        setMousePosition(prev => prev);
    };

    return (
        <div className={styles.smile}
            onPointerDown={handleMouseMove}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
            <Person mousePosition={mousePosition} activeProduct={activeProduct}/>

            <Products setActiveProduct={setActiveProduct}/>

            <Cursor x={mousePosition?.x} y={mousePosition?.y} />
        </div>
    );
};

export default Smile;

const Person = memo(({ mousePosition, activeProduct }: { mousePosition: { x: number; y: number } | null , activeProduct: string | null}) => {
    const eyeLeft = { x: 70, y: 80 };
    const eyeRight = { x: 130, y: 80 };
    const pupilRadius = 6;
    const eyeRadius = 12;
    const safeRadius = 5; // Мёртвая зона, в которой зрачок остаётся на месте

    const getPupilPosition = (eye: { x: number; y: number }) => {
        if (!mousePosition) {
            return { x: eye.x, y: eye.y };
        }

        const dx = mousePosition.x - eye.x;
        const dy = mousePosition.y - eye.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= safeRadius) {
            return { x: eye.x, y: eye.y };
        }

        const maxDistance = Math.min(distance, eyeRadius);
        const angle = Math.atan2(dy, dx);

        return {
            x: eye.x + Math.cos(angle) * maxDistance,
            y: eye.y + Math.sin(angle) * maxDistance
        };
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
            {
                getMouth(activeProduct) 
            }
        </svg>
    );
});

const getMouth = (activeProduct: string | null) => {
    if (activeProduct === null) {
        return (
            <path d="
            M 130 140 
            Q 120 160, 110 140 
            Q 120 120, 130 140" className={styles.mouth} />
        );
    }
    if(activeProduct === "poo") {
        return (
            <path 
            d="
            M 70 140 
            Q 100 130, 130 140 
            Q 100 120, 70 140" className={styles.mouth} />
        );
    }
    if(activeProduct === "food") {
        return (
            <path d="
            M 70 140 
            Q 100 160, 130 140 
            Q 100 150, 70 140" className={styles.mouth} />
        );
    }
}


const Cursor = memo(({ x, y }: { x?: number; y?: number }) => {
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
});

const Products = memo(({ setActiveProduct }: { setActiveProduct: React.Dispatch<React.SetStateAction<string | null>> }) => {
    return (
        <div className={styles.products}>
            {products.map(product => (
                <Product key={product.id} element={product.element} type={product.type} setActiveProduct={setActiveProduct} />
            ))}
        </div>
    );
});


const Product = memo(({ element, type , setActiveProduct }: { element: IconType, type: string, setActiveProduct: React.Dispatch<React.SetStateAction<string | null>> }) => {

    const handleMouseEnter = () => {
        setActiveProduct(type);

    }

    const handleMouseLeave = () => {
        setActiveProduct(null);
    }

    return (
        <div
            className={styles.product}
            datatype={type}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPointerDown={handleMouseEnter}
            onPointerUp={handleMouseLeave}
        >
            {createElement(element, { className: styles.icon })}
        </div>
    );
});

