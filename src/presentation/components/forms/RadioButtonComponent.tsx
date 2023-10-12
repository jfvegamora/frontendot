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
  onChange
}) => {
  

  return (
    <div
      className={`relative px-8 h-[90%] py-4 w-[90%]  mt-2 mx-auto border-[0.5px] border-[dodgerblue] flex ${
        horizontal ? "justify-arround ml-4" : "flex-col justify-between"
      } rounded-lg ${error && "border border-red-400"}`}
    >
      <label className="absolute text-sm top-[-10px] left-4  labelForm w-[6rem]">
        <span className="ml-[20px] text-[16px]">{label}</span>
      </label>
      {options.map((option, index) => (
        <div
          className={`${
            horizontal ? "px-20" : "px-[3rem]"
          } py-2 flex w-1/3 text-center justify-between`}
          key={index}
        >
          <Controller
            key={index}
            name={name}
            control={control}
            defaultValue={data ? data : ""}
            render={({ field }) => (
              <label className=" flex items-center cursor-pointer ml-[-3.6rem]">
                <input
                  {...field}
                  type="radio"
                  value={option}
                  defaultChecked={data === option}
                  //  checked={field.value === option}
                  className="mr-2 transform scale-150"
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    if(onChange){
                      onChange(e.target)
                    }
                  }}
                  ref       ={inputRef}
                  />
                <p className="text-[16px] w-[68px]">{option}</p>
              </label>
            )}
          />
        </div>
      ))}
      {error && (
        <p className="text-xs text-red-500 absolute top-[-6%] right-[20%]">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioButtonComponent;
