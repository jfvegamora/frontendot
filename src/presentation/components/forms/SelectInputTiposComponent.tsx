/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IconButton, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import { AppStore, useAppSelector } from "../../../redux/store";

interface ISelectInputProps {
  label: string;
  control?: any;
  name: string;
  showRefresh?: boolean;
  data?: any;
  onChange?: (value: string) => void;
  setHandleSearch?: (value: any) => void;
  handleSelectChange?: any;
  inputName?: any;
  error?: any;
  entidad: string;
  inputValues?: any;
  inputRef?: any;
  readOnly?: boolean;
  customWidth?: any;
  setState?: any;
  isOT?:boolean;
  tabIndex?: number;
}


const SelectInputTiposComponent: React.FC<ISelectInputProps> = React.memo(
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
    const stateListBox = useAppSelector((store: AppStore) => store.listBoxTipos[entidad]);
    const [entities, setEntities] = useState(stateListBox|| []);
    const [strSelectedName, _setStrSelectedName] = useState(data || undefined);
    const inputRef = useRef(null);


    const fetchData = async () => {
      try {
        if (!stateListBox || stateListBox.length < 1) {
          const { data } = await axios(`https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=${entidad}`);
          // console.log(data);
          setEntities(data);
        }
      } catch (error) {
        console.log('FETCH-TIPOS', error);
        throw error;
      }
    }

    useEffect(() => {
      fetchData();
    }, [entidad, stateListBox]);
    

    

    const renderInput = () => (
      <Controller
          name={name}
          control={control}
          defaultValue={strSelectedName}
          render={({ field }) => (
            <div className={`custom-select border-gray-400 border-[1px] rounded-lg !h-[3rem]  absolute${error ? 'border-red-500' : 'border-gray-500'}  `}>
              <div className=" top-[-18%]  left-3.5 absolute w-1/2 z-10">
                <label
                  htmlFor={label}
                  // className="absolute top-[-1%] left-[3%] text-sm"
                  className="text-[11px] text-gray-600 top-0 relative"
                >
                  {label}
                </label>
                {error && (
                  <p className="text-xs text-red-500 absolute top-[.5rem] z-20  left-[38%] ">
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
                  field.onChange(e);
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
 
                }}
                className="custom-input py-2 px-3 w-[85%] cursor-pointer z-0"
              >
                {!data && (
                  <option value={undefined} className="text-sm">
                    
                  </option>
                )}
                {entities && entities.length > 1 &&
                  entities.map((option: any, index: React.Key | null | undefined) => (
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
      renderInput()

    }, [data]);

    return (
      // <div className="flex min-w-[60px] w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
      <div className="flex min-w-[100%] w-full items-center  mx-4 mt-select mt-select-dropdown-up cursor-pointer">
        {/* <label className="label-input w-1/3">{label}</label> */}
        {renderInput()}
        {/* Controller  */}
        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => fetchData()}
              variant="text"
              color="blue-gray"
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

export default SelectInputTiposComponent;
