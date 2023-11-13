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
          <label className='absolute top-[-30%] left-[3%] labelForm w-[30%] text-center'>{label}</label>
        )}
        {children}
      </div>
    </div>
  )
}

export default FrameComponent