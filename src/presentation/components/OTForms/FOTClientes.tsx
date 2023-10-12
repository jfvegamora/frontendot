import React from 'react'
import { RadioButtonComponent, SelectInputComponent, TextInputComponent } from '..'
import { SEXO, TIPO_CLIENTE } from '../../utils';
import RegProComponent from '../forms/RegProComponent';
import { EnumGrid } from '../../views/mantenedores/MOT';


interface IClientes {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any
}


const FOTClientes:React.FC<IClientes> = ({
    control,
    onDataChange,
    formValues,
    data
}) => {
    
    const handleInputChange = (e:any) => {
        const { name, value } = e;
        onDataChange({ [name]: value }); // Envia los datos al componente padre
      };

      
     
  return (
    <form action="">
        <div className='w-full h-full labelForm rounded-lg border border-blue-500'>
            
            {/* <div className='w-full  flex  items-center pt-4 '>
                <div className="w-[55.5%] ml-4">
                    <SelectInputComponent
                        label="Proyectos"
                        name="proyectos"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues && formValues["proyectos"]}
                        control={control}
                        entidad={["/api/proyectos/", "02"]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                    />
                </div>
            </div> */}


            <div className="w-[100%] mt-10 flex items-center ">

                <div className="w-[15%] ml-4">
                    <TextInputComponent
                        type="text"
                        label="Rut"
                        name="cliente_rut"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["cliente_rut"]  : data && data[EnumGrid.cliente_rut]}
                        control={control}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[40%]">
                    <TextInputComponent
                        type="text"
                        label="Nombre"
                        name="cliente_nombre"
                        handleChange={handleInputChange}
                        data={formValues ? formValues["cliente_nombre"]  : data && data[EnumGrid.cliente_nomnbre]}
                        control={control}
                        // error={errors.fecha_nacimiento}
                    />
                </div>
                <div className="w-[30%] ml-8">
                    <SelectInputComponent
                        label="Establecimiento"
                        name="establecimiento"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["establecimiento"]  : data && data[EnumGrid.establecimiento_id]}
                        control={control}
                        entidad={["/api/establecimientos/", "02"]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                    />
                </div> 
            </div>


            <div className="w-[100%] mt-10 h-[20rem] flex items-center">
                
                <div className="w-[55%] h-[90%] ml-8 items-center   ">
                    <div className='w-full flex items-center  h-1/2'>
                        <div className="w-[25%] ">
                            <RadioButtonComponent
                                control={control}
                                label="Sexo"
                                name="sexo"
                                data={formValues && formValues["sexo"]}
                            
                                options={[SEXO.masculino, SEXO.femenino, SEXO.no_aplica]}
                                // error={errors.sexo}
                                // horizontal={true}
                                onChange={handleInputChange}
                            />    
                        </div>
                        <div className="w-[25%] ml-20">
                            <RadioButtonComponent
                                control={control}
                                label="Tipo"
                                name="tipo"
                                data={formValues && formValues["tipo"]}
                                options={[
                                    TIPO_CLIENTE.beneficiario, 
                                    TIPO_CLIENTE.particular,
                                    TIPO_CLIENTE.optica
                                ]}
                                // error={errors.sexo}
                                // horizontal={true}
                                onChange={handleInputChange}
                            />    
                        </div>
                    </div>
                    <div className='w-full  h-1/2'>
                        <div className="w-full h-1/2 flex ml-[-2%] items-center ">
                            <div className="w-[50%]">
                            <TextInputComponent
                                type="date"
                                label="Fecha de nacimiento"
                                name="fecha_nacimiento"
                                handleChange={handleInputChange}
                                data={formValues && formValues["fecha_nacimiento"]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                            </div>
                            <div className="w-[50%]">
                            <TextInputComponent
                                type="number"
                                label="Telefono"
                                name="telefono"
                                handleChange={handleInputChange}
                                data={formValues && formValues["telefoono"]}
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                            </div>
                        </div>
                        <div className="w-full h-1/2 ml-[-2%] ">
                            <div className="w-[100%]">
                                <TextInputComponent
                                    type="text"
                                    label="Correo"
                                    name="correo"
                                    handleChange={handleInputChange}
                                    data={formValues && formValues["correo"]}
                                    control={control}
                                    // error={errors.fecha_nacimiento}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-[40%] rounded-lg border border-blue-500 ml-8  mx-auto items-center grid relative">
                    
                    <label className='labelForm w-[25%] top-[-8%] left-[2%] pl-8 absolute z-10'>Direccion</label>
                        <RegProComponent
                            control={control}
                            EnumGrid={EnumGrid}
                            isEditting={false}
                            errors={""}
                            data={formValues && formValues}
                            handleSelectChange={handleInputChange}
                        />
                   
                    <div className="-mt-4">
                        <TextInputComponent
                            type="text"
                            label="N° calle"
                            name="direccion"
                            handleChange={handleInputChange}
                            data={formValues && formValues["direccion"]}
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

export default FOTClientes;