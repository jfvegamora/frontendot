import React from 'react'
import { EnumGrid } from '../mantenedores/MOTHistorica'
import { formatNumberWithZeros } from '../../utils'
import { AppStore, useAppSelector } from '../../../redux/store';
import Barcode from 'react-barcode';
import { parsedDate } from './FOTImpresa';




const FOTTicketImpresion =  React.forwardRef((_props:any, ref:any) => {
    const {impresionOT:OT} = useAppSelector((store:AppStore)=>store.OTS);


    // console.log(OT)
    console.log('render')
    return (
    <div ref={ref} className=''>
        {(
             <div className='mt-2 mr-6'>
                <Barcode marginLeft={50} height={40} width={2.5} textAlign='right' value={formatNumberWithZeros(OT[0] && OT[0][EnumGrid.folio])} />
                <div className="w-full text-center -!mt-10">
                  <h3 className='font-bold mb-2 ml-4 '>{OT[0] && OT[0][EnumGrid.titulo1_ticket]}</h3>
                </div>

             <div className="w-full !-mt-4 ">
               <div className="!h-auto">
                 <h2 className='font-bold text-base ml-4 w-full'>Nombre: </h2>
                 <p className="border-b-2 text-sm   ml-4 border-black mx-auto -mt-2">{OT[0] && OT[0][EnumGrid.cliente_nomnbre]} </p> 
               </div>
             </div>
             
             <div className="w-full !-mt-2">
               <div className="h-auto">
                   <h2 className='font-bold text-base ml-4 w-full'>Convenio: </h2>
                   <p className="border-b-2 text-sm  ml-4 border-black mx-auto -mt-2 ">{OT[0] && OT[0][EnumGrid.proyecto_titulo]} </p>
               </div>
             </div>
             
             
             <div className="w-full flex justify-around !-mt-2">
               <div className="w-[45%] ml-2">
                 <h2 className='font-bold text-base'>Fecha Atencion: </h2>
                 <p className="border-b-2 text-sm -mt-2 mb-2 border-black mx-auto ">{parsedDate(OT[0] && OT[0][EnumGrid.fecha_atencion])} </p>
               </div>
               <div className="w-[40%] ml-4 ">
                 <h2 className='font-bold text-base'>Fecha Entrega: </h2>
                 <p className="border-b-2 text-sm -mt-2  border-black mx-auto ">{parsedDate(OT[0] && OT[0][EnumGrid.fecha_entrega_cliente])} </p>
               </div>
             </div>

             <div className="!-mt-2 font-bold border-2 ml-4 border-black text-center">
               <h2>{OT[0] && OT[0][EnumGrid.titulo2_ticket]}</h2>
               <h2>{OT[0] && OT[0][EnumGrid.titulo3_ticket]}</h2>
             </div>

           </div>
        )}
    
    </div>
  )
})

export default FOTTicketImpresion