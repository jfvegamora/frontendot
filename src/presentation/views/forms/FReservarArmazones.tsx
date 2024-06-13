// import React from 'react'


// import { useState } from "react";
// import ZXing from '@rzxing/browser';// import { BrowserBarcodeReader } from '@zxing/library';

import React, { useState, useEffect } from 'react';

//@ts-ignore
import Quagga from 'quagga';
import { Button } from '@material-tailwind/react';
import { signal } from '@preact/signals-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { codigoProyecto, punto_venta, tipo_de_anteojo, validateRut, validationReservaArmazonesSchema } from '../../utils';
import { SelectInputComponent, TextInputComponent } from '../../components';
import { AppStore, useAppSelector } from '../../../redux/store';
import TextInputInteractive from '../../components/forms/TextInputInteractive';
import { toast } from 'react-toastify';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';
import { fetchReservaArmazones, getLocalArmazones, isOnline } from '../../utils/FReservaArmazones_utils';
import { clearBaseDatos, getArmazones, getBeneficiarios, isExistArmazon, isExistBeneficiario, openDatabase, setArmazones, setReservaBeneficiario, validateLocalArmazon } from '../../utils/indexedDB';
import { clearRutCliente } from '../../components/OTForms/FOTClientes';
import { useNavigate } from 'react-router-dom';
// import { focusFirstInput } from '../../components/OTForms/FOTValidarBodega';
// import axios from 'axios';



//!INSERT: PROYECTO-RUT-PUNTOVENTA-TIPOANTEOJO-DP-A1-2-3-USERID

export const codArmazon1      = signal('');
export const codArmazon2      = signal('');
export const codArmazon3      = signal('');
export const diametro_cristal = signal('')

const focusInput  = signal('');



export const codProyecto            = signal('');
export const isDataLocal            = signal(false);
export const responseArmazones      = signal<any>([]);
export const armazonesLocalData     = signal<any>([]);


export const codPuntoVenta          = signal('');
const codDP                  = signal('');
const rutBeneficiarioSignal  = signal('');
const emptyBeneficiariosData = signal(true);


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
        numOfWorkers: 15,
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
    if (result.codeResult) {
      const barcode = result.codeResult.code;   

      switch (focusInput.value) {
        case 'Armazon1':
          codArmazon1.value = barcode
          // focusFirstInput('Armazon2',inputsRef.armazon_2)
          break;
        case 'Armazon2':
          codArmazon2.value = barcode
          // focusFirstInput('Armazon3',inputsRef.armazon_3)
          break;
        case 'Armazon3':
          codArmazon3.value = barcode
          break;
        default:
          break;
      }
      setIsScanning(false)
      Quagga.stop();
    }
  };


  const closeScanner = () => {
    console.log('Closing scanner');
    Quagga.stop();
    setIsScanning(false);
  };

  return (
    
      // <div id="scanner-container" className='absolute top-[8.6rem] !right-[5rem] !z-20' style={{ width: 250, height: 350 }} autoFocus>
      <div>
        <div
         className='text-4xl text-[#f8b179] absolute top-[8.6rem] !right-[6rem] !z-30'
         onClick={closeScanner}
        >
          X
        </div>

        <div id="scanner-container" className='absolute top-[8.6rem] !right-[5rem] !z-20' style={{ width: 250, height: 350 }} autoFocus>
        </div>
        {/* <h1 className='text-lg text-white'>Armazon 1</h1> */}
      </div>
  
  );
};



const FReservarArmazones = () => {
  const [isScanning, setIsScanning]   = useState(false);
  const [isLoading, setisLoading]     = React.useState<boolean>(false);
  const schema                        = validationReservaArmazonesSchema();
  const userID:any                    = useAppSelector((store: AppStore) => store.user?.id);
  const userAgent = navigator.userAgent

  const isMobile = /Mobi/.test(userAgent)
  const navigate = useNavigate()




  const inputsRef = {
    armazon_1: React.useRef<any>(null),
    armazon_2: React.useRef<any>(null),
    armazon_3: React.useRef<any>(null),
  }

  const {
    control,
    // register,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues:{
      tipo_de_anteojo: '1'
    }
  })

  // React.useEffect(()=>{
  //   if(!isMobile){
  //     navigate('/landing')
  //   }
  // },[])

  const formValues = getValues();


  const clearInputsArmazones = (armazon:string) => {
    switch (armazon) {
      case 'Armazon1':
        codArmazon1.value = '';
        break;
      case 'Armazon2':
        codArmazon2.value = '';
        break;
      case 'Armazon3':
        codArmazon3.value = '';
        break
      default:
        break;
    }
  }

  const fetchValidateArmazon = async(armazon:string, codArmazon:string) => {
      setisLoading(true)
      const urlbase  = `${URLBackend}/api/armazones/listado/?query=02`;
      // const urlbase2 = `${URLBackend}/api/armazones/listado/?query=02`;

      let json_data = [{}]
      console.log(json_data)

      if(codDP.value === ''){
        clearInputsArmazones(armazon)
        return toast.error('Falta ingresar DP para validar Armazón.')
      }

      console.log(armazon)
      if(isOnline.value === true){
        // const emmtyJSON = {
        //   "marca"       : '',
        //   "diseno"      : '',
        //   "indice"      : '',
        //   "material"    : '',
        //   "color"       : '',
        //   "tratamiento" : '',
        //   "diametro"    : '',
        //   "esferico"    : '',
        //   "cilindrico"  : '',
        //   "punto_venta" : ''
        // }

        let _id = 0;//? 0 no validar nada, data armazon  / 1 valida armazon y cristal  / 2 solo valida amrazon
        let _p6 = 0;

        switch (armazon) {
          case 'Armazon1':
            json_data = [{
              query                    : "02",
              armazon                  : (codArmazon || '').trim(),
              proyecto                 : codProyecto.value,
              punto_venta              : codPuntoVenta.value,
              dp                       : codDP.value,
              // diametro                 : diametro_cristal.value,
              validar_parametrizacion  : 1,
              solo_consulta            : 2,
              tipo_anteojo             : tipo_de_anteojo.value,
              numero_armazon           : 1
          }]
            _id = 2;
            _p6 = 1;
            break;
          case 'Armazon2':
            json_data = [{
              query                    : "02",
              armazon                  : (codArmazon || '').trim(),
              proyecto                 : codProyecto.value,
              punto_venta              : codPuntoVenta.value,
              dp                       : codDP.value,
              // diametro                 : diametro_cristal.value,
              validar_parametrizacion  : 1,
              solo_consulta            : tipo_de_anteojo.value === '3' ? 2 : 0,
              tipo_anteojo             : tipo_de_anteojo.value,
              numero_armazon           : 2
            }]
            _id = tipo_de_anteojo.value === '3' ? 2 : 0
            _p6 = tipo_de_anteojo.value === '3' ? 1 : 0
            break
          case 'Armazon3':
            json_data = [{
              query                    : "02",
              armazon                  : (codArmazon || '').trim(),
              proyecto                 : codProyecto.value,
              punto_venta              : codPuntoVenta.value,
              dp                       : codDP.value,
              // diametro                 : diametro_cristal.value,
              validar_parametrizacion  : 1,
              solo_consulta            : tipo_de_anteojo.value === '3' ? 2 : 0,
              tipo_anteojo             : tipo_de_anteojo.value,
              numero_armazon           : 2
            }]
            _id = 0;
            _p6 = 0;
            break
          default:
            break;
        }
  
        // const _id = 2//? 0 no validar nada, data armazon  / 1 valida armazon y cristal  / 2 solo valida amrazon
        // const _p6 = 1 //? 1 VALIDAR PARAMETRIZACION
        // const _p1 = codArmazon
        // const _p2 = codProyecto.value
        // const _p3 = codPuntoVenta.value
        // const _p4 = codDP.value
        // const _p5 = '65' //?'DIAMETRO'
        // const _pkToDelete = encodeURIComponent(JSON.stringify([emmtyJSON, emmtyJSON]))
  
        if(codArmazon !== ''){
          try {
            // const fetchURL = `${urlbase}&_p1=${_p1}&_p2=${_p2}&_p3=${_p3}&_p4=${_p4}&_p5=${_p5}&_pkToDelete=${_pkToDelete}&_id=${_id}&_p6=${_p6}`
  
            const fetchURL = `${urlbase}&_jsonData=${encodeURIComponent(JSON.stringify(json_data))}`

           
            const result = await axios(fetchURL)
            if(result.data && result.data[0] && result.data[0][19] !== ''){
              toast.error(result.data[0][19])
              setisLoading(false);
              clearInputsArmazones(armazon)
            }
            

            switch (armazon) {
              case 'Armazon1':
                codArmazon1.value = result.data[0][0]
                break;
              case 'Armazon2':
                codArmazon2.value = result.data[0][0]
                break;
              case 'Armazon3':
                codArmazon3.value = result.data[0][0]
                break;
              default:
                break;
            }
            setisLoading(false);
          } catch (error) {
              setisLoading(false);
              clearInputsArmazones(armazon);
              toast.error('Error al validar Armazón.')
          }
        }
      }else{
        const dataValidateArmazon = {
          codArmazon,
          punto_venta : punto_venta.value,
          proyecto    : codProyecto.value,
          dp          : codDP.value
        }
        await openDatabase().then(async(db:IDBDatabase)=>{
          const resultValidateArmazon = await validateLocalArmazon(db, dataValidateArmazon);
          if(!resultValidateArmazon){
            clearInputsArmazones(armazon)
          }

        })
      }}


  const clearTextInputs  = () => {
    setValue('rut_beneficiario', '');
    setValue('dp', '');
    setValue('Armazon1', '');
    setValue('Armazon2', '');
    setValue('Armazon3', '');
    rutBeneficiarioSignal.value = '';
    codArmazon1.value = '';
    codArmazon2.value = '';
    codArmazon3.value = '';
    clearRutCliente.value = !clearRutCliente.value
  }


  const handleFocus = (ref:any) => {
    // console.log(ref)
    setIsScanning(true)

    if(ref){
      focusInput.value = ref
    }
  };

  const handleChange = (e:any) => {
    console.log(e)

    const result = validateRut(e)

    console.log(result)

    if(!result && e?.trim() !== ''){
      setValue('rut_beneficiario', '')
      rutBeneficiarioSignal.value = '';
      clearRutCliente.value = !clearRutCliente.value
      toast.error('Rut no Válido.')

    }else{
      rutBeneficiarioSignal.value = e;
      setValue('rut_beneficiario', e)
    }
  }

  const handleSaveChange = async (jsonData: any) => {
    let reservaJSON;

    if (isOnline.value === true) {
      //?SI EL TIPO DE RESERVA ES ONLINE:
        reservaJSON = [{
          rut            : jsonData["rut_beneficiario"]  || '',
          proyecto       : jsonData["proyecto"]          || codProyecto.value || '',
          punto_venta    : `${codPuntoVenta.value}`      || '',
          tipo_anteojo   : jsonData["tipo_anteojo"]      || '',
          dp             : jsonData["dp"]                || '',
          armazon_1      : codArmazon1.value             || '',
          armazon_2      : codArmazon2.value             || '',
          armazon_3      : codArmazon3.value             || '',
          usuario        : `${userID}`                   || '',
        }];
        
        try {
          const reservaResponse = await axios(`${URLBackend}/api/otreservaarmazones/listado/?query=03&_pkToDelete=${encodeURIComponent(JSON.stringify(reservaJSON))}`);
          if (reservaResponse["data"].length < 1) {
            clearTextInputs();
            setIsScanning(false);
            setValue('rut_beneficiaro', '')
            clearRutCliente.value = !clearRutCliente.value;
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
                  if(jsonData.Armazon1 !== ''){
                    await setArmazones(db,{codArmazon:jsonData.Armazon1 || ''}, 1,false,'1',jsonData["tipo_anteojo"])
                  }

                  if(jsonData.Armazon2 !== ''){
                    await setArmazones(db,{codArmazon:jsonData.Armazon2 || ''}, 1,false,'2',jsonData["tipo_anteojo"])
                  }
                  
                  if(jsonData.Armazon3 !== ''){
                    await setArmazones(db,{codArmazon:jsonData.Armazon2 || ''}, 1,false,'3',jsonData["tipo_anteojo"])
                  }
                  

                  jsonData["proyecto"]        = codProyecto.value
                  jsonData["punto_venta_id"]  = punto_venta.value;
                  console.log(jsonData)
                  const resultBeneficiario = await setReservaBeneficiario(db, jsonData, userID);
                  console.log(resultBeneficiario)
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
    if(punto_venta.value !== '' && codProyecto.value !== ''){
      console.log('render')
      fetchReservaArmazones(codPuntoVenta.value, codProyecto.value,userID, true)
    }
},[codProyecto.value, punto_venta.value])


React.useEffect(()=>{


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
      
      
      fetchValidateArmazon('Armazon2', codArmazon2.value)
  
    }

  }
},[codArmazon2.value])


React.useEffect(()=>{
  if(codArmazon3.value !== ''){
    if(codArmazon3.value === codArmazon1.value || codArmazon3.value === codArmazon2.value){
      toast.error('Códigos de Armazones no deben ser iguales')
      setValue('Armazon3', '')
      codArmazon3.value = '';
    }else{
      setValue('Armazon3', codArmazon3.value)
      console.log('armazon cambiado, ejecutando validacion')
      
      fetchValidateArmazon('Armazon3', codArmazon3.value)
    }
  }
},[codArmazon3.value])


// console.log(armazon1)
// console.log(armazon2)
// console.log(armazon3)

const handleUploadata = async() => {
  console.log('click')

  const resultConfirm = confirm('Desea continuar con la carga de datos?')

  if(!resultConfirm){
    return;
  }


  await openDatabase().then(async(db:IDBDatabase)=>{

    const armazonesData     = await getArmazones(db);
    const beneficiarioData  = await getBeneficiarios(db);
    let jsonData03 = {}
    let jsonData07 = {}

    console.log(armazonesData)
    console.log(beneficiarioData)


    console.log('click')



    jsonData07 = armazonesData.map((reserva:any)=>{
      return{
          "punto_venta" : reserva["punto_venta"],
          "usuario"     : `${userID}`,
          "armazon"     : reserva["cod_armazon"],
          "reservado"   : reserva["stock_reservado"],
          "disponible"  : reserva["stock_disponible"]
      }
    });



    console.log(jsonData03)
    console.log(jsonData07)

      try {
        if(beneficiarioData.length > 0){
            jsonData03 = beneficiarioData.map((reserva:any)=>{
              return{
                  "rut"            : reserva["rut_beneficiario"],
                  "proyecto"       : reserva["proyecto"],
                  "punto_venta"    : `${codPuntoVenta.value}`,
                  "tipo_anteojo"   : reserva["tipo_anteojo"],
                  "dp"             : reserva["dp"],
                  "armazon_1"       : reserva["armazon_1"],
                  "armazon_2"       : reserva["armazon_2"],
                  "armazon_3"       : reserva["armazon_3"],
                  "usuario"        : `${userID}`
              }
            })
            const response03 = await axios(`${URLBackend}/api/otreservaarmazones/listado/?query=03&_pkToDelete=${encodeURIComponent(JSON.stringify(jsonData03))}`);
            
            console.log(response03)
            
            if (Array.isArray(response03["data"]) && response03["data"].length > 0) {
              if(response03["data"] && response03["data"][0].includes("ERROR")){
                console.log(response03["data"][0][1])
                toast.error(response03["data"][0][1])
                return;
              }
        }
        }
        console.log('render')
        const response07 = await axios(`${URLBackend}/api/otreservaarmazones/listado/?query=06&_pkToDelete=${encodeURIComponent(JSON.stringify(jsonData07))}`); 
        console.log(response07)
        isDataLocal.value = false;
        responseArmazones.value = [];
        await clearBaseDatos(db)
        toast.success('Reserva Cargada Correctamente')
      } catch (error) {
        console.log(error)
      }
  })
};







useEffect(()=>{
  const fetchProyectosUsuario = async() => {
    // https://gestiondev.mtoopticos.cl/api/proyectos/listado/?query=07&_p1=98
    try {
      const response = await axios(`${URLBackend}/api/proyectos/listado/?query=07&_p1=${userID}`)
      if(response.data[0][0]){
        codProyecto.value    = response.data[0][0]
      }
    } catch (error) {
      console.log(error)
    }
  }

  fetchProyectosUsuario()

  openDatabase().then(async(db:IDBDatabase)=>{
    const armazonesData     = await getArmazones(db);
    const beneficiarioData  = await getBeneficiarios(db);

    if(beneficiarioData.length === 0){
      emptyBeneficiariosData.value = true; 
    }else{
      emptyBeneficiariosData.value = false;
    }

    if(armazonesData.length === 0){
      isDataLocal.value       = false;
    }else{
      armazonesLocalData.value = armazonesData
      isDataLocal.value       = true;
    }
  })

  // diametro_cristal.value = localStorage.getItem('diametroCristal') ? JSON.parse(localStorage.getItem("diametroCristal") as string)[0][3] : 70;

},[])

    const reservaJSON = {
      "proyecto"     : codProyecto.value,
      "punto_venta"  : codPuntoVenta.value,
      "usuario"      : userID
  }


  React.useEffect(()=>{
    clearTextInputs()
    setValue('rut_beneficiario', '')
  },[clearRutCliente])



  
    return (
        <form className=" w-screen  mx-auto px-6 !overflow-x-hidden form-container-reserva" onSubmit={handleSubmit((data)=> handleSaveChange(data))}>

          <div className=" mt-[6rem] !mx-auto">

            {isOnline.value === false && isDataLocal.value === true && (
              <Button className='relative bottom-4 right-0 text-base ' onClick={()=>handleUploadata()}>Subir Reservas</Button>
            )}


            {isOnline.value === false && isDataLocal.value === false && (responseArmazones.value.length > 0) && (
              // <Button className='relative bottom-4 right-0 text-base' color='green' onClick={()=>fetchReservaArmazones(punto_venta.value, codProyecto.value,userID,false).then(isDataLocal.value = false as any)}>Descargar Muestrario</Button>
              <Button className='relative bottom-4 right-0 text-base' color='green' onClick={()=>getLocalArmazones(reservaJSON)}>Descargar Muestrario</Button>
            )}
            <div className="w-full h-[150vh] overflow-scroll">
              <div className="w-full !mb-5 rowForm ">
                <SelectInputComponent
                    label='Proyecto'
                    name='proyecto'
                    showRefresh={true}
                    data={codigoProyecto.value}
                    // handleSelectChange={}
                    // onlyFirstOption={true}
                    handleSelectChange={(e:any)=>{
                      codProyecto.value = e.value;
                    }}
                    // readOnly={true}
                    isOT={true}
                    control={control}
                    entidad={["/api/proyectos/", "07", userID]}
                    customWidth={"w-[93vw]"}
                    onlyFirstOption={true}
                />
              </div>
              <div className="w-full !mb-5 rowForm">
                <SelectInputComponent
                    label='Operativo'
                    name='punto_venta_id'
                    showRefresh={true}
                    onlyFirstOption={true}
                    handleSelectChange={(e:any)=>{
                      punto_venta.value = e.value
                      codPuntoVenta.value = e.value
                    }}
                    isOT={true}
                    control={control}
                    entidad={["/api/puntosventa/", "06", codProyecto.value, `_p2=${userID}`]}
                    customWidth={"w-[93vw]"}
                    
                />
              </div>
              <div className="w-full !mb-7 rowForm">
                <SelectInputComponent
                    label='Tipo Anteojo'
                    name='tipo_anteojo'
                    showRefresh={true}
                    data={1}
                    handleSelectChange={(e:any)=>{
                      tipo_de_anteojo.value = e.value;
                    }}
                    isOT={true}
                    control={control}
                    entidad={["/api/tipos/", "02", "OTTipoAnteojo"]}
                    customWidth={"w-[93vw] "}
                    error={errors.tipo_anteojo}
                />
              </div>
              <div className="w-[88vw]  !mt-5  flex rowForm">
                <div className="w-[65%]  text-xl !-ml-4">
                  <TextInputComponent
                    type='text'
                    // isOT={false}
                    label='RUT Beneficiario'
                    name="rut_beneficiario"
                    data={rutBeneficiarioSignal.value || formValues && formValues["rut_beneficiario"]}
                    control={control}
                    handleChange={handleChange}
                    textAlign='text-right !text-[1.7rem] !h-[3.9rem]'
                    customWidth={"!text-xl w-[54vw]"}
                    error={errors.rut_beneficiario}
                  
                  />
                </div>
                <div className="w-[30%] !ml-8   ">
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
                    customWidth={"w-[28vw]"}
                    textAlign='text-right !text-[2rem] -translate-x-6 !h-[3.9rem]'
                    error={errors.dp}
                  
                  />
                </div>
              </div>

              <div className='!mt-5 flex flex-col justify-evenly h-[15rem]'>
                
                  <div className="w-[22rem]   flex rowForm">
                    <div className="w-[100%]  text-2xl !-ml-4">
                      <TextInputInteractive
                        type='number'
                        inputRef={inputsRef.armazon_1}
                        label='Armazón 1'
                        name="Armazon1"
                        control={control}
                        data={codArmazon1.value}
                        textAlign='pr-[5rem] !text-[1.6rem] !h-[3.5rem] !custom-required'
                        customWidth={"!text-3xl w-[87.5vw] !custom-required"}
                        error={errors.Armazon1}
                        // handleFocus={()=>handleFocus('Armazon1')}
                        // onlyRead={true}
                        handleChange={(e)=>{
                          codArmazon1.value = e
                        }}
                        reservaArmazones={true}
                        handleFocusReservaArmazones={()=>handleFocus('Armazon1')}
                      
                      />
                    </div>
                  </div>
                  <div className="w-[22rem] !mt-10   flex rowForm">
                    <div className="w-[100%]  text-2xl !-ml-4">
                      <TextInputInteractive
                        type='number'
                        inputRef={inputsRef.armazon_2}
                        label='Armazón 2'
                        name="Armazon2"
                        data={codArmazon2.value}
                        control={control}
                        textAlign=' pr-[5rem] !text-[1.6rem] !h-[3.5rem]'
                        customWidth={"!text-3xl w-[87.5vw]"}
                        error={errors.Armazon2}
                        isOptional={tipo_de_anteojo.value !== '3'}
                        // handleFocus={()=>handleFocus('Armazon2')}
                        // onlyRead={true}
                        handleChange={(e)=>{
                          codArmazon2.value = e
                        }}
                        reservaArmazones={true}
                        handleFocusReservaArmazones={()=>handleFocus('Armazon2')}  
                      />
                    </div>
                  </div>
                  <div className="w-[22rem]   flex rowForm">
                    <div className="w-[100%]  text-2xl !-ml-4">
                      <TextInputInteractive
                        type='number'
                        inputRef={inputsRef.armazon_3}
                        label='Armazón 3'
                        name="Armazon3"
                        data={codArmazon3.value}
                        control={control}
                        textAlign='pr-[4rem] !text-[1.6rem] !h-[3.5rem]'
                        customWidth={"!text-3xl w-[87.5vw]"}
                        error={errors.Armazon3}
                        handleChange={(e)=>{
                          console.log(e)
                          codArmazon3.value = e
                        }}
                        isOptional={true}
                        // handleFocus={()=>handleFocus('Armazon3')}
                        // onlyRead={true}
                        reservaArmazones={true}
                        handleFocusReservaArmazones={()=>handleFocus('Armazon3')}
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
              {isScanning &&  <Scanner 
                                setIsScanning={setIsScanning}   
              /> }
              {
                  (
                    tipo_de_anteojo.value === '3' 
                      ? (codArmazon1.value !== '' && codArmazon2.value !== '') 
                      : (codArmazon1.value !== '')
                  ) && !isLoading && (
                    <div className="w-full">
                      <Button color='orange' type='submit'>Reservar</Button>
                    </div>
                  )
                }
            </div>
        </div>

        </form>
);
}

export default FReservarArmazones





