import React from 'react'
import { SelectInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2, validationOTlevel3,  } from '../../utils/validationOT';
import SelectInputTiposComponent from '../forms/SelectInputTiposComponent';
import { A1_CR_OD, A1_CR_OI, A1_GRUPO_OD, A1_GRUPO_OI, A2_CR_OD, A2_CR_OI, A2_Diametro, A2_GRUPO_OD, A2_GRUPO_OI, codigoProyecto, inputOnlyReadBodegaProcesado, tipo_de_anteojo, validacionIncompleta, validar_cristal1_od, validar_cristal1_oi, validar_cristal2_od, validar_cristal2_oi } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';
// import { OTTextInputComponent } from '.';
// import { validationNivel3 } from '../../views/forms/FOT';
// import { AppStore, useAppSelector } from '../../../redux/store';


interface ICristales {
    control: any,
    onDataChange: any,
    formValues: any,
    formValuesCompleto?:any
    data: any,
    onlyRead?: boolean,
    a2Grupo?: any,
    isEditting?: boolean;
    permiso_usuario_cristales?: boolean,
    permiso_areas_cristales: boolean;
    permiso_areas_grupo_dioptria: boolean;
    permiso_usuario_grupo_dioptria: boolean;
    permiso_usuario_verificar_cristal:boolean;
    permiso_area_verificar_cristal: boolean;
}


const FOTCristales: React.FC<ICristales> = ({
    control,
    onDataChange,
    formValues,
    data,
    permiso_usuario_cristales,
    permiso_areas_cristales,
    permiso_areas_grupo_dioptria,
    permiso_usuario_grupo_dioptria,
    // permiso_usuario_verificar_cristal,
    // permiso_area_verificar_cristal,
    isEditting,
    formValuesCompleto
}) => {
    const [inputsRef] = React.useState({
        firstInputRef : React.useRef<HTMLInputElement>(null),
        lastInputRef : React.useRef<HTMLInputElement>(null),
    })


    const handleInputChange = async (e: any) => {
        const { name, value } = e;

        console.log(name)
        console.log(value)
        onDataChange({ [name]: value.trim() })

        validationOTlevel2(name, value)
        validationOTlevel3(name, value)

        if(name === 'validar_cristal1_od'){
            validar_cristal1_od.value = value.trim();
        }

        if(name === 'validar_cristal1_oi'){
            validar_cristal1_oi.value = value.trim(); 
        }

        if(name === 'validar_cristal2_od'){
            validar_cristal2_od.value = value.trim(); 
        }

        if(name === 'validar_cristal2_oi'){
            validar_cristal2_oi.value = value.trim(); 
        }
        console.log(formValuesCompleto)
    }


    const gruposDioptrias: any = {
        "A1_GRUPO_OI": () => {
            return {
                label: "Grupo 1 OI",
                name: "cristal1_grupo1_oi",
                data: A1_GRUPO_OI.value
            }
        },
        "A1_GRUPO_OD": () => {
            return {
                label: "Grupo 1 OD",
                name: "cristal1_grupo1_od",
                data: A1_GRUPO_OD.value
            }
        },
        "A2_GRUPO_OI": () => {
            return {
                label: "Grupo 2 OI",
                name: "cristal2_grupo2_oi",
                data: A2_GRUPO_OI.value
            }
        },
        "A2_GRUPO_OD": () => {
            return {
                label: "Grupo 2 OD",
                name: "cristal2_grupo2_od",
                data: A2_GRUPO_OD.value
            }
        }
    }


    const renderGrupo1 = (grupo: string) => {

        const {label, name, data} = gruposDioptrias[grupo]()
        
        
       return (<div className=''>
                <div className="">
                    <TextInputInteractive   
                        type='text'
                        label={label}
                        name={name}
                        data={data}
                        control={control}
                        // onlyRead={!(permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)}
                        onlyRead={true}
                        // onlyRead={ name === 'cristal2_grupo2_oi' || name === 'cristal2_grupo2_od' ? (!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3' ))) : !(isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)  }
                        textAlign="text-center"
                        className='!text-base custom-input !w-[17rem]'
                        labelProps={"!translate-y-[-1.8vw] !text-[1.4vw]"}
                        customWidth={"!h-[2.5vw] !text-[1vw]"}
                        />  
                </div>
            </div>)
      }



    const handleKeyDown: any = React.useCallback((e:KeyboardEvent) => {

        const focusedElement = document.activeElement;
        if (focusedElement instanceof HTMLInputElement) {
            const inputName = focusedElement.name;
            console.log(inputName)
            console.log(document.activeElement?.localName)
            const inputRefName =  tipo_de_anteojo.value === '3' ? 'cristal2_tratamiento_adicional_id' : 'cristal1_tratamiento_adicional_id';

            if(inputName === inputRefName && e.key === 'Tab'){
                inputsRef.firstInputRef.current?.focus()
            }
        }
    
      }, [inputsRef]);
    
    React.useEffect(()=>{
        if(inputsRef.firstInputRef){
            inputsRef.firstInputRef.current?.focus();
        }
    },[])



    console.log(inputOnlyReadBodegaProcesado.value)


    return (
        <form onKeyDown={handleKeyDown}>
            <div className='w-full flex frameOTForm h-[85vh]'>
                <div className=" w-[50vw] relative !mt-[2rem] !h-[30vw]">
                    <div className=" flex items-center radioComponent  h-[80vh] w-full !ml-[1rem]">
                        <div className="mx-auto !mt-6 w-[50vw] !h-full ">
                            <h1 className='absolute z-10 top-[-6%] text-2xl w-[30%] text-center !text-[#f8b179] left-[4%]'>ANTEOJO 1</h1>
                            <div className="w-full">
                                <div className="w-full flex mt-6 rowForm justify-between ">
                                    <div className="!ml-[1rem] w-[25vw] ">
                                        <SelectInputComponent
                                            label="Marca"
                                            name="cristal1_marca_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_marca_id"] ? formValues["cristal1_marca_id"] : data && data[EnumGrid.cristal1_marca_id]}
                                            control={control}
                                            entidad={["/api/marcas/", "02", "2"]}
                                            // error={errors.establecimiento}
                                            
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}
                                            inputRef={inputsRef.firstInputRef}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                        />
                                    </div>
                                    <div className=" w-[25vw]">
                                        <SelectInputTiposComponent
                                            label='Diseño'
                                            name='cristal1_diseno_id'
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_diseno_id"] ? formValues["cristal1_diseno_id"] : data && data[EnumGrid.cristal1_diseno_id]}
                                            entidad={"CristalesDisenos"}
                                            control={control}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}
                                            
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex rowForm  ">
                                    <div className="!ml-[1rem] w-[25vw]">
                                        <SelectInputTiposComponent
                                            label='Índice'
                                            name='cristal1_indice_id'
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_indice_id"] ? formValues["cristal1_indice_id"] : data && data[EnumGrid.cristal1_indice_id]}
                                            control={control}
                                            entidad={'CristalesIndices'}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                        />
                                    </div>

                                    <div className="w-[25vw]">
                                        <SelectInputTiposComponent
                                            label='Material'
                                            name="cristal1_material_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_material_id"] ? formValues["cristal1_material_id"] : data && data[EnumGrid.cristal1_material_id]}
                                            control={control}
                                            entidad={'CristalesMateriales'}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!ml-[1rem] w-[25vw]">
                                        <SelectInputTiposComponent
                                            label='Color'
                                            name="cristal1_color_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_color_id"] ? formValues["cristal1_color_id"] : data && data[EnumGrid.cristal1_color_id]}
                                            control={control}
                                            entidad={"CristalesColores"}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}
                                        />
                                    </div>

                                    <div className=" w-[25vw]">
                                        <SelectInputTiposComponent
                                            label='Tratamiento'
                                            name="cristal1_tratamiento_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_tratamiento_id"] ? formValues["cristal1_tratamiento_id"] : data && data[EnumGrid.cristal1_tratamiento_id]}
                                            control={control}
                                            entidad={"CristalesTratamientos"}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}
                                        />
                                    </div>
                                </div>

                                <div className="w-full  flex mt-6 rowForm centertDIV  relative">
                                    {/* {permiso_area_verificar_cristal && (
                                    <div className="w-[40%] absolute -left-0">
                                            <OTTextInputComponent
                                                type="text"
                                                label="Validar Cristal OD"
                                                name="validar_cristal1_od"
                                                handleChange={handleInputChange}
                                                otData={ validar_cristal1_od.value ? validar_cristal1_od.value :  formValues && formValues["validar_cristal1_od"]}
                                                control={control}
                                                // isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                                className='!text-xl custom-input !w-[12rem]'
                                            />

                                    </div>

                                    )} */}

                                    <div className="w-[20%] mr-2 translate-y-11">
                                        <TextInputInteractive
                                            control={control}
                                            type="number"
                                            label="Diámetro"
                                            name="cristal1_diametro"
                                            handleChange={handleInputChange}
                                            isOT={true}
                                            data={formValues && formValues["cristal1_diametro"] ? formValues["cristal1_diametro"] : data && data[EnumGrid.cristal1_diametro]}
                                            onlyRead={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}                                        // error={errors.fecha_nacimiento}
                                            textAlign="text-center"
                                            labelProps={"!translate-y-[-1.5vw] !text-[1.4vw]"}
                                            customWidth={"!h-[2.5vw] !text-[1.4vw]"}
                                        />

                                    </div>
                                    {/* {permiso_area_verificar_cristal && (
                                        <div className="w-[40%] absolute right-0">
                                            <OTTextInputComponent
                                                type="text"
                                                label="Validar Codigo Cristal OI"
                                                name="validar_cristal1_oi"
                                                handleChange={handleInputChange}
                                                otData={ validar_cristal1_oi.value ? validar_cristal1_oi.value  : formValues && formValues["validar_cristal1_oi"]}
                                                control={control}
                                                // isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                                className='!text-xl custom-input !w-[12rem]'
                                            />

                                        </div>

                                    )} */}

                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!w-[50%] !pr-[1rem] !translate-y-16">
                                        <TextInputInteractive
                                            type="text"
                                            label="Código Cristal OD"
                                            name="cristal1_od"
                                            handleChange={handleInputChange}
                                            data={A1_CR_OD.value || data && data[EnumGrid.cristal1_od]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                            // onlyRead={!(!isEditting || (permiso_areas_cristales && permiso_usuario_cristales))  || inputOnlyReadBodegaProcesado.value}
                                            textAlign="text-center"
                                            className={`!text-xl custom-input !w-[17rem]  ${validacionIncompleta.value.a1_od === true ? "!bg-red-600 opacity-60" : ""} `}
                                            error={true}
                                            labelProps={"!translate-y-[-1.8vw] !text-[1.4vw]"}
                                            customWidth={"!h-[2.5vw] !text-[1.7vw]"}
                                        />
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem] !translate-y-16">
                                        <TextInputInteractive
                                            type="text"
                                            label="Código Cristal OI"
                                            name="cristal1_oi"
                                            isOT={true}
                                            handleChange={handleInputChange}
                                            data={A1_CR_OI.value || data && data[EnumGrid.cristal1_oi]}
                                            control={control}
                                            onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                            textAlign="text-center"
                                            className={` custom-input !w-[17rem]  ${validacionIncompleta.value.a1_oi === true ? "!bg-red-600 opacity-60" : ""} `}
                                            labelProps={"!translate-y-[-1.8vw] !text-[1.4vw]"}
                                            customWidth={"!h-[2.5vw] !text-[1.7vw]"}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm translate-y-28">
                                    <div className="!w-[50%] !pr-[1rem]">
                                        {renderGrupo1("A1_GRUPO_OD")}
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                        {renderGrupo1("A1_GRUPO_OI")}
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="w-full !pr-[2rem] translate-y-52 translate-x-4">
                                        <SelectInputTiposComponent
                                            label='Tratamiento adicional'
                                            name='cristal1_tratamiento_adicional_id'
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_tratamiento_adicional_id"] ? formValues["cristal1_tratamiento_adicional_id"] : data && data[EnumGrid.cristal1_tratamiento_adicional_id]}
                                            control={control}
                                            entidad={['OTTratamientoAdicional', codigoProyecto.value]}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)) || inputOnlyReadBodegaProcesado.value}
                                            isOptional={true}
                                            inputRef={ tipo_de_anteojo.value === '3' ? null : inputsRef.lastInputRef}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-1/2 relative !mt-[2rem] !h-[90vh] !mr-[1rem]">
                    <div className=" flex items-center ml-2  radioComponent h-[80vh] !mr-[1rem]">
                        <div className="mx-auto !mt-6 !h-full w-[50vw]">
                            <h1 className='absolute z-10 top-[-6%] text-2xl w-[30%] text-center !text-[#f8b179] left-[4%]'>ANTEOJO 2</h1>
                            <div className="w-full  !-mb-4 !ml-[1rem]">
                                <div className="w-full flex mt-6 rowForm">
                                    <div className="!ml-[1rem] w-[25vw]">
                                        <SelectInputComponent
                                            label="Marca"
                                            name="cristal2_marca_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_marca_id"] ? formValues["cristal2_marca_id"] : data && data[EnumGrid.cristal2_marca_id]}
                                            control={control}
                                            entidad={["/api/marcas/", "02", "2"]}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3')) || inputOnlyReadBodegaProcesado.value}
                                            isFOTcristales={true}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                        />
                                    </div>
                                    <div className="w-[25vw]">
                                        <SelectInputTiposComponent
                                            label="Diseño"
                                            name="cristal2_diseno_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_diseno_id"] ? formValues["cristal2_diseno_id"] : data && data[EnumGrid.cristal2_diseno_id]}
                                            control={control}
                                            entidad={"CristalesDisenos"}
                                            FOTcristales={true}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3')) || inputOnlyReadBodegaProcesado.value}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm">
                                    <div className="ml-[1rem] w-[25vw]">
                                        <SelectInputTiposComponent
                                            label="Índice"
                                            name="cristal2_indice_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_indice_id"] ? formValues["cristal2_indice_id"] : data && data[EnumGrid.cristal2_indice_id]}
                                            control={control}
                                            entidad={"CristalesIndices"}
                                            FOTcristales={true}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (((isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3' )))) || inputOnlyReadBodegaProcesado.value }
                                        />
                                    </div>

                                    <div className="w-[25vw]">
                                        <SelectInputTiposComponent
                                            label="Material"
                                            name="cristal2_material_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_material_id"] ? formValues["cristal2_material_id"] : data && data[EnumGrid.cristal2_material_id]}
                                            control={control}
                                            FOTcristales={true}
                                            entidad={"CristalesMateriales"}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3')) || inputOnlyReadBodegaProcesado.value}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm">
                                    <div className="ml-[1rem] w-[25vw]">
                                        <SelectInputTiposComponent
                                            label="Color"
                                            name="cristal2_color_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_color_id"] ? formValues["cristal2_color_id"] : data && data[EnumGrid.cristal2_color_id]}
                                            control={control}
                                            FOTcristales={true}
                                            entidad={"CristalesColores"}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3')) || inputOnlyReadBodegaProcesado.value}
                                        />
                                    </div>

                                    <div className="w-[25vw]">
                                        <SelectInputTiposComponent
                                            label="Tratamiento"
                                            name="cristal2_tratamiento_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_tratamiento_id"] ? formValues["cristal2_tratamiento_id"] : data && data[EnumGrid.cristal2_tratamiento_id]}
                                            control={control}
                                            entidad={"CristalesTratamientos"}
                                
                                            FOTcristales={true}
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                            labelProps={" bg-wite"}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3')) || inputOnlyReadBodegaProcesado.value}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm centertDIV relative">
                                {/* {permiso_area_verificar_cristal && (tipo_de_anteojo.value === '3' as any) && (
                                    <div className="w-[40%] absolute -left-0">
                                            <OTTextInputComponent
                                                type="text"
                                                label="Validar Cristal OD"
                                                name="validar_cristal2_od"
                                                handleChange={handleInputChange}
                                                otData={validar_cristal2_od.value ? validar_cristal2_od.value : formValues && formValues["validar_cristal2_od"]}
                                                control={control}
                                                // isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                                className='!text-xl custom-input !w-[12rem]'
                                            />

                                    </div>

                                    )} */}

                                <div className="w-[20%] mr-2 translate-y-11">
                                    <TextInputInteractive
                                        type="number"
                                        label="Diámetro"
                                        name="cristal2_diametro"
                                        handleChange={handleInputChange}
                                        data={A2_Diametro.value || data && data[EnumGrid.cristal2_diametro]}
                                        control={control}
                                        isOT={true}
                                        onlyRead={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3')) || inputOnlyReadBodegaProcesado.value}
                                        textAlign="text-center"
                                        labelProps={"!translate-y-[-1.5vw] !text-[1.4vw]"}
                                            customWidth={"!h-[2.5vw] !text-[1.4vw]"}
                                        
                                    />
                                </div>

                                {/* {permiso_area_verificar_cristal && (tipo_de_anteojo.value === '3' as any) && (
                                        <div className="w-[40%] absolute right-0">
                                            <OTTextInputComponent
                                                type="text"
                                                label="Validar Codigo Cristal OI"
                                                name="validar_cristal2_oi"
                                                handleChange={handleInputChange}
                                                otData={ validar_cristal2_oi.value ? validar_cristal2_oi.value : formValues && formValues["validar_cristal2_oi"]}
                                                control={control}
                                                // isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                                className='!text-xl custom-input !w-[12rem]'
                                            />

                                        </div>

                                    )} */}


                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!w-[50%] !pr-[1rem] !translate-y-16">
                                        <TextInputInteractive
                                            type="text"
                                            label="Código Cristal OD"
                                            name="cristal2_od"
                                            handleChange={handleInputChange}
                                            data={A2_CR_OD.value || data && data[EnumGrid.cristal2_od] }
                                            control={control}
                                            isOT={true}
                                            onlyRead={!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
                                            textAlign="text-center"
                                            className={`!text-xl custom-input !w-[17rem]  ${validacionIncompleta.value.a2_od === true ? "!bg-red-600 opacity-60" : ""} `}
                                            labelProps={"!translate-y-[-1.8vw] !text-[1.4vw]"}
                                            customWidth={"!h-[2.5vw] !text-[1.7vw]"}
                                            />
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem] !translate-y-16">
                                        <TextInputInteractive
                                            type="text"
                                            label="Código Cristal OI"
                                            name="cristal2_oi"
                                            handleChange={handleInputChange}
                                            data={A2_CR_OI.value ||  data && data[EnumGrid.cristal2_oi]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
                                            textAlign="text-center"
                                            className={`!text-xl custom-input !w-[17rem]  ${validacionIncompleta.value.a2_oi === true ? "!bg-red-600 opacity-60" : ""} `}
                                            labelProps={"!translate-y-[-1.8vw] !text-[1.4vw]"}
                                            customWidth={"!h-[2.5vw] !text-[1.7vw]"}
                                            />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm  !translate-y-28">
                                    <div className="!w-[50%] !pr-[1rem]">
                                        {renderGrupo1("A2_GRUPO_OD")}
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                        {renderGrupo1("A2_GRUPO_OI")}
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="w-full !pr-[2rem] translate-y-52 translate-x-4">
                                        <SelectInputTiposComponent
                                            label="Tratamiento adicional"
                                            name="cristal2_tratamiento_adicional_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_tratamiento_adicional_id"] ? formValues["cristal2_tratamiento_adicional_id"] : data && data[EnumGrid.cristal2_tratamiento_adicional_id]}
                                            control={control}
                                            entidad={"OTTratamientoAdicional"}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                            FOTcristales={true}
                                            isOptional={true}
                                            inputRef={ tipo_de_anteojo.value === '3' ? inputsRef.lastInputRef : null }
                                            customWidth={"!h-[2.5vw] text-[1vw]"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
{/* <SelectInputTiposComponent
                                        label='Opción Venta'
                                        name='cristal1_opcion_vta_id'
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_opcion_vta_id"] : data && data[EnumGrid.cristal1_opcion_vta_id]}
                                        control={control}
                                        entidad='OTOpcionVentaCristales'
                                        // readOnly={ isEditting  || !(permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)}
                                        readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                    /> */}

{/* <SelectInputTiposComponent
                                        label="Opcion de Venta"
                                        name="cristal2_od_opcion_venta_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_od_opcion_venta_id"] : data && data[EnumGrid.cristal2_od_opcion_venta_id]}
                                        control={control}
                                        entidad='OTOpcionVentaCristales'
                                        readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        FOTcristales={true}
                                      /> */}
{/* <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                        </div>  
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[20%]">
                        </div>   */}
{/* <h1 className='labelForm absolute z-10 top-[-6%] text-2xl w-[30%] !text-[#f8b179] text-center left-[4%]'>ANTEOJO 2</h1> */ }
{/* <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                            {renderGrupo1("A2_GRUPO_OI")}
                        </div>

                        <div className="w-[35%] absolute top-[-5%] labelForm right-[20%]">
                            {renderGrupo1("A2_GRUPO_OD")}
                        </div> */}

export default FOTCristales