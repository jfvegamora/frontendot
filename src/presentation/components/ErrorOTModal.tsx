import React, { useEffect } from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
// import { Button } from '@material-tailwind/react';
import { valueSearchOT } from './OTPrimaryButtons';



interface IDerivacion {
    data?:any;
    onClose?: any;
    formValues?:any;
    closeModal?:any;
    valueConfirmOT?:any;
}


const ErrorOTModal:React.FC<IDerivacion> = ({
    data,
    onClose,
    valueConfirmOT
    // formValues,
    // closeModal,
    // formValues
}) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            valueSearchOT.value = ""
            onClose();
          }
        };
  
        window.addEventListener("keydown", handleKeyDown);
  
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [onClose]);

  
  // console.log(data)
  // console.log(data.length)

  console.log(data)


  return (
    <div className='useFormContainer useFormDerivacion centered-div use40rem z-30 !bg-red-500'>
        
        <div className="userFormBtnCloseContainer flex ">
            <div className='w-[50%] mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>OT NO ENCONTRADA</h1>
            </div>
            <div className=''>
                <button onClick={onClose} className="userFormBtnClose">
                    X
                </button>
            </div>
        </div>

        <div className="h-[20rem] text-center">
            {data && data.length > 0 ? (
              <div>
                <h1>AREA ACTUAL  : {data && data[0][1]}</h1>
                <h1>FOLIO        : {data && data[0][0]}</h1>
              </div>
            ) : (
              <div>
                <h1>OT NO EXISTE </h1>
                <h1>FOLIO  : { valueConfirmOT || ''}</h1>
              </div>
            )}
        </div>
   

    </div>
  )
}

export default ErrorOTModal;