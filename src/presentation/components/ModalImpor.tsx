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

    // console.log('errors', errors)
    let transformedErrors:any[] = [];
    if(errors){

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

    // console.log(transformedErrors)

   return (
    <div className='w-[90%] border border-black mx-auto h-[80%] left-20 z-20 bg-white absolute top-[10%] '>
            <div className='h-[60vh]  w-full'>
                <h1 className='absolute right-0 text-5xl' onClick={()=>onClose()}>X</h1>
                <h1 className='text-xl text-center'>{titleState}</h1>

                <div className="w-[70%] mx-auto my-12 p-4">
                    <Progress 
                    value={Math.floor(progress)} 
                    label="Completed" 
                    color="green"
                    size="lg"
                    className='h-20'
                    />

                </div>

            <div className=' mt-[7rem] h-[45vh] overflow-y-auto'>
                    {titleState === "Errores" && (
                        <TableComponent
                        idMenu={26}
                        entidad='progres bar'
                        tableHead={table_head_errors}
                        data={transformedErrors}
                        />
                    )}
            </div>

        </div>
       
           
    </div>
  )
}

export default ModalImpor