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
import { TITLES, table_head_clientes } from "../../utils";

const FClientes = React.lazy(() => import("../forms/FClientes"));

export enum EnumGrid {
  rut = 1,
  nombre = 2,
  tipo = 3,
  sexo = 4,
  fecha_nacimiento = 5,
  direccion = 6,
  region_id = 7,
  region = 8,
  provincia_id = 9,
  provincia = 10,
  comuna_id = 11,
  comuna = 12,
  telefono = 13,
  correo = 14,
  establecimiento_id = 15,
  establecimiento = 16,
}

export enum OptionValues {
  Todos = 0,
  Beneficiario = 1,
  Particular = 2,
  Óptica = 3,
}

const strEntidad = "Cliente ";
const strEntidadExcel = "Clientes";
const strBaseUrl = "/api/clientes/";
const strQuery = "01";
const idMenu = 2;

const MClientes: React.FC = () => {
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

  useEffect(() => {
    const newPkToDelete: any = selectedRows.map((row: number) => {
      return { rut: `${entities[row][EnumGrid.rut]}` };
    });
    let pkToDelete: any = `_pkToDelete=${encodeURIComponent(
      JSON.stringify(newPkToDelete)
    )}`;

    setPkToDelete(pkToDelete);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100">
        <div className="w-[70%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "RUT",
                type: "text",
                styles: {
                  styles: "labelInput inputStyles w-[15vw] ",
                  container: "",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p2",
                label: "Nombre",
                type: "text",
                values: OptionValues,
                styles: {
                  styles: "labelInput inputStyles w-[15vw] ",
                  container: "",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p3",
                label: "Tipo",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "ClientesTipos",
                styles: {
                  styles: "labelInput inputStyles w-[15vw] ",
                  container: "",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p4",
                label: "Establecimiento",
                type: "select",
                selectUrl: "/api/establecimientos/",
                styles: {
                  styles: "labelInput inputStyles w-[15vw] ml-8",
                  container: "text-[1vw] ",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[2vw]"
          />
        </div>

        <div className="w-[15%]">
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
            showRefreshButton={true}
            showImportCsv={false}
            comilla={true}
            classname={"translate-x-[14.5vw]  !w-[15vw]"}
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
          tableHead={table_head_clientes}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
      <Suspense>
        {isModalInsert && (
          <FClientes
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
          <FClientes
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

export default MClientes;
