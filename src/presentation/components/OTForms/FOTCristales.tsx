import React from 'react'
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2 } from '../../utils/validationOT';
import SelectInputTiposComponent from '../forms/SelectInputTiposComponent';
import { A1_CR_OD, A1_CR_OI, A1_GRUPO_OD, A1_GRUPO_OI, A2_CR_OD, A2_CR_OI, A2_Diametro, A2_GRUPO_OD, A2_GRUPO_OI, tipo_de_anteojo } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';


interface ICristales {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    onlyRead?:boolean,
    a2Grupo?:any,
    isEditting?:boolean;
    permiso_usuario_cristales?:boolean,
    permiso_areas_cristales:boolean;
    permiso_areas_grupo_dioptria:boolean;
    permiso_usuario_grupo_dioptria:boolean;
}


const FOTCristales:React.FC<ICristales> = ({
    control,
    onDataChange,
    formValues,
    data,
    permiso_usuario_cristales,
    permiso_areas_cristales,
    permiso_areas_grupo_dioptria,
    permiso_usuario_grupo_dioptria,
    isEditting
}) => {
    
      // const [codCristal1OD, setCodCristal1OD] = useState(formValues ? formValues["anteojo1_cristal_OD"] : data && data[EnumGrid.cristal1_od_codigo] || 0);
      // const [codCristal1OI, setCodCristal1OI] = useState(formValues ? formValues["anteojo1_cristal_OI"] : data && data[EnumGrid.cristal1_oi_codigo] || 0);
      
      // const [codCristal2OD, setCodCristal2OD] = useState(formValues ? formValues["anteojo2_cristal_OD"] : data && data[EnumGrid.cristal2_od_codigo] || 0);
      // const [codCristal2OI, setCodCrisyal2OI] = useState(formValues ? formValues["anteojo2_cristal_OI"] : data && data[EnumGrid.cristal2_oi_codigo] || 0);
      
      
      // const fetcher = (url:string) => axios.get(url).then((res)=>res.data);
    // const { data:cristal1OD } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal1OD}`, fetcher);
    // const { data:cristal1OI } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal1OI}`, fetcher);
    // const { data:cristal2OD } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal2OD}`, fetcher);
    // const { data:cristal2OI } = useSWR(`https://mtoopticos.cl/api/cristales/listado/?query=01&_p1=${codCristal2OI}`, fetcher);
    
    const handleInputChange = (e:any) => {
        const {name, value} = e;

        console.log(name)
        console.log(value)
        onDataChange({[name]:value})


        validationOTlevel2(name, value)
        
        // console.log(validate)
        
    
        

        // if(name === 'anteojo1_cristal_OD'){
        //     setCodCristal1OD(value) 
        // }
        // if(name === 'anteojo1_cristal_OI'){
        //     setCodCristal1OI(value) 
        // }
        // if(name === 'anteojo2_cristal_OD'){
        //     setCodCristal2OD(value) 
        // }
        // if(name === 'anteojo2_cristal_OI'){
        //     setCodCrisyal2OI(value) 
        // }
    }






    // React.useEffect(() => {
    //     console.log(validate)
    //     if (
    //         validate &&
    //         validate.cristal1_material_id !== '' &&
    //         validate.cristal1_opcion_vta_id !== '' &&
    //         validate.cristal1_diseno_id !== '' &&
    //         validate.cristal1_indice_id !== '' &&
    //         validate.cristal1_tratamiento_id !== ''
    //       ) {
    //         setCristalRead(true);
    //       } else {
    //         setCristalRead(false);
    //       }
    //   }, [validate]
    // );  

    const gruposDioptrias:any = {
        "A1_GRUPO_OI" : () => {
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


      const renderGrupo1 = (grupo:string) => {

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
                        onlyRead={!(permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)}
                    />  
                </div>
            </div>)
      }

      console.log(A2_CR_OI.value)

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
                                        data={formValues ? formValues["cristal1_marca_id"] : data && data[EnumGrid.cristal1_marca_id]}
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
                                        data={formValues ? formValues["cristal1_diseno_id"] : data && data[EnumGrid.cristal1_diseno_id]}
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
                                        data={formValues ? formValues["cristal1_indice_id"] : data && data[EnumGrid.cristal1_indice_id]}
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
                                        data={formValues ? formValues["cristal1_material_id"] : data && data[EnumGrid.cristal1_material_id]}
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
                                        data={formValues ? formValues["cristal1_color_id"] : data && data[EnumGrid.cristal1_color_id]}
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
                                        data={formValues ? formValues["cristal1_tratamiento_id"] : data && data[EnumGrid.cristal1_tratamiento_id]}
                                        control={control}
                                        entidad={"CristalesTratamientos"}
                                        customWidth={""}
                                        readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}                              
                                    />
                                </div>
                            </div>

                            <div className="w-full flex mt-6 rowForm centertDIV">
                                <TextInputComponent
                                    control={control}
                                    type="text"
                                    label="Diámetro"
                                    name="cristal1_diametro"
                                    handleChange={handleInputChange}
                                    isOT={true}
                                    data={formValues ? formValues["cristal1_diametro"] : data && data[EnumGrid.cristal1_diametro]}
                                    customWidth={'w-[8rem]'}
                                    onlyRead={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}                                        // error={errors.fecha_nacimiento}
                                />
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
                                        onlyRead={!(!isEditting || (permiso_areas_cristales && permiso_usuario_cristales))}
                                    />
                                </div>
                                <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                    <TextInputInteractive
                                        type="text"
                                        label="Codigo Cristal OI"
                                        name="cristal1_oi"
                                        isOT={true}
                                        handleChange={handleInputChange}
                                        data={ A1_CR_OI.value ||data && data[EnumGrid.cristal1_oi]}
                                        control={control}
                                        onlyRead={!(!isEditting || (permiso_areas_cristales && permiso_usuario_cristales))}
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
                                        data={formValues ? formValues["cristal1_tratamiento_adicional_id"] : data && data[EnumGrid.cristal1_tratamiento_adicional_id]}
                                        control={control}
                                        entidad='CristalesTratamientos'
                                        customWidth={"w-full  !ml-[1rem]"}
                                        readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}                                
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
                                        data={formValues ? formValues["cristal2_marca_id"] : data && data[EnumGrid.cristal2_indice_id]}
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
                                        data={formValues ? formValues["cristal2_diseno_id"] : data && data[EnumGrid.cristal2_diseno_id]}
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
                                        data={formValues ? formValues["cristal2_indice_id"] : data && data[EnumGrid.cristal2_indice_id]}
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
                                        data={formValues ? formValues["cristal2_material_id"] : data && data[EnumGrid.cristal2_material_id]}
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
                                        data={formValues ? formValues["cristal2_color_id"] : data && data[EnumGrid.cristal2_color_id]}
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
                                        data={formValues ? formValues["cristal2_tratamiento_id"] : data && data[EnumGrid.cristal2_tratamiento_id]}
                                        control={control}
                                        entidad={"OTTratamientoAdicional"}
                                        customWidth={""}
                                        FOTcristales={true}
                                        readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                    />
                                </div>
                            </div>
                        
                            <div className="w-full flex mt-6 rowForm centertDIV">
                                <TextInputInteractive
                                    type="text"
                                    label="Diámetro"
                                    name="cristal2_diametro"
                                    handleChange={handleInputChange}
                                    data={A2_Diametro.value || data && data[EnumGrid.cristal2_diametro]}
                                    control={control}
                                    isOT={true}
                                    onlyRead={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                    customWidth={'w-[8rem]'}
                                  />
                            </div>

                            <div className="w-full flex mt-6 rowForm ">
                                <div className="!w-[50%] !pr-[1rem]">
                                    <TextInputInteractive
                                        type="text"
                                        label="Codigo Cristal OD"
                                        name="cristal2_od"
                                        handleChange={handleInputChange}
                                        data={ A2_CR_OD.value  || data && data[EnumGrid.cristal2_od]}
                                        control={control}
                                        isOT={true}
                                        onlyRead={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
                                    />
                                </div>
                                <div className="!w-[50%] !pr-[1rem] !ml-[-1rem]">
                                    <TextInputInteractive
                                        type="text"
                                        label="Codigo Cristal OI"
                                        name="cristal2_oi"
                                        handleChange={handleInputChange}
                                        data={A2_CR_OI.value || data && data[EnumGrid.cristal2_oi]}
                                        control={control}
                                        isOT={true}
                                        onlyRead={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
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
                                        data={formValues ? formValues["cristal2_tratamiento_adicional_id"] : data && data[EnumGrid.cristal2_tratamiento_adicional_id]}
                                        control={control}
                                        entidad={"CristalesTratamientos"}
                                        readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        customWidth={"w-full  !ml-[1rem]"}
                                        FOTcristales={true}
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
                        {/* <h1 className='labelForm absolute z-10 top-[-6%] text-2xl w-[30%] !text-[#f8b179] text-center left-[4%]'>ANTEOJO 2</h1> */}
                        {/* <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                            {renderGrupo1("A2_GRUPO_OI")}
                        </div>

                        <div className="w-[35%] absolute top-[-5%] labelForm right-[20%]">
                            {renderGrupo1("A2_GRUPO_OD")}
                        </div> */}

export default FOTCristales