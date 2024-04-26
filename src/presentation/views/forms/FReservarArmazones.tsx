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
import { fetchReservaArmazones, isOnline, isShowReservaButton } from '../../utils/FReservaArmazones_utils';
import { clearBaseDatos, getArmazones, getBeneficiarios, isExistArmazon, isExistBeneficiario, openDatabase, setArmazones, setReservaBeneficiario } from '../../utils/indexedDB';
// import axios from 'axios';



//!INSERT: PROYECTO-RUT-PUNTOVENTA-TIPOANTEOJO-DP-A1-2-3-USERID

const codArmazon1 = signal('')
const codArmazon2 = signal('')
const codArmazon3 = signal('')

const focusInput  = signal('');

const codProyecto    = signal('');
const codPuntoVenta  = signal('');
const codDP          = signal('');


const Scanner:React.FC<any> = ({setIsScanning}) => {

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
        Quagga.onDetected(onDetected)
        Quagga.start();
        
      }
    });

    return () => Quagga.stop();
  }, []);

  const onDetected = (result:any) => {
    console.log(result)
    if (result.codeResult) {
      console.log(result.codeResult.code)
      const barcode = result.codeResult.code;   

      switch (focusInput.value) {
        case 'Armazon1':
          // setArmazon1(barcode);
          codArmazon1.value = barcode
          break;
        case 'Armazon2':
          // setArmazon2(barcode);
          codArmazon2.value = barcode
          break;
        case 'Armazon3':
          // setArmazon3(barcode);
          codArmazon3.value = barcode
          break;
        default:
          break;
      }
      setIsScanning(false)
      Quagga.stop()
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
  // const [focusInput, setFocusInput]   = useState('');
  const schema                        = validationReservaArmazonesSchema();
  const userID:any                    = useAppSelector((store: AppStore) => store.user?.id);
  // const armazon1                      = React.useRef('')
  // const armazon2                      = React.useRef('')
  // const armazon3                      = React.useRef('')


  const [_armazon1, setArmazon1]       = React.useState('');
  const [_armazon2, setArmazon2]       = React.useState('');
  const [_armazon3, setArmazon3]       = React.useState('');





  const {
    control,
    // register,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues
  } = useForm<any>({
    resolver: yupResolver(schema)
  })

  const formValues = getValues();

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

          // if(result.data && result.data[0] && result.data[0][19] !== ''){
          //   toast.error(result.data[0][19])
          //   setValue(armazon,'')
          //   setArmazon1('')
          // }




          
        } catch (error) {
            console.log(error)
            toast.error('Error al validar Armazon')
            // setValue(armazon, '')
        }

      }
  

  
    }


  const clearTextInputs  = () => {
    setValue('rut_beneficiario', '');
    setValue('dp', '');
    setValue('Armazon1', '');
    setValue('Armazon2', '');
    setValue('Armazon3', '');

    codArmazon1.value = '';
    codArmazon2.value = '';
    codArmazon3.value = '';
  }





  const handleFocus = (ref:any) => {
    console.log(ref)
    setIsScanning(true)

    if(ref){

      focusInput.value = ref
    }

  };

  const handleChange = (e:any) => {
    console.log(e)

    const result = validateRut(e)

    console.log(result)
  }

  const handleSaveChange = async (jsonData: any) => {
    console.log(jsonData);
    let reservaJSON;
  
    if (isOnline.value === true) {
      //?SI EL TIPO DE RESERVA ES ONLINE:
        reservaJSON = [{
          rut: jsonData["rut_beneficiario"] || '',
          proyecto: jsonData["proyecto"] || '',
          punto_venta: `${punto_venta.value}` || '',
          tipo_anteojo: jsonData["tipo_anteojo"] || '',
          dp: jsonData["dp"] || '',
          armazon_1: jsonData["Armazon1"] || '',
          armazon_2: jsonData["Armazon2"] || '',
          armazon_3: jsonData["Armazon3"] || '',
          usuario: `${userID}` || '',
        }];
        
        try {
          const reservaResponse = await axios(`${URLBackend}/api/otreservaarmazones/listado/?query=03&_pkToDelete=${encodeURIComponent(JSON.stringify(reservaJSON))}`);
          if (reservaResponse["data"].length < 1) {
            clearTextInputs();
            return toast.success('Armazones reservados correctamente');
          } else {
            return toast.error(reservaResponse["data"][0][1]);
          }
        } catch (error) {
          console.log(error);
        }
    } else {
      //?SI EL TIPO DE RESERVA ES OFFLINE:
      console.log('click')
      console.log(jsonData)


      await openDatabase().then(async(db:IDBDatabase)=>{
        // const transaction = db.transaction(["reserva_armazones", "reserva_armazones_beneficiarios"], "readwrite");
            try {
         
                const resultExistBeneficiario = await isExistBeneficiario(db, jsonData["rut_beneficiario"])
                console.log(resultExistBeneficiario)

                if(resultExistBeneficiario){
                  toast.error('Ya existe un registro para este Beneficiario')
                  return;
                }

                const resultExist = await isExistArmazon(db, [jsonData.Armazon1, jsonData.Armazon2, jsonData.Armazon3])
                
                if(!resultExist.value){
                  console.log(resultExist)
                  toast.error(`Armazon no pertenece al proyecto: ${resultExist.missingData}`)
                  return;
                }
                
                console.log(resultExist)
                
                
                if(resultExist.value){

                  const resultBeneficiario = await setReservaBeneficiario(db, jsonData, userID);
                  console.log(resultBeneficiario)
  
  
                  const result_a1 = await setArmazones(db,jsonData.Armazon1 || '', 1,false)
                  console.log(result_a1)
                  const result_a2 = await setArmazones(db,jsonData.Armazon2 || '', 1,false)
                  console.log(result_a2)
                  const result_a3 = await setArmazones(db,jsonData.Armazon3 || '', 1,false)
                  console.log(result_a3)
                  const reserva_armazones = await getArmazones(db);
                  console.log(reserva_armazones)
                
                  toast.success('Reserva guardada correctamente')
                  clearTextInputs();
                }else{
                  toast.error('No se encontro codigo de armazon')
                  throw new Error; 
                }
            } catch (error) {
              console.log(error)
              toast.error(error as string)
            }finally{
              db.close()
            }
        })
       .catch((error)=>{
        console.log(error)
       }) 

    }
  };
  

  React.useEffect(() => {
  // console.log('fetch')
  fetchReservaArmazones(punto_venta.value, codProyecto.value,userID)
},[punto_venta.value])



React.useEffect(()=>{
  // console.log(armazon1)
  // console.log(armazon1)

  // console.log(codArmazon1.value)
  // console.log(codArmazon2.value)
  // console.log(codArmazon3.value)

  if(codArmazon1.value !== ''){
    if(codArmazon2.value === codArmazon1.value || codArmazon3.value === codArmazon1.value){
      toast.error('Códigos de Armazones no deben ser iguales')
      setValue('Armazon1', '')
      codArmazon1.value = '';
    }else{
      setValue('Armazon1', codArmazon1.value)
      console.log('armazon cambiado, ejecutando validacion')
      fetchValidateArmazon('Armazon1',codArmazon1.value)
      
    }
  }
},[codArmazon1.value])

React.useEffect(()=>{
  if(codArmazon2.value !== ''){
    if(codArmazon2.value === codArmazon1.value || codArmazon3.value === codArmazon2.value){
      toast.error('Códigos de Armazones no deben ser iguales')
      setValue('Armazon2', '')
      codArmazon2.value = '';
      // // armazon2 = ''
      // setValue('Armazon2', armazon2)
    }else{
      setValue('Armazon2', codArmazon2.value)
      console.log('armazon cambiado, ejecutando validacion')
  
    }

  }
},[codArmazon2.value])


React.useEffect(()=>{
  if(codArmazon3.value !== ''){
    if(codArmazon3.value === codArmazon1.value || codArmazon3.value === codArmazon2.value){
      toast.error('Códigos de Armazones no deben ser iguales')
      setValue('Armazon3', '')
      setArmazon3('')
      codArmazon3.value = '';
    }else{
      setValue('Armazon3', codArmazon3.value)
      console.log('armazon cambiado, ejecutando validacion')
    }
  }
},[codArmazon3.value])


// console.log(armazon1)
// console.log(armazon2)
// console.log(armazon3)

const handleUploadata = async() => {
  console.log('click')
  await openDatabase().then(async(db:IDBDatabase)=>{

    const armazonesData     = await getArmazones(db);
    const beneficiarioData  = await getBeneficiarios(db);
    
    
    console.log(armazonesData)
    console.log(beneficiarioData)


    const jsonData03 = beneficiarioData.map((reserva:any)=>{
      return{
          "rut"            : reserva["rut_beneficiario"],
          "proyecto"       : reserva["proyecto"],
          "punto_venta"    : `${punto_venta.value}`,
          "tipo_anteojo"   : reserva["tipo_anteojo"],
          "dp"             : reserva["dp"],
          "armazon_1"       : reserva["armazon_1"],
          "armazon_2"       : reserva["armazon_2"],
          "armazon_3"       : reserva["armazon_3"],
          "usuario"        : `${userID}`
      }
    })

    const jsonData07 = armazonesData.map((reserva:any)=>{
      return{
          "punto_venta" : `${punto_venta.value}`,
          "usuario"     : `${userID}`,
          "armazon"     : reserva["cod_armazon"],
          "reservado"   : reserva["stock_reservado"],
          "disponible"  : reserva["stock_disponible"]
      }
    });


    console.log(jsonData03)
    console.log(jsonData07)

      try {
        const response03 = await axios(`${URLBackend}/api/otreservaarmazones/listado/?query=03&_pkToDelete=${encodeURIComponent(JSON.stringify(jsonData03))}`);
        
        console.log(response03)
        
        if (Array.isArray(response03["data"]) && response03["data"].length > 0) {
          if(response03["data"] && response03["data"][0].includes("ERROR")){
            toast.error(response03["data"][0][1])
            return;
          } 
        }else{
          console.log('render')
          // if(response03["data"])
          const response07 = await axios(`${URLBackend}/api/almacenesstock/listado/?query=07&_pkToDelete=${encodeURIComponent(JSON.stringify(jsonData07))}`); 
  
          console.log(response07)
  
          await clearBaseDatos(db)
          toast.success('Reserva Cargada Correctamente')

        }
      } catch (error) {
        console.log(error)
      }
  })

};



    return (
        <form className=" max-w-md mx-auto px-6" onSubmit={handleSubmit((data)=> handleSaveChange(data))}>

          <div className=" mt-[9rem] !mx-auto">
          {/* <div className=" w-full relative bg-red-300"> */}
            {isShowReservaButton.value === true && (
              <Button className='relative bottom-4 right-0 ' onClick={()=>handleUploadata()}>Cargar</Button>
            )}
          {/* </div> */}
            {/* <h1 className='text-white mx-auto'>{punto_venta.value}</h1> */}
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
                type='text'
                label='Rut Beneficiario'
                name="rut_beneficiario"
                data={formValues && formValues["rut_beneficiario"]}
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
                  codDP.value = e.value
                }}
                data={formValues && formValues["dp"]}
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
                    data={codArmazon1.value}
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
                    data={codArmazon2.value}
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
                    data={codArmazon3.value}
                    control={control}
                    textAlign='text-right !text-[2rem] !h-[3.5rem]'
                    customWidth={"!text-2xl w-[22rem]"}
                    error={errors.Armazon3}
                    isOptional={true}
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
            { codArmazon1.value !== '' &&
              codArmazon2.value !== '' &&
              codArmazon3.value !== ''  
              && (
              <div className="w-full">
                <Button color='orange' type='submit'>Reservar</Button>
              </div>
            )}
        </form>
);
}

export default FReservarArmazones





