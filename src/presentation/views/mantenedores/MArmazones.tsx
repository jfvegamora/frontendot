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
import FArmazones from "../forms/FArmazones";
import { TITLES, table_head_armazones } from "../../utils";

export enum EnumGrid {
  codigo = 1,
  armazon_tipo_id = 2,
  armazon_tipo = 3,
  marca_id = 4,
  marca = 5,
  modelo = 6,
  color = 7,
  armazon_material_id = 8,
  armazon_material = 9,
  aro = 10,
  puente = 11,
  diagonal = 12,
  brazo = 13,
  armazon_uso_id = 14,
  armazon_uso = 15,
  total_ingresos = 16,
  total_egresos = 17,
  stock_actual = 18,
  stock_minimo = 19,
  stock_reservado = 20,
  stock_disponible = 21,
  codigo_fab       = 22,
}

const strEntidad = "Armazón ";
const strEntidadExcel = "Armazones";
const strBaseUrl = "/api/armazones/";
const strQuery = "01";
const idMenu = 5;

const MArmazones: React.FC = () => {
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
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete

  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `'${entities[row][EnumGrid.codigo]}'`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100 !h-[6rem]">
      <div className="w-[70%] ">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Código", type: "text", styles:{with:"!w-[9rem]"} },
            { name: "_p5", label: "Código FAB", type: "text", styles:{with:"!w-[9rem]"} },
            { name: "_p2", label: "Modelo", type: "text", styles:{with:"!w-[9rem]"} },
            {
              name: "_p3",
              label: "Marca",
              type: "select",
              selectUrl: "/api/marcas/", styles:{with:"!w-[14rem]"},
              _p1: "1"

            },
            {
              name: "_p4",
              label: "Almacenes",
              type: "select",
              selectUrl: "/api/almacenes/", styles:{with:"!w-[14rem]"},
              _p1: "1"
            },
        ]}
        />
      </div>

        <div className="w-[25%] px-2">
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
            showImportCsv={true}
            showRefreshButton={true}
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
          tableHead={table_head_armazones}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      {isModalInsert && (
        <FArmazones
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
        <FArmazones
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

export default MArmazones;
