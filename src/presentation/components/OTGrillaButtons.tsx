import React, {useRef} from 'react';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { PencilIcon } from "@heroicons/react/24/solid";
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { usePermission } from '../hooks';
import { BUTTON_MESSAGES } from '../utils';

import { useReactToPrint } from 'react-to-print';
// import FOTImpresa from '../views/forms/FOTImpresa';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { clearImpression, fetchOTImpresionByID } from '../../redux/slices/OTSlice';
import FOTImpresa from '../views/forms/FOTImpresa';
import { toast } from 'react-toastify';



type AreaButtonsProps ={
    areaPermissions:string;
    id:number
    toggleEditOTModal?:any
    folio?:number;
    entidad?:string;
    historica?:boolean
}

const strEntidad = "Orden de Trabajo";

const OTGrillaButtons:React.FC<AreaButtonsProps> = ({ areaPermissions, toggleEditOTModal,folio,entidad, historica }) => {
    const dispatch:any                       = useAppDispatch();
    const componentRef                   = useRef();
    const { escritura_lectura }          = usePermission(28);
    const OTAreas:any                    = useAppSelector((store: AppStore) => store.OTAreas);



  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any, 
    suppressErrors: true,
    removeAfterPrint: true,
    onAfterPrint() {
        dispatch(clearImpression())
    },
});





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
    const handleImpresion = async (folio: any) => {
        // dispatch(clearImpression());
        console.log('click');
        console.log(folio);
        const loadingToast = toast.loading('Cargando...');
        try {
      
          // Llama a fetchOTImpresionByID y espera a que se complete
          await dispatch(fetchOTImpresionByID({ folio: folio, OTAreas: OTAreas['areaActual'] }));
      
          toast.dismiss(loadingToast);
          
          
        
          // Después de que fetchOTImpresionByID se haya completado, muestra el modal
          
          // Después de mostrar el modal, llama a handlePrint
          handlePrint();
        } catch (error) {
            console.error(error);
            toast.dismiss(loadingToast);
            // dispatch(clearImpression());
            console.log(error);
            throw error;
        }
      };
    

      console.log( (areaPermissions && areaPermissions[1] === '1'))
      console.log(historica)

      console.log( historica || (areaPermissions && areaPermissions[1] === '1')  )
 
 

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
                                toggleEditOTModal(folio, historica).finally(()=>{
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
            <div className='hidden'>
                <FOTImpresa ref={componentRef}/>
            </div>

        </div>



    );
};

export default OTGrillaButtons;
