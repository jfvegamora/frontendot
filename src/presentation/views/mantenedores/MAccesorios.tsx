/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils } from "../../hooks";
import FAccesorios from "../forms/FAccesorios";
import { TITLES, table_head_accesorios } from "../../utils";

export enum EnumGrid {
  codigo = 1,
  descripcion = 2,
  proveedor_id = 3,
  proveedor = 4,
  precio_neto = 5,
  stock_minimo = 6,
}

const strEntidad = "Accesorio ";
const strEntidadExcel = "Accesorios";
const strBaseUrl = "/api/accesorios/";
const strQuery = "01";
const idMenu = 9;

type PrimaryKey = {
  pk1: number;
};
const MAccesorios: React.FC = () => {
  const [params, setParams] = useState([]);

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
  // console.log("entities:", entities);

  const pkToDelete: PrimaryKey[] = [];
  console.log("pkToDelete:", pkToDelete);

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      pk1: entities[row][EnumGrid.codigo],
    }));
    newPkToDelete.forEach((newPk: { pk1: any }) => {
      if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Accesorios</h1>

      <div className="mantenedorHead width80">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Código", type: "text" },
            { name: "_p2", label: "Descripción", type: "text" },
            {
              name: "_p3",
              label: "Proveedor",
              type: "select",
              selectUrl: "/api/proveedores/",
            },
          ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          handleRefresh={resetEntities}
          params={params}
          comilla={false}
          pkToDelete={pkToDelete}
          strEntidad={strEntidadExcel}
          strBaseUrl={strBaseUrl}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={true}
          idMenu={idMenu}
        />
      </div>

      <div className="scroll">
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
          tableHead={table_head_accesorios}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
        />
      </div>

      {isModalInsert && (
        <FAccesorios
          label={`${TITLES.nuevo} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <FAccesorios
          label={`${TITLES.editar} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
        />
      )}
    </div>
  );
};

export default MAccesorios;
