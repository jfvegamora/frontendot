/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsFillXSquareFill } from "react-icons/bs";

import { usePermission } from "../hooks";
import { BUTTON_MESSAGES } from "../utils";

interface ITableComponentProps<T> {
  tableHead: { cell: JSX.Element | string; key: string; visible: boolean }[];
  data: T[];
  renderButtons?: (item: any) => React.ReactNode;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  toggleEditModal?: (id: number) => void;
  handleDeleteSelected?: (id: number) => void;
  selectedIds?: number[];
  setSelectedIds?: React.Dispatch<React.SetStateAction<any[]>>;
  entidad: string;
  showEditButton: boolean;
  showDeleteButton: boolean;
}

const inIdPosition = 1;

const TableComponent: React.FC<ITableComponentProps<any>> = React.memo(
  ({
    tableHead,
    data,
    entidad,
    handleSelectChecked,
    handleSelectedCheckedAll,
    toggleEditModal,
    handleDeleteSelected,
    selectedIds,
    setSelectedIds,
    showEditButton,
    showDeleteButton,
  }) => {
    const { escritura } = usePermission();
    const renderTextCell = (text: string) => (
      <Typography variant="small" color="blue-gray" className="gridText">
        {text || ""}
      </Typography>
    );

    const renderCheckboxCell = (id: number) => (
      <input
        checked={selectedIds && selectedIds.includes(id)}
        onChange={() => handleSelectChecked && handleSelectChecked(id)}
        type="checkbox"
      />
    );

    return (
      <table className="gridContainer">
        <thead>
          <tr>
            {tableHead &&
              tableHead.map((column, index) => {
                const isVisible =
                  column.visible && (column.key !== "checkbox" || escritura);
                return isVisible ? (
                  <th key={index} className="gridHead">
                    {column.key === "checkbox" ? (
                      <input
                        type="checkbox"
                        onChange={handleSelectedCheckedAll}
                      />
                    ) : (
                      renderTextCell(column.cell as string)
                    )}
                  </th>
                ) : null;
              })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((rowData: any, rowIndex: number) => {
              const id = rowData[inIdPosition];
              return (
                <tr key={rowIndex}>
                  {rowData.map((row: any, index: number) => {
                    const visible = tableHead && tableHead[index].visible;
                    return (
                      visible && (
                        <td className="gridTableData" key={index}>
                          {index === 0
                            ? renderCheckboxCell(id)
                            : renderTextCell(row)}
                        </td>
                      )
                    );
                  })}
                  <td>
                    {/* ===========BOTONES DE TABLA============ */}
                    {showEditButton && escritura && (
                      <Tooltip content={BUTTON_MESSAGES.edit.concat(entidad)}>
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => toggleEditModal && toggleEditModal(id)}
                        >
                          <PencilIcon className="gridIcons" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {escritura && showDeleteButton && (
                      <Tooltip content={BUTTON_MESSAGES.delete.concat(entidad)}>
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => {
                            setSelectedIds && setSelectedIds([id]);
                            handleDeleteSelected && handleDeleteSelected(id);
                          }}
                        >
                          <BsFillXSquareFill className="gridIcons" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
);

export default TableComponent;
