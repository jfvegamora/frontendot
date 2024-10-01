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
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { clearSelectInput } from "../../utils";
import { changeFilterSearchTitle, resetFilters } from "../PrimaryKeySearch";
import { updateDataForKey } from "../../../redux/slices/ListBoxTipoSlice";
import { URLBackend } from "../../utils/config";
import { changeFilterOTSearchTitle } from "../FilterComponent";
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
  isOT?: boolean;
  tabIndex?: number;
  FOTcristales?: boolean;
  isOptional?: boolean;
  onlyFirstOption?: boolean;
  labelProps?: any;
  labelContainer?: any;
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
    // inputValues,
    handleSelectChange,
    readOnly,
    setState,
    isOT,
    tabIndex,
    customWidth,
    FOTcristales,
    isOptional,
    onlyFirstOption,
    labelProps,
    labelContainer,
  }) => {
    const nameInputInRedux = typeof entidad === "string" ? entidad : entidad[0];

    const stateListBox = useAppSelector(
      (store: AppStore) => store.listBoxTipos[nameInputInRedux]
    );
    const [entities, setEntities] = useState(stateListBox || []);
    const [strSelectedName, setStrSelectedName] = useState(data || undefined);
    const inputRef = useRef(null);
    const { token } = useAppSelector((store: AppStore) => store.user);
    const params =
      typeof entidad === "string" ? entidad : `${entidad[0]}&_p2=${entidad[1]}`;
    const dispatch = useAppDispatch();

    const fetchData = async () => {
      try {
        if (true) {
          const { data } = await axios(
            `${URLBackend}/api/tipos/listado/?query=02&_p1=${params}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          dispatch(updateDataForKey({ nameInputInRedux, data }));
        }
      } catch (error: any) {
        // handleError(error)
        throw error;
      }
    };

    useEffect(() => {
      fetchData();
    }, [entidad, stateListBox]);

    useEffect(() => {
      setStrSelectedName(data);
    }, [data]);

    React.useEffect(() => {
      setEntities(stateListBox);
    }, [stateListBox]);

    useEffect(() => {
      if (resetFilters.value === true) {
        setStrSelectedName("");
      }
    }, [resetFilters.value]);

    const renderInput = () => (
      <Controller
        name={name}
        control={control}
        defaultValue={strSelectedName}
        render={({ field }) => (
          <div
            className={`custom-select inputStyles border-[0.5px] h-[2.8vw]  rounded-lg  ${
              error ? "border-red-500" : "border-[#f8b179]"
            }  `}
          >
            <div
              className={`${
                labelContainer ? labelContainer : ""
              } w-1/2 h-2 -top-[0.3vw]  absolute left-2`}
            >
              <label
                htmlFor={label}
                className={`  ${
                  labelProps ? labelProps : "  !translate-y-[-1.2vh] "
                }  !translate-y-[-0.8vw] translate-x-3`}
              >
                {label}
              </label>
            </div>
            {error && (
              <p className="absolute z-20 top-[0.1rem] right-1 labelErr">
                {error.message}
              </p>
            )}

            <select
              {...field}
              ref={inputRef}
              disabled={readOnly}
              title={name}
              tabIndex={tabIndex || 1}
              value={strSelectedName}
              onChange={(e) => {
                setStrSelectedName(e.target.value);
                field.onChange(e);
                setState && setState(e.target.value);
                // field.onChange(e);
                if (isOT) {
                  handleSelectChange && handleSelectChange(e.target);
                }
                if (setHandleSearch) {
                  const selectedValue = e.target.value.toString();
                  handleSelectChange(name, selectedValue);
                  if (isOT) {
                    changeFilterOTSearchTitle(e, name, "Select");
                  } else {
                    changeFilterSearchTitle(e, name, "Select");
                  }
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
                    changeFilterSearchTitle(e, label, "Select");
                    // setHandleSearch(inputValuesToUpdate);
                  }
                }
              }}
              className={` pt-3 inputStyles ${
                customWidth ? customWidth : " custom-input   cursor-pointer "
              } ${
                readOnly
                  ? "custom-onlyread"
                  : isOptional
                  ? "custom-optional-with-color"
                  : "custom-required"
              }`}
            >
              {!onlyFirstOption && (
                <option value={undefined} className="text-sm"></option>
              )}
              {entities &&
                entities.map(
                  (option: any, index: React.Key | null | undefined) => (
                    <option
                      key={index}
                      value={
                        clearSelectInput.value && FOTcristales === true
                          ? ""
                          : option[0] !== undefined
                          ? option[0].toString()
                          : ""
                      }
                    >
                      {clearSelectInput.value && FOTcristales === true ? (
                        <option value={0}> </option>
                      ) : (
                        option[1]
                      )}
                    </option>
                  )
                )}
            </select>
          </div>
        )}
      />
    );

    useEffect(() => {
      renderInput();
    }, [data]);

    return (
      // <div className="flex min-w-[60px] w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
      <div
        className={`flex items-center relative mt-select mt-select-dropdown-up cursor-pointer ${
          customWidth ? customWidth : "w-[19.2rem]"
        }`}
      >
        {/* <label className="label-input w-1/3">{label}</label> */}
        {renderInput()}
        {/* Controller  */}
        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => fetchData()}
              variant="text"
              color="blue-gray"
              className={`mx2  ${
                readOnly
                  ? "left-[-40px] !text-black hover:!text-[#f8b179]"
                  : "iconRefresh"
              }`}
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
