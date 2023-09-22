/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useEntityUtils } from "../../hooks";
import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { TITLES, table_head_proyectos_grupos } from "../../utils";
import FProyectosGrupos from "../forms/FProyectosGrupos";

const strEntidad = "Parametrización de Grupos ";
const strEntidadExcel = "Parametrizacion_de_Grupos";
const strBaseUrl = "/api/proyectogrupos/";
const strQuery = "01";
const idMenu = 17;

export enum EnumGrid {
  proyecto          =1, 
  titulo            =2, 
  licitacion        =3,
  cod_grupo         =4,
  descripcion       =5,
  marca_id 		      =6,
  marca 				    =7,
  diseno_id 			  =8,
  diseno 	          =9,
  indice_id         =10,
  indice 	          =11,
  material_id 			=12,
  material 	        =13,
  color_id 		      =14,
  color 			      =15,
  tratamiento_id    =16,
  tratamiento 			=17,
  esferico_desde 		=18,
  cilindrico_desde 	=19,
  esferico_hasta 		=20,
  cilindrico_hasta 	=21,
  precio_venta_neto =22,
  observaciones     =23,
}

type PrimaryKey = {
  pk1: string;
  pk2: number;
};

const MProyectosGrupos: React.FC = () => {
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
    console.log("selectedRows", selectedRows);
  
    const pkToDelete: PrimaryKey[] = [];
  
    useEffect(() => {
      const newPkToDelete = selectedRows.map((row) => ({
        pk1: entities[row][EnumGrid.proyecto],
        pk2: entities[row][EnumGrid.cod_grupo],
      }));
      newPkToDelete.forEach((newPk) => {
        if (
          !pkToDelete.some(
            (existingPk) =>
              existingPk.pk1 === newPk.pk1 && existingPk.pk2 === newPk.pk2
          )
        ) {
          pkToDelete.push(newPk);
        }
      });
    }, [selectedRows]);
  
    // console.log('entities', entities)

    return (
      <div className="mantenedorContainer">
        <h1 className="mantenedorH1">Parametrización de Grupos</h1>
  
        <div className="mantenedorHead width70">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Proyecto",
                type: "select",
                selectUrl: "/api/proyectos/",
              },
              { name: "_p2", label: "Código Proyecto", type: "text" },
              { name: "_p3", label: "Código Licitación", type: "text" },
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
  
        <div className="width90 scroll">
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
            tableHead={table_head_proyectos_grupos}
            showEditButton={true}
            showDeleteButton={false}
            idMenu={idMenu}
          />
        </div>
  
        {isModalInsert && (
          <FProyectosGrupos
            label={`${TITLES.nueva} ${strEntidad}`}
            closeModal={closeModal}
            selectedRows={selectedRows}
            setEntities={setEntities}
            params={params}
            isEditting={false}
          />
        )}
  
        {isModalEdit && (
          <FProyectosGrupos
            label={`${TITLES.editar} ${strEntidad}`}
            selectedRows={selectedRows}
            setEntities={setEntities}
            params={params}
            data={entity}
            closeModal={closeModal}
            isEditting={true}
          />
        )}
      </div>
    );
  };

export default MProyectosGrupos;
