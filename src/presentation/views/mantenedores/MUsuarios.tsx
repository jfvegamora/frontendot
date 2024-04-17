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
import FUsuarios from "../forms/FUsuarios";
import FUsuariosOT from "../forms/FUsuariosOT";
import { TITLES, table_head_usuarios } from "../../utils";

export enum EnumGrid {
  id                              = 1,
  nombre                          = 2,
  telefono                        = 3,
  correo                          = 4,
  estado                          = 5,
  cargo_id                        = 6,
  cargo                           = 7,

  
   //? PERMISOS ARCHIVO OT - OT HISTORICA
  permiso_documentacion_id        = 8,
  permiso_documentacion           = 9,
  permiso_post_venta_id           = 10,
  permiso_post_venta              = 11,

  //? PERMISOS AREAS
  permiso_control_id              = 12,
  permiso_control                 = 13,
  permiso_adquisiciones_id        = 14,
  permiso_adquisiciones           = 15,
  permiso_calculo_id              = 16,
  permiso_calculo                 = 17,
  permiso_laboratorio_id          = 18,
  permiso_laboratorio             = 19,
  permiso_venta_id                = 20,
  permiso_venta                   = 21,
  permiso_bodega_insumo_id        = 22,
  permiso_bodega_insumo           = 23,
  permiso_taller_biselado_id      = 24,
  permiso_Taller_biselado         = 25,
  permiso_taller_montaje_id       = 26,
  permiso_taller_montaje          = 27,
  permiso_bodega_p_terminados_id  = 28,
  permiso_bodega_p_terminados     = 29,
  permiso_empaque_id              = 30,
  permiso_empaque                 = 31,

    //? PERMISOS CAMPOS - EDITAR CAMPOS OT
  permiso_editar_armazon_id                  = 32,
  permiso_editar_armazon                     = 33,
  permiso_editar_cristal_id                  = 34,
  permiso_editar_cristal                     = 35,
  permiso_editar_estado_impresion_id         = 36,
  permiso_editar_estado_impresion            = 37,
  permiso_editar_validar_parametrizacion_id  = 38,
  permiso_editar_validar_parametrizacion     = 39,
  permiso_editar_resolucion_garantia_id      = 40,
  permiso_editar_resolucion_garantia         = 41,
  permiso_editar_grupo_dioptria_id           = 42,
  permiso_editar_grupo_dioptria              = 43,
  permiso_editar_receta_id                   = 44,
  permiso_editar_receta                      = 45,
  permiso_editar_validar_cristales_id        = 46,
  permiso_editar_validar_cristales           = 47,
  permiso_editar_validar_armazones_id        = 48,
  permiso_editar_validar_armazones           = 49,
  permiso_editar_worktracking_id             = 50,
  permiso_editar_worktracking                = 51
}



const strEntidad = "Usuario ";
const strEntidadExcel = "Usuarios";
const strBaseUrl = "/api/usuarios/";
const strQuery = "01";
const idMenu = 24;

const MUsuarios: React.FC = () => {
  const [params, setParams] = useState([]);
  const [totalRowIndex, _setTotalRowIndex] = useState([]);
  const [shotRow, _setShotRow] = useState(undefined)
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


  useEffect(()=>{
    totalRowIndex.map((row)=>{
      if(row === shotRow){
        setSelectedRows((prev)=>[...prev, row])
      }
    })
    if( shotRow !== undefined &&!totalRowIndex.includes(shotRow)){
      alert('no esta')
    }
  },[shotRow,totalRowIndex])
  
  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_p1' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => `${entities[row][EnumGrid.id]}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=${combinedPks}`]);
  }, [selectedRows]);
 
  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width70 relative">
        <div className="w-[60%]">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            setParams={setParams}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              { name: "_p1", label: "Nombre", type: "text" },
              {
                name: "_p2",
                label: "Cargos",
                type: "select",
                selectUrl: "/api/cargos/",
              },
            ]}
          />
        </div>
        <div className="w-[30%]  absolute -right-4">
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
