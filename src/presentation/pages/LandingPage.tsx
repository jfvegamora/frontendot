/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { filterToggle } from "../components/FilterButton";
import { AppStore, useAppSelector } from "../../redux/store";
import FOTImpresa from "../views/forms/FOTImpresa";

// import { FixedSizeList } from 'react-window';
// import TableOTComponent from "../components/TableOTComponent";
// import { table_head_OT_diaria } from "../utils";
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
  

  
  const result = useAppSelector((store: AppStore) => store.OTS);
  console.log(result)



  return (
    <div className="mantenedorContainer !h-[80rem]">
      <div className="mt-8 h-full w-fullpt-20">
        <FOTImpresa/>
      </div>
    </div>
  );
};

export default LandingPage;
