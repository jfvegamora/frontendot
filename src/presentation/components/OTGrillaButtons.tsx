import { IconButton, Tooltip } from '@material-tailwind/react';
import React, { useCallback } from 'react';
import { BUTTON_MESSAGES } from '../utils';
import { ExportCSV } from './ExportToCsv';
import { usePermission } from '../hooks';
import ImportToCsv from './ImportToCsv';
import { PencilIcon } from "@heroicons/react/24/solid";
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";


type AreaButtonsProps ={
    areaPermissions:string;
    params?:any;
    areaActual?:string;
    id:number
    toggleEditModal?: (id: number) => void;

  }

const strEntidad = "Ordenen de Trabajo";
const strBaseUrl = "/api/ot/";



const OTGrillaButtons:React.FC<AreaButtonsProps> = ({
    areaPermissions,
    areaActual,
    params,
    id,
    toggleEditModal
}) => {
    const {escritura_lectura, lectura} = usePermission(28);

    console.log(lectura)
    console.log(areaPermissions)
    console.log(id)

    const renderButton = useCallback(
      (icon: React.ReactNode, handle: () => void, tooltip: string) => (
        <Tooltip content={tooltip}>
          <IconButton
            variant="text"
            color="blue-gray"
            className="primaryBtnIconButton"
            onClick={handle}
            // disabled={!escritura_lectura}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      []
    );


    return (
    <div className='flex items-center'>
        

        {(
           <Tooltip content={BUTTON_MESSAGES.edit.concat(strEntidad)}>
            <IconButton
                variant="text"
                color="blue-gray"
                onClick={() =>{
                    toggleEditModal && toggleEditModal(id)
                    //mandar true/false   al estado padre mot
                }}
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
                // onClick={() =>toggleEditModal && toggleEditModal(id)}
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
                // onClick={() =>toggleEditModal && toggleEditModal(id)}
            >
                <ImWhatsapp className="gridIcons" />
            </IconButton>
         </Tooltip>
        )}
    </div>
)}

export default OTGrillaButtons;