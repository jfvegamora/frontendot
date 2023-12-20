import React,{
    useEffect,
    // useEffect, 
    useState} from 'react'
import { RadioButtonComponent, SelectInputComponent, TextInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
// import { Switch , switchButton} from "@material-tailwind/react";
import Switch from "react-switch";
import axios from 'axios';
import { validationOTlevel1, validationOTlevel2 } from '../../utils/validationOT';
import { fecha_despacho, fecha_entrega_cliente, fecha_entrega_taller, fetchFechas } from '../../utils';
import SelectInputTiposComponent from '../forms/SelectInputTiposComponent';
import { AppStore, useAppSelector } from '../../../redux/store';
import { URLBackend } from '../../hooks/useCrud';
import { codigoProyecto } from '../../views/forms/FOT';
import { toast } from 'react-toastify';

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
}) => {
    const strUrl = `${URLBackend}/api/ot/listado`
    const impresion = data && data[9] === 1 ? true: false
    const [isToggleImpresion, setIsToggleImpresion] = useState(impresion || false)
    const [isToggleValidacion, setIsToggleValidacion] = useState(false)
    const [_motivo, setMotivo] = useState(false)
    const [strCodigoProyecto, setStrCodigoProyecto] = useState("");
    const userID:any = useAppSelector((store: AppStore) => store.user?.id);
    const _origen:any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);
    const _estado = data && data[EnumGrid.estado_id]


   

    const handleInputChange = (e:any) => {
        const { name, value } = e;
       
        console.log(name)   
        console.log(value)
        
        
        if(name === "proyecto"){
            setStrCodigoProyecto(value)
        }

        if(name === 'fecha_atencion'){
            fetchFechas(value, strCodigoProyecto)
        }   


        if(name === 'Resolucion'){
            handleSwitchResolucion(value)
        }


        validationOTlevel1(name, value)
        validationOTlevel2(name, value)
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



    
    const handleSwitchResolucion = async(value:string) => {
        try {
            const query = `?query=08&_folio=${data[EnumGrid.folio]}&_p2=${value === 'Rechazada' ? 0 : 1}&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`
            const result = await axios(`${strUrl}/${query}`);
            if(result.status === 200){
                toast.success('Resolucion cambiada')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const handleSwitchValidation = async(event:any) => {
        setIsToggleValidacion((prev)=>!prev)
        console.log(event)
        try { 
            const query = `?query=07&_folio=${data[EnumGrid.folio]}&_p2=${event === true ? 1 : 0}&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`
            const result = await axios(`${strUrl}/${query}`);
            if(result.status === 200){
                toast.success('Estado cambiado')
            }

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    
    const handleSwitchImpresion = async (event:any) => {
        setIsToggleImpresion((prev)=>!prev)
        try {
            const query = `?query=06&_folio=${data[EnumGrid.folio]}&_p2=${event === true ? 1 : 0}&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`
            const result = await axios(`${strUrl}/${query}`);
            if(result.status === 200){
                toast.success('Estado cambiado')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    useEffect(()=>{
        if(data){
            data[EnumGrid.estado_impresion_id] === '1' ? setIsToggleImpresion(true) : setIsToggleValidacion(false);
            data[EnumGrid.validar_parametrizacion_id] === '1' ? setIsToggleValidacion(true) : setIsToggleValidacion(false);
        }
    },[data])
//  console.log(fecha_entrega_taller.ue)
// console.log(data[33])

// console.log(isEditting)
// console.log(fecha_despacho.value)


return (
    <form action="">
        <div className='w-full labelForm rounded-lg border radioComponent'>
            <div className="w-full flex items-center justify-between rowForm   !h-[6rem]">
                <div className="w-[50%] mt-6 mb-8 ml-[2rem]">
                    <SelectInputComponent
                        label="Proyecto"
                        name="proyecto"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["proyecto"]  : data && data[EnumGrid.proyecto_codigo]}
                        control={control}
                        entidad={["/api/proyectos/", "07", userID]}
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
                                    <Switch onChange={(e)=>handleSwitchValidation(e)} checked={isToggleValidacion}/>
                                    <label className='ml-2'>Validar Parametrización</label>
                                </div>
                            </div>
                        )}
                        {!permiso_estado_impresion && (
                            <div className="w-[25%] mt-4 mb-8 ml-4 px-[1.5rem] ">
                                <div className=" items-center flex">
                                    <Switch onChange={(e)=>handleSwitchImpresion(e)} checked={isToggleImpresion}/>
                                    <label className='ml-2'>OT Impresa</label>
                                </div>
                            </div>
                        )}
                    
                    </>
                )}
                
            
            
            
            
            </div>
            <div className='w-full mt-10  flex items-center rowForm !h-[5rem]'>
                <div className="w-[30%] ml-[2rem] -mt-[0.3rem]">
                    <SelectInputComponent
                        label="Punto de Venta"
                        name="punto_venta_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["punto_venta_id"] : data && data[EnumGrid.punto_venta_id]}
                        // data={data && data[EnumGrid.establecimiento_id]}
                        control={control}
                        entidad={["/api/puntosventa/", "06", codigoProyecto.value]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                        readOnly={onlyRead}
                    />
                </div>

                <div className="w-[25%] ml-4">
                    <RadioButtonComponent
                        control={control}
                        label="Motivo"
                        name="motivo"
                        data={formValues ? formValues["motivo"] : data && data[EnumGrid.motivo] || !isEditting && 'Venta'}
                        options={["Venta", "Garantía"]}
                        // error={errors.sexo}
                        horizontal={true}
                        readOnly={true}
                        onChange={handleInputChange}
                    />                    
                </div>

                <div className="w-[20%] ml-4">
                    <TextInputComponent
                        type="text"
                        label="Area actual"
                        name="area"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["area"] : data && data[EnumGrid.area]}
                        control={control}
                        onlyRead={true}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                
                <div className="w-[20%] ml-4">
                    <TextInputComponent
                        type="text"
                        label="Estado actual"
                        name="estado"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["estado"] : data && data[EnumGrid.estado]}
                        control={control}
                        onlyRead={true}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                
            </div>

            <div className="w-[100%]  flex items-center rowForm !mt-20 !h-[5rem] ">

                <div className="w-[15%] ml-4">
                    <TextInputComponent
                        type="date"
                        label="Fecha atención"
                        name="fecha_atencion"
                        handleChange={handleInputChange}
                        // data={formValues ? formValues["fecha_atencion"] : data && data[EnumGrid.fecha_atencion]}
                        data={data && data[EnumGrid.fecha_atencion] || (formValues && formValues["fecha_atencion"])}
                        control={control}
                        onlyRead={onlyRead}
                        isOT={true}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[15%]">
                    <TextInputComponent
                        type="date"
                        label="Fecha taller"
                        name="fecha_entrega_taller"
                        handleChange={handleInputChange}
                        // data={(data && data[EnumGrid.fecha_entrega_taller]) || fecha_entrega_taller || (formValues && formValues["fecha_entrega_taller"])}
                        data={(data && data[EnumGrid.fecha_entrega_taller]) || (formValues && formValues["fecha_entrega_taller"]) || fecha_entrega_taller }
                        control={control}
                        onlyRead={onlyRead}
                        isOT={true}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[15%]">
                    <TextInputComponent
                        type="date"
                        label="Fecha despacho"
                        name="fecha_despacho"
                        handleChange={handleInputChange}
                        data={(data && data[EnumGrid.fecha_despacho]) || (formValues && formValues["fecha_entrega_taller"]) || fecha_despacho}
                        control={control}
                        onlyRead={onlyRead}
                        isOT={true}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[15%]">
                    <TextInputComponent
                        type="date"
                        label="Fecha entrega cliente"
                        name="fecha_entrega_cliente"
                        handleChange={handleInputChange}
                        data={(data && data[EnumGrid.fecha_entrega_cliente]) || (formValues && formValues["fecha_entrega_taller"]) || fecha_entrega_cliente}
                        control={control}
                        onlyRead={onlyRead}
                        isOT={true}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
            
            </div>

            <div className="w-full mt-10   !h-[17rem] flex items-center rowForm">
                <div className="w-[90%] h-[90%]  ml-8 mx-auto flex flex-col justify-around items-center ">
                    <div className="flex items-center w-[101%] h-[46%] mx-auto rounded-lg radioComponent relative">
                        <label className='labelForm absolute left-4 text-center top-[-20%] w-[10%]'>Garantia</label>
                        <div className="w-[35%] ml-[1rem] ">
                            <SelectInputTiposComponent
                                label="Motivo"
                                name="motivo_garantia_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["motivo_garantia_id"] : data && data[EnumGrid.motivo_garantia_id]}
                                control={control}
                                entidad={"OTMotivoGarantia"}
                                readOnly={true}

                           />
                        </div>
                        
                        <div className="w-[30%]">
                            <TextInputComponent
                                type="number"
                                label="Folio Asociado"
                                name="folio_asociado"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["folio_asociado"] : data && data[EnumGrid.folio_asociado]}
                                control={control}
                                onlyRead={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        
                        <div className="w-[35%] mr-[1rem]">
                            <RadioButtonComponent
                                control={control}
                                label="Resolucion"
                                name="resolucion_garantia_id"
                                // data={data ? data[EnumGrid.motivo] : formValues["motivo"]}
                                data={formValues ? formValues["resolucion_garantia_id"] : data && data[EnumGrid.resolucion_garantia_id] === 0 ? 'Rechazada' : 'Aceptada'}
                                options={["Aceptada", "Rechazada"]}
                                // error={errors.sexo}
                                horizontal={true}
                                // readOnly={!isEditting || !motivo || onlyRead || permiso_resolucion_garantia}
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