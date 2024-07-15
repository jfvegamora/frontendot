/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useEntityUtils, usePermission } from "../../hooks";
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
const idMenu   = 23;

export enum EnumGrid {
  ID = 1,
  nombre = 2,
}

const MCargos: React.FC = () => {
  // const { createdEntity, editEntity } = useCrud(strBaseUrl);
  const [params, setParams] = useState([]);
  const { escritura_lectura} = usePermission(idMenu || 0 );

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

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.ID]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width50">
        <div className="w-[40%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setParams={setParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Funcionalidad", type: "text", 
                styles:{
                  with: "!h-[2.5vw] !text-[1vw] w-full",
                  container:"w-[35vw] !text-[2vw] translate-y-[-0.2vw]", 
                  labelProps: "-!translate-y-[-2vw] !text-[1.2vw] !font-[2vw]"
                } },
            ]}
            classNameSearchButton="translate-x-[12vw] translate-y-[0.2vw]"
          />
        </div>

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
          showDeleteButton={false}
          showForwardButton={false}
          showRefreshButton={true}
          idMenu={idMenu}
        />
      </div>

      <div className="width50 scroll">
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
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

   

      {isModalInsert && (
        <FFuncionalidad
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          escritura_lectura={escritura_lectura}
        />
      )}
      {isModalEdit && (
        <FFuncionalidad
          label={`${TITLES.edicion} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          data={entity}
          params={params}
          isEditting={true}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MCargos;
