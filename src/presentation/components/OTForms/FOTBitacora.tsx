import React, { useEffect, useState } from 'react'
import { TableComponent } from '..'
import { table_head_OT_bitacora } from '../../utils'
import axios from 'axios'
import { URLBackend } from '../../hooks/useCrud';

// const strQuery = "01&_p2=126"


interface IBitacora {
  otFolio:number;
  isMOT:any;
}



const FOTBitacora:React.FC<IBitacora> = ({
  otFolio,
  isMOT
}) => {
  const [dataBitacora, setDataBitacora] = useState();

  const strURL =`${URLBackend}/api/${isMOT ? "otbitacorahistorica" : "otbitacora"}/listado/?query=01` ;
  
  
  console.log(otFolio)
  const fetchData = async()=>{
    const result = await axios(`${strURL}&_p2=${otFolio || 0}`)
    setDataBitacora(result.data || "")
  }

  // console.log('entitines', dataBitacora)

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='scroll !h-[40rem]'>
        <TableComponent
            tableHead={table_head_OT_bitacora}
            entidad={'bitacora'}
            idMenu={22}
            data={dataBitacora}
        />
    </div>
  )
}

export default FOTBitacora