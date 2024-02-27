import React from 'react'
import { EnumGrid } from '../mantenedores/MOTHistorica'
import { formatNumberWithZeros } from '../../utils'
import { AppStore, useAppSelector } from '../../../redux/store';
import Barcode from 'react-barcode';




const FOTTicketImpresion =  React.forwardRef((_props:any, ref:any) => {
    const {impresionOT:OT} = useAppSelector((store:AppStore)=>store.OTS);


    return (
    <div ref={ref}>
        {(OT && OT[EnumGrid.imprime_ticket]) && (
            <div className='mt-2'>
            <Barcode marginLeft={45} height={45} width={2.5} textAlign='right' value={formatNumberWithZeros(OT[EnumGrid.folio])} />
            <h3 className='font-bold mb-2 ml-4'>{OT[EnumGrid.titulo1_ticket]}</h3>

            <h2 className='font-bold text-xl ml-4'>Nombre: </h2>
            <p className="border-b-2 mt-2 mb-2 ml-4 border-black mx-auto ">{OT[EnumGrid.cliente_nomnbre]} </p>
            <h2 className='font-bold text-xl ml-4'>Convenio: </h2>
            <p className="border-b-2 mt-2 mb-2 ml-4 border-black mx-auto ">{OT[EnumGrid.proyecto_titulo]} </p>
            <div className="w-full flex">
                <div className="w-[40%] ml-4">
                <h2 className='font-bold text-xl'>Fecha Atencion: </h2>
                <p className="border-b-2 mt-2 mb-2 border-black mx-auto ">{OT[EnumGrid.fecha_atencion]} </p>
                </div>
                <div className="w-[40%] ml-4 ">
                <h2 className='font-bold text-xl'>Fecha Entrega: </h2>
                <p className="border-b-2 mt-2 mb-2 border-black mx-auto ">{OT[EnumGrid.fecha_entrega_cliente]} </p>
                </div>
            </div>

            <div className="!mt-4 font-bold border-2 ml-4 border-black">
                <h2>{OT[EnumGrid.titulo2_ticket]}</h2>
                <h2>{OT[EnumGrid.titulo3_ticket]}</h2>
            </div>

            </div>
        )}
    
    </div>
  )
})

export default FOTTicketImpresion