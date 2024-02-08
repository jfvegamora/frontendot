import React from 'react'
import { SelectInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2, validationOTlevel3,  } from '../../utils/validationOT';
import SelectInputTiposComponent from '../forms/SelectInputTiposComponent';
import { A1_CR_OD, A1_CR_OI, A1_GRUPO_OD, A1_GRUPO_OI, A2_CR_OD, A2_CR_OI, A2_Diametro, A2_GRUPO_OD, A2_GRUPO_OI, tipo_de_anteojo } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';
import { AppStore, useAppSelector } from '../../../redux/store';


interface ICristales {
    control: any,
    onDataChange: any,
    formValues: any,
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
    permiso_usuario_verificar_cristal,
    permiso_area_verificar_cristal,
    isEditting
}) => {
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas["areaActual"]);


    const handleInputChange = async (e: any) => {
        const { name, value } = e;

        console.log(name)
        console.log(value)
        onDataChange({ [name]: value })


        validationOTlevel2(name, value)
        validationOTlevel3(name, value)

        // if (isEditting && data) {
        //     const _p1 = data[EnumGrid.proyecto_codigo]
        //     const _p2 = value.trim()
        //     const _p4 = data[EnumGrid.validar_parametrizacion_id]

        //     let _p5 = ''

        //     switch (name) {
        //         case 'cristal1_od':
        //             console.log('render')
        //             _p5 = A1_CR_OI.value
        //             console.log(_p5)
        //             const strURLC1OD =  `${URLBackend}/api/cristales/listado/?query=02&_p1=${_p1}&_p2=${_p2}&_p4=${_p4}&_p5=${_p5}`
                                                  
        //             const {data:cristal1OD} = await axios(strURLC1OD)
        //                 console.log(cristal1OD)
        //                 if (cristal1OD && cristal1OD[0] && cristal1OD[0][0]) {
        //                     if (typeof cristal1OD[0][0] === 'string') {
        //                         validation_Cristal1_od("")
        //                         onDataChange({['']: undefined})
        //                         A1_CR_OD.value = " ";
        //                         toast.error(cristal1OD[0][0])
                                
        //                     }else{
        //                         console.log('render')
        //                         onDataChange({['cristal1_marca_id']: cristal1OD[0][0]})
        //                         onDataChange({['cristal1_diseno_id']: cristal1OD[0][1]})
        //                         onDataChange({['cristal1_indice_id']: cristal1OD[0][2]})
        //                         onDataChange({['cristal1_material_id']: cristal1OD[0][3]})
        //                         onDataChange({['cristal1_color_id']: cristal1OD[0][4]})
        //                         onDataChange({['cristal1_tratamiento_id']: cristal1OD[0][5]})
        //                         onDataChange({['cristal1_diametro']: cristal1OD[0][6]})


        //                     dioptrias_receta.value.a1_od.esf = cristal1OD[0][7]
        //                     dioptrias_receta.value.a1_od.cil = cristal1OD[0][8]


        //                 }

        //             }



        //             break;
        //         case 'cristal1_oi':
        //             _p5 = A1_CR_OD.value
        //             console.log(_p5)
        //             const strURLC1OI = `${URLBackend}/api/cristales/listado/?query=02&_p1=${_p1}&_p2=${_p2}&_p4=${_p4}&_p5=${_p5}`
                                               

        //             const {data:cristal1OI} = await axios(strURLC1OI)
        //             console.log(cristal1OI)
        //             if(cristal1OI && cristal1OI[0] && cristal1OI[0][0]){
        //                 if(typeof cristal1OI[0][0] === 'string'){
        //                     validation_Cristal1_oi("")
        //                     onDataChange({['']: null})
        //                     A1_CR_OI.value = " ";
        //                     toast.error(cristal1OI[0][0])
        //                 } else {
        //                     onDataChange({ ['cristal1_marca_id']: cristal1OI[0][0] })
        //                     onDataChange({ ['cristal1_diseno_id']: cristal1OI[0][1] })
        //                     onDataChange({ ['cristal1_indice_id']: cristal1OI[0][2] })
        //                     onDataChange({ ['cristal1_material_id']: cristal1OI[0][3] })
        //                     onDataChange({ ['cristal1_color_id']: cristal1OI[0][4] })
        //                     onDataChange({ ['cristal1_tratamiento_id']: cristal1OI[0][5] })
        //                     onDataChange({ ['cristal1_diametro']: cristal1OI[0][6] })


        //                     dioptrias_receta.value.a1_oi.esf = cristal1OI[0][7]
        //                     dioptrias_receta.value.a1_oi.cil = cristal1OI[0][8]
        //                 }
        //             }

        //             if (cristal1OI && cristal1OI[0][0] === null) {
        //                 A1_CR_OI.value = " "
        //                 toast.error('Cristal no existe')
        //             }
        //             break;


        //         case 'cristal2_od':
        //             console.log('render')
        //             _p5 = A2_CR_OI.value
        //             const strURLC2OD = isEditting
        //                 ? `${URLBackend}/api/cristales/listado/?query=02&_p1=${_p1}&_p2=${_p2}&_p4=${_p4}&_p5=${_p5}`
        //                 : `${URLBackend}/api/cristales/listado/?query=02&_p1=${_p1}&_p2=${_p2}&_p4=${_p4}`

        //             const { data: cristal2OD } = await axios(strURLC2OD)

        //             console.log(cristal2OD)
        //             if(cristal2OD && cristal2OD[0] && cristal2OD[0][0]){
        //                 if(typeof cristal2OD[0][0] === 'string'){
        //                     validation_Cristal2_od("")
        //                     onDataChange({['']: null})
        //                     A2_CR_OD.value = " ";
        //                     toast.error(cristal2OD[0][0])

        //                 }else{
        //                     console.log('render')
        //                     console.log(cristal2OD[0][0])
        //                     onDataChange({ ['cristal2_marca_id']: cristal2OD[0][0] })
        //                     onDataChange({ ['cristal2_diseno_id']: cristal2OD[0][1] })
        //                     onDataChange({ ['cristal2_indice_id']: cristal2OD[0][2] })
        //                     onDataChange({ ['cristal2_material_id']: cristal2OD[0][3] })
        //                     onDataChange({ ['cristal2_color_id']: cristal2OD[0][4] })
        //                     onDataChange({ ['cristal2_tratamiento_id']: cristal2OD[0][5] })
        //                     onDataChange({ ['cristal2_diametro']: cristal2OD[0][6] })


        //                     a2_od_esf.value = cristal2OD[0][7]
        //                     dioptrias_receta.value.a1_od.cil = cristal2OD[0][8]

        //                 }


        //             }
        //             if (cristal2OD && cristal2OD[0][0] === null) {
        //                 A2_CR_OD.value = " "
        //                 toast.error('Cristal no existe')
        //             }
        //             break;
        //         case 'cristal2_oi':
        //             _p5 = A2_CR_OD.value
        //             const strURLC2OI = isEditting
        //                 ? `${URLBackend}/api/cristales/listado/?query=02&_p1=${_p1}&_p2=${_p2}&_p4=${_p4}&_p5=${_p5}`
        //                 : `${URLBackend}/api/cristales/listado/?query=02&_p1=${_p1}&_p2=${_p2}&_p4=${_p4}`

        //             const { data: cristal2OI } = await axios(strURLC2OI)

        //             console.log(cristal2OI)
        //             if (cristal2OI && cristal2OI[0] && cristal2OI[0][0]) {
        //                 if (typeof cristal2OI[0][0]) {
        //                     A2_CR_OI.value = " ";
        //                     validation_Cristal2_oi("")
        //                     onDataChange({['']: null})
        //                     toast.error(cristal2OD[0][0])
        //                 } else {
        //                     onDataChange({ ['cristal2_marca_id']: cristal2OI[0][0] })
        //                     onDataChange({ ['cristal2_diseno_id']: cristal2OI[0][1] })
        //                     onDataChange({ ['cristal2_indice_id']: cristal2OI[0][2] })
        //                     onDataChange({ ['cristal2_material_id']: cristal2OI[0][3] })
        //                     onDataChange({ ['cristal2_color_id']: cristal2OI[0][4] })
        //                     onDataChange({ ['cristal2_tratamiento_id']: cristal2OI[0][5] })
        //                     onDataChange({ ['cristal2_diametro']: cristal2OI[0][6] })

        //                     a2_oi_esf.value = cristal2OI[0][7]
        //                     // diopt]]] = cristal2OI[0][8]    
        //                 }

        //             }

        //             if (cristal2OI && cristal2OI[0][0] === null) {
        //                 A2_CR_OI.value = " "
        //                 toast.error('Cristal no existe')
        //             }
        //             break;
        //         default:
        //             break;
        //     }

        // }
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
                {/* <div className="w-[55%] mx-auto  absolute top-[-34%] left-[28%]"> */}
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
                        />  
                </div>
            </div>)
      }

    // console.log(tipo_de_anteojo.value)
    console.log(formValues)
    console.log(data && data[EnumGrid.cristal2_tratamiento_id])
   console.log(formValues && formValues["cristal2_tratamiento_id"] ? formValues["cristal2_tratamiento_id"] : data && data[EnumGrid.cristal2_tratamiento_id])
    
    
    return (
        <form>
            <div className='w-full flex frameOTForm'>
                <div className=" w-1/2 relative !mt-[2rem] !h-[30rem] ">
                    <div className=" flex items-center radioComponent !ml-[1rem]">
                        <div className="mx-auto !mt-6 !h-[28rem]">
                            <h1 className='absolute z-10 top-[-6%] text-2xl w-[30%] text-center !text-[#f8b179] left-[4%]'>ANTEOJO 1</h1>
                            <div className="w-full  !-mb-4 !ml-[1rem]">
                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!ml-[1rem]">
                                        <SelectInputComponent
                                            label="Marca"
                                            name="cristal1_marca_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_marca_id"] ? formValues["cristal2_marca_id"] : data && data[EnumGrid.cristal1_marca_id]}
                                            control={control}
                                            entidad={["/api/marcas/", "02"]}
                                            // error={errors.establecimiento}
                                            customWidth={""}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                        />
                                    </div>
                                    <div className="">
                                        <SelectInputTiposComponent
                                            label='Diseño'
                                            name='cristal1_diseno_id'
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_diseno_id"] ? formValues["cristal1_diseno_id"] : data && data[EnumGrid.cristal1_diseno_id]}
                                            entidad={"CristalesDisenos"}
                                            control={control}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                            customWidth={""}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!ml-[1rem]">
                                        <SelectInputTiposComponent
                                            label='Indice'
                                            name='cristal1_indice_id'
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_indice_id"] ? formValues["cristal1_indice_id"] : data && data[EnumGrid.cristal1_indice_id]}
                                            control={control}
                                            entidad={'CristalesIndices'}
                                            customWidth={""}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                        />
                                    </div>

                                    <div className="">
                                        <SelectInputTiposComponent
                                            label='Material'
                                            name="cristal1_material_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_material_id"] ? formValues["cristal1_material_id"] : data && data[EnumGrid.cristal1_material_id]}
                                            control={control}
                                            entidad={'CristalesMateriales'}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!ml-[1rem]">
                                        <SelectInputTiposComponent
                                            label='Color'
                                            name="cristal1_color_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_color_id"] ? formValues["cristal1_color_id"] : data && data[EnumGrid.cristal1_color_id]}
                                            control={control}
                                            entidad={"CristalesColores"}
                                            customWidth={""}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                        />
                                    </div>

                                    <div className="">
                                        <SelectInputTiposComponent
                                            label='Tratamiento'
                                            name="cristal1_tratamiento_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_tratamiento_id"] ? formValues["cristal1_tratamiento_id"] : data && data[EnumGrid.cristal1_tratamiento_id]}
                                            control={control}
                                            entidad={"CristalesTratamientos"}
                                            customWidth={""}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                        />
                                    </div>
                                </div>

                                <div className="w-full  flex mt-6 rowForm centertDIV  relative">
                                    {permiso_area_verificar_cristal && (
                                    <div className="w-[40%] absolute -left-0">
                                            <TextInputInteractive
                                                type="text"
                                                label="Validar Cristal OD"
                                                name="validar_cristal1_od"
                                                handleChange={handleInputChange}
                                                data={formValues && formValues["validar_cristal1_od"]}
                                                control={control}
                                                isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                            />

                                    </div>

                                    )}

                                    <div className="w-[20%] mr-2">
                                        <TextInputInteractive
                                            control={control}
                                            type="number"
                                            label="Diámetro"
                                            name="cristal1_diametro"
                                            handleChange={handleInputChange}
                                            isOT={true}
                                            data={formValues && formValues["cristal1_diametro"] ? formValues["cristal1_diametro"] : data && data[EnumGrid.cristal1_diametro]}
                                            customWidth={'w-[8rem]'}
                                            onlyRead={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}                                        // error={errors.fecha_nacimiento}
                                            textAlign="text-center"
                                        />

                                    </div>
                                    {permiso_area_verificar_cristal && (
                                        <div className="w-[40%] absolute right-0">
                                            <TextInputInteractive
                                                type="text"
                                                label="Validar Codigo Cristal OI"
                                                name="validar_cristal1_oi"
                                                handleChange={handleInputChange}
                                                data={formValues && formValues["validar_cristal1_oi"]}
                                                control={control}
                                                isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                            />

                                        </div>

                                    )}

                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!w-[50%] !pr-[1rem]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal OD"
                                            name="cristal1_od"
                                            handleChange={handleInputChange}
                                            data={A1_CR_OD.value || data && data[EnumGrid.cristal1_od]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                            textAlign="text-center"
                                        />
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal OI"
                                            name="cristal1_oi"
                                            isOT={true}
                                            handleChange={handleInputChange}
                                            data={A1_CR_OI.value || data && data[EnumGrid.cristal1_oi]}
                                            control={control}
                                            onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                            textAlign="text-center"
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!w-[50%] !pr-[1rem]">
                                        {renderGrupo1("A1_GRUPO_OD")}
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                        {renderGrupo1("A1_GRUPO_OI")}
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="w-full !pr-[2rem]">
                                        <SelectInputTiposComponent
                                            label='Tratamiento adicional'
                                            name='cristal1_tratamiento_adicional_id'
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal1_tratamiento_adicional_id"] ? formValues["cristal1_tratamiento_adicional_id"] : data && data[EnumGrid.cristal1_tratamiento_adicional_id]}
                                            control={control}
                                            entidad='CristalesTratamientos'
                                            customWidth={"w-full  !ml-[1rem]"}
                                            readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                            isOptional={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-1/2 relative !mt-[2rem] !h-[30rem] !mr-[1rem]">
                    <div className=" flex items-center ml-2  radioComponent !mr-[1rem]">
                        <div className="mx-auto !mt-6 !h-[28rem]">
                            <h1 className='absolute z-10 top-[-6%] text-2xl w-[30%] text-center !text-[#f8b179] left-[4%]'>ANTEOJO 2</h1>
                            <div className="w-full  !-mb-4 !ml-[1rem]">
                                <div className="w-full flex mt-6 rowForm">
                                    <div className="!ml-[1rem]">
                                        <SelectInputComponent
                                            label="Marca"
                                            name="cristal2_marca_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_marca_id"] ? formValues["cristal2_marca_id"] : data && data[EnumGrid.cristal2_indice_id]}
                                            control={control}
                                            entidad={["/api/marcas/", "02"]}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                            isFOTcristales={true}
                                        />
                                    </div>
                                    <div className="">
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
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm">
                                    <div className="ml-[1rem]">
                                        <SelectInputTiposComponent
                                            label="Indice"
                                            name="cristal2_indice_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_indice_id"] ? formValues["cristal2_indice_id"] : data && data[EnumGrid.cristal2_indice_id]}
                                            control={control}
                                            entidad={"CristalesIndices"}
                                            FOTcristales={true}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        />
                                    </div>

                                    <div className="">
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
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm">
                                    <div className="ml-[1rem]">
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
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        />
                                    </div>

                                    <div className="">
                                        <SelectInputTiposComponent
                                            label="Tratamiento"
                                            name="cristal2_tratamiento_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_tratamiento_id"] ? formValues["cristal2_tratamiento_id"] : data && data[EnumGrid.cristal2_tratamiento_id]}
                                            control={control}
                                            entidad={"OTTratamientoAdicional"}
                                            customWidth={""}
                                            FOTcristales={true}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm centertDIV relative">
                                {permiso_area_verificar_cristal && (tipo_de_anteojo === '3' as any) && (
                                    <div className="w-[40%] absolute -left-0">
                                            <TextInputInteractive
                                                type="text"
                                                label="Validar Cristal OD"
                                                name="validar_cristal2_od"
                                                handleChange={handleInputChange}
                                                data={formValues && formValues["validar_cristal2_od"]}
                                                control={control}
                                                isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                            />

                                    </div>

                                    )}

                                <div className="w-[20%] mr-2">
                                    <TextInputInteractive
                                        type="number"
                                        label="Diámetro"
                                        name="cristal2_diametro"
                                        handleChange={handleInputChange}
                                        data={A2_Diametro.value || data && data[EnumGrid.cristal2_diametro]}
                                        control={control}
                                        isOT={true}
                                        onlyRead={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        customWidth={'w-[8rem]'}
                                        textAlign="text-center"
                                    />
                                </div>

                                {permiso_area_verificar_cristal && (tipo_de_anteojo === '3' as any) && (
                                        <div className="w-[40%] absolute right-0">
                                            <TextInputInteractive
                                                type="text"
                                                label="Validar Codigo Cristal OI"
                                                name="validar_cristal2_oi"
                                                handleChange={handleInputChange}
                                                data={formValues && formValues["validar_cristal2_oi"]}
                                                control={control}
                                                isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                            />

                                        </div>

                                    )}


                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!w-[50%] !pr-[1rem]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal OD"
                                            name="cristal2_od"
                                            handleChange={handleInputChange}
                                            data={A2_CR_OD.value.trim() || data && data[EnumGrid.cristal2_od]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
                                            textAlign="text-center"
                                        />
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal OI"
                                            name="cristal2_oi"
                                            handleChange={handleInputChange}
                                            data={A2_CR_OI.value.trim() || data && data[EnumGrid.cristal2_oi]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
                                            textAlign="text-center"
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="!w-[50%] !pr-[1rem]">
                                        {renderGrupo1("A2_GRUPO_OD")}
                                    </div>
                                    <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                        {renderGrupo1("A2_GRUPO_OI")}
                                    </div>
                                </div>

                                <div className="w-full flex mt-6 rowForm ">
                                    <div className="w-full !pr-[2rem]">
                                        <SelectInputTiposComponent
                                            label="Tratamiento adicional"
                                            name="cristal2_tratamiento_adicional_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues && formValues["cristal2_tratamiento_adicional_id"] ? formValues["cristal2_tratamiento_adicional_id"] : data && data[EnumGrid.cristal2_tratamiento_adicional_id]}
                                            control={control}
                                            entidad={"CristalesTratamientos"}
                                            readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                            customWidth={"w-full  !ml-[1rem]"}
                                            FOTcristales={true}
                                            isOptional={true}
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