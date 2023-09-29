import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone';
import {handleFileUpload} from '../utils/validationCSVFile';
import { useCrud } from '../hooks';
import ModalImpor from './ModalImpor';


interface ImportProps{
  // strEntidad: string | undefined;
  strEntidad: "Clientes" | "Armazones";
}

const PositionToRemove ={
  Clientes:    [3,5,9,13],
  Armazones:   [2,3,4,5],
}

const strUseCrud = "/api/typesexcel";

const ImportToCsv:React.FC<ImportProps> = ({
  strEntidad
}) => {
  const {excelTypes} = useCrud(strUseCrud)
  const [progress, setProgress] = useState(1);
  const [currentStage, setCurrentStage] = useState('Lectura');
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState([])
  
  const handleProgressUpdate = async (start: number, end: number, nextStage: string, stageDuration: number) => {
    const increment = (end - start) / 100;

    for (let i = start; i <= end; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          // setProgress(i);
          setProgress((prevProgres)=>{
            const newProgress = prevProgres + increment <= end ? prevProgres + increment : end;
            
            return newProgress;
          })
          resolve(true)
          if (i === end) {
            setCurrentStage(nextStage);
            setProgress(0)
            resolve(null);
          }
        }, 50); // Ajusta según lo que necesites
      });
    
  };
  };


  // const handleLectura = async () => {
  //   await handleProgressUpdate(0, 100, 'Lectura',2);
    
  // };

  const handleValidacion = async () => {
    await handleProgressUpdate(0, 100, 'Validacion',5);
    
  };

  const handleAlmacenamiento = async () => {
    await handleProgressUpdate(0, 100, 'Almacenamiento',3);
    
  };

  const handleConfirmacion = async () => {
    
    await handleProgressUpdate(0, 100, 'Confirmacion',3);
    setProgress(100);
  };



  //ETAPA LECTURA
  
  //ETAPA VALIDACION  
  const onDrop = useCallback(async(acceptedFiles:any) => {
    setIsOpen((prev)=>!prev)
    
    // handleProgressUpdate(0, 100, 'Validacion');
    
    const formData = new FormData();        
    
    const result = await excelTypes(strEntidad)
    
    
    await handleValidacion();
    const validate = await  handleFileUpload(acceptedFiles[0],JSON.parse(result["resul"]))
    console.log('validate', validate)
    
    formData.append('file', validate, 'modified_file.xls');
    
    formData.append('positions_to_remove', JSON.stringify(PositionToRemove[strEntidad!]));
    formData.append('entidad', JSON.stringify(strEntidad));
    
    //ETAPA ALMACENAMIENTO
      
    
    await handleAlmacenamiento();
    
    fetch(`https://mtoopticos.cl/api/excel/import/`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      //ETAPA CONFIRMACION
      .then(data => {
                    console.log(data)
                    console.log('data, error', data["Error"])
                    return handleConfirmacion();
                    
                
              })
              .catch(error => {
                     console.error('Error uploading file:', error)
                     setErrors(error)  
              });
      }, []);


    const {getInputProps, getRootProps} = useDropzone({
        onDrop,
    })
  
    console.log('isopen',isOpen)
  return (
     <div {...getRootProps()}>
        <h1>Subir</h1>
        <input className='cursor-pointer'  type='file' {...getInputProps()} accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
        <div className=''>
          {isOpen && (
            <ModalImpor progress={progress} titleState={currentStage}  onClose={setIsOpen} />
          )}
        </div>
      </div>
  )
}

export default ImportToCsv