import React,{useState} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import moment from 'moment';

import FOTOptica from '../../components/OTForms/FOTOptica';
import FOTClientes from '../../components/OTForms/FOTClientes';
import FOTReceta from '../../components/OTForms/FOTReceta';
import FOTArmazones from '../../components/OTForms/FOTArmazones';
import FOTCristales from '../../components/OTForms/FOTCristales';
import FOTBitacora from '../../components/OTForms/FOTBitacora';
import { useCrud } from '../../hooks';
import FOTGarantia from '../../components/OTForms/FOTGarantia';
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
  optica: any;
  cliente: any;
  receta: any;
  cristales:any;
  motivo:string;
  area_actual:string;
  estado_actual:string;
  proyectos:string;
  establecimiento:string;
  cliente_rut:string;
  fecha_atencion:string;
  fecha_taller:string;
  fecha_despacho:string;
  fecha_entrega_cliente:string;
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
  folio_asociado:string;
  resolucion:string;
  numero_worktracking:string;
  nota_venta:string;
  numero_factura:string;
  observaciones:string;
  folio_mandante:string;
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
  
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [formValues, setFormValues] = useState<FormData | any>({});
  const [showGarantia, setShowGarantia] = useState(false);
  const {createdEntity} = useCrud(strBaseUrl);
  
  
  // console.log(sumatoriaNivel1)
  // console.log(scoreValidation)
  
  const sumatoriaNivel1 = validacionNivel1.reduce((index, objeto) => index + objeto.valor, 0);
  
  const actualizarEstado = (campo:string, valor:number) => {
    const index = validacionNivel1.findIndex(objeto => objeto.campo === campo);
    if (index !== -1) {
      validacionNivel1[index].valor = valor;
    }
  }



  const onSubmit: SubmitHandler<FormData> = async(jsonData) => {
    console.log('Datos de todos los formularios:', jsonData);
    const actualDate = moment().format('DD-MM-YYYY HH:mm:ss');
  
    //DATA POR AGREGAR
    // FECHA/HORA ACTUAL

    const _p1 = ` ${actualDate}, 
                  ${jsonData["motivo"] === 'Venta' ? 1:2}, 
                  ${parseInt(jsonData["area_actual"])}',
                  ${parseInt(jsonData["estado_actual"])}',
                  ${1},         
                '${jsonData["proyectos"]}',
                 ${parseInt(jsonData["establecimiento"])},
                 '${jsonData["cliente_rut"]}',
                 '${jsonData["fecha_atencion"]}',
                 '${jsonData["fecha_taller"]}',
                 '${jsonData["fecha_despacho"]}',
                 '${jsonData["fecha_entrega_cliente"]}',




                 ${parseInt(jsonData["punto_venta"])},
                 ${parseInt(jsonData["numero_receta"])},
                 '${jsonData["fecha_receta"]}',
                 ${parseInt(jsonData["tipo_anteojo"])},
                 ${parseInt(jsonData["anteojo1_ESF_OD"])},
                 ${parseInt(jsonData["anteojo1_CIL_OD"])},
                 ${parseInt(jsonData["anteojo1_EJE_OD"])},
                 ${parseInt(jsonData["anteojo1_AD_OD"])},
                 ${parseInt(jsonData["anteojo1_ESF_OI"])},
                 ${parseInt(jsonData["anteojo1_CIL_OI"])},
                 ${parseInt(jsonData["anteojo1_EJE_OI"])},
                 ${parseInt(jsonData["anteojo1_AD_OI"])},
                 ${parseInt(jsonData["anteojo1_DP"])},
                 ${parseInt(jsonData["anteojo1_ALT"])},
                 '${'a1_grupo'}',
                 ${parseInt(jsonData["anteojo2_ESF_OD"])},
                 ${parseInt(jsonData["anteojo2_CIL_OD"])},
                 ${parseInt(jsonData["anteojo2_EJE_OD"])},
                 ${parseInt(jsonData["anteojo2_ESF_OI"])},
                 ${parseInt(jsonData["anteojo2_CIL_OI"])},
                 ${parseInt(jsonData["anteojo2_EJE_OI"])},
                 ${parseInt(jsonData["anteojo2_DP"])},
                 ${'a2_grupo'}',
                 ${parseInt(jsonData["anteojo1_opcion_vta"])},
                 ${parseInt(jsonData["codigo_armazon_1"])}',
                 ${parseInt(jsonData["anteojo2_opcion_vta"])}',
                 ${parseInt(jsonData["codigo_armazon_2"])},
                 ${parseInt(jsonData["anteojo3_opcion_vta"])},
                 ${parseInt(jsonData["codigo_armazon_3"])},
                 ${parseInt(jsonData["cristales1_od_opcion_vta"])},
                 ${parseInt(jsonData["anteojo1_cristal_OD"])},
                 ${parseInt(jsonData["cristales1_oi_opcion_vta"])},
                 ${parseInt(jsonData["anteojo1_cristal_OI"])},
                 ${parseInt(jsonData["cristales1_tratamiento_adicional"])},
                 ${parseInt(jsonData["cristales2_od_opcion_vta"])},
                 ${parseInt(jsonData["anteojo2_cristal_OD"])},
                 ${parseInt(jsonData["cristales2_oi_opcion_vta"])},
                 ${parseInt(jsonData["anteojo2_cristal_OI"])},
                 ${parseInt(jsonData["cristales2_tratamiento_adicional"])},
                 '${'motivo_garantia'}',
                 ${parseInt(jsonData["folio_asociado"])},
                 ${parseInt(jsonData["resolucion"])},
                 

                 ${parseInt(jsonData["numero_worktracking"])},
                 ${parseInt(jsonData["nota_venta"])},
                 ${parseInt(jsonData["numero_factura"])},
                 ${parseInt(jsonData["folio_mandante"])},



                  
                 
                 '${jsonData["observaciones"]}'
                 
    `;

    console.log(_p1)
    const query = {
      query:"03",
      _p1
    }

    const result = await createdEntity(query)
    console.log(result)
  
  };



  const handleFormChange = (data: any, name: string) => {
    //

    console.log(data)
    console.log(name)
    
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

  
  return (

    <div className='useFormContainer top-[1%] w-[94vw] relative h-[95vh]'>
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
          <FOTOptica data={data && data} formValues={formValues["optica"]} control={control} onDataChange={(data:any) => handleFormChange(data , 'optica')} />
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
            <FOTGarantia data={data && data}/>
          </div>
        )}

        <div className='flex items-center mx-auto  justify-around w-1/2 '>
          {/* OTHISTORICA */}
          {isEditting && isMOT && (
            <button className='bg-green-400 mx-4 text-white w-1/4' onClick={()=>setShowGarantia((prev)=>!prev)}>Garantia</button>
          )}


          {/* OT DIARIA */}
          {
            sumatoriaNivel1 > validacionNivel1.length && (
              <button className='bg-green-400 mx-4  text-white w-1/4 ' onClick={handleSubmit(onSubmit)}>Procesar</button>
            )
          }

          {sumatoriaNivel1 === validacionNivel1.length && (
            <>
              <button className='bg-yellow-400 mx-4   w-1/4 '>Pausar</button>
              <button className='bg-red-400 mx-4 text-white  w-1/4 '>Derivar</button>
            </>
          )}

        </div>
      </Tabs>
    </div>
  );
};

export default FOT;




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
      // a1_oi_cil, a1_oi_eje, a1_oi_ad, a1_dp, a1_alt, a1_grupo, a2_od_esf, a2_od_cil, a2_od_eje, a2_oi_esf, a2_oi_cil, a2_oi_eje, a2_dp, a2_grupo, anteojo1_opcion_vta, anteojo1_armazon, anteojo2_opcion_vta, anteojo2_armazon, anteojo3_opcion_vta, anteojo3_armazon, cristales1_od_opcion_vta, cristales1_od, cristales1_oi_opcion_vta, cristales1_oi, cristales1_tratamiento_adicional, cristales2_od_opcion_vta, cristales2_od, cristales2_oi_opcion_vta, cristales2_oi, cristales2_tratamiento_adicional, motivo_garantia, folio_asociado, resolucion_garantia, worktracking, nota_venta, numero_factura, folio_interno_mandante, observaciones)

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