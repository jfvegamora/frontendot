/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils } from "../../hooks";
import FUsuarios from "../forms/FUsuarios";
import { ESTADO_OT, MOTIVO_OT, TITLES, table_head_OT_diaria, table_head_OT_historica, table_head_usuarios } from "../../utils";
import { OptionValuesMotivo } from "./MOTDiaria";
import FOT from "../forms/FOT";
import Garantia from "../../components/OTForms/FOTGarantia";
import Derivacion from "../../components/OTForms/Derivacion";

export enum EnumGrid {
  folio = 1,
  motivo = 2,
  area_id = 3,
  area = 4,
  estado_id = 5,
  estado = 6,
  estado_validacion_id = 7,
  estado_validacion = 8,
  estado_impresion_id = 9,
  estado_impresion = 10,
  proyecto_codigo = 11,
  proyecto_titulo = 12,
  establecimiento_id = 13,
  establecimiento = 14,
  cliente_rut = 15,
  cliente_nomnbre = 16,
  fecha_atencion = 17,
  fecha_entrega_taller = 18,
  fecha_despacho = 19,
  fecha_entrega_cliente = 20,
  punto_venta_id = 21,
  punto_venta = 22,
  numero_receta = 23,
  fecha_receta = 24,
  tipo_anteojo_id = 25,
  tipo_anteojo = 26,
  a1_od_esf = 27,
  a1_od_cil = 28,
  a1_od_eje = 29,
  a1_od_ad = 30,
  a1_oi_esf = 31,
  a1_oi_cil = 32,
  a1_oi_eje = 33,
  a1_oi_ad = 34,
  a1_dp = 35,
  a1_alt = 36,
  a1_grupo = 37,
  a2_od_esf = 38,
  a2_od_cil = 39,
  a2_od_eje = 40,
  a2_oi_esf = 41,
  a2_oi_cil = 42,
  a2_oi_eje = 43,
  a2_dp = 44,
  a2_grupo = 45,
  a1_opcion_venta_id = 46,
  a1_opcion_venta = 47,
  a1_armazon_id = 48,
  a1_armazon = 49,
  a1_armazon_opcion_venta_id = 50,
  a1_armazon_opcion_venta = 51,
  a2_armazon_id = 52,
  a2_armazon = 53,
  a2_armazon_opcion_venta_id = 54,
  a2_armazon_opcion_venta = 55,
  cristal1_od_codigo = 56,
  cristal1_od = 57,
  cristal1_oi_opcion_vta_id = 58,
  cristal1_oi_opcion_vta = 59,
  cristal1_oi_codigo = 60,
  cristal1_oi = 61,
  cristal1_trat_adicional_id = 62,
  cristal1_trat_adicional = 63,
  cristal2_od_opcion_venta_id = 64,
  cristal2_od_opcion_venta = 65,
  cristal2_od_codigo = 66,
  cristal2_od = 67,
  cristal2_oi_opcion_venta_id = 68,
  cristal2_oi_opcion_venta = 69,
  cristal2_oi_codigo = 70,
  cristal2_oi = 71,
  cristal2_tratamiento_adicional_id = 72,
  cristal2_tratamiento_adicional = 73,
  motivo_garantia_id = 74,
  motivo_garantia = 75,
  folio_asociado = 76,
  resolucion_garantia_id = 77,
  resolucion_garantia = 78,
  worktracking = 79,
  nota_venta = 80,
  numero_factura = 81,
  folio_mandante =82,
  observaciones = 83
}


const strEntidad = "Orden de Trabajo ";
const strEntidadExcel = "Ordenes de trabajo";
const strBaseUrl = "/api/othistorica/";
const strQuery = "01";
const idMenu = 1;

type PrimaryKey = {
  pk1: number;
};
const MUsuarios: React.FC = () => {
  const [params, setParams] = useState([]);

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
  // console.log("entities:", entities);

  // console.log("params:", params);

  const pkToDelete: PrimaryKey[] = [];

  // console.log('pktodelete', pkToDelete)
  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      pk1: entities[row][EnumGrid.folio],
    }));
    newPkToDelete.forEach((newPk: { pk1: any }) => {
      if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Órdenes de Trabajo</h1>

      <div className="mantenedorHead width90  items-center">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_folio", label: "Folio", type: "text" },
            { name: "_rut", label: "Rut", type: "text" },
            {
                name: "_proyecto",
                label: "Proyecto",
                type: "select",
                selectUrl: "/api/proyectos/",
              },
            { name: "_fecha_desde", label: "Desde", type: "date" },
          
            {
                name: "_motivo",
                label: "Motivo",
                type: "radiobuttons",
                options: [
                  MOTIVO_OT.todos,
                  MOTIVO_OT.venta,
                  MOTIVO_OT.garantia,
                ],
                values: OptionValuesMotivo,
              },
            {
                name: "_estado",
                label: "Estado",
                type: "radiobuttons",
                options: [
                  ESTADO_OT.todos,
                  ESTADO_OT.entregada,
                  ESTADO_OT.anulada,
                ],
                values: OptionValuesMotivo,
              },
              { name: "_nombre", label: "Nombre", type: "text" },
              
              {
                  name: "_establecimiento",
                  label: "Establecimiento",
                  type: "select",
                  selectUrl: "/api/establecimientos/",
                },
                { name: "_fecha_hasta", label: "Hasta", type: "date" },
            
            
          ]}
        />

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
          idMenu={idMenu}
        />
      </div>

      <div className="scroll">
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
          tableHead={table_head_OT_historica}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
        />
      </div>

        
      {isModalInsert && (
        <FOT
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <FOT
          label={`${TITLES.edicion} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
          isMOT={true}
        />
      )}
    </div>
  );
};

export default MUsuarios;
