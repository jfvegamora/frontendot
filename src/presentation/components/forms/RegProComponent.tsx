import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { SelectInputComponent } from ".";
import { useCrud } from "../../hooks";

interface Props {
  control: any;
  isEditting: boolean;
  data?: any;
  EnumGrid: any;
  errors: any;
}

const RegProComponent: React.FC<Props> = React.memo(
  ({ control, isEditting, data, EnumGrid, errors }) => {
    const [provincias, setProvincias] = useState([]);
    const [regiones, setRegiones] = useState(0);
    const [comunas, setComunas] = useState([]);


    // const [provinciaName, setProvinciaName] = useState(
    //   data ? data[EnumGrid.provincia] : ""
    // );
    // const [comunaName, setComunaName] = useState(
    //   data ? data[EnumGrid.comuna] : ""
    // );
    // const [selectedProvincia, setSelectedProvincia] = useState(0);
    
    const [provinciaName, _setProvinciaName] = useState(
      data ? data[EnumGrid.provincia] : ""
    );
    const [comunaName, setComunaName] = useState(
      data ? data[EnumGrid.comuna] : ""
    );
    const [selectedProvincia, setSelectedProvincia] = useState(
      data ? data[EnumGrid.provincia_id] : 0
    );
    const [_selectedComuna, setSelectedComuna] = useState(
      data ? data[EnumGrid.comuna_id] : 0
    )
    const { ListEntity } = useCrud("/api/provincias/");
    const { ListEntity: ListEntityComunas } = useCrud("/api/comunas/");



    useEffect(() => {
      // const _p1 = `_p1=${data ? data[EnumGrid.region_id] : regiones}`;

      const _p1 = data 
          ?  `_p1=${regiones === 0 ? data[EnumGrid.region_id] : regiones}`
          :  `_p1=${regiones}`
      
            // console.log('_p2', _p2)
      ListEntity(_p1, "02")
        .then((provincias) => {
          setProvincias(provincias);
          if (provincias.length > 0) {
            // Si hay al menos una provincia, establece la selección inicial
            setSelectedProvincia(data ? data[EnumGrid.provincia_id] : provincias[0][0]);
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


    // console.log('regiones:',regiones === 0 ? 'si': 'no')
  
    return (
      <div className="flex flex-col min-w-[60px] mt-4 w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
        <div className="w-full">
          <SelectInputComponent
            label="Region"
            name="region"
            control={control}
            data={data && data[EnumGrid?.region_id]}
            entidad={["/api/regiones/", "02"]}
            error={!isEditting && errors.region}
            setState={setRegiones}
          />
        </div>

        <div className="w-full">
          <div className="flex min-w-[100%]w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
            <div className="custom-select">
              <select
                defaultValue={data && provinciaName}
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
                      selected={provinciaName === provincia[1]}
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
            name="comuna"
            defaultValue={data && data[EnumGrid.comuna_id]}
            control={control}
            render={({ field }) => (
              <div className="flex min-w-[100%]w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                <div className="custom-select">
                  <select
                    {...field}
                    defaultValue={data && data[EnumGrid.comuna_id]}
                    className="custom-input py-2 px-3 w-[85%] cursor-pointer z-0"
                  >
                    {comunas.length > 1 &&
                      comunas.map((comuna, index) => {
                        // console.log('comuna[0]', comuna[0])
                        return(
                          <option
                          value={comuna[0] === undefined ? data[EnumGrid.comuna_id] : comuna[0]}
                          key={index}
                          defaultValue={data && data[EnumGrid.comuna_id]}
                          selected={comunaName === comuna[1]}
                          // selected={selectedComuna === comuna[1]}
                        >
                          {comuna[1]}
                        </option>
                        )
                      })}
                  </select>
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
