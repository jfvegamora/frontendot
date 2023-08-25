/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { useEntityUtils } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { table_head_cargos } from "../../utils";
import CargosForm, { ICargosInputData } from "../forms/CargosForm";

const strEntidad = "Cargo ";
const strBaseUrl = "/api/cargos/";
const strQuery = "01";

const CargosMantenedor: React.FC = () => {
  // const { createdEntity, editEntity } = useCrud(strBaseUrl);

  const {
    //Entities State
    entities,
    entity,
    setEntities,
    selectedIds,
    setSelectedIds,
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
  } = useEntityUtils(strBaseUrl, strQuery);

  const handleSaveChange = React.useCallback(
    (data: ICargosInputData, isEditting: boolean) => {
      console.log("data cargos:", data);
      console.log("data cargos:", isEditting);
    },
    []
  );

  console.log("entities:", entities);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Cargos</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setState={setEntities as React.Dispatch<React.SetStateAction<any[]>>}
          primaryKeyInputs={[{ name: "_p1", label: "Cargo", type: "text" }]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={true}
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
          tableHead={table_head_cargos}
          showEditButton={true}
          showDeleteButton={true}
        />
      </>

      {isModalInsert && (
        <CargosForm
          label={`Crear ${strEntidad}`}
          handleChange={(data) => handleSaveChange(data, false)}
          closeModal={closeModal}
          isEditting={false}
        />
      )}
      {isModalEdit && (
        <CargosForm
          label={`Editar ${strEntidad}`}
          handleChange={(data) => handleSaveChange(data, true)}
          closeModal={closeModal}
          data={entity}
          isEditting={true}
        />
      )}
    </div>
  );
};

export default CargosMantenedor;
