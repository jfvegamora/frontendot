import React from "react";
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
  }) => {
    const { escritura } = usePermission();

    const renderButton = (
      icon: React.ReactNode,
      onClick: () => void,
      tooltip: string
    ) => (
      <Tooltip content={tooltip}>
        <IconButton
          variant="text"
          color="blue-gray"
          className="primaryBtnIconButton"
          onClick={onClick}
          disabled={!escritura}
        >
          {icon}
        </IconButton>
      </Tooltip>
    );

    return (
      <div className="primaryBtnContainer">
        {showForwardButton &&
          // <Tooltip content="Siguiente">
          //   <IconButton
          //     variant="text"
          //     color="blue-gray"
          //     className="mx-2"
          //     // className="flex items-center mr-6 gap-3 rounded bg-blue-500"
          //     onClick={handlePageSize}
          //   >
          //     <AiOutlineForward className="h-10 w-10" />
          //   </IconButton>
          // </Tooltip>
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

        {showExportButton && <ExportCSV strBaseUrl={strBaseUrl} />}

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
