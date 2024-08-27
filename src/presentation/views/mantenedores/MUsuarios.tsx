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
import FUsuarios from "../forms/FUsuarios2";
import FUsuariosOT from "../forms/FUsuariosOT";
import { TITLES, table_head_usuarios } from "../../utils";

export enum EnumGrid {
  id = 1,
  nombre = 2,
  telefono = 3,
  correo = 4,
  estado = 5,
  cargo_id = 6,
  cargo = 7,

  //? PERMISOS AREAS
  permiso_resolucion = 8,
  permiso_compras = 9,
  permiso_calculo = 10,
  permiso_laboratorio = 11,
  permiso_ingreso = 12,
  permiso_control_produccion = 13,
  permiso_bodega_insumos = 14,
  permiso_biselado_1 = 15,
  permiso_biselado_2 = 16,
  permiso_taller_montaje = 17,
  permiso_qa = 18,
  permiso_bodega_p_terminados = 19,
  permiso_empaque = 20,

  //? PERMISOS CAMPOS - EDITAR CAMPOS OT
  permiso_editar_armazon = 21,
  permiso_editar_cristal_opcion_vta = 22,
  permiso_editar_estado_impresion = 23,
  permiso_editar_validar_parametrizacion = 24,
  permiso_editar_opcion_montaje = 25,
  permiso_editar_grupo_dioptria = 26,
  permiso_editar_receta = 27,
  permiso_editar_validar_cristales = 28,
  permiso_editar_validar_armazones = 29,
  permiso_editar_worktracking = 30,

  // PERMISOS BOTONES
  permiso_agregar = 31,
  permiso_editar = 32,
  permiso_imprimir = 33,
  permiso_exportar = 34,
  permiso_importar = 35,
  permiso_whatsapp = 36,
  permiso_procesar = 37,
  permiso_pausar = 38,
  permiso_derivar = 39,
  permiso_anular = 40,
  permiso_ingresar = 41,
  permiso_post_vta = 42,
  permiso_nguia = 43,
  permiso_nenvio = 44,
  permiso_macro_excel = 45,
  permiso_nfirma = 46,
  permiso_validar_armazon = 47,
  permiso_validar_cristal = 48,
  permiso_ubicar = 49,
  permiso_opciones_bod_ins = 50,
  permiso_nreporte_entrega = 51,
  permiso_noc = 52,
  permiso_confirmar_entrega = 53,
  permiso_pre_facturar = 54,
  permiso_vb = 55,
  permiso_facturar = 56,
  permiso_confirmar_pago = 57,
}

const strEntidad = "Usuario ";
const strEntidadExcel = "Usuarios";
const strBaseUrl = "/api/usuarios/";
const strQuery = "01";
const idMenu = 24;

const MUsuarios: React.FC = () => {
  const [params, setParams] = useState([]);
  const [totalRowIndex, _setTotalRowIndex] = useState([]);
  const [shotRow, _setShotRow] = useState(undefined);
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
    isModalPermisoOT,
    togglePermisoOTModal,
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

  useEffect(() => {
    totalRowIndex.map((row) => {
      if (row === shotRow) {
        setSelectedRows((prev) => [...prev, row]);
      }
    });
    if (shotRow !== undefined && !totalRowIndex.includes(shotRow)) {
      alert("no esta");
    }
  }, [shotRow, totalRowIndex]);

  const [pkToDelete, setPkToDelete] = useState<string[]>([]);
  const strParamsToDelete = "_p1"; // _p3/_p1/_pkToDelete

  useEffect(() => {
    const newPkToDelete = selectedRows.map(
      (row: number) => `${entities[row][EnumGrid.id]}`
    );
    const combinedPks = newPkToDelete.join(",");

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);
  // styles:{with: "!w-[8rem]", container: " !w-[8rem] translate-x-[-10rem]"} },
  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width70 relative">
        <div className="w-[85%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Nombre",
                type: "text",
                styles: {
                  with: "labelInput inputStyles w-full",
                  container: "w-[35vw] !text-[2vw]",
                  // labelProps: "!translate-y-[0.1vw] !text-[1.2vw] !font-[2vw] !z-30"
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p2",
                label: "Cargos",
                type: "select",
                selectUrl: "/api/cargos/",
                styles: {
                  with: "",
                  styles: "labelInput inputStyles w-full",
                  container: "!w-[35vw]  text-[1vw]",
                  // labelProps: "!translate-y-[-2vh] !text-[1.2vw] !font-[2vw]"
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" translate-x-[-7rem]"
          />
        </div>
        <div className="w-[15vw]">
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
            showImportCsv={true}
            idMenu={idMenu}
            classname={"translate-x-[-4vw] !w-[15vw]"}
          />
        </div>
      </div>

      <div className="width80 scroll">
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
          tableHead={table_head_usuarios}
          showEditButton={true}
          showDeleteButton={false}
          showPermisoOTButton={false}
          idMenu={idMenu}
          leftEdit={true}
          togglePermisoOTModal={togglePermisoOTModal}
          // setTotalRowIndex={setTotalRowIndex}
        />
      </div>

      {isModalInsert && (
        <FUsuarios
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <FUsuarios
          label={`${TITLES.edicion} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
          // escritura_lectura={escritura_lectura}
        />
      )}

      {isModalPermisoOT && (
        <FUsuariosOT
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

export default MUsuarios;
