import React,{useEffect, useState, Suspense, lazy} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import 'react-tabs/style/react-tabs.css'; 
import axios from 'axios';
import {signal } from "@preact/signals-react";


import FOTGarantia from '../../components/OTForms/FOTGarantia';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import FOTDerivacion from '../../components/OTForms/FOTDerivacion';
import { A1_CR_OD, A1_CR_OI, A1_GRUPO_OD, A1_GRUPO_OI, SEXO, TIPO_CLIENTE, 
  a1_od_ad, 
  a1_od_cil, 
  a1_od_eje, 
  a1_od_esf, 
  a1_oi_ad, 
  a1_oi_cil, 
  a1_oi_eje, 
  a1_oi_esf, 
  // a1_od_ad, a1_od_cil, a1_od_eje, a1_od_esf, 
  a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, clearDioptrias,  
  clearGrupos,  
  clearInputDioptrias,  
  clearSelectInput,  
  dioptrias_receta,  
  fecha_atencion_signal,  
  // clearDioptriasA2,  dioptriasHabilitadas, 
   fecha_despacho, fecha_entrega_cliente, fecha_entrega_taller, 
  punto_venta, 
  // reiniciarA2DioptriasReceta, 
  reiniciarDioptriasReceta, reiniciarValidationNivel1, reiniciarValidationNivel2, tipo_de_anteojo, validar_parametrizacion } from '../../utils';
import { validationCliente, validationEstablecimientos, validationFechaAtencion, validationProyectos, validationPuntoVenta, validationTipoAnteojos, validation_A2_OD_CIL, validation_A2_OD_EJE, validation_A2_OD_ESF, validation_A2_OI_CIL, validation_A2_OI_EJE, validation_A2_OI_ESF, validation_Cristal1_od, validation_Cristal1_oi } from '../../utils/validationOT';
// import { inputName } from '../../components/OTForms/Otprueba';
// import { verificaCampos } from '../../utils/OTReceta_utils';
import { URLBackend } from '../../hooks/useCrud';
// import {transponer, transponer_a2 } from '../../utils/FOTReceta_utils';
import { Spinner } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { addToArmazones, addToCristales, clearCodigos } from '../../../redux/slices/OTSlice';

const FOTArmazones = lazy(()=>import('../../components/OTForms/FOTArmazones'));
const FOTBitacora = lazy(()=>import('../../components/OTForms/FOTBitacora'));
const FOTClientes = lazy(()=>import('../../components/OTForms/FOTClientes'));
const FOTCristales = lazy(()=>import('../../components/OTForms/FOTCristales'));
const FOTOptica = lazy(()=>import('../../components/OTForms/FOTOptica'));
const FOTReceta = lazy(()=>import('../../components/OTForms/FOTReceta'));


interface IFOTProps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
  isMOT?:boolean
  onlyRead?: boolean;
}

interface FormData {
  cristales:any;
  cliente: any;
  receta: any;

  //OPTICA
  optica: any;
  motivo:string;
  area:string;
  estado:string;
  proyecto:string;
  fecha_atencion:string;
  fecha_entrega_taller:string;
  fecha_despacho:string;
  fecha_entrega_cliente:string;
  motivo_garantia:string;
  folio_asociado:string;
  folio_interno_mandante:string;
  resolucion_garantia:string;
  observaciones:string;
  worktracking:string;
  nota_venta:string;
  numero_factura:string;



  establecimiento:string;
  cliente_rut:string;
  cliente_nombre:string;
  punto_venta:string;
  anteojo1_ESF_OD:string;
  anteojo1_CIL_OD:string;
  anteojo1_EJE_OD:string;
  anteojo1_AD_OD:string;
  anteojo1_ESF_OI:string;
  anteojo1_CIL_OI:string;
  anteojo1_EJE_OI:string;
  anteojo1_AD_OI:string
  anteojo1_DP:string;
  anteojo1_ALT:string;
  anteojo2_ESF_OD:string;
  anteojo2_CIL_OD:string;
  anteojo2_EJE_OD:string;
  anteojo2_ESF_OI:string;
  anteojo2_CIL_OI:string;
  anteojo2_EJE_OI:string;
  anteojo2_DP:string;
  anteojo1_opcion_vta:string;
  codigo_armazon_1:string;
  anteojo2_opcion_vta:string;
  codigo_armazon_2:string;
  anteojo3_opcion_vta:string;
  codigo_armazon_3:string;

  cristales1_od_opcion_vta:string;
  anteojo1_cristal_OD:string
  cristales1_oi_opcion_vta:string;
  anteojo1_cristal_OI:string
  cristales2_od_opcion_vta:string;
  anteojo2_cristal_OD:string;
  cristales2_oi_opcion_vta:string;
  anteojo2_cristal_OI:string;

  tipo_anteojo:string;
  
  numero_receta:string;
  fecha_receta:string;
  cristales1_tratamiento_adicional:string;
  cristales2_tratamiento_adicional:string;
  
}


export const validacionNivel1 = [
  { campo:"proyecto",
    valor: 0
  },
  { campo:"establecimiento_id",
    valor: 0
  },
  { campo:"cliente_rut",
    valor: 0
  },
  { campo:"fecha_atencion",
    valor: 0
  },
  { campo:"punto_venta_id",
    valor: 0
  },
  { campo:"tipo_anteojo_id",
    valor: 0
  },
]


export const validationNivel1 = signal([
  { campo:"proyecto",
    valor: 0
  },
  { campo:"establecimiento_id",
    valor: 0
  },
  { campo:"cliente_rut",
    valor: 0
  },
  { campo:"fecha_atencion",
    valor: 0
  },
  { campo:"punto_venta_id",
    valor: 0
  },
  { campo:"tipo_anteojo_id",
    valor: 0
  },
]);

export const validationNivel2 = signal([
  { campo: "fecha_entrega_taller",
    valor: 0
  },
  { campo: "fecha_despacho",
    valor: 0
  },
  { campo: "fecha_entrega_cliente",
    valor: 0
  },
  { campo: "a1_od_esf",
    valor: 0
  },
  { campo: "a1_od_cil",
    valor: 0
  },
  { campo: "a1_od_eje",
    valor: 0
  },
  { campo: "a1_od_ad",
    valor: 0
  },
  { campo: "a1_oi_ad",
    valor: 0
  },
  { campo: "a1_oi_esf",
    valor: 0
  },
  { campo: "a1_oi_cil",
    valor: 0
  },
  { campo: "a1_oi_eje",
    valor: 0
  },
  { campo: "a1_dp",
    valor: 0
  },
  { campo: "a1_alt",
    valor: 0
  },
  { campo:'combinaciones_validas',
    valor: 0
  },
  { campo: "a2_od_esf",
    valor: 0
  },
  { campo: "a2_od_cil",
    valor: 0
  },
  { campo: "a2_od_eje",
    valor: 0
  },
  { campo: "a2_oi_esf",
    valor: 0
  },
  { campo: "a2_oi_cil",
    valor: 0
  },
  { campo: "a2_oi_eje",
    valor: 0
  },
  { campo: "a2_dp",
    valor: 0
  },
  //A2_GRUPO
  { campo: "a1_opcion_vta_id",
    valor: 0
  },
  { campo: "a1_armazon_id",
    valor: 0
  },
  { campo: "a2_opcion_vta_id",
    valor: 0
  },
  { campo: "a2_armazon_id",
    valor: 0
  },



  { campo: "cristal1_opcion_vta_id",
    valor: 0
  },
  { campo: "cristal1_diseno_id",
    valor: 0
  },
  { campo: "cristal1_indice_id",
    valor: 0
  },
  { campo: "cristal1_material_id",
    valor: 0
  },
  { campo: "cristal1_tratamiento_id",
    valor: 0
  },
  { campo: "cristal1_color_id",
    valor: 0
  },
  { campo: "cristal1_od",
    valor: 0
  },
  { campo: "cristal1_oi",
    valor: 0
  },
  { campo: "cristal1_tratamiento_adicional_id",
    valor: 0
  },



  { campo: "cristal2_od_opcion_venta_id",
    valor: 0
  },
  { campo: "cristal2_diseno_id",
    valor: 0
  },
  { campo: "cristal2_indice_id",
    valor: 0
  },
  { campo: "cristal2_material_id",
    valor: 0
  },
  { campo: "cristal2_tratamiento_id",
    valor: 0
  },
  { campo: "cristal2_color_id",
    valor: 0
  },
  { campo: "cristal2_od",
    valor: 0
  },
  { campo: "cristal2_oi",
    valor: 0
  },
  { campo: "cristal2_tratamiento_adicional_id",
    valor: 0
  },
])

interface Dioptrias {
  ESF: string[],
  CIL: string[],
  EJE: string[],
  AD: string[]
}



export const tipo_anteojo = signal(false);
export const onlyReadReceta = signal(false);
export const a1Grupo = signal(0);



export const dioptrias:any = signal<Dioptrias>({
  ESF:[''],
  CIL:[''],
  EJE:[''],
  AD:['']
})


export const codigoProyecto = signal("")
export const tipo_lejos_cerca = signal(false);

const FOT:React.FC<IFOTProps> = ({
  closeModal,
  data,
  isEditting,
  isMOT,
  onlyRead
}) => {
  // const {createdEntity, editEntity} = useCrud(strBaseUrl);
  // const folioOT = data && data[EnumGrid.folio]
  //PERMISOS DE AREA
  const [OTPermissions, setOTPermissions] = useState("");
  const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
  const User:any = useAppSelector((store: AppStore) => store.user);
  const dispatch = useAppDispatch()
  // const OT:any = useAppSelector((store: AppStore) => store.OTS.ot);

  let OTAreaActual = OTAreas["areaActual"]
  const permissions = (area:number) => OTAreaActual && OTAreas["areas"].find((permiso:any)=>permiso[1] === area)
  //PERMISOS DE CAMPOS
  const permisos_campos           = useAppSelector((store: AppStore) => store.user?.permisos_campos);

  let permiso_armazones           = permisos_campos && permisos_campos[0] === "1" ? false : true;
  let permiso_cristales           = permisos_campos && permisos_campos[1] === "1" ? false : true;
  let permiso_estado_impresion    = permisos_campos && permisos_campos[2] === "1" ? false : true;
  let permiso_estado_validacion   = permisos_campos && permisos_campos[3] === "1" ? false : true;
  let permiso_resolucion_garantia = permisos_campos && permisos_campos[4] === "1" ? false : true;
  let permiso_grupo_dioptria      = permisos_campos && permisos_campos[5] === "1" ? false : true;

  


  const handleCloseForm = () => {
      closeModal();
      clearDioptrias();
      reiniciarDioptriasReceta();
      reiniciarValidationNivel2();
      reiniciarValidationNivel1();
      clearGrupos();
      dispatch(clearCodigos())
      clearSelectInput.value = false;
      //limpiar codigo
  }


  React.useEffect(()=>{
    validar_parametrizacion.value = data && data[EnumGrid.validar_parametrizacion_id] || '1'

    const permiso = OTAreaActual && permissions(OTAreaActual)
    setOTPermissions(permiso && permiso[5])
  },[OTAreaActual])


  React.useEffect(()=>{
    console.log('render')
    dispatch(clearCodigos())
    dispatch(addToArmazones([{codigo: data && data[EnumGrid.a1_armazon_id]}, {codigo: data && data[EnumGrid.a2_armazon_id]}]))
    dispatch(addToCristales([{codigo: data && data[EnumGrid.cristal1_od]}, {codigo:data && data[EnumGrid.cristal1_oi]}, {codigo: data && data[EnumGrid.cristal2_od]}, {codigo: data && data[EnumGrid.cristal2_oi]}]))
  },[])


  // console.log('otAreas', OTAreas)
  // console.log(OTPermissions)
  

  // const switchCasePausar = (jsonData:any) => {
  //   let _origen = OTAreas["areaActual"];
  //   let _destino =  OTAreas["areaActual"]
  //   let _estado = 3;

  //   let area = isEditting
  //   ? (data && parseInt(data[EnumGrid.estado_id]))
  //   : 1;

  //   // console.log('isEditting', isEditting)
  //   // console.log('data estado', data && data[EnumGrid.estado_id])

  //   switch (area) {
  //     case (20):
  //       console.log('Ejecutando acción para pausar, estado numero 2');
  //       updateOT(data, _destino, _origen, _estado);
  //       break;
  //     case (30):
  //       console.log('Ejecutando acción para pausar, estado numero 3');
  //       updateOT(data, _destino, _origen, _estado);
  //       break;
  //     case (40):
  //       console.log('Ejecutando acción para pausar, estado numero 4');
  //       updateOT(data, _destino, _origen, _estado)
  //       break;
  //     default:
  //         console.log('Número no reconocido');
  //       break;
  //   }
  // }


  // const switchCaseProcesar = (_jsonData:any) => {
  // //  console.log('hola')
  // //  const formData = getValues

  //   let _origen = OTAreas["areaActual"];
  //   let _destino = OTAreas["areaSiguiente"];;
  //   let _estado = 20;
    

  //   // console.log(formData)
  //   let area = isEditting ? (data && parseInt(data[EnumGrid.estado_id])) : 10;
 

  //   switch (area) {
  //     case 10:
  //       console.log('Ejecutando acción para procesar, estado numero 10');
  //       // insertOT(jsonData)
  //       break;
  //     case (2):
  //       console.log('Ejecutando acción para procesar, estado numero 2');
  //       updateOT(data, _destino, _origen, _estado);  
  //       break;
  //     case (3):
  //       console.log('Ejecutando acción para procesar, estado numero 3');
  //       updateOT(data, _destino, _origen, _estado);
  //       break;
  //     case (4):
  //       console.log('Ejecutando acción para procesar, estado numero 4');
  //       updateOT(data, _destino, _origen, _estado)
  //       break;
  //     default:
  //         console.log('Número no reconocido');
  //       break;
  //   }
  // }
  

  //Metodo editar query04
  const updateOT =async (
    jsonData:any,
    _origen:number,
    _destino:number,
    _estado:number
  )  => {
    let estado_impresion = 1;
    let estado_validacion = 1;
    let motivo = 1;
    let a1_grupo = 1;
    let a2_grupo = 1;
    // let _rut = ""
    let _p3 = ""

    // _p3 = `'${jsonData[EnumGrid.cliente_rut]}','${formValues && formValues["cliente"] && formValues["cliente"]["cliente_nombre"] || jsonData[EnumGrid.cliente_nomnbre]}',${jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.beneficiario ? "1" : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.particular ? "2" : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData[EnumGrid.cliente_sexo] === SEXO.masculino ? "1" : jsonData[EnumGrid.cliente_sexo] === SEXO.femenino ? "2" : jsonData[EnumGrid.cliente_sexo] === SEXO.no_aplica ? "3" : "0"},'${jsonData[EnumGrid.cliente_fecha_nacimiento]}','${jsonData[EnumGrid.cliente_direccion]}' ,${formValues && formValues["cliente"] && formValues["cliente"]["cliente_comuna_id"] || jsonData[EnumGrid.cliente_comuna_id] }, '${jsonData[EnumGrid.cliente_telefono]}','${jsonData[EnumGrid.cliente_correo]}', ${jsonData[EnumGrid.establecimiento_id]}`;


    // if(isEditting){
    //   _rut = `${jsonData[EnumGrid.cliente_rut] || ""}`

    //   _p3 = [ ...(jsonData[EnumGrid.cliente_nomnbre] !== undefined ? [`nombre="${formValues && formValues["cliente"] && formValues["cliente"]["cliente_nombre"] || jsonData[EnumGrid.cliente_nomnbre]}"`] : []),  ...(jsonData[EnumGrid.cliente_tipo] !== undefined ? [`tipo=${jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.beneficiario ? 1 : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.particular ? 2 : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.optica ? 3 : 0}`] : []),...(jsonData[EnumGrid.cliente_sexo] !== undefined ? [`sexo=${jsonData[EnumGrid.cliente_sexo] === SEXO.masculino ? 1 : jsonData[EnumGrid.cliente_sexo] === SEXO.femenino ? 2 : jsonData[EnumGrid.cliente_sexo] === SEXO.no_aplica ? 3 : 0}`] : []) , ...(jsonData[EnumGrid.cliente_fecha_nacimiento] !== undefined ? [`fecha_nacimiento="${jsonData[EnumGrid.cliente_fecha_nacimiento]}"`] : []) , ...(jsonData[EnumGrid.cliente_direccion] !== undefined ? [`direccion="${jsonData[EnumGrid.cliente_direccion]}"`] : []) , ...( formValues && formValues["cliente"] && formValues["cliente"]["cliente_comuna_id"]!== undefined ? [`comuna=${formValues["cliente"]["cliente_comuna_id"] || 150}`] : []), ...(jsonData[EnumGrid.cliente_telefono] !== undefined ? [`telefono="${jsonData[EnumGrid.cliente_telefono]}"`] : []), ...(jsonData[EnumGrid.cliente_correo] !== undefined ? [`correo="${jsonData[EnumGrid.cliente_correo]}"`] : []), ...(jsonData[EnumGrid.establecimiento_id] !== undefined ? [`establecimiento=${jsonData[EnumGrid.establecimiento_id]}`] : [])].join(', ');
    //   _p3 = _p3.replace(/'/g, '!');
    // }
        
    console.log(jsonData)
    
    // const fields = [`motivo=${motivo}`, `area=${_destino}`, `estado=${_estado}`, `estado_validacion=${estado_validacion}`, `estado_impresion=${estado_impresion}`, `proyecto='${jsonData[EnumGrid.proyecto_codigo]}'`, `establecimiento=${jsonData[EnumGrid.establecimiento_id]}`, ...(jsonData[EnumGrid.cliente_rut] !== undefined ? [`cliente='${jsonData[EnumGrid.cliente_rut]}'`] : []), `fecha_atencion='${jsonData[EnumGrid.fecha_atencion]}'`, `fecha_entrega_taller='${jsonData[EnumGrid.fecha_entrega_taller]}'`, `fecha_despacho='${jsonData[EnumGrid.fecha_despacho]}'`, `fecha_entrega_cliente='${jsonData[EnumGrid.fecha_entrega_cliente]}'`, `punto_venta=${jsonData[EnumGrid.punto_venta_id]}`, `numero_receta=${jsonData[EnumGrid.numero_receta]}`, `fecha_receta='${jsonData[EnumGrid.fecha_entrega_cliente]}'`, `tipo_anteojo=${jsonData[EnumGrid.tipo_anteojo_id]}`, `a1_od_esf=${jsonData[EnumGrid.a1_od_esf]}`, `a1_od_cil=${jsonData[EnumGrid.a1_od_cil]}`, `a1_od_eje=${jsonData[EnumGrid.a1_od_eje]}`, `a1_od_ad=${jsonData[EnumGrid.a1_od_ad]}`, `a1_oi_esf=${jsonData[EnumGrid.a1_oi_esf]}`, `a1_oi_cil=${jsonData[EnumGrid.a1_oi_cil]}`, `a1_oi_eje=${jsonData[EnumGrid.a1_oi_eje]}`, `a1_oi_ad=${jsonData[EnumGrid.a1_oi_ad]}`, `a1_dp=${jsonData[EnumGrid.a1_dp]}`, `a1_alt=${jsonData[EnumGrid.a1_alt]}`, `a1_grupo=${a1_grupo}`, `a2_od_esf=${jsonData[EnumGrid.a2_od_esf]}`, `a2_od_cil=${jsonData[EnumGrid.a2_od_cil]}`, `a2_od_eje=${jsonData[EnumGrid.a2_od_eje]}`, `a2_oi_esf=${jsonData[EnumGrid.a2_oi_esf]}`, `a2_oi_cil=${jsonData[EnumGrid.a2_oi_cil]}`, `a2_oi_eje=${jsonData[EnumGrid.a2_oi_eje]}`, `a2_dp=${jsonData[EnumGrid.a2_dp]}`, `a2_grupo=${a2_grupo}`, `anteojo1_opcion_vta=${jsonData[EnumGrid.a1_opcion_vta_id]}`, `anteojo1_armazon=${jsonData[EnumGrid.a1_armazon_id]}`, `anteojo2_opcion_vta=${jsonData[EnumGrid.a2_opcion_vta_id]}`, `anteojo2_armazon=${jsonData[EnumGrid.a2_armazon_id]}`, `anteojo3_opcion_vta=${jsonData[EnumGrid.a3_opcion_vta_id]}`, `anteojo3_armazon=${jsonData[EnumGrid.a3_armazon_id]}`, `cristales1_opcion_vta=${jsonData[EnumGrid.cristal1_opcion_vta_id]}`, `cristales1_diseno=${jsonData[EnumGrid.cristal1_diseno_id]}`, `cristales1_indice=${jsonData[EnumGrid.cristal1_indice_id]}`, `cristales1_material=${jsonData[EnumGrid.cristal1_material_id]}`, `cristales1_tratamiento=${jsonData[EnumGrid.cristal1_tratamiento_id]}`, `cristales1_color=${jsonData[EnumGrid.cristal1_color_id]}`, `cristales1_od=${jsonData[EnumGrid.cristal1_od]}`, `cristales1_oi=${jsonData[EnumGrid.cristal1_oi]}`, `cristales1_tratamiento_adicional=${jsonData[EnumGrid.cristal1_tratamiento_adicional_id]}`, `cristales2_opcion_vta=${jsonData[EnumGrid.cristal2_od_opcion_venta_id]}`, `cristales2_diseno=${jsonData[EnumGrid.cristal2_diseno_id]}`, `cristales2_indice=${jsonData[EnumGrid.cristal2_indice_id]}`, `cristales2_material=${jsonData[EnumGrid.cristal2_material_id]}`, `cristales2_tratamiento=${jsonData[EnumGrid.cristal2_tratamiento_id]}`, `cristales2_color=${jsonData[EnumGrid.cristal2_color_id]}`, `cristales2_od=${jsonData[EnumGrid.cristal2_od]}`, `cristales2_oi=${jsonData[EnumGrid.cristal2_oi]}`, `cristales2_tratamiento_adicional=${jsonData[EnumGrid.cristal2_tratamiento_adicional_id]}`, `motivo_garantia=${jsonData[EnumGrid.motivo_garantia_id]}`, `folio_asociado=${jsonData[EnumGrid.folio_asociado]}`, `resolucion_garantia=${jsonData[EnumGrid.resolucion_garantia_id]}`, `worktracking=${jsonData[EnumGrid.worktracking]}`, `nota_venta=${jsonData[EnumGrid.nota_venta]}`, `numero_factura=${jsonData[EnumGrid.numero_factura]}`, `folio_interno_mandante=${jsonData[EnumGrid.folio_interno_mandante]}`, `observaciones='${jsonData[EnumGrid.observaciones] || ""}'`];
    const fields = [
      `motivo=${motivo}`,
      `area=${_destino}`,
      `estado=${_estado}`,
      `validar_parametrizacion=${estado_validacion}`,
      `estado_impresion=${estado_impresion}`,
      `proyecto="${jsonData.proyecto_codigo                                                !== undefined ? jsonData.proyecto_codigo : ""}"`,
      (`establecimiento=${jsonData.establecimiento_id                                      !== undefined ? jsonData.establecimiento_id : 0 }`),
      (`cliente="${jsonData.cliente_rut                                                    !== undefined ? jsonData.cliente_rut : "" }"`),
      (`fecha_atencion="${jsonData.fecha_atencion                                          !== undefined ? jsonData.fecha_atencion : "" }"`),
      (`fecha_entrega_taller="${jsonData.fecha_entrega_taller                              !== undefined ? jsonData.fecha_entrega_taller : "" }"`),
      (`fecha_despacho="${jsonData.fecha_despacho                                          !== undefined ? jsonData.fecha_despacho : "" }"`),
      (`fecha_entrega_cliente="${jsonData.fecha_entrega_cliente                            !== undefined ? jsonData.fecha_entrega_cliente : ""}"`),
      (`punto_venta=${jsonData.punto_venta                                                 !== undefined ? jsonData.punto_venta : 0 }`),
      (`numero_receta=${jsonData.numero_receta                                             !== undefined ? jsonData.numero_receta : 0 }`),
      (`fecha_receta="${jsonData.fecha_receta                                              !== undefined ? jsonData.fecha_receta : "" }"`),
      (`tipo_anteojo=${jsonData.tipo_anteojo                                               !== undefined ? jsonData.tipo_anteojo : 0 }`),


      (`a1_od_esf=${typeof dioptrias_receta.value.a1_od.esf                                !== 'object' ? dioptrias_receta.value.a1_od.esf : 0 }`),
      (`a1_od_cil=${typeof dioptrias_receta.value.a1_od.cil                                !== 'object' ? dioptrias_receta.value.a1_od.cil : 0 }`),
      (`a1_od_eje=${typeof dioptrias_receta.value.a1_od.eje                                !== 'object' ? dioptrias_receta.value.a1_od.eje : 0 }`),
      (`a1_od_ad =${typeof dioptrias_receta.value.a1_od.ad                                 !== 'object' ? dioptrias_receta.value.a1_od.ad : 0 }`),
      (`a1_oi_esf=${typeof dioptrias_receta.value.a1_oi.esf                                !== 'object' ? dioptrias_receta.value.a1_oi.esf : 0 }`),
      (`a1_oi_cil=${typeof dioptrias_receta.value.a1_oi.cil                                !== 'object' ? dioptrias_receta.value.a1_oi.cil : 0 }`),
      (`a1_oi_eje=${typeof dioptrias_receta.value.a1_oi.eje                                !== 'object' ? dioptrias_receta.value.a1_oi.eje : 0 }`),
      (`a1_oi_ad =${typeof dioptrias_receta.value.a1_oi.ad                                 !== 'object' ? dioptrias_receta.value.a1_oi.ad : 0 }`),
      (`a1_dp=${jsonData.a1_dp                                                             !== '' ? jsonData.a1_dp : 0 }`),
      (`a1_alt=${jsonData.a1_alt                                                           !== '' ? jsonData.a1_alt : 0 }`),


      `a1_grupo=${a1_grupo}`,
      
      (`a2_od_esf=${typeof dioptrias_receta.value.a2_od.esf                                !== 'object' ? dioptrias_receta.value.a1_od.esf : 0 }`),
      (`a2_od_cil=${typeof dioptrias_receta.value.a2_od.cil                                !== 'object' ? dioptrias_receta.value.a1_od.cil : 0 }`),
      (`a2_od_eje=${typeof dioptrias_receta.value.a2_od.eje                                !== 'object' ? dioptrias_receta.value.a1_od.eje : 0 }`),
      (`a2_oi_esf=${typeof dioptrias_receta.value.a2_oi.esf                                !== 'object' ? dioptrias_receta.value.a1_oi.esf : 0 }`),
      (`a2_oi_cil=${typeof dioptrias_receta.value.a2_oi.cil                                !== 'object' ? dioptrias_receta.value.a1_oi.cil : 0 }`),
      (`a2_oi_eje=${typeof dioptrias_receta.value.a2_oi.eje                                !== 'object' ? dioptrias_receta.value.a1_oi.eje : 0 }`),
      (`a2_dp=${jsonData.a2_dp                                                             !== '' ? jsonData.a2_dp : 0 }`),

      `a2_grupo=${a2_grupo}`,
      
      (`anteojo1_opcion_vta=${jsonData.a1_opcion_vta_id                                    !== undefined ? jsonData.a1_opcion_vta_id : 0 }`),
      (`anteojo1_armazon="${jsonData.a1_armazon_id                                         !== undefined ? jsonData.a1_armazon_id : "" }"`),
      (`anteojo2_opcion_vta=${jsonData.a2_opcion_vta_id                                    !== undefined ? jsonData.a2_opcion_vta_id : 0 }`),
      (`anteojo2_armazon="${jsonData.a2_armazon_id                                         !== undefined ? jsonData.a2_armazon_id : "" }"`),
      (`anteojo3_opcion_vta=${jsonData.a3_opcion_vta_id                                    !== undefined ? jsonData.a3_opcion_vta_id : 0 }`),
      (`anteojo3_armazon="${jsonData.a3_armazon_id                                         !== undefined ? jsonData.a3_armazon_id : "" }"`),

      (`cristales1_opcion_vta=${jsonData.cristal1_opcion_vta_id                            !== undefined ? jsonData.cristal1_opcion_vta_id : 0 }`),
      (`cristales1_diseno=${jsonData.cristal1_diseno_id                                    !== undefined ? jsonData.cristal1_diseno_id : 0 }`),
      (`cristales1_indice=${jsonData.cristal1_indice_id                                    !== undefined ? jsonData.cristal1_indice_id : 0 }`),
      (`cristales1_material=${jsonData.cristal1_material_id                                !== undefined ? jsonData.cristal1_material_id : 0 }`),
      (`cristales1_tratamiento=${jsonData.cristal1_tratamiento_id                          !== undefined ? jsonData.cristal1_tratamiento_id : 0 }`),
      (`cristales1_color=${jsonData.cristal1_color_id                                      !== undefined ? jsonData.cristal1_color_id : 0 }`),
      (`cristales1_od="${jsonData.cristal1_od                                              !== undefined ? jsonData.cristal1_od : "" }"`),
      (`cristales1_oi="${jsonData.cristal1_oi                                              !== undefined ? jsonData.cristal1_oi : "" }"`),
      (`cristales1_tratamiento_adicional=${jsonData.cristal1_tratamiento_adicional_id      !== undefined ? jsonData.cristal1_tratamiento_adicional_id : 0 }`),

      
      (`cristales2_opcion_vta=${jsonData.cristal2_opcion_vta_id                            !== undefined ? jsonData.cristal2_opcion_vta_id : 0 }`),
      (`cristales2_diseno=${jsonData.cristal2_diseno_id                                    !== undefined ? jsonData.cristal2_diseno_id : 0 }`),
      (`cristales2_indice=${jsonData.cristal2_indice_id                                    !== undefined ? jsonData.cristal2_indice_id : 0 }`),
      (`cristales2_material=${jsonData.cristal2_material_id                                !== undefined ? jsonData.cristal2_material_id : 0 }`),
      (`cristales2_tratamiento=${jsonData.cristal2_tratamiento_id                          !== undefined ? jsonData.cristal2_tratamiento_id : 0 }`),
      (`cristales2_color=${jsonData.cristal2_color_id                                      !== undefined ? jsonData.cristal2_color_id : 0 }`),
      (`cristales2_od="${jsonData.cristal2_od                                              !== undefined ? jsonData.cristal2_od : 0 }"`),
      (`cristales2_oi="${jsonData.cristal2_oi                                              !== undefined ? jsonData.cristal2_oi : 0 }"`),
      (`cristales2_tratamiento_adicional=${jsonData.cristal2_tratamiento_adicional_id      !== undefined ? jsonData.cristal2_tratamiento_adicional_id : 0 }`),
      
      
      (`motivo_garantia=${jsonData.motivo_garantia_id                                      !== undefined ? jsonData.motivo_garantia_id : 0 }`),
      (`folio_asociado="${jsonData.folio_asociado                                          !== undefined ? jsonData.folio_asociado : 0 }"`),
      (`resolucion_garantia=${jsonData.resolucion_garantia_id                              !== undefined ? (jsonData.resolucion_garantia_id === 'Rechazada' ? 2 :1) : 0 }`),
      (`worktracking="${jsonData.worktracking                                              !== undefined ? jsonData.worktracking : "" }"`),
      (`nota_venta="${jsonData.nota_venta                                                  !== undefined ? jsonData.nota_venta : "" }"`),
      (`numero_factura="${jsonData.numero_factura                                          !== undefined ? jsonData.numero_factura : "" }"`),
      (`folio_interno_mandante="${jsonData.folio_interno_mandante                          !== undefined ? jsonData.folio_interno_mandante : "" }"`),
      (`observaciones="${jsonData.observaciones                                            !== undefined ? jsonData.observaciones : "" }"`),
      
    
    ];

    const cristales = [
      { codigo: `${jsonData.cristal1_od}` },
      { codigo: `${jsonData.cristal1_oi}` },
      { codigo: `${jsonData.cristal2_od}` },
      { codigo: `${jsonData.cristal2_oi}` }
    ]
      .map(item => {
        const numero = parseFloat(item.codigo);
        if (!isNaN(numero) && numero !== 0 &&numero !== null) {
          return { 'codigo': `${numero}` };
        }
        return null; 
      })
      .filter(item => item !== null);



      const armazones = [
        { codigo: `${jsonData.a1_armazon_id}` },
        { codigo: `${jsonData.a2_armazon_id}` },
      ]
        .map(item => {
          const numero = parseFloat(item.codigo);
          if (!isNaN(numero) && numero !== 0 && numero !== null ) {
            return { codigo: `${numero}` };
          }
          return null; 
        })
        .filter(item => item !== null);
      


    closeModal()
    // console.log(fields)
    // const filterfield2 = fields.map((field)=>{
    //   console.log(field)

    // })
    console.log(jsonData.a1_dp)
    console.log(jsonData.a1_alt)
    console.log(jsonData)
    console.log(fields)
    const filteredFields = fields
                            .map((a)=>a.split('='))
                            .filter((prev)=>prev[1] !== 'undefined')
                            .map((parts) => parts.join('='));
    
    console.log(filteredFields)
    // .filter((parts)=>validarValor(parts[1]))
    // .map((parts) => parts.join('='));

    let _p1 = filteredFields.join(',');
    
    _p1 = _p1.replace(/'/g, '!');

    const query = {
      query: "04",
      _p1,
      _p3: _p3 || "",
      _proyecto: `${jsonData.proyecto_codigo}`,
      _folio: `${data && data[EnumGrid.folio]}` ,
      // _origen : _origen.toString(),
      _origen : _origen.toString(),
      _rut: `${jsonData.cliente_rut}`,
      _destino: _destino.toString(),
      _estado:_estado.toString(), 
      _usuario:User["id"].toString(),
      _situacion:"0",
      _obs: "ot editada desde front",
      _cristalesJSON: JSON.stringify(cristales),
      _armazonesJSON: JSON.stringify(armazones),
      _punto_venta: `${jsonData.punto_venta_id}`,


      _cristalJSONOri: JSON.stringify(OTSlice.cristales),
      _armazonJSONOri: JSON.stringify(OTSlice.armazones)
      

    };

    console.log(JSON.stringify(cristales))
    console.log(JSON.stringify(armazones))

    console.log(jsonData)
    // console.log(jsonData.a1_od_esf)
    // console.log(jsonData.a1_od_esf.value)
    // console.log(a1_od_esf.value)
    // console.log(dioptrias_receta.value.a1_od.esf)
    // console.log(typeof dioptrias_receta.value.a1_od.cil)
    // console.log(typeof dioptrias_receta.value.a1_oi.esf)
    console.log("query", query);

    try {
      const response = await axios.post(`${URLBackend}/api/ot/editar/`, query)
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }


    // const response = await editEntity(query)


  }


  const switchCaseIngresar = async(jsonData:any) => {
    
    console.log(a2_od_esf.value)
    console.log(dioptrias_receta.value.a2_od.esf)

    console.log('click')
    console.log(jsonData)
    console.log(formValues)


    console.log(formValues.cliente.cliente_tipo)
    console.log(jsonData.cliente_tipo)


    let estado = 10;
    let estado_impresion = 0;
    let estado_validacion = 1;
    let motivo = 1;

    let a1_grupo = 1;
    let a2_grupo = 99;
    

    let _origen = OTAreaActual.toString();
    let _destino = OTAreaActual.toString();

    // let _p3 = [`nombre='${jsonData.cliente_nombre}'`, `tipo=${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? 1 : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? 2 : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? 3 : 0}`, `sexo=${jsonData.cliente_sexo === SEXO.masculino ? 1 : jsonData.cliente_sexo === SEXO.femenino ? 2 : jsonData.cliente_sexo === SEXO.no_aplica ? 3 : 0}`, `fecha_nacimiento='${jsonData.cliente_fecha_nacimiento}'`, `direccion='${jsonData.cliente_direccion}'`, `comuna=${jsonData.cliente_comuna || 150}`, `telefono='${jsonData.cliente_telefono}'`, `correo='${jsonData.cliente_correo}'`, `establecimiento=${jsonData.establecimiento_id}`].join(', ');
    let  _p3 =`"${jsonData.cliente_rut || formValues.cliente.cliente_rut || ""}","${jsonData.cliente_nombre || formValues.cliente.cliente_nombre || ""}",${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo   === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo  === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo || formValues.cliente.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo || formValues.cliente.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo || formValues.cliente.cliente_sexo  === SEXO.no_aplica ? "3" : "0"},"${jsonData.cliente_fecha_nacimiento || formValues.cliente.cliente_fecha_nacimiento || ""}","${jsonData.cliente_direccion || formValues.cliente.cliente_direccion || ""}" ,${jsonData.cliente_comuna || formValues.cliente.cliente_comuna || 0}, "${jsonData.cliente_telefono || formValues.cliente.cliente_telefono || ""}","${jsonData.cliente_correo || formValues.cliente.cliente_correo || ""}", ${jsonData.establecimiento_id || formValues.cliente.establecimiento_id || 0}`;
    _p3 = _p3.replace(/'/g, '!');

    console.log(_p3)

    const _p11 =` "${jsonData.proyecto_codigo}",${jsonData.establecimiento_id},"${jsonData.cliente_rut || formValues.cliente.cliente_rut}" ,${jsonData.oftalmologo_id ?? 0} ,"${jsonData.fecha_atencion || fecha_atencion_signal.value}","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${jsonData.fecha_despacho || fecha_despacho.value}","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}"${jsonData.punto_venta_id || 0},${jsonData.numero_receta ?? 0},"${jsonData.fecha_receta ?? ""}",${jsonData.tipo_anteojo_id ?? 0}`;
    const _p22 = `${dioptrias_receta.value.a1_od.esf ?? 0},${dioptrias_receta.value.a1_od.cil ?? 0},${dioptrias_receta.value.a1_od.eje ?? 0},${dioptrias_receta.value.a1_od.ad ?? 0 },${dioptrias_receta.value.a1_oi.esf ?? 0},${dioptrias_receta.value.a1_oi.cil ?? 0},${dioptrias_receta.value.a1_oi.eje ?? 0},${dioptrias_receta.value.a1_oi.ad ?? 0},${jsonData.a1_dp ?? 0},${jsonData.a1_alt ?? 0}`
    console.log(_p11)
    console.log(_p22)
    let _rut = '';
    
    // if(!existCliente){
    //    _rut = '';
    //    _p3 =`'${jsonData.cliente_rut}','${jsonData.cliente_nombre}',${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo === SEXO.no_aplica ? "3" : "0"},'${jsonData.cliente_fecha_nacimiento}','${jsonData.cliente_direccion}' ,${jsonData.cliente_comuna_id || 150}, '${jsonData.cliente_telefono}','${jsonData.cliente_correo}', ${jsonData.establecimiento_id}`;
    // }

    // console.log('data', jsonData)
    let _p1 = `${motivo},${_destino},${estado},${estado_impresion},${estado_validacion},"${jsonData.proyecto_codigo}",${jsonData.establecimiento_id},"${jsonData.cliente_rut || formValues.cliente.cliente_rut}" ,${jsonData.oftalmologo_id ?? 0} ,"${jsonData.fecha_atencion || fecha_atencion_signal.value}","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${jsonData.fecha_despacho || fecha_despacho.value}","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}",${jsonData.punto_venta_id || 0},${jsonData.numero_receta.value ?? 0},"${jsonData.fecha_receta ?? ""}",${jsonData.tipo_anteojo_id ?? 0},${a1_od_esf.value ?? 0},${a1_od_cil.value ?? 0},${a1_od_eje.value ?? 0},${a1_od_ad.value ?? 0 },${a1_oi_esf.value ?? 0},${a1_oi_cil.value ?? 0},${a1_oi_eje.value ?? 0},${a1_oi_ad.value ?? 0},${jsonData.a1_dp ?? 0},${jsonData.a1_alt ?? 0},${a1_grupo ?? 0},${a2_od_esf.value ?? 0},${a2_od_cil.value ?? 0},${a2_od_eje.value ?? 0},${a2_oi_esf.value ?? 0},${a2_oi_cil.value ?? 0},${a2_oi_eje.value ?? 0},${jsonData.a2_dp.value ?? 0},${a2_grupo ?? 0},${jsonData.a1_opcion_vta_id ?? 0},"${jsonData.a1_armazon_id ?? " "}",${jsonData.a2_opcion_vta_id ?? 0},"${jsonData.a2_armazon_id ?? " "}",${jsonData.a3_opcion_vta_id ?? 0},"${jsonData.a3_armazon_id ?? " "}",${jsonData.cristal1_opcion_vta_id || 0},${jsonData.cristal1_marca_id || 0},${jsonData.cristal1_diseno_id || 0},${jsonData.cristal1_indice_id || 0},${jsonData.cristal1_material_id || 0},${jsonData.cristal1_tratamiento_id || 0},${jsonData.cristal1_color_id || 0},${jsonData.cristal1_diametro || 0},"${jsonData.cristal1_od ?? " "}","${jsonData.cristal1_oi ?? " "}",${jsonData.cristal1_tratamiento_adicional_id || 0},${jsonData.cristal2_od_opcion_venta_id || 0},${jsonData.cristal2_marca_id || 0},${jsonData.cristal2_diseno_id || 0},${jsonData.cristal2_indice_id || 0},${jsonData.cristal2_material_id || 0},${jsonData.cristal2_tratamiento_id || 0},${jsonData.cristal2_color_id || 0},${jsonData.cristal2_diametro || 0},"${jsonData.cristal2_od ?? " "}","${jsonData.cristal2_oi ?? " "}",${jsonData.cristal2_tratamiento_adicional_id || 0},${jsonData.motivo_garantia_id || 0},${jsonData.folio_asociado || 0},${jsonData.resolucion_garantia_id || 0},${jsonData.worktracking || 0},${jsonData.nota_venta || 0},${jsonData.numero_factura || 0},${jsonData.folio_interno_mandante || 0},${jsonData.total || 0},"${jsonData.observaciones || ""}"`;
    // _p1 = _p1.replace(/'/g, '!');
    // console.log(_p1)

    // const _p3 = `'${jsonData.cliente_rut}','${jsonData.cliente_nombre}',${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo === SEXO.no_aplica ? "3" : "0"},'${jsonData.cliente_fecha_nacimiento}','${jsonData.cliente_direccion}' ,${jsonData.cliente_comuna_id || 150}, '${jsonData.cliente_telefono}','${jsonData.cliente_correo}', ${jsonData.establecimiento_id}`;

    const cristales  = [{'codigo': jsonData.cristal1_od},{'codigo': jsonData.cristal1_oi},{'codigo': jsonData.cristal2_od},{'codigo':jsonData.cristal2_oi}];
    const armazones  = [{'codigo': jsonData.a1_armazon_id},{'codigo': jsonData.a2_armazon_id},]; 
   
    const query = {
      query: "03",
      _p1,
      _p3,
      _rut,
      _proyecto:`${jsonData.proyecto}`,
      _origen,
      _destino,
      _estado: estado.toString(),
      _usuario: User.id.toString(),
      _obs:"OT INGRESADA",
      _cristalesJSON: JSON.stringify(cristales),
      _armazonesJSON: JSON.stringify(armazones),
    };

    // console.log('Valor de jsonData.a1_od_cil:', jsonData.a1_od_cil.value || 0);
    console.log(formValues)
    console.log(jsonData)
    console.log(query)
  

    // try {
    //   const response = await axios.post(`${URLBackend}/api/ot/crear/`, query)
    //   console.log(response)
    // } catch (error) {
    //   console.log(error)
    // }
    // return query;
    // return
  }



  //Estados locales
  const { control, handleSubmit, setValue, register, getValues } = useForm<any>();
  const [formValues, setFormValues] = useState<FormData | any>({});
  const [showGarantia, setShowGarantia] = useState(false);
  const [showDerivacion, setShowDerivacion] = useState(false);
  const [_existCliente, setExistCliente] = useState(false);
  const [submitAction, setSubmitAction] = useState('');
  const [strCodigoProyecto, setStrCodigoProyecto] = useState(data && data[EnumGrid.proyecto_codigo] || '')
  const [_isMotivo, setIsMotivo] = useState(false);
  const [_toggle, setToggle] = useState();
  const [_changeboolean, setChangeboolean] = useState(false)



 
  //HANDLE ANULAR OT
  const handleAnular = async()=> {
    try {
      const strUrl = `${URLBackend}/api/ot/listado`
      const _folio = data && data[EnumGrid.folio]
      const _estado = data && data[EnumGrid.estado_id]
      const userID =  User.id
      const _origen = OTAreaActual

        console.log('click')

        const query = `?query=05&_folio=${_folio}&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`
        const result = await axios(`${strUrl}/${query}`);
        console.log(result)
        if(result.status === 200){
            toast.success('OT anulada ')
        }
        handleCloseForm()
    } catch (error) {
        console.log(error)
        throw error
    }
}

  
  // console.log(strCodigoProyecto)

  //formularios
  const onCloseGarantia = () =>setShowGarantia(false)
  const onCloseDerivacion = () =>setShowDerivacion(false)
  
  // const sumatoriaNivel1 = validacionNivel1.reduce((index, objeto) => index + objeto.valor, 0);

  const sumatoriaNivel1 = validationNivel1.value.reduce((index, objeto) => index + objeto.valor, 0);
  const sumatoriaNivel2 = validationNivel2.value.reduce((index, objeto) => index + objeto.valor, 0)
    
  const actualizarEstado = (campo:string, valor:number) => {
    const index = validacionNivel1.findIndex(objeto => objeto.campo === campo);
    if (index !== -1) {
        validacionNivel1[index].valor = valor;
      }
  }


  // console.log(sumatoriaNivel1)

  //submit boton pausar
  const onSubmit: SubmitHandler<any> = async(jsonData, _type?:any) => {
      //  console.log(submitAction)

    console.log(jsonData)  
    if (submitAction === 'pausar') {
      console.log('pausar')
      updateOT(jsonData, OTAreaActual, OTAreaActual, 30);
      // switchCasePausar(jsonData);
      

    } else if (submitAction === 'procesar') {
      // switchCaseProcesar(jsonData);
      updateOT(jsonData, OTAreaActual, OTAreaActual, 30);
    } else if (submitAction === 'derivar'){
      // switchCaseDerivar(jsonData)
    } else if (submitAction === 'ingresar'){
      switchCaseIngresar(jsonData)
    }

  };





  //Persistencia de datos
  const handleFormChange = async(data: any, name: string) => {
    setChangeboolean((prev)=>!prev);

    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: {
        ...prevFormValues[name],
        ...data
      }
    }));
    console.log(name)
    console.log(data)
    
  //TODO: GUARDAMOS TIPO DE ANTEOJO
    if(Object.keys(data)[0] === 'tipo_anteojo_id'){
        tipo_de_anteojo.value = Object.values(data)[0] as string
        clearInputDioptrias()
    }
  //TODO: GUARDAMOS CODIGO DE PROYECTO
    if(Object.keys(data)[0] === 'proyecto_codigo'){
      console.log(Object.values(data)[0])
      setStrCodigoProyecto(Object.values(data)[0])
      codigoProyecto.value = (Object.values(data)[0] as string);
      fetchDioptrias(Object.values(data)[0] as string)
    }
  //TODO: GUARDAMOS PUNTO DE VENTA
    if(Object.keys(data)[0] === 'punto_venta_id'){
      punto_venta.value = (Object.values(data)[0] as string);
    }


    //todo  INICIO CRISTALES, TRAE GRUPO Y CODIGO DEPENDIENDO DE DATOS DEL CRISTAL 
     // ? ANTEOJO 1: 
    if(
      Object.keys(data)[0] === 'cristal1_marca_id'      ||
      Object.keys(data)[0] === 'cristal1_diseno_id'     ||
      Object.keys(data)[0] === 'cristal1_indice_id'     ||
      Object.keys(data)[0] === 'cristal1_material_id'   ||
      Object.keys(data)[0] === 'cristal1_color_id'      ||
      Object.keys(data)[0] === 'cristal1_tratamiento_id'||
      Object.keys(data)[0] === 'cristal1_diametro'      ||
      Object.keys(data)[0] === 'a1_od_esf'              ||
      Object.keys(data)[0] === 'a1_od_cil'              ||

      Object.keys(data)[0] === 'a1_oi_esf'              ||
      Object.keys(data)[0] === 'a1_oi_cil'
     ){
      console.log('render')
      const formValue = getValues()
      const {cristal1_marca_id, cristal1_diseno_id, cristal1_indice_id, cristal1_color_id , cristal1_material_id,cristal1_tratamiento_id, cristal1_diametro } = formValue;
 

      if(cristal1_marca_id                      !== undefined &&
        cristal1_diseno_id                      !== undefined &&
        cristal1_indice_id                      !== undefined && 
        cristal1_color_id                       !== undefined &&
        cristal1_material_id                    !== undefined &&
        cristal1_tratamiento_id                 !== undefined &&
        cristal1_diametro                       !== ''   
      ){
        console.log('ejecutando llamada...')
        // console.log('ejecutando llamada...')

        const _pkToDelete1_od ={
          "marca":      cristal1_marca_id,
          "diseno":     cristal1_diseno_id,
          "indice":     cristal1_indice_id,
          "material":   cristal1_material_id,
          "color":      cristal1_color_id,
          "tratamiento":cristal1_tratamiento_id,
          "diametro":   cristal1_diametro,
          "esferico":   dioptrias_receta.value.a1_od.esf ?? 0, 
          "cilindrico": dioptrias_receta.value.a1_od.cil ?? 0
        }


        console.log(_pkToDelete1_od)
        
        const _pkToDelete1_oi ={
          "marca":      cristal1_marca_id,
          "diseno":     cristal1_diseno_id,
          "indice":     cristal1_indice_id,
          "material":   cristal1_material_id,
          "color":      cristal1_color_id,
          "tratamiento":cristal1_tratamiento_id,
          "diametro":   cristal1_diametro,
          "esferico":   dioptrias_receta.value.a1_oi.esf ?? 0,
          "cilindrico": dioptrias_receta.value.a1_oi.cil ?? 0, 
        }

        console.log(_pkToDelete1_oi)


        try {
          const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
          const encodedJSON = encodeURIComponent(pkJSON)

          // console.log(encodedJSON)
          
          const {data} = await axios(`${URLBackend}/api/proyectocristales/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`)
          
          const cristalesDATA = JSON.parse(data[0][0])
          console.log(cristalesDATA)
          
          A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
          A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   "
          // A1_GRUPO.value = cristalesDATA["GRUPO"]

          A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  "
          A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  "
          
          validation_Cristal1_od(cristalesDATA["CR_OD"])
          validation_Cristal1_oi(cristalesDATA["CR_OI"])
        } catch (error) {
          console.log(error)
          throw error
        }  
      }
    }

    //? ANTEOJO 2:
    if(
      Object.keys(data)[0] === 'cristal2_marca_id'      ||
      Object.keys(data)[0] === 'cristal2_diseno_id'     ||
      Object.keys(data)[0] === 'cristal2_indice_id'     ||
      Object.keys(data)[0] === 'cristal2_material_id'   ||
      Object.keys(data)[0] === 'cristal2_color_id'      ||
      Object.keys(data)[0] === 'cristal2_tratamiento_id'||
      Object.keys(data)[0] === 'cristal2_diametro'      ||
      Object.keys(data)[0] === 'a1_od_esf'              ||
      Object.keys(data)[0] === 'a1_od_cil'
    ){
      const formValue = getValues()
      const {cristal2_marca_id, cristal2_diseno_id, cristal2_indice_id, cristal2_color_id , cristal2_material_id,cristal2_tratamiento_id, cristal2_diametro } = formValue;
 

      if(cristal2_marca_id                      !== undefined &&
        cristal2_diseno_id                      !== undefined &&
        cristal2_indice_id                      !== undefined && 
        cristal2_color_id                       !== undefined &&
        cristal2_material_id                    !== undefined &&
        cristal2_tratamiento_id                 !== undefined &&
        cristal2_diametro                       !== ''   
      ){
        console.log('ejecutando llamada.....')
        const _pkToDelete1_od ={
          "marca":      cristal2_marca_id,
          "diseno":     cristal2_diseno_id,
          "indice":     cristal2_indice_id,
          "material":   cristal2_material_id,
          "color":      cristal2_color_id,
          "tratamiento":cristal2_tratamiento_id,
          "diametro":   cristal2_diametro,
          "esferico":   dioptrias_receta.value.a2_od.esf ?? 0, 
          "cilindrico": dioptrias_receta.value.a2_od.cil ?? 0
        }


        console.log(_pkToDelete1_od)
        
        const _pkToDelete1_oi ={
          "marca":      cristal2_marca_id,
          "diseno":     cristal2_diseno_id,
          "indice":     cristal2_indice_id,
          "material":   cristal2_material_id,
          "color":      cristal2_color_id,
          "tratamiento":cristal2_tratamiento_id,
          "diametro":   cristal2_diametro,
          "esferico":   dioptrias_receta.value.a2_oi.esf ?? 0,
          "cilindrico": dioptrias_receta.value.a2_oi.cil ?? 0, 
        }

        console.log(_pkToDelete1_oi)

      }

    }
    // todo FIN CRISTALES

    // if((Object.keys(data)[0] === 'a1_od_esf' && Object.keys(data)[0] !== '') || (Object.keys(data)[0] === 'a1_od_eje' && Object.keys(data)[0] !== '') || (Object.keys(data)[0] === 'a1_od_cil' && Object.keys(data)[0] !== '')){
    //   transponer('a1_od_esf', 'a1_od_cil', 'a1_od_eje', 'a1_od_ad', 'a1_od', data)
    //   // transponer1Ejecutado = true;
    // }
    //FUNCION

    //TODO: DIOPTRIAS CRISTALES SI ES TIPO 3(LEJOS/CERCA)
    console.log(tipo_de_anteojo.value)
    if(tipo_de_anteojo.value === '3'){
      // clearInputDioptrias()
      //? OJO DERECHO
      if(
        Object.keys(data)[0] === 'a1_od_esf' ||
        Object.keys(data)[0] === 'a1_od_cil' ||
        Object.keys(data)[0] === 'a1_od_eje' ||
        Object.keys(data)[0] === 'a1_od_ad'  ||
        tipo_de_anteojo.value === '3'
      ){
        if(dioptrias_receta.value.a1_od.ad < 0){
          a2_od_esf.value = " ";
          console.log('render')
          dioptrias_receta.value.a1_od.ad  = " ";
        }
        

        if(typeof dioptrias_receta.value.a1_od.ad !== 'object' &&  dioptrias_receta.value.a1_od.ad > 0){
          a2_od_esf.value = (typeof dioptrias_receta.value.a1_od.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_od.esf) ? 0 : dioptrias_receta.value.a1_od.esf ) + dioptrias_receta.value.a1_od.ad
          a2_od_cil.value = (typeof dioptrias_receta.value.a1_od.cil === 'object' ? 0 : dioptrias_receta.value.a1_od.cil)
          a2_od_eje.value = (typeof dioptrias_receta.value.a1_od.eje === 'object' ? 0 : dioptrias_receta.value.a1_od.eje)
        }

        // a2_od_cil.value = (typeof dioptrias_receta.value.a1_od.cil === 'object' ? 0 : dioptrias_receta.value.a1_od.cil)
        // a2_od_eje.value = (typeof dioptrias_receta.value.a1_od.eje === 'object' ? 0 : dioptrias_receta.value.a1_od.eje)

      }
      //? OJO IZQUIERDO
      if(
        Object.keys(data)[0] === 'a1_oi_esf' ||
        Object.keys(data)[0] === 'a1_oi_cil' ||
        Object.keys(data)[0] === 'a1_oi_eje' ||
        Object.keys(data)[0] === 'a1_oi_ad'  ||
        tipo_de_anteojo.value === '3'
      ){
        if(dioptrias_receta.value.a1_od.ad < 0){
          a2_od_esf.value = " ";
          console.log('render')
          dioptrias_receta.value.a1_od.ad  = " ";
        }

        if(typeof dioptrias_receta.value.a1_oi.ad !== 'object' && dioptrias_receta.value.a1_oi.ad > 0){
          a2_oi_esf.value = (typeof dioptrias_receta.value.a1_oi.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? 0 : dioptrias_receta.value.a1_oi.esf) + dioptrias_receta.value.a1_oi.ad
          a2_oi_eje.value = (typeof dioptrias_receta.value.a1_oi.eje === 'object' ? 0 : dioptrias_receta.value.a1_oi.eje)
          a2_oi_cil.value = (typeof dioptrias_receta.value.a1_oi.cil === 'object' ? 0 : dioptrias_receta.value.a1_oi.cil);
        }

      }




      console.log(name)
      console.log(Object.keys(data)[0])
      // let transponer1Ejecutado = false;




      validation_A2_OD_ESF(a2_od_esf.value)
      validation_A2_OD_CIL(a2_od_cil.value)
      validation_A2_OD_EJE(a2_od_eje.value)


      validation_A2_OI_ESF(a2_oi_esf.value)
      validation_A2_OI_CIL(a2_oi_cil.value)
      validation_A2_OI_EJE(a2_oi_eje.value)

    }
    actualizarEstado(Object.keys(data)[0], 1)

  };
  
  const loadFormData = () => {
    if (formValues) {
      setValue('optica', formValues.optica);
      setValue('cliente', formValues.cliente);
      setValue('receta', formValues.receta);
      setValue('cristales', formValues.cristales);
    }
  };

  const handlePausarClick = () => {
    setSubmitAction('pausar');
    console.log('click')
    console.log(data && data[EnumGrid.proyecto_codigo])
    console.log(formValues)

  };
  const handleIngresarClick = () => {
    setSubmitAction('ingresar');
  };

  const handleProcesarClick = () => {
    setSubmitAction('procesar');
    // updateOT(data, OTAreaActual,OTAreas["areaSiguiente"] , 20);
  };



React.useEffect(() => {
  if (submitAction === 'pausar' || submitAction === 'procesar' || submitAction === 'derivar' || submitAction === 'ingresar') {
    handleSubmit(onSubmit)();
  }
}, [submitAction]);





if(isEditting){
  
  
  // console.log(OT)

  // console.log('validaciones')
  //VALIDACIONES NIVEL 1
  validationProyectos(data && data[EnumGrid.proyecto_codigo])
  validationEstablecimientos(data && data[EnumGrid.establecimiento_id])
  validationCliente(data && data[EnumGrid.cliente_rut])
  validationFechaAtencion(data && data[EnumGrid.fecha_atencion])
  validationTipoAnteojos(data && data[EnumGrid.tipo_anteojo_id])
  validationPuntoVenta(data && data[EnumGrid.punto_venta_id])

  //VALIDACIONES NIVEL 2

}


// console.log(validationNivel1.value)
// console.log(validationNivel2.value)
// console.log(sumatoriaNivel1)
// console.log(sumatoriaNivel2)

const fetchDioptrias = async(proyecto:string) => {
    try {

      const requests = [
        axios(`${URLBackend}/api/ot/listado/?query=12&_p3=ESF&_proyecto=${proyecto}`),
        axios(`${URLBackend}/api/ot/listado/?query=12&_p3=CIL&_proyecto=${proyecto}`),
        axios(`${URLBackend}/api/ot/listado/?query=12&_p3=EJE&_proyecto=${proyecto}`),
        axios(`${URLBackend}/api/ot/listado/?query=12&_p3=AD&_proyecto=${proyecto}`)

      ]
      
      const [responseESF, responseCIL, responseEJE, responseAD] = await Promise.all(requests);

      dioptrias.value.ESF = responseESF.data;
      dioptrias.value.CIL = responseCIL.data;
      dioptrias.value.EJE = responseEJE.data;
      dioptrias.value.AD  = responseAD.data;

      console.log(dioptrias.value)
    } catch (error) {
      console.log(error)
      throw error
    }
}


// console.log(validationNivel2.value)
// console.log(validationNivel1.value)
// console.log(validationNivel2)
// console.log(dioptrias_receta.value.a1_od)
// console.log(dioptriasHabilitadas.value)
// console.log(dioptrias.value)
// console.log(a1_od_esf.value)
// console.log(data && data[EnumGrid.estado_validacion_id])

// console.log(OTPermissions)
// console.log(permisos_campos)

// const handleEsferico = () => {
//   inputName.value = inputName.value + 1
//   console.log(inputName.value)
// }

// console.log(validar_parametrizacion.value)

// console.log(tipo_de_anteojo.value)
// console.log(data && data[EnumGrid.validar_parametrizacion_id])
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseForm()
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [closeModal]);

// console.log(isEditting)
  // console.log(data)



  console.log(data && data[EnumGrid.validar_parametrizacion_id])
  // console.log(OTAreaActual)
  // console.log(OTPermissions)
  // console.log(OTPermissions[10])
  // console.log(OTPermissions[9])
  // console.log(sumatoriaNivel1)


  

  // console.log(data && data[EnumGrid.estado_id])
  // console.log(isMotivo)
  console.log(isMOT)
  console.log(data)
  console.log(validationNivel1.value)
  console.log(validationNivel2.value)

  //PASAR DATA A FORMVALUES Y LEER FORMVALUES

  return (

    <div className='useFormContainer top-[1%] w-[94vw] relative h-[95vh] z-20'>
      <Tabs>
        
        <TabList className='flex items-center'>
          <Tab className="custom-tab btnAreas">Óptica</Tab>
          <Tab className="custom-tab btnAreas">Cliente</Tab>
          <Tab className="custom-tab btnAreas text-white">Receta</Tab>
          <Tab className="custom-tab btnAreas text-white">Armazones</Tab>
          <Tab className="custom-tab btnAreas text-white">Cristales</Tab>
          
          <Tab className="custom-tab">Bitácora</Tab>
          <h1>Folio: {data && data[EnumGrid.folio]}</h1>
        </TabList>


   <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spinner className="h-12 w-12" style={{ color: '#f39c12' }} /></div>}>
      <div className='top-0 absolute right-3 text-2xl cursor-pointert' onClick={()=>{handleCloseForm()}}>X</div>
            <TabPanel onSelect={loadFormData}>
              <FOTOptica onlyRead={onlyRead} setIsMotivo={setIsMotivo} isEditting={isEditting} data={data && data} formValues={formValues["optica"]} control={control} setToggle={setToggle}  onDataChange={(data:any) => handleFormChange(data , 'optica')} permiso_estado_impresion={permiso_estado_impresion} permiso_estado_validacion={permiso_estado_validacion} permiso_resolucion_garantia={permiso_resolucion_garantia} />
            </TabPanel>
            
          <TabPanel>
            <FOTClientes onlyRead={onlyRead} data={data && data} isEditting={isEditting} register={register} formValues={formValues["cliente"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cliente')} strCodigoProyecto={strCodigoProyecto} setExistCliente={setExistCliente}    />
          </TabPanel>

          <TabPanel>
            <FOTReceta permiso_grupo_dioptria={permiso_grupo_dioptria} onlyRead={onlyRead} isEditting={isEditting} data={data && data} formValues={formValues["receta"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'receta')}  />
          </TabPanel>

          <TabPanel> 
            <FOTArmazones permiso_armazones={permiso_armazones} onlyRead={onlyRead}  data={data && data} formValues={formValues["armazones"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'armazones')}  />
          </TabPanel>
          
          <TabPanel>
            <FOTCristales permiso_cristales={permiso_cristales} onlyRead={onlyRead} isEditting={isEditting} data={data && data}  formValues={formValues["cristales"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cristales')}   /> 
          </TabPanel>

          <TabPanel>
            <FOTBitacora isMOT={isMOT} otFolio={data && data[EnumGrid.folio]}/>
          </TabPanel>

          {showGarantia && (
            <div>
              <FOTGarantia data={data && data} onClose={onCloseGarantia}/>
            </div>
          )}

          {showDerivacion && (
            <div>
              <FOTDerivacion  closeModal={closeModal} formValues={formValues} data={data && data} onClose={onCloseDerivacion}/>
            </div>
          )}


          <div className='flex items-center mx-auto  justify-around w-1/2 '>
        
                {isEditting && 
                isMOT       && 
                // isMotivo    &&  (
                  (
                    <button className='bg-green-400 mx-4 text-white w-1/4' onClick={() => setShowGarantia(prev => !prev)}>
                      Garantia
                    </button>
                )}

                {OTPermissions && 
                !isMOT &&
                isEditting && 
                OTPermissions[6] === "1" &&
                sumatoriaNivel1 === validationNivel1.value.length &&
                (sumatoriaNivel2 === validationNivel2.value.length || data && data[EnumGrid.validar_parametrizacion_id] === "0" ) &&
               (
                  <button className='bg-green-400 mx-4  text-white w-1/4 ' onClick={handleProcesarClick}>Procesar</button>
                )}

                

                {OTPermissions && 
                !isMOT &&
                isEditting &&
                OTPermissions[7] === "1" &&
                (
                  <button className='bg-yellow-400 mx-4   w-1/4 'onClick={handlePausarClick}>Pausar</button>
                )}

                {OTPermissions &&
                !isMOT &&
                isEditting &&
                OTPermissions[8] === "1" &&
                sumatoriaNivel1 === validationNivel1.value.length &&
                data && data[EnumGrid.estado_id] > 1 && (
                  <button className='bg-red-400 mx-4 text-white  w-1/4 ' onClick={()=>{setShowDerivacion((prev)=>!prev)}}>Derivar</button>
                )}



                {OTPermissions &&
                OTPermissions[9] === "1" && 
                sumatoriaNivel1 === validacionNivel1.length && 
                (data && data[EnumGrid.estado_id] === 30 || data && data[EnumGrid.estado_id] === 40 ) && 
                (
                  <button className='bg-black mx-4 text-white  w-1/4' onClick={()=>handleAnular()}>Anular</button>
                )}
                
                {OTPermissions &&
                !isEditting &&
                 OTPermissions[10] === "1" &&
                //  sumatoriaNivel1 === validationNivel1.value.length &&
                 (
                  <button className=' w-1/4 bg-blue-200 text-white' onClick={handleIngresarClick}>Ingresar</button>
                 )
                
                }
          </div>


      </Suspense>
      </Tabs>
    </div>
  );
};

export default FOT;


