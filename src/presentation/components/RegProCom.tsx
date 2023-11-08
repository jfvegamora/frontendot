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
};
const fetcher = (url:string) => fetch(url).then((res) => res.json());

const RegProCom:React.FC<IProps> = ({
    control,
    defaultRegion,
    defaultComuna,
    defaultProvincia,
    register,
    setValue,
    name
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
  
  

  const handleRegionChange = (e: { target: { value: string; }; }) => {
    const regionId = parseInt(e.target.value, 10);
    setSelectedRegion(regionId);
    setSelectedProvince(0);
  };

  const handleProvinceChange = (e: { target: { value: string; }; }) => {
    const provinceId = parseInt(e.target.value, 10);
    setSelectedProvince(provinceId);
  };

  const handleCommuneChange = (e: { target: { value: string; }; }) => {
    const communeId = parseInt(e.target.value, 10);
    setSelectedCommune(communeId);
    setValue("comuna", communeId);
  };

  
  return (
    <div className='w-full py-2 items-center'>
        <div className="w-[93%] mb-4">
            <Controller
                name="cliente_region_id"
                // defaultValue={}
                control={control}
                render={({field})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                        <div className='custom-select custom-select-reg relative rounded-lg !h-[3rem]'>
                        <label className="labelSelectReg absolute top-[-6%] left-3 text-gray-600 font-extralight text-xs z-20">Región</label>
                        <select 
                            {...field}
                            value={selectedRegion} 
                            onChange={handleRegionChange}
                            className="custom-input py-2 px-3 cursor-pointer z-0 "
                            >
                                <option value={0}>Región</option>
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
                        <label className="labelSelectReg absolute top-[-6%] left-3 text-gray-600 font-extralight text-xs z-20">Provincia</label>
                        <select 
                            {...field}
                            value={selectedProvince} 
                            onChange={handleProvinceChange}
                            className="custom-input py-2 px-3 cursor-pointer z-0 "
                            >
                                <option value={0}>Provincia</option>
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
        <div className="w-[93%] ">
            <Controller
                name={name}
                // defaultValue={}
                control={control}
                render={({})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                        <div className='custom-select custom-select-reg relative rounded-lg !h-[3rem]'>
                        <label className="labelSelectReg absolute top-[-6%] left-3 text-gray-600 font-extralight text-xs z-20">Comuna</label>
                        <select 
                            {...register(name)}
                            value={selectedCommune} 
                            onChange={handleCommuneChange}
                            className="custom-input py-2 px-3 cursor-pointer z-0 "
                            >
                                <option value={0}>Comuna</option>
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