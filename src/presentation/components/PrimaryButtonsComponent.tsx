/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
// import { AiOutlineForward, AiFillDelete } from "react-icons/ai";
import { IconButton, Tooltip } from "@material-tailwind/react";
// import { SiAddthis } from "react-icons/si";
// import { FiRefreshCw } from "react-icons/fi";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES, MODAL } from "../utils";
import { ExportCSV } from "./ExportToCsv";
import { useModal } from "../hooks/useModal";
// import { CgInsertAfterR, CgInsertBeforeR } from "react-icons/cg";
import ImportToCsv from "./ImportToCsv";
import { AppStore, useAppSelector } from "../../redux/store";
import OTPrimaryButtons from "./OTPrimaryButtons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faClone, faArrowsRotate, faTrash, faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ExportCustomCSV } from "./ExportCustomToCsv";


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
  customExporTooltip?:string;
  showForwardButton?: boolean;
  showAddButton?: boolean;
  showRefreshButton?: boolean;
  showDeleteButton?: boolean;
  showExportButton?: boolean;
  showCustomExportButton?:boolean;
  showImportCsv?:boolean;
  comilla?: boolean;
  strBaseUrl?: string;
  params?: never[];
  strEntidad?: string;
  pkToDelete?: any;
  idMenu: number;
  bln_egreso?: boolean;
  isOT?:boolean;
  showCopiar?: boolean;
}
 
const PrimaryButtonsComponent: React.FC<IPrimaryButtonProps> = React.memo(
  ({
    handleDeleteSelected,
    // handlePageSize,
    handleAddPerson,
    handleCopiar,
    handleRefresh,
    toggleEditModal,
    // showForwardButton
    showCustomExportButton,
    customExporTooltip,
    showAddButton,
    showRefreshButton,
    showDeleteButton,
    showImportCsv,
    strBaseUrl,
    showExportButton,
    params,
    strEntidad,
    pkToDelete,
    comilla,
    idMenu,
    bln_egreso,
    isOT,
    showCopiar
  }) => {
    const { escritura_lectura } = usePermission(idMenu);
    const { CustomModal, showModal } = useModal();
    const [OTPermissions, setOTPermissions] = useState("");

    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);

    const areaActual = OTAreas["areaActual"]

    // console.log(areaActual)
    // console.log(OTAreas.areas)

    const permissions = (area:number) => areaActual && OTAreas["areas"].find((permiso:any)=>permiso[1] === area)


    useEffect(()=>{
      // console.log('render')
      const permiso = areaActual && permissions(areaActual)
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

        {showRefreshButton &&
          renderButton(
            <FontAwesomeIcon icon={faArrowsRotate} className="primaryBtnIcon" />,
            handleRefresh!,
            BUTTON_MESSAGES.refresh
          )}

        {showExportButton && (
          <ExportCSV
            strEntidad={strEntidad}
            params={params}
            strBaseUrl={strBaseUrl}
          />
        )}

         
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



        
        {showImportCsv && escritura_lectura && (
          <ImportToCsv strEntidad={strEntidad}/>
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
                  showModal(MODAL.delete, MODAL.deleteYes, MODAL.deleteNo).then(
                    (result) => {
                      if (result) {
                        console.log("comilla", comilla);
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
