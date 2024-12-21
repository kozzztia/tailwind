import React from "react";
import { buttons, links } from "./const";
import Wave from "./decore/wave.svg";


const ProfileCard = () => {
  return (
    <div className="w-[390px] h-[580px] flex flex-col bg-white  rounded-[50px] overflow-hidden drop-shadow">
      <div className="bg-inherit w-full h-[220px] flex justify-center items-start pt-10 relative">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="name"
          className="w-[120px] h-[120px] rounded-full  object-cover drop-shadow relative z-10"
        />
        <img
          src={Wave}
          alt="name"
          className="w-full h-full absolute top-0 left-0 z-0 scale-150"
        />

      </div>
      <article className="w-full flex flex-col justify-start items-center pt-5 px-9 pb-10 flex-grow">
        <h4 className="w-full text-[29px] font-normal text-black text-center tracking-wider leading-2">
          Johnny Rogers
        </h4>
        <a
          href="https://t.me/your_channel_name"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-[11px] font-normal text-gray-600 text-center leading-1"
        >
          @JohnnyRogers
        </a>
        <ul className="w-full flex justify-center items-center gap-6 mt-7">
          {links.map((item) => (
            <li
              key={item.id}
              className="w-[25px] h-[25px] flex justify-center items-center rounded-full bg-inherit"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                {React.createElement(item.icon, {
                  className: "w-5 h-5 text-black transition duration-300 bg-inherit hover:text-[#d147a3] focus:text-[#d147a3] hover:scale-150 focus:scale-150"
                })}
              </a>
            </li>
          ))}
        </ul>
        <p className="w-full text-[13px] font-normal text-gray-600 text-center leading-1 mt-8 tracking-wider">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
          reiciendis iste blanditiis voluptate cumque consectetur vitae
          quibusdam.
        </p>
        <nav className="w-full flex justify-between items-center gap-4 mt-auto">
          {
            buttons.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-[#b3b3cc] text-[14px] font-semibold py-[9px] px-4 rounded-full 
              bg-inherit border border-[#b3b3cc] transition duration-300
              hover:bg-[#d147a3] hover:text-white hover:border-[#d147a3] focus:bg-[#d147a3] focus:text-white focus:border-[#d147a3]
              ">
                {item.name}
              </button>
            ))
          }

        </nav>
      </article>
    </div>
  );
};

export default ProfileCard;