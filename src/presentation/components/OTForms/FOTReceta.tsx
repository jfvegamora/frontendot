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
    permisos_receta:boolean;
    permisos_areas_receta:boolean
}

const FOTReceta:React.FC<IReceta> = ({
    control,
    onDataChange,
    formValues,
    data,
    permisos_receta,
    isEditting,
    permisos_areas_receta
}) => {
    const handleInputChange = (e:any) => {
        let {name, value} = e;
        setDioptriasReceta(name, value)
        onDataChange({[name]:value})
        
        
        console.log(name)
        console.log(value)
        
        
        // if(name === 'tipo_anteojo_id'){
        //     if(value === '3'){
        //         tipo_de_anteojo.value = '3'
        //         console.log('render')
        //         // reiniciarA2DioptriasReceta()
        //         // clearDioptriasA2(" ")
        //     }else{
        //         console.log('distinto de lejos/cerca')
        //     }
        // //   setTipoAnteojo(value)

        // }
        
        
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
        // if(tipo_de_anteojo.value === '3'){
        //     console.log('render')
        //     if(name === 'a1_od_cil' || name === 'a1_od_eje'){
        //         console.log('render')
        //         transposicionDioptrias({[name] : value})
        //     }
        // }
    }

    // console.log(dioptriasHabilitadas.value);
    // console.log(deshabilitarCampo.value);
    
    console.log(!(isEditting || (permisos_receta && permisos_areas_receta)))

    console.log(permisos_areas_receta)
    console.log(permisos_receta)

    console.log(isEditting)
    console.log(!isEditting)



    console.log(deshabilitarCampo.value.a1_ad)
//   inputName.value = 90  
  return (
    <form>
        <div className="w-full labelForm  rounded-lg px-8 flex flex-col justify-between !h-[80vh]  py-4 border radioComponent">
            <div className="w-full flex items-center rowForm">
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
                            readOnly={isEditting}
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
                <div className="w-[27%] ">
                                <TextInputComponent
                                    type="number"
                                    label="Numero de receta"
                                    name="numero_receta"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["numero_receta"] : data && data[EnumGrid.numero_receta]}
                                    control={control}
                                    isOT={true}
                                    onlyRead={isEditting}
                                    // error={errors.fecha_nacimiento}
                                />
                </div>
                <div className="w-[15%] ml-4 justify-between">
                                <TextInputComponent
                                    type="number"
                                    label="Total"
                                    name="total"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["total"] : data && data[EnumGrid.total]}
                                    control={control}
                                    isOT={true}
                                    onlyRead={isEditting}
                                    // error={errors.fecha_nacimiento}
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
                                    // error={errors.fecha_nacimiento}
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
                        />

                        
                </div>
                
            </div>

            <div className="w-full flex items-center pt-8  relative pb-8 rounded-lg border radioComponent ">
                
                <label className='absolute z-10 top-[-15%] w-[15%] left-[36%] text-center labelForm text-[#f8b179]   rounded-lg text-2xl'>ANTEOJO 1</label>



                <div className=" w-[43%] items-center rowForm !mt-[-10rem] !h-[8rem]  ">
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-6 left-[30%]'>OJO DERECHO</label>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="ESF"
                                name="a1_od_esf"
                                handleChange={handleInputChange}
                                // data={formValues ? formValues["a1_od_esf"] : data && data[EnumGrid.a1_od_esf]}
                                otData={data && data[EnumGrid.a1_od_esf] ||  a1_od_esf.value}
                                control={control}
                                // isOT={true}
                                onlyRead={ !(isEditting || (permisos_receta && permisos_areas_receta))}
                                // error={errors.fecha_nacimiento}
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
                                onlyRead={!(!isEditting || (permisos_receta && permisos_areas_receta))}
                                // isOT={true}
                                // error={errors.fecha_nacimiento}
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
                                onlyRead={!(!isEditting || (permisos_receta && permisos_areas_receta))}
                                tabIndex={-1}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        <div className="w-[25%] mt-[0.1rem]" tabIndex={-1}>
                            <OTTextInputComponent
                                type="number"
                                label="AD"
                                name="a1_od_ad"
                                handleChange={handleInputChange}
                                otData={ a1_od_ad.value || data && data[EnumGrid.a1_od_ad]}
                                control={control}
                                // isOT={true}
                                tabIndex={-1}
                                onlyRead={!(deshabilitarCampo.value.a1_ad && (!isEditting || (permisos_receta && permisos_areas_receta))) }
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                    </div>    
                </div>

                <div className=" w-[43%] items-center rowForm !h-[8rem]">
                <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-6 left-[30%]'>OJO IZQUIERDO</label>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="number"
                                label="ESF"
                                name="a1_oi_esf"
                                handleChange={handleInputChange}
                                otData={ a1_oi_esf.value || data && data[EnumGrid.a1_oi_esf]}
                                control={control}
                                // isOT={true}

                                onlyRead={!(!isEditting || (permisos_receta && permisos_areas_receta))}
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

                                onlyRead={!(!isEditting || (permisos_receta && permisos_areas_receta))}
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

                                onlyRead={!(!isEditting || (permisos_receta && permisos_areas_receta))}
                                // error={errors.fecha_nacimiento}
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

                                onlyRead={deshabilitarCampo.value.a1_ad && (permisos_receta || permisos_areas_receta)}
                            
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

                                onlyRead={permisos_receta && permisos_areas_receta}
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
                                onlyRead={deshabilitarCampo.value.a1_alt || (permisos_receta || permisos_areas_receta)}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center   pt-8 relative pb-8 rounded-lg labelForm  border radioComponent">
                <label className='absolute z-10 top-[-15%] w-[15%] left-[36%] text-center labelForm text-[#f8b179] rounded-lg text-3xl'>ANTEOJO 2</label>



                <div className=" w-[43%] items-center !mt-[-10rem] !h-[8rem] rowForm ">
                    <div className="w-[90%] mx-auto flex items-center !h-[8rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-6 left-[30%]'>OJO DERECHO</label>
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
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-6 left-[30%]'>OJO IZQUIERDO</label>
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

                                onlyRead={deshabilitarCampo.value.a2_dp}
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