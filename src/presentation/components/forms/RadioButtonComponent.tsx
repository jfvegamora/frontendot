/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
  readOnly?:boolean;
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
  tabIndex
}) => {
  

  return (
    <div
      className={`px-8 py-0 mt-2 mx-2 border-[1px] radioComponent flex   ${
        horizontal ? "justify-arround ml-1 !h-[3rem] " : "flex-col justify-between"
      } rounded-lg ${error && "border border-red-400"}`}
    >
      <label className="relative text-base top-[-22px] left-[-1rem] labelInput w-[6rem]">
        <span className="ml-[2px] text-[16px]">{label}</span>
      </label>
      {options.map((option, index) => (
        <div
          className={` ${ horizontal ? " bg-blue-400 w-full" : "px-[3rem]"} py-0 flex w-1 textOption `}
          key={index}
        >
          <Controller
            key={index}
            name={name}
            control={control}
            defaultValue={data ? data : ""}
            render={({ field }) => (
              <label className=" flex items-center cursor-pointer ">
                <input
                  {...field}
                  type="radio"
                  value={option}
                  tabIndex  ={tabIndex || 1}
                  disabled={readOnly}
                  defaultChecked={data === option}
                  //  checked={field.value === option}
                  className={`mr-2 transform scale-150 ${field.value === option ? 'text-orange-500' : 'text-gray-500'}`}
                  onChange={(e) => {
                      field.onChange(e.target.value)
                      if(onChange){
                        onChange(e.target)
                      }
                  }}
                  ref={inputRef}
                  />
                <p className="text-[16px] w-full ">{option}</p>
                {/* <Radio name="type" label="HTML" color="blue"/> */}
              </label>
            )}
          />
        </div>
      ))}
      {error && (
        // <p className="text-xs text-red-500 absolute top-[-6%] right-[20%]">
        <p className={`relative  labelErr ${horizontal ? "top-[0] right-[-4rem]" : "top-[-6rem] right-[-2rem]"}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioButtonComponent;
