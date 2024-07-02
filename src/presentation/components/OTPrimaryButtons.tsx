import { IconButton, Tooltip, Button, Input } from '@material-tailwind/react';
import React, { Suspense, useCallback, useRef, useState } from 'react';

import { SiAddthis } from 'react-icons/si';
import { PiPrinterFill } from "react-icons/pi";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { BUTTON_MESSAGES, clearAllCheck, clearIndividualCheck, disabledIndividualCheck, reiniciarValidationNivel3, updateOT } from '../utils';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { clearImpression, fetchOT, fetchOTImpresionByID} from '../../redux/slices/OTSlice';

import axios from 'axios';
import { URLBackend } from '../hooks/useCrud';
import { useReactToPrint } from 'react-to-print';
import { EnumGrid } from '../views/mantenedores/MOTHistorica';
import { checkCount, paramsOT } from '../views/mantenedores/MOT';
import { signal } from '@preact/signals-react';
import { setEstadoImpresion } from './OTGrillaButtons';
import { SocialIcon } from 'react-social-icons';
// import WhastappForm from '../components/WhastappForm'






;

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
  
export const dataOTSignal       = signal([]);
export const isFinishImpression = signal(false);
export const barCodeSignal = signal('');

const valueSearchOT  = signal<any>('');
const valueConfirmOT = signal<any>('');
const strEntidad     = "Ordenen de Trabajo";
const strBaseUrl     = "/api/ot/";



const ErrorOTModal        = React.lazy(()=>import("./ErrorOTModal"));
const FOTTicketImpresion  = React.lazy(()=>import("../views/forms/FOTTicketImpresion"))
const ImportToCsv         = React.lazy(()=>import("./ImportToCsv"));
const ExportCSV           = React.lazy(()=>import('./ExportToCsv'))
const FOTValidarBodega    = React.lazy(()=>import('../components/OTForms/FOTValidarBodega'));
// const FOTWhastApp       = React.lazy(()=>import('../components/WhastappForm'))
const FOTImpresa          = React.lazy(()=>import('../views/forms/FOTImpresa'));
const FOTEmpaque          = React.lazy(()=>import('../views/forms/FOTEmpaque'));
const FOTGuiaDespacho     = React.lazy(()=>import('../views/forms/FOTGuiaDespacho'));
const FOTReporteFirma     = React.lazy(()=>import('../views/forms/FOTReporteFirma'));
const FOTWhastApp         = React.lazy(()=>import('../components/WhastappForm'));

export const EnumAreas:any = {
  10: 0,
  20: 1,
  30: 2,
  40: 3,
  50: 4,
  60: 5,
  70: 6,
  80: 7,
  90: 8,
  100: 9
}


export const validationStateOT = (positionCampo:number, nameCampo:string, folios:any, data:any) => {
  const resultadoFiltrado = data && data.filter((elemento:any) => folios.includes(elemento[1]));


  return resultadoFiltrado.map((OT:any)=>{
    const estado = OT[positionCampo]
    console.log(estado)
    console.log(nameCampo)
    if(estado !== nameCampo){
      return [OT[1], OT[4]]
    }
    return true
  })
};

const focusFirstInput = (strInputName: string, ref: React.RefObject<any>) => {
  if (ref.current) {
    const firstInput = ref.current.querySelector(`input[name=${strInputName}]`);
    if (firstInput) {
      (firstInput as HTMLInputElement).focus();
    }
  }
};

const OTPrimaryButtons:React.FC<AreaButtonsProps> = ({
    areaPermissions,
    handleAddPerson,
    params,
    pkToDelete,
    entities,
    setSelectedRows
}) => {
    const dispatch                                    = useAppDispatch();
    const OTAreas:any                                 = useAppSelector((store: AppStore) => store.OTAreas)
    const OTData:any                                  = useAppSelector((store: AppStore) => store.OTS.data)
    const User:any                                    = useAppSelector((store: AppStore) => store.user)
    const componentRef                                = useRef<any>(null);
    const SecondcomponentRef                          = useRef<any>(null);
    const [isShowErrorOTModal, setIsShowErrorOTModal] = useState(false);
    const [isFOTEmpaque, setIsFOTEmpaque]             = useState(false);
    const [isFOTGuia, setIsFOTGuia]                   = useState(false);
    // const [isBarCodeProcess, setIsBarCodeProcess]     = useState(false);
    const [isFOTImpresa, setIsFOTImpresa]             = useState(false);
    const [isFotTicketRetiro, _setisFotTicketRetiro]  = useState(false);
    const [isWhastApp, setIsWhastApp]                 = useState(false);
    const [isFOTValidarBodega, setIsFOTValidarBodega] = useState(false);
    const [isFOTReporteFirma, setIsFOTReporeFirma]    = useState(false);
    // const [barCode, setBarCode]                       = useState('')
    const [dataOT, setDataOT]                         = useState();
    // const [valueSearchOT, setValueSearchOT]           = useState<any>();
    // const [valueConfirmOT, setValueConfirmOT]         = useState<any>()
    const searchOTRef                                 = useRef<any>();

    const refFocusInput                               = React.useRef<any>(null);

    const permisos_usuario_areas = User.permisos_areas[EnumAreas[OTAreas["areaActual"]]]

    const folios = pkToDelete && pkToDelete.map(({folio}:any)=>folio)


    const handlePrint = useReactToPrint({
      content: () => componentRef.current, 
      suppressErrors: true,
      removeAfterPrint: true,
      onAfterPrint() {
        dispatch(clearImpression())
        isFinishImpression.value = true;
      },
    
    });

    
    // const handleComprobantePrint = useReactToPrint({
    //   content: () => SecondcomponentRef.current,
    //   suppressErrors: true,
    //   removeAfterPrint: true,
    //   onAfterPrint(){
    //       setIsFOTImpresa(false)
    //       setisFotTicketRetiro(false)
    //       dispatch(clearImpression())
    //   }
    // })

    const handleImpresionMasivo = async () => {      
      console.log(pkToDelete)
      if(pkToDelete.length === 0){
        return toast.error('No hay OTs Seleccionadas.')
      }
      disabledIndividualCheck.value = true;        
      const toastLoading = toast.loading('Imprimiendo OT´s.')
      const primerProyectoCodigo = pkToDelete[0].proyecto_codigo;
      const todosIguales          = pkToDelete.slice(1).every((ot:any) => ot.proyecto_codigo === primerProyectoCodigo);
      const impresaAnteriormente  = pkToDelete.every((ot:any) => ot.estado_impresion === '0');
      const validateUsuario       = pkToDelete.every((ot:any) => ot["usuario_id"] === User.id);
      const listaFolios = folios.map((num:number) => `${num}`).join(',')
      // console.log(listaFolios)
      
      if(!validateUsuario){
        toast.dismiss(toastLoading);
        console.log('render')
        disabledIndividualCheck.value = false;
        clearAllCheck.value = false;
        setSelectedRows([])
        toast.error(`OT ${folios} no pertenece al Usuario ${User.nombre}`);
        return;
      }
      // console.log(pkToDelete)
      // console.log(impresaAnteriormente)
      
      if(!impresaAnteriormente){
        toast.dismiss(toastLoading);
        disabledIndividualCheck.value = false;
        clearAllCheck.value = false;
        setSelectedRows([])        
        return toast.error(`La OT con folio: ${pkToDelete.filter((ot:any)=> ot.estado_impresion === '1').map((ot:any)=>ot.folio)}, ya fueron impresas anteriormente.`)
        
      }

      if(!todosIguales){
        disabledIndividualCheck.value = false;   
        clearAllCheck.value = false;
        setSelectedRows([])     
        toast.error('Las OTs no pertenecen al mismo proyecto')
        return;
      }

      setIsFOTImpresa(true)  
      await dispatch(fetchOTImpresionByID({ folio: listaFolios, OTAreas: OTAreas['areaActual'] })).then(()=>{
        // console.log('render')
        handlePrint()
      });



      try {
        setEstadoImpresion(pkToDelete,OTAreas["areaActual"], true, User).then(()=>{
          toast.dismiss(toastLoading)
          disabledIndividualCheck.value = false; 
          clearAllCheck.value = false;
          setSelectedRows([])
        })       
        } catch (error) {
          toast.dismiss(toastLoading)
          clearAllCheck.value = false;
          setSelectedRows([])
          disabledIndividualCheck.value = false;        
          return;    
        }
    };

    React.useEffect(()=>{
      if(!isFOTValidarBodega){
        focusFirstInput('ProcesarOT',refFocusInput)
        reiniciarValidationNivel3()
        valueConfirmOT.value = ''
        // setValueConfirmOT('')
      }
    },[isFOTValidarBodega, focusFirstInput])


    React.useEffect(()=>{
      if(isFinishImpression.value === true){
        if(pkToDelete.length >= 1){
          let masivo = true
            setEstadoImpresion(pkToDelete, OTAreas["areaActual"], masivo, User).then(()=>{
            clearIndividualCheck.value = true;

            dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))

            clearAllCheck.value = false;
            isFinishImpression.value = false;
          // const loadingToast = toast.load ing('Cargando...')
          // pkToDelete.map((ot:any)=>{
          //   try {
          //         setEstadoImpresion(ot.folio,1,User,OTAreas["areaActual"],masivo).then(()=>{
          //         clearIndividualCheck.value = true;
          //         dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))

          //         clearAllCheck.value = false;
          //         isFinishImpression.value = false;
          //         // toast.success('Es')
          //         toast.dismiss

          //       })            
          //     } catch (error) {
          //       console.log(error)
                
          //     }
          //  })}
      })}}
      // toast.success('Estado Impresión Cambiado.');
    },[isFinishImpression.value])





    const renderButton = useCallback(
      (icon: React.ReactNode, handle: () => void, tooltip: string) => (
        <Tooltip content={tooltip}>
          <IconButton
            variant="text"
            color="blue-gray"
            className="primaryBtnIconButton !mx-2"
            onClick={handle}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      []
    );

    
    // const imprimirComprobanteRetiro = async() => {
    //   const loadingToast = toast.loading('Imprimiendo Comprobante Retiro...');

    //   pkToDelete.map(async(OT:any)=>{
    //     try {
    //         const {data, status} = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas['areaActual']}&_folio=${OT.folio}`,{
    //           headers: {
    //              'Authorization': User.token, 
    //            }
    //      });
    //         console.log(data[0] && data[0][EnumGrid.imprime_ticket])
    //         console.log(status)
    //         if(data[0] && data[0][EnumGrid.imprime_ticket]){
    //             console.log('imprmiendo')
    //             await dispatch(fetchOTImpresionByID({ folio: OT.folio, OTAreas: OTAreas['areaActual'] }));
    //             handleComprobantePrint()
    //         }
    //         toast.dismiss(loadingToast);
    //     } catch (error) {
    //         toast.dismiss(loadingToast);
    //         throw error
    //     }


    //   })

    // }
      
    


    const handleChecked = async(folio:any) => {
      console.log(folio)

      console.log(OTData)
      if(folio === ''){
        return;
      }
      const resultIndex = entities.findIndex((OT: any) => OT[1] === parseInt(folio));

      if(resultIndex !== -1){
        setSelectedRows((prev:any)=>[...prev, resultIndex])
        // setValueSearchOT("")
        valueSearchOT.value = ''
        console.log('render')
        if(searchOTRef.current !== null){
          searchOTRef.current.focus()
        }
        return resultIndex

      }else{
        const {data:dataOT} = await axios(`${URLBackend}/api/ot/listado/?query=02&_p1=${folio}`,{
          headers: {
             'Authorization': User.token, 
           }
        });
        
        console.log(dataOT)
        if(dataOT){
          setDataOT(dataOT)
          setIsShowErrorOTModal(true)
        }

        console.log('render')
        return dataOT
      }
    }


  const handleDownloadMacro = async() => {
    try {
      const url = `${URLBackend}/api/downloadexcel/`;
      const formData = new FormData();
      //'MacroOT.xlsm'
      formData.append('ENTIDAD', 'MacroOT.xlsm'); // Aquí agregas el valor del macro que deseas enviar



      const { data } = await axios({
        url,
        method: 'POST', // Cambiamos de GET a POST
        data: formData, // Enviamos el FormData que contiene el string 'macro'
        responseType: 'blob',
        headers: {
          'Authorization': User.token,
          'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido correctamente
        },
      });

      const blobUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', 'MacroOT.xlsm');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw error;
    }
  };


    const handleWhatsappMasivo = () => {
      console.log('click')
      setIsWhastApp((prev) => !prev)
    }



    const handleProcesarMasivo = async() => {
      let estado = 0
      console.log(pkToDelete)
      const validateEstado           = pkToDelete.every((ot:any) => ot["estado_validacion"] === '2');
      const validateUsuario          = pkToDelete.every((ot:any) => ot["usuario_id"] === User.id);
      const validateProyecto         = pkToDelete.every((ot:any) => ot["proyecto_codigo"] === pkToDelete[0]["proyecto_codigo"]);
      const validateEstadoImpresion  = pkToDelete.every((ot:any)=>ot["estado_impresion"] === '1');

      const foliosMensaje = pkToDelete && pkToDelete.map(({folio}:any)=>folio)
      
      if(!validateEstado){
        return toast.error(`Folio ${folios} no está validado correctamente`);
      }

      
      if(!validateUsuario && OTAreas["areaActual"] === 50){
        toast.error(`Folio ${foliosMensaje} no pertenece al Usuario ${User.nombre}`);
        return;
      }
      
      if(!validateProyecto){
        return toast.error(`Folio ${folios} deben pertenecer al mismo proyecto`);
      }
      
      if(!validateEstadoImpresion){
        return toast.error(`OT ${pkToDelete.filter((ot:any)=> ot.estado_impresion === '0').map((ot:any)=>ot.folio)} no ha sido impresa.`) 
      }




      if(OTAreas["areaActual"] === 90){
        const filterPkToDeleteFirmaEnvio = pkToDelete.filter((OT:any)=> (OT.numero_envio === '0' || OT.numero_envio === null) && (OT.numero_reporte_firma === 0))
        const filterPkToDeleteGuia       = pkToDelete.filter((OT:any)=> OT.numero_guia === 0)
  
        if(filterPkToDeleteFirmaEnvio.length > 0){
          const folios = filterPkToDeleteFirmaEnvio.map((OT:any) => OT.folio)
          const resultFirmaEnvio = confirm('Los siguientes folios no tienen Número de envío o Reporte de fírmas: ' + "\n" +folios + "\n¿Desea Continuar?");
          if(!resultFirmaEnvio){
            return;
          }
        }

        if(filterPkToDeleteGuia.length > 0){
          const folios = filterPkToDeleteGuia.map((OT:any)=>OT.folio)
          const resultFirmaEnvio = confirm('Los siguientes folios no tienen Número de Guía: '+ "\n" + folios + "\n¿Desea Continuar?");
          if(!resultFirmaEnvio){
            return;
          }
        }
      }
      const toastLoading = toast.loading('Cargando...');

      const updatePromises = pkToDelete.map(async(ot:any)=>{
        if(OTAreas["areaActual"] === 90 || OTAreas["areaActual"] === 100){
          if(ot.numero_envio !== '0'){
            estado = 50
          }
          if(ot.numero_reporte_firma !== 0){
            estado = 20
          }
        }

        await updateOT(
            [],
            OTAreas["areaActual"],
            OTAreas["areaSiguiente"],
            estado,
            [],
            ot,
            [],
            [],
            User["id"],
            "",
            true,
            0,
            false,
            'Procesada'
        )
        //.then(()=>{
        //   dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))
        //   setSelectedRows([])
        //   checkCount.value = 0;
        //   clearAllCheck.value = false;
        // })
      })

      await Promise.all(updatePromises);

      dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))
      setSelectedRows([])
      checkCount.value = 0;
      clearAllCheck.value = false;
      toast.dismiss(toastLoading);
      toast.success('OTs Procesadas Correctamente',{
         autoClose: 900
      });
    }


    const handleProcesarConfirm = async(folio:any, toastLoading?:any) => {
      try {
        const result = await axios(`${URLBackend}/api/ot/listado/?query=01&_p1=${folio}`,{
          headers: {
            'Authorization': User.token, 
          }
        });

        if(result.data.length === 0){
          // setValueConfirmOT('')
          valueConfirmOT.value = ''
          setIsFOTValidarBodega(false)
          toast.dismiss(toastLoading)
          return toast.error(`OT ${folio}: No existe`)
        }

        if(result.status !== 200 || result?.data[0][EnumGrid.area_id] !== 60){
          // setValueConfirmOT('')
          valueConfirmOT.value = '';
          toast.dismiss(toastLoading)
          return toast.error(`OT ${folio}: No se encuentra en esta área`)
        }

        toast.dismiss(toastLoading)
        dataOTSignal.value = result.data 
        setIsFOTValidarBodega(true)
      } catch (error:any) {
        toast.dismiss(toastLoading)
        toast.error(error)
        setIsFOTValidarBodega(false)
      }


    }


    return (
    <div className='flex items-center   ml-[4rem] !w-full'>
        { (areaPermissions && areaPermissions[0] === "1" ) && (permisos_usuario_areas === '1') && (
          renderButton(
            <SiAddthis className="primaryBtnIcon " />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
          )
        )
        }
       
       <Suspense>
          {areaPermissions && areaPermissions[3] === "1" && permisos_usuario_areas === '1' && (
            <div className="mr-2">
              <ExportCSV
              strEntidad={strEntidad}
              params={params}
              strBaseUrl={strBaseUrl}
              OTAreas={OTAreas["areaActual"]}
            />
            </div>
          )}
       </Suspense>




          <Suspense>
            {areaPermissions && areaPermissions[4] === "1" && permisos_usuario_areas === '1' && (
              <Suspense>
                <ImportToCsv
                strEntidad={strEntidad}
                //  params={params}
                //  strBaseUrl={strBaseUrl}
                />
            </Suspense>
              )}

          </Suspense>
 


        {areaPermissions && areaPermissions[2] === '1' && permisos_usuario_areas === '1' && (
          renderButton(
            <PiPrinterFill className="primaryBtnIcon" />,
            handleImpresionMasivo!,
            BUTTON_MESSAGES.imprimir
          )
        )}

        {areaPermissions && areaPermissions[5] === '1' && permisos_usuario_areas === '1' && (
          renderButton(
            <SocialIcon  
              onClick={(e)=>e.preventDefault()}  
            url="https://www.whatsapp.com/"
            />,
            handleWhatsappMasivo!,
            BUTTON_MESSAGES.Whatsapp
          )
        )}

      {areaPermissions && areaPermissions[13] === "1" && permisos_usuario_areas ===  '1' && (
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
     
        {areaPermissions && areaPermissions[12] === "1" && permisos_usuario_areas === '1' && (
          <Tooltip content='Generar Número de Envío'>
              <Button className='otActionButton ml-4'  onClick={()=>setIsFOTEmpaque((prev)=>!prev)}>N° de Envio</Button>
          </Tooltip>
          )}


        {areaPermissions && areaPermissions[14] === '1' && permisos_usuario_areas === '1' && (
          <Tooltip content={'Generar Reporte de Firmas'}>
            <Button className='otActionButton mt-3 mx-5 'onClick={() => setIsFOTReporeFirma((prev)=>!prev)}>N° Rep. Firma</Button>  
          </Tooltip>
        )}

        {areaPermissions && areaPermissions[12] === "1" && permisos_usuario_areas === '1' && (
          <Tooltip content='Generar Número de Guía'>
              <Button className='otActionButton mr-4'  onClick={()=>{
                if(pkToDelete.length === 0){
                  toast.error('No hay OT seleccionada')
                }else{
                  setIsFOTGuia((prev)=>!prev)
                }
              }}>N° de Guía</Button>
          </Tooltip>
          )}


        {areaPermissions && areaPermissions[6] === '1' && permisos_usuario_areas === '1' && (
          <Tooltip content={BUTTON_MESSAGES.procesar}>
              {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}
              <Button color="green" className='otActionButton ml-2'
              onClick={handleProcesarMasivo}>Procesar</Button>
          </Tooltip>
        )}
        

        <Suspense>
          {isWhastApp && (
              <FOTWhastApp onClose={()=>setIsWhastApp(false)}/>
          )}
        </Suspense>

        <Suspense>
          {isFotTicketRetiro && (
            <FOTTicketImpresion ref={SecondcomponentRef}/>
          )}  
        </Suspense>

        <Suspense>
          {isFOTImpresa && (
            <div className='hidden'>
              <FOTImpresa ref={componentRef} masivo={true} />
            </div>
          )}
        </Suspense>


        <Suspense>
        {isFOTValidarBodega && (
            <FOTValidarBodega pkToDelete={pkToDelete}  handleClose={()=>setIsFOTValidarBodega(false)}/>
          )}
        </Suspense>

          <div className='ml-2'>
            <Input 
              type="text" 
              label='Seleccionar OT' 
              name='searchOT' 
              className='text-xl' 
              color='orange' 
              ref={searchOTRef} 
              value={valueSearchOT.value as any} 
              onChange={async(e:any)=>{
                console.log(e.target.value)
                if(e.target.value !== ''){
                  setTimeout(async()=>{
                    await handleChecked(e.target.value)
                    valueSearchOT.value = ''
                  },3000)
                }
                valueSearchOT.value = e.target.value
              }} />
          </div>

          {areaPermissions && areaPermissions[15] === '1' && permisos_usuario_areas === '1' && (
            <div className="ml-2">
              <Input 
                ref={refFocusInput} 
                type="number" 
                label='Validar OT' 
                name='ProcesarOT' 
                className='text-xl' 
                color='orange'  
                value={valueConfirmOT.value as any}
                onChange={async(e:any)=>{
                  if(e.target.value !== ''){
                    barCodeSignal.value = e.target.value
                    // console.log(barCodeSignal)
                    valueConfirmOT.value = barCodeSignal.value
                    if(barCodeSignal.value.length >= 5){
                        const toastLoading: any = toast.loading("cargando...");
                        // console.log(barCodeSignal.value)
                       await handleProcesarConfirm(parseInt(barCodeSignal.value), toastLoading).then(()=>{
                        toast.dismiss(toastLoading)
                         valueConfirmOT.value = "";
                         barCodeSignal.value = "";
                        });
                    }
                    
                    // if(!isBarCodeProcess){
                    //   console.log(e.target.value)
                    //   const toastLoading: any = toast.loading("cargando...");
                    //   setIsBarCodeProcess(true)
                    //   console.log(isBarCodeProcess)
                    //   await handleProcesarConfirm(parseInt(e.target.value), toastLoading)
                    // }
                    // setTimeout(async()=>{
                    //   console.log(e.target.value)
                    //   let isProcessing = false;
                    //   const handleBarcodeScan = async () => {
                    //     if (!isProcessing) {
                    //       console.log(e.target.value);
                    //       if (e.target.value !== "") {
                    //         const toastLoading: any = toast.loading("cargando...");
                    //         console.log(e.target.value);
                    //         isProcessing = true;
                    //         await handleProcesarConfirm(parseInt(e.target.value), toastLoading);
                    //       }
                    //       valueConfirmOT.value = "";
                    //     }
                    //   };
                      
                    //   if(!isProcessing){
                    //     handleBarcodeScan();
                    //   }
                    //   // if(e.target.value !== ''){
                    //   //   const toastLoading:any = toast.loading('cargando...')
                    //   //   console.log(e.target.value)
                    //   //   await handleProcesarConfirm(parseInt(e.target.value), toastLoading)
                    //   // }
                    //   // valueConfirmOT.value = ''
                    // },3000)
                  }


                  valueConfirmOT.value = (e.target.value === '' ? e.target.value : parseInt(e.target.value))
                }} 
                />
            </div>
          )}

          
        <Suspense>
          {isShowErrorOTModal && (
            <ErrorOTModal onClose={()=>setIsShowErrorOTModal(false)} data={dataOT && dataOT} valueConfirmOT={valueSearchOT}/>
          )}
        </Suspense>  


          <Suspense>
            {isFOTEmpaque && (
              <FOTEmpaque closeModal={()=>setIsFOTEmpaque(false)} setSelectedRows={setSelectedRows}  pktoDelete={pkToDelete} params={params}/>
            )}
          </Suspense>

          <Suspense>
            {isFOTGuia && (
              <FOTGuiaDespacho closeModal={()=>setIsFOTGuia(false)} setSelectedRows={setSelectedRows} pktoDelete={pkToDelete} params={params} />
            )}
          </Suspense>

          <Suspense>
            {isFOTReporteFirma && (
              <FOTReporteFirma closeModal={()=>setIsFOTReporeFirma(false)} setSelectedRows={setSelectedRows} pkToDelete={pkToDelete} />
            )}
          </Suspense>
            
  
    </div>
)}

export default OTPrimaryButtons;