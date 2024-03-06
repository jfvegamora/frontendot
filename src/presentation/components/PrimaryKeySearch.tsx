/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IconButton, Input, Tooltip } from "@material-tailwind/react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SelectInputComponent } from ".";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SelectInputTiposComponent from "./forms/SelectInputTiposComponent";
import { useAppDispatch } from "../../redux/store";
import { fetchOT } from "../../redux/slices/OTSlice";
import { useCrud } from "../hooks";
import { toast } from "react-toastify";
import { paramsOT } from "../views/mantenedores/MOT";
import { areaActualOT } from "./OTAreasButtons";
// import { sesionExpirada } from "../../redux/slices/userSlice";

interface IPrimaryKeyState {
  [key: string]: string | number;
}

interface PrimaryKeySearchProps {
  setEntities: any;
  setParams?: any;
  strQuery?:any;
  primaryKeyInputs: {
    label: string;
    type: string;
    name: string;
    options?: string[];
    styles?: {with:string};
    selectUrl?: any;
    values?: any;
    tipos?: string;
    _p1?:string
  }[];
  baseUrl: string;
  updateParams: any;
  description?: any;
  otHistorica?:boolean
}


// const MemoizedMagnifyingGlassIcon = React.memo(() => (
//   <MagnifyingGlassIcon className="primaryKeyIcon" />
// ));

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = React.memo(
  ({ setEntities, primaryKeyInputs, updateParams, description, otHistorica, baseUrl }) => {
    const { control, handleSubmit } = useForm<IPrimaryKeyState>();
    const [cilindrico, setCilindrico] = useState();
    const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});
    const [cristalDescritpion, setCristalDescription] = useState(
      description || ""
    );
    const dispatch = useAppDispatch();
    // const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);

    // const OTs:any = useAppSelector((store: AppStore) => store.OTS.data);
    const { ListEntity } = useCrud(baseUrl);
    // console.log("cristalDescritpion", cristalDescritpion[3]);
    useEffect(() => {
      // Actualiza el estado interno cuando la prop description cambia
      setCristalDescription(description || '');
    }, [description]);
    // 
    // console.log(OTAreas["areaActual"])
    const updatedParams = Object.keys(inputValues)
        .map((key) => `${key}=${inputValues[key]}`)
        .join('&');
    
    const handleInputChange = (name: string, value: string) => {
        // console.log(name)
        // console.log(value)
        // console.log('render')
        setInputValues((prev) => ({ ...prev, [name]: value }));
        updateParams(inputValues)
        // console.log(updatedParams)
      }
  
    const handleSelectChange = React.useCallback(
      (name: string, value: string) => {
      
        setInputValues((prev) => ({ ...prev, [name]: value }));
        
        console.log(inputValues)

        
        
        console.log(updatedParams)
        
        updateParams({updatedParams});
        paramsOT.value = updatedParams

        
      },
      [inputValues, updateParams]
    );


    let className = ''
    
    switch (baseUrl) {
      case '/api/othistorica/':
          // className = "grid grid-rows-3 grid-cols-2  !w-[30rem] px-0 py-4 h-[35vh]  items-center"
          className = "grid grid-rows-3 grid-cols-2  !w-[40rem] px-0 py-4 h-[35vh]  items-center"
          break;
      case '/api/ot/':
          className = "grid grid-rows-3 grid-cols-2  !w-[40rem] px-0 py-4 h-[35vh]  items-center"
          break;
      case '/api/cristales/' :
          className = "grid grid-rows-3 grid-cols-2 !w-[90%] px-0 py-4 h-[30vh]  items-center"
          break;
      default:
          className = "flex mb-auto items-cente w-[70rem]  items-center "
          break;
    }




    const handleSearch = async (data: any) => {
      const toastLoading = toast.loading('Buscando...');
      // filterToggle.value = false;
      console.log(data)
      // console.log(cilindrico)
      
      if(baseUrl === '/api/othistorica/' || baseUrl === '/api/ot/'){
        const filtersOT = Object.entries(data)
        .filter((campos)=> campos[1] !== '' && campos[1] !== undefined)
        .map((campos:any) => `${campos[0]}=${campos[1]}`)
        .join('&')
        // console.log(filtersOT)
        paramsOT.value = filtersOT
      }


      if ("_pCilindrico" in data || "_pEsferico" in data) {
        data = {
          ...data,
        };
      }

      // console.log('data search', data)
      
      if(primaryKeyInputs[1]){
        if(primaryKeyInputs[1]["type"] === "date" && primaryKeyInputs[2]["type"] === "date"){
          if(new Date(data["_p2"]) > new Date(data["_p3"])){
            alert('Fecha desde es mayor a la Fecha hasta')
            return null;
          }
        }
      }

      const searchParams = Object.entries(data)
        .map(([key, value]: any) =>
          key === "" || value ? ( key.includes('_proyecto') ? `${key}=${encodeURIComponent(value)}` :`${key}=${encodeURIComponent(value)}`) : "" 
        )
        .filter((param) => param !== "")
        .join("&");
      
      data && updateParams([searchParams]);
      // console.log(searchParams)

      try {
        const response = otHistorica 
                            ?  dispatch(fetchOT({OTAreas:areaActualOT.value, searchParams:searchParams, historica:true}))
                            :  baseUrl === '/api/ot/' ? dispatch(fetchOT({OTAreas:areaActualOT.value, searchParams:searchParams, historica:false}))  :  await ListEntity(searchParams, "01")

        
        
        if(Array.isArray(response) && response.length === 0){
          toast.success('Búsqueda Realizada: 0 resultados',{autoClose:1500})
        }
        
        toast.dismiss(toastLoading)
        if(baseUrl !== '/api/othistorica/' && baseUrl !== '/api/ot/'){
          setEntities(response)
        }

        toast.success('Busqueda Realizada',{autoClose:1500})
      } catch (error) {
        toast.dismiss(toastLoading)
        return error;
      }
    };




    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ( e.key === "Enter") {
          e.preventDefault();
          handleSubmit(handleSearch)();
        }
      },
      [handleSubmit, handleSearch]
    );

    const handleBlur = React.useCallback((e:any) => {
      if(e.target.value === ''){
        return;
      }
      handleSubmit(handleSearch)();
    }, []);

    const renderInputs = () => {
      const inputGroups = [];
      for (let i = 0; i < primaryKeyInputs.length; i += 6) {
        inputGroups.push(primaryKeyInputs.slice(i, i + 6));
      }
    
      return inputGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          // className={
          //   primaryKeyInputs.length > 5
          //      `${otHistorica ? "grid grid-rows-3 grid-cols-2 w-[100%] px-0" : "grid grid-rows-3 grid-cols-2" } w-[30vw] h-[30vh]  items-center `
          //     : "flex mb-auto items-cente w-[70rem]  items-center "
          // }
          className={className}
        >
          {group.map((input, inputIndex) => (
            <div key={inputIndex} className="items-center rowForm ">
              {input.type === "number" ? (
                // <div className={`w-[90%] items-center input-container rowForm`}>
                <div className={`input-container ${input.styles?.with ? input.styles.with : ""}`}>
                  {/* <div className={`-mt-2 mx-auto w-[96%]`}> */}
                  <div className={``}>
                    {input.name === "_pEsferico" ? (
                      // <div className="grid grid-rows-1 grid-cols-2">
                      <div className="flex !w-[14rem]">
                        <Controller
                          name="_pEsferico"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Input
                              color="orange"
                              tabIndex={1}
                              className={`${input?.styles?.with || "!w-[8rem] "} !h-12 !mt-3 !mr-[0.8rem]`}
                              // className={`${input.styles?.with ? input.styles.with : ""}`}
                              {...field}
                              label={input.label}
                              value={inputValues["_pEsferico"] || ""}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange("_pEsferico", e.target.value);
                              }}
                              onKeyDown={handleKeyDown}
                              onBlur={handleBlur}
                              labelProps={{
                                style: {
                                  color: "grey",
                                  fontWeight: "normal",
                                  fontSize: "16px",
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
                              className={`${input?.styles?.with || "!w-[8rem]"} !h-12 !mt-3`}
                              {...field}
                              label="Cilíndrico"
                              value={cilindrico}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange('_pCilindrico', e.target.value);
                                setCilindrico(e.target.value as any);
                              }}
                              onKeyDown={handleKeyDown}
                              onBlur={handleBlur}
                              labelProps={{
                                style: {
                                  color: "grey",
                                  fontWeight: "normal",
                                  fontSize: "16px",
                                },
                              }}
                            />
                          )}
                        />
                      </div>
                    ) : (
                      <div className={`input-container ${input.styles?.with ? input.styles.with : ""}`}>
                        <Controller
                        name={input.name}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            color="orange"
                            tabIndex={1}
                            className={`!h-12 !mt-4 `}
                            // className=""
                            {...field}
                            type={input.type}
                            label={input.label}
                            value={inputValues[input.name] || ""}
                            onChange={(e) => {
                              field.onChange(e);
                              handleInputChange(input.name, e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            labelProps={{
                              style: {
                                color: "grey",
                                fontWeight: "normal",
                                fontSize: "16px",
                              },
                            }}
                          />
                        )}
                      />
                      </div>
                    )}
                  </div>
                </div>
              ) : input.type === "select" ? (
              // <div className={`input-container ${input.styles?.with ? input.styles.with : "!w-[20rem]"}`}>
              input.tipos ? (
                <div className="input-container !mt-[0.4rem]">
                    <SelectInputTiposComponent
                      label={input.label}
                      name={input.name}
                      showRefresh={true}
                      control={control}
                      entidad={input._p1 ? [input.tipos, input._p1] : input.tipos}
                      inputName={input.name}
                      inputValues={inputValues}
                      setHandleSearch={handleSearch}
                      handleSelectChange={handleSelectChange}
                      customWidth={input.styles?.with}
                    />
                </div>
              ): (
                <div className="input-container ">
                    {/* <div className={` ${primaryKeyInputs.length > 4 ? "w-full" : "w-[13rem]"}`}> */}
                    {/* <div className={`${input.styles?.with ? input.styles.with : ""} `}> */}
                    <div className="w-full ">
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
                            customWidth={input.styles?.with}
                          />
                    </div>
                  </div>
              )
              ) : input.type === "date" ? (
                <div className={`input-container relative rowForm !mr-[1rem] !mt-[0.2rem] 
                              ${input.styles?.with ? input.styles.with : ""}`}>
                  {/* <label className="primaryKeyLabel items-center text-xs mt-1 absolute top-[-1rem]">{input.label}</label> */}
                  <label className="primaryKeyLabel items-center text-base mt-1 absolute top-[-1.1rem]">{input.label}</label>
                  <Controller
                    name={input.name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="date"
                        color="orange"
                        className="h-[3rem] w-full border border-gray-500 rounded "
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        onBlur={handleBlur}
                      />
                    )}
                  />
                </div>
              ) : (
                // Otros tipos de entrada
              <div className={`input-container !mt-[-0.3rem] !ml-[0rem] !mr-4 !pl-[0rem] !pr-[1rem] 
                              ${input.styles?.with ? input.styles.with : ""}`}>
                <Controller
                  name={input.name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      color="orange"
                      tabIndex={1}
                      // className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2`}
                      className={`!m-0 !h-12 !mt-[0.3rem]  ${input?.styles?.with || ""}`}
                      {...field}
                      type={input.type}
                      label={input.label}
                      value={inputValues[input.name] || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(input.name, e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                      onBlur={handleBlur}
                      labelProps={{
                        style: {
                          color: "grey",
                          fontWeight: "normal",
                          fontSize: "16px",
                        },
                      }}
                    />
                  )}
                />
            </div>
              )}
            </div>
          ))}
        </div>
      ));
    };
    
    // useEffect(() => {
    //   const searchParams = {
    //     _p1: inputValues._p1 || "",
    //     _p2: inputValues._p2 || "",
    //     _p3: inputValues._p3 || "",
    //     _p4: inputValues._p4 || "",
    //     _pMarca: inputValues._pMarca || "",
    //     _pProveedor: inputValues._pProveedor || "",
    //     _pDiseño: inputValues._pDiseño || "",
    //     _pIndice: inputValues._pIndice || "",
    //     _pMaterial: inputValues._pMaterial || "",
    //     _pColor: inputValues._pColor || "",
    //     _pTratamiento: inputValues._pTratamiento || "",
    //     _pDiametro: inputValues._pDiametro || "",
    //     _pEsferico: inputValues._pEsferico || "",
    //     _pCilindrico: inputValues._pCilindrico || "",
    //     _id: inputValues._id || "",
    //   };

    //   updateParams(searchParams);
    // }, [inputValues]);

    return (
      <form className="primaryKeyContainer items-center relative ">
        {renderInputs()}
        {/* <div className={`${otHistorica ? "ml-[-13rem] mr-20" : ""}   w-[60px] `}> */}
        <div className={`w-[80px] h-[50px]   ${baseUrl === '/api/ot/' ? 'absolute left-[84rem]' : ''} `}>
          <Tooltip content="Buscar">
              <IconButton
              tabIndex={1}
                variant="text"
                // className="primaryKeyIconButton items-center ml-2 mr-16  "
                className="primaryKeyIconButton ml-2 mr-2"
                type="submit"
                onClick={(e)=>{
                  e.preventDefault()
                  // const result = sesionExpirada()
                  // console.log(result)
                  return handleSubmit(handleSearch)()
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="primaryKeyIcon w-full  !mt-2"/>
            </IconButton>
          </Tooltip>
        </div>
        {description && (
          <input
            className="mx-8 w-[44rem] border-none absolute bottom-[-2rem] left-[-2rem]"
            readOnly={true}
            type="text"
            defaultValue={cristalDescritpion && cristalDescritpion[3]}
          />
        
        )}
      </form>
    );
  }
);

export default PrimaryKeySearch;
