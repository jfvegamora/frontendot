/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IconButton, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import { useCrud, useEntityUtils } from "../../hooks";
// import Select from "react-select";

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
  customWidth?: any;
  setState?: any;
  isOT?:boolean;
  tabIndex?: number;
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
    readOnly,
    setState,
    isOT,
    tabIndex
  }) => {
    const [refreshToggle, setrefreshToggle] = useState(false);
    const [entities, setEntities] = useState([]);
    const [strSelectedName, setStrSelectedName] = useState(data || undefined);
    const strUrl = entidad && entidad[0];
    const strTableName = entidad[3] ? `_p3=${entidad[2]}` : entidad[2] ? `_p1=${entidad[2]}` : "";
    const inputRef = useRef(null);
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

    const renderInput = () => (
      <Controller
          name={name}
          control={control}
          defaultValue={strSelectedName}
          render={({ field }) => (
            <div className={`custom-select rounded-lg !h-[3rem]  absolute${error ? 'border-red-500' : 'border-gray-500'}  `}>
              <div className=" top-[-18%]  left-3.5 absolute w-1/2 z-10">
                <label
                  htmlFor={label}
                  // className="absolute top-[-1%] left-[3%] text-sm"
                  className="labelSelect relative"
                >
                  {label}
                </label>
                {error && (
                  <p className="text-xs text-red-500 relative top-[-10%] z-20  left-[30%] ">
                    {error.message}
                 </p>
                )}
              </div>

              <select
                {...field}
                ref={inputRef}
                disabled={readOnly}
                tabIndex  ={tabIndex || 1}
                
                onChange={(e) => {
                  setState && setState(e.target.value);
                  field.onChange(e);
                  if(isOT){
                    handleSelectChange &&  handleSelectChange(e.target)
                  }
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
                className="custom-input py-2 px-3 w-[85%] cursor-pointer z-0"
              >
                {!data && (
                  <option value={"0"} className="text-sm">
                    {label}
                  </option>
                )}
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
            </div> 
          )}
        />
    )

    useEffect(() => {
      setStrSelectedName(data);
      renderInput()
      // console.log('data', data)
    }, [data]);

    return (
      // <div className="flex min-w-[60px] w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
      <div className="flex min-w-[100%] w-full items-center mx-4 mt-select mt-select-dropdown-up cursor-pointer">
        {/* <label className="label-input w-1/3">{label}</label> */}
        {renderInput()}
        {/* Controller  */}
        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => setrefreshToggle((prev) => !prev)}
              variant="text"
              className="mx2 iconRefresh"
              tabIndex={-1}
            >
              <FiRefreshCw className="h-6 w-6" />
            </IconButton>
          </Tooltip>
        )}
        
      </div>
    );
  }
);

export default SelectInputComponent;
