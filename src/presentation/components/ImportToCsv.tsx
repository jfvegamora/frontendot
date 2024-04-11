import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone';
import {handleFileUpload} from '../utils/validationCSVFile';
import { useCrud } from '../hooks';
import ModalImpor from './ModalImpor';
import {toast} from 'react-toastify';
// import { TfiImport } from "react-icons/tfi";
import { IconButton, Tooltip } from '@material-tailwind/react';
import { URLBackend } from '../hooks/useCrud';
import { signal } from '@preact/signals-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchOT } from '../../redux/slices/OTSlice';
import { paramsOT } from '../views/mantenedores/MOT';
// import { excelOTValidationStructure } from '../utils';

export const resultExcelTypes = signal({})

interface ImportProps{
  // strEntidad: string | undefined;
  strEntidad: "Clientes" | "Armazones" | any;
}

const PositionToRemove ={
  // Mandantes:    [4,5,6,7,9],
  Clientes:     [3,5,9,13],
  
  // Armazones:    [2,3,4,5],
}

const strUseCrud = "/api/typesexcel";

const ImportToCsv:React.FC<ImportProps> = ({
  strEntidad
}) => {
  const {excelTypes} = useCrud(strUseCrud)
  const [progress, setProgress] = useState(1);
  const [currentStage, setCurrentStage] = useState('Validacion');
  const [isOpen, setIsOpen] = useState(false)
  const dispatch         = useAppDispatch();
  const userState = useAppSelector((store: AppStore) => store.user);
  const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  const [errors, setErrors] = useState<any>()
 
  const handleClose = () => {
    setIsOpen(false)
    setErrors([])
    setProgress(0)
    setCurrentStage("Validacion")
  }


  const handleProgressUpdate = async (start: number, end: number, _nextStage: string, size: number) => {
    const totalUpdates    = size;
    const totalTime       = 2000;
    const increment       = (end - start) / totalUpdates;
    const timePerUpdate   = totalTime / totalUpdates;
   
    for (let i = start; i <= 100; i += increment) {
      await new Promise((resolve) => {
        setTimeout(() => {
          const progressPercentage = Math.min((i / end) * 100, 100);
          setProgress(progressPercentage);
          resolve(null)
        }, timePerUpdate);
      });
    }
    setProgress(0)
  };
  
  const handleValidacion = async (size:number) => {
    await handleProgressUpdate(0, 100, 'Almacenamiento',size);
    setProgress(100)
  };

  useEffect(()=>{
    setErrors((prev:any)=>prev)
    // console.log('actualizando...')
  },[isOpen])
  //ETAPA LECTURA
  
  const onDrop = useCallback(async(acceptedFiles:any) => {
    setIsOpen((prev)=>!prev)  
    const formData = new FormData();
    
    
    const result = await excelTypes(strEntidad)
    console.log(result)
    console.log('result tipos excel', JSON.parse(result["resul"]))
    // resultExcelTypes.value = result
    // 
    const validate = await  handleFileUpload(acceptedFiles[0], JSON.parse(result["resul"]))
    // const validate = await  handleFileUpload(acceptedFiles[0], [] as any)
    // const validate = await  handleFileUpload(acceptedFiles[0], [])
    
    await handleValidacion(validate["numberOfElements"] || 0)

    setTimeout(()=>{
      // console.log(validate["errors"])
      if(validate["errors"]){
        console.log(validate)
        setErrors((_prev:any)=>validate["errors"])
        setProgress(100)
        setIsOpen(true)
        setCurrentStage("Errores")
      }
    },500)
    
    console.log(strEntidad)

    if(validate["blob"] && validate["numberOfElements"]){   
      formData.append('file', validate["blob"], 'modified_file.xls');
      formData.append('positions_to_remove', JSON.stringify(PositionToRemove[strEntidad as "Clientes"]));
      formData.append('entidad', JSON.stringify(strEntidad));
      formData.append('userID',JSON.stringify(userState?.id));

      const url = `${URLBackend.value}/api/excel/import/`
      fetch(url, {
        method: 'POST',
        body: formData,
      })
      .then(response =>  response.json())
      //ETAPA CONFIRMACION
      .then(data => {
        if(data["Error"]){
          setCurrentStage("Errores")
          setErrors((_prev:any)=>data["Error"])
          setIsOpen(true)
        }else{
          dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
          toast.success('Import Finalizado Correctamente')
          handleClose()
        }
       })
      .catch(error => {
        console.error('Error uploading file:', error)
        setErrors(error)  
      });
    }
  }, []);

    const {getInputProps, getRootProps} = useDropzone({
        onDrop,
    })

  return (
     <div {...getRootProps()} className='cursor-pointer'>
        <Tooltip content="Importar">
          <IconButton
            variant="text"
            color="blue-gray"
            className="primaryBtnIconButton"
            tabIndex={1}
          >
          {/* <TfiImport className="primaryBtnIcon"/>   */}
          <FontAwesomeIcon icon={faUpload} className={` ${"primaryBtnIcon"}`}  />
          </IconButton>
        </Tooltip>
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