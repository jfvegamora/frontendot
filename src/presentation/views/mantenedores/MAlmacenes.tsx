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
import FAlmacenes from "../forms/FAlmacenes";
import { TITLES, table_head_almacenes } from "../../utils";

export enum EnumGrid {
  id = 1,
  descripcion = 2,
  tipo_almacen_id = 3,
  tipo_almacen = 4,
  categoria_id = 5,
  categoria = 6,
  usuario_id = 7,
  usuario = 8,
}

const strEntidad = "Almacén ";
const strEntidadExcel = "Almacenes";
const strBaseUrl = "/api/almacenes/";
const strQuery = "01";
const idMenu = 11;

const MAlmacenes: React.FC = () => {
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

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_p1"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) => `${entities[row][EnumGrid.id]}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width80">
        <div className="w-[80%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Descripción",
                type: "text",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[20vw]  text-[1vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p2",
                label: "Tipo",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "AlmacenesTipos",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[20vw]  text-[1vw] translate-x-[1vw]  ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p3",
                label: "Categoría",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "TipoInsumo",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[20vw]  text-[1vw] translate-x-[-0.5vw]",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[-1vw] "
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
            comilla={false}
            idMenu={idMenu}
            classname={"translate-x-[2.5vw]  !w-[14vw]"}
          />
        </div>
      </div>

      <div className="width80 scroll">
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
          tableHead={table_head_almacenes}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      {isModalInsert && (
        <FAlmacenes
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
        <FAlmacenes
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

export default MAlmacenes;
