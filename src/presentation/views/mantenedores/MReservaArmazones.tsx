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
import { ReservaArmazonesEnum } from "../../Enums";
// import FProyectosDocum from "../forms/FProyectosDocum";

const strEntidad = "Reserva de Armazones ";
const strEntidadExcel = "Reserva_Armazones";
const strBaseUrl = "/api/otreservaarmazones/";
const strQuery = "01";
const idMenu = 42;



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
       `{"rut":"${entities[row][ReservaArmazonesEnum.cliente_rut]}","punto_venta":${entities[row][ReservaArmazonesEnum.punto_venta_id]},"tipo_anteojo":${entities[row][ReservaArmazonesEnum.tipo_anteojo_id]},"armazon_1":"${entities[row][ReservaArmazonesEnum.cod_armazon1]}","armazon_2":"${entities[row][ReservaArmazonesEnum.cod_armazon2]}"}`);
      const combinedPks = newPkToDelete.join(',');
  
      setPkToDelete([`${strParamsToDelete}=[${combinedPks}]`]);
    }, [selectedRows]);
  
    return (
      <div className="mantenedorContainer">
        <div className="mantenedorHead width100 !h-[10rem]">
          <div className="w-[70%] -mt-20">
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              updateParams={updateParams}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_p5", label: "Armazon", type: "text", 
                  styles:{
                    with: "labelInput inputStyles w-full",
                    container:"w-[10vw] !text-[2vw] -translate-y-[0.3rem]", 
                    labelProps: "labelInput"
                  }
                },
                {
                    name: "_p2",
                    label: "Proyecto",
                    type: "select",
                    selectUrl: "/api/proyectos/", 
                    styles:{
                      styles:"labelInput inputStyles w-[40vw]",
                      container:"!w-[34vw]  text-[1vw] translate-y-[4vw] translate-x-[-10vw]", 
                      labelProps: "labelInput"
                    },
                },
                { name: "_p1", label: "RUT Benef.", type: "text", 
                  styles:{
                    with: "labelInput inputStyles w-full",
                    container:"w-[10vw] !text-[2vw] -translate-y-[0.3rem] translate-x-[-15vw]", 
                    labelProps: "labelInput"
                  }},
                {
                    name: "_p3",
                    label: "Punto Venta",
                    type: "select",
                    selectUrl: "/api/puntosventa/", 
                    styles:{
                      styles:"labelInput inputStyles",
                      container:"!w-[40vw]  text-[1vw] translate-x-[-13vw]", 
                      labelProps: "labelInput"
                    },
                },
                {
                    name: "_p4",
                    label: "Asesor Óptico",
                    type: "select",
                    selectUrl: "/api/usuarios/", 
                    styles:{
                      styles:"labelInput inputStyles !w-[20rem]",
                      container:"!w-[20vw]  text-[1vw] translate-x-[-10vw]", 
                      labelProps: "labelInput"
                    },
                },
                { name: "_p6", label: "Desde", type: "date", 
                  styles:{
                    labelProps: "labelInput",
                    container:"!w-[10vw]  text-[1vw] translate-x-[-7vw] ", 
                    styles:"labelInput inputStyles",
                  }},
                { name: "_p7", label: "Hasta", type: "date", 
                  styles:{
                    styles:"labelInput inputStyles",
                    container:"!w-[10vw]  text-[1vw] translate-x-[-8vw]", 
                    labelProps: "labelInput",
                  }},

              ]}
              classNameSearchButton=" translate-x-[-24vw] translate-y-[4.8vw]  z-30"
              />
          </div>
  
            <div className="w-[15%] translate-y-[2rem]">
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
                    classname={"translate-x-[17vw] !w-[10vw]  "}

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
