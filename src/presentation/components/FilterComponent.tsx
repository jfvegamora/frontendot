/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, Suspense } from "react";
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

export const filterOTSearchTitle = signal<any>({});
export const titleOTSearch = signal<any>("");

export const changeFilterOTSearchTitle = (
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
      ? Object.keys(filterOTSearchTitle.value).reduce((acc: any, key: any) => {
          if (key !== label) {
            acc[key] = filterOTSearchTitle.value[key];
          }
          return acc;
        }, {})
      : { ...filterOTSearchTitle.value, [label]: newValueFilterSearch };

  filterOTSearchTitle.value = updatedValue;
  titleOTSearch.value = Object.values(filterOTSearchTitle.value).join(" | ");
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
  otHistorica?: boolean;
  classNameSearchButton?: string;
}

export const resetFilters = signal(false);
export const filterTextValue = signal("");

const FilterComponent: React.FC<PrimaryKeySearchProps> = React.memo(
  ({
    setEntities,
    primaryKeyInputs,
    updateParams,
    otHistorica,
    baseUrl,
    classNameSearchButton,
  }) => {
    const OTAreaActual = useAppSelector(
      (store: AppStore) => store.OTAreas.areaActual
    );
    const [cilindrico, setCilindrico] = useState();
    const [esferico, setEsferico] = useState();
    const { control, handleSubmit, setValue } = useForm<IPrimaryKeyState>();
    const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});

    const dispatch: any = useAppDispatch();
    const { ListEntity } = useCrud(baseUrl);

    const handleRefresh = React.useCallback(() => {
      console.log("render");
      titleOTSearch.value = "";
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
        console.log(name);
        console.log(value);

        setInputValues((prev) => ({ ...prev, [name]: value }));
        updateParams({ updatedParams });
      },
      [inputValues, updateParams]
    );

    let className = "";

    switch (baseUrl) {
      case "/api/othistorica/":
        // className ="grid grid-rows-3 grid-cols-2  !w-[40rem] px-0 py-4 h-[35vh]  items-center";
        className = "containerOTArchivoPrimaryKey";
        break;
      case "/api/ot/":
        // className ="grid grid-rows-3 !grid-cols-2  !w-[29vw] px-0  h-[35vh]   items-center transition-all duration-500";
        className = "containerOTPrimaryKey";
        break;
      case "/api/cristales/":
        className =
          "grid grid-rows-3 grid-cols-2 !w-[90%] px-0 py-4 h-[30vh]  items-center";
        break;
      default:
        // className = "flex mb-auto items-cente w-[80vw]  items-center ";
        className = "containerPrimaryKey";
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
      return [primaryKeyInputs].map((group, groupIndex) => (
        <div key={groupIndex} className={className}>
          {group.map((input, inputIndex) => (
            <div
              key={inputIndex}
              className="items-center rowForm flex justify-around   !w-[12.5vw] "
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
                                changeFilterOTSearchTitle(e, input.label);
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
                                changeFilterOTSearchTitle(e, input.label);
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
                                  changeFilterOTSearchTitle(e, input?.label);
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
                  <div className={` ${input.styles?.container}`}>
                    <SelectInputTiposComponent
                      label={input.label}
                      name={input.name}
                      showRefresh={true}
                      control={control}
                      entidad={
                        input._p1 ? [input.tipos, input._p1] : input.tipos
                      }
                      inputName={input.name}
                      isOT={true}
                      inputValues={inputValues}
                      setHandleSearch={handleSearch}
                      handleSelectChange={handleSelectChange}
                      customWidth={` w-[14vw] ${input.styles?.styles}`}
                      labelProps={input.styles?.labelProps}
                    />
                  </div>
                ) : (
                  <div className={`${input.styles?.container}`}>
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
                      isOT={true}
                      inputValues={inputValues}
                      setHandleSearch={handleSearch}
                      handleSelectChange={handleSelectChange}
                      customWidth={`${input.styles?.styles}`}
                      labelProps={input.styles?.labelProps}
                      // className={` ${input.styles?.with}`}
                    />
                  </div>
                )
              ) : input.type === "date" ? (
                <div className={` ${input.styles?.container} `}>
                  <label
                    htmlFor={input.label}
                    className={`${
                      input.styles?.labelProps ? input.styles?.labelProps : ""
                    } labelInput absolute !translate-y-[-0.45vw] translate-x-3 !bg-white z-20`}
                  >
                    {input?.label}
                  </label>
                  <Controller
                    name={input.name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="date"
                        color="orange"
                        className={`w-[13vw] border border-gray-500 rounded ${input.styles?.styles}`}
                        {...field}
                        value={field.value || ""}
                        labelProps={{ className: "inputStyles" }}
                        onChange={(e) => {
                          changeFilterOTSearchTitle(e, input.label);
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              ) : input.type === "switch" ? (
                <div className={` ${input.styles?.container}`}>
                  <Suspense>
                    <label className="text-[#f39c12] labelStyles mr-4">
                      {input?.label}
                    </label>
                    <Switch
                      color="orange"
                      name={input.name}
                      checked={switchAtrasadas}
                      onChange={(e) => {
                        changeFilterOTSearchTitle(e, input?.label, input?.type);
                        if (e.target.checked) {
                          switchAtrasadas.value = true;
                          dispatch(filterOtAtrasadas());
                        } else {
                          switchAtrasadas.value = false;
                          titleOTSearch.value = "Sistema Gestión OT";
                          document.title = "Sistema Gestión OT";
                          console.log("render");
                          console.log(OTAreaActual);
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
                          className={` w-[13vw]  ${input?.styles?.with || ""}`}
                          {...field}
                          type={input.type}
                          // label={input.label}
                          value={inputValues[input.name]}
                          onChange={(e) => {
                            field.onChange(e);
                            changeFilterOTSearchTitle(e, input?.label);
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
    }, [OTAreaActual, inputValues]);

    React.useEffect(() => {
      filterOTSearchTitle.value = {};
      titleOTSearch.value = "";
    }, [window.location.pathname]);

    React.useEffect(() => {
      if (titleOTSearch.value === "") {
        let title =
          window.location.pathname.slice(1).charAt(0).toUpperCase() +
          window.location.pathname.slice(2);

        if (title === "Ot" || title === "Othistorica") {
          title = "Sistema Gestión de OT";
        }
        document.title = title;
      } else {
        document.title = titleOTSearch.value;
      }
    }, [titleOTSearch.value, switchAtrasadas.value]);

    return (
      <form className="primaryKeyContainer !items-center relative !text-[2vw]">
        {renderInputs}
        <div
          className={`h-auto !items-center w-[14vw] flex ${classNameSearchButton}  ${
            baseUrl === "/api/ot/" || baseUrl === "/api/othistorica/"
              ? "absolute left-[78vw] top-[10vw] flex px-4 !py-6 !my-4 !w-[12vw] "
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
                titleOTSearch.value = "";
                filterOTSearchTitle.value = {};
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
      </form>
    );
  }
);

export default FilterComponent;
