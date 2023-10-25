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
import { TITLES, table_head_parametrizacion_armazones} from "../../utils";
import FProyectosArmazones from "../forms/FProyectosArmazones";


export enum EnumGrid {
  codigo_proyecto      = 1,
  titulo_proyecto      = 2,
  codigo_licitacion    = 3,
  codigo_armazon       = 4,
  proveedor_id         = 5,
  proveedor            = 6,
  tipo_id              = 7,
  tipo                 = 8,
  marca_id             = 9,
  marca                = 10,
  modelo               = 11,
  color                = 12,
  material_id          = 13,
  material             = 14,
  aro                  = 15,
  puente               = 16,
  diagonal             = 17,
  brazo                = 18,
  uso_id               = 19,
  uso                  = 20,
  estado               = 21
}
const strEntidad = "Parametrizacion de Armazon ";
const strEntidadExcel = "Parametrizacion_de_armazones";
const strBaseUrl = "/api/proyectoscatalogo/";
const strQuery = "01";
const idMenu   = 16;

type PrimaryKey = {
  pk1: string;
  pk2: string;
};

const MProyectosArmazones: React.FC = () => {
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
  // console.log("selectedRows", selectedRows);

  const pkToDelete: PrimaryKey[] = [];

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row) => ({
      pk1: entities[row][EnumGrid.codigo_proyecto],
      pk2: `${entities[row][EnumGrid.codigo_armazon]}`,
    }));
    newPkToDelete.forEach((newPk) => {
      if (
        !pkToDelete.some(
          (existingPk) =>
            existingPk.pk1 === newPk.pk1 && existingPk.pk2 === newPk.pk2
        )
      ) {
        pkToDelete.push(newPk);
      }
    });
    // console.log("newObject:",Object.keys(pkToDelete[0]).length);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Parametrizacion de Armazones</h1>

      <div className="mantenedorHead width90">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            {
              name: "_p1",
              label: "Proyecto",
              type: "select",
              selectUrl: "/api/proyectos/",
            },
            { name: "_p2", label: "Código Proyecto", type: "text" },
            { name: "_p3", label: "Código Licitacion", type: "text" },
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
          idMenu={idMenu}

        />
      </div>

      <div className="width100 scroll">
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
          tableHead={table_head_parametrizacion_armazones}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
        />
      </div>
   

      {isModalInsert && (
        <FProyectosArmazones
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <FProyectosArmazones
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

export default MProyectosArmazones;
