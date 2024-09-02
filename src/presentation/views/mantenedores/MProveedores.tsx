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
import FProveedores from "../forms/FProveedores";
import { TITLES, table_head_proveedores } from "../../utils";
 
export enum EnumGrid {
  ID        = 1,
  Rut       = 2,
  Nombre    = 3,
  Direccion = 4,
  Telefono  = 5,
  Correo    = 6,
  Sitio_Web = 7,
}
const strEntidad      = "Proveedor ";
const strEntidadExcel = "Proveedores";
const strBaseUrl      = "/api/proveedores/";
const strQuery        = "01";
const idMenu          = 13;


const MProveedores: React.FC = () => {
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
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.ID]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width60">
        <div className="w-[60%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl         ={strBaseUrl}
            updateParams    ={updateParams}
            setEntities     ={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "RUT"   , type: "text", 
                styles:{
                  with: "labelInput inputStyles w-full",
                  container:"!w-[10vw] translate-x-[-2vw]  text-[1vw]", 
                  labelProps: "labelInput"
                } },
              { name: "_p3", label: "Nombre", type: "text", 
                styles:{
                  with: "labelInput inputStyles w-full",
                  container:"!w-[20vw]  text-[1vw] -translate-x-[4vw]", 
                  labelProps: "labelInput"
                } },
            ]}
             classNameSearchButton=" translate-x-[1vw]"
          />
        </div>


        <div className="w-[15%]">
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
            idMenu              ={idMenu}
            classname={"translate-x-[12vw]  !w-[12vw]"}

          />


        </div>

      </div>

      <div className="width90 scroll">
        <TableComponent
          handleSelectChecked     ={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal         ={toggleEditModal}
          handleDeleteSelected    ={handleDeleteSelected}
          selectedRows            ={selectedRows}
          setSelectedRows         ={setSelectedRows}
          entidad                 ={strEntidad}
          data                    ={entities}
          tableHead               ={table_head_proveedores}
          showEditButton          ={true}
          showDeleteButton        ={false}
          idMenu                  ={idMenu}
          leftEdit={true}
        />
      </div>

      {isModalInsert && (
        <FProveedores
          label       ={`${TITLES.ingreso} ${strEntidad}`}
          closeModal  ={closeModal}
          selectedRows={selectedRows}
          setEntities ={setEntities}
          params      ={params}
          isEditting  ={false}
          escritura_lectura={escritura_lectura}
        />
      )}

      {isModalEdit && (
        <FProveedores
          label       ={`${TITLES.edicion} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities ={setEntities}
          params      ={params}
          data        ={entity}
          closeModal  ={closeModal}
          isEditting  ={true}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MProveedores;
