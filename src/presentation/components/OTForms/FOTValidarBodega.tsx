import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { A1_CR_OD, A1_CR_OI, A2_CR_OD, A2_CR_OI, a1_armazon, a2_armazon, codigoProyecto, reiniciarValidationNivel3, tipo_de_anteojo, updateOT, validationBodegaSchema, validationNivel3 } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';
import { dataOTSignal, resultValidarBodega, valueConfirmOT } from '../OTPrimaryButtons';
// import { toast } from 'react-toastify';
import { validationCodigoArmazon_1, validationCodigoArmazon_2, validationCodigoCristal1_od, validationCodigoCristal1_oi, validationCodigoCristal2_od, validationCodigoCristal2_oi } from '../../utils/validationOT';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { paramsOT } from '../../views/mantenedores/MOT';
import { toast } from 'react-toastify';
import { OTGrillaEnum } from '../../Enums';
import { signal } from '@preact/signals-react';
import { Checkbox } from '@material-tailwind/react';
import { CR1_OD_LAB, CR1_OI_LAB, CR2_OD_LAB, CR2_OI_LAB } from '../../utils/FOTCristales_utils';

import {Howl} from 'howler';
import soundError from '../../../assets/error-call-to-attention-129258.mp3';

export const focusFirstInput = (strInputName: string, ref: React.RefObject<any>) => {
    if (ref.current) {
        console.log(strInputName)
        console.log(ref)
      const firstInput = ref.current.querySelector(`input[name=${strInputName}]`);
      if (firstInput) {
        (firstInput as HTMLInputElement).focus();
      }
    }
  };


const cr1_od_signal = signal("");
const validationA1_armazon = signal('');
const validationA2_armazon = signal('');


interface IFOTValidarBodega{
    handleClose?:any,
    pkToDelete?:any
}

const FOTValidarBodega:React.FC<IFOTValidarBodega> = ({
    handleClose,
}) => {
    
    console.log(dataOTSignal.value)

    const [formValues, setFormValues] = React.useState();
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const [OT, setOT] = React.useState<any>(dataOTSignal.value)

    const resetFields = () =>{
        CR1_OD_LAB.value = false;
        CR1_OI_LAB.value = false;
        CR2_OD_LAB.value = false;
        CR2_OI_LAB.value = false;
        validationA1_armazon.value = ''
        validationA2_armazon.value = ''
        resetField('a1_od')
        resetField('a1_oi')
        resetField('a1_armazon')
        resetField('a2_od')
        resetField('a2_oi')
        resetField('a2_armazon')
    }



    const schema           = validationBodegaSchema();
    const alreadyValidate  = true;
    const dispatch         = useAppDispatch();

    let errorSound = new Howl({
        src: [soundError],
        volume: 1
    });
    
    
    const inputsRef = {
        a1_od:         React.useRef<any>(null),
        a1_oi:         React.useRef<any>(null),
        a1_armazon:    React.useRef<any>(null),
        a2_od:         React.useRef<any>(null),
        a2_oi:         React.useRef<any>(null),
        a2_armazon:    React.useRef<any>(null),
    }


    const inputArmazonProps:any = {
        "a1_armazon": () =>{
            return {
                label: 'Armazon 1',
                labelArmazon: OT[OTGrillaEnum.a1_armazon_id],
                name: 'a1_armazon',
                data: validationA1_armazon.value,
                inputRef: inputsRef.a1_armazon
            }
        },
        "a2_armazon": () =>{
            return{
                label: 'Armazon 2',
                labelArmazon: OT[OTGrillaEnum.a2_armazon_id],
                name:'a2_armazon',
                data: validationA2_armazon.value,
                inputsRef:inputsRef.a2_armazon
            }
        }
    }


    const resnderInputArmazon = (armazon:string) =>{
        const {label, name, data, labelArmazon} = inputArmazonProps[armazon]()
        console.log(data)
        return (
            <div className='rowForm !h-[5rem] relative mb-4'>
                <label className='labelInput  ml-4'>{labelArmazon}</label>      
                <TextInputInteractive
                    type='text'
                    label={label}
                    name={name}
                    handleChange={handleInputChange}
                    isOT={true}
                    data={data}
                    control={control}
                    textAlign='text-left'
                    customWidth={"labelInput inputStyles w-[27.9vw]"}
                    inputRef={inputsRef as any}
                    validarBodega={true}
                />
        </div>
        )
    }

    // console.log(OT[EnumGrid.tipo_anteojo_id])
    
  

    const casoEjecutar = Object.keys(resultValidarBodega.value).find((key:any)=>resultValidarBodega.value[key] === true)

    const armazones = ([{codigo: OT && OT[OTGrillaEnum.a1_armazon_id]}, {codigo: OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? (OT && OT[OTGrillaEnum.a2_armazon_id]) : ('')}] as any).filter((codigo:any)=>codigo.codigo !== '')

    const cristales = (
        [
            { codigo: OT && OT[OTGrillaEnum.cr1_od],
              opcion_vta: (CR1_OD_LAB.value === true ? '2' : '1' ) 
            }, 
            {codigo:OT && OT[OTGrillaEnum.cr1_oi],
             opcion_vta: (CR1_OI_LAB.value === true ? '2' : '1')   
            }, 
            { 
                codigo: ( OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? (OT && OT[OTGrillaEnum.cr2_od]) : ('') ),
                opcion_vta: (OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? ((CR2_OD_LAB.value === true ? '2' : '1')) : (''))
            } ,
             {
                codigo: OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? (OT && OT[OTGrillaEnum.cr2_oi]): (''),
                opcion_vta: (OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? ((CR2_OI_LAB.value === true ? '2' : '1')) : (''))
            }]
            
            ).filter((codigo:any)=>codigo.codigo !== '')

    const {
        control,
        formState: { errors },
        resetField      
      } = useForm({
        resolver: yupResolver(schema),
    });

    const handleInputChange = (e:any) => {
        
        let {name, value} = e;
        let formatValue:any;
        console.log(name)
        console.log(value)
        
        if(value === ''){
            return;
        }
        
        console.log(value)
        if(value && value.length >= 12){
            const regex = /^0+/;
            formatValue = value.replace(regex, "")

        }
        
        console.log(name)
        
            if(name === 'a1_od'){
                console.log(formatValue)
                if(formatValue === ''){
                    validationCodigoCristal1_od('')
                }
                
                if((OT && OT[OTGrillaEnum.cr1_od] === formatValue) && value.length >= 11){
                    console.log('render')
                    validationCodigoCristal1_od(formatValue,alreadyValidate)
                    focusFirstInput('a1_oi',inputsRef["a1_oi"] )
                }else{
                    if(value.length <= 11){
                        return;
                    }else{
                        validationCodigoCristal1_od('')
                        errorSound.play()
                        resetField('a1_od')
                        setFormValues({[name]:''} as any)
                        toast.error('Código Cristal OD no corresponde.')
                        inputsRef.a1_od.current = ''
                        cr1_od_signal.value = ''
                        value = ''
                    } 

                    // toast.error('Anteojo 1, Código cristal OD no son iguales')
                    // setFormValues({[name]: ''} as any)
                }
                
                console.log(formValues)
            }
    
            if(name === 'a1_oi'){
                if(value.trim() === ''){
                    validationCodigoCristal1_oi('')
                }
                if(OT && OT[OTGrillaEnum.cr1_oi] === value && value.length >= 11){
                    validationCodigoCristal1_oi(value, alreadyValidate)
                    focusFirstInput('a2_armazon', inputsRef["a2_armazon"])
                }else{
                    if(value.length <= 11)return;
                    validationCodigoCristal1_oi('')
                    // toast.error('Anteojo 1, Código cristal OI no son iguales')
                    setFormValues({[name]: ''} as any)
                }
            }
    
            if(name === 'a1_armazon'){
                if(value.trim() === ''){
                    validationCodigoArmazon_1('')
                }
                console.log(value)
                if((OT && OT[OTGrillaEnum.a1_armazon_id] === value) && value.length >= 11){  
                    validationCodigoArmazon_1(value, alreadyValidate)
                    validationA1_armazon.value = value
                    focusFirstInput('a1_od', inputsRef["a1_od"])
                }else{
                    if(value.lenght <= 11 ){
                        console.log(value)
                        return;
                    }else{
                        validationA1_armazon.value = ''
                        errorSound.play()
                        validationCodigoArmazon_1('')
                        toast.error('Código Armazon 1 no corresponde.')
                        resetField('a1_armazon')
                        setFormValues({[name]:''} as any)
                    }
                }
            }
            

            if(name === 'a2_od'){
                if(value.trim() === ''){
                    validationCodigoCristal2_od('')
                }
                if((OT && OT[OTGrillaEnum.cr2_od] === value) && value.length >= 11){
                    validationCodigoCristal2_od(value,alreadyValidate)
                    focusFirstInput('a2_oi',inputsRef["a2_oi"] )
                }else{
                    if(value.length <= 11) return;
                    validationCodigoCristal2_od('')
                    // toast.error('Anteojo 2, Código cristal OD no son iguales')
                    setFormValues({[name]: ''} as any)
                }  
            }

            if(name === 'a2_oi'){
                if(value.trim() === ''){
                    validationCodigoCristal2_oi('')
                }
                if((OT && OT[OTGrillaEnum.cr2_oi] === value) && value.length >= 11){
                    validationCodigoCristal2_oi(value, alreadyValidate)
                    // focusFirstInput('a2_armazon', inputsRef["a2_armazon"])
                }else{
                    if(value.length <= 11)return;
                    validationCodigoCristal2_oi('')
                    // toast.error('Anteojo 2, Código cristal OI no son iguales')
                    setFormValues({[name]: ''} as any)
                }

            }

            if(name === 'a2_armazon'){
                if(value.trim() === ''){
                    validationCodigoArmazon_2('')
                }
                if(OT && OT[OTGrillaEnum.a2_armazon_id] === value && value.length >= 11){
                    validationCodigoArmazon_2(value, alreadyValidate)
                    // if(OT && OT[EnumGrid.tipo_anteojo_id] === '3'){
                        focusFirstInput('a2_od', inputsRef["a2_od"])
                    // }
                    
                }else{
                    if(value.lenght <= 11) return;
                    validationCodigoArmazon_2('')
                    // toast.error('Anteojo 2, Código armazon 2 no son iguales')
                    setFormValues({[name]:''} as any)
                }
            }


            setFormValues((prevFormValues: any) => ({
                ...prevFormValues,
                [name]: value
            }));
    }

    
    if(dataOTSignal.value === 0 as any){
        return(
            <>
        
            </>
        )
    }


    React.useEffect(()=>{
        if(OT){
            A1_CR_OD.value  = OT[OTGrillaEnum.cr1_od]
            A1_CR_OI.value  = OT[OTGrillaEnum.cr1_oi]
            A2_CR_OD.value  = OT[OTGrillaEnum.cr2_od]
            A2_CR_OI.value  = OT[OTGrillaEnum.cr2_oi]

            a1_armazon.value = OT[OTGrillaEnum.a1_armazon_id]
            a2_armazon.value = OT[OTGrillaEnum.a2_armazon_id]

            tipo_de_anteojo.value = OT[OTGrillaEnum.tipo_anteojo_id]
        
            codigoProyecto.value = OT[OTGrillaEnum.proyecto]

            if(OT[OTGrillaEnum.cr1_od] === ''){
                CR1_OD_LAB.value = true;
                validationCodigoCristal1_od('32', true)
            }
            
            if(OT[OTGrillaEnum.cr1_oi] === ''){
                CR1_OI_LAB.value = true;
                validationCodigoCristal1_oi('32', true)
            }

        }
        if(OT && OT[OTGrillaEnum.tipo_anteojo_id] !== 3){
            console.log('render')
            validationCodigoArmazon_2('32', true)
            validationCodigoCristal2_od('32', true)
            validationCodigoCristal2_oi('32', true)
            if(casoEjecutar === 'sinCristales'){
                validationCodigoCristal1_od('32', true)
                validationCodigoCristal1_oi('32', true)
            }
        }

        if(OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 && casoEjecutar === 'sinCristales'){
            validationCodigoCristal1_od('32', true)
            validationCodigoCristal1_oi('32', true)
            validationCodigoCristal2_od('32', true)
            validationCodigoCristal2_oi('32', true)
        }
        focusFirstInput('a1_armazon', inputsRef["a1_armazon"])
    },[OT])

    const sumatoriaNivel3 = validationNivel3.value.reduce((index,objecto) => index + objecto.valor, 0);  



    // const onSubmit = (e:any, type?:string) => {
    //     console.log('renderr')
    //     e.preventDefault();

    //     console.log(type)

    //     let jsondata:any   = [];
    //     let origen         = OTAreas["areaActual"]
    //     let formValues:any = []
    //     let data           = OT
    //     let cristalOri     = cristales
    //     let armazonOri     = armazones
    //     let user           = UsuarioID
        
    //     let destino;
    //     let estado:any


    //     let observaciones;
    //     let isMasivo; 
    //     let situacion;
    //     let validarBodega;
    //     let validacion_complete


    //     switch (type) {
    //         case 'Procesar':
    //             destino       = OTAreas["areaSiguiente"]
    //             estado        = 20
            
                
    //             observaciones = ''
    //             isMasivo      = false
    //             situacion          = '0'
    //             validacion_complete = true;
            
    //             break;
    //         case 'cristales-externos':
    //             break;
    //         case 'cristales-internos':
    //             break;
    //         default:
    //             break;
    //     }

    //     updateOT(
    //         jsondata,
    //         origen,
    //         destino,
    //         estado,
    //         formValues,
    //         data,
    //         cristalOri,
    //         armazonOri,
    //         user,
    //         observaciones,
    //         isMasivo,
    //         situacion,
    //         validarBodega,
    //         "",
    //         validacion_complete
    //     )

    //     const toastLoading = toast.loading('Cargando...');
    //     console.log(OT)
    //     console.log(OT[OTGrillaEnum.estado_impresion] === '0')
    //     if(OT[OTGrillaEnum.estado_impresion] === '0'){
    //         toast.dismiss(toastLoading)
    //         return toast.error(`OT ${pkToDelete.filter((ot:any)=> ot.estado_impresion === '0').map((ot:any)=>ot.folio)} no ha sido impresa.`) 
    //     }

    //     let estaado_standBy = 25;
    //     console.log(UsuarioID)
    //     updateOT(
    //         [],
    //         OTAreas["areaActual"],
    //         OTAreas["areaSiguiente"],
    //         estaado_standBy,
    //         [],
    //         OT,
    //         cristales,
    //         armazones,
    //         UsuarioID,
    //         "",
    //         true,
    //         '',
    //         true
    //     ).then(()=>{
    //         handleClose()
    //         toast.dismiss(toastLoading)
    //         toast.success('OT Procesada Correctamente.')
    //         dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
    //         valueConfirmOT.value = ""

    //     }).catch((e)=>{
    //         console.log(e)
    //         console.log('error')
    //         toast.dismiss(toastLoading);
    //     })
 
 
 
 
 
    // }
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            resetFields()
            handleClose();
          }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClose]);

    React.useEffect(()=>{
        
        if(dataOTSignal.value.length === 0){
            const data:any = [0, 49617, 'c-10', 'Venta', 20, 'En proceso', '1', 35, '1801-2023', 'PROGRAMA JUNAEB BIO-BIO','COLEGIO MARINA DE CHILE', '22782064-0', 'CRISTIAN EDUARDO RODRÍGUEZ PINTO','2024-06-21', 1, 'Lejos', '4020000040208', '4020000040024', ' ', '100010011240','100010009970', ' ', ' ', '2', '0', 0, 9288, 'S', '1801-6-SE24', 0, 0, 1, 0, 98, 0]
            setOT(data)
        }else{
            setOT(dataOTSignal.value[0])
        }

    },[dataOTSignal.value])


    React.useEffect(()=>{
        console.log(validationNivel3.value)
        if(sumatoriaNivel3 === validationNivel3.value.length){
            //VALIDA QUE HAYA DATA EN TODOS LOS CAMPOS SINO RETORNA
            if(Object.values(formValues as any).some((value)=> value === '')){
                return;
            }

            let jsondata:any   = [];
            let origen         = OTAreas["areaActual"]
            let data           = OT
            let cristalOri     = cristales
            let armazonOri     = armazones
            let user           = UsuarioID
            let validarBodega  = true
            let isMasivo       = true;
            
            let destino;
            let estado:any
    
    
            let observaciones;
            let situacion;
            
            console.log(casoEjecutar)
            

            console.log('ejecutar procesar')
            console.log(resultValidarBodega.value)

            const toastLoading = toast.loading('Cargando...')
            
            switch (casoEjecutar) {
                case 'ProcesarTB':
                    destino = (
                        (CR1_OD_LAB.value === true) ||
                        (CR1_OI_LAB.value === true) ||
                        (CR2_OD_LAB.value === true) ||
                        (CR2_OI_LAB.value === true) 
                       )  ? '30' :  OTAreas["areaSiguiente"]
                    estado  = '15'
                    situacion = '0'

                    console.log('ejecutando procesar')
                    updateOT(
                        jsondata,
                        origen,
                        destino,
                        estado,
                        [],
                        data,
                        cristalOri,
                        armazonOri,
                        user,
                        observaciones,
                        isMasivo,
                        situacion,
                        validarBodega
                    ).then(()=>{
                        handleClose()
                        toast.dismiss(toastLoading)
                        toast.success('OT Procesada Correctamente.')
                        dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
                        valueConfirmOT.value = ""
                        resetFields()
                    }).catch((e)=>{
                        console.log(e)
                        resetFields()
                        console.log('error')
                        toast.dismiss(toastLoading);
                    })
             
                    break;
                case 'conCristales':
                    console.log('ejecutando con cristales')
                    destino = OTAreas["areas"].map((area:any)=>area).filter((areaAuxiliar:any)=>areaAuxiliar[1] === 60)[0][7]
                    estado  = '15'
                    situacion = '4'
                    observaciones = 'Montaje externo con cristales.'

                    console.log('ejecutando procesar')
                    updateOT(
                        jsondata,
                        origen,
                        destino,
                        estado,
                        [],
                        data,
                        cristalOri,
                        armazonOri,
                        user,
                        observaciones,
                        isMasivo,
                        situacion,
                        validarBodega
                    ).then(()=>{
                        handleClose()
                        toast.dismiss(toastLoading)
                        toast.success('OT Procesada Correctamente.')
                        dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
                        valueConfirmOT.value = ""
                        resetFields()
                    }).catch((e)=>{
                        console.log(e)
                        console.log('error')
                        resetFields()
                        toast.dismiss(toastLoading);
                    })
             
                    break;
                case 'sinCristales':
                    console.log('ejecutando con cristales')
                    destino = OTAreas["areas"].map((area:any)=>area).filter((areaAuxiliar:any)=>areaAuxiliar[1] === 60)[0][7]
                    estado  = '15' 
                    situacion = '5'
                    observaciones = 'Montaje externo sin cristales.'

                    console.log('ejecutando procesar')
                    updateOT(
                        jsondata,
                        origen,
                        destino,
                        estado,
                        [],
                        data,
                        cristalOri,
                        armazonOri,
                        user,
                        observaciones,
                        isMasivo,
                        situacion,
                        validarBodega
                    ).then(()=>{
                        handleClose()
                        toast.dismiss(toastLoading)
                        toast.success('OT Procesada Correctamente.')
                        dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
                        valueConfirmOT.value = ""
                        resetFields()
                    }).catch((e)=>{
                        console.log(e)
                        console.log('error')
                        resetFields()
                        toast.dismiss(toastLoading);
                    })
                    break;
                default:
                    break;
            }



        }
    },[sumatoriaNivel3])

    React.useEffect(()=>{
        reiniciarValidationNivel3()
    },[])


    const handleCR1_OD_LABChange = useCallback((event:any) => {
        const {checked} = event;
        console.log(checked)

        if(checked === true){
            A1_CR_OD.value = '';
            validationCodigoCristal1_od('32', true)
            console.log('render')
        }

        CR1_OD_LAB.value = checked;
    },[CR1_OD_LAB.value])

    const handleCR1_OI_LABChange = useCallback((event:any) => {
        const {checked} = event;
        console.log(checked)

        if(checked === true){
            A1_CR_OI.value = '';
            validationCodigoCristal1_oi('32', true)
            console.log('render')
        }

        CR1_OI_LAB.value = checked;
    },[CR1_OI_LAB.value])

    console.log(OT)

    return (
        <div className={` bg-[#676f9d] mx-auto xl:w-[90%] xl:left-[35rem]  absolute  ${OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3  ? "top-[6vw] !left-[30vw]" : "top-[6vw] !left-[30vw]" } right-auto rounded-xl shadow-md overflow-hidden lg:left-[18rem]     sm:w-[25rem]    md:max-w-[35rem] z-40`}>
         <div className="absolute right-0 userFormBtnCloseContainer">
          <h1 className='text-center text-4xl text-white  mb-5 translate-x-[-10vw]'>Folio: <span className='text-orange-300'>{ OT && OT[OTGrillaEnum.folio]}</span></h1>
          <button onClick={handleClose} className="userFormBtnClose mr-4">
            X
          </button>
        </div>
        <h1 className='h-8'></h1>
          <form 
            className="p-8 space-y-6"
            // onSubmit={handleSubmit((data:any)=>onSubmit(data))}
            // onSubmit={handleSubmit((data) => onSubmit(data))}
            // onSubmit={handleSubmit(onSubmit)}
          >
        {OT && (
                <div className="">
                <h1 className='text-center text-white text-2xl'>Anteojo 1</h1>
                {/* <div className='rowForm !h-[5rem] relative mb-4'>
                    <TextInputInteractive
                    type='text'
                    label='Armazon 1'
                        name='a1_armazon'
                        handleChange={handleInputChange}
                        isOT={true}
                        data={formValues && formValues["a1_armazon"]}
                        control={control}
                        textAlign='text-left'
                        customWidth={"labelInput inputStyles w-[28vw]"}
                        error={errors.a1_armazon}
                        inputRef={inputsRef.a1_armazon}
                        validarBodega={true}
                    />
                </div> */}

                    {/* <label className='labelInput  ml-4'>{OT[OTGrillaEnum.a1_armazon_id]}</label>       */}
                {resnderInputArmazon('a1_armazon')}
               
                {casoEjecutar !== 'sinCristales' && (OT[OTGrillaEnum.cr1_od] !== '') &&  (
                    <div className='rowForm  !h-[5rem] relative mb-4'>
                        <label className='labelInput ml-4 '>{OT[OTGrillaEnum.cr1_od]}</label>
                        <TextInputInteractive
                            type='text'
                            label='OD'
                            name='a1_od'
                            handleChange={handleInputChange}
                            handleFocus={handleInputChange}
                            control={control}
                            isOT={true}
                            // defaultValue={}
                            data={formValues && formValues["a1_od"]}
                            textAlign='text-left'
                            customWidth={"labelInput inputStyles  w-[27.9vw]"}
                            error={errors.a1_od}
                            inputRef={inputsRef.a1_od}
                            // validarBodega={true}
                            onlyRead={CR1_OD_LAB.value}
                        />

                        {casoEjecutar === 'ProcesarTB' && (
                            <div className="absolute top-10 -right-4 items-center flex inputStyles">
                                <Checkbox  label="LAB" color="orange" onChange={(e)=>handleCR1_OD_LABChange(e.target)} checked={ CR1_OD_LAB.value} />                                           
                            </div>
                        )}
                    </div>
                )}

                {casoEjecutar !== 'sinCristales' && (OT[OTGrillaEnum.cr1_oi] !== '') &&(
                    <div className=' relative rowForm  !h-[5rem]'>
                        <label className='labelInput ml-4 '>{OT[OTGrillaEnum.cr1_oi]}</label>    
                        <TextInputInteractive
                            type='text'
                            label='OI'
                            name='a1_oi'
                            handleChange={handleInputChange}
                            control={control}
                            isOT={true}
                            data={formValues && formValues["a1_oi"]}
                            textAlign='text-left'
                            customWidth={"labelInput inputStyles  w-[28vw]"}
                            error={errors.a1_oi}
                            inputRef={inputsRef.a1_oi}
                            validarBodega={true}
                            onlyRead={CR1_OI_LAB.value}
                        />

                        {casoEjecutar === 'ProcesarTB' && (
                          <div className="absolute top-10 -right-4 items-center flex inputStyles">
                            <Checkbox  label="LAB" color="orange" onChange={(e)=>handleCR1_OI_LABChange(e.target)} checked={ CR1_OI_LAB.value} />                                           
                        </div>
                        )}
                    </div>
                )}
            </div>
        )}


            {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 && (
                <div className="">
                <h1 className='text-center text-white'>Anteojo 2</h1>
                {/* <div className='rowForm !h-[5rem] '>
                <label className='labelInput  !translate-y-[3rem] ml-4'>{OT[OTGrillaEnum.a2_armazon_id]}</label>    
                <TextInputInteractive
                    type='text'
                    label='Armazon 2'
                    name='a2_armazon'
                    handleChange={handleInputChange}
                    isOT={true}
                    data={formValues && formValues["a2_armazon"]}
                    control={control}
                    textAlign='text-left'
                    error={errors.a2_armazon}
                    inputRef={inputsRef.a2_armazon}
                    customWidth={"labelInput inputStyles"}
                    validarBodega={true}
                    onlyRead={OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? false : true}
                    />
                </div> */}

                {resnderInputArmazon('a2_armazon')}
                
                {casoEjecutar !== 'sinCristales' && (
                    <div className='rowForm !h-[5rem] '>
                    <label className='labelInput ml-4'>{OT[OTGrillaEnum.cr2_od]}</label>    
                    <TextInputInteractive
                        type='text'
                        label='OD'
                        name='a2_od'
                        handleChange={handleInputChange}
                        isOT={true}
                        data={formValues && formValues["a2_od"]}
                        control={control}
                        textAlign='text-left'
                        error={errors.a2_od}
                        inputRef={inputsRef.a2_od}
                        customWidth={"labelInput inputStyles"}
                        validarBodega={true}
                        onlyRead={OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? false : true}
                    />
                    
                    </div>
                )}
                {casoEjecutar !== 'sinCristales' && (
                    <div className='rowForm !h-[5rem]  '>
                    <label className='labelInput ml-4'>{OT[OTGrillaEnum.cr2_oi]}</label>    
                    <TextInputInteractive
                        type='text'
                        label='OI'
                        name='a2_oi'
                        handleChange={handleInputChange}
                        isOT={true}
                        data={formValues && formValues["a2_oi"]}
                        control={control}
                        textAlign='text-left'
                        customWidth={"labelInput inputStyles"}
                        error={errors.a2_oi}
                        inputRef={inputsRef.a2_oi}
                        validarBodega={true}
                        onlyRead={OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? false : true}
                    />
                    </div>
                )}
                
              
            </div>
            )}
            
            
{/* 
                {sumatoriaNivel3 === validationNivel3.value.length && (
                    <Button className='translate-x-8' color='green' type='submit'  onClick={(e) =>onSubmit(e, 'Procesar')}>Procesar</Button>
                )} */}
              

            <div>
            </div>
            <div>
            </div>
          </form>
        </div>
      );
}

export default FOTValidarBodega