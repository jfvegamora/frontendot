import React,{ReactNode} from 'react'

interface FrameComponentProps{
    children:ReactNode;
}

const FrameComponent:React.FC<FrameComponentProps> = ({
    children
}) => {
  return (
    <div className= 'inline-block w-1/2 border-[0.5px] mx-4 radioComponent  rounded-lg '>
        {children}
    </div>
  )
}

export default FrameComponent