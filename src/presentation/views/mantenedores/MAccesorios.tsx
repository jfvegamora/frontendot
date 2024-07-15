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
import { TITLES, table_head_accesorios } from "../../utils";
import { AccesoriosEnum } from "../../Enums";


const FAccesorios = React.lazy(()=>import("../forms/FAccesorios"));



const strEntidad = "Accesorio ";
const strEntidadExcel = "Accesorios";
const strBaseUrl = "/api/accesorios/";
const strQuery = "01";
const idMenu = 9;

// type PrimaryKey = {
//   pk1: string;
// }
const MAccesorios: React.FC = () => {
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
    isModalInsert,
    isModalEdit,
    //modal methods
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
  // console.log("entities:", entities);

  // const pkToDelete: PrimaryKey[] = [];
  //NUEVA ELIMINNACION
  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1'

  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => `'${entities[row][AccesoriosEnum.codigo]}'`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  // console.log(pkToDelete)


  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100 !h-[6rem] ">
        <div className="w-[65%] absolute">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Código", type: "text", 
                styles: { 
                  with: "!h-[2.5vw] !text-[1vw] w-full",
                  container:"w-[10vw] !text-[2vw] translate-y-[-0.2vw] translate-x-[-1vw]", 
                  labelProps: "-!translate-y-[-2vw] !text-[1.2vw] !font-[2vw]"
                } },
              // { name: "_p5", label: "Código FAB", type: "text", styles:{with:"!w-[10rem]"}},
              { name: "_p2", label: "Descripción", type: "text", 
                styles: { 
                  with: "!h-[2.5vw] !text-[1vw] w-full",
                  container:"w-[17vw] !text-[2vw] translate-y-[-0.2vw] translate-x-[.05vw]", 
                  labelProps: "-!translate-y-[-2vw] !text-[1.2vw] !font-[2vw]"
                 } },
              {
                name: "_p3",
                label: "Marca",
                type: "select",
                selectUrl: "/api/marcas/", 
                styles: {
                  styles:"!h-[2.5vw] text-[1vw] w-full",
                  container:"!w-[15vw]  text-[1vw] translate-x-[1vw] translate-y-[0.3rem]", 
                  labelProps: "!translate-y-[-3vh] !text-[1.2vw] !font-[2vw]"
                   },
                _p1: "3"
              },
              {
                name: "_p4",
                label: "Almacén",
                type: "select",
                selectUrl: "/api/almacenes/", 
                styles: { 
                  styles:"!h-[2.5vw] text-[1vw] w-full",
                  container:"!w-[15vw]  text-[1vw] translate-x-[0.5vw] translate-y-[0.3rem]", 
                  labelProps: "!translate-y-[-3vh] !text-[1.2vw] !font-[2vw]" 
                },
                _p1: "3"
              },

              {
                name: "_p5",
                label: "Stock",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "Stock", 
                styles: { 
                  styles:"!h-[2.5vw] text-[1vw] w-full",
                  container:"!w-[15vw]  text-[1vw] translate-x-[-0.5vw] translate-y-[0.3rem]", 
                  labelProps: "!translate-y-[-3vh] !text-[1.2vw] !font-[2vw]"
                },
              },
            ]}
            classNameSearchButton=" translate-x-[6vw] translate-y-[0.3rem]"
          />

        </div>
        <div className="w-[17vw] translate-x-[77vw]">
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
            showForwardButton={false}
            showRefreshButton={true}
            showImportCsv={true}
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
          tableHead={table_head_accesorios}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
          params={params}
        />
      </div>
  

     <Suspense>
        {isModalInsert && (
          <FAccesorios
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
          <FAccesorios
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

export default MAccesorios;
