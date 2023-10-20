import React from 'react'
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { Button } from "@material-tailwind/react";
import { updateActualArea } from '../../redux/slices/OTAreasSlice';

const OTAreasButtons:React.FC = () => {
const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
const dispatch = useAppDispatch()

const handleEstado = (area:number) => {
    // console.log(area)
    dispatch(updateActualArea(area))
}

// console.log(OTAreas)

const renderButtons = () => (
    OTAreas["areas"]?.map((area:any, index:number)=>(
        // console.log(area)
        <div className="w-full " key={index}>
          <div className="w-[8rem] items-center">
            <Button color='orange' className='w-full text-black text-xs h-16 text-center' onClick={()=>handleEstado(area[1])} key={area[0]}>{area[2]}</Button>
          </div>
        </div>
    ))
)

  return (
    <div className='w-full flex items-center'>
        {renderButtons()}
    </div>
  )
}

export default OTAreasButtons