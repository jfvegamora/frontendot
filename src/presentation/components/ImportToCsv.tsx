import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone';
import {executeFetchImportOT, handleFileUpload, updateErrorRows} from '../utils/validationCSVFile';
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
import axios from 'axios';
// import { excelOTValidationStructure } from '../utils';

export const resultExcelTypes = signal({})
export const totalImport = signal(0);
export const restanteImport = signal(1);

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
export const isModalOT = signal(false);

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
    restanteImport.value = 1;
    totalImport.value    = 0;
  }


  const handleProgressUpdate = async (start: number, end: number, _nextStage: string, _size: number) => {
    const timePerUpdate   = 3.9603960396039604
    const increment = 0.06

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

  
  async function executeFetch(validate:any,numberOfElements:any) {
    if (validate["blob"] && numberOfElements) {
      console.log(validate)
      let jsonResponse:any = [];

      //?==============================================METODO OT =====================================================
      totalImport.value = validate["blob"].length;
      
      for(let i = 0; i < validate["blob"].length; i++){
        const formData = new FormData();
        const libroExcel = validate["blob"][i]
        console.log(libroExcel)
        formData.append('file', libroExcel["blob"])
        formData.append('positions_to_remove', JSON.stringify(PositionToRemove[strEntidad as "Clientes"]));
        formData.append('entidad', JSON.stringify(strEntidad));
        formData.append('userID', JSON.stringify(userState?.id));
        formData.append('tramo',JSON.stringify(restanteImport.value) )
        
        if(strEntidad === 'Ordenen de Trabajo'){
          isModalOT.value = true
        }
        const url = `${URLBackend.value}/api/excel/import/`;
        try {
          const response = await axios.post(url, formData);
          console.log(response)

          restanteImport.value = restanteImport.value + 1
          jsonResponse.push(response.data)
          
          if(response.status === 200 && (i < validate["blob"].length - 1)){
            handleValidacion(0)
          }else{
            setProgress(100)
          }


        } catch (error) {
          jsonResponse.push(error)
          console.log(error)
          setProgress(100)
          return jsonResponse
        }

      }
      
      console.log(jsonResponse)
      if(jsonResponse){
        setProgress(100)
      }
      const isErrorImport = jsonResponse.some((mensaje:any)=>mensaje.Error)

      //?CAMBIAR A FALSE PARA DEJAR DE PROBAR
      if(!isErrorImport){
        executeFetchImportOT(jsonResponse,userState?.id)
      }

      return jsonResponse
      
      //?==============================================METODO OT =====================================================
      // formData.append('file', validate["blob"], 'modified_file.xls');
      // formData.append('positions_to_remove', JSON.stringify(PositionToRemove[strEntidad as "Clientes"]));
      // formData.append('entidad', JSON.stringify(strEntidad));
      // formData.append('userID', JSON.stringify(userState?.id));

      // console.log(validate["blob"])
      // console.log(strEntidad)
      // if(strEntidad === 'Ordenen de Trabajo'){
      //   isModalOT.value = true
      // }


      // const url = `${URLBackend.value}/api/excel/import/`;
  
      // try {
      //   const response = await fetch(url, {
      //     method: 'POST',
      //     body: formData,
      //   });

      // //  if (response.status === 200) {
      // //   return { success: true };
      // //  } else {
      // //   return { success: false, error: `Error ${response.status}: ${response.statusText}` };
      // //   }
      //   const data = await response.json();
      //   console.log(data)
      //   return {data};
      // } catch (error) {
      //   return { error };
      // }
    } else {
      return { error: "No se puede realizar la carga debido a datos faltantes." };
    }
  }
  
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
    // const formData = new FormData();
    const result = await excelTypes(strEntidad)
    // 
    const validate = await  handleFileUpload(acceptedFiles[0], JSON.parse(result["resul"]),strEntidad)

    //?TRATAR DE EJECUTAR HANDLEVALIDACTION AL MISMO TIEMPO QUE LA LLAMADA 
    // if(validate["errors"]){
    //   console.log(validate)
    //   setErrors((_prev:any)=>validate["errors"])
    //   setProgress(100)
    //   setIsOpen(true)
    //   setCurrentStage("Errores")
    // }
    setTimeout(()=>{
      if(validate["errors"]){
        console.log(validate)
        setErrors((_prev:any)=>validate["errors"])
        setProgress(100)
        setIsOpen(true)
        setCurrentStage("Errores")
      }
    },200)
    
    
    if(validate["blob"] && validate["numberOfElements"]){ 
      
      const [fetchResult] = await Promise.all([
        executeFetch(validate, validate["numberOfElements"]),
        handleValidacion(validate["numberOfElements"] || 0),
      ]);

      console.log(fetchResult)

      const isErrorImport = fetchResult.some((mensaje:any)=>mensaje.Error)

      console.log(isErrorImport);

      if(isErrorImport){
        setCurrentStage("Errores")
        setProgress(100)        
        setErrors(fetchResult)
        setIsOpen(true)
        
      }else{
        toast.success('Import Finalizado Correctamente')
          handleClose()
          dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
      }

      // if(fetchResult.data["Error"]){
      
      //   setCurrentStage("Errores")
      //     setErrors((_prev:any)=>fetchResult.data["Error"])
      //     setIsOpen(true)
      // }else{
      //   toast.success('Import Finalizado Correctamente')
      //   handleClose()
      //   dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
      // }

      // if(fetchResult.success === true){
      //   dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
      //     toast.success('Import Finalizado Correctamente')
      //     handleClose()
      // }else{
      //   setCurrentStage("Errores")
      //     setErrors((_prev:any)=>data["Error"])
      //     setIsOpen(true)
      // }

      // Manejar el resultado de la validación
      // if (validationResult.error) {
      //   setCurrentStage("Errores");
      //   setErrors(validationResult.error);
      //   setIsOpen(true);
      // } else {
      //   // Manejar el resultado del fetch
      //   if (fetchResult.error) {
      //     console.error('Error uploading file:', fetchResult.error);
      //     setErrors(fetchResult.error);
      //   } else {
      //     dispatch(fetchOT({ OTAreas: OTAreas["areaActual"], searchParams: paramsOT.value }));
      //     toast.success('Import Finalizado Correctamente');
      //     handleClose();
      //   }
      // }  
      
      // formData.append('file', validate["blob"], 'modified_file.xls');
      // formData.append('positions_to_remove', JSON.stringify(PositionToRemove[strEntidad as "Clientes"]));
      // formData.append('entidad', JSON.stringify(strEntidad));
      // formData.append('userID',JSON.stringify(userState?.id));

      // const url = `${URLBackend.value}/api/excel/import/`
      // fetch(url, {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(response =>  response.json())
      // //ETAPA CONFIRMACION
      // .then(data => {
      //   if(data["Error"]){
      //     setCurrentStage("Errores")
      //     setErrors((_prev:any)=>data["Error"])
      //     setIsOpen(true)
      //   }else{
      //     dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
      //     toast.success('Import Finalizado Correctamente')
      //     handleClose()
      //   }
      //  })
      // .catch(error => {
      //   console.error('Error uploading file:', error)
      //   setErrors(error)  
      // });
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
            <ModalImpor errors={errors} progress={progress} titleState={currentStage}  onClose={handleClose} isModalOT={isModalOT}/>
          )}
        </div>
      </div>
  )
}

export default ImportToCsv