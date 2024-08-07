// import { signal } from '@preact/signals-react';
import React,{useEffect, useState} from 'react'
import { Controller } from 'react-hook-form';
import { validationClienteComuna } from '../utils/validationOT';
import { AppStore, useAppSelector } from '../../redux/store';

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
    onlyRead?:boolean;
    isOT?:boolean;
    onDataChange?:any;
    className?:string;
    isOptional?:boolean;
};

const RegProCom:React.FC<IProps> = ({
    control,
    defaultRegion,
    defaultComuna,
    defaultProvincia,
    register,
    name,
    tabIndex,
    errors,
    onlyRead,
    isOT,
    onDataChange,
    className,
    isOptional
}) => {

    const [selectedRegion,   setSelectedRegion]         = useState(defaultRegion    || 0);
    const [selectedProvince, setSelectedProvince]       = useState(defaultProvincia || 0);
    const [selectedCommune,  setSelectedCommune]        = useState(defaultComuna    || 0);
    
    const {Regiones, Provincias, Comunas}:any           = useAppSelector((store: AppStore) => store.utils);



const handleRegionChange = (e: { target: { value: string; }; }) => {
    const regionId = parseInt(e.target.value, 10);
    isOT ? (onDataChange({['cliente_region']: regionId})) : ('')
    setSelectedRegion(regionId);
    setSelectedProvince(0);
  };

  const handleProvinceChange = (e: { target: { value: string; }; }) => {
    const provinceId = parseInt(e.target.value, 10);
    isOT ? (onDataChange({['cliente_provincia']: provinceId})) : ('')
    setSelectedProvince(provinceId);
    setSelectedCommune(0)
  };

  const handleCommuneChange = (e: { target: { value: string; }; }) => {
    const communeId = parseInt(e.target.value, 10);
    isOT ? (onDataChange({['cliente_comuna']: communeId})) : ('')
    validationClienteComuna(communeId)
    setSelectedCommune(communeId);
  };

useEffect(()=>{

    if(defaultRegion){
        setSelectedRegion(defaultRegion)
        if(defaultProvincia){
            setSelectedProvince(defaultProvincia)
            if(defaultComuna){
                setSelectedCommune(defaultComuna)
    
                validationClienteComuna(defaultComuna as any)
            }
        }
    }

},[defaultComuna, defaultProvincia, defaultRegion, validationClienteComuna])

  return (
    <div className='w-full pb-2 items-center '>
        <div className="w-[95%] -ml-2 mb-4 ">
            <Controller
                name="cliente_region_id"
                control={control}
                render={({field})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer  ">
                        <div className='inputStyles custom-select labelInput !top-[-3%]  custom-select-reg relative rounded-lg !h-[6vh]'>
                        <label className=" labelForm text-[#f39c12] absolute left-3 z-20">Región</label>
                        <select 
                            {...field}
                            value={selectedRegion} 
                            onChange={handleRegionChange}
                            tabIndex  ={tabIndex || 1}
                            disabled={onlyRead}
                            // className="custom-input py-2 px-3 cursor-pointer z-0 text-center "
                            className={`!h-[4rem] labelInput ${className ? className : "custom-input py-2  cursor-pointer z-0"}  ${onlyRead ? "custom-onlyread" : isOptional ? "custom-optional" : "custom-required"}`}

                            >
                                {!Regiones && (
                                    <option value={undefined} className="text-sm">
                                        
                                    </option>
                                )}
                                    {Regiones && Regiones.map((region:any) => (
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
        <div className="w-[95%] -ml-2 mb-4 ">
            <Controller
                name="cliente_provincia_id"
                control={control}
                render={({field})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                        <div className='inputStyles custom-select labelInput custom-select-reg relative rounded-lg !h-[3rem]'>
                        <label className="absolute !top-[-3%] text-[#f39c12] left-3 z-20">Provincia</label>
                        <select 
                            {...field}
                            value={selectedProvince} 
                            disabled={onlyRead}
                            
                            onChange={handleProvinceChange}
                            tabIndex  ={tabIndex || 1}
                            className={`!h-[4vw] labelInput ${className ? className : "custom-input py-2  cursor-pointer z-0"}  ${onlyRead ? "custom-onlyread" : isOptional ? "custom-optional" : "custom-required"}`}

                            >
                                {/* <option value={0}>Provincia</option> */}
                                {selectedRegion === 0 && (
                                    <option value={undefined} className="text-sm">
                                        
                                    </option>
                                    )}
                                    {/* {provinces && provinces.map((province:any) => (
                                        <option key={province[0]} value={province[0]}>
                                            {province[1]}
                                        </option>
                                    ))} */}
                                    {selectedRegion !== 0 && Provincias.filter((provincia:any) => (provincia[2] === selectedRegion)).map((province:any)=>(
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
        <div className="w-[95%] -ml-2 mb-4 ">
            <Controller
                name={name}
                control={control}
                render={({})=>(
                    <div className="flex min-w-[100%] w-[60%] items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
                        <div className='inputStyles custom-select labelInput custom-select-reg relative rounded-lg !h-[3rem]'>
        
                                 <label className="labelSelect absolute text-[#f39c12] !top-[-3%] left-3 z-20">Comuna</label>
                                 {errors && (
                                    <p className="absolute top-[-2%] z-20 right-[50%] labelErr">
                                        {errors.message}
                                    </p>
                                    )}
                         <select 
                            {...register(name)}
                            value={selectedCommune} 
                            disabled={onlyRead}
                                    
                            // defaultValue={defaultComuna && defaultComuna}
                            onChange={handleCommuneChange}
                            tabIndex  ={tabIndex || 1}
                            // className="custom-input py-2 px-3 cursor-pointer z-0 "
                            className={`!h-[4vw] labelInput ${className ? className : "custom-input py-2  cursor-pointer z-0"}  ${onlyRead ? "custom-onlyread" : isOptional ? "custom-optional" : "custom-required"}`}

                            >
                                {/* <option value={defaultComuna ? defaultComuna : 0}>Comuna</option> */}
               
                                    <option value={undefined} className="text-sm">
                    
                                    </option>
     
                                {/* <option>Comuna</option> */}
                                    { selectedProvince !== 0 && Comunas.filter((comuna:any) => (comuna[2] === selectedProvince)).map((comuna:any)=>(
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