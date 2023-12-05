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
import { TITLES, table_head_proyectos_cristales } from "../../utils";
import FProyectosCristales from "../forms/FProyectosCristales";
import FProyectosCristalesCopiar from "../forms/FProyectosCristalesCopiar";

const strEntidad = "Parametrización de Cristales ";
const strEntidadExcel = "Parametrizacion_de_Cristales";
const strBaseUrl = "/api/proyectocristales/";
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
  esferico_hasta 		=19,
  cilindrico_desde 	=20,
  cilindrico_hasta 	=21,
  diametro          =22,
  precio_venta_neto =23,
  observaciones     =24,
}



const MProyectosCristales: React.FC = () => {
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
      isModalCopiar,
      toggleEditModal,
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
  
    const [pkToDelete, setPkToDelete] = useState<string[]>([])
    const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
    
    useEffect(() => {    
      const newPkToDelete = selectedRows.map((row: number) => 
       `{"pk1":"${entities[row][EnumGrid.proyecto]}", "pk2":"${entities[row][EnumGrid.cod_grupo]}"}`);
      const combinedPks = newPkToDelete.join(',');
  
      setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
    }, [selectedRows]);

    return (
      <div className="mantenedorContainer">
        <div className="mantenedorHead width90">
        <div className="w-[75%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p1",
                label: "Proyecto (?)",
                type: "select",
                selectUrl: "/api/proyectos/", styles:{with:" !w-[33rem]"},
              },
              { name: "_p2", label: "Código Proyecto", type: "text", styles:{with:" !w-[9rem]"}, },
              { name: "_p3", label: "Código Licitación", type: "text", styles:{with:" !w-[9rem]"}, },
            ]}
            />
        </div>
  
          <PrimaryButtonsComponent
            handleAddPerson={openModal}
            handleDeleteSelected={handleDeleteSelected}
            handleRefresh={resetEntities}
            handleCopiar={toggleModalCopiar}
            params={params}
            pkToDelete={pkToDelete}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            showAddButton={true}
            showCopiar={true}
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
            tableHead={table_head_proyectos_cristales}
            showEditButton={true}
            showDeleteButton={false}
            idMenu={idMenu}
          />
        </div>
  
  
        {isModalInsert && (
          <FProyectosCristales
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
          <FProyectosCristales
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
        <FProyectosCristalesCopiar
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

export default MProyectosCristales;
