/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";
// import debounce from "lodash/debounce"
import debounce from 'lodash/debounce'

interface ITextInputProps {
  label: string;
  name: string;
  defaultValue?: any;
  onlyRead?: boolean;
  type: string;
  control: any;
  data?: any;
  error?: any;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?:string;
  handleChange?: (data:any)=>void;
  maxLength?:number;
  step?:number;
  tabIndex?: number;
  isOT?:boolean;
  customWidth?: any;
  isOptional?:boolean;
  textAlign?: string;
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
  inputRef, // Modificación aquí
  className,
  maxLength,
  step,
  tabIndex,
  isOT,
  customWidth,
  isOptional,
  textAlign
}) => {
  // const [_defaultValue, setDefaultValue] = useState<any>(data && data || "")
  const [_defaultValue, setDefaultValue] = useState<any>(data || " "); // Inicializar defaultValue con el valor inicial
  // const inputRef = useRef<HTMLInputElement>(null);
  const[_render, setRender] = useState(false);

  const [value, setValue] = useState<any>(data || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      if(isOT){
        handleChange(e.target)
        setRender((prev)=>!prev)
      }else{
        handleChange(e.target.value)
        setRender((prev)=>!prev)
      }
    }   

    setValue(e.target.value)
    setRender((prev)=>!prev)

  };
  
  useEffect(()=>{
    if(data){
        setDefaultValue(data)
        setValue(data)
        setRender((prev)=>!prev)

    }
    setValue(data)
  },[data])

  const handleDebounceInputChange = debounce((newValue: any) => {
    handleInputChange(newValue); // Llama a la función original handleInputChange
  }, 200);

  // console.log(data)

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
            // color="red"
            // defaultValue={defaultValue}
            readOnly={onlyRead}
            maxLength={maxLength}
            onBlur={(e) => handleDebounceInputChange(e)}
            onChange={(e)=> {
                setValue(e.target.value)
                setRender((prev)=>!prev)
            }}
            
            ref={inputRef}
            className={`${className ? className : "custom-input"}  ${onlyRead ? "custom-onlyread cursor-not-allowed" : isOptional ? "custom-optional" : "custom-required"} ${textAlign && textAlign}`}
            tabIndex={onlyRead ? 0 : (tabIndex || 1)}
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

