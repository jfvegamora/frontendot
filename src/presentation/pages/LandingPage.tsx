/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import FilterButton, { filterToggle } from "../components/FilterButton";
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
  return (
    <div className="mantenedorContainer" onClick={handleContainerClick}>
      <div className="mt-16">
      
        <FilterButton>
          <h1>Hola mundo</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero suscipit ab laboriosam quam laborum sed est in beatae. Facilis necessitatibus fugit error sequi consectetur id impedit voluptas est aperiam earum?
          </p>
        </FilterButton>
      </div>
    </div>
  );
};

export default LandingPage;
