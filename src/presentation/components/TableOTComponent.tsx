/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Suspense, useCallback } from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { usePermission } from "../hooks";
import { BUTTON_MESSAGES, clearAllCheck, clearIndividualCheck, disabledIndividualCheck } from "../utils";
import { AppStore, useAppSelector } from "../../redux/store";
import { OTGrillaEnum } from "../Enums";

const OTGrillaButtons = React.lazy(() => import("./OTGrillaButtons"));

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

const TableOTComponent: React.FC<ITableComponentProps<any>> = React.memo(
  ({
    tableHead,
    entidad,
    handleSelectChecked,
    handleSelectedCheckedAll,
    toggleEditModal,
    toggleEditOTModal,
    selectedRows,
    setSelectedRows,
    showEditButton,
    idMenu,
    leftEdit,
  }) => {
    const { escritura_lectura, lectura } = usePermission(idMenu || 0);
    const [rowIds, setRowIds] = useState<number[]>([]);
    const [OTPermissions, setOTPermissions] = useState("");
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
    const data: any = useAppSelector((store: AppStore) => store.OTS.data);
    const OTColores: any = useAppSelector((store: AppStore) => store.OTS.derivacionColores) || JSON.parse(localStorage.getItem('OTColores') as string);
    const areaActual = OTAreas["areaActual"];
    const permissions = (area: number) => areaActual && OTAreas["areas"].find((permiso: any) => permiso[1] === area);

    useEffect(() => {
      const permiso = permissions(areaActual);
      setOTPermissions(permiso && permiso[5]);
    }, [areaActual, permissions]);

    useEffect(() => {
      if (data) {
        const newRowIds = Array(data.length)
          .fill(0)
          .map((_, index) => index);
        setRowIds(newRowIds);
      }
    }, [data]);

    const handleColorEstado = useCallback((rowData: any, background?: string) => {
      try {
        if (OTColores[rowData]) {
          return background ? `${OTColores[rowData][1]}` : `${OTColores[rowData][0]}`;
        }
        return background ? `black` : 'red';
      } catch (error) {
        throw error;
      }
    }, [OTColores]);

    const renderTextCell = useCallback((text: string, alignment?: string, type?: number, color2?: boolean, rowData?: any, backgroundAtrasadas?: boolean, color?: any, lowArmazonesStock?: any) => {
      const cellStyle = {
        textAlign: alignment,
        color: (rowData && handleColorEstado(rowData[5])),
      };

      return (
        <Typography variant="small" color="blue-gray" className={`gridText h-[2.7rem] py-2 ${(backgroundAtrasadas && color || lowArmazonesStock && color2) ? '!text-white ' : 'text-black'} ${(type === 1 && color2) ? '' : (type === 1 ? '' : 'text-black')}`} style={color2 ? cellStyle : null}>
          {text !== null && text !== undefined ? text.toString() : ""}
        </Typography>
      );
    }, [handleColorEstado]);

    let lowArmazonesStock = false;

    useEffect(() => {
      if (clearIndividualCheck.value === true) {
        setSelectedRows([]);
        clearIndividualCheck.value = false;
      }
    }, [clearIndividualCheck.value]);

    const renderCheckboxCell = (id: number, folio: number, estado?: any) => {
      return (
        <>
          <input
            checked={
              selectedRows && selectedRows.includes(id)
            }
            onChange={() => {
              if (clearAllCheck.value && selectedRows?.includes(id)) {
                const newSelectedRows = selectedRows?.filter((checkId: number) => checkId !== id);
                return setSelectedRows(newSelectedRows);
              }
              handleSelectChecked && handleSelectChecked(id);
            }}
            type="checkbox"
            disabled={disabledIndividualCheck.value}
            className="mx-6"
          />

          {leftEdit && showEditButton && escritura_lectura && (
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

            <OTGrillaButtons
              areaPermissions={OTPermissions}
              id={id}
              folio={folio}
              toggleEditOTModal={toggleEditOTModal}
              entidad={entidad}
              historica={entidad === 'Orden de Trabajo Histórico' ? true : false}
              estado={estado}
            />
        </>
      );
    };

    const TableGrid = () => {
      // Verifica que data y rowData estén definidos
      if (!data || !data.length) return null;
        data.slice(0,200)

      return (
        <>
          {data.map((rowData: any, rowIndex: number) => {
            // Asume que rowData es un array de valores para una fila
            return (
              <tr key={rowIndex} className="">
                {rowData.map((cellData: any, colIndex: number) => {
                  const columnConfig = tableHead?.[colIndex];
                  const visible = columnConfig?.visible || false;
                  const alignment = columnConfig?.alignment || "";
                  const color2 = columnConfig?.color || false;
                  const backgroundAtrasadas = columnConfig?.background || false;
    
                  const color = (
                    rowData[OTGrillaEnum.por_vencer] === 'S' &&
                    (rowData[OTGrillaEnum.estado_id] === 10 ||
                      rowData[OTGrillaEnum.estado_id] === 20 ||
                      rowData[OTGrillaEnum.estado_id] === 30 ||
                      rowData[OTGrillaEnum.estado_id] === 40
                    )
                  ) ? "bg-black" : "";
    
                  const type = color === 'bg-black' ? 1 : 0;
    
                  return (
                    visible && (
                      <td
                        key={colIndex}
                        className={`gridTableData ${backgroundAtrasadas && color} ${alignment}`}
                        style={{
                          backgroundColor: color2 ? handleColorEstado(rowData[5], 'background') : "",
                        }}
                      >
                        {colIndex === 0
                          ? renderCheckboxCell(rowData[0], rowData[1], rowData[4])
                          : renderTextCell(cellData, '', type, color2, rowData, backgroundAtrasadas, color, lowArmazonesStock)}
                      </td>
                    )
                  );
                })}
              </tr>
            );
          })}
        </>
      );
    };
    

    return (
      <div className="gridContainer">
        <table className="gridTable">
          <thead className="gridTop">
            <tr>
              {tableHead &&
                tableHead.map((column, index) => {
                  const isVisible =
                    column.visible && (column.key !== "checkbox" || escritura_lectura || lectura);
                  return isVisible && (
                    <th key={index} className={`gridHead ${column.width || 'w-auto'}`}>
                      {column.key === "checkbox" ? (
                        <input className="checkTable"
                          type="checkbox"
                          checked={clearAllCheck.value}
                          onChange={(e) => {
                            clearAllCheck.value = !clearAllCheck.value;
                            handleSelectedCheckedAll &&
                              handleSelectedCheckedAll(e, rowIds);
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
                
            {TableGrid()}
  
          </tbody>
        </table>

        
      </div>
    );
  }
);

export default TableOTComponent;
