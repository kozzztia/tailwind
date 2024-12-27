import { SetStateAction, useEffect, useState } from "react"
import { FaArrowLeft, FaHeart, FaRegHeart, FaSearch } from "react-icons/fa"
import { FaDog, FaLocationDot, FaDollarSign, FaPaw } from "react-icons/fa6"
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

  const buttonHandler = (name: string) => {
    console.log(name)
  }

  const likeToggle = (id: number) => {
    const newDogs = dogs.map((dog) => {
      if (dog.id === id) {
        return { ...dog, liked: !dog.liked }
      }
      return dog
    })
    setDogs(newDogs)
  }
  useEffect(() => {
    setDogs(mockDogs)
  }, [])
  useEffect(() => {
    const newDogs = mockDogs.filter((dog) => dog.name.toLowerCase().includes(searchParam.toLowerCase()))
    setDogs(newDogs)
  }, [searchParam])

  return (
    <div
      className='w-[235px] h-[480px] bg-[#fff] rounded-[10px] shadow-[0_0_40px_0] shadow-black overflow-auto scrollbar-hide
      px-[10px] py-[18px] text-black
      flex justify-start items-start
      '>
      {page === "home" ? <DogList
        setSearchParam={getSearchParam}
        searchParam={searchParam}
        setPage={setPage}
        likeToggle={likeToggle}
        dogs={dogs}
      />
        : <DogPage
          dog={dogs.find((dog) => dog.name === page)!}
          likeToggle={likeToggle}
          homeHandler={getHome}
          buttonHandler={buttonHandler}
        />
      }
    </div>
  )
}

export default FurFriends

const DogList = ({ setSearchParam, searchParam, dogs, setPage, likeToggle }: { setSearchParam: (param: string) => void, searchParam: string, dogs: DogType[], setPage: (page: string) => void, likeToggle: (id: number) => void }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start text-black scrollbar-hide overflow-auto">
      <h1 className="text-[14px] font-bold flex items-center gap-x-[5px]">
        <span className="w-[20px] h-[20px] bg-black rounded-full flex justify-center items-center">
          <FaDog className="w-[15px] h-[15px] text-white" />
        </span>
        FurEver Friends
      </h1>

      <form className="w-full flex flex-row justify-start items-center mt-[15px] px-[10px]
        bg-[#d9d9d9] rounded-[5px] font-thin
      ">
        <FaSearch className="text-inherit w-[10px] h-[10px]" />
        <input
          type="text"
          placeholder="Search for a friend"
          value={searchParam}
          className="w-full h-[25px]  bg-inherit
              text-black placeholder-black text-[10px]  tracking-wider p-[5px] ml-[5px]
              outline-none border-none
            "
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </form>

      <List dogs={dogs} setPage={setPage} likeToggle={likeToggle} />

    </div>
  )
}


const List = ({ dogs, setPage, likeToggle }: { dogs: DogType[], setPage: (page: string) => void, likeToggle: (id: number) => void }) => {
  if(dogs.length === 0) return <p className="w-full h-full flex justify-center items-center text-[10px] font-thin">No results found</p>
  return (
    <ul className="w-full h-full flex flex-col justify-start items-start mt-[20px] gap-[16px] overflow-auto scrollbar-">
      {
        dogs.map((dog) => (
          <li key={dog.id} className="w-full flex justify-start items-center px-[5px] capitalize relative gap-[10px]">
            <img
              src={dog.img}
              alt={dog.name}
              className="min-w-[77px] h-[77px] rounded-[10px] object-cover"
            />
            <div className="h-full w-full">
              <p className="text-[10px] font-bold">
                {dog.name}
                <span className="text-[10px] font-thin ml-[5px]">{dog.gender === "Female" ? "♀️" : "♂️"}</span>
              </p>
              <span className="w-full flex justify-between items-center mt-[5px]">
                <p className="text-[10px] font-thin">{dog.owner}</p>
                <button
                  className="w-[10px] h-[10px] rounded-full flex justify-center items-center"
                  onClick={() => likeToggle(dog.id)}>
                  {dog.liked ? <FaHeart
                    className="text-pink-500 " />
                    :
                    <FaRegHeart />}
                </button>
              </span>
              <span className="w-full flex justify-start items-center mt-[5px]">
                <FaLocationDot className="w-[10px] h-[10px] fill-[red] mr-[5px] " />
                <p className="text-[10px] font-thin">{dog.location}</p>
              </span>


              <button
                className="text-[10px] font-bold"
                onClick={() => setPage(dog.name)}>
                to {dog.name} page
              </button>
            </div>
          </li>
        ))
      }
    </ul>
  )
}


const DogPage: React.FC<{ dog: DogType, homeHandler: () => void, likeToggle: (id: number) => void, buttonHandler: (name: string) => void }> = ({ dog, homeHandler, likeToggle, buttonHandler }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start text-black">
      <figure className="w-full h-1/2 flex justify-center items-center mb-[15px] relative">
        <button onClick={homeHandler} className="absolute top-[5px] left-[5px]">
          <FaArrowLeft className="w-[15px] h-[15px] text-black" />
        </button>
        <button
          className="absolute top-[5px] right-[5px]"
          onClick={() => likeToggle(dog.id)}>
          {dog.liked ? <FaHeart
            className="text-pink-500 " />
            :
            <FaRegHeart />}
        </button>
        <img
          src={dog.img}
          alt={dog.name}
          className="w-full h-full object-cover" />
      </figure>
      <p className="text-[16px] font-bold mt-[10px]">
        {dog.name}
        <span className="text-[10px] font-thin ml-[5px]">
          {dog.gender === "Female" ? "♀️" : "♂️"}
        </span>
      </p>
      <span className="w-full text-[12px] font-thin mt-[5px] flex justify-between items-center">
        <p>{dog.breed}</p>
        <p className="flex justify-center items-center">
          <FaLocationDot className="w-[10px] h-[10px] fill-[red] mr-[5px] " />{dog.location}
        </p>
      </span>
      <div className="w-full flex flex-row justify-between items-start mt-[5px] gap-[5px]
        text-[9px]
      ">
        <div className="flex flex-col justify-start items-start p-[5px] bg-[#d9d9d9] rounded-[5px] shadow">
          <span className="font-bold">Age</span>
          <span>{dog.age}</span>
        </div>
        <div className="flex flex-col justify-start items-start p-[5px] bg-[#d9d9d9] rounded-[5px] shadow">
          <span className="font-bold">Height</span>
          <span>{dog.height}</span>
        </div>
        <div className="flex flex-col justify-start items-start p-[5px] bg-[#d9d9d9] rounded-[5px] shadow">
          <span className="font-bold">Weight</span>
          <span>{dog.weight}</span>
        </div>
      </div>
      <p className="text-[10px] font-thin mt-[12px]">{dog.description}</p>

      <menu className="w-full flex flex-row justify-between items-center gap-[5px] mt-auto">
        <button
          className="text-[10px] font-bold flex justify-center items-center p-[10px] bg-[#d9d9d9] rounded-[5px] shadow  hover:bg-pink-500 hover:text-white transition-colors duration-300 w-1/2"
          onClick={() => buttonHandler("donate")}>
          Donate <FaDollarSign className="w-[10px] h-[10px] ml-[5px]" />
        </button>
        <button
          className="text-[10px] font-bold flex justify-center items-center p-[10px] bg-[#d9d9d9] rounded-[5px] shadow  hover:bg-pink-500 hover:text-white transition-colors duration-300 w-1/2"
          onClick={() => buttonHandler("adopt")}>
          Adopt <FaPaw className="w-[10px] h-[10px] ml-[5px]" />
        </button>
      </menu>

    </div>
  )
}