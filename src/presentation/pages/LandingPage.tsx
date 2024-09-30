/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { filterToggle } from "../components/FilterButton";
import FOTImpresa from "../views/forms/FOTImpresa";
import Barcode from "react-barcode";
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  View,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { FaRegFileLines } from "react-icons/fa6";
import JsBarcode from "jsbarcode";
import { AppStore, useAppSelector } from "../../redux/store";
import FOTValidateCristales from "../views/forms/FOTValidateCristales";
// import FOTValidateCristales from "../views/forms/FOTValidateCristales";
// import FOTValidateCristales from "../views/forms/FOTValidateCristales";
// import FOTValidateArmazones from "../views/forms/FOTValidateArmazones";
// import FOTValidateCristales from "../views/forms/FOTValidateCristales";
// import WhastappForm from "../components/WhastappForm";
// import WhastappForm from "../components/WhastappForm";
// import WhastappForm from "../components/WhastappForm";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { compararFechas } from "../utils";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useIndexedDB } from "../hooks/useIndexedDB";

export const handleContainerClick = (
  event: React.MouseEvent<HTMLDivElement>
) => {
  if (event.target instanceof Element) {
    if (event.target.classList.contains("mantenedorContainer")) {
      filterToggle.value = false;
    }
  }
};

const generateBarcodeBase64 = (value: string) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, value, { format: "CODE128", width: 2, height: 40 });
  return canvas.toDataURL("image/png");
};

const listArmazonesJunaeb = [
  "4020000040017",
  "4020000040024",
  "4020000040031",
  "4020000040048",
  "4020000040055",
  "4020000040062",
  "4020000040079",
  "4020000040086",
  "4020000040093",
  "4020000040109",
  "4020000040116",
  "4020000040123",
  "4020000040130",
  "4020000040147",
  "4020000040154",
  "4020000040161",
  "4020000040178",
  "4020000040185",
  "4020000040192",
  "4020000040208",
  "4020000040215",
  "4020000040222",
  "4020000040239",
  "4020000040246",
  "4020000040253",
  "4020000040260",
  "4020000040277",
  "4020000040284",
  "4020000040291",
  "4020000040307",
  "4020000040314",
  "4020000040321",
  "4020000040338",
  "4020000040345",
  "4020000040352",
  "4020000040369",
  "4020000041182",
  "4020000041199",
  "4020000041359",
  "4020000041366",
  "4020000041373",
  "4020000041588",
  "4020000041595",
  "4020000041601",
  "4020000041618",
];

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

  const [barcodes, setBarcodes] = React.useState<string[]>([]);

  const user = useAppSelector((appStore: AppStore) => appStore.user);

  React.useEffect(() => {
    // Genera el código de barras para cada valor de la lista
    const barcodeImages = listArmazonesJunaeb.map((item) =>
      generateBarcodeBase64(item)
    );
    setBarcodes(barcodeImages);
  }, []);

  // const renderPDF = (barcodes: string[]) => {
  //   const styles = StyleSheet.create({
  //     page: { padding: 10 },
  //     grid: { display: "flex", flexWrap: "wrap", flexDirection: "row" },
  //     barcodeContainer: {
  //       width: "50%", // Dos columnas
  //       alignItems: "center",
  //       marginBottom: 20,
  //       display: "flex",
  //     },
  //     barcode: { width: 200, height: 50, fontSize: 20 },
  //     cell: { display: "flex" },
  //   });

  //   return (
  //     <Document>
  //       <Page style={styles.page}>
  //         <View style={styles.grid}>
  //           {barcodes.map((barcode, index) => (
  //             <View key={index} style={styles.barcodeContainer}>
  //               <View style={styles.cell}>
  //                 <Text>{listArmazonesJunaeb[index].slice(-5)}</Text>
  //                 <Image src={barcode} style={styles.barcode} />
  //               </View>
  //             </View>
  //           ))}
  //         </View>
  //       </Page>
  //     </Document>
  //   );
  // };

  const renderPDF = (barcodes: string[]) => {
    const styles = StyleSheet.create({
      page: { padding: 10 },
      grid: { display: "flex", flexWrap: "wrap", flexDirection: "row" },
      barcodeContainer: {
        width: "50%", // Dos columnas
        alignItems: "center",
        marginBottom: 20,
        flexDirection: "row", // Cambiado a row para alinear horizontalmente
      },
      barcode: { width: 200, height: 50 },
      barcodeText: {
        marginRight: 10, // Espacio entre el texto y el código de barras
        fontSize: 20, // Aumentar el tamaño de la fuente
        textAlign: "right", // Alinear texto a la derecha si es necesario
      },
    });

    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.grid}>
            {barcodes.map((barcode, index) => (
              <View key={index} style={styles.barcodeContainer}>
                <Text style={styles.barcodeText}>
                  {listArmazonesJunaeb[index].slice(-5)}
                </Text>
                <Image src={barcode} style={styles.barcode} />
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className="mantenedorContainer !h-[80rem]">
      <div className="mt-8 h-full w-fullpt-20">
        {/* <button onClick={()=>handleAdd()}>Agregar</button> */}
        {/* <button onClick={()=>handleGet()}>GET DATOS</button> */}
        {/* <Link to={"google.com"}>Link</Link> */}
        {/* <div className="w-1/4 h-1/4 my-auto mx-auto bg-gray-400 px-10">
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

          const numbers = number?.split(',')

          const body = {
            "numero": numbers,
            "mensaje": text
          }
          console.log(body)


          // const response = await axios.post('https://nodeexpres.onrender.com/enviar-mensaje', body)
          // const response = await axios.post('http://localhost:3000/enviar-mensaje', body)
          const response = await axios.post('https://nodeexpress3.onrender.com/enviar-mensaje', body)
          console.log(response)
          if(response?.status === 200){
            toast.success('Mensajes enviados.')
          }
        }}
      >Enviar Mensaje</button>

      </div>  */}
        {user && (
          <h1 className="text-base mx-auto  w-[25%] mt-20 font-body">
            Bienvenido {user.nombre} al Sistema Gestión de OT.
          </h1>
        )}

        {/* <FOTValidateCristales /> */}
        {/* <WhastappForm/> */}
        <div className="hidden">
          <FOTImpresa masivo={true} />
          <Barcode
            marginLeft={145}
            marginTop={100}
            height={25}
            width={2.5}
            textAlign="right"
            value={"4020000040017"}
          />

          <>
            <PDFDownloadLink
              document={renderPDF(barcodes)}
              fileName="etiqueta_despacho.pdf"
            >
              {/* {() => ( */}
              <Tooltip content="Etiqueta Armazones">
                <IconButton type="button" variant="text" color="blue-gray">
                  <FaRegFileLines className="w-10 h-10" />
                </IconButton>
              </Tooltip>
              {/* )} */}
            </PDFDownloadLink>
          </>
        </div>

        {/* <FOTValidateCristales /> */}
        {/* <FOTValidateArmazones /> */}
      </div>
    </div>
  );
};

export default LandingPage;
