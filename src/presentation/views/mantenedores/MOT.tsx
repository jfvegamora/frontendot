/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Suspense,
  useEffect, useState,
} from "react";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useEntityUtils, usePermission } from "../../hooks";
import { TITLES, table_head_OT_diaria2 } from "../../utils";
// import FOT from "../forms/FOT";
// import OTAreasButtons from "../../components/OTAreasButtons";
import {
  AppStore,
  useAppDispatch,
  useAppSelector
} from "../../../redux/store";
import { filterToggle } from "../../components/FilterButton";
import { clearData, clearOTColores, fetchColores, fetchOT } from "../../../redux/slices/OTSlice";
// import StateCountBarOT from "../../components/StateCountBarOT";
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

const FOT               = React.lazy(()=>import('../forms/FOT'))
const FilterButton      = React.lazy(()=>import('../../components/FilterButton')) 
const StateCountBarOT   = React.lazy(()=>import('../../components/StateCountBarOT')) 
const OTAreasButtons    = React.lazy(()=>import('../../components/OTAreasButtons')) 

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
      armazones: [{ codigo: OTs.data[row] && OTs.data[row][15] }, { codigo: OTs.data[row] && OTs.data[row][16] }],
      cristales: [{ codigo: OTs.data[row] && OTs.data[row][18] }, { codigo: OTs.data[row] && OTs.data[row][19] }],
      proyecto_codigo: OTs.data[row] && OTs.data[row][7],
      proyecto: OTs.data[row] && OTs.data[row][8],
      punto_venta: OTs.data[row] && OTs.data[row][6],
      tipo_anteojo: OTs.data[row] && OTs.data[row][13]

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
      dispatch(fetchOT({OTAreas:areaActualOT})) // Llama fetchOT cada minuto con el área actual

    }
   }, 30000);
 
   return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
 }, [areaActualOT, dispatch, params]);


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



  return (
    <div className="mantenedorContainer">
      <div className="mt-4">
        {/* <FilterButton
          isOT={true}
        >
              
        </FilterButton>
        */}

        <Suspense>
          <OTAreasButtons  setSelectedRows={setSelectedRows} params={params} />
        </Suspense>

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

      <Suspense>
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
      </Suspense>



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
 

      <Suspense>
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
      </Suspense>
      
      <Suspense>
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
      </Suspense>
    </div>
  );
};

export default MOT;





// CALL spOT(3,  '1,50,10,"0","1", "1801-2023",257,"99-99" ,0 ,"2024-02-06","2024-02-06","2024-02-06","2024-02-06",8,0,"",1,-2.5,-2.5,7,0,-2.25,-3,9,0,60,0, "009-5T-CRN" ,"009-5T-CRN" ,0,0,0,0,0,0,0,"","" ,0,"20000001004",0,"20000001004",0,"",0,1,1,2,1,1,1,0,"100010007730","100010008380",0,0,0,0,0,0,0,0,0,"","",0,0,0,2,"0","0",0,0,"0",0,0,"0","0","0" ,0,"",1',   0 ,  '"99-99","prueba insert level 2",1, 1,"1986-04-04"," " ,44, "12312"," ", 257',     0   , '',      ''  ,       ''      ,       ''      , '1801-2023',         0         ,  50 ,  50 ,  10 ,      '0' ,  98 ,       0     , 'OT INGRESADA', '[{"codigo":"100010007730"},{"codigo":"100010008380"}]', '[{"codigo":"20000001004"},{"codigo":"20000001004"}]',    '""'          ,   '""'           ,      0         , 0  ,  0)
// Error interno: (1318, '1318 (42000): Incorrect number of arguments for PROCEDURE mtooptic_otdev.spCristales; expected 17, got 16', '42000')
