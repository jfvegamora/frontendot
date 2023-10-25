import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";

interface ITextInputProps {
  label: string;
  name: string;
  defaultValue?: any;
  onlyRead?: boolean;
  type: string;
  control: any;
  data?: any;
  error?: any;
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
  inputRef,
  className,
  defaultValue:formatvalue,
  otData
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(data || "")

  const initialValue = otData !== undefined ? otData : data;
  const [value, setValue] = useState<string>(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log(newValue)
    setValue(newValue)
    // console.log(e.target.name)
    if (handleChange) {
      handleChange(e.target);
    }
  
  
  
  };
 
  
  useEffect(()=>{
    setDefaultValue(otData || data || "")
    console.log('cambio')
    setValue(otData !== undefined ? otData : data);
  },[data,otData])





return (
  <div
  className={`${"flex items-center mb-4 mx-4  relative rounded-xl "}`}
  >
  <Controller
    name={name}
    control={control}
    // defaultValue={data ? data : ""}
    defaultValue={data}
    render={({ field }) => (
      <div className="flex flex-col  w-full">
        <Input
          {...field}
          error = {error ? true : false }
          label     ={label}
          value     ={value}
          color     ="orange"
          id        ={label}
          onChange  ={(e)=>setValue(e.target.value)}
          type      ={type}
          onBlur    ={(e)=>handleInputChange(e)}
          ref       ={inputRef}
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