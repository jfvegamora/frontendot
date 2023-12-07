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
// import FUsuarios from "../forms/FUsuarios";
import { ESTADO_OT, MOTIVO_OT, TITLES, table_head_OT_diaria } from "../../utils";
import { OptionValuesMotivo } from "./MOT";
import FOT from "../forms/FOT";

export enum EnumGrid {
  folio = 1,
  motivo = 2,
  area_id = 3,
  area = 4,
  estado_id = 5,
  estado = 6,
  validar_parametrizacion_id = 7,
  validar_parametrizacion = 8,
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
  oftalmologo_id = 29,
  oftalmologo    = 30,

  fecha_atencion = 31,
  fecha_entrega_taller = 32,
  fecha_despacho = 33,
  fecha_entrega_cliente = 34,
  punto_venta_id = 35,
  punto_venta = 36,
  numero_receta = 37,
  fecha_receta = 38,
  tipo_anteojo_id = 39,
  tipo_anteojo = 40,
  a1_od_esf = 41,
  a1_od_cil = 42,
  a1_od_eje = 43,
  a1_od_ad = 44,
  a1_oi_esf = 45,
  a1_oi_cil = 46,
  a1_oi_eje = 47,
  a1_oi_ad = 48,
  a1_dp = 49,
  a1_alt = 50,
  a1_grupo = 51,
  a2_od_esf = 52,
  a2_od_cil = 53,
  a2_od_eje = 54,
  a2_oi_esf = 55,
  a2_oi_cil = 56,
  a2_oi_eje = 57,
  a2_dp = 58,
  a2_grupo = 59,
  a1_opcion_vta_id = 60,
  a1_opcion_vta = 61,
  a1_armazon_id = 62,
  a1_armazon = 63,
  a2_opcion_vta_id=64,
  a2_opcion_vta=65,


  a2_armazon_id = 66,
  a2_armazon = 67,
  a3_opcion_vta_id = 68,
  a3_opcion_vta = 69,
  a3_armazon_id = 70,
  a3_armazon = 71,

  //CRISTALES ANTEOJO 1
  cristal1_opcion_vta_id = 72,
  cristal1_opcion_vta = 73,
  cristal1_marca_id = 74,
  cristal1_marca = 75,
  cristal1_diseno_id = 76,
  cristal1_diseno = 77,
  cristal1_indice_id = 78,
  cristal1_indice = 79,
  cristal1_material_id = 80,
  cristal1_material = 81,
  cristal1_tratamiento_id = 82,
  cristal1_tratamiento = 83,
  cristal1_color_id = 84,
  cristal1_color = 85,
  cristal1_diametro = 86,
  cristal1_od = 87,
  cristal1_oi = 88,
  cristal1_tratamiento_adicional_id = 89,
  cristal1_tratamiento_adicional = 90,

  //CRISTALES ANTEOJO 2
  cristal2_od_opcion_venta_id = 91,
  cristal2_od_opcion_venta = 92,
  cristal2_marca_id = 93,
  cristal2_marca = 94,
  cristal2_diseno_id = 95,
  cristal2_diseno = 96,
  cristal2_indice_id = 97,
  cristal2_indice = 98,
  cristal2_material_id = 99,
  cristal2_material = 100,
  cristal2_tratamiento_id = 101,
  cristal2_tratamiento = 102,
  cristal2_color_id = 103,
  cristal2_color = 104,
  cristal2_diametro = 105,
  cristal2_od = 106,
  cristal2_oi = 107,
  cristal2_tratamiento_adicional_id = 108,
  cristal2_tratamiento_adicional = 109,

  //OPTICA
  motivo_garantia_id = 110,
  motivo_garantia = 111,
  folio_asociado = 112,
  resolucion_garantia_id = 113,
  resolucion_garantia = 114,
  worktracking = 115,
  nota_venta = 116,
  numero_factura = 117,
  folio_interno_mandante = 118,
  total = 119,
  observaciones = 120
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
