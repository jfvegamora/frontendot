import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { 
  A1_CR_OD,
  A1_CR_OI,
  A2_CR_OD,
  A2_CR_OI,
  a1_armazon,
  a1_od_eje,
  a1_od_esf,
  a1_oi_eje,
  a1_oi_esf,
  a2_armazon,
  // a1_od_cil, a1_od_eje, a1_od_esf, 
  a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, a3_armazon, dioptrias_receta, validar_armazon1, validar_armazon2, validar_cristal1_od, validar_cristal1_oi, validar_cristal2_od, validar_cristal2_oi } from "../../utils";
import { toast } from "react-toastify";
import { validation_A1_OD_EJE, validation_A1_OI_EJE } from "../../utils/validationOT";

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
  className?:string;
  handleChange?: (data:any)=>void;
  otData?:any;
  isOptional?:boolean;
  textAlign?: string;
  step?:number;
  renderComponent?:any
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
  className,
  otData,
  isOptional,
  textAlign,
  step,
  renderComponent
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(otData || " ")

  const[render, setRender] = useState(false);

  let initialValue:any = "";
  // let newValue = ''
  switch (name) {
    //? OJO DERECHO | ANTEOJO 1
    case 'a1_od_esf':
        initialValue =  dioptrias_receta.value.a1_od.esf        
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
    if (handleChange) {
      handleChange(e.target)
    }
    // console.log(e.target.value)


    switch (e.target.name) {
      case 'a1_od_esf':
        if((Number(e.target.value).toFixed(2) as any % 0.25 !== 0)){
          toast.error('Esférico OD no corresponde.')
          a1_od_esf.value = "  "
          setValue("  ")
          return;
         }

        break;
      case 'a1_od_cil':
       const parsedValueOD = Number(e.target.value).toFixed(2) as any
       
       if(parsedValueOD >0){
          null
        }else if(!(parsedValueOD <=0 && parsedValueOD % 0.25 === 0)){
          toast.error('Cilindrico OD no corresponde.')
          dioptrias_receta.value.a1_od.cil = " "
          setValue("  ")
        }
       
       break;
      case 'a1_od_eje':
        if(Number(e.target.value).toFixed(2) as any >= 0 &&  Number(e.target.value).toFixed(2) as any <= 180){
          if(!(parseFloat(e.target.value) as any % 0.25 === 0)){
            dioptrias_receta.value.a1_od.eje = " "
            setValue(' ')
            setRender((prev)=>!prev)  
            validation_A1_OD_EJE("")
            toast.error('Esférico OD no corresponde.')
            return
          }else{
            setRender((prev)=>!prev)             
            validation_A1_OD_EJE(e.target.value)
            return
          }
        }else{
          toast.error('Esférico OD no corresponde.')
          dioptrias_receta.value.a1_od.eje = "  "
          a1_od_eje.value = " "
          setRender((prev)=>!prev)  
          setValue("  ")
          validation_A1_OD_EJE("")
          return
        }
      case 'a1_od_ad':
        if(!(parseFloat(e.target.value) >= 0.25 && parseFloat(e.target.value) <= 4)) {
            toast.error('Adición OD no corresponde.')
            dioptrias_receta.value.a1_od.ad = "  "
            setValue("  ")
            return;
        }
        break;
      
      case 'a1_oi_esf':
        if((Number(e.target.value).toFixed(2) as any % 0.25 !== 0)){
          toast.error('Esférico OI no corresponde.')
          a1_oi_esf.value = " "
          setValue("  ")
          return;
         }
        break;
      case 'a1_oi_cil':
        const parsedValueOI = Number(e.target.value).toFixed(2) as any;

        if(parsedValueOI > 0){
          null
        }else if(!(parsedValueOI <= 0 && parsedValueOI % 0.25 === 0)){
          toast.error('Cilindrico OI no corresponde.')  
          dioptrias_receta.value.a1_oi.cil = "  "
          setValue("  ")
        }
        break;
      case 'a1_oi_eje':
        if(Number(e.target.value).toFixed(2) as any >= 0 && Number(e.target.value).toFixed(2) as any <= 180){
          if(!(parseFloat(e.target.value) as any % 0.25 === 0)){
            dioptrias_receta.value.a1_oi.eje = "  "
            setValue(' ')
            setRender((prev)=>!prev)
            validation_A1_OI_EJE("")
            toast.error('Esférico OI no corresponde.')
            return;
          }else{
            setRender((prev)=>!prev)
            validation_A1_OI_EJE(e.target.value)
            return;
          }
        }else{
          toast.error('Esférico OI no corresponde.')
          dioptrias_receta.value.a1_oi.eje = "  "
          a1_oi_eje.value = " "
          setValue(" ")
          validation_A1_OI_EJE("")
          return;
        }
      case 'a1_oi_ad':
        if(!(parseFloat(e.target.value) >= 0.25 && parseFloat(e.target.value) <= 4)) {
          toast.error('Adición OI no corresponde.')
          dioptrias_receta.value.a1_oi.ad = "  "
          setValue("  ")
          return;
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
    
    setDefaultValue('v')
    setValue(otData)

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
  className={`${"flex items-center mb-4 mx-4  relative rounded-xl "}`}
  >
  <Controller
    name={name}
    control={control}
    // defaultValue={data ? data : ""}
    defaultValue={initialValue}
    render={({ field }) => (
      <div className="flex flex-col  w-full">
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
          className={`${className ? className : "custom-input"}  ${onlyRead ? "custom-onlyread cursor-not-allowed" : isOptional ? "custom-optional" : "custom-required"} ${textAlign && textAlign}`}
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