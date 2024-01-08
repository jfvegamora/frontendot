import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { updateOT } from '../../utils';
import { fetchOT } from '../../../redux/slices/OTSlice';


interface IDerivacion {
    data?:any;
    onClose?: any;
    formValues:any;
    closeModal:any
}



interface FormData{
    proyecto_codigo: undefined;
    folio_ot: number;
    proyecto:string;
    nombre_cliente: string;

    area_desde:string;
    area_hasta:string;
    situacion:string
    observaciones:string;
    formValues:any
}

const FOTDerivacion:React.FC<IDerivacion> = ({
    data,
    onClose,
    // formValues,
    closeModal,
    formValues
}) => {
    const {control, handleSubmit} = useForm<FormData>()
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
    const dispatch = useAppDispatch();
    console.log(OTAreas["areaActual"])


    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        console.log('jsondata', jsonData)
        
        // fetchDerivacion(jsonData)
        updateOT(
            jsonData,
            OTAreas["areaActual"],
            jsonData.area_hasta.toString() as any,
            30,
            formValues,
            data,
            OTSlice.cristales, 
            OTSlice.armazones,
            UsuarioID.toString(),
        ).then(()=>{
            closeModal()
            dispatch(fetchOT({OTAreas:OTAreas["areaActual"]}))
        })
        // switchCaseDerivar()
    }

    // const fetchDerivacion = async(jsonData:FormData) => {
    //     let _estado = "40";
    //     let _origen = OTAreas["areaActual"].toString();
    //     let _destino = jsonData.area_hasta;

    //     let a1_grupo = 1;
    //     let a2_grupo = 2;

    //     // let _p3 = `'${data[EnumGrid.cliente_rut]}','${data[EnumGrid.cliente_nomnbre]}',${data[EnumGrid.cliente_tipo] === TIPO_CLIENTE.beneficiario ? "1" : data[EnumGrid.cliente_tipo] === TIPO_CLIENTE.particular ? "2" : data[EnumGrid.cliente_tipo] === TIPO_CLIENTE.optica ? "3" : "0"}, ${data[EnumGrid.cliente_sexo] === SEXO.masculino ? "1" : data[EnumGrid.cliente_sexo] === SEXO.femenino ? "2" : data[EnumGrid.cliente_sexo] === SEXO.no_aplica ? "3" : "0"},'${data[EnumGrid.cliente_fecha_nacimiento]}','${data[EnumGrid.cliente_direccion]}' ,${formValues && formValues["cliente"] && formValues["cliente"]["cliente_comuna_id"] || data[EnumGrid.cliente_comuna_id] }, '${data[EnumGrid.cliente_telefono]}','${data[EnumGrid.cliente_correo]}', ${data[EnumGrid.establecimiento_id]}`;
 
    //     // console.log(data)
    //     // console.log(data && data[EnumGrid.estado_impresion_id])
    //     const fields = [
    //         `motivo=${data[EnumGrid.motivo] === "Venta" ? 1: 2}`,
    //         `area=${_destino}`,
    //         `estado=${_estado}`,
    //         `validar_parametrizacion=${data[EnumGrid.validar_parametrizacion_id]}`,
    //         `estado_impresion=${data[EnumGrid.estado_impresion_id]}`,
    //         ...(data[EnumGrid.proyecto_codigo] !== undefined ? [`proyecto="${data[EnumGrid.proyecto_codigo]}"`] : []),
    //         ...(data[EnumGrid.establecimiento_id] !== undefined ? [`establecimiento=${data[EnumGrid.establecimiento_id]}`] : []),
    //         ...(data[EnumGrid.cliente_rut] !== undefined ? [`cliente="${data[EnumGrid.cliente_rut]}"`] : []),

    //         ...(data[EnumGrid.fecha_atencion] !== undefined ? [`fecha_atencion="${data[EnumGrid.fecha_atencion]}"`] : []),
    //         ...(data[EnumGrid.fecha_entrega_taller] !== undefined ? [`fecha_entrega_taller="${data[EnumGrid.fecha_entrega_taller]}"`] : []),
    //         ...(data[EnumGrid.fecha_despacho] !== undefined ? [`fecha_despacho="${data[EnumGrid.fecha_despacho]}"`] : []),
    //         ...(data[EnumGrid.fecha_entrega_cliente] !== undefined ? [`fecha_entrega_cliente="${data[EnumGrid.fecha_entrega_cliente]}"`] : []),

    //         ...(data[EnumGrid.punto_venta_id] !== undefined ? [`punto_venta=${data[EnumGrid.punto_venta_id]}`] : []),
    //         ...(data[EnumGrid.numero_receta] !== undefined ? [`numero_receta=${data[EnumGrid.numero_receta]}`] : []),
    //         ...(data[EnumGrid.fecha_receta] !== undefined  && data[EnumGrid.fecha_receta] !== null  ? [`fecha_receta='${data[EnumGrid.fecha_receta]}'`] : []),
    //         ...(data[EnumGrid.tipo_anteojo_id] !== undefined ? [`tipo_anteojo=${data[EnumGrid.tipo_anteojo_id]}`] : []),
            
            
    //         ...(data[EnumGrid.a1_od_esf] !== undefined ? [`a1_od_esf=${data[EnumGrid.a1_od_esf]}`] : []),
    //         ...(data[EnumGrid.a1_od_cil] !== undefined ? [`a1_od_cil=${data[EnumGrid.a1_od_cil]}`] : []),
    //         ...(data[EnumGrid.a1_od_eje] !== undefined ? [`a1_od_eje=${data[EnumGrid.a1_od_eje]}`] : []),
    //         ...(data[EnumGrid.a1_od_ad] !== undefined ? [`a1_od_ad=${data[EnumGrid.a1_od_ad]}`] : []),
    //         ...(data[EnumGrid.a1_oi_esf] !== undefined ? [`a1_oi_esf=${data[EnumGrid.a1_oi_esf]}`] : []),
    //         ...(data[EnumGrid.a1_oi_cil] !== undefined ? [`a1_oi_cil=${data[EnumGrid.a1_oi_cil]}`] : []),
    //         ...(data[EnumGrid.a1_oi_eje] !== undefined ? [`a1_oi_eje=${data[EnumGrid.a1_oi_eje]}`] : []),
    //         ...(data[EnumGrid.a1_oi_ad] !== undefined ? [`a1_oi_ad=${data[EnumGrid.a1_oi_ad]}`] : []),
    //         ...(data[EnumGrid.a1_dp] !== undefined ? [`a1_dp=${data[EnumGrid.a1_dp]}`] : []),
    //         ...(data[EnumGrid.a1_alt] !== undefined ? [`a1_alt=${data[EnumGrid.a1_alt]}`] : []),
            
    //         `a1_grupo=${a1_grupo}`,
            
    //         ...(data[EnumGrid.a2_od_esf] !== undefined ? [`a2_od_esf=${data[EnumGrid.a2_od_esf]}`] : []),
    //         ...(data[EnumGrid.a2_od_cil] !== undefined ? [`a2_od_cil=${data[EnumGrid.a2_od_cil]}`] : []),
    //         ...(data[EnumGrid.a2_od_eje] !== undefined ? [`a2_od_eje=${data[EnumGrid.a2_od_eje]}`] : []),
    //         ...(data[EnumGrid.a2_oi_esf] !== undefined ? [`a2_oi_eje=${data[EnumGrid.a2_oi_esf]}`] : []),
    //         ...(data[EnumGrid.a2_oi_cil] !== undefined ? [`a2_oi_cil=${data[EnumGrid.a2_oi_cil]}`] : []),
    //         ...(data[EnumGrid.a2_oi_eje] !== undefined ? [`a2_oi_eje=${data[EnumGrid.a2_oi_eje]}`] : []),
    //         ...(data[EnumGrid.a2_dp] !== undefined ? [`a2_dp=${data[EnumGrid.a2_dp]}`] : []),
            
    //         `a2_grupo=${a2_grupo}`,
            
    //         ...(data[EnumGrid.a1_opcion_vta_id] !== undefined ? [`anteojo1_opcion_vta=${data[EnumGrid.a1_opcion_vta_id]}`] : []),
    //         ...(data[EnumGrid.a1_armazon_id] !== undefined ? [`anteojo1_armazon="${data[EnumGrid.a1_armazon_id]}"`] : []),
    //         ...(data[EnumGrid.a2_opcion_vta_id] !== undefined ? [`anteojo2_opcion_vta=${data[EnumGrid.a2_opcion_vta_id]}`] : []),
    //         ...(data[EnumGrid.a2_armazon_id] !== undefined ? [`anteojo2_armazon="${data[EnumGrid.a2_armazon_id]}"`] : []),
    //         ...(data[EnumGrid.a3_opcion_vta_id] !== undefined ? [`anteojo3_opcion_vta=${data[EnumGrid.a3_opcion_vta_id]}`] : []),
    //         ...(data[EnumGrid.a3_armazon_id] !== undefined ? [`anteojo3_armazon="${data[EnumGrid.a3_armazon_id]}"`] : []),
            
            
    //         ...(data[EnumGrid.cristal1_opcion_vta_id] !== undefined ? [`cristales1_opcion_vta=${data[EnumGrid.cristal1_opcion_vta_id]}`] : []),
    //         ...(data[EnumGrid.cristal1_diseno_id] !== undefined ? [`cristales1_diseno=${data[EnumGrid.cristal1_diseno_id]}`] : []),
    //         ...(data[EnumGrid.cristal1_indice_id] !== undefined ? [`cristales1_indice=${data[EnumGrid.cristal1_indice_id]}`] : []),
    //         ...(data[EnumGrid.cristal1_material_id] !== undefined ? [`cristales1_material=${data[EnumGrid.cristal1_material_id]}`] : []),
    //         ...(data[EnumGrid.cristal1_tratamiento_id] !== undefined ? [`cristales1_tratamiento=${data[EnumGrid.cristal1_tratamiento_id]}`] : []),
    //         ...(data[EnumGrid.cristal1_color_id] !== undefined ? [`cristales1_color=${data[EnumGrid.cristal1_color_id]}`] : []),
    //         ...(data[EnumGrid.cristal1_od] !== undefined ? [`cristales1_od="${data[EnumGrid.cristal1_od]}"`] : []),
    //         ...(data[EnumGrid.cristal1_oi] !== undefined ? [`cristales1_oi="${data[EnumGrid.cristal1_oi]}"`] : []),
    //         ...(data[EnumGrid.cristal1_tratamiento_adicional_id] !== undefined ? [`cristales1_tratamiento_adicional=${data[EnumGrid.cristal1_tratamiento_adicional_id]}`] : []),
            
            
    //         ...(data[EnumGrid.cristal2_od_opcion_venta_id] !== undefined ? [`cristales2_opcion_vta=${data[EnumGrid.cristal2_od_opcion_venta_id]}`] : []),
    //         ...(data[EnumGrid.cristal2_diseno_id] !== undefined ? [`cristales2_opcion_vta=${data[EnumGrid.cristal2_diseno_id]}`] : []),
    //         ...(data[EnumGrid.cristal2_indice_id] !== undefined ? [`cristales2_indice=${data[EnumGrid.cristal2_indice_id]}`] : []),
    //         ...(data[EnumGrid.cristal2_material_id] !== undefined ? [`cristales2_material=${data[EnumGrid.cristal2_material_id]}`] : []),
    //         ...(data[EnumGrid.cristal2_tratamiento_id] !== undefined ? [`cristales2_tratamiento=${data[EnumGrid.cristal2_tratamiento_id]}`] : []),
    //         ...(data[EnumGrid.cristal2_color_id] !== undefined ? [`cristales2_color=${data[EnumGrid.cristal2_color_id]}`] : []),
    //         ...(data[EnumGrid.cristal2_od] !== undefined ? [`cristales2_od="${data[EnumGrid.cristal2_od]}"`] : []),
    //         ...(data[EnumGrid.cristal2_oi] !== undefined ? [`cristales2_oi="${data[EnumGrid.cristal2_oi]}"`] : []),
    //         ...(data[EnumGrid.cristal2_tratamiento_adicional_id] !== undefined ? [`cristales2_oi=${data[EnumGrid.cristal2_tratamiento_adicional_id]}`] : []),
            
            
    //         ...(data[EnumGrid.motivo_garantia_id] !== undefined ? [`motivo_garantia=${data[EnumGrid.motivo_garantia_id]}`] : []),
    //         ...(data[EnumGrid.folio_asociado] !== undefined ? [`folio_asociado=${data[EnumGrid.folio_asociado]}`] : []),
    //         ...(data[EnumGrid.resolucion_garantia_id] !== undefined ? [`resolucion_garantia=${data[EnumGrid.resolucion_garantia_id]}`] : []),
    //         ...(data[EnumGrid.worktracking] !== undefined ? [`worktracking=${data[EnumGrid.worktracking]}`] : []),
    //         ...(data[EnumGrid.nota_venta] !== undefined ? [`nota_venta="${data[EnumGrid.nota_venta]}"`] : []),
    //         ...(data[EnumGrid.numero_factura] !== undefined ? [`numero_factura="${data[EnumGrid.numero_factura]}"`] : []),
    //         ...(data[EnumGrid.folio_interno_mandante] !== undefined ? [`folio_interno_mandante="${data[EnumGrid.folio_interno_mandante]}"`] : []),
    //         ...(data[EnumGrid.observaciones] !== undefined ? [`observaciones='"${data[EnumGrid.observaciones]}"'`] : []),
    //         // Continúa agregando los campos de la misma manera...
    //       ];

    //     //   console.log(fields)
    //     const filteredFields = fields.map((field) => (field === 'undefined') ? ' ' : field);
    //     const _p1 = filteredFields.join(',');
    //     const cristales = [
    //         { codigo: `${data[EnumGrid.cristal1_od]}` },
    //         { codigo: `${data[EnumGrid.cristal1_oi]}` },
    //         { codigo: `${data[EnumGrid.cristal2_od]}` },
    //         { codigo: `${data[EnumGrid.cristal2_oi]}` }
    //       ]
    //         .map(item => {
    //           const numero = parseFloat(item.codigo);
    //           if (!isNaN(numero) && numero !== null) {
    //             return { 'codigo': `"${numero}"` };
    //           }
    //           return null; 
    //         })
    //         .filter(item => item !== null);
      
      
      
    //         const armazones = [
    //           { codigo: data[EnumGrid.a1_armazon_id] },
    //           { codigo: data[EnumGrid.a2_armazon_id] },
    //         ]
    //           .map(item => {
    //             const numero = parseFloat(item.codigo);
    //             if (!isNaN(numero) && numero !== null ) {
    //               return { codigo: numero };
    //             }
    //             return null; 
    //           })
    //           .filter(item => item !== null);
            

    //     const query = {
    //         query: "04",
    //         _p1,
    //         _p3: "",
    //         _proyecto: data[EnumGrid.proyecto_codigo],
    //         _folio: data[EnumGrid.folio].toString(),
    //         _rut: `${data[EnumGrid.cliente_rut] || ""}`,
        
    //         _usuario:UsuarioID.toString(),
    //         _situacion:jsonData.situacion || 0,
    //         _obs:jsonData.observaciones || "",
            
    //         _cristalesJSON: JSON.stringify(cristales),
    //         _armazonesJSON: JSON.stringify(armazones),
    //         _estado, 
    //         _destino,
    //         _origen,
    //         _punto_venta: `${data[EnumGrid.punto_venta_id]}`
    //     }

    //     console.log('query', query)
    //     // console.log('query', _p1)

      
    //     try {
    //       const response = await axios.post(`${URLBackend}/api/ot/editar/`, query)
    //       console.log(response)
    //       closeModal()
        
    //     } catch (error) {
    //       console.log(error)
    //     }

    // }


//    console.log(OTAreas);
    console.log( data && data[EnumGrid.fecha_receta])
    console.log( data && data[EnumGrid.cristal1_od])
    console.log( data && data[EnumGrid.cristal1_oi])
    console.log( data && data[EnumGrid.cristal2_oi])
    console.log( data && data[EnumGrid.cristal2_oi])
    console.log( data && data[EnumGrid.a1_armazon_id])
    console.log( data && data[EnumGrid.a2_armazon_id])
    console.log( data && data[EnumGrid.a3_armazon_id])
  return (
    <div className='useFormContainer useFormDerivacion h-[55%] w-[60%] left-[20%] top-[30%] z-30'>
        <div className=" flex justify-end w-full">
            <h2 className='text-2xl cursor-pointer' onClick={onClose}>X</h2>
        </div>
        <form className='text-center  !h-[80%]' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl mt-2'>Derivación de OT</h1>

                <div className="flex  items-center rowForm w-full">
                    <div className="w-[25%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
                            data={data && data[EnumGrid.folio]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[35%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={data && data[EnumGrid.proyecto_titulo]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[35%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Nombre Cliente"
                            name="nombre_cliente"
                            control={control}
                            data={data && data[EnumGrid.cliente_nomnbre]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>

                <div className="w-full flex items-center !h-20 rowForm !mt-16">
                    <div className="w-[25%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Área desde"
                            name="area_desde"
                            control={control}
                            data= {data && data[EnumGrid.area]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[20%] ml-7 mr-16">
                        <SelectInputComponent
                            label="Área hasta"
                            name="area_hasta"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/tipos/", "02", "OTAreas"]}
                            customWidth={"w-[20.8rem]"}
                            // error={errors.establecimiento}
                            // customWidth={"345px"}
                        />
                    </div>
                    <div className="w-[20%] ml-[4.8rem]    ">
                        <SelectInputComponent
                            label="Situacion"
                            name="situacion"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/tipos/", "02", "OTSituaciones"]}
                            // error={errors.establecimiento}
                            customWidth={"w-[20.6rem] ml-4"}
                            // customWidth={"345px"}
                        />
                    </div>
                </div>

                <div className=" w-full flex items-center rowForm">
                    <div className="w-[98%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Observaciones"
                            name="observaciones"
                            control={control}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>

                <div className=' w-full flex justify-end mx-[-1.5rem] h-12'>
                    <Button  type="submit" className='otActionButton bg-red-900'>Derivar</Button>
                </div>
        </form>

    </div>
  )
}

export default FOTDerivacion