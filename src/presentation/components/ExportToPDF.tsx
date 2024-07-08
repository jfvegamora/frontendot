import React from 'react'
import jsPDF from 'jspdf';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { ProyectosDestinosEnum } from '../Enums';
import { FaRegFileLines } from "react-icons/fa6";
import axios from 'axios';
import { URLBackend } from '../hooks/useCrud';
import { toast } from 'react-toastify';


interface IExportToPdf{
  rowData?:any,
  establecimiento_id?: number;
  strBaseUrl?:string
}

const ExportToPDF:React.FC<IExportToPdf> = ({
  rowData,
  strBaseUrl

}) => {
  let enumGrid = {}
  console.log(strBaseUrl)
  
  switch (strBaseUrl) {
    case  '/api/proyectodestinos/':
      enumGrid = ProyectosDestinosEnum
      break;
  
    default:
      break;
  }

  console.log(enumGrid)
  const fetchEtiquetaDespacho = async(destino_id:string) => {
    const loadingToast = toast.loading('Cargando...')
    try {
      const {data} = await axios(`${URLBackend}/api/proyectodestinos/listado/?query=06&_p1=${destino_id}`)
      toast.dismiss(loadingToast)
      return data
    } catch (error) {
      toast.dismiss(loadingToast)
      console.log(error)
      throw new Error()
    }
  }

    // useEffect(() => {
    //   const fetchData = () => {
    //     const primaryKeys = `_p1=${proyecto_codigo}&_p2=${establecimiento_id}`;
    //     const query = '06';
  
    //     ListEntity(primaryKeys, query)
    //       .then((data) => {
    //         setEtiqueta(data);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };
  
    //   // Llama a fetchData cuando se monta el componente
    //   fetchData();
    // }, [proyecto_codigo, establecimiento_id]);
  
    const handleGeneratePdf = async() => {
      const destino_id = rowData[0].split('=')[1];
      const result = await fetchEtiquetaDespacho(destino_id)
    
      if (!result) return;
      // console.log(etiqueta)
      const doc = new jsPDF();

      console.log('click')
      doc.setFontSize(32);
      

      const destinatario = `
        DESTINATARIO:

          LUGAR DESPACHO:
            ${result[0][1]}
          DIRECCION:
            ${result[0][2]}
          TELEFONO:
            ${result[0][3]}
      `;

      const remitente = `
        REMITENTE:

          NOMBRE:
            ${result[0][7]}
          DIRECCION:
            ${result[0][9]}
          TELEFONO:
            ${result[0][10]}

      `;

      doc.text(destinatario, -22, 30);
      doc.text(remitente, -22, 180);
      doc.save('etiqueta_despacho.pdf');
    };

    return (
          <>
              <Tooltip content="Exportar a PDF">
                  <IconButton
                    variant='text'
                    color='blue-gray'
                    onClick={handleGeneratePdf}
                  >
                      <FaRegFileLines className="w-8 h-8" />
                  </IconButton>
              </Tooltip>
          </>
        )
};

export default ExportToPDF;
