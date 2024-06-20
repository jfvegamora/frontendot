/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { filterToggle } from "../components/FilterButton";
import axios from "axios";
// import { Link } from "react-router-dom";
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
    
  // // },[])
  const [text, setText] = React.useState('');
  const [number, setNumber] = React.useState();


  return (
    <div className="mantenedorContainer !h-[80rem]">
      <div className="mt-8 h-full w-fullpt-20">
      {/* <button onClick={()=>handleAdd()}>Agregar</button> */}
      {/* <button onClick={()=>handleGet()}>GET DATOS</button> */}
      {/* <Link to={"google.com"}>Link</Link> */}
      <div className="w-1/4 h-1/4 my-auto mx-auto bg-gray-400 px-10">
      <h1>Mensaje a mandar:</h1>
      <textarea name="" id="" onChange={(e)=>setText(e.target.value)}></textarea>
      <div>
        <h1>Numero</h1>
        <input type="text" name="" id="" onChange={(e)=>setNumber(e.target.value as any)} />
      </div>
      <button
      className="mx-10"
        onClick={async()=>{
          console.log(text)
          console.log(number)
          const body = {
            "numero": number,
            "mensaje": text
          }
          console.log(body)
          const response = await axios.post('http://localhost:3000/enviar-mensaje', body)

          console.log(response)
        }}
      >Enviar Mensaje</button>

      </div> 
      </div>
    </div>
  );
};

export default LandingPage;
