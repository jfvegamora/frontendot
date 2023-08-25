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
}

const RadioButtonComponent: React.FC<IRadioButtonProps> = ({
  label,
  control,
  name,
  options,
  data,
  error,
}) => {
  console.log("error", error);
  return (
    <div
      className={`px-6 py-2 w-[90%] mx-auto flex flex-col justify-between rounded-lg  ${error && "border border-red-400"
        } `}
    >
      <label className=" label-input w-[10%]">{label}</label>
      {options.map((option, index) => (
        <div
          className="px-8 py-2 flex w-1/3 text-center justify-between"
          key={index}
        >
          <Controller
            key={index}
            name={name}
            control={control}
            defaultValue={data ? data : ""}
            render={({ field }) => (
              <input
                {...field}
                type="radio"
                value={option}
                defaultChecked={data === option}
                //  checked={field.value === option}
                className="mr-2"
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <label className="text-sm">{option}</label>
        </div>
      ))}
      {error && (
        <p className="text-xs text-red-500 absolute right-20">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioButtonComponent;
