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
import { TITLES, table_head_proyectos_direcciones } from "../../utils";
import FProyectosDirecciones from "../forms/FProyectosDirecciones";

const strEntidad = "Parametrización de Dirección de Despacho ";
const strEntidadExcel = "Direcciones_de_Despacho";
const strBaseUrl = "/api/proyectodireccionesdespacho/";
const strQuery = "01";
const idMenu = 18;

export enum EnumGrid {
  proyecto           =1, 
  titulo             =2, 
  licitacion         =3,
  establecimiento_id =4, 
  establecimiento    =5, 
  lugar              =6, 
  direccion          =7,
  telefono           =8,
  observaciones      =9, 
}


const MProyectosDirecciones: React.FC = () => {
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
  
    const [pkToDelete, setPkToDelete] = useState<string[]>([])
    const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
    
    useEffect(() => {    
      const newPkToDelete = selectedRows.map((row: number) => 
       `{"pk1":"${entities[row][EnumGrid.proyecto]}", "pk2":"${entities[row][EnumGrid.establecimiento_id]}"}`);
      const combinedPks = newPkToDelete.join(',');
  
      setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
    }, [selectedRows]);
  
    return (
      <div className="mantenedorContainer">
        <div className="mantenedorHead width90">
          <div className="w-[70%]">
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
          </div>
  
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
  
        <div className="width100 scroll">
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
            tableHead={table_head_proyectos_direcciones}
            showEditButton={true}
            showPdfButton={true}
            idMenu={idMenu}
          />
        </div>
  
        
        {isModalInsert && (
          <FProyectosDirecciones
            label={`${TITLES.ingreso} ${strEntidad}`}
            closeModal={closeModal}
            selectedRows={selectedRows}
            setEntities={setEntities}
            params={params}
            isEditting={false}
          />
        )}
  
        {isModalEdit && (
          <FProyectosDirecciones
            label={`${TITLES.edicion} ${strEntidad}`}
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

export default MProyectosDirecciones;
