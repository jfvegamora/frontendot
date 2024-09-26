import React from "react";
// import Barcode from "react-barcode";
// import {
//   Document,
//   Image,
//   Page,
//   PDFDownloadLink,
//   View,
//   StyleSheet,
//   Text,
// } from "@react-pdf/renderer";
// import { IconButton, Tooltip } from "@material-tailwind/react";
// import { FaRegFileLines } from "react-icons/fa6";
// import JsBarcode from "jsbarcode";

interface ICodeBarButton {
  data: any;
}

const CodeBarButton: React.FC<ICodeBarButton> = ({ data }) => {
  console.log(data);

  return <div>CodeBarButton</div>;
};

export default CodeBarButton;
