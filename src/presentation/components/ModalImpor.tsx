import React,{useState, useEffect} from 'react';
import { Progress } from "@material-tailwind/react";
import { TableComponent } from '.';
import { table_head_cargos } from '../utils';

const logs = [
    ['2', "log2", "Error en la fila 1, campo nombre "],
    ['2', "log2", "Error en la fila 1, campo nombre "],
    ['2', "log2", "Error en la fila 1, campo nombre "]
]

interface ModalImportProps {
    titleState: any;
    progress: any;
    onClose: any;
  }
const ModalImpor:React.FC<ModalImportProps> = ({
    titleState,
    progress,
    onClose
}) => {

    // console.log('titleState', titleState)

   return (
    <div className='w-[90%] border border-black mx-auto h-[80%] left-20 z-20 bg-white absolute top-[10%] '>
            <div className='h-[60vh]'>
                <h1 className='absolute right-0 text-5xl' onClick={()=>onClose(false)}>X</h1>
                <h1 className='text-xl text-center'>{titleState}</h1>

                <div className="w-1/2 mx-auto my-10">
                    <Progress 
                    value={progress} 
                    label="Completed" 
                    color="green"
                    size="lg"
                    className='h-20'
                    />

                </div>

            <div className='bg-blue-500 mt-[15rem] h-[30vh]'>
                    {titleState === "Confirmacion" && (
                        <TableComponent
                        idMenu={26}
                        entidad='progres bar'
                        tableHead={table_head_cargos}
                        data={logs}
                        
                        />
                    )}
            </div>

        </div>
       
           
    </div>
  )
}

export default ModalImpor