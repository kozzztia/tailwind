import Title from "../Title/Title";

const Card = ({ children, name, className }: React.PropsWithChildren<CardProps>) => {

  return (
    <>
      <Title name={name} Tag="h2"/>
      <div className={`rounded-lg shadow shadow-black p-4 border border-gray-500 w-full min-h-[40rem] ${className}`}>
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