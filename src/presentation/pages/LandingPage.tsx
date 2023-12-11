/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { filterToggle } from "../components/FilterButton";
import { AppStore, useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchOT } from "../../redux/slices/OTSlice";
import { FixedSizeList } from 'react-window';
import TableOTComponent from "../components/TableOTComponent";
import { table_head_OT_diaria } from "../utils";
// import FrameComponent from "../components/FrameComponent";
export const handleContainerClick = (event:React.MouseEvent<HTMLDivElement>) => {
  if (event.target instanceof Element) {
    if (event.target.classList.contains("mantenedorContainer")) {
      // Hacer algo cuando se hace clic dentro de "mantenedorContainer"
      console.log("Clic dentro de mantenedorContainer");
      filterToggle.value = false
    }
  }
}

const LandingPage: React.FC = () => {
  
  let key = 'puntosVentaTipos';
  const itemCount = 1000; // Cantidad total de elementos
  const itemSize = 50; 
  
  const dispatch = useAppDispatch()
  const result = useAppSelector((store: AppStore) => store.OTS);
  console.log(result)

  useEffect(()=>{
    dispatch(fetchOT())
  },[])
  const renderItem = () => (
    <div>
      {result.data.length > 1 && result.data.map((ot:any,index:any)=>(
        <h1 key={index}>{ot[3]}</h1>
      ))}
    </div>
  );

  return (
    <div className="mantenedorContainer">
      <div className="mt-16 scroll">
          {/* <FixedSizeList
          height={500} // Altura de la lista visible en píxeles
          width={900} // Ancho de la lista visible en píxeles
          itemCount={itemCount}
          itemSize={itemSize}
          >
          
          {renderItem}
    </FixedSizeList> */}
    <TableOTComponent
      tableHead={table_head_OT_diaria}
      entidad={"ot"}
      idMenu={20}
    />
      </div>
    </div>
  );
};

export default LandingPage;
