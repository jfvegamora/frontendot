import React from 'react'
import { SelectInputComponent, TextInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOTHistorica'
import { validationOTlevel1 } from '../../utils/validationOT'

interface IReceta {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any
    onlyRead?:boolean,
    permiso_grupo_dioptria:boolean
}

const FOTReceta:React.FC<IReceta> = ({
    control,
    onDataChange,
    formValues,
    data,
    onlyRead,
    permiso_grupo_dioptria
}) => {

    const handleInputChange = (e:any) => {
        let {name, value} = e;
        // console.log(name)
        // console.log(value)
        validationOTlevel1(name, value)

        // if(name === "anteojo1_ESF_OD"){
        //     const modifiedValue = parseFloat(value).toFixed(2);
        //     onDataChange({[name]:modifiedValue})
        // }

        onDataChange({[name]:value})
    }

    console.log(permiso_grupo_dioptria)


  return (
    <form>
        <div className="w-full labelForm  rounded-lg px-8 flex flex-col justify-between   py-4 border border-blue-500">
            <div className="w-full flex items-center">
                <div className="w-[20%] -ml-4">
                        <SelectInputComponent
                            label="Tipo de Anteojo"
                            name="tipo_anteojo_id"
                            showRefresh={true}
                            isOT={true}
                            handleSelectChange={handleInputChange}
                            data={formValues ? formValues["tipo_anteojo_id"] : data && data[EnumGrid.tipo_anteojo_id]}
                            control={control}
                            entidad={["/api/tipos/", "02","OTTipoAnteojo"]}
                            // error={errors.establecimiento}
                            customWidth={"345px"}
                            readOnly={onlyRead}
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
                                    onlyRead={onlyRead}
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
                                    onlyRead={onlyRead}
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
                            readOnly={onlyRead || permiso_grupo_dioptria}
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
                                name="a1_od_esf"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_od_esf"] : data && data[EnumGrid.a1_od_esf]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="a1_od_cil"
                                handleChange={handleInputChange}
                                onlyRead={onlyRead}
                                data={formValues ? formValues["a1_od_cil"] : data && data[EnumGrid.a1_od_cil]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="a1_od_eje"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_od_eje"] : data && data[EnumGrid.a1_od_eje]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="AD"
                                name="a1_od_ad"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_od_ad"] : data && data[EnumGrid.a1_od_ad]}
                                control={control}
                                onlyRead={onlyRead}
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
                                name="a1_oi_esf"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_oi_esf"] : data && data[EnumGrid.a1_oi_esf]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="a1_oi_cil"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_oi_cil"] : data && data[EnumGrid.a1_oi_cil]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="a1_oi_eje"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_oi_eje"] : data && data[EnumGrid.a1_oi_eje]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="AD"
                                name="a1_oi_ad"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_oi_ad"] : data && data[EnumGrid.a1_oi_ad]}
                                control={control}
                                onlyRead={onlyRead}
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
                                name="a1_dp"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_dp"] : data && data[EnumGrid.a1_dp]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                    <div className="w-[70%] mx-auto">
                            <TextInputComponent
                                type="text"
                                label="ALT"
                                name="a1_alt"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_alt"] : data && data[EnumGrid.a1_alt]}
                                control={control}
                                onlyRead={onlyRead}
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
                            readOnly={onlyRead || permiso_grupo_dioptria}
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
                                name="a2_od_esf"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_od_esf"] : data && data[EnumGrid.a2_od_esf]}

                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="a2_od_cil"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_od_cil"] : data && data[EnumGrid.a2_od_cil]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="a2_od_eje"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_od_eje"] : data && data[EnumGrid.a2_od_eje]}
                                onlyRead={onlyRead}
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
                                name="a2_oi_esf"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_oi_esf"] : data && data[EnumGrid.a2_oi_esf]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="CIL"
                                name="a2_oi_cil"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_oi_cil"] : data && data[EnumGrid.a2_oi_cil]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="text"
                                label="EJE"
                                name="a2_oi_eje"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_oi_eje"] : data && data[EnumGrid.a2_oi_eje]}
                                control={control}
                                onlyRead={onlyRead}
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
                                name="a2_dp"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_dp"] : data && data[EnumGrid.a2_dp]}
                                control={control}
                                onlyRead={onlyRead}
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