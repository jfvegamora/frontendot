import React, { useState } from 'react'
import { RadioButtonComponent, SelectInputComponent } from '..'
import { SEXO, TIPO_CLIENTE, codigoProyecto, isExistClient } from '../../utils';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { EnumGrid as EnumClientes } from '../../views/mantenedores/MClientes';
import axios from 'axios';
import { validationOTlevel1, validationOTlevel2 } from '../../utils/validationOT';
import RegProCom from '../RegProCom';
import { URLBackend } from '../../hooks/useCrud';

import { toast } from 'react-toastify';
import TextInputInteractive from '../forms/TextInputInteractive';


interface IClientes {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    setExistCliente:any,
    onlyRead?:boolean;
    register?:any
    isEditting?:boolean;
}


const FOTClientes:React.FC<IClientes> = ({
    control,
    onDataChange,
    formValues,
    data,
    setExistCliente,
    register,
    isEditting
}) => {
    const [_clienteData, setClienteData] = useState()
    const fetchCliente = async(cliente_rut:string) => {
        try {
            const cliente = await axios(`${URLBackend}/api/ot/listado/?query=13&_rut=${cliente_rut}`)
            if (Array.isArray(cliente.data)) {
                  const innerArray = cliente.data[0];
        
                  if (Array.isArray(innerArray) && innerArray.length === 1) {
                    const mensaje = innerArray[0];
                    if (mensaje === 'OK') {
                      // Tipo 1 (OK)
                      console.log('Tipo 1 (OK):', cliente.data);
                      
                      onDataChange({['cliente_nombre']: " "})    
                      onDataChange({['cliente_sexo']: " "})
                      onDataChange({['cliente_tipo']: " "})
                      onDataChange({['cliente_fecha_nacimiento']: " "})
                      onDataChange({['cliente_correo']: " "})
                      onDataChange({['cliente_telefono']: " "})



                      onDataChange({['cliente_region']:0})
                      onDataChange({['cliente_comuna']:0})
                      onDataChange({['cliente_provincia']:0})
                      onDataChange({['cliente_direccion']: " "})


                    } else if (typeof mensaje === 'string' && mensaje.startsWith('ERROR:')) {
                      toast.error(cliente.data[0][0])
                    }
                  } else if (Array.isArray(innerArray) && innerArray.length === 17) {
                    setClienteData(data)
                    isExistClient.value = true;
                    onDataChange({['cliente_nombre']: cliente.data[0][EnumClientes.nombre]})    
                    onDataChange({['cliente_sexo']: cliente.data[0][EnumClientes.sexo]})
                    onDataChange({['cliente_tipo']: cliente.data[0][EnumClientes.tipo]})

                    onDataChange({['cliente_fecha_nacimiento']: cliente.data[0][EnumClientes.fecha_nacimiento]})
                    onDataChange({['cliente_correo']: cliente.data[0][EnumClientes.correo]})
                    onDataChange({['cliente_telefono']: cliente.data[0][EnumClientes.telefono]})
                    onDataChange({['cliente_region']: cliente.data[0][EnumClientes.region_id]})
                    onDataChange({['cliente_provincia']: cliente.data[0][EnumClientes.provincia_id]})
                    onDataChange({['cliente_comuna']: cliente.data[0][EnumClientes.comuna_id]})
                    onDataChange({['cliente_direccion']: cliente.data[0][EnumClientes.direccion]})
                  }
                }
              
              
            return cliente.data          
        } catch (error) {
            console.log('FetchCliente Error:', error)
            throw error
        }    
    }

    
    const handleInputChange = (e:any) => {
        const { name, value } = e;
        console.log(name)
        console.log(value)
        onDataChange({ [name]: value });

        validationOTlevel1(name, value);
        validationOTlevel2(name,value);

        if(name === 'cliente_rut'){
            fetchCliente(value).catch((error:any)=>{
                setExistCliente(false)
                console.log(error)
            })
        }
      };



    return (
    <form action="">
        <div className='w-full frameOTForm !h-[33rem]'>
            <div className="w-full flex items-center rowForm !h-[4rem]">
                <div className="w-[80%]      flex mx-auto">
                    <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full !mt-4">
                            <TextInputInteractive
                                type="text"
                                label="Rut"
                                name="cliente_rut"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["cliente_rut"]  : data && data[EnumGrid.cliente_rut]}
                                control={control}
                                onlyRead={isEditting}
                                isOT={true}
                            />
                        </div>
                    </div>

                    <div className="input-container items-center rowForm w-[40%]">
                        <div className="w-full !mt-4">
                            <TextInputInteractive
                                control={control}
                                type="text"
                                label="Nombre"
                                name="cliente_nombre"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["cliente_nombre"]  : data && data[EnumGrid.cliente_nomnbre]}
                                onlyRead={isEditting}
                                isOT={true}
                            />
                        </div>
                    </div>
                    <div className="input-container items-center rowForm w-[40%]">
                        <div className="w-full !mt-[1rem] ml-4 ">
                            <SelectInputComponent
                                label="Establecimiento"
                                name="establecimiento_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["establecimiento_id"]  : data && data[EnumGrid.establecimiento_id]}
                                control={control}
                                entidad={["/api/establecimientos/", "06", codigoProyecto.value]}
                                customWidth={"345px"}
                                readOnly={isEditting}
                                tabIndex={1}
                            />
                        </div> 
                    </div>


                </div>
            </div>

            <div className="w-full flex items-center rowForm !h-[26rem]">
                <div className="w-[50%] ml-8 items-center">
                    <div className='w-[89%] mx-auto !mt-2 !mb-4 flex items-center  h-1/2'>
                        <div className="w-full flex  !ml-[5rem]">
                            <div className="w-[40%]  ">
                                <RadioButtonComponent
                                    control={control}
                                    label="Sexo"
                                    name="cliente_sexo"
                                    data={formValues ? formValues["cliente_sexo"]  : data && data[EnumGrid.cliente_sexo]}
                                    options={[SEXO.masculino, SEXO.femenino, SEXO.no_aplica]}
                                    // horizontal={true}
                                    onChange={handleInputChange}
                                    readOnly={isEditting}
                                />    
                            </div>
                            <div className="w-[40%] ml-10">
                                <RadioButtonComponent
                                    control={control}
                                    label="Tipo"
                                    name="cliente_tipo"
                                    tabIndex={1}
                                    data={formValues ? formValues["cliente_tipo"]  : data && data[EnumGrid.cliente_tipo]}
                                    options={[
                                        TIPO_CLIENTE.beneficiario, 
                                        TIPO_CLIENTE.particular,
                                        TIPO_CLIENTE.optica
                                    ]}
                                     // horizontal={true}
                                    onChange={handleInputChange}
                                    readOnly={isEditting}
                                />    
                            </div>
                        </div>
                    </div>


                    <div className='w-[90%] mx-auto mr-4 '>
                        <div className="w-full h-1/2 flex ml-[-2%]  items-center rowForm  ">
                            <div className="mx-auto flex w-[80%]">
                                <div className="w-[44%]">
                                <TextInputInteractive
                                    type="date"
                                    label="Fecha nacimiento"
                                    name="cliente_fecha_nacimiento"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cliente_fecha_nacimiento"]  : data && data[EnumGrid.cliente_fecha_nacimiento]}
                                    control={control}
                                    onlyRead={isEditting}
                                    isOT={true}
                                />
                                </div>
                                <div className="w-[47%] ml-12      ">
                                <TextInputInteractive
                                    type="text"
                                    label="Teléfono"
                                    name="cliente_telefono"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cliente_telefono"]  : data && data[EnumGrid.cliente_telefono]}
                                    control={control}
                                    isOT={true}
                                    onlyRead={isEditting}
                                />
                                </div>
                            </div>
                        </div>


                        <div className="w-full flex items-center rowForm ">
                            <div className="w-full input-container flex items-center">
                                <div className="w-[80%] mx-auto">
                                    <TextInputInteractive
                                        type="text"
                                        label="Correo"
                                        name="cliente_correo"
                                        handleChange={handleInputChange}
                                        data={formValues ? formValues["cliente_correo"]  : data && data[EnumGrid.cliente_correo]}
                                        control={control}
                                        isOT={true}
                                        onlyRead={isEditting}
                                        isOptional={true}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="w-[31%] items-center relative dirCliente">
                    <label className='labelForm w-[25%] top-[-8%] left-[2%] pl-8 absolute z-10'>Direccion</label>
                        <RegProCom
                         name="cliente_comuna"
                         control={control}
                         register={register}
                         defaultRegion={formValues ? formValues["cliente_region"]  : data && data[EnumGrid.cliente_region_id]}
                         defaultProvincia={formValues ? formValues["cliente_provincia"]  : data && data[EnumGrid.cliente_provincia_id]}
                         defaultComuna={formValues ? formValues["cliente_comuna"]  : data && data[EnumGrid.cliente_comuna_id]}
                         onlyRead={isEditting}
                         
                         
                        />
                    <div className="-mt-[1.3rem] w-[101%] rowForm">
                        <TextInputInteractive
                            type="text"
                            label="Calle, casa, villa"
                            onlyRead={isEditting}
                            name="cliente_direccion"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["cliente_direccion"]  : data && data[EnumGrid.cliente_direccion]}
                            control={control}
                            isOT={true}
                            isOptional={true}
                        />
                    </div>
                </div>

            </div>
        </div>
    </form>
  )
}

export default FOTClientes;