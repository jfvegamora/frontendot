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
import FVitrinas from "../forms/FVitrinas";
import { TITLES, table_head_vitrinas } from "../../utils";

export enum EnumGrid {
  id             = 1,
  descripcion    = 2,
  punto_venta_id = 3,
  punto_venta    = 4,
}

const strEntidad = "Vitrina ";
const strEntidadExcel = "Vitrinas";
const strBaseUrl = "/api/vitrinas/";
const strQuery = "01";
const idMenu = 37;

const MVitrinas: React.FC = () => {
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
      <div className="mantenedorHead width70">
        <div className="w-[70%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Descripción", type: "text", 
                styles:{
                  with: "!h-[2.5vw] !text-[1vw] w-full",
                  container:"!w-[15vw] !text-[2vw] translate-y-[-0.2vw]", 
                  labelProps: "!translate-y-[0.1vw] !text-[1.2vw] !font-[2vw] !z-30"
                } },
              {
                name      : "_p2",
                label     : "Punto de Venta",
                type      : "select",
                selectUrl : "/api/puntosventa/",
                styles:{
                  styles:"!h-[2.5vw] text-[1vw]",
                  container:"!w-[40vw]  text-[1vw]  translate-y-[0.3rem] ", 
                  labelProps: "!translate-y-[-2vh] !text-[1vw] !font-[2vw]"
                }
              },
            ]}
            classNameSearchButton=" translate-x-[5.5rem]"
          />
        </div>

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
          comilla={false}
          idMenu={idMenu}
        />
      </div>

      <div className="width70 scroll">
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
          tableHead={table_head_vitrinas}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>


      {isModalInsert && (
        <FVitrinas
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
        <FVitrinas
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

export default MVitrinas;
