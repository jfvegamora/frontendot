import { IconButton, Tooltip } from '@material-tailwind/react';
import React, { useCallback } from 'react';

import { SiAddthis } from 'react-icons/si';
import { BUTTON_MESSAGES } from '../utils';
import { ExportCSV } from './ExportToCsv';
import { usePermission } from '../hooks';
import ImportToCsv from './ImportToCsv';

type AreaButtonsProps ={
    areaName:string;
    areaPermissions:string;
    params:any;
    areaActual:string;
    handleAddPerson?: () => void;
  }

const strEntidad = "Ordenen de Trabajo";
const strBaseUrl = "/api/ot/";


const OTPrimaryButtons:React.FC<AreaButtonsProps> = ({
    // areaName,
    areaPermissions,
    // areaActual,
    handleAddPerson,
    params
}) => {
    const {escritura_lectura} = usePermission(28);

    console.log(escritura_lectura)
    console.log(areaPermissions)


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
        {areaPermissions && areaPermissions[0] === "1" && escritura_lectura && (
          renderButton(
            <SiAddthis className="primaryBtnIcon" />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
          )
        )
        }
        {areaPermissions && areaPermissions[4] === "1" && escritura_lectura && (
          <ExportCSV
           strEntidad={strEntidad}
           params={params}
           strBaseUrl={strBaseUrl}
        />
        )}
        {areaPermissions && areaPermissions[3] === "1" && escritura_lectura && (
          <ImportToCsv
           strEntidad={strEntidad}
          //  params={params}
          //  strBaseUrl={strBaseUrl}
        />
        )}
    </div>
)}

export default OTPrimaryButtons;