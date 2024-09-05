/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Suspense } from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils, usePermission } from "../../hooks";
import { TITLES, table_head_cristales } from "../../utils";
import FilterButton, { filterToggle } from "../../components/FilterButton";
import { handleContainerClick } from "../../pages/LandingPage";
import { CristalesEnum } from "../../Enums/CristalesEnum";

const FCristales = React.lazy(() => import("../forms/FCristales"));

const strEntidad = "Cristal ";
const strEntidadExcel = "Cristales";
const strBaseUrl = "/api/cristales/";
const strQuery = "01";
const idMenu = 7;

const MCristales: React.FC = () => {
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
      (row: number) => `'${entities[row][CristalesEnum.codigo]}'`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  // console.log(filterToggle.value)

  return (
    <div className="mantenedorContainer" onClick={handleContainerClick}>
      <FilterButton>
        <div className="mantenedorHeadFlex width100 relative ">
          <div className="w-[95%] mantenedorHeadSub">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              idMenu={idMenu}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                {
                  name: "_p1",
                  label: "Código",
                  type: "text",
                  styles: {
                    styles: "labelInput inputStyles",
                    container: "!w-[28vw]  text-[1vw] ",
                    labelProps: "labelInput",
                  },
                },
                // { name: "_p2", label: "Código FAB", type: "text", styles:{with:"!w-[17rem]"}},

                {
                  name: "_pIndice",
                  label: "Indice",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesIndices",
                  styles: {
                    styles: "labelInput inputStyles w-[20vw]",
                    container: "!w-[20vw]  text-[1vw] ",
                    labelProps: "labelInput",
                  },
                },

                {
                  name: "_pMaterial",
                  label: "Material",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesMateriales",
                  styles: {
                    styles: "labelInput inputStyles w-[20v]",
                    container: "!w-[20vw]   text-[1vw]",
                    labelProps: "labelInput",
                  },
                },

                {
                  name: "_pDiametro",
                  label: "Diámetro",
                  type: "number",
                  styles: {
                    styles: "labelInput inputStyles",
                    container: "!w-[17.5vw]  text-[1vw] ml-2 ",
                    labelProps: "labelInput",
                  },
                },
                {
                  name: "_pEsferico",
                  label: "Esférico",
                  type: "number",
                  styles: {
                    styles: "labelInput inputStyles",
                    container: "!w-[20vw]  text-[1vw]",
                    labelProps: "labelInput",
                  },
                },
                {
                  name: "_pMarca",
                  label: "Marca",
                  type: "select",
                  selectUrl: "/api/marcas/",
                  styles: {
                    styles: "labelInput inputStyles w-[20vw]",
                    container: "!w-[20vw]   text-[1vw] ml-2  ",
                    labelProps: "labelInput",
                  },
                  _p1: "2",
                },

                {
                  name: "_pDiseno",
                  label: "Diseño",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesDisenos",
                  styles: {
                    styles: "labelInput inputStyles w-[20vw]",
                    container: "!w-[20vw]   text-[1vw]",
                    labelProps: "labelInput",
                  },
                },

                {
                  name: "_pColor",
                  label: "Color",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesColores",
                  styles: {
                    styles: "labelInput inputStyles w-[20vw]",
                    container: "!w-[20vw]   text-[1vw]",
                    labelProps: "labelInput",
                  },
                },
                {
                  name: "_pTratamiento",
                  label: "Tratamiento",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesTratamientos",
                  styles: {
                    styles: "labelInput inputStyles w-[20vw]",
                    container: "!w-[20vw]   text-[1vw] ",
                    labelProps: "labelInput",
                  },
                },

                {
                  name: "_p4",
                  label: "Almacén",
                  type: "select",
                  selectUrl: "/api/almacenes/",
                  styles: {
                    styles: "labelInput inputStyles w-[20vw]",
                    container: "!w-[20vw]   text-[1vw] ",
                    labelProps: "labelInput",
                  },
                  _p1: "2",
                },

                {
                  name: "_p5",
                  label: "Stock",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "Stock",
                  styles: {
                    styles: "labelInput inputStyles w-[20vw]",
                    container: "!w-[20vw]   text-[1vw] ",
                    labelProps: "labelInput",
                  },
                },
              ]}
              classNameSearchButton=" translate-x-[10vw] translate-y-[-1vw]"
            />
          </div>

          <div className="w-[30%]  top-[11.6rem] bottom-[2rem]  absolute right-[5rem]">
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
              showMacroButton={true}
              showForwardButton={false}
              showImportCsv={false}
              showRefreshButton={true}
              comilla={false}
              idMenu={idMenu}
            />
          </div>
        </div>
      </FilterButton>

      <div
        className={`width100 scroll ${
          filterToggle.value ? "!mt-[21rem] !h-[29rem]" : "!mt-[4rem] "
        } `}
      >
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
          tableHead={table_head_cristales}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
          params={params}
        />
      </div>

      <Suspense>
        {isModalInsert && (
          <FCristales
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
          <FCristales
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
      </Suspense>
    </div>
  );
};

export default MCristales;
