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
}

const TextInputInteractive: React.FC<ITextInputProps> = ({
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
}) => {
  const [_defaultValue, setDefaultValue] = useState<any>(data && data || "")

  const [value, setValue] = useState<any>();


  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      if(isOT){
        handleChange(e.target)
      }else{
        handleChange(e.target.value)
      }
    }   

    setValue(e.target.value)

  };
  
  useEffect(()=>{
    if(data){
        setDefaultValue(data)
        setValue(data)
    }
    // setValue(data)
  },[data])

// ...

// console.log(defaultValue)
return (
  <div className={`  mr-4 rounded-xl ${customWidth ? customWidth : ""}`}>
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <div className={`labelInput !mb-[1rem] !ml-[1rem] relative ${error ? 'border-red-500' : 'border-gray-500'}`}>
          <Input
            {...field}
            error={error ? true : false}
            label={label}
            id={label}
            type={type}
            value={value}
            // defaultValue={defaultValue}
            readOnly={onlyRead}
            maxLength={maxLength}
            onBlur={(e) => handleInputChange(e)}
            onChange={(e)=> {
                setValue(e.target.value)
            }}
            ref={inputRef}
            // className={`${className ? `${className} custom-input ` : "custom-input "} ${onlyRead ? "bg-gray-200 opacity-70 cursor-not-allowed" : ""}`}
            className={`${className ? className : "custom-input"}  ${onlyRead ? "custom-onlyread" : isOptional ? "custom-optional" : "custom-required"}`}
            tabIndex={tabIndex || 1}
            placeholder={type === 'date' ? "dd-mm-yyyy" : ''}
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

export default TextInputInteractive;

