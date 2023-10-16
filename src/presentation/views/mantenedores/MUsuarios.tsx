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
import FUsuarios from "../forms/FUsuarios";
import { TITLES, table_head_usuarios } from "../../utils";

export enum EnumGrid {
  id = 1,
  nombre = 2,
  telefono = 3,
  correo = 4,
  estado = 5,
  cargo_id = 6,
  cargo = 7,
}
const strEntidad = "Usuario ";
const strEntidadExcel = "Usuarios";
const strBaseUrl = "/api/usuarios/";
const strQuery = "01";
const idMenu = 24;

type PrimaryKey = {
  pk1: number;
};
const MUsuarios: React.FC = () => {
  const [params, setParams] = useState([]);
  const [totalRowIndex, setTotalRowIndex] = useState([]);
  const [shotRow, setShotRow] = useState(undefined)

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

  // console.log("params:", params);

  console.log(totalRowIndex)
  console.log(shotRow)
  useEffect(()=>{
    totalRowIndex.map((row)=>{
      console.log('render')
      if(row === shotRow){
        setSelectedRows((prev)=>[...prev, row])
        console.log('selectedRows',selectedRows)
      }
    })
    if( shotRow !== undefined &&!totalRowIndex.includes(shotRow)){
      alert('no esta')
    }
  },[shotRow,totalRowIndex])
  
  const pkToDelete: PrimaryKey[] = [];

  // console.log('pktodelete', pkToDelete)
  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      pk1: entities[row][EnumGrid.id],
    }));
    newPkToDelete.forEach((newPk: { pk1: any }) => {
      if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
        pkToDelete.push(newPk);
      }
    });
  }, [selectedRows]);

  const handleClick = (e:any) => {
    console.log(e.target.value)
    const number = parseInt(e.target.value)
    // setShotRow(number)
  }
 
  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Usuarios</h1>
    <input type="text" onChange={(e)=>handleClick(e)}></input>
      <div className="mantenedorHead width70 items-center">
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
            // {
            //   name      : "_p3",
            //   label     : "Tipo Insumos",
            //   type      : "select",
            //   selectUrl : "/api/tipos/",
            //   tipos     : "TipoInsumos"
            // },
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
          tableHead={table_head_usuarios}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
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
        />
      )}
    </div>
  );
};

export default MUsuarios;
