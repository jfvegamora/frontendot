import React, {useEffect, useState} from 'react'
import { SelectInputComponent, TextInputComponent } from '..'
import useSWR from 'swr';
import axios from 'axios';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { EnumGrid as EnumArmazones } from '../../views/mantenedores/MArmazones';
import { validationOTlevel2 } from '../../utils/validationOT';
import { URLBackend } from '../../hooks/useCrud';
import { toast } from 'react-toastify';
import { A1_DP, A1_Diametro, A2_DP, A2_Diametro, codigoProyecto, punto_venta, tipo_de_anteojo, validar_parametrizacion } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';

interface IArmazones {
    control:any;
    onDataChange: any;
    formValues: any;
    data:any;
    onlyRead?:boolean;
    permiso_usuario_armazones:boolean;
    permiso_areas_armazones:boolean;
}

const FOTArmazones:React.FC<IArmazones> = ({
    control,
    onDataChange,
    formValues,
    data, 
    permiso_usuario_armazones,
    permiso_areas_armazones
}) => {
    const fetcher = (url:string) => axios.get(url).then((res)=>res.data) as any;

    
    // const [codArmazon1, setCodArmazon1] = useState( formValues && formValues["codigo_armazon_1"] || 0);
    const [codArmazon1, setCodArmazon1] = useState(formValues ? formValues["a1_armazon_id"] : data && data[EnumGrid.a1_armazon_id] || " ");
    const [codArmazon2, setCodArmazon2] = useState(formValues ? formValues["a2_armazon_id"] : data && data[EnumGrid.a2_armazon_id] || " ");
    const [codArmazon3, setCodArmazon3] = useState(formValues ? formValues["a3_armazon_id"] : data && data[EnumGrid.a3_armazon_id] || " ");


    //TODO! =========================== ENVIAR DP EN _P4 PARA VALIDAR ARMAZONES ===========================================================================
    //TODO! =========================== ENVIAR Diametro EN _P5 PARA VALIDAR ARMAZONES =====================================================================

    const endpoint = validar_parametrizacion.value === '0' 
                                                   ? `${URLBackend}/api/armazones/listado/?query=01` 
                                                   : `${URLBackend}/api/armazones/listado/?query=02&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;

    const { data:armazon1 } = useSWR(`${endpoint}&_p1=${codArmazon1 !== ' ' ? codArmazon1 : "aaaa"}&_p4=${typeof A1_DP.value === 'string' ? A1_DP.value : 0}&_p5=${typeof A1_Diametro.value === 'string' ? A1_Diametro.value : ""}`, fetcher); 
    const { data:armazon2 } = useSWR(`${endpoint}&_p1=${codArmazon2 !== ' ' ? codArmazon2 : "aaaa"}&_p4=${(tipo_de_anteojo.value === '3' ? (typeof A2_DP.value === 'string' ? A2_DP.value : 0) : A1_DP.value)}&_p5=${(tipo_de_anteojo.value === '3' ? (typeof A2_Diametro.value === 'string' ? A2_Diametro.value : "") : A1_Diametro.value)}`, fetcher);
    const { data:armazon3 } = useSWR(`${endpoint}&_p1=${codArmazon3 !== ' ' ? codArmazon3 : "aaaa"}&_p4=${typeof A1_DP.value === 'string' ? A1_DP.value : 0}&_p5=${typeof A1_Diametro.value === 'string' ? A1_Diametro.value : ""}`, fetcher); 
    
    
    const handleInputChange = (e:any) => {
        const { name, value } = e;
        
        console.log(name)
        console.log(value)
        
        validationOTlevel2(name, value)
        if(name === 'a1_armazon_id'){
            setCodArmazon1(value.trim())
        }
        if(name === 'a2_armazon_id'){
            setCodArmazon2(value.trim())
        }
        if(name === 'a3_armazon_id'){
            setCodArmazon3(value.trim())
        }
        onDataChange({ [name]: value }); 
    };


    useEffect(()=>{
        // console.log(validar_parametrizacion.value)
        // console.log(armazon1)
        if(validar_parametrizacion.value === '1'){
            // console.log(armazon1)
            // console.log(codArmazon1)
            
            // console.log(!codArmazon1.trim())
            if(!( codArmazon1 && !codArmazon1.trim()) && codArmazon1 !== undefined  && armazon1 && armazon1[0] && (armazon1[0].length === 3 || armazon1[0].length === 1)){
                //? VALIDACION QUERY 02
                toast.error(armazon1[0][0])
                onDataChange({['a1_armazon_id']: " "}) 
            }
        }else if (armazon1 && armazon1.length === 0 && codArmazon1 !== " "){
            //? VALIDACION QUERY 01
            toast.error('Código de Armazón 1 no existe')
            onDataChange({['a1_armazon_id']: " "}) 

        }
        //  console.log(armazon1)   
    },[armazon1,codArmazon1])

    useEffect(()=>{
        if(validar_parametrizacion.value === '1'){
            if(!( codArmazon2 && !codArmazon2.trim()) && codArmazon2 !== undefined && armazon2 && armazon2[0] && (armazon2[0].length === 3 || armazon2[0].length === 1)){
                console.log('render')
                console.log(armazon2[0][0])
                toast.error(armazon2[0][0])
                onDataChange({['a2_armazon_id']: " "})    
            }
        }else if (armazon2 && armazon2.length === 0 && codArmazon2 !== " "){
            toast.error('Código de Armazón 2 no existe')
            onDataChange({['a2_armazon_id']: " "}) 
        }

    },[armazon2, codArmazon2])



    useEffect(()=>{
        // console.log('render')
        // console.log(codArmazon3)
        if(validar_parametrizacion.value === '1'){
            if(!( codArmazon3 && !codArmazon3.trim()) && codArmazon3 !== undefined && armazon3 && armazon3[0] && (armazon3[0].length === 3 || armazon3[0].length === 1)){
                toast.error(armazon3[0][0])
                onDataChange({['a3_armazon_id']: " "})    
            }

        }else if (armazon3 && armazon3.length === 0 && codArmazon3 !== " "){
            toast.error('Código de Armazón 3 no existe')
            onDataChange({['a3_armazon_id']: " "}) 
        }

    },[armazon3, codArmazon3])
    

      
  
    // console.log(armazon2)
    // console.log(armazon1)
    // console.log(punto_venta.value)
    // console.log(codArmazon1)
    // console.log(typeof armazon1[0])
    // console.log(armazon2[0][0])
    // console.log(formValues)
    // console.log(codArmazon2 && codArmazon2[0])
    // console.log(data && data[EnumGrid.a1_armazon_id])

    // console.log(permiso_armazones)

    console.log(armazon2)
  return (
    <form>
        <div className='w-full labelForm rounded-lg border border-[#f39c12] h-[38rem]'>
            <div className=' grid grid-cols-3'>
                <div className=' py-4 rowForm'>
                    <div className="w-[90%] mx-auto py-4 labelForm mt-2  rounded-lg border h-[36rem] border-[#f39c12]">
                        <div className="w-[90%] ml-8">
                            <SelectInputComponent
                                label="Opción de Venta"
                                name="a1_opcion_vta_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["a1_opcion_vta_id"] : data && data[EnumGrid.a1_opcion_vta_id]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
                                // error={errors.establecimiento}
                                readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
                                customWidth={"345px"}
                            />
                        </div>

                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputInteractive
                                    type="text"
                                    label="Codigo Armazon"
                                    name="a1_armazon_id"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["a1_armazon_id"] : data && data[EnumGrid.a1_armazon_id]}
                                    control={control}
                                    onlyRead={!(permiso_usuario_armazones && permiso_areas_armazones)}
                                    isOT={true}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="stock_actual_1"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            
                        </div>


                        <div className="w-[90%] mx-auto labelForm rounded-lg border h-[27rem] border-[#f39c12]">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Tipo:</h2>
                                <p className="text-xl mr-2">{ validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][2] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.armazon_tipo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][4] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.marca]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][5] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.modelo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][6] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.color] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][8] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.armazon_material] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][9] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.aro]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][10] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.puente]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Diagonal:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][11] :armazon1 && armazon1[0] && armazon1[0][EnumArmazones.diagonal]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][12] :armazon1 && armazon1[0] && armazon1[0][EnumArmazones.brazo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon1 && armazon1[0] && armazon1[0][14] : armazon1 && armazon1[0] && armazon1[0][EnumArmazones.armazon_uso]}</p>
                            </div>
                           
                        </div>

                    </div> 

                    
                </div>
                <div className=' py-4 rowForm'>
                <div className="w-[90%] mx-auto py-4 labelForm mt-2 rounded-lg border h-[36rem] border-[#f39c12]">
                        <div className="w-[90%] ml-8">
                            <SelectInputComponent
                                label="Opción de Venta"
                                name="a2_opcion_vta_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["a2_opcion_vta_id"] : data && data[EnumGrid.a2_opcion_vta_id]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                                readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
                            />
                        </div>

                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputInteractive
                                    type="text"
                                    label="Codigo Armazon"
                                    name="a2_armazon_id"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["a2_armazon_id"] : data && data[EnumGrid.a2_armazon_id]}
                                    control={control}
                                    onlyRead={!(permiso_usuario_armazones && permiso_areas_armazones)}
                                    isOT={true}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="stock_actual_2"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            
                        </div>


                        <div className="w-[90%] mx-auto labelForm rounded-lg border h-[27rem] border-[#f39c12]">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Tipo:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][2] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.armazon_tipo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][4] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.marca]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][5] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.modelo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][6] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.color]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][8] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.armazon_material]} </p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][9] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.aro]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][10] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.puente]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Diagonal:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][11] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.diagonal] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][12] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.brazo] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon2 && armazon2[0] && armazon2[0][14] : armazon2 && armazon2[0] && armazon2[0][EnumArmazones.armazon_uso]}</p>
                            </div>
                            
                        </div>

                    </div>
                </div>
                <div className=' py-4 rowForm '>
                <div className="w-[90%] mx-auto py-4 labelForm rounded-lg border border-blue-500">
                        <div className="w-[90%] ml-8">
                            <SelectInputComponent
                                label="Opcion de Venta"
                                name="a3_opcion_vta_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["a3_opcion_vta_id"] : data && data[EnumGrid.a3_opcion_vta_id]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                                readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
                            />
                        </div>

                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputInteractive
                                    type="text"
                                    label="Codigo Armazon"
                                    name="a3_armazon_id"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["a3_armazon_id"] : data && data[EnumGrid.a3_armazon_id]}

                                    control={control}
                                    onlyRead={!(permiso_usuario_armazones && permiso_areas_armazones)}
                                    isOT={true}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="stock_actual_3"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            
                        </div>


                        <div className="w-[90%] mx-auto labelForm rounded-lg border h-[27rem]  border-[#f39c12]">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Tipo:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][2] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.armazon_tipo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][4] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.marca]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][5] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.modelo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][6] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.color]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][8] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.armazon_material]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][9] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.aro]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][10] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.puente]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Diagonal:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][11] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.diagonal]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][12] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.brazo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{validar_parametrizacion.value === '1' ? armazon3 && armazon3[0] && armazon3[0][14] : armazon3 && armazon3[0] && armazon3[0][EnumArmazones.armazon_uso]}</p>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default FOTArmazones



  // const [dataArmazon1, setDataArmazon1] = useState();
    // useEffect(()=>{
    //     setDataArmazon1(armazon1)
    // },[codArmazon1])