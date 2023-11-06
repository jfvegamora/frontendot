import React,{useState} from 'react'
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2 } from '../../utils/validationOT';


interface ICristales {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    onlyRead?:boolean,
    permiso_cristales?:boolean,
    a1Grupo?:any,
    a2Grupo?:any
}


const FOTCristales:React.FC<ICristales> = ({
    control,
    onDataChange,
    formValues,
    data,
    onlyRead,
    permiso_cristales,
    a1Grupo
}) => {
    const [cristalRead, setCristalRead] = useState(false)
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
    
    console.log(a1Grupo[0])
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
      console.log(a1Grupo[0])

      const renderGrupo1 = () => (
            <SelectInputComponent
                                        label="Grupo 1"
                                        name="cristal1_grupo1_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={1}
                                        control={control}
                                        entidad={["/api/proyectogrupos/", "02","PR001A"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
         />
      
       )


       
    React.useEffect(()=>{
        renderGrupo1()
        console.log('cambio')
        console.log(grupo1)
    },[grupo1])
  return (
    <form>
        <div className='w-full labelForm flex items-center rounded-lg border border-blue-500 !mt-8'>
            <div className=" w-1/2 relative items-center mt-8">
               <div className=" flex items-center  ml-2 rounded-lg border border-blue-500">

               <div className="w-full  items-center">
                

                    <div className="w-full !-mb-8">
                        <div className="w-[90%] mt-6">
                            <SelectInputComponent
                                        label="Opcion de Venta"
                                        name="cristal1_opcion_vta_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_opcion_vta_id"] : data && data[EnumGrid.cristal1_opcion_vta_id]}
                                        // data={1}
                                        control={control}
                                        entidad={["/api/tipos/", "02","OTOpcionVentaCristales"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                        <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Indice"
                                        name="cristal1_indice_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_indice_id"] : data && data[EnumGrid.cristal1_indice_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesIndices"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                        <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Tratamiento"
                                        name="cristal1_tratamiento_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_tratamiento_id"] : data && data[EnumGrid.cristal1_tratamiento_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","OTTratamientoAdicional"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                    </div>

                    <div className="w-full">
                    <h1 className='labelForm absolute z-10 top-[-2%] text-2xl w-[30%] text-center left-[30%]'>Anteojo 1</h1>
                    <div className="w-[35%] absolute top-[-6%] labelForm right-[5%]">
                            {renderGrupo1()}
                    </div>
                    <div className="mt-16  mx-auto w-[90%] relative mb-8 !h-[15rem] labelForm rounded-lg border border-blue-500 ">
                        <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OD</h1>

                        <div className="w-[90%] ml-4 flex items-center">
                                
                                <div className="w-[50%]">
                                    <TextInputComponent
                                        type="text"
                                        label="Codigo Cristal"
                                        name="cristal1_od"
                                        handleChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_od"] : data && data[EnumGrid.cristal1_od]}
                                        control={control}
                                        onlyRead={onlyRead || permiso_cristales}
                                        // error={errors.fecha_nacimiento}
                                    />
                                </div>

                                <div className="w-[50%]">
                                    <TextInputComponent
                                        type="number"
                                        label="Stock Actual"
                                        name="anteojo1_stock_actual_od"
                                        onlyRead={true}
                                        handleChange={handleInputChange}
                                        // data={armazon1 && armazon1[16]}
                                        control={control}
                                        defaultValue={30}
                                        
                                        // error={errors.fecha_nacimiento}
                                    />
                                </div>
                            </div>



                            {/* <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                                <p className='ml-2 text-xl'>Marca: {cristal1OD && cristal1OD[0] && cristal1OD[0][3]}</p>
                                <p className='ml-2 text-xl'>Diseño: {cristal1OD && cristal1OD[0] && cristal1OD[0][7]} </p>
                                <p className='ml-2 text-xl'>Indice: {cristal1OD && cristal1OD[0] && cristal1OD[0][9]}</p>
                                <p className='ml-2 text-xl'>Material: {cristal1OD && cristal1OD[0] && cristal1OD[0][11]}</p>
                                <p className='ml-2 text-xl'>Color: {cristal1OD && cristal1OD[0] && cristal1OD[0][13]}</p>
                                <p className='ml-2 text-xl'>Tratamientos: {cristal1OD && cristal1OD[0] && cristal1OD[0][15]}</p>
                                <p className='ml-2 text-xl'>ESF: {cristal1OD && cristal1OD[0] && cristal1OD[0][18]}</p>
                                <p className='ml-2 text-xl'>CIL: {cristal1OD && cristal1OD[0] && cristal1OD[0][19]}</p>
                                <p className='ml-2 text-xl'>Diametro: {cristal1OD && cristal1OD[0] && cristal1OD[0][17]}</p>
                            
                            </div>     */}

                    </div>

                    
                    </div>
               </div>




               
               <div className="w-full">

               <div className="w-full !-mb-8 ">
                    <div className="w-[90%] mt-6">
                            <SelectInputComponent
                                        label="Diseño"
                                        name="cristal1_diseno_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_diseno_id"] : data && data[EnumGrid.cristal1_diseno_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesDisenos"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                            />
                    </div>
                    <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Material"
                                        name="cristal1_material_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_material_id"] : data && data[EnumGrid.cristal1_material_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesMateriales"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                            />
                    </div>
                    <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Color"
                                        name="cristal1_color_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_color_id"] : data && data[EnumGrid.cristal1_color_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesColores"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales || !cristalRead}
                            />
                    </div>
                </div>

                <div className="mt-16 mx-auto w-[90%] !h-[15rem] relative mb-8 labelForm rounded-lg border border-blue-500">
                    <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OI</h1>
                    <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">

                                <TextInputComponent
                                    type="text"
                                    label="Codigo Cristal"
                                    name="cristal1_oi"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cristal1_oi"] : data && data[EnumGrid.cristal1_oi]}
                                    control={control}
                                    onlyRead={onlyRead || permiso_cristales}
                                    // error={errors.fecha_nacimiento}
                                />


                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="anteojo1_stock_actual_OI"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    // data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                        </div>



                        {/* <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                            <p className='ml-2 text-xl'>Marca: {cristal1OI && cristal1OI[0] && cristal1OI[0][3]}</p>
                            <p className='ml-2 text-xl'>Diseño: {cristal1OI && cristal1OI[0] && cristal1OI[0][7]} </p>
                            <p className='ml-2 text-xl'>Indice: {cristal1OI && cristal1OI[0] && cristal1OI[0][9]}</p>
                            <p className='ml-2 text-xl'>Material: {cristal1OI && cristal1OI[0] && cristal1OI[0][11]}</p>
                            <p className='ml-2 text-xl'>Color: {cristal1OI && cristal1OI[0] && cristal1OI[0][13]}</p>
                            <p className='ml-2 text-xl'>Tratamientos: {cristal1OI && cristal1OI[0] && cristal1OI[0][15]}</p>
                            <p className='ml-2 text-xl'>ESE: {cristal1OI && cristal1OI[0] && cristal1OI[0][18]}</p>
                            <p className='ml-2 text-xl'>CIL: {cristal1OI && cristal1OI[0] && cristal1OI[0][19]}</p>
                            <p className='ml-2 text-xl'>Diametro: {cristal1OI && cristal1OI[0] && cristal1OI[0][17]}</p>
                        
                        </div>     */}


                </div>
               </div>


               </div> 
               <div className="w-full  ml-4">
                     <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Tratamiento adicional"
                                        name="cristal1_tratamiento_adicional_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_tratamiento_adicional_id"] : data && data[EnumGrid.cristal1_tratamiento_adicional_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesTratamientos"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                             />
                    </div>
                </div>                            
            </div>
            <div className=" w-1/2 relative items-center mt-8">
               <div className=" flex items-center  ml-2 rounded-lg border border-blue-500">

               <div className="w-full items-center">
                

                    <div className="w-full !-mb-8">
                        <div className="w-[90%] mt-6">
                            <SelectInputComponent
                                        label="Opcion de Venta"
                                        name="cristal2_od_opcion_venta_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_od_opcion_venta_id"] : data && data[EnumGrid.cristal2_od_opcion_venta_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","OTOpcionVentaCristales"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                        <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Indice"
                                        name="cristal2_indice_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_indice_id"] : data && data[EnumGrid.cristal2_indice_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesIndices"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                        <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Tratamiento"
                                        name="cristal2_tratamiento_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={1}
                                        control={control}
                                        entidad={["/api/tipos/", "02","OTTratamientoAdicional"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                                    />
                            </div>
                    </div>

                    <div className="w-full">
                    <h1 className='labelForm absolute z-10 top-[-2%] text-2xl w-[30%] text-center left-[30%]'>Anteojo 2</h1>
                    <div className="w-[35%] absolute top-[-6%] labelForm right-[5%]">
                            {/* <SelectInputComponent
                                        label="Grupo"
                                        name="cristal2_grupo2_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={2}
                                        control={control}
                                        entidad={["/api/proyectogrupos/", "02","PR001A"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                            /> */}
                    </div>
                    
                    <div className="mt-16 mx-auto w-[90%] relative mb-8 !h-[15rem] labelForm rounded-lg border border-blue-500 ">
                        <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OD</h1>

                        <div className="w-[90%] ml-4 flex items-center">
                                
                                <div className="w-[50%]">
                                    <TextInputComponent
                                        type="text"
                                        label="Codigo Cristal"
                                        name="cristal2_od"
                                        handleChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_od"] : data && data[EnumGrid.cristal2_od]}
                                        control={control}
                                        onlyRead={onlyRead || permiso_cristales}
                                        // error={errors.fecha_nacimiento}
                                    />
                                </div>

                                <div className="w-[50%]">
                                    <TextInputComponent
                                        type="number"
                                        label="Stock Actual"
                                        name="anteojo1_stock_actual_od"
                                        onlyRead={true}
                                        handleChange={handleInputChange}
                                        // data={armazon1 && armazon1[16]}
                                        control={control}
                                        defaultValue={30}
                                
                                        // error={errors.fecha_nacimiento}
                                    />
                                </div>
                            </div>



                            {/* <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                                <p className='ml-2 text-xl'>Marca: {cristal1OD && cristal1OD[0] && cristal1OD[0][3]}</p>
                                <p className='ml-2 text-xl'>Diseño: {cristal1OD && cristal1OD[0] && cristal1OD[0][7]} </p>
                                <p className='ml-2 text-xl'>Indice: {cristal1OD && cristal1OD[0] && cristal1OD[0][9]}</p>
                                <p className='ml-2 text-xl'>Material: {cristal1OD && cristal1OD[0] && cristal1OD[0][11]}</p>
                                <p className='ml-2 text-xl'>Color: {cristal1OD && cristal1OD[0] && cristal1OD[0][13]}</p>
                                <p className='ml-2 text-xl'>Tratamientos: {cristal1OD && cristal1OD[0] && cristal1OD[0][15]}</p>
                                <p className='ml-2 text-xl'>ESF: {cristal1OD && cristal1OD[0] && cristal1OD[0][18]}</p>
                                <p className='ml-2 text-xl'>CIL: {cristal1OD && cristal1OD[0] && cristal1OD[0][19]}</p>
                                <p className='ml-2 text-xl'>Diametro: {cristal1OD && cristal1OD[0] && cristal1OD[0][17]}</p>
                            
                            </div>     */}

                    </div>

                    
                    </div>
               </div>




               
               <div className="w-full">

               <div className="w-full !-mb-8 ">
                    <div className="w-[90%] mt-6">
                            <SelectInputComponent
                                        label="Diseño"
                                        name="cristal2_diseno_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_diseno_id"] : data && data[EnumGrid.cristal2_diseno_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesDisenos"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                            />
                    </div>
                    <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Material"
                                        name="cristal2_material_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_material_id"] : data && data[EnumGrid.cristal2_material_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesMateriales"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                            />
                    </div>
                    <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Color"
                                        name="cristal2_color_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_color_id"] : data && data[EnumGrid.cristal2_color_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesColores"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                            />
                    </div>
                </div>

                <div className="mt-16 mx-auto w-[90%] !h-[15rem] relative mb-8 labelForm rounded-lg border border-blue-500">
                    <h1 className='absolute w-[30%] z-10 labelForm text-center text-xl top-[-3%] left-[30%]'>OI</h1>
                    <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="text"
                                    label="Codigo Cristal"
                                    name="cristal2_oi"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cristal2_oi"] : data && data[EnumGrid.cristal2_oi]}
                                    control={control}
                                    onlyRead={onlyRead || permiso_cristales}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextInputComponent
                                    type="number"
                                    label="Stock Actual"
                                    name="anteojo1_stock_actual_OI"
                                    onlyRead={true}
                                    handleChange={handleInputChange}
                                    // data={armazon1 && armazon1[16]}
                                    control={control}
                                    defaultValue={30}
                                
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                        </div>



                        {/* <div className="w-[82%] mb-6 ml-8 mx-auto labelForm rounded-lg border border-blue-500">
                            <p className='ml-2 text-xl'>Marca: {cristal1OI && cristal1OI[0] && cristal1OI[0][3]}</p>
                            <p className='ml-2 text-xl'>Diseño: {cristal1OI && cristal1OI[0] && cristal1OI[0][7]} </p>
                            <p className='ml-2 text-xl'>Indice: {cristal1OI && cristal1OI[0] && cristal1OI[0][9]}</p>
                            <p className='ml-2 text-xl'>Material: {cristal1OI && cristal1OI[0] && cristal1OI[0][11]}</p>
                            <p className='ml-2 text-xl'>Color: {cristal1OI && cristal1OI[0] && cristal1OI[0][13]}</p>
                            <p className='ml-2 text-xl'>Tratamientos: {cristal1OI && cristal1OI[0] && cristal1OI[0][15]}</p>
                            <p className='ml-2 text-xl'>ESE: {cristal1OI && cristal1OI[0] && cristal1OI[0][18]}</p>
                            <p className='ml-2 text-xl'>CIL: {cristal1OI && cristal1OI[0] && cristal1OI[0][19]}</p>
                            <p className='ml-2 text-xl'>Diametro: {cristal1OI && cristal1OI[0] && cristal1OI[0][17]}</p>
                        
                            
                        </div>     */}


                </div>
               </div>


               </div>                             
                <div className="w-full  ml-4">
                     <div className="w-[90%]">
                            <SelectInputComponent
                                        label="Tratamiento adicional"
                                        name="cristal2_tratamiento_adicional_id"
                                        showRefresh={false}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_tratamiento_adicional_id"] : data && data[EnumGrid.cristal2_tratamiento_adicional_id]}
                                        control={control}
                                        entidad={["/api/tipos/", "02","CristalesTratamientos"]}
                                        // error={errors.establecimiento}
                                        customWidth={"345px"}
                                        readOnly={onlyRead || permiso_cristales}
                             />
                    </div>
                </div>
            </div>            
        </div>

    </form>
  )
}

export default FOTCristales