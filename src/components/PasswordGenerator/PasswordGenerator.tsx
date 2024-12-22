import React from "react"

const PasswordGenerator = () => {
    const [pass, setPass] = React.useState<string>("sZBseL18");
    const [length, setLength] = React.useState<number>(12);
    const [settings, setSettings] = React.useState<{
        lowercase: boolean,
        uppercase: boolean,
        numbers: boolean,
        symbols: boolean
    }>({
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false,
    });

    const lengthHandler = (value: number) => {
        setLength(value);
    };

    const settingsHandler = (key: string) => {
        setSettings((prev) => {
            return {
                ...prev,
                [key]: !prev[key as keyof typeof prev],
            };
        })
    };

    return (
        <div
            className="w-[340px] h-[566px] flex flex-col justify-start items-center rounded-[15px]
      px-[15px] py-[27px] bg-[#02010f] shadow-sm shadow-black"
        >
            <h4 className="w-full text-[20px] font-bold text-white">Generate password</h4>

            <PassWiever pass={pass} />

            <Length num={length} setNum={lengthHandler} />

            <Settings settings={settings} setSettings={settingsHandler} />

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


const PassWiever = ({ pass }: { pass: string }) => {
    return (
        <div className="w-full h-[68px]  mt-[10px] flex flex-col">
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
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer range-sm"
                />
                <span>{max}</span>
            </div>
        </div>
    );
};

const Settings = ({ settings, setSettings }: { settings: { lowercase: boolean, uppercase: boolean, numbers: boolean, symbols: boolean }, setSettings: (key: string) => void }) => {
    const values = Object.keys(settings);
    return (
        <div className="w-full h-auto flex flex-col mt-[22px]">
            <h4
                className="text-[10px] font-normal text-white uppercase leading-3
                      flex items-center">
                Settings
            </h4>
            {
                values.map((item) => (
                    <div key = {item}
                        className="text-[14px] font-bold text-white rounded-[5px] bg-[#110b1f] w-full h-[48px] flex justify-between items-center mt-2 px-[12px] gap-4">
                        <span>
                            Includes {item}
                        </span>
                        <Checkbox handler={() => setSettings(item)} checked={settings[item as keyof typeof settings]}/>
                    </div>
                ))
            }
        </div>
    );
};


const Checkbox = ({ handler, checked }: { handler: () => void, checked: boolean }) => {
    return (
        <label className={`w-[25px] h-[15px] ${checked ? "bg-[#db62db]" : "bg-[red]"}`}>
            <input type="checkbox" className="hidden" onChange={handler} />
        </label>
    )
}