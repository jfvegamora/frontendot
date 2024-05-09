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
  
  CANTIDAD_REQUERIDA          = 15,
  TOTAL_REQUERIDO             = 16,
  PORC_REQUERIDO              = 17,
  
  CANTIDAD_EN_PROCESO         = 18,
  TOTAL_EN_PROCESO            = 19,
  PORC_EN_PROCESO             = 20,
  
  CANTIDAD_FACTURADA          = 21,
  TOTAL_FACTURADO             = 22,
  PORC_FACTURADO              = 23,

  CANTIDAD_DISPONIBLE         = 24,
  TOTAL_DISPONIBLE            = 25,
  PORC_DISPONIBLE             = 26,

  EJECUTIVO_ID                    = 27,
  EJECUTIVO                       = 28,
  CONTACTO_ADMINISTRADOR_NOMBRE   = 29,
  CONTACTO_ADMINISTRADOR_CORREO   = 30,
  CONTACTO_ADMINISTRADOR_TELEFONO = 31,
  REFERENTE_TECNICO_NOMBRE        = 32,
  REFERENTE_TECNICO_CORREO        = 33,
  REFERENTE_TECNICO_TELEFONO      = 34,
  CONTACTO_CONTABILIDAD_NOMBRE    = 35,
  CONTACTO_CONTABILIDAD_CORREO    = 36,
  CONTACTO_CONTABILIDAD_TELEFONO  = 37,
  CONTACTO_FINANZAS_NOMBRE        = 38,
  CONTACTO_FINANZAS_CORREO        = 39,
  CONTACTO_FINANZAS_TELEFONO      = 40,
  OFTALMOLOGO_ID                  = 41,
  OFTALMOLOGO                     = 42,
  OBSERVACIONES                   = 43,
  IMPRIME_QR                      = 44,
  IMPRIME_TICKET                  = 45,
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
