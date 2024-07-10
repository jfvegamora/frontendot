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
import { table_head_OT_bitacora } from "../../utils";
// import { ProyectosDocumEnum } from "../../Enums";

const strEntidad = "Bitácora de OT ";
const strEntidadExcel = "bitacora_OT";
const strBaseUrl = "/api/otbitacorahistorica/";
const strQuery = "02";
const idMenu = 44;

// const FProyectosDocum = React.lazy(()=>import("../forms/FProyectosDocum"))

export enum EnumGrid {
  id = 0,
  fecha_hora = 1,
  usuario = 2,
  origen = 3,
  destino = 4,
  folio = 5,
  estado = 6,
  situacion = 7,
  observaciones = 8
}



const MOTBitacora: React.FC = () => {
    const [params, setParams] = useState([]);
    // const { escritura_lectura} = usePermission(idMenu || 0 );
    

  
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
       `{"fecha_desde":"", 
         "fecha_hasta":""
         "usuario":""
         "origen":""
         "destino":""
         "estado":""
         }`);
      const combinedPks = newPkToDelete.join(',');
  
      setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
    }, [selectedRows]);
  
    return (
      <div className="mantenedorContainer">
        <div className="mantenedorHead width100">
          <div className="w-[85%]">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              setParams={setParams}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_desde", label: "Desde", type: "date" },
                // { name: "_p3", label: "Hasta", type: "date", styles:{with:""}},
                { name: "_p3", label: "Hasta", type: "date", styles:{with:" !ml-[1rem]"}},
                  {
                  name: "_p1",
                  label: "Usuario",
                  type: "select",
                  selectUrl: "/api/usuarios/", styles:{with:"!ml-[2rem]"},
                  // selectUrl: "/api/usuarios/", styles:{with:" !w-[28rem] translate-y-[0.2rem]"},
                },
                {
                  name: "_p4",
                  label: "Origen",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "OTAreas", styles:{with:""},
                  // tipos: "OTAreas", styles:{with:"!mt-[0.5rem]  w-[17rem] translate-y-[0.1rem]"},
                },
                {
                  name: "_p4",
                  label: "Destino",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "OTAreas", styles:{with:""},
                  // tipos: "OTAreas", styles:{with:"!mt-[0.5rem]  w-[17rem] translate-y-[0.1rem]"},
                },
                {
                  name: "_p4",
                  label: "Estado",
                  type: "select",
                  selectUrl: "/api/tipos/",
                  tipos: "OTEstados", styles:{with:""},
                  // tipos: "OTAreas", styles:{with:"!mt-[0.5rem]  w-[17rem] translate-y-[0.1rem]"},
                },
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
            showAddButton={false}
            showCopiar={false}
            showExportButton={true}
            showDeleteButton={false}
            showExcelRepEntrega={false}
            showExcelRepFirma={false}
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
            tableHead={table_head_OT_bitacora}
            showEditButton={false}
            showPdfButton={false}
            showExcelButton={true}
            idMenu={idMenu}
            leftEdit={true}
            />
        </div>
  
        {/* <Suspense>
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
        </Suspense> */}

      </div>
    );
  };

export default MOTBitacora;
