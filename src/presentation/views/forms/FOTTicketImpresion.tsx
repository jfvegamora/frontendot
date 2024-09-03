import React from 'react'
import { formatNumberWithZeros } from '../../utils'
import Barcode from 'react-barcode';
import { EnumImpresion, parsedDate } from './FOTImpresa';




const FOTTicketImpresion =  React.forwardRef((_props:any, ref:any) => {

    const {data} = _props;
    return (
    <div ref={ref} className='page-break'>
        {(
             <div className='mt-2 mr-6'>
                <Barcode marginLeft={50} height={40} width={2.5} textAlign='right' value={formatNumberWithZeros(data && data[EnumImpresion.folio])} />
                <div className="w-full text-center -!mt-10">
                  <h3 className='font-bold mb-2 ml-4 '>{data && data[EnumImpresion.titulo_ticket_1]}</h3>
                </div>

             <div className="w-full !-mt-4 ">
               <div className="!h-auto">
                 <h2 className='font-bold text-lg ml-4 w-full'>Nombre: </h2>
                 <p className="border-b-2 text-base   ml-4 border-black mx-auto -mt-2">{data && data[EnumImpresion.cliente_nombre]} </p> 
               </div>
             </div>
             
             <div className="w-full !-mt-2">
               <div className="h-auto">
                   <h2 className='font-bold text-lg ml-4 w-full'>Convenio: </h2>
                   <p className="border-b-2 text-base  ml-4 border-black mx-auto -mt-2 ">{data && data[EnumImpresion.proyecto]} </p>
               </div>
             </div>
             
             
             <div className="w-full flex justify-around !-mt-2 ml-2">
               <div className="w-[45%] ml-2">
                 <h2 className='font-bold text-lg'>F. Atencion: </h2>
                 <p className="border-b-2 text-base -mt-2 mb-2 border-black mx-auto ">{parsedDate(data[EnumImpresion.fecha_atencion])} </p>
                 {/* <p className="border-b-2 text-base -mt-2 mb-2 border-black mx-auto ">{'a'} </p> */}
               </div>
               <div className="w-[40%] ml-4 ">
                 <h2 className='font-bold text-lg'>F. Entrega: </h2>
                 <p className="border-b-2 text-base -mt-2  border-black mx-auto ">{parsedDate(data[EnumImpresion.fecha_entrega_cliente])} </p>
                 {/* <p className="border-b-2 text-base -mt-2  border-black mx-auto ">{'aa'} </p> */}
               </div>
             </div>

             <div className="!-mt-2 font-bold border-2 ml-4 w-full border-black text-center">
               <h2 className='text-base'>{data && data[EnumImpresion.titulo_ticket_2]}</h2>
               <h2 className='text-base'>{data && data[EnumImpresion.titulo_ticket_3]}</h2>
             </div>


             
           </div>
        )}
    </div>
  )
})

export default FOTTicketImpresion