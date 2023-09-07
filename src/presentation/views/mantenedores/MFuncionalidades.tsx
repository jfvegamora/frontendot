/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useEntityUtils } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { TITLES, table_head_funcionalidades } from "../../utils";
import FFuncionalidad from "../forms/FFuncionalidades";
// import FCargos, { ICargosInputData } from "../forms/FCargos";

const strEntidad = "Funcionalidad ";
const strEntidadExcel = "Funcionalidades";
const strBaseUrl = "/api/funcionalidades/";
const strQuery = "01";
export enum EnumGrid {
  ID = 1,
  nombre = 2,
}
type PrimaryKey = {
  pk1: number;
};
const MCargos: React.FC = () => {
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

  const pkToDelete: PrimaryKey[] = [];

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row) => ({
      pk1: entities[row][EnumGrid.ID],
    }));
    newPkToDelete.forEach((newPk) => {
      if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Funcionalidades</h1>

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
          pkToDelete={pkToDelete}
          strEntidad={strEntidadExcel}
          strBaseUrl={strBaseUrl}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={true}
        />
      </div>

      <div className="width70">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          pkToDelete={pkToDelete}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_funcionalidades}
          showEditButton={true}
          showDeleteButton={false}
        />
      </div>

      {isModalInsert && (
        <FFuncionalidad
          label={`${TITLES.nueva} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}
      {isModalEdit && (
        <FFuncionalidad
          label={`${TITLES.editar} ${strEntidad}`}
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

export default MCargos;
