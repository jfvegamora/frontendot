import React from 'react'
import QRCode from 'react-qr-code';


// import { EnumGrid } from '../mantenedores/MOTHistorica'
// import { formatNumberWithZeros } from '../../utils'
// import { AppStore, useAppSelector } from '../../../redux/store';
// import Barcode from 'react-barcode';
// import { parsedDate } from './FOTImpresa';




const FOTTicketQRImpresion =  React.forwardRef((_props:any, ref:any) => {
    // const {impresionOT:OT} = useAppSelector((store:AppStore)=>store.OTS);


    // console.log(OT)
    return (
    <div ref={ref} className=''>
        {(

                <div className="!h-auto mr-4 ">
                  <div className="w-full text-center">
                    <h1 className='font-bold mb-2 ml-4'>CUIDA TUS LENTES, ESCANEA CÓDIGO QR</h1>
                  </div>
               
                  <QRCode
                    size={50}
                    style={{ height: "auto", maxWidth: "100%", width: "40%", margin:"auto" }}
                    value={`https://www.tinyurl.com/5n78e9vd`}
                    viewBox={`0 0 256 256`}
                    />
                </div>
              
  
     
        )}
    
    </div>
  )
})

export default FOTTicketQRImpresion