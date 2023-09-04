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
import { table_head_proveedores } from "../../utils";
import ProveedoresForm from "../forms/ProveedoresForm";
import { TITLES } from "../../utils/text_utils.ts";

export enum EnumGrid {
  ID = 1,
  Rut = 2,
  Nombre = 3,
  Direccion = 4,
  Telefono = 5,
  Correo = 6,
  Sitio_Web = 7,
}
const strEntidad = "Proveedor ";
const strEntidadExcel = "Proveedores";
const strBaseUrl = "/api/proveedores/";
const strQuery = "01";

const ProveedoresMantenedor: React.FC = () => {
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
      <h1 className="mantenedorH1">{TITLES.proveedores}</h1>

      <div className="mantenedorHead width70">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "RUT", type: "text" },
            { name: "_p3", label: "Nombre", type: "text" },
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

      <div className="width90">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_proveedores}
          showEditButton={true}
          showDeleteButton={true}
        />
      </div>

      {isModalInsert && (
        <ProveedoresForm
          label={`${TITLES.nuevo} ${strEntidad}`}
          closeModal={closeModal}
          selectedIds={selectedIds}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <ProveedoresForm
          label={`${TITLES.editar} ${strEntidad}`}
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

export default ProveedoresMantenedor;