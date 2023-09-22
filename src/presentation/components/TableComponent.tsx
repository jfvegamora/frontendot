/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsFillXSquareFill } from "react-icons/bs";

import { usePermission } from "../hooks";
import { BUTTON_MESSAGES } from "../utils";
import ExportToPDF from "./ExportToPDF";
import { ExportCSV } from "./ExportToCsv";

interface ITableComponentProps<T> {
  tableHead: { cell: JSX.Element | string; key: string; visible: boolean; width:string; alignment:string }[];
  data?: T[];
  renderButtons?: (item: any) => React.ReactNode;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (event: any, rowsIds: any) => void;
  toggleEditModal?: (id: number) => void;
  handleDeleteSelected?: (id: number) => void;
  selectedRows?: number[];
  pkToDelete?: any;
  setSelectedRows?: any;
  entidad: string;
  showEditButton: boolean;
  showDeleteButton: boolean;
  params?: never[];
  idMenu: number;
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
    idMenu,
  }) => {
    const { escritura_lectura, lectura} = usePermission(idMenu);
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

    const renderTextCell = (text: string,alignment?:string) => (
      <Typography variant="small" color="blue-gray" className={`gridText ${alignment}`}>
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
        <thead className="gridTop">
          <tr>
            {tableHead &&
              tableHead.map((column, index) => {
                const isVisible =
                  column.visible && (column.key !== "checkbox" || escritura_lectura || lectura);
                return isVisible ? (
                  <th key={index} className={`gridHead ${column.width || 'w-auto'}`}>
                    {column.key === "checkbox" ? (
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSelectedCheckedAll &&
                          handleSelectedCheckedAll(e, rowIds)
                        }
                      />
                    ) : (
                      renderTextCell(column.cell as string, column.alignment)
                    )}
                  </th>
                ) : null;
              })}
          </tr>
        </thead>
        <tbody className="gridData">
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
                    {showEditButton && escritura_lectura && (
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

                    {escritura_lectura && showDeleteButton && (
                      <Tooltip content={BUTTON_MESSAGES.delete.concat(entidad)}>
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => {
                            handleSelectChecked &&
                              handleSelectChecked(rowIndex);
                            handleDeleteSelected &&
                              handleDeleteSelected(pkToDelete);
                          }}
                        >
                          <BsFillXSquareFill className="gridIcons" />
                        </IconButton>
                      </Tooltip>
                    )}

                    <ExportToPDF/>
                    
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
