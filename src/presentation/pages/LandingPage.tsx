/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { filterToggle } from "../components/FilterButton";
// import { compararFechas } from "../utils";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useIndexedDB } from "../hooks/useIndexedDB";

export const handleContainerClick = (event:React.MouseEvent<HTMLDivElement>) => {
  if (event.target instanceof Element) {
    if (event.target.classList.contains("mantenedorContainer")) {
      filterToggle.value = false
    }
  }
}


const LandingPage: React.FC = () => {
  // const navigate = useNavigate();
  // const { db, addToStore, getAllFromStore, deleteFromStore } = useIndexedDB('mi_base_de_datos', 1, 'mi_tienda');


  // const handleAdd = () => {
  //   const item = {
  //     codArmazon: 'AR-1234',
  //     stockActual: 10,
  //     stockReservado: 5,
  //     nuevoItem:'22'
  //   };
    
  //   addToStore(item)
  // };


  // const handleGet = () => {
  //   console.log(navigator.onLine)
  //   getAllFromStore((item:any)=>{
  //     console.log(item)
  //   })
  // };


  // React.useEffect(()=>{
  //   if(navigator.onLine){
  //     getAllFromStore((item:any)=>{
  //       console.log(item)
  //     })
  //     console.log('tomando todo lo de db local e mandarla a bd')
  //   }
  // },[navigator.onLine])

  // useEffect(()=>{
  //   const localStorageUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : [];

  //   if(localStorageUser["expiracion"]){

  //     compararFechas(localStorageUser["expiracion"]).then((result)=>{

  //       if(result === false){
  //         console.log('render')
  //           toast.error('Sesion Expirada')
  //           navigate('/login');
  //       }
  //     })
      
   
  //     //todo true = aun no expirado por ende pasar
  //   }
  // },[])

  // useEffect(()=>{
  //   const localStorageUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : [];
    
  //   if(!localStorageUser){
  //       toast.error('Sesion Expirada')
  //       navigate('/login');
  //   }
    
  // },[])



  return (
    <div className="mantenedorContainer !h-[80rem]">
      <div className="mt-8 h-full w-fullpt-20">
      {/* <button onClick={()=>handleAdd()}>Agregar</button> */}
      {/* <button onClick={()=>handleGet()}>GET DATOS</button> */}
      </div>
    </div>
  );
};

export default LandingPage;
