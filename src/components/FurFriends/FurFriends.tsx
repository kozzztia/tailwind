import { useState } from "react"
import { FaDog } from "react-icons/fa6"

const FurFriends = () => {
  const [page, setPage] = useState<string>("home")
  const [searchParam, setSearchParam] = useState<string>("")
  const getHome = () => {
    setPage("home")
  }
  return (
    <div
      className='w-[235px] h-[480px] bg-[#fff] rounded-[10px] shadow-[0_0_40px_0] shadow-black overflow-clip 
      px-[10px] pt-[15px] text-black
      flex justify-start items-start
      '>
      {page === "home" ? <DogList />
        : <DogPage name={"Bailey"} handler={getHome}/>
    }
      

    </div>
  )
}

export default FurFriends

const DogList = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start bg-[red]">
      <h1 className="text-[14px] font-bold flex items-center gap-x-[5px]">
        <span className="w-[20px] h-[20px] bg-black rounded-full flex justify-center items-center">
          <FaDog className="w-[15px] h-[15px] text-white"/>
        </span> 
        FurEver Friends
      </h1>
    </div>
  )
}






const DogPage: React.FC<{name: string, handler: () => void}> = ({name, handler}) => {
  return (
    <div>
      <p>{name}</p>
      <button onClick={handler}>Back</button>
    </div>
  )
}