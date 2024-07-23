import React, {Suspense, useRef} from 'react';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { PencilIcon } from "@heroicons/react/24/solid";
// import { PiPrinterFill } from "react-icons/pi";

import { ImWhatsapp } from "react-icons/im";
// import { usePermission } from '../hooks';
import { BUTTON_MESSAGES, clearAllCheck, clearIndividualCheck, disabledIndividualCheck, isToggleImpression, } from '../utils';

import { useReactToPrint } from 'react-to-print';
// import FOTImpresa from '../views/forms/FOTImpresa';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { clearImpression, fetchOT, fetchOTImpresionByID } from '../../redux/slices/OTSlice';
// import FOTImpresa from '../views/forms/FOTImpresa';
import { toast } from 'react-toastify';
// import FOTTicketImpresion from '../views/forms/FOTTicketImpresion';
import { URLBackend } from '../hooks/useCrud';
import axios from 'axios';
import { EnumGrid } from '../views/mantenedores/MOTHistorica';
// import { validationStateOT } from './OTPrimaryButtons';
// import FOTTicketQRImpresion from '../views/forms/FOTTicketQRImpresion';
// import { paramsOT } from '../views/mantenedores/MOT';
import { EnumAreas } from './OTPrimaryButtons';
import { paramsOT } from '../views/mantenedores/MOT';
import { signal } from '@preact/signals-react';
import { PiPrinterFill } from 'react-icons/pi';
// import ReactDOM from 'react-dom';



type AreaButtonsProps ={
    areaPermissions:string;
    id:number
    toggleEditOTModal?:any
    folio?:number;
    entidad?:string;
    historica?:boolean;
    estado?:number
}

const strEntidad = "Orden de Trabajo";
const strUrl = `${URLBackend}/api/ot/listado`
const folioActual = signal<any>(0);
const isFinishImpression = signal(false)

// const PiPrinterFill          = React.lazy(()=>import('react-icons/pi') as any)
const FOTImpresa             = React.lazy(()=>import('../views/forms/FOTImpresa'));
const FOTTicketQRImpresion   = React.lazy(()=>import('../views/forms/FOTTicketQRImpresion'));
const FOTTicketImpresion     = React.lazy(()=>import('../views/forms/FOTTicketImpresion'));


export  const setEstadoImpresion = async(pkToDelete?:any, origen?:any, masivo?:boolean, usuario?:any) => {
    const loadingToast = toast.loading('Cargando...');
    let estado_impresion = 1;
    try {
        console.log(pkToDelete)
        const data_JSON = pkToDelete.map((ot:any)=>{
            return {folio: `${ot.folio}`}
        })

        const query = `?query=06&_dataJSON=${encodeURIComponent(JSON.stringify(data_JSON))}&_p2=${estado_impresion}&_usuario=${usuario.id}&_origen=${origen}`
        
        const result = await axios(`${strUrl}/${query}`,{
            headers: {
               'Authorization': usuario.token, 
             }
       });
       toast.dismiss(loadingToast);
    console.log(result)
        
        if(masivo){
            clearAllCheck.value = false;
            clearIndividualCheck.value = true;
            console.log(masivo)
            return ;
        }

        if(result.status === 200 && !masivo){
            // toast.dismiss(loadingToast);
            disabledIndividualCheck.value = false;
            result.data[0][0]  === 1 ? isToggleImpression.value = true : isToggleImpression.value = false;
            // toast.success('Estado Impresión Cambiado.', {
            //     autoClose: 900
            // })
        }
    } catch (error) {
        if(masivo) return;
        // toast.dismiss(loadingToast)
        toast.error('Error Estado Impresión OT.')
        throw error
    }
}

const OTGrillaButtons:React.FC<AreaButtonsProps> = ({ areaPermissions, toggleEditOTModal,folio, historica,estado }) => {
    const dispatch:any                   = useAppDispatch();
    const componentRef                   = useRef<any>(null);
    const SecondcomponentRef             = useRef<any>(null);
    const QRComponentRef                 = useRef<any>(null);
    // const { escritura_lectura }          = usePermission(28);
    const OTAreas:any                    = useAppSelector((store: AppStore) => store.OTAreas);
    const OTdata:any                     = useAppSelector((store: AppStore) => store.OTS.data);
    const user:any                       = useAppSelector((store: AppStore) => store.user);


    const permisos_usuario_areas = user.permisos_areas[EnumAreas[OTAreas["areaActual"]] || 40]


    const [isFotImpresa, setIsFotImpresa]      = React.useState(false);
    const [isFotTicketQR, setisFotTicketQR]     = React.useState(false);
    const [isFotTicketRetiro, setisFotTicketRetiro]    = React.useState(false);
    
    
    const OT                 = OTdata.filter((ot:any)=>ot[1] === folio)[0]
    const QR                 = 30

const resetImpresionStates = () => {
    setIsFotImpresa(false)
    setisFotTicketQR(false)
    setisFotTicketRetiro(false)
}

 

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    suppressErrors: true,
    removeAfterPrint: true,
    onAfterPrint() {  
        isFinishImpression.value = true;
        dispatch(clearImpression())
    },
    
});

React.useEffect(()=>{
    if(isFinishImpression.value === true){
        const toastloading = toast.loading('Cargando....')
          try {
              isFinishImpression.value = false;
                console.log('render')
                const pktoDelete = [{
                    folio: folioActual.value,
                    estado_id: 1,
                }]

                setEstadoImpresion(pktoDelete, OTAreas["areaActual"],false, user).then(()=>{
                clearIndividualCheck.value = true;
                dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))
                console.log('render')
                clearAllCheck.value = false;
                folioActual.value = false;
                toast.dismiss(toastloading)
              })            
            } catch (error) {
              console.log(error)
              toast.dismiss(toastloading)
              isFinishImpression.value = false;
            }
         
    }
  },[isFinishImpression.value])



const handleComprobantePrint = useReactToPrint({
    content: () => SecondcomponentRef.current,
    suppressErrors: true,
    removeAfterPrint: true,
    onAfterPrint(){
        if(OT[QR] === 1){
            setisFotTicketQR(true)
            imprimirComprobanteRetiro('QR')
            return;
        }else{
            resetImpresionStates()
            dispatch(clearImpression())
            return;
        }
    }
})


const handleQRPrint = useReactToPrint({
    content: () => QRComponentRef.current,
    removeAfterPrint: true,
    onAfterPrint(){
        resetImpresionStates()
        dispatch(clearImpression())
        // setEstadoImpresion(folio,estado, user, OTAreas["areaActual"]).then(()=>{
        //     dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
        // })
        return;
    }

})



const imprimirComprobanteRetiro = async(tipoComprobante?:string) => {
    
        const loadingToast = toast.loading(`Imprimiendo ${tipoComprobante === 'QR' ? 'Código QR' : 'Ticket de retiro' }...`);

        try {
            const {data} = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas}&_p1=${folio}`,{
                headers: {
                   'Authorization': user.token, 
                 }
           });
            if(data[0] && data[0][EnumGrid.imprime_ticket]){
                // console.log('imprmiendo')
                await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }));
                tipoComprobante === 'QR' ? (
                    setisFotTicketQR(true),
                    handleQRPrint()
                ) : (
                    setisFotTicketRetiro(true),
                    handleComprobantePrint()
                )
    
            }
            toast.dismiss(loadingToast);
        } catch (error) {
            toast.dismiss(loadingToast);
            throw error
        }


    }
    
    const handleImpresion = async (folio: any) => {
        setIsFotImpresa(true)
        disabledIndividualCheck.value = true;        
        // const OT                 = OTdata.filter((ot:any)=>ot[1] === folio)[0]

        // if(OT[estado_impresion] === '1'){
        //     disabledIndividualCheck.value = false;
        //     return toast.error(`OT: ${folio} ya fue Impresa anteriormente`)
        // }

        // if(OT[OTGrillaEnum.usuario] !== user?.id){
        //     disabledIndividualCheck.value = false;  
        //     return toast.error(`OT ${folio} no pertenece al Usuario ${user.nombre}`);
        // }

        const loadingToast = toast.loading('Imprimiendo...');
        try {

        // const resultValidate = await validateSameUserImpresionOT(user.id, folio)
        
        // if(!resultValidate){
        //     disabledIndividualCheck.value = false;
        //     toast.dismiss(loadingToast)
        //     return toast.error(`Folio ${folio} no pertenece al Usuario ${user?.nombre}`);
        // }

        await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'], userID: user?.id})).then(()=>{            
               handlePrint();    
          });
          toast.dismiss(loadingToast);
          disabledIndividualCheck.value = false;
        } catch (error) {
            console.error(error);
            disabledIndividualCheck.value = false;
            toast.dismiss(loadingToast);
            throw error;
        }
      };
    

 

 return (
        <div className='flex items-center'>
            
            {/* { historica || (areaPermissions && areaPermissions[1] === '1')  && */}
            {/* { historica || */}
            { 
            //  (areaPermissions && areaPermissions[1] === '1')  
            //   &&
            (
                <Tooltip content={BUTTON_MESSAGES.edit.concat(strEntidad)}>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => {
                            const loadingToast = toast.loading('Cargando...');
                            new Promise((_resolve)=>{
                                toggleEditOTModal(folio, historica,estado).finally(()=>{
                                    toast.dismiss(loadingToast);
                                }) 
                            })
                        } }
                    >
                        <PencilIcon className="gridIcons" />
                    </IconButton>
                </Tooltip>
            )}
            {areaPermissions && areaPermissions[2] === "1" && permisos_usuario_areas !== '0' && (
                <Tooltip content={BUTTON_MESSAGES.imprimir.concat(strEntidad)}>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={()=>{
                            folioActual.value = folio;
                            handleImpresion(folio)
                        }}
                    >   
                        <Suspense>
                            <PiPrinterFill className='gridIcons' />
                        </Suspense>
                        
                    </IconButton>
                </Tooltip>
            )}
            {areaPermissions && areaPermissions[5] === "1" && permisos_usuario_areas === '1' && (
                <Tooltip content={BUTTON_MESSAGES.edit.concat(strEntidad)}>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                    >
                        <ImWhatsapp className="gridIcons" />
                    </IconButton>
                </Tooltip>
            )}
                {isFotImpresa && (
                     <Suspense>
                        <div className='hidden'>
                             <FOTImpresa ref={componentRef} masivo={true}/>
                        </div>
                    </Suspense>                
                )}

                {isFotTicketQR && (
                    <Suspense>
                        <div className='hidden'>
                        <FOTTicketQRImpresion ref={QRComponentRef}/>
                        </div>
                    </Suspense>
                )}

                {isFotTicketRetiro && (
                    <Suspense>
                        <div className='hidden'>
                        <FOTTicketImpresion ref={SecondcomponentRef}/>
                        </div>
                    </Suspense>
                )}
            
           

        </div>



    );
};

export default OTGrillaButtons;
