/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState } from "react";
// import { RiFileExcel2Line } from "react-icons/ri";

import { IconButton, Tooltip } from "@material-tailwind/react";
import { useCrud } from "../hooks";
import { EXCEL } from "../utils";
import useCustomToast from "../hooks/useCustomToast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsDownToLine } from '@fortawesome/free-solid-svg-icons';

type Props = {
  strBaseUrl?: any;
  params?: any;
  strEntidad?: string;
  customExport?:boolean;
  query?:string;
  entity?:any;
  customExporTooltip?:string;
};


const ExportCustomCSV: React.FC<Props> = ({
  strBaseUrl,
  strEntidad,
  query,
  customExport,
  customExporTooltip
}) => {
  const [_isModalInsert, setisModalInsert] = useState(false);
  const { show } = useCustomToast();

  const { exportEntity } = useCrud(strBaseUrl || "");


  const nombreExcel = `${strEntidad}`


  const exportExcel = (primaryKey?:string, nombreExcel?:string,jsonData?:any) => {
    return exportEntity(primaryKey, nombreExcel, query, jsonData, customExport)
              .then(() => {
                show({
                  message: EXCEL.download,
                  type: "success",
                });
              })
              .catch((e) => console.log(e));
  }



  const handleExportEntity = () => {
    exportExcel(strEntidad,nombreExcel)
  }



  return (
    <>
      <Tooltip content={customExporTooltip}>
        <IconButton variant="text" tabIndex={1} color="blue-gray" className="mx-2 primaryBtnIconButton">

        <FontAwesomeIcon icon={faArrowsDownToLine} className={` ${"primaryBtnIcon"}`}
              onClick={() => {
                if(!query) return setisModalInsert(true)
                handleExportEntity()    
              }}  />
        </IconButton>

      </Tooltip>
        
    </>
  );
}
export default ExportCustomCSV
