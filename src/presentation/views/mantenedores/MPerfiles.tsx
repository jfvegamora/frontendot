/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils, usePermission } from "../../hooks";
import { TITLES, table_head_perfiles } from "../../utils";
import FPerfiles from "../forms/FPerfiles";

export enum EnumGrid {
  id = 0,
  cargo_id = 1,
  cargo = 2,
  funcionalidad_id = 3,
  funcionalidad = 4,
  permiso = 5,
}
const strEntidad = "perfil de cargo ";
const strEntidadExcel = "Perfil_de_cargos";
const strBaseUrl = "/api/perfiles/";
const strQuery = "01";
const idMenu   = 25;


const MPerfiles: React.FC = () => {
  const [params, setParams] = useState([]);
  const { escritura_lectura} = usePermission(idMenu || 0 );

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
  // console.log("entities:", entities);
  console.log("selectedRows", selectedRows);

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => 
     `{"pk1":"${entities[row][EnumGrid.cargo_id]}", "pk2":"${entities[row][EnumGrid.funcionalidad_id]}"}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width70">
        <div className="w-[60%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p2",
                label: "Cargo",
                type: "select",
                selectUrl: "/api/cargos/",
                styles:{
                  styles:"labelInput inputStyles w-full",
                  container:"!w-[35vw]  text-[1vw] translate-x-[1vw]", 
                  labelProps: "labelInput"
                }
              },
              {
                name: "_p3",
                label: "Funcionalidad",
                type: "select",
                selectUrl: "/api/funcionalidades/",
                styles:{
                  styles:"labelInput inputStyles w-full",
                  container:"!w-[35vw]  text-[1vw] translate-x-[3vw]", 
                  labelProps: "labelInput"
                }
              },
            ]}
            classNameSearchButton=" translate-x-[8vw]"
          />
        </div>


        <div className="w-[15%]">
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
              classname={"translate-x-[14vw] !w-[12vw]"}

            />
        </div>
      </div>

      <div className="width70 scroll">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          pkToDelete={pkToDelete}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_perfiles}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

  
      {isModalInsert && (
        <FPerfiles
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
        <FPerfiles
          label={`${TITLES.edicion} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MPerfiles;
