import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { A1_CR_OD, A1_CR_OI, A2_CR_OD, A2_CR_OI, a1_armazon, a2_armazon, codigoProyecto, reiniciarValidationNivel3, tipo_de_anteojo, updateOT, validationBodegaSchema, validationNivel3 } from '../../utils';
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
import { dataOTSignal, resultValidarBodega, valueConfirmOT } from '../../components/OTPrimaryButtons';
import TextInputInteractive from '../../components/forms/TextInputInteractive';

export const focusFirstInput = (strInputName: string, ref: React.RefObject<any>) => {
    if (ref.current) {
      const firstInput = ref.current.querySelector(`input[name=${strInputName}]`);
      if (firstInput) {
        (firstInput as HTMLInputElement).focus();
      }
    }
  };


const validationA1_armazon = signal('');
const validationA2_armazon = signal('');
const validation_cristal1_od = signal('');
const validation_cristal1_oi = signal('');
const validation_cristal2_od = signal('');
const validation_cristal2_oi = signal('');

const optionBodega = signal<any>({
    aproximar:{
        cr1_od: false,
        cr1_oi: false
    },
    adquisiciones:{
        cr1_od: false,
        cr1_oi: false
    },
    laboratorio:{
        cr1_od: false,
        cr1_oi: false
    }
})


interface IFOTValidarBodega{
    handleClose?:any,
    pkToDelete?:any
}

const FOTValidateCristales:React.FC<IFOTValidarBodega> = ({
    handleClose,
}) => {

    // console.log(optionBodega.value.aproximar)

    const [optionBodega, setOptionBodega] = useState<any>({
        aproximar:{
            cr1_od: false,
            cr1_oi: false
        },
        adquisiciones:{
            cr1_od: false,
            cr1_oi: false
        },
        laboratorio:{
            cr1_od: false,
            cr1_oi: false
        }
    })

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
        validation_cristal1_od.value = ''
        validation_cristal1_oi.value = ''
        validation_cristal2_od.value = '';
        validation_cristal2_oi.value = '';
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
                inputRefArmazon: inputsRef.a1_armazon
            }
        },
        "a2_armazon": () =>{
            return{
                label: 'Armazon 2',
                labelArmazon: OT[OTGrillaEnum.a2_armazon_id],
                name:'a2_armazon',
                data: validationA2_armazon.value,
                inputsRefArmazon:inputsRef.a2_armazon
            }
        }
    }

    const inputCristalProps:any = {
        "a1_od": () => {
            return{
                label:'OD',
                labelCristal: OT[OTGrillaEnum.cr1_od],
                name: 'a1_od',
                data: validation_cristal1_od.value,
                inputsRefCristal: inputsRef.a1_od,
                onChangeCheckLab:(e:any)=>handleCR1_OD_LABChange(e.target),
                checkedVariable: CR1_OD_LAB.value,
                // aproximar_nombre: "cr1_od_aproximar",
                // aproximar_value: optionBodega.value.aproximar.cr1_od,
                // aproximar_checked: optionBodega.value.aproximar.cr1_od,
            }
        },
        "a1_oi": () =>{
            return{
                label: 'OI',
                labelCristal: OT[OTGrillaEnum.cr1_oi],
                name: 'a1_oi',
                data: validation_cristal1_oi.value,
                inputsRefCristal: inputsRef.a1_oi,
                onChangeCheckLab:(e:any)=>handleCR1_OI_LABChange(e.target),
                checkedVariable: CR1_OI_LAB.value,
                // aproximar_nombre: "cr1_oi_aproximar",
                // aproximar_value: optionBodega.value.aproximar.cr1_oi,
                // aproximar_checked: optionBodega.value.aproximar.cr1_oi,



            }
        },
        "a2_od": () => {
            return{
                label:'OD',
                labelCristal: OT[OTGrillaEnum.cr2_od],
                name: 'a2_od',
                data: validation_cristal2_od.value,
                inputsRefCristal: inputsRef.a2_od,
                onChangeCheckLab:(e:any)=>handleCR2_OD_LABChange(e.target),
                checkedVariable: CR2_OD_LAB.value
            }
        },
        "a2_oi": () => {
            return{
                label:'OI',
                labelCristal: OT[OTGrillaEnum.cr2_oi],
                name: 'a2_oi',
                data: validation_cristal2_oi.value,
                inputsRefCristal: inputsRef.a2_oi,
                onChangeCheckLab:(e:any)=>handleCR2_OI_LABChange(e.target),
                checkedVariable: CR2_OI_LAB.value
            }
        },
    }

    const renderInputCristal = (cristal:string) =>{
        const {label, name, data, labelCristal, onChangeCheckLab, checkedVariable,inputsRefCristal} = inputCristalProps[cristal]()

        return(
            <div className='rowForm !h-[5rem] relative mb-4'>
                <label className='labelInput  ml-4'>{labelCristal}</label>      
                <TextInputInteractive
                    type='text'
                    label={label}
                    name={name}
                    handleChange={handleInputChange}
                    isOT={true}
                    data={data}
                    control={control}
                    textAlign='text-left'
                    customWidth={"labelInput inputStyles w-[26vw]"}
                    inputRef={inputsRefCristal}
                    validarBodega={true}
                    onlyRead={checkedVariable}
                />

                {/* {casoEjecutar === 'ProcesarTB' && (
                    <div className="absolute top-10 right-[2vw] items-center flex inputStyles">
                        <Checkbox  label="LAB" color="orange" onChange={(e)=>onChangeCheckLab(e)} checked={checkedVariable} />                                           
                    </div>
                )} */}


                
        </div>
        )


    }

    const resnderInputArmazon = (armazon:string) =>{
        const {label, name, data, labelArmazon,inputsRefArmazon} = inputArmazonProps[armazon]()
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
                    customWidth={"labelInput inputStyles w-[26vw]"}
                    inputRef={inputsRefArmazon}
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
        
        if(value && value.length >= 12){
            const regex = /^0+/;
            formatValue = value.replace(regex, "")

        }
        
            if(name === 'a1_od'){
                if(formatValue === ''){
                    validationCodigoCristal1_od('')
                }
                
                if((OT && OT[OTGrillaEnum.cr1_od] === formatValue) && value.length >= 11){
                    console.log('render')
                    validation_cristal1_od.value = value
                    validationCodigoCristal1_od(formatValue,alreadyValidate)
                    focusFirstInput('a1_oi',inputsRef["a1_oi"] )
                }else{
                    if(value.length <= 11){
                        return;
                    }else{
                        console.log('render')
                        validation_cristal1_od.value = '';
                        errorSound.play()
                        validationCodigoCristal1_od('')
                        toast.error('Código Cristal OD no corresponde.',{
                            autoClose: 500
                        })
                        resetField('a1_od')
                        setFormValues({[name]:''} as any)
                        
                    } 

                }
            }
    
            if(name === 'a1_oi'){
                if(value.trim() === ''){
                    validationCodigoCristal1_oi('')
                }
                if((OT && OT[OTGrillaEnum.cr1_oi] === formatValue) && value.length >= 11){
                    validationCodigoCristal1_oi(value, alreadyValidate)
                    validation_cristal1_oi.value = value
                    focusFirstInput('a2_armazon', inputsRef["a2_armazon"])
                }else{
                    if(value.length <= 11){
                        return;
                    }else{
                        validation_cristal1_oi.value = ''
                        errorSound.play();
                        validationCodigoCristal1_oi('')
                        toast.error('Código Cristal OI no correspsonde.',{
                            autoClose: 500
                        })
                        resetField('a1_oi')
                        setFormValues({[name]: ''} as any)
                    }
                    // toast.error('Anteojo 1, Código cristal OI no son iguales')
                }
            }
    
            if(name === 'a1_armazon'){
                if(value.trim() === ''){
                    validationCodigoArmazon_1('')
                }
                if((OT && OT[OTGrillaEnum.a1_armazon_id] === formatValue) && value.length >= 11){  
                    validationCodigoArmazon_1(value, alreadyValidate)
                    validationA1_armazon.value = value
                    if(CR1_OD_LAB.value === true){
                        if(CR1_OI_LAB.value === true){
                            focusFirstInput('a2_armazon', inputsRef["a2_armazon"])
                        }else{
                            focusFirstInput('a1_oi', inputsRef["a1_oi"])
                        }
                    }else{
                        focusFirstInput('a1_od', inputsRef["a1_od"])
                    }
                }else{
                    if(value.lenght <= 11 ){
                        console.log(value)
                        return;
                    }else{
                        validationA1_armazon.value = ''
                        errorSound.play()
                        validationCodigoArmazon_1('')
                        toast.error('Código Armazon 1 no corresponde.',{
                            autoClose: 500
                        })
                        resetField('a1_armazon')
                        setFormValues({[name]:''} as any)
                    }
                }
            }
            

            if(name === 'a2_od'){
                if(value.trim() === ''){
                    validationCodigoCristal2_od('')
                }
                console.log(OT && OT[OTGrillaEnum.cr2_od])
                if((OT && OT[OTGrillaEnum.cr2_od] === formatValue) && value.length >= 11){
                    validation_cristal2_od.value = value
                    validationCodigoCristal2_od(value,alreadyValidate)
                    focusFirstInput('a2_oi',inputsRef["a2_oi"] )
                }else{
                    if(value.length <= 11){
                        return;
                    }else{
                        validation_cristal2_od.value = '';
                        errorSound.play();
                        validationCodigoCristal2_od('')
                        toast.error('Codigo Cristal 2 OD no corresponde.',{
                            autoClose: 500
                        })
                        resetField('a2_od')
                        setFormValues({[name]: ''} as any)
                    }
                }  
            }

            if(name === 'a2_oi'){
                if(value.trim() === ''){
                    validationCodigoCristal2_oi('')
                }
                if((OT && OT[OTGrillaEnum.cr2_oi] === formatValue) && value.length >= 11){
                    validation_cristal2_oi.value = value
                    validationCodigoCristal2_oi(value, alreadyValidate)
                    // focusFirstInput('a2_armazon', inputsRef["a2_armazon"])
                }else{
                    if(value.length <= 11){
                        return;
                    }else{
                        validation_cristal2_oi.value = '';
                        errorSound.play()
                        validationCodigoCristal2_oi('')
                        toast.error('Código de Cristal 2 OI no corresponde.',{
                            autoClose: 500
                        })
                        resetField('a2_oi')
                        setFormValues({[name]: ''} as any)
                    }
                    // toast.error('Anteojo 2, Código cristal OI no son iguales')
                }

            }

            if(name === 'a2_armazon'){
                if(value.trim() === ''){
                    validationCodigoArmazon_2('')
                }
                if((OT && OT[OTGrillaEnum.a2_armazon_id] === formatValue) && value.length >= 11){
                    validationCodigoArmazon_2(value, alreadyValidate)
                    validationA2_armazon.value = value
                    if(CR2_OD_LAB.value === true){
                        if(CR2_OI_LAB.value === true){
                            return;
                        }else{
                            focusFirstInput('a2_oi', inputsRef["a2_oi"])
                        }
                    }else{
                        focusFirstInput('a2_od', inputsRef["a2_od"])
                    }

                    
                }else{
                    if(value.lenght <= 11){
                        return;
                    }else{
                        validationA2_armazon.value = ''
                        errorSound.play()
                        validationCodigoArmazon_2('')
                        toast.error('Código Armazon 2 no corresponde.',{
                            autoClose: 500
                        })
                        resetField('a2_armazon')
                        setFormValues({[name]:''} as any)
                    }
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
        if(sumatoriaNivel3 === validationNivel3.value.length){
            //VALIDA QUE HAYA DATA EN TODOS LOS CAMPOS SINO RETORNA
            if(Object.values(formValues as any).some((value)=> value === '')){
                return;
            }

            let jsondata:any   = [];
            let origen         = OTAreas["areaActual"]
            let cristalOri     = cristales
            let armazonOri     = armazones
            let user           = UsuarioID
            let validarBodega  = false
            let isMasivo       = true;
            let cristalStock   = '1'
            
            let destino;
            let estado:any
            
            
            let observaciones;
            let situacion;
            let data           = {
                folio: OT[OTGrillaEnum.folio],
                tipo_anteojo : parseInt(OT[OTGrillaEnum.tipo_anteojo_id]),
                proyecto_codigo : OT[OTGrillaEnum.proyecto_titulo],
                punto_venta     : OT[OTGrillaEnum.punto_venta],
                cristales       : [
                    { 
                      codigo: OT[OTGrillaEnum.cr1_od], 
                      opcion_vta: cristalStock
                    }, 
                    { 
                      codigo: OT[OTGrillaEnum.cr1_oi], 
                      opcion_vta: cristalStock
                    }, 
                    { 
                      codigo: OT[OTGrillaEnum.cr2_od],
                      opcion_vta: cristalStock
                    }, 
                    { 
                      codigo: OT[OTGrillaEnum.cr2_oi],
                      opcion_vta: cristalStock 
                    }],
                armazones: [{ codigo: OT[OTGrillaEnum.a1_armazon_id] }, { codigo: OT[OTGrillaEnum.a2_armazon_id] }],

            }
            


            // const dataP1 = `cristales1_od_opcion_vta="${CR1_OD_LAB.value === true ? 2 : 1}",cristales1_oi_opcion_vta="${CR1_OI_LAB.value === true ? 2 : 1}",cristales2_od_opcion_vta="${CR2_OD_LAB.value === true ? 2 : 1}",cristales2_oi_opcion_vta="${CR2_OI_LAB.value === true ? 2 : 1}",cristales1_od="${CR1_OD_LAB.value === true ? '' : OT[OTGrillaEnum.cr1_od].trim()}",cristales1_oi="${CR1_OI_LAB.value === true ? '' : OT[OTGrillaEnum.cr1_oi].trim()}",cristales2_od="${CR2_OD_LAB.value === true ? '' : OT[OTGrillaEnum.cr2_od].trim()}", cristales2_oi="${CR2_OI_LAB.value === true ? '' : OT[OTGrillaEnum.cr2_oi].trim()}" ${CR2_OI_LAB.value === true ? ', a1_grupo_od=""' : ''}`                    
            // const dataP1 = `"${CR1_OD_LAB.value === true ? ',cristales1_od_opcion_vta="2"' : ""}" "${CR1_OI_LAB.value === true ? ',cristales1_oi_opcion_vta="2"' : ""}" "${CR2_OD_LAB.value === true ? ',cristales2_od_opcion_vta="2"': ""} "${CR2_OI_LAB.value === true ? ',cristales2_oi_opcion_vta="2"' : ""}" "${CR1_OD_LAB.value === true ? ',cristales1_od=""' : ""}" "${CR1_OI_LAB.value === true ? ',cristales1_oi=""' : ""}" "${CR2_OD_LAB.value === true ? ',cristales2_od=""' : ""}" ${CR2_OI_LAB.value === true ? ',cristales2_oi=""' : ""}" ${CR2_OI_LAB.value === true ? ',a1_grupo_od=""' : ''}`                    
            const dataP1 = `${CR1_OD_LAB.value === true ? 'cristales1_od_opcion_vta="2", a1_grupo_od="",cristales1_od="",' : 'cristales1_od_opcion_vta = "1",' } ${CR1_OI_LAB.value === true ? 'cristales1_oi_opcion_vta="2",a1_grupo_oi="",cristales1_oi="",' : 'cristales1_oi_opcion_vta = "1",'} ${CR2_OD_LAB.value === true ? 'cristales2_od_opcion_vta="2",a2_grupo_od="",cristales2_od="",' : 'cristales2_od_opcion_vta = "1",'} ${CR2_OI_LAB.value === true ? 'cristales2_oi_opcion_vta="2", a2_grupo_oi="",cristales2_oi=""' : 'cristales2_oi_opcion_vta = "1"'} `                    

           console.log(dataP1)
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
                        validarBodega,
                        '',
                        false,
                        dataP1
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
                    destino = OTAreas["areas"].map((area:any)=>area).filter((areaAuxiliar:any)=>areaAuxiliar[1] === 60)[0][7]
                    estado  = '15'
                    situacion = '4'
                    observaciones = 'Montaje externo con cristales.'

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
                        validarBodega,
                        '',
                        false,
                        dataP1
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
                    destino = OTAreas["areas"].map((area:any)=>area).filter((areaAuxiliar:any)=>areaAuxiliar[1] === 60)[0][7]
                    estado  = '15' 
                    situacion = '5'
                    observaciones = 'Montaje externo sin cristales.'

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
                        validarBodega,
                        '',
                        false,
                        dataP1
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

        if(checked === true){
            A1_CR_OD.value = '';
            validation_cristal1_od.value = ''
            validationCodigoCristal1_od('32', true)
        }else{
            validationCodigoCristal1_od('')
        }

        CR1_OD_LAB.value = checked;
    },[CR1_OD_LAB.value])

    const handleCR1_OI_LABChange = useCallback((event:any) => {
        const {checked} = event;
        if(checked === true){
            A1_CR_OI.value = '';
            validation_cristal1_oi.value = ''
            validationCodigoCristal1_oi('32', true)
        }else{
            validationCodigoCristal1_oi('')
        }

        CR1_OI_LAB.value = checked;
    },[CR1_OI_LAB.value])


    const handleCR2_OD_LABChange = useCallback((event:any) => {
        const {checked} = event;
        if(checked === true){
            A2_CR_OD.value = '';
            validation_cristal2_od.value = ''
            validationCodigoCristal2_od('32', true)
        }else{
            validationCodigoCristal2_od('')
        }

        CR2_OD_LAB.value = checked;
    },[CR2_OD_LAB.value])


    const handleCR2_OI_LABChange = useCallback((event:any) => {
        const {checked} = event;
        console.log(checked)

        if(checked === true){
            A2_CR_OI.value = '';
            validation_cristal2_oi.value = ''
            validationCodigoCristal2_oi('32', true)
        }else{
            validationCodigoCristal2_oi('')
        }

        CR2_OI_LAB.value = checked;
    },[CR2_OI_LAB.value])


    console.log(optionBodega)

    return (
        <div className={` bg-[#676f9d] w-[35vw] mx-auto  xl:left-[35rem]  absolute  ${OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3  ? "top-[-1vw] !left-[30vw]" : "top-[6vw] !left-[30vw]" } right-auto rounded-xl shadow-md overflow-hidden lg:left-[18rem]  z-40`}>
         <div className="absolute right-0 userFormBtnCloseContainer">
          <h1 className='text-center text-4xl text-white  mb-5 translate-x-[-10vw]'>Folio: <span className='text-orange-300'>{ OT && OT[OTGrillaEnum.folio]}</span></h1>
          <button onClick={()=>{
                        resetFields()
                        handleClose()
          }} className="userFormBtnClose mr-4">
            X
          </button>
        </div>
        <h1 className='h-8'></h1>
          <form 
            className="p-8 space-y-6"
          >
        {OT && (
                <div className="!w-[34vw]">
                <h1 className='text-center text-white text-2xl'>Anteojo {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? 'Lejos': (OT && OT[OTGrillaEnum.tipo_anteojo])}</h1>
                {/* {resnderInputArmazon('a1_armazon')} */}
               
                {casoEjecutar !== 'sinCristales' && (OT[OTGrillaEnum.cr1_od] !== '') &&  (
                    renderInputCristal('a1_od')
                )}
                <div className="bg-red-300 w-[20vw] h-[3vw] !z-30 ml-2 translate-x-[10vw]">
                <div className='mx-6 my-2  translate-y-[0.2rem] flex'>
                <div className='flex'>
                    <input 
                        type="radio" 
                        id="aproximar_cr1_od" 
                        name="aproximar_cr1_od" 
                        className=" mx-2 h-[1.5rem] w-[1.5rem]" 
                        value={optionBodega.aproximar.cr1_od}
                        checked={optionBodega.aproximar.cr1_od}
                        onChange={(e)=>{
                            console.log('render')
                            console.log(e.target.checked)
                            setOptionBodega({...optionBodega, aproximar:{
                                cr1_od: true,
                                cr1_oi: false
                            }})

                            console.log('render')
                        }} 
                    />
                   <label htmlFor="aproximar_cr1_od" className=''>Aprox.</label>
                </div>

          <div className="flex">
            <input 
                type="radio" 
                id="adquisiciones_cr1_od" 
                name="adquisiciones_cr1_od" 
                className='mx-2 h-[1.5rem] w-[1.5rem] '
                value={optionBodega.adquisiciones.cr1_od}
                checked={optionBodega.adquisiciones.cr1_od}
                onChange={(e)=>{
                    console.log('checked')
                    setOptionBodega({...optionBodega, adquisiciones:{
                        cr1_od: true,
                        cr1_oi: false
                    }})
                //   resultValidarBodega.value = {ProcesarTB:false, conCristales: e.target.checked, sinCristales:false}
                }}
            />
            <label htmlFor="con_cristales">Adq.</label>
          </div>

          <div className="flex">
            <input 
              type="radio" 
              id="sin_cristales" 
              name="radioGroup" 
              className='mx-2 h-[1.5rem] w-[1.5rem]' 
              value="sin_cristales"
            //   checked={resultValidarBodega.value.sinCristales}
              onChange={(e)=>{
                console.log('checked')
                // resultValidarBodega.value = {
                //   ProcesarTB:false,
                //   conCristales:false,
                //   sinCristales:e.target.checked
                // }
              }}
            />
            <label htmlFor="sin_cristales">Lab</label>
          </div>
          </div>
                </div>

                {casoEjecutar !== 'sinCristales' && (OT[OTGrillaEnum.cr1_oi] !== '') &&(
                    renderInputCristal('a1_oi')
                )}
            </div>
        )}


            {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 && (
                <div className="!w-[34vw]">
                <h1 className='text-center text-2xl text-white '>Anteojo Cerca</h1>
                {/* {resnderInputArmazon('a2_armazon')} */}

                {casoEjecutar !== 'sinCristales' && (OT[OTGrillaEnum.cr2_od] !== '') && (
                    renderInputCristal('a2_od')
                )}

                {casoEjecutar !== 'sinCristales' && (OT[OTGrillaEnum.cr2_oi] !== '') && (
                    renderInputCristal('a2_oi')
                )}
                
              
            </div>
            )}
            <div>
            </div>
            <div>
            </div>
          </form>
        </div>
      );
}

export default FOTValidateCristales