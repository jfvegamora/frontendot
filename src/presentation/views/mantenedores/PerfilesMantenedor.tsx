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
import UserForm from "../forms/PerfilesForm";
import { table_head_perfiles } from "../../utils";
import PerfilesForm from "../forms/PerfilesForm";

export enum EnumGrid {
  id = 0,
  cargo_id = 1,
  cargo = 2,
  funcionalidad_id = 3,
  funcionalidad = 4,
  permiso = 5,
}
const strEntidad = "perfil de cargo ";
const strEntidadExcel = "Perfil_de_cargos";
const strBaseUrl = "/api/perfiles/";
const strQuery = "01";

const PerfilesMantenedor: React.FC = () => {
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
    handlePageSize,
  } = useEntityUtils(strBaseUrl, strQuery);
  // console.log("entities:", entities);
  console.log("selectedRows", selectedRows);

  const pkToDelete: never[] = [];

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row) => ({
      pk1: entities[row][EnumGrid.cargo_id],
      pk2: entities[row][EnumGrid.funcionalidad_id],
    }));
    newPkToDelete.forEach((newPk) => {
      if (
        !pkToDelete.some(
          (existingPk) =>
            existingPk.pk1 === newPk.pk1 && existingPk.pk2 === newPk.pk2
        )
      ) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  console.log("newObject:", pkToDelete);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Perfiles de Cargo</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            {
              name: "_p2",
              label: "Cargo",
              type: "select",
              selectUrl: "/api/cargos/",
            },
            {
              name: "_p3",
              label: "Funcionalidad",
              type: "select",
              selectUrl: "/api/funcionalidades/",
            },
          ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          handleRefresh={resetEntities}
          handlePageSize={handlePageSize}
          params={params}
          strEntidad={strEntidadExcel}
          strBaseUrl={strBaseUrl}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={true}
        />
      </div>

      <>
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          pkToDelete={pkToDelete}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_perfiles}
          showEditButton={true}
          showDeleteButton={true}
        />
      </>

      {isModalInsert && (
        <PerfilesForm
          label={`Crear ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <PerfilesForm
          label={`Editar ${strEntidad}`}
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

export default PerfilesMantenedor;
