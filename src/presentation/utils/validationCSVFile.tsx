import * as XLSX from 'xlsx';


// export function validateExcelData(data:any, validationStructure:any) {
//   const validationErrors = [];
//   const validationMap = validationStructure.map((validation:any)=>{
//     validation[0] = validation[0].toUpperCase()
//     return validation
//   })

//   for (let i = 0; i < data.length; i++) {
//     const rowData = data[i];

//     for (const fieldName in rowData) {
//       const uppercaseFieldName = fieldName.toUpperCase();

//       if (!validationMap[uppercaseFieldName]) {
//         continue;
//       }

//       const [fieldType, allowNull, maxLength] = validationStructure.find(([name]:any) => name.toUpperCase() === uppercaseFieldName);

//       const cellValue = rowData[fieldName];
//       console.log('cellValue', cellValue)
//       console.log('allowNull', allowNull)
//       // Validar el tipo de datos
//       if (fieldType === "int" && !Number.isInteger(cellValue)) {
//         validationErrors.push(`Error en la fila ${i + 1}: El campo ${fieldName} debe ser un número entero.`);
//       }

//       // Validar la longitud para varchar
//       if (fieldType === "varchar" && typeof cellValue === "string" && maxLength && cellValue.length > maxLength) {
//         validationErrors.push(`Error en la fila ${i + 1}: El campo ${fieldName} excede la longitud máxima permitida de ${maxLength}.`);
//       }

//       // Validar si el campo puede ser nulo
//       if (allowNull === "NO" && (cellValue === null || cellValue === "")) {
//         console.log('cell error',cellValue)
//         validationErrors.push(`Error en la fila ${i + 1}: El campo ${fieldName} no puede estar vacío.`);
//       }
//     }
//   }
//   console.log('validationErrors',validationErrors)
//   return validationErrors;
// }

export function validateExcelData(data:any, validationStructure:any) {
  const validationErrors = [];
  const validationMap = validationStructure.map((validation:any)=>{
    validation[0] = validation[0].toUpperCase()
    return validation
  })

  for (let i = 0; i < data.length; i++) {
    const rowData = data[i];
    for (let j = 0; j < validationMap.length; j++) {

      const [fieldName, fieldType, allowNull, maxLength] = validationMap[j];
      const cellValue = rowData[fieldName]; // Value from the Excel cell
      
     
      // Validar el tipo de datos
      if (fieldType === 'int' && !Number.isInteger(cellValue)) {
        validationErrors.push(`Error en la fila ${i + 2}: El campo ${fieldName} debe ser un número entero.`);
      }

      // Validar la longitud para varchar
      if (typeof cellValue === 'string' && maxLength && cellValue.length > maxLength) {
        validationErrors.push(`Error en la fila ${i + 2}: El campo ${fieldName} excede la longitud máxima permitida de ${maxLength}.`);
      }

      // Validar si el campo puede ser nulo
      if (allowNull && (cellValue === null || cellValue === undefined)) {
        validationErrors.push(`Error en la fila ${i + 2}: El campo ${fieldName} no puede estar vacío.`);
      }
    }
  }
  return validationErrors;
}


export const handleFileUpload = (file: File,columnsToDelete:string[]) => {
  return new Promise<Blob>((resolve, reject) => {
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


        const validationErrors = validateExcelData(filteredRows, columnsToDelete)

        if (validationErrors.length > 0) {
          console.error('Validation errors:', validationErrors);
          // reject('Validation errors occurred.', validationErrors);
          errors.push(validationErrors)
          return errors
        }



        const modifiedWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(modifiedWorkbook, XLSX.utils.json_to_sheet(filteredRows), sheetName);

        
        const modifiedBlob = new Blob([XLSX.write(modifiedWorkbook, { type: 'array',bookType: 'xls' })], {
          type: 'application/vnd.ms-excel',
        });

        resolve(modifiedBlob)
        
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};




export const removeColumns = (file:File, columnIndices:number[]) => {
    return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            let data: Uint8Array | string;
    
            if (typeof event.target.result === 'string') {
              // Si es una cadena, convierte a Uint8Array
              const encoder = new TextEncoder();
              data = encoder.encode(event.target.result);
            } else {
              // Si es ArrayBuffer, utiliza directamente
              data = new Uint8Array(event.target.result);
            }
    
            const workbook = XLSX.read(data, { type: 'array' });
    
            // Resto del código para eliminar columnas, crear el nuevo libro de trabajo y resolver la promesa...
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
    
            const columnLettersToRemove = columnIndices.map(index => XLSX.utils.encode_col(index));
    
            for (const columnLetter of columnLettersToRemove) {
              for (const cellId in sheet) {
                if (sheet.hasOwnProperty(cellId) && cellId.startsWith(columnLetter)) {
                  delete sheet[cellId];
                }
              }
            }
    
            const modifiedWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(modifiedWorkbook, sheet, sheetName);
    
            const modifiedBlob = new Blob([XLSX.write(modifiedWorkbook, { type: 'array', bookType: 'xlsx' })], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
    
            resolve(modifiedBlob);
          } else {
            reject(new Error('No se pudo leer el archivo.'));
          }
        };
    
        reader.onerror = (error) => {
          reject(new Error('Error al leer el archivo: ' + error));
        };
    
        if (file instanceof Blob) {
          reader.readAsArrayBuffer(file);
        } else {
          reject(new Error('El archivo no es válido.'));
        }
      });
    };




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
                console.log('columnValidation', columnValidation.maxLength)
                console.log('columnValue', columnValue.length)
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
  

export const columnValidationsClientes = {
    0: { type: 'varchar', maxLength: 15 },  
    1: { type: 'varchar', maxLength: 50 }, 
    2: { type: 'integer'},
    3: { type: 'varchar', maxLength: 15 },
    4: { type: 'integer'},
    5: { type: 'varchar', maxLength: 15 },
    6: { type: 'date'},
    7: { type: 'varchar', maxLength:100},
    8: { type: 'integer'},
    9: { type: 'varchar', maxLength: 15 },
    10: { type: 'varchar', maxLength:20},
    11: { type: 'varchar', maxLength:50},
    12: { type: 'integer'},
    13: { type: 'varchar', maxLength: 15 }
  }