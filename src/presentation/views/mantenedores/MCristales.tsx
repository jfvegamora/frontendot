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
import FCristales from "../forms/FCristales";
import { TITLES, table_head_cristales } from "../../utils";

export enum EnumGrid {
  codigo        = 1,
  marca_id      = 2,
  marca         = 3,
  proveedor_id  = 4,
  proveedor     = 5,
  diseno_id     = 6,
  diseno        = 7,
  indice_id     = 8,
  indice        = 9,
  material_id   = 10,
  material      = 11,
  color_id      = 12,
  color         = 13,
  tratamiento_id= 14,
  tratamiento   = 15,
  diametro      = 16,
  esferico      = 17,
  cilindrico    = 18,
  stock_minimo  = 19,
}

const strEntidad      = "Cristal ";
const strEntidadExcel = "Cristales";
const strBaseUrl      = "/api/cristales/";
const strQuery        = "01";

type PrimaryKey = {
  pk1: number;
};
const MCristales: React.FC = () => {
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

  // console.log("params:", params);

  const pkToDelete: PrimaryKey[] = [];

  //console.log('pktodelete', pkToDelete)
  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      pk1: entities[row][EnumGrid.codigo],
    }));
    newPkToDelete.forEach((newPk: { pk1: any }) => {
      if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Cristales</h1>

      <div className="mantenedorHead width70">
        <PrimaryKeySearch
          baseUrl         ={strBaseUrl}
          setParams       ={setParams}
          updateParams    ={updateParams}
          setEntities     ={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Código", type: "number" },
            { name: "_pMarca", label: "Marca", type: "select", selectUrl: "/api/marcas/"},
            { name: "_pProveedor", label: "Proveedor", type: "select", selectUrl: "/api/proveedores/"},
            // { name: "_pDiseno", label: "Diseño", type: "select", selectUrl: "/api//"},
            // { name: "_pIndice", label: "Indice", type: "select", selectUrl: "/api//"},
            // { name: "_pMaterial", label: "Material", type: "select", selectUrl: "/api//"},
            // { name: "_pColor", label: "Color", type: "select", selectUrl: "/api//"},
            // { name: "_pTratamiento", label: "Tratamiento", type: "select", selectUrl: "/api//"},
            // { name: "_pDiametro", label: "Diámetro", type: "number" },
            // { name: "_pEsferico", label: "Esférico", type: "number" },
            // { name: "_pCilindrico", label: "Cilíndrico", type: "number" },
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
          comilla             ={false}
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
          tableHead               ={table_head_cristales}
          showEditButton          ={true}
          showDeleteButton        ={false}
        />
      </div>

      {isModalInsert && (
        <FCristales
          label       ={`${TITLES.nuevo} ${strEntidad}`}
          closeModal  ={closeModal}
          selectedRows={selectedRows}
          setEntities ={setEntities}
          params      ={params}
          isEditting  ={false}
        />
      )}

      {isModalEdit && (
        <FCristales
          label       ={`${TITLES.editar} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities ={setEntities}
          params      ={params}
          data        ={entity}
          closeModal  ={closeModal}
          isEditting  ={true}
        />
      )}
    </div>
  );
};

export default MCristales;
