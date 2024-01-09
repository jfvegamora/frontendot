import React,{useEffect, useState, Suspense, lazy} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import 'react-tabs/style/react-tabs.css'; 
import axios from 'axios';
import {signal } from "@preact/signals-react";
import { Button } from '@material-tailwind/react';


import FOTGarantia from '../../components/OTForms/FOTGarantia';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import FOTDerivacion from '../../components/OTForms/FOTDerivacion';
import { A1_CR_OD, A1_CR_OI, A1_GRUPO_OD, A1_GRUPO_OI, A2_CR_OD, A2_CR_OI, A2_Diametro, A2_GRUPO_OD, A2_GRUPO_OI, SEXO, TIPO_CLIENTE, 
  a1_armazon, 
  a2_armazon, 
  // a1_od_ad, a1_od_cil, a1_od_eje, a1_od_esf, 
  a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, a3_armazon, armazonesJSONsignal, changeCodigoCristal_A1, changeCodigoCristal_A2, clearDioptrias,  
  clearGrupos,  
  clearSelectInput,  
  cliente_rut,  
  codigoProyecto,  
  cristalesJSONsignal,  
  dioptrias_receta,  
  fecha_atencion_signal,  
  // clearDioptriasA2,  dioptriasHabilitadas, 
   fecha_despacho, fecha_entrega_cliente, fecha_entrega_taller, 
  inputChangeActions, 
  isExistClient, 
  isToggleImpression, 
  isToggleValidation, 
  motivo_ot, 
  punto_venta, 
  // reiniciarA2DioptriasReceta, 
  reiniciarDioptriasReceta, reiniciarValidationNivel1, reiniciarValidationNivel2, tipo_de_anteojo, updateOT, validar_parametrizacion } from '../../utils';
import { validationCliente, validationEstablecimientos, validationFechaAtencion, validationProyectos, validationPuntoVenta, validationTipoAnteojos, validation_A2_OD_CIL, validation_A2_OD_EJE, validation_A2_OD_ESF, validation_A2_OI_CIL, validation_A2_OI_EJE, validation_A2_OI_ESF, validation_Cristal1_od, validation_Cristal1_oi, validation_Cristal2_od, validation_Cristal2_oi } from '../../utils/validationOT';
// import { inputName } from '../../components/OTForms/Otprueba';
// import { verificaCampos } from '../../utils/OTReceta_utils';
import { URLBackend } from '../../hooks/useCrud';
// import {transponer, transponer_a2 } from '../../utils/FOTReceta_utils';
import { Spinner } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { addToArmazones, addToCristales, clearCodigos, fetchOT } from '../../../redux/slices/OTSlice';
import { validation_tipo_anteojo } from '../../utils/OTReceta_utils';

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
  {
    campo: "cliente_nombre",
    valor: 0
  },
  {
    campo : "cliente_tipo",
    valor : 0
  },
  {
    campo : "cliente_sexo",
    valor : 0
  },
  {
    campo : "cliente_telefono",
    valor : 0
  },
  {
    campo : "cliente_comuna",
    valor : 0
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
  {
    campo : "establecimiento",
    valor : 0
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



export const tipo_anteojo = signal(false);
export const onlyReadReceta = signal(false);
export const a1Grupo = signal(0);





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
  const permisosCampos           = useAppSelector((store: AppStore) => store.user?.permisos_campos);

  let permiso_usuario_armazones           = permisosCampos && permisosCampos[0] === "1" ? true : false;
  let permiso_usuario_cristales           = permisosCampos && permisosCampos[1] === "1" ? true : false;
  let permiso_usuario_estado_impresion    = permisosCampos && permisosCampos[2] === "1" ? true : false;
  let permiso_usuario_estado_validacion   = permisosCampos && permisosCampos[3] === "1" ? true : false;
  let permiso_usuario_resolucion_garantia = permisosCampos && permisosCampos[4] === "1" ? true : false;
  let permiso_usuario_grupo_dioptria      = permisosCampos && permisosCampos[5] === "1" ? true : false;
  let permiso_usuario_receta              = permisosCampos && permisosCampos[6] === "1" ? true : false;


  
  const permisosAreas = OTAreaActual && permissions(OTAreaActual)[6] as any

  let permiso_areas_armazones            = permisosAreas && permisosAreas[0] === '1' ? true : false;
  let permiso_areas_cristales            = permisosAreas && permisosAreas[1] === '1' ? true : false;
  let permiso_areas_estado_impresion     = permisosAreas && permisosAreas[2] === '1' ? true : false;
  let permiso_areas_estado_validacion    = permisosAreas && permisosAreas[3] === '1' ? true : false;
  let permiso_areas_resolucion_garantia  = permisosAreas && permisosAreas[4] === '1' ? true : false;
  let permiso_areas_grupo_dioptria       = permisosAreas && permisosAreas[5] === '1' ? true : false;
  let permiso_areas_receta               = permisosAreas && permisosAreas[6] === '1' ? true : false;


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
    dispatch(clearCodigos())
    
    if(data){
      motivo_ot.value = data[EnumGrid.motivo] === 'Garantía' ? false : true
      dispatch(addToArmazones([{codigo: data && data[EnumGrid.a1_armazon_id]}, {codigo: data && data[EnumGrid.a2_armazon_id]}]))
      dispatch(addToCristales([{codigo: data && data[EnumGrid.cristal1_od]}, {codigo:data && data[EnumGrid.cristal1_oi]}, {codigo: data && data[EnumGrid.cristal2_od]}, {codigo: data && data[EnumGrid.cristal2_oi]}]))
    }
  },[])




  console.log(data && data[EnumGrid.estado_id])
  //Metodo editar query04
  // const updateOT =async (
  //   jsonData:any,
  //   _origen:number,
  //   _destino:number,
  //   _estado:number,
  //   cristalesJSON:any,
  //   armazonesJSON:any,
  // )  => {
  //   let estado_impresion = 1;
  //   let estado_validacion = 1;
  //   let motivo = 1;
  //   // let _rut = ""
  //   let _p3 = ""
  //   console.log(_origen)
  //   // _p3 = `'${jsonData[EnumGrid.cliente_rut]}','${formValues && formValues["cliente"] && formValues["cliente"]["cliente_nombre"] || jsonData[EnumGrid.cliente_nomnbre]}',${jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.beneficiario ? "1" : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.particular ? "2" : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData[EnumGrid.cliente_sexo] === SEXO.masculino ? "1" : jsonData[EnumGrid.cliente_sexo] === SEXO.femenino ? "2" : jsonData[EnumGrid.cliente_sexo] === SEXO.no_aplica ? "3" : "0"},'${jsonData[EnumGrid.cliente_fecha_nacimiento]}','${jsonData[EnumGrid.cliente_direccion]}' ,${formValues && formValues["cliente"] && formValues["cliente"]["cliente_comuna_id"] || jsonData[EnumGrid.cliente_comuna_id] }, '${jsonData[EnumGrid.cliente_telefono]}','${jsonData[EnumGrid.cliente_correo]}', ${jsonData[EnumGrid.establecimiento_id]}`;


  //   // if(isEditting){
  //   //   _rut = `${jsonData[EnumGrid.cliente_rut] || ""}`

  //   //   _p3 = [ ...(jsonData[EnumGrid.cliente_nomnbre] !== undefined ? [`nombre="${formValues && formValues["cliente"] && formValues["cliente"]["cliente_nombre"] || jsonData[EnumGrid.cliente_nomnbre]}"`] : []),  ...(jsonData[EnumGrid.cliente_tipo] !== undefined ? [`tipo=${jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.beneficiario ? 1 : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.particular ? 2 : jsonData[EnumGrid.cliente_tipo] === TIPO_CLIENTE.optica ? 3 : 0}`] : []),...(jsonData[EnumGrid.cliente_sexo] !== undefined ? [`sexo=${jsonData[EnumGrid.cliente_sexo] === SEXO.masculino ? 1 : jsonData[EnumGrid.cliente_sexo] === SEXO.femenino ? 2 : jsonData[EnumGrid.cliente_sexo] === SEXO.no_aplica ? 3 : 0}`] : []) , ...(jsonData[EnumGrid.cliente_fecha_nacimiento] !== undefined ? [`fecha_nacimiento="${jsonData[EnumGrid.cliente_fecha_nacimiento]}"`] : []) , ...(jsonData[EnumGrid.cliente_direccion] !== undefined ? [`direccion="${jsonData[EnumGrid.cliente_direccion]}"`] : []) , ...( formValues && formValues["cliente"] && formValues["cliente"]["cliente_comuna_id"]!== undefined ? [`comuna=${formValues["cliente"]["cliente_comuna_id"] || 150}`] : []), ...(jsonData[EnumGrid.cliente_telefono] !== undefined ? [`telefono="${jsonData[EnumGrid.cliente_telefono]}"`] : []), ...(jsonData[EnumGrid.cliente_correo] !== undefined ? [`correo="${jsonData[EnumGrid.cliente_correo]}"`] : []), ...(jsonData[EnumGrid.establecimiento_id] !== undefined ? [`establecimiento=${jsonData[EnumGrid.establecimiento_id]}`] : [])].join(', ');
  //   //   _p3 = _p3.replace(/'/g, '!');
  //   // }
        
  //   console.log(jsonData)
    
  //   // const fields = [`motivo=${motivo}`, `area=${_destino}`, `estado=${_estado}`, `estado_validacion=${estado_validacion}`, `estado_impresion=${estado_impresion}`, `proyecto='${jsonData[EnumGrid.proyecto_codigo]}'`, `establecimiento=${jsonData[EnumGrid.establecimiento_id]}`, ...(jsonData[EnumGrid.cliente_rut] !== undefined ? [`cliente='${jsonData[EnumGrid.cliente_rut]}'`] : []), `fecha_atencion='${jsonData[EnumGrid.fecha_atencion]}'`, `fecha_entrega_taller='${jsonData[EnumGrid.fecha_entrega_taller]}'`, `fecha_despacho='${jsonData[EnumGrid.fecha_despacho]}'`, `fecha_entrega_cliente='${jsonData[EnumGrid.fecha_entrega_cliente]}'`, `punto_venta=${jsonData[EnumGrid.punto_venta_id]}`, `numero_receta=${jsonData[EnumGrid.numero_receta]}`, `fecha_receta='${jsonData[EnumGrid.fecha_entrega_cliente]}'`, `tipo_anteojo=${jsonData[EnumGrid.tipo_anteojo_id]}`, `a1_od_esf=${jsonData[EnumGrid.a1_od_esf]}`, `a1_od_cil=${jsonData[EnumGrid.a1_od_cil]}`, `a1_od_eje=${jsonData[EnumGrid.a1_od_eje]}`, `a1_od_ad=${jsonData[EnumGrid.a1_od_ad]}`, `a1_oi_esf=${jsonData[EnumGrid.a1_oi_esf]}`, `a1_oi_cil=${jsonData[EnumGrid.a1_oi_cil]}`, `a1_oi_eje=${jsonData[EnumGrid.a1_oi_eje]}`, `a1_oi_ad=${jsonData[EnumGrid.a1_oi_ad]}`, `a1_dp=${jsonData[EnumGrid.a1_dp]}`, `a1_alt=${jsonData[EnumGrid.a1_alt]}`, `a1_grupo=${a1_grupo}`, `a2_od_esf=${jsonData[EnumGrid.a2_od_esf]}`, `a2_od_cil=${jsonData[EnumGrid.a2_od_cil]}`, `a2_od_eje=${jsonData[EnumGrid.a2_od_eje]}`, `a2_oi_esf=${jsonData[EnumGrid.a2_oi_esf]}`, `a2_oi_cil=${jsonData[EnumGrid.a2_oi_cil]}`, `a2_oi_eje=${jsonData[EnumGrid.a2_oi_eje]}`, `a2_dp=${jsonData[EnumGrid.a2_dp]}`, `a2_grupo=${a2_grupo}`, `anteojo1_opcion_vta=${jsonData[EnumGrid.a1_opcion_vta_id]}`, `anteojo1_armazon=${jsonData[EnumGrid.a1_armazon_id]}`, `anteojo2_opcion_vta=${jsonData[EnumGrid.a2_opcion_vta_id]}`, `anteojo2_armazon=${jsonData[EnumGrid.a2_armazon_id]}`, `anteojo3_opcion_vta=${jsonData[EnumGrid.a3_opcion_vta_id]}`, `anteojo3_armazon=${jsonData[EnumGrid.a3_armazon_id]}`, `cristales1_opcion_vta=${jsonData[EnumGrid.cristal1_opcion_vta_id]}`, `cristales1_diseno=${jsonData[EnumGrid.cristal1_diseno_id]}`, `cristales1_indice=${jsonData[EnumGrid.cristal1_indice_id]}`, `cristales1_material=${jsonData[EnumGrid.cristal1_material_id]}`, `cristales1_tratamiento=${jsonData[EnumGrid.cristal1_tratamiento_id]}`, `cristales1_color=${jsonData[EnumGrid.cristal1_color_id]}`, `cristales1_od=${jsonData[EnumGrid.cristal1_od]}`, `cristales1_oi=${jsonData[EnumGrid.cristal1_oi]}`, `cristales1_tratamiento_adicional=${jsonData[EnumGrid.cristal1_tratamiento_adicional_id]}`, `cristales2_opcion_vta=${jsonData[EnumGrid.cristal2_od_opcion_venta_id]}`, `cristales2_diseno=${jsonData[EnumGrid.cristal2_diseno_id]}`, `cristales2_indice=${jsonData[EnumGrid.cristal2_indice_id]}`, `cristales2_material=${jsonData[EnumGrid.cristal2_material_id]}`, `cristales2_tratamiento=${jsonData[EnumGrid.cristal2_tratamiento_id]}`, `cristales2_color=${jsonData[EnumGrid.cristal2_color_id]}`, `cristales2_od=${jsonData[EnumGrid.cristal2_od]}`, `cristales2_oi=${jsonData[EnumGrid.cristal2_oi]}`, `cristales2_tratamiento_adicional=${jsonData[EnumGrid.cristal2_tratamiento_adicional_id]}`, `motivo_garantia=${jsonData[EnumGrid.motivo_garantia_id]}`, `folio_asociado=${jsonData[EnumGrid.folio_asociado]}`, `resolucion_garantia=${jsonData[EnumGrid.resolucion_garantia_id]}`, `worktracking=${jsonData[EnumGrid.worktracking]}`, `nota_venta=${jsonData[EnumGrid.nota_venta]}`, `numero_factura=${jsonData[EnumGrid.numero_factura]}`, `folio_interno_mandante=${jsonData[EnumGrid.folio_interno_mandante]}`, `observaciones='${jsonData[EnumGrid.observaciones] || ""}'`];
    
  //   console.log(formValues)
  //   console.log(jsonData.numero_receta)

  //   console.log(a1_armazon.value)

  //   console.log(jsonData.cristal1_color_id)

  //   console.log(typeof jsonData.cristal1_color_id  === 'undefined' ? data && data[EnumGrid.cristal1_color_id] : parseInt(jsonData.cristal1_color_id))

  //   console.log(A1_CR_OD.value)


  //   console.log(`a2_oi_esf=${typeof a2_oi_esf.value                                                        !== 'object' ? a2_oi_esf.value : 0 }`)
  //   console.log(a2_oi_esf.value)
    

  //   console.log(typeof jsonData.cristal1_marca_id === 'undefined' ? data && data[EnumGrid.cristal1_marca_id]: parseInt(jsonData.cristal1_marca_id) )

  //   console.log(jsonData.cristal1_marca_id)
  //   const fields = [
  //     `motivo=${motivo}`,
  //     `area=${_destino}`,
  //     `estado=${_estado}`,
  //     `validar_parametrizacion=${estado_validacion}`,
  //     `estado_impresion=${estado_impresion}`,
  //     `proyecto="${jsonData.proyecto_codigo                                                       !== undefined ? jsonData.proyecto_codigo : ""}"`,
  //     (`establecimiento=${data && data[EnumGrid.establecimiento_id]                               !== undefined ? data[EnumGrid.establecimiento_id] : 0 }`),
  //     (`cliente="${!cliente_rut.value.trim()                                                      === false     ? cliente_rut.value : "" }"`),
  //     (`fecha_atencion="${!fecha_atencion_signal.value.trim()                                     === false     ? fecha_atencion_signal.value : "" }"`),
  //     (`fecha_entrega_taller="${!fecha_entrega_taller.value.trim()                                === false     ? fecha_entrega_taller.value : "" }"`),
  //     (`fecha_despacho="${!fecha_despacho.value.trim()                                            === false     ? fecha_despacho.value : "" }"`),
  //     (`fecha_entrega_cliente="${!fecha_entrega_cliente.value.trim()                              === false     ? fecha_entrega_cliente.value : ""}"`),
  //     (`punto_venta=${jsonData.punto_venta_id                                                     !== undefined ? jsonData.punto_venta_id : 0 }`),
  //     (`numero_receta=${data && data[EnumGrid.numero_receta]                                      !== undefined ? data[EnumGrid.numero_receta] : 0 }`),
  //     (`fecha_receta="${jsonData.fecha_receta                                                     !== undefined ? jsonData.fecha_receta : "" }"`),
  //     (`tipo_anteojo=${!tipo_de_anteojo.value.trim()                                              === false     ? tipo_de_anteojo.value : 0 }`),


  //     (`a1_od_esf=${typeof dioptrias_receta.value.a1_od.esf                                       !== 'object' ? dioptrias_receta.value.a1_od.esf : 0 }`),
  //     (`a1_od_cil=${typeof dioptrias_receta.value.a1_od.cil                                       !== 'object' ? dioptrias_receta.value.a1_od.cil : 0 }`),
  //     (`a1_od_eje=${typeof dioptrias_receta.value.a1_od.eje                                       !== 'object' ? dioptrias_receta.value.a1_od.eje : 0 }`),
  //     (`a1_od_ad =${typeof dioptrias_receta.value.a1_od.ad                                        !== 'object' ? dioptrias_receta.value.a1_od.ad : 0 }`),
  //     (`a1_oi_esf=${typeof dioptrias_receta.value.a1_oi.esf                                       !== 'object' ? dioptrias_receta.value.a1_oi.esf : 0 }`),
  //     (`a1_oi_cil=${typeof dioptrias_receta.value.a1_oi.cil                                       !== 'object' ? dioptrias_receta.value.a1_oi.cil : 0 }`),
  //     (`a1_oi_eje=${typeof dioptrias_receta.value.a1_oi.eje                                       !== 'object' ? dioptrias_receta.value.a1_oi.eje : 0 }`),
  //     (`a1_oi_ad =${typeof dioptrias_receta.value.a1_oi.ad                                        !== 'object' ? dioptrias_receta.value.a1_oi.ad : 0 }`),
  //     (`a1_dp=${jsonData.a1_dp                                                                    !== ''       ? jsonData.a1_dp : 0 }`),
  //     (`a1_alt=${jsonData.a1_alt                                                                  !== ''       ? jsonData.a1_alt : 0 }`),


  //     `a1_grupo_od="${typeof A1_GRUPO_OD.value                                                    !== 'object' ? A1_GRUPO_OD.value : ""}"`,
  //     `a1_grupo_oI="${typeof A1_GRUPO_OI.value                                                    !== 'object' ? A1_GRUPO_OI.value : ""}"`,
      
  //     (`a2_od_esf=${typeof a2_od_esf.value                                                        !== 'object' ? a2_od_esf.value : 0 }`),
  //     (`a2_od_cil=${typeof a2_od_cil.value                                                        !== 'object' ? a2_od_cil.value : 0 }`),
  //     (`a2_od_eje=${typeof a2_od_eje.value                                                        !== 'object' ? a2_od_eje.value : 0 }`),
  //     (`a2_oi_esf=${typeof a2_oi_esf.value                                                        !== 'object' ? a2_oi_esf.value : 0 }`),
  //     (`a2_oi_cil=${typeof a2_oi_cil.value                                                        !== 'object' ? a2_oi_cil.value : 0 }`),
  //     (`a2_oi_eje=${typeof a2_oi_eje.value                                                        !== 'object' ? a2_oi_eje.value : 0 }`),
  //     (`a2_dp=${jsonData.a2_dp                                                                    !== ''       ? jsonData.a2_dp : 0 }`),

      
  //     `a2_grupo_od="${typeof A2_GRUPO_OD.value                                                    !== 'object' ? A2_GRUPO_OD.value : ""}"`,
  //     `a2_grupo_oI="${typeof A2_GRUPO_OI.value                                                    !== 'object' ? A2_GRUPO_OI.value : ""}"`,
      
      
  //     (`anteojo1_opcion_vta=${0}`),
  //     (`anteojo1_armazon="${typeof a1_armazon.value                                               !== 'object' ? a1_armazon.value : "" }"`),
  //     (`anteojo2_opcion_vta=${0}`),
  //     (`anteojo2_armazon="${typeof a2_armazon.value                                               !== 'object' ? a2_armazon.value : "" }"`),
  //     (`anteojo3_opcion_vta=${0}`),
  //     (`anteojo3_armazon="${typeof a3_armazon.value                                               !== 'object' ? a3_armazon.value : "" }"`),

  //     (`cristales1_opcion_vta=${0}`),
  //     (`cristales1_marca=${typeof jsonData.cristal1_marca_id                                         === 'undefined' ? data && data[EnumGrid.cristal1_marca_id]                 : parseInt(jsonData.cristal1_marca_id)}`),
  //     (`cristales1_diseno=${typeof jsonData.cristal1_diseno_id                                    === 'undefined' ? data && data[EnumGrid.cristal1_diseno_id]                : parseInt(jsonData.cristal1_diseno_id)}`),
  //     (`cristales1_indice=${typeof jsonData.cristal1_indice_id                                    === 'undefined' ? data && data[EnumGrid.cristal1_indice_id]                : parseInt(jsonData.cristal1_indice_id)}`),
  //     (`cristales1_material=${typeof jsonData.cristal1_material_id                                === 'undefined' ? data && data[EnumGrid.cristal1_material_id]              : parseInt(jsonData.cristal1_material_id)}`),
  //     (`cristales1_tratamiento=${typeof jsonData.cristal1_tratamiento_id                          === 'undefined' ? data && data[EnumGrid.cristal1_tratamiento_id]           : parseInt(jsonData.cristal1_tratamiento_id)}`),
  //     (`cristales1_color=${typeof jsonData.cristal1_color_id                                      === 'undefined' ? data && data[EnumGrid.cristal1_color_id]                 : parseInt(jsonData.cristal1_color_id) }`),
  //     (`cristales1_od="${typeof A1_CR_OD.value                                                    !== 'object'    ? A1_CR_OD.value                                           : jsonData.cristal1_od}"`),
  //     (`cristales1_oi="${typeof A1_CR_OI.value                                                    !== 'object'    ? A1_CR_OI.value                                           : jsonData.cristal1_oi }"`),
  //     (`cristales1_tratamiento_adicional=${typeof jsonData.cristal1_tratamiento_adicional_id      === 'undefined' ? data && data[EnumGrid.cristal1_tratamiento_adicional_id] : parseInt(jsonData.cristal1_tratamiento_adicional_id)}`),

      
  //     (`cristales2_opcion_vta=${0}`),
  //     (`cristales2_marca=${typeof jsonData.cristal2_marca_id                                      === 'undefined' ? data && data[EnumGrid.cristal2_marca_id]              : parseInt(jsonData.cristal2_marca_id)}`),
  //     (`cristales2_diseno=${typeof jsonData.cristal2_diseno_id                                    === 'undefined' ? data && data[EnumGrid.cristal2_diseno_id]                : parseInt(jsonData.cristal2_diseno_id) }`),
  //     (`cristales2_indice=${typeof jsonData.cristal2_indice_id                                    === 'undefined' ? data && data[EnumGrid.cristal2_indice_id]                : parseInt(jsonData.cristal2_indice_id) }`),
  //     (`cristales2_material=${typeof jsonData.cristal2_material_id                                === 'undefined' ? data && data[EnumGrid.cristal2_material_id]              : parseInt(jsonData.cristal2_material_id)}`),
  //     (`cristales2_tratamiento=${typeof jsonData.cristal2_tratamiento_id                          === 'undefined' ? data && data[EnumGrid.cristal2_tratamiento_id]           : parseInt(jsonData.cristal2_tratamiento_id) }`),
  //     (`cristales2_color=${typeof jsonData.cristal2_color_id                                      === 'undefined' ? data && data[EnumGrid.cristal2_color_id]                 : parseInt(jsonData.cristal2_color_id)}`),
  //     (`cristales2_od="${typeof A2_CR_OD.value                                                    !== 'object'    ? A2_CR_OD.value                                           : jsonData.cristal2_od}"`),
  //     (`cristales2_oi="${typeof A2_CR_OI.value                                                    !== 'object'    ? A2_CR_OI.value                                           : jsonData.cristal2_oi}"`),
  //     (`cristales2_tratamiento_adicional=${typeof jsonData.cristal2_tratamiento_adicional_id      === 'undefined' ? data && data[EnumGrid.cristal2_tratamiento_adicional_id] : parseInt(jsonData.cristal2_tratamiento_adicional_id)}`),
      
      
  //     (`motivo_garantia=${jsonData.motivo_garantia_id                                      !== undefined ? jsonData.motivo_garantia_id : 0 }`),
  //     (`folio_asociado="${jsonData.folio_asociado                                          !== undefined ? jsonData.folio_asociado : 0 }"`),
  //     (`resolucion_garantia=${jsonData.resolucion_garantia_id                              !== undefined ? (jsonData.resolucion_garantia_id === 'Rechazada' ? 2 :1) : 0 }`),
  //     (`worktracking="${jsonData.worktracking                                              !== undefined ? jsonData.worktracking : "" }"`),
  //     (`nota_venta="${jsonData.nota_venta                                                  !== undefined ? jsonData.nota_venta : "" }"`),
  //     (`numero_factura="${jsonData.numero_factura                                          !== undefined ? jsonData.numero_factura : "" }"`),
  //     (`folio_interno_mandante="${jsonData.folio_interno_mandante                          !== undefined ? jsonData.folio_interno_mandante : "" }"`),
  //     (`observaciones="${jsonData.observaciones                                            !== undefined ? jsonData.observaciones : "" }"`),
      
    
  //   ];

 
  //   const filteredFields = fields
  //                           .map((a)=>a.split('='))
  //                           .filter((prev)=>prev[1] !== 'undefined')
  //                           .map((parts) => parts.join('='));
    
  //   console.log(filteredFields)


  //   let _p1 = filteredFields.join(',');    
  //   _p1 = _p1.replace(/'/g, '!');

  //   const query = {
  //     query: "04",
  //     _p1,
  //     _p3: _p3 || "",
  //     _proyecto: `${jsonData.proyecto_codigo}`,
  //     _folio: `${data && data[EnumGrid.folio]}` ,
  //     // _origen : _origen.toString(),
  //     _origen : _origen.toString(),
  //     _rut: `${cliente_rut.value}`,
  //     _destino: _destino.toString(),
  //     _estado:_estado.toString(), 
  //     _usuario:User["id"].toString(),
  //     _situacion:"0",
  //     _obs: "ot editada desde front",
  //     _cristalesJSON: cristalesJSON,
  //     _armazonesJSON: armazonesJSON,
  //     _punto_venta: `${jsonData.punto_venta_id}`,


  //     _cristalJSONOri: JSON.stringify(OTSlice.cristales),
  //     _armazonJSONOri: JSON.stringify(OTSlice.armazones)
      

  //   };


  //   console.log(jsonData)
  //   console.log("query", query);
  //   handleCloseForm()

  //   try {
  //     const response = await axios.post(`${URLBackend}/api/ot/editar/`, query)
  //     console.log(response)

  //   } catch (error) {
  //     console.log(error)

  //   }
  //   toast.success('OT Editada Correctamente')


  // }

  

  const switchCaseIngresar = async(jsonData:any, cristalesJSON:any, armazonesJSON:any) => {
    


    console.log('click')
    console.log(jsonData)
    console.log(formValues)
    

    // console.log(formValues.cliente.cliente_tipo)
    // console.log(jsonData.cliente_tipo)


    let estado = 10;
    let estado_impresion = 0;
    let estado_validacion = 1;
    let motivo = 1;

    console.log(isExistClient.value)

    let _origen = OTAreaActual.toString();
    let _destino = OTAreaActual.toString();

    let _p3:any = ''
    let _rut = isExistClient ? `${jsonData.cliente_rut || formValues.cliente.cliente_rut}` : '';

    isExistClient.value 
                     ? _p3 = [`nombre='${jsonData.cliente_nombre || formValues.cliente.cliente_nombre || ""}'`, `tipo=${jsonData.cliente_tipo || formValues.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo || formValues.cliente.cliente_tipo   === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo  || formValues.cliente.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}`, `sexo=${jsonData.cliente_sexo || formValues.cliente.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo || formValues.cliente.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo || formValues.cliente.cliente_sexo  === SEXO.no_aplica ? "3" : "0"}` ,`fecha_nacimiento='${jsonData.cliente_fecha_nacimiento || formValues.cliente.cliente_fecha_nacimiento || ""}'`, `direccion='${jsonData.cliente_direccion || formValues.cliente.cliente_direccion || ""}'`, `comuna=${jsonData.cliente_comuna || formValues.cliente.cliente_comuna || 0}`, `telefono='${jsonData.cliente_telefono || formValues.cliente.cliente_telefono || ""}'`, `correo='${jsonData.cliente_correo || formValues.cliente.cliente_correo || ""}'`, `establecimiento=${jsonData.establecimiento_id || formValues.cliente.establecimiento_id || 0}`].map((a)=>a.split("=")).map((a)=>a.join("=")).join(',')
                     : _p3 =`"${jsonData.cliente_rut || formValues.cliente.cliente_rut || ""}","${jsonData.cliente_nombre || formValues.cliente.cliente_nombre || ""}",${jsonData.cliente_tipo || formValues.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo || formValues.cliente.cliente_tipo   === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo  || formValues.cliente.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo || formValues.cliente.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo || formValues.cliente.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo || formValues.cliente.cliente_sexo  === SEXO.no_aplica ? "3" : "0"},"${jsonData.cliente_fecha_nacimiento || formValues.cliente.cliente_fecha_nacimiento || ""}","${jsonData.cliente_direccion || formValues.cliente.cliente_direccion || ""}" ,${jsonData.cliente_comuna || formValues.cliente.cliente_comuna || 0}, "${jsonData.cliente_telefono || formValues.cliente.cliente_telefono || ""}","${jsonData.cliente_correo || formValues.cliente.cliente_correo || ""}", ${jsonData.establecimiento_id || formValues.cliente.establecimiento_id || 0}`.replace(/'/g, '!');
    
    
    console.log(_p3)


  
    // console.log(_p3)

    // const _p11 =` "${jsonData.proyecto_codigo}",${jsonData.establecimiento_id},"${jsonData.cliente_rut || formValues.cliente.cliente_rut}" ,${jsonData.oftalmologo_id ?? 0} ,"${jsonData.fecha_atencion || fecha_atencion_signal.value}","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${jsonData.fecha_despacho || fecha_despacho.value}","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}"${jsonData.punto_venta_id || 0},${jsonData.numero_receta ?? 0},"${jsonData.fecha_receta ?? ""}",${jsonData.tipo_anteojo_id ?? 0}`;
    // console.log(_p11)
    // const _p22 = `${typeof dioptrias_receta.value.a1_od.esf === 'number' ? dioptrias_receta.value.a1_od.esf : 0 },${typeof dioptrias_receta.value.a1_od.cil === 'number' ? dioptrias_receta.value.a1_od.cil : 0},${typeof dioptrias_receta.value.a1_od.eje === 'number' ? dioptrias_receta.value.a1_od.eje : 0},${typeof dioptrias_receta.value.a1_od.ad === 'number' ? dioptrias_receta.value.a1_od.ad : 0 },${typeof dioptrias_receta.value.a1_oi.esf === 'number' ? dioptrias_receta.value.a1_oi.esf  : 0},${typeof dioptrias_receta.value.a1_oi.cil === 'number' ? dioptrias_receta.value.a1_oi.cil : 0},${typeof dioptrias_receta.value.a1_oi.eje === 'number' ? dioptrias_receta.value.a1_oi.eje : 0},${typeof dioptrias_receta.value.a1_oi.ad === 'number' ? dioptrias_receta.value.a1_oi.ad  : 0 },${typeof jsonData.a1_dp === 'number' ? jsonData.a1_dp : 0},${typeof jsonData.a1_alt === 'number' ? jsonData.a1_alt : 0}, ${typeof a2_od_esf.value === 'number' ? a2_od_esf.value :  0 },${typeof a2_od_cil.value === 'number' ? a2_od_cil.value : 0 },${typeof a2_od_eje.value === 'number' ? a2_od_eje.value : 0 },${typeof a2_oi_esf.value === 'number' ? a2_oi_esf.value : 0 },${typeof a2_oi_cil.value  === 'number' ? a2_oi_cil.value : 0 },${typeof a2_oi_eje.value === 'number' ? a2_oi_eje.value : 0},${jsonData.a2_dp || 0}`
    // console.log(_p22)    
    // const _p44 = `${jsonData.a1_opcion_vta_id ?? 0},"${a1_armazon.value ?? 0}",${jsonData.a2_opcion_vta_id ?? 0},"${a2_armazon.value ?? 0 }",${jsonData.a3_opcion_vta_id ?? 0},"${a3_armazon.value?? 0}"`
    // console.log(_p44)

    //TODO| CRISTALES
    // const _p55 = `${jsonData.cristal1_opcion_vta_id || 0},${jsonData.cristal1_marca_id || 0},${jsonData.cristal1_diseno_id || 0},${jsonData.cristal1_indice_id || 0},${jsonData.cristal1_material_id || 0},${jsonData.cristal1_tratamiento_id || 0},${jsonData.cristal1_color_id || 0},${jsonData.cristal1_diametro || 0},"${A1_CR_OD ?? " "}","${A1_CR_OI ?? " "},${jsonData.cristal1_tratamiento_adicional_id || 0} `
    // console.log(_p55)
    // const _p66 =`${jsonData.cristal2_od_opcion_venta_id || 0},${jsonData.cristal2_marca_id || 0},${jsonData.cristal2_diseno_id || 0},${jsonData.cristal2_indice_id || 0},${jsonData.cristal2_material_id || 0},${typeof A2_Diametro.value === 'number' ? A2_Diametro.value : 0},${jsonData.cristal2_color_id || 0},${jsonData.cristal2_diametro || 0},"${A2_CR_OD.value ?? " "}","${A2_CR_OI.value ?? " "}",${jsonData.cristal2_tratamiento_adicional_id || 0}` 
    // console.log(_p66)
    let _p1 = `${motivo},${_destino},${estado},${estado_impresion},${estado_validacion}, "${jsonData.proyecto_codigo}",${jsonData.establecimiento_id || 1},"${jsonData.cliente_rut || formValues.cliente.cliente_rut}" ,${jsonData.oftalmologo_id ?? 0} ,"${jsonData.fecha_atencion || fecha_atencion_signal.value}","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${jsonData.fecha_despacho || fecha_despacho.value}","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}",${jsonData.punto_venta_id || 0},${typeof jsonData.numero_receta  === 'number' ? jsonData.numero_receta  : 0},"${jsonData.fecha_receta ?? ""}",${jsonData.tipo_anteojo_id ?? 0},${typeof dioptrias_receta.value.a1_od.esf === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.esf) ? dioptrias_receta.value.a1_od.esf : 0 },${typeof dioptrias_receta.value.a1_od.cil === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.cil) ? dioptrias_receta.value.a1_od.cil : 0},${typeof dioptrias_receta.value.a1_od.eje === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.eje) ? dioptrias_receta.value.a1_od.eje : 0},${(typeof dioptrias_receta.value.a1_od.ad === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.ad)) ? dioptrias_receta.value.a1_od.ad : 0 },${typeof dioptrias_receta.value.a1_oi.esf === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? dioptrias_receta.value.a1_oi.esf  : 0},${typeof dioptrias_receta.value.a1_oi.cil === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.cil) ? dioptrias_receta.value.a1_oi.cil : 0},${typeof dioptrias_receta.value.a1_oi.eje === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.eje) ? dioptrias_receta.value.a1_oi.eje : 0},${typeof dioptrias_receta.value.a1_oi.ad === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.ad) ? dioptrias_receta.value.a1_oi.ad  : 0 },${typeof jsonData.a1_dp === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_dp) ? jsonData.a1_dp : 0},${typeof jsonData.a1_alt === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_alt) ? jsonData.a1_alt : 0}, "${A1_GRUPO_OD.value}" ,"${A1_GRUPO_OI.value}" ,${typeof a2_od_esf.value === 'number' ? a2_od_esf.value :  0 },${typeof a2_od_cil.value === 'number' ? a2_od_cil.value : 0 },${typeof a2_od_eje.value === 'number' ? a2_od_eje.value : 0 },${typeof a2_oi_esf.value === 'number' ? a2_oi_esf.value : 0 },${typeof a2_oi_cil.value  === 'number' ? a2_oi_cil.value : 0 },${typeof a2_oi_eje.value === 'number' ? a2_oi_eje.value : 0},${typeof jsonData.a2_dp === 'number' ? jsonData.a2_dp : 0},"${A2_GRUPO_OD.value}","${A2_GRUPO_OI.value}" ,${jsonData.a1_opcion_vta_id ?? 0},"${a1_armazon.value ?? 0}",${jsonData.a2_opcion_vta_id ?? 0},"${a2_armazon.value ?? 0 }",${jsonData.a3_opcion_vta_id ?? 0},"${a3_armazon.value?? 0}",${jsonData.cristal1_opcion_vta_id || 0},${jsonData.cristal1_marca_id || 0},${jsonData.cristal1_diseno_id || 0},${jsonData.cristal1_indice_id || 0},${jsonData.cristal1_material_id || 0},${jsonData.cristal1_tratamiento_id || 0},${jsonData.cristal1_color_id || 0},${jsonData.cristal1_diametro || 0},"${A1_CR_OD ?? " "}","${A1_CR_OI ?? " "}",${jsonData.cristal1_tratamiento_adicional_id || 0},${jsonData.cristal2_od_opcion_venta_id || 0},${jsonData.cristal2_marca_id || 0},${jsonData.cristal2_diseno_id || 0},${jsonData.cristal2_indice_id || 0},${jsonData.cristal2_material_id || 0},${typeof jsonData.cristal2_tratamiento === 'number' ? jsonData.cristal2_tratamiento : 0},${jsonData.cristal2_color_id || 0},${typeof A2_Diametro.value === 'number' ? A2_Diametro.value : 0},"${typeof A2_CR_OD.value === 'string' ? A2_CR_OD.value : ""}","${typeof A2_CR_OI.value === 'string' ? A2_CR_OI.value : " " }",${jsonData.cristal2_tratamiento_adicional_id || 0},${jsonData.motivo_garantia_id || 0},${jsonData.folio_asociado || 0},${isEditting ? 0 : jsonData.resolucion_garantia_id === 'Aceptada' ? '1' : '2'},"${jsonData.worktracking || 0}","${jsonData.nota_venta || 0}","${jsonData.numero_factura || 0}","${jsonData.folio_interno_mandante || 0}",${jsonData.total || 0},"${jsonData.observaciones || ""}"`

    console.log(_p1)
    // console.log(_p11)
    
    
    // if(!existCliente){
    //    _rut = '';
    //    _p3 =`'${jsonData.cliente_rut}','${jsonData.cliente_nombre}',${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo === SEXO.no_aplica ? "3" : "0"},'${jsonData.cliente_fecha_nacimiento}','${jsonData.cliente_direccion}' ,${jsonData.cliente_comuna_id || 150}, '${jsonData.cliente_telefono}','${jsonData.cliente_correo}', ${jsonData.establecimiento_id}`;
    // }

    // console.log('data', jsonData)
    // let _p1 = `${motivo},${_destino},${estado},${estado_impresion},${estado_validacion},"${jsonData.proyecto_codigo}",${jsonData.establecimiento_id},"${jsonData.cliente_rut || formValues.cliente.cliente_rut}" ,${jsonData.oftalmologo_id ?? 0} ,"${jsonData.fecha_atencion || fecha_atencion_signal.value}","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${jsonData.fecha_despacho || fecha_despacho.value}","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}",${jsonData.punto_venta_id || 0},${jsonData.numero_receta.value ?? 0},"${jsonData.fecha_receta ?? ""}",${jsonData.tipo_anteojo_id ?? 0},${a1_od_esf.value ?? 0},${a1_od_cil.value ?? 0},${a1_od_eje.value ?? 0},${a1_od_ad.value ?? 0 },${a1_oi_esf.value ?? 0},${a1_oi_cil.value ?? 0},${a1_oi_eje.value ?? 0},${a1_oi_ad.value ?? 0},${jsonData.a1_dp ?? 0},${jsonData.a1_alt ?? 0},${a1_grupo ?? 0},${a2_od_esf.value ?? 0},${a2_od_cil.value ?? 0},${a2_od_eje.value ?? 0},${a2_oi_esf.value ?? 0},${a2_oi_cil.value ?? 0},${a2_oi_eje.value ?? 0},${jsonData.a2_dp.value ?? 0},${a2_grupo ?? 0},${jsonData.a1_opcion_vta_id ?? 0},"${jsonData.a1_armazon_id ?? " "}",${jsonData.a2_opcion_vta_id ?? 0},"${jsonData.a2_armazon_id ?? " "}",${jsonData.a3_opcion_vta_id ?? 0},"${jsonData.a3_armazon_id ?? " "}",${jsonData.cristal1_opcion_vta_id || 0},${jsonData.cristal1_marca_id || 0},${jsonData.cristal1_diseno_id || 0},${jsonData.cristal1_indice_id || 0},${jsonData.cristal1_material_id || 0},${jsonData.cristal1_tratamiento_id || 0},${jsonData.cristal1_color_id || 0},${jsonData.cristal1_diametro || 0},"${jsonData.cristal1_od ?? " "}","${jsonData.cristal1_oi ?? " "}",${jsonData.cristal1_tratamiento_adicional_id || 0},${jsonData.cristal2_od_opcion_venta_id || 0},${jsonData.cristal2_marca_id || 0},${jsonData.cristal2_diseno_id || 0},${jsonData.cristal2_indice_id || 0},${jsonData.cristal2_material_id || 0},${jsonData.cristal2_tratamiento_id || 0},${jsonData.cristal2_color_id || 0},${jsonData.cristal2_diametro || 0},"${jsonData.cristal2_od ?? " "}","${jsonData.cristal2_oi ?? " "}",${jsonData.cristal2_tratamiento_adicional_id || 0},${jsonData.motivo_garantia_id || 0},${jsonData.folio_asociado || 0},${jsonData.resolucion_garantia_id || 0},${jsonData.worktracking || 0},${jsonData.nota_venta || 0},${jsonData.numero_factura || 0},${jsonData.folio_interno_mandante || 0},${jsonData.total || 0},"${jsonData.observaciones || ""}"`;
    // _p1 = _p1.replace(/'/g, '!');
    // console.log(_p1)

    // const _p3 = `'${jsonData.cliente_rut}','${jsonData.cliente_nombre}',${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo === SEXO.no_aplica ? "3" : "0"},'${jsonData.cliente_fecha_nacimiento}','${jsonData.cliente_direccion}' ,${jsonData.cliente_comuna_id || 150}, '${jsonData.cliente_telefono}','${jsonData.cliente_correo}', ${jsonData.establecimiento_id}`;

    // const cristales  = [{'codigo': A1_CR_OD.value },{'codigo': A1_CR_OI.value},{'codigo': A2_CR_OD.value},{'codigo':A2_CR_OI.value}];
    // const armazones  = [{'codigo': a1_armazon.value },{'codigo': tipo_de_anteojo.value === '3' ?  a2_armazon.value : ""},]; 


    
   
    const query = {
      query: "03",
      _p1,
      _p3 ,
      _rut,
      _proyecto:`${jsonData.proyecto_codigo}`,
      _origen,
      _destino,
      _estado: estado.toString(),
      _usuario: User.id.toString(),
      _obs:"OT INGRESADA",
      _cristalesJSON: cristalesJSON,
      _armazonesJSON: armazonesJSON,
    };

    // console.log('Valor de jsonData.a1_od_cil:', jsonData.a1_od_cil.value || 0);
    console.log(formValues)
    console.log(jsonData)
    // console.log(query)
  

    try {
      const response = await axios.post(`${URLBackend}/api/ot/crear/`, query)
      console.log(response)
      if(response.data){
        const message = `Nuevo Folio OT: ${response.data.datos[0][0]}`
        toast.success(message)
        handleCloseForm()
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al Ingresar la OT')
      handleCloseForm()
    }
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
    console.log('click')
    
    //! LOGICA JSON CRISTALES/ARMAZONES COMPARTIDA UPDATE + INSERT
    
        //? ========================================
        const cristales = [
          { codigo: `${A1_CR_OD.value}` },
          { codigo: `${A1_CR_OI.value}` },
          { codigo: `${A2_CR_OD.value}` },
          { codigo: `${A2_CR_OI.value}` }
        ]
          .map(item => {
            const numero = parseFloat(item.codigo);
            if (!isNaN(numero) && numero !== 0 &&numero !== null) {
              return { 'codigo': `${numero}` };
            }
            return null; 
          })
          .filter(item => item !== null);

        const cristalesJSON = JSON.stringify(cristales)
        cristalesJSONsignal.value = cristales
          
        const armazones = [
            { codigo: `${a1_armazon.value}` },
            { codigo: `${a1_armazon.value}` },
          ]
            .map(item => {
              const numero = parseFloat(item.codigo);
              if (!isNaN(numero) && numero !== 0 && numero !== null ) {
                return { codigo: `${numero}` };
              }
              return null; 
            })
            .filter(item => item !== null);

        const armazonesJSON = JSON.stringify(armazones)
        armazonesJSONsignal.value = armazones
          
   

    if (submitAction === 'pausar') {
      console.log('pausar')

      updateOT(
         jsonData, 
         OTAreaActual, 
         OTAreaActual, 
         30,  
         formValues, 
         data, 
         OTSlice.cristales, 
         OTSlice.armazones,
         User["id"].toString()
      ).then(()=>{
        console.log(OTAreaActual)
        dispatch(fetchOT({OTAreas:OTAreaActual}))
        handleCloseForm()
      })
      // switchCasePausar(jsonData);
    } else if (submitAction === 'procesar') {
      // switchCaseProcesar(jsonData);
      // updateOT(jsonData, OTAreaActual, OTAreaActual, 30, cristalesJSON, armazonesJSON);
    } else if (submitAction === 'derivar'){
      // switchCaseDerivar(jsonData)
    } else if (submitAction === 'ingresar'){
      console.log('click')
      
      switchCaseIngresar(jsonData, cristalesJSON, armazonesJSON)
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
    console.log(Object.keys(data)[0])
    console.log(name)
    console.log(data)
    

    //TODO: inputChangeAction 
    const key = Object.keys(data)[0] 
    if(inputChangeActions[key]){
      console.log('render')
      inputChangeActions[key](data);
    }

    //todo  INICIO CRISTALES, TRAE GRUPO Y CODIGO DEPENDIENDO DE DATOS DEL CRISTAL 
     // ? ANTEOJO 1: 
    if(changeCodigoCristal_A1[key]){
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
    if(changeCodigoCristal_A2[key]){
      const formValue = getValues()
      const {cristal2_marca_id, cristal2_diseno_id, cristal2_indice_id, cristal2_color_id , cristal2_material_id,cristal2_tratamiento_id, cristal2_diametro } = formValue;
      console.log(formValue.cristal2_diametro)
      console.log(A2_Diametro.value)

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
          "diametro":   A2_Diametro.value,
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
          "diametro":   A2_Diametro.value,
          "esferico":   dioptrias_receta.value.a2_oi.esf ?? 0,
          "cilindrico": dioptrias_receta.value.a2_oi.cil ?? 0, 
        }

        console.log(_pkToDelete1_oi)

        try {
          const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
          const encodedJSON = encodeURIComponent(pkJSON)

          const {data} = await axios(`${URLBackend}/api/proyectocristales/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`)
          
          const cristalesDATA = JSON.parse(data[0][0])
          console.log(cristalesDATA)

          A2_CR_OD.value = cristalesDATA["CR_OD"].trim() || " ";
          A2_CR_OI.value = cristalesDATA["CR_OI"].trim() || " ";

          A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"];
          A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"];

          validation_Cristal2_od(cristalesDATA["CR_OD"]);
          validation_Cristal2_oi(cristalesDATA["CR_OI"]);
          
        
        } catch (error) {
          console.log(error)
          throw error
        }

      }

    }

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
          console.log(dioptrias_receta.value.a1_od.esf)
          console.log(dioptrias_receta.value.a1_od.ad)

          a2_od_esf.value = (typeof dioptrias_receta.value.a1_od.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_od.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_od.esf) ) + parseFloat(dioptrias_receta.value.a1_od.ad)
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
          a2_oi_esf.value = (typeof dioptrias_receta.value.a1_oi.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_oi.esf)) + parseFloat(dioptrias_receta.value.a1_oi.ad)
          a2_oi_eje.value = (typeof dioptrias_receta.value.a1_oi.eje === 'object' ? 0 : dioptrias_receta.value.a1_oi.eje)
          a2_oi_cil.value = (typeof dioptrias_receta.value.a1_oi.cil === 'object' ? 0 : dioptrias_receta.value.a1_oi.cil);
        }

      }


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
  validation_tipo_anteojo()
  //VALIDACIONES NIVEL 2
  
}



useEffect(()=>{
  if(data){

    codigoProyecto.value = data[EnumGrid.proyecto_codigo]
    punto_venta.value    = data[EnumGrid.punto_venta_id]

    isToggleImpression.value = data[EnumGrid.estado_impresion_id]        === '1' ? true : false
    isToggleValidation.value = data[EnumGrid.validar_parametrizacion_id] === '1' ? true :false
    tipo_de_anteojo.value = data[EnumGrid.tipo_anteojo_id].toString();
    
    fecha_atencion_signal.value = data[EnumGrid.fecha_atencion]
    fecha_entrega_taller.value = data[EnumGrid.fecha_entrega_taller]
    fecha_despacho.value = data[EnumGrid.fecha_despacho]
    fecha_entrega_cliente.value = data[EnumGrid.fecha_entrega_cliente]

    cliente_rut.value = data[EnumGrid.cliente_rut]

    // if(isEditting){
    //   validation_tipo_anteojo()
    // }

    dioptrias_receta.value.a1_od.esf = data[EnumGrid.a1_od_esf]
    dioptrias_receta.value.a1_od.cil = data[EnumGrid.a1_od_cil]
    dioptrias_receta.value.a1_od.eje = data[EnumGrid.a1_od_eje]
    dioptrias_receta.value.a1_od.ad  = data[EnumGrid.a1_od_ad]

    dioptrias_receta.value.a1_oi.esf = data[EnumGrid.a1_oi_esf]
    dioptrias_receta.value.a1_oi.cil = data[EnumGrid.a1_oi_cil]
    dioptrias_receta.value.a1_oi.eje = data[EnumGrid.a1_oi_eje]
    dioptrias_receta.value.a1_oi.ad  = data[EnumGrid.a1_oi_ad]


    A1_CR_OD.value =  data[EnumGrid.cristal1_od]
    A1_CR_OI.value =  data[EnumGrid.cristal1_oi]


    a2_od_esf.value = data[EnumGrid.a2_od_esf]
    a2_od_cil.value = data[EnumGrid.a2_od_cil]
    a2_od_eje.value = data[EnumGrid.a2_od_eje]


    a2_oi_esf.value = data[EnumGrid.a2_oi_esf]
    a2_oi_cil.value = data[EnumGrid.a2_oi_cil]
    a2_oi_eje.value = data[EnumGrid.a2_oi_eje]

    A1_GRUPO_OD.value = data[EnumGrid.a1_grupo_od] 
    A1_GRUPO_OI.value = data[EnumGrid.a1_grupo_oI]
    A2_GRUPO_OD.value = data[EnumGrid.a2_grupo_od]
    A2_GRUPO_OI.value = data[EnumGrid.a2_grupo_oi]


    a1_armazon.value = data[EnumGrid.a1_armazon_id]
    a2_armazon.value = data[EnumGrid.a2_armazon_id]
    a3_armazon.value = data[EnumGrid.a3_armazon_id]

    A1_CR_OD.value   = data[EnumGrid.cristal1_od]
    A1_CR_OI.value   = data[EnumGrid.cristal1_oi]
    A2_CR_OD.value   = data[EnumGrid.cristal2_od] 
    A2_CR_OI.value   = data[EnumGrid.cristal2_oi] 

}
},[data])


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



  // console.log(OTAreaActual)
  // console.log(OTPermissions)
  // console.log(OTPermissions[10])
  // console.log(OTPermissions[9])
  // console.log(sumatoriaNivel1)


  

  // console.log(data && data[EnumGrid.estado_id])
  // console.log(isMotivo)
  // console.log(isMOT)
  // console.log(data)
  

  console.log(validationNivel1.value)
  console.log(validationNivel2.value)
  
  return (

    <div className='useFormContainerOT top-[0%] w-full h-[100%]'>
      <Tabs>
        <TabList className='flex items-center top-[10]'>
          <Tab className="custom-tab ">ÓPTICA</Tab>
          <Tab className="custom-tab ">CLIENTE</Tab>
          <Tab className="custom-tab ">RECETA</Tab>
          <Tab className="custom-tab ">CRISTALES</Tab>
          <Tab className="custom-tab ">ARMAZONES</Tab>
          <Tab className="custom-tab ">BITÁCORA</Tab>
          {/* <Tab className="custom-tab ">Óptica</Tab>
          <Tab className="custom-tab ">Cliente</Tab>
          <Tab className="custom-tab ">Receta</Tab>
          <Tab className="custom-tab ">Cristales</Tab>
          <Tab className="custom-tab ">Armazones</Tab>
          <Tab className="custom-tab ">Bitácora</Tab> */}
          <h1 className='tabFolioNumber'>Folio OT: {data && data[EnumGrid.folio]}</h1>
        </TabList>


   <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spinner className="h-12 w-12" style={{ color: '#f39c12' }} /></div>}>
      <div className='top-0 absolute right-3 text-2xl cursor-pointert' onClick={()=>{handleCloseForm()}}>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
      </div>
            <TabPanel onSelect={loadFormData}>
              <FOTOptica onlyRead={onlyRead} setIsMotivo={setIsMotivo} isEditting={isEditting} data={data && data} formValues={formValues["optica"]} control={control} setToggle={setToggle}  onDataChange={(data:any) => handleFormChange(data , 'optica')} permiso_areas_resolucion_garantia={permiso_areas_resolucion_garantia}    permisos_areas_estado_immpresion={permiso_areas_estado_impresion} permiso_areas_estado_validacion={permiso_areas_estado_validacion} permiso_usuario_estado_impresion={permiso_usuario_estado_impresion} permiso_usuario_estado_validacion={permiso_usuario_estado_validacion} permiso_usuario_resolucion_garantia={permiso_usuario_resolucion_garantia} />
            </TabPanel>
            
          <TabPanel>
            <FOTClientes onlyRead={onlyRead} data={data && data} isEditting={isEditting} register={register} formValues={formValues["cliente"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cliente')}  setExistCliente={setExistCliente}    />
          </TabPanel>

          <TabPanel>
            <FOTReceta  permiso_usuario_receta={permiso_usuario_receta} permiso_areas_receta={permiso_areas_receta} onlyRead={onlyRead} isEditting={isEditting} data={data && data} formValues={formValues["receta"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'receta')}  />
          </TabPanel>

          <TabPanel>
            <FOTCristales permiso_usuario_grupo_dioptria={permiso_usuario_grupo_dioptria} permiso_areas_grupo_dioptria={permiso_areas_grupo_dioptria} permiso_areas_cristales={permiso_areas_cristales}  permiso_usuario_cristales={permiso_usuario_cristales} onlyRead={onlyRead} isEditting={isEditting} data={data && data}  formValues={formValues["cristales"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cristales')}   /> 
          </TabPanel>

          <TabPanel> 
            <FOTArmazones permiso_areas_armazones={permiso_areas_armazones} permiso_usuario_armazones={permiso_usuario_armazones} onlyRead={onlyRead}  data={data && data} formValues={formValues["armazones"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'armazones')}  />
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
              <FOTDerivacion    closeModal={handleCloseForm} formValues={formValues} data={data && data} onClose={onCloseDerivacion}/>
            </div>
          )}


          <div className='flex items-center mx-auto mt-[1.5rem] justify-around w-1/2 '>
        
                {isEditting && 
                isMOT       && 
                // isMotivo    &&  (
                  (
                    <Button className='otActionButton bg-green-400' onClick={() => setShowGarantia(prev => !prev)}>
                      Garantia
                    </Button>
                )}

                {OTPermissions && 
                !isMOT &&
                isEditting && 
                OTPermissions[6] === "1" &&
                sumatoriaNivel1 === validationNivel1.value.length &&
                (sumatoriaNivel2 === validationNivel2.value.length || data && data[EnumGrid.validar_parametrizacion_id] === "0" ) &&
               (
                  <Button className='otActionButton bg-green-400' onClick={handleProcesarClick}>Procesar</Button>
                )}

                

                {OTPermissions && 
                !isMOT &&
                isEditting &&
                OTPermissions[7] === "1" &&
                (
                  <Button className='otActionButton bg-yellow-700' onClick={handlePausarClick}>Pausar</Button>
                )}

                {OTPermissions &&
                !isMOT &&
                isEditting &&
                OTPermissions[8] === "1" &&
                sumatoriaNivel1 === validationNivel1.value.length &&
                data && data[EnumGrid.estado_id] > 1 && (
                  <Button className='otActionButton bg-red-900' onClick={()=>{setShowDerivacion((prev)=>!prev)}}>Derivar</Button>
                )}


                
                {OTPermissions &&
                OTPermissions[9] === "1" && 
                sumatoriaNivel1 === validacionNivel1.length && 
                // (data && data[EnumGrid.estado_id] === 30 || data && data[EnumGrid.estado_id] === 40 ) && 
                (
                  <Button className='otActionButton bg-black' onClick={()=>handleAnular()}>Anular</Button>
                )}
                
                {OTPermissions &&
                !isEditting &&
                 OTPermissions[10] === "1" &&
                //  sumatoriaNivel1 === validationNivel1.value.length &&
                 (
                  <Button className='otActionButton bg-blue-500' onClick={handleIngresarClick}>Ingresar</Button>
                 )
                
                }
          </div>


      </Suspense>
      </Tabs>
    </div>
  );
};

export default FOT;


