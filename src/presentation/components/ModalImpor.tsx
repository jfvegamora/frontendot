import React from 'react';
import { Progress } from "@material-tailwind/react";
import { TableComponent } from '.';
import { table_head_errors } from '../utils';
import { resultExcelTypes } from './ImportToCsv';


interface ModalImportProps {
    titleState: any;
    progress: any;
    onClose: any;
    errors:any
  }
const ModalImpor:React.FC<ModalImportProps> = ({
    titleState,
    progress,
    onClose,
    errors
}) => {
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };


    // console.log('errors', errors)
    let transformedErrors:any[] = [];
    // console.log(errors)

    // console.log(typeof errors)
    // console.log(typeof errors)

    if(errors && typeof errors === 'string'){
        transformedErrors =  [["", "", errors]]
    }else if (errors && typeof errors === 'object'){
        transformedErrors = errors.map((error:any)=>{
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
    }
 

    console.log(transformedErrors)
    console.log(titleState)

   return (
    <div className='w-[50%] border border-black mx-auto  left-[22rem] z-50  absolute top-[20%] cursor-default ' onClick={stopPropagation} style={{backgroundColor:'rgb(103 111 157 / 1)'}}>
            <div className='h-[10%]  w-full'>
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
            <div className=' mt-[7rem]  overflow-y-auto bg-white'>
                    <TableComponent
                        idMenu={26}
                        entidad='progres bar'
                        tableHead={table_head_errors}
                        data={transformedErrors}
                        />
            </div>
                        
                    )}

        </div>
       
           
    </div>
  )
}

export default ModalImpor