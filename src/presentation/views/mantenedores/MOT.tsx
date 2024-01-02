/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, 
} from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils, usePermission } from "../../hooks";
import {  TITLES ,table_head_OT_diaria2 } from "../../utils";
import FOT from "../forms/FOT";
import OTAreasButtons from "../../components/OTAreasButtons";
import { AppStore, 
  useAppSelector } from "../../../redux/store";
import FilterButton from "../../components/FilterButton";

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
const strQuery = "14&_origen=40";
const idMenu = 1;


const MOT: React.FC = () => {
  // const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  // const areaActual = OTAreas["areaActual"] 
  const OTs:any = useAppSelector((store: AppStore) => store.OTS);
  const area:any = useAppSelector((store: AppStore) => store.OTAreas);
  // const dispatch = useAppDispatch();
  const [params, setParams] = useState([]);
  const [_estadosOT, setEstadosOT] = useState()
  // const areaActualRef = useRef(areaActual)
  // console.log(area)
  

  const { lectura} = usePermission(28);
  // console.log(lectura)
  // let a = JSON.parse(localStorage.getItem("ListBoxTipos") as string)  
  // console.log( a["cristalDiseño"] )

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  const {
    //entities state
    // entities,
    setEntities,
    entity,
    //modal methods
    isModalInsert,
    isModalEdit,
    toggleEditModal,
    toggleEditOTModal,
    openModal,
    closeModal,
    //Check methods
    handleSelect,
    selectedRows,
    setSelectedRows,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteSelected,
    resetEntities
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
  // useEffect(()=>{
  //   console.log('render')
  //   console.log(areaActual)
  //   console.log(areaActualRef.current)
    
  //   if (areaActualRef.current !== areaActual) {
  //     areaActualRef.current = areaActual; // Actualizar la referencia mutable
  //     dispatch(fetchOT(areaActual)); // Hacer la llamada inicial cuando el área cambie
  //   }
    
    

  //   const interval = setInterval(() => {
  //     console.log('render ot')
  //     dispatch(fetchOT(areaActualRef.current)); // Usar el área actual de la referencia mutable
  //   }, 60000);

  // // Limpia el intervalo en la limpieza del efecto
  //   return () => clearInterval(interval);
  // },[]);

  // console.log(OTs)
  // console.log(entity)

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

  // console.log(OTs.estadosOT)

  useEffect(()=>{
    setEstadosOT(OTs.estadosOT)
  },[OTs.estadosOT])

  // console.log(estadosOT)
  return (
    <div className="mantenedorContainer">
      <div className="mt-4">
        {/* <FilterButton
          isOT={true}
        >
              
        </FilterButton>
        */}
        <OTAreasButtons/>

      </div>

        <div className="mantenedorHead width100 !h-[4rem]  items-center !bg-red-400">

{/* <PrimaryKeySearch
  // baseUrl={strBaseUrl}
  // setParams={setParams}
  // updateParams={updateParams}
  // setEntities={setEntities}
  // primaryKeyInputs={[
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
    // ]}
  // /> */}

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          handleRefresh={resetEntities}
          params={params}
          // pkToDelete={pkToDelete}
          // strEntidad={strEntidadExcel}
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
        </div>

        <div>
          <FilterButton
            className="top-[12.5rem] left-[3rem]"
          >
            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              setParams={setParams}
              updateParams={updateParams}
              strQuery={strQuery}
              setEntities={setEntities}
              otHistorica={true}
              primaryKeyInputs={[
                { name: "_folio", label: "Folio", type: "text" },
                { name: "_rut", label: "Rut", type: "text" },
                { name: "_nombre", label: "Nombre", type: "text" },
                {
                    name: "_proyecto",
                    label: "Proyecto",
                    type: "select",
                    selectUrl: "/api/proyectos/",
                  },
                { name: "_fecha_desde", label: "Desde", type: "date", styles:{with:"w-[17.3rem]  !h-[6rem]"} },
                { name: "_fecha_hasta", label: "Hasta", type: "date" ,styles:{with:"w-[17.3rem]  !h-[6rem]"}},
                // {name:"_motivo", label:"motivo",type:"radio" },
                {
                    name: "_estado",
                    label: "OTEstado",
                    type: "select",
                    selectUrl:"/api/tipos/s",
                    tipos: "OTEstados"
                  },              
                {
                    name: "_motivo",
                    label: "OTMotivo",
                    type: "select",
                    selectUrl:"/api/tipos/s",
                    tipos: "OTMotivo"
                  },              
                  {
                      name: "_establecimiento",
                      label: "Establecimiento",
                      type: "select",
                      selectUrl: "/api/establecimientos/",
                    },
                
                
              ]}
            />
          </FilterButton>
        </div>
      
      <div className="scroll !h-[23rem]">
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          toggleEditOTModal={toggleEditOTModal}
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
        {/* <div className="w-full bg-red-300 bottom-0">
          <span>{estadosOT}</span>
        </div> */}

      {isModalInsert && (
        <FOT
          label={`${TITLES.ingreso} ${strEntidad}`}
          closeModal={closeModal}
          selectedRows={selectedRows}
          setEntities={setEntities}
          params={params}
          isEditting={false}
          isMOT={false}
          

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
          isMOT={false}
        />
      )}
    </div>
  );
};

export default MOT;
