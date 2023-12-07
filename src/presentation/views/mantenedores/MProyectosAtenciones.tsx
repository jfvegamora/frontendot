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
import { TITLES, table_head_proyectos_atenciones } from "../../utils";
import FProyectosAtenciones from "../forms/FProyectosAtenciones";

const strEntidad = "Reporte de Atención ";
const strEntidadExcel = "Reporte_de_Atencion";
const strBaseUrl = "/api/proyectoreporteatencion/";
const strQuery = "01";
const strQueryExcel = "query=06";
const idMenu = 19;

export enum EnumGrid {
  proyecto              =1, 
  titulo                =2, 
  licitacion            =3,
  folio_reporte         =4, 
  fecha_desde           =5, 
  fecha_hasta           =6, 
  cantidad_lentes       =7, 
  total_atenciones      =8, 
  orden_compra_mandante =9,
  fecha_vb              =10, 
  factura               =11, 
  fecha_factura         =12, 
  total_factura         =13, 
  nota_credito          =14, 
  fecha_ncredito        =15, 
  total_ncredito        =16, 
  nota_debito           =17, 
  fecha_ndebito         =18, 
  total_ndebito         =19, 
  guia_despacho         =20, 
  fecha_guia_despacho   =21, 
  observaciones         =22, 
}

const MProyectosAtenciones: React.FC = () => {
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
      toggleExcel
    } = useEntityUtils(strBaseUrl, strQuery);
  
    const [pkToDelete, setPkToDelete] = useState<string[]>([])
    const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
    
    useEffect(() => {    
      const newPkToDelete = selectedRows.map((row: number) => 
       `{"pk1":"${entities[row][EnumGrid.proyecto]}", "pk2":"${entities[row][EnumGrid.folio_reporte]}"}`);
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
            params={params}
            strEntidad={strEntidadExcel}
            strBaseUrl={strBaseUrl}
            pkToDelete={pkToDelete}
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
            tableHead={table_head_proyectos_atenciones}
            showEditButton={true}
            showExcelButton={true}
            idMenu={idMenu}

            queryExcel={strQueryExcel}
            strBaseUrl={strBaseUrl}
            strEntidad={strEntidadExcel}
            toggleExcel={toggleExcel}
          
          />
        </div>

        {/* {isModalInsert && ( */}
          <FProyectosAtenciones
            label={`${TITLES.ingreso} ${strEntidad}`}
            closeModal={closeModal}
            selectedRows={selectedRows}
            setEntities={setEntities}
            params={params}
            isEditting={false}
            escritura_lectura={escritura_lectura}
            />
        {/* )} */}
  
        {isModalEdit && (
          <FProyectosAtenciones
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

export default MProyectosAtenciones;
