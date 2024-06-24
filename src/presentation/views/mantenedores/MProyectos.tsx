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

  
  CANTIDAD_INGRESADA          = 18,
  TOTAL_INGRESADO             = 19,
  PORC_INGRESADO              = 20,
  
  CANTIDAD_EN_PROCESO         = 21,
  TOTAL_EN_PROCESO            = 22,
  PORC_EN_PROCESO             = 23,
  
  CANTIDAD_FACTURADA          = 24,
  TOTAL_FACTURADO             = 25,
  PORC_FACTURADO              = 26,

  CANTIDAD_DISPONIBLE         = 27,
  TOTAL_DISPONIBLE            = 28,
  PORC_DISPONIBLE             = 29,

  EJECUTIVO_ID                    = 30,
  EJECUTIVO                       = 31,
  CONTACTO_ADMINISTRADOR_NOMBRE   = 32,
  CONTACTO_ADMINISTRADOR_CORREO   = 33,
  CONTACTO_ADMINISTRADOR_TELEFONO = 34,
  REFERENTE_TECNICO_NOMBRE        = 35,
  REFERENTE_TECNICO_CORREO        = 36,
  REFERENTE_TECNICO_TELEFONO      = 37,
  CONTACTO_CONTABILIDAD_NOMBRE    = 38,
  CONTACTO_CONTABILIDAD_CORREO    = 39,
  CONTACTO_CONTABILIDAD_TELEFONO  = 40,
  CONTACTO_FINANZAS_NOMBRE        = 41,
  CONTACTO_FINANZAS_CORREO        = 42,
  CONTACTO_FINANZAS_TELEFONO      = 43,
  OFTALMOLOGO_ID                  = 44,
  OFTALMOLOGO                     = 45,
  OBSERVACIONES                   = 46,
  IMPRIME_QR                      = 47,
  IMPRIME_TICKET                  = 48,
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
                selectUrl: "/api/mandantes/", styles:{with:" !w-[15rem]"},
              },
              {
                name: "_p2",
                label: "Título",
                type: "select",
                selectUrl: "/api/proyectos/", styles:{with:" !w-[25rem] translate-x-[-1rem]"},
              },
              { name: "_p3", label: "Cod. Proyecto/Licitación", type: "text", styles:{with:"!w-[12rem]", container:"translate-x-[-2rem] translate-y-[-0.2rem]"}, },
              {
                name: "_p4",
                label: "Estado",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "ProyectoEstados", styles: { with: "!w-[14rem] translate-x-[-1rem] translate-y-[0.5rem] " },
              },
            
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
