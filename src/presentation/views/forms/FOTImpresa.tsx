import React, { useEffect, useState } from 'react'
import { AppStore, useAppSelector } from '../../../redux/store';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
// import QRCode from 'qrcode.react';
import LogoMaster   from '../../../assets/logo_master01.jpg';
import LogoMTO      from '../../../assets/logo_mto01.jpg';
import LogoOptilab  from '../../../assets/logo_optilab01.jpg';


import { formatNumberWithZeros, getImageURL } from '../../utils';







const FOTImpresa = React.forwardRef((_props:any, ref:any) => {
  
  const [logoPath, setLogoPath] = useState<string | null>();
  const [pathLogo, setPathLogo] = useState('');
  const {impresionOT:OT} = useAppSelector((store:AppStore)=>store.OTS);
  const User:any = useAppSelector((store:AppStore)=>store.user);
  let PathLogo = ''

  // useEffect(() => {
  //   const loadLogo = async () => {
  //       try {
  //     //  const dynamicLogo = await import(`${vite.base}/assets/${OT[EnumGrid.nombre_logo]}`);
  //      const resultImage = getImageURL(OT[0] && OT[0][EnumGrid.nombre_logo]);
  //      console.log(resultImage)
  //       setLogoPath(resultImage);
  //       } catch (error) {
  //         console.error('Error loading logo:', error);
  //         setLogoPath(null);
  //       }
  //   };


  //   if(OT[0] && OT[0][EnumGrid.nombre_logo]) {
  //     console.log('render')
  //     loadLogo();
  //   }

  // }, [OT[0] && OT[0][EnumGrid.nombre_logo]]);

// console.log(OT && OT[EnumGrid.folio])


  useEffect(() => {
    // const loadLogo = async () => {
    //   try {
    //     const dynamicLogo = await import(`../../../assets/${OT[0][EnumGrid.nombre_logo]}`); 
    //     setLogoPath(dynamicLogo.default);
    //   } catch (error) {
    //     console.error('Error loading logo:', error);
    //     setLogoPath(null);
    //   }
    // };
    // console.log(OT[0] && OT[0][EnumGrid.nombre_logo])

    // if (OT[0] && OT[0][EnumGrid.nombre_logo]) {
    //   console.log('render')
    //   loadLogo();
    // }

      console.log(OT[0])
      console.log(OT[0] && OT[0][EnumGrid.nombre_logo])
      
      if(OT[0] && OT[0][EnumGrid.nombre_logo]){
        console.log(OT[0] && OT[0][EnumGrid.nombre_logo])

        switch (OT[0] && OT[0][EnumGrid.nombre_logo]) {
          case 'logo_mto01.jpg':
              setLogoPath(LogoMTO)
              setPathLogo(LogoMTO)
            
            break;
        
          default:
            break;
        }
      }

      console.log(pathLogo)
  }, [OT[0]]);


  
  // if(OT[0] && OT[0][EnumGrid.nombre_logo]){
  //   console.log(OT[0] && OT[0][EnumGrid.nombre_logo])

  //   switch (OT[0] && OT[0][EnumGrid.nombre_logo]) {
  //     case 'logo_mto01.jpg':
  //         setLogoPath(LogoMTO)
        
  //       break;
    
  //     default:
  //       break;
  //   }
  // }
  
  
  console.log(OT[0] && OT[0][EnumGrid.nombre_logo])
  
  // console.log(logoPath)
  console.log(OT[0] && OT[0][EnumGrid.imprime_ticket])
  // console.log(new Date().toLocaleTimeString())

  const fechaHora = new Date().toLocaleTimeString()

  console.log(pathLogo)

  return (
    <div ref={ref} className='flex flex-col h-full  border-2 border-blue-500 '>

       {OT?.map((OT:any, index:number)=>(
        <div className='  w-[90%] !h-[70rem] ' key={index}>
        
        <div className="w-[110%] relative  !h-[8%]">
          <div className="w-[90%] mr-7  mx-auto">
            {/* <Barcode value={'000000'+ OT[EnumGrid.folio]} /> */}
            <Barcode marginLeft={45} height={25} width={2.5} textAlign='right'  value={formatNumberWithZeros(OT[EnumGrid.folio])} />
            <h3 className='absolute bottom-7 left-10'>{fechaHora}</h3>

          </div>
        </div>
{/* 
          {pathLogo.trim() !== '' && (
            <div className="w-full !-mt-6 z-20">
              <img src={pathLogo}  alt="Logo" className='w-[90%] ml-8' />
            </div>
          )} */}
         
          <div className="header  w-[110%] text-center !-mt-7 border-black border-b-2">
            <div className="w-full flex justify-around  ">
              {pathLogo.trim() !== '' && (
                <div className="w-[50%] top-0 left-0 z-20 ">
                  <img src={pathLogo}  alt="Logo" className='w-[90%] ml-8' />
                </div>
              )}
              <div className="mt-2"></div>
              <p className='text-[3rem] -mt-4'>{OT[EnumGrid.folio]}</p>
              {/* <h3 className='text-[3rem]'>OT: {OT[EnumGrid.folio]}</h3> */}
            </div>

            <div className="w-full flex justify-around !-mt-6">
              {/* <h3>FECHA ATENCIÓN: {OT[EnumGrid.fecha_atencion]}</h3> */}
              <p className='font-bold'>FECHA  ATENCIÓN:</p>
              <p>{OT[EnumGrid.fecha_atencion]}</p>
            </div>

          </div>
          
     
          <div className="header  w-[110%] text-center2 border-black border-b-2">       

            <div className='px-8  my-2 w-[100%] mx-auto relative'>
              <div className='flex justify-around text-left '>
                <p className='!-ml-6 text-xs w-full font-bold'>Fecha Entrega: </p>
                <p className=" !mr-[1.7rem] text-left  w-[100%] ">{OT[EnumGrid.fecha_entrega_cliente]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[60%] absolute right-0"></div>
            </div>

            <div className="px-8 my-2 w-[100%] mx-auto items-center relative">
              <div className="flex justify-around">
                <p className='-ml-10 text-[0.80rem] w-[40%] font-bold'>Punto Venta:  </p>
                <p className='-ml-6 text-xs w-[60%]'></p>
                <p className='!ml-10 text-xs text-center w-[60%]  right-0 absolute'> {OT[EnumGrid.punto_venta]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[60%] absolute right-0"></div>
            </div>
            
            <div className="px-8 my-2 w-[100%] mx-auto items-center relative">
              <div className="flex justify-around text-center">
                <p className='-ml-6 text-[0.80rem] !mt-2 font-bold'>Vendedor:  </p>
                <p className='!ml-[3.8rem] text-left text-xs w-full'> {User["nombre"]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[60%] absolute right-0"></div>
            </div>
            
            <div className='px-8 my-2 w-[100%] h-10  mx-auto relative '>
              <div className="relative h-10">
                <p className='!-ml-6 text-[0.80rem]  w-[100%] font-bold'>Proyecto:  </p>
                <p className='!ml-16 text-xs text-left left-[-5.5rem] bottom-0   absolute  w-[60%]'> {OT[EnumGrid.proyecto_titulo]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[97%] absolute right-0"></div>
            </div>
            
            <div className='px-8 my-2 w-[100%] h-10 mx-auto relative'>
              <div className="relative h-10">
                <p className='-ml-6 text-[0.80rem] w-full font-bold'>Establecimiento:  </p>
                <p className='ml-6 text-xs text-left left-[-3rem] bottom-0 absolute w-[60%]'> {OT[EnumGrid.establecimiento]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[97%] absolute right-0"></div>
            </div>
            
            
            <div className='px-8 my-2 w-[100%] h-10 mx-auto  relative'>
              <div className="relative h-10">
                <p className='-ml-6 text-[0.80rem] w-full font-bold'>Comuna:  </p>
                <p className='ml-6 text-xs text-left w-[60%] left-[-3rem]  bottom-0 absolute '> {OT[EnumGrid.cliente_comuna]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[97%] absolute right-0"></div>
            </div>
            
            <div className='px-8 my-2 mb-2 w-[100%] h-10 mx-auto relative'>
              <div className="relative h-10">
                <p className='-ml-6 text-[0.80rem] w-full font-bold'>Lugar Despacho:  </p>
                {/* <p className='-ml-6 text-xs text-left w-[60%] left-[-3rem] bottom-0 absolute'></p> */}
                <p className='!ml-10 text-xs text-center w-[100%] left-[-5.8rem]  right-0 absolute'> {OT[EnumGrid.punto_venta]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[97%] absolute right-0"></div>
            </div>
            
          </div>
          





          <div className="header text-center2 border-2   w-[110%] text-center mt-2">
            {/* <h1 className='w-[60%] !-ml-4'>Datos Beneficiario: </h1> */}

          <div className="px-8 my-2 w-[100%] mx-auto items-center relative">
              {/* <div className="relative h-10 !-mt-2" >
                <p className='!ml-2  text-xs text-left absolute -left-[1.8rem] top-[-1rem]  w-full font-bold'>Beneficiario: </p>
                <p className='ml-8 text-left w-[120%] top-[0.5rem] left-[-3.3rem] bottom-0 absolute text-xs  '>{OT[EnumGrid.cliente_nomnbre]}</p>
              </div>
              <div className="border-b-[1px] border-black w-[97%] absolute right-0"></div> */}
          
            <div className="flex justify-around text-center relative !-mt-4">
                <p className='-ml-12 text-[0.80rem] w-[30%] !mt-2 font-bold'>Beneficiario:  </p>
                <p className='-ml-6 text-xs w-[60%]'></p>
                <p className='ml-8 text-left text-xs  absolute left-[1.5rem]  w-[90%] '>{OT[EnumGrid.cliente_nomnbre]}</p>
              </div>
            <div className="border-b-[1px] border-black w-[70%] -bottom-1 absolute right-0"></div>
          </div>

            
            <div className=" w-full flex justify-between !mt-4 ml-2 ">
              <div className='border-b-2 border-black w-[40%] text-center items-center'>
                <div className="flex justify-around">
                  <p className='-ml-8 text-xs font-bold w-[40%]'>Rut:  </p>
                  <p className=' text-[0.80rem] text-left text-gray-700'> {OT[EnumGrid.cliente_rut]}</p>
                </div>
              </div>
              <div className='border-b-2 border-black w-[35%]  !mr-4'>
                <div className="flex justify-around">
                  <p className='text-[0.80rem] font-bold'>Teléfono:  </p>
                  <p className='text-xs text-gray-700'> {OT[EnumGrid.cliente_telefono]}</p>
                </div>
              </div>
            </div>
      
          </div>
      
      



          <div className="w-[110%] flex justify-around ml-4">
            <h1 className='font-bold !-mt-2'>Anteojo 1</h1>
            <h1 className='font-bold !-mt-2'>Anteojo 2</h1>
          </div>

          <div className="w-[105%] flex justify-around  ml-2 border-b-2  border-black mb-2">
            <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[47%]  h-[7rem]">
              <div className="text-center h-2 mr-2"></div>
                <div className="text-center h-2 w-6 -ml-2 font-bold">ESF</div>
                <div className="text-center h-2 w-6 -ml-2 font-bold">CIL</div>
                <div className="text-center h-2 w-6 -ml-2 font-bold">EJE</div>
                <div className="text-center h-2 w-6 -ml-2 font-bold !mr-2">AD</div>
                <div className="text-center h-2 -mt-2 text-xs font-bold">OD</div>


                <div className="text-center h-6 -mt-2 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_od_esf]}</div>
                <div className="text-center h-6 -mt-2 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_od_cil]}</div>
                <div className="text-center h-6 -mt-2 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_od_eje]}</div>
                <div className="text-center h-6 -mt-2 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_od_ad]}</div>
                <div className="text-center text-xs -mt-4 font-bold">OI</div>  
                <div className="text-center h-6 -mt-4 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_oi_esf]}</div>
                <div className="text-center h-6 -mt-4 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_oi_cil]}</div>
                <div className="text-center h-6 -mt-4 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_oi_eje]}</div>
                <div className="text-center h-6 -mt-4 text-[0.75rem] !-ml-2">{OT[EnumGrid.a1_oi_ad]}</div>
                <div className="text-center h-6 flex w-20 -!mt-2"> <label className='mr-2 -mt-4 !text-[0.80rem] font-bold '>ALT: {OT[EnumGrid.a1_dp]}</label></div>
                <div className="text-center h-6 flex w-20 ml-8 text-xs ">  <label className='mr-2 -mt-4 !text-[0.80rem] font-bold'>DP: {OT[EnumGrid.a1_alt]}</label></div>
            </div>

            <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[47%] h-[7rem] border-black border-l-[1px]  !mr-4">
              <div className=" text-center h-2"></div>
                <div className="text-center h-2 w-6 -ml-2 font-bold pl-2">ESF</div>
                <div className="text-center h-2 w-6 -ml-2 font-bold pl-2">CIL</div>
                <div className="text-center h-2 w-6 -ml-2 font-bold pl-2">EJE</div>
                <div className="text-center h-2 w-6 -ml-2 font-bold"> </div>
                <div className="text-center h-2 text-xs -mt-2 font-bold pl-2">OD</div>


                <div className="text-center h-6 -mt-2 text-[0.75rem] !ml-2">{OT[EnumGrid.a2_od_esf]}</div>
                <div className="text-center h-6 -mt-2 text-[0.75rem] !ml-2">{OT[EnumGrid.a2_od_cil]}</div>
                <div className="text-center h-6 -mt-2 text-[0.75rem] !ml-2">{OT[EnumGrid.a2_od_eje]}</div>
                <div className="text-center h-6 -mt-2 text-[0.75rem] !ml-2"> </div>
                <div className="text-center text-xs -mt-4 font-bold pl-2">OI</div>  
                <div className="text-center h-6 -mt-4 text-[0.75rem] !ml-2">{OT[EnumGrid.a2_oi_esf]}</div>
                <div className="text-center h-6 -mt-4 text-[0.75rem] !ml-2">{OT[EnumGrid.a2_oi_cil]}</div>
                <div className="text-center h-6 -mt-4 text-[0.75rem] !ml-2">{OT[EnumGrid.a2_oi_eje]}</div>
                <div className="text-center h-6 -mt-4 text-[0.75rem] !ml-2"> </div>
                <div className="text-center h-6 flex w-20 -!mt-2"> <label className='mr-2 -mt-4 !text-[0.8rem] font-bold pl-2'>DP: {OT[EnumGrid.a2_dp]}</label></div>
            </div>
            </div>






            <h1 className='text-center font-bold '>Cristales</h1>
            <div className='w-[110%] flex justify-between border-b-2 border-black mb-2'>
              <div className="w-[50%] ">                  
                  <div className='flex text-center w-[90%] gap-4 justify-around'>
                    <h1 className='!ml-2 font-bold'>OD: </h1>
                    <p className=' border-b-2  border-black !-ml-2 '>{OT[EnumGrid.cristal1_od]}</p>
                  </div>
                  <div className='flex mt-2 text-center w-[90%] gap-4  justify-around'>
                    <h1 className='!ml-2 font-bold'>OI: </h1>
                    <p className=' border-b-2  border-black'>{OT[EnumGrid.cristal1_oi]}</p>
                  </div>

                  <div className='mt-4'>
                      <p className='text-sm'>
                        {OT[EnumGrid.cristal1_marca]}, {OT[EnumGrid.cristal1_diseno]}, {OT[EnumGrid.cristal1_indice]},
                        {OT[EnumGrid.cristal1_material]}, {OT[EnumGrid.cristal1_color]}, {OT[EnumGrid.cristal1_tratamiento]},
                        {OT[EnumGrid.cristal1_diametro]}, {OT[EnumGrid.cristal1_tratamiento_adicional] === 0 ? 'No tiene tratamiento adicional' : OT[EnumGrid.cristal1_tratamiento_adicional]} 
                      </p>
                  </div>     
                </div>

              
                <div className="w-[47%]  ">
                  <div className='flex text-center w-[90%] gap-4 justify-around'>
                    <h1 className=' font-bold'>OD: </h1>
                    <p className='border-b-2  border-black !-ml-2'>{OT[EnumGrid.cristal1_od]}</p>
                  </div>
                  <div className='mr-4 mt-2 flex text-center w-[90%] gap-4  justify-around'>
                    <h1 className='font-bold'>OI: </h1>
                    <p className='border-b-2  border-black'>{OT[EnumGrid.cristal1_oi]}</p>
                  </div>

                  <div className='mt-4'>
                      <p className='text-sm'>
                        {OT[EnumGrid.cristal2_marca]}, {OT[EnumGrid.cristal2_diseno]}, {OT[EnumGrid.cristal2_indice]},
                        {OT[EnumGrid.cristal2_material]}, {OT[EnumGrid.cristal2_color]}, {OT[EnumGrid.cristal2_tratamiento]},
                        {OT[EnumGrid.cristal2_diametro]}, {OT[EnumGrid.cristal2_tratamiento_adicional] === 0 ? 'No tiene tratamiento adicional' : OT[EnumGrid.cristal2_tratamiento_adicional]} 
                      </p>
                  </div>
              </div>

            </div>





            <h1 className='text-center font-bold'>Armazones</h1>
                <div className="flex justify-between">
                  <h1 className='font-bold'>Anteojo1</h1>
                  <h1 className='font-bold'>Anteojo2</h1>
                </div>

            <div className="w-[110%] flex justify-between">
              <div className="w-[46%]">
                <p className='border-b-2   border-black text-center'>{OT[EnumGrid.a1_armazon_id]}</p>
                <p className="text-sm">
                  {OT[EnumGrid.a1_armazon]}
                </p>
              </div>
              
              <div className="w-[50%]">
                <p className='border-b-2   border-black text-center'>{OT[EnumGrid.a2_armazon_id]}</p>
                <p className="text-sm">
                  {OT[EnumGrid.a2_armazon]}
                </p>
              </div>
            </div>


            


            <div className='flex h-20 mb-40 mt-4 border-2 border-black'>
              <h1>Notas: </h1>
              <p>{OT[EnumGrid.observaciones]}</p>
            </div>



            {(OT && OT[EnumGrid.imprime_ticket]) && (
              <div className='mt-2 !h-[104%]'>
                <Barcode height={45} width={3} textAlign='right' value={formatNumberWithZeros(OT[EnumGrid.folio])} />
                <h3 className='font-bold mb-2'>{OT[EnumGrid.titulo1_ticket]}</h3>

                <h2 className='font-bold text-xl'>Nombre: </h2>
                <p className="border-b-2 mt-2 mb-2 border-black mx-auto ">{OT[EnumGrid.cliente_nomnbre]} </p>
                <h2 className='font-bold text-xl'>Convenio: </h2>
                <p className="border-b-2 mt-2 mb-2 border-black mx-auto ">{OT[EnumGrid.proyecto_titulo]} </p>
                <h2 className='font-bold text-xl'>Fecha Atencion: </h2>
                <p className="border-b-2 mt-2 mb-2 border-black mx-auto ">{OT[EnumGrid.fecha_atencion]} </p>
                <h2 className='font-bold text-xl'>Fecha Entrega: </h2>
                <p className="border-b-2 mt-2 mb-2 border-black mx-auto ">{OT[EnumGrid.fecha_entrega_cliente]} </p>

                <div className="!mt-4 font-bold border-2 border-black">
                  <h2>{OT[EnumGrid.titulo2_ticket]}</h2>
                  <h2>{OT[EnumGrid.titulo3_ticket]}</h2>
                </div>

              </div>
            )}

            {(OT && OT[EnumGrid.imprime_qr] === 1) && (
              <div>
                <h1 className='font-bold'>CUIDA TUS LENTES, ESCANEA CÓDIGO QR</h1>
             
                {/* <QRCode value={`https://www.ejemplo.com/${OT[EnumGrid.folio]}`} /> */}
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`https://www.tinyurl.com/5n78e9vd`}
                  viewBox={`0 0 256 256`}
                  />
              </div>
            )}



          </div>
       ))}
        
    </div>
  );
});
// export default React.memo(FOTImpresa);
export default FOTImpresa