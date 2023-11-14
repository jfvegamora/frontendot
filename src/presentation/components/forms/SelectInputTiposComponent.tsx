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
import axios from "axios";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { updateDataForKey } from "../../../redux/slices/ListBoxTipoSlice";
// import Select from "react-select";

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


    

    const store = useAppSelector((store: AppStore) => store.listBoxTipos);
    const stateListBox = useAppSelector((store: AppStore) => store.listBoxTipos[entidad]);
    const dispatch = useAppDispatch()
    // const stateListBox = useAppSelector((store: AppStore) => (store.listBoxTipos as any)[entidad || ""]);

    
    // const stateListBox = useAppSelector((store: AppStore) => store.listBoxTipos![entidad]);
    console.log(store)
    console.log(entidad)
    // console.log(ox)



    

    const [refreshToggle, setrefreshToggle] = useState(false);
    const [entities, setEntities] = useState(stateListBox|| []);
    const [strSelectedName, setStrSelectedName] = useState(data || undefined);
    // const strUrl = entidad && entidad[0];
    const inputRef = useRef(null);
    // console.log(entities)

    useEffect(()=>{
      if(stateListBox && stateListBox?.length < 1 || stateListBox === null || stateListBox === undefined){
        console.log('no data')
        axios(`https://mtoopticos.cl/api/tipos/listado/?query=02&_p1=${entidad}`)
        .then((data:any)=>{
          setEntities(data.data)
          dispatch(updateDataForKey({entidad, data}))
        })
        .catch((error)=>console.log(error))
      }
    },[])
    // console.log(entidad)
    // console.log(strUrl)
    // console.log(strTableName)

    // const fetchData = async() => {
    //   const url = `https://mtoopticos.cl${strUrl}listado/?query=${entidad[1]}&${strTableName}`
    //   console.log(url)
    //   try {
    //     const {data} = await axios(`https://mtoopticos.cl${strUrl}listado/?query=${entidad[1]}&${strTableName}`)
    //     console.log(data)
    //     setEntities(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // console.log(data)
    // useEffect(() => {
    // //   fetchData()
    //   if (data) {
    //     const name =
    //       data && entities.find((entity: any) => entity[0] === data)?.[1];
    //     // console.log("name", entities);
    //     setStrSelectedName(name);
    //   }
    // }, [refreshToggle, data]);

    
    // console.log(strSelectedName);
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
                  setrefreshToggle((prev) => !prev);
                }}
                className="custom-input py-2 px-3 w-[85%] cursor-pointer z-0"
              >
                {!data && (
                  <option value={"0"} className="text-sm">
                    {label}
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
      setStrSelectedName(data);
      renderInput()
      // console.log('data', data)
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
              onClick={() => setrefreshToggle((prev) => !prev)}
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
