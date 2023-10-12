import React from 'react'
import { TableComponent } from '..'
import { table_head_OT_bitacora } from '../../utils'

const data=[
    ["d","d","asdadad"],
    ["","","asdadad"],
    ["","","asdadad"],
    ["","","asdadad"],
]

const FOTBitacora = () => {
  return (
    <div className=''>
        <h1>BITACORA</h1>
        <TableComponent
            tableHead={table_head_OT_bitacora}
            entidad={'bitacora'}
            idMenu={22}
            data={data}
        />
    </div>
  )
}

export default FOTBitacora