/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import {
  TableComponent,
} from "../../components";
import { useEntityUtils, usePermission } from "../../hooks";
import {  TITLES ,table_head_OT_diaria2 } from "../../utils";
import FOT from "../forms/FOT";
import OTAreasButtons from "../../components/OTAreasButtons";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
// import { URLBackend } from "../../hooks/useCrud";
import { fetchOT } from "../../../redux/slices/OTSlice";

export enum EnumGrid {
  id = 1,
  nombre = 2,
  telefono = 3,
  correo = 4,
  estado = 5,
  cargo_id = 6,
  cargo = 7,
}

export enum OptionValuesMotivo {
  Todos = 0,
  Venta = 1,
  Garantia = 2
}


export enum OptionValuesEstado {
  Todos = 0,
  Entregada = 1,
  Annulada = 2
}


const strEntidad = "Orden de Trabajo ";
const strBaseUrl = "/api/ot/";
const strQuery = "01";
const idMenu = 1;


const MOT: React.FC = () => {
  const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  const areaActual = OTAreas["areaActual"] 
  const OTs:any = useAppSelector((store: AppStore) => store.OTS);
  const dispatch = useAppDispatch();
  const [params, _setParams] = useState([]);
  // const [entitiesOT, setEntitiesOT] = useState([]);

  

  const { lectura} = usePermission(28);
  // console.log(lectura)
  // let a = JSON.parse(localStorage.getItem("ListBoxTipos") as string)  
  // console.log( a["cristalDiseño"] )

  // const updateParams = (newParams: Record<string, never>) => {
  //   setParams(Object.keys(newParams).map((key) => newParams[key]));
  // };

  const {
    //entities state
    // entities,
    setEntities,
    entity,
    //modal methods
    isModalInsert,
    isModalEdit,
    toggleEditModal,
    // openModal,
    closeModal,
    //Check methods
    handleSelect,
    selectedRows,
    setSelectedRows,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteSelected,
  } = useEntityUtils(strBaseUrl, strQuery);
  // console.log("entities:", entities);

  // console.log("params:", params);
  // console.log(entity)

  // const pkToDelete: PrimaryKey[] = [];

  // console.log('pktodelete', pkToDelete)
  // useEffect(() => {
  //   const newPkToDelete = selectedRows.map((row: number) => ({
  //     pk1: entitiesOT[row][EnumGrid.id],
  //   }));
  //   newPkToDelete.forEach((newPk: { pk1: any }) => {
  //     if (!pkToDelete.some((existingPk) => existingPk.pk1 === newPk.pk1)) {
  //       pkToDelete.push(newPk);
  //     }
  //   });
  // }, [selectedRows]);


  //SWR-POLLING
  // const fetcher = (url:string) => axios.get(url).then((res)=>res.data);
  // const {data} = useSWR(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas["areaActual"]}`, fetcher,{
  //   refreshInterval: 10000
  // });

  // console.log('data cambiada', validar_parametrizacion.value)
  useEffect(()=>{   
    dispatch(fetchOT(areaActual))
    const interval = setInterval(fetchOT, 10000);

  // Limpia el intervalo en la limpieza del efecto
    return () => clearInterval(interval);
  },[areaActual])

  console.log(OTs)

  // useEffect(()=>{
  //   if(data && data.length > 0){
  //     // toast.success( 'nueva OT')
  //     // const newData = data.slice(0,6)
  //     console.time('LLAMADA A API')
  //     setEntitiesOT(data)
  //     setEntities(data)
  //     // setRenderEntities(newData)
  //   }
  // },[data]);

  // const handleSelectedChange = (e:any) => {
  //   setSelectedValue(e.target.value)
  // }
  // console.log(OTs.data.slice(0,250))
  // console.log('selectedValue',selectedValue)
  return (
    <div className="mantenedorContainer">
      <div className="mt-8">
       
            <OTAreasButtons/>

      </div>

      {/* <div className="mantenedorHead width100 items-center">
        <select  
          className="bg-green-300"
          onChange={handleSelectedChange}
          value={selectedValue}
        >
          <option value="_p3=0">Todos</option>
          <option value="_p3=10">Adquisiciones</option>
          <option value="_p3=20">Calculo</option>
          <option value="_p3=30">Laboratorio</option>
          <option value="_p3=40">Proyectos</option>
          <option value="_p3=50">Venta</option>
          <option value="_p3=60">Bodega Insumos</option>
          <option value="_p3=70">Taller de corte</option>
          <option value="_p3=80">Taller de montaje</option>
          <option value="_p3=90">Bodega produccion terminados</option>
          <option value="_p3=100">Empaque</option>
        </select>

        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            // { name: "_p1", label: "Folio", type: "text" },
            // { name: "_p2", label: "Rut", type: "text" },
            // { name: "_p3", label: "Nombre", type: "text" },
            // { name: "_p4", label: "Desde", type: "date" },
            // { name: "_p5", label: "Hasta", type: "date" },
            // {
            //   name: "_p6",
            //   label: "Cargos",
            //   type: "select",
            //   selectUrl: "/api/cargos/",
            // },
            // {
            //   name: "_p6",
            //   label: "Cargos",
            //   type: "select",
            //   selectUrl: "/api/cargos/",
            // },
            // {
            //   name: "_p3",
            //   label: "Motivo",
            //   type: "radiobuttons",
            //   options: [
            //     MOTIVO_OT.todos,
            //     MOTIVO_OT.venta,
            //     MOTIVO_OT.garantia,
            //   ],
            //   values: OptionValuesMotivo,
            // },
            // {
            //   name: "_p3",
            //   label: "Estado",
            //   type: "radiobuttons",
            //   options: [
            //     ESTADO_OT.todos,
            //     ESTADO_OT.entregada,
            //     ESTADO_OT.anulada,
            //   ],
            //   values: OptionValuesMotivo,
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
          showImportCsv={true}
          idMenu={idMenu}
          isOT={true}
        />
      </div> */}

      
      <div className="scroll">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedRows={selectedRows}
          // pkToDelete={pkToDelete}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          data={OTs.data}
          tableHead={table_head_OT_diaria2}
          showEditButton={true}
          showDeleteButton={false}
          idMenu={idMenu}
          isOT={true}
        />

      </div>

      {isModalInsert && (
        <FOT
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          

        />
      )}

      {isModalEdit && (
        <FOT
          label={`${TITLES.edicion} ${strEntidad}`}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
          onlyRead={lectura}
        />
      )}
    </div>
  );
};

export default MOT;
