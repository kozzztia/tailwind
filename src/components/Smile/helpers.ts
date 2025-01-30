import { FaPoo, FaCandyCane } from "react-icons/fa";

export const getPosition = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
};


export const products = [
    {
        id: 1,
        name: "1",
        type: "poo",
        element : FaPoo,
    },
    {
        id: 2,
        name: "2",
        type: "food",
        element: FaCandyCane,
    },
    {
        id: 3,
        name: "3",
        type : "poo",
        element: FaPoo,
    },
    {
        id: 4,
        name: "4",
        type: "food",
        element: FaCandyCane,
    }

]