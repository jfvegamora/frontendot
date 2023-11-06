import React, { useEffect, useState } from 'react'
import { TableComponent } from '..'
import { table_head_OT_bitacora } from '../../utils'
import axios from 'axios'

const strURL = 'https://mtoopticos.cl/api/otbitacora/listado/?query=01';
// const strQuery = "01&_p2=126"


interface IBitacora {
  otFolio:number
}



const FOTBitacora:React.FC<IBitacora> = ({
  otFolio
}) => {
  const [dataBitacora, setDataBitacora] = useState();
  console.log(otFolio)
  const fetchData = async()=>{
    const result = await axios(`${strURL}&_p2=${otFolio || 0}`)
    setDataBitacora(result.data || "")
  }

  console.log('entitines', dataBitacora)

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='scroll'>
        <h1>BITACORA</h1>
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