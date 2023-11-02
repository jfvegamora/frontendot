import React,{useState} from 'react'
import { RadioButtonComponent, SelectInputComponent, TextInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
// import { Switch , switchButton} from "@material-tailwind/react";
import Switch from "react-switch";
import axios from 'axios';
import { validationOTlevel1, validationProyectos } from '../../utils/validationOT';

interface IOptica {
    control:any,
    onDataChange: any,
    formValues: any,
    data: any,
    setToggle?:any,
    isEditting?:boolean
    setIsMotivo?:any
    onlyRead?:boolean;
    permiso_estado_impresion:boolean,
    permiso_estado_validacion:boolean,
    permiso_resolucion_garantia:boolean
}


const FOTOptica:React.FC<IOptica> = ({
    control,
    onDataChange,
    formValues,
    data,
    setToggle,
    isEditting,
    setIsMotivo,
    onlyRead,
    permiso_estado_impresion,
    permiso_estado_validacion,
    permiso_resolucion_garantia
}) => {
    const strUrl = 'https://mtoopticos.cl/api/ot/listado'
    const impresion = data && data[9] === 1 ? true: false
    const [isToggleImpresion, setIsToggleImpresion] = useState(impresion || false)
    const [isToggleValidacion, setIsToggleValidacion] = useState(false)
    const [motivo, setMotivo] = useState(false)
    
    const handleInputChange = (e:any) => {
        const { name, value } = e;
        console.log(name)
        console.log(value)

        validationOTlevel1(name, value)
        //metodo para validar pasando name value 
        if(name === "resolucion_garantia"){
            setToggle(value)
        }
        if(name === "motivo"){
            setMotivo((prev)=>!prev)
            setIsMotivo((prev:any)=>!prev)
        }
        onDataChange({ [name]: value });        
        // Envia los datos al componente padre
    };
    

    //   console.log(data[EnumGrid.fecha_despacho])
    //   console.log( formValues && formValues["motivo"])
    
    const handleSwitchValidation = () => {
        setIsToggleValidacion((prev)=>!prev)
    }
    
    const handleSwitchImpresion = async (event:any) => {
        setIsToggleImpresion((prev)=>!prev)
        console.log(event)
        //_folio= folio ot
        //_p2 = 1 si se activa y 0 si se apaga
        try {
            const query = `?query=06&_folio=${data[EnumGrid.folio]}&_p2=${event === true ? 1 : 0}`
            const result = await axios(`${strUrl}/${query}`);
            console.log(result)
            
        } catch (error) {
            console.log(error)
        }
    }



 
  return (
    <form action="">
        <div className='w-full labelForm rounded-lg border border-blue-500'>

            <div className="w-full flex items-center justify-between">
                <div className="w-[25%] mt-4 mb-8 ml-4">
                    <SelectInputComponent
                        label="Proyectos"
                        name="proyecto"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["proyecto"]  : data && data[EnumGrid.proyecto_codigo]}
                        control={control}
                        entidad={["/api/proyectos/", "02"]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                        readOnly={onlyRead}
                    />
                </div>
                {isEditting && !onlyRead && (
                    <>
                        {!permiso_estado_validacion && (
                            <div className="w-[25%] mt-4 mb-8 ml-4 px-[1.5rem] ">
                                <div className=" items-center flex">
                                    <Switch onChange={handleSwitchValidation} checked={isToggleValidacion}/>
                                    <label className='ml-2'>Estado de Validacion</label>
                                </div>
                            </div>
                        )}
                        {!permiso_estado_impresion && (
                            <div className="w-[25%] mt-4 mb-8 ml-4 px-[1.5rem] ">
                                <div className=" items-center flex">
                                    <Switch onChange={(e)=>handleSwitchImpresion(e)} checked={isToggleImpresion}/>
                                    <label className='ml-2'>Estado de Impresion</label>
                                </div>
                            </div>
                        )}
                    
                    </>
                )}
                
            
            
            
            
            </div>
            <div className='w-full mt-10  flex items-center'>
                <div className="w-[25%] ml-4">
                    <RadioButtonComponent
                        control={control}
                        label="Motivo"
                        name="motivo"
                        data={formValues ? formValues["motivo"] : data && data[EnumGrid.motivo] || !isEditting && 'Venta'}
                        options={["Venta", "Garantía"]}
                        // error={errors.sexo}
                        horizontal={true}
                        readOnly={!isEditting || onlyRead}
                        onChange={handleInputChange}
        
                    />                    
                </div>

                <div className="w-[24%]">
                    <TextInputComponent
                        type="text"
                        label="Area actual"
                        name="area"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["area"] : data && data[EnumGrid.area]}
                        control={control}
                        onlyRead={onlyRead}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                
                <div className="w-[25%]">
                    <TextInputComponent
                        type="text"
                        label="Estado actual"
                        name="estado"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["estado"] : data && data[EnumGrid.estado]}
                        control={control}
                        onlyRead={onlyRead}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                
                <div className="w-[22%] ml-2">
                    <SelectInputComponent
                        label="Puntos de Venta"
                        name="punto_venta_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["punto_venta_id"] : data && data[EnumGrid.punto_venta_id]}
                        // data={data && data[EnumGrid.establecimiento_id]}
                        control={control}
                        entidad={["/api/puntosventa/", "02"]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                        readOnly={onlyRead}
                    />
                </div>
            </div>

            <div className="w-[100%]  flex items-center mt-10 ">

                <div className="w-[25%] ml-4">
                    <TextInputComponent
                        type="date"
                        label="Fecha atención"
                        name="fecha_atencion"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["fecha_atencion"] : data && data[EnumGrid.fecha_atencion]}
                        control={control}
                        onlyRead={onlyRead}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[25%]">
                    <TextInputComponent
                        type="date"
                        label="Fecha taller"
                        name="fecha_entrega_taller"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["fecha_entrega_taller"] : data &&  data[EnumGrid.fecha_entrega_taller]}
                        control={control}
                        onlyRead={onlyRead}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[25%]">
                    <TextInputComponent
                        type="date"
                        label="Fecha despacho"
                        name="fecha_despacho"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["fecha_despacho"] : data && data[EnumGrid.fecha_despacho]}
                        control={control}
                        onlyRead={onlyRead}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[25%]">
                    <TextInputComponent
                        type="date"
                        label="Fecha entrega cliente"
                        name="fecha_entrega_cliente"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["fecha_entrega_cliente"] : data && data[EnumGrid.fecha_entrega_cliente]}
                        control={control}
                        onlyRead={onlyRead}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
            
            </div>

            <div className="w-full mt-10   h-[20rem] flex items-center">
                <div className="w-[90%] h-[90%]  ml-8 mx-auto flex flex-col justify-around items-center  ">
                    <div className="flex items-center w-[101%] h-[46%] mx-auto rounded-lg border border-blue-500 relative">
                        <label className='labelForm absolute left-4 text-center top-[-8%] w-[10%]'>Garantia</label>
                        <div className="w-[35%] ">
                            <SelectInputComponent
                                label="Motivo"
                                name="motivo_garantia_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["motivo_garantia_id"] : data && data[EnumGrid.motivo_garantia_id]}
                                control={control}
                                entidad={["/api/tipos/", "02", "OTMotivoGarantia"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                                readOnly={data && data[EnumGrid.motivo] === 'Garantía' ? false : true || onlyRead}

                           />
                        </div>
                        
                        <div className="w-[35%]">
                            <TextInputComponent
                                type="number"
                                label="Folio Asociado"
                                name="folio_asociado"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["folio_asociado"] : data && data[EnumGrid.folio_asociado]}
                                control={control}
                                onlyRead={data && data[EnumGrid.motivo] === 'Garantía' ? false : true || onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        
                        <div className="w-[35%]">
                            {/* <TextInputComponent
                                type="text"
                                label="Resolucion"
                                name="resolucion_garantia"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["resolucion_garantia"] : data && data[EnumGrid.resolucion_garantia]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            /> */}
                            <RadioButtonComponent
                                control={control}
                                label="Resolucion"
                                name="resolucion_garantia_id"
                                // data={data ? data[EnumGrid.motivo] : formValues["motivo"]}
                                data={formValues ? formValues["resolucion_garantia_id"] : data && data[EnumGrid.resolucion_garantia_id]}
                                options={["Aceptada", "Rechazada"]}
                                // error={errors.sexo}
                                horizontal={true}
                                readOnly={!isEditting || !motivo || onlyRead || permiso_resolucion_garantia}
                                onChange={handleInputChange}
                                
                            />  
                        </div>


                    </div>

                    <div className="w-[104%] ml-2">
                        <TextInputComponent
                            type="text"
                            label="Observaciones"
                            name="observaciones"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["observaciones"] : data && data[EnumGrid.observaciones]}
                            control={control}
                            onlyRead={onlyRead}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>


                <div className="w-[35%] ml-8  mx-auto items-center grid ">
                    <div className="">
                        <TextInputComponent
                            type="number"
                            label="N° Worktracking"
                            name="worktracking"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["worktracking"] : data && data[EnumGrid.worktracking]}
                            control={control}
                            onlyRead={onlyRead}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="">
                        <TextInputComponent
                            type="number"
                            label="Nota de Venta"
                            name="nota_venta"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["nota_venta"] : data && data[EnumGrid.nota_venta]}
                            control={control}
                            onlyRead={onlyRead}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="">
                        <TextInputComponent
                            type="number"
                            label="N° Factura"
                            name="numero_factura"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["numero_factura"] : data && data[EnumGrid.numero_factura]}
                            control={control}
                            onlyRead={onlyRead}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="">
                        <TextInputComponent
                            type="number"
                            label="Folio interno mandante"
                            name="folio_interno_mandante"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["folio_interno_mandante"] : data && data[EnumGrid.folio_interno_mandante]}
                            control={control}
                            onlyRead={onlyRead}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>
            </div>


        </div>
    </form>
  )
}

export default FOTOptica