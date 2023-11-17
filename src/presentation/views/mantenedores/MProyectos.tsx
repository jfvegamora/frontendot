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
import { TITLES, table_head_proyectos } from "../../utils";
import FProyectos from "../forms/FProyectos";

export enum EnumGrid {
  CODIGO = 1,
  CODIGO_LICITACION = 2,
  TITULO = 3,
  ESTADO = 4,
  EMPRESA_ID = 5,
  EMPRESA = 6,
  MANDANTE_ID = 7,
  MANDANTE = 8,
  UNIDAD_COMPRA = 9,
  FECHA_ADJUDICACION = 10,
  FECHA_INICIO = 11,
  FECHA_TERMINO = 12,
  CANTIDAD_REQUERIDA = 13,
  PRESUPUESTO = 14,
  DIAS_DE_ENTREGA = 15,
  EJECUTIVO_ID = 16,
  EJECUTIVO = 17,
  CONTACTO_ADMINISTRADOR_NOMBRE = 18,
  CONTACTO_ADMINISTRADOR_CORREO = 19,
  CONTACTO_ADMINISTRADOR_TELEFONO = 20,
  REFERENTE_TECNICO_NOMBRE = 21,
  REFERENTE_TECNICO_CORREO = 22,
  REFERENTE_TECNICO_TELEFONO = 23,
  CONTACTO_CONTABILIDAD_NOMBRE = 24,
  CONTACTO_CONTABILIDAD_CORREO = 25,
  CONTACTO_CONTABILIDAD_TELEFONO = 26,
  CONTACTO_FINANZAS_NOMBRE = 27,
  CONTACTO_FINANZAS_CORREO = 28,
  CONTACTO_FINANZAS_TELEFONO = 29,
  OFTALMOLOGO_ID = 30,
  OFTALMOLOGO = 31,
  OBSERVACIONES = 32,
}
const strEntidad = "Proyecto ";
const strEntidadExcel = "Proyectos";
const strBaseUrl = "/api/proyectos/";
const strQuery = "01";
const idMenu = 15;


const MProyectos: React.FC = () => {
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
  const strParamsToDelete = '_p2' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `'${entities[row][EnumGrid.CODIGO]}'`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100">
        <div className="w-[75%] ">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Mandante",
                type: "select",
                selectUrl: "/api/mandantes/",
              },
              {
                name: "_p2",
                label: "Titulo",
                type: "select",
                selectUrl: "/api/proyectos/",
              },
              { name: "_p3", label: "Codigo Proyecto", type: "text" },
              { name: "_p4", label: "Codigo Licitacion", type: "text" },
            ]}
          />
        </div>

        <div className="w-[25%] ml-16  ">
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
          tableHead={table_head_proyectos}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
        />
      </div>
    
      
      {isModalInsert && (
        <FProyectos
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
        <FProyectos
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

export default MProyectos;
