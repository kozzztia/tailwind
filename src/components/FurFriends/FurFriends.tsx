import { SetStateAction, useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { FaDog } from "react-icons/fa6"
import { mockDogs, DogType } from "./const"

const FurFriends = () => {
  const [page, setPage] = useState<string>("home")
  const [searchParam, setSearchParam] = useState<string>("")
  const [dogs, setDogs] = useState<DogType[] | []>([])
  const getHome = () => {
    setPage("home")
  }
  const getSearchParam = (param: SetStateAction<string>) => {
    setSearchParam(param)
  }
  useEffect(() => {
    setDogs(mockDogs)
  }, [])

  return (
    <div
      className='w-[235px] h-[480px] bg-[#fff] rounded-[10px] shadow-[0_0_40px_0] shadow-black overflow-auto 
      px-[10px] py-[18px] text-black
      flex justify-start items-start
      '>
      {page === "home" ? <DogList
        setSearchParam={getSearchParam}
        searchParam={searchParam}
        setPage={setPage}
        dogs={dogs}
      />
        : <DogPage dog={dogs.find((dog) => dog.name === page)!} handler={getHome} />
      }


    </div>
  )
}

export default FurFriends

const DogList = ({ setSearchParam, searchParam, dogs, setPage}: { setSearchParam: (param: string) => void, searchParam: string, dogs: DogType[], setPage: (page: string) => void }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start text-black">
      <h1 className="text-[14px] font-bold flex items-center gap-x-[5px]">
        <span className="w-[20px] h-[20px] bg-black rounded-full flex justify-center items-center">
          <FaDog className="w-[15px] h-[15px] text-white" />
        </span>
        FurEver Friends
      </h1>

      <form className="w-full flex flex-row justify-start items-center mt-[15px] px-[2px]
        bg-[#d9d9d9] rounded-[5px] font-thin
      ">
        <button
          type="submit"
          className="w-[25px] h-full rounded-full flex justify-center items-center">
          <FaSearch className="text-inherit w-[10px] h-[10px]" />
        </button>
        <input
          type="text"
          placeholder="Search for a friend"
          value={searchParam}
          className="w-full h-[25px]  bg-inherit
              text-black placeholder-black text-[10px]  tracking-wider p-[5px]
              outline-none border-none
            "
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </form>

      <List dogs={dogs} setPage={setPage} />

    </div>
  )
}


const List = ({ dogs, setPage}: { dogs: DogType[] , setPage: (page: string) => void}) => {
  return (
    <ul className="w-full h-full flex flex-col justify-start items-start mt-[20px] gap-[16px]">
      {
        dogs.map((dog) => (
          <li key={dog.id} className="w-full flex justify-start items-center px-[5px] capitalize relative">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-[77px] h-[77px] rounded-[10px] object-cover"
            />
            <div >
              <p className="text-[10px] font-bold">{dog.name}</p>
              <button onClick={() => setPage(dog.name)}>
                {dog.name}
              </button>
            </div>
          </li>
        ))
      }
    </ul>
  )
}


const DogPage: React.FC<{ dog: DogType, handler: () => void }> = ({ dog, handler }) => {
  return (
    <div>
      <p>{dog.name}</p>
      <button onClick={handler}>Back</button>
    </div>
  )
}