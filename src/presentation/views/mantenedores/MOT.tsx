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
import { clearData, fetchColores, fetchOT } from "../../../redux/slices/OTSlice";
// import StateCountBarOT from "../../components/StateCountBarOT";
import { signal } from "@preact/signals-react";
import { updateActualArea } from "../../../redux/slices/OTAreasSlice";
import { fetchDioptriaParametros } from "../../../redux/slices/utilsSlice";
import { OTGrillaEnum } from "../../Enums";
// import { OTGrillaEnum } from "../../Enums";
// import axios from "axios";
// import { updateActualArea } from "../../../redux/slices/OTAreasSlice";
// import axios from "axios";

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

export const checkCount = signal(0);
export const totoalTrabajosSeleccionados = signal(0);



const strEntidad = " ";
const strBaseUrl = "/api/ot/";
const strQuery = "14";
// const idMenu = 1;
export const paramsOT     = signal('');
export const switchFetchOT = signal(true);


const FOT               = React.lazy(()=>import('../forms/FOT'))
const FilterButton      = React.lazy(()=>import('../../components/FilterButton')) 
const StateCountBarOT   = React.lazy(()=>import('../../components/StateCountBarOT')) 
const OTAreasButtons    = React.lazy(()=>import('../../components/OTAreasButtons')) 

const MOT: React.FC = () => {
  const { lectura } = usePermission(28);
  const dispatch = useAppDispatch()
  const [params, setParams] = useState([]);
  const {token}:any = useAppSelector((store: AppStore) => store.user);
  const areaActualOT:any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);
  const OTs:any = useAppSelector((store: AppStore) => store.OTS);
  const [_estadosOT, setEstadosOT] = useState()
  const [pktoDelete, setPkToDelete] = useState([]);
  
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

    const newPkToDelete = selectedRows?.map((row: number) => ({
      folio: OTs.data[row] && OTs.data[row][OTGrillaEnum.folio],
      estado_id: OTs.data[row] && OTs.data[row][OTGrillaEnum.estado_id],
      estado: OTs.data[row] && OTs.data[row][OTGrillaEnum.estado],
      estado_impresion: OTs.data[row] && OTs.data[row][OTGrillaEnum.estado_impresion],
      armazones: [{ codigo: OTs.data[row] && OTs.data[row][OTGrillaEnum.a1_armazon_id] }, { codigo: OTs.data[row] && OTs.data[row][OTGrillaEnum.a2_armazon_id] }],
      cristales: [{ codigo: OTs.data[row] && OTs.data[row][OTGrillaEnum.cr1_od] }, { codigo: OTs.data[row] && OTs.data[row][OTGrillaEnum.cr1_oi] }, { codigo: OTs.data[row] && OTs.data[row][OTGrillaEnum.cr2_od] }, { codigo: OTs.data[row] && OTs.data[row][OTGrillaEnum.cr2_oi] }],
      proyecto_codigo: OTs.data[row] && OTs.data[row][OTGrillaEnum.proyecto_titulo],
      proyecto: OTs.data[row] && OTs.data[row][OTGrillaEnum.proyecto],
      punto_venta: OTs.data[row] && OTs.data[row][OTGrillaEnum.punto_venta],
      tipo_anteojo: OTs.data[row] && OTs.data[row][OTGrillaEnum.tipo_anteojo_id],
      estado_validacion : OTs.data[row] && OTs.data[row][OTGrillaEnum.estado_validacion],
      numero_envio: OTs.data[row] && OTs.data[row][OTGrillaEnum.numero_envio],
      numero_reporte_firma: OTs.data[row] && OTs.data[row][OTGrillaEnum.numero_reporte_firma],
      numero_reporte_atencion: OTs.data[row] && OTs.data[row][OTGrillaEnum.numero_reporte_atencion],
      numero_orden_compra: OTs.data[row] && OTs.data[row][OTGrillaEnum.numero_oc],
      numero_factura: OTs.data[row] && OTs.data[row][OTGrillaEnum.numero_factura],
      numero_guia: OTs.data[row] && OTs.data[row][OTGrillaEnum.numero_guia],
      usuario_id: OTs.data[row] && OTs.data[row][OTGrillaEnum.usuario],
      ot_ubicacion: OTs.data[row] && OTs.data[row][OTGrillaEnum.ubicacion]
    }));

    setPkToDelete(newPkToDelete as any)

    checkCount.value = newPkToDelete.length
    


    totoalTrabajosSeleccionados.value = newPkToDelete?.reduce((acc:any,ot:any)=>{
      if(ot["tipo_anteojo"] === 3){
        acc = acc + 2
      }else{
        acc++
      }
      return acc
    },0)

  }, [selectedRows]);

  useEffect(() => {
   const interval = setInterval(() => {
    if(switchFetchOT.value === true){
      if(params[0] !== ''){
        dispatch(fetchOT({OTAreas:areaActualOT, searchParams:params[0]})) 
      }else{
        dispatch(fetchOT({OTAreas:areaActualOT}))
      }
    }
   }, 60000);
   
   return () => clearInterval(interval);
 }, [areaActualOT, dispatch, params]);



  useEffect(() => {
    dispatch(clearData())
    // dispatch(clearOTColores())
    dispatch(fetchColores(token))
    dispatch(updateActualArea(200 as any))
    if(!localStorage.getItem('dioptrias')){
      dispatch(fetchDioptriaParametros(token))
    }
  }, [])

  useEffect(() => {
    setEstadosOT(OTs.estadosOT)
  }, [OTs.estadosOT])

  // console.log(estadosOT)



  return (
    <div className="mantenedorContainer °bg-yellow-500">
      <div className="mt-4">
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
          idMenu={28}
          isOT={true}
        />

      </div>

      <Suspense>
        {Number.isInteger(areaActualOT) && (areaActualOT !== 200) && (
          <FilterButton
            className="top-[11.6rem] left-[3rem]"
            isOT={true}
          >

            <PrimaryKeySearch
              baseUrl={strBaseUrl}
              setParams={setParams}
              updateParams={updateParams}
              strQuery={strQuery}
              setEntities={setEntities}
              primaryKeyInputs={[
                { name: "_folio", label: "Folio", type: "text", 
                  styles:{
                    with: "labelInput inputStyles w-full",
                    container:"w-[10vw] !h-[6vh] translate-x-[-2vw]", 
                    labelProps: "labelInput"
                  } },
                { name: "_rut", label: "Rut", type: "text", 
                  styles:{
                    with: "labelInput inputStyles w-full",
                    container: "w-[10vw] !h-[6vh]    translate-x-[-6vw]",
                    labelProps: "labelInput"
                  } },
                
                { name: "_fecha_desde", label: "Atención Desde", type: "date", styles: {styles:"labelInput inputStyles",container:"w-[11vw] translate-x-[-2.5vw]" } },
                { name: "_fecha_hasta", label: "Atención Hasta", type: "date", styles: {styles:"labelInput inputStyles", container:"w-[11vw] translate-x-[-6vw]" } },
                { name: "_usuario", label: "Digitador/a", type: "select",selectUrl: "/api/usuarios/", styles: { styles: "!w-[24vw] inputStyles labelInput", container: " !w-[24vw] !z-30 text-[1vw] translate-x-[0.7vw] " } },
                
                { name: "_estado", label: "Estado", type: "select", selectUrl: "/api/tipos/", tipos: "OTEstados", styles: { styles: "!w-[20vw] labelInput inputStyles", container:" !w-[20vw] translate-x-[8.5vw] !h-[3vw] !z-30 text-[1vw] translate-y-[-0.3rem]",labelProps: "labelInput" }},
                { name: "_nombre", label: "Nombre", type: "text" , styles:{with: "labelInput inputStyles w-full",container:"!w-[29vw]   translate-x-[-6vw]",labelProps: "labelInput" } },
                { name: "_p1", label: "RBD", type: "text" , styles:{ with:"labelInput inputStyles !w-[8vw]", container:"w-[8vw] translate-x-[-7vw] ml-14", labelProps: "labelInput" } },
                
                { name: "_proyecto", label: "Proyecto", type: "select", selectUrl: "/api/proyectos/", styles: { styles: "!w-[20vw] labelInput inputStyles", container: "!w-[20vw]  translate-x-[-6vw] !text-[1vw] " }},
                { name: "_motivo", label: "Motivo", type: "select", selectUrl: "/api/tipos/", tipos: "OTMotivo", styles: { styles: "!w-[20vw] labelInput inputStyles", container:"w-[20vw] translate-x-[-1vw] text-[1vw] !h-[3vw] translate-y-[-0.3rem] z-30",labelProps: "labelInput" }},
                
                { name: "_p2", label: "Tipo Doc", type: "select", selectUrl: "/api/tipos/", tipos: "OTNumDoc", styles:{styles: "!w-[20vw] labelInput inputStyles", container: "w-[20.4vw] translate-x-[13.5vw] text-[1vw] !h-[3vw] !z-30 translate-y-[-0.3rem]",labelProps: "labelInput"}},
                { name: "_p3", label: "Número Doc", type: "text", styles: {   with: "labelInput inputStyles w-full", container:"translate-x-[18.5vw] !w-[23vw] !z-30 text-[1vw]  translate-y-[-0.5vw]",labelProps: "labelInput" }},
                
                { name: "_establecimiento", label: "Establecimiento", type: "select", selectUrl: "/api/establecimientos/", styles: { styles: "!w-[20vw] labelInput inputStyles", container: "!w-[25vw] translate-x-[4vw] !z-30  !text-[1vw] !translate-y-[0.3rem]",labelProps: "labelInput" }},
                { name: "_punto_venta", label: "Punto de Venta", type: "select", selectUrl: "/api/puntosventa/", styles: { styles: "!w-[20vw] labelInput inputStyles", container:" !w-[25vw] !translate-x-[-10.5vw] !z-30 !text-[1vw] translate-y-[5.5vw]",labelProps: "labelInput" }},
                { name: "_ubicacion", label: "Ubicación", type: "text" , styles:{ with:"labelInput inputStyles !w-[8vw]", container:"!relative w-[8vw] translate-y-[-5.7vw] translate-x-[-12vw] ml-14", labelProps: "labelInput" } },

              ]}
            />

          </FilterButton>
        )}
      </Suspense>



      <div className={`width100 scroll ${filterToggle.value ? "!mt-[13rem] !h-[25rem]" : "!mt-[1rem] !h-[61vh]"} `}>
      
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
          idMenu={28}
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

        <Suspense>
          {OTs?.data.length >= 1 && (
            <StateCountBarOT  checkCount={checkCount}/>
          )}
        </Suspense>
 
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
