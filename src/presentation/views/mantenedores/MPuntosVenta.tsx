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
import FPuntosVenta from "../forms/FPuntosVenta";
import { TITLES, table_head_puntos_venta } from "../../utils";

export enum EnumGrid {
  id = 1,
  descripcion = 2,
  tipo_id = 3,
  tipo = 4,
  direccion = 5,
  telefono = 6,
  encargado_id = 7,
  encargado = 8,
  almacen_id = 9,
  almacen = 10,
}

const strEntidad = "Punto de Venta ";
const strEntidadExcel = "Puntos de Venta";
const strBaseUrl = "/api/puntosventa/";
const strQuery = "01";
const idMenu = 4;


const MPuntosVenta: React.FC = () => {
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
  // console.log("entities:", entities);

  // console.log("params:", params);

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.id]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);
  // const pkToDelete: PrimaryKey[] = [];

  // useEffect(() => {
  //   const newPkToDelete = selectedRows.map((row: number) => ({
  //     pk1: entities[row][EnumGrid.id],
  //   }));
  //   newPkToDelete.forEach((newPk: { pk1: any }) => {
  //     if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
  //       pkToDelete.push(newPk);
  //     }
  //   });
  // }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Puntos de Venta</h1>

      <div className="mantenedorHead width70">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Descripción", type: "text" },
            {
              name      : "_p2",
              label     : "Tipo",
              type      : "select",
              selectUrl : "/api/tipos/",
              tipos     : "PuntosVentaTipos"
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

      <div className="width90 scroll">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
          pkToDelete={pkToDelete}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_puntos_venta}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
        />
      </div>

      {isModalInsert && (
        <FPuntosVenta
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <FPuntosVenta
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

export default MPuntosVenta;
