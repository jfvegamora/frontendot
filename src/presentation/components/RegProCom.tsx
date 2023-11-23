import React,{useState} from 'react'
import { Controller } from 'react-hook-form';
import useSWR from 'swr';

interface IProps{
    control:any;
    isEditting?:boolean
    data?:any;
    EnumGrid?:any;
    errors?:any;
    setValue?:any;
    register?:any;
    defaultRegion?:number;
    defaultProvincia?:number;
    defaultComuna?:number;
    name:string
    tabIndex?: number;
};
const fetcher = (url:string) => fetch(url).then((res) => res.json());

const RegProCom:React.FC<IProps> = ({
    control,
    defaultRegion,
    defaultComuna,
    defaultProvincia,
    register,
    setValue,
    name,
    tabIndex,
    errors
}) => {

  const { data: regions } = useSWR('https://mtoopticos.cl/api/regiones/listado/?query=02', fetcher);
  
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion || 0);
  
  const { data: provinces } = useSWR(
    selectedRegion ? `https://mtoopticos.cl/api/provincias/listado/?query=02&_p1=${selectedRegion}` : null,
    fetcher
  );

  const [selectedProvince, setSelectedProvince] = useState(defaultProvincia || 0);

  const { data: comunas } = useSWR(
    selectedProvince ? `https://mtoopticos.cl/api/comunas/listado/?query=02&_p1=${selectedProvince}` : null,
    fetcher
  );
  const [selectedCommune, setSelectedCommune] = useState(defaultComuna || 0);


//   console.log(selectedRegion)
//   console.log(comunas)
  
//   console.log(defaultComuna)

  const handleRegionChange = (e: { target: { value: string; }; }) => {
    const regionId = parseInt(e.target.value, 10);
    console.log('cambio')
    setSelectedRegion(regionId);
    setSelectedProvince(0);
    setSelectedCommune(0)
  };

  const handleProvinceChange = (e: { target: { value: string; }; }) => {
    const provinceId = parseInt(e.target.value, 10);
    console.log('cambio')
    setSelectedProvince(provinceId);
    setSelectedCommune(0)
  };

  const handleCommuneChange = (e: { target: { value: string; }; }) => {
    const communeId = parseInt(e.target.value, 10);
    setSelectedCommune(communeId);
    setValue("comuna", communeId);
  };

//   console.log(defaultComuna)
//   console.log(selectedCommune)
//   console.log(comunas)
//   console.log(defaultProvincia)
//   console.log(defaultRegion)

//   console.log(errors)
// console.log(defaultComuna)
  return (
    <div className='w-full py-2 items-center'>
        <div className="w-[93%] mb-4">
            <Controller
                name="cliente_region_id"
                // defaultValue={}
                control={control}
                render={({field})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer  ">
                        <div className='custom-select custom-select-reg relative rounded-lg !h-[3rem]'>
                        <label className=" labelSelect absolute !top-[-3%] left-3 !text-[#f39c12] font-extralight text-xs z-20">Región</label>
                        <select 
                            {...field}
                            value={selectedRegion} 
                            onChange={handleRegionChange}
                            tabIndex  ={tabIndex || 1}
                            className="custom-input py-2 px-3 cursor-pointer z-0 "
                            >
                                {!regions && (
                                    <option value={undefined} className="text-sm">
                                        
                                    </option>
                                )}
                                    {regions && regions.map((region:any) => (
                                        <option key={region[0]} value={region[0]}>
                                            {region[1]}
                                        </option>
                                    ))}
                            </select>  
                        </div>
                    </div>
                )}
            /> 
        </div>  
        <div className="w-[93%] mb-4">
            <Controller
                name="cliente_provincia_id"
                // defaultValue={}
                control={control}
                render={({field})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                        <div className='custom-select custom-select-reg relative rounded-lg !h-[3rem]'>
                        <label className="labelSelect absolute !top-[-3%] left-3 !text-[#f39c12] font-extralight text-xs z-20">Provincia</label>
                        <select 
                            {...field}
                            value={selectedProvince} 
                            onChange={handleProvinceChange}
                            tabIndex  ={tabIndex || 1}
                            className="custom-input py-2 px-3 cursor-pointer z-0 "
                            >
                                {/* <option value={0}>Provincia</option> */}
                                {!provinces && (
                                    <option value={undefined} className="text-sm">
                                        
                                    </option>
                                    )}
                                    {provinces && provinces.map((province:any) => (
                                        <option key={province[0]} value={province[0]}>
                                            {province[1]}
                                        </option>
                                    ))}
                            </select>  
                        </div>
                    </div>
                )}
            /> 
        </div>  
        <div className="w-[93%] mb-4">
            <Controller
                name={name}
                // defaultValue={}
                control={control}
                render={({})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                        <div className='custom-select custom-select-reg relative rounded-lg !h-[3rem]'>
        
                                 <label className="labelSelect absolute !top-[-3%] left-3 !text-[#f39c12] font-extralight text-xs z-20">Comuna</label>
                                 {errors && (
                                    <p className="text-xs text-red-500 absolute top-[-2%] z-20  left-[22%] ">
                                        {errors.message}
                                    </p>
                                    )}
                                <select 
                            {...register(name)}
                            value={selectedCommune} 
                            defaultValue={defaultComuna && defaultComuna}
                            onChange={handleCommuneChange}
                            tabIndex  ={tabIndex || 1}
                            className="custom-input py-2 px-3 cursor-pointer z-0 "
                            >
                                {/* <option value={defaultComuna ? defaultComuna : 0}>Comuna</option> */}
                                {!comunas && (
                                    <option value={undefined} className="text-sm">
                    
                                </option>
                                )}
                                {/* <option>Comuna</option> */}
                                    {comunas && comunas.map((comuna:any) => (
                                        <option key={comuna[0]} value={comuna[0]}>
                                            {comuna[1]}
                                        </option>
                                    ))}
                            </select>  
                        </div>
                    </div>
                )}
            /> 
        </div>  
    </div>
  )
}




export default RegProCom;