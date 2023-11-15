/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineForward, AiFillDelete } from "react-icons/ai";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { SiAddthis } from "react-icons/si";
import { FiRefreshCw } from "react-icons/fi";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES, MODAL } from "../utils";
import { ExportCSV } from "./ExportToCsv";
import { useModal } from "../hooks/useModal";
import { CgInsertAfterR, CgInsertBeforeR } from "react-icons/cg";
import ImportToCsv from "./ImportToCsv";
import { AppStore, useAppSelector } from "../../redux/store";
import OTPrimaryButtons from "./OTPrimaryButtons";

//CgInsertAfterR
//CgInsertBeforeR

interface IPrimaryButtonProps {
  handlePageSize?: () => void;
  handleDeleteSelected?: (pkToDelete: any, comilla?: any) => void;
  toggleEditModal?: () => void;
  escritura?: boolean;
  personsLength?: number;
  handleAddPerson?: () => void;
  handleRefresh?: () => void;
  handleAddTipe2?: () => void;
  showForwardButton?: boolean;
  showAddButton?: boolean;
  showRefreshButton?: boolean;
  showDeleteButton?: boolean;
  showExportButton?: boolean;
  showImportCsv?:boolean;
  comilla?: boolean;
  strBaseUrl?: string;
  params?: never[];
  strEntidad?: string;
  pkToDelete?: any;
  idMenu: number;
  bln_egreso?: boolean;
  isOT?:boolean;
}

const PrimaryButtonsComponent: React.FC<IPrimaryButtonProps> = React.memo(
  ({
    handleDeleteSelected,
    handlePageSize,
    handleAddPerson,
    handleRefresh,
    toggleEditModal,
    showForwardButton,
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
    isOT
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
        {showForwardButton &&
          renderButton(
            <AiOutlineForward className="primaryBtnIcon" />,
            handlePageSize!,
            BUTTON_MESSAGES.next
          )}

        {bln_egreso === true ? (
          <>
            {showAddButton && escritura_lectura && (
              <>
                {renderButton(
                  <CgInsertBeforeR className="primaryBtnIcon" />,
                  handleAddPerson!,
                  BUTTON_MESSAGES.bln_ingreso
                )}
                {renderButton(
                  <CgInsertAfterR className="primaryBtnIcon" />,
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
                  <SiAddthis className="primaryBtnIcon" />,
                  handleAddPerson!,
                  BUTTON_MESSAGES.add
                )}
              </>
            )}
          </>
        )}

        {showRefreshButton &&
          renderButton(
            <FiRefreshCw className="primaryBtnIcon" />,
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
                  <AiFillDelete className="primaryBtnIcon" />
                </span>
              </IconButton>
            </Tooltip>
            <CustomModal />
          </>
        )}
        {/* { OTAreas &&  OTAreas["areas"].map((area:any)=>(
          // console.log(area)
          ))} */}
        



        


      </div>
    );
  }
);

export default PrimaryButtonsComponent;




     {/* {showAddButton &&
          escritura_lectura &&
          renderButton(
            <SiAddthis className="primaryBtnIcon" />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
          )}


        {showAddButton &&
          escritura_lectura &&
          renderButton(
            <CgInsertBeforeR className="primaryBtnIcon" />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
          )}
        {showAddButton &&
          escritura_lectura &&
          renderButton(
            <CgInsertAfterR className="primaryBtnIcon" />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
          )} */}