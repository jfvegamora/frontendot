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
import { TITLES, table_head_proyectos_puntos_venta} from "../../utils";
import FProyectosPuntosVenta from "../forms/FProyectosPuntosVenta";
import FProyectosPuntosVentaCopiar from "../forms/FProyectosPuntosVentaCopiar";


export enum EnumGrid {
  codigo_proyecto      = 1,
  titulo_proyecto      = 2,
  codigo_licitacion    = 3,
  punto_venta_id       = 4,
  punto_venta          = 5,
  estado               = 6
}
const strEntidad = "Parametrización de Puntos de Venta ";
const strEntidadExcel = "Parametrizacion_de_puntos_de_venta";
const strBaseUrl = "/api/proyectopuntosventa/";
const strQuery = "01";
const idMenu   = 33;



const MProyectosPuntosVenta: React.FC = () => {
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

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => 
     `{"pk1":"${entities[row][EnumGrid.codigo_proyecto]}", "pk2":"${entities[row][EnumGrid.punto_venta_id]}"}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width90">
      <div className="w-[70%]">
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
            { name: "_p2", label: "Código Proyecto", type: "text",styles:{with:"!w-[60%]"} },
            { name: "_p3", label: "Código Licitacion", type: "text",styles:{with:"!w-[60%]"} },
          ]}
        />
      </div>

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
          showCopiar={true}
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
          tableHead={table_head_proyectos_puntos_venta}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
        />
      </div>      

      {isModalInsert && (
        <FProyectosPuntosVenta
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
        <FProyectosPuntosVenta
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
        <FProyectosPuntosVentaCopiar
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

export default MProyectosPuntosVenta;
