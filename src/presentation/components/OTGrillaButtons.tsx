import React, {Suspense, useRef} from 'react';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { PencilIcon } from "@heroicons/react/24/solid";
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { usePermission } from '../hooks';
import { BUTTON_MESSAGES } from '../utils';

import { useReactToPrint } from 'react-to-print';
import FOTImpresa from '../views/forms/FOTImpresa';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { clearImpression, fetchOTImpresionByID } from '../../redux/slices/OTSlice';
// import FOTImpresa from '../views/forms/FOTImpresa';
import { toast } from 'react-toastify';
import FOTTicketImpresion from '../views/forms/FOTTicketImpresion';
import { URLBackend } from '../hooks/useCrud';
import axios from 'axios';
import { EnumGrid } from '../views/mantenedores/MOTHistorica';



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

// const FOTImpresa = React.lazy(()=>import('../views/forms/FOTImpresa'));


const OTGrillaButtons:React.FC<AreaButtonsProps> = ({ areaPermissions, toggleEditOTModal,folio, historica,estado }) => {
    const dispatch:any                   = useAppDispatch();
    const componentRef                   = useRef<any>(null);
    const SecondcomponentRef             = useRef<any>(null);
    const { escritura_lectura }          = usePermission(28);
    const OTAreas:any                    = useAppSelector((store: AppStore) => store.OTAreas);



  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    suppressErrors: true,
    removeAfterPrint: true,
    onAfterPrint() {
        
        imprimirComprobanteRetiro()
    },
});



const handleComprobantePrint = useReactToPrint({
    content: () => SecondcomponentRef.current,
    suppressErrors: true,
    removeAfterPrint: true,
    onAfterPrint(){
        dispatch(clearImpression())
    }
})


    // const handleImpresion = async(folio:any) =>{
    //     console.log('click')
    //     console.log(folio)
    //     const result = await showModal(
    //         'Agregar Comprobante Retiro?',
    //         'SI',
    //         'NO'
    //     );

    //     console.log(result)
    //     setisComRetiro(result)

    //     try {
    //        const loadingToast = toast.loading('Cargando...');                      
    //        await new Promise((_resolve) => {
    //           dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }))
    //             .then(() => {
    //                 handlePrint()

    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 throw error;
    //             })
    //             .finally(() => {
    //                 toast.dismiss(loadingToast);
    //                 dispatch(clearImpression())
    //             });
    //         });
            
    //     } catch (error) {
    //        console.log(error)
    //        throw error; 
    //     }
    
    // }

    const imprimirComprobanteRetiro = async() => {
        const loadingToast = toast.loading('Imprimiendo Comprobante Retiro...');

        try {
            const {data, status} = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas}&_folio=${folio}`);
            console.log(data[0] && data[0][EnumGrid.imprime_ticket])
            console.log(status)
            if(data[0] && data[0][EnumGrid.imprime_ticket]){
                console.log('imprmiendo')
                await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }));
                handleComprobantePrint()
    
            }
            toast.dismiss(loadingToast);
        } catch (error) {
            toast.dismiss(loadingToast);
            throw error
        }


    }
    
    const handleImpresion = async (folio: any) => {
        // dispatch(clearImpression());
        console.log('click');
        console.log(folio);
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
                </div>

            </Suspense>

        </div>



    );
};

export default OTGrillaButtons;
