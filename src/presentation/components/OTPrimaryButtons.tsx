import { IconButton, Tooltip, Button, Input } from '@material-tailwind/react';
import React, { Suspense, useCallback, useRef, useState } from 'react';

import { SiAddthis } from 'react-icons/si';
import { PiPrinterFill } from "react-icons/pi";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { BUTTON_MESSAGES, reiniciarValidationNivel3, updateOT } from '../utils';
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
import { checkCount, paramsOT } from '../views/mantenedores/MOT';
import { signal } from '@preact/signals-react';
import { focusFirstInput } from '../components/OTForms/FOTValidarBodega';
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
const FOTValidarBodega  = React.lazy(()=>import('../components/OTForms/FOTValidarBodega'));
const FOTGuiaDespacho   = React.lazy(()=>import('../views/forms/FOTGuiaDespacho'));
const FOTReporteFirma   = React.lazy(()=>import('../views/forms/FOTReporteFirma'));

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
    const dispatch                                    = useAppDispatch();
    // const data:any                                    = useAppSelector((store: AppStore) => store.OTS.data)
    const OTAreas:any                                 = useAppSelector((store: AppStore) => store.OTAreas)
    const User:any                                    = useAppSelector((store: AppStore) => store.user)
    const componentRef                                = useRef<any>(null);
    const SecondcomponentRef                          = useRef<any>(null);
    const [isShowErrorOTModal, setIsShowErrorOTModal] = useState(false)
    const [isFOTEmpaque, setIsFOTEmpaque]             = useState(false);
    const [isFOTGuia, setIsFOTGuia]                   = useState(false);
    const [isFOTImpresa, setIsFOTImpresa]             = useState(false);
    const [isFotTicketRetiro, setisFotTicketRetiro]   = useState(false);
    const [isFOTValidarBodega, setIsFOTValidarBodega] = useState(false);
    const [isFOTReporteFirma, setIsFOTReporeFirma]    = useState(false);
    const [dataOT, setDataOT]                         = useState();
    const [valueSearchOT, setValueSearchOT]           = useState<any>();
    const [valueConfirmOT, setValueConfirmOT]         = useState<any>()
    const searchOTRef                                 = useRef<any>();

    const refFocusInput                               = React.useRef<any>(null);

    const permisos_usuario_areas = User.permisos_areas[EnumAreas[OTAreas["areaActual"]]]


    // console.log(EnumAreas[OTAreas["areaActual"]])

    // console.log(OTAreas["areaActual"])

    // console.log(User.permisos_areas)
    
    // console.log(permisos_usuario_areas)
    // // console.log(EnumAreas[20])



    const folios = pkToDelete && pkToDelete.map(({folio}:any)=>folio)

    const handlePrint = useReactToPrint({
      content: () => componentRef.current, 
      suppressErrors: true,
      removeAfterPrint: true,
      onAfterPrint(){
        setisFotTicketRetiro(true)
        imprimirComprobanteRetiro()
        // dispatch(clearImpression())
      }
     
    });

    
    const handleComprobantePrint = useReactToPrint({
      content: () => SecondcomponentRef.current,
      suppressErrors: true,
      removeAfterPrint: true,
      onAfterPrint(){
          setIsFOTImpresa(false)
          setisFotTicketRetiro(false)
          dispatch(clearImpression())
      }
    })

    
    const handleImpresionMasivo = async () => {
      console.log(pkToDelete)
      
      // pkToDelete.map(async(ot:any)=>{
      //   try {
      //     await dispatch(fetchOTImpresionByID({ folio: ot.folio, OTAreas: OTAreas['areaActual'] }))
      //   } catch (error)  {
      //     console.log(error)
      //   }
      // })
      // await handlePrint()

      pkToDelete.forEach(async(ot:any) => {
        try {
          setIsFOTImpresa(true)
          await dispatch(fetchOTImpresionByID({ folio: ot.folio, OTAreas: OTAreas['areaActual'] })).then(()=>handlePrint())
        } catch (error)  {
          console.log(error)
        }
      })
      handlePrint()
      

    //   const print = useReactToPrint({
    //     content: () => componentRef.current as any,
    //     suppressErrors: true,
    //     removeAfterPrint: true,
    //     onAfterPrint() {
    //       setisFotTicketRetiro(true);
    //       imprimirComprobanteRetiro();
    //       // dispatch(clearImpression());
    //     }
    //   }
    // );

    
    
    //   for (let i = 0; i < pkToDelete.length; i++) {
    //     await print();
    //     // Opcional: agregar un retraso para evitar que las ventanas emergentes se superpongan
    //     await new Promise((resolve) => setTimeout(resolve, 500));
    //   }
    
    //   // Acciones después de imprimir todas las boletas
    //   //
    //  handlePrint()

    };


    React.useEffect(()=>{
      console.log(isFOTValidarBodega)
      if(!isFOTValidarBodega){
        console.log('render')
        focusFirstInput('ProcesarOT',refFocusInput)
        reiniciarValidationNivel3()
        setValueConfirmOT('')
      }
    },[isFOTValidarBodega, focusFirstInput])


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


    // const handlePrintRegistro = async (folio:any) => {
    //   try {
    //     // Realiza la carga de datos necesaria antes de la impresión
    //     await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }));
    //     // Ejecuta la impresión del registro
    //     console.log('render')
    //     await handlePrint();
    //     return 'hola'
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // const handlePrintRegistro = async (folio:any) => {
    //   try {
    //     // Realiza la carga de datos necesaria antes de la impresión
    //     await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }));
    //     // Devuelve una promesa que resuelve cuando la impresión se completa
    //     return new Promise((resolve, reject) => {
    //       // Usa un setTimeout para asegurarse de que la referencia se actualice correctamente
    //       setTimeout(() => {
    //         handlePrint({
    //           content: () => componentRef.current,
    //           suppressErrors: true,
    //           removeAfterPrint: true,
    //           onAfterPrint: () => resolve()
    //         });
    //       }, 100); // Ajusta el tiempo según sea necesario
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // };

    // const handleImpresionMasivo = async () => {
    //   const printPromises = pkToDelete.map(async (registro:any) => {
    //     console.log(registro)
    //     await handlePrint({ content: () => componentRef.current as any });
    //     // Opcional: agregar un retraso para evitar que las ventanas emergentes se superpongan
    //     await new Promise((resolve) => setTimeout(resolve, 500));
    //   });
    
    //   await Promise.all(printPromises);
    
    //   // Acciones después de imprimir todas las boletas
    //   setisFotTicketRetiro(true);
    //   imprimirComprobanteRetiro();
    //   // dispatch(clearImpression());
    // };


    // const handleImpresionMasivo = async() => {
    //   setIsFOTImpresa(true);
    
    //   for (let OT of pkToDelete) {
    //     console.log(OT);
    //     const result = await handlePrintRegistro(OT.folio);
    //     console.log(result); // Aquí puedes ver el resultado de la impresión
    //   }
    // }

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
      let estado = 0
      console.log(pkToDelete)

      const validateEstado   = pkToDelete.every((ot:any) => ot["estado_validacion"] === '2');
      const validateUsuario  = pkToDelete.every((ot:any) => ot["usuario_id"] === User.id);
      const validateProyecto = pkToDelete.every((ot:any) => ot["proyecto_codigo"] === pkToDelete[0]["proyecto_codigo"]);

      const foliosMensaje = pkToDelete && pkToDelete.map(({folio}:any)=>folio)

      
            if(!validateEstado){
              return toast.error(`Folio ${folios} no está validado correctamente`);
            }


      console.log(validateEstado)

      console.log(validateUsuario)

      if(!validateUsuario){
        console.log('render')
        toast.error(`Folio ${foliosMensaje} no pertenece al Usuario ${User.nombre}`);
        return;
      }

      if(!validateProyecto){
        return toast.error(`Folio ${folios} deben pertenecer al mismo proyecto`);

      }




      console.log(validateEstado)

      if(OTAreas["areaActual"] === 90){
        const filterPkToDeleteFirmaEnvio = pkToDelete.filter((OT:any)=> (OT.numero_envio === '0' || OT.numero_envio === null) && (OT.numero_reporte_firma === 0))

        const filterPkToDeleteGuia       = pkToDelete.filter((OT:any)=> OT.numero_guia === 0)
  
        if(filterPkToDeleteFirmaEnvio.length > 0){
          const folios = filterPkToDeleteFirmaEnvio.map((OT:any) => OT.folio)
          console.log(folios)
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

      
      pkToDelete.map((ot:any)=>{
        if(OTAreas["areaActual"] === 90 || OTAreas["areaActual"] === 100){
          if(ot.numero_envio !== '0'){
            estado = 50
          }

          if(ot.numero_reporte_firma !== 0){
            estado = 20
          }
        }


        updateOT(
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
        ).then(()=>{
          dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))
          setSelectedRows([])
          checkCount.value = 0;
        })
      })

      // toast.success('OTs Procesadas Correctamente')
    }


    // const handleReporteFirma = async() => {
    //   let resultBoton:any = []
  
    //   if(pkToDelete.length < 1){
    //     toast.error('No Hay OT Seleccionada')
    //     return;
    //   }

    //   console.log(pkToDelete)

    //   console.log(parseInt(pkToDelete[0]["numero_envio"]) !== 0)
    //   console.log(pkToDelete[0]["numero_envio"] !== null)

    //   if(parseInt(pkToDelete[0]["numero_envio"]) !== 0 && pkToDelete[0]["numero_envio"] !== null){
    //     console.log('render')
    //     return toast.error(`OT ${pkToDelete[0]["folio"]} ya tiene un número de envío asignado `)
    //   }

    //   if(parseInt(pkToDelete[0]["numero_reporte_firma"]) !== 0){
    //     const result = await showModal(
    //       `OT: ${pkToDelete[0]["folio"]} Tiene Reporte de Firmas asignado, ¿Desea agregar uno nuevo? `,
    //       '', 
    //       MODAL.keepYes,
    //       MODAL.kepNo
    //     );


    //     if(!result){
    //       setSelectedRows([])
    //       return
    //     }

    //   }
      
    //   console.log('render')
     
    //   const resultadoFiltrado = OTs.data && OTs.data.filter((elemento:any) => folios.includes(elemento[1])); 
     
    //   resultadoFiltrado.map((ot:any)=>{
    //     const estadoCOL = ot[4]
    //     if(estadoCOL !== 'Anulada'){
    //        resultBoton =  [...resultBoton, [ot[1], true]]
    //     }else{
    //         resultBoton =  [...resultBoton, [ot[1], ot[4]]]
    //     }
    //   })
      
    //   const areAllSameType = resultBoton.every((item:any) => item[1] === true);
  
    //   if(!areAllSameType){
    //     resultBoton.map((ot:any)=>{
    //         if(typeof ot[1] === 'string'){
    //           toast.error(`Error: folio ${ot[0]}  | ${ot[1]}`);
    //         }
    //       } 
    //     ) 
    //   }else{  
    //       const toastLoading = toast.loading('Cargando...');
    //     try {
    //       const query = {
    //         _proyecto   :    pkToDelete[0]["proyecto_codigo"],
    //         _pkToDelete :   JSON.stringify(resultBoton.map((folioOT:any)=>({folio: folioOT[0]}))),
    //         _id         :   2,
    //         _usuario    :   userState["id"]
    //       }
    
    //       const strUrl      = `${URLBackend}/api/proyectodocum/listado`
    //       const queryURL    = `?query=06&_p2=${query["_proyecto"]}&_id=${query["_id"]}&_pkToDelete=${query["_pkToDelete"]}&_p4=${query["_usuario"]}`
    //       const result      = await axios(`${strUrl}/${queryURL}`,{
    //         headers:  {
    //           'Authorization': User.token, 
    //         }
    //       });
    //       console.log(result)        
    //       if(result.status === 200){
    //         const successMessage = `Reporte firma generado: ${result.data[0][0]}`

    //         dispatch(fetchOT({searchParams: `_proyecto=${query["_proyecto"]}`}))
    //         setSelectedRows([])
    //         toast.dismiss(toastLoading)
    //         toast.success(successMessage)
    //     }
    //     } catch (error) {
    //       toast.dismiss(toastLoading)
    //       console.log(error)
    //       throw error;
    //     }
    //   }
    // }



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

        setIsFOTValidarBodega(true)
      } catch (error:any) {
        console.log(error)
        toast.error(error)
        setIsFOTValidarBodega(false)
      }


    }


    console.log(valueConfirmOT)
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
       
       {/* <Suspense> */}
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
       {/* </Suspense> */}

        {areaPermissions && areaPermissions[4] === "1" && permisos_usuario_areas === '1' && (
          <ImportToCsv
           strEntidad={strEntidad}
          //  params={params}
          //  strBaseUrl={strBaseUrl}
        />
        )}


        {areaPermissions && areaPermissions[2] === '1' && permisos_usuario_areas === '1' && (
          renderButton(
            <PiPrinterFill className="primaryBtnIcon" />,
            handleImpresionMasivo!,
            BUTTON_MESSAGES.imprimir
          )
        )}

        {areaPermissions && areaPermissions[5] === '1' && permisos_usuario_areas === '1' && (
          renderButton(
            <ImWhatsapp className="primaryBtnIcon" />,
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
        {areaPermissions && areaPermissions[6] === '1' && permisos_usuario_areas === '1' && (
          <Tooltip content={BUTTON_MESSAGES.procesar}>
              {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}
              <Button color="green" className='otActionButton'
              onClick={handleProcesarMasivo}>Procesar</Button>
          </Tooltip>
        )}

        {areaPermissions && areaPermissions[12] === "1" && permisos_usuario_areas === '1' && (
          <Tooltip content='Generar Número de Envío'>
              <Button className='otActionButton ml-4'  onClick={()=>setIsFOTEmpaque((prev)=>!prev)}>N° de Envio</Button>
          </Tooltip>
          )}


        {areaPermissions && areaPermissions[14] === '1' && permisos_usuario_areas === '1' && (
          <Tooltip content={'Generar Reporte de Firmas'}>
            <Button className='otActionButton mt-3 mx-5'onClick={() => setIsFOTReporeFirma((prev)=>!prev)}>N° Rep. Firma</Button>  
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


        {isFotTicketRetiro && (
          <Suspense>
            <div className="hidden">
              <FOTTicketImpresion ref={SecondcomponentRef}/>
            </div>
          </Suspense>
        )}  


        {isFOTImpresa && (
          <Suspense>
            <div className="hidden">
              <FOTImpresa ref={componentRef} masivo={true} />
            </div>
          </Suspense>
        )}


        {isFOTValidarBodega && (
          <Suspense>
            <FOTValidarBodega handleClose={()=>setIsFOTValidarBodega(false)}/>
          </Suspense>
        )}


        {/* {areaPermissions && areaPermissions[0] === "1" && escritura_lectura && (
        )} */}

          <div className='ml-2'>
            <Input type="text" label='Seleccionar OT' name='searchOT' className='text-xl' color='orange' ref={searchOTRef} onBlur={(e:any)=>handleChecked(e.target.value)} value={valueSearchOT} onChange={(e:any)=>setValueSearchOT(e.target.value)} />
          </div>

          {areaPermissions && areaPermissions[15] === '1' && permisos_usuario_areas === '1' && (
          <div className="ml-2">
          
            <Input ref={refFocusInput} type="text" label='Validar OT' name='ProcesarOT' className='text-xl' color='orange'  value={valueConfirmOT} onChange={(e:any)=>{
              handleProcesarConfirm(e.target.value),
              setValueConfirmOT(e.target.value)
              }} />
         
          </div>
          )}

          

        {isShowErrorOTModal && (
          <ErrorOTModal onClose={()=>setIsShowErrorOTModal(false)} data={dataOT && dataOT} valueConfirmOT={valueSearchOT}/>
        )}


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