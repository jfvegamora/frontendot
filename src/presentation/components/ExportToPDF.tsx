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


    const handleGeneratePdf = async() => {
      const destino_id = rowData[0].split('=')[1];
      const result = await fetchEtiquetaDespacho(destino_id)
    
      if (!result) return;
      // console.log(etiqueta)
      const doc = new jsPDF();


      doc.setFontSize(28);

      const titulo = `${(result[0][0]).toUpperCase()}`

      const destinatario = `
          DESTINATARIO:          
              ${result[0][1]}
              ${result[0][2]}
              ${result[0][3]}
              ${result[0][4]}
      `;

      const remitente = `
          REMITENTE:
              ${result[0][5]}
              ${result[0][6]}
              ${result[0][7]}
              ${result[0][8]}
      `;

      doc.setFontSize(18)
      doc.text(titulo, 10, 13)

      doc.setFontSize(18);
      doc.text(destinatario, -15, 30);

      doc.setFontSize(12);
      doc.text(remitente, -10, 100);

      doc.save('etiqueta_despacho.pdf');
    };

    return (
          <>
              <Tooltip content="Etiqueta Despacho">
                  <IconButton
                    variant='text'
                    className='primaryBtnIcon'
                    color='blue-gray'
                    onClick={handleGeneratePdf}
                  >
                      <FaRegFileLines className="w-10 h-10" />
                  </IconButton>
              </Tooltip>
          </>
        )
};

export default ExportToPDF;
