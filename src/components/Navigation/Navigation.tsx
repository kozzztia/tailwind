import React from "react"
import { navigation, NavType } from "./consts"

const Navigation = () => {
  const links = splitArray(navigation, 5)
  const [isOpenId, setIsOpenId] = React.useState<number>(0)
  const handler = (id: number) => {
    console.log(id)
    setIsOpenId(id)
  }
  return (
    <div className="w-[280px] min-h-[570px] flex flex-col justify-start items-center rounded-[30px] overflow-hidden shadow-[0_0_40px_0] shadow-gray-400 bg-white px-3 py-7">
      <div className="w-full h-full flex justify-start items-center gap-x-3 pb-[20px]">
        <img
          className="w-12 h-12 rounded-[15px] object-cover"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Johnny Rogers" />
        <span className="h-full flex flex-col justify-center items-center text-black">
          <h2 className="w-full text-[13px] font-bold">Johnny Rogers</h2>
          <h4 className="w-full text-[12px] font-normal ">Environmantal meteorologist</h4>
        </span>
      </div>
      {
        links.map((item) => (
          <List key={item.id} >
            {
              item.links.map((item) => (
                <Li key={item.id} item={item} isOpen={isOpenId === item.id} setIsOpen={handler}/>
              ))
            }
          </List>
        ))
      }
    </div >
  )
}

export default Navigation



const List = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="w-full h-full flex flex-col justify-start items-center gap-y-[10px] py-[20px]
    border-t-[1px] border-gray-400">
      {children}
    </ul>
  )
}

const Li = ({ item , isOpen, setIsOpen }: { item: NavType, isOpen: boolean, setIsOpen: (id: number) => void }) => {
  return (
    <li 
    key={item.id} 
    className={`w-full h-[30px] flex justify-start items-center px-[5px] capitalize relative 
      transition duration-300 rounded-sm hover:bg-[#ccffe6] ${isOpen ? "bg-[#ccffe6]" : "bg-inherit"}`}>
      <button 
      onClick={() => setIsOpen(item.id)}
      className={`w-full text-[12px] text-black font-bold
      flex justify-between items-center
      after:content-[''] after:w-[6px] after:h-[6px] after:block after:bg-inherit 
      after:border-b-[2px] after:border-r-[2px] after:border-black after:m-[3px] after:transition-transform
      after:duration-300 relative
      after:ml-auto ${isOpen ? "after:rotate-45" : "after:-rotate-45"}`}>
        {React.createElement(item.icon, {
          className: "w-6 h-6 text-black p-[5px] transition duration-300 bg-[#ccffe6] rounded-sm mr-3 "
        })}
        {item.name}
      </button>
    </li>
  )
}

const splitArray = (array: NavType[], chunkSize: number) => {
  return array.reduce((result, _, index) => {
    if (index % chunkSize === 0) {
      result.push({
        id: result.length + 1,
        links: array.slice(index, index + chunkSize),
      });
    }
    return result;
  }, [] as { id: number; links: NavType[] }[]);
};