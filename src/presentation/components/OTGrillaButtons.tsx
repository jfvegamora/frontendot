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


type AreaButtonsProps ={
    areaPermissions:string;
    id:number
    toggleEditOTModal?: (folio: any, historica:any) => void;
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
            
            dispatch(fetchOTByID({ folio: folio, OTAreas: OTAreas["areaActual"] }))
            handlePrint()
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
                        onClick={() => toggleEditOTModal(folio, historica)  }
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
                {/* <FOTImpresa ref={componentRef} /> */}
            </div>
        </div>
    );
});

export default OTGrillaButtons;
