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


  const fechaHora  = new Date();
  const hora       = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const fecha      = fechaHora.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const fechaHoraFormateada = `${hora} ${fecha}`;
  
  
  return (
    <>
    {masivo === true ?
      (
        <div ref={ref} className={`flex flex-col !h-auto`}>
          {OT && OT.map((ot: any, index:any) => {
            return (
    
              <div className={`!w-[90%] ${ot[EnumGrid.imprime_ticket] === 1 ? '!h-[180rem]' : '!h-[90rem]'}  ${((index > 0) && (ot[EnumGrid.imprime_ticket] === 1))  && '!-mt-[39rem]'}   ${(index > 0 ) && (ot[EnumGrid.imprime_ticket] === 0) && '!-mt-[19rem]' }`} key={ot[EnumGrid.folio]} >
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
                        <div className="w-[45%] top-0  -left-[2rem] z-20 ">
                          <LogoImagenImpresion imagen64={ot[EnumGrid.imagen_logo]}/>
                        </div>
                      )}
                      <div className="mt-2"></div>
                      <p className='text-[2rem] -mt-3 mr-6'>{ot[EnumGrid.folio]}</p>
                    </div>
                  </div>
    
                {/*************** F E C H A S ***************/}
                  <div className='w-[100%] flex justify-between -mt-4 ml-3'>
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
                        <p className='-ml-6 text-[0.80rem] w-[25%]  font-bold'>Pto Vta:</p>
                        <p className=' text-left text-sm '>{ot[EnumGrid.punto_venta]}</p>
                      </div>
                      <div className="flex text-left -mt-2">
                        <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Asesor: </p>
                        <p className=' text-left text-sm  !mt-2'>{User["nombre"]}</p>
                      </div>
                      <div className="flex text-left -mt-2">
                        <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Cliente: </p>
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
                    <div className="ml-2 ">
                      <span className='otSpanLineA font-bold'>{ot[EnumGrid.a1_armazon_id]}</span><br/>
                      <span className='otSpanLineSM'>{ot[EnumGrid.a1_armazon]}</span>
                    </div>
                  </div>
        
                  <div className="w-[45%] ml-1">
                    <div className="">
                      <span className='otSpanLineA font-bold'>{ot[EnumGrid.a2_armazon_id]}</span><br/>
                      <span className='otSpanLineSM'>{ot[EnumGrid.a2_armazon]}</span>
                    </div>
                  </div>
                </div>


                  {/*************** C R I S T A L E S ***************/}
                  <div className='w-[100%] flex mt-1 justify-between border-b-2 border-black'>
                    <div className="!w-[55%] ml-2 border-r-2 border-black pr-2">
                      <div className='ml-2 '>
                        <span className='otSpanLineC font-bold'>D:{ot[EnumGrid.cristal1_od]}</span><br/>
                        <span className='otSpanLineC font-bold'>I:&nbsp;{ot[EnumGrid.cristal1_oi]}</span><br/>
                        <span className='otSpanLineSM !h-[0.8rem]'><span className='font-bold'>Mar:</span>&nbsp;{ot[EnumGrid.cristal1_marca]}</span><br/>
                        <span className='otSpanLineSM !h-[0.8rem]'><span className='font-bold'>Dis:</span>&nbsp;{ot[EnumGrid.cristal1_diseno]}</span><br/>
                        <span className='otSpanLineSM !h-[0.8rem]'><span className='font-bold'>Índ:</span>&nbsp;{ot[EnumGrid.cristal1_indice]}</span><br/>
                        <span className='otSpanLineSM !h-[0.8rem]'><span className='font-bold'>Mat:</span>&nbsp;{ot[EnumGrid.cristal1_material]}</span><br/>
                        <span className='otSpanLineSM !h-[0.8rem]'><span className='font-bold'>Col:</span>&nbsp;{ot[EnumGrid.cristal1_color]}</span><br/>
                        <span className='otSpanLineSM !h-[0.8rem]'><span className='font-bold'>Trat:</span>&nbsp;{ot[EnumGrid.cristal1_tratamiento]}</span><br/>
                        <span className='otSpanLineSM !h-[0.8rem]'><span className='font-bold'>Diam:</span>&nbsp;{ot[EnumGrid.cristal1_diametro]}</span>
                        <br/>{ot[EnumGrid.cristal1_tratamiento_adicional] && (
                            <>
                              <span className=' font-bold'>Trat. Adic:</span>&nbsp;
                              <span className='text-xl font-bold'>{ot[EnumGrid.cristal1_tratamiento_adicional]}</span>
                            </>
                          )}
                      </div>
                    </div>
          
                    <div className="!w-[45%] ml-1">
                      <div className=''>
                        <span className='otSpanLineC font-bold'>{ot[EnumGrid.cristal2_od]}</span><br/>
                        <span className='otSpanLineC font-bold'>{ot[EnumGrid.cristal2_oi]}</span><br/>
                        <span className='otSpanLineSM '>{ot[EnumGrid.cristal2_marca]}</span><br/>
                        <span className='otSpanLineSM '>{ot[EnumGrid.cristal2_diseno]}</span><br/>
                        <span className='otSpanLineSM '>{ot[EnumGrid.cristal2_indice]}</span><br/>
                        <span className='otSpanLineSM '>{ot[EnumGrid.cristal2_material]}</span><br/>
                        <span className='otSpanLineSM '>{ot[EnumGrid.cristal2_color]}</span><br/>
                        <span className='otSpanLineSM '>{ot[EnumGrid.cristal2_tratamiento]}</span><br/>
                        <span className='otSpanLineSM '>{ot[EnumGrid.cristal2_diametro]}</span>
                        <br/>{ot[EnumGrid.cristal2_tratamiento_adicional] && (
                            <>
                              <span className='text-xl font-bold'>{ot[EnumGrid.cristal2_tratamiento_adicional]}</span>
                            </>
                          )}
                      </div>
                    </div>
                  </div>


                           {/*************** D I O P T R I A ***************/}
    
                <div className="!w-[100%] flex ml-2 !h-auto">
                  <div className="flex flex-col text-xs !w-[55%]">
        
                    <div className="w-full flex !h-5 ml-3">
                      <div className="text-center text-base h-2 w-[23%] font-bold">ESF</div>
                      <div className="text-center text-base h-2 w-[23%] font-bold">CIL</div>
                      <div className="text-center text-base h-2 w-[23%] font-bold">EJE</div>
                      <div className="text-center text-base h-2 w-[23%] font-bold">AD</div>
                    </div>
        
                    <div className="w-full flex !h-5 ml-2">
                      <div className="otSpanLineC w-[28%] ">{ot[EnumGrid.a1_od_esf]}</div>
                      <div className="otSpanLineC w-[28%] ">{ot[EnumGrid.a1_od_cil]}</div>
                      <div className="text-right otSpanLineC w-[15%] ">{ot[EnumGrid.a1_od_eje]}</div>
                      <div className="text-right otSpanLineC w-[15%] ">{parseInt(ot[EnumGrid.a1_od_ad])}</div>
        
                    </div>
                    <div className="w-full flex !h-5 ml-2">
                      <div className="otSpanLineC w-[28%] ">{ot[EnumGrid.a1_oi_esf]}</div>
                      <div className="otSpanLineC w-[28%] ">{ot[EnumGrid.a1_oi_cil]}</div>
                      <div className="text-right otSpanLineC w-[15%] ">{ot[EnumGrid.a1_oi_eje]}</div>
                      <div className="text-right otSpanLineC w-[15%] ">{parseInt(ot[EnumGrid.a1_oi_ad])}</div>
                    </div>
        
                  </div>
        
                  <div className="flex flex-col text-xs !w-[45%] border-black border-l-[2px]">
        
                    <div className="w-full flex !h-5 ml-3">
                      <div className="text-center text-base h-2 w-[30%] font-bold">ESF</div>
                      <div className="text-center text-base h-2 w-[30%] font-bold">CIL</div>
                      <div className="text-center text-base h-2 w-[30%] font-bold">EJE</div>
                    </div>
        
                    <div className="w-full flex !h-5 ml-2">
                      <div className="otSpanLineC w-[38%] ">{ot[EnumGrid.a2_od_esf]}</div>
                      <div className="otSpanLineC w-[38%] ">{ot[EnumGrid.a2_od_cil]}</div>
                      <div className="text-right otSpanLineC w-[15%]">{ot[EnumGrid.a2_od_eje]}</div>
        
                    </div>
                      <div className="w-full flex !h-5 ml-2">
                      <div className="otSpanLineC w-[38%] ">{ot[EnumGrid.a2_oi_esf]}</div>
                      <div className="otSpanLineC w-[38%] ">{ot[EnumGrid.a2_oi_cil]}</div> 
                      <div className="text-right otSpanLineC w-[15%] ">{ot[EnumGrid.a2_oi_eje]}</div> 
                    </div>
        
                  </div>
                </div>
    
                   {/*************** A L T U R A  -  D P ***************/}
                <div className="w-[100%] flex -mt-2 justify-between ">
                  <div className="w-[56%] ml-2 items-center flex">
                    {/* <h1 className='font-bold ml-1 '>A1</h1> */}
                    <span className='ml-1  !text-base font-bold '>&nbsp;ALT: {ot[EnumGrid.a1_alt]}</span>
                    <span className='ml-3  !text-base font-bold '>&nbsp;DP: {ot[EnumGrid.a1_dp]}</span>
                  </div>
        
                  <div className="w-[45%] items-center flex ml-2 border-black border-l-[2px]">
                    {/* <h1 className='font-bold '>A2</h1> */}
                    <span className='ml-4  !text-base font-bold '>&nbsp;DP: {ot[EnumGrid.a2_dp]}</span>
                  </div>
                </div>
        
                {/*************** D E S P A C H O ***************/}
                <div className="header mt-1 w-[97%] !h-auto text-center2 border-black border-2 ml-3">
                  <div className="-mt-2 border-black border-b-2 !h-auto">
                    <div className="px-8 ml-2 my-2 w-[100%] mx-auto">
                      <div className="flex text-left ">
                        <p className='-ml-6 text-[0.80rem] w-[40%] font-bold'>Proyecto: </p><span>{ot[EnumGrid.proyecto_titulo]}</span>
                        {/* <p className=' text-left text-sm '>{OT[0] && OT[0][EnumGrid.proyecto_titulo]}</p> */}
                      </div>
                      <div className="flex text-left -mt-2">
                        <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Estab: </p>
                        <p className=' text-left text-sm  !mt-2'>{ot[EnumGrid.rbd_establecimiento]} {ot[EnumGrid.establecimiento]}</p>
                      </div>
                      <div className="flex text-left -mt-2">
                        <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Comuna: </p>
                        <p className=' text-left text-sm !mt-2'>{ot[EnumGrid.cliente_comuna]}</p>
                      </div>
                      <div className="flex text-left -mt-2">
                        <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[25%]'>Destino: </p>
                        <p className=' text-left text-sm !mt-2'>{ot[EnumGrid.lugar_despacho]}</p>
                      </div>
                    </div>
                  </div>
                </div>
        
                {/*************** O B S E R V A C I O N E S ***************/}
                {ot[EnumGrid.numero_receta] && (
                  <div className='mt-2 ml-4 border-1 border-black'>
                    <div className='flex w-full'>
                      <span className='ml-2 font-bold'>N° Receta:&nbsp;</span>
                      <span className='ml-4'>{ot[EnumGrid.numero_receta]}</span>
                      {/* <p className='ml-4'>{parsedDate(OT[0] && OT[0][EnumGrid.numero_receta])}</p> */}
                    </div>
                  </div>
                )}
        
                {(ot[EnumGrid.observaciones] && ot[EnumGrid.observaciones].trim() !== '') && (
                  <div className='mt-2 ml-4 border-1 border-black'>
                    <div className="flex w-full">
                      <span className='ml-2 font-bold'>NOTAS:&nbsp;</span>
                      <span className='ml-2'>{ot[EnumGrid.observaciones]}</span>
                    </div>
                  </div>
                )}




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
    
        null
      )}
    </>
    
    
    
    
  )
});
export default FOTImpresa






