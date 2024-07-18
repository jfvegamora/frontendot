import React from 'react'
import { AppStore, useAppSelector } from '../../redux/store';
import { OTGrillaEnum } from '../Enums';
import { totoalTrabajosSeleccionados } from '../views/mantenedores/MOT';



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
    <>
    <div className={`${isMotHistorica ? 'w-[80%] left-[10rem]' : 'w-[60%] left-[1vw]'} bg-white absolute bottom-[1%] h-[4.5vh]   rounded-full  flex text-[1.2vw]`}>
      <div className='w-[7vw] flex ml-4'>
          <p className=" text-center rounded-full">
          {'Total OT '}:
          </p>
          <label className="text-center">{OTs.data.length}</label>
      </div>


    {Object.keys(OTs.estadosOT).map((estadoID, index) => {
      const estadoNombre = estadoIDNombre[estadoID];
      const derivacionColor = OTs.derivacionColores[estadoNombre];
      console.log(estadoNombre)
      console.log(OTs.derivacionColores)
      
      console.log(OTs.estadosOT)
      
      if (derivacionColor) {
        const backgroundColor = derivacionColor[1];
        const textColor = derivacionColor[0];
        return (
            <div className='w-[8vw] h-[5vh] flex mr-4' key={index}>
              <p style={{ backgroundColor, color: textColor }} className="translate-y-[-0.2rem] mx-2 w-full text-center rounded-2xl">
               {estadoNombre}s:
              <label className="text-center">{OTs.estadosOT[estadoID]}</label>
              </p>
          </div>
        );
      }

      return null; 
    })}
    
    {OTs.estadosOT.hasOwnProperty(99) &&  (OTs.estadosOT[99] > 0 as any) && (
      <div className="w-[8vw]  flex bg-black">
          <p className="text-center mx-auto text-white">Por vencer: </p> <label className="text-center text-white">{OTs.estadosOT[99]}</label>        
      </div>
    )}

    {stateCheckCount >= 1 && (
      <div className="w-[13vw] flex mx-2">
          <p className="text-center">OT Seleccionadas: </p> <label className="text-center ">{stateCheckCount}</label>        
      </div>
    )}

    </div>


    <div className={`${isMotHistorica ? 'w-[80%] rigth-[10rem]' : 'w-[30%] right-[1vw]'} bg-white absolute bottom-[1%] h-[4.5vh]  rounded-full  flex text-[1.2vw]`}>
    
    {newCountAnteojos > 0 && (
      <div className='w-[11vw] flex ml-4 '>
        <p>Total Anteojos: <span>{newCountAnteojos}</span></p>
      </div>
    )}




    {totoalTrabajosSeleccionados.value >= 1 && (
      <div className="w-[16vw] flex mx-">
          <p className="text-center">Trabajos Seleccionados: </p> <label className="text-center ">{totoalTrabajosSeleccionados.value}</label>        
      </div>
    )}





    

    </div>
    </>
  )
}

export default StateCountBarOT