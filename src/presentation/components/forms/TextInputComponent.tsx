/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  maxLength?:number;
  step?:number;
  tabIndex?: number;
  isOT?:boolean;
  customWidth?: any;
}

const TextInputComponent: React.FC<ITextInputProps> = ({
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
  maxLength,
  step,
  tabIndex,
  isOT,
  customWidth
}) => {
  const [defaultValue, setDefaultValue] = useState<any>(data && data || "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    // console.log(e.target.name)
    if (handleChange) {
      // if(e.target.name === formatvalue){
      //   e.target.value = '20.00'
      // }
      if(isOT){
        handleChange(e.target)
      }else{
        handleChange(e.target.value)
      }
    
    
    }
  };
 
  
  useEffect(()=>{
    setDefaultValue(data)
    // console.log(data)
  },[data])


  // console.log(data)
  // console.log(data)
return (
  // <div className={`${"flex items-center mx-4 relative rounded-xl"}`}>
  <div className={`mr-4 rounded-xl  ${customWidth ? customWidth : ""}`}>
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
        <div className={` !mb-[1rem] !ml-[1rem]   `}>
          <Input
            {...field}
            error = {error ? true : false }
            label     ={label}
            id        ={label}
            type      ={type}
            readOnly  ={onlyRead}
            maxLength ={maxLength}
            onBlur    ={(e)=>handleInputChange(e)}
            ref       ={inputRef}
            className ={`${className ? className : " custom-input "}`}
            tabIndex  ={tabIndex || 1}
            placeholder={type === 'date' ? "dd-mm-yyyy" : ''}
            autoComplete="off" 
            
          />
          {/* <input 
            type="text" 
            name="" 
            id="" 
          /> */}
      </div>
    )}
  />
  {error && (
    <p className="text-xs text-red-500 absolute top-[.5rem] left-[22%]">
      {error.message}
    </p>
  )}
</div>
  );
};

export default TextInputComponent;

