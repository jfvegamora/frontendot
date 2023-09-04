/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsFillXSquareFill } from "react-icons/bs";

import { usePermission } from "../hooks";
import { BUTTON_MESSAGES } from "../utils";

interface ITableComponentProps<T> {
  tableHead: { cell: JSX.Element | string; key: string; visible: boolean }[];
  data?: T[];
  renderButtons?: (item: any) => React.ReactNode;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  toggleEditModal?: (id: number) => void;
  handleDeleteSelected?: (id: number) => void;
  selectedRows?: number[];
  pkToDelete?: any;
  setSelectedRows?: any;
  entidad: string;
  showEditButton: boolean;
  showDeleteButton: boolean;
  params?: never[];
}

const TableComponent: React.FC<ITableComponentProps<any>> = React.memo(
  ({
    tableHead,
    data,
    entidad,
    handleSelectChecked,
    handleSelectedCheckedAll,
    toggleEditModal,
    handleDeleteSelected,
    selectedRows,
    showEditButton,
    showDeleteButton,
    pkToDelete,
  }) => {
    const { escritura } = usePermission();
    const [rowIds, setRowIds] = useState<number[]>([]);
    useEffect(() => {
      if (data) {
        // Crea un arreglo de IDs de filas basado en la longitud de los datos
        const newRowIds = Array(data.length)
          .fill(0)
          .map((_, index) => index);
        setRowIds(newRowIds);
      }
    }, [data]);

    const renderTextCell = (text: string) => (
      <Typography variant="small" color="blue-gray" className="gridText">
        {text || ""}
      </Typography>
    );

    const renderCheckboxCell = (id: number) => (
      <input
        checked={selectedRows && selectedRows.includes(id)}
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
                        onChange={(e) =>
                          handleSelectedCheckedAll &&
                          handleSelectedCheckedAll(e, rowIds)
                        }
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
              // const id = [3, 3];
              return (
                <tr key={rowIndex}>
                  {rowData.map((row: any, col: number) => {
                    // console.log("col", col);
                    const visible = tableHead && tableHead[col].visible;
                    return (
                      visible && (
                        <td
                          className="gridTableData"
                          key={col}
                          id={tableHead[col].key}
                        >
                          {col === 0
                            ? renderCheckboxCell(rowIndex)
                            : renderTextCell(row)}
                        </td>
                      )
                    );
                  })}
                  <td className="gridTableData">
                    {/* ===========BOTONES DE TABLA============ */}
                    {showEditButton && escritura && (
                      <Tooltip content={BUTTON_MESSAGES.edit.concat(entidad)}>
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() =>
                            toggleEditModal && toggleEditModal(rowIndex)
                          }
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
                            handleSelectChecked &&
                              handleSelectChecked(rowIndex);
                            handleDeleteSelected && pkToDelete;
                            handleDeleteSelected(pkToDelete);
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
