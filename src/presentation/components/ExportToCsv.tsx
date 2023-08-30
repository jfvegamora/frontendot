/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { RiFileExcel2Line } from "react-icons/ri";

import { IconButton, Tooltip } from "@material-tailwind/react";
import { useCrud } from "../hooks";

type Props = {
  strBaseUrl: any;
  params?: any;
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

export const ExportCSV: React.FC<Props> = ({ strBaseUrl, params }) => {
  const [isModalInsert, setisModalInsert] = useState(false);
  const [exportAll, setExportAll] = useState(false);
  const [exportTable, setExportTable] = useState(false);

  const { exportEntity } = useCrud(strBaseUrl);

  const searchParams = Object.entries(params)
    .map(([key, value]) =>
      key === "_p1" || value
        ? `${key}=${encodeURIComponent(value as string | number | boolean)}`
        : ""
    )
    .join("&");

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
  // const primaryKey = "_p1='prueb'&_p2='' "
  useEffect(() => {
    if (exportAll) {
      console.log("peticion descarga tabla completa");
      exportEntity()
        .then(() => {
          toast("Descargando archivo");
        })
        .catch((e) => console.log(e));
    } else if (exportTable) {
      exportEntity(searchParams)
        .then(() => {
          toast("Descargando archvios");
        })
        .catch((e) => console.log(e));
    }
  }, [exportAll, exportTable]);

  return (
    <>
      <Tooltip content="Exportar">
        {/* <Button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr- rounded'>
            </Button> */}
        <IconButton variant="text" color="blue-gray" className="mx-2">
          <RiFileExcel2Line
            className="w-10 h-10"
            onClick={() => setisModalInsert(true)}
          />
        </IconButton>
      </Tooltip>

      <Modal
        isOpen={isModalInsert}
        onRequestClose={() => setisModalInsert(false)}
        contentLabel="Confirmar Exportación"
        style={customStyles}
        overlayClassName="overlay"
      >
        <h2 className="text-2xl font-bold mb4">Confirmar Exportación</h2>
        <p className="text-gray-700 mb-4">¿Qué desea exportar?</p>

        <div className="flex justify-center">
          <button
            onClick={() => handleExport(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            Exportar todo
          </button>
          <button
            onClick={() => handleExport(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Exportar grilla actual
          </button>
          <button
            onClick={() => setisModalInsert(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
};
