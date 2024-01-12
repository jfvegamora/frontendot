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
import { fetchOTByID } from '../../redux/slices/OTSlice';
import FOTImpresa from '../views/forms/FOTImpresa';
import { toast } from 'react-toastify';


type AreaButtonsProps ={
    areaPermissions:string;
    id:number
    toggleEditOTModal?:any
    folio?:number;
    entidad?:string
}

const strEntidad = "Orden de Trabajo";

const OTGrillaButtons:React.FC<AreaButtonsProps> = React.memo(({ areaPermissions, toggleEditOTModal,folio,entidad }) => {
    const { escritura_lectura } = usePermission(28);
    const dispatch              = useAppDispatch();
    const OTAreas:any           = useAppSelector((store: AppStore) => store.OTAreas);
    const componentRef          = useRef();


    let historica = false;
    entidad === "Orden de Trabajo Hisotrico" ? historica = true : historica = false;


  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  });

    const handleImpresion = async(folio:any) =>{
        console.log('click')
        console.log(folio)
        try {

            const loadingToast = toast.loading('Cargando...');

            // Realiza la operación asíncrona
            await new Promise((_resolve) => {
              dispatch(fetchOTByID({ folio: folio, OTAreas: OTAreas['areaActual'] }))
                .then(() => {
                  // Resuelve la promesa cuando la operación está completa
                //   setTimeout(()=>{
                // },2000)
                handlePrint()
                })
                .catch((error) => {
                  // Manejo de errores
                  console.error(error);
                  // Rechaza la promesa en caso de error
                  throw error;
                })
                .finally(() => {
                  // Oculta el toast de carga cuando la operación está completa
                  toast.dismiss(loadingToast);
                });
            });


            
        } catch (error) {
            
        }
    
    }



    return (
        <div className='flex items-center'>
            {toggleEditOTModal && (
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
                <FOTImpresa ref={componentRef} />
            </div>
        </div>
    );
});

export default OTGrillaButtons;
