import React from 'react';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { PencilIcon } from "@heroicons/react/24/solid";
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { usePermission } from '../hooks';
import { BUTTON_MESSAGES } from '../utils';

type AreaButtonsProps ={
    areaPermissions:string;
    id:number
    toggleEditModal?: (id: number) => void;
}

const strEntidad = "Orden de Trabajo";

const OTGrillaButtons:React.FC<AreaButtonsProps> = React.memo(({ areaPermissions, id, toggleEditModal }) => {
    const { escritura_lectura } = usePermission(28);
    console.log(id)
    return (
        <div className='flex items-center'>
            {toggleEditModal && (
                <Tooltip content={BUTTON_MESSAGES.edit.concat(strEntidad)}>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => toggleEditModal(id)}
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
        </div>
    );
});

export default OTGrillaButtons;
