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
  checkCount?:any
}


const StateCountBarOT:React.FC<IStateCountBar> = ({checkCount}) => {
    const OTs:any = useAppSelector((store: AppStore) => store.OTS);
    // console.log(checkCount.value)


  return (
    <div className="w-[80%] bg-white absolute bottom-[2%] flex">
    {Object.keys(OTs.estadosOT).map((estadoID, index) => {
      const estadoNombre = estadoIDNombre[estadoID];
      const derivacionColor = OTs.derivacionColores[estadoNombre];

      if (derivacionColor) {
        const backgroundColor = derivacionColor[1];
        const textColor = derivacionColor[0];

        return (
          <div className="flex" key={index}>
            <p style={{ backgroundColor, color: textColor }} className="mx-2 w-[6rem] text-center">
              {estadoNombre}:
            </p>
            <label className="w-8 text-center">{OTs.estadosOT[estadoID]}</label>
          </div>
        );
      }

      return null; 
    })}
    
    {OTs.estadosOT.hasOwnProperty(99) && (
      <div className="w-[8rem]  flex bg-black">
          <p className="text-center mx-auto text-white">Por vencer: </p> <label className="text-center text-white">{OTs.estadosOT[99]}</label>        
      </div>
    )}
    {checkCount.value >= 1 && (
      <div className="w-[8rem]  flex bg-orange-400 mx-10">
          <p className="text-center mx-auto text-white">Seleccionadas: </p> <label className="text-center text-white">{checkCount.value}</label>        
      </div>
    )}

</div>
  )
}

export default StateCountBarOT