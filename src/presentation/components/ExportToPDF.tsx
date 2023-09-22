import React from 'react'
import jsPDF from 'jspdf';
import { GrDocumentPdf } from "react-icons/gr";
import { IconButton, Tooltip } from '@material-tailwind/react';

const ExportToPDF = () => {
    const handleGeneratePdf= ()=>{
        const doc = new jsPDF();
        doc.text('contenido del pdf',10,10);
        doc.save('documento_prueba.pdf')
    }
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