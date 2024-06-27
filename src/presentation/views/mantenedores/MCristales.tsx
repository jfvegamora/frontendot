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
import FCristales from "../forms/FCristales";
import { TITLES, table_head_cristales } from "../../utils";
import FilterButton, { filterToggle } from "../../components/FilterButton";
import { handleContainerClick } from "../../pages/LandingPage";

export enum EnumGrid {
  codigo            = 1,
  ubicacion         = 2,
  stock_minimo      = 3,
  stock_reservado   = 4,
  stock_disponible  = 5,
  marca_id          = 6,
  marca             = 7,
  proveedor_id      = 8,
  proveedor         = 9,
  diseno_id         = 10,
  diseno            = 11,
  indice_id         = 12,
  indice            = 13,
  material_id       = 14,
  material          = 15,
  color_id          = 16,
  color             = 17,
  tratamiento_id    = 18,
  tratamiento       = 19,
  diametro          = 20,
  esferico          = 21,
  cilindrico        = 22,
  codigo_fab_1      = 23,
  codigo_fab_2      = 24,
  codigo_fab_3      = 25,
  codigo_fab_4      = 26,
}

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


  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => `'${entities[row][EnumGrid.codigo]}'`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  // console.log(filterToggle.value)

  return (
    <div className="mantenedorContainer" onClick={handleContainerClick}>
      <FilterButton
       
      >
        <div className="mantenedorHeadFlex width100 relative ">
          <div className="w-[95%] mx-auto h-[35vh] ">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              setParams={setParams}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_p1", label: "Código", type: "text", styles: { with: "!w-[17rem]" } },
                // { name: "_p2", label: "Código FAB", type: "text", styles:{with:"!w-[17rem]"}},

                {
                  name: "_pIndice",
                  label: "Indice",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesIndices", styles: { with: " !w-[19rem] translate-y-[0.6rem]"},
                },

                {
                  name: "_pMaterial",
                  label: "Material",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesMateriales", styles: { with: "translate-y-[1.5rem] !w-[19rem]" },
                },

                { name: "_pDiametro", label: "Diámetro", type: "number", styles:{with:"!w-[17rem]", container:"translate-y-[-0.1rem]"}},
                { name: "_pEsferico", label: "Esférico", type: "number", styles:{with: "", container:"!translate-y-[1.5rem]" } },
                {
                  name: "_pMarca",
                  label: "Marca",
                  type: "select",
                  selectUrl: "/api/marcas/", styles: { with: " !w-[19rem] !mt-2", container:"translate-y-[2rem]" },
                  _p1: "2"
                },

                {
                  name: "_pDiseno",
                  label: "Diseño",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesDisenos", styles: { with: "w-[19rem]", container:"translate-y-[0.5rem]" },
                },

                {
                  name: "_pColor",
                  label: "Color",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesColores", styles: { with: "translate-y-[0.5rem] !w-[19rem]" },
                },
                {
                  name: "_pTratamiento",
                  label: "Tratamiento",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesTratamientos", styles: { with: "!mt-[0.5rem] !w-[19rem]", container:"translate-y-[0.8rem]" },
                },

                {
                  name: "_p4",
                  label: "Almacén",
                  type: "select",
                  selectUrl: "/api/almacenes/", styles: { with: "!mt-[1.2rem] !w-[19rem]" },
                  _p1: "2"
                },

                {
                  name: "_p5",
                  label: "Stock",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "Stock", styles: { with: "!mt-[0.5rem] !w-[19rem]", container:"translate-y-[2rem]" },
                },
              ]}
               
            />
          </div>


          <div className="w-[30%]  top-[13rem] bottom-[3rem]  absolute right-[11rem]">
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
              showImportCsv={true}
              showRefreshButton={true}
              comilla={false}
              idMenu={idMenu}
            />
          </div>
        </div>
      </FilterButton>

      <div className={`width100 scroll ${filterToggle.value ? "!mt-[21rem] !h-[29rem]" : "!mt-[4rem] "} `}>
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

      {/* <FCristales
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          escritura_lectura={escritura_lectura}
        /> */}

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

    </div>
  );
};

export default MCristales;
