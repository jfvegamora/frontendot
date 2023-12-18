/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
// import { RiFileExcel2Line } from "react-icons/ri";

import { IconButton, Tooltip } from "@material-tailwind/react";
import { useCrud } from "../hooks";
import { EXCEL } from "../utils";
import useCustomToast from "../hooks/useCustomToast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';

type Props = {
  strBaseUrl?: any;
  params?: any;
  strEntidad?: string;
  customExport?:boolean;
  query?:string;
  entity?:any;
};


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


export const ExportCSV: React.FC<Props> = ({
  strBaseUrl,
  params,
  strEntidad,
  query,
  entity,
  customExport
}) => {
  const [isModalInsert, setisModalInsert] = useState(false);
  const [exportAll, setExportAll] = useState(false);
  const [exportTable, setExportTable] = useState(false);
  const { show } = useCustomToast();

  const { exportEntity } = useCrud(strBaseUrl || "");
  let queryString =  query ? query :"";

  if (params) {
    const paramNames = [
      "_p1",
      "_p2",
      "_p3",
      "_p4",
      "_pMarca",
      "_pProveedor",
      "_pDiseño",
      "_pIndice",
      "_pMaterial",
      "_pColor",
      "_pTratamiento",
      "_pDiametro",
      "_pEsferico",
      "_pCilindrico",
      "_id",
    ];
    queryString = params
      .map((value: string | string[], index: number) => {
        const paramName = paramNames[index];
        if (value.includes(`${paramName}=`)) {
          return value;
        }
        return value !== "" ? `${paramName}=${value}` : "";
      })
      .filter((param: string) => param !== "")
      .join("&");

  }

  const handleExport = (exportAll: boolean) => {
    setisModalInsert(false);
    if (exportAll) {
      setExportAll(true);
      setExportTable(false);
    } else {
      setExportAll(false);
      setExportTable(true);
    }
  };

  const exportExcel = (primaryKey:string, nombreExcel?:string,jsonData?:any) => {
    return exportEntity(primaryKey, nombreExcel, query, jsonData, customExport)
              .then(() => {
                show({
                  message: EXCEL.download,
                  type: "success",
                });
              })
              .catch((e) => console.log(e));
  }

  useEffect(() => {
    if(exportAll || exportTable){
      const primarykey = exportAll ? "" : queryString; 

      exportExcel(primarykey, strEntidad)
    }
  }, [exportAll, exportTable]);



  const handleExportEntity = () => {
    console.log('ejecutando caso de uso 2'); 

    console.log('query', query)
    console.log(strEntidad)
    
    if(entity){
      console.log(entity)
      const primaryKey =`_p1=${entity[1]}&_p2=${entity[4]}`;

      const nombreExcel = `${strEntidad}_${entity[1]}_${entity[5]}_${entity[6]}`
      // console.log('primaryKey',primaryKey)

      const data = [{
        proyecto: `${entity[1]}`,
        fecha_desde: `${entity[5]}`,
        fecha_hasta: `${entity[6]}`
      }]
      // const data = [{
      //   proyecto:"P01-2233Q1",
      //   fecha_desde:"2023-11-16",
      //   fecha_hasta:"2023-11-21"
      // }]

      console.log(data)
      const jsonData = JSON.stringify(data);

      exportExcel(primaryKey, nombreExcel, jsonData)
    }
  }

  return (
    <>
      <Tooltip content="Exportar">
        <IconButton variant="text" tabIndex={1} color="blue-gray" className="mx-2 primaryBtnIconButton">
        <FontAwesomeIcon icon={faDownload} className={` ${query ? "gridIcons" : "primaryBtnIcon"}`}
              onClick={() => {
                if(!query) return setisModalInsert(true)
                handleExportEntity()    
              }}  />
        </IconButton>

      </Tooltip>
          {!query && (
              <Modal
                isOpen={isModalInsert}
                onRequestClose={() => setisModalInsert(false)}
                contentLabel={EXCEL.title}
                style={customStyles}
                overlayClassName="overlay"
              >
                <h2 className="modalTitle">{EXCEL.title}</h2>
                <p className="modalSubTitle">{EXCEL.subTitle}</p>

                <div className="flex justify-center">
                  <button
                    onClick={() => handleExport(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  >
                    {EXCEL.exportAll}
                  </button>
                  <button
                    onClick={() => handleExport(false)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {EXCEL.exportUnit}
                  </button>
                  <button
                    onClick={() => setisModalInsert(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                  >
                    {EXCEL.cancel}
                  </button>
                </div>
              </Modal>
          )} 
    </>
  );
};
