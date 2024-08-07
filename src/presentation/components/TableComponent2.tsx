/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { usePermission } from "../hooks";
import { clearAllCheck, clearIndividualCheck, disabledIndividualCheck } from "../utils";
import { AppStore, useAppSelector } from "../../redux/store";

import { OTGrillaEnum } from "../Enums";

import { Text } from '@chakra-ui/react'
import { signal } from "@preact/signals-react";

const OTGrillaButtons = React.lazy(()=>import("./OTGrillaButtons"));

const indicesOT = signal<any>([])






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

const TableComponent2: React.FC<ITableComponentProps<any>> = React.memo(
  ({
    tableHead,
    // data,
    entidad,
    handleSelectChecked,
    handleSelectedCheckedAll,
    toggleEditOTModal,
    toggleEditModal,
    selectedRows,
    setSelectedRows,
    idMenu,
    isOT,
  }) => {
    const { escritura_lectura, lectura} = usePermission(idMenu || 0 );
    const [ _OTPermissions, setOTPermissions] = useState("");
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas || JSON.parse(localStorage.getItem('OTAreas') as any));
    const OTAreaActual:any = React.useCallback(useAppSelector((store: AppStore) => store.OTAreas["areaActual"] || JSON.parse(localStorage.getItem('areaActual') as string)),[OTAreas])
    const OTColores:any = useAppSelector((store: AppStore) => store.OTS.derivacionColores) || JSON.parse(localStorage.getItem('OTColores') as string);
    const data:any = useAppSelector((store: AppStore) => store.OTS.data);
    
    const permissions = React.useCallback((area:number) => OTAreaActual &&  OTAreas["areas"].find((permiso:any)=>permiso[1] === area),[OTAreaActual, OTAreas])
  




    


    
    useEffect(()=>{
      const permiso = permissions(OTAreaActual)
      setOTPermissions( permiso && permiso[5])
    },[OTAreaActual, OTAreas, permissions])

    
    useEffect(() => {
        indicesOT.value = Array.from(data, (_, index) => index);
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
    },[]);




    

    const renderTextCell = useCallback((text: string, alignment?:string, type?:number, color2?:boolean, rowData?:any, backgroundAtrasadas?:boolean, color?:any, lowArmazonesStock?:any) => {
      const cellStyle:any = {
        textAlign:alignment,
        color: (rowData &&  color2 &&  handleColorEstado(rowData[5]))
      }

      return(
        <Text // Combina estilos inline y de objeto
          variant="small" color="blue-gray" style={{ ...cellStyle }}  className={` gridText h-[2.7rem]  py-2  ${(backgroundAtrasadas && color || lowArmazonesStock && color2) ? '!text-white ' : 'text-black'} ${(type === 1 && color2) ? '': ( type === 1 ? '!text-black'  :'text-black')} ` }  >
          {text !== null && text !== undefined ? text.toString() : ""}
        </Text>
      )
    },[handleColorEstado]);



    React.useEffect(()=>{
      if(clearIndividualCheck.value === true){
        setSelectedRows([])
        clearIndividualCheck.value = false
      }
    },[clearIndividualCheck.value])




    const renderCheckboxCell = React.useCallback((id: number, folio:number, estado?:any) => {
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

        </>

      )
    },[selectedRows, handleSelectChecked, toggleEditModal, escritura_lectura])

  
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
                          handleSelectedCheckedAll(e, indicesOT.value)
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
              const folio             = rowData[1]
              let estado                = rowData[4]
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
                            backgroundColor: isOT ? (color2 ? ( handleColorEstado( rowData[5], 'background') ): "!bg-black") : ( color2 ? (handleColorEstado(rowData[1])) : ""),
                          }}
                        >
                          {col === 0
                            ? renderCheckboxCell(rowIndex, folio, estado)
                            : renderTextCell(row, '', type, color2, rowData,backgroundAtrasadas, color)
                          }
                        </td>
                      )
                    );
                  })}
                  
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

export default TableComponent2;


