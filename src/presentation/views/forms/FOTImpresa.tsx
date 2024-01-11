import React from 'react'
import { AppStore, useAppSelector } from '../../../redux/store';
import { EnumGrid } from '../mantenedores/MOTHistorica';

const FOTImpresa = React.forwardRef((ref:any) => {
  const OT:any = useAppSelector((store:AppStore)=>store.OTS.ot)


  console.log(OT)
  console.log(OT[EnumGrid.estado])



  return (
    <div ref={ref} className='flex w-[50%] h-[50%] border-2 border-blue-500'>
       {OT.length > 2 && (
        <div>
          <h1>FOLIO OT: {OT[EnumGrid.folio]}</h1>
          <h1>{OT[EnumGrid.estado]}</h1>
          
          <p>ot</p>
          <p>test</p>
          
          <div className='flex'>
            <label className=''>Nombre Cliente: </label>
            <input type="text" value={OT[EnumGrid.cliente_nomnbre]} />
          </div>

          <input type="text" title ="Hola"/>
          <input type="text" name="" />
          <input type="text" name="" />
        </div>
       )} 
    </div>
  );
});
export default React.memo(FOTImpresa);
// export default FOTImpresa