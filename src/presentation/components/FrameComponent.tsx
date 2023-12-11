import React,{ReactNode} from 'react'

interface FrameComponentProps{
    children:ReactNode;
    label?:string
}

const FrameComponent:React.FC<FrameComponentProps> = ({
    children,
    label
}) => {
  return (
    <div className= 'inline-block w-full h-[11vh] border-[0.5px] mx-4 radioComponent rounded-lg '>
      <div className="relative w-full">
        {label && (
          <label className='absolute top-[-1.7rem] left-[1rem] text-[orange] bg w-[30%] text-left'>{label}</label>
        )}
        {children}
      </div>
    </div>
  )
}

export default FrameComponent