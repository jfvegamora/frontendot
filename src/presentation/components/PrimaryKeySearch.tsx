/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IconButton, Input, Tooltip } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import useCrud from "../hooks/useCrud";
import { SelectInputComponent } from ".";

interface IPrimaryKeyState {
  [key: string]: string | number;
}

interface PrimaryKeySearchProps {
  setEntities: any;
  setParams?: any;
  primaryKeyInputs: {
    label: string;
    type: string;
    name: string;
    options?: string[];
  }[];
  baseUrl: string;
  selectUrl?: any;
  updateParams: any;
}

const MemoizedMagnifyingGlassIcon = React.memo(() => (
  <MagnifyingGlassIcon className="primaryKeyIcon" />
));

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = React.memo(
  ({ setEntities, primaryKeyInputs, baseUrl, selectUrl, updateParams }) => {
    const { control, handleSubmit } = useForm<IPrimaryKeyState>();
    const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});
    const { ListEntity } = useCrud(baseUrl);

    // console.log("", inputValues);
    const handleInputChange = React.useCallback(
      (name: string, value: string) => {
        setInputValues((prev) => ({ ...prev, [name]: value }));
      },
      []
    );

    const handleSearch = React.useCallback(async (data: IPrimaryKeyState) => {
      // console.log("click");
      // const searchParams = Object.entries(data)
      //   .map(([key, value]) =>
      //     value ? `${key}=${encodeURIComponent(value)}` : ""
      //   )
      //   .filter((param) => param !== "")
      //   .join("&");
      const searchParams = Object.entries(data)
        .map(([key, value]) =>
          key === "_p1" || value ? `${key}=${encodeURIComponent(value)}` : ""
        )
        // .filter((param) => param !== "")
        .join("&");
      console.log("searchParams", searchParams);
      // console.log("data", data);
      // data && setParams(searchParams);
      data && updateParams([searchParams]);
      try {
        // const params = searchParams
        //   ? searchParams
        //       .split("&")
        //       .reduce((obj: Record<string, string>, param) => {
        //         const [key, value] = param.split("=");
        //         obj[key] = value;
        //         return obj;
        //       }, {})
        //   : {};
        // console.log("params", params);
        const response = await ListEntity(searchParams, "01");
        setEntities(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleSubmit(handleSearch)();
        }
      },
      [handleSubmit, handleSearch]
    );

    const handleBlur = React.useCallback(() => {
      handleSubmit(handleSearch)();
    }, []);

    const renderInputs = () => {
      return primaryKeyInputs.map((input, index) => (
        <Controller
          key={index}
          name={input.name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="mx-2">
              {input.type === "select" ? (
                <SelectInputComponent
                  label="Cargo"
                  name="_p2"
                  showRefresh={false}
                  control={control}
                  entidad={[selectUrl, "02"]}
                  inputName={input.name}
                  inputValues={inputValues}
                  setHandleSearch={handleSearch}
                />
              ) : // <select
              //   {...field}
              //   onChange={(e: any) => {
              //     field.onChange(e);
              //     const selectedValue = e.toString();
              //     if (selectedValue !== "") {
              //       handleSearch({ [input.name]: selectedValue });
              //     }
              //   }}
              //   // label={input.label}
              // >
              //   <option value={"0"}>{input.label}</option>{" "}
              //   {/* Opción vacía */}
              //   {entities.map((entity, index) => (
              //     <option
              //       key={index}
              //       value={
              //         entity[0] !== undefined ? entity[0].toString() : ""
              //       }
              //     >
              //       {entity[1]}
              //     </option>
              //   ))}
              // </select>
              input.type === "radiobuttons" ? (
                <div>
                  <label className="primaryKeyLabel">{input.label}</label>
                  <div className="primaryKeyRadioContainer">
                    {input.options?.map((entity, index) => (
                      <div key={index} className="primaryKeybtnRadioContainer">
                        <input
                          type="radio"
                          {...field}
                          value={entity}
                          checked={field.value === entity[0].toString()}
                          onChange={() => {
                            field.onChange(entity[0].toString());
                          }}
                        />
                        <span className="ml-1">{entity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : input.type === "date" ? (
                <div>
                  <label className="primaryKeyLabel">{input.label}</label>
                  <input
                    type="date"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    onBlur={handleBlur}
                  />
                </div>
              ) : (
                <Input
                  {...field}
                  label={input.label}
                  value={inputValues[input.name] || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(input.name, e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              )}
            </div>
          )}
        />
      ));
    };

    return (
      <form className="primaryKeyContainer">
        {renderInputs()}
        <Tooltip content="Buscar">
          <IconButton
            variant="text"
            className="primaryKeyIconButton"
            type="submit"
            onClick={handleSubmit(handleSearch)}
          >
            <MemoizedMagnifyingGlassIcon />
          </IconButton>
        </Tooltip>
      </form>
    );
  }
);

export default PrimaryKeySearch;
