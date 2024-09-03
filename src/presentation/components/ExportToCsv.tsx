/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { RiFileExcel2Line } from "react-icons/ri";

import { IconButton, Tooltip } from "@material-tailwind/react";
import { useCrud } from "../hooks";
import { EXCEL, handleAxiosError} from "../utils";
import useCustomToast from "../hooks/useCustomToast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { AppStore, useAppSelector } from "../../redux/store";
import { ProyectosDocumEnum } from "../Enums";
import { URLBackend } from "../utils/config";
// import axios from "axios";

// import { URLBackend } from "../hooks/useCrud";

type Props = {
  strBaseUrl?: any;
  params?: any;
  strEntidad?: string;
  customExport?:boolean;
  query?:string;
  entity?:any;
  OTAreas?:any;
  idMenu?:any;
  primaryButton?:boolean //si es falso signficia que es el boton de la grilla
};


// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     margin:'auto',
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     backgroundColor:'rgb(103 111 157 / 1)',
//     zIndex: 20 
//   },
// };



const ExportToCsv: React.FC<Props> = ({
  strBaseUrl,
  params,
  strEntidad,
  query,
  entity,
  customExport,
  OTAreas,
  primaryButton,
  idMenu
}) => {
  const [exportAll, setExportAll] = useState(false);
  const [exportTable, setExportTable] = useState(false);
  const { show } = useCustomToast();
  const token  = useAppSelector((store: AppStore) => store.user.token)
  const { exportEntity } = useCrud(strBaseUrl || "");
  // let queryString =  query ? query :"";
  
  // if (params) {
  //   // console.log(params)
  //   const paramNames = [
  //     "_p1",
  //     "_p2",
  //     "_p3",
  //     "_p4",
  //     "_pMarca",
  //     "_pProveedor",
  //     "_pDiseño",
  //     "_pIndice",
  //     "_pMaterial",
  //     "_pColor",
  //     "_pTratamiento",
  //     "_pDiametro",
  //     "_pEsferico",
  //     "_pCilindrico",
  //     "_id",
  //   ];
  //   queryString = params && params.slice(2)
  //   console.log(queryString)
  //   queryString = params.map((value: string | string[], index: number) => {
  //       const paramName = paramNames[index];
  //       if (value.includes(`${paramName}=`)) {
  //         return value;
  //       }
  //       return value !== "" ? `${paramName}=${value}` : "";
  //     })
  //     .filter((param: string) => param !== "")
  //     .join("&");

  // }

  const handleExport = (exportAll: boolean) => {
    if (exportAll) {
      setExportAll(true);
      setExportTable(false);
    } else {
      setExportAll(false);
      setExportTable(true);
    }
  };


  const exportExcel = (primaryKey:string, nombreExcel?:string,jsonData?:any) => {
    return exportEntity(primaryKey, nombreExcel, query, jsonData, customExport,OTAreas, idMenu)
              .then(() => {
                show({
                  message: EXCEL.download,
                  type: "success",
                });
                setExportTable(false)

              })
              .catch((e) => console.log(e));
  }

  useEffect(() => {
    if(exportAll || exportTable){
      const primarykey = exportAll ? "" : params; 
      exportExcel(primarykey, strEntidad)
      // handleClear()
    }
  }, [exportAll, exportTable]);



  const handleExportEntity = async() => {
    console.log('ejecutando caso de uso 2'); 
    if(entity){
      // const primaryKey =`_p1=${entity[1]}&_p2=${entity[4]}`;

      // const nombreExcel = `${strEntidad}_${entity[1]}_${entity[5]}_${entity[6]}`

      // const data = [{
      //   proyecto: `${entity[1]}`,
      //   fecha_desde: `${entity[5]}`,
      //   fecha_hasta: `${entity[6]}`
      // }]

      // const jsonData = JSON.stringify(data);

      // exportExcel(primaryKey, nombreExcel, jsonData)
      const _p1 = entity[ProyectosDocumEnum.proyecto]
      const _p2 = entity[ProyectosDocumEnum.tipo_doc_id]
      const _p3 = entity[ProyectosDocumEnum.numero_doc]

      console.log(_p1)
      console.log(_p2)
      console.log(_p3)

      // json = {
      //   "numero_reporte" : "",
      //   "proyecto"       : "",
      // }

      // "numero_reporte"
      // "query06"
      // "proyectoreporteentrega"
      // "proyectoreportefirma" 
      
      const jsonPkToDelete = [{
        "proyecto"  : _p1,
        "tipo_doc"  : _p2,
        "numero_doc": _p3,
      }]
      const entidad = _p2 === 1 ? "proyectoreporteentrega" : "proyectoreportefirma"

      // console.log(entidad)


      try {
        const {data} = await axios(`${URLBackend}/api/${entidad}/excelindividual/?query=06&_pkToDelete=${encodeURIComponent(JSON.stringify(jsonPkToDelete))}`,{
          headers: {
             'Authorization': token, 
           },
           responseType: "blob"
        })

        // console.log(data)


        const fileURL:string = URL.createObjectURL(
          new Blob([data], { type: "application/vnd.ms-excel" })
        );
        const currentDate = new Date();
        const formattedDate = currentDate
          .toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-");
  
          const link: HTMLAnchorElement = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("download", `${strEntidad}_${formattedDate}.xls`);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(fileURL);
      } catch (error) {
        handleAxiosError(error)
        console.log(error)
      }

    }
  }

  return (
    <>
      <Tooltip content="Exportar">
        <IconButton variant="text" tabIndex={1} color="blue-gray" className="mx-2 primaryBtnIconButton">
        <FontAwesomeIcon icon={faDownload} className={` ${query ? "gridIcons" : "primaryBtnIcon"}`}
              onClick={() => {
                if(primaryButton === true){
                  handleExport(true)
                  console.log('click')
                }else{
                  handleExportEntity()   
                  console.log('click')

                }
                
                // if(!query) return setisModalInsert((prev:any)=>!prev)
              }}  />
        </IconButton>
      </Tooltip>
       
    </>
  );
};



export default ExportToCsv;



// {!query && (
//   <Modal
//     isOpen={isModalInsert}
//     onRequestClose={() => setisModalInsert(false)}
//     contentLabel={EXCEL.title}
//     style={customStyles}
//     // className='bg-red-500'
//     overlayClassName="overlay"
//   >
//     <div className="w-full ">
//       <h2 className="modalTitle w-[60%] border-n mx-auto text-white ">{EXCEL.title}</h2>
//     </div>
//     <p className="modalSubTitle !text-white">{EXCEL.subTitle}</p>

//     <div className="flex justify-center z-40">
//       <Button
//         onClick={() => handleExport(true)}
//         className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 mr-2 rounded"
//       >
//         {EXCEL.exportAll}
//       </Button>
//       <Button
//         onClick={() => handleExport(false)}
//         className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
//       >
//         {EXCEL.exportUnit}
//       </Button>
//       <Button
//         onClick={() => setisModalInsert(false)}
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
//       >
//         {EXCEL.cancel}
//       </Button>
//     </div>
//   </Modal>
// )} 