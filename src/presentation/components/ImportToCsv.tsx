import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';


const ImportToCsv:React.FC = () => {

    const onDrop = useCallback((acceptedFiles:any) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0])
        ;

        console.log('formData', formData)
        console.log('acceptedFiles', acceptedFiles[0])

        fetch('http://tu-servidor-django/api/upload', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error uploading file:', error));
      }, []);


    const {getInputProps, getRootProps} = useDropzone({
        onDrop,
    })
  
  return (
     <div {...getRootProps()}>
        <h1>Subir</h1>
        <input className='cursor-pointer'  type='file' {...getInputProps()} accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
      </div>
  )
}

export default ImportToCsv