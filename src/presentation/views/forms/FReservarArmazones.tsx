// import React from 'react'


// import { useState } from "react";
// import ZXing from '@rzxing/browser';// import { BrowserBarcodeReader } from '@zxing/library';

import React, { useState, useEffect } from 'react';

//@ts-ignore
import Quagga from 'quagga';
import { Button, Input } from '@material-tailwind/react';
// import { MdOutlineQrCodeScanner } from "react-icons/md";
import { signal } from '@preact/signals-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationReservaArmazonesSchema } from '../../utils';
import { SelectInputComponent, TextInputComponent } from '../../components';
import { AppStore, useAppSelector } from '../../../redux/store';


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
      <div id="scanner-container" className='absolute top-[8.6rem] right-20' style={{ width: 350, height: 100 }} />
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

  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
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

  const handleInputChange = (ref:any) => {
    console.log(`Valor cambiado en el input ${ref.name}`);
  };

  console.log(errors)

    return (
        <form className=" max-w-md mx-auto px-6" onSubmit={handleSubmit((data)=> handleSaveChange(data))}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Proyecto</label>
            <select name="" id=""></select>
          </div>

          <div className=" mt-20 ">
            <div className="w-full !mb-5">
              <SelectInputComponent
                  label='Nombre Proyecto'
                  name='proyecto'
                  showRefresh={true}
                  // handleSelectChange={}
                  control={control}
                  entidad={["/api/proyectos/", "07", userID]}
                  customWidth={"w-[27.3rem]"}
              />
            </div>
            <div className="w-full !mb-5">
              <SelectInputComponent
                  label='Punto de Venta'
                  name='punto_venta_id'
                  showRefresh={true}
                  // handleSelectChange={}
                  control={control}
                  entidad={["/api/proyectos/", "07", userID]}
                  customWidth={"w-[27.3rem]"}
              />
            </div>
            <div className="w-full !mb-7">
              <SelectInputComponent
                  label='Tipo de Anteojo'
                  name='tipo_anteojo'
                  showRefresh={true}
                  // handleSelectChange={}
                  control={control}
                  entidad={["/api/tipos/", "02", "OTTipoAnteojo"]}
                  customWidth={"w-[27.3rem]"}
                  error={errors.tipo_anteojo}
              />
            </div>
          </div>

          <div className="w-full  !mt-5 !-mb-4 flex rowForm">
            <div className="w-[60%]  !-ml-4">
              <TextInputComponent
                type='number'
                label='Numero de Receta'
                name="numero_receta"
                control={control}
                textAlign='text-right'
                error={errors.numero_receta}
              
              />
            </div>
            <div className="w-[40%] ml-5 ">
              <TextInputComponent
                type='number'
                label='DP'
                name="dp"
                control={control}
                textAlign='text-right'
                error={errors.dp}
              
              />
            </div>
          </div>




          <div className='!mt-10'>
            {Object.keys(inputRefs).map((key:any, index) => (
              <div className="mt-10" key={index}>
                  <Input
                  {...register}
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

            <h1>Resultado : {barcode}</h1>
      
        {isScanning &&  <Scanner setBarcode={setBarcode} focusInput={focusInput} setIsScanning={setIsScanning}/> }
            
            <div className="w-full">
              <Button type='submit'>Reservar</Button>
            </div>
        </form>
);
}

export default FReservarArmazones