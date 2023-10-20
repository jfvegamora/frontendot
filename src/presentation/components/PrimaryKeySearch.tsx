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
  description?: any;
}

const MemoizedMagnifyingGlassIcon = React.memo(() => (
  <MagnifyingGlassIcon className="primaryKeyIcon" />
));

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = React.memo(
  ({ setEntities, primaryKeyInputs, baseUrl, updateParams, description }) => {
    const { control, handleSubmit } = useForm<IPrimaryKeyState>();
    const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});
    const [cristalDescritpion, setCristalDescription] = useState(
      description || ""
    );
    const { ListEntity } = useCrud(baseUrl);
    // console.log("cristalDescritpion", cristalDescritpion[3]);
    
    useEffect(() => {
      // Actualiza el estado interno cuando la prop description cambia
      setCristalDescription(description || '');
    }, [description]);
    
    
    
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

    const handleSearch = React.useCallback(async (data: any) => {
      if ("_pCilindrico" in data || "_pEsferico" in data) {
        data = {
          ...data,
          _pCilindrico: data._pCilindrico.replace(/[,]/g, "."),
          _pEsferico: data._pEsferico.replace(/[,]/g, "."),
        };
      }

      // console.log('data search', data)
      
      if(primaryKeyInputs[1]){
        if(primaryKeyInputs[1]["type"] === "date" && primaryKeyInputs[2]["type"] === "date"){
          if(new Date(data["_p2"]) > new Date(data["_p3"])){
            alert('Fecha desde es mayor a la fecha Hasta')
            return null;
          }
        }
      }

      const searchParams = Object.entries(data)
        .map(([key, value]: any) =>
          key === "_p1" || value ? `${key}=${encodeURIComponent(value)}` : ""
        )
        .filter((param) => param !== "")
        .join("&");
      
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
            primaryKeyInputs.length > 5
              ? `grid grid-rows-3 w-[40vw] h-[40vh] grid-cols-2  items-center`
              : "flex mb-auto items-center  ml-[-2rem] "
          }
        >
          {group.map((input, inputIndex) => (
            <Controller
              key={inputIndex}
              name={input.name}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="w-full flex items-center">
                  {input.type === "select" ? (
                    <div className={`mt-2 mx-2 items-center mb-2 w-[14rem]`}>
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
                    <div className="relative px-8 items-center py-4 w-[92%]  mt-2 mx-auto border-[0.5px] border-[dodgerblue] rounded-md flex">
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
                    <div className="ml-6 w-full mx-2 items-center relative mt-2">
                      <label className="primaryKeyLabel items-center text-xs mt-1 absolute top-[-1rem]">{input.label}</label>
                      <input
                        type="date"
                        className="h-[2.5rem] w-full border border-black rounded"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        onBlur={handleBlur}
                      />
                    </div>
                  ) : (
                    <div className="w-full mx-4 items-center">
                      <Input
                        color="orange"
                        className=""
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
                    </div>
                  )}
                </div>
              )}
            />
          ))}
        </div>
      ));
    };

    useEffect(() => {
      const searchParams = {
        _p1: inputValues._p1 || "",
        _p2: inputValues._p2 || "",
        _p3: inputValues._p3 || "",
        _p4: inputValues._p4 || "",
        _pMarca: inputValues._pMarca || "",
        _pProveedor: inputValues._pProveedor || "",
        _pDiseño: inputValues._pDiseño || "",
        _pIndice: inputValues._pIndice || "",
        _pMaterial: inputValues._pMaterial || "",
        _pColor: inputValues._pColor || "",
        _pTratamiento: inputValues._pTratamiento || "",
        _pDiametro: inputValues._pDiametro || "",
        _pEsferico: inputValues._pEsferico || "",
        _pCilindrico: inputValues._pCilindrico || "",
        _id: inputValues._id || "",
      };

      updateParams(searchParams);
    }, [inputValues]);

    return (
      <form className="primaryKeyContainer items-center relative">
        {renderInputs()}
        <Tooltip content="Buscar">
          <IconButton
            variant="text"
            className="primaryKeyIconButton items-center ml-6"
            type="submit"
            onClick={handleSubmit(handleSearch)}
          >
            <MemoizedMagnifyingGlassIcon />
          </IconButton>
        </Tooltip>
        {description && (
          <input
            className="mx-8 w-[44rem] absolute bottom-[-2rem] left-[-4rem]"
            readOnly={true}
            type="text"
            defaultValue={cristalDescritpion && cristalDescritpion[3]}
          />
        )}
      </form>
    );
  }
);

export default PrimaryKeySearch;
