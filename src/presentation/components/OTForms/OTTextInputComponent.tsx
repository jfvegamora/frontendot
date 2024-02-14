import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { 
  a1_od_esf,
  a1_oi_esf,
  // a1_od_cil, a1_od_eje, a1_od_esf, 
  a2_od_cil, a2_od_eje, a2_od_esf, a2_oi_cil, a2_oi_eje, a2_oi_esf, dioptrias_receta } from "../../utils";
import { toast } from "react-toastify";

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
  step?:number
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
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(otData || " ")

  const[_reder, setRender] = useState(false);

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
    default:
      break;
  }




  const [value, setValue] = useState<any>(" ");
  
  useEffect(() => {
    // setValue(initialValue === undefined ? "" : initialValue);
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
          toast.error('Esferico ojo derecho no corresponde')
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
          toast.error('Cilindrico ojo derecho no corresponde')
          dioptrias_receta.value.a1_od.cil = " "
          setValue("  ")
        }
       
       break;
      case 'a1_od_eje':
        if (parseFloat(e.target.value) === 0) {
          return;
        }
      
        if(Number(e.target.value).toFixed(2) as any >= 0 &&  Number(e.target.value).toFixed(2) as any <= 180){
          if(!(parseFloat(e.target.value) as any % 0.25 === 0)){
            console.log('render')
            setValue('  ')
                      
            toast.error('Esferico ojo derecho no corresponde')
            dioptrias_receta.value.a1_od.eje = " "
          }else{
              null               
          }
        }else{
            toast.error('Esferico ojo derecho no corresponde')
            dioptrias_receta.value.a1_od.eje = " "
            setValue("  ")

        }

        break;
      case 'a1_od_ad':
        if(!(parseFloat(e.target.value) >= 0.25 && parseFloat(e.target.value) <= 4)) {
            toast.error('Adicional ojo derecho no corresponde')
            dioptrias_receta.value.a1_od.ad = "  "
            setValue("  ")
            return;
        }
        break;
      
      case 'a1_oi_esf':
        if((Number(e.target.value).toFixed(2) as any % 0.25 !== 0)){
          toast.error('Esferico ojo izquierdo no corresponde')
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
          toast.error('Cilindrico ojo izquierdo no corresponde')  
          dioptrias_receta.value.a1_oi.cil = "  "
          setValue("  ")
        }
        break;
      case 'a1_oi_eje':
        if(Number(e.target.value).toFixed(2) as any >= 0 && Number(e.target.value).toFixed(2) as any <= 180){
          if(!(parseFloat(e.target.value) as any % 0.25 === 0)){
            dioptrias_receta.value.a1_oi.eje = "  "
            setValue(' ')
            toast.error('Esferico ojo izquierdo no corresponde')
          }else{
            null
          }
        }else{
          toast.error('Esferico ojo izquierdo no corresponde')
          dioptrias_receta.value.a1_oi.eje = "  "
          setValue(" ")
        }
        break;

      case 'a1_oi_ad':
        if(!(parseFloat(e.target.value) >= 0.25 && parseFloat(e.target.value) <= 4)) {
          toast.error('Adicional ojo izquierdo no corresponde')
          dioptrias_receta.value.a1_oi.ad = "  "
          setValue("  ")
          return;
        }
        break;
      default:
        break;
    }
    
    setDefaultValue('v')
    setValue(otData)

  };
 

  useEffect(()=>{
    if(name === 'a1_od_eje'){
      console.log(value)
    }

    setRender((prev)=>!prev)
  },[dioptrias_receta.value.a1_od.cil, dioptrias_receta.value.a1_oi.cil])
 
 
 
  if(name === 'a1_oi_eje'){
    // console.log(value)
  }
 
  if(name === 'a1_od_eje'){
    // console.log(value)
  }


  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Tab") {
  //     e.preventDefault(); // Prevenir el comportamiento predeterminado del evento "tab"
  //     // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se presiona la tecla "tab"
  //   }
  // };

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
          defaultValue={initialValue}
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