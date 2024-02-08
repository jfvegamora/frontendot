import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { 
  // a1_od_cil, a1_od_eje, a1_od_esf, 
  a2_od_cil, a2_od_eje, a2_od_esf, dioptrias, dioptrias_receta } from "../../utils";
import { toast } from "react-toastify";

interface ITextInputProps {
  label: string;
  name: string;
  defaultValue?: any;
  onlyRead?: boolean;
  type: string;
  control: any;
  data?: any;
  error?: any;
  tabIndex?: number;
  inputRef?: any;
  className?:string;
  handleChange?: (data:any)=>void;
  otData?:any;
  isOptional?:boolean;
  textAlign?: string;
  step?:number
  onDataChange?:any
}

const OTTextInputComponent: React.FC<ITextInputProps> = ({
  label,
  type,
  control,
  name,
  handleChange,
  onlyRead,
  data,
  error,
  tabIndex,
  inputRef,
  className,
  otData,
  isOptional,
  textAlign,
  step,
  onDataChange
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(data || "  ")

  let initialValue:any = 0;
  let newValue = ''
  switch (name) {
    //? OJO DERECHO | ANTEOJO 1
    case 'a1_od_esf':
        initialValue =  dioptrias_receta.value.a1_od.esf ||  " "       
      break;
    case 'a1_od_cil':
        initialValue = dioptrias_receta.value.a1_od.cil  
      break;
    case 'a1_od_eje':
        initialValue = dioptrias_receta.value.a1_od.eje || " "     
        break;
    case 'a1_od_ad':
        initialValue = dioptrias_receta.value.a1_od.ad || " "     
      break;
    //? OJO IZQUIERDO | ANTEOJO 1  
    case 'a1_oi_esf':
        initialValue = dioptrias_receta.value.a1_oi.esf || " "  
        break;
    case 'a1_oi_cil':
        initialValue = dioptrias_receta.value.a1_oi.cil
        break;
    case 'a1_oi_eje':
        initialValue = dioptrias_receta.value.a1_oi.eje ||  " "     
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

    console.log(e.target.name)

    switch (e.target.name) {
      case 'a1_od_esf':
        if((Number(e.target.value).toFixed(2) as any % 0.25 !== 0)){
          toast.error('Esferico ojo derecho no corresponde')
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
          setValue("  ")
        }
       
       break;
      case 'a1_od_eje':

        if(Number(e.target.value).toFixed(2) as any >= 0 &&  Number(e.target.value).toFixed(2) as any <= 180){
          if(!(parseFloat(e.target.value) as any % 0.25 === 0)){
            setValue(" ")
            toast.error('Esferico ojo derecho no corresponde')
          }
        }else{
          if(!(parseFloat(e.target.value) as any % 0.25 === 0)){
            toast.error('Esferico ojo derecho no corresponde')
            setValue(" ")
          }
        }



        // if(!( parseInt(e.target.value) % 0.25 === 0  && parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 180 )){
        //   toast.error('EJE no corresponde')
        //   setValue("  ")
        //   return;
        // }
        break;

      case 'a1_od_ad':
        if((parseFloat(e.target.value) % 0.25 !== 0)) {
          toast.error('ADICIONAL no corresponde')
          // setValue("  ")
          return;
        }
        break;
      case 'a1_oi_esf':
        if((Number(e.target.value).toFixed(2) as any % 0.25 !== 0)){
          toast.error('Esferico ojo izquierdo no corresponde')
          setValue("  ")
          return;
         }
        break;
      case 'a1_oi_cil':
        const parsedValueOI = Number(e.target.value).toFixed(2) as any;

        
      
        break;
      case 'a1_oi_eje':
        if(!(parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 180)){
          setValue("  ")
          return;
        }
        break;

      case 'a1_oi_ad':
        if((e.target.value !== '' && parseFloat(e.target.value) % 0.25 !== 0)) {
          toast.error('ADICIONAL no corresponde')
          setValue("  ")
          return;
        }
        break;
      // case 'a1_od_cil':
      //   newValue = parseInt(e.target.value) > 0 ?  (parseInt(e.target.value) * -1 ).toString() : null as any
      //   console.log(newValue)
      //   setValue(newValue)
      //   break;

      // case 'a1_oi_cil':
      //   newValue = parseInt(e.target.value) > 0 ?  (parseInt(e.target.value) * -1 ).toString() : null as any
      //   setValue(newValue)
      //   break;
      default:
        break;
    }
    
 
    newValue = e.target.value;
    console.log(e.target.name)
    console.log(dioptrias.value.esf)
    // console.log(newValue)s

    setDefaultValue('v')
    setValue(newValue)
    // console.log(e.target.name)

  };
 

  useEffect(()=>{
    if(name === 'a1_od_cil'){
      console.log(value)
    }
  },[])


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
          value     ={value}
          color     ="orange"
          id        ={label}
          onChange  ={ onlyRead ? ()=>{}  :(e)=>setValue(e.target.value)}
          type      ={type}
          onBlur    ={ onlyRead ? ()=>{}  : (e)=>handleInputChange(e)}
          ref       ={inputRef}
          tabIndex  ={onlyRead ? 0 : (tabIndex || 1)}
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