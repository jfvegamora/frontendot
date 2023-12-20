import React,{useState} from 'react'
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2 } from '../../utils/validationOT';
import SelectInputTiposComponent from '../forms/SelectInputTiposComponent';
import { a1Grupo } from '../../views/forms/FOT';


interface ICristales {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    onlyRead?:boolean,
    permiso_cristales?:boolean,
    a2Grupo?:any
}


const FOTCristales:React.FC<ICristales> = ({
    control,
    onDataChange,
    formValues,
    data,
    onlyRead,
    permiso_cristales,

}) => {
    const [_cristalRead, setCristalRead] = useState(false)
    const [grupo1, _setGrupo1] = useState(2)
    const [validate, setValidate] = useState({
        cristal1_tratamiento_id: '',
        cristal1_opcion_vta_id: '',
        cristal1_diseno_id: '',
        cristal1_indice_id: '',
        cristal1_material_id: ''
      });
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

        validationOTlevel2(name, value)
        if(
            name === "cristal1_tratamiento_id" ||
            name === "cristal1_opcion_vta_id" || 
            name === "cristal1_diseno_id" ||
            name === "cristal1_indice_id" ||
            name === "cristal1_material_id" 
        ){

            setValidate(prevValidate => ({
                ...prevValidate,
                [name]: value
              }));
        }
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



    React.useEffect(() => {
        console.log(validate)
        if (
            validate &&
            validate.cristal1_material_id !== '' &&
            validate.cristal1_opcion_vta_id !== '' &&
            validate.cristal1_diseno_id !== '' &&
            validate.cristal1_indice_id !== '' &&
            validate.cristal1_tratamiento_id !== ''
          ) {
            setCristalRead(true);
          } else {
            setCristalRead(false);
          }
      }, [validate]
    );


      const renderGrupo1 = () => (
            <div className='w-full rowForm'>
                <div className="w-[50%] mx-auto">
                    <TextInputComponent   
                        type='text'
                        label="Grupo 1"
                        name="cristal1_grupo1_id"
                        data={a1Grupo}
                        control={control}
                        onlyRead={onlyRead || permiso_cristales}
                    />  
                </div>

            </div>
      
       )


       
    React.useEffect(()=>{
        renderGrupo1()
        // console.log('cambio')
        // console.log(grupo1)
    },[grupo1])
  return (
    <form>
        <div className='w-full labelForm flex items-center rounded-lg border border-blue-500 !mt-[1.7rem] '>
            <div className=" w-1/2 relative items-center mt-8">

               <div className=" flex items-center  ml-2 rounded-lg border border-red-500">

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
                                    readOnly={onlyRead || permiso_cristales}
                                
                                />
                              </div>
                              <div className="w-[50%]">
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
                                        readOnly={onlyRead || permiso_cristales}
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
                                        readOnly={onlyRead || permiso_cristales}
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
                                    readOnly={onlyRead || permiso_cristales}
                                    customWidth={"w-[17.5rem]"}
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
                                    readOnly={onlyRead || permiso_cristales}
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
                                    readOnly={onlyRead || permiso_cristales }
                                    customWidth={"w-[17.5rem]"}
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
                              readOnly={onlyRead || permiso_cristales }
                              customWidth={"w-[35rem]"}
                            />
                        </div>

                        <div className="w-[95%] rowForm !mr-[-2rem] ">
                                 <TextInputComponent
                                        control={control}
                                        type="text"
                                        label="Diametro"
                                        name="cristal1_diametro"
                                        handleChange={handleInputChange}
                                        isOT={true}
                                        data={formValues ? formValues["cristal1_diametro"] : data && data[EnumGrid.cristal1_diametro]}
                                        onlyRead={onlyRead || permiso_cristales}
                                        // error={errors.fecha_nacimiento}
                                  />
                        </div>
                        <div className="w-full !mt-8 !mb-6">
                            <div className="w-full rowForm relative flex  ">
                                <div className="w-[50%]">
                                        <TextInputComponent
                                            type="text"
                                            label="Codigo Cristal"
                                            name="cristal1_od"
                                            handleChange={handleInputChange}
                                            data={formValues ? formValues["cristal1_od"] : data && data[EnumGrid.cristal1_od]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={onlyRead || permiso_cristales}
                                            // error={errors.fecha_nacimiento}
                                        />
                                </div>
                                <div className="w-[50%]">
                                        <TextInputComponent
                                            type="text"
                                            label="Codigo Cristal"
                                            name="cristal1_oi"
                                            isOT={true}
                                            handleChange={handleInputChange}
                                            data={formValues ? formValues["cristal1_oi"] : data && data[EnumGrid.cristal1_oi]}
                                            control={control}
                                            onlyRead={onlyRead || permiso_cristales}
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
                                readOnly={onlyRead || permiso_cristales}
                                />
                      </div>
                    </div>

                        <h1 className='labelForm absolute z-10 top-[-10%] text-2xl w-[30%] text-center left-[30%]'>Anteojo 1</h1>
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                                {renderGrupo1()}
                        </div>
               </div>




              

               </div> 
                                      
            </div>
            <div className=" w-1/2 relative items-center mt-8">
               <div className=" flex items-center  ml-2 rounded-lg border border-blue-500">

               <div className="w-full items-center"> 
                    <div className="w-[80%] items-center mx-auto !-mb-8 ">

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
                                            readOnly={onlyRead || permiso_cristales}
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
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                        </div>
                        
                        <div className="w-full rowForm">
                                <SelectInputTiposComponent
                                        label="Diseño"
                                        name="cristal2_diseno_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_diseno_id"] : data && data[EnumGrid.cristal2_diseno_id]}
                                        control={control}
                                        entidad={"CristalesDisenos"}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                            />
                        </div>

                        <div className="w-full rowForm">
                                    <SelectInputTiposComponent
                                        label="Indice"
                                        name="cristal2_indice_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_indice_id"] : data && data[EnumGrid.cristal2_indice_id]}
                                        control={control}
                                        entidad={"CristalesIndices"}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />

                        </div>

                        <div className="w-full rowForm">
                            <SelectInputTiposComponent
                                    label="Material"
                                    name="cristal2_material_id"
                                    showRefresh={true}
                                    isOT={true}
                                    handleSelectChange={handleInputChange}
                                    data={formValues ? formValues["cristal2_material_id"] : data && data[EnumGrid.cristal2_material_id]}
                                    control={control}
                                    entidad={"CristalesMateriales"}
                                    readOnly={onlyRead || permiso_cristales}
                            />
                        </div>

                        <div className="w-full rowForm">
                                 <SelectInputTiposComponent
                                        label="Color"
                                        name="cristal2_color_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_color_id"] : data && data[EnumGrid.cristal2_color_id]}
                                        control={control}
                                        entidad={"CristalesColores"}
                                        readOnly={onlyRead || permiso_cristales}
                                />
                        </div>
                        
                        <div className="w-full rowForm">
                            <SelectInputTiposComponent
                                        label="Tratamiento"
                                        name="cristal2_tratamiento_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={1}
                                        control={control}
                                        entidad={"OTTratamientoAdicional"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                            <div className="w-full rowForm ">
                                 <TextInputComponent
                                        type="text"
                                        label="Diametro"
                                        name="cristal2_diametro"
                                        handleChange={handleInputChange}
                                        // data={formValues ? formValues["cristal1_diametro"] : data && data[EnumGrid.diametro_a1]}
                                        control={control}
                                        isOT={true}
                                        onlyRead={onlyRead || permiso_cristales}
                                        // error={errors.fecha_nacimiento}
                                  />
                        </div>
                        <div className="w-full !mt-8 !mb-6">
                            <div className="w-full rowForm relative flex  ">
                            <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl !top-[10%] left-[10%]'>OD</h1>
                            <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl !top-[-10rem] left-[60%]'>OI</h1>
                                <div className="w-[50%]">
                                        <TextInputComponent
                                            type="text"
                                            label="Codigo Cristal"
                                            name="cristal2_od"
                                            handleChange={handleInputChange}
                                            data={formValues ? formValues["cristal2_od"] : data && data[EnumGrid.cristal2_od]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={onlyRead || permiso_cristales}
                                            // error={errors.fecha_nacimiento}
                                        />
                                </div>
                                <div className="w-[50%]">
                                        <TextInputComponent
                                            type="text"
                                            label="Codigo Cristal"
                                            name="cristal2_oi"
                                            handleChange={handleInputChange}
                                            data={formValues ? formValues["cristal2_oi"] : data && data[EnumGrid.cristal2_oi]}
                                            control={control}
                                            isOT={true}
                                            onlyRead={onlyRead || permiso_cristales}
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
                                        readOnly={onlyRead || permiso_cristales}
                             />
                    </div>
                    </div>
                    
                        <h1 className='labelForm absolute z-10 top-[-20%] text-2xl w-[30%] text-center left-[30%]'>Anteojo 2</h1>
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                                {renderGrupo1()}
                        </div>
               </div>
               </div>                             
            </div>            
        </div>

    </form>
  )
}

export default FOTCristales