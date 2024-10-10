/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useEntityUtils, usePermission } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { TITLES, table_head_informe_cristales } from "../../utils";
import FCargos from "../forms/FCargos";
import { handleContainerClick } from "../../pages/LandingPage";

const strEntidad = "Informe Cristales ";
const strEntidadExcel = "Informe_Cristales";
const strBaseUrl = "/api/informecristales/";
const strQuery = "01";
const idMenu = 46;

export enum EnumGrid {
  ID = 1,
  nombre = 2,
}

const MCargos: React.FC = () => {
  const [params, setParams] = useState([]);
  const { escritura_lectura } = usePermission(idMenu || 0);

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  const {
    //Entities State
    entities,
    entity,
    setEntities,
    selectedRows,
    setSelectedRows,
    //Modal Methds
    openModal,
    closeModal,
    isModalInsert,
    isModalEdit,
    toggleEditModal,

    //Check/Buttons Methods
    handleDeleteSelected,
    handleSelect,
    handleSelectedAll,
    resetEntities,
  } = useEntityUtils(strBaseUrl, strQuery);

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_pkToDelete"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    // const newPkToDelete = selectedRows.map(
    //   (row: number) => `${entities[row][EnumGrid.ID]}`
    // );
    const newPkToDelete = selectedRows.map(
      (row: number) =>
        `{"desde":"${row}", 
         "hasta":"${entities[row][EnumGrid.ID]}"
         "origen":"${entities[row][EnumGrid.ID]}"
         "diseno":""
         "indice":""
         "material":""
         "color":""
         "tratamiento":""
         "diametro":""
         }`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer" onClick={handleContainerClick}>
      <div className="mantenedorHead width90">
        <div className="w-[100%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "desde",
                label: "Desde",
                type: "date",
                styles: {
                  styles: "!w-[10vw] labelInput inputStyles ",
                  container: "!w-[10vw] translate-x-[-2.5vw] !ml-8  ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "hasta",
                label: "Hasta",
                type: "date",
                styles: {
                  styles: "!w-[10vw] labelInput inputStyles",
                  container: "translate-x-[-6.5vw] !w-[10vw] ml-8",
                  labelProps: "labelInput",
                },
              },
              {
                name: "origen",
                label: "",
                type: "checkbox",
                options: ["Inventario", "Consumo"],
                styles: {
                  styles: " labelInput inputStyles ",
                  container: "!translate-x-[-6vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "diseno",
                label: "Diseño",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "CristalesDisenos",
                styles: {
                  styles: "labelInput inputStyles w-[15vw] mt-4 ",
                  container: "!w-[15vw]   text-[1vw] translate-x-[-2vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "indice",
                label: "Indice",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "CristalesIndices",
                styles: {
                  styles: "labelInput inputStyles w-[15vw] ml-4",
                  container: "!w-[15vw]  text-[1vw]  translate-x-[-6vw] mt-4",
                  labelProps: "labelInput",
                },
              },

              {
                name: "material",
                label: "Material",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "CristalesMateriales",
                styles: {
                  styles: "labelInput inputStyles w-[13vw]  ",
                  container: "!w-[13vw]   text-[1vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "color",
                label: "Color",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "CristalesColores",
                styles: {
                  styles: "labelInput inputStyles w-[13vw]",
                  container: "!w-[13vw]   text-[1vw] translate-x-[-4vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "tratamiento",
                label: "Tratamiento",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "CristalesTratamientos",
                styles: {
                  styles: "labelInput inputStyles w-[21vw]",
                  container: "!w-[13vw]   text-[1vw] translate-x-[-8vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "diametro",
                label: "Diametro",
                type: "text",
                styles: {
                  styles: "!w-[13vw] labelInput inputStyles",
                  container: "!w-[13vw]  translate-x-[-3vw]",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton="translate-x-[-2vw] translate-y-[3vw]"
            jsonSearch={true}
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
            showExportButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[-8vw] translate-y-[3vw]  !w-[5vw]"}
          />
        </div>
      </div>

      <div className="width100 scroll overflow-x-hidden !h-[25vw]">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          pkToDelete={pkToDelete}
          data={entities}
          tableHead={table_head_informe_cristales}
          // showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      {isModalInsert && (
        <FCargos
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
        <FCargos
          label={`${TITLES.edicion} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          data={entity}
          params={params}
          isEditting={true}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MCargos;
