import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInputComponent } from './forms';
import { validationWhastApp } from '../utils';


interface IDerivacion {
    data?:any;
    onClose?: any;
    formValues?:any;
    closeModal?:any
}

interface FormData{
    proyecto_codigo: undefined;
    folio_ot: number;
    proyecto:string;
    nombre_cliente: string;

    area_desde:string;
    area_hasta:string;
    situacion:string
    observaciones:string;
    formValues:any
}

const WhastappForm:React.FC<IDerivacion> = ({
    data,
    onClose,
    // formValues,
    // closeModal,
    // formValues
}) => {
    const schema = validationWhastApp()
    const {control, handleSubmit, formState:{errors}} = useForm<any>({
        resolver: yupResolver(schema)
    })

    
    
    
    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        console.log(jsonData) 
        console.log(data)   
    
    }


    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            onClose()
          }
        };
  
        window.addEventListener("keydown", handleKeyDown);
  
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [onClose]);



  return (
    <div className='useFormContainer useFormDerivacion centered-div use40rem z-30 translate-y-20'>
        
        <div className="userFormBtnCloseContainer flex ">
            <div className='w-[50%] mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>Enviar Mensaje</h1>
            </div>
            <div className=''>
                <button onClick={onClose} className="userFormBtnClose">
                    X
                </button>
            </div>
        </div>

        <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                <div className=" w-full flex items-center rowForm">
                    <div className="w-[30%]">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
                            // data={data && data[EnumGrid.folio]}
                            onlyRead={true}
                            textAlign="text-center"
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                    <div className="w-[70%]">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            // data={data && data[EnumGrid.proyecto_titulo]}
                            onlyRead={true}
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                </div>

                <div className=" w-full flex items-center rowForm">
                    <div className="w-full">
                        <TextInputComponent
                            type="text"
                            label="Nombre Cliente"
                            name="nombre_cliente"
                            control={control}
                            // data={data && data[EnumGrid.cliente_nomnbre]}
                            onlyRead={true}
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                </div>



                <div className=" w-full flex items-center rowForm">
                    <div className="w-full">
                        <TextInputComponent
                            type="text"
                            label="Observaciones"
                            name="observaciones"
                            control={control}
                            customWidth={"mt-[2rem]"}
                            isOptional={false}
                            error={errors}
                            />
                    </div>
                </div>
                    {/* <div className="w-full ">
                        <textarea className='w-[35vw]' name="" id=""></textarea>
                    </div> */}

                <div className="flex justify-center">
                    <Button  type="submit" className='otActionButton bg-green-500'>Enviar Mensaje</Button>
                </div>
        </form>

    </div>
  )
}

export default WhastappForm;