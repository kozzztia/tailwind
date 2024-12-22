import React from "react"

const PasswordGenerator = () => {
    const [pass, setPass] = React.useState<string>("sZBseL18");
    const [length, setLength] = React.useState<number>(12);
  
    const lengthHandler = (value: number) => {
      setLength(value);
    };
  
    return (
      <div
        className="w-[340px] h-[566px] flex flex-col justify-start items-center rounded-[15px]
      px-[15px] py-[27px] bg-[#02010f] shadow-sm shadow-black"
      >
        <h4 className="w-full text-[20px] font-bold text-white">Generate password</h4>
  
        <PassWievwer pass={pass} />

        <Length num={length} setNum={lengthHandler} />
  
        <button
          onClick={() => setPass("password")}
          className="w-full h-[40px] rounded-[5px] bg-[#db62db] flex justify-center items-center drop-shadow
                  text-[12px] font-bold text-white mt-auto shadow-sm shadow-black tracking-wider"
        >
          Generate password
        </button>
      </div>
    );
  };
  
  export default PasswordGenerator;


const PassWievwer = ({ pass }: { pass: string }) => {
    return (
        <div className="w-full h-[68px]  mt-[35px] flex flex-col">
            <h4
                className="text-[10px] font-normal text-white uppercase leading-3 drop-shadow">
                Generated Password
            </h4>
            <div
                className="text-[18px] font-bold text-white rounded-[5px] bg-[#110b1f] w-full h-full flex justify-start items-center mt-2 px-[15px] tracking-[-.7px]">
                {pass}
            </div>
        </div>
    )
}

const Length = ({ num, setNum }: { num: number; setNum: (value: number) => void }) => {
    const [min, max] = [12, 32];
    return (
      <div className="w-full h-[68px] flex flex-col mt-[22px]">
        <h4
          className="text-[10px] font-normal text-white uppercase leading-3
                      flex items-center"
        >
          Character length:
          <span className="ml-auto text-[17px] font-bold text-[#db62db]">{num}</span>
        </h4>
        <div
          className="text-[14px] font-bold text-white rounded-[5px] bg-[#110b1f] w-full h-full flex justify-between items-center mt-2 px-[12px] gap-4"
        >
          <span>{min}</span>
          <input
            type="range"
            value={num}
            min={min}
            max={max}
            onChange={(e) => setNum(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
          />
          <span>{max}</span>
        </div>
      </div>
    );
  };