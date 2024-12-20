import Title from "../Title/Title";

const Card: React.FC<CardProps> = ({ children, name, className }) => {

  return (
    <>
      <Title name={name} Tag="h2"/>
      <div className={`rounded-lg shadow shadow-black p-4 border border-gray-500 w-full min-h-[40rem] flex justify-center items-center  ${className}`}>
        {children}
      </div>
    </>
  )
}

export default Card

type CardProps = {
  children: React.ReactNode;
  name: string;
  className?: string

}