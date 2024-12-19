import Title from "../ui-kit/Title/Title"

const Header = () => {
  return (
    <header className="rounded-lg shadow shadow-black p-4 border border-gray-500 w-full min-h-[5rem] flex justify-center items-center bg-primaryBg">
      <Title name="Tailwind React TypeScript" Tag="h1"/>
    </header>
  )
}

export default Header