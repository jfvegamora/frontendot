/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useCallback, useEffect, useState } from "react";
// import { AiOutlineForward, AiFillDelete } from "react-icons/ai";
import { IconButton, Tooltip } from "@material-tailwind/react";
// import { SiAddthis } from "react-icons/si";
// import { FiRefreshCw } from "react-icons/fi";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES, MODAL } from "../utils";
// import { ExportToCsv } from "./ExportToCsv";
import { useModal } from "../hooks/useModal";
// import { CgInsertAfterR, CgInsertBeforeR } from "react-icons/cg";
// import ImportToCsv from "./ImportToCsv";
import { AppStore, useAppSelector } from "../../redux/store";
import OTPrimaryButtons from "./OTPrimaryButtons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faClone, faTrash, faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ExportCustomCSV } from "./ExportCustomToCsv";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import axios from "axios";
import { URLBackend } from "../hooks/useCrud";
// import ExportToCsv from "./ExportToCsv";


interface IPrimaryButtonProps {
  handlePageSize?: () => void;
  handleDeleteSelected?: (pkToDelete: any, comilla?: any) => void;
  toggleEditModal?: () => void;
  escritura?: boolean;
  personsLength?: number;
  handleAddPerson?: () => void;
  handleCopiar?: any;
  handleRefresh?: () => void;
  handleAddTipe2?: () => void;
  handleTraspaso?: () => void;
  setSelectedRows?:any;
  customExporTooltip?:string;
  showForwardButton?: boolean;
  showAddButton?: boolean;
  showRefreshButton?: boolean;
  showDeleteButton?: boolean;
  showExportButton?: boolean;
  showCustomExportButton?:boolean;
  showMacroButton?:boolean;
  showTraspasoButton?:boolean;
  showImportCsv?:boolean;
  comilla?: boolean;
  strBaseUrl?: string;
  params?: never[];
  entities?:any;
  strEntidad?: string;
  pkToDelete?: any;
  idMenu: number;
  bln_egreso?: boolean;
  isOT?:boolean;
  showCopiar?: boolean;
}

const ExportToCsv   = React.lazy(()=>import('./ExportToCsv'))
const ImportToCsv   = React.lazy(()=>import('./ImportToCsv'))
 
const PrimaryButtonsComponent: React.FC<IPrimaryButtonProps> = React.memo(
  ({
    handleDeleteSelected,
    handleTraspaso,
    // handlePageSize,
    handleAddPerson,
    handleCopiar,
    // handleRefresh,
    toggleEditModal,
    // showForwardButton
    showCustomExportButton,
    customExporTooltip,
    showAddButton,
    showTraspasoButton,
    showDeleteButton,
    showImportCsv,
    showMacroButton,
    strBaseUrl,
    showExportButton,
    params,
    strEntidad,
    pkToDelete,
    comilla,
    idMenu,
    entities,
    bln_egreso,
    isOT,
    showCopiar,
    setSelectedRows
  }) => {
    const { escritura_lectura } = usePermission(idMenu);
    const { CustomModal, showModal } = useModal();
    const [OTPermissions, setOTPermissions] = useState("");

    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const User:any = useAppSelector((store: AppStore) => store.user);

    const areaActual = OTAreas["areaActual"]


    const handleDownloadMacro = async() => {
      try {
        const url = `${URLBackend}/api/downloadexcel/`;
        const formData = new FormData();
        formData.append('ENTIDAD', strEntidad as string); // Aquí agregas el valor del macro que deseas enviar
  
        const { data } = await axios({
          url,
          method: 'POST', // Cambiamos de GET a POST
          data: formData, // Enviamos el FormData que contiene el string 'macro'
          responseType: 'blob',
          headers: {
            'Authorization': User.token,
            'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido correctamente
          },
        });
  
        const blobUrl = window.URL.createObjectURL(new Blob([data]));
        // Crear un enlace invisible y hacer clic en él para iniciar la descarga
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', `${strEntidad}_import.xlsm`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        // console.log(error)
        throw error;
      }
    };
  

    // console.log(areaActual)
    // console.log(OTAreas.areas)

    const permissions = (area:number) => areaActual && OTAreas["areas"].find((permiso:any)=>permiso[1] === area)
  
    useEffect(()=>{
      // console.log('render')
      const permiso = areaActual && permissions(areaActual)
          // console.log(permiso)
      setOTPermissions(permiso && permiso[5])
    },[areaActual])

    const renderButton = useCallback(
      (icon: React.ReactNode, handle: () => void, tooltip: string) => (
        <Tooltip content={tooltip}>
          <IconButton
            variant="text"
            tabIndex={1}
            color="blue-gray"
            className="primaryBtnIconButton"
            onClick={handle}
            // disabled={!escritura_lectura}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      [escritura_lectura]
    );


    if(isOT){
      return (
        <OTPrimaryButtons 
          areaName={"name"} 
          areaPermissions={OTPermissions} 
          areaActual={areaActual}  
          handleAddPerson={handleAddPerson}
          params={params}
          pkToDelete={pkToDelete}
          entities={entities}
          setSelectedRows={setSelectedRows}
          
        />
      )
    }
      

    return (
      <div className="primaryBtnContainer">
        {/* {showForwardButton &&
          renderButton(
            <AiOutlineForward className="primaryBtnIcon" />,
            handlePageSize!,
            BUTTON_MESSAGES.next
          )} */}

        {bln_egreso === true ? (
          <>
            {showAddButton && escritura_lectura && (
              <>
                {renderButton(
                  <FontAwesomeIcon icon={faArrowRightToBracket} className="primaryBtnIcon"/>,
                  handleAddPerson!,
                  BUTTON_MESSAGES.bln_ingreso
                )}
                {renderButton(
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="primaryBtnIcon"/>,
                  toggleEditModal!,
                  BUTTON_MESSAGES.bln_egreso
                )}
              </>
            )}
          </>
        ) : (
          <>
          

            {showAddButton && escritura_lectura && (
              <>
                {renderButton(
                  <FontAwesomeIcon icon={faPlus} className="primaryBtnIcon"/>,
                  handleAddPerson!,
                  BUTTON_MESSAGES.add
                )}
              </>
            )}

        {showTraspasoButton && escritura_lectura && (
            renderButton(
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="primaryBtnIcon"/>,
              handleTraspaso!,
              BUTTON_MESSAGES.bln_egreso
            )
          )}
            {showCopiar && escritura_lectura && (
              <>
                {renderButton(
                  <FontAwesomeIcon icon={faClone} className="primaryBtnIcon"/>,
                  handleCopiar!,
                  BUTTON_MESSAGES.copiar
                )}
              </>
            )}
          </>
        )}

        {/* {showRefreshButton &&
          renderButton(
            <FontAwesomeIcon icon={faArrowsRotate} className="primaryBtnIcon" />,
            handleRefresh!,
            BUTTON_MESSAGES.refresh
          )} */}
        <Suspense>
          {showExportButton && (
            <ExportToCsv
              strEntidad={strEntidad}
              params={params}
              strBaseUrl={strBaseUrl}
            />
          )}
        </Suspense>

       

         
        {showCustomExportButton && (
          <ExportCustomCSV
            strEntidad={strEntidad}
            params={params}
            strBaseUrl={strBaseUrl}
            customExport={true}
            query={"queryExcel"}
            customExporTooltip={customExporTooltip}
          />
        )}


        
        <Suspense>
          {showImportCsv && escritura_lectura && (
            <ImportToCsv strEntidad={strEntidad}/>
          )}
        </Suspense>

        {showMacroButton && escritura_lectura && (
           <Tooltip content={'Descargar Plantilla Excel'} >
            <IconButton 
              className='primaryBtnIconButton'
              variant='text'
              color="blue-gray"
            >
              <PiMicrosoftExcelLogoFill className='primaryBtnIcon' onClick={()=>handleDownloadMacro()} />

            </IconButton>
            {/* <Button color="green" className='otActionButton mx-4' >Macro Excel</Button> */}
         </Tooltip>
        )}
        

        {showDeleteButton && escritura_lectura && handleDeleteSelected && (
          <>
            <Tooltip content="Eliminar">
              <IconButton
                variant="text"
                tabIndex={1}
                color="blue-gray"
                className="primaryBtnIconButton"
                disabled={!escritura_lectura}
                onClick={() => {
                  showModal(MODAL.delete, '',MODAL.deleteYes, MODAL.deleteNo).then(
                    (result) => {
                      if (result) {
                        comilla
                          ? handleDeleteSelected(pkToDelete, comilla)
                          : handleDeleteSelected(pkToDelete);
                      }
                    }
                  );
                }}
              >
                <span style={{ verticalAlign: "0.1em" }}>
                  <FontAwesomeIcon icon={faTrash} className="primaryBtnIcon"/>
                </span>
              </IconButton>
            </Tooltip>
            <CustomModal />
          </>
        )}
      </div>
    );
  }
);

export default PrimaryButtonsComponent;
