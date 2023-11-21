import React from 'react'
import { SelectInputComponent, TextInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOTHistorica'
import {a1_od_ad, a1_od_cil, a1_od_eje, a1_od_esf, a1_oi_ad, a1_oi_cil, a1_oi_eje, a1_oi_esf, a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, dioptriasHabilitadas, dioptrias_receta, onchangeDioptrias } from '../../utils'
import { validationOTlevel1, validationOTlevel2 } from '../../utils/validationOT'
import { combinaciones_validas, habilitarCampo, setDioptriasReceta, setTipoAnteojo, validation_tipo_anteojo } from '../../utils/OTReceta_utils'

// export const inputName = signal(0)

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
        console.log(name)
        console.log(value)
        if(name == 'a1_od_eje'){
            console.log(dioptrias_receta.value.a1_od.cil)
            if(dioptrias_receta.value.a1_od.cil > 0){
                console.log('ejecutando')
                onchangeDioptrias()
            }
        }
        if(name === 'tipo_anteojo_id'){
          setTipoAnteojo(value)      
        }
        validation_tipo_anteojo()
        setDioptriasReceta(name, value)
        validationOTlevel1(name, value)
        validationOTlevel2(name, value)
        
        
        
        onDataChange({[name]:value})
        combinaciones_validas()
    }

    console.log(dioptriasHabilitadas.value);
    console.log(habilitarCampo.value);
    // inputName.value = 50

//   inputName.value = 90  
  return (
    <form>
        <div className="w-full labelForm  rounded-lg px-8 flex flex-col justify-between !h-[80vh]  py-4 border radioComponent">
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
                            // entidad={["/api/ot/", "12","ESF", "_p3"]}
                            // error={errors.establecimiento}
                            customWidth={"345px"}
                            readOnly={onlyRead}
                        />

                        
                </div>
                {/* <div className="w-[20%] -ml-4">
                        <OTListBox
                            label="Tipo de Anteojo"
                            name="tipo_anteojo_id"
                            showRefresh={true}
                            isOT={true}
                            handleSelectChange={handleInputChange}
                            data={formValues ? formValues["tipo_anteojo_id"] : data && data[EnumGrid.tipo_anteojo_id]}
                            control={control}
                            // entidad={["/api/tipos/", "02","OTTipoAnteojo"]}
                            entidad={["/api/ot/", "12","ESF", "_p3"]}
                            // error={errors.establecimiento}
                            customWidth={"345px"}
                            readOnly={onlyRead}
                        />
                </div> */}
                <div className="w-[30%] ml-10">
                                <TextInputComponent
                                    type="number"
                                    label="Numero de receta"
                                    name="numero_receta"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["numero_receta"] : data && data[EnumGrid.numero_receta]}
                                    control={control}
                                    isOT={true}
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
                                    isOT={true}
                                    onlyRead={onlyRead}
                                    // error={errors.fecha_nacimiento}
                                />
                </div>
                
            </div>

            <div className="w-full flex items-center pt-8  relative pb-8 rounded-lg border radioComponent ">
                <div className='absolute z-20 top-[-8%] w-[15%] left-[70%] text-center labelForm  rounded-lg border radioComponent '>
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
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-2 left-[30%]'>OJO DERECHO</label>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="ESF"
                               
                                name="a1_od_esf"
                                handleChange={handleInputChange}
                                // data={formValues ? formValues["a1_od_esf"] : data && data[EnumGrid.a1_od_esf]}
                                data={a1_od_esf ? a1_od_esf : data && data[EnumGrid.a1_od_esf]}
                                control={control}
                                isOT={true}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="CIL"
                                name="a1_od_cil"
                                handleChange={handleInputChange}
                                onlyRead={onlyRead}
                                data={a1_od_cil ? a1_od_cil : data && data[EnumGrid.a1_od_cil]}
                                control={control}
                                isOT={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="EJE"
                                name="a1_od_eje"
                                handleChange={handleInputChange}
                                data={a1_od_eje ? a1_od_eje : data && data[EnumGrid.a1_od_eje]}
                                control={control}
                                isOT={true}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="AD"
                                name="a1_od_ad"
                                handleChange={handleInputChange}
                                data={a1_od_ad ? a1_od_ad : data && data[EnumGrid.a1_od_ad]}
                                control={control}
                                isOT={true}

                                onlyRead={habilitarCampo.value.a1_ad}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                    </div>    
                </div>

                <div className=" w-[43%] items-center">
                <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-2 left-[30%]'>OJO IZQUIERDO</label>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="ESF"
                                name="a1_oi_esf"
                                handleChange={handleInputChange}
                                data={a1_oi_esf ? a1_oi_esf: data && data[EnumGrid.a1_oi_esf]}
                                control={control}
                                isOT={true}

                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="CIL"
                                name="a1_oi_cil"
                                handleChange={handleInputChange}
                                data={a1_oi_cil ? a1_oi_cil : data && data[EnumGrid.a1_oi_cil]}
                                control={control}
                                isOT={true}

                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="EJE"
                                name="a1_oi_eje"
                                handleChange={handleInputChange}
                                data={a1_oi_eje ? a1_oi_eje : data && data[EnumGrid.a1_oi_eje]}
                                control={control}
                                isOT={true}

                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="AD"
                                name="a1_oi_ad"
                                handleChange={handleInputChange}
                                data={a1_oi_ad ? a1_oi_ad : data && data[EnumGrid.a1_oi_ad]}
                                control={control}
                                isOT={true}

                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                </div>    
                </div>
                <div className="w-[14%] items-center ">
                    <div className="w-[70%] mx-auto">
                            <TextInputComponent
                                type="number"
                                label="DP"
                                name="a1_dp"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_dp"] : data && data[EnumGrid.a1_dp]}
                                control={control}
                                isOT={true}

                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                    <div className="w-[70%] mx-auto">
                            <TextInputComponent
                                type="number"
                                label="ALT"
                                name="a1_alt"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a1_alt"] : data && data[EnumGrid.a1_alt]}
                                control={control}
                                isOT={true}

                                onlyRead={habilitarCampo.value.a1_alt}
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
                <label className='absolute z-10 top-[-10%] w-[15%] left-[36%] text-center labelForm  rounded-lg text-2xl'>ANTEOJO 2</label>



                <div className=" w-[43%] items-center  ">
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border border-blue-500">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-2 left-[30%]'>OJO DERECHO</label>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="ESF"
                                name="a2_od_esf"
                                handleChange={handleInputChange}
                                data={a2_od_esf ? a2_od_esf : data && data[EnumGrid.a2_od_esf]}
                                // data={a2_od_esf}
                                control={control}
                                isOT={true}

                                onlyRead={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="CIL"
                                name="a2_od_cil"
                                handleChange={handleInputChange}
                                data={a2_od_cil ? a2_od_cil : data && data[EnumGrid.a2_od_cil]}
                                control={control}
                                isOT={true}

                                onlyRead={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="EJE"
                                name="a2_od_eje"
                                
                                handleChange={handleInputChange}
                                data={a2_od_eje ? a2_od_eje : data && data[EnumGrid.a2_od_eje]}
                                onlyRead={true}
                                isOT={true}

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
                                type="number"
                                label="ESF"
                                name="a2_oi_esf"
                                handleChange={handleInputChange}
                                data={a2_oi_esf ? a2_oi_esf : data && data[EnumGrid.a2_oi_esf]}
                                control={control}
                                isOT={true}

                                onlyRead={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="CIL"
                                name="a2_oi_cil"
                                handleChange={handleInputChange}
                                data={a2_oi_cil ? a2_oi_cil : data && data[EnumGrid.a2_oi_cil]}
                                control={control}
                                isOT={true}

                                onlyRead={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <TextInputComponent
                                type="number"
                                label="EJE"
                                name="a2_oi_eje"
                                handleChange={handleInputChange}
                                data={a2_oi_eje ? a2_oi_eje : data && data[EnumGrid.a2_oi_eje]}
                                control={control}
                                isOT={true}

                                onlyRead={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        
                </div>    
                </div>

                <div className="w-[14%] items-center ">
                    <div className="w-[70%] mx-auto">
                            <TextInputComponent
                                type="number"
                                label="DP"
                                name="a2_dp"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["a2_dp"] : data && data[EnumGrid.a2_dp]}
                                control={control}
                                isOT={true}

                                onlyRead={true}
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