import * as XLSX from 'xlsx';
import moment from 'moment';

export function validateExcelData(data:any, validationStructure:any) {
  const validationErrors = [];
  console.log('DATA BEFORE: ', data);
  console.log(data)
  console.log(Object.keys(data).length)
  // console.log(data[1][1])
  console.log(validationStructure)
  const validationMap = validationStructure.map((validation:any)=>{
    validation[0] = validation[0].toUpperCase()
    return validation
  })
  // console.log(validationStructure)
  console.log(validationMap)

  for (let i = 0; i < Object.keys(data).length ; i++) {
    // const rowData = data?.[1][1] === 'FOLIO' ?   data[1][i] : data[i];
    const rowData = data[i]
    console.log('ROWDATA:',rowData)




    for (let j = 0; j < validationMap.length; j++) {

      const [fieldName, fieldType, allowNull, maxLength, position] = validationMap[j];
      let cellValue = rowData[position]; // Value from the Excel cell
      console.log(position)
      console.log(cellValue)
      console.log(fieldName)
       console.log('Fila:', i + 2, ' - Campo:',fieldName, ' - allowNULL:', allowNull, ' - Type:', fieldType, ' - Value:', cellValue)
      // console.log('allownull:', allowNull)      
      // console.log(cellValue.length)      
      // console.log(maxLength)            
     
      if (allowNull === "NO") { //SI ES REQUERIDO
        if ((cellValue === null || cellValue === undefined)) {
          if (fieldType === 'int' || fieldType.substring(0,fieldType.indexOf('(')) === 'enum') {
            validationErrors.push(`Fila ${i + 2}: ${fieldName}-> se requiere un número.`);
          }else if (fieldType === 'string' || fieldType.substring(0,fieldType.indexOf('(')) === 'varchar'){
            validationErrors.push(`Fila ${i + 2}: ${fieldName} -> se requiere texto.`);
          }else if (fieldType === 'date'){
            validationErrors.push(`Fila ${i + 2}: ${fieldName} -> se requiere una fecha.`);
          }else{
            validationErrors.push(`Fila ${i + 2}: ${fieldName} -> no puede estar vacío.`);
          }
        }
        else if (fieldType === 'int' || fieldType.substring(0,fieldType.indexOf('(')) === 'enum' || fieldType.substring(0,fieldType.indexOf('(')) === 'decimal') {
          if (!(typeof cellValue === 'number' || (typeof cellValue === 'string' && !isNaN(Number(cellValue))))) {
            validationErrors.push(`Fila ${i + 2}: ${fieldName}: ${cellValue} -> debe ser un número válido.`);
          }
        }
        else if (fieldType === 'string' || fieldType.substring(0,fieldType.indexOf('(')) === 'varchar') {
          if (maxLength > 0 && cellValue.length > maxLength) {
            validationErrors.push(`Fila ${i + 2}: ${fieldName}: ${cellValue} -> Tiene ${cellValue.length} caracteres y excede longitud máxima permitida (${maxLength}).`);
          }
        }
        else if (fieldType === 'date') {
          if ((cellValue === null || cellValue === undefined)) {
            rowData[fieldName]= '1900-01-01';
            // cellValue = '1900-01-01';
          // }else if (cellValue.toString() === 'Invalid Date' || isNaN(cellValue)) {
          // }else if (!isNaN(Date.parse(cellValue))) {
          }else if (moment(cellValue, 'DD-MM-YYYY', true).isValid()) {
          // }else if (isValid(new Date(cellValue))) {
          // }else if (isValid(parse(cellValue ,'yyyy-MM-dd',new Date(cellValue)))) {
            console.log('FECHA VALIDA1?: ', cellValue);
            validationErrors.push(`Fila ${i + 2}: ${fieldName}: ${cellValue} -> debe ser una fecha válida..`);
          }
        }
      }
      else if (fieldType === 'int' || fieldType.substring(0,fieldType.indexOf('(')) === 'enum' || fieldType.substring(0,fieldType.indexOf('(')) === 'decimal') {
        if ((cellValue === null || cellValue === undefined)) {
          cellValue = 0;
        }else if (!(typeof cellValue === 'number' || (typeof cellValue === 'string' && !isNaN(Number(cellValue))))) {
          validationErrors.push(`Fila ${i + 2}: ${fieldName}: ${cellValue} -> debe ser un número válido.`);
        }
      }
      else if (fieldType === 'string' || fieldType.substring(0,fieldType.indexOf('(')) === 'varchar') {
        if ((cellValue === null || cellValue === undefined)) {
          cellValue = '';
        }else if (maxLength > 0 && cellValue.length > maxLength) {
          validationErrors.push(`Fila ${i + 2}: ${fieldName}: ${cellValue} -> Tiene ${cellValue.length} caracteres y excede longitud máxima permitida (${maxLength}).`);
        }
      }
      else if (fieldType === 'date') {
        if ((cellValue === null || cellValue === undefined)) {
          // cellValue = '1900-01-01';
          rowData[fieldName]= '';
        // }else if (cellValue.toString() === 'Invalid Date' || isNaN(cellValue)) {
        }else if (moment(cellValue, 'DD-MM-YYYY', true).isValid()) {
        // }else if (isValid(parse(cellValue ,'yyyy-MM-dd',new Date(cellValue)))) {  
        // rowData[fieldName]= cellValue.toString();
          // rowData[fieldName]= "2023" + "-"   + "04" + "-" + "22"  ;
          console.log('FECHA VALIDA2?: ', cellValue);
          validationErrors.push(`Fila ${i + 2}: ${fieldName}: ${cellValue} -> debe ser una fecha válida.`);
        }
      }
    }
  }
  console.log('DATA AFTER: ', data);
  return validationErrors;
}

export interface ExcelUploadResult {
  blob?: Blob;
  numberOfElements?: number;
  errors?:any
}

export const handleFileUpload = (file: File,columnsToDelete:string[]) => {
  return new Promise<ExcelUploadResult>((resolve, reject) => {
    const reader = new FileReader();
    const errors:any = []

    reader.onload = (e) => {
      const target = e.target;

      if (target && target.result) {
        const data = new Uint8Array(target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const firstElement:any = XLSX.utils.sheet_to_json(worksheet)[0];
        const nameElement = Object.keys(firstElement)[0]
        const filteredRows = XLSX.utils.sheet_to_json(worksheet).filter((row: any) => row[nameElement])

        // console.log(workbook)

        // console.log(sheetName)
        // console.log(worksheet)

        // console.log(filteredRows)
        // console.log(filteredRows[1])

        // console.log(firstElement)

        const validationErrors = validateExcelData(filteredRows, columnsToDelete)
        console.log(validationErrors)

        if (validationErrors.length > 0) {
          errors.push(validationErrors)
          const logs = validationErrors.map(error => {
            return ["", "", error]
          })
          resolve({errors: logs})
        }

        const modifiedWorkbook = XLSX.utils.book_new();
        
        XLSX.utils.book_append_sheet(modifiedWorkbook, XLSX.utils.json_to_sheet(filteredRows), sheetName);

        
        const modifiedBlob = new Blob([XLSX.write(modifiedWorkbook, { type: 'array',bookType: 'xls' })], {
          type: 'application/vnd.ms-excel',
        });

        
        const numberOfColumns = Object.keys(firstElement).length;

        const numberOfElements = filteredRows.length * numberOfColumns


        // resolve(modifiedBlob)
        resolve({blob:modifiedBlob, numberOfElements})
        
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
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




export const validateFile = (file: File, columnValidations:any)=> {
    return new Promise<void>((resolve, reject) => {
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
  
        
        const rows = content.split('\n');  
        
        
        
        const maxRecords = 900;
        if (rows.length > maxRecords + 1) {
          reject(new Error('El archivo no puede contener más de 200 registros.'));
          return;
        }
  
        
        for (let i = 0; i < rows.length; i++) {
          const columns = rows[i].split(',');
  
          
          for (let j = 0; j < columns.length; j++) {
            const columnValidation = columnValidations[j];
            if (!columnValidation) continue;  
  
            const columnValue = columns[j].trim();
              
            
            if (columnValidation.type === 'integer' && !/^\d+$/.test(columnValue)) {
              reject(new Error(`El valor en la columna ${j + 1} debe ser un número entero en la fila ${i + 1}.`));
              return;
            }

            if (columnValidation.type === 'date') {
                
                if (!/^\d{4}-\d{2}-\d{2}$/.test(columnValue)) {
                  reject(new Error(`El valor en la columna ${j + 1} debe ser una fecha válida (formato: YYYY-MM-DD) en la fila ${i + 1}.`));
                  return;
                }
            }
  
            
            if (columnValidation.maxLength && columnValue.length > columnValidation.maxLength) {
                // console.log('columnValidation', columnValidation.maxLength)
                // console.log('columnValue', columnValue.length)
              reject(new Error(`El valor en la columna ${j + 1} excede la longitud máxima permitida en la fila ${i + 1}.`));
              return;
            }
          }
        }
  
        
        resolve();
      };
  
      reader.onerror = (error) => {
        reject(new Error('Error al leer el archivo: ' + error));
      };
  
      reader.readAsText(file);
    });
};
  

