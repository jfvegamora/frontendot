import React from 'react'
import { AppStore, useAppSelector } from '../../redux/store';



export const estadoIDNombre:any = {
    10: 'Ingresada',
    20: 'En Proceso',
    30: 'Pendiente',
    40: 'Derivada',
    50: 'Entregada',
    60: 'Cerrada',
    70: 'Facturada',
    80: 'Anulada',
    99: 'Por Vencer'
  }
  
  
export interface IStateCountBar {
  checkCount?:any;
  isMotHistorica?:boolean;
}



const StateCountBarOT:React.FC<IStateCountBar> = ({checkCount,isMotHistorica}) => {
    const OTs:any = useAppSelector((store: AppStore) => store.OTS);
    const[stateCheckCount, setStateCheckCount] = React.useState(checkCount.value);

    React.useEffect(()=>{
      setStateCheckCount(checkCount)
    },[checkCount])
    
    // console.log(checkCount.value)
    console.log(isMotHistorica)
  
  return (
    <div className={`${isMotHistorica ? 'w-[80%] left-[10rem]' : 'w-[50%] left-[24rem]'} bg-white absolute bottom-[1%]  rounded-full  flex`}>
      <div className='w-[6rem] flex'>
          <p className=" w-[4rem] text-center rounded-full">
          {'Total'}:
          </p>
          <label className="w-8 text-center">{OTs.data.length}</label>
      </div>
    {Object.keys(OTs.estadosOT).map((estadoID, index) => {
      // console.log(estadoID)
      const estadoNombre = estadoIDNombre[estadoID];
      const derivacionColor = OTs.derivacionColores[estadoNombre];

      if (derivacionColor) {
        const backgroundColor = derivacionColor[1];
        const textColor = derivacionColor[0];

        return (
          <div className="flex" key={index}>
            <div className='w-[10rem] flex'>
              <p style={{ backgroundColor, color: textColor }} className="mx-2 w-[6rem] text-center rounded-full">
                {estadoNombre}:
              </p>
              <label className="w-8 text-center">{OTs.estadosOT[estadoID]}</label>
            </div>
          </div>
        );
      }

      return null; 
    })}
    
    {OTs.estadosOT.hasOwnProperty(99) &&  (OTs.estadosOT[99] > 0 as any) && (
      <div className="w-[8rem]  flex bg-black">
          <p className="text-center mx-auto text-white">Por vencer: </p> <label className="text-center text-white">{OTs.estadosOT[99]}</label>        
      </div>
    )}
    {stateCheckCount >= 1 && (
      <div className="w-[8rem]  flex bg-orange-400 mx-10">
          <p className="text-center mx-auto text-white">Seleccionadas: </p> <label className="text-center text-white">{stateCheckCount}</label>        
      </div>
    )}

</div>
  )
}

export default StateCountBarOT