import React,{useEffect} from 'react'
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2 } from '../../utils/validationOT';
import SelectInputTiposComponent from '../forms/SelectInputTiposComponent';
import { A1_CR_OD, A1_CR_OI, A1_GRUPO_OD, A1_GRUPO_OI, A2_CR_OD, A2_CR_OI, A2_GRUPO_OD, A2_GRUPO_OI, clearSelectInput, setCodigosCristales } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';


interface ICristales {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    onlyRead?:boolean,
    a2Grupo?:any,
    isEditting?:boolean;
    permiso_cristales?:boolean,
    permisos_areas_cristales:boolean;
    permisos_areas_grupo_dioptria:boolean;
    permiso_grupo_dioptria:boolean;
}


const FOTCristales:React.FC<ICristales> = ({
    control,
    onDataChange,
    formValues,
    data,
    permiso_cristales,
    permisos_areas_cristales,
    permisos_areas_grupo_dioptria,
    permiso_grupo_dioptria
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


        setCodigosCristales(value)
        validationOTlevel2(name, value)
        
        onDataChange({[name]:value})
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


    useEffect(()=>{
        onDataChange({['cristal2_diametro']:" "})
    },[clearSelectInput.value])



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
  
       return (<div className='w-full rowForm '>
                <div className="w-[55%] mx-auto  absolute top-[-34%] left-[28%]">
                    <TextInputInteractive   
                        type='text'
                        label={label}
                        name={name}
                        data={data}
                        control={control}
                        onlyRead={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                    />  
                </div>

            </div>)
      
      }


       


      console.log(!(permisos_areas_grupo_dioptria || permiso_grupo_dioptria) || clearSelectInput.value)
      console.log(clearSelectInput.value)


  return (
    <form>
        <div className='w-full labelForm flex items-center rounded-lg border radioComponent !mt-[1.7rem] '>
            <div className=" w-1/2 relative items-center mt-10">

               <div className=" flex items-center  ml-2 rounded-lg border border-red-500  h-[35rem]">

               <div className="w-[80%]  items-center mx-auto   !mt-8 !h-[36rem]">
                    <div className="w-full  !-mb-4 ">

                          <div className="w-full flex mt-6 rowForm ">
                              <div className="w-[50%]">
                                <SelectInputTiposComponent
                                    label='Opción Venta'
                                    name='cristal1_opcion_vta_id'
                                    showRefresh={true}
                                    isOT={true}
                                    handleSelectChange={handleInputChange}
                                    data={formValues ? formValues["cristal1_opcion_vta_id"] : data && data[EnumGrid.cristal1_opcion_vta_id]}
                                    control={control}
                                    entidad='OTOpcionVentaCristales'
                                    readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}

                                
                                />
                              </div>
                              <div className="w-[50%] !mr-[2rem]">
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
                                        customWidth={"345px"}
                                        readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}

                                />

                              </div>
                          </div>

                          <div className="w-full flex mt-6 rowForm ">
                                <div className="w-[50%]">      
                                        <SelectInputTiposComponent
                                        label='Diseño'
                                        name='cristal1_diseno_id'
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_diseno_id"] : data && data[EnumGrid.cristal1_diseno_id]}
                                        entidad={"CristalesDisenos"}
                                        control={control}
                                        readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                                        />
                                </div>

                                <div className="w-[50%]">
                                    <SelectInputTiposComponent
                                    label='Indice'
                                    name='cristal1_indice_id'
                                    showRefresh={true}
                                    isOT={true}
                                    handleSelectChange={handleInputChange}
                                    data={formValues ? formValues["cristal1_indice_id"] : data && data[EnumGrid.cristal1_indice_id]}
                                    control={control}
                                    entidad={'CristalesIndices'}
                                    customWidth={"w-[17.5rem]"}
                                    readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                                    />
                                </div>


                          </div>

                          <div className="w-full flex mt-6 rowForm ">
                                <div className="w-[50%]">
                                    <SelectInputTiposComponent
                                    label='Material'
                                    name="cristal1_material_id"
                                    showRefresh={true}
                                    isOT={true}
                                    handleSelectChange={handleInputChange}
                                    data={formValues ? formValues["cristal1_material_id"] : data && data[EnumGrid.cristal1_material_id]}
                                    control={control}
                                    entidad={'CristalesMateriales'}
                                    readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                                    />
                                </div>
                            
                                <div className="w-[50%]">
                                    <SelectInputTiposComponent
                                    label='Color'
                                    name="cristal1_color_id"
                                    showRefresh={true}
                                    isOT={true}
                                    handleSelectChange={handleInputChange}
                                    data={formValues ? formValues["cristal1_color_id"] : data && data[EnumGrid.cristal1_color_id]}
                                    control={control}
                                    entidad={"CristalesColores"}
                                    customWidth={"w-[17.5rem]"}
                                    readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                                    />
                                </div>


                          </div>
                        <div className="w-full rowForm">
                            <SelectInputTiposComponent
                              label='Tratamiento'
                              name="cristal1_tratamiento_id"
                              showRefresh={true}
                              isOT={true}
                              handleSelectChange={handleInputChange}
                              data={formValues ? formValues["cristal1_tratamiento_id"] : data && data[EnumGrid.cristal1_tratamiento_id]}
                              control={control}
                              entidad={"CristalesTratamientos"}
                              customWidth={"w-[35rem]"}
                              readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                            />
                        </div>
                        <div className="w-full rowForm left-[9%] absolute mr-10 ">
                                 <TextInputComponent
                                        control={control}
                                        type="text"
                                        label="Diametro"
                                        name="cristal1_diametro"
                                        handleChange={handleInputChange}
                                        isOT={true}
                                        data={formValues ? formValues["cristal1_diametro"] : data && data[EnumGrid.cristal1_diametro]}
                                        customWidth={'w-[33.6rem]'}
                                        onlyRead={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                                        // error={errors.fecha_nacimiento}
                                  />
                        </div>
                        <div className="w-full !mt-[5rem] !mb-6">
                            <div className="w-full rowForm relative flex  ">
                                <div className="w-[50%] -ml-[1rem]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal"
                                            name="cristal1_od"
                                            handleChange={handleInputChange}
                                            data={A1_CR_OD.value || data && data[EnumGrid.cristal1_od]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={permisos_areas_cristales || permiso_cristales}
                                            // error={errors.fecha_nacimiento}t
                                        />
                                </div>
                                <div className="w-[50%]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal"
                                            name="cristal1_oi"
                                            isOT={true}
                                            handleChange={handleInputChange}
                                            data={ A1_CR_OI.value ||data && data[EnumGrid.cristal1_oi]}
                                            control={control}
                                            onlyRead={permisos_areas_cristales || permiso_cristales}
                                            // error={errors.fecha_nacimiento}
                                        />
                                </div>
                            </div>

                        </div>

                     <div className="w-full rowForm !mt-8">
                                <SelectInputTiposComponent
                                label='Tratamiento adicional'
                                name='cristal1_tratamiento_adicional_id'
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["cristal1_tratamiento_adicional_id"] : data && data[EnumGrid.cristal1_tratamiento_adicional_id]}
                                control={control}
                                entidad='CristalesTratamientos'
                                customWidth={"w-full"}
                                readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria}
                                />
                      </div>
                    </div>

                        <h1 className=' absolute z-10 top-[-6%] text-2xl w-[30%] text-center !text-[#f8b179] left-[4%]'>Anteojo 1</h1>
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                                {renderGrupo1("A1_GRUPO_OI")}
                                
                        </div>  
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[20%]">
                                {renderGrupo1("A1_GRUPO_OD")}
                                
                        </div>  
               </div>




              

               </div> 
                                      
            </div>
            <div className=" w-1/2 relative items-center mt-8" >
               <div className=" flex items-center  ml-2 rounded-lg border border-blue-500 h-[35rem]">
               <div className="w-full items-center !mt-[-5.5rem]"> 
                    <div className="w-[80%] items-center mx-auto">

                        <div className="w-full mt-6 rowForm flex">
                            <div className="w-[50%]">
                                <SelectInputTiposComponent
                                            label="Opcion de Venta"
                                            name="cristal2_od_opcion_venta_id"
                                            showRefresh={true}
                                            isOT={true}
                                            handleSelectChange={handleInputChange}
                                            data={formValues ? formValues["cristal2_od_opcion_venta_id"] : data && data[EnumGrid.cristal2_od_opcion_venta_id]}
                                            control={control}
                                            entidad='OTOpcionVentaCristales'
                                            readOnly={permisos_areas_grupo_dioptria || permiso_grupo_dioptria || clearSelectInput.value}
                                            FOTcristales={true}
                                  />
                            </div>
                            <div className="w-[50%]">
                                    <SelectInputComponent
                                        label="Marca"
                                        name="cristal2_marca_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_marca_id"] : data && data[EnumGrid.cristal2_indice_id]}
                                        control={control}
                                        entidad={["/api/marcas/", "02"]}
                                        readOnly={ permisos_areas_grupo_dioptria || permiso_grupo_dioptria ||  clearSelectInput.value}
                                        isFOTcristales={true}

                                    />
                            </div>
                        </div>

                        <div className="w-full rowForm flex">
                            <div className="w-[50%] ">
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
                                            readOnly={  permisos_areas_grupo_dioptria || permiso_grupo_dioptria||  clearSelectInput.value}
                                />
                            </div>

                            <div className="w-[50%]">
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
                                            readOnly={ permisos_areas_grupo_dioptria || permiso_grupo_dioptria ||  clearSelectInput.value}
                                        />

                            </div>
                        </div>

                        <div className="w-full rowForm flex">
                            <div className="w-[50%]">
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
                                        readOnly={  permisos_areas_grupo_dioptria || permiso_grupo_dioptria||  clearSelectInput.value}
                                        />
                            </div>

                            <div className="w-[50%]">
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
                                            readOnly={  permisos_areas_grupo_dioptria || permiso_grupo_dioptria||  clearSelectInput.value}
                                    />
                            </div>
                        </div>
                        

                        
                        <div className="w-full rowForm">
                            <SelectInputTiposComponent
                                        label="Tratamiento"
                                        name="cristal2_tratamiento_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_tratamiento_id"] : data && data[EnumGrid.cristal2_tratamiento_id]}
                                        control={control}
                                        entidad={"OTTratamientoAdicional"}
                                        customWidth={"w-[36.7rem]"}
                                        FOTcristales={true}
                                        readOnly={  permisos_areas_grupo_dioptria || permiso_grupo_dioptria ||  clearSelectInput.value}
                                        />
                            </div>
                            <div className="w-full rowForm left-[9%] absolute mr-10 ">
                                 <TextInputInteractive
                                        type="text"
                                        label="Diametro"
                                        name="cristal2_diametro"
                                        handleChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_diametro"] : data && data[EnumGrid.cristal2_diametro]}
                                        control={control}
                                        isOT={true}
                                        onlyRead={  permisos_areas_grupo_dioptria || permiso_grupo_dioptria ||  clearSelectInput.value}
                                        customWidth={'w-[35.3rem]'}
                                        // error={errors.fecha_nacimiento}
                                  />
                        </div>
                        <div className="w-full !mt-[5rem] !mb-6">
                            <div className="w-[35.3rem] rowForm relative flex  ">
                                <div className="w-[60%] -ml-[1rem]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal ojo derecho"
                                            name="cristal2_od"
                                            handleChange={handleInputChange}
                                            data={ A2_CR_OD.value  || data && data[EnumGrid.cristal2_od]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={  (permisos_areas_cristales || permiso_cristales) ||  clearSelectInput.value}
                                            // error={errors.fecha_nacimiento}
                                        />
                                </div>
                                <div className="w-[60%]">
                                        <TextInputInteractive
                                            type="text"
                                            label="Codigo Cristal ojo izquierdo"
                                            name="cristal2_oi"
                                            handleChange={handleInputChange}
                                            data={A2_CR_OI.value || data && data[EnumGrid.cristal2_oi]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={  (permisos_areas_cristales || permiso_cristales) ||  clearSelectInput.value}
                                            // error={errors.fecha_nacimiento}
                                        />
                                </div>
                            </div>

                        </div>
                    <div className="w-full rowForm">
                            <SelectInputTiposComponent
                                        label="Tratamiento adicional"
                                        name="cristal2_tratamiento_adicional_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_tratamiento_adicional_id"] : data && data[EnumGrid.cristal2_tratamiento_adicional_id]}
                                        control={control}
                                        entidad={"CristalesTratamientos"}
                                        readOnly={  permisos_areas_grupo_dioptria || permiso_grupo_dioptria ||  clearSelectInput.value}
                                        customWidth={"w-[36.6rem]"}
                                        FOTcristales={true}

                             />
                    </div>
                    </div>
                    
                        <h1 className='labelForm absolute z-10 top-[-6%] text-2xl w-[30%] !text-[#f8b179] text-center left-[4%]'>Anteojo 2</h1>
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                                {renderGrupo1("A2_GRUPO_OI")}
                        </div>
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[20%]">
                                {renderGrupo1("A2_GRUPO_OD")}

                        </div>
               </div>
               </div>                             
            </div>            
        </div>

    </form>
  )
}

export default FOTCristales