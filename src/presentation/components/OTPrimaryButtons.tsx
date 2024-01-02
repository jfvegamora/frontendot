import { IconButton, Tooltip } from '@material-tailwind/react';
import React, { useCallback } from 'react';

import { SiAddthis } from 'react-icons/si';
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
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
            className="primaryBtnIconButton !mx-4"
            onClick={handle}
            // disabled={!escritura_lectura}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      []
    );

   
    
    const handleImpresionMasivo = () => {
      console.log('click')
    }
    const handleWhatsappMasivo = () => {
      console.log('click')
    }

    const handleProcesarMasivo = () => {
      console.log('click')
    }

    console.log(areaPermissions && areaPermissions[4])
    console.log(areaPermissions)

    return (
    <div className='flex items-center   ml-[4rem] !w-[40rem]'>
        {areaPermissions && areaPermissions[0] === "1" && escritura_lectura && (
          renderButton(
            <SiAddthis className="primaryBtnIcon mr-4" />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
          )
        )
        }
        {areaPermissions && areaPermissions[4] === "1" && (
          <div className="mr-2">
            <ExportCSV
             strEntidad={strEntidad}
             params={params}
             strBaseUrl={strBaseUrl}
          />
          </div>
        )}
        {areaPermissions && areaPermissions[3] === "1" && escritura_lectura && (
          <ImportToCsv
           strEntidad={strEntidad}
          //  params={params}
          //  strBaseUrl={strBaseUrl}
        />
        )}

        {areaPermissions && areaPermissions[2] === '1' && escritura_lectura && (
          renderButton(
            <PiPrinterFill className="primaryBtnIcon" />,
            handleImpresionMasivo!,
            BUTTON_MESSAGES.imprimir
          )
        )}

        {areaPermissions && areaPermissions[5] === '1' && escritura_lectura && (
          renderButton(
            <ImWhatsapp className="primaryBtnIcon" />,
            handleWhatsappMasivo!,
            BUTTON_MESSAGES.Whatsapp
          )
        )}
        {areaPermissions && areaPermissions[6] === '1' && escritura_lectura && (
          <Tooltip content={BUTTON_MESSAGES.procesar}>
              <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white ' onClick={handleProcesarMasivo}>Procesar</button>
          </Tooltip>
        )}


    </div>
)}

export default OTPrimaryButtons;