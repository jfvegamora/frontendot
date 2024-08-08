import React, { useState } from 'react'
import { RadioButtonComponent, SelectInputComponent } from '..'
import { SEXO, TIPO_CLIENTE, codigoProyecto, isExistClient, validateRut } from '../../utils';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { EnumGrid as EnumClientes } from '../../views/mantenedores/MClientes';
import axios from 'axios';
import { validationClienteComuna, validationClienteNombre, validationClienteSexo, validationClienteTelefono, validationClienteTipo, validationOTlevel1, validationOTlevel2 } from '../../utils/validationOT';
import RegProCom from '../RegProCom';

import TextInputInteractive from '../forms/TextInputInteractive';
import { toast } from 'react-toastify';
import { fetchReservaBeneficiario } from '../../utils/FReservaArmazones_utils';
import { clearRutCliente } from '../../utils/FOTClientes_utils';
import { URLBackend } from '../../utils/config';
// import { useModal } from '../../hooks/useModal';

interface IClientes {
    control:any,
    onDataChange: any,
    formValues: any,
    data:any,
    onlyRead?:boolean;
    register?:any
    isEditting?:boolean;
}



const FOTClientes:React.FC<IClientes> = ({
    control,
    onDataChange,
    formValues,
    data,
    register,
    isEditting,
}) => {
    const [_clienteData, setClienteData] = useState();
    
    const [inputsRef] = useState({
        firstInputRef : React.useRef<HTMLInputElement>(null),
        lastInputRef : React.useRef<HTMLInputElement>(null),
    })
    // const { _showModal, CustomModal } = useModal();
    

    // const inputRef = useRef<HTMLInputElement>(null);
    // const modalRef = useRef<HTMLInputElement>(null);
    
    
    const setDataInputs = (cliente:any) =>{
        // console.log(cliente)

        if(cliente){
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


            validationClienteNombre(cliente.data[0][EnumClientes.nombre])
            validationClienteTipo(cliente.data[0][EnumClientes.tipo])
            validationClienteSexo(cliente.data[0][EnumClientes.sexo])
            validationClienteComuna(cliente.data[0][EnumClientes.comuna_id])
            validationClienteTelefono(cliente.data[0][EnumClientes.telefono])
        }
    }
    
    const clearInputs = ()=>{
        onDataChange({['cliente_rut']: ""})  
        onDataChange({['cliente_nombre']: ""})    
        onDataChange({['cliente_sexo']: " "})
        onDataChange({['cliente_tipo']: " "})
        onDataChange({['cliente_fecha_nacimiento']: ""})
        onDataChange({['cliente_correo']: ""})
        onDataChange({['cliente_telefono']: ""})



        onDataChange({['cliente_region']:0})
        onDataChange({['cliente_comuna']:0})
        onDataChange({['cliente_provincia']:0})
        onDataChange({['cliente_direccion']: " "})

        validationClienteNombre("")
        validationClienteSexo("")
        validationClienteTipo("")
        validationClienteComuna(NaN)
        validationClienteTelefono("")
    }
    
    const fetchCliente = async(cliente_rut:string) => {
        try {
            const cliente = await axios(`${URLBackend}/api/ot/listado/?query=13&_rut=${cliente_rut}`)
            if (Array.isArray(cliente.data)) {
                  const innerArray = cliente.data[0];
        
                  if (Array.isArray(innerArray) && innerArray.length === 1) {
                    const mensaje = innerArray[0];
                    if (mensaje === 'OK') {
                      // Tipo 1 (OK)
                      isExistClient.value = false;
                      onDataChange({['cliente_nombre']: ""})    
                      onDataChange({['cliente_sexo']: ""})
                      onDataChange({['cliente_tipo']: ""})
                      onDataChange({['cliente_fecha_nacimiento']: ""})
                      onDataChange({['cliente_correo']: ""})
                      onDataChange({['cliente_telefono']: ""})
                      onDataChange({['cliente_sexo']: " "})
                      onDataChange({['cliente_tipo']: " "})


                      onDataChange({['cliente_region']:0})
                      onDataChange({['cliente_comuna']:0})
                      onDataChange({['cliente_provincia']:0})
                      onDataChange({['cliente_direccion']: ""})

                      validationClienteNombre("")
                      validationClienteSexo("")
                      validationClienteTipo("")
                      validationClienteComuna(NaN)
                      validationClienteTelefono("")
                        

                    } else if (typeof mensaje === 'string' && mensaje.startsWith('ADVERTENCIA:')) {
                      const result = confirm(`${cliente.data[0][0]}, ¿Desea Continuar?`)
                      console.log(result)
                      if(result){
                        const cliente = await axios(`${URLBackend}/api/clientes/listado/?query=01&_p1=${cliente_rut}`)
                        //TODO: METODO PARA PASAR DARA A INPUTS
                        setDataInputs(cliente)
                        isExistClient.value = true;
                      }else{
                        //TODO: METODO PARA LIMPIAR LOS INPUTS
                        clearInputs()
                      }
                      
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


                    validationClienteNombre(cliente.data[0][EnumClientes.nombre])
                    validationClienteTipo(cliente.data[0][EnumClientes.tipo])
                    validationClienteSexo(cliente.data[0][EnumClientes.sexo])
                    validationClienteComuna(cliente.data[0][EnumClientes.comuna_id])
                    validationClienteTelefono(cliente.data[0][EnumClientes.telefono])
                  }
                }
              
              
            return cliente.data          
        } catch (error) {
            console.log('FetchCliente Error:', error)
            throw error
        }    
    }

    
    const handleInputChange = async(e:any) => {
        const { name, value } = e;
        // console.log(name)
        // console.log(value)
        onDataChange({ [name]: value });
        if(name === 'Tipo'){
            onDataChange({['cliente_tipo']: value})  
        }
        if(name === 'Sexo'){
            onDataChange({['cliente_sexo']: value})
        }

        if(name === 'cliente_rut'){
            const response = validateRut(value.trim())
            console.log(response)
            if(!response && value.trim() !== '' && !isEditting){
                console.log('render')
                toast.error('Rut no válido')
                clearRutCliente.value = !clearRutCliente.value;
                return onDataChange({['cliente_rut']:''})
            }else{
                onDataChange({['cliente_rut']: value.slice(0, -1)  + value.slice(-1).toUpperCase()})
                // console.log(value)

                // console.log(value.slice(0, -1)  + value.slice(-1).toUpperCase())
            }
        };



        validationOTlevel1(name, value);
        validationOTlevel2(name,value);

        if(name === 'cliente_rut' && value.trim() !== '' && !isEditting){
            fetchCliente(value.trim())
            await fetchReservaBeneficiario(value);
        }


      };

    const handleKeyDown: any = React.useCallback((e:KeyboardEvent) => {
        const focusedElement = document.activeElement;
        if (focusedElement instanceof HTMLInputElement) {
            const inputName = focusedElement.name;
            console.log(inputName)
            if(inputName === 'cliente_direccion' && e.key === 'Tab'){
                inputsRef.lastInputRef.current?.focus()
            }
        }
    
      }, [inputsRef]);
    
    React.useEffect(()=>{
        if(inputsRef.firstInputRef){
            inputsRef.firstInputRef.current?.focus();
        }
    },[])


    return (
    <form action="" onKeyDown={handleKeyDown}>
        <div className='frameOTForm !h-[85vh] '>
            <div className="w-full flex items-center  rowForm !h-[6vw]">
                <div className="w-[80vw]      flex mx-auto translate-x-[3vw]">
                    <div className="input-container items-center rowForm w-[15%]">
                        <div className={`labelInput w-full !mt-4  ${isEditting && "pointer-events-none"}`}>
                            <TextInputInteractive
                                type="text"
                                label="Rut"
                                name="cliente_rut"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["cliente_rut"]  : data && data[EnumGrid.cliente_rut]}
                                control={control}
                                onlyRead={isEditting}
                                isOT={true}
                                inputRef={inputsRef.firstInputRef}
                                customWidth={"!h-[3vw] labelInput"}
                                />
                        </div>
                    </div>

                    <div className="input-container items-center rowForm w-[40%]">
                        <div className="labelInput w-full !mt-4 ">
                            <TextInputInteractive
                                control={control}
                                type="text"
                                label="Nombre"
                                name="cliente_nombre"
                                handleChange={handleInputChange}
                                data={formValues ? formValues["cliente_nombre"]  : data && data[EnumGrid.cliente_nomnbre]}
                                onlyRead={isEditting}
                                isOT={true}
                                customWidth={"!h-[3vw] labelInput"}
                            />
                        </div>
                    </div>
                    <div className="input-container items-center rowForm w-[40%]">
                        <div className="w-full !mt-5 ml-4 labelInput ">
                            <SelectInputComponent
                                label="Establecimiento"
                                name="establecimiento_id"
                                showRefresh={true}
                                isOT={true}
                                handleSelectChange={handleInputChange}
                                data={formValues ? formValues["establecimiento_id"]  : data && data[EnumGrid.establecimiento_id]}
                                control={control}
                                entidad={["/api/establecimientos/", "06", codigoProyecto.value]}
                                readOnly={isEditting}
                                tabIndex={1}
                                onlyFirstOption={isEditting}
                                inputRef={inputsRef.lastInputRef}
                                customWidth={"!h-[3vw] labelInput"}

                            />
                        </div> 
                    </div>


                </div>
            </div>

            <div className="w-full flex items-center rowForm !h-[20vw] translate-x-10 translate-y-[1vw]">
                <div className="w-[50vw]   ml-8 items-center">
                    <div className='w-[4    0vw] mx-auto  translate-x-14 !mt-2 !mb-4 flex justify-between items-center  h-1/2'>
                        <div className="w-full flex  !ml-[5rem]">
                            <div className="w-[40%] labelInput  ">
                                <RadioButtonComponent
                                    control={control}
                                    label="Sexo"
                                    name="cliente_sexo"
                                    data={formValues ? formValues["cliente_sexo"]  : data && data[EnumGrid.cliente_sexo]}
                                    options={[SEXO.masculino, SEXO.femenino, SEXO.no_aplica]}
                                    // horizontal={true}
                                    onChange={handleInputChange}
                                    readOnly={isEditting}
                                    isOT={true}
                                    customWidth={"!h-[3vw] labelInput"}
                                    labelProps={"!translate-y-[-2vw]"}
                                />    
                            </div>
                            <div className="w-[40%] ml-10 labelInput">
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
                                    labelProps={"!translate-y-[-2vw]"}
                                    customWidth={"!h-[3vw] text-[1vw] labelInput"}
                                    readOnly={isEditting}
                                    isOT={true}
                                />    
                            </div>
                        </div>
                    </div>


                    <div className='w-[60vw] mx-auto translate-y-11 translate-x-[-2vw] !h-[6vw] '>
                        <div className="w-full h-1/2 flex ml-[-2%]  items-center rowForm  ">
                            <div className="mx-auto flex w-[80%] translate-y-[-2vw]">
                                <div className="w-[30vw] ml-20 labelInput">
                                <TextInputInteractive
                                    type="date"
                                    label="Fecha nacimiento"
                                    name="cliente_fecha_nacimiento"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cliente_fecha_nacimiento"]  : data && data[EnumGrid.cliente_fecha_nacimiento]}
                                    control={control}
                                    onlyRead={isEditting}
                                    isOT={true}
                                    textAlign="text-center"
                                    customWidth={"!h-[3vw] labelInput"}
                                    />
                                </div>
                                <div className="w-[30vw] ml-3   mr-10 labelInput">
                                <TextInputInteractive
                                    type="text"
                                    label="Teléfono"
                                    name="cliente_telefono"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["cliente_telefono"]  : data && data[EnumGrid.cliente_telefono]}
                                    control={control}
                                    isOT={true}
                                    onlyRead={isEditting}
                                    customWidth={"!h-[3vw] labelInput"}
                                />
                                </div>
                            </div>
                        </div>


                        <div className="w-[47vw] flex translate-x-[3.5vw] items-center rowForm translate-y-2">
                                <div className="!w-[47vw] mx-auto ml-24 labelInput">
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
                                        customWidth={"!h-[3vw] labelInput"}
                                    />
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="w-[35vw] items-center relative dirCliente   translate-y-[3vw] h-[24vw]">
                    <label className=' text-[1.4vw] absolute translate-x-[1.4vw] labelInput translate-y-[-2vw]  z-10'>Dirección</label>
                        <RegProCom
                         name="cliente_comuna"
                         control={control}
                         className={"!h-[2.5vw] !text-[1vw]"}
                         register={register}
                         defaultRegion={formValues ? formValues["cliente_region"]  : data && data[EnumGrid.cliente_region_id]}
                         defaultProvincia={formValues ? formValues["cliente_provincia"]  : data && data[EnumGrid.cliente_provincia_id]}
                         defaultComuna={formValues ? formValues["cliente_comuna"]  : data && data[EnumGrid.cliente_comuna_id]}
                         onlyRead={isEditting}
                         onDataChange={onDataChange}
                         isOT={true}
                        />
                    <div className="mt-5 w-[101%] rowForm labelInput">
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
                            customWidth={"!h-[3vw] labelInput"}
                        />
                    </div>
                </div>

            </div>
        </div>

      
    </form>
  )
}

export default FOTClientes;