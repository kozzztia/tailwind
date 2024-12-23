import React from "react";
import { filters } from "./consts";
import { FaCopy, FaSyncAlt } from "react-icons/fa";
import { generatePassword } from "./helper";

const PasswordGenerator = () => {
    const [password, setPassword] = React.useState<string>("--empty yeat--");
    const [length, setLength] = React.useState<number>(12);
    const [settings, setSettings] = React.useState<{
        lowercase: boolean;
        uppercase: boolean;
        numbers: boolean;
        symbols: boolean;
    }>({
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const generatorHandler = () => {
        const generatedPassword = generatePassword(length, settings);
        setPassword(generatedPassword);
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        setPassword('--Copied--')
    }

    return (
        <div className="w-[340px] h-[566px] flex flex-col justify-start items-center rounded-[15px] bg-[#02010f] shadow-sm shadow-black p-5">
            <h4 className="w-full text-[20px] font-bold text-white mb-5">Generate Password</h4>
            <PassViewer password={password} generate={generatorHandler} copy={copyPassword} />
            <LengthSlider length={length} setLength={setLength} />
            <SettingsPanel settings={settings} toggleSetting={toggleSetting} />
            <button
                onClick={generatorHandler}
                className="w-full h-[40px] rounded-[5px] bg-[#db62db] text-[12px] font-bold text-white mt-auto shadow-sm shadow-black tracking-wider flex items-center justify-center"
            >
                Generate Password
            </button>
        </div>
    );
};

const PassViewer = ({ password, generate, copy}: { password: string, generate: ()=> void, copy: () => void }) => (
    <div className="w-full h-[68px] flex flex-col mb-5">
        <h4 className="text-[10px] font-normal text-white uppercase mb-2">Generated Password</h4>
        <div className="text-[18px] font-bold text-white bg-[#110b1f] w-full h-full rounded-[5px] flex items-center px-4">
            <span className="truncate">{password}</span>
            < button className="text-[16px] font-bold text-[#db62db] ml-auto p-[5px]"
                onClick={copy}
            >
                <FaCopy />
            </button>
            < button className="text-[16px] font-bold text-[#db62db] ml-[5px] p-[5px]"
            onClick={generate}
            >
                <FaSyncAlt />
            </button>
        </div>
    </div>
);

const LengthSlider = ({ length, setLength }: { length: number; setLength: (value: number) => void }) => (
    <div className="w-full h-[68px] flex flex-col mb-5">
        <h4 className="text-[10px] font-normal text-white uppercase flex justify-between mb-2">
            Character Length: <span className="text-[#db62db] font-bold text-[14px]">{length}</span>
        </h4>
        <div className="flex items-center space-x-4">
            <span className="text-white text-[12px]">12</span>
            <input
                type="range"
                min={12}
                max={32}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-[#db62db] to-[gray] rounded-lg cursor-pointer appearance-none focus:outline-none"
            />
            <span className="text-white text-[12px]">32</span>
        </div>
    </div>
);

const SettingsPanel = ({
    settings,
    toggleSetting,
}: {
    settings: { lowercase: boolean; uppercase: boolean; numbers: boolean; symbols: boolean };
    toggleSetting: (key: keyof typeof settings) => void;
}) => (
    <div className="w-full flex flex-col space-y-3 mb-5">
        <h4 className="text-[10px] font-normal text-white uppercase">Settings</h4>
        {filters.map(({ id, value, text }) => (
            <SettingToggle
                key={id}
                label={`Include ${text}`}
                checked={settings[value as keyof typeof settings]}
                onChange={() => toggleSetting(value as keyof typeof settings)}
            />
        ))}
    </div>
);

const SettingToggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <div className="flex justify-between items-center bg-[#110b1f] h-[48px] px-4 rounded-[5px] text-white font-bold">
        <span className="text-[12px]">{label}</span>
        <label className={`w-[30px] h-[15px] flex items-center rounded-full cursor-pointer drop-shadow ${checked ? "bg-[#db62db]" : "bg-gray-500"}`}>
            <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
            <div
                className={`w-[13px] h-[13px] bg-white rounded-full transform transition-transform  drop-shadow ${checked ? "translate-x-[17px]" : "translate-x-0"
                    }`}
            />
        </label>
    </div>
);

export default PasswordGenerator;
