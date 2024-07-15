import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { 
  A1_CR_OD,
  A1_CR_OI,
  A2_CR_OD,
  A2_CR_OI,
  a1_armazon,
  a1_od_ad,
  a1_od_cil,
  a1_od_eje,
  a1_od_esf,
  a1_oi_ad,
  a1_oi_cil,
  a1_oi_eje,
  a1_oi_esf,
  a2_armazon,
  // a1_od_cil, a1_od_eje, a1_od_esf, 
  a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, a3_armazon, dioptrias_receta, validar_armazon1, validar_armazon2, validar_cristal1_od, validar_cristal1_oi, validar_cristal2_od, validar_cristal2_oi } from "../../utils";
import { toast } from "react-toastify";
import { AppStore, useAppSelector } from "../../../redux/store";

interface ITextInputProps {
  label: string;
  name: string;
  defaultValue?: any;
  onlyRead?: boolean;
  type: string;
  control: any;
  error?: any;
  tabIndex?: number;
  inputRef?: any;
  handleChange?: (data:any)=>void;
  otData?:any;
  isOptional?:boolean;
  textAlign?: string;
  step?:number;
  renderComponent?:any;
  customWidth?:any
}

const OTTextInputComponent: React.FC<ITextInputProps> = ({
  label,
  type,
  control,
  name,
  handleChange,
  onlyRead,
  error,
  tabIndex,
  inputRef,
  otData,
  isOptional,
  textAlign,
  step,
  renderComponent,
  customWidth
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(otData || " ")
  const dioptriasState = useAppSelector((store: AppStore) => store.utils?.Dioptrias);
  
  let ESFstate = dioptriasState[0];
  let CILstate = dioptriasState[1];
  let EJEstate = dioptriasState[2]
  let ADstate  = dioptriasState[3]


  const[render, setRender] = useState(false);

  let initialValue:any = "";
  // let newValue = ''
  switch (name) {
    //? OJO DERECHO | ANTEOJO 1
    case 'a1_od_esf':
        initialValue = Number.isNaN(dioptrias_receta.value.a1_od.esf) ?  ''  :   dioptrias_receta.value.a1_od.esf        
      break;
    case 'a1_od_cil':
        initialValue = dioptrias_receta.value.a1_od.cil  
      break;
    case 'a1_od_eje':
        initialValue = dioptrias_receta.value.a1_od.eje      
        break;
    case 'a1_od_ad':
        initialValue = dioptrias_receta.value.a1_od.ad     
      break;
    //? OJO IZQUIERDO | ANTEOJO 1  
    case 'a1_oi_esf':
        initialValue = dioptrias_receta.value.a1_oi.esf  
        break;
    case 'a1_oi_cil':
        initialValue = dioptrias_receta.value.a1_oi.cil
        break;
    case 'a1_oi_eje':
        initialValue = dioptrias_receta.value.a1_oi.eje     
        break;
    case 'a1_oi_ad':
         initialValue = dioptrias_receta.value.a1_oi.ad
         break;      

    //? OJO DERECHO | ANTEOJO 2
    case 'a2_od_esf':
        initialValue = a2_od_esf.value
      break;
    case 'a2_od_cil':
        initialValue = a2_od_cil.value
        break;
    case 'a2_od_eje':
       initialValue = a2_od_eje.value
       break;

    case 'a2_oi_esf':
       initialValue = a2_oi_esf.value
       break;
    case 'a2_oi_cil':
       initialValue = a2_oi_cil.value
       break;
    case 'a2_oi_eje':
      initialValue = a2_oi_eje.value
      break;
    //? VALIDACIONES
    case 'validar_armazon1':
      initialValue = validar_armazon1.value
      break;
    case 'validar_armazon2':
      initialValue = validar_armazon2.value
      break;
    case 'validar_cristal1_od':
      initialValue = validar_cristal1_od.value;
      break
    case 'validar_cristal1_oi':
      initialValue = validar_cristal1_oi.value;
      break;
    case 'validar_cristal2_od':
      initialValue = validar_cristal2_od.value;
      break;
    case 'validar_cristal2_oi':
      initialValue = validar_cristal2_oi.value;
      break;
    case 'a1_armazon_id':
      initialValue = a1_armazon.value;
      break;
    case 'a2_armazon_id':
      initialValue = a2_armazon.value;
      break;
    case 'a3_armazon_id':
      initialValue = a3_armazon.value;
      break;
    default:
      break;
  }


  const [value, setValue] = useState<any>(" ");
  
  useEffect(() => {
    console.log(initialValue)
    setValue(initialValue);
  }, [initialValue, defaultValue, otData]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target?.value.trim() === ''){
      return;
    }

    if (handleChange) {
      handleChange(e.target)
    }
    // console.log(e.target.value)
    let formatValue:any = '';

    if(e.target.value?.trim() !== ''){
      formatValue = parseFloat(e.target.value.replace(',', '.')).toFixed(2);
    }

    console.log(formatValue)

    switch (e.target.name) {
      case 'a1_od_esf':
        const isESFODPresent = ESFstate.some((subArray:string) => subArray.includes(formatValue))
        if(!isESFODPresent){
          toast.error('ESF OD no válido.')
          a1_od_esf.value = ""
          dioptrias_receta.value.a1_od.esf = ""
          setValue("")
          return;
        }else{
          if(formatValue > 0 ){
            formatValue = '+' + formatValue;
          }
          dioptrias_receta.value.a1_od.esf = formatValue;
          a1_od_esf.value = formatValue;
          setValue(formatValue);
        }

        break;
      case 'a1_od_cil':
        const isCILODPresent = CILstate.some((subArray:string)=> subArray.includes(formatValue))
        if(!isCILODPresent){
          toast.error('CIL OD no válido.')
          a1_od_cil.value = "";
          dioptrias_receta.value.a1_od.cil = "";
          setValue("");
          return;
        }else{
          if(formatValue > 0){
            formatValue = '+' + formatValue;
          }
          dioptrias_receta.value.a1_od.cil = formatValue;
          a1_od_cil.value = formatValue;
          setValue(formatValue);
        }

       break;
      case 'a1_od_eje':
       const isEJEODPresent = EJEstate.some((subArray:number[]) => subArray[0] === parseFloat(e.target.value))
       if(!isEJEODPresent){
        toast.error('EJE OD no válido.')
        a1_od_eje.value = ""
        dioptrias_receta.value.a1_od.eje = ""
        setValue("")
        return;
      }else{
        dioptrias_receta.value.a1_od.eje = e.target.value;
        a1_od_eje.value = e.target.value;
        setValue(e.target.value);
      }
      break;
      case 'a1_od_ad':
        const isADODPresent = ADstate.some((subArray:string[]) => subArray.includes(formatValue))  
        console.log(isADODPresent)

        if(!isADODPresent){
          toast.error('AD OD no válido.');
          a1_od_ad.value = '';
          dioptrias_receta.value.a1_od.ad = '';
          setValue('');
          return;
        }else{
          if(formatValue > 0){
            formatValue = '+' + formatValue;
          }
          dioptrias_receta.value.a1_od.ad = formatValue;
          a1_od_ad.value = formatValue;
          setValue(formatValue)
        }
        break;
      case 'a1_oi_esf':
        const isESFOIPrsent = ESFstate.some((subArray:string[])=> subArray.includes(formatValue))
        if(!isESFOIPrsent){
          toast.error('ESF OI no válido.');
          a1_oi_esf.value = "";
          dioptrias_receta.value.a1_oi.esf = "";
          setValue("");
          return;
        }else{
          if(formatValue > 0){
            formatValue = '+' + formatValue;
          }
          dioptrias_receta.value.a1_oi.esf = formatValue;
          a1_oi_esf.value = formatValue;
          setValue(formatValue);
        }
        break;
      case 'a1_oi_cil':
        const isCILOIPresente = CILstate.some((subArray:string[]) => subArray.includes(formatValue));
        if(!isCILOIPresente){
          toast.error('CIL OI no válido.');
          a1_oi_cil.value = '';
          dioptrias_receta.value.a1_oi.cil = '';
          setValue('');
          return;
        }else{
          if(formatValue > 0){
            formatValue = '+' + formatValue;
          }
          dioptrias_receta.value.a1_oi.cil = formatValue;
          a1_oi_cil.value  = formatValue;
          setValue(formatValue);
        }
        break;
      case 'a1_oi_eje':
        const isEJEOIPresent = EJEstate.some((subArray:number[]) => subArray[0] === parseFloat(e.target.value))
        if(!isEJEOIPresent){
          toast.error('EJE OI no válido..')
          dioptrias_receta.value.a1_oi.eje = "  "
          a1_oi_eje.value = " "
          setValue(" ")
          return; 
        }else{
          dioptrias_receta.value.a1_oi.eje = e.target.value;
          a1_oi_eje.value = e.target.value;
          setValue(e.target.value);
        }
      break;
      case 'a1_oi_ad':
        const isADOIPresent = ADstate.some((subArray:string[]) => subArray.includes(formatValue));
        if(!isADOIPresent){
          toast.error('AD OI no válido.');
          a1_oi_ad.value = '';
          dioptrias_receta.value.a1_oi.ad = '';
          setValue('');
          return;
        }else{
          if(formatValue.length > 0){
            formatValue = '+' + formatValue;
          }
          dioptrias_receta.value.a1_oi.ad = formatValue;
          a1_oi_ad.value = formatValue;
          setValue(formatValue)
        }
        break;
      case 'validar_armazon1':
        if(a1_armazon.value.trim() !== validar_armazon1.value.trim()){
          setValue(' ')
          validar_armazon1.value = " "
        }
        break;
      case 'validar_armazon2':
        if(a2_armazon.value.trim() !== validar_armazon2.value.trim()){
          setValue(' ')
          validar_armazon2.value = " "
        }
        break;

      case 'validar_cristal1_od':
        if(A1_CR_OD.value.trim() !== validar_cristal1_od.value.trim()){
          if(value.trim() !== ''){
            toast.error('Códigos Cristal OD no coinciden.')
            setValue(' ')
            validar_cristal1_od.value = " "
          }
        }
        break;
      case 'validar_cristal1_oi':
        if(A1_CR_OI.value.trim() !== validar_cristal1_oi.value.trim()){
          if(value.trim() !== ''){
            toast.error('Códigos Cristal OI no coinciden.')
            setValue(' ')
            validar_cristal1_oi.value = " "
          }
        }
        break;
      case 'validar_cristal2_oi':
        if(A2_CR_OI.value.trim() !== validar_cristal2_oi.value.trim()){
          if(value.trim() !== ""){
            toast.error('Códigos Cristal OI no coinciden.')
            setValue(' ')
            validar_cristal2_oi.value = " "
          }
        }
        break;
      case 'validar_cristal2_od':
        if(A2_CR_OD.value.trim() !== validar_cristal2_od.value.trim()){

          if(value.trim() !== ""){
            toast.error('Códigos Cristal OD no coinciden.')
            setValue(' ')
            validar_cristal2_od.value = " "
          }

        }
        break;
      default:
        break;
    }
    
    setDefaultValue('')
    // setValue(otData)

  };
 

  useEffect(()=>{
    setRender((prev)=>!prev)
  },[dioptrias_receta.value.a1_od.cil, dioptrias_receta.value.a1_oi.cil])
 
  
  useEffect(() => {
    if (renderComponent) {
      renderComponent((prev:any) => !prev);
    }
  }, [dioptrias_receta.value.a1_od.eje, render]); // Cambiar esta dependencia según lo que desees observar


return (
  <div
  className={`${" labelInput inputStyles flex items-center mb-4 mx-4  relative rounded-xl inputStyles"}`}
  >
  <Controller
    name={name}
    control={control}
    // defaultValue={data ? data : ""}
    defaultValue={initialValue}
    render={({ field }) => (
      <div className="flex flex-col  w-full">
        {/* <label htmlFor={label} className={` ${labelProps ? labelProps : ""} absolute !z-20 translate-y-[-0.5vw] text-[1.2vw] !font-[1.2vw] translate-x-3`}>
                  {label}
          </label> */}
        <Input
          {...field}
          error     = {error ? true : false }
          label     ={label}
          // defaultValue={initialValue}
          value     ={value}
          color     ="orange"
          id        ={label}
          onChange  ={ onlyRead ? ()=>{}  :(e)=>setValue(e.target.value)}
          type      ={type}
          onBlur    ={ onlyRead ? ()=>{}  : (e)=>handleInputChange(e)}
          ref       ={inputRef}
          tabIndex  ={onlyRead ? 0 : (tabIndex || 1)}
          // onKeyDown={handleKeyDown}
          // tabIndex  ={onlyRead ? 0 : (tabIndex || 1)}
          step      ={step}
          readOnly  = {onlyRead}
          className={`${customWidth ? customWidth : "custom-input"}  ${onlyRead ? "custom-onlyread cursor-not-allowed" : isOptional ? "custom-optional" : "custom-required"} ${textAlign && textAlign}`}
        />
      </div>
    )}
  />
  {error && (
    <p className="text-xs text-red-500 absolute top-0 left-0">
      {error.message}
    </p>
  )}
</div>
  );
};

export default OTTextInputComponent;