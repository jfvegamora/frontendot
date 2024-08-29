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
  // let OT: any = [];

  // useEffect(() => {
  //   const data: any = [
  //     [
  //       [
  //         2433,
  //         "Venta",
  //         "PROGRAMA JUNAEB BIO-BIO",
  //         "COLEGIO SAN JOSE",
  //         "25226442-6",
  //         "ISIDORA ARLENNE LUENGO GONZÁLEZ",
  //         "CABRERO",
  //         " ",
  //         "2024-08-20",
  //         "2024-09-13",
  //         "2024-09-17",
  //         67730,
  //         1,
  //         "Lejos",
  //         "4020000040161",
  //         "Atlantis, 9026, C24",
  //         "4020000040284",
  //         "Atlantis, 9043, C07",
  //         "Monofocal",
  //         "1.50 Orgánico",
  //         "Blanco",
  //         "UC (S/T)",
  //         "Sin color",
  //         "100010003630",
  //         "100010000820",
  //         "UC",
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         " ",
  //         " ",
  //         "",
  //         9254,
  //         " ",
  //         "logo_mto01.jpg",
  //         1,
  //         0,
  //         "CONSERVE ESTE COMPROBANTE PARA RETIRO",
  //         "Barros Arana 565 piso 3 Galería Internacional, CONCEPCIÓN",
  //         "Fono 412517159",
  //         "JUNAEB-08 CABRERO",
  //         "0.00",
  //         "-0.75",
  //         180,
  //         "0.00",
  //         "-0.50",
  //         "-0.50",
  //         30,
  //         "0.00",
  //         56,
  //         0,
  //         "0.00",
  //         "0.00",
  //         0,
  //         "0.00",
  //         "0.00",
  //         0,
  //         0,
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         "",
  //         "4307",
  //         1,
  //         15,
  //         "6/132",
  //         "Las Delicias N°355",
  //         "1",
  //         "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dmJvb2wAAAAAAEVtbERib29sAAAAAABJbnRyYm9vbAAAAAAAQmNrZ09iamMAAAABAAAAAAAAUkdCQwAAAAMAAAAAUmQgIGRvdWJAb+AAAAAAAAAAAABHcm4gZG91YkBv4AAAAAAAAAAAAEJsICBkb3ViQG/gAAAAAAAAAAAAQnJkVFVudEYjUmx0AAAAAAAAAAAAAAAAQmxkIFVudEYjUmx0AAAAAAAAAAAAAAAAUnNsdFVudEYjUHhsQFIAAAAAAAAAAAAKdmVjdG9yRGF0YWJvb2wBAAAAAFBnUHNlbnVtAAAAAFBnUHMAAAAAUGdQQwAAAABMZWZ0VW50RiNSbHQAAAAAAAAAAAAAAABUb3AgVW50RiNSbHQAAAAAAAAAAAAAAABTY2wgVW50RiNQcmNAWQAAAAAAAAAAABBjcm9wV2hlblByaW50aW5nYm9vbAAAAAAOY3JvcFJlY3RCb3R0b21sb25nAAAAAAAAAAxjcm9wUmVjdExlZnRsb25nAAAAAAAAAA1jcm9wUmVjdFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAQBIAAAAAQABOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAABaOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAABOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgAKOEJJTQQCAAAAAAAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAADhCSU0EMAAAAAAACwEBAQEBAQEBAQEBADhCSU0ELQAAAAAABgABAAAAGDhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4A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aHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTAxLTE3VDE3OjI0OjM1LTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA1LTA4VDE0OjQ3OjUzLTA0OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wNS0wOFQxNDo0Nzo1My0wNDowMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmU1MDdkOGQzLWRmODMtZWY0Yi05ZTY1LWUxOGNhMGM0ODQ5NiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVlOTMwZjAzLTUyMGItNGM0Zi04NGM3LTc5OTAxNTI5M2IxNiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjllMGQ5NjY4LWVlZWYtODY0MS1hMGQyLTQ5YWZkN2NjNGZiMSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWUwZDk2NjgtZWVlZi04NjQxLWEwZDItNDlhZmQ3Y2M0ZmIxIiBzdEV2dDp3aGVuPSIyMDI0LTAxLTE3VDE3OjI0OjM1LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZjYzVmMDA3LTA4NmEtOTM0My1iOThkLWIwNmVhMWQ0ZTVlNiIgc3RFdnQ6d2hlbj0iMjAyNC0wNS0wN1QxNzozOToxNy0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphMWRjMTc0OS1iMGVkLTZkNDktYWFmMS1mOGQ1YTYzYmFlZDQiIHN0RXZ0OndoZW49IjIwMjQtMDUtMDhUMTQ6NDc6NTMtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplNTA3ZDhkMy1kZjgzLWVmNGItOWU2NS1lMThjYTBjNDg0OTYiIHN0RXZ0OndoZW49IjIwMjQtMDUtMDhUMTQ6NDc6NTMtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTFkYzE3NDktYjBlZC02ZDQ5LWFhZjEtZjhkNWE2M2JhZWQ0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjllMGQ5NjY4LWVlZWYtODY0MS1hMGQyLTQ5YWZkN2NjNGZiMSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjllMGQ5NjY4LWVlZWYtODY0MS1hMGQyLTQ5YWZkN2NjNGZiMSIvPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Im0gYSBzIHQgZSByIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSJtIGEgcyB0IGUgciIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IsOzICBwICB0ICBpICBjICBvICBzIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSLDsyAgcCAgdCAgaSAgYyAgbyAgcyIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAhQWRvYmUAZEAAAAABAwAQAwIDBgAAAAAAAAAAAAAAAP/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQoJCg0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8IAEQgAdgGKAwERAAIRAQMRAf/EALoAAQACAwEBAQEBAAAAAAAAAAAJCgYHCAUDBAIBAQEBAAAAAAAAAAAAAAAAAAAAARAAAQQCAQMCAgsBAQAAAAAABwUGCAkDBAAQAQIRIXA4IEBQgDI0Nhc3GTlgGBEAAQMDAwEFAwgECQoHAAAAAQIDBBEFBgASByExQVETFBAiCCBhcYEyIxV1QrK1drFScjOz1BaWOEDBgkNz0yS0lTdQYHBiU4OF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",
  //       ],
  //     ],
  //   ];

  //   setOT(data);
  // }, []);
  // const User: any = useAppSelector((store: AppStore) => store.user);
  // console.log(OT && OT);
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
  console.log(OT);
  return (
    <>
      {masivo === true ? (
        <div ref={ref} className={`flex flex-col !h-auto`}>
          {OT &&
            OT.map((list_ot: any) =>
              list_ot.map((ot: any) => {
                console.log(ot[EnumImpresion.numero_reporte_atencion]);
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
                      className={`w-[100%] relative  ${
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
                        <h3 className={`absolute left-3 mt-2 bottom-2`}>
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
                    <div className="w-[100%] flex justify-between ml-3 !-mt-6 !z-30">
                      <div className="w-1/2">
                        <span className="text-xs font-bold">ATENCIÓN:</span>
                        &nbsp;
                        <span className="text-xs ">
                          {ot[EnumImpresion.fecha_atencion]}
                        </span>
                      </div>

                      <div className="w-1/2">
                        <span className="text-xs font-bold">ENTREGA:</span>
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
                            {ot[EnumImpresion.a1_armazon_descripcion]}
                          </div>
                          {ot[EnumImpresion.a1_ubicacion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a1_ubicacion]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-[45%] ml-1">
                        <div className="">
                          <div className="otCod font-bold">
                            {ot[EnumImpresion.a2_armazon_codigo]}
                          </div>
                          {ot[EnumImpresion.a2_armazon_descripcion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a2_armazon_descripcion]}
                            </div>
                          )}
                          {ot[EnumImpresion.a2_ubicacion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a2_ubicacion]}
                            </div>
                          )}

                          {ot[EnumImpresion.a3_armazon_codigo] && (
                            <div className="otCod font-bold">
                              {ot[EnumImpresion.a3_armazon_codigo]}
                            </div>
                          )}

                          {ot[EnumImpresion.a3_armazon_descripcion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a3_armazon_descripcion]}
                            </div>
                          )}

                          {ot[EnumImpresion.a3_ubicacion] && (
                            <div className="otArmazonData">
                              {ot[EnumImpresion.a3_ubicacion]}
                            </div>
                          )}
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
                    <div className="header mt-1 w-[97%] !h-auto text-center2 border-black border-2 ml-3">
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
                            <div className="flex text-left !h-auto ">
                              <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]">
                                Proyecto:{" "}
                              </p>
                              {/* <span>{ot[EnumGrid.proyecto_titulo]}</span> */}
                              <p className=" text-left text-sm !mt-2">
                                {ot[EnumImpresion.proyecto]}
                              </p>
                            </div>
                            <div className="flex text-left -mt-2">
                              <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]">
                                Estab:{" "}
                              </p>
                              <p className=" text-left text-sm  !mt-2">{`${
                                ot[EnumImpresion.establecimiento]
                              }`}</p>
                            </div>
                            <div className="flex text-left -mt-2">
                              <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[27%]">
                                Comuna:{" "}
                              </p>
                              <p className=" text-left text-sm !mt-2">
                                {ot[EnumImpresion.comuna]}
                              </p>
                            </div>
                            <div className="flex text-left -mt-2">
                              <p className="-ml-6 text-[0.80rem] !mt-2 font-bold w-[90%]">
                                Destino:{" "}
                                <span>{ot[EnumImpresion.lugar_despacho]}</span>{" "}
                              </p>
                              {/* <p className=' text-left text-sm !mt-2 font-bold'>{ot[EnumImpresion.lugar_despacho]}</p> */}
                            </div>
                            <div className="flex text-left -mt-2">
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
