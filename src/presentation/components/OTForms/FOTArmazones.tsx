import React, {useEffect, useState} from 'react'
import { SelectInputComponent, TextInputComponent } from '..'
import useSWR from 'swr';
import axios from 'axios';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2 } from '../../utils/validationOT';
import { URLBackend } from '../../hooks/useCrud';
import { codigoProyecto } from '../../views/forms/FOT';
import { toast } from 'react-toastify';
import { punto_venta } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';

interface IArmazones {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    onlyRead?:boolean,
    permiso_armazones:boolean
}

const FOTArmazones:React.FC<IArmazones> = ({
    control,
    onDataChange,
    formValues,
    data, 
    onlyRead,
    permiso_armazones
}) => {
    const fetcher = (url:string) => axios.get(url).then((res)=>res.data);
    
  
    // const [codArmazon1, setCodArmazon1] = useState( formValues && formValues["codigo_armazon_1"] || 0);
    const [codArmazon1, setCodArmazon1] = useState(formValues ? formValues["a1_armazon_id"] : data && data[EnumGrid.a1_armazon_id] || " ");
    const [codArmazon2, setCodArmazon2] = useState(formValues ? formValues["a2_armazon_id"] : data && data[EnumGrid.a2_armazon_id] || " ");
    const [codArmazon3, setCodArmazon3] = useState(formValues ? formValues["a3_armazon_id"] : " ");



    // const { data:armazon1 } = useSWR(`${URLBackend}/api/almacenarmazones/listado/?query=02&_p2=${codArmazon1}&_p1=${codigoProyecto.value}&_p3=${punto_venta}`, fetcher);

    const { data:armazon1 } = useSWR(`${URLBackend}/api/armazones/listado/?query=02&_p1=${codArmazon1}&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`, fetcher);

    const { data:armazon2 } = useSWR(`${URLBackend}/api/armazones/listado/?query=02&_p1=${codArmazon2}&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`, fetcher);
    const { data:armazon3 } = useSWR(`${URLBackend}/api/armazones/listado/?query=02&_p1=${codArmazon3}&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`, fetcher);
    
    
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
        // console.log(armazon1 && armazon1[0])
        
        console.log(codArmazon1)
        console.log(armazon1)

        if( codArmazon1  !== " " && codArmazon1 !== undefined  && armazon1 && armazon1[0] && (armazon1[0].length === 3 || armazon1[0].length === 1)){
            // console.log('render')
            toast.error(armazon1[0][0])
            onDataChange({['a1_armazon_id']: " "}) 
            // setCodArmazon1(" ")   

        }
    },[armazon1,codArmazon1])

    useEffect(()=>{
        if(codArmazon2 !== " " && codArmazon2 !== undefined && armazon2 && armazon2[0] && (armazon2[0].length === 3 || armazon2[0].length === 1)){
            toast.error(2,armazon2[0][0])
            onDataChange({['a2_armazon_id']: " "})    

        }
    },[armazon2, codArmazon1])

    useEffect(()=>{
        if(codArmazon3  !== " " && codArmazon3 !== undefined && armazon3 && armazon3[0] && (armazon3[0].length === 3 || armazon3[0].length === 1)){
            toast.error(3,armazon3[0][0])
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
                                readOnly={permiso_armazones}
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
                                    onlyRead={permiso_armazones}
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
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][2]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][4]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{armazon1 && armazon1[0] && armazon1[0][5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][8]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Diagonal:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][14]}</p>
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
                                readOnly={permiso_armazones}
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
                                    onlyRead={permiso_armazones}
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
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][2]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][4]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{armazon2 && armazon2[0] && armazon2[0][5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][8]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Diagonal:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][14]}</p>
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
                                readOnly={permiso_armazones}
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
                                    onlyRead={permiso_armazones}
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
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][2]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][4]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{armazon3 && armazon3[0] && armazon3[0][5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][8]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Diagonal:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][14]}</p>
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