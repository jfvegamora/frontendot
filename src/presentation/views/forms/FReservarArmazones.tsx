// import React from 'react'


// import { useState } from "react";
// import ZXing from '@rzxing/browser';// import { BrowserBarcodeReader } from '@zxing/library';

import React, { useState, useEffect } from 'react';

//@ts-ignore
import Quagga from 'quagga';
import { Input } from '@material-tailwind/react';
// import { MdOutlineQrCodeScanner } from "react-icons/md";
import { signal } from '@preact/signals-react';


export const Armazones:any = {
  Armazon1: signal(''),
  Armazon2: signal(''),
  Armazon3: signal('')
}


const Scanner:React.FC<any> = ({setBarcode,focusInput,setIsScanning}) => {
  

  useEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: document.getElementById('scanner-container'),
      },
      decoder: {
        readers: ['ean_reader'],
      },
    }, (err:any) => {
      if (err) {
        console.error(err);
      } else {
        Quagga.onDetected(onDetected);
        Quagga.start();
      }
    });

    return () => Quagga.stop();
  }, []);

  const onDetected = (result:any) => {
    if (result.codeResult) {
      setBarcode(result.codeResult.code);
      Armazones[focusInput].value = result.codeResult.code
      setIsScanning(false)
      Quagga.stop()
    }
  };

  return (
    <div>
      <div id="scanner-container" style={{ width: 400, height: 200 }} />
    </div>
  );
};





const FReservarArmazones = () => {
  // const [barcodeResult, setBarcodeResult] = useState('');
  const [isScanning, setIsScanning]   = useState(false);
  const [barcode, setBarcode]         = useState('');
  const [focusInput, setFocusInput]   = useState('');

  const inputRefs:any= {
    Armazon1: React.useRef<any>(1),
    Armazon2: React.useRef<any>(2),
    Armazon3: React.useRef<any>(3)
  }

  const handleFocus = (ref:any) => {
    console.log(ref)
    setIsScanning(true)

    if(ref){
      setFocusInput(ref)
    }

  };

  const handleInputChange = (ref:any) => {
    console.log(`Valor cambiado en el input ${ref.name}`);
  };

  console.log(Object.keys(inputRefs))
  console.log(focusInput)


    return (
        <form className="max-w-md mx-auto px-6">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Proyecto</label>
            <select name="" id=""></select>
          </div>


          <div className='mt-20'>
            {Object.keys(inputRefs).map((key:any, index) => (
              <div className="mt-10" key={index}>
                  <Input
                    key={index}
                    label={key}
                    color='orange'
                    className='className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" '
                    ref={inputRefs[key] }
                    value={Armazones[key]}
                    name={key}
                    onFocus={() => handleFocus(key)}
                    onChange={() => handleInputChange(inputRefs[key].current)}
                  />
              </div>
            ))}
          </div>


            {/* <button onClick={(e)=>{
              e.preventDefault()
              setIsScanning(true)
              
            }}>scanner</button> */}

            <h1>Resultado : {barcode}</h1>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reservar</button>
          </div>
        {isScanning &&  <Scanner setBarcode={setBarcode} focusInput={focusInput} setIsScanning={setIsScanning}/> }


        {/* <div className="w-[100%] flex left-0 h-auto bg-orange-400 absolute bottom-0">
            <h1>Pagina 1</h1>
            <h1>Pagina 2</h1> 

            {focusInput !== '' && (
              <MdOutlineQrCodeScanner 
                    className='w-[6rem] text-[5.5rem] bg-orange-400 mx-auto !-mt-8 rounded-2xl' 
                    onClick={()=>{
                      alert('click')
                      setIsScanning(true)
                      
                    }}
              />
            )}

            
            <h1>Pagina 3</h1>
            <h1>Pagina 4</h1>
        </div> */}
         
        </form>
);
}

export default FReservarArmazones