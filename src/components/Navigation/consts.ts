import { FaUser, FaEnvelope, FaBell, FaLocationArrow, FaUsers, FaQuestionCircle, FaCog } from "react-icons/fa";

export type NavType = {
    id: number,
    name: string,
    icon: typeof FaUser | typeof FaUser | typeof FaEnvelope | typeof FaBell | typeof FaLocationArrow 
    | typeof FaUsers | typeof FaQuestionCircle | typeof FaCog
    links: []
}

export const navigation: NavType[] = [
    {
        id: 1,
        name: "Personal data",
        icon: FaUser,
        links: []
    },
    {
        id: 2,
        name: "Messages",
        icon: FaEnvelope,
        links: []
    },
    {
        id: 3,
        name: "Notifications",
        icon: FaBell,
        links: []
    },
    {
        id: 4,
        name: "Location",
        icon: FaLocationArrow,
        links: []
    },
    {
        id: 5,
        name: "Community",
        icon: FaUsers,
        links: []
    },
    {
        id: 6,
        name: "FAQs",
        icon: FaQuestionCircle,
        links: []
    },
    {
        id: 7,
        name: "Settings",
        icon: FaCog,
        links: []
    },
]