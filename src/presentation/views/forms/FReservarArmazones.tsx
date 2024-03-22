// import React from 'react'


// import { useState } from "react";
// import ZXing from '@rzxing/browser';// import { BrowserBarcodeReader } from '@zxing/library';

import React, { useState, useEffect } from 'react';

//@ts-ignore
import Quagga from 'quagga';
import { Button } from '@material-tailwind/react';
// import { MdOutlineQrCodeScanner } from "react-icons/md";
import { signal } from '@preact/signals-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationReservaArmazonesSchema } from '../../utils';
import { SelectInputComponent, TextInputComponent } from '../../components';
import { AppStore, useAppSelector } from '../../../redux/store';



//!INSERT: PROYECTO-RUT-PUNTOVENTA-TIPOANTEOJO-DP-A1-2-3-USERID

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
        // readers: ['ean_reader'],
        minCodeLength: 11,
        // multiple: false,
        readers: {
          ean_reader: {
            aggressive: true, // Mayor precisión para EAN-11
          },
        },
      }
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
      console.log(result.codeResult.code)
      focusInput.current = result.codeResult.code
      // Armazones[focusInput].value = result.codeResult.code
      setIsScanning(false)
      Quagga.stop()
    }
  };

  return (
    <div>
      <div id="scanner-container" className='absolute top-[8.6rem] right-[-1.5rem] !z-20' style={{ width: 350, height: 200 }} autoFocus/>
    </div>
  );
};





const FReservarArmazones = () => {
  // const [barcodeResult, setBarcodeResult] = useState('');
  const [isScanning, setIsScanning]   = useState(false);
  const [barcode, setBarcode]         = useState('');
  const [focusInput, setFocusInput]   = useState('');
  const schema                        = validationReservaArmazonesSchema();
  const userID:any                    = useAppSelector((store: AppStore) => store.user?.id);
  const armazon1                      = React.useRef(1)
  const armazon2                      = React.useRef(2)
  const armazon3                      = React.useRef(3)

  const {
    control,
    // register,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    resolver: yupResolver(schema)
  })



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

  const handleSaveChange = (jsonData:any) =>{
      console.log(jsonData)
  }

  // const handleInputChange = (ref:any) => {
  //   console.log(`Valor cambiado en el input ${ref.name}`);
  // };

  console.log(errors)

console.log(inputRefs)

  // Object.keys(inputRefs).map((key:any, index) =>{
  //   console.log(key)
  //   console.log(errors)
  //   console.log(errors[key])

  //   console.log(Armazones[key].value)
  // } )
    return (
        <form className=" max-w-md mx-auto px-6" onSubmit={handleSubmit((data)=> handleSaveChange(data))}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Reserva de Armazones</label>
            <select name="" id=""></select>
          </div>

          <div className=" mt-20">
            <div className="w-full !mb-5 rowForm">
              <SelectInputComponent
                  label='Nombre Proyecto'
                  name='proyecto'
                  showRefresh={true}
                  // handleSelectChange={}
                  onlyFirstOption={true}
                  readOnly={true}
                  control={control}
                  entidad={["/api/proyectos/", "07", userID]}
                  customWidth={"w-[27.3rem]"}
              />
            </div>
            <div className="w-full !mb-5 rowForm">
              <SelectInputComponent
                  label='Punto de Venta'
                  name='punto_venta_id'
                  showRefresh={true}
                  onlyFirstOption={true}
                  // handleSelectChange={}
                  control={control}
                  entidad={["/api/proyectos/", "07", userID]}
                  customWidth={"w-[27.3rem]"}
              />
            </div>
            <div className="w-full !mb-7 rowForm">
              <SelectInputComponent
                  label='Tipo de Anteojo'
                  name='tipo_anteojo'
                  showRefresh={true}
                  // handleSelectChange={}
                  control={control}
                  entidad={["/api/tipos/", "02", "OTTipoAnteojo"]}
                  customWidth={"w-[27.3rem] "}
                  error={errors.tipo_anteojo}
              />
            </div>
          </div>

          <div className="w-[26rem]  !mt-5  flex rowForm">
            <div className="w-[65%]  text-2xl !-ml-4">
              <TextInputComponent
                type='number'
                label='Rut Beneficiario'
                name="rut_beneficiario"
                control={control}
                textAlign='text-right !text-[2rem] !h-[3.9rem]'
                customWidth={"!text-2xl"}
                error={errors.rut_beneficiario}
              
              />
            </div>
            <div className="w-[45%] !ml-15 ">
              <TextInputComponent
                type='number'
                label='DP'
                name="dp"
                control={control}
                textAlign='text-right !text-[2rem] !h-[3.9rem]'
                error={errors.dp}
              
              />
            </div>
          </div>






          <div className='!mt-5 flex flex-col justify-evenly h-[15rem]'>
            
              <div className="w-[26rem]   flex rowForm">
                <div className="w-[100%]  text-2xl !-ml-4">
                  <TextInputComponent
                    type='number'
                    label='Armazon 1'
                    name="Armazon1"
                    control={control}
                    data={armazon1.current}
                    textAlign='text-right !text-[2rem] !h-[3.5rem]'
                    customWidth={"!text-2xl w-[26rem]"}
                    error={errors.Armazon1}
                    handleFocus={()=>handleFocus(armazon1)}
                    
                  
                  />
                </div>
              </div>
              <div className="w-[26rem] !mt-10   flex rowForm">
                <div className="w-[100%]  text-2xl !-ml-4">
                  <TextInputComponent
                    type='number'
                    label='Armazon 2'
                    name="Armazon2"
                    data={armazon2.current}
                    control={control}
                    textAlign='text-right !text-[2rem] !h-[3.5rem]'
                    customWidth={"!text-2xl w-[26rem]"}
                    error={errors.Armazon2}
                  
                  />
                </div>
              </div>
              <div className="w-[26rem]   flex rowForm">
                <div className="w-[100%]  text-2xl !-ml-4">
                  <TextInputComponent
                    type='number'
                    label='Armazon 3'
                    name="armazon3"
                    data={armazon3.current}
                    control={control}
                    textAlign='text-right !text-[2rem] !h-[3.5rem]'
                    customWidth={"!text-2xl w-[26rem]"}
                    error={errors.Armazon3}

                  
                  />
                </div>
              </div>
            {/* {Object.keys(inputRefs).map((key:any, index) => (
              <div className="mt-10 rowForm" key={index}>
                  <Input
                  {...register}
                    key={index}
                    label={key}
                    color='orange'
                    className="shadow appearance-none border bg-white rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline !w-[25rem]"
                    ref={inputRefs[key] }
                    value={Armazones[key]}
                    name={key}
                    onFocus={() => handleFocus(key)}
                    // error={errors[key]}
                    onChange={() => handleInputChange(inputRefs[key].current)}
                  />
              </div>
            ))} */}
          </div>

            <h1>Resultado : {barcode}</h1>
      
        {isScanning &&  <Scanner setBarcode={setBarcode} focusInput={focusInput} setIsScanning={setIsScanning}/> }
            
            <div className="w-full">
              <Button color='orange' type='submit'>Reservar</Button>
            </div>
        </form>
);
}

export default FReservarArmazones