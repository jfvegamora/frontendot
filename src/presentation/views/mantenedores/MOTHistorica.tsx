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
import { ESTADO_OT, MOTIVO_OT, TITLES, table_head_OT_diaria, table_head_usuarios } from "../../utils";
import { OptionValuesMotivo } from "./MOT";
import FOT from "../forms/FOT";
import Garantia from "../../components/OTForms/FOTGarantia";
import Derivacion from "../../components/OTForms/FOTDerivacion";

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
  cliente_tipo = 17,
  cliente_sexo = 18,
  cliente_fecha_nacimiento = 19,
  cliente_direccion = 20,
  cliente_region_id = 21,
  cliente_region = 22,
  cliente_provincia_id = 23,
  cliente_provincia =24,
  cliente_comuna_id = 25,
  cliente_comuna = 26,
  cliente_telefono = 27,
  cliente_correo = 28,
  fecha_atencion = 29,
  fecha_entrega_taller = 30,
  fecha_despacho = 31,
  fecha_entrega_cliente = 32,
  punto_venta_id = 33,
  punto_venta = 34,
  numero_receta = 35,
  fecha_receta = 36,
  tipo_anteojo_id = 37,
  tipo_anteojo = 38,
  a1_od_esf = 39,
  a1_od_cil = 40,
  a1_od_eje = 41,
  a1_od_ad = 42,
  a1_oi_esf = 43,
  a1_oi_cil = 44,
  a1_oi_eje = 45,
  a1_oi_ad = 46,
  a1_dp = 47,
  a1_alt = 48,
  a1_grupo = 49,
  a2_od_esf = 50,
  a2_od_cil = 51,
  a2_od_eje = 52,
  a2_oi_esf = 53,
  a2_oi_cil = 54,
  a2_oi_eje = 55,
  a2_dp = 56,
  a2_grupo = 57,
  a1_opcion_vta_id = 58,
  a1_opcion_vta = 59,
  a1_armazon_id = 60,
  a1_armazon = 61,
  a2_opcion_vta_id=62,
  a2_opcion_vta=63,


  a2_armazon_id = 64,
  a2_armazon = 65,
  a3_opcion_vta_id = 66,
  a3_opcion_vta = 67,
  a3_armazon_id = 68,
  a3_armazon = 69,
  //CRISTALES
  cristal1_opcion_vta_id = 70,
  cristal1_opcion_vta = 71,
  cristal1_diseno_id = 72,
  cristal1_diseno = 73,
  cristal1_indice_id = 74,
  cristal1_indice = 75,
  cristal1_material_id = 76,
  cristal1_material = 77,
  cristal1_tratamiento_id = 78,
  cristal1_tratamiento = 79,
  cristal1_color_id = 80,
  cristal1_color = 81,
  cristal1_od = 82,
  cristal1_oi = 83,
  cristal1_tratamiento_adicional_id = 84,
  cristal1_tratamiento_adicional = 85,
  cristal2_od_opcion_venta_id = 86,
  cristal2_od_opcion_venta = 87,
  cristal2_diseno_id = 88,
  cristal2_diseno = 89,
  cristal2_indice_id = 90,
  cristal2_indice = 91,
  cristal2_material_id = 92,
  cristal2_material = 93,
  cristal2_tratamiento_id = 94,
  cristal2_tratamiento = 95,
  cristal2_color_id = 96,
  cristal2_color = 97,
  cristal2_od = 98,
  cristal2_oi = 99,
  cristal2_tratamiento_adicional_id = 100,
  cristal2_tratamiento_adicional = 101,
  //OPTICA
  motivo_garantia_id = 102,
  motivo_garantia = 103,
  folio_asociado = 104,
  resolucion_garantia_id = 105,
  resolucion_garantia = 106,
  worktracking = 107,
  nota_venta = 108,
  numero_factura = 109,
  folio_interno_mandante = 110,
  observaciones = 111
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
  console.log(entity)
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
          tableHead={table_head_OT_diaria}
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
