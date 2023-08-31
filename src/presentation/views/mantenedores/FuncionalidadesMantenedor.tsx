/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useEntityUtils } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { table_head_funcionalidades } from "../../utils";
import FuncionalidadForm from "../forms/FuncionalidadForm";
// import CargosForm, { ICargosInputData } from "../forms/CargosForm";

const strEntidad = "Funcionalidades ";
const strEntidadExcel = "Funcionalidades";
const strBaseUrl = "/api/funcionalidades/";
const strQuery = "01";

const CargosMantenedor: React.FC = () => {
  // const { createdEntity, editEntity } = useCrud(strBaseUrl);
  const [params, setParams] = useState([]);

  const updateParams = (newParams: any) => {
    setParams(newParams);
  };

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
    resetEntities,
  } = useEntityUtils(strBaseUrl, strQuery);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Funcionalidades</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          updateParams={updateParams}
          setParams={setParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Funcionalidad", type: "text" },
            // {
            //   name: "_p2",
            //   label: "Funcionalidad2",
            //   type: "select",
            //   selectUrl: "/api/usuarios/",
            // },
          ]}
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
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_funcionalidades}
          showEditButton={true}
          showDeleteButton={true}
        />
      </>

      {isModalInsert && (
        <FuncionalidadForm
          label={`Crear ${strEntidad}`}
          closeModal={closeModal}
          selectedIds={selectedIds}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}
      {isModalEdit && (
        <FuncionalidadForm
          label={`Editar ${strEntidad}`}
          closeModal={closeModal}
          selectedIds={selectedIds}
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
