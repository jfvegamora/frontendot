import React, { useState } from 'react';
import { Progress } from "@material-tailwind/react";
import { TableComponent } from '.';
import { table_head_errors } from '../utils';
import { resultExcelTypes } from './ImportToCsv';


interface ModalImportProps {
    titleState: any;
    progress: any;
    onClose: any;
    errors:any;
    isModalOT?:any
  }
const ModalImpor:React.FC<ModalImportProps> = ({
    titleState,
    progress,
    onClose,
    errors,
    isModalOT
}) => {
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const [importErrors, setImportErrors] = useState<any>();


    // console.log('errors', errors)
    let transformedErrors:any[] = [];
    console.log(errors)

    // console.log(typeof errors)
    // console.log(typeof errors)

    
    React.useEffect(()=>{
      if(errors && typeof errors === 'string'){
        transformedErrors =  [["", "", errors]]
      }else if (errors && typeof errors === 'object'){
        console.log(errors)
        transformedErrors = errors.map((error:any)=>{
            if(isModalOT){
              // transformedErrors = errors.map((error:any)=>{
              //   return error.split('Error: ')[1]
              // })
  
              return ["", "", error.split('Error: ')[1]]


            }
  
              let b = error[2]
              console.log(b)
              const column = b && b.match(/column '([^']+)'/)
              const row = b && b.match(/row (\d+)/)
  
              
              if(error[2].includes('Duplicate')){
                  let primaryKey = error[2].match(/'([\d-]+)'/)
                      b="Ya existe registro con el valor : " + primaryKey[0] + "de la columna:" + column + " en la fila:" + row
              }
  
              if(error[2].includes("truncated")){
                      // b = 'No corresponde el ID del registro de la columna:' + " " + column + ", " + "en la fila:" + " " + row;
                     console.log('signal excel',resultExcelTypes.value)
                      // b = 'Columna: ' + column + " truncada" + "en la fila:" + " " + row;
                      b = `No se pudo completar la importación. Hay inconsistencia en los datos entregados.`
              }
              return ["","",b]
          })
        setImportErrors(transformedErrors)
      }
    },[errors])

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            onClose();
          }
        };
  
        window.addEventListener("keydown", handleKeyDown);
  
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [onClose]);



      console.log(importErrors)

   return (
    <div className='w-[55%] border border-black mx-auto  left-[20rem] !z-50  absolute top-[10%] cursor-default ' onClick={stopPropagation} style={{backgroundColor:'rgb(103 111 157 / 1)'}}>
            <div className='  w-full'>
                <h1 className='absolute right-0 text-5xl cursor-pointer userFormBtnClose top-0' onClick={()=>onClose()}>X</h1>
                <h1 className='text-xl text-center text-white '>Importando</h1>

                <div className="w-[70%] mx-auto my-6 p-4">
                    <Progress 
                    value={Math.floor(progress)} 
                    label="Completed" 
                    color={titleState === 'Errores' ? 'red' : 'orange'}
                    size="lg"
                    className='h-20'
                    />

                </div>

                {titleState === "Errores" && (
            <div className=' mt-[7rem] overflow-scroll  !h-[30rem] bg-white !z-50'>
                    <TableComponent
                        idMenu={26}
                        entidad='progres bar'
                        tableHead={table_head_errors}
                        data={importErrors}
                        />
            </div>
                        
                    )}

        </div>
       
           
    </div>
  )
}

export default ModalImpor