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
import { URLBackend } from "../../hooks/useCrud";
import { clearSelectInput } from "../../utils";
import { changeFilterSearchTitle, resetFilters } from "../PrimaryKeySearch";
// import { handleError } from "../../utils/jwt_utils";

interface ISelectInputProps {
  label: string;
  control?: any;
  name: string;
  showRefresh?: boolean;
  data?: any;
  onChange?: (value: string) => void;
  setHandleSearch?: any;
  handleSelectChange?: any;
  inputName?: any;
  error?: any;
  entidad: any;
  inputValues?: any;
  inputRef?: any;
  readOnly?: boolean;
  customWidth?: any;
  setState?: any;
  isOT?:boolean;
  tabIndex?: number;
  FOTcristales?:boolean;
  isOptional?:boolean;
  onlyFirstOption?:boolean
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
    tabIndex,
    customWidth,
    FOTcristales,
    isOptional,
    onlyFirstOption
  }) => {
    const stateListBox = useAppSelector((store: AppStore) => store.listBoxTipos[entidad]);
    const [entities, setEntities] = useState(stateListBox|| []);
    const [strSelectedName, setStrSelectedName] = useState(data  || undefined);
    const inputRef = useRef(null); 
    const {token} = useAppSelector((store: AppStore) => store.user);
    const params = typeof entidad === 'string' ? entidad : `${entidad[0]}&_p2=${entidad[1]}`

    
    const fetchData = async () => {
      try {
        if (!stateListBox || stateListBox.length < 1) {
          const { data } = await axios(`${URLBackend}/api/tipos/listado/?query=02&_p1=${params}`,{
            headers: {
               'Authorization': token, 
             }
       });
          // console.log(data);
          setEntities(data);
        }
      } catch (error:any) {
        // handleError(error)
        console.log('FETCH-TIPOS', error);
        throw error;
      }
    }

    useEffect(() => {
      fetchData();
    }, [entidad, stateListBox]);
    
    useEffect(()=>{
      setStrSelectedName(data)
    },[data])

    if(name === '_p5'){
      console.log(inputValues)
      console.log(Object.values(inputValues))
    }

    useEffect(()=>{
      if(resetFilters.value === true){
        setStrSelectedName('')
      }
    },[resetFilters.value])

    
    const renderInput = () => (
      <Controller
          name={name}
          control={control}
          defaultValue={strSelectedName}
          render={({ field }) => (
            <div className={`custom-select border-[1px] rounded-lg !h-[3rem] relative ${error ? 'border-red-500' : 'border-[#f8b179]'}  `}>
              <div className="top-[-0.1rem]   left-3.5 absolute w-1/2 z-10">
                <label
                  htmlFor={label}
                  // className="absolute top-[-1%] left-[3%] text-sm"
                  className="relative"
                >
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
                ref={inputRef}
                disabled={readOnly}
                tabIndex  ={tabIndex || 1}
                value={strSelectedName}
                onChange={(e) => {
                  setStrSelectedName(e.target.value)
                  field.onChange(e);
                  setState && setState(e.target.value);
                  // field.onChange(e);
                  if(isOT){
                    handleSelectChange &&  handleSelectChange(e.target)
                  }
                  if (setHandleSearch) {
                    const selectedValue = e.target.value.toString();
                    handleSelectChange(name, selectedValue);
                    // const inputValuesToUpdate = {
                    //   ...inputValues,
                    //   [name]: selectedValue,
                    // };
                    if (setHandleSearch) {


                      // const newValueFilterSearch    = e.target.options[e.target.selectedIndex].text;
                      // const updatedValue            = newValueFilterSearch === ''
                      //                                                       ? Object.keys(filterSearchTitle.value).reduce((acc:any, key:any) => {
                      //                                                           if (key !== label) {
                      //                                                             acc[key] = filterSearchTitle.value[key];
                      //                                                           }
                      //                                                           return acc;
                      //                                                         }, {})
                      //                                                       : { ...filterSearchTitle.value, [label]: newValueFilterSearch };
                      
                      // filterSearchTitle.value       = updatedValue;
                      changeFilterSearchTitle(e, label,'Select');
                      // setHandleSearch(inputValuesToUpdate);
                    }
                  }
                }}


                className={`"custom-input py-2  cursor-pointer z-0"  ${readOnly ? "custom-onlyread" : isOptional ? "custom-optional-with-color" : "custom-required"} `}
                >

                  {!onlyFirstOption && (
                    <option value={undefined} className="text-sm">
                      
                    </option>
                  )}
              
                
                  
                
                {entities && entities.length > 1 &&
                  entities.map((option: any, index: React.Key | null | undefined) => (
                    <option
                      key={index}
                      value={ clearSelectInput.value  && FOTcristales === true ? "" : (option[0] !== undefined ? option[0].toString() : "" )  }
                    >
                      { clearSelectInput.value  && FOTcristales === true ? (
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
      renderInput()

    }, [data]);
   
    return (
      // <div className="flex min-w-[60px] w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
      <div className={`flex items-center mt-select mt-select-dropdown-up cursor-pointer ${customWidth ? customWidth : "w-[19.2rem]"}`}>
        {/* <label className="label-input w-1/3">{label}</label> */}
        {renderInput()}
        {/* Controller  */}
        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => fetchData()}
              variant="text"
              color="blue-gray"
              className={`mx2  ${readOnly ? "left-[-40px] !text-black hover:!text-[#f8b179]" : "iconRefresh"}`}
              // className={`"mx2 "  ${readOnly ? "iconRefresh" : ""} `}
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
