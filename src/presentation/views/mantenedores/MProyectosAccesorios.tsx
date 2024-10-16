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
import { TITLES, table_head_proyectos_accesorios } from "../../utils";
import FProyectosAccesorios from "../forms/FProyectosAccesorios";
import FProyectosAccesoriosCopiar from "../forms/FProyectosAccesoriosCopiar";
import StateCountBar from "../../components/StateCountBar";

export enum EnumGrid {
  codigo_proyecto = 1,
  titulo_proyecto = 2,
  codigo_licitacion = 3,
  codigo_accesorio = 4,
  accesorio = 5,
  proveedor_id = 6,
  proveedor = 7,
  marca_id = 8,
  marca = 9,
  estado = 10,
  valor_neto = 11,
}
const strEntidad = "Parametrización de Accesorios ";
const strEntidadExcel = "Parametrizacion_de_accesorios";
const strBaseUrl = "/api/proyectoaccesorios/";
const strQuery = "01";
const idMenu = 30;

const MProyectosAccesorios: React.FC = () => {
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
    isModalCopiar,
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

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_pkToDelete"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) =>
        `{"pk1":"${entities[row][EnumGrid.codigo_proyecto]}", "pk2":"${
          entities[row][EnumGrid.codigo_accesorio]
        }"}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width80">
        <div className="w-[75%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Proyecto (?)",
                type: "select",
                selectUrl: "/api/proyectos/",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[auto]  text-[1vw] translate-x-[1vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p2",
                label: "Código Proyecto / Licitación",
                type: "text",
                styles: {
                  styles: "labelInput inputStyles",
                  container:
                    "!w-[20vw]  text-[1vw] !translate-x-[12vw] translate-y-[18%] mb-4 ",
                  labelProps: "-!translate-y-[-2vw] !text-[1.2vw] !font-[2vw]",
                },
              },
              // { name: "_p3", label: "Código Licitacion", type: "text", styles:{with:" !w-[9rem]"}, },
            ]}
            classNameSearchButton=" translate-x-[0.5vw]"
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
            showCopiar={true}
            showExportButton={true}
            showDeleteButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[0.5vw]  !w-[20vw]"}
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
          tableHead={table_head_proyectos_accesorios}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      <StateCountBar entities={entities} idMenu={idMenu} />

      {isModalInsert && (
        <FProyectosAccesorios
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
        <FProyectosAccesorios
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

      {isModalCopiar && (
        <FProyectosAccesoriosCopiar
          label={`${TITLES.copiar} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          escritura_lectura={escritura_lectura}
        />
      )}
    </div>
  );
};

export default MProyectosAccesorios;
