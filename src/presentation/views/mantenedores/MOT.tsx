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
  useAppDispatch, 
  useAppSelector } from "../../../redux/store";
import FilterButton from "../../components/FilterButton";
import { clearData } from "../../../redux/slices/OTSlice";
import { signal } from "@preact/signals-react";
import { EnumGrid as EnumOT } from "./MOTHistorica";

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
const strQuery = "14";
const idMenu = 1;


const MOT: React.FC = () => {
  // const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
  // const areaActual = OTAreas["areaActual"] 
  const OTs:any = useAppSelector((store: AppStore) => store.OTS);
  const dispatch = useAppDispatch()
  // const dispatch = useAppDispatch();
  const [params, setParams] = useState([]);
  const [_estadosOT, setEstadosOT] = useState()
  const [ pktoDelete, setPkToDelete] = useState([]);
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


  useEffect(() => {
    const newPkToDelete = selectedRows.map((row: number) => ({
      folio       : OTs.data[row] && OTs.data[row][EnumGrid.id],
      armazones   : [{codigo: OTs.data[row] && OTs.data[row][13]}, {codigo: OTs.data[row] && OTs.data[row][14]}],
      cristales   : [{codigo: OTs.data[row] && OTs.data[row][16]}, {codigo: OTs.data[row] && OTs.data[row][17]}],
      proyecto    : OTs.data[row] && OTs.data[row][6],
      punto_venta : OTs.data[row] && OTs.data[row][5],

    }));
    console.log(newPkToDelete)
    setPkToDelete(newPkToDelete as any)
  }, [selectedRows]);

  console.log(pktoDelete)
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
    dispatch(clearData())
  },[])

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

        <div className="mantenedorHeadOT width100 !h-[4rem]  items-center">
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
            pkToDelete={pktoDelete}
            showRefreshButton={true}
            showImportCsv={true}
            idMenu={idMenu}
            isOT={true}
            />
        </div>

        <div>
          <FilterButton
            className="top-[10rem] left-[3rem] !h-[2rem]"
            isOT = {true}
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
                {
                  name: "_estado",
                  label: "OTEstado",
                  type: "select",
                  selectUrl:"/api/tipos/s",
                  tipos: "OTEstados"
                },              
              {
                    name: "_proyecto",
                    label: "Proyecto",
                    type: "select",
                    selectUrl: "/api/proyectos/",
                    styles:{with:"w-[21.6rem]"}
                  },
                { name: "_fecha_desde", label: "Desde", type: "date", styles:{with:"w-[19.3rem]  !h-[6rem]"} },
                { name: "_fecha_hasta", label: "Hasta", type: "date" ,styles:{with:"w-[19.3rem]  !h-[6rem]"}},
                // {name:"_motivo", label:"motivo",type:"radio" },
                { name: "_nombre", label: "Nombre", type: "text" },
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
      
      <div className="scroll !h-[30rem]">
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
