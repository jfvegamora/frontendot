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
import { punto_venta, validateRut, validationReservaArmazonesSchema } from '../../utils';
import { SelectInputComponent, TextInputComponent } from '../../components';
import { AppStore, useAppSelector } from '../../../redux/store';
import TextInputInteractive from '../../components/forms/TextInputInteractive';
import { toast } from 'react-toastify';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';
// import axios from 'axios';



//!INSERT: PROYECTO-RUT-PUNTOVENTA-TIPOANTEOJO-DP-A1-2-3-USERID

export const Armazones:any = {
  Armazon1: signal(''),
  Armazon2: signal(''),
  Armazon3: signal('')
}

const codProyecto    = signal('');
const codPuntoVenta  = signal('');
const codDP          = signal('');


const Scanner:React.FC<any> = ({setBarcode,focusInput,setIsScanning, setArmazon1, setArmazon3, setArmazon2}) => {
  let setArmazon = (_e:any) => void

  console.log(focusInput)

    switch (focusInput) {
      case 'Armazon1':
        setArmazon = setArmazon1
        break;
      case 'Armazon2':
        setArmazon = setArmazon2
        break;
      case 'Armazon3':
        setArmazon = setArmazon3
        break;
      default:
        break;
    }



  useEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: document.getElementById('scanner-container'),
      },
      decoder: {
        readers: ['ean_reader'],
        multiple: false,
        numOfWorkers: 10,

      }
    }, (err:any) => {
      if (err) {
        console.error(err);
      } else {
        console.log('render')
        Quagga.onDetected(onDetected);
        Quagga.start();
        
      }
    });

    return () => Quagga.stop();
  }, []);

  const onDetected = (result:any) => {
    console.log(result)
    if (result.codeResult) {
      setBarcode(result.codeResult.code);
      console.log(result.codeResult.code)
      // focusInput.current = result.codeResult.code
      setArmazon(result.codeResult.code)
      
      setIsScanning(false)
      Quagga.stop()
      // Quagga.start()
    }
  };

  return (
    
      <div id="scanner-container" className='absolute top-[8.6rem] right-[-1rem] !z-20' style={{ width: 350, height: 350 }} autoFocus />
  
  );
};






const FReservarArmazones = () => {
  // const [barcodeResult, setBarcodeResult] = useState('');
  const [isScanning, setIsScanning]   = useState(false);
  const [barcode, setBarcode]         = useState('');
  const [focusInput, setFocusInput]   = useState('');
  const schema                        = validationReservaArmazonesSchema();
  const userID:any                    = useAppSelector((store: AppStore) => store.user?.id);
  // const armazon1                      = React.useRef('')
  // const armazon2                      = React.useRef('')
  // const armazon3                      = React.useRef('')


  const [armazon1, setArmazon1]       = React.useState('');
  const [armazon2, setArmazon2]       = React.useState('');
  const [armazon3, setArmazon3]       = React.useState('');





  const {
    control,
    // register,
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm<any>({
    resolver: yupResolver(schema)
  })

  const fetchValidateArmazon = async(armazon:string, codArmazon:string) => {
      const urlbase = `${URLBackend}/api/armazones/listado/?query=02`
      const emmtyJSON = {
        "marca"       : '',
        "diseno"      : '',
        "indice"      : '',
        "material"    : '',
        "color"       : '',
        "tratamiento" : '',
        "diametro"    : '',
        "esferico"    : '',
        "cilindrico"  : '',
        "punto_venta" : ''
      }

      const _id = 1 //? 0 PARA QUE NO VALIDE CRSITAL Y SOLO VALIDE ARMAZON Y STOCK
      const _p6 = 1 //? 1 VALIDAR PARAMETRIZACION
      const _p1 = codArmazon
      const _p2 = codProyecto.value
      const _p3 = punto_venta.value
      const _p4 = codDP.value
      const _p5 = '65' //?'DIAMETRO'
      const _pkToDelete = encodeURIComponent(JSON.stringify([emmtyJSON, emmtyJSON]))


      console.log(codProyecto.value)
      console.log(codPuntoVenta.value)
      console.log(codDP.value)
      console.log(codArmazon)
      console.log(punto_venta.value)

      if(codArmazon !== ''){
        try {
          const fetchURL = `${urlbase}&_p1=${_p1}&_p2=${_p2}&_p3=${_p3}&_p4=${_p4}&_p5=${_p5}&_pkToDelete=${_pkToDelete}&_id=${_id}&_p6=${_p6}`
         
          console.log(fetchURL)
          const result = await axios(fetchURL)
          
    
          console.log(result)
          console.log(armazon)
          console.log(codArmazon)
          console.log(result.data[0][0])

          if(result.data && result.data[0] && result.data[0][19] !== ''){
            toast.error(result.data[0][19])
            setValue(armazon,'')
            setArmazon1('')
          }




          
        } catch (error) {
            console.log(error)
            toast.error('Error al validar Armazon')
            setValue(armazon, '')
        }

      }
  

  
    }





  const handleFocus = (ref:any) => {
    console.log(ref)
    setIsScanning(true)

    if(ref){
      setFocusInput(ref)
    }

  };

  const handleChange = (e:any) => {
    console.log(e)

    const result = validateRut(e)

    console.log(result)
  }

  const handleSaveChange = async(jsonData:any) =>{
      console.log(jsonData)

      const reservaJSON = [{
        rut           : jsonData["rut_beneficiario"]  || '',
        proyecto      : jsonData["proyecto"]          || '',
        punto_venta   : `${punto_venta.value}`        || '',
        tipo_anteojo  : jsonData["tipo_anteojo"]      || '',
        dp            : jsonData["dp"]                || '',
        armazon_1     : jsonData["Armazon1"]          || '',
        armazon_2     : jsonData["Armazon2"]          || '',
        armazon_3     : jsonData["Armazon3"]          || '',
        usuario       : `${userID}`                   || '',
      }];

      console.log(reservaJSON)
  
      try {
      
        const reservaResponse = await axios(`${URLBackend}/api/otreservaarmazones/listado/?query=03&_pkToDelete=${encodeURIComponent(JSON.stringify(reservaJSON))}`)

        console.log(reservaResponse)
      
      
      } catch (error) {
        console.log(error)
      }
  
  
  }

  // const handleInputChange = (ref:any) => {
  //   console.log(`Valor cambiado en el input ${ref.name}`);
  // };



React.useEffect(()=>{
  console.log(armazon1)
  console.log(armazon1)
  // campos_busqueda: {'query': '02', '_id': '1', '_p6': '1', '_p2': '1801-2023', '_p3': '10', '_p1': '1001', '_p4': '60', '_p5': '65', '_pkToDelete': '[{"marca":"1","diseno":"1","indice":"2","material":"1","color":"1","tratamiento":"1","diametro":"65","esferico":-2,"cilindrico":-1,"punto_venta":10},{"marca":"1","diseno":"1","indice":"2","material":"1","color":"1","tratamiento":"1","diametro":"65","esferico":-1,"cilindrico":-2,"punto_venta":10}]'}

  if(armazon1 !== ''){
    if(armazon2 === armazon1 || armazon3 === armazon1){
      toast.error('Códigos de Armazones no deben ser iguales')
      // setValue('Armazon1', '')
      // // armazon1.current = ''
      // setArmazon1('')

      setValue('Armazon1', armazon1)
    }else{
      setValue('Armazon1', armazon1)
      console.log('armazon cambiado, ejecutando validacion')
      fetchValidateArmazon('Armazon1',armazon1)
      
    }
  }
},[armazon1])

React.useEffect(()=>{
  if(armazon2 !== ''){
    if(armazon2 === armazon1 || armazon3 === armazon2){
      toast.error('Códigos de Armazones no deben ser iguales')
      // setValue('Armazon2', '')
      // // armazon2 = ''
      // setArmazon2('')

      setValue('Armazon2', armazon2)
    }else{
      setValue('Armazon2', armazon2)
      console.log('armazon cambiado, ejecutando validacion')
  
    }

  }
},[armazon2])


React.useEffect(()=>{
  if(armazon3 !== ''){
    if(armazon3 === armazon1 || armazon3 === armazon2){
      toast.error('Códigos de Armazones no deben ser iguales')
      // setValue('Armazon3', '')
      // // armazon3. = ''
      // setArmazon3('')
      setValue('Armazon3', armazon3)
    }else{
      setValue('Armazon3', armazon3)
      console.log('armazon cambiado, ejecutando validacion')
  
    }
  }
},[armazon3])

    return (
        <form className=" max-w-md mx-auto px-6" onSubmit={handleSubmit((data)=> handleSaveChange(data))}>
          <div className=" sm:w-full">
            <h1 className="block text-white text-sm font-bold mb-2 -top-[30rem]">Reserva de Armazones</h1>
          </div>

          <div className=" mt-[9rem] !mx-auto">
            <div className="w-full !mb-5 rowForm">
              <SelectInputComponent
                  label='Nombre Proyecto'
                  name='proyecto'
                  showRefresh={true}
                  // handleSelectChange={}
                  // onlyFirstOption={true}
                  handleSelectChange={(e:any)=>{
                    codProyecto.value = e.value;
                  }}
                  // readOnly={true}
                  isOT={true}
                  control={control}
                  entidad={["/api/proyectos/", "07", userID]}
                  customWidth={"w-[23.3rem]"}
              />
            </div>
            <div className="w-full !mb-5 rowForm">
              <SelectInputComponent
                  label='Punto de Venta'
                  name='punto_venta_id'
                  showRefresh={true}
                  onlyFirstOption={true}
                  handleSelectChange={(e:any)=>{
                    console.log(e.value)
                    codPuntoVenta.value = e.value;
                  }}
                  isOT={true}
                  control={control}
                  entidad={["/api/puntosventa/", "06", codProyecto.value, `_p2=${userID}`]}
                  customWidth={"w-[23.3rem]"}
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
                  customWidth={"w-[23.3rem] "}
                  error={errors.tipo_anteojo}
              />
            </div>
          </div>

          <div className="w-[22rem]  !mt-5  flex rowForm">
            <div className="w-[65%]  text-xl !-ml-4">
              <TextInputComponent
                type='number'
                label='Rut Beneficiario'
                name="rut_beneficiario"
                control={control}
                handleChange={handleChange}
                textAlign='text-right !text-[1.7rem] !h-[3.9rem]'
                customWidth={"!text-xl"}
                error={errors.rut_beneficiario}
              
              />
            </div>
            <div className="w-[45%] !ml-15 ">
              <TextInputComponent
                type='number'
                label='DP'
                name="dp"
                handleChange={(e:any)=>{
                  console.log(e.value)
                  codDP.value = e.value
                }}
                isOT={true}
                control={control}
                textAlign='text-right !text-[2rem] !h-[3.9rem]'
                error={errors.dp}
              
              />
            </div>
          </div>






          <div className='!mt-5 flex flex-col justify-evenly h-[15rem]'>
            
              <div className="w-[22rem]   flex rowForm">
                <div className="w-[100%]  text-2xl !-ml-4">
                  <TextInputInteractive
                    type='number'
                    label='Armazon 1'
                    name="Armazon1"
                    control={control}
                    data={armazon1}
                    textAlign='text-right !text-[2rem] !h-[3.5rem]'
                    customWidth={"!text-2xl w-[22rem]"}
                    error={errors.Armazon1}
                    handleFocus={()=>handleFocus('Armazon1')}
                    
                  
                  />
                </div>
              </div>
              <div className="w-[22rem] !mt-10   flex rowForm">
                <div className="w-[100%]  text-2xl !-ml-4">
                  <TextInputInteractive
                    type='number'
                    label='Armazon 2'
                    name="Armazon2"
                    data={armazon2}
                    control={control}
                    textAlign='text-right !text-[2rem] !h-[3.5rem]'
                    customWidth={"!text-2xl w-[22rem]"}
                    error={errors.Armazon2}
                    handleFocus={()=>handleFocus('Armazon2')}
                  
                  />
                </div>
              </div>
              <div className="w-[22rem]   flex rowForm">
                <div className="w-[100%]  text-2xl !-ml-4">
                  <TextInputInteractive
                    type='number'
                    label='Armazon 3'
                    name="armazon3"
                    data={armazon3}
                    control={control}
                    textAlign='text-right !text-[2rem] !h-[3.5rem]'
                    customWidth={"!text-2xl w-[22rem]"}
                    error={errors.Armazon3}
                    handleFocus={()=>handleFocus('Armazon3')}

                  
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
      
        {isScanning &&  <Scanner 
                           setBarcode={setBarcode} 
                           focusInput={focusInput} 
                           setIsScanning={setIsScanning} 
                           setArmazon1={setArmazon1}
                           setArmazon2={setArmazon2} 
                           setArmazon3={setArmazon3} 
        /> }
            
            <div className="w-full">
              <Button color='orange' type='submit'>Reservar</Button>
            </div>
        </form>
);
}

export default FReservarArmazones