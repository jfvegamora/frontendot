/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
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
    selectUrl?: any;
    values?: any;
    tipos?: string;
  }[];
  baseUrl: string;
  updateParams: any;
}

const MemoizedMagnifyingGlassIcon = React.memo(() => (
  <MagnifyingGlassIcon className="primaryKeyIcon" />
));

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = React.memo(
  ({ setEntities, primaryKeyInputs, baseUrl, updateParams }) => {
    const { control, handleSubmit } = useForm<IPrimaryKeyState>();
    const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});
    const { ListEntity } = useCrud(baseUrl);

    const handleInputChange = React.useCallback(
      (name: string, value: string) => {
        setInputValues((prev) => ({ ...prev, [name]: value }));
      },
      []
    );

    const handleSelectChange = React.useCallback(
      (name: string, value: string) => {
        setInputValues((prev) => ({ ...prev, [name]: value }));
        updateParams({
          ...inputValues,
          [name]: value,
        });
      },
      [inputValues, updateParams]
    );

    const handleSearch = React.useCallback(async (data: IPrimaryKeyState) => {
      // console.log("data:", data);

      const searchParams = Object.entries(data)
        .map(([key, value]) =>
          key === "_p1" || value ? `${key}=${encodeURIComponent(value)}` : ""
        )
        .filter((param) => param !== "")
        .join("&");
      console.log("searchParams", searchParams);
      data && updateParams([searchParams]);
      try {
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
    // console.log(primaryKeyInputs.length);

    const renderInputs = () => {
      const inputGroups = [];
      for (let i = 0; i < primaryKeyInputs.length; i += 6) {
        inputGroups.push(primaryKeyInputs.slice(i, i + 6));
      }

      return inputGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={
            primaryKeyInputs.length > 5 ? `flex flex-wrap mb-4` : "flex mb-4"
          }
        >
          {group.map((input, inputIndex) => (
            <Controller
              key={inputIndex}
              name={input.name}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="mx-2 mb-4">
                  {input.type === "select" ? (
                    <div className={`w-[15rem]`}>
                      <SelectInputComponent
                        label={input.label}
                        name={input.name}
                        showRefresh={false}
                        control={control}
                        entidad={
                          input.tipos
                            ? [input.selectUrl, "02", input.tipos]
                            : [input.selectUrl, "02"]
                        }
                        inputName={input.name}
                        inputValues={inputValues}
                        setHandleSearch={handleSearch}
                        handleSelectChange={handleSelectChange}
                        customWidth={"200px"}
                      />
                    </div>
                  ) : input.type === "radiobuttons" ? (
                    <div className="relative px-8 py-4 w-[92%] mt-2 mx-auto border-[0.5px] border-[dodgerblue] rounded-md flex">
                      <label className="absolute text-sm top-[-10px] left-4 bg-[ghostwhite] w-[6rem]">
                        <span className="ml-[20px] text-[16px]">
                          {input.label}
                        </span>
                      </label>
                      <div className="primaryKeyRadioContainer">
                        {input.options?.map((entity, index) => (
                          <div
                            key={index}
                            className="primaryKeybtnRadioContainer"
                          >
                            <input
                              type="radio"
                              {...field}
                              value={input.values[entity]}
                              onChange={(e) => {
                                field.onChange(e.target.value);
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
                      color="orange"
                      {...field}
                      label={input.label}
                      value={inputValues[input.name] || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(input.name, e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                      onBlur={handleBlur}
                      labelProps={{
                        style: {
                          color: "grey",
                          fontWeight: "normal",
                          fontSize: "16px",
                        },
                      }}
                    />
                  )}
                </div>
              )}
            />
          ))}
        </div>
      ));
    };

    useEffect(() => {
      // Crea un objeto con los parámetros de búsqueda
      const searchParams = {
        _p1: inputValues._p1 || "",
        _p2: inputValues._p2 || "",
        _p3: inputValues._p3 || "",
        _p4: inputValues._p4 || "",
        _pMarca: inputValues._pMarca || "",
        _pProveedor: inputValues._pProveedor || "",
      };

      // Llama a la función de actualización de parámetros pasándole el objeto
      updateParams(searchParams);
    }, [inputValues]);

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
