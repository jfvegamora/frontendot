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
}

const TextInputComponent: React.FC<ITextInputProps> = ({
  label,
  type,
  control,
  name,
  onlyRead,
  data,
  error,
}) => {
  return (
    <div
      className={`flex items-center mb-2 mx-4 border rounded-xl ${error && "border-red-400"
        }`}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={data ? data : ""}
        render={({ field }) => (
          <Input
            {...field}
            label={label}
            id={label}
            //  required={true}
            type={type}
            readOnly={onlyRead}
            className="border-none custom-input py-2 px-3 w-2/3"
          />
        )}
      />
      {error && (
        <p className="text-xs text-red-500 absolute right-20">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextInputComponent;
