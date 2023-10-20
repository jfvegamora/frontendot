import React,{useState} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AppStore, useAppSelector } from '../../../redux/store';
import 'react-tabs/style/react-tabs.css'; 
import moment from 'moment';
import axios from 'axios';
import {toast} from 'react-toastify';


import FOTOptica from '../../components/OTForms/FOTOptica';
import FOTClientes from '../../components/OTForms/FOTClientes';
import FOTReceta from '../../components/OTForms/FOTReceta';
import FOTArmazones from '../../components/OTForms/FOTArmazones';
import FOTCristales from '../../components/OTForms/FOTCristales';
import FOTBitacora from '../../components/OTForms/FOTBitacora';
import { useCrud } from '../../hooks';
import FOTGarantia from '../../components/OTForms/FOTGarantia';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import FOTDerivacion from '../../components/OTForms/FOTDerivacion';
import { SEXO, TIPO_CLIENTE } from '../../utils';


// {
//   "query": "03",
//   "_destino": "60",
//   "_estado": "1",
//   "_origen": "40",
//   "_p1": "1,70,1,1,1,'PR002A',3,'1-22323','2023-10-18','2023-10-19','2023-10-21','2023-10-22',11,123123,'2023-10-19',2,1,2,3,4,5,6,7,8,9,10,1,11,12,13,14,15,16,17,1,1,1,1,2,1,3,1,1,3,4,3,2,1001,1002,1,1,2,5,4,3,1,1003,1004,2,0,0,0,123,123,123,123,'observaciones test'",
//   "_p3":"'1-22323','cliente test ot 2',0, 0,'2023-10-24','calle falsa 123' ,150, '12331','test@test.cl', '3'",
//   "_rut": "",
//   "_usuario": "98"
// }


interface IFOTProps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
  isMOT?:boolean
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




const strBaseUrl="/api/ot/"


const validacionNivel1 = [
  { campo:"numero_worktracking",
    valor: 0
  },
  { campo:"nota_venta",
    valor: 0
  },
  { campo:"folio_mandante",
    valor: 0
  },
  { campo:"numero_factura",
    valor: 0
  },
]



const FOT:React.FC<IFOTProps> = ({
  closeModal,
  data,
  isEditting,
  isMOT
}) => {
  // const {createdEntity, editEntity} = useCrud(strBaseUrl);
  const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  const User:any = useAppSelector((store: AppStore) => store.user);
  let OTAreaActual = OTAreas["areaActual"]
  // console.log(data)

  console.log('otAreas', OTAreas)
  
  // console.log(isEditting)
  const switchCasePausar = (jsonData:any) => {
    let _origen = 60;
    let _destino = 60
    let _estado = 0;

    // _origen = OTAreaActual;
    // _destino = OTAreaActual;
     _estado = 3;

    let area = isEditting
    ? (data && parseInt(data[EnumGrid.estado_id]))
    : 1;

    console.log('isEditting', isEditting)
    console.log('data estado', data && data[EnumGrid.estado_id])

    switch (area) {
      case 1:
        console.log('Ejecutando acción para pausar, estado numero 1');
        // updateOT(data, _destino, _origen, _estado);
        insertOT(jsonData)
        break;
      case 2:
        console.log('Ejecutando acción para pausar, estado numero 2');
        updateOT(data, _destino, _origen, _estado);
        break;
      case 3:
        console.log('Ejecutando acción para pausar, estado numero 3');
        updateOT(data, _destino, _origen, _estado);
        break;
      case 4:
        console.log('Ejecutando acción para pausar, estado numero 4');
        updateOT(data, _destino, _origen, _estado)
        break;
      default:
          console.log('Número no reconocido');
        break;
    }
  }


  const switchCaseProcesar = (jsonData:any) => {
  //  console.log('hola')
  //  const formData = getValues

    let _origen = 0;
    let _destino = 0;
    let _estado = 0;
    

    // console.log(formData)
    let area = isEditting
    ? (data && parseInt(data[EnumGrid.estado_id]))
    : 1;
    console.log('area', area)

    switch (area) {
      case 1:
        console.log('Ejecutando acción para procesar, estado numero 1');
        // origen = area actual
        // destino = area actual
        // ot estado = 3 (pendiente)
        // bitacora(origen,origen, "ingresada")
        // bitacora(origen, destino, estado) 
        // insert ot = query 03
        _origen = 50;
        _destino= 50;
        _estado = 2;
        // updateOT(data, _destino, _origen, _estado);
        insertOT(jsonData)

        
        break;
      case 2:
        console.log('Ejecutando acción para procesar, estado numero 2');
        // _oirgen = area actual
        //_destino = area actual 
        // ot.estado = 3(pendiente)
        // bitacora(origen, destino, estado) 
        // Update ot = query04
        _origen = 60;
        _destino = 70;
        _estado = 2;
        updateOT(data, _destino, _origen, _estado);


        
        break;
      case 3:
        console.log('Ejecutando acción para procesar, estado numero 3');
        // ot.origen = area actual
        // ot.destino = area
        // ot.estado = 3 (pendiente)
        // update ot = query04
        _origen =  60;
        _destino = 60;
        _estado = 2;

        updateOT(data, _destino, _origen, _estado);
        break;
      case 4:
        console.log('Ejecutando acción para procesar, estado numero 4');
        //ot.area = area actual
        // destino = area actual
        // bi(origen, destino, estado)
        //Update ot = query04

        _origen = 60;
        _destino = 70;
        _estado = 2;
        
        updateOT(data, _destino, _origen, _estado)
        break;
      default:
          console.log('Número no reconocido');
          // Realizar acciones para números no reconocidos
          // Realizar otras acciones específicas para este caso
        break;
    }
  }


  const switchCaseDerivar = (jsonData:any) => {
   
    let _origen = 0;
    let _destino = 0;
    let _estado = 4;
    let OTAreaActual = OTAreas["areaActual"]

    // console.log(data)
    const area = data && parseInt(data[EnumGrid.estado_id])

    switch (area) {
      case 2:
        console.log('Ejecutando acción para el número 2');
        // _oirgen = area actual
        //_destino = area elegida 
        // ot.estado = 4(derivada)
        // bitacora(origen, destino, estado) 
        // Update ot = query04



        // _origen = OTAreaActual;
        // _destino = OTAreaActual;
        // _estado = 3;
        // transformUpdateQuery(data, _destino, _origen, _estado);


        
        break;
      case 3:
        console.log('Ejecutando derivacion,  para el estado numero 3');
        // ot.origen = area actual
        // ot.destino = area
        // ot.estado = 3 (pendiente)
        // update ot = query04
        _origen = 50;
        _destino = 60;
        _estado = 4;

        updateOT(data, _destino, _origen, _estado);
        break;
      case 4:
        console.log('Ejecutando acción para el estado número 4');
        //ot.area = area actual
        // destino = area actual
        // bi(origen, destino, estado)
        //Update ot = query04

        _origen = OTAreaActual;
        _destino = OTAreaActual;
        _estado = 3;
        
        updateOT(data, _destino, _origen, _estado)
        break;
      default:
          console.log('Número no reconocido');
          // Realizar acciones para números no reconocidos
          // Realizar otras acciones específicas para este caso
        break;
    }
  }
  

  //Metodo editar query04
  const updateOT =async (
    jsonData:any,
    _destino:number,
    _origen:number,
    _estado:number
  )  => {
    let estado_impresion = 1;
    let estado_validacion = 1;
    let motivo = 1;
    let a1_grupo = 1;
    let a2_grupo = 1;
    let area = 50;
    let _rut = `${jsonData.cliente_rut || ""}`
    let _p3 = [ ...(jsonData.cliente_nombre !== undefined ? [`nombre='${jsonData.cliente_nombre}'`] : []),  ...(jsonData.cliente_tipo !== undefined ? [`tipo=${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? 1 : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? 2 : jsonData.cliente_sexo === TIPO_CLIENTE.optica ? 3 : 0}`] : []),...(jsonData.cliente_sexo !== undefined ? [`sexo=${jsonData.cliente_sexo === SEXO.masculino ? 1 : jsonData.cliente_sexo === SEXO.femenino ? 2 : jsonData.cliente_sexo === SEXO.no_aplica ? 3 : 0}`] : []) , ...(jsonData.cliente_fecha_nacimiento !== undefined ? [`fecha_nacimiento='${jsonData.cliente_fecha_nacimiento}'`] : []) , ...(jsonData.cliente_direccion !== undefined ? [`direccion='${jsonData.cliente_direccion}'`] : []) , ...(jsonData.cliente_comuna !== undefined ? [`comuna=${jsonData.cliente_comuna || 150}`] : []), ...(jsonData.cliente_telefono !== undefined ? [`telefono='${jsonData.cliente_telefono}'`] : []), ...(jsonData.cliente_correo !== undefined ? [`correo='${jsonData.cliente_correo}'`] : []), ...(jsonData.establecimiento_id !== undefined ? [`establecimiento=${jsonData.establecimiento_id}`] : [])].join(', ');

    


    // console.log('jsonData', jsonData.a2_opcion_vta_id )
    console.log('jsonData', jsonData)


    if(!existCliente){
      _rut = '';
      if (jsonData && jsonData.cliente_rut) {
        _p3 = `'${jsonData.cliente_rut}','${jsonData.cliente_nombre}',${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo === SEXO.no_aplica ? "3" : "0"},'${jsonData.cliente_fecha_nacimiento}','${jsonData.cliente_direccion}' ,${jsonData.cliente_comuna_id || 150}, '${jsonData.cliente_telefono}','${jsonData.cliente_correo}', ${jsonData.establecimiento_id}`;
      }
    }
    // console.log(data)
    
    
    
    
    
    // const fields = [`motivo=${motivo}`, `area=${_destino}`, `estado=${_estado}`, `estado_validacion=${estado_validacion}`, `estado_impresion=${estado_impresion}`, `proyecto='${jsonData[EnumGrid.proyecto_codigo]}'`, `establecimiento=${jsonData[EnumGrid.establecimiento_id]}`, ...(jsonData[EnumGrid.cliente_rut] !== undefined ? [`cliente='${jsonData[EnumGrid.cliente_rut]}'`] : []), `fecha_atencion='${jsonData[EnumGrid.fecha_atencion]}'`, `fecha_entrega_taller='${jsonData[EnumGrid.fecha_entrega_taller]}'`, `fecha_despacho='${jsonData[EnumGrid.fecha_despacho]}'`, `fecha_entrega_cliente='${jsonData[EnumGrid.fecha_entrega_cliente]}'`, `punto_venta=${jsonData[EnumGrid.punto_venta_id]}`, `numero_receta=${jsonData[EnumGrid.numero_receta]}`, `fecha_receta='${jsonData[EnumGrid.fecha_entrega_cliente]}'`, `tipo_anteojo=${jsonData[EnumGrid.tipo_anteojo_id]}`, `a1_od_esf=${jsonData[EnumGrid.a1_od_esf]}`, `a1_od_cil=${jsonData[EnumGrid.a1_od_cil]}`, `a1_od_eje=${jsonData[EnumGrid.a1_od_eje]}`, `a1_od_ad=${jsonData[EnumGrid.a1_od_ad]}`, `a1_oi_esf=${jsonData[EnumGrid.a1_oi_esf]}`, `a1_oi_cil=${jsonData[EnumGrid.a1_oi_cil]}`, `a1_oi_eje=${jsonData[EnumGrid.a1_oi_eje]}`, `a1_oi_ad=${jsonData[EnumGrid.a1_oi_ad]}`, `a1_dp=${jsonData[EnumGrid.a1_dp]}`, `a1_alt=${jsonData[EnumGrid.a1_alt]}`, `a1_grupo=${a1_grupo}`, `a2_od_esf=${jsonData[EnumGrid.a2_od_esf]}`, `a2_od_cil=${jsonData[EnumGrid.a2_od_cil]}`, `a2_od_eje=${jsonData[EnumGrid.a2_od_eje]}`, `a2_oi_esf=${jsonData[EnumGrid.a2_oi_esf]}`, `a2_oi_cil=${jsonData[EnumGrid.a2_oi_cil]}`, `a2_oi_eje=${jsonData[EnumGrid.a2_oi_eje]}`, `a2_dp=${jsonData[EnumGrid.a2_dp]}`, `a2_grupo=${a2_grupo}`, `anteojo1_opcion_vta=${jsonData[EnumGrid.a1_opcion_vta_id]}`, `anteojo1_armazon=${jsonData[EnumGrid.a1_armazon_id]}`, `anteojo2_opcion_vta=${jsonData[EnumGrid.a2_opcion_vta_id]}`, `anteojo2_armazon=${jsonData[EnumGrid.a2_armazon_id]}`, `anteojo3_opcion_vta=${jsonData[EnumGrid.a3_opcion_vta_id]}`, `anteojo3_armazon=${jsonData[EnumGrid.a3_armazon_id]}`, `cristales1_opcion_vta=${jsonData[EnumGrid.cristal1_opcion_vta_id]}`, `cristales1_diseno=${jsonData[EnumGrid.cristal1_diseno_id]}`, `cristales1_indice=${jsonData[EnumGrid.cristal1_indice_id]}`, `cristales1_material=${jsonData[EnumGrid.cristal1_material_id]}`, `cristales1_tratamiento=${jsonData[EnumGrid.cristal1_tratamiento_id]}`, `cristales1_color=${jsonData[EnumGrid.cristal1_color_id]}`, `cristales1_od=${jsonData[EnumGrid.cristal1_od]}`, `cristales1_oi=${jsonData[EnumGrid.cristal1_oi]}`, `cristales1_tratamiento_adicional=${jsonData[EnumGrid.cristal1_tratamiento_adicional_id]}`, `cristales2_opcion_vta=${jsonData[EnumGrid.cristal2_od_opcion_venta_id]}`, `cristales2_diseno=${jsonData[EnumGrid.cristal2_diseno_id]}`, `cristales2_indice=${jsonData[EnumGrid.cristal2_indice_id]}`, `cristales2_material=${jsonData[EnumGrid.cristal2_material_id]}`, `cristales2_tratamiento=${jsonData[EnumGrid.cristal2_tratamiento_id]}`, `cristales2_color=${jsonData[EnumGrid.cristal2_color_id]}`, `cristales2_od=${jsonData[EnumGrid.cristal2_od]}`, `cristales2_oi=${jsonData[EnumGrid.cristal2_oi]}`, `cristales2_tratamiento_adicional=${jsonData[EnumGrid.cristal2_tratamiento_adicional_id]}`, `motivo_garantia=${jsonData[EnumGrid.motivo_garantia_id]}`, `folio_asociado=${jsonData[EnumGrid.folio_asociado]}`, `resolucion_garantia=${jsonData[EnumGrid.resolucion_garantia_id]}`, `worktracking=${jsonData[EnumGrid.worktracking]}`, `nota_venta=${jsonData[EnumGrid.nota_venta]}`, `numero_factura=${jsonData[EnumGrid.numero_factura]}`, `folio_interno_mandante=${jsonData[EnumGrid.folio_interno_mandante]}`, `observaciones='${jsonData[EnumGrid.observaciones] || ""}'`];
    const fields = [
      `motivo=${motivo}`,
      `area=${_destino}`,
      `estado=${_estado}`,
      `estado_validacion=${estado_validacion}`,
      `estado_impresion=${estado_impresion}`,
      ...(jsonData.proyecto_codigo !== undefined ? [`proyecto='${jsonData.proyecto_codigo}'`] : []),
      ...(jsonData.establecimiento_id !== undefined ? [`establecimiento=${jsonData.establecimiento_id}`] : []),
      ...(jsonData.cliente_rut !== undefined ? [`cliente='${jsonData.cliente_rut}'`] : []),
      ...(jsonData.fecha_atencion !== undefined ? [`fecha_atencion='${jsonData.fecha_atencion}'`] : []),
      ...(jsonData.fecha_entrega_taller !== undefined ? [`fecha_entrega_taller='${jsonData.fecha_entrega_taller}'`] : []),
      ...(jsonData.fecha_despacho !== undefined ? [`fecha_despacho='${jsonData.fecha_despacho}'`] : []),
      ...(jsonData.fecha_entrega_cliente !== undefined ? [`fecha_entrega_cliente='${jsonData.fecha_entrega_cliente}'`] : []),
      ...(jsonData.punto_venta_id !== undefined ? [`punto_venta=${jsonData.punto_venta_id}`] : []),
      ...(jsonData.numero_receta !== undefined ? [`numero_receta=${jsonData.numero_receta}`] : []),
      ...(jsonData.fecha_receta !== undefined ? [`fecha_receta='${jsonData.fecha_receta}'`] : []),
      ...(jsonData.tipo_anteojo_id !== undefined ? [`tipo_anteojo=${jsonData.tipo_anteojo_id}`] : []),

      ...(jsonData.a1_od_esf !== undefined ? [`a1_od_esf=${jsonData.a1_od_esf}`] : []),
      ...(jsonData.a1_od_cil !== undefined ? [`a1_od_cil=${jsonData.a1_od_cil}`] : []),
      ...(jsonData.a1_od_eje !== undefined ? [`a1_od_eje=${jsonData.a1_od_eje}`] : []),
      ...(jsonData.a1_od_ad !== undefined ? [`a1_od_ad=${jsonData.a1_od_ad}`] : []),
      ...(jsonData.a1_oi_esf !== undefined ? [`a1_oi_esf=${jsonData.a1_oi_esf}`] : []),
      ...(jsonData.a1_oi_cil !== undefined ? [`a1_oi_cil=${jsonData.a1_oi_cil}`] : []),
      ...(jsonData.a1_oi_eje !== undefined ? [`a1_oi_eje=${jsonData.a1_oi_eje}`] : []),
      ...(jsonData.a1_oi_ad !== undefined ? [`a1_oi_ad=${jsonData.a1_oi_ad}`] : []),
      ...(jsonData.a1_dp !== undefined ? [`a1_dp=${jsonData.a1_dp}`] : []),
      ...(jsonData.a1_alt !== undefined ? [`a1_alt=${jsonData.a1_alt}`] : []),
      `a1_grupo=${a1_grupo}`,
      
      
      ...(jsonData.a2_od_esf !== undefined ? [`a2_od_esf=${jsonData.a2_od_esf}`] : []),
      ...(jsonData.a2_od_cil !== undefined ? [`a2_od_cil=${jsonData.a2_od_cil}`] : []),
      ...(jsonData.a2_od_eje !== undefined ? [`a2_od_eje=${jsonData.a2_od_eje}`] : []),
      ...(jsonData.a2_oi_esf !== undefined ? [`a2_oi_esf=${jsonData.a2_oi_esf}`] : []),
      ...(jsonData.a2_oi_cil !== undefined ? [`a2_oi_cil=${jsonData.a2_oi_cil}`] : []),
      ...(jsonData.a2_oi_eje !== undefined ? [`a2_oi_eje=${jsonData.a2_oi_eje}`] : []),
      ...(jsonData.a2_dp !== undefined ? [`a2_dp=${jsonData.a2_dp}`] : []),
      `a2_grupo=${a2_grupo}`,
      
      
      ...(jsonData.a1_opcion_vta_id !== undefined ? [`anteojo1_opcion_vta=${jsonData.a1_opcion_vta_id}`] : []),
      ...(jsonData.a1_armazon_id !== undefined ? [`anteojo1_armazon=${jsonData.a1_armazon_id}`] : []),
      ...(jsonData.a2_opcion_vta_id !== undefined ? [`anteojo2_opcion_vta=${jsonData.a2_opcion_vta_id}`] : []),
      ...(jsonData.a2_armazon_id !== undefined ? [`anteojo2_armazon=${jsonData.a2_armazon_id}`] : []),
      ...(jsonData.a3_opcion_vta_id !== undefined ? [`anteojo3_opcion_vta=${jsonData.a3_opcion_vta_id}`] : []),
      ...(jsonData.a3_armazon_id !== undefined ? [`anteojo3_armazon=${jsonData.a3_armazon_id}`] : []),
      
      
      ...(jsonData.cristal1_opcion_vta_id !== undefined ? [`cristales1_opcion_vta=${jsonData.cristal1_opcion_vta_id}`] : []),
      ...(jsonData.cristal1_diseno_id !== undefined ? [`cristales1_diseno=${jsonData.cristal1_diseno_id}`] : []),
      ...(jsonData.cristal1_indice_id !== undefined ? [`cristales1_indice=${jsonData.cristal1_indice_id}`] : []),
      ...(jsonData.cristal1_material_id !== undefined ? [`cristales1_material=${jsonData.cristal1_material_id}`] : []),
      ...(jsonData.cristal1_tratamiento_id !== undefined ? [`cristales1_tratamiento=${jsonData.cristal1_tratamiento_id}`] : []),
      ...(jsonData.cristal1_color_id !== undefined ? [`cristales1_color=${jsonData.cristal1_color_id}`] : []),
      ...(jsonData.cristal1_od !== undefined ? [`cristales1_od=${jsonData.cristal1_od}`] : []),
      ...(jsonData.cristal1_oi !== undefined ? [`cristales1_oi=${jsonData.cristal1_oi}`] : []),
      ...(jsonData.cristal1_tratamiento_adicional_id !== undefined ? [`cristales1_tratamiento_adicional=${jsonData.cristal1_tratamiento_adicional_id}`] : []),
      
      
      
      
      ...(jsonData.cristal2_opcion_vta_id !== undefined ? [`cristales2_opcion_vta=${jsonData.cristal2_opcion_vta_id}`] : []),
      ...(jsonData.cristal2_diseno_id !== undefined ? [`cristales2_diseno=${jsonData.cristal2_diseno_id}`] : []),
      ...(jsonData.cristal2_indice_id !== undefined ? [`cristales2_indice=${jsonData.cristal2_indice_id}`] : []),
      ...(jsonData.cristal2_material_id !== undefined ? [`cristales2_material=${jsonData.cristal2_material_id}`] : []),
      ...(jsonData.cristal2_tratamiento_id !== undefined ? [`cristales2_tratamiento=${jsonData.cristal2_tratamiento_id}`] : []),
      ...(jsonData.cristal2_color_id !== undefined ? [`cristales2_color=${jsonData.cristal2_color_id}`] : []),
      ...(jsonData.cristal2_od !== undefined ? [`cristales2_od=${jsonData.cristal2_od}`] : []),
      ...(jsonData.cristal2_oi !== undefined ? [`cristales2_oi=${jsonData.cristal2_oi}`] : []),
      ...(jsonData.cristal2_tratamiento_adicional_id !== undefined ? [`cristales2_tratamiento_adicional=${jsonData.cristal2_tratamiento_adicional_id}`] : []),
      
      
      
      ...(jsonData.motivo_garantia_id !== undefined ? [`motivo_garantia=${jsonData.motivo_garantia_id}`] : []),
      ...(jsonData.folio_asociado !== undefined ? [`folio_asociado=${jsonData.folio_asociado}`] : []),
      ...(jsonData.resolucion_garantia_id !== undefined ? [`resolucion_garantia=${jsonData.resolucion_garantia_id || 0}`] : []),
      ...(jsonData.worktracking !== undefined ? [`worktracking=${jsonData.worktracking}`] : []),
      ...(jsonData.nota_venta !== undefined ? [`nota_venta=${jsonData.nota_venta}`] : []),
      ...(jsonData.numero_factura !== undefined ? [`numero_factura=${jsonData.numero_factura}`] : []),
      ...(jsonData.folio_interno_mandante !== undefined ? [`folio_interno_mandante=${jsonData.folio_interno_mandante}`] : []),
      ...(jsonData.observaciones !== undefined ? [`observaciones='${jsonData.observaciones}'`] : []),
      // Continúa agregando los campos de la misma manera...
    ];



    console.log('fields',fields)
    console.log('origen', _origen)
    console.log('destino', _destino)



    const cristales = [
      { codigo: `${jsonData[EnumGrid.cristal1_od]}` },
      { codigo: `${jsonData[EnumGrid.cristal1_oi]}` },
      { codigo: `${jsonData[EnumGrid.cristal2_od]}` },
      { codigo: `${jsonData[EnumGrid.cristal2_oi]}` }
      // { codigo: `${jsonData.cristal1_od}` },
      // { codigo: `${jsonData.cristal1_oi}` },
      // { codigo: `${jsonData.cristal2_od}` },
      // { codigo: `${jsonData.cristal2_oi}` }
    ]
      .map(item => {
        const numero = parseFloat(item.codigo);
        if (!isNaN(numero) && numero !== null) {
          return { 'codigo': numero };
        }
        return null; // Otra opción en caso de no ser un número válido
      })
      .filter(item => item !== null);



      const armazones = [
        { codigo: jsonData[EnumGrid.a1_armazon_id] },
        { codigo: jsonData[EnumGrid.a2_armazon_id] },
      ]
        .map(item => {
          const numero = parseFloat(item.codigo);
          if (!isNaN(numero) && numero !== null ) {
            return { codigo: numero };
          }
          return null; // Otra opción en caso de no ser un número válido
        })
        .filter(item => item !== null);
      
      // `armazones` contendrá objetos con la propiedad "codigo" y valores numéricos válidos
      

    // console.log('cristales', cristales)





    // console.log('formValues',gestions)
    // console.log(_origen)
  
    // const filteredFields = fields.filter(
    //   (field) => field !== null && field !== "" && field !== undefined
    // );
  
    // if (filteredFields.length === 0) {
    //   return null;
    // }
    // const _p1 = filteredFields.join(",");
    // console.log("p1", _p1);

    const filteredFields = fields.map((field) => (field === 'undefined') ? '' : field);
    const _p1 = filteredFields.join(',');

    const query = {
      query: "04",
      _p1,
      _p3: _p3 || "",
      _proyecto: `${jsonData[EnumGrid.proyecto_codigo]}`,
      _folio: `${data && data[EnumGrid.folio]}` ,
      // _origen : _origen.toString(),
      _origen : _origen.toString(),
      _rut,
      _destino: _destino.toString(),
      _estado:_estado.toString(), 
      _usuario:User["id"].toString(),
      _situacion:"0",
      _obs: "ot editada desde front",
      _cristalesJSON: JSON.stringify(cristales),
      _armazonesJSON: JSON.stringify(armazones),
      _punto_venta: `${jsonData[EnumGrid.punto_venta_id]}`
    };


    console.log("query", query);

    try {
      const response = await axios.post('https://mtoopticos.cl/api/ot/editar/', query)
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }


    // const response = await editEntity(query)

  }


  const insertOT = async(jsonData:any) => {

    let estado = 2;
    let estado_impresion = 0;
    let estado_validacion = 1;
    let motivo = 1;
    let a1_grupo = 1;
    let a2_grupo = 1;
    let origen = 50;
    let destino = 60;

    let _p3 = [`nombre='${jsonData.cliente_nombre}'`, `tipo=${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? 1 : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? 2 : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? 3 : 0}`, `sexo=${jsonData.cliente_sexo === SEXO.masculino ? 1 : jsonData.cliente_sexo === SEXO.femenino ? 2 : jsonData.cliente_sexo === SEXO.no_aplica ? 3 : 0}`, `fecha_nacimiento='${jsonData.cliente_fecha_nacimiento}'`, `direccion='${jsonData.cliente_direccion}'`, `comuna=${jsonData.cliente_comuna || 150}`, `telefono='${jsonData.cliente_telefono}'`, `correo='${jsonData.cliente_correo}'`, `establecimiento=${jsonData.establecimiento_id}`].join(', ');

    let _rut = jsonData.cliente_rut;
    
    if(!existCliente){
       _rut = '';
       _p3 =`'${jsonData.cliente_rut}','${jsonData.cliente_nombre}',${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo === SEXO.no_aplica ? "3" : "0"},'${jsonData.cliente_fecha_nacimiento}','${jsonData.cliente_direccion}' ,${jsonData.cliente_comuna_id || 150}, '${jsonData.cliente_telefono}','${jsonData.cliente_correo}', ${jsonData.establecimiento_id}`;
    }

    // console.log('data', jsonData)
    const _p1 = `${motivo},${destino},${estado},${estado_impresion},${estado_validacion},'${jsonData.proyecto}',${jsonData.establecimiento_id},'${jsonData.cliente_rut}','${jsonData.fecha_atencion}','${jsonData.fecha_entrega_taller}','${jsonData.fecha_despacho}','${jsonData.fecha_entrega_cliente}',${jsonData.punto_venta_id},${jsonData.numero_receta},'${jsonData.fecha_receta}',${jsonData.tipo_anteojo_id},${jsonData.a1_od_esf},${jsonData.a1_od_cil},${jsonData.a1_od_eje},${jsonData.a1_od_ad },${jsonData.a1_oi_esf},${jsonData.a1_oi_cil},${jsonData.a1_oi_eje},${jsonData.a1_oi_ad},${jsonData.a1_dp},${jsonData.a1_alt},${a1_grupo},${jsonData.a2_od_esf},${jsonData.a2_od_cil},${jsonData.a2_od_eje},${jsonData.a2_oi_esf},${jsonData.a2_oi_cil},${jsonData.a2_oi_eje},${jsonData.a2_dp},${a2_grupo},${jsonData.a1_opcion_vta_id},${jsonData.a1_armazon_id},${jsonData.a2_opcion_vta_id},${jsonData.a2_armazon_id},${jsonData.a3_opcion_vta_id || 0},${jsonData.a3_armazon_id || 0},${jsonData.cristal1_opcion_vta_id},${jsonData.cristal1_diseno_id},${jsonData.cristal1_indice_id},${jsonData.cristal1_material_id},${jsonData.cristal1_tratamiento_id},${jsonData.cristal1_color_id},${jsonData.cristal1_od},${jsonData.cristal1_oi},${jsonData.cristal1_tratamiento_adicional_id},${jsonData.cristal2_od_opcion_venta_id},${jsonData.cristal2_diseno_id},${jsonData.cristal2_indice_id},${jsonData.cristal2_material_id},${jsonData.cristal2_tratamiento_id},${jsonData.cristal2_color_id},${jsonData.cristal2_od},${jsonData.cristal2_oi},${jsonData.cristal2_tratamiento_adicional_id},${jsonData.motivo_garantia_id || 0},${jsonData.folio_asociado || 0},${jsonData.resolucion_garantia_id || 0},${jsonData.worktracking || 0},${jsonData.nota_venta || 0},${jsonData.numero_factura || 0},${jsonData.folio_interno_mandante || 0},'${jsonData.observaciones || ""}'`;


    // const _p3 = `'${jsonData.cliente_rut}','${jsonData.cliente_nombre}',${jsonData.cliente_tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.cliente_tipo === TIPO_CLIENTE.particular ? "2" : jsonData.cliente_tipo === TIPO_CLIENTE.optica ? "3" : "0"}, ${jsonData.cliente_sexo === SEXO.masculino ? "1" : jsonData.cliente_sexo === SEXO.femenino ? "2" : jsonData.cliente_sexo === SEXO.no_aplica ? "3" : "0"},'${jsonData.cliente_fecha_nacimiento}','${jsonData.cliente_direccion}' ,${jsonData.cliente_comuna_id || 150}, '${jsonData.cliente_telefono}','${jsonData.cliente_correo}', ${jsonData.establecimiento_id}`;

    const cristales  = [{'codigo': jsonData.cristal1_od},{'codigo': jsonData.cristal1_oi},{'codigo': jsonData.cristal2_od},{'codigo':jsonData.cristal2_oi}];
    const armazones  = [{'codigo': jsonData.a1_armazon_id},{'codigo': jsonData.a2_armazon_id},]; 

  
    
    const query = {
      query: "03",
      _p1,
      _p3,
      _rut,
      _origen:  origen.toString(),
      _proyecto: `${jsonData.proyecto}`,
      _destino: destino.toString(),
      _estado: estado.toString(),
      _usuario: "98",
      _situacion:"0",
      _obs:"",
      _cristalesJSON: JSON.stringify(cristales),
      _armazonesJSON: JSON.stringify(armazones),
      _punto_venta:`${jsonData.punto_venta_id}`,
       
    };
    console.log(query)
    
    try {
      const response = await axios.post("https://mtoopticos.cl/api/ot/crear/", query)
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }



    // console.log('query',query)
  
    // return query;
  }
  
  //Estados locales
  const { control, handleSubmit, setValue, getValues } = useForm<FormData>();
  const [formValues, setFormValues] = useState<FormData | any>({});
  const [showGarantia, setShowGarantia] = useState(false);
  const [showDerivacion, setShowDerivacion] = useState(false);
  const [existCliente, setExistCliente] = useState(false);
  const [submitAction, setSubmitAction] = useState('');
  const [strCodigoProyecto, setStrCodigoProyecto] = useState(data && data[EnumGrid.proyecto_codigo] || '')
  const [isMotivo, setIsMotivo] = useState(false);
  const [toggle, setToggle] = useState('');

  
  // console.log(strCodigoProyecto)

  //formularios
  const onCloseGarantia = () =>setShowGarantia(false)
  const onCloseDerivacion = () =>setShowDerivacion(false)
  
    
  
  // console.log(sumatoriaNivel1)
  // console.log(scoreValidation)
  



  //validaciones
  const sumatoriaNivel1 = validacionNivel1.reduce((index, objeto) => index + objeto.valor, 0);
  const actualizarEstado = (campo:string, valor:number) => {
    const index = validacionNivel1.findIndex(objeto => objeto.campo === campo);
    if (index !== -1) {
      validacionNivel1[index].valor = valor;
    }
  }



  //submit boton pausar
  const onSubmit: SubmitHandler<FormData> = async(jsonData, type?:any) => {
    const actualDate = moment().format('DD-MM-YYYY HH:mm:ss');
    const fechaActual = moment().format('YYYY-MM-DD')
    
    
    // console.log('Datos de todos los formularios:', jsonData);
    // console.log(jsonData["fecha_atencion"])
    // console.log(fechaActual)
    //Validaciones
      //OPTICA
    if(jsonData["fecha_atencion"] > fechaActual) {
      toast.error("Fecha de atencion mayor a la fecha actual")
      return null;
    }
    
    // console.log(submitAction)

    if (submitAction === 'pausar') {
      switchCasePausar(jsonData);
    } else if (submitAction === 'procesar') {
      switchCaseProcesar(jsonData);
    } else if (submitAction === 'derivar'){
      switchCaseDerivar(jsonData)
    }

  
  };


  //Persistencia de datos
  const handleFormChange = (data: any, name: string) => {
    //

    // console.log(data)
    // console.log(name)
      if(Object.keys(data)[0] === 'proyecto'){
        console.log(Object.values(data)[0])
        setStrCodigoProyecto(Object.values(data)[0])
     }
     
    //  if (Object.keys(data)[0] === 'cliente_rut') {
    //     setFormValues((prevFormValues: any) => ({
    //       ...prevFormValues,
    //       ['cliente']: {
    //         ...prevFormValues['cliente'],
    //         ["cliente_nombre"]:"prueba nombre"
    //       }
    //     }));
        // console.log(formValues)
      // }

    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: {
        ...prevFormValues[name],
        ...data
      }
    }));
    
    // console.log('formValues', formValues)
    //campo validado correctamente
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




  // console.log( data && data[EnumGrid.motivo])
  // console.log(toggle)
  // console.log(showDerivacion)
  // console.log(showGarantia)
  // console.log(isMOT)

  const handlePausarClick = () => {
    setSubmitAction('pausar');
    handleSubmit(onSubmit)();
  };

// Handler para el botón 'Procesar'
const handleProcesarClick = () => {
  setSubmitAction('procesar');
  handleSubmit(onSubmit)();
};

const handleDerivarClick = () => {
  setSubmitAction('derivar')
  handleSubmit(onSubmit)()
}

  console.log('existCliente',existCliente)


  
  return (

    <div className='useFormContainer top-[1%] w-[94vw] relative h-[95vh] z-20'>
      <Tabs>
        <TabList className='flex items-center'>
          <Tab className="custom-tab">Óptica</Tab>
          <Tab className="custom-tab">Cliente</Tab>
          <Tab className="custom-tab">Receta</Tab>
          <Tab className="custom-tab">Armazones</Tab>
          <Tab className="custom-tab">Cristales</Tab>
          <Tab className="custom-tab">Bitácora</Tab>
        </TabList>


        <div className='top-0 absolute right-3 text-2xl cursor-pointert' onClick={closeModal}>X</div>
          <TabPanel onSelect={loadFormData}>
            <FOTOptica setIsMotivo={setIsMotivo} isEditting={isEditting} data={data && data} formValues={formValues["optica"]} control={control} setToggle={setToggle} onDataChange={(data:any) => handleFormChange(data , 'optica')} />
          </TabPanel>
          
        <TabPanel>
          <FOTClientes data={data && data} formValues={formValues["cliente"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cliente')} strCodigoProyecto={strCodigoProyecto} setExistCliente={setExistCliente}    />
        </TabPanel>

        <TabPanel>
          <FOTReceta data={data && data} formValues={formValues["receta"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'receta')}  />
        </TabPanel>

        <TabPanel> 
          <FOTArmazones data={data && data} formValues={formValues["armazones"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'armazones')}  />
        </TabPanel>
        <TabPanel>
          
          <FOTCristales data={data && data}  formValues={formValues["armazones"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cristales')}  /> 
        </TabPanel>
        <TabPanel>
          <FOTBitacora/>
        </TabPanel>

        {showGarantia && (
          <div>
            <FOTGarantia data={data && data} onClose={onCloseGarantia}/>
          </div>
        )}

        {showDerivacion && (
          <div>
            <FOTDerivacion data={data && data} onClose={onCloseDerivacion} switchCaseDerivar={switchCaseDerivar}/>
          </div>
        )}

        <div className='flex items-center mx-auto  justify-around w-1/2 '>
          {/* OTHISTORICA */}
          {/* {isEditting && isMOT && data && data[EnumGrid.estado] === "Garantia" && (
              <button className='bg-green-400 mx-4 text-white w-1/4' onClick={() => setShowGarantia(prev => !prev)}>
                Garantia
              </button>
          )} */}
          {isEditting && isMOT && isMotivo &&  (
              <button className='bg-green-400 mx-4 text-white w-1/4' onClick={() => setShowGarantia(prev => !prev)}>
                Garantia
              </button>
          )}




          {/* OT DIARIA */}
          {
            sumatoriaNivel1 === validacionNivel1.length && (
              <button className='bg-green-400 mx-4  text-white w-1/4 ' onClick={handleSubmit(onSubmit)}>Procesar</button>
            )
          }
          {
           (
              <button className='bg-green-400 mx-4  text-white w-1/4 ' onClick={handleProcesarClick}>Procesar</button>
            )
          }



        <button className='bg-yellow-400 mx-4   w-1/4 'onClick={handlePausarClick}>Pausar</button>

          {toggle === "Aceptada" && isEditting && (
            <>
              <button className='bg-red-400 mx-4 text-white  w-1/4 ' onClick={()=>setShowDerivacion((prev)=>!prev)}>Derivar</button>
            </>
          )}
          {toggle === "Rechazada" && isMotivo &&(
            <>
  
              <button className='bg-black mx-4 text-white  w-1/4 '>Anular</button>
            </>
          )}
             <button className='bg-red-400 mx-4 text-white  w-1/4 ' onClick={handleDerivarClick}>Derivar</button>
        </div>
      </Tabs>
    </div>
  );
};

export default FOT;





// query
// : 
// "03"
// _armazonesJSON
// : 
// "[{\"codigo\":\"1\"},{\"codigo\":\"2\"}]"
// _cristalesJSON
// : 
// "[{\"codigo\":\"1001\"},{\"codigo\":\"1002\"},{\"codigo\":\"1003\"},{\"codigo\":\"1004\"}]"
// _destino
// : 
// "60"
// _estado
// : 
// "2"
// _obs
// : 
// ""
// _origen
// : 
// "50"
// _p1
// : 
// "1,60,2,0,1,'PR001A',1,'1-1','2023-10-20','2023-10-24','2023-10-25','2023-10-21',11,132132,'2023-10-28',2,1,2,4,5,6,7,8,9,10,11,1,12,13,14,15,16,16,18,1,1,1,1,2,0,0,1,1,2,2,3,2,1001,1002,3,1,1,2,2,2,1,1003,1004,1,0,0,0,123,123,123,123,'observ'"
// _p3
// : 
// "'1-1','nombre test',1, 1,'2023-10-28','undefined' ,150, '21312','correo@oreoreoo.cl', 1"
// _proyecto
// : 
// "PR001A"
// _punto_venta
// : 
// "11"
// _rut
// : 
// ""
// _situacion
// : 
// "0"
// _usuario
// : 
// "98"