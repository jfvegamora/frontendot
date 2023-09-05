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
      console.log("data:", data);
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
                  label={input.label}
                  name={input.name}
                  showRefresh={false}
                  control={control}
                  entidad={[input.selectUrl, "02"]}
                  inputName={input.name}
                  inputValues={inputValues}
                  setHandleSearch={handleSearch}
                  handleSelectChange={handleSelectChange}
                  customWidth={"200px"}
                />
              ) : input.type === "radiobuttons" ? (
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
                      color: "grey", // Establece el color del label
                      fontWeight: "normal", // Establece la negrita del label
                      fontSize: "16px", // Establece el tamaño de fuente del label
                    },
                  }}
                />
              )}
            </div>
          )}
        />
      ));
    };
    useEffect(() => {
      // Crea un objeto con los parámetros de búsqueda
      const searchParams = {
        _p1: inputValues._p1 || "",
        _p2: inputValues._p2 || "",
        _p3: inputValues._p3 || "",
        _p4: inputValues._p4 || "",
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
