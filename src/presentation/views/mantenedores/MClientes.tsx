/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils } from "../../hooks";
import FClientes from "../forms/FClientes";
import { TITLES, table_head_clientes, TIPO_CLIENTE } from "../../utils";

export enum EnumGrid {
  rut                = 1,
  nombre             = 2,
  tipo               = 3,
  sexo               = 4,
  fecha_nacimiento   = 5,
  direccion          = 6,
  region_id          = 7,
  region             = 8,
  provincia_id       = 9,
  provincia          = 10,
  comuna_id          = 11,
  comuna             = 12,
  telefono           = 13,
  correo             = 14,
  establecimiento_id = 15,
  establecimiento    = 16,
}

export enum OptionValues {
  Todos = 0,
  Beneficiario = 1,
  Particular= 2,
  Óptica=3
}

const strEntidad      = "Cliente ";
const strEntidadExcel = "Clientes";
const strBaseUrl      = "/api/clientes/";
const strQuery        = "01";

type PrimaryKey = {
  pk1: string;
};
const MClientes: React.FC = () => {
  const [params, setParams] = useState([]);

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
  // console.log("entities:", entities);

  
  const pkToDelete: PrimaryKey[] = [];
  // console.log("pkToDelete1: ", pkToDelete);




  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      pk1: entities[row][EnumGrid.rut],
    }));
    newPkToDelete.forEach((newPk: { pk1: any }) => {
      if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Clientes</h1>

      <div className="mantenedorHead width80">
        <PrimaryKeySearch
          baseUrl         ={strBaseUrl}
          setParams       ={setParams}
          updateParams    ={updateParams}
          setEntities     ={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "RUT", type: "text" },
            { name: "_p2", label: "Nombre", type: "text", values:OptionValues},
            { name: "_p3", 
                label  : "Tipo", 
                type   : "radiobuttons", 
                options: [TIPO_CLIENTE.todos, TIPO_CLIENTE.beneficiario, TIPO_CLIENTE.particular, TIPO_CLIENTE.optica],
                values : OptionValues      
            },
              ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson     ={openModal}
          handleDeleteSelected={handleDeleteSelected}
          handleRefresh       ={resetEntities}
          params              ={params}
          pkToDelete          ={pkToDelete}
          strEntidad          ={strEntidadExcel}
          strBaseUrl          ={strBaseUrl}
          showAddButton       ={true}
          showExportButton    ={true}
          showDeleteButton    ={true}
          showForwardButton   ={false}
          showRefreshButton   ={true}
          comilla             ={true}
        />
      </div>

      <div className="scroll">
        <TableComponent
          handleSelectChecked     ={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal         ={toggleEditModal}
          handleDeleteSelected    ={handleDeleteSelected}
          selectedRows            ={selectedRows}
          pkToDelete              ={pkToDelete}
          setSelectedRows         ={setSelectedRows}
          entidad                 ={strEntidad}
          data                    ={entities}
          tableHead               ={table_head_clientes}
          showEditButton          ={true}
          showDeleteButton        ={false}
        />
      </div>

      {isModalInsert && (
        <FClientes
          label={`${TITLES.nuevo} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <FClientes
          label={`${TITLES.editar} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
        />
      )}
    </div>
  );
};

export default MClientes