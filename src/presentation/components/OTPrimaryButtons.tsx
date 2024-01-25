import { IconButton, Tooltip, Button } from '@material-tailwind/react';
import React, { useCallback, useRef } from 'react';

import { SiAddthis } from 'react-icons/si';
import { PiPrinterFill } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { BUTTON_MESSAGES, updateOT } from '../utils';
import { ExportCSV } from './ExportToCsv';
import { usePermission } from '../hooks';
import ImportToCsv from './ImportToCsv';
import { AppStore, useAppDispatch, useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { fetchOT} from '../../redux/slices/OTSlice';
// import { URLBackend } from '../hooks/useCrud';
// import { useReactToPrint } from 'react-to-print';
import FOTImpresa from '../views/forms/FOTImpresa';

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
    // const strUrl = `${URLBackend}/api/ot/listado`
    const {escritura_lectura} = usePermission(28);
    const dispatch = useAppDispatch();
    const data:any = useAppSelector((store: AppStore) => store.OTS.data)
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas)
    const User:any = useAppSelector((store: AppStore) => store.user)
    const componentRef          = useRef();
    


    const folios = pkToDelete && pkToDelete.map(({folio}:any)=>folio)

    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current as any, 
     
    // });

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
          return [OT[1], OT[4]]
        }
        return true
      })
    };

   
    
    const handleImpresionMasivo = () => {
      console.log('click')
      console.log(pkToDelete)
    
      console.log(folios)
      const result = validationStateOT(5, '0', folios)
      const areAllSameType = result.every((item:any) => item === true);

      console.log(result)

      
      if(!areAllSameType){
        result.map((ot:any)=>{
          if(Array.isArray(ot)){
            toast.error(`Error: folio ${ot[0]}  | ya impresa`);
            return;
          }
        })
        return;
      }

      
      // pkToDelete.map(async(ot:any)=>{
      //   console.log(ot)
      //   try {
      //     const query = `?query=06&_folio=${ot.folio}&_p2=${1}&_estado=${ot.estado_id}&_usuario=${User.id}&_origen=${OTAreas["areaActual"]}`
      //     const result = await axios(`${strUrl}/${query}`);

      //     console.log(result)
      //     if(result.status === 200){
      //       //handle print
      //       console.log('render')
      //       const loadingToast = toast.loading('Cargando...');

      //       // Realiza la operación asíncrona
      //       await new Promise((_resolve) => {
      //         dispatch(fetchOTByID({ folio: ot["folio"], OTAreas: OTAreas['areaActual'] }))
      //           .then(() => {
      //             // Resuelve la promesa cuando la operación está completa
      //           //   setTimeout(()=>{
      //           // },2000)
      //           handlePrint()
      //           })
      //           .catch((error) => {
      //             // Manejo de errores
      //             console.error(error);
      //             // Rechaza la promesa en caso de error
      //             throw error;
      //           })
      //           .finally(() => {
      //             // Oculta el toast de carga cuando la operación está completa
      //             toast.dismiss(loadingToast);
      //           });
      //       });
      //       // handlePrint()
      //       toast.success(`OT Impresa: ${ot.folio}`)
      //     }
          
      //   } catch (error) {
      //     console.log(error)
      //     throw error;
      //   }

      // })
      
    }



    const handleWhatsappMasivo = () => {
      console.log('click')
    }



    const handleProcesarMasivo = () => {
     
      const result = validationStateOT(4, 'En proceso', folios)
      const areAllSameType = result.every((item:any) => item === true);
      console.log(result)
      
      if(!areAllSameType){
        result.map((ot:any)=>{
          if(Array.isArray(ot)){
            toast.error(`Error: folio ${ot[0]}  | ${ot[1]}`);
            return;
          }
        })
        return;
      }
      
      pkToDelete.map((ot:any)=>{
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
         {areaPermissions && areaPermissions[0] === "1" && escritura_lectura && (
          <Tooltip content={BUTTON_MESSAGES.procesar} >
            <Button color="green" className='otActionButton mx-4' onClick={()=>{}}>Descargar Macro Excel</Button>
          </Tooltip>
        )
        }
        <div className='hidden'>
                <FOTImpresa ref={componentRef} />
        </div>

    </div>
)}

export default OTPrimaryButtons;