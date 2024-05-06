import React, { useEffect, useState } from 'react'
import { AppStore, useAppSelector } from '../../../redux/store';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import Barcode from 'react-barcode';
// import QRCode from 'react-qr-code';
// import QRCode from 'qrcode.react';
// import LogoMaster   from '../../../assets/logo_master01.jpg';
import LogoMTO from '../../../assets/logo_mto01.jpg';
// import LogoOptilab  from '../../../assets/logo_optilab01.jpg';


import { formatNumberWithZeros } from '../../utils';
import FOTTicketImpresion from './FOTTicketImpresion';
import FOTTicketQRImpresion from './FOTTicketQRImpresion';

export const parsedDate = (date: string): any => {
  if (date) {
    const partesFecha = date.split('-'); // Divide la cadena en partes usando el guion como separador
    const año = partesFecha[0];
    const mes = partesFecha[1];
    const dia = partesFecha[2];

    return `${dia}-${mes}-${año}`
  }
}


const FOTImpresa = React.forwardRef((props: any, ref: any) => {

  const [_logoPath, setLogoPath] = useState<string | null>();
  const [pathLogo, setPathLogo] = useState('');
  const { impresionOT: OT } = useAppSelector((store: AppStore) => store.OTS);
  const User: any = useAppSelector((store: AppStore) => store.user);
  // let PathLogo = ''

  // console.log(props)

  // console.log(props)

  const { masivo } = props;

  console.log(masivo)

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


    if (OT[0] && OT[0][EnumGrid.nombre_logo]) {
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
  }, [OT[0]]);

  const fechaHora  = new Date();
  const hora       = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const fecha      = fechaHora.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const fechaHoraFormateada = `${hora} ${fecha}`;
  
  return (
    <>
      {masivo === true ?
        (
          <div ref={ref} className='flex flex-col !h-auto'>
            {OT && OT.map((ot: any) => {
              console.log(ot[EnumGrid.folio])
              console.log(ot[EnumGrid.imprime_qr])
              console.log(ot[EnumGrid.imprime_ticket])
              return (

                <div className={`!w-[90%] ${ot[EnumGrid.imprime_ticket] === 1 ? '!h-[180rem]' : '!h-[90rem]'}  `} key={ot[EnumGrid.folio]} >
                  

                  <div className={`w-[110%] !h-[8%] mb-4 ${ot[EnumGrid.imprime_ticket] === 1 ? '!h-[10rem]' : '!h-[7rem]'}`}>
                    <div className="w-[110%] mr-7 relative mx-auto">
                      <Barcode marginLeft={45} height={25} width={2.5} textAlign='right' value={formatNumberWithZeros(ot[EnumGrid.folio])} />
                      <h3 className={`absolute ${ot[EnumGrid.imprime_ticket] === 1 ? 'bottom-2' : 'bottom-2'} left-10`}>{fechaHoraFormateada}</h3>
                    </div>
                  </div>



                  <div className={`header  w-[110%] text-center ${ot[EnumGrid.imprime_ticket] === 1 ? '-mt-[11.5rem]' : '-mt-[3.5rem]'}`}>
                    <div className="w-full flex justify-around  ">
                      {true && (
                        <div className="w-[45%] top-0  -left-[2rem] z-20 ">
                          <img src={LogoMTO} alt="Logo" className='w-[90%]  ml-2' />
                        </div>
                      )}
                      <div className="mt-2"></div>
                      <p className='text-[2.5rem] -mt-3 mb-2 mr-6'>{ot[EnumGrid.folio]}</p>
                    </div>

                    <div className="w-full flex justify-around !-mt-6 items-center">
                      {/* <h3>FECHA ATENCIÓN: {OT[EnumGrid.fecha_atencion]}</h3> */}
                      <div className="w-1/2 ml-4 mt-1 flex !text-sm">
                        <p className='font-bold'>F. ATENCIÓN:</p>&nbsp;
                        <p>{parsedDate(ot[EnumGrid.fecha_atencion])}</p>

                      </div>
                      <div className="w-1/2 mt-1 flex !text-sm">
                        <p className='font-bold'>F. ENTREGA:</p>&nbsp;
                        <p>{parsedDate(ot[EnumGrid.fecha_entrega_taller])}</p>
                      </div>
                    </div>
                  </div>



                  {ot[EnumGrid.motivo] === 'Garantía' && (
                    <div className="px-8 my-2 w-[21rem] mx-auto items-center relative">
                      <div className="flex justify-around">
                        <h1 className=' text-4xl mb-1'>G A R A N T I A</h1>
                      </div>
                      <div className="border-b-[1px] border-black w-[21rem] absolute right-2"></div>
                    </div>
                  )}

                  <div className="header -mt-2  w-[98%] !h-auto text-center2 border-black border-2 ml-4 mr-2 ">
                    <div className="-mt-2 border-black border-b-2 !h-[2.5rem] ">
                      <div className="px-8 ml-2 my-2 w-[100%] mx-auto items-center relative">
                        <div className="flex justify-around">
                          <p className='-ml-10 text-[0.80rem] w-[40%] font-bold'>Pto Vta:</p>
                          <p className='-ml-6 text-xs w-[60%]'></p>
                          <p className='!ml-6 text-sm  w-[80%] text-left right-0 absolute'> {ot[EnumGrid.punto_venta]}</p>
                        </div>
                        <div className="flex justify-around text-left -mt-2">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[5rem]'>Asesor Op:  </p>
                          <p className='!ml-[0.4rem] !top-[-5rem] !mt-2  text-sm text-left  w-[90%] '> {User["nombre"]}</p>
                        </div>
                      </div>
                    </div>

                    <div className=" border-black border-b-2">
                      <div className='px-8 ml-2  -mt-1 w-[100%] h-10  mx-auto relative '>
                        <div className="relative h-10">
                          <p className='!-ml-6 text-[0.80rem]  w-[100%] font-bold'>Proyecto:  </p>
                          <p className='!ml-16 text-base text-left left-[-5.5rem] bottom-0   absolute  w-[18rem]'> {ot[EnumGrid.proyecto_titulo]}</p>
                        </div>
                      </div>

                      <div className='px-8 ml-2 w-[100%] !h-auto   '>
                        <div className="!h-auto -mt-2">
                          <p className='-ml-6 text-[0.80rem] w-full font-bold'>Establecimiento:  </p>
                          <p className='-ml-6 text-base text-left left-[-3rem]  block h-auto w-[100%]  -mt-3 '> {ot[EnumGrid.rbd_establecimiento]} {ot[EnumGrid.establecimiento]} </p>
                        </div>
                      </div>


                      <div className='px-8 ml-2 my-2 w-[100%] !h-auto mx-auto  relative'>
                        <div className="relative !h-auto -mt-2">
                          <p className='-ml-6 text-[0.80rem] w-full font-bold'>Comuna:  </p>
                          <p className='ml-6 text-base text-left w-[90%] left-[1.5rem] top-[-0.1rem]   bottom-0 absolute '> {ot[EnumGrid.cliente_comuna]}</p>
                        </div>
                      </div>

                      <div className='px-8 ml-2 my-2 w-[100%] !h-auto mx-auto '>
                        <div className=" !h-auto -mt-2">
                          <p className='-ml-6 text-[0.80rem] w-full font-bold'>Despachar a:  </p>
                          {/* <p className='-ml-6 text-xs text-left w-[60%] left-[-3rem] bottom-0 absolute'></p> */}
                          <p className='-ml-6 text-base text-left w-[20rem] left-[-3rem] block h-auto  -mt-2   right-0 '> {ot[EnumGrid.lugar_despacho]}</p>
                        </div>
                      </div>

                    </div>






                    <div className="header text-center2    w-[100%] text-center mt-2 ">
                      {/* <h1 className='w-[60%] !-ml-4'>Datos Beneficiario: </h1> */}

                      <div className="px-8 my-2 w-[100%] mx-auto items-center">
                        <div className="flex justify-around text-left !ml-[-2rem] items-center !-mt-2 w-[23rem] !h-auto ">
                          <p className='ml-3 text-[0.80rem] w-[25%]  font-bold'>Beneficiario:  </p>
                          <p className=' text-left text-xs !h-auto !w-[20rem] '>{ot[EnumGrid.cliente_nomnbre]}</p>
                        </div>
                        <div className="border-b-[1px] border-black w-[72%] -bottom-1 absolute right-0"></div>
                      </div>


                      <div className=" w-full flex justify-between !mt-2 ml-2 ">
                        <div className=' w-[40%] text-center items-center'>
                          <div className="flex justify-around">
                            <p className='-ml-2 text-xs font-bold w-[40%] mt-[0.04rem] '>Rut:  </p>
                            <p className=' text-sm text-left  w-[8rem]'> {ot[EnumGrid.cliente_rut]}</p>
                          </div>
                        </div>
                        <div className=' w-[49%]  !mr-4'>
                          <div className="flex text-left">
                            <p className='text-[0.80rem] font-bold'>Teléfono:  </p>
                            <p className='text-sm ml-1 '> {ot[EnumGrid.cliente_telefono]}</p>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>


                  <div className="w-[110%] flex justify-between -ml-6 -mt-1 ">
                    <div className="w-[40%]  items-center flex">
                      <h1 className='font-bold ml-12 '>A1</h1>
                      <span className='ml-1  !text-[0.70rem] font-bold '>ALT: {ot[EnumGrid.a1_alt]}</span>
                      <span className='ml-1  !text-[0.70rem] font-bold '>DP:  {ot[EnumGrid.a1_dp]}</span>

                    </div>

                    <div className="w-[40%] items-center flex">
                      <h1 className='font-bold '>A2</h1>
                      <span className='ml-4  !text-[0.70rem] font-bold '>DP:  {ot[EnumGrid.a2_dp]}</span>
                    </div>
                  </div>



                  <div className="w-[105%] flex justify-around  ml-2 border-b-2  h-[4rem]  border-black">
                    <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[47%]  h-[4rem] ">
                      <div className="text-center h-2 mr-2"></div>
                      <div className="text-center h-2 w-6 -ml-2 font-bold">ESF</div>
                      <div className="text-center h-2 w-6 -ml-2 font-bold">CIL</div>
                      <div className="text-center h-2 w-6 -ml-2 font-bold">EJE</div>
                      <div className="text-center h-2 w-6 -ml-[0.80rem] font-bold ">AD</div>
                      <div className="text-center h-2 mt-1 text-xs font-bold">OD</div>


                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-2">{ot[EnumGrid.a1_od_esf]}</div>
                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-2">{ot[EnumGrid.a1_od_cil]}</div>
                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-2">{ot[EnumGrid.a1_od_eje]}</div>
                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-[0.80rem]">{ot[EnumGrid.a1_od_ad]}</div>
                      <div className="text-center text-xs mt-2 font-bold">OI</div>
                      <div className="text-center h-6 mt-2 text-[0.75rem] !-ml-2">{ot[EnumGrid.a1_oi_esf]}</div>
                      <div className="text-center h-6 mt-2 text-[0.75rem] !-ml-2">{ot[EnumGrid.a1_oi_cil]}</div>
                      <div className="text-center h-6 mt-2 text-[0.75rem] !-ml-2">{ot[EnumGrid.a1_oi_eje]}</div>
                      <div className="text-center h-6 mt-2 text-[0.75rem] !-ml-[0.80rem]">{ot[EnumGrid.a1_oi_ad]}</div>
                      <div className="text-center h-6 flex w-20 mt-7"> <label className='mr-2 -mt-4 !text-[0.80rem] font-bold '></label></div>
                      <div className="text-center h-6 flex w-20 ml-8 mt-7 text-xs ">  <label className='mr-2 -mt-4 !text-[0.80rem] font-bold'></label></div>
                    </div>

                    <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[46.3%] h-[4rem] border-black border-l-[1px]  !mr-2">
                      <div className=" text-center h-2"></div>
                      <div className="text-center h-2 w-6 -ml-2 font-bold ">ESF</div>
                      <div className="text-center h-2 w-6 -ml-2 font-bold pl-2">CIL</div>
                      <div className="text-center h-2 w-6 -ml-2 font-bold pl-2">EJE</div>
                      <div className="text-center h-2 w-6 -ml-2 font-bold"> </div>
                      <div className="text-center h-2 text-xs -mt-2 font-bold ml-1"></div>


                      <div className="text-center h-6  text-[0.75rem] !-ml-2">{ot[EnumGrid.a2_od_esf]}</div>
                      <div className="text-center h-6  text-[0.75rem] !-ml-2">{ot[EnumGrid.a2_od_cil]}</div>
                      <div className="text-center h-6  text-[0.75rem] !-ml-2">{ot[EnumGrid.a2_od_eje]}</div>
                      <div className="text-center h-6  text-[0.75rem] !-ml-2"> </div>
                      <div className="text-center text-xs -mt-4 font-bold ml-1"></div>
                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-2">{ot[EnumGrid.a2_oi_esf]}</div>
                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-2">{ot[EnumGrid.a2_oi_cil]}</div>
                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-2">{ot[EnumGrid.a2_oi_eje]}</div>
                      <div className="text-center h-6 mt-1 text-[0.75rem] !-ml-2"> </div>
                      <div className="text-center h-6 flex w-20 -!mt-2"> <label className='ml-4 mt-2 !text-[0.8rem] font-bold pl-2'></label></div>
                    </div>
                  </div>


                  <div className='w-[110%] flex justify-between border-b-2 border-black '>
                    <div className="w-[47%] ml-2 ">
                      <div className='flex text-left ml-2 w-[90%] gap-4'>
                        <h1 className=' w-[5%]  font-bold'>OD: </h1>&nbsp;
                        <p className='-ml-3'>{ot[EnumGrid.cristal1_od]}</p>
                      </div>
                      <div className='flex mt-1 text-left ml-2 w-[90%] gap-4'>
                        <h1 className=' w-[5%] font-bold'>OI: </h1>&nbsp;
                        <p className='-ml-4'>{ot[EnumGrid.cristal1_oi]}</p>
                      </div>

                      <div className='ml-2 w-full'>
                        <p className='text-sm'>
                          {ot[EnumGrid.cristal1_marca]}, &nbsp;{ot[EnumGrid.cristal1_diseno]},&nbsp;{ot[EnumGrid.cristal1_indice]},
                          &nbsp;{ot[EnumGrid.cristal1_material]}, &nbsp;{ot[EnumGrid.cristal1_color]},&nbsp;{ot[EnumGrid.cristal1_tratamiento]},
                          &nbsp;{ot[EnumGrid.cristal1_diametro]} {ot[EnumGrid.cristal1_tratamiento_adicional] && (
                            <>
                              <span className='font-bold'>
                                Trat. Adic:
                              </span>
                              &nbsp;{ot[EnumGrid.cristal1_tratamiento_adicional]}
                            </>
                          )}

                        </p>
                      </div>
                    </div>


                    <div className="w-[49.8%] border-l-[1px] border-black  ">
                      <div className='flex  w-[90%] ml-2   text-left gap-4'>
                        <h1 className=' w-[5%] font-bold'>OD: </h1>&nbsp;
                        <p className='-ml-3'>{ot[EnumGrid.cristal2_od]}</p>
                      </div>
                      <div className='mr-4 mt-2 flex text-left ml-2 w-[90%] gap-4'>
                        <h1 className='w-[5%] font-bold'>OI:&nbsp;</h1>
                        <p className=''>{ot[EnumGrid.cristal2_oi]}</p>
                      </div>

                      <div className=''>
                        <p className='text-sm'>
                          {ot[EnumGrid.cristal2_od] && (
                            <>
                              {ot[EnumGrid.cristal2_marca]},&nbsp; {ot[EnumGrid.cristal2_diseno]}, &nbsp;{ot[EnumGrid.cristal2_indice]},
                              &nbsp;{ot[EnumGrid.cristal2_material]},&nbsp; {ot[EnumGrid.cristal2_color]}, &nbsp;{ot[EnumGrid.cristal2_tratamiento]},
                              &nbsp;{ot[EnumGrid.cristal2_diametro]},&nbsp; {ot[EnumGrid.cristal2_tratamiento_adicional] && (
                                <>
                                  <span className='font-bold'>
                                    Trat. Adic:
                                  </span>
                                  {ot[EnumGrid.cristal2_tratamiento_adicional]}
                                </>
                              )}
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                  </div>



                  <div className="w-[110%] flex border-black border-b-[1px] justify-between">

                    <div className="w-[46%] ">
                      <div className="flex">
                        <h1 className='font-bold ml-4'>A1: </h1>&nbsp;
                        <p className=' text-center'>{ot[EnumGrid.a1_armazon_id]}</p>
                      </div>
                      <p className="text-sm ml-4">
                        {ot[EnumGrid.a1_armazon]}
                      </p>
                    </div>

                    <div className="w-[49.9%] border-l-[1px]  border-black">
                      <div className="flex">
                        <h1 className='font-bold ml-4'>A2:</h1>&nbsp;
                        <p className=' text-center'>{ot[EnumGrid.a2_armazon_id]}</p>
                      </div>
                      <p className="text-sm ml-2">
                        {ot[EnumGrid.a2_armazon]}
                      </p>
                    </div>
                  </div>


                  <div className='mt-2 ml-4 border-2 border-black'>
                    {ot[EnumGrid.fecha_receta] && (

                      <div className='flex w-full'>
                        <p className='ml-2 font-bold'>N. Receta:</p>
                        <p className='ml-4'>{parsedDate(ot[EnumGrid.numero_receta])}</p>
                      </div>
                    )}

                    {(ot[EnumGrid.observaciones] && ot[EnumGrid.observaciones].trim() !== '') && (
                      <div className="flex w-full">
                        <p className='ml-2'>{ot[EnumGrid.observaciones]}</p>
                      </div>
                    )}

                  </div>
                  {ot[EnumGrid.imprime_ticket] === 1 && (
                    <div className="!mt-[50rem] ">
                      <FOTTicketImpresion/>
                    </div>
                  )}

                  {ot[EnumGrid.imprime_qr] === 1 && (
                    <div className="!mt-[50rem]">
                      <FOTTicketQRImpresion/>
                    </div>
                  )}

                </div>
              )
            })}
          </div>
        ) : (

          //? IMPRESION INDIVIDUAL
          <div ref={ref} className={`flex flex-col !h-[50rem] `}>
            <div className='w-[90%] !h-auto'>
              <div className="w-[100%] relative  !h-[9%] mb-4">
                <div className="w-[90%] mr-7  mx-auto">
                  <Barcode marginLeft={45} height={25} width={2.5} textAlign='right' value={formatNumberWithZeros(OT[0] && OT[0][EnumGrid.folio])} />
                  <h3 className={`absolute bottom-2 left-10 mt-2`}>{fechaHoraFormateada}</h3>
                </div>
              </div>

              {/*************** E N C A B E Z A D O ***************/}
              <div className={`header  w-[110%] text-center -mt-4`}>
                <div className="w-full flex justify-around  ">
                  {true && (
                    <div className="w-[45%] top-0  -left-[2rem] z-20 ">
                      <img src={LogoMTO} alt="Logo" className='w-[90%]  ml-2' />
                    </div>
                  )}
                  <div className="mt-2"></div>
                  <p className='text-[2rem] -mt-3 mr-6'>{OT[0] && OT[0][EnumGrid.folio]}</p>
                </div>
              </div>

              {/*************** F E C H A S ***************/}
              <div className='w-[100%] flex justify-between -mt-4 ml-3'>
                <div className="w-1/2">
                  <span className='text-xs font-bold'>ATENCIÓN:</span>&nbsp;
                  <span className='text-xs '>{OT[0]?.[EnumGrid.fecha_atencion]}</span>
                </div>

                <div className="w-1/2">
                  <span className='text-xs font-bold'>ENTREGA:</span>&nbsp;
                  <span className='text-xs '>{OT[0]?.[EnumGrid.fecha_entrega_taller]}</span>
                </div>
              </div>

              {/*************** C L I E N T E ***************/}
              <div className="header mt-1 w-[100%] !h-auto text-center2 border-black border-2 ml-3">
                <div className="-mt-2 border-black border-b-2 !h-auto">
                  <div className="px-8 ml-2 my-2 w-[100%] mx-auto">
                    <div className="flex text-left">
                      <p className='-ml-6 text-[0.80rem] w-[25%]  font-bold'>Pto Vta:</p>
                      <p className=' text-left text-sm '>{OT[0] && OT[0][EnumGrid.punto_venta]}</p>
                    </div>
                    <div className="flex text-left -mt-2">
                      <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Asesor: </p>
                      <p className=' text-left text-sm  !mt-2'>{User["nombre"]}</p>
                    </div>
                    <div className="flex text-left -mt-2">
                      <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Cliente: </p>
                      <p className=' text-left text-sm !mt-2'>{OT[0] && OT[0][EnumGrid.cliente_nomnbre]}</p>
                    </div>
                    <div className="flex text-left -mt-2">
                      <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>RUT: </p>
                      <p className=' text-left text-sm !mt-2'>{OT[0] && OT[0][EnumGrid.cliente_rut]}</p>
                      <span className='text-[0.80rem] !mt-2 font-bold'>&nbsp;&nbsp;&nbsp;CEL: </span>
                      <span className=' text-left text-sm !mt-2'>{OT[0] && OT[0][EnumGrid.cliente_telefono]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/*************** G A R A N T I A ***************/}
              {OT[0] && OT[0][EnumGrid.motivo] === 'Garantía' && (
                <div className="px-8 my-2 w-[21rem] mx-auto items-center relative">
                  <div className="flex justify-around">
                    <h1 className=' text-4xl'>G A R A N T Í A</h1>
                  </div>
                  {/* <div className="border-b-[1px] border-black w-[21rem] absolute right-2"></div> */}
                </div>
              )}

              {/*************** A R M A Z O N E S ***************/}
              <div className="w-[100%] flex mt-1 justify-between border-b-2 border-black">
                <div className="w-[55%] ml-2 border-r-2 border-black pr-2">
                  <div className="ml-2 otSpanLine">
                    {/* <h1 className='font-bold ml-4'>A1:</h1>&nbsp;
                    <p className=' text-left'>{OT[0] && OT[0][EnumGrid.a1_armazon_id]}</p> */}
                    <span className=' '><span className='font-bold'></span>{OT[0] && OT[0][EnumGrid.a1_armazon_id]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.a1_armazon]}</span>
                  </div>
                  {/* <p className="text-sm ml-4 -mt-1">
                    {OT[0] && OT[0][EnumGrid.a1_armazon]}
                  </p> */}
                </div>

                <div className="w-[45%] ml-1">
                  <div className="otSpanLine">
                    {/* <h1 className='font-bold '>A2:</h1>&nbsp;
                    <p className=' text-left'>{OT[0] && OT[0][EnumGrid.a2_armazon_id]}</p> */}
                    <span className=' '><span className='font-bold'></span>{OT[0] && OT[0][EnumGrid.a2_armazon_id]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.a2_armazon]}</span>
                  </div>
                  {/* <p className="text-sm ml-2 -mt-1">
                    {OT[0] && OT[0][EnumGrid.a2_armazon]}
                  </p> */}
                </div>
              </div>

              {/*************** C R I S T A L E S ***************/}
              <div className='w-[100%] flex mt-1 justify-between border-b-2 border-black'>
                <div className="w-60%] ml-2 border-r-2 border-black pr-2">
                  <div className='ml-2 otSpanLine'>
                    <span className='!text-lg '><span className='font-bold'>D:</span>{OT[0] && OT[0][EnumGrid.cristal1_od]}</span><br/>
                    <span className='!text-lg '><span className='font-bold'>I:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_oi]}</span><br/>
                    <span className=' '><span className='font-bold'>Mar:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_marca]}</span><br/>
                    <span className=' '><span className='font-bold'>Dis:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_diseno]}</span><br/>
                    <span className=' '><span className='font-bold'>Índ:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_indice]}</span><br/>
                    <span className=' '><span className='font-bold'>Mat:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_material]}</span><br/>
                    <span className=' '><span className='font-bold'>Col:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_color]}</span><br/>
                    <span className=' '><span className='font-bold'>Trat:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_tratamiento]}</span><br/>
                    <span className=' '><span className='font-bold'>Diam:</span>&nbsp;{OT[0] && OT[0][EnumGrid.cristal1_diametro]}</span>
                    <br/>{OT[0] && OT[0][EnumGrid.cristal1_tratamiento_adicional] && (
                        <>
                          <span className=' font-bold'>Trat. Adic:</span>&nbsp;
                          <span className='text-xl font-bold'>{OT[0] && OT[0][EnumGrid.cristal1_tratamiento_adicional]}</span>
                        </>
                      )}
                  </div>
                </div>

                <div className="w-[40%] ml-1">
                  <div className='otSpanLine'>
                    <span className='!text-lg '>{OT[0] && OT[0][EnumGrid.cristal2_od]}</span><br/>
                    <span className='!text-lg '>{OT[0] && OT[0][EnumGrid.cristal2_oi]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.cristal2_marca]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.cristal2_diseno]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.cristal2_indice]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.cristal2_material]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.cristal2_color]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.cristal2_tratamiento]}</span><br/>
                    <span className=' '>{OT[0] && OT[0][EnumGrid.cristal2_diametro]}</span>
                    <br/>{OT[0] && OT[0][EnumGrid.cristal2_tratamiento_adicional] && (
                        <>
                          <span className='text-xl font-bold'>{OT[0] && OT[0][EnumGrid.cristal2_tratamiento_adicional]}</span>
                        </>
                      )}
                  </div>
                </div>
              </div>

              {/*************** D I O P T R I A ***************/}
              <div className="w-[100%] flex justify-around ml-2 !h-auto pb-3 mt-4">
                <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[60%]  h-[4rem] ">
                  <div className="text-center h-2 mr-2"></div>
                  <div className="text-center text-base h-2 w-5 !-mt-2 -ml-2 font-bold">ESF</div>
                  <div className="text-center text-base h-2 w-5 !-mt-2 -ml-1 font-bold">CIL</div>
                  <div className="text-center text-base h-2 w-5 !-mt-2 -ml-1 font-bold">EJE</div>
                  <div className="text-center text-base h-2 w-5 -ml-[0.30rem] -mt-2 font-bold">AD</div>

                  <div className="text-center h-2 mt-1 text-sm font-bold">D</div>
                  <div className="text-right h-6  text-lg !mr-[10rem]">{OT[0] && OT[0][EnumGrid.a1_od_esf]}</div>
                  <div className="text-right h-6  text-lg !mr-4.5">{OT[0] && OT[0][EnumGrid.a1_od_cil]}</div>
                  <div className="text-right h-6  text-lg !mr-1">{OT[0] && OT[0][EnumGrid.a1_od_eje]}</div>
                  <div className="text-right h-6  text-lg !mr-1">{OT[0] && parseInt(OT[0][EnumGrid.a1_od_ad])}</div>

                  <div className="text-center text-sm mt-4 font-bold">I</div>
                  <div className="text-center h-6 mt-3 text-lg !-ml-3">{OT[0] && OT[0][EnumGrid.a1_oi_esf]}</div>
                  <div className="text-center h-6 mt-3 text-lg !-ml-1">{OT[0] && OT[0][EnumGrid.a1_oi_cil]}</div>
                  <div className="text-center h-6 mt-3 text-lg !ml-2">{OT[0] && OT[0][EnumGrid.a1_oi_eje]}</div>
                  <div className="text-center h-6 mt-3 text-lg !ml-1">{OT[0] && parseInt(OT[0][EnumGrid.a1_oi_ad])}</div>
                  <div className="text-center h-6 flex w-20 mt-7"> <label className='mr-2 -mt-4 !text-[0.80rem] font-bold '></label></div>
                  <div className="text-center h-6 flex w-20 ml-8 mt-7 text-xs ">  <label className='mr-2 -mt-4 !text-[0.80rem] font-bold'></label></div>
                </div>

                <div className="grid grid-cols-3 grid-rows-3 gap-4 text-xs w-[40%] h-[4rem] border-black border-l-[2px]  !mr-2">
                  <div className="text-center text-base h-2 w-5 !ml-3 font-bold !-mt-2">ESF</div>
                  <div className="text-center text-base h-2 w-5 !ml-3 font-bold !-mt-2 pl-1">CIL</div>
                  <div className="text-center text-base h-2 w-5 !ml-1 font-bold !-mt-2 ">EJE</div>

                  <div className="text-center h-6  text-lg ml-2 !-mt-1">{OT[0] && OT[0][EnumGrid.a2_od_esf]}</div>
                  <div className="text-center h-6  text-lg ml-2 !-mt-1">{OT[0] && OT[0][EnumGrid.a2_od_cil]}</div>
                  <div className="text-center h-6  text-lg ml-2 !-mt-1">{OT[0] && OT[0][EnumGrid.a2_od_eje]}</div>
                  <div className="text-center h-6  text-base !-ml-2"> </div>
                  <div className="text-center text-xs -mt-4 font-bold ml-1"></div>
                  <div className="text-center h-6 !mt-[0.30rem] text-lg ml-2">{OT[0] && OT[0][EnumGrid.a2_oi_eje]}</div> 
                  <div className="text-center h-6 !-mt-2 text-lg ml-2 ">{OT[0] && OT[0][EnumGrid.a2_oi_esf]}</div>
                  <div className="text-center h-6 !-mt-2 text-lg ml-2">{OT[0] && OT[0][EnumGrid.a2_oi_cil]}</div> 

                  <div className="text-center h-6 mt-1 text-sm !-ml-2"> </div>
                  <div className="text-center h-6 flex w-20 -!mt-2"> <label className='ml-4 mt-2 !text-[0.8rem] font-bold pl-2'></label></div>
                </div>
              </div>

              {/* <div className="w-[100%] flex justify-around ml-2 !h-auto pb-3 mt-4">
                <div className="grid grid-cols-5 grid-rows-3 gap-4 text-xs w-[55%]  h-[4rem] ">
                  <div className="text-center h-2 mr-2"></div>
                  <div className="text-center text-base h-2 w-5 !-mt-2 -ml-2 font-bold">ESF</div>
                  <div className="text-center text-base h-2 w-5 !-mt-2 -ml-1 font-bold">CIL</div>
                  <div className="text-center text-base h-2 w-5 !-mt-2 -ml-1 font-bold">EJE</div>
                  <div className="text-center text-base h-2 w-5 -ml-[0.30rem] -mt-2 font-bold">AD</div>

                  <div className="text-center h-2 mt-1 text-sm font-bold">D</div>
                  <div className="text-center h-6  text-lg !-ml-3">{OT[0] && OT[0][EnumGrid.a1_od_esf]}</div>
                  <div className="text-center h-6  text-lg !-ml-1">{OT[0] && OT[0][EnumGrid.a1_od_cil]}</div>
                  <div className="text-center h-6  text-lg !ml-2">{OT[0] && OT[0][EnumGrid.a1_od_eje]}</div>
                  <div className="text-center h-6  text-lg !ml-1">{OT[0] && parseInt(OT[0][EnumGrid.a1_od_ad])}</div>

                  <div className="text-center text-sm mt-4 font-bold">I</div>
                  <div className="text-center h-6 mt-3 text-lg !-ml-3">{OT[0] && OT[0][EnumGrid.a1_oi_esf]}</div>
                  <div className="text-center h-6 mt-3 text-lg !-ml-1">{OT[0] && OT[0][EnumGrid.a1_oi_cil]}</div>
                  <div className="text-center h-6 mt-3 text-lg !ml-2">{OT[0] && OT[0][EnumGrid.a1_oi_eje]}</div>
                  <div className="text-center h-6 mt-3 text-lg !ml-1">{OT[0] && parseInt(OT[0][EnumGrid.a1_oi_ad])}</div>
                  <div className="text-center h-6 flex w-20 mt-7"> <label className='mr-2 -mt-4 !text-[0.80rem] font-bold '></label></div>
                  <div className="text-center h-6 flex w-20 ml-8 mt-7 text-xs ">  <label className='mr-2 -mt-4 !text-[0.80rem] font-bold'></label></div>
                </div>

                <div className="grid grid-cols-3 grid-rows-3 gap-4 text-xs w-[45%] h-[4rem] border-black border-l-[2px]  !mr-2">
                  <div className="text-center text-base h-2 w-5 !ml-3 font-bold !-mt-2">ESF</div>
                  <div className="text-center text-base h-2 w-5 !ml-3 font-bold !-mt-2 pl-1">CIL</div>
                  <div className="text-center text-base h-2 w-5 !ml-1 font-bold !-mt-2 ">EJE</div>

                  <div className="text-center h-6  text-lg ml-2 !-mt-1">{OT[0] && OT[0][EnumGrid.a2_od_esf]}</div>
                  <div className="text-center h-6  text-lg ml-2 !-mt-1">{OT[0] && OT[0][EnumGrid.a2_od_cil]}</div>
                  <div className="text-center h-6  text-lg ml-2 !-mt-1">{OT[0] && OT[0][EnumGrid.a2_od_eje]}</div>
                  <div className="text-center h-6  text-base !-ml-2"> </div>
                  <div className="text-center text-xs -mt-4 font-bold ml-1"></div>
                  <div className="text-center h-6 !mt-[0.30rem] text-lg ml-2">{OT[0] && OT[0][EnumGrid.a2_oi_eje]}</div> 
                  <div className="text-center h-6 !-mt-2 text-lg ml-2 ">{OT[0] && OT[0][EnumGrid.a2_oi_esf]}</div>
                  <div className="text-center h-6 !-mt-2 text-lg ml-2">{OT[0] && OT[0][EnumGrid.a2_oi_cil]}</div> 

                  <div className="text-center h-6 mt-1 text-sm !-ml-2"> </div>
                  <div className="text-center h-6 flex w-20 -!mt-2"> <label className='ml-4 mt-2 !text-[0.8rem] font-bold pl-2'></label></div>
                </div>
              </div> */}

              {/*************** A L T U R A  -  D P ***************/}
              <div className="w-[100%] flex -mt-2 justify-between ">
                <div className="w-[55%] ml-2 items-center flex">
                  {/* <h1 className='font-bold ml-1 '>A1</h1> */}
                  <span className='ml-1  !text-base font-bold '>&nbsp;ALT: {OT[0] && OT[0][EnumGrid.a1_alt]}</span>
                  <span className='ml-3  !text-base font-bold '>&nbsp;DP: {OT[0] && OT[0][EnumGrid.a1_dp]}</span>
                </div>

                <div className="w-[45%] items-center flex ml-2 border-black border-l-[2px]">
                  {/* <h1 className='font-bold '>A2</h1> */}
                  <span className='ml-4  !text-base font-bold '>&nbsp;DP: {OT[0] && OT[0][EnumGrid.a2_dp]}</span>
                </div>
              </div>

              {/*************** D E S P A C H O ***************/}
              <div className="header mt-1 w-[100%] !h-auto text-center2 border-black border-2 ml-3">
                <div className="-mt-2 border-black border-b-2 !h-auto">
                  <div className="px-8 ml-2 my-2 w-[100%] mx-auto">
                    <div className="flex text-left">
                      <p className='-ml-6 text-[0.80rem] w-[25%]  font-bold'>Proyecto: </p>
                      <p className=' text-left text-sm '>{OT[0] && OT[0][EnumGrid.proyecto_titulo]}</p>
                    </div>
                    <div className="flex text-left -mt-2">
                      <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Estab: </p>
                      <p className=' text-left text-sm  !mt-2'>{OT[0] && OT[0][EnumGrid.rbd_establecimiento]} {OT[0] && OT[0][EnumGrid.establecimiento]}</p>
                    </div>
                    <div className="flex text-left -mt-2">
                      <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Comuna: </p>
                      <p className=' text-left text-sm !mt-2'>{OT[0] && OT[0][EnumGrid.cliente_comuna]}</p>
                    </div>
                    <div className="flex text-left -mt-2">
                      <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Destino: </p>
                      <p className=' text-left text-sm !mt-2'>{OT[0] && OT[0][EnumGrid.lugar_despacho]}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/*************** O B S E R V A C I O N E S ***************/}
              {OT[0] && OT[0][EnumGrid.numero_receta] && (
                <div className='mt-2 ml-4 border-1 border-black'>
                  <div className='flex w-full'>
                    <span className='ml-2 font-bold'>N° Receta:&nbsp;</span>
                    <span className='ml-4'>{OT[0] && OT[0][EnumGrid.numero_receta]}</span>
                    {/* <p className='ml-4'>{parsedDate(OT[0] && OT[0][EnumGrid.numero_receta])}</p> */}
                  </div>
                </div>
              )}

              {OT[0] && (OT[0][EnumGrid.observaciones] && OT[0][EnumGrid.observaciones].trim() !== '') && (
                <div className='mt-2 ml-4 border-1 border-black'>
                  <div className="flex w-full">
                    <span className='ml-2 font-bold'>NOTAS:&nbsp;</span>
                    <span className='ml-2'>{OT[0] && OT[0][EnumGrid.observaciones]}</span>
                  </div>
                </div>
              )}
            </div>
          </div >
        )}
    </>
  );
});
// export default React.memo(FOTImpresa);
export default FOTImpresa

