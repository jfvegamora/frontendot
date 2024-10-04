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
import FMandantes from "../forms/FMandantes";
import { TITLES, table_head_mandantes } from "../../utils";
import StateCountBar from "../../components/StateCountBar";

export enum EnumGrid {
  codigo = 1,
  rut = 2,
  nombre = 3,
  region_id = 4,
  region = 5,
  provincia_id = 6,
  provincia = 7,
  comuna_id = 8,
  comuna = 9,
}

const strEntidad = "Mandante ";
const strEntidadExcel = "Mandantes";
const strBaseUrl = "/api/mandantes/";
const strQuery = "01";
const idMenu = 14;

const MMandantes: React.FC = () => {
  const [params, setParams] = useState([]);
  const { escritura_lectura } = usePermission(idMenu || 0);

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

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_p1"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) => `${entities[row][EnumGrid.codigo]}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width70">
        <div className="w-[60%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p2",
                label: "Código",
                type: "number",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "w-[15vw] !text-[2vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p1",
                label: "Nombre",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "w-[35vw] !text-[2vw]",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[7vw]"
          />
        </div>

        <div className="w-[20%]">
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
            classname={"translate-x-[12vw]"}
          />
        </div>
      </div>

      <div className="width100 overflow-y-auto h-[30vw]">
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
          tableHead={table_head_mandantes}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      <StateCountBar entities={entities} idMenu={idMenu} />

      {isModalInsert && (
        <FMandantes
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
        <FMandantes
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

export default MMandantes;
