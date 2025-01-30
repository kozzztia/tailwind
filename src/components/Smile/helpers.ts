import { FaPoo, FaCandyCane, FaQuestion, FaBug } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";

export const getPosition = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
};


export const products = [
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
    },
    {
        id: 5,
        name: "5",
        type: "question",
        element: FaQuestion,
    },
    {
        id: 6,
        name: "6",
        type: "bug",
        element: FaBug,
    },
    {
        id: 7,
        name: "7",
        type: "cake",
        element: GiCakeSlice,
    }


]