import React, {useEffect, useRef, useState} from 'react'
import { SelectInputComponent, TextInputComponent } from '..'
import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';

interface IArmazones {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any
}

const FOTArmazones:React.FC<IArmazones> = ({
    control,
    onDataChange,
    formValues,
    data
}) => {
    const fetcher = (url:string) => axios.get(url).then((res)=>res.data);
    // const [codArmazon1, setCodArmazon1] = useState( formValues && formValues["codigo_armazon_1"] || 0);
    const [codArmazon1, setCodArmazon1] = useState(formValues ? formValues["codigo_armazon_1"] : data && data[EnumGrid.a1_armazon_id] || 0);
    const [codArmazon2, setCodArmazon2] = useState(formValues ? formValues["codigo_armazon_2"] : data && data[EnumGrid.a2_armazon_id] || 0);
    const [codArmazon3, setCodArmazon3] = useState(formValues ? formValues["codigo_armazon_3"] : 0);



    const { data:armazon1 } = useSWR(`https://mtoopticos.cl/api/armazones/listado/?query=01&_p1=${codArmazon1}`, fetcher);
    const { data:armazon2 } = useSWR(`https://mtoopticos.cl/api/armazones/listado/?query=01&_p1=${codArmazon2}`, fetcher);
    const { data:armazon3 } = useSWR(`https://mtoopticos.cl/api/armazones/listado/?query=01&_p1=${codArmazon3}`, fetcher);
    
    
    const handleInputChange = (e:any) => {
        const { name, value } = e;
        if(name === 'codigo_armazon_1'){
            setCodArmazon1(value) 
        }
        if(name === 'codigo_armazon_2'){
            setCodArmazon2(value)
        }
        if(name === 'codigo_armazon_3'){
            setCodArmazon3(value)
        }
        onDataChange({ [name]: value }); 
    };
    
  
    // console.log(armazon1)
    // console.log(formValues)
    // console.log(codArmazon2 && codArmazon2[0])
    console.log(data && data[EnumGrid.a1_armazon_id])
  return (
    <form>
        <div className='w-full labelForm rounded-lg border border-blue-500'>
            <div className=' grid grid-cols-3'>
                <div className=' py-4'>
                    <div className="w-[90%] mx-auto py-4 labelForm rounded-lg border border-blue-500">
                        <div className="w-[90%] ml-4">
                            <SelectInputComponent
                                label="Opción de Venta"
                                name="anteojo1_opcion_vta"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues && formValues["anteojo1_opcion_vta"]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                        </div>

                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Armazon"
                                    name="codigo_armazon_1"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["codigo_armazon_1"] : data && data[EnumGrid.a1_armazon_id]}
                                    control={control}
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


                        <div className="w-[90%] mx-auto labelForm rounded-lg border border-blue-500">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Tipo:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][3]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{armazon1 && armazon1[0] && armazon1[0][6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][13]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][15]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Stock:</h2>
                                <p className="text-xl mr-2">{armazon1 && armazon1[0] && armazon1[0][16]}</p>
                            </div>
                        </div>

                    </div>

                    
                </div>
                <div className=' py-4'>
                <div className="w-[90%] mx-auto py-4 labelForm rounded-lg border border-blue-500">
                        <div className="w-[90%] ml-4">
                            <SelectInputComponent
                                label="Opción de Venta"
                                name="anteojo2_opcion_vta"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_opcion_vta"] : data && data[EnumGrid.a2_armazon_opcion_venta_id]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                        </div>

                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Armazon"
                                    name="codigo_armazon_2"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["codigo_armazon_2"] : data && data[EnumGrid.a2_armazon_id]}
                                    control={control}
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


                        <div className="w-[90%] mx-auto labelForm rounded-lg border border-blue-500">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Tipo:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][3]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{armazon2 && armazon2[0] && armazon2[0][6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][13]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][15]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Stock:</h2>
                                <p className="text-xl mr-2">{armazon2 && armazon2[0] && armazon2[0][16]}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className=' py-4'>
                <div className="w-[90%] mx-auto py-4 labelForm rounded-lg border border-blue-500">
                        <div className="w-[90%] ml-4">
                            <SelectInputComponent
                                label="Opcion de Venta"
                                name="anteojo3_opcion_vta"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues && formValues["anteojo1_opcion_vta"]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                        </div>

                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Armazon"
                                    name="codigo_armazon_3"
                                    handleChange={handleInputChange}
                                    data={formValues && formValues["codigo_amrazon_3"]}
                                    control={control}
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


                        <div className="w-[90%] mx-auto labelForm rounded-lg border border-blue-500">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Tipo:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][3]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Marca:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Modelo:</h2>
                                <p className="text-xl m2-2">{armazon3 && armazon3[0] && armazon3[0][6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Color:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Material:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Aro:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Puente:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Brazo:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][13]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="text-2xl font-bold">Uso:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][15]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="text-2xl font-bold">Stock:</h2>
                                <p className="text-xl mr-2">{armazon3 && armazon3[0] && armazon3[0][16]}</p>
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