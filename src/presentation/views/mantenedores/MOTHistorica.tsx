/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from "react";

// import { PrimaryKeySearch } from "../../components";
import { useEntityUtils } from "../../hooks";
// import FUsuarios from "../forms/FUsuarios";
import { TITLES, table_head_OT_historica } from "../../utils";
// import { OptionValuesMotivo } from "./MOT";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
// import axios from "axios";
// import { URLBackend } from "../../hooks/useCrud";
import { clearData } from "../../../redux/slices/OTSlice";
import { signal } from "@preact/signals-react";
import { useModal } from "../../hooks/useModal";
import { filterToggle } from "../../components/FilterButton";
import { OTPkToDelete, totoalTrabajosSeleccionados } from "./MOT";
// import TableOTComponent from "../../components/TableOTComponent";
import TableComponent2 from "../../components/TableComponent2";
import { updateActualArea } from "../../../redux/slices/OTAreasSlice";
import OTPrimaryButtons from "../../components/OTPrimaryButtons";
import { PermisosBotones } from "../../Enums";
import FilterComponent from "../../components/FilterComponent";
import { OTGrillaHistoricaEnum } from "../../Enums/OTGrillaHistoricaEnum";

// import ExportCSV  from "../../components/ExportToCsv";

// import StateCountBarOT from "../../components/StateCountBarOT";
// import FOT from "../forms/FOT";
// import FOTFactura from "../forms/FOTFactura";
// import FOTGuiaDespacho from "../forms/FOTGuiaDespacho";
// import FOTOrdenCompra from "../forms/FOTOrdenCompra";
// import FOTReporteEntrega from "../forms/FOTRepeorteEntrega";

const StateCountBarOT = React.lazy(
  () => import("../../components/StateCountBarOT")
);
const FOT = React.lazy(() => import("../forms/FOT"));
const FilterButton = React.lazy(() => import("../../components/FilterButton"));

export enum EnumGrid {
  folio = 1,
  motivo = 2,
  area_id = 3,
  area = 4,
  estado_id = 5,
  estado = 6,
  validar_parametrizacion_id = 7,
  validar_parametrizacion = 8,
  estado_impresion_id = 9,
  estado_impresion = 10,
  proyecto_codigo = 11,
  proyecto_titulo = 12,
  establecimiento_id = 13,
  establecimiento = 14,

  cliente_rut = 15,
  cliente_nomnbre = 16,
  cliente_tipo = 17,
  cliente_sexo = 18,
  cliente_fecha_nacimiento = 19,
  cliente_direccion = 20,
  cliente_region_id = 21,
  cliente_region = 22,
  cliente_provincia_id = 23,
  cliente_provincia = 24,
  cliente_comuna_id = 25,
  cliente_comuna = 26,
  cliente_telefono = 27,
  cliente_correo = 28,
  oftalmologo_id = 29,
  oftalmologo = 30,

  fecha_atencion = 31,
  fecha_entrega_taller = 32,
  fecha_despacho = 33,
  fecha_entrega_cliente = 34,
  punto_venta_id = 35,
  punto_venta = 36,
  numero_receta = 37,
  fecha_receta = 38,
  tipo_anteojo_id = 39,
  tipo_anteojo = 40,
  a1_od_esf = 41,
  a1_od_cil = 42,
  a1_od_eje = 43,
  a1_od_ad = 44,
  a1_oi_esf = 45,
  a1_oi_cil = 46,
  a1_oi_eje = 47,
  a1_oi_ad = 48,
  a1_dp = 49,
  a1_alt = 50,
  a1_grupo_od = 51,
  a1_grupo_oI = 52,
  a2_od_esf = 53,
  a2_od_cil = 54,
  a2_od_eje = 55,
  a2_oi_esf = 56,
  a2_oi_cil = 57,
  a2_oi_eje = 58,
  a2_dp = 59,
  a2_grupo_od = 60,
  a2_grupo_oi = 61,

  a1_armazon_id = 62,
  a1_armazon = 63,

  a2_armazon_id = 64,
  a2_armazon = 65,

  a3_armazon_id = 66,
  a3_armazon = 67,

  //CRISTALES ANTEOJO 1

  cristal1_od_marca_id = 68,
  cristal1_od_marca = 69,
  cristal1_od_diseno_id = 70,
  cristal1_od_diseno = 71,
  cristal1_od_indice_id = 72,
  cristal1_od_indice = 73,
  cristal1_od_material_id = 74,
  cristal1_od_material = 75,
  cristal1_od_color_id = 76,
  cristal1_od_color = 77,
  cristal1_od_tratamiento_id = 78,
  cristal1_od_tratamiento = 79,
  cristal1_od_diametro = 80,
  cristal1_od = 81,

  cristal1_oi_marca_id = 82,
  cristal1_oi_marca = 83,
  cristal1_oi_diseno_id = 84,
  cristal1_oi_diseno = 85,
  cristal1_oi_indice_id = 86,
  cristal1_oi_indice = 87,
  cristal1_oi_material_id = 88,
  cristal1_oi_material = 89,
  cristal1_oi_color_id = 90,
  cristal1_oi_color = 91,
  cristal1_oi_tratamiento_id = 92,
  cristal1_oi_tratamiento = 93,
  cristal1_oi_diametro = 94,
  cristal1_oi = 95,
  cristal1_tratamiento_adicional_id = 96,
  cristal1_tratamiento_adicional = 97,

  //CRISTALES ANTEOJO 2

  cristal2_od_marca_id = 98,
  cristal2_od_marca = 99,
  cristal2_od_diseno_id = 100,
  cristal2_od_diseno = 101,
  cristal2_od_indice_id = 102,
  cristal2_od_indice = 103,
  cristal2_od_material_id = 104,
  cristal2_od_material = 105,
  cristal2_od_color_id = 106,
  cristal2_od_color = 107,
  cristal2_od_tratamiento_id = 108,
  cristal2_od_tratamiento = 109,
  cristal2_od_diametro = 110,
  cristal2_od = 111,

  cristal2_oi_marca_id = 112,
  cristal2_oi_marca = 113,
  cristal2_oi_diseno_id = 114,
  cristal2_oi_diseno = 115,
  cristal2_oi_indice_id = 116,
  cristal2_oi_indice = 117,
  cristal2_oi_material_id = 118,
  cristal2_oi_material = 119,
  cristal2_oi_color_id = 120,
  cristal2_oi_color = 121,
  cristal2_oi_tratamiento_id = 122,
  cristal2_oi_tratamiento = 123,
  cristal2_oi_diametro = 124,
  cristal2_oi = 125,
  cristal2_tratamiento_adicional_id = 126,
  cristal2_tratamiento_adicional = 127,

  //OPTICA
  motivo_garantia_id = 128,
  motivo_garantia = 129,
  folio_asociado = 130,

  resolucion_garantia_id = 131,
  resolucion_garantia = 132,
  worktracking = 133,
  nota_venta = 134,
  numero_reporte_firma = 135,
  numero_reporte_atencion = 136,
  numero_oc = 137,
  numero_guia = 138,
  numero_factura = 139,
  folio_interno_mandante = 140,

  reporte_interno_mandante = 141,
  numero_envio = 142,

  total = 143,
  observaciones = 144,
  nombre_logo = 145,
  imprime_qr = 146,
  imprime_ticket = 147,
  titulo1_ticket = 148,
  titulo2_ticket = 149,
  titulo3_ticket = 150,
  lugar_despacho = 151,
  estado_validacion = 152,
  rbd_establecimiento = 153,
  bodega_procesado = 154,
  usuario_id = 155,

  ot_ubicacion = 156,
  opcion_montaje = 157,

  cristal1_od_opcion_vta = 158,
  cristal1_oi_opcion_vta = 159,
  cristal2_od_opcion_vta = 160,
  crsital2_oi_opcion_vta = 161,

  empresa_adjudicada_id = 162,
  estado_validacion_armazon1 = 163,
  estado_validacion_armazon2 = 164,
  cristal1_od_validado = 165,
  cristal1_oi_validado = 166,
  cristal2_od_validado = 167,
  cristal2_oi_validado = 168,

  //impresion:
  ubicacion_armazon_1 = 169,
  ubicacion_armazon_2 = 170,
  ubicacion_cristal_1_od = 171,
  ubicacion_cristal_1_oi = 172,
  ubicacion_cristal_2_od = 173,
  ubicacion_cristal_2_oi = 174,
  cant_rbd = 175,
  rbd_ubicacion = 176,
  imagen_logo = 177,
}

const strEntidad = "Orden de Trabajo Histórico";
// const strUrl = `${URLBackend}/api/ot/listado`
const strBaseUrl = "/api/othistorica/";
const strQuery = "14";
const idMenu = 1;
const permissionsOTArchivo = signal<any>("");

// export const handleReporte = async(type:number, pktoDelete:any, OTs:any, folios:any) => {
//   let resultBoton:any = []

//   if(pktoDelete.length < 1){
//     return;
//   }

//   console.log(pktoDelete)
//   const resultadoFiltrado = OTs.data && OTs.data.filter((elemento:any) => folios.includes(elemento[1]));

//   //TODO: TIPO 1 REPORTE DE ATENCION
//   if(type === 1){
//     //? VALIDACIONES DEL METODO
//     resultadoFiltrado.map((ot:any)=>{
//       const estadoCOL = ot[4]

//       if(estadoCOL === 'Entregada'){
//         resultBoton =  [...resultBoton, [ot[1], true]]
//       }else{
//         resultBoton =  [...resultBoton, [ot[1], ot[4]]]
//       }

//     })
//   //TODO: TIPO 2 REPORTE FIRMA
//   }else if (type === 2){
//     resultadoFiltrado.map((ot:any)=>{
//       const estadoCOL = ot[4]

//       if(estadoCOL !== 'Anulada'){
//         resultBoton =  [...resultBoton, [ot[1], true]]
//       }else{
//         resultBoton =  [...resultBoton, [ot[1], ot[4]]]
//       }
//     })
//   }

//   const areAllSameType = resultBoton.every((item:any) => item[1] === true);

//   if(!areAllSameType){
//     resultBoton.map((ot:any)=>{
//         if(typeof ot[1] === 'string'){
//           toast.error(`Error: folio ${ot[0]}  | ${ot[1]}`);
//         }
//       }
//     )
//   }else{
//       const toastLoading = toast.loading('Cargando...');
//     try {
//       const query = {
//         _proyecto   :    pktoDelete[0]["proyecto_codigo"],
//         _pkToDelete :   JSON.stringify(resultBoton.map((folioOT:any)=>({folio: folioOT[0]}))),
//         _id         :   type,
//         _usuario    :   userState["id"]
//       }

//       const strUrl      = `${URLBackend}/api/proyectodocum/listado`
//       const queryURL    = `?query=06&_p2=${query["_proyecto"]}&_id=${query["_id"]}&_pkToDelete=${query["_pkToDelete"]}&_p4=${query["_usuario"]}`
//       const result      = await axios(`${strUrl}/${queryURL}`);
//       // console.log(result)
//       if(result.status === 200){
//         const successMessage = type === 2
//                                        ? `Reporte firma generado: ${result.data[0][0]}`
//                                        : `Reporte de atencion generado: ${result.data[0][0]}`

//         dispatch(fetchOT({historica:true, searchParams: `_proyecto=${query["_proyecto"]}`}))
//         setSelectedRows([])
//         toast.dismiss(toastLoading)
//         toast.success(successMessage)
//     }
//     } catch (error) {
//       toast.dismiss(toastLoading)
//       console.log(error)
//       throw error;
//     }
//   }
// }

const MOTHistorica: React.FC = () => {
  const [pktoDelete, setPkToDelete] = useState([]);
  const { CustomModal } = useModal();

  const dispatch = useAppDispatch();

  const [params, setParams] = useState([]);
  const OTs: any = useAppSelector((store: AppStore) => store.OTS);
  const areas: any = useAppSelector((store: AppStore) => store.OTAreas.areas);
  const areaActual: any = useAppSelector(
    (store: AppStore) => store.OTAreas.areaActual
  );

  const permissions = (area: number) =>
    areas && areas?.find((permiso: any) => permiso[1] === area);

  useEffect(() => {
    dispatch(updateActualArea(110 as any));
    const permiso = areaActual && permissions(areaActual);
    permissionsOTArchivo.value = permiso && permiso[6];
  }, [permissionsOTArchivo.value]);

  // let permiso_documentacion =
  //   user.permisos_archivo_ot[0] === "1" ? true : false;
  // let permiso_post_venta = user.permisos_archivo_ot[1] === "1" ? true : false;
  // let permiso_anular = user.permisos_archivo_ot[2] === "1" ? true : false;
  // let permiso_post_venta    = user.permisos_archivo_ot[1] === '1' ? true : false;

  // const userState: any = useAppSelector((store: AppStore) => store.user);

  // const {escritura_lectura} = usePermission(idMenu)

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  const {
    //entities state
    setEntities,
    entity,
    //modal methods
    isModalInsert,
    isModalEdit,
    toggleEditOTModal,
    closeModal,
    //Check methods
    handleSelect,
    selectedRows,
    setSelectedRows,
    handleSelectedAll,
  } = useEntityUtils(strBaseUrl, strQuery);
  // console.log("entities:", entities);
  // console.log("params:", params);
  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      folio: OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.folio],
      estado: OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.estado],
      estado_id:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.estado_id],
      proyecto_codigo:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.proyecto_codigo],
      proyecto:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.proyecto_titulo],

      reporte_firma:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.reporte_firma],
      reporte_atencion:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.reporte_atencion],
      orden_compra:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.orden_compra],
      numero_guia:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.numero_guia],
      numero_factura:
        OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.numero_factura],

      area: OTs.data[row] && OTs.data[row][OTGrillaHistoricaEnum.areas],
    }));
    totoalTrabajosSeleccionados.value = newPkToDelete?.reduce(
      (acc: any, ot: any) => {
        if (ot["tipo_anteojo"] === 3) {
          console.log("render");
          acc = acc + 2;
        } else {
          acc++;
        }
        return acc;
      },
      0
    );
    // console.log(OTs.data)
    // console.log('newPkToDelete:',newPkToDelete)
    setPkToDelete(newPkToDelete as any);
    OTPkToDelete.value = newPkToDelete;
  }, [selectedRows]);

  const checkCount = signal(pktoDelete.length);
  // const folios = pktoDelete && pktoDelete.map(({folio}:any)=>folio)

  //TODO: ==== METODO REPORTE DE FIRMA Y ATENCION============
  // const handleReporte = async(type:number) => {
  //   let resultBoton:any = []

  //   if(pktoDelete.length < 1){
  //     return toast.error('No Hay OT Seleccionada')
  //   }

  //   console.log(params[0])

  //   console.log(pktoDelete)
  //   const resultadoFiltrado = OTs.data && OTs.data.filter((elemento:any) => folios.includes(elemento[1]));

  //   if(parseInt(pktoDelete[0]["reporte_atencion"]) !== 0){
  //     const result = await showModal(
  //         `OT: ${pktoDelete[0]["folio"]} Tiene Reporte de atención asignado, ¿Desea agregar uno nuevo? `,
  //         '',
  //         MODAL.keepYes,
  //         MODAL.kepNo
  //       );

  //     if(!result){
  //         return;
  //     }
  // }

  //   //TODO: TIPO 1 REPORTE DE ATENCION
  //   if(type === 1){
  //     //? VALIDACIONES DEL METODO
  //     resultadoFiltrado.map((ot:any)=>{
  //       const estadoCOL = ot[4]

  //       if(estadoCOL === 'Entregada'){
  //         resultBoton =  [...resultBoton, [ot[1], true]]
  //       }else{
  //         resultBoton =  [...resultBoton, [ot[1], ot[4]]]
  //       }

  //     })
  //   //TODO: TIPO 2 REPORTE FIRMA
  //   }else if (type === 2){
  //     resultadoFiltrado.map((ot:any)=>{
  //       const estadoCOL = ot[4]

  //       if(estadoCOL !== 'Anulada'){
  //         resultBoton =  [...resultBoton, [ot[1], true]]
  //       }else{
  //         resultBoton =  [...resultBoton, [ot[1], ot[4]]]
  //       }
  //     })
  //   }

  //   const areAllSameType = resultBoton.every((item:any) => item[1] === true);

  //   if(!areAllSameType){
  //     resultBoton.map((ot:any)=>{
  //         if(typeof ot[1] === 'string'){
  //           toast.error(`Error: folio ${ot[0]}  | ${ot[1]}`);
  //         }
  //       }
  //     )
  //   }else{
  //       const toastLoading = toast.loading('Cargando...');
  //     try {
  //       const query = {
  //         _proyecto   :    pktoDelete[0]["proyecto_codigo"],
  //         _pkToDelete :   JSON.stringify(resultBoton.map((folioOT:any)=>({folio: folioOT[0]}))),
  //         _id         :   type,
  //         _usuario    :   userState["id"]
  //       }

  //       const strUrl      = `${URLBackend}/api/proyectodocum/listado`
  //       const queryURL    = `?query=06&_p2=${query["_proyecto"]}&_id=${query["_id"]}&_pkToDelete=${query["_pkToDelete"]}&_p4=${query["_usuario"]}`
  //       const result      = await axios(`${strUrl}/${queryURL}`);
  //       // console.log(result)
  //       if(result.status === 200){
  //         const successMessage = type === 2
  //                                        ? `Reporte firma generado: ${result.data[0][0]}`
  //                                        : `Reporte de atencion generado: ${result.data[0][0]}`

  //         dispatch(fetchOT({historica:true, searchParams: params[0] }))
  //         setSelectedRows([])
  //         toast.dismiss(toastLoading)
  //         toast.success(successMessage)
  //     }
  //     } catch (error) {
  //       toast.dismiss(toastLoading)
  //       console.log(error)
  //       throw error;
  //     }
  //   }
  // }

  useEffect(() => {
    dispatch(clearData());
    dispatch(updateActualArea(110 as any));
  }, []);

  // const validateAreaArchivo = pktoDelete.some(
  //   (ot: any) => ot.area !== "Archivo"
  // );
  // const folioNotArchivo = pktoDelete.filter((ot:any)=>ot.area === "Archivo").map((ot:any)=>ot.folio)

  // console.log(validateAreaArchivo)

  return (
    <div className="mantenedorContainer">
      <Suspense>
        <FilterButton isOT={true} className="top-[10rem] left-[3rem]">
          <FilterComponent
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            strQuery={strQuery}
            setEntities={setEntities}
            otHistorica={true}
            primaryKeyInputs={[
              {
                name: "_folio",
                label: "Folio",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-[10vw]",
                  container: "!ml-10",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_rut",
                label: "RUT",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-[16vw]",
                  container: "",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_nombre",
                label: "Nombre",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "!w-[20vw]  text-[1vw] ",
                  labelProps: " !text-[1.2vw] !font-[2vw]",
                },
              },
              {
                name: "_fecha_desde",
                label: "Atención Desde",
                type: "date",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "w-[11vw]",
                },
              },
              {
                name: "_fecha_hasta",
                label: "Atención Hasta",
                type: "date",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "w-[11vw]",
                },
              },

              {
                name: "_estado",
                label: "Estado",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "OTEstadosFiltro",
                styles: {
                  styles: "labelInput inputStyles w-[16vw]",
                  container: "",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_motivo",
                label: "Motivo",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "OTMotivo",
                styles: {
                  styles: "labelInput inputStyles w-[16vw]",
                  container: "",
                  labelProps: "labelInput",
                },
              },

              {
                name: "_proyecto",
                label: "Proyecto",
                type: "select",
                selectUrl: "/api/proyectos/",
                styles: {
                  styles: "labelInput w-[15vw] inputStyles",
                  container: " ",
                  labelProps: "labelInput",
                },
              },

              {
                name: "_ubicacion",
                label: "Ubicación",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "!w-[16vw]  text-[1vw]  ",
                  labelProps: " !text-[1.2vw] !font-[2vw]",
                },
              },

              {
                name: "_establecimiento",
                label: "Establecimiento",
                type: "select",
                selectUrl: "/api/establecimientos/",
                styles: {
                  styles: "labelInput w-[15vw] inputStyles",
                  container: " text-[1vw]",
                  labelProps: " !text-[1.2vw] !font-[2vw]",
                },
              },

              {
                name: "_p2",
                label: "Tipo Doc",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "OTNumDoc",
                styles: {
                  styles: "labelInput inputStyles w-[16vw] ",
                  container: "",
                  labelProps: "!text-[1.2vw] !font-[2vw]",
                },
              },

              {
                name: "_p3",
                label: "Número Doc",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "!w-[20vw]  text-[1vw] ",
                  labelProps: "labelInput",
                },
              },

              {
                name: "_p1",
                label: "RBD",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "!w-[16vw]  text-[1vw]",
                  labelProps: "!text-[1.2vw] !font-[2vw]",
                },
              },
              {
                name: "_comuna",
                label: "Comuna",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "Comunas",
                styles: {
                  styles: "!w-[16vw] labelInput inputStyles",
                  container: "",
                  labelProps: "labelInput",
                },
              },
            ]}
          />
        </FilterButton>
      </Suspense>

      {/* //TODO: BOTONES SECCION PROYECTO REPORTE ATENCION/FIRMA */}

      {/* <div className="mantenedorHeadOT width100 !h-[4rem] !mt-8 mr-8 items-center ">
        <div className="mx-auto">
          {permiso_documentacion && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (pktoDelete.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                }

                if (validateAreaArchivo) {
                  return toast.error(`OT no se encuentra en OT Archivo`);
                }

                setShowRepEntrega((prev) => !prev);
              }}
            >
              N° Rep. Entrega
            </Button>
          )}
          <Suspense>
            {showRepEntrega && (
              <FOTReporteEntrega
                otArchivo={true}
                pktoDelete={pktoDelete}
                setSelectedRows={setSelectedRows}
                closeModal={() => setShowRepEntrega(false)}
              />
            )}
          </Suspense>

          {permiso_documentacion && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (pktoDelete.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                }
                if (validateAreaArchivo) {
                  return toast.error(`OT no se encuentra en OT Archivo`);
                }

                setShowOrdenCompra((prev) => !prev);
              }}
            >
              N° OC
            </Button>
          )}
          <Suspense>
            {showOrdenCompra && (
              <FOTOrdenCompra
                otArchivo={true}
                pktoDelete={pktoDelete}
                setSelectedRows={setSelectedRows}
                closeModal={() => setShowOrdenCompra(false)}
              />
            )}
          </Suspense>

          {permiso_documentacion && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (pktoDelete.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                }
                if (validateAreaArchivo) {
                  return toast.error(`OT no se encuentra en OT Archivo`);
                }
                setShowGuia((prev) => !prev);
              }}
            >
              N° Guía
            </Button>
          )}
          <Suspense>
            {showGuia && (
              <FOTGuiaDespacho
                pktoDelete={pktoDelete}
                setSelectedRows={setSelectedRows}
                closeModal={() => setShowGuia(false)}
                otArchivo={true}
              />
            )}
          </Suspense>

          {permiso_documentacion && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (pktoDelete.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                }
                if (validateAreaArchivo) {
                  return toast.error(`OT no se encuentra en OT Archivo`);
                }
                setShowFactura((prev) => !prev);
              }}
            >
              N° Factura
            </Button>
          )}
          <Suspense>
            {showFactura && (
              <FOTFactura
                otArchivo={true}
                pktoDelete={pktoDelete}
                setSelectedRows={setSelectedRows}
                closeModal={() => setShowFactura(false)}
              />
            )}
          </Suspense>

          <Suspense>
            <ExportCSV
              strEntidad={strEntidad}
              params={params}
              strBaseUrl={strBaseUrl}
              primaryButton={true}
              idMenu={idMenu}
            />
          </Suspense>
        </div>
      </div> */}

      <div className="mantenedorHeadOT width100 !h-[4rem] !mt-8 mr-8 items-center ">
        <OTPrimaryButtons
          areaName="name"
          areaPermissions={permissionsOTArchivo.value}
          areaActual={areaActual}
          params={params}
          setSelectedRows={setSelectedRows}
          idMenu={idMenu}
          isMOTArchivo={true}
          strBaseUrl={strBaseUrl}
          // pktoDelete={pktoDelete}
        />
      </div>

      <div
        className={`width100 scroll ${
          filterToggle.value ? "!mt-[16rem] !h-[25rem]" : "!mt-[1em] !h-[40rem]"
        } `}
      >
        <TableComponent2
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditOTModal={toggleEditOTModal}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          tableHead={table_head_OT_historica}
          idMenu={idMenu}
          isOT={true}
        />
      </div>
      <Suspense>
        <StateCountBarOT checkCount={checkCount} isMotHistorica={true} />
      </Suspense>

      <Suspense>
        {isModalInsert && (
          <FOT
            label={`${TITLES.ingreso} ${strEntidad}`}
            closeModal={closeModal}
            selectedRows={selectedRows}
            setEntities={setEntities}
            params={params}
            isEditting={false}
            isMOT={false}
            // permisos_ot_historica={{
            //   permiso_documentacion,
            //   permiso_post_venta,
            //   permiso_anular,
            // }}
          />
        )}

        {isModalEdit && (
          <FOT
            label={`${TITLES.edicion} ${strEntidad}`}
            selectedRows={selectedRows}
            setEntities={setEntities}
            params={params}
            data={entity}
            closeModal={closeModal}
            isEditting={true}
            isMOT={true}
            permisos_ot_historica={{
              permisoPostVenta:
                permissionsOTArchivo.value[PermisosBotones.postVenta] === "1"
                  ? true
                  : false,
              permisoAnular:
                permissionsOTArchivo.value[PermisosBotones.anular] === "1"
                  ? true
                  : false,
              // permissionsOTArchivo.value[PermisosBotones.postVenta],
              // permissionsOTArchivo-value[PermisosBotones.anular],
              // permiso_anular,
            }}
          />
        )}
      </Suspense>

      <Suspense>
        <CustomModal />
      </Suspense>
    </div>
  );
};

export default MOTHistorica;
