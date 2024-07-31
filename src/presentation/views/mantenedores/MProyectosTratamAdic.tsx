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
import { TITLES, table_head_proyectos_tratam_adic } from "../../utils";
import FProyectosTratamAdic from "../forms/FProyectosTratamAdic";

export enum EnumGrid {
  check                     = 0,
  proyecto_id               = 1,
  proyecto                  = 2,
  tratamiento_adicional_id  = 3,
  tratamiento_adicional     = 4,
  valor_neto                = 5,
}
const strEntidad = "Parametrización Tratamiento Adicional ";
const strEntidadExcel = "parametrizacion_tratamiento_adicional";
const strBaseUrl = "/api/proyectotratamadic/";
const strQuery = "01";
const idMenu   = 43;


const MProyectosTratamAdic: React.FC = () => {
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

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => 
     `{"proyecto":"${entities[row][EnumGrid.proyecto_id]}", "tratamiento_adicional":"${entities[row][EnumGrid.tratamiento_adicional_id]}"}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width70">
        <div className="w-[60%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p2",
                label: "Proyecto",
                type: "select",
                selectUrl: "/api/proyectos/",
                styles:{
                  styles:"labelInput inputStyles w-[30vw]",
                  container:"!w-[30vw]  text-[1vw]  translate-y-[0.3rem] ", 
                  labelProps: "labelInput"
                }
              },
              {
                name: "_p3",
                label: "Tratamiento ",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "OTTratamientoAdicional", 
                styles: { 
                  styles:"labelInput inputStyles w-full",
                  container:"!w-[40vw]  text-[1vw] translate-x-[12vw] translate-y-[0.3rem] ", 
                  labelProps: "labelInput"
                },
              },
            ]}
             classNameSearchButton=" translate-x-[14vw]"
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
            showExportButton={false}
            showDeleteButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[18vw] !w-[9vw] "}

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
          tableHead={table_head_proyectos_tratam_adic}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
            
   

       {isModalInsert && (
        <FProyectosTratamAdic
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
        <FProyectosTratamAdic
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

export default MProyectosTratamAdic;
