/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useEntityUtils, usePermission } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { TITLES, table_head_proyectos_docum } from "../../utils";
import { ProyectosDocumEnum } from "../../Enums";
import StateCountBar from "../../components/StateCountBar";

const strEntidad = "Documentación del Proyecto ";
const strEntidadExcel = "Documentacion_del_Proyecto";
const strBaseUrl = "/api/proyectodocum/";
const strQuery = "01";
const idMenu = 38;

const FProyectosDocum = React.lazy(() => import("../forms/FProyectosDocum"));

const MProyectosDocum: React.FC = () => {
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
    toggleModalCopiar,
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
  // console.log("selectedRows", selectedRows);

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_pkToDelete"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) =>
        `{"pk1":"${entities[row][ProyectosDocumEnum.proyecto]}", "pk2":"${
          entities[row][ProyectosDocumEnum.fecha_hora]
        }"}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  const newTableHead = useMemo(() => {
    return table_head_proyectos_docum.map((column: any) => {
      if (
        !escritura_lectura &&
        ["total_neto", "iva", "total"].includes(column.key)
      ) {
        return { ...column, visible: false };
      }
      return column;
    });
  }, [escritura_lectura]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100">
        <div className="w-[75%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Proyecto",
                type: "select",
                selectUrl: "/api/proyectos/",
                styles: {
                  styles: "labelInput inputStyles w-[25vw]",
                  container: "!w-[30vw]  text-[1vw] translate-x-[0.5vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p4",
                label: "Tipo Doc",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "TipoDoc",
                styles: {
                  styles: "labelInput inputStyles w-full",
                  container: "!w-[35vw]  text-[1vw] translate-x-[8vw]",
                  labelProps: "labelInput",
                },
                _p1: "1,2,3,4,5,6,7,8",
              },
              {
                name: "_p2",
                label: "N° Documento",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container:
                    "w-[35vw] !text-[2vw] translate-y-[-0.2vw] translate-x-[7vw]",
                  labelProps: "labelInput",
                },
              },
              // { name: "_p2", label: "Código Proyecto", type: "text", styles:{with:" !w-[9rem]"}, },
              // { name: "_p3", label: "Código Licitación", type: "text", styles:{with:" !w-[9rem]"}, },
            ]}
            classNameSearchButton=" translate-x-[5vw]"
          />
        </div>

        <div className="w-[15%]">
          <PrimaryButtonsComponent
            handleAddPerson={openModal}
            handleDeleteSelected={handleDeleteSelected}
            handleRefresh={resetEntities}
            handleCopiar={toggleModalCopiar}
            params={params}
            pkToDelete={pkToDelete}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            showAddButton={true}
            showCopiar={false}
            showExportButton={true}
            showDeleteButton={true}
            showExcelRepEntrega={true}
            showExcelRepFirma={true}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[6vw]  !w-[18vw]"}
          />
        </div>
      </div>

      <div className="width100 overflow-y-auto h-[30vw]">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          pkToDelete={pkToDelete}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={entities}
          strBaseUrl={strBaseUrl}
          tableHead={newTableHead}
          showEditButton={false}
          showPdfButton={false}
          showExcelButton={true}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
      <StateCountBar entities={entities} idMenu={idMenu} />

      <Suspense>
        {isModalInsert && (
          <FProyectosDocum
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
          <FProyectosDocum
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

export default MProyectosDocum;
