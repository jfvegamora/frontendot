import React from 'react'
import { SelectInputComponent, TextInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOTHistorica'

interface IReceta {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any
}

const FOTReceta:React.FC<IReceta> = ({
    control,
    onDataChange,
    formValues,
    data
}) => {

    const handleInputChange = (e:any) => {
        let {name, value} = e;
        console.log(name)
        console.log(value)

        // if(name === "anteojo1_ESF_OD"){
        //     const modifiedValue = parseFloat(value).toFixed(2);
        //     onDataChange({[name]:modifiedValue})
        // }

        onDataChange({[name]:value})
    }

    


  return (
    <form>
        <div className="w-full labelForm  rounded-lg px-8 flex flex-col justify-between   py-4 border border-blue-500">
            <div className="w-full flex items-center">
                <div className="w-[20%] -ml-4">
                        <SelectInputComponent
                            label="Tipo de Anteojo"
                            name="tipo_anteojo"
                            showRefresh={true}
                            isOT={true}
                            handleSelectChange={handleInputChange}
                            data={formValues ? formValues["tipo_anteojo"] : data && data[EnumGrid.tipo_anteojo_id]}
                            control={control}
                            entidad={["/api/tipos/", "02","OTTipoAnteojo"]}
                            // error={errors.establecimiento}
                            customWidth={"345px"}
                        />
                </div>
                <div className="w-[30%] ml-10">
                                <TextInputComponent
                                    type="text"
                                    label="Numero de receta"
                                    name="numero_receta"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["numero_receta"] : data && data[EnumGrid.numero_receta]}
                                    control={control}
                                    // error={errors.fecha_nacimiento}
                                />
                </div>
                <div className="w-[30%] ml-10">
                                <TextInputComponent
                                    type="date"
                                    label="Fecha receta"
                                    name="fecha_receta"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["fecha_receta"] : data && data[EnumGrid.fecha_receta]}
                                    control={control}
                                    // error={errors.fecha_nacimiento}
                                />
                </div>
                
            </div>

            <div className="w-full flex items-center pt-8  relative pb-8 rounded-lg border border-blue-500 ">
                <div className='absolute z-20 top-[-8%] w-[15%] left-[70%] text-center labelForm  rounded-lg border border-blue-500 '>
                <SelectInputComponent
                            label="Grupo"
                            name="tipo_anteojo"
                            showRefresh={false}
                            isOT={true}
                            handleSelectChange={handleInputChange}
                            data={formValues ? formValues["tipo_anteojo"] : data && data[EnumGrid.tipo_anteojo_id]}
                            control={control}
                            entidad={["/api/tipos/", "02","OTTipoAnteojo"]}
                            // error={errors.establecimiento}
                            
                            customWidth={"340px"}
                        />
                </div>
                <label className='absolute z-10 top-[-10%] w-[15%] left-[36%] text-center labelForm  rounded-lg text-2xl'>ANTEOJO 1</label>



                <div className=" w-[43%] items-center  ">
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border border-blue-500">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-2 left-[30%]'>OJO DERECHO</label>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="te"
                                label="ESF"
                                defaultValue={'anteojo1_ESF_OD'}
                                name="anteojo1_ESF_OD"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_ESF_OD"] : data && data[EnumGrid.a1_od_esf]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="anteojo1_CIL_OD"
                                handleChange={handleInputChange}
                                
                                data={formValues ? formValues["anteojo1_CIL_OD"] : data && data[EnumGrid.a1_od_cil]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="anteojo1_EJE_OD"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_EJE_OD"] : data && data[EnumGrid.a1_od_eje]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="AD"
                                name="anteojo1_AD_OD"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_AD_OD"] : data && data[EnumGrid.a1_od_ad]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                    </div>    
                </div>

                <div className=" w-[43%] items-center">
                <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border border-blue-500">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-2 left-[30%]'>OJO IZQUIERDO</label>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="ESF"
                                name="anteojo1_ESF_OI"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_ESF_OI"] : data && data[EnumGrid.a1_oi_esf]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="anteojo1_CIL_OI"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_CIL_OI"] : data && data[EnumGrid.a1_oi_cil]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="anteojo1_EJE_OI"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_EJE_OI"] : data && data[EnumGrid.a1_oi_eje]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="AD"
                                name="anteojo1_AD_OI"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_AD_OI"] : data && data[EnumGrid.a1_oi_ad]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                </div>    
                </div>
                <div className="w-[14%] items-center ">
                    <div className="w-[70%] mx-auto">
                            <TextInputComponent
                                type="text"
                                label="DP"
                                name="anteojo1_DP"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_DP"] : data && data[EnumGrid.a1_dp]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                    <div className="w-[70%] mx-auto">
                            <TextInputComponent
                                type="text"
                                label="ALT"
                                name="anteojo1_ALT"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo1_ALT"] : data && data[EnumGrid.a1_alt]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center   pt-8 relative pb-8 rounded-lg border border-blue-500 ">
            <div className='absolute z-20 top-[-8%] w-[15%] left-[70%] text-center labelForm  rounded-lg border border-blue-500 '>
                <SelectInputComponent
                            label="Grupo"
                            name="tipo_anteojo"
                            showRefresh={false}
                            isOT={true}
                            handleSelectChange={handleInputChange}
                            data={formValues ? formValues["tipo_anteojo"] : data && data[EnumGrid.tipo_anteojo_id]}
                            control={control}
                            entidad={["/api/tipos/", "02","OTTipoAnteojo"]}
                            // error={errors.establecimiento}
                            
                            customWidth={"345px"}
                        />
                </div>
                <label className='absolute z-10 top-[-10%] w-[15%] left-[36%] text-center labelForm  rounded-lg text-2xl'>ANTEOJO 1</label>



                <div className=" w-[43%] items-center  ">
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border border-blue-500">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-2 left-[30%]'>OJO DERECHO</label>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="ESF"
                                name="anteojo2_ESF_OD"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_ESF_OD"] : data && data[EnumGrid.a2_od_esf]}

                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="anteojo2_CIL_OD"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_CIL_OD"] : data && data[EnumGrid.a2_od_cil]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="anteojo2_EJE_OD"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_EJE_OD"] : data && data[EnumGrid.a2_od_eje]}
                                
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                       
                    </div>    
                </div>

                <div className=" w-[43%] items-center">
                <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border border-blue-500">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-2 left-[30%]'>OJO IZQUIERDO</label>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="ESF"
                                name="anteojo2_ESF_OI"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_ESF_OI"] : data && data[EnumGrid.a2_oi_esf]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="anteojo2_CIL_OI"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_CIL_OI"] : data && data[EnumGrid.a2_oi_cil]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="anteojo2_EJE_OI"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_EJE_OI"] : data && data[EnumGrid.a2_oi_eje]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        
                </div>    
                </div>

                <div className="w-[14%] items-center ">
                    <div className="w-[70%] mx-auto">
                            <TextInputComponent
                                type="text"
                                label="DP"
                                name="anteojo2_DP"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["anteojo2_DP"] : data && data[EnumGrid.a2_dp]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default FOTReceta