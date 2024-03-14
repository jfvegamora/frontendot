import { IconButton, Tooltip, Button, Input } from '@material-tailwind/react';
import React, { Suspense, useCallback, useRef, useState } from 'react';

import { SiAddthis } from 'react-icons/si';
import { PiPrinterFill } from "react-icons/pi";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { BUTTON_MESSAGES, MODAL, updateOT } from '../utils';
import { usePermission } from '../hooks';
import ImportToCsv from './ImportToCsv';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { clearImpression, fetchOT, fetchOTImpresionByID} from '../../redux/slices/OTSlice';

import axios from 'axios';
import { URLBackend } from '../hooks/useCrud';
import ErrorOTModal from './ErrorOTModal';
import { useReactToPrint } from 'react-to-print';
import FOTTicketImpresion from '../views/forms/FOTTicketImpresion';
import { EnumGrid } from '../views/mantenedores/MOTHistorica';
import { useModal } from '../hooks/useModal';
import { paramsOT } from '../views/mantenedores/MOT';
import { signal } from '@preact/signals-react';
// import FOTEmpaque from '../views/forms/FOTEmpaque';

type AreaButtonsProps ={
    areaName:string;
    areaPermissions:string;
    params:any;
    areaActual:string;
    handleAddPerson?: () => void;
    pkToDelete?: any;
    entities?:any;
    setSelectedRows?:any
  }
  
export const dataOTSignal = signal([])
const strEntidad = "Ordenen de Trabajo";
const strBaseUrl = "/api/ot/";

const FOTImpresa        = React.lazy(()=>import('../views/forms/FOTImpresa'));
const ExportCSV         = React.lazy(()=>import('./ExportToCsv'))
const FOTEmpaque        = React.lazy(()=>import('../views/forms/FOTEmpaque'));
const FOTValidarBodega  = React.lazy(()=>import('../components/OTForms/FOTValidarBodega'))


export const validationStateOT = (positionCampo:number, nameCampo:string, folios:any, data:any) => {
  const resultadoFiltrado = data && data.filter((elemento:any) => folios.includes(elemento[1]));


  return resultadoFiltrado.map((OT:any)=>{
    const estado = OT[positionCampo]
    if(estado !== nameCampo){
      return [OT[1], OT[4]]
    }
    return true
  })
};
// const ExportCSV  = React.lazy(()=>import('));


const OTPrimaryButtons:React.FC<AreaButtonsProps> = ({
    // areaName,
    areaPermissions,
    // areaActual,
    handleAddPerson,
    params,
    pkToDelete,
    entities,
    setSelectedRows
}) => {
    // const strUrl = `${URLBackend}/api/ot/listado`
    const {escritura_lectura}                         = usePermission(28);
    const dispatch                                    = useAppDispatch();
    const data:any                                    = useAppSelector((store: AppStore) => store.OTS.data)
    const OTs: any = useAppSelector((store: AppStore) => store.OTS);
    const OTAreas:any                                 = useAppSelector((store: AppStore) => store.OTAreas)
    const User:any                                    = useAppSelector((store: AppStore) => store.user)
    const componentRef                                = useRef<any>(null);
    const SecondcomponentRef                          = useRef<any>(null);
    const [isShowErrorOTModal, setIsShowErrorOTModal] = useState(false)
    const [isFOTEmpaque, setIsFOTEmpaque]             = useState(false);
    const [isFOTValidarBodega, setIsFOTValidarBodega] = useState(false);
    const [dataOT, setDataOT]                         = useState();
    const [valueSearchOT, setValueSearchOT]           = useState<any>();
    const [valueConfirmOT, setValueConfirmOT]         = useState<any>()
    const searchOTRef                                 = useRef<any>();
    const { showModal, CustomModal }                  = useModal();
    const userState: any = useAppSelector((store: AppStore) => store.user);

    const folios = pkToDelete && pkToDelete.map(({folio}:any)=>folio)

    const handlePrint = useReactToPrint({
      content: () => componentRef.current as any, 
      suppressErrors: true,
      removeAfterPrint: true,
      onAfterPrint(){
        imprimirComprobanteRetiro()
        // dispatch(clearImpression())
      }
     
    });

    
    const handleComprobantePrint = useReactToPrint({
      content: () => SecondcomponentRef.current,
      suppressErrors: true,
      removeAfterPrint: true,
      onAfterPrint(){
          dispatch(clearImpression())
      }
    })



    const renderButton = useCallback(
      (icon: React.ReactNode, handle: () => void, tooltip: string) => (
        <Tooltip content={tooltip}>
          <IconButton
            variant="text"
            color="blue-gray"
            className="primaryBtnIconButton "
            onClick={handle}
            // disabled={!escritura_lectura}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      []
    );

    const imprimirComprobanteRetiro = async() => {
      const loadingToast = toast.loading('Imprimiendo Comprobante Retiro...');

      pkToDelete.map(async(OT:any)=>{
        try {
            const {data, status} = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas['areaActual']}&_folio=${OT.folio}`,{
              headers: {
                 'Authorization': User.token, 
               }
         });
            console.log(data[0] && data[0][EnumGrid.imprime_ticket])
            console.log(status)
            if(data[0] && data[0][EnumGrid.imprime_ticket]){
                console.log('imprmiendo')
                await dispatch(fetchOTImpresionByID({ folio: OT.folio, OTAreas: OTAreas['areaActual'] }));
                handleComprobantePrint()
    
            }
            toast.dismiss(loadingToast);
        } catch (error) {
            toast.dismiss(loadingToast);
            throw error
        }


      })

    }
      
    


    const handleChecked = async(folio:any) => {
      const resultIndex = entities.findIndex((OT: any) => OT[1] === parseInt(folio));

      if(resultIndex !== -1){
        setSelectedRows((prev:any)=>[...prev, resultIndex])
        setValueSearchOT(" ")
        if(searchOTRef.current !== null){
          searchOTRef.current.focus()
        }
        return resultIndex
        //EJECUTAR METODO PARA FOCUS DE INPUT SEARCHOT

      }else{
        const {data:dataOT} = await axios(`${URLBackend}/api/ot/listado/?query=01&_folio=${folio}`,{
          headers: {
             'Authorization': User.token, 
           }
        });

        if(dataOT){
          setDataOT(dataOT)
          setIsShowErrorOTModal(true)
        }

        return dataOT
      }
    }



    const handleImpresionMasivo = async() => {
      // console.log('click')
      // console.log(pkToDelete)
    
      // console.log(folios)
      const result = validationStateOT(5, '0', folios, data)
      const areAllSameType = result.every((item:any) => item === true);

      // console.log(result)

      
      if(!areAllSameType){
        result.map((ot:any)=>{
          if(Array.isArray(ot)){
            toast.error(`Error: folio ${ot[0]}  | ya impresa`);
            return;
          }
        })
        return;
      }

      console.log(pkToDelete)
      const printWithConfirmation = async (index:number) => {
        if (index >= pkToDelete.length) return;

        const OT = pkToDelete[index];

        try {
            const loadingToast = toast.loading('Imprimiendo...');
            await dispatch(fetchOTImpresionByID({ folio: OT.folio, OTAreas: OTAreas['areaActual'] }));
            const confirmación = await confirm(`Presione 'Aceptar' para imprimir la OT:${OT.folio}`);
            if (confirmación) {
                handlePrint();
            } else {
                console.log('Usuario canceló la impresión');
            }
            toast.dismiss(loadingToast);
            console.log('render');
        } catch (error) {
            console.log(error);
            throw error;
        }

        // Procesar el siguiente elemento después de esperar un poco para permitir que el navegador actualice la UI
        setTimeout(async () => {
            await printWithConfirmation(index + 1);
        }, 100);
    };

    // Llamar a la función para iniciar el proceso
    await printWithConfirmation(0);
    //   for (const OT of pkToDelete) {
    //     try {
    //       const loadingToast = toast.loading('Imprimiendo...');
    //         await dispatch(fetchOTImpresionByID({ folio: OT.folio, OTAreas: OTAreas['areaActual'] }))
    //         const confirmación = confirm(`Presione 'Aceptar' para imprimir la OT:${OT.folio}`);
    //         if (confirmación) {
    //              handlePrint();
    //         } else {
    //             console.log('Usuario canceló la impresión');
    //             // return;
    //         }
    //         toast.dismiss(loadingToast);
    //         console.log('render');
    //     } catch (error) {
    //       // toast.dismiss(loadingToast);
    //         console.log(error);
    //         throw error;
    //     }
    // }
      console.log('render')     
      // pkToDelete.map(async(ot:any)=>{
      //   console.log(ot)
      //   try {
      //     const query = `?query=06&_folio=${ot.folio}&_p2=${1}&_estado=${ot.estado_id}&_usuario=${User.id}&_origen=${OTAreas["areaActual"]}`
      //     const result = await axios(`${strUrl}/${query}`);

      //     console.log(result)
      //     if(result.status === 200){
      //       //handle print
      //       console.log('render')
      //       const loadingToast = toast.loading('Cargando...');

      //       // Realiza la operación asíncrona
      //       await new Promise((_resolve) => {
      //         dispatch(fetchOTByID({ folio: ot["folio"], OTAreas: OTAreas['areaActual'] }))
      //           .then(() => {
      //             // Resuelve la promesa cuando la operación está completa
      //           //   setTimeout(()=>{
      //           // },2000)
      //           handlePrint()
      //           })
      //           .catch((error) => {
      //             // Manejo de errores
      //             console.error(error);
      //             // Rechaza la promesa en caso de error
      //             throw error;
      //           })
      //           .finally(() => {
      //             // Oculta el toast de carga cuando la operación está completa
      //             toast.dismiss(loadingToast);
      //           });
      //       });
      //       // handlePrint()
      //       toast.success(`OT Impresa: ${ot.folio}`)
      //     }
          
      //   } catch (error) {
      //     console.log(error)
      //     throw error;
      //   }

      // })
      
    }

    const handleDownloadMacro = async() => {
      try {
        const url = `${URLBackend}/api/downloadexcel/`
        const {data} = await axios({url,
          method: 'GET',
          responseType: 'blob',
          headers: {
            'Authorization': User.token, 
          }
        })
        const blobUrl = window.URL.createObjectURL(new Blob([data]));
        // Crear un enlace invisible y hacer clic en él para iniciar la descarga
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', 'macro_ot.xlsm');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        // console.log(error)
        throw error
      }
    }


    const handleWhatsappMasivo = () => {
      console.log('click')
    }



    const handleProcesarMasivo = () => {
      
      console.log(OTAreas["areaActual"])

      let condition = OTAreas["areaActual"] === 50 ? 'Ingresada' : 'En proceso';

      const result = validationStateOT(4, condition, folios, data)
      const areAllSameType = result.every((item:any) => item === true);
      // console.log(result)
      
      if(!areAllSameType){
        result.map((ot:any)=>{
          if(Array.isArray(ot)){
            toast.error(`Error: folio ${ot[0]}  | ${ot[1]}`);
            return;
          }
        })
        return;
      }
      
      pkToDelete.map((ot:any)=>{
        updateOT(
          [],
          OTAreas["areaActual"],
          OTAreas["areaSiguiente"],
          20,
          [],
          ot,
          [],
          [],
          User["id"],
          "",
          true
        ).then(()=>{
          dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))
          setSelectedRows([])
        })
      })

      // toast.success('OTs Procesadas Correctamente')
    }





    const handleReporteFirma = async() => {
      let resultBoton:any = []
  
      if(pkToDelete.length < 1){
        toast.error('No Hay OT Seleccionada')
        return;
      }

      console.log(pkToDelete)

      if(parseInt(pkToDelete[0]["numero_envio"]) !== 0){
        return toast.error(`OT ${pkToDelete[0]["folio"]} ya tiene un número de envío asignado `)
      }

      if(parseInt(pkToDelete[0]["numero_reporte_firma"]) !== 0){
        const result = await showModal(
          `OT: ${pkToDelete[0]["folio"]} Tiene Reporte de Firmas asignado, ¿Desea agregar uno nuevo? `,
          '', 
          MODAL.keepYes,
          MODAL.kepNo
        );


        if(!result){
          setSelectedRows([])
          return
        }

      }
      
      console.log('render')
     
      const resultadoFiltrado = OTs.data && OTs.data.filter((elemento:any) => folios.includes(elemento[1])); 
     
      resultadoFiltrado.map((ot:any)=>{
        const estadoCOL = ot[4]
  
        if(estadoCOL !== 'Anulada'){
           resultBoton =  [...resultBoton, [ot[1], true]]
        }else{
            resultBoton =  [...resultBoton, [ot[1], ot[4]]]
        }
      })
      
      
      const areAllSameType = resultBoton.every((item:any) => item[1] === true);
  
      if(!areAllSameType){
        resultBoton.map((ot:any)=>{
            if(typeof ot[1] === 'string'){
              toast.error(`Error: folio ${ot[0]}  | ${ot[1]}`);
            }
          } 
        ) 
      }else{  
          const toastLoading = toast.loading('Cargando...');
        try {
          const query = {
            _proyecto   :    pkToDelete[0]["proyecto_codigo"],
            _pkToDelete :   JSON.stringify(resultBoton.map((folioOT:any)=>({folio: folioOT[0]}))),
            _id         :   2,
            _usuario    :   userState["id"]
          }
    
    
          const strUrl      = `${URLBackend}/api/proyectodocum/listado`
          const queryURL    = `?query=06&_p2=${query["_proyecto"]}&_id=${query["_id"]}&_pkToDelete=${query["_pkToDelete"]}&_p4=${query["_usuario"]}`
          const result      = await axios(`${strUrl}/${queryURL}`,{
            headers:  {
              'Authorization': User.token, 
            }
          });
          console.log(result)        
          if(result.status === 200){
            const successMessage = `Reporte firma generado: ${result.data[0][0]}`

            dispatch(fetchOT({searchParams: `_proyecto=${query["_proyecto"]}`}))
            setSelectedRows([])
            toast.dismiss(toastLoading)
            toast.success(successMessage)
        }
        } catch (error) {
          toast.dismiss(toastLoading)
          console.log(error)
          throw error;
        }
      }
    }



    const handleProcesarConfirm = async(folio:any) => {
      try {
          console.log(folio)
        const result = await axios(`${URLBackend}/api/ot/listado/?query=01&_folio=${folio}`,{
          headers: {
            'Authorization': User.token, 
          }
        });

        console.log(result)

        if(result.data.length === 0){
          setValueConfirmOT('')
          setIsFOTValidarBodega(false)
          return toast.error(`OT ${folio}: No existe`)
        }

        if(result.status !== 200 || result?.data[0][EnumGrid.area_id] !== 60){
          setValueConfirmOT('')
          return toast.error(`OT ${folio}: No se encuentra en esta área`)
        }

        dataOTSignal.value = result.data 
        console.log(result)

        setIsFOTValidarBodega(true)
      } catch (error:any) {
        console.log(error)
        toast.error(error)
        setIsFOTValidarBodega(false)
      }


    }




    return (
    <div className='flex items-center   ml-[4rem] !w-full'>
        {areaPermissions && areaPermissions[0] === "1" && escritura_lectura && (
          renderButton(
            <SiAddthis className="primaryBtnIcon " />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
          )
        )
        }
       
       {/* <Suspense> */}
          {areaPermissions && areaPermissions[3] === "1" && escritura_lectura && (
            <div className="mr-2">
              <ExportCSV
              strEntidad={strEntidad}
              params={params}
              strBaseUrl={strBaseUrl}
              OTAreas={OTAreas["areaActual"]}
            />
            </div>
          )}
       {/* </Suspense> */}

        {areaPermissions && areaPermissions[4] === "1" && escritura_lectura && (
          <ImportToCsv
           strEntidad={strEntidad}
          //  params={params}
          //  strBaseUrl={strBaseUrl}
        />
        )}

        {areaPermissions && areaPermissions[2] === '1' && escritura_lectura && (
          renderButton(
            <PiPrinterFill className="primaryBtnIcon" />,
            handleImpresionMasivo!,
            BUTTON_MESSAGES.imprimir
          )
        )}

        {areaPermissions && areaPermissions[5] === '1' && escritura_lectura && (
          renderButton(
            <ImWhatsapp className="primaryBtnIcon" />,
            handleWhatsappMasivo!,
            BUTTON_MESSAGES.Whatsapp
          )
        )}

      {areaPermissions && areaPermissions[13] === "1" && escritura_lectura && (
          <Tooltip content={'Descargar Plantilla Excel'} >
            <IconButton 
              className='primaryBtnIconButton'
              variant='text'
              color="blue-gray"
            >
              <PiMicrosoftExcelLogoFill className='primaryBtnIcon' onClick={()=>handleDownloadMacro()} />

            </IconButton>
            {/* <Button color="green" className='otActionButton mx-4' >Macro Excel</Button> */}
          </Tooltip>
        )}
        {areaPermissions && areaPermissions[6] === '1' && escritura_lectura && (
          <Tooltip content={BUTTON_MESSAGES.procesar}>
              {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}
              <Button color="green" className='otActionButton'
              onClick={handleProcesarMasivo}>Procesar</Button>
          </Tooltip>
        )}

        {areaPermissions && areaPermissions[12] === "1" && escritura_lectura && (
          <Tooltip content='Generar Número de Envío'>
              <Button className='otActionButton ml-4'  onClick={()=>setIsFOTEmpaque((prev)=>!prev)}>N° de Envio</Button>
          </Tooltip>
          )}


         

        {areaPermissions && areaPermissions[14] === '1' && escritura_lectura && (
          <Tooltip content={'Generar Reporte de Firmas'}>
            <Button className='otActionButton mt-3 mx-5'onClick={() => handleReporteFirma()}>N° Rep. Firma</Button>  
          </Tooltip>
        )}



        <Suspense>
          <div className='hidden'>
            <FOTImpresa ref={componentRef} />
            <FOTTicketImpresion ref={SecondcomponentRef}/>
          </div>
        </Suspense>

        {isFOTValidarBodega && (
          <Suspense>
            <FOTValidarBodega/>
          </Suspense>
        )}


        {/* {areaPermissions && areaPermissions[0] === "1" && escritura_lectura && (
        )} */}

          <div className='ml-2'>
            <Input type="text" label='Buscar OT' name='searchOT' className='text-xl' color='orange' ref={searchOTRef} onBlur={(e:any)=>handleChecked(e.target.value)} value={valueSearchOT} onChange={(e:any)=>setValueSearchOT(e.target.value)} />
          </div>

          <div className="ml-2">
          <Input type="text" label='Procesar OT' name='ProcesarOT' className='text-xl' color='orange' ref={searchOTRef} value={valueConfirmOT} onChange={(e:any)=>{handleProcesarConfirm(e.target.value),setValueConfirmOT(e.target.value)}} />
          </div>

          

        {isShowErrorOTModal && (
          <ErrorOTModal onClose={()=>setIsShowErrorOTModal(false)} data={dataOT && dataOT}/>
        )}


          <Suspense>
            {isFOTEmpaque && (
              <FOTEmpaque closeModal={()=>setIsFOTEmpaque(false)} setSelectedRows={setSelectedRows}  pktoDelete={pkToDelete} params={params}/>
            )}
          </Suspense>
            
        <Suspense>
          <CustomModal />
        </Suspense>

    </div>
)}

export default OTPrimaryButtons;