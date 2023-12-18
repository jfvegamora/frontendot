import React, { useState } from 'react'
import { RadioButtonComponent, SelectInputComponent, TextInputComponent } from '..'
import { SEXO, TIPO_CLIENTE } from '../../utils';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { EnumGrid as EnumClientes } from '../../views/mantenedores/MClientes';
import axios from 'axios';
import OTTextInputComponent from './OTTextInputComponent';
import { validationOTlevel1 } from '../../utils/validationOT';
import RegProCom from '../RegProCom';
import { URLBackend } from '../../hooks/useCrud';
import { codigoProyecto } from '../../views/forms/FOT';
import { toast } from 'react-toastify';
import TextInputInteractive from '../forms/TextInputInteractive';


interface IClientes {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    setExistCliente:any,
    strCodigoProyecto:string,
    onlyRead?:boolean;
    register?:any
}


const FOTClientes:React.FC<IClientes> = ({
    control,
    onDataChange,
    formValues,
    data,
    setExistCliente,
    onlyRead,
    register
}) => {
    const [clienteData, setClienteData] = useState()

    // console.log(onlyRead)
    const fetchCliente = async(cliente_rut:string) => {
        try {
            const cliente = await axios(`${URLBackend}/api/ot/listado/?query=13&_rut=${cliente_rut}`)
            // console.log(cliente)
            console.log(cliente.data)
            console.log(typeof cliente.data)
            console.log(Array.isArray(cliente.data))
            console.log(cliente.data.length)
            // onDataChange({['cliente_nombre']: cliente.data[EnumClientes.nombre]})
            // onDataChange({['cliente_tipo']: cliente.data[EnumClientes.tipo]})
            // onDataChange({['cliente_sexo']: cliente.data[EnumClientes.sexo]})
            // onDataChange({['cliente_fecha_nacimiento']: cliente.data[EnumClientes.fecha_nacimiento]})
            // onDataChange({['cliente_correo']: cliente.data[EnumClientes.correo]})
            // onDataChange({['cliente_telefono']: cliente.data[EnumClientes.telefono]})
            if (Array.isArray(cliente.data)) {
                  const innerArray = cliente.data[0];
                  console.log(innerArray.length)
              
                  if (Array.isArray(innerArray) && innerArray.length === 1) {
                    const mensaje = innerArray[0];
              
                    if (mensaje === 'OK') {
                      // Tipo 1 (OK)
                      console.log('Tipo 1 (OK):', cliente.data);
                      
                      onDataChange({['cliente_nombre']: "  "})    
                      onDataChange({['cliente_sexo']: "  "})
                      onDataChange({['cliente_tipo']: "  "})

                      // Realizar acciones específicas para el tipo 1
                    } else if (typeof mensaje === 'string' && mensaje.startsWith('ERROR:')) {
                      // Tipo 2 (ERROR)
                      console.log('Tipo 2 (ERROR):', cliente.data[0][0]);
                      // Realizar acciones específicas para el tipo 2
                      toast.error(cliente.data[0][0])
                    } else {
                      // Otro tipo de respuesta o formato desconocido
                      console.log('Respuesta desconocida:', cliente.data);
                      // Realizar acciones para casos desconocidos o manejar el error según sea necesario
                    }
                  } else if (Array.isArray(innerArray) && innerArray.length === 17) {
                    // Tipo 3
                    console.log('Tipo 3:', cliente.data);
                    console.log(cliente.data[0])
                    setClienteData(data)
          
                    setExistCliente(true)
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
                    // Realizar acciones específicas para el tipo 3
                  } else {
                    // Otro tipo de respuesta o formato desconocido
                    console.log('Respuesta desconocida:', cliente.data);
                    // Realizar acciones para casos desconocidos o manejar el error según sea necesario
                  }
                } else {
                  // Otro tipo de respuesta o formato desconocido
                  console.log('Respuesta desconocida:', cliente.data);
                  // Realizar acciones para casos desconocidos o manejar el error según sea necesario
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

        validationOTlevel1(name, value)

        if(name === 'cliente_rut'){
            fetchCliente(value).then((data:any)=>{
                // setClienteData(data)
                console.log(data)
                console.log(data[0][EnumClientes.nombre])
                // setExistCliente(true)
                // onDataChange({['cliente_nombre']: data[0][EnumClientes.nombre]})    
                // onDataChange({['cliente_sexo']: data[0][EnumClientes.sexo]})
                // onDataChange({['cliente_tipo']: data[0][EnumClientes.tipo]})
                // onDataChange({['cliente_fecha_nacimiento']: data[0][EnumClientes.fecha_nacimiento]})
                // onDataChange({['cliente_correo']: data[0][EnumClientes.correo]})
                // onDataChange({['cliente_telefono']: data[0][EnumClientes.telefono]})
                // onDataChange({['cliente_region']: data[0][EnumClientes.region_id]})
                // onDataChange({['cliente_provincia']: data[0][EnumClientes.provincia_id]})
                // onDataChange({['cliente_comuna']: data[0][EnumClientes.comuna_id]})
                // onDataChange({['cliente_direccion']: data[0][EnumClientes.direccion]})

            }).catch((error:any)=>{
                setExistCliente(false)
                console.log(error)
            })
        }
        onDataChange({ [name]: value }); // Envia los datos al componente padre
      };


      console.log(data)
      console.log(data && data[EnumGrid.cliente_comuna_id])
      console.log(data && data[EnumGrid.cliente_provincia_id])
      console.log(data && data[EnumGrid.cliente_region_id])


      console.log(formValues ? formValues["cliente_comuna"]  : data && data[EnumGrid.cliente_comuna_id])
      console.log(formValues ? formValues["cliente_provincia"]  : data && data[EnumGrid.cliente_provincia_id])
      console.log(formValues ? formValues["cliente_region"]  : data && data[EnumGrid.cliente_region_id])
                                      //   console.log(clienteData && clienteData[0])
    //  console.log(formValues)
    //  console.log(inputState)
    //  console.log(formValues && formValues["cliente_nombre"])
    //   console.log(formValues ? formValues["cliente_tipo"]  : data && data[EnumGrid.cliente_tipo])
    //   console.log(formValues ? formValues["cliente_nombre"]  : data && data[EnumGrid.cliente_nomnbre])

    return (
    <form action="">
        <div className='w-full h-[80vh]  labelForm rounded-lg border radioComponent !mt-8'>


            <div className="w-full !mt-10 mx-auto items-center flex ">
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
                                onlyRead={onlyRead}
                                isOT={true}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                    </div>

                    <div className="input-container items-center rowForm w-[40%]">
                        <div className="w-full !mt-4">
                            <TextInputInteractive
                                type="text"
                                label="Nombre"
                                name="cliente_nombre"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["cliente_nombre"]  : data && data[EnumGrid.cliente_nomnbre]}
                                // otData={clienteData  && clienteData[0] && clienteData[0][EnumClientes.nombre]}
                                control={control}
                                onlyRead={onlyRead}
                                // error={errors.fecha_nacimiento}
                            />
                        </div>
                    </div>
                    <div className="input-container items-center rowForm w-[40%]">
                        <div className="w-full !mt-[1.6rem] ml-4 ">
                            <SelectInputComponent
                                label="Establecimiento"
                                name="establecimiento_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["establecimiento_id"]  : data && data[EnumGrid.establecimiento_id]}
                                control={control}
                                entidad={["/api/establecimientos/", "06", codigoProyecto.value]}
                                // error={errors.establecimiento}
                                customWidth={"345px"}
                                readOnly={onlyRead}
                                tabIndex={1}
                            />
                        </div> 
                    </div>


                </div>
            </div>



            

            <div className="w-[100%]  h-[27rem] flex items-center">
                
                <div className="w-[50%] h-[75%] -mt-14 ml-8 items-center">

                    <div className='w-[89%] mx-auto !mt-2 !mb-4 flex items-center  h-1/2'>
                        <div className="w-full flex  !ml-[5rem]">
                            <div className="w-[40%]  ">
                                <RadioButtonComponent
                                    control={control}
                                    label="Sexo"
                                    name="cliente_sexo"
                                    data={formValues ? formValues["cliente_sexo"]  : data && data[EnumGrid.cliente_sexo]}
                                
                                    options={[SEXO.masculino, SEXO.femenino, SEXO.no_aplica]}
                                    // error={errors.sexo}
                                    // horizontal={true}
                                    onChange={handleInputChange}
                                    readOnly={onlyRead}
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
                                    // error={errors.sexo}
                                    // horizontal={true}
                                    onChange={handleInputChange}
                                    readOnly={onlyRead}
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
                                    label="Fecha de nacimiento"
                                    name="cliente_fecha_nacimiento"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cliente_fecha_nacimiento"]  : data && data[EnumGrid.cliente_fecha_nacimiento]}
                                    // otData={clienteData && clienteData[0] && clienteData[0][EnumClientes.fecha_nacimiento]}
                                    control={control}
                                    onlyRead={onlyRead}
                                    // error={errors.fecha_nacimiento}
                                />
                                </div>
                                <div className="w-[47%] ml-12      ">
                                <TextInputInteractive
                                    type="text"
                                    label="Telefono"
                                    name="cliente_telefono"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cliente_telefono"]  : data && data[EnumGrid.cliente_telefono]}
                                    control={control}
                                    onlyRead={onlyRead}
                                    // otData={clienteData && clienteData[0] && clienteData[0][EnumClientes.telefono]}
                                    // error={errors.fecha_nacimiento}
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
                                        onlyRead={onlyRead}
                                        // otData={clienteData  && clienteData[0] && clienteData[0][EnumClientes.correo]}
                                        // error={errors.fecha_nacimiento}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>













                <div className="w-[31%] rounded-lg border -mt-4 border-blue-500 ml-8  mx-auto items-center grid relative">
                    
                    <label className='labelForm w-[25%] top-[-8%] left-[2%] pl-8 absolute z-10'>Direccion</label>
                     

                        <RegProCom
                         name="cliente_comuna"
                         control={control}
                         register={register}
                         defaultRegion={formValues ? formValues["cliente_region"]  : data && data[EnumGrid.cliente_region_id]}
                         defaultProvincia={formValues ? formValues["cliente_provincia"]  : data && data[EnumGrid.cliente_provincia_id]}
                         defaultComuna={formValues ? formValues["cliente_comuna"]  : data && data[EnumGrid.cliente_comuna_id]}
                         
                        />
                    <div className="-mt-[1.3rem] w-[101%]">
                        <TextInputInteractive
                            type="text"
                            label="N° calle"
                            onlyRead={onlyRead}
                            name="cliente_direccion"
                            handleChange={handleInputChange}
                            data={formValues ? formValues["cliente_direccion"]  : data && data[EnumGrid.cliente_direccion]}
                            control={control}
                            // otData={clienteData  && clienteData[0] && clienteData[0][EnumClientes.direccion]}
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