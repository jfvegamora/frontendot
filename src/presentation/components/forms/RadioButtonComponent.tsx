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
}) => {


  const [value,setValue] = useState<any>();



  useEffect(() => {
    if(data){
      setValue(data)
    }
  }, [data]);



  return (
    <div
      className={`w-full px-8 py-0 mt-2 relative mx-2 border-[1px] radioComponent flex   ${
        horizontal ? "justify-arround ml-1 !h-[3rem] " : "flex-col justify-between"
      } rounded-lg ${error && "border border-red-400"}`}
    >
      <label className="absolute z-20 text-base top-[-21px] left-[1rem] labelInput w-[6rem]">
        <span className="ml-[2px] text-[16px]">{label}</span>
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
                  onChange={(e) => {
                    console.log(option)
                    field.onChange(option);
                    if (onChange) {
                      onChange(e.target);
                    }
                    setValue(option)
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
        <p className={`relative  labelErr ${horizontal ? "top-[0] right-[-4rem]" : "top-[-6rem] right-[-2rem]"}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioButtonComponent;
