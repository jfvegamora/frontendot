import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone';
import {handleFileUpload} from '../utils/validationCSVFile';
import { useCrud } from '../hooks';
import ModalImpor from './ModalImpor';
import {toast} from 'react-toastify';


interface ImportProps{
  // strEntidad: string | undefined;
  strEntidad: "Clientes" | "Armazones" | any;
}

const PositionToRemove ={
  Clientes:     [3,5,9,13],

  Armazones:    [2,3,4,5],
}

const strUseCrud = "/api/typesexcel";

const ImportToCsv:React.FC<ImportProps> = ({
  strEntidad
}) => {
  const {excelTypes} = useCrud(strUseCrud)
  const [progress, setProgress] = useState(1);
  const [currentStage, setCurrentStage] = useState('Validacion');
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState<any>()
  let a = false


  const handleProgressUpdate = async (start: number, end: number, _nextStage: string, size: number) => {
    const totalUpdates = size;
    const totalTime = 2000;
    const increment = (end - start) / totalUpdates;
    const timePerUpdate = totalTime / totalUpdates;
    // console.log(size)
    // console.log(increment)

    for (let i = start; i <= 100; i += increment) {
      await new Promise((resolve) => {
        setTimeout(() => {
          // console.log(i)
          const progressPercentage = Math.min((i / end) * 100, 100);
         
          setProgress(progressPercentage);
          // console.log(progressPercentage)
          // console.log(max)
          resolve(null)
        
          // if (Math.floor(progressPercentage) === 98) {
          //   setTimeout(() => {
          //     setCurrentStage(nextStage);
          //     console.log(nextStage)
          //     setProgress(0);
          //     resolve(null);
          //     console.log('ejecutando')
          //   }, 2000);
          //   setProgress(100)
          // } 
          // else {
          //   resolve(null);
          // }
        }, timePerUpdate);
      });
    }
    setProgress(0)
  };
  
  const handleValidacion = async (size:number) => {
    await handleProgressUpdate(0, 100, 'Almacenamiento',size);
    setProgress(100)
  };
  
  const handleAlmacenamiento = async (size:number) => {
    console.log(currentStage)
    if(currentStage !== "Errores"){
      await handleProgressUpdate(0, 100, 'Confirmacion',size);
      setProgress(100)
      setCurrentStage("Confirmacion")
      if(!errors){
        toast.success('Archivo cargado correctamente')
      }
      setTimeout(()=>{
        setIsOpen(false)
        setProgress(0)
        setCurrentStage("Lectura")
      },2000)
    }
  };

  useEffect(()=>{
    setErrors((prev:any)=>prev)
    console.log('actualizando...')
  },[isOpen])
  //ETAPA LECTURA
  
  const onDrop = useCallback(async(acceptedFiles:any) => {
    setIsOpen((prev)=>!prev)  
    const formData = new FormData();        
    const result = await excelTypes(strEntidad)
    
    console.log(acceptedFiles[0])
    
    
    const validate = await  handleFileUpload(acceptedFiles[0],JSON.parse(result["resul"]))
    await handleValidacion(validate["numberOfElements"] || 0)


    setTimeout(()=>{
      console.log(validate["errors"])
      if(validate["errors"]){
        console.log(validate)
        setErrors((_prev:any)=>validate["errors"])
        setProgress(100)
        setIsOpen(true)
        setCurrentStage("Errores")
      }
    },1000)
    
    
    if(validate["blob"] && validate["numberOfElements"]){   
      formData.append('file', validate["blob"], 'modified_file.xls');
      formData.append('positions_to_remove', JSON.stringify(PositionToRemove[strEntidad as "Clientes" | "Armazones"]));
      formData.append('entidad', JSON.stringify(strEntidad));

      // await handleValidacion(validate["numberOfElements"] || 0)
      
      fetch(`https://mtoopticos.cl/api/excel/import/`, {
        method: 'POST',
        body: formData,
      })
      .then(response =>  response.json())
      //ETAPA CONFIRMACION
      .then(data => {
        console.log(data)
        console.log('data, error', data["Errors"])
        if(data["Errors"]){
          const errors = data["Errors"].map((error:any)=>{
            const a = error.split(',')[0]
            const b = error.split(',')[1]
            const c = error.split(',')[2]
            return [a,c,b]
          })
          setCurrentStage("Errores")
          setErrors((_prev:any)=>errors)
          setIsOpen(true)
          a = true;
        }

        console.log(a)
        if(!a){
          setTimeout(async()=>{
            console.log('ejecutando')
            setProgress(0)
            setTimeout(async()=>{
                setCurrentStage('Almacenamiento')
                await handleAlmacenamiento(validate["numberOfElements"] || 0);
              },2000)
          },2000)
        }

       })
      .catch(error => {
        console.error('Error uploading file:', error)
        setErrors(error)  
      });
      //ETAPA ALMACENAMIENTO
    }
  }, []);

    const {getInputProps, getRootProps} = useDropzone({
        onDrop,
    })
  
  const handleClose = () => {
    setIsOpen(false)
    setErrors([])
    setProgress(0)
    setCurrentStage("Validacion")
  }

  return (
     <div {...getRootProps()}>
        <h1>Subir</h1>
        <input className='cursor-pointer'  type='file' {...getInputProps()} accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
        <div className=''>
          {isOpen && (
            <ModalImpor errors={errors} progress={progress} titleState={currentStage}  onClose={handleClose} />
          )}
        </div>
      </div>
  )
}

export default ImportToCsv