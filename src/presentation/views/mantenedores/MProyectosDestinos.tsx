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
import { TITLES, table_head_proyectos_destinos } from "../../utils";
import FProyectosDestinos from "../forms/FProyectosDestinos";
import StateCountBar from "../../components/StateCountBar";
// import FProyectosDireccionesCopiar from "../forms/FProyectosDireccionesCopiar";

const strEntidad = "Destinos ";
const strEntidadExcel = "Destinos";
const strBaseUrl = "/api/proyectodestinos/";
const strQuery = "01";
const idMenu = 18;

export enum EnumGrid {
  id = 1,
  descripcion = 2,
  direccion = 3,
  contacto = 4,
  telefono = 5,
  correo = 6,
  proyecto_codigo = 7,
  proyecto = 8,
  observaciones = 9,
}

const MProyectosDestinos: React.FC = () => {
  const [params, setParams] = useState([]);
  const { escritura_lectura } = usePermission(idMenu || 0);

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
    // isModalCopiar,
    toggleEditModal,
    toggleModalCopiar,
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

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_p1"; // _p3/_p1/_pkToDelete

  // useEffect(() => {
  //   const newPkToDelete = selectedRows.map((row: number) =>
  //    `{"pk1":"${entities[row][EnumGrid.proyecto]}", "pk2":"${entities[row][EnumGrid.establecimiento_id]}"}`);
  //   const combinedPks = newPkToDelete.join(',');

  //   setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  // }, [selectedRows]);

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) => `${entities[row][EnumGrid.id]}`
    );
    const combinedPks = newPkToDelete.join(",");

    if (newPkToDelete.length === 0) {
      setPkToDelete([]);
    } else {
      setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
    }
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width90">
        <div className="w-[65%] mantenedorHeadSub">
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
                styles: {
                  styles: "labelInput inputStyles w-[30vw]",
                  container: "!w-[30vw]  text-[1vw] translate-x-[0.5vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p1",
                label: "Descripción",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "w-[15vw] !text-[2vw] translate-x-[12vw]",
                  labelProps: "labelInput",
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
            handleCopiar={toggleModalCopiar}
            params={params}
            pkToDelete={pkToDelete}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            showAddButton={true}
            // showCopiar={true}
            showPDFButton={true}
            showExportButton={true}
            showDeleteButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[15vw]  !w-[15vw]"}
          />
        </div>
      </div>

      <div className="width90 overflow-y-auto h-[30vw]">
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
          strBaseUrl={strBaseUrl}
          tableHead={table_head_proyectos_destinos}
          showEditButton={true}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
      <StateCountBar entities={entities} idMenu={idMenu} />

      {isModalInsert && (
        <FProyectosDestinos
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
        <FProyectosDestinos
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

      {/* {isModalCopiar && (
        <FProyectosDireccionesCopiar
          label={`${TITLES.copiar} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          escritura_lectura={escritura_lectura}
        />
      )} */}
    </div>
  );
};

export default MProyectosDestinos;
