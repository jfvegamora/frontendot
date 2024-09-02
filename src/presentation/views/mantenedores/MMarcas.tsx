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
import FMarcas from "../forms/FMarcas";
import { TITLES, table_head_marcas } from "../../utils";

export enum EnumGrid {
  id = 1,
  nombre = 2,
  proveedor_id = 3,
  proveedor = 4,
  categoria_id = 5,
  categoria = 6,
}

const strEntidad = "Marca ";
const strEntidadExcel = "Marcas";
const strBaseUrl = "/api/marcas/";
const strQuery = "01";
const idMenu = 12;


const MMarcas: React.FC = () => {
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
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.id]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width80">
        <div className="w-[80%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Nombre", type: "text", 
                styles:{
                  styles:"labelInput inputStyles w-[15vw]",
                  container:"!w-[15vw]  text-[1vw]", 
                  labelProps: "labelInput"
                } },
              {
                name: "_p2",
                label: "Proveedor",
                type: "select",
                selectUrl: "/api/proveedores/",
                styles:{
                  styles:"labelInput inputStyles w-[20vw]",
                  container:"!w-[20vw]  text-[1vw] ", 
                  labelProps: "labelInput"
                }
              },
              {
                name      : "_p3",
                label     : "Categoría",
                type      : "select",
                selectUrl : "/api/tipos/",
                tipos     : "TipoInsumo",
                styles    :  {
                  styles:"labelInput inputStyles w-[15vw]",
                  container:"!w-[15vw]  text-[1vw] translate-x-[2vw] ", 
                  labelProps: "labelInput"
                  }
              },
            ]}
            classNameSearchButton=" translate-x-[2vw]"
          />
        </div>


        <div className="w-[15vw]">
          <PrimaryButtonsComponent
            handleAddPerson={openModal}
            handleDeleteSelected={handleDeleteSelected}
            handleRefresh={resetEntities}
            params={params}
            pkToDelete={pkToDelete}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            showAddButton={true}
            comilla={false}
            showExportButton={true}
            showDeleteButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[5vw]  !w-[12vw]"}
          />
        </div>

      </div>

      <div className="scroll width60">
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
          tableHead={table_head_marcas}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
    
      {isModalInsert && (
        <FMarcas
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
        <FMarcas
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

export default MMarcas;
