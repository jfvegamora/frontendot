/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
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
  className?: string;
  handleChange?: (data: any) => void;
  maxLength?: number;
  step?: number;
  tabIndex?: number;
  isOT?: boolean;
  customWidth?: any;
  isOptional?: boolean;
  textAlign?: string;
  handleFocus?: any;
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
  maxLength,
  step,
  tabIndex,
  isOT,
  customWidth,
  isOptional,
  textAlign,
  handleFocus,
}) => {
  const defaultState =
    type === "number" && name === "valor_neto_armazon" ? 0 : "";

  const [defaultValue, setDefaultValue] = useState<any>(
    (data && data) || defaultState
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      if (isOT) {
        handleChange(e.target);
      } else {
        handleChange(e.target.value);
      }
    }
  };

  useEffect(() => {
    // console.log(data)
    setDefaultValue(data);
  }, [data]);

  if (label === "$ Total") {
    console.log(defaultValue);
  }
  if (label === "_folio") {
    console.log(className);
  }
  //
  // console.log(defaultValue)

  return (
    <div
      className={`mx-2 rounded-xl bg-gree-300 ${className ? className : ""}`}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div
            className={`  labelInput inputStyles relative ${
              error ? "border-red-500" : "border-[#f8b179]"
            }`}
          >
            <Input
              {...field}
              error={error ? true : false}
              label={label}
              id={label}
              type={type}
              color="orange"
              // defaultValue={defaultValue}
              readOnly={onlyRead}
              maxLength={maxLength}
              onFocus={handleFocus}
              onBlur={(e) => handleInputChange(e)}
              ref={inputRef}
              className={` ${customWidth ? customWidth : ""}  ${
                onlyRead
                  ? "custom-onlyread cursor-not-allowed"
                  : isOptional
                  ? "custom-optional"
                  : "custom-required"
              } ${textAlign && textAlign}`}
              tabIndex={onlyRead ? 0 : tabIndex || 1}
              placeholder={type === "date" ? "dd-mm-yyyy" : ""}
              autoComplete="off"
              step={step ? step : 1}
              labelProps={{
                style: {
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: "16px",
                  height: "8vh",
                },
              }}
            />
            {error && (
              <p
                // className={`${
                //   classNameError ? classNameError : "right-[50%]"
                // }  absolute top-0  labelErr`}
                className={`${
                  name === "dp2" ? "!right-0" : "right-[50%]"
                }  absolute top-0  labelErr`}
              >
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default TextInputComponent;
