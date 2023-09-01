/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import { useEntityUtils } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { table_head_cargos } from "../../utils";
import CargosForm from "../forms/CargosForm";

const strEntidad = "Cargo ";
const strEntidadExcel = "Cargos";
const strBaseUrl = "/api/cargos/";
const strQuery = "01";

const CargosMantenedor: React.FC = () => {
  // const { createdEntity, editEntity } = useCrud(strBaseUrl);
  const [params, setParams] = useState([]);

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  const {
    //Entities State
    entities,
    entity,
    setEntities,
    selectedRows,
    setSelectedRows,
    //Modal Methds
    openModal,
    closeModal,
    isModalInsert,
    isModalEdit,
    toggleEditModal,

    //Check/Buttons Methods
    handleDeleteSelected,
    handleSelect,
    handleSelectedAll,
    resetEntities,
  } = useEntityUtils(strBaseUrl, strQuery);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Cargos</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          updateParams={updateParams}
          setParams={setParams}
          setEntities={setEntities}
          primaryKeyInputs={[{ name: "_p1", label: "Cargo", type: "text" }]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          handleRefresh={resetEntities}
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
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_cargos}
          showEditButton={true}
          showDeleteButton={true}
        />
      </>

      {isModalInsert && (
        <CargosForm
          label={`Crear ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}
      {isModalEdit && (
        <CargosForm
          label={`Editar ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          data={entity}
          params={params}
          isEditting={true}
        />
      )}
    </div>
  );
};

export default CargosMantenedor;
