import React from 'react'
import { SelectInputComponent, TextInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOTHistorica'
// import {a1_od_ad, a1_od_cil, a1_od_eje, a1_od_esf, a1_oi_ad, a1_oi_cil, a1_oi_eje, a1_oi_esf, a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, dioptriasHabilitadas, dioptrias_receta, onchangeDioptrias } from '../../utils'
import {a1_od_ad, a1_od_eje, a1_od_esf, a1_oi_ad, a1_oi_cil, a1_oi_eje, a1_oi_esf, a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf,
    dioptrias_receta, 
    // dioptrias_receta, 
    // tipo_de_anteojo 
} from '../../utils'
import { validationOTlevel1, validationOTlevel2 } from '../../utils/validationOT'
import { combinaciones_validas, deshabilitarCampo, setDioptriasReceta, validation_tipo_anteojo } from '../../utils/OTReceta_utils'
import { OTTextInputComponent } from '.'
import { transponer } from '../../utils/FOTReceta_utils'
import TextInputInteractive from '../forms/TextInputInteractive'

// export const inputName = signal(0)

interface IReceta {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any
    onlyRead?:boolean,
    isEditting?:boolean;
    permiso_areas_receta:boolean;
    permiso_usuario_receta:boolean
}

const FOTReceta:React.FC<IReceta> = ({
    control,
    onDataChange,
    formValues,
    data,
    permiso_areas_receta,
    isEditting,
    permiso_usuario_receta
}) => {
    const handleInputChange = (e:any) => {
        let {name, value} = e;
        setDioptriasReceta(name, value)
        onDataChange({[name]:value})
        
        
        console.log(name)
        console.log(value)
        
        validation_tipo_anteojo()
        validationOTlevel1(name, value)
        validationOTlevel2(name, value)
        
        
        combinaciones_validas()


        if(name === 'a1_od_cil' || name === 'a1_od_eje' || name === 'a1_od_ad'){
            console.log('render')
            transponer('a1_od_esf', 'a1_od_cil', 'a1_od_eje', 'a1_od')
        }

        if(name === 'a1_oi_cil' || name === 'a1_oi_eje' || name === 'a1_oi_ad'){
            console.log('render')
            transponer('a1_oi_esf', 'a1_oi_cil', 'a1_oi_eje', 'a1_oi')
        }
    }


  return (
    <form>
        <div className="w-full frameOTForm">
            <div className="w-full flex items-center rowForm !h-[5rem]">
                <div className="w-[23%]  !ml-[1rem]">
                    <SelectInputComponent
                        label="Tipo Anteojo"
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
                        readOnly={isEditting}
                    />
                </div>
                <div className="w-[20%] ">
                    <TextInputComponent
                        type="number"
                        label="Numero de receta"
                        name="numero_receta"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["numero_receta"] : data && data[EnumGrid.numero_receta]}
                        control={control}
                        isOT={true}
                        onlyRead={isEditting}
                        isOptional={true}
                        />
                </div>
                <div className="w-[20%] ml-4 justify-between">
                    <TextInputComponent
                        type="number"
                        label="Total $"
                        name="total"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["total"] : data && data[EnumGrid.total]}
                        control={control}
                        isOT={true}
                        onlyRead={isEditting}
                        isOptional={true}
                        />
                </div>
                <div className="w-[15%] ml-4">
                    <TextInputComponent
                        type="date"
                        label="Fecha receta"
                        name="fecha_receta"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["fecha_receta"] : data && data[EnumGrid.fecha_receta]}
                        control={control}
                        isOT={true}
                        onlyRead={isEditting}
                        isOptional={true}
                        />
                </div>
                <div className="w-[34%] ml-4 mb-[0.3rem]" >
                    <SelectInputComponent
                        label="Oftalmólogo"
                        name="oftalmologo_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["oftalmologo_id"] : data && data[EnumGrid.oftalmologo_id]}
                        control={control}
                        entidad={["/api/oftalmologos/", "02"]}
                        // entidad={["/api/ot/", "12","ESF", "_p3"]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                        readOnly={isEditting}
                        isOptional={true}
                        />
                </div>
            </div>

            <div className="w-full flex items-center rowForm !h-[11rem] relative ">
                <label className='absolute z-10 top-[-10%] w-[15%] left-[36%] text-center text-2xl'>ANTEOJO 1</label>
                <div className=" w-[43%] items-center rowForm !mt-[-10rem] !h-[8rem]  ">
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-10 left-[30%] text-2xl'>OD</label>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="ESF"
                                name="a1_od_esf"
                                handleChange={handleInputChange}
                                otData={data && data[EnumGrid.a1_od_esf] ||  a1_od_esf.value}
                                control={control}
                                onlyRead={ !(permiso_usuario_receta && permiso_areas_receta)}
                            />
                        </div>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="CIL"
                                name="a1_od_cil"
                                handleChange={handleInputChange}
                                otData={dioptrias_receta.value.a1_od.cil || data && data[EnumGrid.a1_od_cil]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                            />
                        </div>
                        <div className="w-[25%]" tabIndex={-1}>
                            <OTTextInputComponent
                                type="number"
                                label="EJE"
                                name="a1_od_eje"
                                handleChange={handleInputChange}
                                otData={a1_od_eje.value || data && data[EnumGrid.a1_od_eje]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                            />
                        </div>
                        <div className="w-[25%]" tabIndex={-1}>
                            <OTTextInputComponent
                                type="number"
                                label="AD"
                                name="a1_od_ad"
                                handleChange={handleInputChange}
                                otData={ a1_od_ad.value || data && data[EnumGrid.a1_od_ad]}
                                control={control}
                                onlyRead={!(deshabilitarCampo.value.a1_ad && (!isEditting || (permiso_usuario_receta && permiso_areas_receta))) }
                            />
                        </div>
                    </div>    
                </div>

                <div className=" w-[43%] items-center rowForm !h-[8rem]">
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-10 left-[30%] text-2xl'>OI</label>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="ESF"
                                name="a1_oi_esf"
                                handleChange={handleInputChange}
                                otData={ a1_oi_esf.value || data && data[EnumGrid.a1_oi_esf]}
                                control={control}
                                // isOT={true}

                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="CIL"
                                name="a1_oi_cil"
                                handleChange={handleInputChange}
                                otData={a1_oi_cil.value || data && data[EnumGrid.a1_oi_cil]}
                                control={control}
                                // isOT={true}

                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="EJE"
                                name="a1_oi_eje"
                                handleChange={handleInputChange}
                                otData={a1_oi_eje.value || data && data[EnumGrid.a1_oi_eje]}
                                control={control}
                                // isOT={true}

                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                // error={errors.fecha_nacimiento}permiso_usuario_receta
                            />
                        </div>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="AD"
                                name="a1_oi_ad"
                                handleChange={handleInputChange}
                                otData={a1_oi_ad.value|| data && data[EnumGrid.a1_oi_ad]}
                                control={control}
                                // isOT={true}
                                onlyRead={!(deshabilitarCampo.value.a1_ad && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)))}
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
                            onlyRead={!(permiso_usuario_receta && permiso_areas_receta)}
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
                            onlyRead={!(deshabilitarCampo.value.a1_alt && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)))}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center rowForm !h-[11rem] relative ">
                <label className='absolute z-10 top-[-10%] w-[15%] left-[36%] text-center text-2xl'>ANTEOJO 2</label>
                <div className=" w-[43%] items-center  !mt-[-4rem] !h-[8rem] rowForm ">
                    <div className="w-[90%] mx-auto flex items-center  !h-[8rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-10 left-[30%] text-2xl'>OD</label>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="ESF"
                                name="a2_od_esf"
                                handleChange={handleInputChange}
                                otData={ a2_od_esf.value || data && data[EnumGrid.a2_od_esf]}
                                // data={a2_od_esf}
                                control={control}
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

                <div className=" w-[43%] items-center rowForm !h-[8rem]">
                <div className="w-[90%] mx-auto flex items-center h-[8rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-10 left-[30%] text-2xl'>OI</label>
                        <div className="w-[25%]">
                            <TextInputInteractive
                                type="number"
                                label="ESF"
                                name="a2_oi_esf"
                                handleChange={handleInputChange}
                                data={a2_oi_esf.value || data && data[EnumGrid.a2_oi_esf]}
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

                                onlyRead={!(deshabilitarCampo.value.a2_dp && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)))}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center rowForm !h-[3rem] relative ">
                <div className="w-[104%] ml-2">
                    <TextInputComponent
                        type="text"
                        label="Observaciones"
                        name="observaciones"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["observaciones"] : data && data[EnumGrid.observaciones]}
                        control={control}
                        onlyRead={isEditting}
                        isOptional={true}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
            </div>
        </div>
    </form>
  )
}

export default FOTReceta