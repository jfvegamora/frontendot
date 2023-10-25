import React from 'react'
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { Button } from "@material-tailwind/react";
import { updateActualArea, updateNextArea } from '../../redux/slices/OTAreasSlice';

const OTAreasButtons:React.FC = () => {
  const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  const dispatch = useAppDispatch()

console.log(OTAreas && OTAreas.areas)

const handleEstado = (area:any) => {
    console.log(area)
    dispatch(updateActualArea(area && area[1]))
    dispatch(updateNextArea(area && area[4]))
}


// console.log('otareas',OTAreas)

const renderButtons = () => (
  OTAreas && OTAreas.areas &&  OTAreas.areas.map((area:any, index:number)=>(
        // console.log(area)
        <div className="w-full " key={index}>
          <div className="w-[8rem] items-center">  
            <Button color='orange' className='w-full text-black text-xs h-16 text-center' onClick={()=>handleEstado(area)}  key={area[1]}>{area[2]}</Button>
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