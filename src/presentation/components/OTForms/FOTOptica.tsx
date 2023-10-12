import React from 'react'
import { RadioButtonComponent, SelectInputComponent, TextInputComponent } from '..'
import { EnumGrid } from '../../views/mantenedores/MOT';


interface IOptica {
    control:any,
    onDataChange: any,
    formValues: any,
    data: any
}


const FOTOptica:React.FC<IOptica> = ({
    control,
    onDataChange,
    formValues,
    data
}) => {
    
    const handleInputChange = (e:any) => {
        const { name, value } = e;
        onDataChange({ [name]: value });        
        // Envia los datos al componente padre
    };


    //   console.log(data[EnumGrid.fecha_despacho])
    //   console.log( formValues && formValues["motivo"])
  return (
    <form action="">
        <div className='w-full labelForm rounded-lg border border-blue-500'>

            <div className="w-full ">
            <div className="w-[25%] mt-4 mb-8 ml-4">
                    <SelectInputComponent
                        label="Proyectos"
                        name="proyectos"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["proyecto"]  : data && data[EnumGrid.proyecto_codigo]}
                        control={control}
                        entidad={["/api/proyectos/", "02"]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                    />
                </div>
            </div>
            <div className='w-full mt-10  flex items-center'>
                <div className="w-[25%] ml-4">
                    <RadioButtonComponent
                        control={control}
                        label="Motivo"
                        name="motivo"
                        // data={data ? data[EnumGrid.motivo] : formValues["motivo"]}
                        data={formValues ? formValues["motivo"] : data && data[EnumGrid.motivo]}
                        options={["Venta", "Garantia"]}
                        // error={errors.sexo}
                        horizontal={true}
                        onChange={handleInputChange}
                    />                    
                </div>

                <div className="w-[24%]">
                    <TextInputComponent
                        type="text"
                        label="Area actual"
                        name="area_actual"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["area_actual"] : data && data[EnumGrid.area]}
                        control={control}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                
                <div className="w-[25%]">
                    <TextInputComponent
                        type="text"
                        label="Estado actual"
                        name="estado_actual"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["estado_actual"] : data && data[EnumGrid.estado]}
                        control={control}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                
                <div className="w-[22%]">
                    <SelectInputComponent
                        label="Puntos de Venta"
                        name="punto_venta"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["punto_venta"] : data && data[EnumGrid.punto_venta_id]}
                        // data={data && data[EnumGrid.establecimiento_id]}
                        control={control}
                        entidad={["/api/puntosventa/", "02"]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
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
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[25%]">
                    <TextInputComponent
                        type="date"
                        label="Fecha taller"
                        name="fecha_taller"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["fecha_taller"] : data &&  data[EnumGrid.fecha_entrega_taller]}
                        control={control}
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
                                name="motivo"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["motivo"] : data && data[EnumGrid.motivo_garantia_id]}
                                control={control}
                                entidad={["/api/tipos/", "02", "OTMotivoGarantia"]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
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
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                        
                        <div className="w-[35%]">
                            <TextInputComponent
                                type="text"
                                label="Resolucion"
                                name="resolucion"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["resolucion"] : data && data[EnumGrid.resolucion_garantia]}
                                control={control}
                                // error={errors.fecha_nacimiento}
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
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>


                <div className="w-[35%] ml-8  mx-auto items-center grid ">
                    <div className="">
                        <TextInputComponent
                            type="number"
                            label="N° Worktracking"
                            name="numero_worktracking"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["worktracking"] : data && data[EnumGrid.worktracking]}
                            control={control}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="">
                        <TextInputComponent
                            type="number"
                            label="Nota de Venta"
                            name="nota_venta"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["nota_vetna"] : data && data[EnumGrid.nota_venta]}
                            control={control}
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
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="">
                        <TextInputComponent
                            type="number"
                            label="Folio interno mandante"
                            name="folio_mandante"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["folio_mandante"] : data && data[EnumGrid.folio_mandante]}
                            control={control}
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