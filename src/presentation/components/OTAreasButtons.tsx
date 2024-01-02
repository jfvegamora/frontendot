import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { Button } from "@material-tailwind/react";
import { updateActualArea, updateNextArea } from '../../redux/slices/OTAreasSlice';
import { clearData, fetchOT } from '../../redux/slices/OTSlice';

const OTAreasButtons:React.FC = () => {
  const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  const dispatch = useAppDispatch()
  const [areaActual, setAreaActual] = useState()
  const areaActualRef = useRef<string | null>(null);


// console.log(OTAreas && OTAreas.areas)

const [botonPresionado, setBotonPresionado] = useState(null);

const handleEstado = (area:any) => {
    dispatch(clearData())
    setAreaActual(area[1])
    dispatch(updateActualArea(area && area[1]))
    dispatch(updateNextArea(area && area[4]))
    setBotonPresionado(area && area[1]); 
}

useEffect(() => {
  if (areaActual && areaActual !== areaActualRef.current) {
    areaActualRef.current = areaActual;
    dispatch(fetchOT({OTAreas:areaActual})); // Llama inicialmente cuando cambia el área
  }

  const interval = setInterval(() => {
    dispatch(fetchOT(areaActualRef.current)); // Llama fetchOT cada minuto con el área actual
  }, 60000);

  return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
}, [areaActual, dispatch]);


// console.log('otareas',OTAreas)
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
}, [OTAreas]);



  return (
    <div className='w-full flex items-center'>
        {renderButtons}
    </div>
  )
}

export default OTAreasButtons