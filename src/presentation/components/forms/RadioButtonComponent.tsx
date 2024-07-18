import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface IRadioButtonProps {
  label: string;
  control?: any;
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
  labelProps?:any
  customWidth?:any
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
  customWidth,
  labelProps,
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

  console.log(isOT)
  return (
    <div
      className={` w-full px-8 py-0 mt-2 relative mx-2 border-[1px] radioComponent flex   ${
        horizontal ? `justify-arround ml-1 !h-[4rem] ${isOT ? "!w-[20vw]" : "!w-auto"} ` : "flex-col justify-between"
      } rounded-lg ${error && "border border-red-400"}`}
    >
      <label htmlFor={label} className={` ${labelProps ? labelProps : ""} absolute w-full !translate-y-[-0.4vw] translate-x-3`}>
                  {label}
      </label>
      {options.map((option, index) => (
        <div className={` ${horizontal ? "  w-full" : "w-full "} py-0 flex inputStyles textOption `} key={index}>
          <Controller
            key={index}
            name={name}
            control={control}
            defaultValue={value}
            render={({ field }) => (
              <label className="flex items-center cursor-pointer">
                <input
                  {...field}
                  type="radio"
                  value={value}
                  tabIndex={tabIndex || 1}
                  disabled={readOnly}
                  checked={value === option}
                  className={` pt-3 labelInput ${customWidth ?  customWidth :""} mr-2 transform scale-150 ${field.value === option ? 'text-orange-500' : 'text-gray-500'}`}
                  onChange={() => {
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
                <p className=" w-full labelInput0 pt-2 ">{option}</p>
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
