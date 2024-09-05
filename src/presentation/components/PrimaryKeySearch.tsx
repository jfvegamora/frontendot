/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { IconButton, Input, Switch, Tooltip } from "@material-tailwind/react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { AppStore, useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchOT, filterOtAtrasadas } from "../../redux/slices/OTSlice";
import { useCrud } from "../hooks";
import { toast } from "react-toastify";
import { paramsOT } from "../views/mantenedores/MOT";
import { areaActualOT } from "./OTAreasButtons";
import { signal } from "@preact/signals-react";
import { filterToggle, switchAtrasadas } from "./FilterButton";
// import { sesionExpirada } from "../../redux/slices/userSlice";

// import SelectInputTiposComponent from "./forms/SelectInputTiposComponent";
// import SelectInputComponent  from "./forms/SelectInputComponent";
// SelectInputComponent

const SelectInputComponent = React.lazy(
  () => import("./forms/SelectInputComponent")
);
// const SelectFilterInputComponent      = React.lazy(()=>import("./forms/SelectInputComponent"))
const SelectInputTiposComponent = React.lazy(
  () => import("./forms/SelectInputTiposComponent")
);

interface IPrimaryKeyState {
  [key: string]: string | number;
}

export const filterSearchTitle = signal<any>({});
export const titleSearch = signal<any>("");

export const changeFilterSearchTitle = (
  e: any,
  label: any,
  typeInput?: any
) => {
  const newValueFilterSearch =
    typeInput === "Select"
      ? e.target.options[e.target.selectedIndex].text
      : e.target.value === "on"
      ? "Atrasadas"
      : e.target.value;

  const updatedValue =
    newValueFilterSearch === ""
      ? Object.keys(filterSearchTitle.value).reduce((acc: any, key: any) => {
          if (key !== label) {
            acc[key] = filterSearchTitle.value[key];
          }
          return acc;
        }, {})
      : { ...filterSearchTitle.value, [label]: newValueFilterSearch };

  filterSearchTitle.value = updatedValue;
  titleSearch.value = Object.values(filterSearchTitle.value).join(" | ");
};

interface PrimaryKeySearchProps {
  setEntities: any;
  strQuery?: any;
  primaryKeyInputs: {
    label: string;
    type: string;
    name: string;
    options?: string[];
    styles?: any;
    selectUrl?: any;
    values?: any;
    tipos?: string;
    _p1?: string;
  }[];
  baseUrl: string;
  updateParams: any;
  description?: any;
  otHistorica?: boolean;
  classNameSearchButton?: string;
  idMenu?: any;
}

export const resetFilters = signal(false);
export const filterTextValue = signal("");

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = React.memo(
  ({
    setEntities,
    primaryKeyInputs,
    updateParams,
    description,
    otHistorica,
    baseUrl,
    classNameSearchButton,
    idMenu,
  }) => {
    const OTAreaActual = useAppSelector(
      (store: AppStore) => store.OTAreas.areaActual
    );
    const [cilindrico, setCilindrico] = useState();
    const [esferico, setEsferico] = useState();
    const { control, handleSubmit, setValue } = useForm<IPrimaryKeyState>();
    const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});
    const [cristalDescritpion, setCristalDescription] = useState(
      description || ""
    );
    const dispatch: any = useAppDispatch();
    const { ListEntity } = useCrud(baseUrl);

    useEffect(() => {
      setCristalDescription(description || "");
    }, [description]);

    const handleRefresh = React.useCallback(() => {
      titleSearch.value = "";
      const mapping = primaryKeyInputs.reduce(
        (acc: any, filtroBusqueda: any) => {
          acc[filtroBusqueda.name] = "";
          setInputValues({ ...inputValues, [filtroBusqueda.name]: "" });
          setValue(filtroBusqueda.name, "");
          return acc;
        },
        {}
      );
      resetFilters.value = true;
      filterTextValue.value = "";
      handleSearch(mapping);
      setInputValues(mapping);
      setTimeout(() => {
        resetFilters.value = false;
      }, 1000);
    }, []);

    const updatedParams = Object.keys(inputValues)
      .map((key) => `${key}=${inputValues[key]}`)
      .join("&");

    const handleInputChange = (name: string, value: string) => {
      setInputValues((prev) => ({ ...prev, [name]: value }));
      updateParams(inputValues);
    };

    const handleSelectChange = React.useCallback(
      (name: string, value: string) => {
        setInputValues((prev) => ({ ...prev, [name]: value }));
        updateParams({ updatedParams });
      },
      [inputValues, updateParams]
    );

    let className = "";
    switch (baseUrl) {
      case "/api/othistorica/":
        className =
          "grid grid-rows-3 grid-cols-2  !w-[40rem] px-0 py-4 h-[35vh]  items-center";
        break;
      case "/api/ot/":
        // className ="grid grid-rows-3 !grid-cols-2  !w-[29vw] px-0  h-[35vh]   items-center transition-all duration-500";
        className = "container2PrimaryKey";
        break;
      case "/api/cristales/":
        // className = "grid grid-rows-3 grid-cols-2 !w-[90%] px-0 py-4 h-[30vh]  items-center";
        className = "containerCristalesPrimaryKey";
        break;
      case "/api/otreservaarmazones/":
        className = "containerCristalesPrimaryKey";
        break;
      default:
        // className = "flex mb-auto items-cente w-[80vw]  items-center ";
        className = "containerPrimaryKey";
        // className = ""
        break;
    }

    const handleSearch = async (data: any) => {
      const toastLoading = toast.loading("Buscando...");

      if (baseUrl === "/api/othistorica/" || baseUrl === "/api/ot/") {
        const filtersOT = Object.entries(data)
          .filter((campos) => campos[1] !== "" && campos[1] !== undefined)
          .map((campos: any) => `${campos[0]}=${campos[1]}`)
          .join("&");
        paramsOT.value = filtersOT;
      }

      if ("_pCilindrico" in data || "_pEsferico" in data) {
        data = {
          ...data,
        };
      }

      if (primaryKeyInputs[1]) {
        if (
          primaryKeyInputs[1]["type"] === "date" &&
          primaryKeyInputs[2]["type"] === "date"
        ) {
          if (new Date(data["_p2"]) > new Date(data["_p3"])) {
            alert("Fecha desde es mayor a la Fecha hasta");
            return null;
          }
        }
      }

      const searchParams = Object.entries(data)
        .map(([key, value]: any) =>
          key === "" || value
            ? key.includes("_proyecto")
              ? `${key}=${encodeURIComponent(value)}`
              : `${key}=${encodeURIComponent(value)}`
            : ""
        )
        .filter((param) => param !== "")
        .join("&");

      if (idMenu === 7 && searchParams === "") {
        toast.dismiss(toastLoading);
        return toast.error("Ingrese al menos un filtro de busqueda.");
      }

      data && updateParams([searchParams]);
      try {
        const response = otHistorica
          ? dispatch(
              fetchOT({
                OTAreas: areaActualOT.value,
                searchParams: searchParams,
                historica: true,
              })
            )
          : baseUrl === "/api/ot/"
          ? dispatch(
              fetchOT({
                OTAreas: areaActualOT.value,
                searchParams: searchParams,
                historica: false,
              })
            )
          : await ListEntity(searchParams, "01");

        toast.dismiss(toastLoading);
        if (baseUrl !== "/api/othistorica/" && baseUrl !== "/api/ot/") {
          setEntities(response);
        }

        if (Array.isArray(response) && response.length === 0) {
          return toast.success("Búsqueda Realizada: 0 resultados", {
            autoClose: 1500,
          });
        }

        toast.success("Busqueda Realizada", { autoClose: 1500 });
      } catch (error) {
        toast.dismiss(toastLoading);
        return error;
      }
    };

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit(handleSearch)();
        }
      },
      [handleSubmit, handleSearch]
    );

    const renderInputs = React.useMemo(() => {
      // const inputGroups = [];
      // for (let i = 0; i < primaryKeyInputs.length; i += 6) {
      //   inputGroups.push(primaryKeyInputs.slice(i, i + 6));
      // }

      return [primaryKeyInputs].map((group, groupIndex) => (
        <div key={groupIndex} className={className}>
          {group.map((input, inputIndex) => (
            <div
              key={inputIndex}
              className="items-center rowForm flex justify-around  !w-[17vw] "
            >
              {input.type === "number" ? (
                <div
                  className={`input-container ${
                    input.styles?.with ? input.styles.with : ""
                  }`}
                >
                  <div className={``}>
                    {input.name === "_pEsferico" ? (
                      <div
                        className={`flex !w-[14rem] ${input.styles?.container}`}
                      >
                        <Controller
                          name="_pEsferico"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Input
                              color="orange"
                              tabIndex={1}
                              className={`${
                                input?.styles?.with || "!w-[8rem] "
                              } !h-12 !mt-3 !mr-[0.8rem]`}
                              {...field}
                              label={input.label}
                              value={esferico}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange("_pEsferico", e.target.value);
                                changeFilterSearchTitle(e, input.label);
                                setEsferico(e.target.value as any);
                              }}
                              onKeyDown={handleKeyDown}
                              // onBlur={handleBlur}
                              labelProps={{
                                style: {
                                  color: "grey",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                },
                              }}
                            />
                          )}
                        />
                        <Controller
                          name="_pCilindrico"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Input
                              color="orange"
                              tabIndex={1}
                              className={`${
                                input?.styles?.with || "!w-[8rem]"
                              } !h-12 !mt-3`}
                              {...field}
                              label="Cilíndrico"
                              value={cilindrico}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange(
                                  "_pCilindrico",
                                  e.target.value
                                );
                                changeFilterSearchTitle(e, input.label);
                                setCilindrico(e.target.value as any);
                              }}
                              onKeyDown={handleKeyDown}
                              labelProps={{
                                style: {
                                  color: "grey",
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                },
                              }}
                            />
                          )}
                        />
                      </div>
                    ) : (
                      <div
                        className={`input-container relative ${input.styles?.container}`}
                      >
                        <Controller
                          name={input.name}
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <label
                                htmlFor={input.label}
                                className={`${
                                  input.styles?.labelProps
                                    ? input.styles?.labelProps
                                    : ""
                                } absolute !translate-y-[-0.4vw] translate-x-3 !bg-white z-20`}
                              >
                                {input?.label}
                              </label>
                              <Input
                                color="orange"
                                tabIndex={1}
                                className={`!h-[2.8vw] ${
                                  input?.styles?.with || ""
                                }`}
                                {...field}
                                type={input.type}
                                // label={input.label}
                                value={inputValues[input.name]}
                                onChange={(e) => {
                                  field.onChange(e);
                                  changeFilterSearchTitle(e, input?.label);
                                  handleInputChange(input.name, e.target.value);
                                }}
                                onKeyDown={handleKeyDown}
                                labelProps={{ className: "text-[2vw]" }}
                              />
                            </>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : input.type === "select" ? (
                input.tipos ? (
                  <div
                    className={`input-container   ${input.styles?.container}`}
                  >
                    <Suspense>
                      <SelectInputTiposComponent
                        label={input.label}
                        name={input.name}
                        showRefresh={true}
                        control={control}
                        entidad={
                          input._p1 ? [input.tipos, input._p1] : input.tipos
                        }
                        inputName={input.name}
                        inputValues={inputValues}
                        setHandleSearch={handleSearch}
                        handleSelectChange={handleSelectChange}
                        customWidth={`h-[2.8vw] ${input.styles?.styles}`}
                        labelProps={input.styles?.labelProps}
                      />
                    </Suspense>
                  </div>
                ) : (
                  <div
                    className={`input-container  ${input.styles?.container}`}
                  >
                    <Suspense>
                      <SelectInputComponent
                        label={input.label}
                        name={input.name}
                        showRefresh={true}
                        control={control}
                        entidad={
                          input._p1
                            ? [input.selectUrl, "02", input._p1]
                            : [input.selectUrl, "02"]
                        }
                        inputName={input.name}
                        inputValues={inputValues}
                        setHandleSearch={handleSearch}
                        handleSelectChange={handleSelectChange}
                        customWidth={` h-[2.8vw] ${input.styles?.styles}`}
                        labelProps={input.styles?.labelProps}
                        // className={` ${input.styles?.with}`}
                      />
                    </Suspense>
                  </div>
                )
              ) : input.type === "date" ? (
                <div
                  className={`input-container relative  ${input.styles?.container} `}
                >
                  <label
                    className={`primaryKeyLabel items-center text-base mt-1 absolute top-[-1.1rem] ${input.styles?.label}`}
                  >
                    {input.label}
                  </label>
                  <Controller
                    name={input.name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="date"
                        color="orange"
                        className={`h-[3rem] border border-gray-500 rounded ${input.styles?.styles}`}
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          changeFilterSearchTitle(e, input.label);
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              ) : input.type === "switch" ? (
                <div className={`input-container  ${input.styles?.container}`}>
                  <Suspense>
                    <label className="text-[#f39c12] labelStyles mr-4">
                      {input?.label}
                    </label>
                    <Switch
                      color="orange"
                      name={input.name}
                      checked={switchAtrasadas}
                      onChange={(e) => {
                        changeFilterSearchTitle(e, input?.label, input?.type);
                        if (e.target.checked) {
                          switchAtrasadas.value = true;
                          dispatch(filterOtAtrasadas());
                        } else {
                          switchAtrasadas.value = false;
                          titleSearch.value = "Sistema Gestión OT";
                          document.title = "Sistema Gestión OT";
                          dispatch(
                            fetchOT({
                              OTAreas: OTAreaActual,
                              searchParams: paramsOT.value,
                            })
                          );
                        }
                      }}
                    />
                  </Suspense>
                </div>
              ) : (
                // Otros tipos de entrada
                <div
                  className={` -mt-3
                              ${input.styles?.container}`}
                >
                  <Controller
                    name={input.name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor={input.label}
                          className={`${
                            input.styles?.labelProps
                              ? input.styles?.labelProps
                              : ""
                          } absolute !translate-y-[-0.45vw] translate-x-3 !bg-white z-20`}
                        >
                          {input?.label}
                        </label>
                        <Input
                          color="orange"
                          tabIndex={1}
                          className={`  ${input?.styles?.with || ""}`}
                          {...field}
                          type={input.type}
                          // label={input.label}
                          value={inputValues[input.name]}
                          onChange={(e) => {
                            field.onChange(e);
                            changeFilterSearchTitle(e, input?.label);
                            handleInputChange(input.name, e.target.value);
                          }}
                          onKeyDown={handleKeyDown}
                          labelProps={{ className: "inputStyles" }}
                        />
                      </>
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ));
    }, []);

    React.useEffect(() => {
      filterSearchTitle.value = {};
      titleSearch.value = "";
    }, [window.location.pathname]);

    React.useEffect(() => {
      if (titleSearch.value === "") {
        let title =
          window.location.pathname.slice(1).charAt(0).toUpperCase() +
          window.location.pathname.slice(2);

        if (title === "Ot" || title === "Othistorica") {
          title = "Sistema Gestión de OT";
        }
        document.title = title;
      } else {
        document.title = titleSearch.value;
      }
    }, [titleSearch.value, switchAtrasadas.value]);

    return (
      <form className="primaryKeyContainer !items-center relative !text-[2vw]">
        {renderInputs}
        <div
          className={`h-auto !items-center w-[9vw] flex ${classNameSearchButton}  ${
            baseUrl === "/api/ot/" || baseUrl === "/api/othistorica/"
              ? "absolute left-[89vw] top-0 flex flex-col !py-6 !my-4 !w-[4vw] "
              : ""
          } `}
        >
          <Tooltip content="Buscar">
            <IconButton
              tabIndex={1}
              variant="text"
              className="primaryKeyIconButton mx-6"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                filterToggle.value = false;
                return handleSubmit(handleSearch)();
              }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="primaryKeyIcon w-full text-[1vw]"
              />
            </IconButton>
          </Tooltip>
          <Tooltip content="Refrescar">
            <IconButton
              tabIndex={1}
              variant="text"
              color="blue-gray"
              className="primaryBtnIconButton z-30"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                filterToggle.value = false;
                switchAtrasadas.value = false;
                titleSearch.value = "";
                filterSearchTitle.value = {};
                return handleRefresh();
              }}
            >
              <FontAwesomeIcon
                icon={faArrowsRotate}
                className="primaryBtnIcon w-full"
              />
            </IconButton>
          </Tooltip>
        </div>

        {description && (
          <span className="mx-8 h-auto  w-[28rem] text-base border-none absolute bottom-[-5rem] left-[40vw]">
            {cristalDescritpion && cristalDescritpion[3]}
          </span>
        )}
      </form>
    );
  }
);

export default PrimaryKeySearch;
