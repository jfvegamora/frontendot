/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { AiOutlineForward, AiFillDelete } from "react-icons/ai";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { SiAddthis } from "react-icons/si";
import { FiRefreshCw } from "react-icons/fi";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES } from "../utils";
import { ExportCSV } from "./ExportToCsv";

interface IPrimaryButtonProps {
  handlePageSize?: () => void;
  handleDeleteSelected?: () => void;
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
  }) => {
    const { escritura } = usePermission();

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
          <ExportCSV params={params} strBaseUrl={strBaseUrl} />
        )}

        {showDeleteButton &&
          escritura &&
          renderButton(
            <AiFillDelete className="primaryBtnIcon" />,
            handleDeleteSelected!,
            BUTTON_MESSAGES.deleteAll
          )}
      </div>
    );
  }
);

export default PrimaryButtonsComponent;
