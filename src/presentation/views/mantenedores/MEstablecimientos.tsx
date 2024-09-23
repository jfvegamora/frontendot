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
import FEstablecimientos from "../forms/FEstablecimientos";
// import FEstablecimientos2 from "../forms/FEstablecimientos2";

import { TITLES, table_head_establecimientos } from "../../utils";

export enum EnumGrid {
  id = 1,
  codigo = 2,
  nombre = 3,
  tipo_id = 4,
  tipo = 5,
  mandante_id = 6,
  mandante = 7,
  region_id = 8,
  region = 9,
  provincia_id = 10,
  provincia = 11,
  comuna_id = 12,
  comuna = 13,
  destino_id = 14,
  destino = 15,
  despachar_a = 16,
}

const strEntidad = "Establecimiento ";
const strEntidadExcel = "Establecimientos";
const strBaseUrl = "/api/establecimientos/";
const strQuery = "01";
const idMenu = 3;

const MEstablecimientos: React.FC = () => {
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
      (row: number) => `${entities[row][EnumGrid.id]}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  // console.log(pkToDelete)

  // console.log('entities', entities)
  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100">
        <div className="w-[70%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "RBD/Nombre",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "w-[15vw] !text-[2vw] ",
                  labelProps: "labelInput",
                },
              },
              // { name: "_p1", label: "Establecimiento", type: "text", styles: { with: "!w-[12rem]" }, },
              {
                name: "_p2",
                label: "Mandante",
                type: "select",
                selectUrl: "/api/mandantes/",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "!w-[20vw]  text-[1vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p3",
                label: "Tipo",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "EstablecimientosTipos",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "!w-[20vw]  text-[1vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p4",
                label: "Provincia",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "Provincias",
                styles: {
                  with: "labelInput inputStyles w-full ",
                  container: "!w-[25vw]  text-[1vw] !ml-4",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p5",
                label: "Comuna",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "Comunas",
                styles: {
                  with: "labelInput inputStyles !w-[30vw]",
                  container: "!w-[30vw]  text-[1vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p6",
                label: "Destino",
                type: "select",
                selectUrl: "/api/proyectodestinos/",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "!w-[20vw]  text-[1vw]",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[12vw] translate-y-[2.0vw]"
          />
        </div>
        <div className="w-[15%]">
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
            showRefreshButton={false}
            showImportCsv={false}
            comilla={false}
            idMenu={idMenu}
            classname={"translate-x-[13vw]  !w-[16vw] translate-y-[2vw]"}
          />
        </div>
      </div>

      <div className="width100 scroll">
        {
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
            tableHead={table_head_establecimientos}
            showEditButton={true}
            // showPdfButton={true}
            showDeleteButton={false}
            idMenu={idMenu}
            leftEdit={true}
          />
        }
      </div>

      {isModalInsert && (
        <FEstablecimientos
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
        <FEstablecimientos
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

export default MEstablecimientos;
