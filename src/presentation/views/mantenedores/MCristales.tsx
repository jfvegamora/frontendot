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
  tot_ingresos=19,
  tot_egresos=20,
  tot_=21,
  stock_minimo=22,
  stock_reservado = 23,
  stock_disponible = 24,
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
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.codigo]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  // console.log(filterToggle.value)

  return (
    <div className="mantenedorContainer !h-[50rem]"  onClick={handleContainerClick}>
      <FilterButton>
        <div className="mantenedorHeadFlex width100 relative">
          <div className="w-[95%] mx-auto ">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              setParams={setParams}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_p1", label: "Código", type: "number" },
                {
                  name: "_pIndice",
                  label: "Indice",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesIndices",
                },
              
                {
                  name: "_pDiseno",
                  label: "Diseño",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesDisenos",
                },
                {
                  name: "_pMaterial",
                  label: "Material",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesMateriales",
                },

                
                { name: "_pEsferico",   label: "Esférico", type: "number", styles:{with:"!w-[57%]  bg-red-400"} },
                { name: "_pDiametro", label: "Diámetro", type: "number" },
               
                {
                  name: "_pMarca",
                  label: "Marca",
                  type: "select",
                  selectUrl: "/api/marcas/"
                },
                {
                  name: "_pProveedor",
                  label: "Proveedor",
                  type: "select",
                  selectUrl: "/api/proveedores/",
                },

                {
                  name: "_pColor",
                  label: "Color",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesColores",
                },
                {
                  name: "_pTratamiento",
                  label: "Tratamiento",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "CristalesTratamientos",
                },
                {
                  name: "_p4",
                  label: "Almacenes",
                  type: "select",
                  selectUrl: "/api/almacenes/",
                },
                ]}
            />
          </div>
          <div className="w-[20%] absolute bottom-[2.5rem] right-[12rem]">
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

      <div className={`width100 scroll ${filterToggle.value ? "!mt-[20rem] !h-[20rem]" : "!mt-[4rem] !h-[100rem]"} `}>
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
