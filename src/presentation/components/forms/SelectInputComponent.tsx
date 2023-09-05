/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IconButton, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import { useCrud, useEntityUtils } from "../../hooks";

interface ISelectInputProps {
  label: string;
  control: any;
  name: string;
  showRefresh?: boolean;
  data?: any;
  onChange?: (value: string) => void;
  setHandleSearch?: (value: any) => void;
  handleSelectChange?: any;
  inputName?: any;
  error?: any;
  entidad: string[];
  inputValues?: any;
  inputRef?: any;
  readOnly?: boolean;
}

const SelectInputComponent: React.FC<ISelectInputProps> = React.memo(
  ({
    label,
    control,
    name,
    showRefresh,
    data,
    error,
    entidad,
    setHandleSearch,
    inputValues,
    handleSelectChange,
    inputRef,
    readOnly,
  }) => {
    const [refreshToggle, setrefreshToggle] = useState(false);
    const [entities, setEntities] = useState([]);
    const [strSelectedName, setStrSelectedName] = useState(data);
    const strUrl = entidad && entidad[0];
    const strTableName = entidad[2] ? `_p1=${entidad[2]}` : "";

    const { ListEntity } = useCrud(strUrl);

    const { refreshData } = useEntityUtils(strUrl, entidad[1]);

    useEffect(() => {
      refreshData();
      if (data) {
        const name =
          data && entities.find((entity: any) => entity[0] === data)?.[1];
        setStrSelectedName(name);
      }
      ListEntity(strTableName, entidad[1])
        .then((data: any) => {
          if (data?.name === "AxiosError") {
            return;
          } else {
            data && setEntities(data);
          }
        })
        .catch((e) => console.log(e));
    }, [refreshToggle, refreshData, data]);

    return (
      <div className="flex w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
        {/* <label className="label-input w-1/3">{label}</label> */}
        <Controller
          name={name}
          control={control}
          defaultValue={strSelectedName}
          render={({ field }) => (
            <>
              <select
                {...field}
                ref={inputRef}
                disabled={readOnly}
                // value={selectedIndex}
                onChange={(e) => {
                  field.onChange(e);
                  if (setHandleSearch) {
                    const selectedValue = e.target.value.toString();
                    console.log("name", name);
                    console.log("selectedValue", selectedValue);
                    handleSelectChange(name, selectedValue);
                    const inputValuesToUpdate = {
                      ...inputValues,
                      [name]: selectedValue,
                    };

                    if (setHandleSearch) {
                      setHandleSearch(inputValuesToUpdate);
                    }
                  }
                  setrefreshToggle((prev) => !prev);
                }}
                className="custom-input py-2 px-3 w-[85%] cursor-pointer"
              >
                {!data && <option value={"0"}>{label}</option>}
                {entities &&
                  entities.map((option: any, index) => (
                    <option
                      key={index}
                      value={
                        option[0] !== undefined ? option[0].toString() : ""
                      }
                    >
                      {option[1]}
                    </option>
                  ))}
              </select>
              <div className="relative">
                <GoTriangleDown className="absolute right-3 top-[-10px] w-5 h-5" />
              </div>
            </>
          )}
        />

        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => setrefreshToggle((prev) => !prev)}
              variant="text"
              color="blue-gray"
              className="mx2"
            >
              <FiRefreshCw className="h-6 w-6" />
            </IconButton>
          </Tooltip>
        )}

        {error && (
          <p className="text-xs text-red-500 absolute right-20">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

export default SelectInputComponent;
