/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { filterToggle } from "../components/FilterButton";
import { compararFechas } from "../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();


  useEffect(()=>{
    const localStorageUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : [];

    if(localStorageUser["expiracion"]){
      console.log(localStorageUser["expiracion"])

      compararFechas(localStorageUser["expiracion"]).then((result)=>{
        console.log(result)

        if(result === false){
          console.log('render')
            localStorage.removeItem('user')
            toast.error('Sesion Expirada')
            navigate('/login');
        }
      })
      
   
      //todo true = aun no expirado por ende pasar
    }
  },[])


  useEffect(()=>{
    const localStorageUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : [];
    
    if(!localStorageUser){
        localStorage.removeItem('user')
        toast.error('Sesion Expirada')
        navigate('/login');
    }
    
  },[])



  return (
    <div className="mantenedorContainer !h-[80rem]">
      <div className="mt-8 h-full w-fullpt-20">
     
      </div>
    </div>
  );
};

export default LandingPage;
