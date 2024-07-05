import React from 'react'
import { AppStore, useAppSelector } from '../../redux/store';
import { OTGrillaEnum } from '../Enums';



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
    const[newCountAnteojos, setNewCountAnteojos] = React.useState(0);

    React.useEffect(()=>{
      setStateCheckCount(checkCount)
    },[checkCount])
    

   console.log(OTs.data)
   
  
   
   React.useEffect(()=>{
    const newCount = OTs.data.reduce((acc:any, ot:any)=>{
      if(ot[OTGrillaEnum.tipo_anteojo_id] === 3){
        acc = acc + 2
      }else{
        acc = acc + 1
      }
      return acc
    }, 0)
    setNewCountAnteojos(newCount)
  },[OTs.data])


  return (
    <div className={`${isMotHistorica ? 'w-[80%] left-[10rem]' : 'w-[70%] left-[18rem]'} bg-white absolute bottom-[1%]  rounded-full  flex text-[1.2vw]`}>
      <div className='w-[10rem] flex '>
          <p className=" w-[11rem] text-center rounded-full">
          {'Total OT'}:
          </p>
          <label className="w-8 text-center">{OTs.data.length}</label>
      </div>
    {Object.keys(OTs.estadosOT).map((estadoID, index) => {
      const estadoNombre = estadoIDNombre[estadoID];
      const derivacionColor = OTs.derivacionColores[estadoNombre];
      if (derivacionColor) {
        const backgroundColor = derivacionColor[1];
        const textColor = derivacionColor[0];
        return (
          <div className="flex" key={index}>
            <div className='w-[15rem] flex'>
              <p style={{ backgroundColor, color: textColor }} className="translate-y-[-0.2rem] mx-2 w-full text-center rounded-full">
                OT {estadoNombre}s:
              <label className="w-8 text-center">{OTs.estadosOT[estadoID]}</label>
              </p>
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
      <div className="w-[18rem]  flex mx-10">
          <p className="text-center mx-auto ">OT Seleccionadas: </p> <label className="text-center ">{stateCheckCount}</label>        
      </div>
    )}

    {newCountAnteojos > 0 && (
      <div className='w-[18rem] flex'>
        <p>Total Anteojos: <span>{newCountAnteojos}</span></p>
      </div>
    )}

</div>
  )
}

export default StateCountBarOT