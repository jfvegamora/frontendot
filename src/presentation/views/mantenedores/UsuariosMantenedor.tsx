/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils } from "../../hooks";
import UserForm from "../forms/UserForm";
import { table_head_usuarios } from "../../utils";

export enum EnumGrid {
  ID = 1,
  Nombre = 2,
  Telefono = 3,
  Correo = 4,
  Estado = 5,
  Cargo_id = 6,
  Cargo = 7,
}
const strEntidad = "Usuario ";
const strEntidadExcel = "Usuarios";
const strBaseUrl = "/api/usuarios/";
const strListUrl = "/api/cargos/";
const strQuery = "01";

const UsuariosMantenedor: React.FC = () => {
  const [params, setParams] = useState([]);

  const updateParams = (newParams: any) => {
    setParams(newParams);
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
    selectedIds,
    setSelectedIds,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteSelected,
    resetEntities,
    handlePageSize,
  } = useEntityUtils(strBaseUrl, strQuery);
  // console.log("entities:", entities);

  // console.log("params:", params);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Usuarios</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          selectUrl={strListUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Nombre", type: "text" },
            { name: "_p2", label: "Cargos", type: "select" },
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
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_usuarios}
          showEditButton={true}
          showDeleteButton={true}
        />
      </>

      {isModalInsert && (
        <UserForm
          label={`Crear ${strEntidad}`}
          closeModal={closeModal}
          selectedIds={selectedIds}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <UserForm
          label={`Editar ${strEntidad}`}
          selectedIds={selectedIds}
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

export default UsuariosMantenedor;
