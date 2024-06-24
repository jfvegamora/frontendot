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
import { TITLES, table_head_proyectos_docum } from "../../utils";
import FProyectosDocum from "../forms/FProyectosDocum";

const strEntidad = "Documentación del Proyecto ";
const strEntidadExcel = "Documentacion_del_Proyecto";
const strBaseUrl = "/api/proyectodocum/";
const strQuery = "01";
const idMenu = 38;

export enum EnumGrid {
  proyecto        =1, 
  titulo          =2,
  fecha_hora      =3,
  tipo_doc_id     =4,
  tipo_doc        =5,
  numero_doc      =6,
  fecha_doc       =7,
  total_neto      =8,
  tipo_doc_ref_id =9,
  tipo_doc_ref    =10,
  numero_doc_ref  =11,
  usuario_id      =12,
  usuario         =13,
  observaciones   =14,
}


const MProyectosDocum: React.FC = () => {
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
    // console.log("entities:", entities);
    // console.log("selectedRows", selectedRows);
  
    const [pkToDelete, setPkToDelete] = useState<string[]>([])
    const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
    
    useEffect(() => {    
      const newPkToDelete = selectedRows.map((row: number) => 
       `{"pk1":"${entities[row][EnumGrid.proyecto]}", "pk2":"${entities[row][EnumGrid.fecha_hora]}"}`);
      const combinedPks = newPkToDelete.join(',');
  
      setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
    }, [selectedRows]);
  
    return (
      <div className="mantenedorContainer">
        <div className="mantenedorHead width100">
          <div className="w-[75%]">
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
                  selectUrl: "/api/proyectos/", styles:{with:" !w-[28rem] translate-y-[0.2rem]"},
                },
                {
                  name: "_p4",
                  label: "Tipo Doc",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "TipoDoc", styles:{with:"!mt-[0.5rem]  w-[17rem] translate-y-[0.1rem]"},
                  _p1:"1,2,3,4,5,6,7,8"
                },
                { name: "_p2", label: "N° Documento", type: "text", styles:{with:" !w-[9rem]"},},
                // { name: "_p2", label: "Código Proyecto", type: "text", styles:{with:" !w-[9rem]"}, },
                // { name: "_p3", label: "Código Licitación", type: "text", styles:{with:" !w-[9rem]"}, },
              ]}
              classNameSearchButton=" translate-x-[2rem]"
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
            showCopiar={false}
            showExportButton={true}
            showDeleteButton={true}
            showExcelRepEntrega={true}
            showExcelRepFirma={true}
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
            tableHead={table_head_proyectos_docum}
            showEditButton={false}
            showPdfButton={false}
            showExcelButton={true}
            idMenu={idMenu}
            leftEdit={true}
            />
        </div>
  
        
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

      </div>
    );
  };

export default MProyectosDocum;
