import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
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

export const focusFirstInput = (strInputName: string, ref: React.RefObject<any>) => {
    if (ref.current) {
      const firstInput = ref.current.querySelector(`input[name=${strInputName}]`);
      if (firstInput) {
        (firstInput as HTMLInputElement).focus();
      }
    }
  };


const cr1_od_signal = signal("");


interface IFOTValidarBodega{
    handleClose?:any,
    pkToDelete?:any
}

const FOTValidarBodega:React.FC<IFOTValidarBodega> = ({
    handleClose,
    pkToDelete
}) => {
    const [formValues, setFormValues] = React.useState();
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const [OT, setOT] = React.useState(dataOTSignal.value)

    const schema          = validationBodegaSchema();

    const alreadyValidate = true;
    const dispatch        = useAppDispatch();

    // console.log(OT[EnumGrid.tipo_anteojo_id])
    
    const inputsRef = {
        a1_od:         React.useRef<any>(null),
        a1_oi:         React.useRef<any>(null),
        a1_armazon:    React.useRef<any>(null),
        a2_od:         React.useRef<any>(null),
        a2_oi:         React.useRef<any>(null),
        a2_armazon:    React.useRef<any>(null),
    }

    const casoEjecutar = Object.keys(resultValidarBodega.value).find((key:any)=>resultValidarBodega.value[key] === true)

    const armazones = ([{codigo: OT && OT[OTGrillaEnum.a1_armazon_id]}, {codigo: OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? (OT && OT[OTGrillaEnum.a2_armazon_id]) : ('')}] as any).filter((codigo:any)=>codigo.codigo !== '')

    const cristales = ([{codigo: OT && OT[OTGrillaEnum.cr1_od]}, {codigo:OT && OT[OTGrillaEnum.cr1_oi]}, {codigo: ( OT &&OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? (OT && OT[OTGrillaEnum.cr2_od]) : ('') )} , {codigo: OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? (OT && OT[OTGrillaEnum.cr2_oi]): ('')}]).filter((codigo:any)=>codigo.codigo !== '')

    const {
        control,
        formState: { errors },
        handleSubmit
        
      } = useForm({
        resolver: yupResolver(schema),
    });

    const handleInputChange = (e:any) => {
        let {name, value} = e;
        let formatValue:any;
        console.log(value)
        console.log(value.length)
        if(value === ''){
            return;
        }

        if(value.length >= 12){
            const regex = /^0+/;
            formatValue = value.replace(regex, "")

        }
        console.log(formatValue) 

        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            [name]: value
        }));
        
        
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
                    if(value.length <= 11) return;
                    console.log('render')
                    validationCodigoCristal1_od('')
                    inputsRef.a1_od.current = ''

                    // toast.error('Anteojo 1, Código cristal OD no son iguales')
                    setFormValues({[name]: ''} as any)
                    cr1_od_signal.value = ''
                    value = ''
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
                if((OT && OT[OTGrillaEnum.a1_armazon_id] === value) && value.length >= 11){
                    validationCodigoArmazon_1(value, alreadyValidate)
                    if(OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3){
                        console.log('render')
                        focusFirstInput('a1_od', inputsRef["a1_od"])
                    }
                    
                }else{
                    if(value.lenght <= 11) return;
                    validationCodigoArmazon_1('')
                    // toast.error('Anteojo1, Código armazon 1 no son iguales')
                    setFormValues({[name]:''} as any)
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
        focusFirstInput('a1_armazon', inputsRef["a1_armazon"])
    },[OT])

    const sumatoriaNivel3 = validationNivel3.value.reduce((index,objecto) => index + objecto.valor, 0);  



    const onSubmit = (e:any, type?:string) => {
        e.preventDefault();

        console.log(type)

        let jsondata:any   = [];
        let origen         = OTAreas["areaActual"]
        let formValues:any = []
        let data           = OT
        let cristalOri     = cristales
        let armazonOri     = armazones
        let user           = UsuarioID
        
        let destino;
        let estado:any


        let observaciones;
        let isMasivo; 
        let situacion;
        let validarBodega;
        let validacion_complete


        switch (type) {
            case 'Procesar':
                destino       = OTAreas["areaSiguiente"]
                estado        = 20
            
                
                observaciones = ''
                isMasivo      = false
                situacion          = '0'
                validacion_complete = true;
            
                break;
            case 'cristales-externos':
                break;
            case 'cristales-internos':
                break;
            default:
                break;
        }

        updateOT(
            jsondata,
            origen,
            destino,
            estado,
            formValues,
            data,
            cristalOri,
            armazonOri,
            user,
            observaciones,
            isMasivo,
            situacion,
            validarBodega,
            "",
            validacion_complete
        )

        const toastLoading = toast.loading('Cargando...');
        console.log(OT)
        console.log(OT[OTGrillaEnum.estado_impresion] === '0')
        if(OT[OTGrillaEnum.estado_impresion] === '0'){
            toast.dismiss(toastLoading)
            return toast.error(`OT ${pkToDelete.filter((ot:any)=> ot.estado_impresion === '0').map((ot:any)=>ot.folio)} no ha sido impresa.`) 
        }

        console.log(UsuarioID)
        updateOT(
            [],
            OTAreas["areaActual"],
            OTAreas["areaSiguiente"],
            20,
            [],
            OT,
            cristales,
            armazones,
            UsuarioID,
            "",
            true,
            '',
            true
        ).then(()=>{
            handleClose()
            toast.dismiss(toastLoading)
            toast.success('OT Procesada Correctamente.')
            dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
            valueConfirmOT.value = ""

        }).catch((e)=>{
            console.log(e)
            console.log('error')
            toast.dismiss(toastLoading);
        })
 
 
 
 
 
    }


    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            handleClose();
          }
        };
  
        window.addEventListener("keydown", handleKeyDown);
  
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClose]);

    React.useEffect(()=>{
        setOT(dataOTSignal.value[0])
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
                    destino = OTAreas["areaSiguiente"]
                    estado  = 20
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
            
                    }).catch((e)=>{
                        console.log(e)
                        console.log('error')
                        toast.dismiss(toastLoading);
                    })
             
                    break;
                case 'conCristales':
                    console.log('ejecutando con cristales')
                    destino = OTAreas["areas"].map((area:any)=>area).filter((areaAuxiliar:any)=>areaAuxiliar[1] === 60)[0][7]
                    estado  = 20
                    situacion = '4'

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
            
                    }).catch((e)=>{
                        console.log(e)
                        console.log('error')
                        toast.dismiss(toastLoading);
                    })
             
                    break;
                case 'sinCristales':
                    console.log('ejecutando con cristales')
                    destino = OTAreas["areas"].map((area:any)=>area).filter((areaAuxiliar:any)=>areaAuxiliar[1] === 60)[0][7]
                    estado  = 20
                    situacion = '5'

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
            
                    }).catch((e)=>{
                        console.log(e)
                        console.log('error')
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


        console.log(casoEjecutar)
    
    return (
        <div className=" bg-[#676f9d] mx-auto xl:w-[90%] xl:left-[35rem]  absolute top-10 left-auto right-auto rounded-xl shadow-md overflow-hidden lg:left-[20rem]     sm:w-[25rem]    md:max-w-[35rem] z-40">
         <div className="absolute right-0 userFormBtnCloseContainer">
          <h1 className='text-center text-2xl text-white mr-[12rem] mb-7'>Folio: { OT && OT[OTGrillaEnum.folio]}</h1>
          <button onClick={handleClose} className="userFormBtnClose">
            X
          </button>
        {/* <h1>h</h1> */}
        </div>
        <h1 className='h-8'></h1>
          <form 
            className="p-8 space-y-6"
            onSubmit={handleSubmit((data:any)=>onSubmit(data))}
            // onSubmit={handleSubmit((data) => onSubmit(data))}
            // onSubmit={handleSubmit(onSubmit)}
          >
        {OT && (
                <div className="">
                <h1 className='text-center text-white'>Anteojo 1</h1>
                <div className='rowForm !h-[4rem]'>
                <label className='text-lg !translate-x-[1rem] !translate-y-[3rem]'>{OT[OTGrillaEnum.a1_armazon_id]}</label>      
                <TextInputInteractive
                    type='text'
                    label='Armazon 1'
                    name='a1_armazon'
                    handleChange={handleInputChange}
                    isOT={true}
                    data={formValues && formValues["a1_armazon"]}
                    control={control}
                    textAlign='text-left'
                    customWidth={"translate-y-[-0.6rem] translate-x-[-1rem]"}
                    error={errors.a1_armazon}
                    inputRef={inputsRef.a1_armazon}
                    validarBodega={true}
                />
                </div>
                {casoEjecutar !== 'sinCristales' && (
                    <div className='rowForm  !h-[4rem]'>
                    <label className='text-lg '>{OT[OTGrillaEnum.cr1_od]}</label>
                    <TextInputInteractive
                        type='text'
                        label='OD'
                        name='a1_od'
                        handleChange={handleInputChange}
                        control={control}
                        isOT={true}
                        // defaultValue={}
                        data={formValues && formValues["a1_od"]}
                        textAlign='text-left'
                        customWidth={"translate-y-[-0.6rem] translate-x-[-1rem]"}
                        error={errors.a1_od}
                        inputRef={inputsRef.a1_od}
                        validarBodega={true}
                    />
                    </div>
                )}

                {casoEjecutar !== 'sinCristales' && (
                    <div className='rowForm  !h-[4rem]'>
                        <label className='text-lg '>{OT[OTGrillaEnum.cr1_oi]}</label>    
                        <TextInputInteractive
                            type='text'
                            label='OI'
                            name='a1_oi'
                            handleChange={handleInputChange}
                            control={control}
                            isOT={true}
                            data={formValues && formValues["a1_oi"]}
                            textAlign='text-left'
                            customWidth={"translate-y-[-0.6rem] translate-x-[-1rem]"}
                            error={errors.a1_oi}
                            inputRef={inputsRef.a1_oi}
                            validarBodega={true}
                        />
                    </div>
                )}
            </div>
        )}


            {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 && (
                <div className="">
                <h1 className='text-center text-white'>Anteojo 2</h1>
                <div className='rowForm !h-[4rem] '>
                <label className='text-lg !translate-x-[1rem] !translate-y-[3rem]'>{OT[OTGrillaEnum.a2_armazon_id]}</label>    
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
                    customWidth={"translate-y-[-0.6rem] translate-x-[-1rem]"}
                    validarBodega={true}
                    onlyRead={OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? false : true}
                />
                </div>
                <div className='rowForm !h-[4rem] '>
                <label className='text-lg'>{OT[OTGrillaEnum.cr2_od]}</label>    
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
                    customWidth={"translate-y-[-0.6rem] translate-x-[-1rem]"}
                    validarBodega={true}
                    onlyRead={OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? false : true}
                />
                </div>
                <div className='rowForm !h-[4rem] '>
                <label className='text-lg'>{OT[OTGrillaEnum.cr2_oi]}</label>    
                <TextInputInteractive
                    type='text'
                    label='OI'
                    name='a2_oi'
                    handleChange={handleInputChange}
                    isOT={true}
                    data={formValues && formValues["a2_oi"]}
                    control={control}
                    textAlign='text-left'
                    customWidth={"translate-y-[-0.6rem] translate-x-[-1rem]"}
                    error={errors.a2_oi}
                    inputRef={inputsRef.a2_oi}
                    validarBodega={true}
                    onlyRead={OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 ? false : true}
                />
                </div>
              
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