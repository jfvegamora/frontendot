/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils, usePermission } from "../../hooks";
import FCristalesKardexIN from "../forms/FCristalesKardexIN";
import FCristalesKardexOUT from "../forms/FCristalesKardexOUT";
import { TITLES, table_head_kardex } from "../../utils";

export enum EnumGrid {
  fecha = 1,
  insumo = 2,
  descripcion = 3,
  almacen_id = 4,
  almacen = 5,
  es = 6,
  motivo_id = 7,
  motivo = 8,
  entradas = 9,
  salidas = 10,
  valor_neto = 11,
  proveedor_id = 12,
  proveedor = 13,
  numero_factura = 14,
  ot = 15,
  almacen_relacionado_id = 16,
  almacen_relacionado = 17,
  observaciones = 18,
}

const strEntidad = "Kardex de Cristal ";
const strEntidadExcel = "CristalesKardex";
const strBaseUrl = "/api/cristaleskardex/";
const strQuery = "01";
// const idMenu = 8;

const MCristalesKardex: React.FC = () => {
  const idMenu = React.useMemo(() => 8, []);

  const [params, setParams] = useState([]);

  const [kardexDescription, setKardexDescription] = useState("");
  // const { escritura_lectura} = usePermission(idMenu || 0 );
  const getPermissions = useCallback(
    () => usePermission(idMenu || 0),
    [idMenu]
  );
  const { escritura_lectura } = getPermissions();

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  const {
    //entities state
    entities,
    setEntities,
    entity,
    //modal methods
    isModalInsert,
    isModalEdit,
    toggleEditModal,
    openModal,
    closeModal,
    //Check methods
    handleSelect,
    selectedRows,
    setSelectedRows,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteSelected,
    resetEntities,
  } = useEntityUtils(strBaseUrl, strQuery);

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_pkToDelete"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) =>
        `{"pk1":"${entities[row][EnumGrid.insumo]}", "pk2":"${
          entities[row][EnumGrid.fecha]
        }"}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  useEffect(() => {
    if (entities) {
      setKardexDescription(entities[0]);
    }
  }, [entities]);

  const newTableHead = useMemo(() => {
    return table_head_kardex.map((column: any) => {
      if (
        !escritura_lectura &&
        ["valor_neto", "factura", "proveedor"].includes(column.key)
      ) {
        return { ...column, visible: false };
      }
      return column;
    });
    // .filter((col) => col.visible);
  }, [escritura_lectura]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100">
        <div className="w-[82%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            description={kardexDescription}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p5",
                label: "Motivo Ingreso",
                type: "select",
                selectUrl: "/api/kardexmotivos/",
                styles: {
                  styles: "labelInput inputStyles w-[22vw]",
                  container: " ",
                  labelProps: "labelInput inputStyles",
                },
                _p1: "01",
              },
              {
                name: "_p6",
                label: "Motivo Egreso",
                type: "select",
                selectUrl: "/api/kardexmotivos/",
                styles: {
                  styles: "labelInput inputStyles w-[22vw]",
                  container: " ",
                  labelProps: "labelInput ",
                },
                _p1: "02",
              },

              {
                name: "_p1",
                label: "Código",
                type: "text",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[20vw] ",
                  labelProps: "labelInput",
                },
              },

              {
                name: "_p4",
                label: "Almacenes",
                type: "select",
                selectUrl: "/api/almacenes/",
                styles: {
                  styles: "!w-[22vw]  labelInput inputStyles",
                  container: "",
                  labelProps: "labelInput",
                },
                _p1: "1",
              },
              {
                name: "_p2",
                label: "Desde",
                type: "date",
                styles: {
                  styles: "!w-[20vw] labelInput inputStyles",
                  container: "  ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p3",
                label: "Hasta",
                type: "date",
                styles: {
                  styles: "!w-[20vw] labelInput inputStyles",
                  container: " ",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[3vw]  !translate-y-[2.5vw]"
          />
        </div>

        <div className="w-[15%]">
          <PrimaryButtonsComponent
            handleAddPerson={openModal}
            handleDeleteSelected={handleDeleteSelected}
            toggleEditModal={toggleEditModal}
            handleRefresh={resetEntities}
            params={params}
            pkToDelete={pkToDelete}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            showAddButton={true}
            showExportButton={true}
            showDeleteButton={false}
            showImportCsv={false}
            showForwardButton={false}
            showRefreshButton={true}
            comilla={true}
            idMenu={idMenu}
            bln_egreso={true}
            classname={"translate-x-[-1vw]  !w-[19vw] translate-y-[2.5vw]"}
          />
        </div>
      </div>

      <div className="width100 !h-4/6  scroll">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
          pkToDelete={pkToDelete}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={entities}
          tableHead={newTableHead}
          showEditButton={false}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      {isModalInsert && (
        <FCristalesKardexIN
          label={`${TITLES.ingreso} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={false}
          description={kardexDescription}
          escritura_lectura={escritura_lectura}
        />
      )}

      {isModalEdit && (
        <FCristalesKardexOUT
          label={`${TITLES.egreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          description={kardexDescription}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MCristalesKardex;
