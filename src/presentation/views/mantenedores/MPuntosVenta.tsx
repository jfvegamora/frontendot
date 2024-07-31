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
import FPuntosVenta from "../forms/FPuntosVenta";
import { TITLES, table_head_puntos_venta } from "../../utils";

export enum EnumGrid {
  id = 1,
  descripcion = 2,
  tipo_id = 3,
  tipo = 4,
  direccion = 5,
  telefono = 6,
  encargado_id = 7,
  encargado = 8,
  almacen_armazones_id = 9,
  almacen_armazones = 10,
  almacen_cristales_id = 11,
  almacen_cristales = 12,
  almacen_accesorios_id = 13,
  almacen_accesorios = 14,
  observaciones = 15,
}

const strEntidad = "Punto de Venta ";
const strEntidadExcel = "Puntos de Venta";
const strBaseUrl = "/api/puntosventa/";
const strQuery = "01";
const idMenu = 4;


const MPuntosVenta: React.FC = () => {
  const [params, setParams] = useState([]);
  const { escritura_lectura} = usePermission(idMenu || 0 );

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

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.id]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width90">
        <div className="w-[68%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
                { name: "_p1", label: "Descripción", type: "text", 
                  styles:{
                    with: "labelInput inputStyles w-full",
                    container:"w-[15vw] !text-[2vw] translate-y-[-0.2vw]", 
                    labelProps: "labelInput"
                  }, },
              {
                name      : "_p2",
                label     : "Tipo",
                type      : "select",
                selectUrl : "/api/tipos/",
                tipos     : "PuntosVentaTipos", 
                styles:{
                  styles:"labelInput inputStyles w-full",
                  container:"!w-[20vw]  text-[1vw] translate-x-[0.5vw]", 
                  labelProps: "labelInput"
                },
              },
              {
                name: "_p3",
                label: "Bodega Armazones",
                type: "select",
                selectUrl: "/api/almacenes/", 
                styles:{
                  styles:"labelInput inputStyles w-[30vw]",
                  container:"!w-[30vw]  text-[1vw] translate-x-[0.5vw]", 
                  labelProps: "labelInput"
                },
                _p1: "1"
              },
              ]}
              classNameSearchButton=" translate-x-[12vw] translate-[0.4rem]"

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
            comilla={false}
            idMenu={idMenu}
            classname={"translate-x-[14vw] !w-[12vw]"}

          />
          </div>
      </div>

      <div className="width90 scroll">
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
          tableHead={table_head_puntos_venta}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>

      
      {isModalInsert && (
        <FPuntosVenta
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
        <FPuntosVenta
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

export default MPuntosVenta;
