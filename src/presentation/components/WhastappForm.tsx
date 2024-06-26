import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import {  Spinner, Textarea } from '@material-tailwind/react';
import { yupResolver } from '@hookform/resolvers/yup';
// import { TextInputComponent } from './forms';
// import { FaWhatsapp } from "react-icons/fa";
import { validationWhastApp } from '../utils';
import axios from 'axios';
import {signal } from '@preact/signals-react';
import { SocialIcon } from 'react-social-icons'
import { toast } from 'react-toastify';


interface IDerivacion {
    data?:any;
    onClose?: any;
    formValues?:any;
    closeModal?:any
}

interface FormData{
    descripcion:string
}

let linkStatus               = 'https://nodeexpress3.onrender.com/status';
let linkisWhastappConnected  = 'https://nodeexpress3.onrender.com/conection';
let linkSendMessage          = 'https://nodeexpress3.onrender.com/enviar-mensaje'

let isWhastAppConnected          = signal(false);
let isLoadingWhastAppConnection  = signal(false);
let isLoadingStatus              = signal(false);

const WhastappForm:React.FC<IDerivacion> = ({
    data,
    onClose,
    // formValues,
    // closeModal,
    // formValues
}) => {
    const schema = validationWhastApp()
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<any>({
        resolver: yupResolver(schema)
    })


    

    
    
    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        console.log(jsonData) 
        console.log(data) 
        const body = {
            "numero": ["56949018251"],
            "mensaje": jsonData?.descripcion
        }
            if(!isWhastAppConnected.value){
                fetchStatus()
            }
        
        try {
            const {data} = await axios.post(linkSendMessage, body)
            console.log(data)
            toast.success('Mensaje enviado correctamente.')
            setValue('descripcion', '')
        } catch (error) {
            console.log(error)
            toast.error(error as string)
        }

    
    }

    //?Result link status =  { isWhatsAppConnection: true }
    //?Result whasapconec = 


    const fetchStatus = async() => {
        try {
            const {data} = await axios(linkStatus);
            if(data?.isWhatsAppConnection){
                isLoadingStatus.value = false;
                isWhastAppConnected.value = true;
            }else{
                isLoadingWhastAppConnection.value = true;
                isWhastAppConnected.value = false;
                const {data} = await axios(linkisWhastappConnected)
                console.log(data)
                if(data?.isWhatsAppConnection){
                    isWhastAppConnected.value = true;
                    isLoadingStatus.value = false
                    isLoadingWhastAppConnection.value = false;
                }
            }
            console.log(data)  
            console.log(isWhastAppConnected.value)          
        } catch (error) {
            console.log(error)
            return false
        }
    }

    React.useLayoutEffect(()=>{
        isLoadingStatus.value = true;
        fetchStatus()
    },[])


    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          isWhastAppConnected.value = false;
          if (event.key === "Escape") {
            onClose()
          }
        };
  
        window.addEventListener("keydown", handleKeyDown);
  
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [onClose]);


    console.log(errors)

  return (
    <div className='useFormContainer useFormDerivacion centered-div w-[90vw] sm:w-[30vw] sm:h-[40vh] h-[35vh] z-30 translate-y-20'>
        
        <div className="userFormBtnCloseContainer flex ">
            <div className='w-full mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>Enviar WhatsApp</h1>
            </div>
            <div className=''>
                <button onClick={onClose} className="userFormBtnClose">
                    X
                </button>
            </div>
        </div>

        <form className=' w-full translate-y-4 h-[12vh]' onSubmit={handleSubmit(onSubmit)}>
            <div className=" w-full flex items-center  rowForm">
                {(isLoadingWhastAppConnection.value || isLoadingStatus.value ) ? (
                   <div className="w-full items-center rowForm bg-red-300">
                       <Spinner className="h-12 w-12" style={{ color: '#f39c12' }} />
                   </div>
                ) : (
                    <div>
                        <div className="w-full">
                            <Textarea
                                {...register('descripcion')}
                                name='descripcion'
                                // type='text'
                                className='rounded w-full !h-[8vh] bg-white border-none'
                            />   
                            </div>
                            <div className="flex justify-center  !rounded-full h-1/2 w-[40%] absolute translate-x-[52vw] sm:translate-x-[20.5vw] translate-y-7">
                            {/* <FaWhatsapp /> */}
                            <button type="submit">
                            <SocialIcon  
                                url="https://www.whatsapp.com/"
                            />
                            </button>

                            </div>
                    </div>
                    
                )}
           
            </div>
        </form>




    </div>
  )
}

export default WhastappForm;


