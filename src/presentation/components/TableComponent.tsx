/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Suspense, useMemo, useCallback } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsFillXSquareFill } from "react-icons/bs";
import { BsPersonLock } from "react-icons/bs";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES, clearAllCheck, clearIndividualCheck, disabledIndividualCheck } from "../utils";
import { AppStore, useAppSelector } from "../../redux/store";

import { CristalesEnum, AccesoriosEnum, ArmazonesEnum, ProyectosDocumEnum, ProyectosDestinosEnum, OTGrillaEnum } from "../Enums";

import { Text } from '@chakra-ui/react'


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
    const [ _OTPermissions, setOTPermissions] = useState("");
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas || JSON.parse(localStorage.getItem('OTAreas') as any));
    const OTColores:any = useAppSelector((store: AppStore) => store.OTS.derivacionColores) || JSON.parse(localStorage.getItem('OTColores') as string);
    const areaActual = OTAreas["areaActual"] 
    const permissions = (area:number) => areaActual &&  OTAreas["areas"].find((permiso:any)=>permiso[1] === area)

    let enumGird:any = useMemo(() => {
      switch (entidad) {
        case 'Armazón ':
          return ArmazonesEnum;
        case 'Cristal ':
          return CristalesEnum;
        case 'Accesorio ':
          return AccesoriosEnum;
        case 'Documentación del Proyecto ':
          return ProyectosDocumEnum;
        case 'Destinos':
          return ProyectosDestinosEnum;
        default:
          return {};
      }
    }, [entidad]);

    useEffect(()=>{
      const permiso = permissions(areaActual)
      setOTPermissions( permiso && permiso[5])
    },[areaActual, permissions])

    
    useEffect(() => {
      if (data) {
        const newRowIds = Array(data.length)
          .fill(0)
          .map((_, index) => index);
        setRowIds(newRowIds);
      }
    }, [data]);


  


    const handleColorEstado = useCallback((rowData:any, background?:string) => {
      try {
        if(OTColores[rowData]){
          return background ? `${OTColores[rowData][1]}` : `${OTColores[rowData][0]}`
        }
        return  background ? `black` : 'red'
      } catch (error) {
        throw error;
      }
    },[OTColores, isOT]);


    

    const renderTextCell = useCallback((text: string, alignment?:string, type?:number, color2?:boolean, rowData?:any, backgroundAtrasadas?:boolean, color?:any, lowArmazonesStock?:any) => {
      const cellStyle:any = {
        textAlign:alignment,
        color: isOT ? (rowData &&  color2 &&  handleColorEstado(rowData[5])) : (rowData &&  handleColorEstado(rowData[1], 'background  ')),
      }

      return(
        // <Text variant="small" color="blue-gray" className={`gridText h-[2.7rem]  py-2  ${(backgroundAtrasadas && color || lowArmazonesStock && color2) ? '!text-white ' : 'text-black'} ${(type === 1 && color2) ? '': ( type === 1 ? ''  :'text-black')} `} style={ color2 ? cellStyl} >
        <Text // Combina estilos inline y de objeto
          variant="small" color="blue-gray" style={{ ...cellStyle }}  className={` gridText h-[2.7rem]  py-2  ${(backgroundAtrasadas && color || lowArmazonesStock && color2) ? '!text-white ' : 'text-black'} ${(type === 1 && color2) ? '': ( type === 1 ? '!text-black'  :'text-black')} ` }  >
          {text !== null && text !== undefined ? text.toString() : ""}
        </Text>
      )
    },[handleColorEstado, isOT]);

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
              if(clearAllCheck.value && selectedRows?.includes(id)){
                const newSelectedRows = selectedRows?.filter((checkId:number)=>checkId !==  id)
                return setSelectedRows(newSelectedRows)
              }
              handleSelectChecked && handleSelectChecked(id)
            }}
            type="checkbox" 
            disabled={disabledIndividualCheck.value}
            className="mx-6"
            
          />

          { leftEdit && showEditButton && escritura_lectura && (
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
            <Suspense>
              <OTGrillaButtons
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
    }

  
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
                          console.log('click')
                          console.log(clearAllCheck.value)
                          console.log(disabledIndividualCheck.value)
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
                estado                = rowData[4]
              }

              if(idMenu == 38 && (rowData[enumGird.tipo_doc_id] === 1 || rowData[enumGird.tipo_doc_id] === 2 
                               || rowData[enumGird.tipo_doc_id] === 3 || rowData[enumGird.tipo_doc_id] === 4 
                               || rowData[enumGird.tipo_doc_id] === 5 || rowData[enumGird.tipo_doc_id] === 8)){
                excelIndividual = true
              }  
              return (
                <tr key={rowIndex} className="overflow-hidden">
                  {rowData.map((row: any, col: number) => {
                    const visible               = tableHead?.[col]?.visible         || false;
                    const alignment             = tableHead?.[col]?.alignment       || "";
                    const color2                = tableHead?.[col]?.color           || false;
                    const backgroundAtrasadas   = tableHead?.[col]?.background      || false;
                    const color                 = ( 
                                                    isOT 
                                                      ? (rowData[OTGrillaEnum.por_vencer] === 'S' && 
                                                          ( rowData[OTGrillaEnum.estado_id] !== 10 ||
                                                            rowData[OTGrillaEnum.estado_id] !== 20 ||
                                                            rowData[OTGrillaEnum.estado_id] !== 30 ||
                                                            rowData[OTGrillaEnum.estado_id] !== 40
                                                          )) 
                                                      ? "bg-black" : "" : "");

                    const type                  = color === 'bg-black' ? 1 : 0
                                                          
                    return (
                      visible && (
                        <td
                        className={`gridTableData ${backgroundAtrasadas && color}   ${alignment} ${""}`} 
                          key={col}
                          id={tableHead[col].key}
                          style={{
                            backgroundColor: isOT ? (color2 ? ( handleColorEstado( rowData[5], 'background') ): "!bg-black") : ( lowArmazonesStock && color2 ? (handleColorEstado(rowData[1])) : ""),
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
                            <ExportToPDF rowData={rowData} strBaseUrl={strBaseUrl}/>
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
                                query={'7'}
                                entity={rowData}
                                primaryButton={false}
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