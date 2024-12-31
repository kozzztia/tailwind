import { useState } from "react";
import { faq } from "./const";
import { FaMinus, FaPlus, FaQuestion } from "react-icons/fa6";

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleHandler = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-[394px] h-[454px] rounded-[8px] bg-[#FFF] overflow-hidden px-5 py-6 flex flex-col justify-start items-start ">
      <h1 className="w-full text-[25px] font-extrabold flex items-center gap-[5px] font-['Poppins'] tracking-[2.5px] mb-7">
        <FaQuestion className="text-[25px] text-[#0080ff]" />
        FAQs
      </h1>
      <ul className="w-full h-full flex flex-col justify-start items-start">
        {faq.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={item.id === openId}
            toggleHandler={toggleHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default FAQ;

const AccordionItem = ({
  item,
  isOpen,
  toggleHandler,
}: {
  item: { id: number; question: string; answer: string };
  isOpen: boolean;
  toggleHandler: (id: number) => void;
}) => {
  return (
    <li
      className={`w-full flex flex-col justify-start mb-[13px] p-[8px] shadow-[0_0_10px_0] shadow-gray-400 rounded-[10px] transition-all duration-300 font-serif font-bold text-[14px]
      ${isOpen ? "bg-[#0080ff] text-white" : "bg-white text-black"}
      `}
    >
      <div
        className="w-full flex flex-row justify-between items-center "
        onClick={() => toggleHandler(item.id)}
      >
        <span>{item.question}</span>
        <button
          className={`w-[18px] h-[18px] rounded-full border-[1px] flex justify-center items-center p-[2px]
          cursor-pointer transition-all
          ${isOpen ? "bg-white text-[#0080ff] border-white" : "bg-[#0080ff] text-white border-[#0080ff]"}
          `}
        >
          {isOpen ? <FaMinus className="text-current" /> : <FaPlus className="text-current" />}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? "max-h-[100px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="mt-2">{item.answer}</p>
      </div>
    </li>
  );
};
