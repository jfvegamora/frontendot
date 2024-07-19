import React from 'react'
import { IconButton, Tooltip } from '@material-tailwind/react';
import { FaRegFileLines } from "react-icons/fa6";
import axios from 'axios';
import { URLBackend } from '../hooks/useCrud';
import { Document, Page, StyleSheet, View, Text, PDFDownloadLink } from '@react-pdf/renderer';


interface IExportToPdf{
  rowData?:any,
  establecimiento_id?: number;
  strBaseUrl?:string
}


const splitTextIntoLines = (text:any, maxLength:any) => {
  if(text){
    const words = text?.split(' ');
    let lines = [];
    let currentLine = words[0];
  
    words.slice(1).forEach((word:any) => {
      if (currentLine.length + word.length + 1 <= maxLength) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
  
    lines.push(currentLine);
    return lines;
  }
};


const ExportToPDF:React.FC<IExportToPdf> = ({
  rowData 
}) => {
  const [etiquetaData, setEtiquetaData] = React.useState<any>([[]]);

  // const [renderDocument, setRenderDocument] = React.useState(false);
  // let enumGrid = {}
  let id_destino = ''

  if(rowData && rowData[0]){
    id_destino = rowData && rowData[0]?.split('=')[1] || '';
  }
  

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: 'white',
       wordBreak: 'break-word'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      width: 100,
    },
    title:{
      flexDirection: 'row',
      fontSize: 32,
      marginBottom:20, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      wordBreak: 'break-word',
      whiteSpace: 'nowrap', // Wrap prevention
      width: '100%', // Increased width
      wrap: true

    },
    destinatario_section:{
      marginBottom:20
    },
    remitente_section:{
      marginBottom:20
    },
    destinatario_campo:{
      fontSize: 28, 
      marginLeft: 30
    },
    destinatario_title:{
      fontSize: 32, 
      fontWeight: 'bold', 
    },

    remitente_title:{
      fontSize: 22,
      fontWeight: 'bold', 
    },
    remitente_campo:{
      fontSize: 14, 
      marginLeft: 30
    }



  })

  const fetchEtiquetaDespacho = async(destino_id:string) => {
    try {
      if(destino_id === ''){
        return;
      }
      const {data} = await axios(`${URLBackend}/api/proyectodestinos/listado/?query=06&_p1=${destino_id}`)
      setEtiquetaData(data || [])
      return data
    } catch (error) {
      throw new Error()
    }
  }



    const renderPDF = () => {
      const title = etiquetaData[0] ? etiquetaData[0][0] : '';
      const titleLines = splitTextIntoLines(title, 30) || [] // Ajusta el valor 25 según tus necesidades
      const nombreLines = splitTextIntoLines(etiquetaData[0][1], 40) || [];
      const direccionLineas = splitTextIntoLines(etiquetaData[0][2], 40) || [];

      return(
        <Document>
                  <Page size={"A4"} style={styles.page}>
                    <View style={styles.section}>
                    {etiquetaData && etiquetaData.length > 0 && etiquetaData.map((item:any, index:any) => (
                        //?TITULO PDF
                        <View key={index}>
                          {/* <Text style={styles.title} key={item[0]}>{item[0]}</Text> */}
                          {titleLines.map((line, lineIndex) => (
                            <Text style={styles.title} key={`title-${lineIndex}`}>{line}</Text>
                          ))}
                          <View style={styles.destinatario_section} key={'destino_section'}>
                             <Text style={styles.destinatario_title} key={'Destinatario'}>{'Destinatario:'}</Text>


                             {nombreLines.map((line, lindeIndex)=>(
                               <Text style={styles.destinatario_campo} key={lindeIndex}>{line}</Text>
                             ))}

                             {direccionLineas.map((line, lineIndex)=>(
                               <Text style={styles.destinatario_campo} key={lineIndex}>{line}</Text>
                             ))}

                             <Text style={styles.destinatario_campo} key={item[4]}>{item[4]}</Text>
                             <Text style={styles.destinatario_campo} key={item[3]}>{item[3]}</Text>
                          </View>

                          <View style={styles.remitente_section} key={'remitente_section'}>
                             <Text style={styles.remitente_title} key={'Remitente'}>{'Remitente:'}</Text>
                             <Text style={styles.remitente_campo} key={item[5]}>{item[5]}</Text>
                             <Text style={styles.remitente_campo} key={item[6]}>{item[6]}</Text>
                             <Text style={styles.remitente_campo} key={item[8]}>{item[8]}</Text>
                             <Text style={styles.remitente_campo} key={item[7]}>{item[7]}</Text>
                          </View>
                        
                        </View>
                     ))}
                    </View>
                  </Page>
        </Document>
      )
    }
    

    React.useEffect(() => {
      if (rowData.length > 0) {
        if(id_destino !== ''){
          fetchEtiquetaDespacho(id_destino);
        }
      }
    }, [rowData]);


    return (
          <>
              
                  <PDFDownloadLink document={renderPDF()} fileName="etiqueta_despacho.pdf">
                    {() => (
                      <Tooltip content="Etiqueta Despacho">
                        <IconButton 
                          type="button" 
                          variant='text' 
                          color='blue-gray' 
                          onClick={async() => {
                            console.log(!etiquetaData.length)
                            if (!etiquetaData.length) {
                              await fetchEtiquetaDespacho(rowData[0].split('=')[1]);
                            }
                          }}
                        >
                          <FaRegFileLines className="w-10 h-10" />
                        </IconButton>
                      </Tooltip>
                    )}
                 </PDFDownloadLink>
          </>
        )
};

export default ExportToPDF;





// const handleGeneratePdf = async() => {
//   const destino_id = rowData[0].split('=')[1];
//   const result = await fetchEtiquetaDespacho(destino_id)
//   const maxLineWidth = 200;

//   // if (!result) return;
//   // // console.log(etiqueta)
//   // const doc = new jsPDF();


//   // doc.setFontSize(28);

//   // const titulo = `${(result[0][0]).toUpperCase()}`

//   // // const destinatario_head = `
//   // //     DESTINATARIO:          
//   // //         ${result[0][1]}
//   // //         ${result[0][2]}
//   // //         ${result[0][3]}
//   // //         ${result[0][4]}
//   // // `;
//   // const destinatario_head = `
//   //     DESTINATARIO:          
//   //         ${result[0][1]}
//   //         ${result[0][2]}
//   // `;


//   // const destinatario_body = `
//   //         ${result[0][3]}
//   //         ${result[0][4]}
//   // `;

//   // const remitente = `
//   //     REMITENTE:
//   //         ${result[0][5]}
//   //         ${result[0][6]}
//   //         ${result[0][7]}
//   //         ${result[0][8]}
//   // `;

//   // doc.setFontSize(18)
//   // doc.text(titulo, 10, 13)

//   // doc.setFontSize(18);
//   // // doc.text(destinatario, -15, 30, { align: 'left' });
//   // const head = doc.splitTextToSize(destinatario_head, maxLineWidth);
//   // const body = doc.splitTextToSize(destinatario_body, maxLineWidth);
//   // doc.text(head, -15, 30)
//   // doc.text(body, -20, 60) 

//   // doc.setFontSize(12);
//   // doc.text(remitente, -10, 100);



//   // doc.save('etiqueta_despacho.pdf');



//   setRenderDocument(true)
// };