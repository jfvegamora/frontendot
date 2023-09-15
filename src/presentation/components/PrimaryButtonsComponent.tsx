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
  comilla?:boolean;
  strBaseUrl?: string;
  params?: never[];
  strEntidad?: string;
  pkToDelete?: any;
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
    comilla
  }) => {
    const { escritura } = usePermission();
    const { CustomModal, showModal } = useModal();

    const renderButton = useCallback(
      (icon: React.ReactNode, handle: () => void, tooltip: string) => (
        <Tooltip content={tooltip}>
          <IconButton
            variant="text"
            color="blue-gray"
            className="primaryBtnIconButton"
            onClick={handle}
            disabled={!escritura}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      [escritura]
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
          escritura &&
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

        {showDeleteButton && escritura && handleDeleteSelected && (
          <>
            <Tooltip content="Eliminar">
              <IconButton
                variant="text"
                color="blue-gray"
                className="primaryBtnIconButton"
                disabled={!escritura}
                onClick={() => {
                  showModal(MODAL.delete, MODAL.deleteYes, MODAL.deleteNo).then(
                    (result) => {
                      if (result) {
                        console.log('comilla', comilla)
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
      </div>
    );
  }
);

export default PrimaryButtonsComponent;
