import React from 'react'

const Title: React.FC<TitleProps> = ({name, Tag}) => {
  return (
    <Tag className={`text-2xl font-bold drop-shadow text-white text-left`}>{name}</Tag>
  )
}

export default Title

type TitleProps = {
  Tag: keyof JSX.IntrinsicElements; 
  name: string
}