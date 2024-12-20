import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram, FaShoppingBasket } from "react-icons/fa";

export const links = [
    {id:1 , name: "GitHub", url: "https://github.com/", icon:  FaFacebook },
    {id:2 , name: "Twitter", url: "https://twitter.com/", icon: FaTwitter },
    {id:3 , name: "Instagram", url: "https://www.instagram.com/", icon: FaInstagram },
    {id:4 , name: "Linkedin", url: "https://www.linkedin.com/", icon: FaLinkedin },
    {id:5 , name: "Basket", url: "https://www.basket.com/", icon: FaShoppingBasket },
  ];

export const buttons = [
    { id: 1, name: "Follow", action: ()=> console.log("Follow") },
    { id: 2, name: "Message", action: ()=> console.log("Message") },
]
