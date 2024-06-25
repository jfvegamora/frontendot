import React, { useState } from 'react';
import { IconButton, Progress, Tooltip } from "@material-tailwind/react";
import { TableComponent } from '.';
import { table_head_errors } from '../utils';
import { restanteImport, resultExcelTypes, totalImport } from './ImportToCsv';
import * as XLSX from 'xlsx';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
// import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';


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
    
    React.useEffect(()=>{
      if(errors && typeof errors === 'string'){
        transformedErrors =  [["", "", errors]]
      }else if (errors && typeof errors === 'object'){
        if(isModalOT){
          transformedErrors = errors.flatMap((item:any)=>{
            if(item.Error){
              return item.Error.map((errorMSG:any)=>["", "", errorMSG])
            }
            return []
          })
        }else{
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
            console.log(b)
            return ["",'',b]
            
          
        })
        }
        // console.log(transformedErrors)
        setImportErrors(transformedErrors)
      }
    },[errors])

    // React.useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //       if (event.key === "Escape") {
    //         restanteImport.value = 1;
    //         totalImport.value = 0;
    //         onClose();
    //       }
    //     };
  
    //     window.addEventListener("keydown", handleKeyDown);
  
    //     return () => {
    //       window.removeEventListener("keydown", handleKeyDown);
    //     };
    //   }, [onClose]);






    const downloadLogErrorsExcel = () => {
      console.log('click')
      const errorLogBook = XLSX.utils.book_new();

      const hojaErrores = XLSX.utils.aoa_to_sheet(importErrors.map((error:any)=>[error[2]]))

      XLSX.utils.book_append_sheet(errorLogBook, hojaErrores, 'Import Errors');

      const newBlob = new Blob([XLSX.write(errorLogBook, {type:'array', bookType:'xls'})],{
        type: 'application/vnd.ms-excel',
      })

      const fileUrl = URL.createObjectURL(
        newBlob
      );

      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', "errores_import")
      document.body.appendChild(link)
      link.click();
      URL.revokeObjectURL(fileUrl)

    }


  

   return (
    <div className='w-[55%] rounded-xl border border-black mx-auto  left-[20rem] !z-50  absolute top-[5%] cursor-default ' onClick={stopPropagation} style={{backgroundColor:'rgb(103 111 157 / 1)'}}>
            <div className='w-full'>
                <h1 className='absolute right-0 text-5xl cursor-pointer userFormBtnClose top-0' onClick={()=>onClose()}>X</h1>
                <h1 className='text-xl text-center text-white '>{totalImport.value === restanteImport.value ? 'Importando' :  'Validando'}</h1>
                <div className='flex mx-auto w-1/2 '>
                  <h1 className='text-3xl text-white text-center mx-auto'>Página {restanteImport.value}/{totalImport.value}</h1>
                </div>

                <div className="w-[70%] mx-auto my-6 p-4">
                    <Progress 
                    value={Math.floor(progress)} 
                    label="Completed" 
                    color={titleState === 'Errores' ? 'red' : 'orange'}
                    size="lg"
                    className='h-10'
                  
                    />
              
                </div>

                {titleState === 'Errores' && (
                  <Tooltip content={'Descargar Plantilla Excel'} >
                    <IconButton 
                      className='text-white ml-10'
                      variant='text'
                      color="blue-gray"
                      >
                      <PiMicrosoftExcelLogoFill className='primaryBtnIcon' onClick={()=>downloadLogErrorsExcel()} />
        
                    </IconButton>
                </Tooltip>
                )}

                {titleState === "Errores" && (
                  <div className='overflow-scroll  !h-[20rem] bg-white !z-50'>
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