/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils } from "../../hooks";
// import FUsuarios from "../forms/FUsuarios";
import { TITLES, table_head_OT_historica } from "../../utils";
// import { OptionValuesMotivo } from "./MOT";
import FOT from "../forms/FOT";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { Button } from "@material-tailwind/react";
import FOTOrdenCompra from "../forms/FOTOrdenCompra";
import FOTFactura from "../forms/FOTFactura";
import FOTGuiaDespacho from "../forms/FOTGuiaDespacho";
import FilterButton, { filterToggle } from "../../components/FilterButton";
import { toast } from "react-toastify";
// import axios from "axios";
// import { URLBackend } from "../../hooks/useCrud";
import { clearData } from "../../../redux/slices/OTSlice";
import StateCountBarOT from "../../components/StateCountBarOT";
import { signal } from "@preact/signals-react";
import  ExportCSV  from "../../components/ExportToCsv";
import { useModal } from "../../hooks/useModal";
import FOTReporteEntrega from "../forms/FOTRepeorteEntrega";

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
  a1_opcion_vta_id = 62,
  a1_opcion_vta = 63,
  a1_armazon_id = 64,
  a1_armazon = 65,
  a2_opcion_vta_id = 66,
  a2_opcion_vta = 67,


  a2_armazon_id = 68,
  a2_armazon = 69,
  a3_opcion_vta_id = 70,
  a3_opcion_vta = 71,
  a3_armazon_id = 72,
  a3_armazon = 73,

  //CRISTALES ANTEOJO 1
  cristal1_opcion_vta_id = 74,
  cristal1_opcion_vta = 75,
  cristal1_marca_id = 76,
  cristal1_marca = 77,
  cristal1_diseno_id = 78,
  cristal1_diseno = 79,
  cristal1_indice_id = 80,
  cristal1_indice = 81,
  cristal1_material_id = 82,
  cristal1_material = 83,
  cristal1_tratamiento_id = 84,
  cristal1_tratamiento = 85,
  cristal1_color_id = 86,
  cristal1_color = 87,
  cristal1_diametro = 88,
  cristal1_od = 89,
  cristal1_oi = 90,
  cristal1_tratamiento_adicional_id = 91,
  cristal1_tratamiento_adicional = 92,

  //CRISTALES ANTEOJO 2
  cristal2_od_opcion_venta_id = 93,
  cristal2_od_opcion_venta = 94,
  cristal2_marca_id = 95,
  cristal2_marca = 96,
  cristal2_diseno_id = 97,
  cristal2_diseno = 98,
  cristal2_indice_id = 99,
  cristal2_indice = 100,
  cristal2_material_id = 101,
  cristal2_material = 102,
  cristal2_tratamiento_id = 103,
  cristal2_tratamiento = 104,
  cristal2_color_id = 105,
  cristal2_color = 106,
  cristal2_diametro = 107,
  cristal2_od = 108,
  cristal2_oi = 109,
  cristal2_tratamiento_adicional_id = 110,
  cristal2_tratamiento_adicional = 111,

  //OPTICA
  motivo_garantia_id = 112,
  motivo_garantia = 113,
  folio_asociado = 114,

  resolucion_garantia_id = 115,
  resolucion_garantia = 116,
  worktracking = 117,
  nota_venta = 118,
  numero_reporte_firma = 119,
  numero_reporte_atencion = 120,
  numero_oc = 121,
  numero_guia = 122,
  numero_factura = 123,
  folio_interno_mandante = 124,
  reporte_interno_mandante = 125,
  numero_envio   = 126,
  total = 127,
  observaciones = 128,
  nombre_logo = 129,
  imprime_qr = 130,
  imprime_ticket = 131,
  titulo1_ticket = 132,
  titulo2_ticket = 133,
  titulo3_ticket = 134,
  lugar_despacho       = 135,
  estado_validacion    = 136,
  rbd_establecimiento  = 137,
  bodega_procesado     = 138,
  usuario_id           = 139,
  imagen_logo          = 140
}


const strEntidad = "Orden de Trabajo Histórico";
// const strUrl = `${URLBackend}/api/ot/listado`
const strBaseUrl = "/api/othistorica/";
const strQuery = "14";
const idMenu = 1;

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
  const [showOrdenCompra, setShowOrdenCompra] = useState(false);
  const [showGuia, setShowGuia] = useState(false);
  const [showFactura, setShowFactura] = useState(false);
  const [showRepEntrega, setShowRepEntrega] = useState(false);
  const [ pktoDelete, setPkToDelete] = useState([]);
  const {  CustomModal } = useModal();
  
  const dispatch       = useAppDispatch();

  const [params, setParams] = useState([]);
  const OTs:any = useAppSelector((store: AppStore) => store.OTS);
  const user:any = useAppSelector((store: AppStore) => store.user);
  console.log(user)

  let permiso_documentacion  = user.permisos_archivo_ot[0] === '1' ? true : false; 
  let permiso_post_venta     = user.permisos_archivo_ot[1] === '1' ? true : false;
  let permiso_anular         = user.permisos_archivo_ot[2] === '1' ? true : false;  
  // let permiso_post_venta    = user.permisos_archivo_ot[1] === '1' ? true : false;

  console.log(permiso_documentacion)
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
    toggleEditModal,
    toggleEditOTModal,
    closeModal,
    //Check methods
    handleSelect,
    selectedRows,
    setSelectedRows,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteSelected,
  } = useEntityUtils(strBaseUrl, strQuery);
  // console.log("entities:", entities);
  // console.log("params:", params);
  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      folio             : OTs.data[row] && OTs.data[row][1],
      proyecto          : OTs.data[row] && OTs.data[row][13],
      proyecto_codigo   : OTs.data[row] && OTs.data[row][6],
      estado            : OTs.data[row] && OTs.data[row][4],
      reporte_firma     : OTs.data[row] && OTs.data[row][8],
      reporte_atencion  : OTs.data[row] && OTs.data[row][9],
      orden_compra      : OTs.data[row] && OTs.data[row][10],
      numero_guia       : OTs.data[row] && OTs.data[row][11],
      numero_factura    : OTs.data[row] && OTs.data[row][12]
 

    })); 

    // console.log(OTs.data)
    // console.log('newPkToDelete:',newPkToDelete)
    setPkToDelete(newPkToDelete as any)
  }, [selectedRows]);

  const checkCount = signal(pktoDelete.length)
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

  useEffect(()=>{
    dispatch(clearData())
  },[])




  console.log(user.permisos_archivo_ot)
  



  return (
    <div className="mantenedorContainer">

      <FilterButton
        className="top-[10rem] left-[3rem]"

      >
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            strQuery={strQuery}
            setEntities={setEntities}
            otHistorica={true}
            primaryKeyInputs={[
              { name: "_folio", label: "Folio", type: "text" },
              { name: "_rut", label: "Rut", type: "text" },
  
              { name: "_fecha_desde", label: "Atención Desde", type: "date", styles: { with: "w-[18.2rem]  !h-[6rem]" } },
              { name: "_fecha_hasta", label: "Atención Hasta", type: "date", styles: { with: "w-[18.2rem]  !h-[6rem]" } },
  
              { name: "_estado", label: "Estado", type: "select", selectUrl: "/api/tipos/", tipos: "OTEstados", styles: { with: "w-[20.4rem]" }},
              { name: "_establecimiento", label: "Establecimiento", type: "select", selectUrl: "/api/establecimientos/", styles: { with: "w-[20.4rem]" }},
  
              { name: "_nombre", label: "Nombre", type: "text" },
              { name: "_motivo", label: "Motivo", type: "select", selectUrl: "/api/tipos/", tipos: "OTMotivo", styles: {with:"w-[19.5rem]"}},
  
              { name: "_p2", label: "Tipo Doc", type: "select", selectUrl: "/api/tipos/", tipos: "OTNumDoc", styles: {with: "w-[20.2rem]"}},
              { name: "_p3", label: "Número Doc", type: "text", styles: { with: "w-[18.4rem]" }},
  
              { name: "_proyecto", label: "Proyecto", type: "select", selectUrl: "/api/proyectos/", styles: { with: "w-[39.8rem]" }},
  
            ]}
          />

      </FilterButton>



      {/* //TODO: BOTONES SECCION PROYECTO REPORTE ATENCION/FIRMA */}


      <div className="mantenedorHeadOT width100 !h-[4rem] !mt-8 mr-8 items-center ">
        <div className="mx-auto">

          {/* <Button className='otActionButton mt-3 mx-5' style={{ backgroundColor: '#676f9d' }} onClick={() => handleReporte(2)}>N° Rep. Firma</Button> */}
          {/* <Button className='otActionButton mt-3 mx-5'  onClick={() => handleReporte(1)} >N° Rep. Entrega</Button> */}

          {permiso_documentacion && (
            <Button className='otActionButton mt-3 mx-5'  onClick={() => {
              if(pktoDelete.length < 1){
                return toast.error('No hay OT Seleccionada')
              }
              setShowRepEntrega((prev)=>!prev)
            }} >N° Rep. Entrega</Button>
          )}  

          {showRepEntrega && <FOTReporteEntrega pktoDelete={pktoDelete} setSelectedRows={setSelectedRows} closeModal={()=>setShowRepEntrega(false)} />}


          {permiso_documentacion && (
            <Button className='otActionButton mt-3 mx-5'  onClick={() => {
              if(pktoDelete.length < 1){
                return toast.error('No hay OT Seleccionada')
              }
              setShowOrdenCompra((prev) => !prev)}
            }>N° OC</Button>
          )}

          {showOrdenCompra  && <FOTOrdenCompra  pktoDelete={pktoDelete}  setSelectedRows={setSelectedRows} closeModal={() => setShowOrdenCompra(false)} />}


          {permiso_documentacion && (
            <Button className='otActionButton mt-3 mx-5'  onClick={() => {
              if(pktoDelete.length < 1){
                return toast.error('No hay OT Seleccionada')
              }
              setShowGuia((prev) => !prev)
            }}>N° Guía</Button>
          )}

          {showGuia && <FOTGuiaDespacho pktoDelete={pktoDelete } setSelectedRows={setSelectedRows} closeModal={() => setShowGuia(false)} otArchivo={true} />}

          {permiso_documentacion && (
            <Button className='otActionButton mt-3 mx-5'  onClick={() => {
              if(pktoDelete.length < 1){
                return toast.error('No hay OT Seleccionada')
              }
              setShowFactura((prev) => !prev)
            }}>N° Factura</Button>
          )}

          {showFactura      && <FOTFactura      pktoDelete={pktoDelete}  setSelectedRows={setSelectedRows} closeModal={() => setShowFactura(false)} />}


          <ExportCSV strEntidad={strEntidad} params={params} strBaseUrl={strBaseUrl}/>  
        </div>
      </div>






      <div className={`width100 scroll ${filterToggle.value ? "!mt-[16rem] !h-[25rem]" : "!mt-[1em] !h-[40rem]"} `}>
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          toggleEditOTModal={toggleEditOTModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
          pkToDelete={pktoDelete}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={OTs.data}
          tableHead={table_head_OT_historica}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          isOT={true}
        />
      </div>

        <StateCountBarOT checkCount={checkCount}/>
        
      {isModalInsert && (
        <FOT
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          isMOT={false}
          permisos_ot_historica={{
            permiso_documentacion,
            permiso_post_venta,
            permiso_anular
          }}
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
            permiso_documentacion,
            permiso_post_venta,
            permiso_anular
          }}
        />
      )}

      <CustomModal />
    </div>
  );
};

export default MOTHistorica;
