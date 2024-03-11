import React, {Suspense, useRef} from 'react';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { PencilIcon } from "@heroicons/react/24/solid";
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { usePermission } from '../hooks';
import { BUTTON_MESSAGES, isToggleImpression } from '../utils';

import { useReactToPrint } from 'react-to-print';
import FOTImpresa from '../views/forms/FOTImpresa';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { clearImpression, fetchOT, fetchOTImpresionByID } from '../../redux/slices/OTSlice';
// import FOTImpresa from '../views/forms/FOTImpresa';
import { toast } from 'react-toastify';
import FOTTicketImpresion from '../views/forms/FOTTicketImpresion';
import { URLBackend } from '../hooks/useCrud';
import axios from 'axios';
import { EnumGrid } from '../views/mantenedores/MOTHistorica';
// import { validationStateOT } from './OTPrimaryButtons';
import FOTTicketQRImpresion from '../views/forms/FOTTicketQRImpresion';
import { paramsOT } from '../views/mantenedores/MOT';



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
// const FOTImpresa = React.lazy(()=>import('../views/forms/FOTImpresa'));
export  const setEstadoImpresion = async(folio:any,_estado:any, userID:any, _origen:any) => {
    try {
        const query = `?query=06&_folio=${folio}&_p2=${1}&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`
        const result = await axios(`${strUrl}/${query}`);
        console.log(result)
        if(result.status === 200){
            // console.log(result)
            result.data[0][0]  === 1 ? isToggleImpression.value = true : isToggleImpression.value = false;
            toast.success('Estado cambiado')
        }
    } catch (error) {
        // console.log(error)
        throw error
    }
}

const OTGrillaButtons:React.FC<AreaButtonsProps> = ({ areaPermissions, toggleEditOTModal,folio, historica,estado }) => {
    const dispatch:any                   = useAppDispatch();
    const componentRef                   = useRef<any>(null);
    const SecondcomponentRef             = useRef<any>(null);
    const QRComponentRef                 = useRef<any>(null);
    const { escritura_lectura }          = usePermission(28);
    const OTAreas:any                    = useAppSelector((store: AppStore) => store.OTAreas);
    const OTdata:any                     = useAppSelector((store: AppStore) => store.OTS.data)
    const user:any                       = useAppSelector((store: AppStore) => store.user)
    
    const OT                 = OTdata.filter((ot:any)=>ot[1] === folio)[0]
    const QR                 = 30
    const TICKET             = 31



 

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    suppressErrors: true,
    removeAfterPrint: true,
    onAfterPrint() {
        if(OT[QR] === 0 && OT[TICKET] === 0){
            dispatch(clearImpression())
            return;
        }

        if(OT[TICKET] === 1){
            imprimirComprobanteRetiro('TICKETRETIRO')
        }
        return;
    },

});




const handleComprobantePrint = useReactToPrint({
    content: () => SecondcomponentRef.current,
    suppressErrors: true,
    removeAfterPrint: true,
    onAfterPrint(){
        if(OT[QR] === 1){
            imprimirComprobanteRetiro('QR')
            return;
        }else{
            dispatch(clearImpression())
            return;
        }
    }
})


const handleQRPrint = useReactToPrint({
    content: () => QRComponentRef.current,
    removeAfterPrint: true,
    onAfterPrint(){
        dispatch(clearImpression())
        setEstadoImpresion(folio,estado, user.id, OTAreas["areaActual"]).then(()=>{
            dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
        })
        return;
    }

})



const imprimirComprobanteRetiro = async(tipoComprobante?:string) => {
        const loadingToast = toast.loading('Imprimiendo Comprobante Retiro...');

        try {
            const {data} = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas}&_folio=${folio}`);
            if(data[0] && data[0][EnumGrid.imprime_ticket]){
                // console.log('imprmiendo')
                await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }));
                tipoComprobante === 'QR' ? handleQRPrint() : handleComprobantePrint()
    
            }
            toast.dismiss(loadingToast);
        } catch (error) {
            toast.dismiss(loadingToast);
            throw error
        }


    }
    
    const handleImpresion = async (folio: any) => {
        // dispatch(clearImpression());        
        const OT                 = OTdata.filter((ot:any)=>ot[1] === folio)[0]
        const estado_impresion   = 5

        if(OT[estado_impresion] === '1'){
            return toast.error(`OT: ${folio} ya fue Impresa anteriormente`)
        }

        
        const loadingToast = toast.loading('Imprimiendo...');
        try {
          await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }));
            
          handlePrint();    
          toast.dismiss(loadingToast);
        } catch (error) {
            console.error(error);
            toast.dismiss(loadingToast);
            // dispatch(clearImpression());
            console.log(error);
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
            {areaPermissions && areaPermissions[2] === "1" && escritura_lectura && (
                <Tooltip content={BUTTON_MESSAGES.edit.concat(strEntidad)}>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={()=>handleImpresion(folio)}
                    >
                        <PiPrinterFill className="gridIcons" />
                        
                    </IconButton>
                </Tooltip>
            )}
            {areaPermissions && areaPermissions[5] === "1" && escritura_lectura && (
                <Tooltip content={BUTTON_MESSAGES.edit.concat(strEntidad)}>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                    >
                        <ImWhatsapp className="gridIcons" />
                    </IconButton>
                </Tooltip>
            )}
            <Suspense>
                <div className='hidden'>
                    <FOTImpresa ref={componentRef}/>
                    <FOTTicketImpresion ref={SecondcomponentRef}/>
                    <FOTTicketQRImpresion ref={QRComponentRef}/>
                </div>

            </Suspense>

        </div>



    );
};

export default OTGrillaButtons;
