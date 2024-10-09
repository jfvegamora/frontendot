import * as XLSX from "xlsx";
import moment from "moment";
import axios from "axios";
import { URLBackend } from "./config";

export function validateExcelData(data: any, validationStructure: any) {
  const validationErrors = [];
  // console.log('DATA BEFORE: ', data);
  // console.log(data)
  // console.log(Object.keys(data).length)
  // console.log(data[1][1])
  const validationMap = validationStructure.map((validation: any) => {
    validation[0] = validation[0].toUpperCase();
    return validation;
  });
  for (let i = 0; i < Object.keys(data).length; i++) {
    // const rowData = data?.[1][1] === 'FOLIO' ?   data[1][i] : data[i];
    const rowData = data[i];
    // console.log('ROWDATA:',rowData)
    // console.log('POSITION')
    for (let j = 0; j < validationMap.length; j++) {
      const [fieldName, fieldType, allowNull, maxLength] = validationMap[j];

      // let cellValue = rowData[position]; // Value from the Excel cell
      let cellValue = rowData[validationStructure[j][0]]; // Value from the Excel cell
      console.log(
        "Fila:",
        i + 2,
        " - Campo:",
        fieldName,
        " - allowNULL:",
        allowNull,
        " - Type:",
        fieldType,
        " - Value:",
        cellValue
      );
      // console.log('allownull:', allowNull)
      // console.log(cellValue.length)
      // console.log(maxLength)

      if (allowNull === "NO") {
        //SI ES REQUERIDO
        if (cellValue === null || cellValue === undefined) {
          if (
            fieldType === "int" ||
            fieldType.substring(0, fieldType.indexOf("(")) === "enum"
          ) {
            validationErrors.push(
              `Fila ${i + 2}: ${fieldName}-> se requiere un número.`
            );
          } else if (
            fieldType === "string" ||
            fieldType.substring(0, fieldType.indexOf("(")) === "varchar"
          ) {
            validationErrors.push(
              `Fila ${i + 2}: ${fieldName} -> se requiere texto.`
            );
          } else if (fieldType === "date") {
            validationErrors.push(
              `Fila ${i + 2}: ${fieldName} -> se requiere una fecha.`
            );
          } else {
            validationErrors.push(
              `Fila ${i + 2}: ${fieldName} -> no puede estar vacío.`
            );
          }
        } else if (
          fieldType === "int" ||
          fieldType.substring(0, fieldType.indexOf("(")) === "enum" ||
          fieldType.substring(0, fieldType.indexOf("(")) === "decimal"
        ) {
          if (
            !(
              typeof cellValue === "number" ||
              (typeof cellValue === "string" && !isNaN(Number(cellValue)))
            )
          ) {
            validationErrors.push(
              `Fila ${
                i + 2
              }: ${fieldName}: ${cellValue} -> debe ser un número válido.`
            );
          }
        } else if (
          fieldType === "string" ||
          fieldType.substring(0, fieldType.indexOf("(")) === "varchar"
        ) {
          if (maxLength > 0 && cellValue.length > maxLength) {
            validationErrors.push(
              `Fila ${i + 2}: ${fieldName}: ${cellValue} -> Tiene ${
                cellValue.length
              } caracteres y excede longitud máxima permitida (${maxLength}).`
            );
          }
        } else if (fieldType === "date") {
          if (cellValue === null || cellValue === undefined) {
            rowData[fieldName] = "1900-01-01";
            // cellValue = '1900-01-01';
            // }else if (cellValue.toString() === 'Invalid Date' || isNaN(cellValue)) {
            // }else if (!isNaN(Date.parse(cellValue))) {
          } else if (moment(cellValue, "DD-MM-YYYY", true).isValid()) {
            // }else if (isValid(new Date(cellValue))) {
            // }else if (isValid(parse(cellValue ,'yyyy-MM-dd',new Date(cellValue)))) {
            console.log("FECHA VALIDA1?: ", cellValue);
            validationErrors.push(
              `Fila ${
                i + 2
              }: ${fieldName}: ${cellValue} -> debe ser una fecha válida..`
            );
          }
        }
      } else if (
        fieldType === "int" ||
        fieldType.substring(0, fieldType.indexOf("(")) === "enum" ||
        fieldType.substring(0, fieldType.indexOf("(")) === "decimal"
      ) {
        if (cellValue === null || cellValue === undefined) {
          cellValue = 0;
        } else if (
          !(
            typeof cellValue === "number" ||
            (typeof cellValue === "string" && !isNaN(Number(cellValue)))
          )
        ) {
          validationErrors.push(
            `Fila ${
              i + 2
            }: ${fieldName}: ${cellValue} -> debe ser un número válido.`
          );
        }
      } else if (
        fieldType === "string" ||
        fieldType.substring(0, fieldType.indexOf("(")) === "varchar"
      ) {
        if (cellValue === null || cellValue === undefined) {
          cellValue = "";
        } else if (maxLength > 0 && cellValue.length > maxLength) {
          validationErrors.push(
            `Fila ${i + 2}: ${fieldName}: ${cellValue} -> Tiene ${
              cellValue.length
            } caracteres y excede longitud máxima permitida (${maxLength}).`
          );
        }
      } else if (fieldType === "date") {
        if (cellValue === null || cellValue === undefined) {
          // cellValue = '1900-01-01';
          rowData[fieldName] = "";
          // }else if (cellValue.toString() === 'Invalid Date' || isNaN(cellValue)) {
        } else if (moment(cellValue, "DD-MM-YYYY", true).isValid()) {
          // }else if (isValid(parse(cellValue ,'yyyy-MM-dd',new Date(cellValue)))) {
          // rowData[fieldName]= cellValue.toString();
          // rowData[fieldName]= "2023" + "-"   + "04" + "-" + "22"  ;
          console.log("FECHA VALIDA2?: ", cellValue);
          validationErrors.push(
            `Fila ${
              i + 2
            }: ${fieldName}: ${cellValue} -> debe ser una fecha válida.`
          );
        }
      }
    }
  }
  console.log("DATA AFTER: ", data);
  return validationErrors;
}

export interface ExcelUploadResult {
  blob?: any;
  numberOfElements?: number;
  errors?: any;
  originalBlob?: any;
}

export const handleFileUpload = (
  file: File,
  columnsToDelete: string[],
  strEntidad: string
) => {
  return new Promise<ExcelUploadResult>((resolve, reject) => {
    const reader = new FileReader();
    const errors: any = [];
    const numeroPaginas = 100;

    reader.onload = (e) => {
      const target = e.target;

      if (target && target.result) {
        const data = new Uint8Array(target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const firstElement: any = XLSX.utils.sheet_to_json(worksheet)[0];
        const nameElement = Object.keys(firstElement)[0];
        const filteredRows = XLSX.utils
          .sheet_to_json(worksheet)
          .filter((row: any) => row[nameElement]);

        if (strEntidad !== "Ordenen de Trabajo") {
          const validationErrors = validateExcelData(
            filteredRows,
            columnsToDelete
          );
          console.log(validationErrors);

          if (validationErrors.length > 0) {
            errors.push(validationErrors);
            const logs = validationErrors.map((error) => {
              return ["", "", error];
            });
            resolve({ errors: logs });
          }

          console.log("render");
        }
        console.log("render");

        const blobs = [];

        const encabezado = filteredRows.slice(0, 3);
        const encabezado2 = filteredRows.slice(0, 2);
        const dataExcel = filteredRows.slice(3);

        const numeroParticiones = Math.ceil(
          filteredRows.length / numeroPaginas
        );

        let desde = 0;

        for (let i = 0; i < numeroParticiones; i++) {
          let hasta = desde + numeroPaginas;

          const chunk = dataExcel.slice(desde, hasta);

          // Crear un nuevo libro de trabajo para cada partición
          const modifiedWorkbook = XLSX.utils.book_new();
          const uniqueSheetName = `${sheetName}_${i + 1}`;
          XLSX.utils.book_append_sheet(
            modifiedWorkbook,
            XLSX.utils.json_to_sheet([...encabezado, ...chunk]),
            uniqueSheetName
          );

          const modifiedBlob = new Blob(
            [XLSX.write(modifiedWorkbook, { type: "array", bookType: "xls" })],
            {
              type: "application/vnd.ms-excel",
            }
          );

          blobs.push({ blob: modifiedBlob });
          desde = hasta;
        }

        const originalWorkbook = XLSX.utils.book_new();
        const originalSheetName = "Original_import_ot";

        XLSX.utils.book_append_sheet(
          originalWorkbook,
          XLSX.utils.json_to_sheet(filteredRows),
          originalSheetName
        );

        const originalBlob = new Blob(
          [XLSX.write(originalWorkbook, { type: "array", bookType: "xls" })],
          {
            type: "application/vnd.ms-excel",
          }
        );

        console.log(blobs);

        const numberOfColumns = Object.keys(firstElement).length;

        const numberOfElements = filteredRows.length * numberOfColumns;

        resolve({ blob: blobs, numberOfElements, originalBlob: originalBlob });
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const updateErrorRows = (data: any) => {
  return data.map((item: any) => {
    if (item.index > 1 && item.hasOwnProperty("Error")) {
      const increment = (item.index - 1) * 100;
      const updatedErrors = item.Error.map((errorString: any) => {
        return errorString.replace(/Fila: (\d+)/, (_match: any, p1: any) => {
          return `Fila: ${parseInt(p1) + increment}`;
        });
      });
      return { ...item, Error: updatedErrors };
    }
    return item;
  });
};

export const executeFetchImportOT = async (response: any, userID: any) => {
  console.log(response);
  try {
    console.log("render");
    const jsonDataArray = response.map((item: any) => JSON.parse(item.data));

    let combinedDataExcel: any = [];
    console.log(jsonDataArray);

    jsonDataArray.forEach((jsonData: any) => {
      combinedDataExcel = combinedDataExcel.concat(jsonData);
    });

    console.log(combinedDataExcel);

    const combinedWorkbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(combinedDataExcel);

    XLSX.utils.book_append_sheet(combinedWorkbook, worksheet, "CombinedSheet");

    console.log(combinedWorkbook);

    const originalBlob = new Blob(
      [XLSX.write(combinedWorkbook, { type: "array", bookType: "xlsx" })], // Cambiado de 'xls' a 'xlsx'
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      } // Cambiado a 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    // const originalBlob2 = new Blob([XLSX.write(combinedWorkbook, {type:'array', bookType:'xls'})],{
    //   type: 'application/vnd.ms-excel',
    // })

    // const fileURL = URL.createObjectURL(
    //   originalBlob2
    // )

    // const link = document.createElement('a');
    // link.href = fileURL
    // link.setAttribute("download", "import_ot_test")
    // document.body.appendChild(link)
    // link.click();
    // URL.revokeObjectURL(fileURL)
    // console.log(originalBlob)

    const formData = new FormData();
    const url = `${URLBackend.value}/api/excel/importOT/`;

    formData.append("file", originalBlob);
    formData.append("userID", JSON.stringify(userID));

    try {
      const response = await axios.post(url, formData);
      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const removeColumns = (file:File, columnIndices:number[]) => {
//     return new Promise<Blob>((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onload = (event) => {
//           if (event.target && event.target.result) {
//             let data: Uint8Array | string;

//             if (typeof event.target.result === 'string') {
//               // Si es una cadena, convierte a Uint8Array
//               const encoder = new TextEncoder();
//               data = encoder.encode(event.target.result);
//             } else {
//               // Si es ArrayBuffer, utiliza directamente
//               data = new Uint8Array(event.target.result);
//             }

//             const workbook = XLSX.read(data, { type: 'array' });

//             // Resto del código para eliminar columnas, crear el nuevo libro de trabajo y resolver la promesa...
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];

//             const columnLettersToRemove = columnIndices.map(index => XLSX.utils.encode_col(index));

//             for (const columnLetter of columnLettersToRemove) {
//               for (const cellId in sheet) {
//                 if (sheet.hasOwnProperty(cellId) && cellId.startsWith(columnLetter)) {
//                   delete sheet[cellId];
//                 }
//               }
//             }

//             const modifiedWorkbook = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(modifiedWorkbook, sheet, sheetName);

//             const modifiedBlob = new Blob([XLSX.write(modifiedWorkbook, { type: 'array', bookType: 'xlsx' })], {
//               type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//             });

//             resolve(modifiedBlob);
//           } else {
//             reject(new Error('No se pudo leer el archivo.'));
//           }
//         };

//         reader.onerror = (error) => {
//           reject(new Error('Error al leer el archivo: ' + error));
//         };

//         if (file instanceof Blob) {
//           reader.readAsArrayBuffer(file);
//         } else {
//           reject(new Error('El archivo no es válido.'));
//         }
//       });
//     };

export const validateFile = (file: File, columnValidations: any) => {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;

      const rows = content.split("\n");

      const maxRecords = 900;
      if (rows.length > maxRecords + 1) {
        reject(new Error("El archivo no puede contener más de 200 registros."));
        return;
      }

      for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].split(",");

        for (let j = 0; j < columns.length; j++) {
          const columnValidation = columnValidations[j];
          if (!columnValidation) continue;

          const columnValue = columns[j].trim();

          if (
            columnValidation.type === "integer" &&
            !/^\d+$/.test(columnValue)
          ) {
            reject(
              new Error(
                `El valor en la columna ${
                  j + 1
                } debe ser un número entero en la fila ${i + 1}.`
              )
            );
            return;
          }

          if (columnValidation.type === "date") {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(columnValue)) {
              reject(
                new Error(
                  `El valor en la columna ${
                    j + 1
                  } debe ser una fecha válida (formato: YYYY-MM-DD) en la fila ${
                    i + 1
                  }.`
                )
              );
              return;
            }
          }

          if (
            columnValidation.maxLength &&
            columnValue.length > columnValidation.maxLength
          ) {
            // console.log('columnValidation', columnValidation.maxLength)
            // console.log('columnValue', columnValue.length)
            reject(
              new Error(
                `El valor en la columna ${
                  j + 1
                } excede la longitud máxima permitida en la fila ${i + 1}.`
              )
            );
            return;
          }
        }
      }

      resolve();
    };

    reader.onerror = (error) => {
      reject(new Error("Error al leer el archivo: " + error));
    };

    reader.readAsText(file);
  });
};
