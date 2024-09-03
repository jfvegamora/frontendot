import React from "react";
import { AppStore, useAppSelector } from "../../../redux/store";
import Barcode from "react-barcode";

import { formatNumberWithZeros } from "../../utils";
import FOTTicketImpresion from "./FOTTicketImpresion";
// import FOTTicketQRImpresion from './FOTTicketQRImpresion';
import LogoImagenImpresion from "../../components/LogoImagenImpresion";
import QRCode from "react-qr-code";

export enum EnumImpresion {
  folio = 0,
  motivo = 1,
  proyecto = 2,
  establecimiento = 3,
  cliente_rut = 4,
  cliente_nombre = 5,
  comuna = 6,
  cliente_telefono = 7,
  fecha_atencion = 8,
  fecha_entrega_taller = 9,
  fecha_entrega_cliente = 10,
  numero_receta = 11,
  tipo_anteojo_id = 12,
  tipo_anteojo = 13,
  a1_armazon_codigo = 14,
  a1_armazon_descripcion = 15,
  a2_armazon_codigo = 16,
  a2_armazon_descripcion = 17,
  cr1_diseño = 18,
  cr1_indice = 19,
  cr1_material = 20,
  cr1_tratamiento = 21,
  cr1_color = 22,
  cr1_od = 23,
  cr1_oi = 24,
  cr1_tratamiento_adicional = 25,
  cr2_diseño = 26,
  cr2_indice = 27,
  cr2_material = 28,
  cr2_tratamiento = 29,
  cr2_color = 30,
  cr2_od = 31,
  cr2_oi = 32,
  cr2_tratamiento_adicional = 33,
  numero_reporte_atencion = 34,
  observaciones = 35,
  nombre_logo = 36,
  imprime_qr = 37,
  imprime_ticket = 38,
  titulo_ticket_1 = 39,
  titulo_ticket_2 = 40,
  titulo_ticket_3 = 41,
  lugar_despacho = 42,
  a1_od_esf = 43,
  a1_od_cil = 44,
  a1_od_eje = 45,
  a1_od_ad = 46,
  a1_oi_esf = 47,
  a1_oi_cil = 48,
  a1_oi_eje = 49,
  a1_oi_ad = 50,
  a1_dp = 51,
  a1_alt = 52,
  a2_od_esf = 53,
  a2_od_cil = 54,
  a2_od_eje = 55,
  a2_oi_esf = 56,
  a2_oi_cil = 57,
  a2_oi_eje = 58,
  a2_dp = 59,
  a1_ubicacion = 60,
  a2_ubicacion = 61,
  cr1od_ubicacion = 62,
  cr1oi_ubicacion = 63,
  cr2od_ubicacion = 64,
  cr2oi_ubicacion = 65,

  rbd = 66,
  rbd_ubicacion = 67,
  rbd_cantidad = 68,
  rep_cantidad = 69,
  direccion_despacho = 70,
  opcion_montaje = 71,
  a3_armazon_codigo = 72,
  a3_armazon_descripcion = 73,
  a3_ubicacion = 74,

  imagen_logo = 75,
}

export const parsedDate = (date: string): any => {
  if (date) {
    const partesFecha = date.split("-"); // Divide la cadena en partes usando el guion como separador
    const año = partesFecha[0];
    const mes = partesFecha[1];
    const dia = partesFecha[2];
    return `${dia}-${mes}-${año}`;
  }
};

export const formatPlusDioptria = (dioptria: any) => {
  dioptria = parseFloat(dioptria);
  dioptria = dioptria.toFixed(2);
  if (dioptria > 0) {
    dioptria = "+" + dioptria.toString();
  } else {
    dioptria = dioptria.toString();
  }
  return dioptria;
};

const FOTImpresa = React.forwardRef((props: any, ref: any) => {
  // const [OT, setOT] = React.useState<any>();
  const { impresionOT: OT } = useAppSelector((store: AppStore) => store.OTS);

  const { masivo } = props;

  const fechaHora = new Date();
  const hora = fechaHora.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const fecha = fechaHora.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const fechaHoraFormateada = `${hora} ${fecha}`;

  return (
    <>
      {masivo === true ? (
        <div ref={ref} className={`flex flex-col flex-wrap !h-auto`}>
          {OT &&
            OT.map((list_ot: any) =>
              list_ot.map((ot: any) => {
                return (
                  // <div className={`!w-[90%] ${ot[EnumGrid.imprime_ticket] === 1 ? '!h-[180rem]' : '!h-[90rem]'}  ${((index > 0) && (ot[EnumGrid.imprime_ticket] === 1)) && '!-mt-[38rem]'}   ${(index > 0) && (ot[EnumGrid.imprime_ticket] === 0) && '!-mt-[19rem]'}`} key={ot[EnumGrid.folio]} >
                  <div
                    className={`!w-[90%]  ${
                      ot[EnumImpresion.imprime_ticket] === 1
                        ? "!h-[140.28rem]"
                        : "!h-[70.14rem]"
                    }`}
                    key={ot[EnumImpresion.folio]}
                  >
                    <div
                      className={`w-[100%] -mt-4  ${
                        ot[EnumImpresion.imprime_ticket] === 1
                          ? "!h-[3%]"
                          : "!h-[6.5%]"
                      } mb-4 `}
                    >
                      <div className="w-[90%] mr-7  mx-auto">
                        <Barcode
                          marginLeft={45}
                          height={25}
                          width={2.5}
                          textAlign="right"
                          value={formatNumberWithZeros(ot[EnumImpresion.folio])}
                        />
                        <h3
                          className={` translate-y-[-7.5vw] translate-x-[4vw] !z-50 bottom-4 text-xs `}
                        >
                          {fechaHoraFormateada}
                        </h3>
                      </div>
                    </div>

                    {/*************** E N C A B E Z A D O ***************/}
                    {/* <div className={`header  w-[110%] text-center -mt-4`}>
                      <div className="w-full flex justify-around  ">
                        {true && (
                          <div className="w-[50%] -mt-[0.75rem] ml-2 z-20 ">
                            <LogoImagenImpresion imagen64={ot[EnumImpresion.imagen_logo]} />
                          </div>
                        )}
                        <div className="mt-2"></div>
                        <p className='text-[2rem] -mt-3 mr-6'>{ot[0]}</p>
                      </div>
                    </div>   */}

                    {/*************** F E C H A S ***************/}
                    {/* <div className='w-[100%] flex justify-between -mt-[.5rem] ml-3'> */}
                    <div className="w-[100%] flex justify-between ml-3 translate-y-[-2vw] !-mt-7 mb-[-4vw] !z-50">
                      <div className="w-1/2">
                        <span className="text-xs font-bold">Atencón:</span>
                        &nbsp;
                        <span className="text-xs ">
                          {ot[EnumImpresion.fecha_atencion]}
                        </span>
                      </div>

                      <div className="w-1/2">
                        <span className="text-xs font-bold">Entrega:</span>
                        &nbsp;
                        <span className="text-xs ">
                          {ot[EnumImpresion.fecha_entrega_taller]}
                        </span>
                      </div>
                    </div>

                    {/*************** C L I E N T E ***************/}
                    <div className="header mt-1 w-[97%] !h-auto text-center2 border-black border-2 ml-3">
                      <div className="-mt-2 border-black border-b-2 !h-auto">
                        <div className="pl-6 ml-2 my-2 w-[100%] mx-auto">
                          {/* <div className="flex text-left">
                            <p className='-ml-6 text-[0.80rem] w-[22%]  font-bold'>Pto Vta:</p>
                            <p className=' text-left text-sm '>{ot[EnumGrid.punto_venta]}</p>
                          </div> */}
                          {/* <div className="flex text-left -mt-2">
                            <p className='-ml-6 text-[0.80rem] !mt-2 font-bold  w-[22%]'>Asesor: </p>
                            <p className=' text-left text-sm  !mt-2'>{User["nombre"]}</p>
                          </div> */}

                          <div className="flex text-left -mt-2">
                            <p className="-ml-6 text-[0.80rem] !mt-2 font-bold  w-[110%]">
                              Cliente:{" "}
                              <span className="font-normal">
                                {ot[EnumImpresion.cliente_nombre]}
                              </span>{" "}
                            </p>
                            {/* <p className=' text-left text-sm !mt-2'>{ot[EnumImpresion.cliente_nombre]}</p> */}
                          </div>
                          <div className="flex text-left -mt-2">
                            <p className="-ml-6 text-[0.80rem] !mt-2 font-bold  w-[15%]">
                              RUT:{" "}
                            </p>
                            <p className=" text-left text-sm !mt-2">
                              {ot[EnumImpresion.cliente_rut]}
                            </p>
                            <span className="text-[0.80rem] !mt-2 font-bold">
                              &nbsp;&nbsp;&nbsp;CEL:{" "}
                            </span>
                            <span className=" text-left text-sm !mt-2">
                              {ot[EnumImpresion.cliente_telefono]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*************** G A R A N T I A ***************/}
                    {ot[EnumImpresion.motivo] === "Garantía" && (
                      <div className="px-6 my-2 w-[21rem] mx-auto items-center relative">
                        <div className="flex justify-around">
                          {/* <h1 className=' text-4xl'>G A R A N T Í A</h1> */}
                          <h1 className=" text-3xl">P O S T - V E N T A</h1>
                        </div>
                      </div>
                    )}
                    {/*************** M O N T A J E ***************/}
                    {ot[EnumImpresion.opcion_montaje] === "0" && (
                      <div className="px-4 my-2 w-[21rem] mx-auto items-center relative">
                        <div className="flex justify-around">
                          <h1 className=" text-3xl">
                            S I N&nbsp;&nbsp;M O N T A J E
                          </h1>
                        </div>
                      </div>
                    )}

                    {/*************** A R M A Z O N E S ***************/}
                    <div className="w-[100%] flex mt-1 justify-between border-b-2 border-black !h-auto">
                      <div className="w-[55%] ml-2 border-r-2 border-black pr-2">
                        <div className="ml-2  ">
                          <div className="otCod font-bold">
                            {ot[EnumImpresion.a1_armazon_codigo]}
                          </div>
                          <div className="otArmazonData">
                            {ot[EnumImpresion.a1_armazon_descripcion]} /{" "}
                            {ot[EnumImpresion.a1_ubicacion]}
                          </div>
                          {/* {ot[EnumImpresion.a1_ubicacion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a1_ubicacion]}
                            </div>
                          )} */}
                        </div>
                      </div>

                      <div className="w-[45%] ml-1">
                        <div className="">
                          <div className="otCod font-bold">
                            {ot[EnumImpresion.a2_armazon_codigo]}
                          </div>
                          {ot[EnumImpresion.a2_armazon_descripcion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a2_armazon_descripcion] /
                                ot[EnumImpresion.a2_ubicacion]}
                            </div>
                          )}
                          {/* {ot[EnumImpresion.a2_ubicacion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a2_ubicacion]}
                            </div>
                          )} */}

                          {ot[EnumImpresion.a3_armazon_codigo] && (
                            <div className="otCod font-bold">
                              {ot[EnumImpresion.a3_armazon_codigo]}
                            </div>
                          )}

                          {ot[EnumImpresion.a3_armazon_descripcion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a3_armazon_descripcion]} /{" "}
                              {ot[EnumImpresion.a3_ubicacion]}
                            </div>
                          )}
                          {/* 
                          {ot[EnumImpresion.a3_ubicacion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a3_ubicacion]}
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>

                    {/*************** C R I S T A L E S ***************/}
                    <div className="w-[100%] flex mt-1 !mb-2 justify-between border-b-2 border-black">
                      <div className="!w-[55%] ml-2 border-r-2 border-black pr-2">
                        <div className="ml-2 ">
                          {ot[EnumImpresion.cr1_od] !== "" && (
                            <div className="otCod font-bold">
                              D:{ot[EnumImpresion.cr1_od]}
                            </div>
                          )}

                          {ot[EnumImpresion.cr1od_ubicacion] && (
                            <div className="otArmazonData translate-x-4 ">
                              {ot[EnumImpresion.cr1od_ubicacion]}
                            </div>
                          )}

                          {ot[EnumImpresion.cr1_oi] !== "" && (
                            <div className="otCod font-bold">
                              I:&nbsp;{ot[EnumImpresion.cr1_oi]}
                            </div>
                          )}

                          {ot[EnumImpresion.cr1oi_ubicacion] && (
                            <div className="otArmazonData translate-x-4 ">
                              {ot[EnumImpresion.cr1oi_ubicacion]}
                            </div>
                          )}

                          {/* <div className='otCData '><span className='font-bold'>Mar:</span>&nbsp;{ot[EnumGrid.cristal1_marca]}</div> */}
                          <div className="otCData ">
                            <span className="font-bold">Dis:</span>&nbsp;
                            {ot[EnumImpresion.cr1_diseño]}
                          </div>
                          <div className="otCData ">
                            <span className="font-bold">Índ:</span>&nbsp;
                            {ot[EnumImpresion.cr1_indice]}
                          </div>
                          <div className="otCData ">
                            <span className="font-bold">Mat:</span>&nbsp;
                            {ot[EnumImpresion.cr1_material]}
                          </div>
                          <div className="otCData ">
                            <span className="font-bold">Col:</span>&nbsp;
                            {ot[EnumImpresion.cr1_color]}
                          </div>
                          <div className="otCData ">
                            <span className="font-bold">Trat:</span>&nbsp;
                            {ot[EnumImpresion.cr1_tratamiento]}
                          </div>
                          {/* <div className='otCData '><span className='font-bold'>Diam:</span>&nbsp;{ot[EnumGrid.cristal1_diametro]}</div> */}
                          {ot[EnumImpresion.cr1_tratamiento_adicional] && (
                            <>
                              <div className="otCData !mt-[-20px]">
                                <span className="font-bold">Trat. Adic:</span>
                                &nbsp;
                                <p className="font-bold text-[1.25rem] h-[1.25rem] inline-block">
                                  {ot[EnumImpresion.cr1_tratamiento_adicional]}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="!w-[45%] ml-1">
                        <div className="">
                          {ot[EnumImpresion.tipo_anteojo_id] !== 3 && (
                            <h1
                              className={` w-[10%] text-2xl text-center ${
                                ot[EnumImpresion.tipo_anteojo].length === 10
                                  ? "translate-y-24"
                                  : "translate-y-14"
                              } transform -rotate-90 ml-1`}
                            >
                              {ot[EnumImpresion.tipo_anteojo]}
                            </h1>
                          )}
                          {ot[EnumImpresion.tipo_anteojo_id] === 3 && (
                            <>
                              {ot[EnumImpresion.cr2_od] !== "" && (
                                <div className="otCod font-bold">
                                  {ot[EnumImpresion.cr2_od]}
                                </div>
                              )}
                              {ot[EnumImpresion.cr2od_ubicacion] && (
                                <div className="otArmazonData">
                                  {ot[EnumImpresion.cr2od_ubicacion]}
                                </div>
                              )}
                              {ot[EnumImpresion.cr2_oi] !== "" && (
                                <div className="otCod font-bold">
                                  {ot[EnumImpresion.cr2_oi]}
                                </div>
                              )}
                              {ot[EnumImpresion.cr2oi_ubicacion] && (
                                <div className="otArmazonData">
                                  {ot[EnumImpresion.cr2oi_ubicacion]}
                                </div>
                              )}
                              {/* <div className='otCData '>{ot[EnumGrid.cristal2_marca]}</div> */}
                              <div className="otCData ">
                                {ot[EnumImpresion.cr2_diseño]}
                              </div>
                              <div className="otCData ">
                                {ot[EnumImpresion.cr2_indice]}
                              </div>
                              <div className="otCData ">
                                {ot[EnumImpresion.cr2_material]}
                              </div>
                              <div className="otCData ">
                                {ot[EnumImpresion.cr2_color]}
                              </div>
                              <div className="otCData ">
                                {ot[EnumImpresion.cr2_tratamiento]}
                              </div>
                              {/* <div className='otCData '>{ot[EnumGrid.cristal2_diametro]}</div> */}
                              {ot[EnumImpresion.cr2_tratamiento_adicional] && (
                                <>
                                  <span className="text-[1.25rem] h-[1.25rem] font-bold">
                                    {
                                      ot[
                                        EnumImpresion.cr2_tratamiento_adicional
                                      ]
                                    }
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/*************** D I O P T R I A ***************/}
                    <div className="!w-[100%] flex ml-2 !h-auto !items-center">
                      <div className="flex flex-col text-xs !w-[58%]">
                        {/* <div className="w-full flex ml-3 otDioptriaTit">
                          <div className="  w-[25%] separator">ESF</div>
                          <div className="  w-[25%] ">CIL</div>
                          <div className="  w-[20%] ">EJE</div>
                          {
                          (ot[EnumImpresion.tipo_anteojo_id]  === 3  ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 4  ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 5  ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 6  
                        ) && (
                            <div className="  w-[20%] ">AD</div>
                          ) 
                          
                          }
                        </div>
                        <div className="w-full flex ml-2 otDioptria">
                          <div className="text-right w-[25%] separator">{formatPlusDioptria(ot[EnumImpresion.a1_od_esf])}</div>
                          <div className="text-right w-[25%] ">{formatPlusDioptria(ot[EnumImpresion.a1_od_cil])}</div>
                          <div className="text-center w-[20%] ">{ot[EnumImpresion.a1_od_eje]}</div>
                          {
                          (ot[EnumImpresion.tipo_anteojo_id]  === 3  ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 4  ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 5  ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 6 ) && (
                            <div className="text-right w-[20%] ">{ot[EnumImpresion.a1_od_ad]}</div>
                          )}
                        </div>
                        <div className="w-full flex ml-2 otDioptria">
                          <div className="text-right w-[25%] ">{formatPlusDioptria(ot[EnumImpresion.a1_oi_esf])}</div>
                          <div className="text-right w-[25%] ">{formatPlusDioptria(ot[EnumImpresion.a1_oi_cil])}</div>
                          <div className="text-center w-[20%] ">{ot[EnumImpresion.a1_oi_eje]}</div>
                          {
                          (ot[EnumImpresion.tipo_anteojo_id]  === 3 ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 4 ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 5 ||
                          ot[EnumImpresion.tipo_anteojo_id]   === 6 )
                          && (
                            <div className="text-right w-[20%] ">{ot[EnumImpresion.a1_oi_ad]}</div>
                          )}
                        </div> */}

                        <table>
                          <tbody>
                            <tr className="otDioptriaTit border-black border-b-[0.5px] ml-1">
                              <td className="w-[25%] separator">ESF</td>
                              <td className="w-[25%] separator">CIL</td>
                              <td className="w-[25%] separator">EJE</td>
                              <td className="w-[25%]">AD</td>
                            </tr>
                            <tr className="otDioptria !h-[10vw]">
                              <td className=" otDioptria text-black w-[25%] separator">
                                {formatPlusDioptria(
                                  ot[EnumImpresion.a1_od_esf]
                                )}
                              </td>
                              <td className=" otDioptria text-black w-[25%] separator">
                                {formatPlusDioptria(
                                  ot[EnumImpresion.a1_od_cil]
                                )}
                              </td>
                              <td className=" otDioptria text-black w-[25%] separator">
                                {ot[EnumImpresion.a1_od_eje]}
                              </td>
                              <td className=" otDioptria text-black w-[20%] ">
                                {ot[EnumImpresion.a1_od_ad]}
                              </td>
                              {/* {
                              (ot[EnumImpresion.tipo_anteojo_id]  === 3  ||
                              ot[EnumImpresion.tipo_anteojo_id]   === 4  ||
                              ot[EnumImpresion.tipo_anteojo_id]   === 5  ||
                              ot[EnumImpresion.tipo_anteojo_id]   === 6 ) && (
                            <td className="text-right w-[20%] ">{ot[EnumImpresion.a1_od_ad]}</td>
                            )} */}
                            </tr>
                            <tr className="otDioptria !h-[10vw] ">
                              <td className="text-black w-[25%] separator">
                                {formatPlusDioptria(
                                  ot[EnumImpresion.a1_oi_esf]
                                )}
                              </td>
                              <td className="text-black w-[25%] separator">
                                {formatPlusDioptria(
                                  ot[EnumImpresion.a1_oi_cil]
                                )}
                              </td>
                              <td className="text-black w-[25%] separator">
                                {ot[EnumImpresion.a1_oi_eje]}
                              </td>
                              <td className=" otDioptria text-black w-[20%] ">
                                {ot[EnumImpresion.a1_oi_ad]}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-col !w-[42%] border-black border-l-[3px]">
                        {ot[EnumImpresion.tipo_anteojo_id] === 3 && (
                          <>
                            <table>
                              <tbody>
                                <tr className="otDioptriaTit border-black border-b-[0.5px]">
                                  <td className="w-[25%] separator">ESF</td>
                                  <td className="w-[25%] separator">CIL</td>
                                  <td className="w-[25%] ">EJE</td>
                                </tr>
                                <tr className="otDioptria !h-[10vw]">
                                  <td className=" otDioptria text-black w-[25%] separator">
                                    {formatPlusDioptria(
                                      ot[EnumImpresion.a2_od_esf]
                                    )}
                                  </td>
                                  <td className=" otDioptria text-black w-[25%] separator">
                                    {formatPlusDioptria(
                                      ot[EnumImpresion.a2_od_cil]
                                    )}
                                  </td>
                                  <td className=" otDioptria text-black w-[25%] ">
                                    {ot[EnumImpresion.a2_od_eje]}
                                  </td>

                                  {/* {
                                    (ot[EnumImpresion.tipo_anteojo_id]  === 3  ||
                                    ot[EnumImpresion.tipo_anteojo_id]   === 4  ||
                                    ot[EnumImpresion.tipo_anteojo_id]   === 5  ||
                                    ot[EnumImpresion.tipo_anteojo_id]   === 6 ) && (
                                  <td className="text-right w-[20%] ">{ot[EnumImpresion.a1_od_ad]}</td>
                                  )} */}
                                </tr>
                                <tr className="otDioptria !h-[10vw]">
                                  <td className="text-black w-[25%] separator">
                                    {formatPlusDioptria(
                                      ot[EnumImpresion.a2_oi_esf]
                                    )}
                                  </td>
                                  <td className="text-black w-[25%] separator">
                                    {formatPlusDioptria(
                                      ot[EnumImpresion.a2_oi_cil]
                                    )}
                                  </td>
                                  <td className="text-black w-[25%]">
                                    {ot[EnumImpresion.a2_oi_eje]}
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            {/* <div className="w-full flex ml-3 otDioptriaTit">
                              <div className="  w-[30%] ">ESF</div>
                              <div className="  w-[30%] ">CIL</div>
                              <div className="  w-[30%] ">EJE</div>
                            </div>
      
                            <div className="w-full flex ml-2 otDioptria">
                              <div className="w-[38%] ">{formatPlusDioptria(ot[EnumImpresion.a2_od_esf])}</div>
                              <div className=" w-[38%] ">{formatPlusDioptria(ot[EnumImpresion.a2_od_cil])}</div>
                              <div className="text-right  w-[15%]">{ot[EnumImpresion.a2_od_eje]}</div>
                            </div>
      
                            <div className="w-full flex ml-2 otDioptria">
                              <div className=" w-[38%] ">{formatPlusDioptria(ot[EnumImpresion.a2_oi_esf])}</div>
                              <div className=" w-[38%] ">{formatPlusDioptria(ot[EnumImpresion.a2_oi_cil])}</div>
                              <div className="text-right  w-[15%] ">{ot[EnumImpresion.a2_oi_eje]}</div>
                            </div> */}
                          </>
                        )}
                      </div>
                    </div>

                    {/*************** A L T U R A  -  D P ***************/}
                    <div className="w-[100%] flex mt-1 justify-between ">
                      <div className="w-[52.2%] ml-2 items-center flex">
                        {(ot[EnumImpresion.tipo_anteojo_id] === 4 ||
                          ot[EnumImpresion.tipo_anteojo_id] === 5 ||
                          ot[EnumImpresion.tipo_anteojo_id] === 3 ||
                          ot[EnumImpresion.tipo_anteojo_id] === 6) && (
                          <span className="ml-1  !text-base font-bold ">
                            &nbsp;ALT: {ot[EnumImpresion.a1_alt]}
                          </span>
                        )}

                        <span className="ml-3  !text-base font-bold ">
                          &nbsp;DP: {ot[EnumImpresion.a1_dp]}
                        </span>
                      </div>

                      <div className="w-[47.8%] items-center flex ml-2">
                        {ot[EnumImpresion.tipo_anteojo_id] === 3 && (
                          <span className="ml-4  !text-base font-bold ">
                            &nbsp;DP: {ot[EnumImpresion.a2_dp]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/*************** D E S P A C H O ***************/}
                    <div className="header mt-1 w-[97%]  text-center2 border-black border-2 ml-3">
                      <div className="-mt-2 border-black border-b-2 !h-auto">
                        <div className="pl-6 ml-2 w-[100%] mx-auto br-red-300">
                          {ot[EnumImpresion.numero_receta] > 0 && (
                            <div
                              className={`flex text-left ${
                                ot[EnumImpresion.numero_reporte_atencion] > 0
                                  ? "translate-y-[0.3rem]"
                                  : "translate-y-[0.3rem]"
                              }`}
                            >
                              <p className=" text-left text-base   !mt-2 font-bold translate-x-[-1.5rem]">
                                N° Receta:&nbsp;
                              </p>
                              <p className=" text-left text-base   !mt-2 font-bold translate-x-[-1.5rem]">
                                {ot[EnumImpresion.numero_receta]}
                              </p>
                            </div>
                          )}

                          {ot[EnumImpresion.numero_reporte_atencion] > 0 && (
                            <div className="flex text-left ">
                              {/* <p className='-ml-6 text-base !mt-2 font-bold w-[27%]'>Rep:</p> */}
                              <p className=" text-left text-base  font-bold -ml-6">
                                Rep:
                                <span className="font-bold text-xl">
                                  {ot[EnumImpresion.numero_reporte_atencion]}
                                  &nbsp;
                                </span>
                                Total: {ot[EnumImpresion.rep_cantidad]}
                              </p>
                            </div>
                          )}

                          {/* {ot[EnumImpresion.numero_reporte_atencion] > 0 && (
                              <div className="flex text-left translate-y-[-0.8rem] ">
                                <p className=' text-left text-base   !mt-2 font-bold translate-x-[-1.5rem]'>{`Línea:${ot[EnumImpresion.rbd_ubicacion]} / ${ot[EnumImpresion.rbd_cantidad]} Unid / RBD:`}<span className="font-bold text-xl">{ot[EnumImpresion.rbd]}</span></p>
                              </div>
                            )} */}

                          {ot[EnumImpresion.numero_reporte_atencion] > 0 ? (
                            <div className="flex text-left translate-y-[-0.8rem] ">
                              {/* <p className=' text-left text-lg   !mt-2 font-bold translate-x-[-1.5rem]'>{`Línea: ${ot[EnumImpresion.rbd_ubicacion]} / ${ot[EnumImpresion.rbd_cantidad]} Unid / RBD: ${ot[EnumImpresion.rbd]}`}</p> */}
                              <p className=" text-left text-base   !mt-2 font-bold translate-x-[-1.5rem]">
                                {`Línea:${ot[EnumImpresion.rbd_ubicacion]} / ${
                                  ot[EnumImpresion.rbd_cantidad]
                                } Unid / RBD:`}
                                <span className="font-bold text-xl">
                                  {ot[EnumImpresion.rbd]}
                                </span>
                              </p>
                            </div>
                          ) : (
                            ot[EnumImpresion.rbd] !== "" && (
                              <div className="flex text-left ">
                                <p className=" text-left text-base   !mt-2 font-bold translate-x-[-1.5rem]">
                                  {`RBD: `}{" "}
                                  <span className="font-bold text-xl">
                                    {" "}
                                    {ot[EnumImpresion.rbd]}
                                  </span>
                                </p>
                              </div>
                            )
                          )}

                          <div
                            className={`${
                              ot[EnumImpresion.numero_reporte_atencion] > 0
                                ? "translate-y-[-1.5rem]"
                                : ""
                            }`}
                          >
                            <div className="flex text-left h-auto ">
                              {/* <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]">
                                Proyecto:{" "}
                              </p> */}
                              {/* <span>{ot[EnumGrid.proyecto_titulo]}</span> */}
                              <p className=" text-left text-sm !mt-2 -ml-6">
                                {ot[EnumImpresion.proyecto]}
                              </p>
                            </div>
                            <div className="flex text-left -mt-2">
                              {/* <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]">
                                Estab:{" "}
                              </p> */}
                              <p className=" text-left text-sm -ml-6  !mt-2">{`${
                                ot[EnumImpresion.establecimiento]
                              }`}</p>
                            </div>
                            <div className="flex text-left -mt-2">
                              {/* <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]">
                                Comuna:{" "}
                              </p> */}
                              <p className=" text-left text-sm !mt-2 -ml-6">
                                {ot[EnumImpresion.comuna]}
                              </p>
                            </div>
                            <div className="flex text-left -mt-2">
                              <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[90%]">
                                {/* Destino:{" "} */}
                                <span>
                                  {ot[EnumImpresion.lugar_despacho]}
                                </span>{" "}
                              </p>
                              {/* <p className=' text-left text-sm !mt-2 font-bold'>{ot[EnumImpresion.lugar_despacho]}</p> */}
                            </div>
                            <div
                              className={`flex text-left -mt-2 ${
                                ot[EnumImpresion.imprime_ticket] === 1
                                  ? "-mb-4"
                                  : ""
                              }`}
                            >
                              <p className=" text-left text-sm !mt-2 translate-x-[-1.5rem] font-bold">
                                {ot[EnumImpresion.direccion_despacho]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`header  w-[110%] text-center mt-2 overflow-hidden`}
                    >
                      <div className="w-full flex justify-center">
                        {true && (
                          <div className="w-[50%] -mt-[0.75rem] ml-2 z-20 ">
                            <LogoImagenImpresion
                              imagen64={ot[EnumImpresion.imagen_logo]}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/*************** O B S E R V A C I O N E S ***************/}
                    {ot[EnumImpresion.observaciones] &&
                      ot[EnumImpresion.observaciones] !== " " && (
                        <div className="mt-0 ml-4 border-1 border-black">
                          <div className="flex w-full">
                            <span className="ml-2 font-bold">NOTAS:&nbsp;</span>
                            <span className="ml-2">
                              {ot[EnumImpresion.observaciones]}
                            </span>
                          </div>
                        </div>
                      )}

                    {/* {ot[EnumImpresion.numero_receta] && ot[EnumImpresion.numero_receta] !== 0  && (
                      <div className='-mt-[0.75rem] ml-4 border-1 border-black'>
                        <div className='flex w-full'>
                          <span className='ml-2 font-bold'>N° Receta:&nbsp;</span>
                          <span className=''>{ot[EnumImpresion.numero_receta]}</span>
                        </div>
                      </div>
                    )}
                     */}

                    {ot[EnumImpresion.imprime_qr] === 1 && (
                      <div className="!h-auto mr-4  translate-y-[0.3rem]">
                        <div className="w-full text-center">
                          <h1 className="font-bold mb-2 ml-4 text-sm">
                            CUIDA TUS LENTES, ESCANEA QR
                          </h1>
                        </div>

                        <QRCode
                          size={50}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "40%",
                            margin: "auto",
                          }}
                          value={`https://www.tinyurl.com/5n78e9vd`}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    )}

                    {ot[EnumImpresion.imprime_ticket] === 1 && (
                      <div className="!mt-[50rem] ">
                        <FOTTicketImpresion data={ot} />
                      </div>
                    )}
                    {/* {ot && ot[EnumImpresion.imprime_qr] === 1 && (
                      <div className="!mt-[8rem]">
                        <FOTTicketQRImpresion />
                      </div>
                    )}
                     */}
                  </div>
                );
              })
            )}
        </div>
      ) : null}
    </>
  );
});
export default FOTImpresa;
