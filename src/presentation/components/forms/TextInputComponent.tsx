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
  isOptional?:boolean;
  labelProps?:any;
  textAlign?: string;
  handleFocus?:any;
  labelContainer?:any
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
  customWidth,
  isOptional,
  textAlign,
  handleFocus,
  labelProps,
  labelContainer
}) => {


  const defaultState = (type === 'number' && (name === 'valor_neto_armazon')) ? 0 : "";


  const [defaultValue, setDefaultValue] = useState<any>(data && data || defaultState)


  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      if(isOT){
        handleChange(e.target)
      }else{
        handleChange(e.target.value)
      }
    }


  };
  
  useEffect(()=>{
    // console.log(data)
    setDefaultValue(data)
  
  },[data])


  if(label === '$ Total'){
    console.log(defaultValue)
  }
  if(label === '_folio'){
    console.log(className)
  }
//
// console.log(defaultValue)


return (
  <div className={`mr-4 rounded-xl ${customWidth ? customWidth : ""}`}>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className={`  labelInput !mb-[1rem] !ml-[1rem] relative ${error ? 'border-red-500' : 'border-[#f8b179]'}`}>
          <div className={`${labelContainer ? labelContainer : ""} w-full h-4 -top-[0.8vw] absolute left-2 bg-white`}>
            <label htmlFor={label} className={` ${labelProps ? labelProps : ""} absolute !z-20 translate-y-[-0.5vw]  translate-x-3`}>
                {label}
            </label>
          </div>
          <Input
            {...field}
            error={error ? true : false}
            // label={label}
            id={label}
            type={type}
            // defaultValue={defaultValue}
            readOnly={onlyRead}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={(e) => handleInputChange(e)}
            ref={inputRef}
            className={`${customWidth ? customWidth : ""}  ${onlyRead ? "custom-onlyread cursor-not-allowed" : isOptional ? "custom-optional" : "custom-required"} ${textAlign && textAlign}`}
            tabIndex={onlyRead ? 0 : (tabIndex || 1)}
            placeholder={type === 'date' ? "dd-mm-yyyy" : ""}
            autoComplete="off"
            step={step ? step : 1 } 
          />
          {error && (
            <p className="absolute top-0 right-[50%] labelErr">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  </div>
);
};

export default TextInputComponent;

