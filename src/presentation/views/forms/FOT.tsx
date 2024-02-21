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
import { A1_ALT, A1_CR_OD, A1_CR_OI, A1_DP, A1_Diametro, A1_GRUPO_OD, A1_GRUPO_OI, A2_CR_OD, A2_CR_OI, A2_DP, A2_Diametro, A2_GRUPO_OD, A2_GRUPO_OI, MODAL, SEXO, TIPO_CLIENTE, 
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
  oftalmologo_id, 
  punto_venta, 
  // reiniciarA2DioptriasReceta, 
  reiniciarDioptriasReceta, reiniciarValidationNivel1, reiniciarValidationNivel2, reiniciarValidationNivel3, tipo_de_anteojo, updateOT, validar_armazon1, validar_parametrizacion } from '../../utils';
import { validationCliente, validationClienteComuna, validationClienteNombre, validationClienteSexo, validationClienteTelefono, validationClienteTipo, validationCodigoArmazon_2, validationCodigoCristal2_od, validationCodigoCristal2_oi, validationEstablecimientos, validationFechaAtencion, validationFechaDespacho, validationFechaEntregaCliente, validationFechaEntregaTaller, validationProyectos, validationPuntoVenta, validationTipoAnteojos, validation_A1_ALT, validation_A1_DP, validation_A1_OD_AD, validation_A1_OD_CILL, validation_A1_OD_EJE, validation_A1_OD_ESF, validation_A1_OI_AD, validation_A1_OI_CIL, validation_A1_OI_EJE, validation_A1_OI_ESF, validation_A1_armazon, validation_A2_DP, validation_A2_OD_CIL, validation_A2_OD_EJE, validation_A2_OD_ESF, validation_A2_OI_CIL, validation_A2_OI_EJE, validation_A2_OI_ESF, validation_A2_armazon, validation_Cristal1_color, validation_Cristal1_diametro, validation_Cristal1_diseño, validation_Cristal1_indice, validation_Cristal1_marca, validation_Cristal1_material, validation_Cristal1_od, validation_Cristal1_oi, validation_Cristal1_tratamiento, validation_Cristal2_color, validation_Cristal2_diametro, validation_Cristal2_diseño, validation_Cristal2_indice, validation_Cristal2_material, validation_Cristal2_od, validation_Cristal2_oi, validation_Cristal2_tratamiento, validation_cristal2_marca } from '../../utils/validationOT';
// import { inputName } from '../../components/OTForms/Otprueba';
// import { verificaCampos } from '../../utils/OTReceta_utils';
import { URLBackend } from '../../hooks/useCrud';
// import {transponer, transponer_a2 } from '../../utils/FOTReceta_utils';
import { Spinner } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { addToArmazones, addToCristales, clearCodigos, fetchOT } from '../../../redux/slices/OTSlice';
import { combinaciones_validas_od, validation_tipo_anteojo } from '../../utils/OTReceta_utils';
import FOTPendiente from '../../components/OTForms/FOTPendiente';
import FOTEmpaque from './FOTEmpaque';
import { usePermission } from '../../hooks';
import FOTAnulacion from '../../components/OTForms/FOTAnulacion';
import { useModal } from '../../hooks/useModal';

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
    valor: 1
  },
  { campo: "a1_oi_ad",
    valor: 1
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
  { campo: "a1_armazon_id",
    valor: 0
  },
  { campo: "a2_armazon_id",
    valor: 0
  },



 
  { campo: "cristal1_marca_id",
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
  { campo: "cristal1_diametro",
    valor: 0
  },

  { campo: "cristal1_od",
    valor: 0
  },
  { campo: "cristal1_oi",
    valor: 0
  },
 


  
  { campo: "cristal2_marca_id",
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
  { campo: "cristal2_diametro",
    valor: 0
  },
  { campo: "cristal2_od",
    valor: 0
  },
  { campo: "cristal2_oi",
    valor: 0
  }
])

export const validationNivel3 = signal([
  { campo:"validar_cristal1_od",
    valor: 0
  },
  { campo:"validar_cristal1_oi",
    valor: 0
  },
  { campo:"validar_cristal2_od",
    valor: 0
  },
  { campo:"validar_cristal2_oi",
    valor: 0
  },
  { campo:"validar_armazon1",
    valor: 0
  },
  { campo:"validar_armazon2",
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
  const [selectedTab, setSelectedTab] = useState(0);
  const { showModal, CustomModal } = useModal();

  const { escritura_lectura } = usePermission(28);
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
  let permiso_usuario_verificar_cristal   = permisosCampos && permisosCampos[7] === "1" ? true : false;
  // let permiso_usuario_verificar_armazon   = permisosCampos && permisosCampos[8] === "1" ? true : false;


 


  const permisosAreas = OTAreaActual && permissions(OTAreaActual)[6] as any
  // console.log(permisosAreas && permiso_usuario_verificar_cristal)

  let permiso_areas_armazones             = permisosAreas && permisosAreas[0] === '1' ? true : false;
  let permiso_areas_cristales             = permisosAreas && permisosAreas[1] === '1' ? true : false;
  let permiso_areas_estado_impresion      = permisosAreas && permisosAreas[2] === '1' ? true : false;
  let permiso_areas_estado_validacion     = permisosAreas && permisosAreas[3] === '1' ? true : false;
  let permiso_areas_resolucion_garantia   = permisosAreas && permisosAreas[4] === '1' ? true : false;
  let permiso_areas_grupo_dioptria        = permisosAreas && permisosAreas[5] === '1' ? true : false;
  let permiso_areas_receta                = permisosAreas && permisosAreas[6] === '1' ? true : false;
  let permiso_area_verificar_cristal      = permisosAreas && permisosAreas[7] === '1' ? true : false;
  let permiso_area_verificar_armazon      = permisosAreas && permisosAreas[8] === "1" ? true : false;

  // 100001100




  const handleCloseForm = () => {
      closeModal();
      clearDioptrias();
      reiniciarDioptriasReceta();
      reiniciarValidationNivel2();
      reiniciarValidationNivel1();
      reiniciarValidationNivel3();
      clearGrupos();
      dispatch(clearCodigos())
      clearSelectInput.value = false;
      //limpiar codigo
  }

  useEffect(()=>{
    if(data){
  
      codigoProyecto.value = data[EnumGrid.proyecto_codigo]
      punto_venta.value    = data[EnumGrid.punto_venta_id]
  
      isToggleImpression.value = data[EnumGrid.estado_impresion_id]        === '1' ? true : false
      isToggleValidation.value = data[EnumGrid.validar_parametrizacion_id] === '1' ? true : false
      tipo_de_anteojo.value = data[EnumGrid.tipo_anteojo_id].toString();
      
      fecha_atencion_signal.value = data[EnumGrid.fecha_atencion]
      fecha_entrega_taller.value = data[EnumGrid.fecha_entrega_taller]
      fecha_despacho.value = data[EnumGrid.fecha_despacho]
      fecha_entrega_cliente.value = data[EnumGrid.fecha_entrega_cliente]
  
      cliente_rut.value    = data[EnumGrid.cliente_rut]
      oftalmologo_id.value = data[EnumGrid.oftalmologo_id]
  
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
  
  
      // a1_od_esf.value = data[EnumGrid.a1_od_esf]
  
  
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

      A1_ALT.value = data[EnumGrid.a1_alt]
  
      A1_Diametro.value = data[EnumGrid.cristal1_diametro]
      A2_Diametro.value = data[EnumGrid.cristal2_diametro]
  
      A1_DP.value = data[EnumGrid.a1_dp]
      A2_DP.value = data[EnumGrid.a2_dp]
      
      a1_armazon.value = data[EnumGrid.a1_armazon_id]
      a2_armazon.value = data[EnumGrid.a2_armazon_id]
      a3_armazon.value = data[EnumGrid.a3_armazon_id]
  
      A1_CR_OD.value   = data[EnumGrid.cristal1_od]
      A1_CR_OI.value   = data[EnumGrid.cristal1_oi]
      A2_CR_OD.value   = data[EnumGrid.cristal2_od] 
      A2_CR_OI.value   = data[EnumGrid.cristal2_oi] 


      console.log(A2_CR_OD.value)
      // console.log(punto_venta.value)
  
  }
  },[data])


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

    if(isEditting){
      validation_tipo_anteojo()
      
      
      // console.log(OT)
    
      // console.log('validaciones')
      //VALIDACIONES NIVEL 1
      validationProyectos(data && data[EnumGrid.proyecto_codigo])
      validationEstablecimientos(data && data[EnumGrid.establecimiento_id])
      validationCliente(data && data[EnumGrid.cliente_rut])
      validationClienteNombre(data && data[EnumGrid.cliente_nomnbre])
      validationClienteTipo(data && data[EnumGrid.cliente_tipo])
      validationClienteSexo(data && data[EnumGrid.cliente_sexo])
      validationClienteTelefono(data && data[EnumGrid.cliente_sexo])
      validationClienteComuna(data && data[EnumGrid.cliente_comuna_id])
      validationFechaAtencion(data && data[EnumGrid.fecha_atencion])
      validationPuntoVenta(data && data[EnumGrid.punto_venta_id])
      validationTipoAnteojos(data && data[EnumGrid.tipo_anteojo_id])
      
    
    
      //VALIDACIONES NIVEL 2
      validationFechaEntregaTaller(data && data[EnumGrid.fecha_entrega_taller])
      validationFechaDespacho(data && data[EnumGrid.fecha_despacho])
      validationFechaEntregaCliente(data && data[EnumGrid.fecha_entrega_cliente])
      validation_A1_OD_ESF(data && data[EnumGrid.a1_od_esf])
      validation_A1_OD_CILL(data && data[EnumGrid.a1_od_cil])
      validation_A1_OD_EJE(data && data[EnumGrid.a1_od_eje])
      validation_A1_OD_AD(data && data[EnumGrid.a1_od_ad])
      validation_A1_OI_ESF(data && data[EnumGrid.a1_oi_esf])
      validation_A1_OI_CIL(data && data[EnumGrid.a1_oi_cil])
      validation_A1_OI_EJE(data && data[EnumGrid.a1_oi_eje])
      validation_A1_OI_AD(data && data[EnumGrid.a1_oi_ad])
      validation_A1_DP(data && data[EnumGrid.a1_dp])
    
      validation_A1_ALT(data && data[EnumGrid.a1_alt])
      validation_A1_armazon(data && data[EnumGrid.a1_armazon_id])
      // validation_A2_armazon(data && data[EnumGrid.a2_armazon_id])
    
      validation_A2_OD_ESF(data && data[EnumGrid.a2_od_esf])
      validation_A2_OD_CIL(data && data[EnumGrid.a2_od_cil])
      validation_A2_OD_EJE(data && data[EnumGrid.a2_od_eje])
    
      validation_A2_OI_ESF(data && data[EnumGrid.a2_oi_esf])
      validation_A2_OI_CIL(data && data[EnumGrid.a2_oi_cil])
      validation_A2_OI_EJE(data && data[EnumGrid.a2_oi_eje])
      validation_A2_DP(data && data[EnumGrid.a2_dp])
    
      validation_A1_armazon(data && data[EnumGrid.a1_armazon_id])
      
      
      
      
      validation_Cristal1_marca(data && data[EnumGrid.cristal1_marca_id])
      validation_Cristal1_diseño(data && data[EnumGrid.cristal1_diseno_id])
      validation_Cristal1_indice(data && data[EnumGrid.cristal1_indice_id])
      validation_Cristal1_material(data && data[EnumGrid.cristal1_material_id])
      validation_Cristal1_tratamiento(data && data[EnumGrid.cristal1_tratamiento_id])
      validation_Cristal1_color(data && data[EnumGrid.cristal1_color_id])
      validation_Cristal1_diametro(data && data[EnumGrid.cristal1_diametro])
      validation_Cristal1_od(data && data[EnumGrid.cristal1_od])
      validation_Cristal1_oi(data && data[EnumGrid.cristal1_oi])
    
    
      combinaciones_validas_od(
        data && data[EnumGrid.a1_od_esf],
        data && data[EnumGrid.a1_od_cil],
        data && data[EnumGrid.a1_od_eje]
      )


      // validationCodigoCristal2_od("0",true)
      // validationCodigoCristal2_oi("0",true)
      // validationCodigoArmazon_2("0", true)

      if(data && data[EnumGrid.tipo_anteojo_id] === 3){
        validation_A2_armazon(data && data[EnumGrid.a2_armazon_id])
        
        validation_cristal2_marca(data && data[EnumGrid.cristal2_marca_id])
        validation_Cristal2_diseño(data && data[EnumGrid.cristal2_diseno_id])    
        validation_Cristal2_indice(data && data[EnumGrid.cristal2_indice_id])
        validation_Cristal2_material(data && data[EnumGrid.cristal2_material_id])
        validation_Cristal2_tratamiento(data && data[EnumGrid.cristal2_tratamiento_id])
        validation_Cristal2_color(data && data[EnumGrid.cristal2_color_id])
        validation_Cristal2_diametro(data && data[EnumGrid.cristal2_diametro])
        validation_Cristal2_od(data && data[EnumGrid.cristal2_od])
        validation_Cristal2_oi(data && data[EnumGrid.cristal2_oi])
      }
      
    }
  },[])




  
  const switchCaseIngresar = async(jsonData:any, cristalesJSON:any, armazonesJSON:any) => {
    
    // console.log(jsonData)
    // console.log(formValues)
 


    let estado                      = 10;
    let estado_impresion            = 0;
    let validar_parametrizacion_id  = 1;
    let motivo                      = 1;
    let estado_validacion           = sumatoriaNivel2  === validationNivel2.value.length ? 1 : 0

    console.log(estado_validacion)

    let _origen = OTAreaActual.toString();
    let _destino = OTAreaActual.toString();

    let _p3:any = ''
    let _rut = isExistClient.value ? `${jsonData.cliente_rut || formValues.cliente.cliente_rut}` : '';
    
    // console.log(A1_Diametro.value)
    // console.log(typeof A1_Diametro.value === 'number' ? A1_Diametro.value : 0)

    // console.log(jsonData.a1_altf)


    // console.log(typeof formValues["receta"]["a1_alt"] === 'string' ? formValues["receta"]["a1_alt"] : 0)


    // console.log(
    //   formValues?.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.particular ? "2" : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"
    // );

    // console.log(
    //   formValues?.cliente.cliente_sexo === 'Masculino' === "1" :
    //   formValues?.cliente.cliente_sexo === SEXO.femenino === "2" :
    //   formValues?.cliente.cliente_sexo === SEXO.no_aplica === "3" :
    //   "0"
    // )

      // console.log(
      //   formValues?.cliente.cliente_sexo === SEXO.masculino ? "1" : formValues?.cliente.cliente_sexo === SEXO.femenino ? "2" : formValues?.cliente.cliente_sexo === SEXO.no_aplica ? "3"  : "0" 
      // )

    // console.log(jsonData.cliente_tipo || formValues.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo || formValues.cliente.cliente_tipo   === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo  || formValues.cliente.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0")

    isExistClient.value 
                     ? _p3 = [`nombre="${jsonData.cliente_nombre.trim() || formValues.cliente.cliente_nombre.trim() || ""}"`, `tipo=${formValues?.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.particular ? "2" : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}`, `sexo=${formValues?.cliente.cliente_sexo === SEXO.masculino ? "1" : formValues?.cliente.cliente_sexo === SEXO.femenino ? "2" : formValues?.cliente.cliente_sexo === SEXO.no_aplica ? "3"  : "0"}` ,`fecha_nacimiento="${jsonData.cliente_fecha_nacimiento || formValues.cliente.cliente_fecha_nacimiento || ""}"`, `direccion="${jsonData.cliente_direccion.trim() || formValues.cliente.cliente_direccion.trim() || ""}"`, `comuna=${jsonData.cliente_comuna || formValues.cliente.cliente_comuna || 0}`, `telefono="${jsonData.cliente_telefono.trim() || formValues.cliente.cliente_telefono.trim() || ""}"`, `correo="${jsonData.cliente_correo.trim() || formValues.cliente.cliente_correo.trim() || ""}"`, `establecimiento=${jsonData.establecimiento_id || formValues.cliente.establecimiento_id || 0}`].map((a)=>a.split("=")).map((a)=>a.join("=")).join(',')
                     : _p3 =`"${jsonData.cliente_rut.trim() || formValues.cliente.cliente_rut.trim() || ""}","${jsonData.cliente_nombre.trim() || formValues.cliente.cliente_nombre.trim() || ""}",${formValues?.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.particular ? "2" : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${formValues?.cliente.cliente_sexo === SEXO.masculino ? "1" : formValues?.cliente.cliente_sexo === SEXO.femenino ? "2" : formValues?.cliente.cliente_sexo === SEXO.no_aplica ? "3"  : "0"},"${jsonData.cliente_fecha_nacimiento || formValues.cliente.cliente_fecha_nacimiento || ""}","${formValues.cliente.cliente_direccion.trim() || ""}" ,${jsonData.cliente_comuna || formValues.cliente.cliente_comuna || 0}, "${jsonData.cliente_telefono.trim() || formValues.cliente.cliente_telefono.trim() || ""}","${jsonData.cliente_correo.trim() || formValues.cliente.cliente_correo.trim() || ""}", ${jsonData.establecimiento_id || formValues.cliente.establecimiento_id || 0}`.replace(/'/g, '!');
    
    
    // console.log(_p3)
  

    let _p1 = `${motivo},${_destino},${estado},"${estado_impresion}","${validar_parametrizacion_id}", "${jsonData.proyecto_codigo}",${jsonData.establecimiento_id || 1},"${jsonData.cliente_rut.trim() || formValues.cliente.cliente_rut.trim()}" ,${jsonData.oftalmologo_id ?? 0} ,"${jsonData.fecha_atencion || fecha_atencion_signal.value}","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${jsonData.fecha_despacho || fecha_despacho.value}","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}",${punto_venta.value || 0},${formValues?.receta.numero_receta.trim() !== '' ? formValues?.receta.numero_receta : 0},"${formValues?.receta.fecha_receta ?? ""}",${jsonData.tipo_anteojo_id ?? 0},${typeof dioptrias_receta.value.a1_od.esf === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.esf) ? dioptrias_receta.value.a1_od.esf : 0 },${typeof dioptrias_receta.value.a1_od.cil === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.cil) ? dioptrias_receta.value.a1_od.cil : 0},${typeof dioptrias_receta.value.a1_od.eje === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.eje) ? dioptrias_receta.value.a1_od.eje : 0},${(typeof dioptrias_receta.value.a1_od.ad === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.ad)) ? dioptrias_receta.value.a1_od.ad : 0 },${typeof dioptrias_receta.value.a1_oi.esf === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? dioptrias_receta.value.a1_oi.esf  : 0},${typeof dioptrias_receta.value.a1_oi.cil === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.cil) ? dioptrias_receta.value.a1_oi.cil : 0},${typeof dioptrias_receta.value.a1_oi.eje === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.eje) ? dioptrias_receta.value.a1_oi.eje : 0},${typeof dioptrias_receta.value.a1_oi.ad !== 'string' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.ad) ? dioptrias_receta.value.a1_oi.ad  : 0 },${A1_DP.value.trim() || 0},${formValues["receta"]["a1_alt"] > 0  ? formValues["receta"]["a1_alt"] : 0}, "${A1_GRUPO_OD.value.trim()}" ,"${A1_GRUPO_OI.value.trim()}" ,${typeof a2_od_esf.value === 'number' ? a2_od_esf.value :  0 },${typeof a2_od_cil.value === 'number' ? a2_od_cil.value : 0 },${typeof a2_od_eje.value === 'number' ? a2_od_eje.value : 0 },${typeof a2_oi_esf.value === 'number' ? a2_oi_esf.value : 0 },${typeof a2_oi_cil.value  === 'number' ? a2_oi_cil.value : 0 },${typeof a2_oi_eje.value === 'number' ? a2_oi_eje.value : 0},${A2_DP.value.trim() || 0},"${A2_GRUPO_OD.value.trim()}","${A2_GRUPO_OI.value.trim()}" ,${jsonData.a1_opcion_vta_id ?? 0},"${a1_armazon.value.trim() ?? 0}",${jsonData.a2_opcion_vta_id ?? 0},"${a2_armazon.value.trim() ?? 0 }",${jsonData.a3_opcion_vta_id ?? 0},"${a3_armazon.value.trim() ?? 0}",${jsonData.cristal1_opcion_vta_id || 0},${jsonData.cristal1_marca_id || 0},${jsonData.cristal1_diseno_id || 0},${jsonData.cristal1_indice_id || 0},${jsonData.cristal1_material_id || 0},${jsonData.cristal1_tratamiento_id || 0},${jsonData.cristal1_color_id || 0},${(typeof A1_Diametro.value === 'string' && A1_Diametro.value.trim() !== "" ) ? A1_Diametro.value : 0},"${A1_CR_OD.value.trim() ?? ""}","${A1_CR_OI.value.trim() ?? ""}",${jsonData.cristal1_tratamiento_adicional_id || 0},${jsonData.cristal2_od_opcion_venta_id || 0},${jsonData.cristal2_marca_id || 0},${jsonData.cristal2_diseno_id || 0},${jsonData.cristal2_indice_id || 0},${jsonData.cristal2_material_id || 0},${jsonData.cristal2_tratamiento_id || 0},${jsonData.cristal2_color_id || 0},${(typeof A2_Diametro.value === 'string' && A2_Diametro.value.trim() !== "" ) ? A2_Diametro.value : 0},"${typeof A2_CR_OD.value === 'string' ? A2_CR_OD.value.trim() : ""}","${typeof A2_CR_OI.value === 'string' ? A2_CR_OI.value.trim() : " " }",${jsonData.cristal2_tratamiento_adicional_id || 0},${jsonData.motivo_garantia_id || 0},${jsonData.folio_asociado || 0},${isEditting ? 0 : jsonData.resolucion_garantia_id === 'Aceptada' ? '1' : '2'},"${jsonData.worktracking || 0}","${jsonData.nota_venta || 0}",${jsonData.numero_reporte_firma || 0},"${jsonData.numero_reporte_atencion || 0}","${jsonData.numero_orden_compra || 0}",${jsonData.numero_guia || 0},${jsonData.numero_factura || 0},"${jsonData.folio_interno_mandante || 0}","${jsonData.reporte_interno_mandante || 0}","${jsonData.numero_envio || 0}" ,${jsonData.total || 0},"${formValues?.receta.observaciones || ""}","${estado_validacion}"`
    // let _p1 = `${motivo},${_destino},${estado},"${estado_impresion}","${estado_validacion}", "${jsonData.proyecto_codigo}",${jsonData.establecimiento_id || 1},"${jsonData.cliente_rut.trim() || formValues.cliente.cliente_rut.trim()}" ,${jsonData.oftalmologo_id ?? 0} ,"${jsonData.fecha_atencion || fecha_atencion_signal.value}","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${jsonData.fecha_despacho || fecha_despacho.value}","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}",${jsonData.punto_venta_id || 0},${typeof jsonData.numero_receta  === 'number' ? jsonData.numero_receta  : 0},"${jsonData.fecha_receta ?? ""}",${jsonData.tipo_anteojo_id ?? 0},${typeof dioptrias_receta.value.a1_od.esf === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.esf) ? dioptrias_receta.value.a1_od.esf : 0 },${typeof dioptrias_receta.value.a1_od.cil === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.cil) ? dioptrias_receta.value.a1_od.cil : 0},${typeof dioptrias_receta.value.a1_od.eje === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.eje) ? dioptrias_receta.value.a1_od.eje : 0},${(typeof dioptrias_receta.value.a1_od.ad === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_od.ad)) ? dioptrias_receta.value.a1_od.ad : 0 },${typeof dioptrias_receta.value.a1_oi.esf === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? dioptrias_receta.value.a1_oi.esf  : 0},${typeof dioptrias_receta.value.a1_oi.cil === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.cil) ? dioptrias_receta.value.a1_oi.cil : 0},${typeof dioptrias_receta.value.a1_oi.eje === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.eje) ? dioptrias_receta.value.a1_oi.eje : 0},${typeof dioptrias_receta.value.a1_oi.ad === 'number' &&  !Number.isNaN(dioptrias_receta.value.a1_oi.ad) ? dioptrias_receta.value.a1_oi.ad  : 0 },${A1_DP.value || 0},${formValues["receta"]["a1_alt"] > 0  ? formValues["receta"]["a1_alt"] : 0}, "${A1_GRUPO_OD.value}" ,"${A1_GRUPO_OI.value}" ,${typeof a2_od_esf.value === 'number' ? a2_od_esf.value :  0 },${typeof a2_od_cil.value === 'number' ? a2_od_cil.value : 0 },${typeof a2_od_eje.value === 'number' ? a2_od_eje.value : 0 },${typeof a2_oi_esf.value === 'number' ? a2_oi_esf.value : 0 },${typeof a2_oi_cil.value  === 'number' ? a2_oi_cil.value : 0 },${typeof a2_oi_eje.value === 'number' ? a2_oi_eje.value : 0},${A2_DP.value || 0},"${A2_GRUPO_OD.value}","${A2_GRUPO_OI.value}" ,${jsonData.a1_opcion_vta_id ?? 0},"${a1_armazon.value ?? 0}",${jsonData.a2_opcion_vta_id ?? 0},"${a2_armazon.value ?? 0 }",${jsonData.a3_opcion_vta_id ?? 0},"${a3_armazon.value?? 0}",${jsonData.cristal1_opcion_vta_id || 0},${jsonData.cristal1_marca_id || 0},${jsonData.cristal1_diseno_id || 0},${jsonData.cristal1_indice_id || 0},${jsonData.cristal1_material_id || 0},${jsonData.cristal1_tratamiento_id || 0},${jsonData.cristal1_color_id || 0},${typeof A1_Diametro.value === 'string' ? A1_Diametro.value : 0},"${A1_CR_OD ?? " "}","${A1_CR_OI ?? " "}",${jsonData.cristal1_tratamiento_adicional_id || 0},${jsonData.cristal2_od_opcion_venta_id || 0},${jsonData.cristal2_marca_id || 0},${jsonData.cristal2_diseno_id || 0},${jsonData.cristal2_indice_id || 0},${jsonData.cristal2_material_id || 0},${typeof jsonData.cristal2_tratamiento === 'number' ? jsonData.cristal2_tratamiento : 0},${jsonData.cristal2_color_id || 0},${(typeof A2_Diametro.value === 'string' && A2_Diametro.value !== "" ) ? A2_Diametro.value : 0},"${typeof A2_CR_OD.value === 'string' ? A2_CR_OD.value : ""}","${typeof A2_CR_OI.value === 'string' ? A2_CR_OI.value : " " }",${jsonData.cristal2_tratamiento_adicional_id || 0},${jsonData.motivo_garantia_id || 0},${jsonData.folio_asociado || 0},${isEditting ? 0 : jsonData.resolucion_garantia_id === 'Aceptada' ? '1' : '2'},"${jsonData.worktracking || 0}","${jsonData.nota_venta || 0}",${jsonData.numero_reporte_firma || 0},"${jsonData.numero_reporte_atencion || 0}","${"prueba numero OC"}",${jsonData.numero_guia || 0},${jsonData.numero_factura || 0},"${jsonData.folio_interno_mandante || 0}","${jsonData.reporte_interno_mandante || 0}","${jsonData.numero_envio || 0}" ,${jsonData.total || 0},"${jsonData.observaciones || ""}",${1}`

    // console.log(_p1)
    // console.log(_p11)
    
    
    const query = {
      query: "03",
      _p1,
      // _p3:`${_p3}`,
      _p2:`${jsonData.tipo_anteojo_id}`,
      _p3,
      _rut: _rut.trim(),
      _proyecto:`${jsonData.proyecto_codigo}`,
      _origen,
      _destino,
      _estado: estado.toString(),
      _usuario: User.id.toString(),
      _obs:"OT INGRESADA",
      _cristalesJSON: cristalesJSON,
      _armazonesJSON: armazonesJSON,
      _punto_venta:`${punto_venta.value}`,
    };

    // console.log('Valor de jsonData.a1_od_cil:', jsonData.a1_od_cil.value || 0);
    // console.log(formValues)
    // console.log(jsonData)
    // console.log(query)
  
    try {
      const response = await axios.post(`${URLBackend}/api/ot/crear/`, query)
      console.log(response)
      const message = `Nuevo Folio OT: ${response.data.datos[0][0]}`

      if(response.status === 200){


        const result = await showModal(
          MODAL.keep,
          '',
          MODAL.keepYes,
          MODAL.kepNo
        );

        console.log(result)

        if(result){
          let clearCliente = true
          //limpiar inputs
          clearDioptrias();
          reiniciarDioptriasReceta();
          reiniciarValidationNivel1();
          reiniciarValidationNivel3();
          clearGrupos();
          dispatch(clearCodigos())
          clearAllInputsOT(clearCliente)
          clearSelectInput.value = false;
          toast.success(message)
          reiniciarValidationNivel2();
          setSelectedTab(0)
          
          return


        }else{
          toast.success(message)
          handleCloseForm()
          isExistClient.value = false
        }
        
      }
      
      
      
      // if(response.data){
      //   const message = `Nuevo Folio OT: ${response.data.datos[0][0]}`
      //   toast.success(message)
      //   handleCloseForm()
      //   isExistClient.value = false
      // }
    } catch (error) {
      // console.log(error)
      toast.error('Error al Ingresar la OT')
      handleCloseForm()
    }


    console.log()
    return query;
    // return
  }


 
  //Estados locales
  const { control, handleSubmit, setValue, register, getValues } = useForm<any>();
  const [formValues, setFormValues] = useState<FormData | any>({});
  const [showGarantia, setShowGarantia] = useState(false);
  const [showDerivacion, setShowDerivacion] = useState(false);
  const [showPendiente, setShowPendiente]  = useState(false);
  const [showAnulacion, setShowAnulacion]  = useState(false)
  const [_existCliente, setExistCliente] = useState(false);
  const [isFOTEmpaque, setIsFOTEmpaque]  = useState(false);
  const [errorGrupoDioptriaA1, setErrorGrupoDioptriaA1] = useState('');
  const [errorGrupoDioptriaA2, setErrorGrupoDioptriaA2] = useState('');
  const [submitAction, setSubmitAction] = useState('');
  const [_isMotivo, setIsMotivo] = useState(false);
  const [_toggle, setToggle] = useState();
  const [_changeboolean, setChangeboolean] = useState(false)


  const sumatoriaNivel1 = validationNivel1.value.reduce((index, objeto) => index + objeto.valor, 0);
  const sumatoriaNivel2 = validationNivel2.value.reduce((index, objeto) => index + objeto.valor, 0)
  const sumatoriaNivel3 = validationNivel3.value.reduce((index,objecto) => index + objecto.valor, 0);  
 


  const clearAllInputsOT = (clearCliente?:boolean) => {
    //? A1-OJO-DERECHO
    dioptrias_receta.value.a1_od.esf = " ";
    dioptrias_receta.value.a1_od.cil = " ";
    dioptrias_receta.value.a1_od.eje = " ";
    dioptrias_receta.value.a1_od.ad  = " ";
    
    dioptrias_receta.value.a1_oi.esf  = " ";
    dioptrias_receta.value.a1_oi.cil  = " ";
    dioptrias_receta.value.a1_oi.eje  = " ";
    dioptrias_receta.value.a1_oi.ad   = " ";

    A1_DP.value = " ";
    A2_DP.value = " ";
    A1_ALT.value = "  ";
    
    handleFormChange({"worktracking": ' '} , 'optica')
    handleFormChange({"nota_venta": ' '} , 'optica')
    handleFormChange({"folio_interno_mandante": ' '} , 'optica')
    handleFormChange({"reporte_interno_mandante": ' '} , 'optica')
    handleFormChange({"numero_envio": ' '} , 'optica')


    if(clearCliente){
      handleFormChange({"cliente_rut": ' '} , 'cliente')
      handleFormChange({"cliente_nombre": ' '} , 'cliente')
      handleFormChange({"cliente_sexo": ' '} , 'cliente')
      handleFormChange({"cliente_tipo": ' '} , 'cliente')
      handleFormChange({"cliente_fecha_nacimiento": ""} , 'cliente')
      handleFormChange({"cliente_correo": ''} , 'cliente')
      handleFormChange({"cliente_telefono": ''} , 'cliente')
      handleFormChange({"cliente_region": 0} , 'cliente')
      handleFormChange({"cliente_comuna": 0} , 'cliente')
      handleFormChange({"cliente_provincia": 0} , 'cliente')
      handleFormChange({"cliente_direccion": ""} , 'cliente')
      handleFormChange({"establecimiento_id": 0} , 'cliente')

      
    }

    handleFormChange({"a1_alt": ' '} , 'receta')
    handleFormChange({"a1_dp": ' '} , 'receta')
    handleFormChange({"a2_dp": ' '} , 'receta')

    handleFormChange({"observaciones": ' '} , 'receta')
    handleFormChange({"fecha_receta": ' '} , 'receta')
    handleFormChange({"numero_receta": ' '} , 'receta')

    handleFormChange({"a2_od_esf": ' '} , 'receta')
    handleFormChange({"a2_od_cil": ' '} , 'receta')
    handleFormChange({"a2_od_eje": ' '} , 'receta')
    handleFormChange({"a2_oi_esf": ' '} , 'receta')
    handleFormChange({"a2_oi_cil": ' '} , 'receta')
    handleFormChange({"a2_oi_eje": ' '} , 'receta')

    // handleFormChange({"cristal1_marca_id": ' '} , 'cristales')
    handleFormChange({"cristal1_marca_id": false} , 'cristales')
    handleFormChange({"cristal1_diseno_id": false} , 'cristales')
    handleFormChange({"cristal1_indice_id": false} , 'cristales')
    handleFormChange({"cristal1_material_id": false} , 'cristales')
    handleFormChange({"cristal1_color_id": false} , 'cristales')
    handleFormChange({"cristal1_tratamiento_id": false} , 'cristales')
    handleFormChange({"cristal1_tratamiento_adicional_id": false} , 'cristales')
    handleFormChange({"cristal1_diametro": ' '} , 'cristales')
    handleFormChange({"criststal1_od": ' '} , 'cristales')
    handleFormChange({"criststal1_oi": ' '} , 'cristales')



    handleFormChange({"a1_armazon_id": ' '} , 'armazones')
    handleFormChange({"a2_armazon_id": ' '} , 'armazones')
    handleFormChange({"a3_armazon_id": ' '} , 'armazones')
    
    A1_CR_OD.value     = "  ";
    A1_CR_OI.value     = "  ";
    A1_GRUPO_OD.value  = "  ";
    A1_GRUPO_OI.value  = "  ";
    
    // onDataChange({[name]:value})

    //? A2-OJO-DERECHO
    a2_od_esf.value = "  ";
    a2_od_cil.value = "  ";
    a2_od_eje.value = "  ";

    a2_oi_esf.value = "  ";
    a2_oi_cil.value = "  ";
    a2_oi_eje.value = "  ";

    handleFormChange({"a2_dp": ' '} , 'receta')

    // handleFormChange({"cristal1_marca_id": ' '} , 'cristales')
    handleFormChange({"cristal2_marca_id": false} , 'cristales')
    handleFormChange({"cristal2_marca_id": undefined} , 'cristales')
    handleFormChange({"cristal2_diseno_id": false} , 'cristales')
    handleFormChange({"cristal2_indice_id": false} , 'cristales')
    handleFormChange({"cristal2_material_id": false} , 'cristales')
    handleFormChange({"cristal2_color_id": false} , 'cristales')
    handleFormChange({"cristal2_tratamiento_id": false} , 'cristales')
    handleFormChange({"cristal2_tratamiento_adicional_id": false} , 'cristales')
    handleFormChange({"cristal2_diametro": ' '} , 'cristales')

    handleFormChange({"cristal2_od": ' '} , 'cristales')
    handleFormChange({"cristal2_oi": ' '} , 'cristales')



    A2_CR_OD.value    = "  ";
    A2_CR_OI.value    = "  ";
    A2_GRUPO_OD.value = "  ";
    A2_GRUPO_OI.value = "  ";


    a1_armazon.value = "  ";
    a2_armazon.value = "  ";
    a3_armazon.value = "  ";



    //TODO: VALIDACION DE CAMPOS
    validation_A1_OD_ESF(undefined);
    validation_A1_OD_CILL(undefined);
    validation_A1_OD_EJE(undefined);
    validation_A1_OD_AD(undefined);

    validation_A1_OI_ESF(undefined);
    validation_A1_OI_CIL(undefined);
    validation_A1_OI_EJE(undefined);

    validation_A1_ALT(undefined);
    validation_A1_DP(undefined);


    validation_A2_OD_ESF(undefined);
    validation_A2_OD_CIL(undefined);
    validation_A2_OD_EJE(undefined);

    validation_A2_OI_ESF(undefined);
    validation_A2_OI_CIL(undefined);
    validation_A2_OI_EJE(undefined);

    validation_A2_DP(undefined);
}






  const onSubmit: SubmitHandler<any> = async(jsonData, _type?:any) => {
      //  console.log(submitAction)

    // console.log(jsonData)
    // console.log(formValues)
    
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
            console.log(numero)
            if (!isNaN(numero) && numero !== 0 && numero !== null && !Number.isNaN(numero)) {
              return { 'codigo': `${numero}` };
            }
            return null; 
          })
          .filter(item => item !== null);

        console.log(cristales)
        const cristalesJSON = JSON.stringify(cristales)
        cristalesJSONsignal.value = cristales
          
        const armazones = [
            { codigo: `${a1_armazon.value}` },
            { codigo: `${a2_armazon.value}` },
            { codigo: `${a3_armazon.value}` },
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
     
      // console.log('pausar')
     
      // console.log(formValues)
      
      // updateOT(
      //    jsonData, 
      //    OTAreaActual, 
      //    OTAreaActual, 
      //    30,  
      //    formValues, 
      //    data, 
      //    OTSlice.cristales, 
      //    OTSlice.armazones,
      //    User["id"].toString()
      // ).then(()=>{
      //   console.log(OTAreaActual)
      //   dispatch(fetchOT({OTAreas:OTAreaActual}))
      //   handleCloseForm()
      // })
      // setSubmitAction('');
      // switchCasePausar(jsonData);
    } else if (submitAction === 'procesar') {
      // switchCaseProcesar(jsonData);
      // console.log('click')

      // console.log(OTAreaActual)

      // if(OTAreaActual === 100){
      //   //TODO: estado true para mostrar modal empaque
      //   // console.log('true')
      //   setIsFOTEmpaque(true)
      //   //TODO: Resultado del formulario

      // }

        let estado = OTAreaActual === 100 ? 50 : 20

        updateOT(
          jsonData,
          OTAreaActual,
          OTAreas["areaSiguiente"],
          estado,
          formValues,
          data,
          OTSlice.cristales,
          OTSlice.armazones,
          User["id"].toString()
        ).then(()=>{
          dispatch(fetchOT({OTAreas:OTAreaActual}))
          handleCloseForm()
        })
        setSubmitAction('');
    }else if (submitAction === 'ingresar'){
      // console.log('click')
      
      switchCaseIngresar(jsonData, cristalesJSON, armazonesJSON)
      setSubmitAction('');
    }

  };







  //Persistencia de datos
  const handleFormChange = async(dataForm: any, name: string) => {
    setChangeboolean((prev)=>!prev);
    let clearCliente = false
    const key = Object.keys(dataForm)[0] 
    // console.log(key)

    if(key === 'tipo_anteojo_id'){
      clearAllInputsOT(clearCliente)
    }

    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: {
        ...prevFormValues[name],
        ...dataForm
      }
    }));
    // console.log(Object.keys(data)[0])
    // console.log(name)
    // console.log(data)
    
    // console.log(formValues)

    //TODO: inputChangeAction 


    if(inputChangeActions[key]){
      // console.log('render')
      inputChangeActions[key](dataForm);
    }



     //TODO: DIOPTRIAS CRISTALES SI ES TIPO 3(LEJOS/CERCA)
    // console.log(tipo_de_anteojo.value)
    if(tipo_de_anteojo.value === '3'){
      // clearInputDioptrias()
      //? OJO DERECHO
      if(
        Object.keys(dataForm)[0] === 'a1_od_esf' ||
        Object.keys(dataForm)[0] === 'a1_od_cil' ||
        Object.keys(dataForm)[0] === 'a1_od_eje' ||
        Object.keys(dataForm)[0] === 'a1_od_ad'  ||
        tipo_de_anteojo.value === '3'
      ){
        // if(dioptrias_receta.value.a1_od.ad < 0){
        //   a2_od_esf.value = " ";
        //   dioptrias_receta.value.a1_od.ad  = " ";
        // }
         

        if(typeof dioptrias_receta.value.a1_od.ad !== 'object' &&  dioptrias_receta.value.a1_od.ad > 0){
          a2_od_esf.value = (typeof dioptrias_receta.value.a1_od.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_od.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_od.esf) ) + parseFloat(dioptrias_receta.value.a1_od.ad)
          a2_od_cil.value = (typeof dioptrias_receta.value.a1_od.cil === 'object' ? 0 : dioptrias_receta.value.a1_od.cil)
          a2_od_eje.value = (typeof dioptrias_receta.value.a1_od.eje === 'object' ? 0 : dioptrias_receta.value.a1_od.eje)


          // console.log(a1_od_eje.value)
          // console.log(dioptrias_receta.value.a1_od.eje)
          // console.log(formValues["receta"])

          // console.log((typeof dioptrias_receta.value.a1_od.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_od.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_od.esf) ) + parseFloat(dioptrias_receta.value.a1_od.ad))

          validation_A2_OD_ESF(a2_od_esf.value)
          validation_A2_OD_CIL(a2_od_cil.value)
          validation_A2_OD_EJE(a2_od_eje.value)
        }

        // a2_od_cil.value = (typeof dioptrias_receta.value.a1_od.cil === 'object' ? 0 : dioptrias_receta.value.a1_od.cil)
        // a2_od_eje.value = (typeof dioptrias_receta.value.a1_od.eje === 'object' ? 0 : dioptrias_receta.value.a1_od.eje)

      }
      //? OJO IZQUIERDO
      if(
        Object.keys(dataForm)[0] === 'a1_oi_esf' ||
        Object.keys(dataForm)[0] === 'a1_oi_cil' ||
        Object.keys(dataForm)[0] === 'a1_oi_eje' ||
        Object.keys(dataForm)[0] === 'a1_oi_ad'  ||
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
          
          // console.log( a2_oi_esf.value = (typeof dioptrias_receta.value.a1_oi.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_oi.esf)) + parseFloat(dioptrias_receta.value.a1_oi.ad))
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

    console.log(key)
    //todo  INICIO CRISTALES, TRAE GRUPO Y CODIGO DEPENDIENDO DE DATOS DEL CRISTAL 
     // ? ANTEOJO 1: 
    if(changeCodigoCristal_A1[key]){
      console.log('render')
      const formValue = getValues()
      const {cristal1_marca_id, cristal1_diseno_id, cristal1_indice_id, cristal1_color_id , cristal1_material_id,cristal1_tratamiento_id } = formValue;
      


      if((cristal1_marca_id                       !== undefined  || data?.[EnumGrid.cristal1_marca_id]    !== undefined) &&
         (cristal1_diseno_id                      !== undefined  || data?.[EnumGrid.cristal1_diseno_id]   !== undefined) &&
         (cristal1_indice_id                      !== undefined  || data?.[EnumGrid.cristal1_indice_id]   !== undefined) && 
         (cristal1_color_id                       !== undefined  || data?.[EnumGrid.cristal1_color_id]    !== undefined) &&
         (cristal1_material_id                    !== undefined  || data?.[EnumGrid.cristal1_material_id] !== undefined) &&
         (cristal1_tratamiento_id                 !== undefined  || data?.[EnumGrid.cristal1_tratamiento_id] !== undefined)&&
        A1_Diametro.value.toString().trim()                  !== ''        &&
        dioptrias_receta.value.a1_od.esf          !== ' '       &&
        dioptrias_receta.value.a1_od.cil          !== ' '       &&
        dioptrias_receta.value.a1_oi.esf          !== ' '       &&
        dioptrias_receta.value.a1_oi.cil          !== ' '
      ){

        // console.log('ejecutando llamada...')
        // console.log('ejecutando llamada...')

        if(dioptrias_receta.value.a1_od.cil > 0 || dioptrias_receta.value.a1_oi.cil > 0){
          return;
        }

        const _pkToDelete1_od ={
          "marca":      cristal1_marca_id       || data?.[EnumGrid.cristal1_marca_id],
          "diseno":     cristal1_diseno_id      || data?.[EnumGrid.cristal1_diseno_id],
          "indice":     cristal1_indice_id      || data?.[EnumGrid.cristal1_indice_id],
          "material":   cristal1_material_id    || data?.[EnumGrid.cristal1_material_id],
          "color":      cristal1_color_id       || data?.[EnumGrid.cristal1_color_id],
          "tratamiento":cristal1_tratamiento_id || data?.[EnumGrid.cristal1_tratamiento_id],
          "diametro":   A1_Diametro.value,
          "esferico":   dioptrias_receta.value.a1_od.esf ?? 0, 
          "cilindrico": dioptrias_receta.value.a1_od.cil ?? 0
        }


        // console.log(_pkToDelete1_od)
        
        const _pkToDelete1_oi ={
          "marca":      cristal1_marca_id       || data?.[EnumGrid.cristal1_marca_id],
          "diseno":     cristal1_diseno_id      || data?.[EnumGrid.cristal1_diseno_id],
          "indice":     cristal1_indice_id      || data?.[EnumGrid.cristal1_indice_id],
          "material":   cristal1_material_id    || data?.[EnumGrid.cristal1_material_id],
          "color":      cristal1_color_id       || data?.[EnumGrid.cristal1_color_id],
          "tratamiento":cristal1_tratamiento_id || data?.[EnumGrid.cristal1_tratamiento_id],
          "diametro":   A1_Diametro.value,
          "esferico":   dioptrias_receta.value.a1_oi.esf ?? 0,
          "cilindrico": dioptrias_receta.value.a1_oi.cil ?? 0, 
        }

        console.log(_pkToDelete1_oi)



        try {
          const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
          const encodedJSON = encodeURIComponent(pkJSON)

          // console.log(encodedJSON)
          
          const {data:cristalesDataOD} = await axios(`${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`)
          
          const cristalesDATA = JSON.parse(cristalesDataOD[0][0])
          // console.log(cristalesDATA)

          if(cristalesDATA && cristalesDATA["ERROR"] !== ''){
            setErrorGrupoDioptriaA1(cristalesDATA["ERROR"]);
            // console.log('hay error')
            // console.log(cristalesDATA)
            //   console.log('render')
            //   toast.error(cristalesDATA["ERROR"])

            // // toast.error(cristalesDATA["ERROR"])


            // A1_CR_OD.value = " ";
            // A1_CR_OI.value = " ";

            // A1_GRUPO_OD.value    = " ";
            // A1_GRUPO_OI.value    = " ";

            

            // validation_Cristal1_od("")
            // validation_Cristal1_oi("")
          }else{
            // console.log(cristalesDATA)
            A1_CR_OD.value = cristalesDATA["CR_OD"].trim() || "   ";
            A1_CR_OI.value = cristalesDATA["CR_OI"].trim() || "   "
            // A1_GRUPO.value = cristalesDATA["GRUPO"]
  
            A1_GRUPO_OD.value = cristalesDATA["GRUPO_OD"].trim() || "  "
            A1_GRUPO_OI.value = cristalesDATA["GRUPO_OI"].trim() || "  "
            
            validation_Cristal1_od(cristalesDATA["CR_OD"])
            validation_Cristal1_oi(cristalesDATA["CR_OI"])
            setChangeboolean((prev)=>!prev)
          }
          
        } catch (error) {
          // console.log(error)
          throw error
        }  
      }
    }

    //? ANTEOJO 2:
    // console.log(a2_oi_esf.vsalue)

    console.log(key)
    if(changeCodigoCristal_A2[key]){
      console.log('render')
      if(tipo_de_anteojo.value === '3'){
        console.log('render')
      }
    }


    if(tipo_de_anteojo.value === '3'){
      console.log(key)
      console.log('render')
      if(changeCodigoCristal_A2[key] ){
        const formValue = getValues()
        const {cristal2_marca_id, cristal2_diseno_id, cristal2_indice_id, cristal2_color_id , cristal2_material_id,cristal2_tratamiento_id } = formValue;
        console.log(formValue)

        console.log(A2_Diametro.value.toString())
        // console.log(a2_od_esf.value)
        // console.log(a2_oi_esf.value)

        console.log(dioptrias_receta.value.a2_od.esf)
        console.log(dioptrias_receta.value.a2_od.cil)


        if((cristal2_marca_id                      !== undefined   || data?.[EnumGrid.cristal2_marca_id]          !== undefined) &&
          (cristal2_diseno_id                      !== undefined   || data?.[EnumGrid.cristal2_diseno_id]         !== undefined) &&
          (cristal2_indice_id                      !== undefined   || data?.[EnumGrid.cristal2_indice_id]         !== undefined) && 
          (cristal2_color_id                       !== undefined   || data?.[EnumGrid.cristal2_color_id]          !== undefined) &&
          (cristal2_material_id                    !== undefined   || data?.[EnumGrid.cristal2_material_id]       !== undefined) &&
          (cristal2_tratamiento_id                 !== undefined   || data?.[EnumGrid.cristal2_tratamiento_id]    !== undefined) &&
          (A2_Diametro.value.toString().trim()     !== ''           ) &&
          dioptrias_receta.value.a2_od.esf         !== '  '          &&
          dioptrias_receta.value.a2_od.cil         !== '  '        
          // (a2_od_esf.value                          !== '  ')        &&
          // (a2_od_cil.value                          !== '  ')        
          ){
          console.log('ejecutando llamada.....')
          const _pkToDelete1_od ={
            "marca":      cristal2_marca_id        || data?.[EnumGrid.cristal2_marca_id],
            "diseno":     cristal2_diseno_id       || data?.[EnumGrid.cristal2_diseno_id],
            "indice":     cristal2_indice_id       || data?.[EnumGrid.cristal2_indice_id],
            "material":   cristal2_material_id     || data?.[EnumGrid.cristal2_material_id],
            "color":      cristal2_color_id        || data?.[EnumGrid.cristal2_color_id],
            "tratamiento":cristal2_tratamiento_id  || data?.[EnumGrid.cristal2_tratamiento_id],
            "diametro":   A2_Diametro.value,
            "esferico":   a2_od_esf.value ?? 0, 
            "cilindrico": a2_od_cil.value ?? 0
          }
  
  
          console.log(_pkToDelete1_od)
          
          const _pkToDelete1_oi ={
            "marca":      cristal2_marca_id          || data?.[EnumGrid.cristal2_marca_id],
            "diseno":     cristal2_diseno_id         || data?.[EnumGrid.cristal2_diseno_id],
            "indice":     cristal2_indice_id         || data?.[EnumGrid.cristal2_indice_id],
            "material":   cristal2_material_id       || data?.[EnumGrid.cristal2_material_id],
            "color":      cristal2_color_id          || data?.[EnumGrid.cristal2_color_id],
            "tratamiento":cristal2_tratamiento_id    || data?.[EnumGrid.cristal2_tratamiento_id],
            "diametro":   A2_Diametro.value,
            "esferico":   a2_oi_esf.value ?? 0,
            "cilindrico": a2_oi_cil.value ?? 0, 
          }
  
          console.log(_pkToDelete1_oi)


  
          try {
            const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
            const encodedJSON = encodeURIComponent(pkJSON)

          
  
            const {data:cristalesDataOI} = await axios(`${URLBackend}/api/proyectogrupos/listado/?query=06&_p2=${codigoProyecto.value}&_pkToDelete=${encodedJSON}`)
            
            const cristalesDATA = JSON.parse(cristalesDataOI[0][0])
            console.log(cristalesDATA)
  
            if(cristalesDATA && cristalesDATA["ERROR"] !== ''){
              console.log('render')
              setErrorGrupoDioptriaA2(cristalesDATA["ERROR"])
            }else{
              console.log('render')
              A2_CR_OD.value = cristalesDATA["CR_OD"].trim() || " ";
              A2_CR_OI.value = cristalesDATA["CR_OI"].trim() || " ";
    
              A2_GRUPO_OD.value = cristalesDATA["GRUPO_OD"];
              A2_GRUPO_OI.value = cristalesDATA["GRUPO_OI"];
    
              validation_Cristal2_od(cristalesDATA["CR_OD"]);
              validation_Cristal2_oi(cristalesDATA["CR_OI"]);             
  
              setChangeboolean((prev)=>!prev)
            }  
          } catch (error) {
            // console.log(error)
            throw error
          }
  
        }
  
      }
  
    }
   
    // actualizarEstado(Object.keys(data)[0], 1)

  };
  
  const loadFormData = () => {
    if (formValues) {
      setValue('optica', formValues.optica);
      setValue('cliente', formValues.cliente);
      setValue('receta', formValues.receta);
      setValue('cristales', formValues.cristales);
    }
  };

  // const handlePausarClick = () => {
  //   setSubmitAction('pausar');
  //   console.log('click')
  //   console.log(data && data[EnumGrid.proyecto_codigo])
  //   console.log(formValues)

  // };
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


// React.useEffect(()=>{
//   console.log(formValues)
// },[a2_od_esf.value])


// React.useEffect(()=>{

//   // const getDioptriasA2 = (data:any) => {
//   //   if(tipo_de_anteojo.value === '3'){
//   //     // clearInputDioptrias()
//   //     //? OJO DERECHO
//   //     if(
//   //       Object.keys(data)[0] === 'a1_od_esf' ||
//   //       Object.keys(data)[0] === 'a1_od_cil' ||
//   //       Object.keys(data)[0] === 'a1_od_eje' ||
//   //       Object.keys(data)[0] === 'a1_od_ad'  ||
//   //       tipo_de_anteojo.value === '3'
//   //     ){
//   //       if(dioptrias_receta.value.a1_od.ad < 0){
//   //         a2_od_esf.value = " ";
//   //         dioptrias_receta.value.a1_od.ad  = " ";
//   //       }
         
  
//   //       if(typeof dioptrias_receta.value.a1_od.ad !== 'object' &&  dioptrias_receta.value.a1_od.ad > 0){
//   //         a2_od_esf.value = (typeof dioptrias_receta.value.a1_od.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_od.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_od.esf) ) + parseFloat(dioptrias_receta.value.a1_od.ad)
//   //         // a2_od_cil.value = (typeof dioptrias_receta.value.a1_od.cil === 'object' ? 0 : dioptrias_receta.value.a1_od.cil)
//   //         // a2_od_eje.value = (typeof dioptrias_receta.value.a1_od.eje === 'object' ? 0 : dioptrias_receta.value.a1_od.eje)
//   //         a2_od_cil.value = (typeof dioptrias_receta.value.a1_od.cil === 'object' ? 0 : (a1_od_cil.value * -1))
//   //         a2_od_eje.value = (typeof dioptrias_receta.value.a1_od.eje === 'object' ? 0 : a1_od_eje.value )
//   //         console.log(a1_od_eje.value)
//   //         console.log(dioptrias_receta.value.a1_od.eje)
  
//   //         console.log((typeof dioptrias_receta.value.a1_od.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_od.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_od.esf) ) + parseFloat(dioptrias_receta.value.a1_od.ad))
  
//   //         validation_A2_OD_ESF(a2_od_esf.value)
//   //         validation_A2_OD_CIL(a2_od_cil.value)
//   //         validation_A2_OD_EJE(a2_od_eje.value)
//   //       }
  
//   //       // a2_od_cil.value = (typeof dioptrias_receta.value.a1_od.cil === 'object' ? 0 : dioptrias_receta.value.a1_od.cil)
//   //       // a2_od_eje.value = (typeof dioptrias_receta.value.a1_od.eje === 'object' ? 0 : dioptrias_receta.value.a1_od.eje)
  
//   //     }
//   //     //? OJO IZQUIERDO
//   //     if(
//   //       Object.keys(data)[0] === 'a1_oi_esf' ||
//   //       Object.keys(data)[0] === 'a1_oi_cil' ||
//   //       Object.keys(data)[0] === 'a1_oi_eje' ||
//   //       Object.keys(data)[0] === 'a1_oi_ad'  ||
//   //       tipo_de_anteojo.value === '3'
//   //     ){
//   //       if(dioptrias_receta.value.a1_od.ad < 0){
//   //         a2_od_esf.value = " ";
//   //         console.log('render')
//   //         dioptrias_receta.value.a1_od.ad  = " ";
//   //       }
  
        
//   //       if(typeof dioptrias_receta.value.a1_oi.ad !== 'object' && dioptrias_receta.value.a1_oi.ad > 0){
          
          
//   //         a2_oi_esf.value = (typeof dioptrias_receta.value.a1_oi.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_oi.esf)) + parseFloat(dioptrias_receta.value.a1_oi.ad)
//   //         a2_oi_eje.value = (typeof dioptrias_receta.value.a1_oi.eje === 'object' ? 0 : dioptrias_receta.value.a1_oi.eje)
//   //         a2_oi_cil.value = (typeof dioptrias_receta.value.a1_oi.cil === 'object' ? 0 : dioptrias_receta.value.a1_oi.cil);
          
//   //         console.log( a2_oi_esf.value = (typeof dioptrias_receta.value.a1_oi.esf !== 'object' && Number.isNaN(dioptrias_receta.value.a1_oi.esf) ? 0 : parseFloat(dioptrias_receta.value.a1_oi.esf)) + parseFloat(dioptrias_receta.value.a1_oi.ad))
//   //       }
  
//   //     }
  
  
//   //     // let transponer1Ejecutado = false;
//   //     validation_A2_OD_ESF(a2_od_esf.value)
//   //     validation_A2_OD_CIL(a2_od_cil.value)
//   //     validation_A2_OD_EJE(a2_od_eje.value)
  
  
//   //     validation_A2_OI_ESF(a2_oi_esf.value)
//   //     validation_A2_OI_CIL(a2_oi_cil.value)
//   //     validation_A2_OI_EJE(a2_oi_eje.value)
  
//   //   }

//   // }
//   console.log(dioptrias_receta.value.a1_od.eje)
// },[tipo_de_anteojo.value, dioptrias_receta.value])






// console.log(data && data[EnumGrid.a1_dp])

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


useEffect(() => {
  if (errorGrupoDioptriaA1 !== '') {
    console.log('render');
    toast.error(errorGrupoDioptriaA1);

    A1_CR_OD.value = " ";
    A1_CR_OI.value = " ";

    A1_GRUPO_OD.value = " ";
    A1_GRUPO_OI.value = "";

    validation_Cristal1_od("");
    validation_Cristal1_oi("");
    setChangeboolean((prev)=>!prev)
    // setErrorGrupoDioptriaA1("");
  
  }
}, [errorGrupoDioptriaA1]);


useEffect(() => {
  if (errorGrupoDioptriaA2 !== '') {
    console.log('render');
    toast.error(errorGrupoDioptriaA2);

    A2_CR_OD.value = " ";
    A2_CR_OI.value = " ";

    A2_GRUPO_OD.value = " ";
    A2_GRUPO_OI.value = "";

    validation_Cristal2_od("");
    validation_Cristal2_oi("");
    // setErrorGrupoDioptriaA2("");
  }
}, [errorGrupoDioptriaA2]);


useEffect(() => {  
  const handleKeyDown = (event:KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'ArrowRight') {
      setSelectedTab((prevTab) => (prevTab + 1 + 6) % 6 );
    } else if (event.ctrlKey && event.key === 'ArrowLeft') {
      setSelectedTab((prevTab) => (prevTab - 1 + 6) % 6); 
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []);

useEffect(()=>{
    const fechaHoraActual = new Date()
    const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];
    fecha_atencion_signal.value = fechaFormateada
},[])



// useEffect(()=>{
//   setChangeboolean((prev)=>!prev)
//   console.log('render')
// },[validar_armazon1.value])

// console.log(permiso_usuario_verificar_cristal)
// console.log(permiso_usuario_verificar_armazon)



// console.log(permiso_area_verificar_cristal)
// console.log(permiso_area_verificar_armazon)




// console.log(((permiso_area_verificar_cristal && permiso_area_verificar_armazon ) && sumatoriaNivel3 === validationNivel3.value.length))





  // console.log(formValues)

  console.log(fecha_atencion_signal.value)

  console.log(validationNivel1.value)
  
  console.log(validationNivel2.value)

  console.log(validationNivel3.value)

  return (

    <div className='useFormContainerOT top-[0%]  w-full h-[100%]'>
      <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
        <TabList className='flex items-center top-[10]'>
          <Tab className="custom-tab ">ÓPTICA</Tab>
          <Tab className="custom-tab ">CLIENTE</Tab>
          <Tab className="custom-tab ">RECETA</Tab>
          <Tab className="custom-tab ">CRISTALES</Tab>
          <Tab className="custom-tab ">ARMAZONES</Tab>
          <Tab className="custom-tab ">BITÁCORA</Tab>
          {isEditting && (
            <h1 className='tabFolioNumber'>Folio OT: {data && data[EnumGrid.folio]}</h1>
          )}
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
            
          <TabPanel onSelect={loadFormData}>
            <FOTClientes onlyRead={onlyRead} data={data && data} isEditting={isEditting} register={register} formValues={formValues["cliente"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cliente')} setExistCliente={setExistCliente}    />
          </TabPanel>

          <TabPanel>
            <FOTReceta  permiso_usuario_receta={permiso_usuario_receta} permiso_areas_receta={permiso_areas_receta} onlyRead={onlyRead} isEditting={isEditting} data={data && data} formValues={formValues["receta"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'receta')}  />
          </TabPanel>

          <TabPanel>
            <FOTCristales permiso_area_verificar_cristal={permiso_area_verificar_cristal} permiso_usuario_verificar_cristal={permiso_usuario_verificar_cristal} permiso_usuario_grupo_dioptria={permiso_usuario_grupo_dioptria} permiso_areas_grupo_dioptria={permiso_areas_grupo_dioptria} permiso_areas_cristales={permiso_areas_cristales}  permiso_usuario_cristales={permiso_usuario_cristales} onlyRead={onlyRead} isEditting={isEditting} data={data && data}  formValues={formValues["cristales"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cristales')}   /> 
          </TabPanel>

          <TabPanel> 
            <FOTArmazones setSelectedTab={setSelectedTab} permiso_areas_armazones={permiso_areas_armazones} isEditting={isEditting} permiso_usuario_armazones={permiso_usuario_armazones} onlyRead={onlyRead}  data={data && data} formValues={formValues["armazones"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'armazones')}  />
          </TabPanel>
          

          <TabPanel>
            <FOTBitacora isMOT={isMOT} otData={data && data}/>
          </TabPanel>

          {showGarantia && (
            <div>
              <FOTGarantia data={data && data} onClose={() =>setShowGarantia(false)} closeModal={handleCloseForm}/>
            </div>
          )}

          {showDerivacion && (
            <div>
              <FOTDerivacion  closeModal={handleCloseForm} formValues={formValues} data={data && data} onClose={() =>setShowDerivacion(false)}/>
            </div>
          )}

          {showPendiente && (
            <div>
              <FOTPendiente closeModal={handleCloseForm} onClose={()=>setShowPendiente(false)} data={data && data} formValues={formValues}/>
            </div>
          )}

            {showAnulacion && (
              <div>
                <FOTAnulacion closeModal={handleCloseForm} onClose={()=>setShowAnulacion(false)} data={data && data}/>
              </div>
            )}
          
          <div className='flex items-center mx-auto mt-[1.5rem] justify-around w-1/2 '>
        
                {isEditting            && 
                isMOT                  && 
                escritura_lectura      &&
                // isMotivo    &&  (
                  (
                    <Button className='otActionButton bg-green-400' onClick={() => setShowGarantia(prev => !prev)}>
                      Garantía
                    </Button>
                )}
                
               

                {OTPermissions           && 
                !isMOT                   &&
                isEditting               &&
                escritura_lectura        && 
                // OTPermissions[6] === "1" &&
                sumatoriaNivel1  === validationNivel1.value.length &&
               (sumatoriaNivel2  === validationNivel2.value.length || data && data[EnumGrid.validar_parametrizacion_id] === "0" ) &&
                (
                  ((permiso_area_verificar_cristal && permiso_area_verificar_armazon ) && sumatoriaNivel3 === validationNivel3.value.length) || 
                  (OTAreaActual !== 60)
                ) && 
               (
                  <Button className='otActionButton bg-green-400 hover:bg-green-700' onClick={handleProcesarClick}>Procesar</Button>
                )}

                

                {OTPermissions           && 
                !isMOT                   &&
                isEditting               &&
                escritura_lectura        &&
                OTPermissions[7] === "1" &&
                (
                  <Button className='otActionButton bg-yellow-700 hover:bg-yellow-900' onClick={()=>setShowPendiente((prev)=>!prev)}>Pausar</Button>
                )}

                {OTPermissions           &&
                !isMOT                   &&
                isEditting               &&
                escritura_lectura        &&
                OTPermissions[8] === "1" &&
                sumatoriaNivel1  === validationNivel1.value.length &&
                data && data[EnumGrid.estado_id] > 1 && (
                  <Button className='otActionButton bg-red-700 hover:bg-red-900' onClick={()=>{setShowDerivacion((prev)=>!prev)}}>Derivar</Button>
                )}


                
                {OTPermissions           &&
                escritura_lectura        &&
                OTPermissions[9] === "1" && 
                sumatoriaNivel1  === validationNivel1.value.length && 
                // (data && data[EnumGrid.estado_id] === 30 || data && data[EnumGrid.estado_id] === 40 ) && 
                (
                  <Button className='otActionButton bg-black' onClick={()=>setShowAnulacion(prev=>!prev)}> Anular</Button>
                )}
                
                {OTPermissions             &&
                !isEditting                &&
                escritura_lectura          &&
                 OTPermissions[10] === "1" &&
                 sumatoriaNivel1  === validationNivel1.value.length &&
                 (
                  <Button className='otActionButton bg-blue-500' onClick={handleIngresarClick}>Ingresar</Button>
                 )
                
                }
          </div>
              

              {isFOTEmpaque && (
                <FOTEmpaque closeModal={()=>setIsFOTEmpaque(false)}/>
              )}

              <CustomModal/>
      </Suspense>
      </Tabs>
    </div>
  );
};

export default FOT;




