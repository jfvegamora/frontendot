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
import { TITLES, table_head_tratamientos_adicionales } from "../../utils";
import FTratamientosAdicionales from "../forms/FTratamientosAdicionales";
import { handleContainerClick } from "../../pages/LandingPage";



const strEntidad = "Tratamientos Adicionales ";
const strEntidadExcel = "TratamientosAdicionales";
const strBaseUrl = "/api/tratamientosadicionales/";
const strQuery = "01";
const idMenu = 45;

  export enum EnumGrid {
    ID = 1,
    descripcion = 2,
  }

const MTratamientosAdicionales: React.FC = () => {
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
    <div className="mantenedorContainer" onClick={handleContainerClick}>
      <div className="mantenedorHead width50">
        <div className="w-[40%] mantenedorHeadSub">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_p1", label: "Descripción", type: "text", 
                  styles:{
                    with: "labelInput inputStyles w-full",
                    container:"!w-[35vw]  text-[1vw] translate-x-[2vw]", 
                    labelProps: "labelInput"
                  } 
                }]}
              classNameSearchButton="translate-x-[9vw]"
            />
        </div>

        <div className="w-[15vw]">
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
              classname={"translate-x-[18vw]  !w-[10vw]"}

            />
        </div>

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
          tableHead={table_head_tratamientos_adicionales}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
      

      {isModalInsert && (
        <FTratamientosAdicionales
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
        <FTratamientosAdicionales
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

export default MTratamientosAdicionales;
