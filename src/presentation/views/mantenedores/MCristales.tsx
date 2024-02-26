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
  codigo = 1,
  marca_id = 2,
  marca = 3,
  proveedor_id = 4,
  proveedor = 5,
  diseno_id = 6,
  diseno = 7,
  indice_id = 8,
  indice = 9,
  material_id = 10,
  material = 11,
  color_id = 12,
  color = 13,
  tratamiento_id = 14,
  tratamiento = 15,
  diametro = 16,
  esferico = 17,
  cilindrico = 18,
  stock_minimo=19,
  stock_reservado = 20,
  stock_disponible = 21,
}

const strEntidad = "Cristal ";
const strEntidadExcel = "Cristales";
const strBaseUrl = "/api/cristales/";
const strQuery = "01";
const idMenu = 7;


const MCristales: React.FC = () => {
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
    const newPkToDelete = selectedRows.map((row: number) => `'${entities[row][EnumGrid.codigo]}'`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  // console.log(filterToggle.value)

  return (
    <div className="mantenedorContainer"  onClick={handleContainerClick}>
      <FilterButton>
        <div className="mantenedorHeadFlex width100 relative ">
          <div className="w-[95%] mx-auto ">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              setParams={setParams}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_p1", label: "Código", type: "text", styles:{with:"!w-[17rem]"}},
                // { name: "_p2", label: "Código FAB", type: "text", styles:{with:"!w-[17rem]"}},
                
                {
                  name: "_pIndice",
                  label: "Indice",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesIndices", styles:{with:" !w-[19rem]"},
                },
              
                {
                  name: "_pMaterial",
                  label: "Material",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesMateriales", styles:{with:"!mt-[0.5rem] !w-[19rem]"},
                },

                { name: "_pDiametro", label: "Diámetro", type: "number", styles:{with:"!mt-[-0.1rem] !w-[17rem]"}},
                { name: "_pEsferico",   label: "Esférico", type: "number", styles:{with:""} },
                {
                  name: "_pMarca",
                  label: "Marca",
                  type: "select",
                  selectUrl: "/api/marcas/", styles:{with:" !w-[19rem]"},
                  _p1: "2"
                },
              
                {
                  name: "_pDiseno",
                  label: "Diseño",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesDisenos", styles:{with:"!mt-[0.5rem]  w-[19rem]"},
                },

                {
                  name: "_pColor",
                  label: "Color",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesColores", styles:{with:"!mt-[0.5rem] !w-[19rem]"},
                },
                {
                  name: "_pTratamiento",
                  label: "Tratamiento",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesTratamientos", styles:{with:"!mt-[0.5rem] !w-[19rem]"},
                },

                {
                  name: "_p4",
                  label: "Almacén",
                  type: "select",
                  selectUrl: "/api/almacenes/", styles:{with:"!mt-[1.2rem] !w-[19rem]"},
                  _p1: "2"
                },
                ]}
            />
          </div>

          
          <div className="w-[100%] top-[10rem] bottom-[0.8rem] right-[12rem]">
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
              showImportCsv={true}
              showRefreshButton={true}
              comilla={false}
              idMenu={idMenu}
            />
          </div>
        </div>
      </FilterButton>

      <div className={`width100 scroll ${filterToggle.value ? "!mt-[21rem] !h-[19rem]" : "!mt-[4rem] !h-[47rem]"} `}>
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
        />
      </div>

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
