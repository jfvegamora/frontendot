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
import FCristalesKardexIN from "../forms/FCristalesKardexIN";
import FCristalesKardexOUT from "../forms/FCristalesKardexOUT";
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

const strEntidad = "Kardex de Cristal ";
const strEntidadExcel = "Cristales_Kardex";
const strBaseUrl = "/api/cristaleskardex/";
const strQuery = "01";
const idMenu = 8;



const MCristalesKardex: React.FC = () => {
  const [params, setParams] = useState([]);
  const [kardexDescription, setKardexDescription] = useState("");
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

  useEffect(() => {
    if (entities) {
      setKardexDescription(entities[0]);
    }
  }, [entities]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width80 h-[9rem]">
        <div className="w-[60%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            description={kardexDescription}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Código", type: "number" },
              {
                name: "_p4",
                label: "Almacenes",
                type: "select",
                selectUrl: "/api/almacenes/",
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
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={true}
          comilla={true}
          idMenu={idMenu}
          bln_egreso={true}
        />
      </div>

      <div className="width100 scroll">
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
          tableHead               ={table_head_kardex}
          showEditButton          ={false}
          showDeleteButton        ={false}
          idMenu                  ={idMenu}
        />
      </div>


      

      {isModalInsert && (
        <FCristalesKardexIN
          label={`${TITLES.ingreso} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={false}
          description={kardexDescription}
          escritura_lectura={escritura_lectura}
        />
      )}

      {isModalEdit && (
        <FCristalesKardexOUT
          label={`${TITLES.egreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          description={kardexDescription}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MCristalesKardex;
