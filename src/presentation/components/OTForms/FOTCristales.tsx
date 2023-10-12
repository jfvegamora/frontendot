import React,{useState} from 'react'
import { SelectInputComponent, TextInputComponent } from '..';
import useSWR from 'swr';
import axios from 'axios';
import { EnumGrid } from '../../views/mantenedores/MOT';


interface ICristales {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any
}


const FOTCristales:React.FC<ICristales> = ({
    control,
    onDataChange,
    formValues,
    data
}) => {
    const fetcher = (url:string) => axios.get(url).then((res)=>res.data);
    const [codCristal1OD, setCodCristal1OD] = useState(formValues ? formValues["anteojo1_cristal_OD"] : data && data[EnumGrid.cristal1_od_codigo] || 0);
    const [codCristal1OI, setCodCristal1OI] = useState(formValues ? formValues["anteojo1_cristal_OI"] : data && data[EnumGrid.cristal1_oi_codigo] || 0);
    
    const [codCristal2OD, setCodCristal2OD] = useState(formValues ? formValues["anteojo2_cristal_OD"] : data && data[EnumGrid.cristal2_od_codigo] || 0);
    const [codCristal2OI, setCodCrisyal2OI] = useState(formValues ? formValues["anteojo2_cristal_OI"] : data && data[EnumGrid.cristal2_oi_codigo] || 0);


    const { data:cristal1OD } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal1OD}`, fetcher);
    const { data:cristal1OI } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal1OI}`, fetcher);
    const { data:cristal2OD } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal2OD}`, fetcher);
    const { data:cristal2OI } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal2OI}`, fetcher);
    

    const handleInputChange = (e:any) => {
        const {name, value} = e;
        onDataChange({[name]:value})
        if(name === 'anteojo1_cristal_OD'){
            setCodCristal1OD(value) 
        }
        if(name === 'anteojo1_cristal_OI'){
            setCodCristal1OI(value) 
        }
        if(name === 'anteojo2_cristal_OD'){
            setCodCristal2OD(value) 
        }
        if(name === 'anteojo2_cristal_OI'){
            setCodCrisyal2OI(value) 
        }
    }
  console.log(data && data[EnumGrid.cristal1_od_codigo])

  return (
    <form>
        <div className='w-full labelForm flex items-center rounded-lg border border-blue-500'>
            <div className=" w-1/2   relative items-center">
               <div className=" flex items-center">
               <h1 className='labelForm absolute z-10 top-[-2%] text-2xl w-[30%] text-center left-[30%]'>Anteojo 1</h1>
                <div className="mt-16 mx-auto w-[45%] relative mb-8  labelForm rounded-lg border border-blue-500">
                    <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OD</h1>
                    <div className="w-[90%] mt-4 ml-4">
                            <SelectInputComponent
                                label="Opcion de Venta"
                                name="cristales1_od_opcion_vta"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["cristales1_od_opcion_vta"] : data && data[EnumGrid.cristal1_od]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaCristales"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                    </div>
                    <div className="w-[90%] ml-4 flex items-center">
                            
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Cristal"
                                    name="anteojo1_cristal_OD"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["anteojo1_cristal_OD"] : data && data[EnumGrid.cristal1_od_codigo]}
                                    control={control}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>

                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="anteojo1_stock_actual_od"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    // data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                        </div>



                        <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                            <p className='ml-2 text-xl'>Marca: {cristal1OD && cristal1OD[0] && cristal1OD[0][3]}</p>
                            <p className='ml-2 text-xl'>Diseño: {cristal1OD && cristal1OD[0] && cristal1OD[0][7]} </p>
                            <p className='ml-2 text-xl'>Indice: {cristal1OD && cristal1OD[0] && cristal1OD[0][9]}</p>
                            <p className='ml-2 text-xl'>Material: {cristal1OD && cristal1OD[0] && cristal1OD[0][11]}</p>
                            <p className='ml-2 text-xl'>Color: {cristal1OD && cristal1OD[0] && cristal1OD[0][13]}</p>
                            <p className='ml-2 text-xl'>Tratamientos: {cristal1OD && cristal1OD[0] && cristal1OD[0][15]}</p>
                            <p className='ml-2 text-xl'>ESF: {cristal1OD && cristal1OD[0] && cristal1OD[0][18]}</p>
                            <p className='ml-2 text-xl'>CIL: {cristal1OD && cristal1OD[0] && cristal1OD[0][19]}</p>
                            <p className='ml-2 text-xl'>Diametro: {cristal1OD && cristal1OD[0] && cristal1OD[0][17]}</p>
                           
                        </div>    

                </div>
                <div className="mt-16 mx-auto w-[45%] relative mb-8 labelForm rounded-lg border border-blue-500">
                    <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OI</h1>
                    <div className="w-[90%] mt-4 ml-4">
                            <SelectInputComponent
                                label="Opcion de Venta"
                                name="cristales1_oi_opcion_vta"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_cristal_OD"] : data && data[EnumGrid.cristal1_oi_opcion_vta_id]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaCristales"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                    </div>
                    <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Cristal"
                                    name="anteojo1_cristal_OI"
                                    handleChange={handleInputChange}
                                    data={formValues && formValues["anteojo1_cristal_OI"]}
                                    control={control}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="anteojo1_stock_actual_OI"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    // data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                        </div>



                        <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                            <p className='ml-2 text-xl'>Marca: {cristal1OI && cristal1OI[0] && cristal1OI[0][3]}</p>
                            <p className='ml-2 text-xl'>Diseño: {cristal1OI && cristal1OI[0] && cristal1OI[0][7]} </p>
                            <p className='ml-2 text-xl'>Indice: {cristal1OI && cristal1OI[0] && cristal1OI[0][9]}</p>
                            <p className='ml-2 text-xl'>Material: {cristal1OI && cristal1OI[0] && cristal1OI[0][11]}</p>
                            <p className='ml-2 text-xl'>Color: {cristal1OI && cristal1OI[0] && cristal1OI[0][13]}</p>
                            <p className='ml-2 text-xl'>Tratamientos: {cristal1OI && cristal1OI[0] && cristal1OI[0][15]}</p>
                            <p className='ml-2 text-xl'>ESE: {cristal1OI && cristal1OI[0] && cristal1OI[0][18]}</p>
                            <p className='ml-2 text-xl'>CIL: {cristal1OI && cristal1OI[0] && cristal1OI[0][19]}</p>
                            <p className='ml-2 text-xl'>Diametro: {cristal1OI && cristal1OI[0] && cristal1OI[0][17]}</p>
                        
                            {/* <p className='ml-2 text-2xl'>Tipo: {armazon3 && armazon3[0] && armazon3[0][3]}</p> 
                            <p className='ml-2 text-2xl'>Marca: {cristal1OI && cristal1OI[0] && cristal1OI[0][5]} </p>
                            <p className='ml-2 text-2xl'>Modelo:{armazon3 && armazon3[0] && armazon3[0][6]} </p>
                            <p className='ml-2 text-2xl'>Color: {armazon3 && armazon3[0] && armazon3[0][7]}</p>
                            <p className='ml-2 text-2xl'>Material: {armazon3 && armazon3[0] && armazon3[0][9]} </p>
                            <p className='ml-2 text-2xl'>Aro: {armazon3 && armazon3[0] && armazon3[0][10]}</p>
                            <p className='ml-2 text-2xl'>Puente:{armazon3 && armazon3[0] && armazon3[0][11]} </p>
                            <p className='ml-2 text-2xl'>Diagonal: {armazon3 && armazon3[0] && armazon3[0][12]}</p>
                            <p className='ml-2 text-2xl'>Brazo: {armazon3 && armazon3[0] && armazon3[0][13]}</p>
                            <p className='ml-2 text-2xl'>Uso: {armazon3 && armazon3[0] && armazon3[0][15]}</p>
                            <p className='ml-2 text-2xl'>Stock mínimo: {armazon3 && armazon3[0] && armazon3[0][16]} </p> */}
                           
                        </div>    


                </div>
               </div>
               <div className="items-center mx-auto">
                    <div className="w-[90%] mt-4 ml-4 mb-4">
                            <SelectInputComponent
                                label="Tratamiento Adicional"
                                name="cristales1_tratamiento_adicional"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["cristal1_tratamiento_adicional1"] : data && data[EnumGrid.cristal1_trat_adicional_id]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTTratamientoAdicional"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                    </div>
               </div>                    
            </div>
           
           
           
           
           
           
           
           
           
           
            <div className=" w-1/2 relative items-center">
                <div className="flex items-center">
                <h1 className='labelForm absolute z-10 top-[-2%] text-2xl w-[30%] text-center left-[30%]'>Anteojo 1</h1>
                <div className="mt-16 mx-auto w-[45%] relative mb-8  labelForm rounded-lg border border-blue-500">
                    <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OD</h1>
                    <div className="w-[90%] mt-4 ml-4">
                            <SelectInputComponent
                                label="Opcion de Venta"
                                name="cristales2_od_opcion_vta"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues && formValues["cristales2_od_opcion_vta"]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaCristales"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                    </div>
                    <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Cristal"
                                    name="anteojo2_cristal_OD"
                                    handleChange={handleInputChange}
                                    data={formValues && formValues["anteojo1_cristal_OD"]}
                                    control={control}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="anteojo1_stock_actual_od"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    // data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                        </div>



                        <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                            <p className='ml-2 text-xl'>Marca: {cristal2OD && cristal2OD[0] && cristal2OD[0][3]}</p>
                            <p className='ml-2 text-xl'>Diseño: {cristal2OD && cristal2OD[0] && cristal2OD[0][7]} </p>
                            <p className='ml-2 text-xl'>Indice: {cristal2OD && cristal2OD[0] && cristal2OD[0][9]}</p>
                            <p className='ml-2 text-xl'>Material: {cristal2OD && cristal2OD[0] && cristal2OD[0][11]}</p>
                            <p className='ml-2 text-xl'>Color: {cristal2OD && cristal2OD[0] && cristal2OD[0][13]}</p>
                            <p className='ml-2 text-xl'>Tratamientos: {cristal2OD && cristal2OD[0] && cristal2OD[0][15]}</p>
                            <p className='ml-2 text-xl'>ESF: {cristal2OD && cristal2OD[0] && cristal2OD[0][18]}</p>
                            <p className='ml-2 text-xl'>CIL: {cristal2OD && cristal2OD[0] && cristal2OD[0][19]}</p>
                            <p className='ml-2 text-xl'>Diametro: {cristal2OD && cristal2OD[0] && cristal2OD[0][17]}</p>
                           
                        </div>    

                </div>
                <div className="mt-16 mx-auto w-[45%] relative mb-8 labelForm rounded-lg border border-blue-500">
                    <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OI</h1>
                    <div className="w-[90%] mt-4 ml-4">
                            <SelectInputComponent
                                label="Opcion de Venta"
                                name="cristales2_oi_opcion_vta"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues && formValues["cristales2_oi_opcion_vta"]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTOpcionVentaCristales"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                    </div>
                    <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Cristal"
                                    name="anteojo2_cristal_OI"
                                    handleChange={handleInputChange}
                                    data={formValues && formValues["anteojo1_cristal_OI"]}
                                    control={control}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="anteojo1_stock_actual_OI"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    // data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                        </div>



                        <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                            <p className='ml-2 text-xl'>Marca: {cristal2OI && cristal2OI[0] && cristal2OI[0][3]}</p>
                            <p className='ml-2 text-xl'>Diseño: {cristal2OI && cristal2OI[0] && cristal2OI[0][7]} </p>
                            <p className='ml-2 text-xl'>Indice: {cristal2OI && cristal2OI[0] && cristal2OI[0][9]}</p>
                            <p className='ml-2 text-xl'>Material: {cristal2OI && cristal2OI[0] && cristal2OI[0][11]}</p>
                            <p className='ml-2 text-xl'>Color: {cristal2OI && cristal2OI[0] && cristal2OI[0][13]}</p>
                            <p className='ml-2 text-xl'>Tratamientos: {cristal2OI && cristal2OI[0] && cristal2OI[0][15]}</p>
                            <p className='ml-2 text-xl'>ESE: {cristal2OI && cristal2OI[0] && cristal2OI[0][18]}</p>
                            <p className='ml-2 text-xl'>CIL: {cristal2OI && cristal2OI[0] && cristal2OI[0][19]}</p>
                            <p className='ml-2 text-xl'>Diametro: {cristal2OI && cristal2OI[0] && cristal2OI[0][17]}</p>
                        
                            {/* <p className='ml-2 text-2xl'>Tipo: {armazon3 && armazon3[0] && armazon3[0][3]}</p> 
                            <p className='ml-2 text-2xl'>Marca: {cristal1OI && cristal1OI[0] && cristal1OI[0][5]} </p>
                            <p className='ml-2 text-2xl'>Modelo:{armazon3 && armazon3[0] && armazon3[0][6]} </p>
                            <p className='ml-2 text-2xl'>Color: {armazon3 && armazon3[0] && armazon3[0][7]}</p>
                            <p className='ml-2 text-2xl'>Material: {armazon3 && armazon3[0] && armazon3[0][9]} </p>
                            <p className='ml-2 text-2xl'>Aro: {armazon3 && armazon3[0] && armazon3[0][10]}</p>
                            <p className='ml-2 text-2xl'>Puente:{armazon3 && armazon3[0] && armazon3[0][11]} </p>
                            <p className='ml-2 text-2xl'>Diagonal: {armazon3 && armazon3[0] && armazon3[0][12]}</p>
                            <p className='ml-2 text-2xl'>Brazo: {armazon3 && armazon3[0] && armazon3[0][13]}</p>
                            <p className='ml-2 text-2xl'>Uso: {armazon3 && armazon3[0] && armazon3[0][15]}</p>
                            <p className='ml-2 text-2xl'>Stock mínimo: {armazon3 && armazon3[0] && armazon3[0][16]} </p> */}
                           
                        </div>    

                </div>
                
                </div>
                <div className="items-center mx-auto mb-4">
                    <div className="w-[90%] mt-4 ml-4 ">
                            <SelectInputComponent
                                label="Tratamiento Adicional"
                                name="cristales2_tratamiento_adicional"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues && formValues["cristales2_tratamiento_adicional"]}
                                control={control}
                                entidad={["/api/tipos/", "02","OTTratamientoAdicional"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                            />
                    </div>
                </div>
            </div>
        </div>

    </form>
  )
}

export default FOTCristales