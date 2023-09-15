/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { AiOutlineForward, AiFillDelete } from "react-icons/ai";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { SiAddthis } from "react-icons/si";
import { FiRefreshCw } from "react-icons/fi";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES, MODAL } from "../utils";
import { ExportCSV } from "./ExportToCsv";
import { useModal } from "../hooks/useModal";

interface IPrimaryButtonProps {
  handlePageSize?: () => void;
  handleDeleteSelected?: (pkToDelete: any) => void;
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
  strBaseUrl?: string;
  params?: never[];
  strEntidad?: string;
  pkToDelete?: any;
  idMenu: number;
}

const PrimaryButtonsComponent: React.FC<IPrimaryButtonProps> = React.memo(
  ({
    handleDeleteSelected,
    handlePageSize,
    handleAddPerson,
    handleRefresh,
    showForwardButton,
    showAddButton,
    showRefreshButton,
    showDeleteButton,
    strBaseUrl,
    showExportButton,
    params,
    strEntidad,
    pkToDelete,
    idMenu
  }) => {
    const { escritura_lectura } = usePermission(idMenu);
    const { CustomModal, showModal } = useModal();

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
      [escritura_lectura]
    );

    return (
      <div className="primaryBtnContainer">
        {showForwardButton &&
          renderButton(
            <AiOutlineForward className="primaryBtnIcon" />,
            handlePageSize!,
            BUTTON_MESSAGES.next
          )}

        {showAddButton &&
          escritura_lectura &&
          renderButton(
            <SiAddthis className="primaryBtnIcon" />,
            handleAddPerson!,
            BUTTON_MESSAGES.add
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

        {showDeleteButton && escritura_lectura && handleDeleteSelected && (
          <>
            <Tooltip content="Eliminar">
              <IconButton
                variant="text"
                color="blue-gray"
                className="primaryBtnIconButton"
                disabled={!escritura_lectura}
                onClick={() => {
                  showModal(MODAL.delete, MODAL.deleteYes, MODAL.deleteNo).then(
                    (result) => {
                      if (result) {
                        handleDeleteSelected(pkToDelete);
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
      </div>
    );
  }
);

export default PrimaryButtonsComponent;
