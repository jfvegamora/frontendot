/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsFillXSquareFill } from "react-icons/bs";
import { BsPersonLock } from "react-icons/bs";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES } from "../utils";
import {ExportToPDF} from "./ExportToPDF";
import { ExportCSV } from "./ExportToCsv";
import { AppStore, useAppDispatch, useAppSelector } from "../../redux/store";
import OTGrillaButtons from "./OTGrillaButtons";
import { FixedSizeList } from "react-window";
import { fetchOT } from "../../redux/slices/OTSlice";
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
  showPermisoOTButton?:boolean;
  isOT?:boolean;
  idMenu: number;
  strBaseUrl?:string;
  strEntidad?: string;
  queryExcel?:any;
  setTotalRowIndex?:any;
  togglePermisoOTModal?:() => void;
}

const TableOTComponent: React.FC<ITableComponentProps<any>> = React.memo(
  ({
    tableHead,
    // data,
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
    showPermisoOTButton,
    pkToDelete,
    idMenu,
    strBaseUrl,
    strEntidad,
    queryExcel,
    isOT,
    togglePermisoOTModal
    //  setTotalRowIndex
  }) => {
    const { escritura_lectura, lectura} = usePermission(idMenu || 0 );
    const [rowIds, setRowIds] = useState<number[]>([]);
    const data = useAppSelector((store: AppStore) => store.OTS.data);
    const dispatch = useAppDispatch()

    const [ OTPermissions, setOTPermissions] = useState("");
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const areaActual = OTAreas["areaActual"] 
    const permissions = (area:number) => areaActual &&  OTAreas["areas"].find((permiso:any)=>permiso[1] === area)

    useEffect(()=>{
      console.log('render')
      dispatch(fetchOT(areaActual))
      
      const permiso = permissions(areaActual)
      setOTPermissions( permiso && permiso[5])
      const interval = setInterval(fetchOT, 10000);

    // Limpia el intervalo en la limpieza del efecto
      return () => clearInterval(interval);
    },[areaActual])

    // console.log(idMenu)
    useEffect(() => {
      if (data) {
        // Crea un arreglo de IDs de filas basado en la longitud de los datos
        const newRowIds = Array(data.length)
          .fill(0)
          .map((_, index) => index);
        setRowIds(newRowIds);

        // setTotalRowIndex && setTotalRowIndex(newRowIds)
      }
    }, [data]);

    useEffect(() => {
      const handleColumnMouseDown = (e: any) => {
        const initialX = e.clientX;
        const columnId = e.target.id;
        const column = document.getElementById(columnId);
    
        const handleMouseMove = (e: any) => {
          if (column) {
            const width = column.offsetWidth + (e.clientX - initialX);
            column.style.width = `${width}px`;
          }
        };
    
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };
    
      const columns = document.querySelectorAll('th');
    
      columns.forEach((column) => {
        column.addEventListener('mousedown', handleColumnMouseDown);
    
        return () => {
          column.removeEventListener('mousedown', handleColumnMouseDown);
        };
      });
    
      // Limpia los eventos cuando el componente se desmonta
      return () => {
        columns.forEach((column) => {
          column.removeEventListener('mousedown', handleColumnMouseDown);
        });
      };
    }, []);
    

    const renderTextCell = useMemo(
      () => (text: string, alignment?: string, type?: number) => {
        const cellStyle = {
          textAlign: alignment
        };
    
        return (
          <Typography
            variant="small"
            color="blue-gray"
            className={`gridText h-[2.7rem]  py-2  ${type === 1 ? '!text-white' : ''} `}
            style={cellStyle}
          >
            {text !== null && text !== undefined ? text.toString() : ""}
          </Typography>
        );
      },
      []
    );
    
    const renderCheckboxCell = useMemo(
      () => (id: number) => {
        return (
          <>
            <input
              checked={selectedRows && selectedRows.includes(id)}
              onChange={() => handleSelectChecked && handleSelectChecked(id)}
              type="checkbox"
            />
            {isOT && (
              <>
                <OTGrillaButtons
                  areaPermissions={OTPermissions}
                  id={id}
                  // toggleEditModal={toggleEditModal}
                />
              </>
            )}
          </>
        );
      },
      [selectedRows, isOT, OTPermissions, handleSelectChecked, toggleEditModal]
    );
    




  console.log(data)
  // console.log(Object.values(data).map((rowData, rowIndex)=> rowData))
  
  
  const renderBody = () => (
    <table className="gridContainer">
        <thead className="gridTop">
          <tr>
            {tableHead &&
              tableHead.map((column, index) => {
                const isVisible =
                  column.visible && (column.key !== "checkbox" || escritura_lectura || lectura);
                return isVisible ? (
                  <th key={index} className={`gridHead   ${column.width || 'w-auto'}`}>
                    {column.key === "checkbox" ? (
                      <input className="checkTable"
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
          {
            data?.map((rowData: any, rowIndex: number) => {
              // const id = [3, 3];
              console.log('rowData', rowData)
          

              return (
                <tr key={rowIndex}>
                  {rowData.map((row: any, col: number) => {
                    // console.log("col", col);
                    const visible   = tableHead && tableHead[col].visible;
                    const alignment = tableHead && tableHead[col].alignment;
                    // console.log(rowData[5])
                    const color = rowData[5] === 99 ? "gray" : "";
                    const type = color === 'gray' ? 1: 0
                  
                    return (
                      visible && (
                        <td
                        // className={`gridTableData  bg-${color}-500   ${alignment}`} 
                        className={`  bg-${color}-500   ${alignment}`} 
                          key={col}
                          id={tableHead[col].key}
                        >
                          
                          {col === 0
                            ? renderCheckboxCell(rowIndex)
                            : renderTextCell(row, '', type)}
                        </td>
                      )
                    );
                    
                  })}
                  





                  {!isOT && (
                    <td className="gridTableData">
                    {/* ===========BOTONES DE TABLA============ */}
                    <div className="flex">
                      {showEditButton && (
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

                      {showPermisoOTButton && escritura_lectura && (
                        <Tooltip content={BUTTON_MESSAGES.permiso_ot.concat(entidad)}>
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() =>
                              // toggleEditModal && toggleEditModal(rowIndex)
                              togglePermisoOTModal && togglePermisoOTModal()
                            }
                          >
                            < BsPersonLock className="gridIcons" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {escritura_lectura && showDeleteButton && (
                        <Tooltip content={BUTTON_MESSAGES.delete.concat(entidad)}>
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => {
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
                  )}
                  
                </tr>
              );
            })}
        </tbody>
        
      </table>
  )
            console.log(data)
    return (
      <FixedSizeList
          height={500} 
          width={window.innerWidth} 
          itemCount={data ? data.length : 0}
          itemSize={50}
        >
        {renderBody}
      </FixedSizeList>
      
    );
  }
);
// const MemoizedTableOTComponent = React.memo(TableOTComponent);
// export default MemoizedTableOTComponent;

export default TableOTComponent;
