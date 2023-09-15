/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";

interface ITextInputProps {
  label: string;
  name: string;
  defaultValue?: string;
  onlyRead?: boolean;
  type: string;
  control: any;
  data?: any;
  error?: any;
  inputRef?: any;
  className?:string;
}
//width:100%
//max-width padre 
const TextInputComponent: React.FC<ITextInputProps> = ({
  label,
  type,
  control,
  name,
  onlyRead,
  data,
  error,
  inputRef,
  className
}) => {
  return (
<div
  className={`${"flex items-center mb-4 mx-4  rounded-xl "} ${
    error && "border-red-400"
  }`}
>
  <Controller
    name={name}
    control={control}
    defaultValue={data ? data : ""}
    render={({ field }) => (
      <div className="flex flex-col w-full"> {/* Utiliza flex para permitir el flujo de contenido */}
        {/* <label
          htmlFor={label}
          style={{
            color          : "grey",
            fontWeight     : "normal",
            fontSize       : "16px",
            backgroundColor: "transparent",
          }}
        >
          {label}
        </label> */}
        <Input
          {...field}
          label     ={label}
          color     ="orange"
          id        ={label}
          type      ={type}
          readOnly  ={onlyRead}
          ref       ={inputRef}
          className ={`${className ? className : "custom-input py-2 px-3 "}`}
          // className={`${className ? className : "custom-input py-2 px-3"}`}
        />
      </div>
    )}
  />
  {error && (
    <p className="text-xs text-red-500 absolute right-20">
      {error.message}
    </p>
  )}
</div>
    // <div
    //   className={`${className ? className : "flex  bg-red-500 items-center mb-4 mx-4 border rounded-xl"} ${
    //     error && "border-red-400"
    //   }`}
    // >
    //   <Controller
    //     name          ={name}
    //     control       ={control}
    //     defaultValue  ={data ? data : ""}
    //     render        ={({ field }) => (
    //       <Input
    //         {...field}
    //         color     ="orange"
    //         label     ={label}
    //         id        ={label}
    //         type      ={type}
    //         readOnly  ={onlyRead}
    //         ref       ={inputRef}
    //         className ={`${className ? className : "custom-input py-2 px-3 w-1/2"}`}
    //         labelProps={{
    //           style: {
    //             color     : "grey",
    //             fontWeight: "normal",
    //             fontSize  : "16px",
    //           },
    //         }}
    //       />
    //     )}
    //   />
    //   {error && (
    //     <p className="text-xs text-red-500 absolute right-20">
    //       {error.message}
    //     </p>
    //   )}
    // </div>
  );
};

export default TextInputComponent;
