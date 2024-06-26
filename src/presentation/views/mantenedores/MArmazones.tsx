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
// import FArmazones from "../forms/FArmazones";
import { TITLES, table_head_armazones } from "../../utils";
import { ArmazonesEnum } from "../../Enums";


const FArmazones = React.lazy(()=>import("../forms/FArmazones"));




const strEntidad = "Armazón ";
const strEntidadExcel = "Armazones";
const strBaseUrl = "/api/armazones/";
const strQuery = "01";
const idMenu = 5;

const MArmazones: React.FC = () => {
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
    const newPkToDelete = selectedRows.map((row: number) => `'${entities[row][ArmazonesEnum.codigo]}'`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);


  console.log(params)


  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100 !h-[9rem]">
      <div className="w-[80%] ">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Código/Modelo/Color", type: "text", styles:{with:"!w-[11rem]", container:"translate-y-[-2rem]"} },
            // { name: "_p5", label: "Código FAB", type: "text", styles:{with:"!w-[9rem]"} },
            // { name: "_p2", label: "Modelo", type: "text", styles:{with:"!w-[9rem]"} },
            {
              name: "_p2",
              label: "Tipo",
              type: "select",
              selectUrl: "/api/tipos/",
              tipos: "ArmazonesTipos", styles:{with:"!w-[12rem]", container:"translate-y-[-1.4rem] translate-x-[1rem]"},
            },
            {
              name: "_p3",
              label: "Marca",
              type: "select",
              selectUrl: "/api/marcas/", styles:{with:"!w-[14rem]",container:"translate-y-[-1.7rem]"},
              _p1: "1"
            },
            {
              name: "_p6",
              label: "Material",
              type: "select",
              selectUrl: "/api/tipos/",
              tipos: "ArmazonesMaterial", styles:{with:"!w-[14rem]", container:"translate-y-[-1.3rem] translate-x-[-1rem]"},
            },
            {
              name: "_p4",
              label: "Almacén",
              type: "select",
              selectUrl: "/api/almacenes/", styles:{with:"!w-[25rem]", container:"translate-x-[-2rem] translate-y-[-1.7rem]"},
              _p1: "1"
            },
            {
              name: "_p5",
              label: "Stock",
              type: "select",
              selectUrl: "/api/tipos/",
              tipos: "Stock", styles:{with:"!w-[14rem]", container:"translate-x-[-3rem] translate-y-[-1.3rem]"},
            },
    ]}
     classNameSearchButton=" translate-x-[-4.5rem]  translate-y-[2.3rem]"
        />
      </div>

        <div className="w-[20%] px-2 translate-y-[2rem]">
          <PrimaryButtonsComponent
            handleAddPerson={openModal}
            handleDeleteSelected={handleDeleteSelected}
            handleRefresh={resetEntities}
            params={params}
            comilla={false}
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
            idMenu={idMenu}
          />
        </div>
      </div>

      <div className="width100 scroll">
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
          tableHead={table_head_armazones}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          params={params}
          leftEdit={true}
        />
      </div>

      <Suspense>
        {isModalInsert && (
          <FArmazones
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
          <FArmazones
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

export default MArmazones;
