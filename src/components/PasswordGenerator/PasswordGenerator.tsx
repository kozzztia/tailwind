
const PasswordGenerator = () => {
    return (
        <div className="w-[340px] h-[566px] flex flex-col justify-start items-center rounded-[15px]
    px-[15px] py-[27px] bg-[#1a001a] shadow-sm shadow-black">
            <h4 className="w-full text-[20px] font-bold text-white">Generate password</h4>




            
            <button 
            className="w-full h-[40px] rounded-[5px] bg-[#db62db] flex justify-center items-center
                text-[12px] font-bold text-white mt-auto shadow-sm shadow-black tracking-wider
            ">
                Generate password
            </button>
        </div>
    )
}

export default PasswordGenerator