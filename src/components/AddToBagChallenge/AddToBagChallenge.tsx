import { useState } from "react";
import { buttons, sizeButtons } from "./consts";





const AddToBagChallenge = () => {
  const [imageNumber, setImageNumber] = useState<number>(1);
  const [size, setSize] = useState<number>(0);
  const menuClick = (id: number) => {
    console.log(id)
    setImageNumber(id)
  }
  const sizeClick = (id: number) => {
    console.log(id)
    setSize(id)
  }

  const submit = () => {
    console.log('submit', size)
    setImageNumber(1)
    setSize(0)

  }
  return (
    <div className="w-[780px] h-[410px] flex flex-row justify-between bg-white overflow-hidden p-[12px] text-black gap-[15px] ">
      <Menu handler={menuClick} imageNumber={imageNumber} />
      <Figure image={imageNumber}/>
      <Article handler={sizeClick} submit={submit} size={size}/>
    </div>
  );
};

const Menu = ({ handler, imageNumber }: { handler: (id: number) => void, imageNumber: number }) => {
  return (
    <menu className="w-[55px] h-full
        flex flex-col gap-[13px]">
      {
        buttons.map((item) => (
          <button
            key={item.id}
            className={`w-full h-[65px] rounded-sm flex justify-center items-center p-1
              overflow-hidden border-[#ffdd99] border-2 transotion-colors duration-300 
              contrast-100 opacity-75 hover:contrast-150 hover:opacity-100
              ${item.id === imageNumber ? "border-[#0080ff6b] contrast-150 opacity-100" : "border-transparent"} `}
            onClick={() => handler(item.id)}
          >
            <img
            className="w-full h-full object-cover"
              src={item.image}
              alt={item.name} />
          </button>
        ))
      }
    </menu>
  )
}
const Figure = ({ image }: { image: number}) => {
  return (
    <figure className="w-[300px] h-full p-[15px]">
      <img
        className="w-full h-full object-cover"
        src={buttons[image-1].image}
        alt="polo" />
    </figure>
  )
}

const Article = ({ handler,submit , size }: { handler: (id: number) => void, size: number, submit: () => void }) => {
  return (
    <article className="w-[355px] h-full p-[15px] flex flex-col justify-start font-sans" >
      <h4 className="text-[#0080ff] text-[10px] ">POLO RALPH</h4>
      <h3 className="text-black text-3xl font-bold tracking-[.5px] mt-2">Custom Fit Polo Bear Oxford Shirt</h3>
      <p className="text-grey-600 text-[12px] font-thin tracking-[.15px] mt-4">
        Blue polo with a classic cut. Made of smooth and soft cotton.
      </p>
      <p className="text-grey-600 text-[29px] font-normal tracking-[.15px] mt-4 flex items-center">
        $99.00 <span className="text-[#0080ff] text-[11px] font-thin bg-[#0080ff6b] rounded-sm h-[20px] w-[40px] flex justify-center items-center ml-[10px]" >-25%</span>
      </p>
      <p className="text-[#868686] text-[11px] font-normal tracking-[.15px] line-through">$132.00</p>
      <div className="mt-4">
        <span className="text-[#868686] text-[11px] font-normal uppercase">Choose size:</span>
        <menu className="mt-1 flex flex-row gap-[2px]">
          {
            sizeButtons.map((item) => (
              <button
                key={item.id}
                onClick={() => handler(item.id)}
                className={`w-9 h-9 bg-white text-black text-[11px] hover:bg-black hover:text-white rounded-sm transition-colors duration-300
                  ${item.id === size ? "bg-black text-white" : "bg-white text-black"}
                `}>
                {item.name}
              </button>
            ))
          }
        </menu>
        <button 
          disabled={size === 0}
          onClick={submit}
          className="w-full h-[35px] bg-[#0080ff6b] text-[13px] text-white rounded-[5px] uppercase mt-[34px] hover:bg-[#0080ff] transition-colors duration-300">
          add to Bag
        </button>
      </div>
    </article>
  );
};

export default AddToBagChallenge