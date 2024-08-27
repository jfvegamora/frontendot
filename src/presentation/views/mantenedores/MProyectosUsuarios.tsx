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
import { TITLES, table_head_proyectos_usuarios } from "../../utils";
import FProyectosUsuarios from "../forms/FProyectosUsuarios";
import FProyectosUsuariosCopiar from "../forms/FProyectosUsuariosCopiar";

export enum EnumGrid {
  codigo_proyecto = 1,
  titulo_proyecto = 2,
  punto_venta_id = 3,
  punto_venta = 4,
  usuario_id = 5,
  usuario = 6,
  estado = 7,
}

const strEntidad = "Parametrización de Usuarios ";
const strEntidadExcel = "Parametrizacion_de_usuarios";
const strBaseUrl = "/api/proyectousuarios/";
const strQuery = "01";
const idMenu = 34;

const MProyectosUsuarios: React.FC = () => {
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
    isModalCopiar,
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
  // console.log("selectedRows", selectedRows);

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_pkToDelete"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) =>
        `{"pk1":"${entities[row][EnumGrid.codigo_proyecto]}", "pk2":"${
          entities[row][EnumGrid.punto_venta_id]
        }", "pk3":"${entities[row][EnumGrid.usuario_id]}"}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width90">
        <div className="w-[75%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Proyecto",
                type: "select",
                selectUrl: "/api/proyectos/",
                styles: {
                  styles: "labelInput inputStyles w-[20vw]",
                  container: "!w-[23vw]  text-[1vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p2",
                label: "Punto de Venta",
                type: "select",
                selectUrl: "/api/puntosventa/",
                styles: {
                  styles: "labelInput inputStyles w-[20vw]",
                  container: "!w-[25vw]  text-[1vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p3",
                label: "Usuario",
                type: "select",
                selectUrl: "/api/usuarios/",
                styles: {
                  styles: "labelInput inputStyles w-[20vw]",
                  container: "!w-[20vw]  text-[1vw] ",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[10vw]"
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
            showCopiar={false}
            showExportButton={true}
            showDeleteButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[10vw] !w-[12vw]"}
          />
        </div>
      </div>

      <div className="width90 scroll">
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
          tableHead={table_head_proyectos_usuarios}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      {isModalInsert && (
        <FProyectosUsuarios
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
        <FProyectosUsuarios
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

      {isModalCopiar && (
        <FProyectosUsuariosCopiar
          label={`${TITLES.copiar} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MProyectosUsuarios;
