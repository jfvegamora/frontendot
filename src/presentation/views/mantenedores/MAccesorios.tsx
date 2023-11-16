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
  codigo           = 1,
  descripcion      = 2,
  marca_id         = 3,
  marca            = 4,
  proveedor_id     = 5,
  proveedor        = 6,
  precio_neto      = 7,
  stock_minimo     = 8,
  stock_reservado  = 9,
  stock_disponible = 10
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
  const { escritura_lectura} = usePermission(idMenu || 0 );

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
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.codigo]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);
  



  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width90 ">
        <div className="w-[70%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Código", type: "number" },
              { name: "_p2", label: "Descripción", type: "text" },
              {
                name: "_p3",
                label: "Marca",
                type: "select",
                selectUrl: "/api/marcas/",
              },
              {
                name: "_p4",
                label: "Almacenes",
                type: "select",
                selectUrl: "/api/almacenes/",
              },
              ]}
          />

        </div>

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
