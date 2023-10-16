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
  // console.log(data)
  
 
  const switchCasePausar = () => {
    let _origen = 0;
    let _destino = 0;
    let _estado = 0;
    let OTAreaActual = OTAreas["areaActual"]

    _origen = OTAreaActual;
    _destino = OTAreaActual;
     _estado = 3;

    const area = data && parseInt(data[EnumGrid.estado_id])

    switch (area) {
      case 1:
        console.log('Ejecutando acción para el número 1');
        updateOT(data, _destino, _origen, _estado);
        break;
      case 2:
        console.log('Ejecutando acción para el número 2');
        updateOT(data, _destino, _origen, _estado);
        break;
      case 3:
        console.log('Ejecutando acción para el número 3');
        updateOT(data, _destino, _origen, _estado);
        break;
      case 4:
        console.log('Ejecutando acción para el estado número 4');
        updateOT(data, _destino, _origen, _estado)
        break;
      default:
          console.log('Número no reconocido');
        break;
    }
  }


  const switchCaseProcesar = () => {
   console.log('hola')
   const formData = getValues

    let _origen = 0;
    let _destino = 0;
    let _estado = 0;
    let OTAreaActual = OTAreas["areaActual"]

    console.log(formData)
    const area = data && parseInt(data[EnumGrid.estado_id])

    switch (area) {
      case 1:
        console.log('Ejecutando acción para el número 1');
        // origen = area actual
        // destino = area actual
        // ot estado = 3 (pendiente)
        // bitacora(origen,origen, "ingresada")
        // bitacora(origen, destino, estado) 
        // insert ot = query 03
        _origen = OTAreaActual;
        _destino = OTAreaActual;
        _estado = 3;
        updateOT(data, _destino, _origen, _estado);

        
        break;
      case 2:
        console.log('Ejecutando acción para el número 2');
        // _oirgen = area actual
        //_destino = area actual 
        // ot.estado = 3(pendiente)
        // bitacora(origen, destino, estado) 
        // Update ot = query04
        _origen = OTAreaActual;
        _destino = OTAreaActual;
        _estado = 3;
        updateOT(data, _destino, _origen, _estado);


        
        break;
      case 3:
        console.log('Ejecutando acción para el número 3');
        // ot.origen = area actual
        // ot.destino = area
        // ot.estado = 3 (pendiente)
        // update ot = query04
        _origen = OTAreaActual;
        _destino = OTAreaActual;
        _estado = 3;

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


  const switchCaseDerivar = () => {
   
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
        console.log('Ejecutando acción para el número 3');
        // ot.origen = area actual
        // ot.destino = area
        // ot.estado = 3 (pendiente)
        // update ot = query04
        _origen = OTAreaActual;
        _destino = OTAreaActual;
        _estado = 3;

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
    const fields = [
      `fecha_hora                     ='2023-10-10 12:59:00'`,
      `estado_validacion              =${jsonData[EnumGrid.estado_validacion_id]}`,
      `proyecto                       ='${jsonData[EnumGrid.proyecto_codigo]}'`,
      `establecimiento                = ${jsonData[EnumGrid.establecimiento_id]}`,
      `cliente                        = '${jsonData[EnumGrid.cliente_rut]}'`,
      `fecha_atencion                 = '${jsonData[EnumGrid.fecha_atencion]}'`,
      `fecha_entrega_taller           = '${jsonData[EnumGrid.fecha_entrega_taller]}'`,
      `fecha_despacho                 = '${jsonData[EnumGrid.fecha_despacho]}'`,
      `fecha_entrega_cliente          = '${jsonData[EnumGrid.fecha_entrega_cliente]}'`,
      `punto_venta                     = ${jsonData[EnumGrid.punto_venta_id]}`,
      `numero_receta                   = ${jsonData[EnumGrid.numero_receta]}`,
      `fecha_receta                    = '${jsonData[EnumGrid.fecha_entrega_cliente]}'`,
      `tipo_anteojo                    = ${jsonData[EnumGrid.tipo_anteojo_id]}`,
      `a1_od_esf                      = ${jsonData[EnumGrid.a1_od_esf]}`,
      `a1_od_cil                      = ${jsonData[EnumGrid.a1_od_cil]}`,
      `a1_od_eje                      = ${jsonData[EnumGrid.a1_od_eje]}`,
      `a1_od_ad                       = ${jsonData[EnumGrid.a1_od_ad]}`,
      `a1_oi_esf                      = ${jsonData[EnumGrid.a1_oi_esf]}`,
      `a1_oi_cil                      = ${jsonData[EnumGrid.a1_oi_cil]}`,
      `a1_oi_eje                      = ${jsonData[EnumGrid.a1_oi_eje]}`,
      `a1_oi_ad                      = ${jsonData[EnumGrid.a1_oi_ad]}`,
      `a1_dp                          = ${jsonData[EnumGrid.a1_dp]}`,
      `a1_alt                        = ${jsonData[EnumGrid.a1_alt]}`,
      `a1_grupo                    = ${jsonData[EnumGrid.a1_grupo]}`,
      `a2_od_esf                       = ${jsonData[EnumGrid.a2_od_esf]}`,
      `a2_od_cil                     = ${jsonData[EnumGrid.a2_od_cil]}`,
      `a2_od_eje                   = ${jsonData[EnumGrid.a2_od_eje]}`,
      `a2_oi_esf                   = ${jsonData[EnumGrid.a2_oi_esf]}`,
      `a2_oi_cil                   = ${jsonData[EnumGrid.a2_oi_cil]}`,
      `a2_oi_eje                    = ${jsonData[EnumGrid.a2_oi_eje]}`,
      `a2_dp                            = ${jsonData[EnumGrid.a2_dp]}`,
      `a2_grupo                       = ${jsonData[EnumGrid.a2_grupo]}`,
      `anteojo1_opcion_vta              = ${jsonData[EnumGrid.a1_armazon_opcion_venta_id]}`,
      `anteojo1_armazon                 = ${jsonData[EnumGrid.a1_armazon_id]}`,
      `anteojo2_opcion_vta              = ${jsonData[EnumGrid.a2_armazon_opcion_venta_id]}`,
      `anteojo2_armazon                = ${jsonData[EnumGrid.a2_armazon_id]}`,
      `anteojo3_armazon                  = ${jsonData[EnumGrid.a2_armazon_id]}`,
      `cristales1_od_opcion_vta           = ${jsonData[EnumGrid.cristal1_oi_opcion_vta_id]}`,
      `cristales1_od                      = ${jsonData[EnumGrid.cristal1_od_codigo]}`,
      `cristales1_oi_opcion_vta           = ${jsonData[EnumGrid.cristal1_oi_opcion_vta_id]}`,
      `cristales1_oi                         = ${jsonData[EnumGrid.cristal1_oi_codigo]}`,
      `cristales1_tratamiento_adicional           = ${jsonData[EnumGrid.cristal1_trat_adicional_id]}`,
      `cristales2_od_opcion_vta           = ${jsonData[EnumGrid.cristal2_od_opcion_venta_id]}`,
      `cristales2_od                        = ${jsonData[EnumGrid.cristal2_od_codigo]}`,
      `cristales2_oi_opcion_vta           = ${jsonData[EnumGrid.cristal2_oi_opcion_venta_id]}`,
      `cristales2_oi                                  = ${jsonData[EnumGrid.cristal2_oi_codigo]}`,
      `cristales2_tratamiento_adicional                      = ${jsonData[EnumGrid.cristal2_tratamiento_adicional_id]}`,
      `motivo_garantia                      = ${jsonData[EnumGrid.motivo_garantia_id]}`,
      `folio_asociado                      = ${jsonData[EnumGrid.folio_asociado]}`,
      `resolucion_garantia                      = ${jsonData[EnumGrid.resolucion_garantia_id]}`,
      `worktracking                           = ${jsonData[EnumGrid.worktracking]}`,
      `nota_venta                           = ${jsonData[EnumGrid.nota_venta]}`,
      `numero_factura                         = ${jsonData[EnumGrid.numero_factura]}`,
      `folio_interno_mandante                          = ${jsonData[EnumGrid.folio_mandante]}`,
      `estado_impresion                          = ${jsonData[EnumGrid.estado_impresion_id]}`,
      `motivo                          = ${jsonData[EnumGrid.motivo_garantia_id]}`,
      `area                          = ${jsonData[EnumGrid.area_id]}`,
      `estado                          = ${jsonData[EnumGrid.estado_id]}`,
      `motivo_garantia                          = ${jsonData[EnumGrid.motivo_garantia_id]}`,
      `observaciones                          = '${jsonData[EnumGrid.observaciones]}'`,

    ];

    // console.log(_destino)
    // console.log(_origen)
  
    const filteredFields = fields.filter(
      (field) => field !== null && field !== ""
    );
  
    if (filteredFields.length === 0) {
      return null;
    }
    const _p1 = filteredFields.join(",");
    console.log("p1", _p1);

    const query = {

      query: "04",
      _p1,
      _folio:data && data[EnumGrid.folio] ,
      _estado,
      _usuario:User["id"],
      _destino,
      _origen
    
    };
    console.log("query", query);


    // const response = await editEntity(query)
    const response = await axios.post('https://mtoopticos.cl/api/ot/editar/', query)

    console.log(response)
  }



  
  //Estados locales
  const { control, handleSubmit, setValue, getValues } = useForm<FormData>();
  const [formValues, setFormValues] = useState<FormData | any>({});
  const [showGarantia, setShowGarantia] = useState(false);
  const [showDerivacion, setShowDerivacion] = useState(false);
  const [submitAction, setSubmitAction] = useState('');
  const [isMotivo, setIsMotivo] = useState(false);
  const [toggle, setToggle] = useState('');

  
  

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
      switchCasePausar();
    } else if (submitAction === 'procesar') {
      switchCaseProcesar();
    }

  
    // //DATA POR AGREGAR
    // let grupo_1 = 2
    // let grupo_2 = 2
    // let motivo_garantia = 0
    // let estado_impresion = 0
    // let estado_validacion = 1
    
    // // ${parseInt(jsonData["area_actual"])}',
    // // ${parseInt(jsonData["estado_actual"])}',

    // const _p1 = ` ${actualDate}, 
                  
    //               ${estado_validacion},  
                  
                  
    //             '${jsonData["proyecto"]}',
    //              ${parseInt(jsonData["establecimiento"])},
    //              '${jsonData["cliente_rut"]}',
    //              '${jsonData["fecha_atencion"]}',
    //              '${jsonData["fecha_entrega_taller"]}',
    //              '${jsonData["fecha_despacho"]}',
    //              '${jsonData["fecha_entrega_cliente"]}',
    //              ${parseInt(jsonData["punto_venta"])},
    //              ${parseInt(jsonData["numero_receta"])},
    //              '${jsonData["fecha_receta"]}',
    //              ${parseInt(jsonData["tipo_anteojo"])},




    //              ${jsonData["anteojo1_ESF_OD"]},
    //              ${parseInt(jsonData["anteojo1_CIL_OD"])},
    //              ${parseInt(jsonData["anteojo1_EJE_OD"])},
    //              ${parseInt(jsonData["anteojo1_AD_OD"])},
    //              ${parseInt(jsonData["anteojo1_ESF_OI"])},
    //              ${parseInt(jsonData["anteojo1_CIL_OI"])},
    //              ${parseInt(jsonData["anteojo1_EJE_OI"])},
    //              ${parseInt(jsonData["anteojo1_AD_OI"])},
    //              ${parseInt(jsonData["anteojo1_DP"])},
    //              ${parseInt(jsonData["anteojo1_ALT"])},       
    //              '${grupo_1}',
    //              ${parseInt(jsonData["anteojo2_ESF_OD"])},
    //              ${parseInt(jsonData["anteojo2_CIL_OD"])},
    //              ${parseInt(jsonData["anteojo2_EJE_OD"])},
    //              ${parseInt(jsonData["anteojo2_ESF_OI"])},
    //              ${parseInt(jsonData["anteojo2_CIL_OI"])},
    //              ${parseInt(jsonData["anteojo2_EJE_OI"])},
    //              ${parseInt(jsonData["anteojo2_DP"])},
    //              ${grupo_2}',
                 
                 
                 
    //              ${parseInt(jsonData["anteojo1_opcion_vta"])},
    //              ${parseInt(jsonData["codigo_armazon_1"])}',
    //              ${parseInt(jsonData["anteojo2_opcion_vta"])}',
    //              ${parseInt(jsonData["codigo_armazon_2"])},
    //              ${parseInt(jsonData["anteojo3_opcion_vta"])},
    //              ${parseInt(jsonData["codigo_armazon_3"])},


                 
    //              ${parseInt(jsonData["cristales1_od_opcion_vta"])},
    //              ${parseInt(jsonData["anteojo1_cristal_OD"])},
    //              ${parseInt(jsonData["cristales1_oi_opcion_vta"])},
    //              ${parseInt(jsonData["anteojo1_cristal_OI"])},
    //              ${parseInt(jsonData["cristales1_tratamiento_adicional"])},
    //              ${parseInt(jsonData["cristales2_od_opcion_vta"])},
    //              ${parseInt(jsonData["anteojo2_cristal_OD"])},
    //              ${parseInt(jsonData["cristales2_oi_opcion_vta"])},
    //              ${parseInt(jsonData["anteojo2_cristal_OI"])},
    //              ${parseInt(jsonData["cristales2_tratamiento_adicional"])},
                 


    //              ${motivo_garantia}',
    //              ${parseInt(jsonData["folio_asociado"])},
    //              ${parseInt(jsonData["resolucion"])},
    //              ${parseInt(jsonData["worktracking"])},
    //              ${parseInt(jsonData["nota_venta"])},
    //              ${parseInt(jsonData["numero_factura"])},
    //              ${parseInt(jsonData["folio_asociado"])},
                 

    //              ${estado_impresion}',
    //              ${jsonData["motivo"] === 'Venta' ? 1:2}, 
    //              ${parseInt(jsonData["area"])}',
    //              ${parseInt(jsonData["estado"])}',
    //              ${motivo_garantia}',
    //              '${jsonData["observaciones"]}'
                 
    // `;

    // console.log(_p1)
    // const query = {
    //   query:"03",
    //   _p1
    // }

    // const result = await createdEntity(query)
    // console.log(result)
  
  };


  //Persistencia de datos
  const handleFormChange = (data: any, name: string) => {
    //

    // console.log(data)
    // console.log(name)
    
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: {
        ...prevFormValues[name],
        ...data
      }
    }));
    
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
          
          <FOTClientes data={data && data} formValues={formValues["cliente"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'cliente')}    />
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

        </div>
      </Tabs>
    </div>
  );
};

export default FOT;



// "_p1": " estado_validacion =1,proyecto='PR001A',establecimiento= 2,cliente= '1-2',fecha_atencion= '2023-10-10',fecha_entrega_taller= '2023-10-15',fecha_despacho='2023-10-20',fecha_entrega_cliente= '2023-10-25',punto_venta= 1,numero_receta = 123,fecha_receta= '2023-10-25',tipo_anteojo= 1,a1_od_esf= 0.25,a1_od_cil= 0.50,a1_od_eje= 1,a1_od_ad= 0.95,a1_oi_esf= 1.25,a1_oi_cil= 1.50,a1_oi_eje = 2,a1_oi_ad= 1.75,a1_dp= 1,a1_alt     = 2,a1_grupo= 1,a2_od_esf= 1.00,a2_od_cil= 1.00,a2_od_eje= 2,a2_oi_esf= 1.00,a2_oi_cil= 1.00,a2_oi_eje              = 2,a2_dp= 2,a2_grupo= 1,anteojo1_opcion_vta= 1,anteojo1_armazon= 3,anteojo2_opcion_vta= 2,anteojo2_armazon=2,anteojo3_armazon= 2,cristales1_od_opcion_vta= 2,cristales1_od= 1001,cristales1_oi_opcion_vta= 2,cristales1_oi= 1003,cristales1_tratamiento_adicional= 2,cristales2_od_opcion_vta= 2,cristales2_od= 1001,cristales2_oi_opcion_vta= 2,cristales2_oi= 1001,cristales2_tratamiento_adicional= 2,motivo_garantia= 1,folio_asociado= 2,resolucion_garantia= 3,worktracking=123,nota_venta= 123,numero_factura = 123,folio_interno_mandante= 123,estado_impresion= 0,motivo= 1,area= 10,estado= 2,motivo_garantia= 1,observaciones= 'observaciones'



// INSERT INTO OTHistorica (
      // fecha_hora, 
      // motivo, 
      // area, 
      // estado,
      // estado_validacion, 
      // proyecto,        
      // establecimiento, 
      // cliente, 
      // fecha_atencion, 
      // fecha_entrega_taller, 
      // fecha_despacho, 
      // fecha_entrega_cliente, 
      
      
      // punto_venta, 
      // numero_receta, 
      // fecha_receta, 
      // tipo_anteojo, 
      // a1_od_esf, 
      // a1_od_cil, 
      // a1_od_eje, 
      // a1_od_ad, 
      // a1_oi_esf, 
      // a1_oi_cil, 
      //a1_oi_eje, 
      //a1_oi_ad, 
      //a1_dp, 
      //a1_alt, a1_grupo, a2_od_esf, a2_od_cil, a2_od_eje, a2_oi_esf, a2_oi_cil, a2_oi_eje, a2_dp, a2_grupo, anteojo1_opcion_vta, anteojo1_armazon, anteojo2_opcion_vta, anteojo2_armazon, anteojo3_opcion_vta, anteojo3_armazon, cristales1_od_opcion_vta, cristales1_od, cristales1_oi_opcion_vta, cristales1_oi, cristales1_tratamiento_adicional, cristales2_od_opcion_vta, cristales2_od, cristales2_oi_opcion_vta, cristales2_oi, cristales2_tratamiento_adicional, motivo_garantia, folio_asociado, resolucion_garantia, worktracking, nota_venta, numero_factura, folio_interno_mandante, observaciones)

      // VALUES(
  // '2023-10-10 12:59:00', 
  //                     1,                                             
  //                     10 , 
  //                     2, 
  //                     1, 
  //                     'PR005',
  //                      2, 
  //                      '12345678', 
  //                      '2023-10-10', 
  //                      '2023-10-15', 
  //                      '2023-10-20', 
  //                      '2023-10-25', 
  //                      11, 
  //                      123,
  //                      1, 
  //                      0.75, 
  //                      0,75, 
  //                      20, 
  //                      0.75, 
  //                      0.75, 
  //                      0.75, 
  //                      3,0.75,
  //                      2,2, 
  //                      1, 
  //                      0.75, 
  //                      0.75,



  //                      2, 
  //                      0.75, 
  //                      0.75,
  //                      2,
  //                      2,
  //                      1,
  //                      2,
  //                      3,
  //                      1,
  //                      2,
  //                      1,
  //                      4,
  //                      2,





  //                      1001,
  //                      2,
  //                      1003,
  //                      2,
  //                      2,
  //                      1001,
  //                      2,
  //                      1001,
  //                      2,
  //                      1,
  //                      2,
  //                      3,
  //                      123
  //                      ,123
  //                      ,123,
  //                      123,
  //                      'observaciones'
  //                      );






  // 12-10-2023 09:13:18, 
  //               'estado validacion',          
  //               'PR005',
  //                1,
  //                'undefined',
  //                '2023-10-14',
  //                '2023-10-16',
  //                '2023-10-19',
  //                '2023-10-14',
  //                11,
  //                12331,
  //                '2023-10-24',
  //                NaN,
  //                1,
  //                2,
  //                3,
  //                4,
  //                5,
  //                6,
  //                7,
  //                8,
  //                9,
  //                10,
  //                'a1_grupo',
  //                11,
  //                12,
  //                13,
  //                14,
  //                15,
  //                16,
  //                17,
  //                a2_grupo',
  //                NaN,
  //                1',
  //                NaN',
  //                2,
  //                NaN,
  //                3,
  //                NaN,
  //                1001,
  //                NaN,
  //                1003,
  //                NaN,
  //                NaN,
  //                1002,
  //                NaN,
  //                1004,
  //                NaN,
  //                'motivo_garantia',
  //                1212,
  //                NaN,
                 

  //                12,
  //                34,
  //                56,
  //                78,



  //                 1, 
  //                '10',
  //                '1',
  //                'observaciones'