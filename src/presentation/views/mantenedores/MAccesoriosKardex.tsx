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
import FAccesoriosKardexIN from "../forms/FAccesoriosKardexIN";
import FAccesoriosKardexOUT from "../forms/FAccesoriosKardexOUT";
import { TITLES, table_head_kardex } from "../../utils";

export enum EnumGrid {
  fecha = 1,
  insumo = 2,
  descripcion = 3,
  almacen_id = 4,
  almacen = 5,
  es = 6,
  motivo_id = 7,
  motivo = 8,
  entradas = 9,
  salidas = 10,
  valor_neto = 11,
  proveedor_id = 12,
  proveedor = 13,
  numero_factura = 14,
  ot = 15,
  almacen_relacionado_id = 16,
  almacen_relacionado = 17,
  observaciones = 18,
}


const strEntidad = "Kardex de Accesorios ";
const strEntidadExcel = "Accesorios_Kardex";
const strBaseUrl = "/api/accesorioskardex/";
const strQuery = "01";
const idMenu = 10;

const MAccesoriosKardex: React.FC = () => {
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
  const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => 
     `{"pk1":"${entities[row][EnumGrid.insumo]}", "pk2":"${entities[row][EnumGrid.fecha]}"}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100">
        <div className="w-[70%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Código (?)", type: "text" },
              // { name: "_p5", label: "Código FAB", type: "text" },
              {
                name: "_p4",
                label: "Almacén",
                type: "select",
                selectUrl: "/api/almacenes/", 
                styles:{with:" !w-[14rem]"},
                _p1: "3"
              },
              { name: "_p2", label: "Desde", type: "date" },
              { name: "_p3", label: "Hasta", type: "date" },
            ]}
          />
        </div>

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          toggleEditModal={toggleEditModal}
          handleRefresh={resetEntities}
          params={params}
          pkToDelete={pkToDelete}
          strEntidad={strEntidadExcel}
          strBaseUrl={strBaseUrl}
          showAddButton={true}
          showExportButton={true}
          showImportCsv={true}
          showDeleteButton={false}
          showForwardButton={false}
          showRefreshButton={true}
          comilla={true}
          idMenu={idMenu}
          bln_egreso={true}
        />
      </div>

      <div className="width100 scroll">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal         ={toggleEditModal}
          handleDeleteSelected    ={handleDeleteSelected}
          selectedRows            ={selectedRows}
          pkToDelete              ={pkToDelete}
          setSelectedRows         ={setSelectedRows}
          entidad                 ={strEntidad}
          data                    ={entities}
          tableHead               ={table_head_kardex}
          showEditButton          ={false}
          showDeleteButton        ={false}
          idMenu                  ={idMenu}
          leftEdit={true}
        />
      </div>

      
      

      {isModalInsert && (
        <FAccesoriosKardexIN
          label={`${TITLES.ingreso} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={false}
          escritura_lectura={escritura_lectura}
        />
      )}

      {isModalEdit && (
        <FAccesoriosKardexOUT
          label={`${TITLES.egreso} ${strEntidad}`}
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

export default MAccesoriosKardex;
