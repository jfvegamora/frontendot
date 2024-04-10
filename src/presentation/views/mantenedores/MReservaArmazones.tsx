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
import { table_head_reserva_armazones } from "../../utils";
// import FProyectosDocum from "../forms/FProyectosDocum";

const strEntidad = "Reserva de Armazones ";
const strEntidadExcel = "Reserva_Armazones";
const strBaseUrl = "/api/otreservaarmazones/";
const strQuery = "01";
const idMenu = 42;

export enum EnumGrid {
  cliente_rut            =1,
  proyecto               =2, 
  proyecto_titulo        =3,
  punto_venta_id         =4,
  punto_venta            =5,
  tipo_anteojo_id        =6,
  tipo_anteojo           =7,
  numero_receta          =8,
  dp                     =9,
  cod_armazon1           =10,
  cod_armazon2           =11,
  cod_armazon3           =12,
  usuario_id             =13,
  usuario                =14,
}


const MReservaArmazones: React.FC = () => {
    const [params, setParams] = useState([]);
    // const { escritura_lectura} = usePermission(idMenu || 0 );
    

  
    const updateParams = (newParams: Record<string, never>) => {
      setParams(Object.keys(newParams).map((key) => newParams[key]));
    };
  
    const {
      //entities state
      entities,
      setEntities,
    //   entity,
      //modal methods
    //   isModalInsert,
    //   isModalEdit,
      toggleEditModal,
      toggleModalCopiar,
      openModal,
    //   closeModal,
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
       `{
        "rut"           :"${entities[row][EnumGrid.cliente_rut]}", 
        "punto_venta"   : ${entities[row][EnumGrid.punto_venta_id]}, 
        "tipo_anteojo"  : ${entities[row][EnumGrid.tipo_anteojo_id]},
        "armazon_1"     :"${entities[row][EnumGrid.cod_armazon1]}",
        "armazon_2"     :"${entities[row][EnumGrid.cod_armazon2]}"  
      }`);
      const combinedPks = newPkToDelete.join(',');
  
      setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
    }, [selectedRows]);
  
    return (
      <div className="mantenedorContainer">
        <div className="mantenedorHead width100">
          <div className="w-[90%]">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              setParams={setParams}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_p5", label: "Armazon", type: "text", styles:{with:" !w-[9rem] !-ml-4"}},
                {
                    name: "_p2",
                    label: "Proyecto",
                    type: "select",
                    selectUrl: "/api/proyectos/", styles:{with:" !w-[20rem] !-ml-4"},
                },
                { name: "_p1", label: "Rut", type: "text", styles:{with:" !w-[7rem] !-ml-4"}},
                {
                    name: "_p3",
                    label: "Punto de Venta",
                    type: "select",
                    selectUrl: "/api/puntosventa/", styles:{with:" !w-[18rem] !-ml-4"},
                },
                {
                    name: "_p4",
                    label: "Usuarios",
                    type: "select",
                    selectUrl: "/api/usuarios/", styles:{with:" !w-[18rem] !-ml-4"},
                },
              ]}
              />
          </div>
  
            <div className="w-[19rem] ">
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
                    showDeleteButton={true}
                    showForwardButton={false}
                    showRefreshButton={true}
                    idMenu={idMenu}
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
            strBaseUrl={strBaseUrl}
            tableHead={table_head_reserva_armazones}
            showEditButton={false}
            showPdfButton={false}
            showExcelButton={true}
            idMenu={idMenu}
            leftEdit={true}
            />
        </div>
  
        


      </div>
    );
  };

export default MReservaArmazones;
