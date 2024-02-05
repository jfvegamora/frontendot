/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect, useState,
} from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils, usePermission } from "../../hooks";
import { TITLES, table_head_OT_diaria2 } from "../../utils";
import FOT from "../forms/FOT";
import OTAreasButtons from "../../components/OTAreasButtons";
import {
  AppStore,
  useAppDispatch,
  useAppSelector
} from "../../../redux/store";
import FilterButton, { filterToggle } from "../../components/FilterButton";
import { clearData, clearOTColores, fetchColores, fetchOT } from "../../../redux/slices/OTSlice";
import StateCountBarOT from "../../components/StateCountBarOT";
import { signal } from "@preact/signals-react";
import { updateActualArea } from "../../../redux/slices/OTAreasSlice";

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




const strEntidad = " ";
const strBaseUrl = "/api/ot/";
const strQuery = "14";
const idMenu = 1;
export const paramsOT = signal('')


const MOT: React.FC = () => {
  // const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  // const areaActual = OTAreas["areaActual"] 
  const OTs:any = useAppSelector((store: AppStore) => store.OTS);
  const areaActualOT:any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);
  const dispatch = useAppDispatch()
  // const dispatch = useAppDispatch();
  const [params, setParams] = useState([]);
  const [_estadosOT, setEstadosOT] = useState()
  const [pktoDelete, setPkToDelete] = useState([]);
  // const areaActualRef = useRef(areaActual)
  // console.log(area)


  const { lectura } = usePermission(28);
  // console.log(lectura)
  // let a = JSON.parse(localStorage.getItem("ListBoxTipos") as string)  
  // console.log( a["cristalDiseño"] )
  
  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };
  
  // console.log(paramsOT.value)
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


  
  useEffect(() => {
    const newPkToDelete = selectedRows?.map((row: number) => ({
      folio: OTs.data[row] && OTs.data[row][EnumGrid.id],
      estado_id: OTs.data[row] && OTs.data[row][3],
      estado: OTs.data[row] && OTs.data[row][4],
      estado_impresion: OTs.data[row] && OTs.data[row][5],
      armazones: [{ codigo: OTs.data[row] && OTs.data[row][14] }, { codigo: OTs.data[row] && OTs.data[row][15] }],
      cristales: [{ codigo: OTs.data[row] && OTs.data[row][17] }, { codigo: OTs.data[row] && OTs.data[row][18] }],
      proyecto_codigo: OTs.data[row] && OTs.data[row][7],
      proyecto: OTs.data[row] && OTs.data[row][8],
      punto_venta: OTs.data[row] && OTs.data[row][6],

    }));
    setPkToDelete(newPkToDelete as any)
  }, [selectedRows]);


  const checkCount = signal(pktoDelete.length)

  useEffect(() => {

    ; // Llama inicialmente cuando cambia el área
  //  console.log(areaActualRef)
   const interval = setInterval(() => {
    if(params[0] !== ''){
      // console.log('render')
      dispatch(fetchOT({OTAreas:areaActualOT, searchParams:params[0]})) // Llama fetchOT cada minuto con el área actual
      
    }else{
      console.log('render')
      dispatch(fetchOT({OTAreas:areaActualOT})) // Llama fetchOT cada minuto con el área actual

    }
   }, 30000);
 
   return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
 }, [areaActualOT, dispatch, params]);
 
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

  useEffect(() => {
    dispatch(clearData())
    dispatch(clearOTColores())
    dispatch(fetchColores())
    dispatch(updateActualArea(undefined))
  }, [])

  useEffect(() => {
    setEstadosOT(OTs.estadosOT)
  }, [OTs.estadosOT])

  // console.log(estadosOT)

  console.log(params)


  return (
    <div className="mantenedorContainer">
      <div className="mt-4">
        {/* <FilterButton
          isOT={true}
        >
              
        </FilterButton>
        */}
        <OTAreasButtons  setSelectedRows={setSelectedRows} params={params} />

      </div>

      <div className="mantenedorHeadOT width100 !h-[4rem]  items-center ">
        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          handleRefresh={resetEntities}
          setSelectedRows={setSelectedRows}
          params={params}
          // pkToDelete={pkToDelete}
          // strEntidad={strEntidadExcel}
          entities={OTs.data}
          strBaseUrl={strBaseUrl}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          pkToDelete={pktoDelete}
          showRefreshButton={true}
          showImportCsv={true}
          idMenu={idMenu}
          isOT={true}
        />
      </div>

      <FilterButton
        className="top-[10rem] left-[3rem]"
        isOT={true}
      >

        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          setParams={setParams}
          updateParams={updateParams}
          strQuery={strQuery}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_folio", label: "Folio", type: "text" },
            { name: "_rut", label: "Rut", type: "text" },

            { name: "_fecha_desde", label: "Atención Desde", type: "date", styles: { with: "w-[18.2rem]  !h-[6rem]" } },
            { name: "_fecha_hasta", label: "Atención Hasta", type: "date", styles: { with: "w-[18.2rem]  !h-[6rem]" } },

            { name: "_estado", label: "Estado", type: "select", selectUrl: "/api/tipos/", tipos: "OTEstados", styles: { with: "w-[20.4rem]" }},
            { name: "_establecimiento", label: "Establecimiento", type: "select", selectUrl: "/api/establecimientos/", styles: { with: "w-[20.4rem]" }},

            { name: "_nombre", label: "Nombre", type: "text" },
            { name: "_motivo", label: "Motivo", type: "select", selectUrl: "/api/tipos/", tipos: "OTMotivo"},

            { name: "_p2", label: "Tipo Doc", type: "select", selectUrl: "/api/tipos/", tipos: "OTNumDoc"},
            { name: "_p3", label: "Número Doc", type: "text", styles: { with: "w-[18.4rem]" }},

            { name: "_proyecto", label: "Proyecto", type: "select", selectUrl: "/api/proyectos/", styles: { with: "w-[30rem]" }},

          ]}
        />

      </FilterButton>


      <div className={`width100 scroll ${filterToggle.value ? "!mt-[13rem] !h-[25rem]" : "!mt-[1rem] !h-[27rem]"} `}>
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          toggleEditOTModal={toggleEditOTModal}
          pkToDelete={pktoDelete}
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

      {/* 
      <div className="w-[80%] bg-white absolute bottom-[2%] flex">
        {Object.keys(OTs.estadosOT).map((estadoID, index) => {
          const estadoNombre = estadoIDNombre[estadoID];
          const derivacionColor = OTs.derivacionColores[estadoNombre];

          if (derivacionColor) {
            const backgroundColor = derivacionColor[1];
            const textColor = derivacionColor[0];

            return (
              <div className="flex" key={index}>
                <p style={{ backgroundColor, color: textColor }} className="mx-2 w-[6rem] text-center">
                  {estadoNombre}:
                </p>
                <label className="w-8 text-center">{OTs.estadosOT[estadoID]}</label>
                {estadoNombre === 'Por Vencer' && (
                <h1>hola</h1>
                )}
              </div>
            );
          }

          return null; 
        })}
        
        {OTs.estadosOT.hasOwnProperty(99) && (
          <div className="w-[8rem]  flex bg-black">
              <p className="text-center mx-auto text-white">Por vencer: </p> <label className="text-center text-white">{OTs.estadosOT[99]}</label>        
          </div>
        )}

    </div> */}

      <StateCountBarOT  checkCount={checkCount}/>



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
