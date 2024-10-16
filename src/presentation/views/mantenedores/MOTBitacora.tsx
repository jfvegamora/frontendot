/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useEntityUtils, usePermission } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { table_head_OT_bitacora_consulta } from "../../utils";
import StateCountBar from "../../components/StateCountBar";
import { AppStore, useAppSelector } from "../../../redux/store";
// import { ProyectosDocumEnum } from "../../Enums";

const strEntidad = "Bitácora de OT ";
const strEntidadExcel = "bitacora_OT";
const strBaseUrl = "/api/otbitacoraconsulta/";
const strQuery = "01";
const idMenu = 44;

// const FProyectosDocum = React.lazy(()=>import("../forms/FProyectosDocum"))

export enum EnumGrid {
  fecha_hora = 1,
  usuario_id = 2,
  usuario = 3,
  origen_id = 4,
  origen = 5,
  destino_id = 6,
  destino = 7,
  folio = 8,
  estado_id = 9,
  estado = 10,
  situacion = 11,
  observaciones = 12,
}

const MOTBitacora: React.FC = () => {
  const [params, setParams] = useState([]);
  const userID = useAppSelector((store: AppStore) => store.user.id);
  // const { escritura_lectura} = usePermission(idMenu || 0 );

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  const {
    //entities state
    entities,
    setEntities,
    //modal methods
    toggleEditModal,
    toggleModalCopiar,
    openModal,
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

  const { escritura_lectura } = usePermission(idMenu);

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) =>
        `{"fecha_desde":"${row}", 
         "fecha_hasta":""
         "usuario":""
         "origen":""
         "destino":""
         "estado":""
         }`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width100 !h-[20vh]">
        <div className="w-[85%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            idMenu={idMenu}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p5",
                label: "Desde",
                type: "date",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[15vw]  text-[1vw]  ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p6",
                label: "Hasta",
                type: "date",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[15vw]  text-[1vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p1",
                label: "Usuario",
                type: "select",
                selectUrl: "/api/usuarios/",
                styles: {
                  styles: "labelInput inputStyles",
                  container: "!w-[18vw]  text-[1vw]  ",
                  labelProps: "labelInput",
                },
                data: escritura_lectura ? "" : userID,
                disabled: !escritura_lectura,
              },
              {
                name: "_p2",
                label: "Origen",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "OTAreas",
                styles: {
                  styles: "labelInput inputStyles ml-3 w-[18vw]",
                  container: "text-[1vw]  ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p3",
                label: "Destino",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "OTAreas",
                styles: {
                  styles: "labelInput inputStyles w-[18vw]",
                  container: "  text-[1vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p4",
                label: "Estado",
                type: "select",
                selectUrl: "/api/tipos/",
                tipos: "OTEstados",
                styles: {
                  styles: "labelInput inputStyles w-[18vw]",
                  container: " text-[1vw]  ",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[-0.5vw] translate-y-[2vw]"
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
            showAddButton={false}
            showCopiar={false}
            showExportButton={true}
            showDeleteButton={false}
            showExcelRepEntrega={false}
            showExcelRepFirma={false}
            showForwardButton={false}
            showRefreshButton={true}
            idMenu={idMenu}
            classname={"translate-x-[9vw] translate-y-[1.5vw]  !w-[6vw]"}
          />
        </div>
      </div>

      <div className="width100 overflow-y-auto h-[27vw]">
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
          tableHead={table_head_OT_bitacora_consulta}
          showEditButton={false}
          showPdfButton={false}
          showExcelButton={true}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
      <StateCountBar entities={entities} idMenu={idMenu} />

      {/* <Suspense>
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
        </Suspense> */}
    </div>
  );
};

export default MOTBitacora;
