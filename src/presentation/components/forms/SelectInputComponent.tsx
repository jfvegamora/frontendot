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
}

// const SelectInputComponent: React.FC<ISelectInputProps> = React.memo(
//   ({
//     label,
//     control,
//     name,
//     showRefresh,
//     data,
//     error,
//     entidad,
//     setHandleSearch,
//     inputValues,
//     handleSelectChange,
//     readOnly,
//     customWidth,
//   }) => {
//     const [refreshToggle, setrefreshToggle] = useState(false);
//     const [entities, setEntities] = useState([]);
//     const strUrl = entidad && entidad[0];
//     const strTableName = entidad[2] ? `_p1=${entidad[2]}` : "";
//     const inputRef = useRef(null);

//     const { ListEntity } = useCrud(strUrl);

//     const { refreshData } = useEntityUtils(strUrl, entidad[1]);

//     const [selectedOption, setSelectedOption] = useState<{
//       value: any;
//       label: string | undefined;
//     }>({
//       value: "",
//       label: undefined,
//     });

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const dataResponse = await ListEntity(strTableName, entidad[1]);
//           if (dataResponse?.name === "AxiosError") {
//             return;
//           }
//           setEntities(dataResponse);
//           refreshData();
//           if (data !== null && data !== undefined) {
//             const entityName = dataResponse.find(
//               (entity: any) => entity[0] === data
//             )?.[1];
//             if (entityName) {
//               setSelectedOption({
//                 value: data,
//                 label: entityName,
//               });
//             } else {
//               setSelectedOption({
//                 value: data,
//                 label: "Nombre no encontrado",
//               });
//             }
//           } else {
//             setSelectedOption({
//               value: "",
//               label: "Seleccionar",
//             });
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };

//       fetchData();
//     }, [refreshToggle, refreshData, data]);
//     console.log("selectedOption", selectedOption);

//     return (
//       <div className="flex min-w-[60px] w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
//         {/* <label className="label-input w-1/3">{label}</label> */}
//         <Controller
//           name={name}
//           control={control}
//           render={({ field }) => (
//             <>
//               <Select
//                 {...field}
//                 placeholder={label}
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     width: customWidth,
//                   }),
//                 }}
//                 ref={inputRef}
//                 isDisabled={readOnly}
//                 options={[
//                   {
//                     value: "0",
//                     label: label,
//                   },
//                   ...entities.map((option: string) => ({
//                     value: option[0] !== undefined ? option[0].toString() : "",
//                     label: option[1],
//                   })),
//                 ]}
//                 value={selectedOption}
//                 formatOptionLabel={(option) => (
//                   <div>
//                     {option.label}
//                     {option.value === field.value && (
//                       <span className="ml-2">(Seleccionado)</span>
//                     )}
//                   </div>
//                 )}
//                 onChange={(e: any) => {
//                   if (e) {
//                     console.log(e);
//                     // setSelectedOption(e);
//                     field.onChange(e.value);
//                   } else {
//                     // setSelectedOption({
//                     // value: "",
//                     //   label: "Seleccionar", // Restablece el placeholder
//                     // });
//                     field.onChange(null);
//                   }
//                   if (setHandleSearch) {
//                     const selectedValue = e.value.toString();
//                     handleSelectChange(name, selectedValue);
//                     const inputValuesToUpdate = {
//                       ...inputValues,
//                       [name]: selectedValue,
//                     };

//                     if (setHandleSearch) {
//                       setHandleSearch(inputValuesToUpdate);
//                     }
//                   }
//                   setrefreshToggle((prev) => !prev);
//                 }}
//               />
//             </>
//           )}
//         />

//         {showRefresh && (
//           <Tooltip content="Refrescar">
//             <IconButton
//               onClick={() => setrefreshToggle((prev) => !prev)}
//               variant="text"
//               color="blue-gray"
//               className="mx2"
//             >
//               <FiRefreshCw className="h-6 w-6" />
//             </IconButton>
//           </Tooltip>
//         )}

//         {error && (
//           <p className="text-xs text-red-500 absolute right-20">
//             {error.message}
//           </p>
//         )}
//       </div>
//     );
//   }
// );

// export default SelectInputComponent;

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
  }) => {
    const [refreshToggle, setrefreshToggle] = useState(false);
    const [entities, setEntities] = useState([]);
    const [strSelectedName, setStrSelectedName] = useState(data);
    const strUrl = entidad && entidad[0];
    const strTableName = entidad[2] ? `_p1=${entidad[2]}` : "";
    const inputRef = useRef(null);

    const { ListEntity } = useCrud(strUrl);

    const { refreshData } = useEntityUtils(strUrl, entidad[1]);

    useEffect(() => {
      refreshData();
      if (data) {
        const name =
          data && entities.find((entity: any) => entity[0] === data)?.[1];
        setStrSelectedName(name);
      }
      ListEntity(strTableName, entidad[1])
        .then((data: any) => {
          if (data?.name === "AxiosError") {
            return;
          } else {
            data && setEntities(data);
          }
        })
        .catch((e) => console.log(e));
    }, [refreshToggle, refreshData, data]);

    return (
      <div className="flex min-w-[60px] w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
        {/* <label className="label-input w-1/3">{label}</label> */}
        <Controller
          name={name}
          control={control}
          defaultValue={strSelectedName}
          render={({ field }) => (
            <>
              <select
                {...field}
                ref={inputRef}
                disabled={readOnly}
                onChange={(e) => {
                  field.onChange(e);
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
                {!data && <option value={"0"}>{label}</option>}
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
              {/* <div className="relative">
                <GoTriangleDown
                  className="absolute right-3 top-[-10px] w-5 h-5 z-10"
                  onClick={() => {
                    const select = inputRef.current;
                    console.log(select);
                    if (select) {
                      const event = new MouseEvent("mousedown", {
                        bubbles: true,
                        cancelable: true,
                      });
                      console.log(event);
                      select.dispatchEvent(event);
                      select.focus();
                      select.click(); // Simula un clic en el select
                    }
                  }}
                />
              </div> */}
            </>
          )}
        />

        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => setrefreshToggle((prev) => !prev)}
              variant="text"
              color="blue-gray"
              className="mx2"
            >
              <FiRefreshCw className="h-6 w-6" />
            </IconButton>
          </Tooltip>
        )}

        {error && (
          <p className="text-xs text-red-500 absolute right-20">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

export default SelectInputComponent;
