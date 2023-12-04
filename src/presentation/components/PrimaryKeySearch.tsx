/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IconButton, Input, Tooltip } from "@material-tailwind/react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useCrud from "../hooks/useCrud";
import { SelectInputComponent } from ".";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface IPrimaryKeyState {
  [key: string]: string | number;
}

interface PrimaryKeySearchProps {
  setEntities: any;
  setParams?: any;
  primaryKeyInputs: {
    label: string;
    type: string;
    name: string;
    options?: string[];
    styles?: {with:string};
    selectUrl?: any;
    values?: any;
    tipos?: string;
  }[];
  baseUrl: string;
  updateParams: any;
  description?: any;
}


// const MemoizedMagnifyingGlassIcon = React.memo(() => (
//   <MagnifyingGlassIcon className="primaryKeyIcon" />
// ));

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = React.memo(
  ({ setEntities, primaryKeyInputs, baseUrl, updateParams, description }) => {
    const { control, handleSubmit } = useForm<IPrimaryKeyState>();
    const [cilindrico, setCilindrico] = useState();
    const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});
    const [cristalDescritpion, setCristalDescription] = useState(
      description || ""
    );
    const { ListEntity } = useCrud(baseUrl);
    // console.log("cristalDescritpion", cristalDescritpion[3]);
    
    useEffect(() => {
      // Actualiza el estado interno cuando la prop description cambia
      setCristalDescription(description || '');
    }, [description]);
    
    
    
    const handleInputChange = React.useCallback(
      (name: string, value: string) => {
        console.log(name)
        setInputValues((prev) => ({ ...prev, [name]: value }));
      },
      [inputValues, updateParams]
    );

    const handleSelectChange = React.useCallback(
      (name: string, value: string) => {
        setInputValues((prev) => ({ ...prev, [name]: value }));
        updateParams({
          ...inputValues,
          [name]: value,
        });
      },
      [inputValues, updateParams]
    );

    const handleSearch = React.useCallback(async (data: any) => {
      // filterToggle.value = false;
      // console.log(data)
      // console.log(cilindrico)
      if ("_pCilindrico" in data || "_pEsferico" in data) {
        data = {
          ...data,
        };
      }

      // console.log('data search', data)
      
      if(primaryKeyInputs[1]){
        if(primaryKeyInputs[1]["type"] === "date" && primaryKeyInputs[2]["type"] === "date"){
          if(new Date(data["_p2"]) > new Date(data["_p3"])){
            alert('Fecha desde es mayor a la fecha Hasta')
            return null;
          }
        }
      }

      const searchParams = Object.entries(data)
        .map(([key, value]: any) =>
          key === "_p1" || value ? `${key}=${encodeURIComponent(value)}` : ""
        )
        .filter((param) => param !== "")
        .join("&");
      
      data && updateParams([searchParams]);
      // console.log(data)
      // console.log(searchParams)
      try {
        const response = await ListEntity(searchParams, "01");
        setEntities(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleSubmit(handleSearch)();
        }
      },
      [handleSubmit, handleSearch]
    );

    const handleBlur = React.useCallback(() => {
      handleSubmit(handleSearch)();
    }, []);
    // console.log(inputValues)

    // const renderInputs = () => {
    //   const inputGroups = [];
    //   for (let i = 0; i < primaryKeyInputs.length; i += 6) {
    //     inputGroups.push(primaryKeyInputs.slice(i, i + 6));
    //   }

    //   return inputGroups.map((group, groupIndex) => (
    //     <div
    //       key={groupIndex}
    //       className={
    //         primaryKeyInputs.length > 5
    //           ? `grid grid-rows-3 w-[40vw] h-[30vh] grid-cols-2 items-center `
    //           : "flex mb-auto items-cente w-[70rem] ml-[-1rem] items-center "
    //       }
    //     >
    //       {group.map((input, inputIndex) => (
    //         <Controller
    //           key={inputIndex}
    //           name={input.name}
    //           control={control}
    //           defaultValue=""
    //           render={({ field }) => (
    //             <div className="w-full flex items-center rowForm input-container">
    //               {input.type === "select" ? (
    //                 input.tipos  ? (
    //                   // <div className={` items-center bg-red-500 mb-2 w-[90%] `}>
    //                   <div className="input-container custom-select-key w-full">
    //                     <SelectInputTiposComponent
    //                       label={input.label}
    //                       name={input.name}
    //                       showRefresh={true}
    //                       control={control}
    //                       entidad={input.tipos}
    //                       inputValues={inputValues}
    //                       setHandleSearch={handleSearch}
    //                       handleSelectChange={handleSelectChange}
                          
    //                     />
    //                   </div>
    //                 ) : (
    //                   <div className={` input-container w-full !mt-2`}>
    //                   <SelectInputComponent
    //                     label={input.label}
    //                     name={input.name}
    //                     showRefresh={true}
    //                     control={control}
    //                     entidad={
    //                       input.tipos
    //                         ? [input.selectUrl, "02", input.tipos]
    //                         : [input.selectUrl, "02"]
    //                     }
    //                     inputName={input.name}
    //                     inputValues={inputValues}
    //                     setHandleSearch={handleSearch}
    //                     handleSelectChange={handleSelectChange}
    //                     customWidth={"200px"}
    //                   />
    //                 </div>
    //                 )
                    
    //               ) : input.type === "radiobuttons" ? (
    //                 <div className="relative px-8 items-center py-4 w-[92%]  mt-2 mx-auto border-[0.5px] border-[dodgerblue] rounded-md flex">
    //                   <label className="absolute text-sm top-[-10px] left-4 bg-[ghostwhite] w-[6rem]">
    //                     <span className="ml-[20px] text-[16px]">
    //                       {input.label}
    //                     </span>
    //                   </label>
    //                   <div className="primaryKeyRadioContainer">
    //                     {input.options?.map((entity, index) => (
    //                       <div
    //                         key={index}
    //                         className="primaryKeybtnRadioContainer"
    //                       >
    //                         <input
    //                           type="radio"
    //                           {...field}
    //                           value={input.values[entity]}
    //                           onChange={(e) => {
    //                             field.onChange(e.target.value);
    //                           }}
    //                         />
    //                         <span className="ml-1">{entity}</span>
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </div>
    //               ) : input.type === "date" ? (
    //                 <div className="ml-6 w-full mx-2 items-center relative mt-2">
    //                   <label className="primaryKeyLabel items-center text-xs mt-1 absolute top-[-1rem]">{input.label}</label>
    //                   <input
    //                     type="date"
    //                     className="h-[2.5rem] w-full border border-black rounded"
    //                     {...field}
    //                     value={field.value || ""}
    //                     onChange={(e) => {
    //                       field.onChange(e.target.value);
    //                     }}
    //                     onBlur={handleBlur}
    //                   />
    //                 </div>
    //               ) : (
    //                 <div className="w-[90%]  items-center input-container rowForm  ">
    //                       <div className={`-mt-2 mx-auto w-[96%] `}>
    //                         {input.name === "_pEsferico" ? (
    //                           <div className="grid grid-rows-1 grid-cols-2 ">
    //                             <Input
    //                             color="orange"
    //                             type={input.type}
    //                             tabIndex={1}
    //                             className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2`}
    //                             {...field}
    //                             label={input.label}
    //                             value={inputValues[input.name] || ""}
    //                             onChange={(e) => {
    //                               field.onChange(e);
    //                               handleInputChange(input.name, e.target.value);
    //                             }}
    //                             onKeyDown={handleKeyDown}
    //                             onBlur={handleBlur}
    //                             labelProps={{
    //                               style: {
    //                                 color: "grey",
    //                                 fontWeight: "normal",
    //                                 fontSize: "16px",
    //                               },
    //                             }}
    //                             />
    //                             <Input
    //                               {...register('_pCilindrico')}
    //                               color="blue"
    //                               tabIndex={1}
    //                               className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2`}
    //                               type={input.type}
    //                               label="Cilíndrico"
    //                               value={cilindrico}
    //                               onChange={(e) => {
    //                                 field.onChange(e);
    //                                 setCilindrico(e.target.value as any)
    //                                 // handleInputChange("_pCilindrico", e.target.value);
    //                               }}
    //                               onKeyDown={handleKeyDown}
    //                               onBlur={handleBlur}
    //                               labelProps={{
    //                                 style: {
    //                                   color: "grey",
    //                                   fontWeight: "normal",
    //                                   fontSize: "16px",
    //                                 },
    //                               }}
                                
    //                           />
                              
    //                           </div>
    //                         ) : (
    //                           <Input
    //                             color="orange"
    //                             tabIndex={1}
    //                             className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2`}
    //                             {...field}
    //                             type={input.type}
    //                             label={input.label}
    //                             value={inputValues[input.name] || ""}
    //                             onChange={(e) => {
    //                               field.onChange(e);
    //                               handleInputChange(input.name, e.target.value);
    //                             }}
    //                             onKeyDown={handleKeyDown}
    //                             onBlur={handleBlur}
    //                             labelProps={{
    //                               style: {
    //                                 color: "grey",
    //                                 fontWeight: "normal",
    //                                 fontSize: "16px",
    //                               },
    //                             }}
    //                           />
    //                         )}
    //                       </div>
    //                 </div>
    //               )}
    //             </div>
    //           )}
    //         />
    //       ))}
    //       {/* <div className="">
    //         <Tooltip content="Buscar">
    //         <IconButton
    //         tabIndex={1}
    //           variant="text"
    //           className="primaryKeyIconButton items-center ml-6 "
    //           type="submit"
    //           onClick={handleSubmit(handleSearch)}
    //         >
    //           <MemoizedMagnifyingGlassIcon />
            
    //         </IconButton>
    //       </Tooltip>
    //       </div> */}
    //     </div>
    //   ));
    // };

    const renderInputs = () => {
      const inputGroups = [];
      for (let i = 0; i < primaryKeyInputs.length; i += 6) {
        inputGroups.push(primaryKeyInputs.slice(i, i + 6));
      }
    
      return inputGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={
            primaryKeyInputs.length > 5
              ? `grid grid-rows-3 w-[40vw] h-[30vh] grid-cols-2 items-center `
              : "flex mb-auto items-cente w-[70rem]  items-center "
          }
        >
          {group.map((input, inputIndex) => (
            <div key={inputIndex} className="w-full flex items-center rowForm input-container">
              {input.type === "number" ? (
                <div className={`w-[90%] items-center input-container rowForm`}>
                  <div className={`-mt-2 mx-auto w-[96%]`}>
                    {input.name === "_pEsferico" ? (
                      <div className="grid grid-rows-1 grid-cols-2  ">
                        <Controller
                          name="_pEsferico"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Input
                              color="orange"
                              tabIndex={1}
                              className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2 !mt-4`}
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
                              color="blue"
                              tabIndex={1}
                              className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2 !mt-4`}
                              {...field}
                              label="Cilíndrico"
                              value={cilindrico}
                              onChange={(e) => {
                                field.onChange(e);
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
                      
                      <div className={`${input?.styles?.with || "!w-[96%] "} `}>
                        <Controller
                        name={input.name}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            color="orange"
                            tabIndex={1}
                            // className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2 !mt-4`}
                            className={`!h-12 ml-2 !mt-4 `}
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
                <div className={` input-container w-full !mt-6 `}>
                  <div className={` ${primaryKeyInputs.length > 4 ? "w-full" : "w-[13rem]"}`}>
                        <SelectInputComponent
                          label={input.label}
                          name={input.name}
                          showRefresh={true}
                          control={control}
                          entidad={
                            input.tipos
                              ? [input.selectUrl, "02", input.tipos]
                              : [input.selectUrl, "02"]
                          }
                          inputName={input.name}
                          inputValues={inputValues}
                          setHandleSearch={handleSearch}
                          handleSelectChange={handleSelectChange}
                      
                        />
                  </div>
                </div>
              ) : input.type === "date" ? (
                <div className="ml-6 w-full mx-2 items-center relative !mt-4">
                  <label className="primaryKeyLabel items-center text-xs mt-1 absolute top-[-1rem]">{input.label}</label>
                  <Controller
                    name={input.name}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="date"
                        className="h-[2.5rem] w-full border border-black rounded"
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
                <Controller
                  name={input.name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      color="orange"
                      tabIndex={1}
                      className={`${input?.styles?.with || "!w-[96%]"} !h-12 ml-2`}
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
              )}
            </div>
          ))}
        </div>
      ));
    };
    
    useEffect(() => {
      const searchParams = {
        _p1: inputValues._p1 || "",
        _p2: inputValues._p2 || "",
        _p3: inputValues._p3 || "",
        _p4: inputValues._p4 || "",
        _pMarca: inputValues._pMarca || "",
        _pProveedor: inputValues._pProveedor || "",
        _pDiseño: inputValues._pDiseño || "",
        _pIndice: inputValues._pIndice || "",
        _pMaterial: inputValues._pMaterial || "",
        _pColor: inputValues._pColor || "",
        _pTratamiento: inputValues._pTratamiento || "",
        _pDiametro: inputValues._pDiametro || "",
        _pEsferico: inputValues._pEsferico || "",
        _pCilindrico: inputValues._pCilindrico || "",
        _id: inputValues._id || "",
      };

      updateParams(searchParams);
    }, [inputValues]);

    return (
      <form className="primaryKeyContainer items-center relative">
        {renderInputs()}
        <Tooltip content="Buscar">
            <IconButton
            tabIndex={1}
              variant="text"
              className="primaryKeyIconButton items-center ml-2 mr-16  "
              type="submit"
              onClick={handleSubmit(handleSearch)}
            >
              {/* <MemoizedMagnifyingGlassIcon /> */}
              {/* <MagnifyingGlassIcon className="primaryKeyIcon" se} /> */}
              <FontAwesomeIcon icon={faMagnifyingGlass} className="primaryKeyIcon"/>
            </IconButton>
          </Tooltip>
       
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
