import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface IRadioButtonProps {
  label: string;
  control: any;
  name: string;
  options: string[];
  data?: any;
  error?: any;
  horizontal?: boolean;
  inputRef?: any;
  onChange?: (value: any) => void;
  readOnly?: boolean;
  tabIndex?: number;
  isOT?:boolean;
}

const RadioButtonComponent: React.FC<IRadioButtonProps> = ({
  control,
  name,
  options,
  data,
  error,
  label,
  horizontal,
  inputRef,
  onChange,
  readOnly,
  tabIndex,
  isOT
}) => {


  const [value,setValue] = useState<any>(data);



  useEffect(() => {
    if(data){
      if(name === 'resolucion_garantia_id'){
        setValue(data)
      }else{
        setValue(data)

      }
    }
  }, [data]);


  return (
    <div
      className={`w-full px-8 py-0 mt-2 relative mx-2 border-[1px] radioComponent flex   ${
        horizontal ? "justify-arround ml-1 !h-[3rem] " : "flex-col justify-between"
      } rounded-lg ${error && "border border-red-400"}`}
    >
      <label className={`absolute z-20   bg-[${isOT ? '#424769' : '#676f9d'}] ${isOT ? "!w-[4rem] text-base top-[-0.9rem]" : "!w-auto text-left top-[-1.2rem]"}  left-[1rem] labelInput  `}>
        <span className="ml-[2px] text-[16px] text-left ">{label}</span>
      </label>
      {options.map((option, index) => (
        <div className={` ${horizontal ? "  w-full" : "w-full "} py-0 flex textOption `} key={index}>
          <Controller
            key={index}
            name={name}
            control={control}
            defaultValue={value}
            render={({ field }) => (
              <label className="flex items-center cursor-pointer ">
                <input
                  {...field}
                  type="radio"
                  value={value}
                  tabIndex={tabIndex || 1}
                  disabled={readOnly}
                  checked={value === option}
                  className={`mr-2 transform scale-150 ${field.value === option ? 'text-orange-500' : 'text-gray-500'}`}
                  onChange={() => {
                    // console.log(value)
                    // console.log(option)
                    if (value !== option) {
                      setValue(option);
                      field.onChange(option);
                    }
                    if (typeof onChange === 'function') {
                      onChange({name:label, value:option});
                    }
                  }}
                  ref={inputRef}
                />
                <p className="text-[16px] w-full ">{option}</p>
              </label>
            )}
          />
        </div>
      ))}
      {error && (
        <p className={`relative  labelErr ${horizontal ? "top-[0] align-center" : "top-[-5.7rem] text-base text-center right-[-2rem]"}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioButtonComponent;
