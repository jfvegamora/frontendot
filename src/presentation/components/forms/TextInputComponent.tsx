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
  defaultValue:formatvalue
}) => {
  const [defaultValue, setDefaultValue] = useState<string>(data || "")
  const [value, setValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    // console.log(e.target.name)
    if (handleChange) {
      if(e.target.name === formatvalue){
        e.target.value = '20.00'
      }

      handleChange(e.target);
    }
  
  
  
  };
 
  
  useEffect(()=>{
    setDefaultValue(data)
  },[data])


  // console.log(daa)
  // console.log(data)
return (
  <div
  className={`${"flex items-center mb-4 mx-4  relative rounded-xl "}`}
  >
  <Controller
    name={name}
    control={control}
    // defaultValue={data ? data : ""}
    defaultValue={data}
    render={({ field }) => (
      <div className="flex flex-col  w-full">
        <Input
          {...field}
          error = {error ? true : false }
          label     ={label}
          color     ="orange"
          id        ={label}
          type      ={type}
          step      ={0.01}
          readOnly  ={onlyRead}
          step      ={0.01}
          onBlur    ={(e)=>handleInputChange(e)}
          ref       ={inputRef}
          className ={`${className ? className : " custom-input py-2 px-3 "}`}
          // className={`${className ? className : "custom-input py-2 px-3"}`}
        />
      </div>
    )}
  />
  {error && (
    <p className="text-xs text-red-500 absolute top-0 left-0">
      {error.message}
    </p>
  )}
</div>
  );
};

export default TextInputComponent;

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