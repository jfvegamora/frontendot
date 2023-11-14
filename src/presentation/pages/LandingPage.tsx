/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { filterToggle } from "../components/FilterButton";
import { AppStore, useAppSelector } from "../../redux/store";
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
  
  let key = 'puntosVentaTipos'
  
  const result = useAppSelector((store: AppStore) => store.listBoxTipos[key]);

  console.log(result)

  return (
    <div className="mantenedorContainer" onClick={handleContainerClick}>
      <div className="mt-16">

      </div>
    </div>
  );
};

export default LandingPage;
