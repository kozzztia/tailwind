import { FaUser, FaEnvelope, FaBell, FaLocationArrow, FaUsers, FaQuestionCircle, FaCog } from "react-icons/fa";

export type LinksType = {
    id: number,
    name: string,
}

export type NavType = {
    id: number,
    name: string
    icon: typeof FaUser | typeof FaUser | typeof FaEnvelope | typeof FaBell | typeof FaLocationArrow 
    | typeof FaUsers | typeof FaQuestionCircle | typeof FaCog
    links: LinksType[]
}

export const navigation: NavType[] = [
    {
        id: 1,
        name: "Personal data",
        icon: FaUser,
        links: [
            {
                id: 11,
                name: "Profile"
            },
            {
                id: 12,
                name: "Settings"
            }
        ]
    },
    {
        id: 2,
        name: "Messages",
        icon: FaEnvelope,
        links: [
            {
                id: 21,
                name: "Inbox"
            },
            {
                id: 22,
                name: "Sent"
            },
            {
                id: 23,
                name: "Drafts"
            }
        ]
    },
    {
        id: 3,
        name: "Notifications",
        icon: FaBell,
        links: [
            {
                id: 31,
                name: "All"
            },
            {
                id: 32,
                name: "Unread"
            }
        ]
    },
    {
        id: 4,
        name: "Location",
        icon: FaLocationArrow,
        links: [
            {
                id: 41,
                name: "Home"
            },
            {
                id: 42,
                name: "Work"
            }
        ]
    },
    {
        id: 5,
        name: "Community",
        icon: FaUsers,
        links: [
            {
                id: 51,
                name: "Members"
            },
            {
                id: 52,
                name: "Groups"
            }
        ]
    },
    {
        id: 6,
        name: "FAQs",
        icon: FaQuestionCircle,
        links: [
            {
                id: 61,
                name: "General"
            },
            {
                id: 62,
                name: "Contact"
            }
        ]
    },
    {
        id: 7,
        name: "Settings",
        icon: FaCog,
        links: [
            {
                id: 71,
                name: "Account"
            },
            {
                id: 72,
                name: "Privacy"
            }
        ]
    },
    
]