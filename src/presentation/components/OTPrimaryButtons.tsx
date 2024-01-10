import { IconButton, Tooltip, Button } from '@material-tailwind/react';
import React, { useCallback } from 'react';

import { SiAddthis } from 'react-icons/si';
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { BUTTON_MESSAGES, updateOT } from '../utils';
import { ExportCSV } from './ExportToCsv';
import { usePermission } from '../hooks';
import ImportToCsv from './ImportToCsv';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { fetchOT } from '../../redux/slices/OTSlice';

type AreaButtonsProps ={
    areaName:string;
    areaPermissions:string;
    params:any;
    areaActual:string;
    handleAddPerson?: () => void;
    pkToDelete?: any
  }

const strEntidad = "Ordenen de Trabajo";
const strBaseUrl = "/api/ot/";


const OTPrimaryButtons:React.FC<AreaButtonsProps> = ({
    // areaName,
    areaPermissions,
    // areaActual,
    handleAddPerson,
    params,
    pkToDelete
}) => {
    const {escritura_lectura} = usePermission(28);
    const dispatch = useAppDispatch();
    const data:any = useAppSelector((store: AppStore) => store.OTS.data)
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas)
    const User:any = useAppSelector((store: AppStore) => store.user)





    const renderButton = useCallback(
      (icon: React.ReactNode, handle: () => void, tooltip: string) => (
        <Tooltip content={tooltip}>
          <IconButton
            variant="text"
            color="blue-gray"
            className="primaryBtnIconButton "
            onClick={handle}
            // disabled={!escritura_lectura}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      []
    );

      
    const validationStateOT = (positionCampo:number, nameCampo:string, folios:any) => {
      const resultadoFiltrado = data && data.filter((elemento:any) => folios.includes(elemento[1]));


      return resultadoFiltrado.map((OT:any)=>{
        const estado = OT[positionCampo]
        if(estado !== nameCampo){
          return OT[1]
        }
        return true
      })
    };

   
    
    const handleImpresionMasivo = () => {
      console.log('click')
    }
    const handleWhatsappMasivo = () => {
      console.log('click')
    }

    const handleProcesarMasivo = () => {
      const folios = pkToDelete && pkToDelete.map(({folio}:any)=>folio)
      const result = validationStateOT(3, 'En proceso', folios)
      console.log(result)
      
      if(Array.isArray(result)){
        toast.error(`Error en OT folio: ${result.filter((folio)=>typeof folio === 'number')}`)
      }

      //TODO: SI TYPEOF RESULT ES BOOLEAN EJECUTAR UPDATEOT, SI TYPEOF RERSULT ES NUMBER EJECUTAR TOAST.ERROR

      let error = [];

      // console.log(pkToDelete)
      const procesarMasivo = pkToDelete.map((ot:any)=>{
        // console.log(ot)
        updateOT(
          [],
          OTAreas["areaActual"],
          OTAreas["areaSiguiente"],
          20,
          [],
          ot,
          [],
          [],
          User["id"],
          "",
          true
        ).then(()=>{
          dispatch(fetchOT({OTAreas:OTAreas["areaActual"]}))
        })
      })



    }

    // console.log(areaPermissions && areaPermissions[4])
    // console.log(areaPermissions)

    return (
    <div className='flex items-center   ml-[4rem] !w-[50rem]'>
        {areaPermissions && areaPermissions[0] === "1" && escritura_lectura && (
          renderButton(
            <SiAddthis className="primaryBtnIcon " />,
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
              {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}
              <Button color="green" className='otActionButton'
              onClick={handleProcesarMasivo}>Procesar</Button>
          </Tooltip>
        )}


    </div>
)}

export default OTPrimaryButtons;