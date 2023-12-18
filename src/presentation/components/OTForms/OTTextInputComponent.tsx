import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { 
  // a1_od_cil, a1_od_eje, a1_od_esf, 
  a2_od_cil, a2_od_eje, a2_od_esf, dioptrias_receta } from "../../utils";

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
  otData?:any
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
  // defaultValue:formatvalue,
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(data || "  ")

  let initialValue:any = 0;

  switch (name) {
    case 'a1_od_esf':
        initialValue =  dioptrias_receta.value.a1_od.esf    
      break;
    case 'a1_od_cil':
        initialValue = dioptrias_receta.value.a1_od.cil 
      break;
    case 'a1_od_eje':
        initialValue = dioptrias_receta.value.a1_od.eje 
      break;
      


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




  const [value, setValue] = useState<string>(" ");
  
  useEffect(() => {
    console.log(initialValue)
  
    // setValue(initialValue === undefined ? "" : initialValue);
    setValue(initialValue);
  }, [initialValue, defaultValue]);



  



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // console.log(newValue)s
    setDefaultValue('v')
    console.log(newValue)
    setValue(newValue)
    // console.log(e.target.name)
    if (handleChange) {
      handleChange(e.target);
    }
  
  
  

  };
 

  console.log(value)



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
          onChange  ={(e)=>setValue(e.target.value)}
          type      ={type}
          onBlur    ={(e)=>handleInputChange(e)}
          ref       ={inputRef}
          tabIndex  ={tabIndex || 1}
          readOnly  = {onlyRead}
          className ={`${className ? className : " custom-input py-2 px-3 "}`}
          // className={`${className ? className : "custom-input py-2 px-3"}`}
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