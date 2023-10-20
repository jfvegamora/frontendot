import React, { useState } from 'react'
import { RadioButtonComponent, SelectInputComponent, TextInputComponent } from '..'
import { SEXO, TIPO_CLIENTE } from '../../utils';
import RegProComponent from '../forms/RegProComponent';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { EnumGrid as EnumClientes } from '../../views/mantenedores/MClientes';
import axios from 'axios';


interface IClientes {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    setExistCliente:any,
    strCodigoProyecto:string,
}


const FOTClientes:React.FC<IClientes> = ({
    control,
    onDataChange,
    formValues,
    data,
    setExistCliente,
    strCodigoProyecto
}) => {
    const [inputState, setInputState] = useState({})

    const fetchCliente = async(cliente_rut:string) => {
        try {
            const cliente = await axios(`https://mtoopticos.cl/api/clientes/listado/?query=01&_p1=${cliente_rut}`)
            console.log(cliente)
            
            return cliente          
        } catch (error) {
            throw error
        }    
    }
    
    const handleInputChange = (e:any) => {
        const { name, value } = e;
        console.log(name)
        console.log(value)


        if(name === 'cliente_rut'){
            fetchCliente(value).then((data:any)=>{
                console.log(data["data"][0][2])
                setExistCliente(true)
                onDataChange({['cliente_nombre']: data["data"][0][EnumClientes.nombre]})
                onDataChange({['cliente_sexo']: data["data"][0][EnumClientes.sexo]})
                onDataChange({['cliente_tipo']: data["data"][0][EnumClientes.tipo]})
                onDataChange({['cliente_fecha_nacimiento']: data["data"][0][EnumClientes.fecha_nacimiento]})
                onDataChange({['cliente_correo']: data["data"][0][EnumClientes.correo]})
                onDataChange({['cliente_telefono']: data["data"][0][EnumClientes.telefono]})

            }).catch((error:any)=>{
                setExistCliente(false)
                console.log(error)
            })
        }
        onDataChange({ [name]: value }); // Envia los datos al componente padre
      };


      
      
     console.log(formValues)
    //  console.log(inputState)
     console.log(formValues && formValues["cliente_nombre"])
  return (
    <form action="">
        <div className='w-full h-[40rem]  labelForm rounded-lg border border-blue-500'>
            
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
                        name="establecimiento_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={formValues ? formValues["establecimiento_id"]  : data && data[EnumGrid.establecimiento_id]}
                        control={control}
                        entidad={["/api/establecimientos/", "02", strCodigoProyecto]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                    />
                </div> 
            </div>


            <div className="w-[100%] mt-10 h-[27rem] flex items-center ">
                
                <div className="w-[55%] h-[90%] ml-8 items-center   ">
                    <div className='w-full flex items-center  h-1/2'>
                        <div className="w-[25%] ">
                            <RadioButtonComponent
                                control={control}
                                label="Sexo"
                                name="cliente_sexo"
                                data={formValues ? formValues["cliente_sexo"]  : data && data[EnumGrid.cliente_sexo]}
                            
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
                                name="cliente_tipo"
                                data={formValues ? formValues["cliente_tipo"]  : data && data[EnumGrid.cliente_tipo]}
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
                                name="cliente_fecha_nacimiento"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["cliente_fecha_nacimiento"]  : data && data[EnumGrid.cliente_fecha_nacimiento]}
                                
                                control={control}
                                // error={errors.fecha_nacimiento}
                            />
                            </div>
                            <div className="w-[50%]">
                            <TextInputComponent
                                type="text"
                                label="Telefono"
                                name="cliente_telefono"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["cliente_telefono"]  : data && data[EnumGrid.cliente_telefono]}
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
                                    name="cliente_correo"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cliente_correo"]  : data && data[EnumGrid.cliente_correo]}
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
                            data={formValues ? formValues  : data && data[EnumGrid.cliente_region_id]}
                            handleSelectChange={handleInputChange}
                        />
                   
                    <div className="-mt-4">
                        <TextInputComponent
                            type="text"
                            label="N° calle"
                            name="cliente_direccion"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["cliente_direccion"]  : data && data[EnumGrid.cliente_direccion]}
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