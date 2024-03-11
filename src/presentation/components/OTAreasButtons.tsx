import React, { useMemo, useRef, useState } from 'react';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { Button } from "@material-tailwind/react";
import { updateActualArea, updateNextArea } from '../../redux/slices/OTAreasSlice';
import { clearData, fetchOT } from '../../redux/slices/OTSlice';
import { signal } from '@preact/signals-react';


interface IOTAreaButtons {
  setSelectedRows:any;
  params: any;
}

export const areaActualOT = signal('')



const OTAreasButtons:React.FC<IOTAreaButtons> = ({setSelectedRows, params}) => {
  const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  const dispatch = useAppDispatch()
  const [_areaActual, setAreaActual] = useState()
  const areaActualRef = useRef<string | null>(null);


// console.log(OTAreas && OTAreas.areas)

const [botonPresionado, setBotonPresionado] = useState(null);

 

const handleEstado =(area:any) => {
    dispatch(clearData())
    setAreaActual(area[1]) 
    dispatch(updateActualArea(area && area[1]))
    areaActualOT.value = area && area[1]
    // dispatch(updateActualArea(area && area[1]))
    dispatch(updateNextArea(area && area[4]))
    setBotonPresionado(area && area[1]);
    setSelectedRows([]) 
   areaActualRef.current = area[1]

   if(params){
    // console.log(params)
    dispatch(fetchOT({OTAreas:area[1], searchParams:params}))
   }else{
     dispatch(fetchOT({OTAreas:area[1]}))
   }
}

const renderButtons = useMemo(() => {
  return (
    OTAreas &&
    OTAreas.areas &&
    OTAreas.areas.map((area: any, index: number) => (
      <div className="w-full" key={index}>
        <div className="w-[8rem] items-center">  
            {/* <Button className='w-full text-xs h-16 text-center btnAreas' onClick={()=>handleEstado(area)}  key={area[1]}>{area[2]}</Button> */}
              <Button
                className={`w-full text-xs h-16 text-center btnAreas ${
                  botonPresionado === area[1] ? 'bg-tuColorPresionado btnPresionado' : 'bg-tuColorNormal'
                }`}
                // className={`w-full text-xs h-16 text-center`}
                onClick={() => handleEstado(area)}
                key={area[1]}
              >
                {area[2]}
              </Button>
          </div>
      </div>
    ))
  );
}, [OTAreas, params]);



  return (
    <div className='w-full flex items-center'>
        {renderButtons}
    </div>
  )
}

export default OTAreasButtons