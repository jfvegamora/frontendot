/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//@ts-nocheck

import { IconButton, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Controller } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import { useCrud, useEntityUtils } from "../../hooks";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import axios from "axios";
import { setDataListbox } from "../../../redux/slices/listBoxSlice";
import { clearSelectInput, codigoProyecto, punto_venta } from "../../utils";

import { retry } from "async";
import {
  changeFilterSearchTitle,
  filterSearchTitle,
  filterTextValue,
  resetFilters,
} from "../PrimaryKeySearch";
import { inputName } from "../OTForms/Otprueba";
import {
  codPuntoVenta,
  isRequireDP,
} from "../../views/forms/FReservarArmazones";
import { URLBackend } from "../../utils/config";
import { changeFilterOTSearchTitle } from "../FilterComponent";
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
  className?: string;
  readOnly?: boolean;
  customWidth?: any;
  setState?: any;
  isOT?: boolean;
  tabIndex?: number;
  isFOTcristales?: boolean;
  isOptional?: boolean;
  onlyFirstOption?: boolean;
  inputRef?: any;
  isEditting?: boolean;
  labelProps?: any;
  formValues?: any;
  labelContainer?: any;
  idMenu?: any;
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
    onlyFirstOption,
    inputRef,
    isEditting,
    formValues,
    labelProps,
    labelContainer,
    idMenu,
  }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");
    const [entities, setEntities] = useState([]);
    const [strSelectedName, setStrSelectedName] = useState(data || "");
    const strUrl = entidad && entidad[0];
    // const strTableName = entidad[3] ? entidad[2] && `_p1=${entidad[2]}&${entidad[3]}`: entidad[2] && `_p1=${entidad[2]}`
    const { ListEntity } = useCrud(strUrl);
    const cleanFilters = {};
    const { refreshData } = useEntityUtils(strUrl, entidad[1]);
    const token =
      useAppSelector((store: AppStore) => store.user?.token || "") || "";

    const strTableName = React.useMemo(
      () =>
        entidad[3]
          ? `${entidad[2] && `_p1=${entidad[2]}&${entidad[3]}`}`
          : `${entidad[2] && `_p1=${entidad[2]}`}`,
      [entidad]
    );

    const strUrl2 = React.useMemo(
      () =>
        strTableName !== "undefined"
          ? `${URLBackend}${entidad[0]}listado/?query=${entidad[1]}&${strTableName}`
          : `${URLBackend}${entidad[0]}listado/?query=${entidad[1]}`,
      [strTableName, entidad, data]
    );
    const state = useAppSelector((store: AppStore) => store.listBox);

    const fetchSelectData = React.useCallback(async () => {
      const reFetchData = {
        "Punto de Venta": "",
      };
      // if (Object.keys(state).some((key) => key === label)) {
      //   if (!entidad[2]) {
      //     return;
      //   }
      // }
      const { data } = await axios(strUrl2, {
        headers: {
          Authorization: token,
        },
      });

      if (label === "Punto de Venta" || label === "Operativo") {
        if (data && data[0]) {
          if (!isEditting && isOT) {
            if (punto_venta.value !== "") {
              return;
            }
            codPuntoVenta.value = data[0][0];
            punto_venta.value = data[0][0];
            setStrSelectedName(data[0][0]);
            // setEntities(data[0][0])
          }
        }
      }

      // console.log(data)
      const payload = {
        [label]: data,
      };

      dispatch(setDataListbox(payload));
      setEntities(data);
    }, [strUrl2, label, token, isEditting, isOT, formValues, state]);

    React.useEffect(() => {
      if (!state.hasOwnProperty(label)) {
        fetchSelectData();
      } else {
        setEntities(state[label]);
      }
    }, [state, label, data]);

    React.useEffect(() => {
      fetchSelectData();
    }, [strUrl2, data]);

    React.useEffect(() => {
      setStrSelectedName(data);
    }, [data]);

    React.useEffect(() => {
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
            className={`custom-select inputStyles border-[0.5px] h-[2.8vw]   rounded-lg  ${
              error ? "border-red-500" : " border-[#e6843a]"
            }  `}
          >
            <div
              className={`${
                labelContainer ? labelContainer : ""
              } w-1/2  h-2 -top-[0.3vw]  absolute left-2`}
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
              ref={inputRef ? inputRef : null}
              disabled={readOnly}
              name={name}
              title="select"
              tabIndex={tabIndex || 1}
              value={strSelectedName}
              onChange={(e) => {
                if (label === "Punto de Venta") {
                  setValue(e.target.value);
                }

                if (label === "Nombre Proyecto") {
                  if (codigoProyecto.value !== e.target.value) {
                    setValue("");
                    punto_venta.value = "";
                  }
                }
                setStrSelectedName(e.target.value);
                setState && setState(e.target.value);
                field.onChange(e);
                if (isOT) {
                  handleSelectChange && handleSelectChange(e.target);
                }
                if (setHandleSearch) {
                  const selectedValue = e.target.value.toString();
                  if (isOT) {
                    changeFilterOTSearchTitle(e, name, "Select");
                  } else {
                    changeFilterSearchTitle(e, name, "Select");
                  }
                  handleSelectChange(name, selectedValue);
                  const inputValuesToUpdate = {
                    ...inputValues,
                    [name]: selectedValue,
                  };

                  if (setHandleSearch) {
                    changeFilterSearchTitle(e, label, "Select");
                  }
                }
              }}
              style={{}}
              className={` pt-3 inputStyles ${
                customWidth ? customWidth : " custom-input   cursor-pointer "
              } ${
                readOnly
                  ? idMenu === 44
                    ? ""
                    : "custom-onlyread"
                  : isOptional
                  ? "custom-optional-with-color"
                  : "custom-required"
              }`}
            >
              {!onlyFirstOption && (
                <option value={undefined} className="text-sm"></option>
              )}

              {entities &&
                entities.map((option: any, index) => (
                  <option
                    key={index}
                    value={
                      isFOTcristales
                        ? clearSelectInput.value
                          ? inputName !== "proyecto_codigo"
                            ? ""
                            : strSelectedName
                          : option[0] !== undefined
                          ? option[0].toString()
                          : ""
                        : option[0] !== undefined
                        ? option[0].toString()
                        : ""
                    }
                  >
                    {clearSelectInput.value && isFOTcristales === true ? (
                      <option value={0}> </option>
                    ) : (
                      option[1]
                    )}
                  </option>
                ))}
            </select>
          </div>
        )}
      />
    );

    useEffect(() => {
      renderInput();
    }, [data]);

    return (
      // <div className="flex min-w-[100%] w-full items-center mx-4 mt-select mt-select-dropdown-up cursor-pointer">
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
              onClick={() => fetchSelectData()}
              variant="text"
              className={`mx2  ${
                readOnly
                  ? "left-[-40px] !text-black hover:!text-[#f8b179]"
                  : "iconRefresh"
              }`}
              tabIndex={-1}
              title="button_title"
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
