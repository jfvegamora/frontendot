import React from 'react'
import { AppStore, useAppSelector } from '../../../redux/store';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import Barcode from 'react-barcode';

import { formatNumberWithZeros } from '../../utils';
import FOTTicketImpresion from './FOTTicketImpresion';
import FOTTicketQRImpresion from './FOTTicketQRImpresion';
import LogoImagenImpresion from '../../components/LogoImagenImpresion';

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
  const { impresionOT: OT } = useAppSelector((store: AppStore) => store.OTS);
  const User: any = useAppSelector((store: AppStore) => store.user);

  const { masivo } = props;


  const fechaHora = new Date();
  const hora = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const fecha = fechaHora.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const fechaHoraFormateada = `${hora} ${fecha}`;


  return (
    <>
      {masivo === true ?
        (
          <div ref={ref} className={`flex flex-col !h-auto`}>
            {OT && OT.map((ot: any, index: any) => {
              return (

                <div className={`!w-[90%] ${ot[EnumGrid.imprime_ticket] === 1 ? '!h-[180rem]' : '!h-[90rem]'}  ${((index > 0) && (ot[EnumGrid.imprime_ticket] === 1)) && '!-mt-[39rem]'}   ${(index > 0) && (ot[EnumGrid.imprime_ticket] === 0) && '!-mt-[19rem]'}`} key={ot[EnumGrid.folio]} >
                  <div className={`w-[100%] relative  ${ot[EnumGrid.imprime_ticket] === 1 ? '!h-[2.5%]' : '!h-[5%]'} mb-4`}>
                    <div className="w-[90%] mr-7  mx-auto">
                      <Barcode marginLeft={45} height={25} width={2.5} textAlign='right' value={formatNumberWithZeros(ot[EnumGrid.folio])} />
                      <h3 className={`absolute left-3 mt-2 bottom-2`}>{fechaHoraFormateada}</h3>
                    </div>
                  </div>

                  {/*************** E N C A B E Z A D O ***************/}
                  <div className={`header  w-[110%] text-center -mt-4`}>
                    <div className="w-full flex justify-around  ">
                      {true && (
                        <div className="w-[50%] -mt-[0.75rem] ml-2 z-20 ">
                          <LogoImagenImpresion imagen64={ot[EnumGrid.imagen_logo]} />
                        </div>
                      )}
                      <div className="mt-2"></div>
                      <p className='text-[2rem] -mt-3 mr-6'>{ot[EnumGrid.folio]}</p>
                    </div>
                  </div>

                  {/*************** F E C H A S ***************/}
                  <div className='w-[100%] flex justify-between -mt-[.5rem] ml-3'>
                    <div className="w-1/2">
                      <span className='text-xs font-bold'>ATENCIÓN:</span>&nbsp;
                      <span className='text-xs '>{ot[EnumGrid.fecha_atencion]}</span>
                    </div>

                    <div className="w-1/2">
                      <span className='text-xs font-bold'>ENTREGA:</span>&nbsp;
                      <span className='text-xs '>{ot[EnumGrid.fecha_entrega_taller]}</span>
                    </div>
                  </div>

                  {/*************** C L I E N T E ***************/}
                  <div className="header mt-1 w-[97%] !h-auto text-center2 border-black border-2 ml-3">
                    <div className="-mt-2 border-black border-b-2 !h-auto">
                      <div className="pl-6 ml-2 my-2 w-[100%] mx-auto">
                        <div className="flex text-left">
                          <p className='-ml-6 text-[0.80rem] w-[22%]  font-bold'>Pto Vta:</p>
                          <p className=' text-left text-sm '>{ot[EnumGrid.punto_venta]}</p>
                        </div>
                        <div className="flex text-left -mt-2">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[22%]'>Asesor: </p>
                          <p className=' text-left text-sm  !mt-2'>{User["nombre"]}</p>
                        </div>
                        <div className="flex text-left -mt-2">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[22%]'>Cliente: </p>
                          <p className=' text-left text-sm !mt-2'>{ot[EnumGrid.cliente_nomnbre]}</p>
                        </div>
                        <div className="flex text-left -mt-2">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[15%]'>RUT: </p>
                          <p className=' text-left text-sm !mt-2'>{ot[EnumGrid.cliente_rut]}</p>
                          <span className='text-[0.80rem] !mt-2 font-bold'>&nbsp;&nbsp;&nbsp;CEL: </span>
                          <span className=' text-left text-sm !mt-2'>{ot[EnumGrid.cliente_telefono]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*************** G A R A N T I A ***************/}
                  {ot[EnumGrid.motivo] === 'Garantía' && (
                    <div className="px-8 my-2 w-[21rem] mx-auto items-center relative">
                      <div className="flex justify-around">
                        <h1 className=' text-4xl'>G A R A N T Í A</h1>
                      </div>
                    </div>
                  )}

                  {/*************** A R M A Z O N E S ***************/}
                  <div className="w-[100%] flex mt-1 justify-between border-b-2 border-black">
                    <div className="w-[55%] ml-2 border-r-2 border-black pr-2">
                      <div className="ml-2  ">
                        <div className='otCod font-bold'>{ot[EnumGrid.a1_armazon_id]}</div>
                        <div className='otArmazonData'>{ot[EnumGrid.a1_armazon]}</div>
                      </div>
                    </div>

                    <div className="w-[45%] ml-1">
                      <div className="">
                        <div className='otCod font-bold'>{ot[EnumGrid.a2_armazon_id]}</div>
                        <div className='otArmazonData'>{ot[EnumGrid.a2_armazon]}</div>
                      </div>
                    </div>
                  </div>

                  {/*************** C R I S T A L E S ***************/}
                  <div className='w-[100%] flex mt-1 justify-between border-b-2 border-black'>
                    <div className="!w-[55%] ml-2 border-r-2 border-black pr-2">
                      <div className='ml-2 '>
                        <div className='otCod font-bold'>D:{ot[EnumGrid.cristal1_od]}</div>
                        <div className='otCod font-bold'>I:&nbsp;{ot[EnumGrid.cristal1_oi]}</div>
                        <div className='otCData '><span className='font-bold'>Mar:</span>&nbsp;{ot[EnumGrid.cristal1_marca]}</div>
                        <div className='otCData '><span className='font-bold'>Dis:</span>&nbsp;{ot[EnumGrid.cristal1_diseno]}</div>
                        <div className='otCData '><span className='font-bold'>Índ:</span>&nbsp;{ot[EnumGrid.cristal1_indice]}</div>
                        <div className='otCData '><span className='font-bold'>Mat:</span>&nbsp;{ot[EnumGrid.cristal1_material]}</div>
                        <div className='otCData '><span className='font-bold'>Col:</span>&nbsp;{ot[EnumGrid.cristal1_color]}</div>
                        <div className='otCData '><span className='font-bold'>Trat:</span>&nbsp;{ot[EnumGrid.cristal1_tratamiento]}</div>
                        <div className='otCData '><span className='font-bold'>Diam:</span>&nbsp;{ot[EnumGrid.cristal1_diametro]}</div>
                        {ot[EnumGrid.cristal1_tratamiento_adicional] && (
                          <>
                            <div className='otCData !mt-[-20px]'><span className='font-bold'>Trat. Adic:</span>&nbsp;<p className='font-bold text-[1.25rem] h-[1.25rem] inline-block'>{ot[EnumGrid.cristal1_tratamiento_adicional]}</p></div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="!w-[45%] ml-1">
                      <div className=''>
                        <div className='otCod font-bold'>{ot[EnumGrid.cristal2_od]}</div>
                        <div className='otCod font-bold'>{ot[EnumGrid.cristal2_oi]}</div>
                        <div className='otCData '>{ot[EnumGrid.cristal2_marca]}</div>
                        <div className='otCData '>{ot[EnumGrid.cristal2_diseno]}</div>
                        <div className='otCData '>{ot[EnumGrid.cristal2_indice]}</div>
                        <div className='otCData '>{ot[EnumGrid.cristal2_material]}</div>
                        <div className='otCData '>{ot[EnumGrid.cristal2_color]}</div>
                        <div className='otCData '>{ot[EnumGrid.cristal2_tratamiento]}</div>
                        <div className='otCData '>{ot[EnumGrid.cristal2_diametro]}</div>
                        {ot[EnumGrid.cristal2_tratamiento_adicional] && (
                          <>
                            <span className='text-[1.25rem] h-[1.25rem] font-bold'>{ot[EnumGrid.cristal2_tratamiento_adicional]}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/*************** D I O P T R I A ***************/}
                  <div className="!w-[100%] flex ml-2 !h-auto">
                    <div className="flex flex-col text-xs !w-[52%]">

                      <div className="w-full flex ml-3 otDioptriaTit">
                        <div className="  w-[25%] ">ESF</div>
                        <div className="  w-[25%] ">CIL</div>
                        <div className="  w-[20%] ">EJE</div>
                        <div className="  w-[20%] ">AD</div>
                      </div>

                      <div className="w-full flex ml-2 otDioptria">
                        <div className="text-right w-[25%] ">{ot[EnumGrid.a1_od_esf]}</div>
                        <div className="text-right w-[25%] ">{ot[EnumGrid.a1_od_cil]}</div>
                        <div className="text-center w-[20%] ">{ot[EnumGrid.a1_od_eje]}</div>
                        <div className="text-right w-[20%] ">{ot[EnumGrid.a1_od_ad]}</div>
                      </div>

                      <div className="w-full flex ml-2 otDioptria">
                        <div className="text-right w-[25%] ">{ot[EnumGrid.a1_oi_esf]}</div>
                        <div className="text-right w-[25%] ">{ot[EnumGrid.a1_oi_cil]}</div>
                        <div className="text-center w-[20%] ">{ot[EnumGrid.a1_oi_eje]}</div>
                        <div className="text-right w-[20%] ">{ot[EnumGrid.a1_oi_ad]}</div>
                      </div>
                    </div>

                    <div className="flex flex-col !w-[48%] border-black border-l-[2px]">

                        {ot[EnumGrid.tipo_anteojo_id] === 3 && (
                          <>
                          <div className="w-full flex ml-3 otDioptriaTit">
                            <div className="  w-[30%] ">ESF</div>
                            <div className="  w-[30%] ">CIL</div>
                            <div className="  w-[30%] ">EJE</div>
                          </div>
    
                          <div className="w-full flex ml-2 otDioptria">
                            <div className="w-[38%] ">{ot[EnumGrid.a2_od_esf]}</div>
                            <div className=" w-[38%] ">{ot[EnumGrid.a2_od_cil]}</div>
                            <div className="text-right  w-[15%]">{ot[EnumGrid.a2_od_eje]}</div>
                          </div>
    
                          <div className="w-full flex ml-2 otDioptria">
                            <div className=" w-[38%] ">{ot[EnumGrid.a2_oi_esf]}</div>
                            <div className=" w-[38%] ">{ot[EnumGrid.a2_oi_cil]}</div>
                            <div className="text-right  w-[15%] ">{ot[EnumGrid.a2_oi_eje]}</div>
                          </div>
                          </>
                        )}
                    
                    </div>
                  </div>

                  {/*************** A L T U R A  -  D P ***************/}
                  <div className="w-[100%] flex -mt-1 justify-between ">
                    <div className="w-[52.2%] ml-2 items-center flex">
                      <span className='ml-1  !text-base font-bold '>&nbsp;ALT: {ot[EnumGrid.a1_alt]}</span>
                      <span className='ml-3  !text-base font-bold '>&nbsp;DP: {ot[EnumGrid.a1_dp]}</span>
                    </div>

                    <div className="w-[47.8%] items-center flex ml-2 border-black border-l-[2px]">
                        {ot[EnumGrid.tipo_anteojo_id] === 3 && (
                          <span className='ml-4  !text-base font-bold '>&nbsp;DP: {ot[EnumGrid.a2_dp]}</span>
                        )}
                    </div>
                  </div>

                  {/*************** D E S P A C H O ***************/}
                  <div className="header mt-1 w-[97%] !h-auto text-center2 border-black border-2 ml-3">
                    <div className="-mt-2 border-black border-b-2 !h-auto">
                      <div className="pl-6 ml-2 my-2 w-[100%] mx-auto">
                        <div className="flex text-left ">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]'>Proyecto: </p>
                          {/* <span>{ot[EnumGrid.proyecto_titulo]}</span> */}
                          <p className=' text-left text-sm !mt-2'>{OT[0] && OT[0][EnumGrid.proyecto_titulo]}</p>
                        </div>
                        <div className="flex text-left -mt-2">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]'>Estab: </p>
                          <p className=' text-left text-sm  !mt-2'>{ot[EnumGrid.rbd_establecimiento]} {ot[EnumGrid.establecimiento]}</p>
                        </div>
                        <div className="flex text-left -mt-2">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]'>Comuna: </p>
                          <p className=' text-left text-sm !mt-2'>{ot[EnumGrid.cliente_comuna]}</p>
                        </div>
                        <div className="flex text-left -mt-2">
                          <p className='-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]'>Destino: </p>
                          <p className=' text-left text-sm !mt-2 font-bold'>{ot[EnumGrid.lugar_despacho]}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*************** O B S E R V A C I O N E S ***************/}
                  {(ot[EnumGrid.observaciones] && ot[EnumGrid.observaciones].trim() !== '') && (
                    <div className='mt-0 ml-4 border-1 border-black'>
                      <div className="flex w-full">
                        <span className='ml-2 font-bold'>NOTAS:&nbsp;</span>
                        <span className='ml-2'>{ot[EnumGrid.observaciones]}</span>
                      </div>
                    </div>
                  )}
                  {ot[EnumGrid.numero_receta] && (
                    <div className='-mt-[0.75rem] ml-4 border-1 border-black'>
                      <div className='flex w-full'>
                        <span className='ml-2 font-bold'>N° Receta:&nbsp;</span>
                        <span className=''>{ot[EnumGrid.numero_receta]}</span>
                        {/* <p className='ml-4'>{parsedDate(OT[0] && OT[0][EnumGrid.numero_receta])}</p> */}
                      </div>
                    </div>
                  )}

                  {ot[EnumGrid.imprime_ticket] === 1 && (
                    <div className="!mt-[50rem] ">
                      <FOTTicketImpresion />
                    </div>
                  )}

                  {ot[EnumGrid.imprime_qr] === 1 && (
                    <div className="!mt-[50rem]">
                      <FOTTicketQRImpresion />
                    </div>
                  )}

                </div>
              )
            })}
          </div>
        ) : (

          null
        )}
    </>




  )
});
export default FOTImpresa






