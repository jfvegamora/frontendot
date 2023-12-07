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
    if (handleChange) {
      if(isOT){
        handleChange(e.target)
      }else{
        handleChange(e.target.value)
      }
    }
  };
  
  useEffect(()=>{
    setDefaultValue(data)
  },[data])

// ...

return (
  <div className={`mr-4 rounded-xl ${customWidth ? customWidth : ""}`}>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className={`labelInput !mb-[1rem] !ml-[1rem] relative ${error ? 'border-red-500' : 'border-gray-500'}`}>
          <Input
            {...field}
            error={error ? true : false}
            label={label}
            id={label}
            type={type}
            readOnly={onlyRead}
            maxLength={maxLength}
            onBlur={(e) => handleInputChange(e)}
            ref={inputRef}
            className={`${className ? className : "custom-input "}`}
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

export default TextInputComponent;

