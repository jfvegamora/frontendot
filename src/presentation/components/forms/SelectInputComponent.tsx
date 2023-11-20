/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//@ts-nocheck

import { IconButton, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import { useCrud, useEntityUtils } from "../../hooks";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import axios from "axios";
import { setDataListbox } from "../../../redux/slices/listBoxSlice";
import { URLBackend } from "../../hooks/useCrud";
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
    const dispatch = useAppDispatch()
    const [entities, setEntities] = useState([]);
    const [strSelectedName, setStrSelectedName] = useState(data || undefined);
    const strUrl = entidad && entidad[0];
    const strTableName = entidad[2] && `_p1=${entidad[2]}`
    const inputRef = useRef(null);
    const { ListEntity } = useCrud(strUrl);
    // console.log(strUrl)
    // console.log(strTableName)
    
    // console.log(entidad)
    // if(strTableName){
    //   console.log(strTableName)
    // }

    const strUrl2 = strTableName ? `${URLBackend}${entidad[0]}listado/?query=${entidad[1]}&${strTableName}`
                                 : `${URLBackend}${entidad[0]}listado/?query=${entidad[1]}`;


    // console.log(strUrl2)
    
    const state = useAppSelector((store: AppStore) => store.listBox);
    // console.log(state)
    
    
    // console.log(strUrl2)
    
    const fetchSelectData =async()=>{
      const {data} = await axios(strUrl2)
      const payload = {
        [label]:data
      }
      dispatch(setDataListbox(payload))
      setEntities(data)
    }


    // console.log(label)
    // console.log(state)
    //  if(refreshToggle){
    //   // console.log('refresh')
    //   fetchSelectData()
    //  }
    
    React.useEffect(()=>{
      if(!state.hasOwnProperty(label)){
        console.log('no se encuentra')
        fetchSelectData()
      }else{
        // console.log('si se encuentra')
        setEntities(state[label])
      }

    },[state, label])

   React.useEffect(()=>{
     if(strTableName){
        // console.log(strTableName)
        fetchSelectData()
      }
    },[])
    // console.log(refreshToggle)

    // console.log('render')
    const { refreshData } = useEntityUtils(strUrl, entidad[1]);

    const renderInput = () => (
      <Controller
          name={name}
          control={control}
          defaultValue={strSelectedName}
          render={({ field }) => (
            <div className={`custom-select border-gray-400 border-[1px] rounded-lg !h-[3rem]  absolute${error ? 'border-red-500' : 'border-gray-500'}  `}>
              <div className=" top-[-18%]   left-3.5 absolute w-1/2 z-10">
                <label
                  htmlFor={label}
                  // className="absolute top-[-1%] left-[3%] text-sm"
                  className="labelSelect relative"
                >
                  {label}
                </label>
                {error && (
                  <p className="text-xs text-red-500  absolute top-[.5rem] z-20  left-[38%] ">
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
                    const selectedValue = e.target.value.toString();;
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
      // setStrSelectedName(data);
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
              onClick={() => fetchSelectData()}
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
