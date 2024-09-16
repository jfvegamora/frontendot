/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useCallback,
  Suspense,
  useMemo,
} from "react";
import { Stack, Text } from "@chakra-ui/react";
import { signal } from "@preact/signals-react";

import { usePermission } from "../hooks";
import {
  clearAllCheck,
  clearIndividualCheck,
  disabledIndividualCheck,
} from "../utils";
import { AppStore, useAppSelector } from "../../redux/store";

import { OTAreasEnum, OTGrillaEnum, PermisosBotones } from "../Enums";

import { usePermissionBotonesUser } from "../hooks/usePermissionBotonesUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const OTGrillaButtons = React.lazy(() => import("./OTGrillaButtons"));

const indicesOT = signal<any>([]);

interface ITableComponentProps {
  tableHead: {
    cell: JSX.Element | string;
    key: string;
    visible: boolean;
    width?: string;
    alignment?: string;
    color?: boolean;
    background?: boolean;
    excelIndividual?: boolean;
  }[];

  entidad: string;
  handleSelectChecked?: (id: number) => void;
  handleSelectedCheckedAll?: (event: any, rowsIds: any) => void;
  toggleEditOTModal?: (id: number, folio: any) => void;
  selectedRows?: number[];
  setSelectedRows?: any;
  idMenu: number;
  isOT?: boolean;
}

const TableComponent2: React.FC<ITableComponentProps> = React.memo(
  ({
    tableHead,
    entidad,
    handleSelectChecked,
    handleSelectedCheckedAll,
    toggleEditOTModal,
    selectedRows,
    setSelectedRows,
    idMenu,
    isOT,
  }) => {
    const { escritura_lectura, lectura } = usePermission(idMenu || 0);
    const [OTPermissions, setOTPermissions] = useState("");
    // const OTAreas: any = useAppSelector(
    //   (store: AppStore) =>
    //     store.OTAreas || JSON.parse(localStorage.getItem("OTAreas") as any)
    // );
    // const OTAreaActual: any = React.useCallback(
    //   useAppSelector(
    //     (store: AppStore) =>
    //       store.OTAreas["areaActual"] ||
    //       JSON.parse(localStorage.getItem("areaActual") as string)
    //   ),
    //   [OTAreas]
    // );
    // const OTColores: any =
    //   useAppSelector((store: AppStore) => store.OTS.derivacionColores) ||
    //   JSON.parse(localStorage.getItem("OTColores") as string);
    // const data: any = useAppSelector((store: AppStore) => store.OTS.data);

    const { OTAreaActual, OTAreas, OTColores, data } = useAppSelector(
      (state: AppStore) => ({
        OTAreaActual:
          state.OTAreas.areaActual ||
          JSON.parse(localStorage.getItem("OTAreas") || ""),
        OTAreas:
          state.OTAreas || JSON.parse(localStorage.getItem("areaActual") || ""),
        OTColores:
          state.OTS.derivacionColores ||
          JSON.parse(localStorage.getItem("OTColores") || ""),
        data: state.OTS.data,
      })
    );

    const permissions = React.useCallback(
      (area: number) =>
        OTAreaActual &&
        OTAreas["areas"].find((permiso: any) => permiso[1] === area),
      [OTAreaActual, OTAreas]
    );

    const { permiso_usuario_btn_check } = usePermissionBotonesUser();

    let permiso_area_check = React.useMemo(
      () =>
        OTPermissions && OTPermissions[PermisosBotones.check] === "1"
          ? true
          : false,
      [OTPermissions]
    );

    useEffect(() => {
      const permiso = permissions(OTAreaActual);
      setOTPermissions(permiso && permiso[6]);
    }, [OTAreaActual, OTAreas, permissions]);

    indicesOT.value = React.useMemo(
      () => Array.from(data, (_, index) => index),
      [data]
    );

    const handleColorEstado = useCallback(
      (rowData: any, background?: string) => {
        try {
          if (OTColores[rowData]) {
            return background
              ? `${
                  OTColores[rowData][1] === "#"
                    ? "#FFFFFF"
                    : OTColores[rowData][1]
                }`
              : `${OTColores[rowData][0]}`;
          }

          return background ? `black` : "red";
        } catch (error) {
          throw error;
        }
      },
      [OTColores]
    );

    const renderTextCell = useCallback(
      (
        text: string,
        alignment?: string,
        type?: number,
        color2?: boolean,
        rowData?: any,
        backgroundAtrasadas?: boolean,
        color?: any,
        lowArmazonesStock?: any
      ) => {
        const cellStyle: any = {
          textAlign: alignment,
          color: rowData && color2 && handleColorEstado(rowData[5]),
          // color: rowData && color2 && "red",
          backgroundColor:
            rowData && color2 && handleColorEstado(rowData[5], "background"),
        };

        return (
          <Text // Combina estilos inline y de objeto
            variant="small"
            color="blue-gray"
            style={{ ...cellStyle }}
            className={` gridText h-[2.7rem]  py-2  ${
              (backgroundAtrasadas && color) || (lowArmazonesStock && color2)
                ? "!text-white "
                : "text-black"
            } ${
              type === 1 && color2
                ? ""
                : type === 1
                ? "!text-black"
                : "text-black"
            } `}
          >
            {text !== null && text !== undefined ? text.toString() : ""}
          </Text>
        );
      },
      [handleColorEstado]
    );
    const renderCjeckValidateCell = useCallback(
      (
        text: string
        // alignment?: string,
        // color2?: boolean,
        // rowData?: any
      ) => {
        // const cellStyle: any = {
        //   textAlign: alignment,
        //   color: rowData && color2 && handleColorEstado(rowData[5]),
        //   // color: rowData && color2 && "red",
        //   backgroundColor:
        //     rowData && color2 && handleColorEstado(rowData[5], "background"),
        // };

        const validateArmazon = text && text[0] === "1" ? true : false;
        const validateCristal = text && text[1] === "1" ? true : false;

        return (
          // <Text // Combina estilos inline y de objeto
          //   variant="small"
          //   color="blue-gray"
          //   style={{ ...cellStyle }}
          //   className={` gridText h-[2.7rem]  py-2  ${
          //     color2 ? "!text-white " : "text-black"
          //   }`}
          // >
          //   {text !== null && text !== undefined ? text.toString() : ""}
          // </Text>
          <Stack
            direction={"row"}
            className="flex justify-around aria-disabled cursor-not-allowed"
          >
            {/* <Checkbox
              color={validateArmazon ? "green" : "gray"}
              defaultChecked
              aria-disabled
              disabled={true}
              className="cursor-not-allowed !h-6"
            />
            <Checkbox
              color={validateCristal ? "green" : "gray"}
              defaultChecked
              disabled={true}
              className="cursor-not-allowed !h-6"
            /> */}
            <FontAwesomeIcon
              icon={faCheck}
              size="2xl"
              style={
                validateArmazon
                  ? { color: "#04db00" }
                  : { color: "rgb(0,0,0, 0.3)" }
              }
            />
            <FontAwesomeIcon
              icon={faCheck}
              size="2xl"
              style={
                validateCristal
                  ? { color: "#04db00" }
                  : { color: "rgb(0,0,0, 0.3)" }
              }
            />
          </Stack>
        );
      },
      [handleColorEstado, OTAreaActual]
    );

    React.useEffect(() => {
      if (clearIndividualCheck.value === true) {
        setSelectedRows([]);
        clearIndividualCheck.value = false;
      }
    }, [clearIndividualCheck.value]);

    const renderCheckboxCell = React.useCallback(
      (id: number, folio: number, estado?: any) => {
        return (
          <>
            <input
              checked={selectedRows && selectedRows.includes(id)}
              onChange={() => {
                if (clearAllCheck.value && selectedRows?.includes(id)) {
                  const newSelectedRows = selectedRows?.filter(
                    (checkId: number) => checkId !== id
                  );

                  return setSelectedRows(newSelectedRows);
                }
                handleSelectChecked && handleSelectChecked(id);
              }}
              type="checkbox"
              disabled={
                disabledIndividualCheck.value ||
                !(permiso_usuario_btn_check && permiso_area_check)
              }
              className="mx-6"
            />
            <Suspense>
              <OTGrillaButtons
                id={id}
                folio={folio}
                toggleEditOTModal={toggleEditOTModal}
                entidad={entidad}
                historica={
                  entidad === "Orden de Trabajo Histórico" ? true : false
                }
                estado={estado}
              />
            </Suspense>
          </>
        );
      },
      [
        selectedRows,
        handleSelectChecked,
        toggleEditOTModal,
        escritura_lectura,
        permiso_area_check,
        permiso_usuario_btn_check,
      ]
    );

    // if (!data || data.length === 0) return null;

    const dinamicTableHead = useMemo(() => {
      return tableHead.map((th: any) => {
        const updatedTh = { ...th };

        if (OTAreaActual === OTAreasEnum["Bodega Insumos"]) {
          if (updatedTh.key === "validation_armazon_cristal") {
            updatedTh.visible = true;
          }
        } else {
          // Cuando no estamos en "Bodega Insumos", aseguramos que el visible sea false
          if (updatedTh.key === "validation_armazon_cristal") {
            updatedTh.visible = false;
          }
        }

        return updatedTh;
      });
    }, [OTAreaActual]);

    console.log(dinamicTableHead);

    return (
      <div className="gridCointainer">
        <table className="gridContainer">
          <thead className="gridTop">
            <tr>
              {tableHead &&
                tableHead.map((column, index) => {
                  const isVisible =
                    column.visible &&
                    (column.key !== "checkbox" || escritura_lectura || lectura);
                  return (
                    isVisible && (
                      <th
                        key={index}
                        className={`gridHead   ${column.width || "w-auto"}`}
                      >
                        {column.key === "checkbox" ? (
                          <input
                            className="checkTable"
                            type="checkbox"
                            disabled={
                              !(permiso_usuario_btn_check && permiso_area_check)
                            }
                            checked={clearAllCheck.value}
                            onChange={(e) => {
                              clearAllCheck.value = !clearAllCheck.value;
                              handleSelectedCheckedAll &&
                                handleSelectedCheckedAll(e, indicesOT.value);
                            }}
                          />
                        ) : (
                          renderTextCell(column.cell as string)
                        )}
                      </th>
                    )
                  );
                })}
            </tr>
          </thead>
          <tbody className="gridData">
            {data && data.length > 0 ? (
              data.map((rowData: any, rowIndex: any) => {
                const folio = rowData[1];
                let estado = rowData[4];
                return (
                  <tr key={rowIndex} className="overflow-hidden">
                    {rowData.map((row: any, col: any) => {
                      const visible = tableHead?.[col]?.visible || false;
                      const alignment = tableHead?.[col]?.alignment || "";
                      const color2 = tableHead?.[col]?.color || false;
                      const backgroundAtrasadas =
                        tableHead?.[col]?.background || false;
                      const color = isOT
                        ? rowData[OTGrillaEnum.por_vencer] === "S" &&
                          (rowData[OTGrillaEnum.estado_id] !== 10 ||
                            rowData[OTGrillaEnum.estado_id] !== 20 ||
                            rowData[OTGrillaEnum.estado_id] !== 30 ||
                            rowData[OTGrillaEnum.estado_id] !== 40)
                          ? "bg-black"
                          : rowData[OTGrillaEnum.motivo] === 2
                          ? "bg-green-500"
                          : ""
                        : "";

                      const type = color === "bg-black" ? 1 : 0;

                      return (
                        visible && (
                          <td
                            className={`gridTableData  ${
                              backgroundAtrasadas && color
                            }   ${alignment} ${""}`}
                            key={col}
                            id={tableHead[col].key}
                            style={{
                              backgroundColor: isOT
                                ? color2
                                  ? handleColorEstado(rowData[5], "background")
                                  : "!bg-black"
                                : color2
                                ? handleColorEstado(rowData[1])
                                : "",
                            }}
                          >
                            {col === 0
                              ? renderCheckboxCell(rowIndex, folio, estado)
                              : col === OTGrillaEnum["validado"]
                              ? renderCjeckValidateCell(row)
                              : renderTextCell(
                                  row,
                                  "",
                                  type,
                                  color2,
                                  rowData,
                                  backgroundAtrasadas,
                                  color
                                )}
                          </td>
                        )
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr className="h-full"></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

export default TableComponent2;
