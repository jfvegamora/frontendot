import React, { useEffect, useState } from 'react'
import { AppStore, useAppSelector } from '../../../redux/store';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
// import QRCode from 'qrcode.react';

import { formatNumberWithZeros, getImageURL } from '../../utils';







const FOTImpresa = React.forwardRef((_props:any, ref:any) => {
  
  const [logoPath, setLogoPath] = useState<string | null>();
  const {impresionOT:OT} = useAppSelector((store:AppStore)=>store.OTS);
  const User:any = useAppSelector((store:AppStore)=>store.user);

    useEffect(() => {
        const loadLogo = async () => {
        try {
      //  const dynamicLogo = await import(`${vite.base}/assets/${OT[EnumGrid.nombre_logo]}`);
       const resultImage = getImageURL(OT[EnumGrid.nombre_logo]);
       console.log(resultImage)
      setLogoPath(resultImage);
        } catch (error) {
          console.error('Error loading logo:', error);
          setLogoPath(null);
        }
    };



 if (OT[EnumGrid.nombre_logo]) {
 loadLogo();
 }
}, [OT && OT[EnumGrid.nombre_logo]]);


console.log(OT && OT[EnumGrid.folio])


  // useEffect(() => {
  //   const loadLogo = async () => {
  //     try {
  //       const dynamicLogo = await import(`../../../assets/${OT[EnumGrid.nombre_logo]}`);
  //       setLogoPath(dynamicLogo.default);
  //     } catch (error) {
  //       console.error('Error loading logo:', error);
  //       setLogoPath(null);
  //     }
  //   };

  //   if (OT[EnumGrid.nombre_logo]) {
  //     loadLogo();
  //   }
  // }, [OT && OT[EnumGrid.nombre_logo]]);



  return (
    <div ref={ref} className='flex flex-col h-full  border-2 border-blue-500 '>

       {OT?.map((OT:any, index:number)=>(
        <div className='  w-[90%] !h-[70rem] ' key={index}>
        
        <div className="w-[110%]">
          <div className="w-[60%] mx-auto">
            {/* <Barcode value={'000000'+ OT[EnumGrid.folio]} /> */}
            <Barcode value={formatNumberWithZeros(OT[EnumGrid.folio])} />
          </div>
        </div>

         
          <div className="header border-2 border-red-400 w-[110%] text-center">
          {logoPath && <img src={logoPath} alt="Logo" />}
            
            <h3>FOLIO OT: {OT[EnumGrid.folio]}</h3>
            <h3>FECHA: {OT[EnumGrid.fecha_atencion]}</h3>
          </div>
          

     
          <div className="header border-2 border-red-400  w-[110%] text-center2">       
            <div className='flex px-8  my-2 w-[100%] mx-auto'>
              <p className='-ml-4 text-xs w-full'>Fecha Entrega: </p>
              <p className="ml-4 text-center border-2 w-[90%] border-black">{OT[EnumGrid.fecha_entrega_cliente]}</p>
            </div>
            
            <div className='flex px-8 my-2 w-[100%] mx-auto'>
              <p className='-ml-4 text-xs '>Proyecto:  </p>
              <p className='ml-4 text-xs text-center border-2 border-black w-[100%]'> {OT[EnumGrid.proyecto_titulo]}</p>
            </div>
            
            <div className='flex px-8 my-2 w-[100%] mx-auto'>
              <p className='-ml-4 text-xs '>Proyecto:  </p>
              <p className='ml-4 text-xs text-center border-2 border-black w-[100%]'> {OT[EnumGrid.proyecto_titulo]}</p>
            </div>
            
            <div className='flex px-8 my-2 w-[100%] mx-auto'>
              <p className='-ml-4 text-xs '>Proyecto:  </p>
              <p className='ml-4 text-xs text-center border-2 border-black w-[100%]'> {OT[EnumGrid.proyecto_titulo]}</p>
            </div>
            
            <div className="flex px-8 my-2 w-[100%] mx-auto">
              <p className='-ml-4 text-xs w-[70%]'>Punto Venta:  </p>
              <p className='ml-8 text-center border-2 border-black w-[80%]'> {OT[EnumGrid.punto_venta]}</p>
            </div>
            
            <div className="flex px-8 my-2 w-[100%] mx-auto">
              <p className='-ml-4 text-xs'>Vendedor:  </p>
              <p className='ml-8 text-center text-xs border-2 border-black w-full'> {User["nombre"]}</p>
            </div>
          </div>
          





          <div className="header border-2   w-[110%] text-center">      
            <div className="my-border-2 border-black w-full flex">
              <div className=' my-2 border-2 border-black w-[60%] '>
                <p>Nombre Beneficiario:  </p>
                <p className='ml-4 text-xs text-gray-700'> {OT[EnumGrid.cliente_nomnbre]}</p>
              </div>
              <div className=' my-2 border-2 border-black w-[40%] '>
                <p>Telefono:  </p>
                <p className='ml-4 text-xs text-gray-700'> {OT[EnumGrid.cliente_telefono]}</p>
              </div>
            </div>
            
            <div className="my-border-2 border-black w-full flex">
              <div className=' my-2 border-2 border-black w-[60%] '>
                <p>Establecimiento:  </p>
                <p className='ml-4 text-xs text-gray-700'> {OT[EnumGrid.establecimiento]}</p>
              </div>
              <div className=' my-2 border-2 border-black w-[40%] '>
                <p>Rut:  </p>
                <p className='ml-4 text-xs text-gray-700'> {OT[EnumGrid.cliente_rut]}</p>
              </div>
            </div>
      
          </div>
      
      



          <div className="w-[110%] flex justify-between">
            <h1>Anteojo 1</h1>
            <h1>Anteojo 2</h1>
          </div>

          <div className="w-[110%] flex justify-between">
            <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[47%]  h-[7rem]  border-2">
              <div className="text-center h-2"></div>
                <div className="text-center h-2 w-6 -ml-2">ESF</div>
                <div className="text-center h-2 w-6 -ml-2">CIL</div>
                <div className="text-center h-2 w-6 -ml-2">EJE</div>
                <div className="text-center h-2 w-6 -ml-2">AD</div>
                <div className="text-center h-2 -mt-2 text-xs  ">OD</div>


                <div className="text-center h-6 -mt-2 text-[0.60rem]">{OT[EnumGrid.a1_od_esf]}</div>
                <div className="text-center h-6 -mt-2 text-[0.60rem]">{OT[EnumGrid.a1_od_cil]}</div>
                <div className="text-center h-6 -mt-2 text-[0.60rem]">{OT[EnumGrid.a1_od_eje]}</div>
                <div className="text-center h-6 -mt-2 text-[0.60rem]">{OT[EnumGrid.a1_od_ad]}</div>
                <div className="text-center text-xs -mt-4">OI</div>  
                <div className="text-center h-6 -mt-4 text-[0.60rem]">{OT[EnumGrid.a1_oi_esf]}</div>
                <div className="text-center h-6 -mt-4 text-[0.60rem]">{OT[EnumGrid.a1_oi_cil]}</div>
                <div className="text-center h-6 -mt-4 text-[0.60rem]">{OT[EnumGrid.a1_oi_eje]}</div>
                <div className="text-center h-6 -mt-4 text-[0.60rem]">{OT[EnumGrid.a1_oi_ad]}</div>
                <div className="text-center h-6 flex w-20 -!mt-2"> <label className='mr-2 -mt-4 !text-[0.80rem] '>ALT: {OT[EnumGrid.a1_dp]}</label></div>
                <div className="text-center h-6 flex w-20 ml-8 text-xs "> <label className='mr-2 -mt-4 !text-[0.80rem]'>DP: {OT[EnumGrid.a1_alt]}</label></div>
            </div>

            <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[47%] h-[25%] border-2 ">
              <div className=" text-center h-6"></div>
                <div className="text-center h-6 w-6">ESF</div>
                <div className="text-center h-6 w-6">CIL</div>
                <div className="text-center h-6 w-6">EJE</div>
                <div className="text-center h-6 w-6">AD</div>
                <div className="text-center h-6 text-xs">OD</div>


                <div className="text-center h-6 ">{OT[EnumGrid.a1_od_esf]}</div>
                <div className="text-center h-6 ">{OT[EnumGrid.a1_od_cil]}</div>
                <div className="text-center h-6 ">{OT[EnumGrid.a1_od_eje]}</div>
                <div className="text-center h-6 ">{OT[EnumGrid.a1_od_ad]}</div>
                <div className="text-center text-xs">OI</div>  
                <div className="text-center h-6">{OT[EnumGrid.a1_oi_esf]}</div>
                <div className="text-center h-6">{OT[EnumGrid.a1_oi_cil]}</div>
                <div className="text-center h-6">{OT[EnumGrid.a1_oi_eje]}</div>
                <div className="text-center h-6">{OT[EnumGrid.a1_oi_ad]}</div>
                <div className="text-center h-6 flex w-10"> <label className='mr-2'>ALT: </label>{OT[EnumGrid.a2_dp]}</div>
            </div>
            </div>






            <h1 className='text-center'>Cristales</h1>
            <div className='w-[110%] flex justify-between'>
              <div className="w-[50%] ">                  
                  <div className='mr-2 flex text-center w-[90%] gap-4 bg-yellow-400 justify-between'>
                    <h1>OD</h1>
                    <p className=' border-2 h-6  border-black'>{OT[EnumGrid.cristal1_od]}</p>
                  </div>
                  <div className='mr-4 flex text-center w-[90%] gap-4 bg-yellow-400 justify-between'>
                    <h1>OI</h1>
                    <p className=' border-2 h-6  border-black'>{OT[EnumGrid.cristal1_oi]}</p>
                  </div>

                  <div>
                      <p className='text-sm'>
                        {OT[EnumGrid.cristal1_marca]}, {OT[EnumGrid.cristal1_diseno]}, {OT[EnumGrid.cristal1_indice]},
                        {OT[EnumGrid.cristal1_material]}, {OT[EnumGrid.cristal1_color]}, {OT[EnumGrid.cristal1_tratamiento]},
                        {OT[EnumGrid.cristal1_diametro]}, {OT[EnumGrid.cristal1_tratamiento_adicional] === 0 ? 'No tiene tratamiento adicional' : OT[EnumGrid.cristal1_tratamiento_adicional]} 
                      </p>
                  </div>     
                </div>

              
              <div className="w-[47%] bg-blue-400 ">
                <div className='mr-2 flex text-center w-[90%] gap-4 bg-yellow-400 justify-between'>
                    <h1>OD</h1>
                    <p className='border-2 h-6  border-black'>{OT[EnumGrid.cristal2_od]}</p>
                  </div>
                  <div className='mr-4 flex text-center w-[90%] gap-4 bg-yellow-400 justify-between'>
                    <h1>OI</h1>
                    <p className='border-2 h-6  border-black'>{OT[EnumGrid.cristal2_oi]}</p>
                  </div>

                  <div>
                      <p className='text-sm'>
                        {OT[EnumGrid.cristal2_marca]}, {OT[EnumGrid.cristal2_diseno]}, {OT[EnumGrid.cristal2_indice]},
                        {OT[EnumGrid.cristal2_material]}, {OT[EnumGrid.cristal2_color]}, {OT[EnumGrid.cristal2_tratamiento]},
                        {OT[EnumGrid.cristal2_diametro]}, {OT[EnumGrid.cristal2_tratamiento_adicional] === 0 ? 'No tiene tratamiento adicional' : OT[EnumGrid.cristal2_tratamiento_adicional]} 
                      </p>
                  </div>
              </div>

            </div>





            <h1 className='text-center'>Armazones</h1>

            <div className="w-[110%] flex justify-between">
              <div className="w-[46%]">
                <h1 className='text-center'>Anteojo1</h1>
                <p className='border-2 h-6  border-black text-center'>{OT[EnumGrid.a1_armazon_id]}</p>
                <p className="text-sm">
                  {OT[EnumGrid.a1_armazon]}
                </p>
              </div>
              
              <div className="w-[50%]">
                <h1>Anteojo2</h1>
                <p className='border-2 h-6  border-black text-center'>{OT[EnumGrid.a2_armazon_id]}</p>
                <p className="text-sm">
                  {OT[EnumGrid.a2_armazon]}
                </p>
              </div>
            </div>


            


            <div className='flex h-20 mt-4 border-2 border-black'>
              <h1>Notas: </h1>
              <p>{OT[EnumGrid.observaciones]}</p>
            </div>



            {(OT && OT[EnumGrid.imprime_ticket]) && (
              <div className='mt-2 !h-[104%]'>
                <Barcode value={'000000'+ OT[EnumGrid.folio]} />
                <h2>Nombre: </h2>
                <p className="border-2 border-black mx-auto ">{OT[EnumGrid.cliente_nomnbre]} </p>
                <h2>Convenio: </h2>
                <p className="border-2 border-black ">{OT[EnumGrid.proyecto_titulo]} </p>
                <h2>Fecha Atencion: </h2>
                <p className="border-2 border-black ">{OT[EnumGrid.fecha_atencion]} </p>
                <h2>Fecha Entrega: </h2>
                <p className="border-2 border-black ">{OT[EnumGrid.fecha_entrega_cliente]} </p>

                <div className="mt-2 border-2 border-black">
                  <h2>{OT[EnumGrid.titulo1_ticket]}</h2>
                  <h2>{OT[EnumGrid.titulo2_ticket]}</h2>
                  <h2>{OT[EnumGrid.titulo3_ticket]}</h2>
                </div>

              </div>
            )}

            {(OT && OT[EnumGrid.imprime_qr] === 1) && (
              <div>
                <h1>IMPRIMIENDO QR</h1>
                <p>IMPRIMIENDO QR</p>
                {/* <QRCode value={`https://www.ejemplo.com/${OT[EnumGrid.folio]}`} /> */}
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`https://www.ejemplo.com/${OT[EnumGrid.folio]}`}
                  viewBox={`0 0 256 256`}
                  />
              </div>
            )}



          </div>
       ))}
        
    </div>
  );
});
export default React.memo(FOTImpresa);
// export default FOTImpresa