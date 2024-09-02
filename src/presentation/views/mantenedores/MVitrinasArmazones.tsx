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
import { TITLES, table_head_vitrinas_armazones} from "../../utils";
import FVitrinasArmazones from "../forms/FVitrinasArmazones";
import FVitrinasArmazonesCopiar from "../forms/FVitrinasArmazonesCopiar";


export enum EnumGrid {
  vitrina_id          = 1,
  vitrina             = 2,
  punto_venta_id      = 3,
  punto_venta         = 4,
  codigo_armazon      = 5,
  estado              = 6,
  proveedor_id        = 7,
  proveedor           = 8,
  tipo_id             = 9,
  tipo                = 10,
  marca_id            = 11,
  marca               = 12,
  modelo              = 13,
  color               = 14,
  material_id         = 15,
  material            = 16,
  aro                 = 17,
  puente              = 18,
  diagonal            = 19,
  brazo               = 20,
  uso_id              = 21,
  uso                 = 22,
  stock_minimo        = 23,
}
const strEntidad = "Parametrización de Vitrinas ";
const strEntidadExcel = "Parametrizacion_de_vitrinas";
const strBaseUrl = "/api/vitrinasarmazones/";
const strQuery = "01";
const idMenu   = 35;


const MVitrinasArmazones: React.FC = () => {
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
  // console.log("entities:", entities);
  // console.log("selectedRows", selectedRows);

  const [pkToDelete, setPkToDelete] = useState<string[]>([])
  const strParamsToDelete = '_pkToDelete' // _p3/_p1/_pkToDelete
  
  useEffect(() => {    
    const newPkToDelete = selectedRows.map((row: number) => 
     `{"pk1":"${entities[row][EnumGrid.vitrina_id]}", "pk2":"${entities[row][EnumGrid.codigo_armazon]}"}`);
    const combinedPks = newPkToDelete.join(',');

    setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
  }, [selectedRows]);

  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width80">
      <div className="w-[60%] mantenedorHeadSub">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            {
              name: "_p2",
              label: "Vitrina",
              type: "select",
              selectUrl: "/api/vitrinas/", 
              styles:{
                styles:"labelInput inputStyles",
                container:"!w-[40vw]  text-[1vw]", 
                labelProps: "labelInput"
              }
            },
            { name: "_p3", label: "Código Armazón", type: "text", 
              styles:{
                styles:"labelInput inputStyles ",
                container:"!w-[15vw] !text-[2vw] !translate-x-[4vw]", 
                labelProps: "labelInput"
              }, },
            // { name: "_p3", label: "Código Licitacion", type: "text", styles:{with:" !w-[9rem]"}, },
          ]}
          classNameSearchButton=" translate-x-[15vw]"
          
        />
      </div>

          <div className="w-[15%]">
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
              // showCustomExportButton={true}
              // customExporTooltip={"Exportar muestrarios"}
              idMenu={idMenu}
              bln_egreso={false}
              classname={"translate-x-[17vw]  !w-[15vw]"}


            />


          </div>
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
          tableHead={table_head_vitrinas_armazones}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          leftEdit={true}
        />
      </div>
   


      {isModalInsert && (
        <FVitrinasArmazones
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
        <FVitrinasArmazones
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
        <FVitrinasArmazonesCopiar
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

export default MVitrinasArmazones;
