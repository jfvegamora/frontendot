/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsFillXSquareFill } from "react-icons/bs";

import { usePermission } from "../hooks";
import { BUTTON_MESSAGES } from "../utils";
import {ExportToPDF} from "./ExportToPDF";
import { ExportCSV } from "./ExportToCsv";
// import { ExportCSV } from "./ExportToCsv";

interface ITableComponentProps<T> {
  tableHead: { cell: JSX.Element | string; key: string; visible: boolean; width?:string; alignment?:string }[];
  data?: T[];
  renderButtons?: (item: any) => React.ReactNode;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (event: any, rowsIds: any) => void;
  toggleEditModal?: (id: number) => void;
  handleDeleteSelected?: (id: number) => void;
  toggleExcel?: (id:number) => void;
  selectedRows?: number[];
  pkToDelete?: any;
  setSelectedRows?: any;
  entidad: string;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showPdfButton?:boolean;
  showExcelButton?:boolean;
  idMenu: number;
  strBaseUrl?:string;
  strEntidad?: string;
  queryExcel?:any;
}

const TableComponent: React.FC<ITableComponentProps<any>> = React.memo(
  ({
    tableHead,
    data,
    entidad,
    handleSelectChecked,
    handleSelectedCheckedAll,
    toggleEditModal,
    toggleExcel,
    handleDeleteSelected,
    selectedRows,
    showEditButton,
    showDeleteButton,
    showPdfButton,
    showExcelButton,
    pkToDelete,
    idMenu,
    strBaseUrl,
    strEntidad,
    queryExcel,
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

    const renderTextCell = (text: string, alignment?:string) => {

      const cellStyle = {
        textAlign:alignment
      }
      
      return(
        <Typography variant="small" color="blue-gray" className="gridText" style={cellStyle}>
          {text}
        </Typography>
      )
    };

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
                      renderTextCell(column.cell as string)
                      // renderTextCell(column.cell as string, column.alignment)
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
              console.log('rowData', rowData[6])
            
              return (
                <tr key={rowIndex}>
                  {rowData.map((row: any, col: number) => {
                    // console.log("col", col);
                    const visible   = tableHead && tableHead[col].visible;
                    const alignment = tableHead && tableHead[col].alignment;
                    const color = rowData[6] === "Entrada" ? "green" : (rowData[6] === "Salida" ? "red" : "blanco");

                    return (
                      visible && (
                        <td
                        className={`gridTableData bg-${color}-500 ${alignment}`} 
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
                    <div className="flex">
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
                        
                        {escritura_lectura && showPdfButton && (     
                          <ExportToPDF proyecto_codigo={rowData[1]} establecimiento_id={rowData[4]} strBaseUrl={strBaseUrl}/>
                        )}
                        
                        {escritura_lectura && showExcelButton && (
                          <div
                           onClick={()=>{
                             toggleExcel && toggleExcel(rowIndex)
                           }}
                          >
                            <ExportCSV
                              strEntidad={strEntidad}
                              strBaseUrl={strBaseUrl}
                              query={queryExcel}
                              entity={rowData}
                            />
                          </div>
                        )}

                    </div>
                    
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
