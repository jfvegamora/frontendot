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
import { TITLES, table_head_muestrarios_armazones } from "../../utils";
import FMuestrariosArmazones from "../forms/FMuestrariosArmazones";
import FMuestrariosArmazonesCopiar from "../forms/FMuestrariosArmazonesCopiar";
import FMuestrariosArmazonesTraspaso from "../forms/FMuestrariosArmazonesTraspaso";
import StateCountBar from "../../components/StateCountBar";

export enum EnumGrid {
  muestrario_id = 1,
  muestrario = 2,
  punto_venta_id = 3,
  punto_venta = 4,
  codigo_armazon = 5,
  estado = 6,
  proveedor_id = 7,
  proveedor = 8,
  tipo_id = 9,
  tipo = 10,
  marca_id = 11,
  marca = 12,
  modelo = 13,
  color = 14,
  material_id = 15,
  material = 16,
  aro = 17,
  puente = 18,
  diagonal = 19,
  brazo = 20,
  uso_id = 21,
  uso = 22,
  dp_minima = 23,
  dp_maxima = 24,
  stock_minimo = 25,
}

const strEntidad = "Parametrización de Muestrarios ";
const strEntidadExcel = "Parametrizacion_de_muestrarios";
const strBaseUrl = "/api/muestrariosarmazones/";
const strQuery = "01";
const idMenu = 16;

const MMuestrariosArmazones: React.FC = () => {
  const [params, setParams] = useState([]);
  const { escritura_lectura } = usePermission(idMenu || 0);
  // const [isTraspaso, setIsTraspaso] = useState(false);

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  const {
    //entities state
    entities,
    setEntities,
    entity,
    //modal methods
    isTraspaso,
    isModalInsert,
    isModalEdit,
    isModalCopiar,
    toggleEditModal,
    toggleTraspaso,
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
        `{"pk1":"${entities[row][EnumGrid.muestrario_id]}", "pk2":"${
          entities[row][EnumGrid.codigo_armazon]
        }"}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

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
                name: "_p2",
                label: "Muestrario",
                type: "select",
                selectUrl: "/api/muestrarios/",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[50vh]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p3",
                label: "Código Armazón",
                type: "text",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[16vw] translate-x-[2vw]",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p1",
                label: "Estado",
                type: "checkbox",
                options: ["Disponible", "No disponible"],
                styles: {
                  styles: " labelInput inputStyles ",
                  container: "!translate-x-[0] ",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton="translate-x-[0.5vw]"
          />
        </div>
        <div className="w-[15%]">
          <PrimaryButtonsComponent
            handleAddPerson={openModal}
            handleDeleteSelected={handleDeleteSelected}
            handleRefresh={resetEntities}
            handleCopiar={toggleModalCopiar}
            handleTraspaso={toggleTraspaso}
            params={params}
            pkToDelete={pkToDelete}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            showAddButton={true}
            showCopiar={true}
            showTraspasoButton={true}
            showExportButton={true}
            showDeleteButton={true}
            showForwardButton={false}
            showRefreshButton={true}
            showCustomExportButton={false}
            customExporTooltip={"Exportar muestrarios"}
            idMenu={idMenu}
            bln_egreso={false}
            classname={"translate-x-[0.5vw]  !w-[20vw]"}
          />
        </div>
        -
      </div>

      <div className="width100 overflow-y-auto h-[34vw]">
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
          tableHead={table_head_muestrarios_armazones}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      <StateCountBar entities={entities} idMenu={idMenu} />

      {isModalInsert && (
        <FMuestrariosArmazones
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
        <FMuestrariosArmazones
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
        <FMuestrariosArmazonesCopiar
          label={`${TITLES.copiar} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={false}
          escritura_lectura={escritura_lectura}
        />
      )}

      {isTraspaso && (
        <FMuestrariosArmazonesTraspaso
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

export default MMuestrariosArmazones;
