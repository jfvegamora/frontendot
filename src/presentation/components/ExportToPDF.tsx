import React,{useEffect, useState} from 'react'
import jsPDF from 'jspdf';
import { GrDocumentPdf } from "react-icons/gr";
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useCrud } from '../hooks';

interface IExportToPdf{
  proyecto_codigo?:string;
  establecimiento_id?: number;
  strBaseUrl?:string
}

const ExportToPDF:React.FC<IExportToPdf> = ({
  proyecto_codigo,
  establecimiento_id,
  strBaseUrl
}) => {
  const [etiqueta, setEtiqueta] = useState();
  const {ListEntity} = useCrud(strBaseUrl || '');


  


    useEffect(() => {
      const fetchData = () => {
        const primaryKeys = `_p1=${proyecto_codigo}&_p2=${establecimiento_id}`;
        const query = '06';
  
        ListEntity(primaryKeys, query)
          .then((data) => {
            setEtiqueta(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      // Llama a fetchData cuando se monta el componente
      fetchData();
    }, [proyecto_codigo, establecimiento_id]);
  
    const handleGeneratePdf = () => {
      if (!etiqueta) return;
      // console.log(etiqueta)
      const doc = new jsPDF();

      
      doc.setFontSize(32);
      

      const destinatario = `
        DESTINATARIO:

          LUGAR DESPACHO:     ${etiqueta[0][0]}
          DIRECCION:          ${etiqueta[0][1]}
          TELEFONO:           ${etiqueta[0][2]}
      `;

      const remitente = `
        DE:

          EMPRESA:           ${etiqueta[0][3]}
          TELEFONO:          ${etiqueta[0][4]}
          CORREO:            ${etiqueta[0][5]}

      `;

      doc.text(destinatario, -10, 30);
      doc.text(remitente, -10, 180);
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
                <GrDocumentPdf className="w-8 h-8" />
            </IconButton>
        </Tooltip>
    </>
  )
}

export default ExportToPDF