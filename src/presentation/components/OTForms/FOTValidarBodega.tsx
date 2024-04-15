import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { A1_CR_OD, A1_CR_OI, A2_CR_OD, A2_CR_OI, a1_armazon, a2_armazon, codigoProyecto, tipo_de_anteojo, updateOT, validationBodegaSchema, validationNivel3 } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';
import { dataOTSignal } from '../OTPrimaryButtons';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
// import { toast } from 'react-toastify';
import { validationCodigoArmazon_1, validationCodigoArmazon_2, validationCodigoCristal1_od, validationCodigoCristal1_oi, validationCodigoCristal2_od, validationCodigoCristal2_oi } from '../../utils/validationOT';
import { Button } from '@material-tailwind/react';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { paramsOT } from '../../views/mantenedores/MOT';

export const focusFirstInput = (strInputName: string, ref: React.RefObject<any>) => {
    if (ref.current) {
      const firstInput = ref.current.querySelector(`input[name=${strInputName}]`);
      if (firstInput) {
        (firstInput as HTMLInputElement).focus();
      }
    }
  };

interface IFOTValidarBodega{
    handleClose?:any,
    data?:any
}

const FOTValidarBodega:React.FC<IFOTValidarBodega> = ({
    handleClose,
    data
}) => {
    const [formValues, setFormValues] = React.useState();
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const [OT, setOT] = React.useState(dataOTSignal.value[0])

    const schema          = validationBodegaSchema()
    // const OT              = dataOTSignal.value[0];
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

    const armazones = ([{codigo: OT && OT[EnumGrid.a1_armazon_id]}, {codigo: OT && OT[EnumGrid.tipo_anteojo_id] === 3 ? (OT && OT[EnumGrid.a2_armazon_id]) : ('')}] as any).filter((codigo:any)=>codigo.codigo !== '')

    const cristales = ([{codigo: OT && OT[EnumGrid.cristal1_od]}, {codigo:OT && OT[EnumGrid.cristal1_oi]}, {codigo: ( OT &&OT[EnumGrid.tipo_anteojo_id] === 3 ? (OT && OT[EnumGrid.cristal2_od]) : ('') )} , {codigo: OT && OT[EnumGrid.tipo_anteojo_id] === 3 ? (OT && OT[EnumGrid.cristal2_oi]): ('')}]).filter((codigo:any)=>codigo.codigo !== '')

    const {
        control,
        formState: { errors },
        
      } = useForm({
        resolver: yupResolver(schema),
    });

    const handleInputChange = (e:any) => {
        const {name, value} = e;


        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            [name]: value
        }));
        
        
            if(name === 'a1_od'){
                if(value.trim() === ''){
                    validationCodigoCristal1_od('')
                }
                if((OT && OT[EnumGrid.cristal1_od] === value) && value.length >= 11){
                    console.log('render')
                    validationCodigoCristal1_od(value,alreadyValidate)
                    focusFirstInput('a1_oi',inputsRef["a1_oi"] )
                }else{
                    if(value.length <= 11) return;
                    console.log('render')
                    validationCodigoCristal1_od('')
                    // toast.error('Anteojo 1, Código cristal OD no son iguales')
                    setFormValues({[name]: ''} as any)
                }        
            }
    
            if(name === 'a1_oi'){
                if(value.trim() === ''){
                    validationCodigoCristal1_oi('')
                }
                if(OT && OT[EnumGrid.cristal1_oi] === value && value.length >= 11){
                    validationCodigoCristal1_oi(value, alreadyValidate)
                    focusFirstInput('a1_armazon', inputsRef["a1_armazon"])
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
                if((OT && OT[EnumGrid.a1_armazon_id] === value) && value.length >= 11){
                    validationCodigoArmazon_1(value, alreadyValidate)
                    if(OT && OT[EnumGrid.tipo_anteojo_id] === 3){
                        console.log('render')
                        focusFirstInput('a2_od', inputsRef["a2_od"])
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
                if((OT && OT[EnumGrid.cristal2_od] === value) && value.length >= 11){
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
                if((OT && OT[EnumGrid.cristal2_oi] === value) && value.length >= 11){
                    validationCodigoCristal2_oi(value, alreadyValidate)
                    focusFirstInput('a2_armazon', inputsRef["a2_armazon"])
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
                if(OT && OT[EnumGrid.a2_armazon_id] === value && value.length >= 11){
                    validationCodigoArmazon_2(value, alreadyValidate)
                    // if(OT && OT[EnumGrid.tipo_anteojo_id] === '3'){
                    //     focusFirstInput('a2_od', inputsRef["a2_od"])
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
            A1_CR_OD.value  = OT[EnumGrid.cristal1_od]
            A1_CR_OI.value  = OT[EnumGrid.cristal1_oi]
            A2_CR_OD.value  = OT[EnumGrid.cristal2_od]
            A2_CR_OI.value  = OT[EnumGrid.cristal2_od]

            a1_armazon.value = OT[EnumGrid.a1_armazon_id]
            a2_armazon.value = OT[EnumGrid.a2_armazon_id]

            tipo_de_anteojo.value = OT[EnumGrid.tipo_anteojo_id]
            tipo_de_anteojo.value.toString()
            codigoProyecto.value = OT[EnumGrid.proyecto_codigo]
        }
        
        if(OT && OT[EnumGrid.tipo_anteojo_id] !== 3){
            console.log('render')
            validationCodigoArmazon_2('32', true)
            validationCodigoCristal2_od('32', true)
            validationCodigoCristal2_oi('32', true)
        }
        focusFirstInput('a1_od', inputsRef["a1_od"])
    },[OT])

    const sumatoriaNivel3 = validationNivel3.value.reduce((index,objecto) => index + objecto.valor, 0);  
    
    const onSubmit = (e:any) => {
        e.preventDefault();
        updateOT(
            [],
            OTAreas["areaActual"],
            OTAreas["areaSiguiente"],
            20,
            [],
            OT,
            cristales,
            armazones,
            UsuarioID.toString(),
            "",
            true,
            '',
            true
        ).then(()=>{
            handleClose()
            dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))

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

    console.log(OT)
    return (
        <div className=" bg-[#676f9d] mx-auto xl:w-[90%] xl:left-[30rem]  absolute top-10 left-auto right-auto rounded-xl shadow-md overflow-hidden lg:left-[20rem]     sm:w-[25rem]    md:max-w-[35rem] z-20">
         <div className="absolute right-0 userFormBtnCloseContainer">
          <h1 className='text-center text-2xl text-white mr-[12rem] mb-7'>Folio: { OT && OT[EnumGrid.folio]}</h1>
          <button onClick={handleClose} className="userFormBtnClose">
            X
          </button>
        {/* <h1>h</h1> */}
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
                <h1 className='text-center text-white'>Anteojo 1</h1>
                <div className='rowForm  !h-[4rem]'>
                <label className='text-lg absolute  left-[3rem] top-[4.2rem]'>{OT[EnumGrid.cristal1_od]}</label>
                <TextInputInteractive
                    type='text'
                    label='OD'
                    name='a1_od'
                    handleChange={handleInputChange}
                    control={control}
                    isOT={true}
                    data={formValues && formValues["a1_od"]}
                    textAlign='text-left'
                    error={errors.a1_od}
                    inputRef={inputsRef.a1_od}
                    validarBodega={true}
                />
                </div>
                <div className='rowForm  !h-[4rem]'>
                <label className='text-lg absolute left-[3rem] top-[9rem]'>{OT[EnumGrid.cristal1_oi]}</label>    
                <TextInputInteractive
                    type='text'
                    label='OI'
                    name='a1_oi'
                    handleChange={handleInputChange}
                    control={control}
                    isOT={true}
                    data={formValues && formValues["a1_oi"]}
                    textAlign='text-left'
                    error={errors.a1_oi}
                    inputRef={inputsRef.a1_oi}
                    validarBodega={true}
                />
                </div>
                <div className='rowForm '>
                <label className='text-lg absolute left-[3rem] top-[13.5rem]'>{OT[EnumGrid.a1_armazon_id]}</label>      
                <TextInputInteractive
                    type='text'
                    label='Armazon 1'
                    name='a1_armazon'
                    handleChange={handleInputChange}
                    isOT={true}
                    data={formValues && formValues["a1_armazon"]}
                    control={control}
                    textAlign='text-left'
                    error={errors.a1_armazon}
                    inputRef={inputsRef.a1_armazon}
                    validarBodega={true}
                />
                </div>
            </div>
        )}


            {OT && OT[EnumGrid.tipo_anteojo_id] === 3 && (
                <div className="">
                <h1 className='text-center text-white'>Anteojo 2</h1>
                <div className='rowForm !h-[4rem] '>
                <label className='text-lg absolute left-[3rem] top-[19.7rem]'>{OT[EnumGrid.cristal2_od]}</label>    
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
                    validarBodega={true}
                    onlyRead={OT && OT[EnumGrid.tipo_anteojo_id] === 3 ? false : true}
                />
                </div>
                <div className='rowForm !h-[4rem] '>
                <label className='text-lg absolute left-[3rem] top-[24.7rem]'>{OT[EnumGrid.cristal2_oi]}</label>    
                <TextInputInteractive
                    type='text'
                    label='OI'
                    name='a2_oi'
                    handleChange={handleInputChange}
                    isOT={true}
                    data={formValues && formValues["a2_oi"]}
                    control={control}
                    textAlign='text-left'
                    error={errors.a2_oi}
                    inputRef={inputsRef.a2_oi}
                    validarBodega={true}
                    onlyRead={OT && OT[EnumGrid.tipo_anteojo_id] === 3 ? false : true}
                />
                </div>
                <div className='rowForm !h-[4rem] '>
                <label className='text-lg absolute left-[3rem] top-[29.3rem]'>{OT[EnumGrid.a2_armazon_id]}</label>    
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
                    validarBodega={true}
                    onlyRead={OT && OT[EnumGrid.tipo_anteojo_id] === 3 ? false : true}
                />
                </div>
            </div>
            )}
            
            

                {sumatoriaNivel3 === validationNivel3.value.length && (
                    <Button className='otActionButton bg-green-400 hover:bg-green-700' type='submit'  onClick={(e) =>onSubmit(e)}>Procesar</Button>
                )}
            

            <div>
            </div>
            <div>
            </div>
          </form>
        </div>
      );
}

export default FOTValidarBodega