import React from 'react'
import { URLBackend } from '../hooks/useCrud'
import { TextInputComponent } from '.'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import { signal } from '@preact/signals-react';


export const ajuste_inventario_autorizacion = signal(false)

interface Props{
    onSubmit:any
}

const AjusteInventario:React.FC<Props> = ({
    onSubmit
}) => {
    const {control, handleSubmit} = useForm()
    // console.log(URLBackend.value)

    const submit = async(jsonData:any) => {
        
        // console.log(jsonData)
        const codigo = Object.values(jsonData)[0]
        // console.log(codigo)
        try {
            const {data} = await axios(`${URLBackend}/api/parametros/listado/?query=02&_p1=${codigo}`)
            const validacionExitosa = data[0] && data[0][0] === codigo;
            if(validacionExitosa){
                toast.success('codigo correcto')
            }else{
                toast.error('codigo incorrecto')
            }
            onSubmit(jsonData, validacionExitosa);
            if(
                data[0] && data[0][0] === codigo){
                ajuste_inventario_autorizacion.value = true

            }else{
                ajuste_inventario_autorizacion.value = false
            }
                        
        } catch (error) {
            console.log('ERROR AJUSTE INVENTARIO AUTORIZACION:', error)
            throw error
        }
    }


    console.log(ajuste_inventario_autorizacion.value)
    
  return (
    <div className='w-[30rem] h-[13rem] useFormContainer z-30 relative top-0'>
        <h1 className='userFormLabel'>Ingrese código de autorización</h1>

        <div className="w-full items-center flex">
            <div className="input-container  items-center rowForm w-full">
                <div className="w-[45%] mx-auto">
                    <TextInputComponent
                        type='text'
                        label='Codigo Autorización'
                        name="codigo"
                        control={control}
                    />
                </div>
            </div>
        </div>
        <div className="w-full">
            <div className="w-[40%] mx-auto">
                <button className='userFormBtnSubmit' tabIndex={1} onClick={handleSubmit((data)=>submit(data))}>Validar</button>
            </div>
        </div>

    </div>
  )
}

export default AjusteInventario