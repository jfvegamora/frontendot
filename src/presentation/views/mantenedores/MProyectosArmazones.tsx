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
import { TITLES, table_head_parametrizacion_armazones} from "../../utils";
import FProyectosArmazones from "../forms/FProyectosArmazones";
import FProyectosArmazonesCopiar from "../forms/FProyectosArmazonesCopiar";


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
const strEntidad = "Parametrización de Armazón ";
const strEntidadExcel = "Parametrizacion_de_armazones";
const strBaseUrl = "/api/proyectoarmazones/";
const strQuery = "01";
const idMenu   = 16;



const MProyectosArmazones: React.FC = () => {
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
     `{"pk1":"${entities[row][EnumGrid.codigo_proyecto]}", "pk2":"${entities[row][EnumGrid.codigo_armazon]}"}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width90">
      <div className="w-[75%]">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            {
              name: "_p1",
              label: "Proyecto (?)",
              type: "select",
              selectUrl: "/api/proyectos/", styles:{with:" !w-[33rem]"},
            },
            { name: "_p2", label: "Código Proyecto", type: "text", styles:{with:" !w-[9rem]"}, },
            { name: "_p3", label: "Código Licitacion", type: "text", styles:{with:" !w-[9rem]"}, },
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
          bln_egreso={false}

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
          escritura_lectura={escritura_lectura}
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
          escritura_lectura={escritura_lectura}
        />
      )}

      {isModalCopiar && (
        <FProyectosArmazonesCopiar
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

export default MProyectosArmazones;
