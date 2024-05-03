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
import { clearSelectInput, punto_venta } from "../../utils";

import { retry } from 'async';
import { resetFilters } from "../PrimaryKeySearch";
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
  className?:string;
  readOnly?: boolean;
  customWidth?: any;
  setState?: any;
  isOT?:boolean;
  tabIndex?: number;
  isFOTcristales?:boolean;
  isOptional?:boolean;
  onlyFirstOption?:boolean
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
    className,
    readOnly,
    setState,
    isOT,
    tabIndex,
    customWidth,
    isFOTcristales,
    isOptional,
    onlyFirstOption
  }) => {
    const dispatch = useAppDispatch()
    const [entities, setEntities] = useState([]);
    const [strSelectedName, setStrSelectedName] = useState(data || undefined);
    const strUrl = entidad && entidad[0];
    const strTableName = entidad[3] ? entidad[2] && `_p1=${entidad[2]}&${entidad[3]}`: entidad[2] && `_p1=${entidad[2]}`
    const inputRef = useRef(null);
    const { ListEntity } = useCrud(strUrl);
    const cleanFilters = {};
    const { refreshData } = useEntityUtils(strUrl, entidad[1]);
    const {token} = useAppSelector((store: AppStore) => store.user);



    const _p1 =  entidad[2] && `_p1=${entidad[2]}`   

    const strUrl2 = strTableName ? `${URLBackend}${entidad[0]}listado/?query=${entidad[1]}&${strTableName}`
                                 : `${URLBackend}${entidad[0]}listado/?query=${entidad[1]}`;



    // caonsole.log(strUrl2)
    
    const state = useAppSelector((store: AppStore) => store.listBox);
    

    const fetchSelectData =async()=>{
      const {data} = await axios(strUrl2,{
        headers: {
           'Authorization': token, 
         }
   })
      if(label === 'Punto de Venta'){
        console.log(data)
        if(data && data[0]){
          console.log(data[0][0])
          punto_venta.value = data[0][0]
        }
      }
      const payload = {
        [label]:data
      }
      dispatch(setDataListbox(payload))
      setEntities(data)
      
    }


    React.useEffect(()=>{
      if(!state.hasOwnProperty(label)){
        // console.log('no se encuentra')
        fetchSelectData()
      }else{
        // console.log('si se encuentra')
        setEntities(state[label])
      }

    },[state, label])

   React.useEffect(()=>{
        // console.log(strTableName)
        fetchSelectData()
        // console.log('cambio')
    },[strUrl2])


    React.useEffect(()=>{
      setStrSelectedName(data)
    },[data])

    React.useEffect(()=>{
      if(resetFilters.value === true){
          setStrSelectedName('')
        }
   },[resetFilters.value])


   if(name === 'proyecto'){
    console.log(strSelectedName)
   }


    const renderInput = () => (
      <Controller
          name={name}
          control={control}
          defaultValue={strSelectedName}
          render={({ field }) => (
            <div className={`custom-select border-[1px] rounded-lg !h-[3rem] relative ${error ? 'border-red-500' : 'border-[#f8b179]'}  `}>
              <div className="top-[-0.1rem]    left-3.5 absolute w-1/2 z-10">
                <label htmlFor={label} className=" relative">
                  {label}
                </label>
                {error && (
                  <p className="absolute z-20 top-[0.1rem] right-1 labelErr">
                    {error.message}
                 </p>
                )}
              </div>

              <select
                {...field}
                ref={inputRef ? inputRef : null}
                disabled={readOnly}
                tabIndex  ={tabIndex || 1}
                value={strSelectedName}
                onChange={(e) => {
                  setStrSelectedName(e.target.value)
                  setState && setState(e.target.value);
                  field.onChange(e);
                  if(isOT){
                    handleSelectChange &&  handleSelectChange(e.target)
                  }
                  if (setHandleSearch) {
                    const selectedValue = e.target.value.toString();
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
                style={{}}
                // className={`${className ? className : "custom-input py-2  cursor-pointer z-0"}  ${readOnly ? "custom-onlyread" : isOptional ? "custom-optional" : "custom-required"}`}>
                className={`${className ? className : "custom-input py-2  cursor-pointer z-0"} ${readOnly ? "custom-onlyread" : isOptional ? "custom-optional-with-color" : "custom-required"}`}>

                 {/* className={`${className ? className : "custom-input py-2  cursor-pointer z-0"}  ${readOnly ? "custom-onlyread" : ""} ${isOptional ? "custom-optional" : "custom-required" } `}>  */}

                  {!onlyFirstOption &&(
                    <option value={undefined} className="text-sm">
                      
                    </option>
                  )}
              
                {/* {!data && (
                  <option value={undefined} className="text-sm">
                    
                  </option>
                )} */}
                {entities &&
                  entities.map((option: any, index) => (
                    <option
                      key={index}
                      value={ isFOTcristales ? (  clearSelectInput.value ?  "" : (option[0] !== undefined ? option[0].toString() : "") )  :  (option[0] !== undefined ? option[0].toString() : "") }
                    >
                      { clearSelectInput.value && isFOTcristales === true ? (
                        <option value={0}> </option>
                      ) :  option[1]}
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
      // <div className="flex min-w-[100%] w-full items-center mx-4 mt-select mt-select-dropdown-up cursor-pointer">
      <div className={`flex items-center mt-select mt-select-dropdown-up cursor-pointer ${customWidth ? customWidth : "w-[19.2rem]"}`}>
        {/* <label className="label-input w-1/3">{label}</label> */}
        {renderInput()}
        {/* Controller  */}
        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => fetchSelectData()}
              variant="text"
              className={`mx2  ${readOnly ? "left-[-40px] !text-black hover:!text-[#f8b179]" : "iconRefresh"}`}
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
