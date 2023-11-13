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
import FEstablecimientos from "../forms/FEstablecimientos";
import { TITLES, table_head_establecimientos } from "../../utils";

export enum EnumGrid {
  id = 1,
  nombre = 2,
  tipo_id = 3,
  tipo = 4,
  mandante_id = 5,
  mandante = 6,
  region_id = 7,
  region = 8,
  provincia_id = 9,
  provincia = 10,
  comuna_id = 11,
  comuna = 12,
}

const strEntidad = "Establecimiento ";
const strEntidadExcel = "Establecimientos";
const strBaseUrl = "/api/establecimientos/";
const strQuery = "01";
const idMenu = 3;



const MEstablecimientos: React.FC = () => {
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

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.id]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  console.log('entities', entities)
  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width80">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Establecimiento", type: "text" },
            {
              name: "_p2",
              label: "Mandante",
              type: "select",
              selectUrl: "/api/mandantes/",
            },
            {
              name      : "_p3",
              label     : "Tipo",
              type      : "select",
              selectUrl : "/api/tipos/",
              tipos     : "EstablecimientosTipos"
            },
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
          comilla={false}
          idMenu={idMenu}
        />
      </div>

      <div className="width80 scroll">
        {<TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
          pkToDelete={pkToDelete}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_establecimientos}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
        /> }
      </div>



      {isModalInsert && (
      <FEstablecimientos
        label={`${TITLES.ingreso} ${strEntidad}`}
        closeModal={closeModal}
        selectedRows={selectedRows}
        setEntities={setEntities}
        params={params}
        isEditting={false}
      />
      )}

      {isModalEdit && (
        <FEstablecimientos
          label={`${TITLES.edicion} ${strEntidad}`}
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

export default MEstablecimientos;
