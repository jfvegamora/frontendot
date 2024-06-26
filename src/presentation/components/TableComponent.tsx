/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Suspense } from "react";
import { IconButton, Spinner, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsFillXSquareFill } from "react-icons/bs";
import { BsPersonLock } from "react-icons/bs";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES, clearAllCheck, clearIndividualCheck, disabledIndividualCheck } from "../utils";
import { AppStore, useAppSelector } from "../../redux/store";

import { CristalesEnum, AccesoriosEnum, ArmazonesEnum, ProyectosDocumEnum } from "../Enums";

const OTGrillaButtons = React.lazy(()=>import("./OTGrillaButtons"));
const ExportToPDF     = React.lazy(()=>import("./ExportToPDF"));
const ExportToCsv     = React.lazy(()=>import("./ExportToCsv"));






interface ITableComponentProps<T> {
  tableHead: { cell: JSX.Element | string; key: string; visible: boolean; width?:string; alignment?:string, color?:boolean, background?:boolean, excelIndividual?:boolean }[];
  data?: T[];
  renderButtons?: (item: any) => React.ReactNode;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (event: any, rowsIds: any) => void;
  toggleEditModal?: (id: number) => void;
  toggleEditOTModal?: (id: number, folio:any) => void;
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
  params?:any;
  togglePermisoOTModal?:() => void;
  leftEdit?:boolean;
}

const TableComponent: React.FC<ITableComponentProps<any>> = React.memo(
  ({
    tableHead,
    data,
    entidad,
    handleSelectChecked,
    handleSelectedCheckedAll,
    toggleEditModal,
    toggleEditOTModal,
    toggleExcel,
    handleDeleteSelected,
    selectedRows,
    setSelectedRows,
    showEditButton,
    showDeleteButton,
    showPdfButton,
    showPermisoOTButton,
    pkToDelete,
    idMenu,
    strBaseUrl,
    isOT,
    togglePermisoOTModal,
    leftEdit,
    params,
    showExcelButton
  }) => {
    const { escritura_lectura, lectura} = usePermission(idMenu || 0 );
    const [rowIds, setRowIds] = useState<number[]>([]);
    const [ OTPermissions, setOTPermissions] = useState("");
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const OTColores:any = useAppSelector((store: AppStore) => store.OTS.derivacionColores) || JSON.parse(localStorage.getItem('OTColores') as string);
    const areaActual = OTAreas["areaActual"] 
    const permissions = (area:number) => areaActual &&  OTAreas["areas"].find((permiso:any)=>permiso[1] === area)
    
    let enumGird:any = {}
    
    switch (entidad) {
      case 'Armazón ':
        enumGird = ArmazonesEnum
        break;
      case 'Cristal ':
        enumGird = CristalesEnum
        break
      case 'Accesorio ':
        enumGird = AccesoriosEnum
        break
      case 'Documentación del Proyecto ':
        enumGird = ProyectosDocumEnum
        break;
      default:
        break;
    }

    useEffect(()=>{
      const permiso = permissions(areaActual)
      setOTPermissions( permiso && permiso[5])
    },[areaActual])

    
    useEffect(() => {
      if (data) {
        const newRowIds = Array(data.length)
          .fill(0)
          .map((_, index) => index);
        setRowIds(newRowIds);
      }
    }, [data]);


    const handleColorEstado = (rowData:any, background?:string) => {
      try {
        if(OTColores[rowData]){
          return background ? `${OTColores[rowData][1]}` : `${OTColores[rowData][0]}`
        }
        return  background ? `black` : 'red'
      } catch (error) {
        throw error;
      }
    }

    const renderTextCell = (text: string, alignment?:string, type?:number, color2?:boolean, rowData?:any, backgroundAtrasadas?:boolean, color?:any, lowArmazonesStock?:any) => {
      const cellStyle = {
        textAlign:alignment,
        color: isOT ? (rowData &&  handleColorEstado(rowData[4])) : (rowData &&  handleColorEstado(rowData[1], 'background  ')),
      }
      return(
        <Typography variant="small" color="blue-gray" className={`gridText h-[2.7rem]  py-2  ${(backgroundAtrasadas && color || lowArmazonesStock && color2) ? '!text-white ' : 'text-black'} ${(type === 1 && color2) ? '': ( type === 1 ? ''  :'text-black')} `} style={ color2 ? cellStyle : null}>
          {text !== null && text !== undefined ? text.toString() : ""}
        </Typography>
      )
    };
    let lowArmazonesStock = false;


    React.useEffect(()=>{
      if(clearIndividualCheck.value === true){
        setSelectedRows([])
        clearIndividualCheck.value = false
      }
    },[clearIndividualCheck.value])


    const renderCheckboxCell = (id: number, folio:number, estado?:any) => {
      return (
        <>
          <input
            checked={
              selectedRows && selectedRows.includes(id)                                     
            }
            onChange={() => {
              handleSelectChecked && handleSelectChecked(id)
            }}
            type="checkbox"
            disabled={disabledIndividualCheck.value}
            className="mx-6"
            
          />

          { leftEdit && showEditButton && (
                        <Tooltip content={BUTTON_MESSAGES.edit.concat(entidad)}>
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() =>
                              toggleEditModal && toggleEditModal(id)
                            }
                          >
                            <PencilIcon className="gridIcons" />
                          </IconButton>
                        </Tooltip>
         )}

          {isOT && (
            <Suspense fallback={<Spinner className="h-10 w-10 ml-4" style={{ color: '#f39c12' }} />}>
              <OTGrillaButtons
                areaPermissions={OTPermissions}
                id={id}
                folio={folio}
                toggleEditOTModal={toggleEditOTModal}
                entidad={entidad}
                historica={entidad === 'Orden de Trabajo Histórico' ? true : false}
                estado={estado}
                />
            </Suspense>
          )}
        </>

      )
  };

 
  
    return (
    <div className="gridCointainer">
      <table className="gridContainer">
        <thead className="gridTop">
          <tr>
            {tableHead &&
              tableHead.map((column, index) => {
                const isVisible =
                  column.visible && (column.key !== "checkbox" || escritura_lectura || lectura);
                return isVisible && (
                  <th key={index} className={`gridHead   ${column.width || 'w-auto'}`}>
                    {column.key === "checkbox" ? (
                      <input className="checkTable"
                        type="checkbox"
                        checked={clearAllCheck.value}
                        onChange={(e) =>{
                          clearAllCheck.value = !clearAllCheck.value
                          handleSelectedCheckedAll &&
                          handleSelectedCheckedAll(e, rowIds)
                        }}
                      />
                    ) : (
                      renderTextCell(column.cell as string)
                    )}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody className="gridData">
          {data && data.length > 0 ? (data.map((rowData: any, rowIndex: number) => {
            let excelIndividual = false
              if((params && params["_p5"] !== '')  ||  params && params[0] === ''){
                let stockDisponibe    = parseInt(rowData[enumGird.stock_disponible])
                let stockMinimo       = parseInt(rowData[enumGird.stock_minimo])
                lowArmazonesStock     = (stockDisponibe <= stockMinimo) ? true : false
              }else{
                lowArmazonesStock     = false;
              }

              const folio             = rowData[1]
              let estado              = ""
              if(isOT){
                estado                = rowData[3]
              }

              if(entidad === 'Documentación del Proyecto ' && (rowData[enumGird.tipo_doc_id] === 1 || rowData[enumGird.tipo_doc_id] === 2)){
                excelIndividual = true
              }  
              return (
                <tr key={rowIndex} className="overflow-hidden">
                  {rowData.map((row: any, col: number) => {
                    const visible               = tableHead?.[col]?.visible         || false;
                    const alignment             = tableHead?.[col]?.alignment       || "";
                    const color2                = tableHead?.[col]?.color           || false;
                    const backgroundAtrasadas   = tableHead?.[col]?.background      || false;
                    const color                 = ( isOT ? rowData[22] === 'S' ? "bg-black" : "" : "");
                    const type                  = color === 'bg-black' ? 1 : 0

                    return (
                      visible && (
                        <td
                        className={`gridTableData ${backgroundAtrasadas && color}   ${alignment} ${""}`} 
                          key={col}
                          id={tableHead[col].key}
                          style={{
                            backgroundColor: isOT ? (color2 ? ( handleColorEstado( rowData[4], 'background') ): "") : ( lowArmazonesStock && color2 ? (handleColorEstado(rowData[1])) : ""),
                          }}
                        >
                          {col === 0
                            ? renderCheckboxCell(rowIndex, folio, estado)
                            : renderTextCell(row, '', type, color2, rowData,backgroundAtrasadas, color, lowArmazonesStock)}
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
                        
                        <Suspense>
                          {escritura_lectura && showPdfButton &&(     
                            <ExportToPDF proyecto_codigo={rowData[1]} establecimiento_id={rowData[4]} strBaseUrl={strBaseUrl}/>
                          )}
                        </Suspense>
                        

                        <Suspense>
                          {escritura_lectura && showExcelButton && excelIndividual && (
                            <div
                            onClick={()=>{
                              toggleExcel && toggleExcel(rowIndex)
                            }}
                            >
                              <ExportToCsv
                                strEntidad={entidad}
                                strBaseUrl={strBaseUrl}
                                query={'aasasa'}
                                entity={rowData}
                              />
                            </div>
                          )}
                        </Suspense>

                    </div>
                    
                  </td>
                  )}
                  
                </tr>
              );
            })) : (
             <tr className="h-full">

            </tr>
            )
            
          }
        </tbody>
      </table>

      </div>
    );
  }
);

export default TableComponent;



// useEffect(() => {
    //   const handleColumnMouseDown = (e: any) => {
    //     const initialX = e.clientX;
    //     const columnId = e.target.id;
    //     const column = document.getElementById(columnId);
    
    //     const handleMouseMove = (e: any) => {
    //       if (column) {
    //         const width = column.offsetWidth + (e.clientX - initialX);
    //         column.style.width = `${width}px`;
    //       }
    //     };
    
    //     const handleMouseUp = () => {
    //       document.removeEventListener('mousemove', handleMouseMove);
    //       document.removeEventListener('mouseup', handleMouseUp);
    //     };
    
    //     document.addEventListener('mousemove', handleMouseMove);
    //     document.addEventListener('mouseup', handleMouseUp);
    //   };
    
    //   const columns = document.querySelectorAll('th');
    
    //   columns.forEach((column) => {
    //     column.addEventListener('mousedown', handleColumnMouseDown);
    
    //     return () => {
    //       column.removeEventListener('mousedown', handleColumnMouseDown);
    //     };
    //   });
    
    //   // Limpia los eventos cuando el componente se desmonta
    //   return () => {
    //     columns.forEach((column) => {
    //       column.removeEventListener('mousedown', handleColumnMouseDown);
    //     });
    //   };
    // }, []);