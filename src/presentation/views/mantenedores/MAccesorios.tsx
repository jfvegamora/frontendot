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
import FAccesorios from "../forms/FAccesorios";
import { TITLES, table_head_accesorios } from "../../utils";

export enum EnumGrid {
  codigo = 1,
  descripcion = 2,
  ubicacion = 3,
  stock_minimo = 4,
  stock_reservado = 5,
  stock_disponible = 6,
  marca_id = 7,
  marca = 8,
  proveedor_id = 9,
  proveedor = 10,
  precio_neto = 11,
}

const strEntidad = "Accesorio ";
const strEntidadExcel = "Accesorios";
const strBaseUrl = "/api/accesorios/";
const strQuery = "01";
const idMenu = 9;

// type PrimaryKey = {
//   pk1: string;
// }
const MAccesorios: React.FC = () => {
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
    isModalInsert,
    isModalEdit,
    //modal methods
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

  // const pkToDelete: PrimaryKey[] = [];
  //NUEVA ELIMINNACION
  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1'

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => `'${entities[row][EnumGrid.codigo]}'`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  // console.log(pkToDelete)


  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100 !h-[6rem] ">
        <div className="w-[65%] absolute">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Código", type: "text", styles: { with: "!w-[10rem]" } },
              // { name: "_p5", label: "Código FAB", type: "text", styles:{with:"!w-[10rem]"}},
              { name: "_p2", label: "Descripción", type: "text", styles: { with: "!w-[10rem]", container: "translate-x-[1rem]" } },
              {
                name: "_p3",
                label: "Marca",
                type: "select",
                selectUrl: "/api/marcas/", styles: { with: "!w-[14rem]", container:"translate-x-[2rem] translate-y-[0.3rem]" },
                _p1: "3"
              },
              {
                name: "_p4",
                label: "Almacén",
                type: "select",
                selectUrl: "/api/almacenes/", styles: { with: "!w-[20rem]", container:"translate-x-[1rem] translate-y-[0.3rem]" },
                _p1: "3"
              },

              {
                name: "_p5",
                label: "Stock",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "Stock", styles: { with: "!mt-[0.5rem] !w-[12rem]", container:"translate-y-[0.2rem]" },
              },
            ]}
            classNameSearchButton=" translate-x-[2.5rem] translate-y-[0.3rem]"
          />

        </div>
        <div className="w-[33%] px-2 relative -right-[62rem] ">
          <PrimaryButtonsComponent
            handleAddPerson={openModal}
            handleDeleteSelected={handleDeleteSelected}
            handleRefresh={resetEntities}
            params={params}
            comilla={false}
            pkToDelete={pkToDelete}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            showAddButton={true}
            showExportButton={true}
            showDeleteButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            showImportCsv={true}
            idMenu={idMenu}
          />

        </div>
      </div>

      <div className="width100 scroll">
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
          tableHead={table_head_accesorios}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
          params={params}
        />
      </div>

      {isModalInsert && (
        <FAccesorios
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
        <FAccesorios
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

export default MAccesorios;
