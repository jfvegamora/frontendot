import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { SelectInputComponent } from ".";
import { useCrud } from "../../hooks";
// import axios from "axios";
// import useSWR from "swr";

interface Props {
  control: any;
  isEditting?: boolean;
  data?: any;
  EnumGrid?: any;
  errors?: any;
  handleSelectChange?:any
}

const RegProComponent: React.FC<Props> = React.memo(
  ({ control, isEditting, data, EnumGrid, errors,handleSelectChange }) => {
    const [provincias, setProvincias] = useState([]);
    const [regiones, setRegiones] = useState( data && data[21] || 0);
    const [comunas, setComunas] = useState([]);

    const [provinciaName, _setProvinciaName] = useState(
      data ? data[EnumGrid.cliente_provincia] : ""
    );
    const [comunaName, setComunaName] = useState(
      data ? data[EnumGrid.cliente_comuna] : ""
    );
    const [selectedProvincia, setSelectedProvincia] = useState(
      data ? data[EnumGrid.cliente_provincia_id] : 0
    );
    const [_selectedComuna, setSelectedComuna] = useState(
      data ? data[EnumGrid.cliente_comuna_id] : 0
    )
    const { ListEntity } = useCrud("/api/provincias/");
    const { ListEntity: ListEntityComunas } = useCrud("/api/comunas/");

    //  const fetcher = (url:string) => axios.get(url).then((res)=>res.data);
    // const { data:cristal1OD } = useSWR(`https://mtooptsicos.cl/api//listado/?query=01&_p1=${codCristal1OD}`, fetcher);

    // console.log(data)
    // console.log(regiones)

    console.log(provinciaName)

    useEffect(() => {
      // const _p1 = `_p1=${data ? data[EnumGrid.region_id] : regiones}`;
      console.log(regiones)
      const _p1 = data 
          ?  `_p1=${regiones === 0 ? data[21] : regiones}`
          :  `_p1=${regiones}`
      
            // console.log('_p2', _p2)
      ListEntity(_p1, "02")
        .then((provincias) => {
          console.log(provincias)
          setProvincias(provincias);
          if (provincias.length > 0) {
            // Si hay al menos una provincia, establece la selección inicial
            // console.log('provincias', provincias)
            setSelectedProvincia(data ? data[23] : provincias[0][0]);
          }
          // if (data) {
          //   const provinciaName = provincias.find(
          //     (provincia: any[]) => provincia[0] === data[EnumGrid.provincia_id]
          //   )?.[1];

          //   setProvinciaName(provinciaName);
          // }
        })
        .catch((e) => console.log(e));
    }, [regiones]);



    useEffect(() => {
      // const _p1 = `_p1=${
      //   data ? data[EnumGrid.provincia_id] : selectedProvincia
      // }`;
      const _p1 = data
          ? `_p1=${selectedProvincia === 0 ? data[EnumGrid.provincia_id] : selectedProvincia}`
          : `_p1=${selectedProvincia}`
      // console.log('_p1', _p1)
      // console.log('selectedProvincia', selectedProvincia)


      ListEntityComunas(_p1, "02")
        .then((comunas) => {
          setComunas(comunas);
          if (data) {
            const comunaName = comunas.find(
              (comuna: any[]) => comuna[0] === data[EnumGrid.comuna_id]
            )?.[1];
            // console.log(data[EnumGrid.comuna_id])
            setComunaName(comunaName);
            setSelectedComuna(comunaName)
            
          }
        })
        .catch((e) => console.log(e));
    }, [selectedProvincia, data, EnumGrid.comuna_id, comunaName]);

    // console.log('comunas', comunas)
    // console.log('regiones:',regiones === 0 ? 'si': 'no')
//23-24
    // console.log('errors', errors)

    console.log(provinciaName)
    console.log(data)
    // console.log(data[EnumGrid.cliente_provincia_id])
    return (
      <div className=" flex flex-col min-w-full w-full items-center mb-4  mt-select mt-select-dropdown-up cursor-pointer ">
        <div className="w-[95%] ml-[-5%] mb-2 ">
          <SelectInputComponent
            label="Region"
            name="region"
            control={control}
            data={data && data[EnumGrid?.cliente_region_id]}
            entidad={["/api/regiones/", "02"]}
            error={!isEditting && errors}
            setState={setRegiones}
          />
        </div>

        <div className="w-[95%] ml-[-5%] mb-2 ">
          <SelectInputComponent
            label="Region"
            name="region"
            control={control}
            data={data && data[EnumGrid?.cliente_provincia_id]}
            entidad={["/api/provincias/", "02"]}
            error={!isEditting && errors}
            setState={setRegiones}
          />
        </div>

        <div className="w-full">
          <div className="flex min-w-[100%]w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
            <div className="custom-select relative">
              <label className="absolute top-[-6%] left-3 text-gray-600 font-extralight text-xs z-20">Provincias</label>
              <select
                // defaultValue={data && provinciaName}
                // defaultValue={3}
                defaultValue={provinciaName}
              
                onChange={(e) => {
                  const selectedValue = parseInt(e.target.value, 10);
                  setSelectedProvincia(selectedValue);
                  
                }}
                className="custom-input py-2 px-3 w-[85%] cursor-pointer z-0"
              >
                {provincias.length > 1 &&
                  provincias.map((provincia, index) => (
                    <option
                      value={provincia[0]}
                      key={index}
                      // selected={provinciaName === provincia[1]}
                      // selected={true}
                      
                    >
                      {provincia[1]}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Controller
            name="cliente_comuna_id"
            defaultValue={data && data[EnumGrid.comuna_id]}
            control={control}
            render={({ field }) => (
              <div className="flex min-w-[100%]w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                <div className="custom-select relative">

                <label className="absolute top-[-6%] left-3 text-gray-600 font-extralight text-xs z-20">Comuna</label>
                  <select
                    {...field}
                    onChange={(e)=>{
                      console.log(e.target)
                      if(handleSelectChange){
                        handleSelectChange(e.target)
                      }
                    }}
                    defaultValue={data && data[EnumGrid.comuna_id]}
                    className="custom-input py-2 px-3 w-[85%] cursor-pointer z-0 "
                  >
                    {comunas.length > 1 &&
                      comunas.map((comuna, index) => {
                        // console.log('comuna[0]', comuna[0])
                        return(
                          <option
                          value={comuna[0] === undefined ? data[EnumGrid.comuna_id] : comuna[0]}
                          key={index}
                          defaultValue={data && data[EnumGrid.cliente_comuna]}
                          selected={true}
                          // selected={selectedComuna === comuna[1]}
                        >
                          {comuna[1]}
                        </option>
                        )
                      })}
                  </select>
                  {errors && (
                  <p className="text-xs text-red-500 absolute left-20 top-[-5%] ">
                    {errors.message}
                  </p>
                )}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
);

export default RegProComponent;
