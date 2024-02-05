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
import { TITLES , table_head_motivos_ot } from "../../utils";
import FMotivosOTGarantia from "../forms/FMotivosOTGarantia";



const strEntidad = "Motivos de OT en Garantía ";
const strEntidadExcel = "Motivos_de_OT_Garantia";
const strBaseUrl = "/api/otmotivogarantia/";
const strQuery = "01";
const idMenu = 40;

export enum EnumGrid {
  ID = 1,
  descripcion = 2,
  area_id = 3,
  area = 4
}


const MMotivosOTGarantia: React.FC = () => {
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
        <div className="w-[50%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setParams={setParams}
            setEntities={setEntities}
            primaryKeyInputs={[{ name: "_p1", label: "Descripción", type: "text" }]}
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
          showDeleteButton={true}
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
          entidad={strEntidad}
          pkToDelete={pkToDelete}
          data={entities}
          tableHead={table_head_motivos_ot}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      {isModalInsert && (
        <FMotivosOTGarantia
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          escritura_lectura={escritura_lectura}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <FMotivosOTGarantia
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

export default MMotivosOTGarantia;