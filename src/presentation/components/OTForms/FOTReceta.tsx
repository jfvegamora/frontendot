import React, { useRef, useState } from 'react'
import { SelectInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOTHistorica'
// import {a1_od_ad, a1_od_cil, a1_od_eje, a1_od_esf, a1_oi_ad, a1_oi_cil, a1_oi_eje, a1_oi_esf, a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, dioptriasHabilitadas, dioptrias_receta, onchangeDioptrias } from '../../utils'
import {A1_ALT, A1_DP, A2_DP, a1_od_ad, a1_od_eje, a1_od_esf, a1_oi_ad, a1_oi_esf, a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf,
    dioptrias_receta,
    oftalmologo_id,
    tipo_de_anteojo, 
    // dioptrias_receta, 
    // tipo_de_anteojo 
} from '../../utils'
import { validationOTlevel1, validationOTlevel2, validation_A1_DP } from '../../utils/validationOT'
import { combinaciones_validas, deshabilitarCampo, setDioptriasReceta } from '../../utils/OTReceta_utils'
import { OTTextInputComponent } from '.'
import { transponer } from '../../utils/FOTReceta_utils'
import TextInputInteractive from '../forms/TextInputInteractive'
import { inputOnlyReadReserva } from '../../utils/FReservaArmazones_utils'

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

    const [_isRender, setIsRender] = useState(false);

    const firstInputRef   = useRef<HTMLInputElement | null>(null);
    const secondInputRef  = useRef<HTMLInputElement | null>(null);
     
    const [inputsRef] = useState({
        firstInputRef : React.useRef<HTMLInputElement>(null),
        lastInputRef : React.useRef<HTMLInputElement>(null),
    })


    const handleInputChange = async(e:any) => {
        let {name, value} = e;
        console.log(name)
        setDioptriasReceta(name, value)
        
        validationOTlevel1(name, value)
        validationOTlevel2(name, value)
        
        combinaciones_validas()
        
        
        if(name === 'a1_od_cil' || name === 'a1_od_eje' || name === 'a1_od_ad'){
            transponer('a1_od_esf', 'a1_od_cil', 'a1_od_eje', 'a1_od',firstInputRef)
            onDataChange({[name]:value})
        }
        
        if(name === 'a1_oi_cil' || name === 'a1_oi_eje' || name === 'a1_oi_ad'){
            transponer('a1_oi_esf', 'a1_oi_cil', 'a1_oi_eje', 'a1_oi', secondInputRef)
            onDataChange({[name]:value})
        }
        onDataChange({[name]:value})
    }

    React.useEffect(()=>{
        validation_A1_DP(A1_DP.value);
    },[A1_DP.value])



    
    const handleKeyDown: any = React.useCallback((e:KeyboardEvent) => {
        const focusedElement = document.activeElement;
        if (focusedElement instanceof HTMLInputElement) {
            const inputName = focusedElement.name;
            if(inputName === 'observaciones' && e.key === 'Tab'){
                inputsRef.firstInputRef.current?.focus()
            }
        }
    
      }, [inputsRef]);
    
    React.useEffect(()=>{
        if(inputsRef.firstInputRef){
            inputsRef.firstInputRef.current?.focus();
        }
    },[])


  return (
    <form onKeyDown={handleKeyDown}>
        <div className="frameOTForm h-[85vh]">
            <div className="w-full flex  items-center rowForm !h-[6vw] ">
                <div className="w-[23vw] labelInput !ml-[2rem] mt-2">
                    <SelectInputComponent
                        label="Tipo Anteojo"
                        name="tipo_anteojo_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={tipo_de_anteojo.value || data && data[EnumGrid.tipo_anteojo_id]}
                        control={control}
                        entidad={["/api/tipos/", "02","OTTipoAnteojo"]}
                        // entidad={["/api/ot/", "12","ESF", "_p3"]}
                        // error={errors.establecimiento}
    
                        readOnly={isEditting  || inputOnlyReadReserva.value}
                        onlyFirstOption={isEditting}
                        inputRef={inputsRef.firstInputRef}
                        customWidth={"!h-[3vw] labelInput"}
                    />
                </div>
                <div className="w-[20%] labelInput">
                    <TextInputInteractive
                        type="number"
                        label="Número de receta"
                        name="numero_receta"
                        handleChange={handleInputChange}
                        data={formValues && formValues["numero_receta"] ? formValues["numero_receta"] : data && data[EnumGrid.numero_receta]}
                        control={control}
                        isOT={true}
                        onlyRead={isEditting}
                        isOptional={true}
                        textAlign="text-center"
                        customWidth={"!h-[3vw] labelInput"}
                        />
                </div>
                
                <div className="w-[15%] ml-4 labelInput">
                    <TextInputInteractive
                        type="date"
                        label="Fecha receta"
                        name="fecha_receta"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["fecha_receta"] : data && data[EnumGrid.fecha_receta]}
                        control={control}
                        isOT={true}
                        onlyRead={isEditting}
                        isOptional={true}
                        textAlign="text-center"
                        customWidth={"!h-[3vw] labelInput"}
                        />
                </div>
                <div className="w-[34%] ml-4 mb-[0.3rem] mt-5 labelInput" >
                    <SelectInputComponent
                        label="Oftalmólogo"
                        name="oftalmologo_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={oftalmologo_id.value || data && data[EnumGrid.oftalmologo_id]}
                        control={control}
                        entidad={["/api/oftalmologos/", "02"]}
                        // entidad={["/api/ot/", "12","ESF", "_p3"]}
                  
                        readOnly={isEditting}
                        isOptional={true}
                        onlyFirstOption={isEditting}
                        customWidth={"!h-[3vw] labelInput"}
                        labelProps={"!text-[1vw]"}
                    />
                </div>
            </div>




            <div className="w-full flex items-center rowForm !h-[9vw] relative  translate-y-11 ">
                <label className='labelAnteojo !text-[1.9vw] -translate-y-11'>ANTEOJO 1</label>
                <div className=" w-[43vw] items-center rowForm  !h-[8rem]  ">
                    <div className="w-[90%] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-14 left-[30%] text-[2vw]'>OD</label>
                        <div className="w-[10vw] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="ESF"
                                name="a1_od_esf"
                                handleChange={handleInputChange}
                                otData={a1_od_esf.value || data && data[EnumGrid.a1_od_esf]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                textAlign="text-center"
                                step={0.25}
                                customWidth={"labelInput inputStyles"}

                                // labelProps={"!translate-y-[-1.5vw] !text-[1.4vw]"}
                                />
                        </div>
                        <div className="w-[10vw] labelInput">
                            <OTTextInputComponent
                                type="test"
                                label="CIL"
                                name="a1_od_cil"
                                handleChange={handleInputChange}
                                otData={dioptrias_receta.value.a1_od.cil || data && data[EnumGrid.a1_od_cil]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                textAlign="text-center"
                                step={0.25}
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        <div className="w-[10vw] labelInput" tabIndex={-1}>
                            <OTTextInputComponent
                                type="text"
                                label="EJE"
                                name="a1_od_eje"
                                handleChange={handleInputChange}
                                otData={a1_od_eje.value || data && data[EnumGrid.a1_od_eje]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                textAlign="text-center"
                                step={1}
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        <div className="w-[10vw] labelInput" tabIndex={-1}>
                            <OTTextInputComponent
                                type="text"
                                label="AD"
                                name="a1_od_ad"
                                handleChange={handleInputChange}
                                otData={ a1_od_ad.value || data && data[EnumGrid.a1_od_ad]}
                                control={control}
                                onlyRead={!(deshabilitarCampo.value.a1_ad && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)))  }
                                textAlign="text-center"
                                step={0.25}
                                inputRef={firstInputRef}
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                    </div>    
                </div>

                <div className=" w-[43vw] items-center rowForm !h-[8rem]">
                    <div className="w-[90] mx-auto flex items-center h-[9rem] relative labelForm  rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-14 left-[30%] text-[2vw]'>OI</label>
                        <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="ESF"
                                name="a1_oi_esf"
                                handleChange={handleInputChange}
                                otData={ a1_oi_esf.value || data && data[EnumGrid.a1_oi_esf]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                textAlign="text-center"
                                step={0.25}
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="CIL"
                                name="a1_oi_cil"
                                handleChange={handleInputChange}
                                otData={dioptrias_receta.value.a1_oi.cil || data && data[EnumGrid.a1_oi_cil]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                textAlign="text-center"
                                step={0.25}
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="EJE"
                                name="a1_oi_eje"
                                handleChange={handleInputChange}
                                otData={dioptrias_receta.value.a1_oi.eje || data && data[EnumGrid.a1_oi_eje]}
                                control={control}
                                onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                                textAlign="text-center"
                                renderComponent={setIsRender}
                                customWidth={"labelInput inputStyles"}

                                
                                />
                        </div>
                        <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="AD"
                                name="a1_oi_ad"
                                handleChange={handleInputChange}
                                otData={a1_oi_ad.value|| data && data[EnumGrid.a1_oi_ad]}
                                control={control}
                                onlyRead={!(deshabilitarCampo.value.a1_ad && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)))}
                                textAlign="text-center"
                                step={0.25}
                                inputRef={secondInputRef}
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                    </div>    
                </div>
                <div className="w-[14vw] items-center ">
                    <div className="w-[70%] mx-auto labelInput">
                        <TextInputInteractive
                            type="number"
                            label="DP"
                            name="a1_dp"
                            handleChange={handleInputChange}
                            data={A1_DP.value ||  data && data[EnumGrid.a1_dp]}
                            control={control}
                            isOT={true}
                            onlyRead={!(!isEditting || (permiso_usuario_receta && permiso_areas_receta))}
                            textAlign="text-center"
                            customWidth={"labelInput inputStyles"}
                            />
                    </div>
                    <div className="w-[70%] mx-auto mt-10 labelInput">
                        <TextInputInteractive
                            type="number"
                            label="ALT"
                            name="a1_alt"
                            handleChange={handleInputChange}
                            data={A1_ALT.value || data && data[EnumGrid.a1_alt]}
                            control={control}
                            isOT={true}
                            onlyRead={!(deshabilitarCampo.value.a1_alt && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)))}
                            textAlign="text-center"
                            customWidth={"labelInput inputStyles"}
                            />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center rowForm translate-y-32 !h-[9vw] relative">
                <label className='absolute z-10 top-[-10%] w-[15%] left-[36%] text-center text-[2vw] -translate-y-8'>ANTEOJO 2</label>
                <div className=" w-[43%] items-center  !h-[8rem] rowForm ">
                    <div className="w-[90%] mx-auto flex items-center  !h-[8rem] relative labelForm  rounded-lg border radioComponent">
                    <label className='labelForm w-[40%] absolute z-10 text-center -top-14 left-[30%] text-[2vw]'>OD</label>
                    <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="ESF"
                                name="a2_od_esf"
                                handleChange={handleInputChange}
                                otData={ a2_od_esf.value || data && data[EnumGrid.a2_od_esf]}
                                control={control}
                                onlyRead={true}
                                textAlign="text-center"
                                customWidth={"labelInput inputStyles"}

                                
                                />
                        </div>
                        <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="CIL"
                                name="a2_od_cil"
                                handleChange={handleInputChange}
                                otData={a2_od_cil ? a2_od_cil : data && data[EnumGrid.a2_od_cil]}
                                control={control}
                                onlyRead={true}
                                textAlign="text-center"
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="text"
                                label="EJE"
                                name="a2_od_eje"
                                handleChange={handleInputChange}
                                otData={a2_od_eje ? a2_od_eje : data && data[EnumGrid.a2_od_eje]}
                                onlyRead={true}
                                control={control}
                                textAlign="text-center"
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                       
                    </div>    
                </div>

                <div className=" w-[43%] items-center rowForm !h-[8rem]">
                <div className="w-[100%] mx-auto flex items-center h-[8rem] relative labelForm   rounded-lg border radioComponent">
                        <label className='labelForm w-[40%] absolute z-10 text-center -top-10 left-[30%] text-2xl'>OI</label>
                        <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="ESF"
                                name="a2_oi_esf"
                                handleChange={handleInputChange}
                                otData={a2_oi_esf.value || data && data[EnumGrid.a2_oi_esf]}
                                control={control}
                                // isOT={true}
                                onlyRead={true}
                                textAlign="text-center"
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        <div className="w-[25%] labelInput">
                            <OTTextInputComponent
                                type="text"
                                label="CIL"
                                name="a2_oi_cil"
                                handleChange={handleInputChange}
                                otData={a2_oi_cil.value ||  data && data[EnumGrid.a2_oi_cil]}
                                control={control}
                                // isOT={true}
                                onlyRead={true}
                                textAlign="text-center"
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        <div className="w-[25%]">
                            <OTTextInputComponent
                                type="text"
                                label="EJE"
                                name="a2_oi_eje"
                                handleChange={handleInputChange}
                                otData={a2_oi_eje.value || data && data[EnumGrid.a2_oi_eje]}
                                control={control}
                                // isOT={true}
                                onlyRead={true}
                                textAlign="text-center"
                                customWidth={"labelInput inputStyles"}

                                />
                        </div>
                        
                </div>    
                </div>

                <div className="w-[14%] items-center ">
                    <div className="w-[70%] mx-auto labelInput">
                            <TextInputInteractive
                                type="number"
                                label="DP"
                                name="a2_dp"
                                handleChange={handleInputChange}
                                data={A2_DP.value ? A2_DP.value :  data && data[EnumGrid.a2_dp]}
                                control={control}
                                isOT={true}
                                textAlign="text-center"
                                // onlyRead={!(deshabilitarCampo.value.a2_dp && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)) )}
                                onlyRead={!(deshabilitarCampo.value.a2_dp && (!isEditting || (permiso_usuario_receta && permiso_areas_receta)))}
                                customWidth={"!h-[3vw]  labelInput"}
                                // error={errors.fecha_nacimiento}
                            />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center rowForm !h-[3rem] relative  translate-y-40">
                <div className="w-[104%] ml-2 labelInput">
                    <TextInputInteractive
                        type="text"
                        label="Observaciones"
                        name="observaciones"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["observaciones"] : data && data[EnumGrid.observaciones]}
                        control={control}
                        // onlyRead={isEditting}
                        isOptional={true}
                        isOT={true}
                        customWidth={"!h-[3vw] labelInput"}
                        />
                </div>
            </div>
        </div>
    </form>
  )
}

export default FOTReceta