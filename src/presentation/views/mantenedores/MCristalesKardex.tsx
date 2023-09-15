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
import FCristalesKardexIN from "../forms/FCristalesKardexIN";
import { TITLES, table_head_cristaleskardex } from "../../utils";

export enum EnumGrid {
fecha                 =1,
cristal               =2,
descripcion           =3,
almacen_id            =4,
almacen               =5,
es                    =6,
motivo_id             =7,
motivo                =8,
entradas              =9,
salidas               =10,
valor_neto            =11,
proveedor_id          =12,
proveedor             =13,
numero_factura        =14,
ot                    =15,
almacen_relacionado_id=16,
almacen_relacionado   =17,
observaciones         =18,
}

// export enum EnumGrid {
//   fecha                 =1,
//   cristal               =2,
//   descripcion           =3,
//   almacen_id            =4,
//   almacen               =5,
//   es                    =6,
//   motivo_id             =7,
//   motivo                =8,
//   cantidad              =9,
//   valor_neto            =10,
//   proveedor_id          =11,
//   proveedor             =12,
//   numero_factura        =13,
//   ot                    =14,
//   almacen_relacionado_id=15,
//   almacen_relacionado   =16,
//   observaciones         =17,
//   }
  
const strEntidad      = "Cristal Kardex ";
const strEntidadExcel = "Cristales_Kardex";
const strBaseUrl      = "/api/cristaleskardex/";
const strQuery        = "01";

type PrimaryKey = {
  pk1: string; //cristal
  pk2: string; //fecha
};
const MCristalesKardex: React.FC = () => {
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

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row) => ({
      pk1: entities[row][EnumGrid.cristal],
      pk2: entities[row][EnumGrid.fecha],
    }));
    newPkToDelete.forEach((newPk) => {
      if (
        !pkToDelete.some(
          (existingPk) =>
            existingPk.pk1 === newPk.pk1 && existingPk.pk2 === newPk.pk2
        )
      ) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Kardex de Cristales</h1>

      <div className="mantenedorHead width70">
        <PrimaryKeySearch
          baseUrl         ={strBaseUrl}
          setParams       ={setParams}
          updateParams    ={updateParams}
          setEntities     ={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Código", type: "number" },
            { name: "_pAlmacen", label: "Almacen", type: "select", selectUrl: "/api/almacenes/"},
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
          tableHead               ={table_head_cristaleskardex}
          showEditButton          ={true}
          showDeleteButton        ={false}
        />
      </div>

      {isModalInsert && (
        <FCristalesKardexIN
          label       ={`${TITLES.nuevo} ${strEntidad}`}
          closeModal  ={closeModal}
          selectedRows={selectedRows}
          setEntities ={setEntities}
          params      ={params}
          isEditting  ={false}
        />
      )}

      {isModalEdit && (
        <FCristalesKardexIN
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

export default MCristalesKardex;
