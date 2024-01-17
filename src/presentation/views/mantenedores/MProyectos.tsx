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
  CODIGO                      = 1,
  CODIGO_LICITACION           = 2,
  TITULO                      = 3,
  PARAM_CRISTALES             = 4,
  ESTADO                      = 5,
  EMPRESA_ID                  = 6,
  EMPRESA                     = 7,
  MANDANTE_ID                 = 8,
  MANDANTE                    = 9,
  UNIDAD_COMPRA               = 10,
  FECHA_ADJUDICACION          = 11,
  FECHA_INICIO                = 12,
  FECHA_TERMINO               = 13,
  
  DIAS_DE_ENTREGA             = 14,
  AVANCE                      = 15,
  
  CANTIDAD_REQUERIDA          = 16,
  PRESUPUESTO                 = 17,
  CANTIDAD_ATENDIDA           = 18,
  TOTAL_FACTURADO             = 19,
  CANTIDAD_DISPONIBLE         = 20,
  SALDO_DISPONIBLE            = 21,

  EJECUTIVO_ID                    = 22,
  EJECUTIVO                       = 23,
  CONTACTO_ADMINISTRADOR_NOMBRE   = 24,
  CONTACTO_ADMINISTRADOR_CORREO   = 25,
  CONTACTO_ADMINISTRADOR_TELEFONO = 26,
  REFERENTE_TECNICO_NOMBRE        = 27,
  REFERENTE_TECNICO_CORREO        = 28,
  REFERENTE_TECNICO_TELEFONO      = 29,
  CONTACTO_CONTABILIDAD_NOMBRE    = 30,
  CONTACTO_CONTABILIDAD_CORREO    = 31,
  CONTACTO_CONTABILIDAD_TELEFONO  = 32,
  CONTACTO_FINANZAS_NOMBRE        = 33,
  CONTACTO_FINANZAS_CORREO        = 34,
  CONTACTO_FINANZAS_TELEFONO      = 35,
  OFTALMOLOGO_ID                  = 36,
  OFTALMOLOGO                     = 37,
  OBSERVACIONES                   = 38,
  IMPRIME_QR                      = 39,
  IMPRIME_TICKET                  = 40,
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
        <div className="w-[70%] ">
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
                selectUrl: "/api/mandantes/", styles:{with:" !w-[17rem]"},
              },
              {
                name: "_p2",
                label: "Título",
                type: "select",
                selectUrl: "/api/proyectos/", styles:{with:" !w-[24rem]"},
              },
              { name: "_p3", label: "Código Proyecto", type: "text", styles:{with:" !w-[9rem]"}, },
              { name: "_p4", label: "Código Licitación", type: "text", styles:{with:" !w-[9rem]"}, },
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
          leftEdit={true}
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
