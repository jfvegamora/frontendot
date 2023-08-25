import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface ICheckInputProps{
    label:string;
    control:Control<FieldValues>;
    name:string;
    onlyRead?:boolean;
    data?:any
}

const CheckInputComponent:React.FC<ICheckInputProps> = ({
    label,
    control,
    name,
    onlyRead,
    data
}) => {
  return (
    <div className="flex items-center mb-4 px-14 justify-between ">
        <label className=" text-gray-700 text-sm font-bold w-1/3 relative inline-flex items-center cursor-pointer">{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={data ? data : ""}
                render={({field})=>(
                    <label className="relative text-center inline-flex items-center cursor-pointer">
                        <input {...field} disabled={onlyRead} type="checkbox" id="Suspendido" defaultChecked={data === "Suspendido" ? true:false} value={1} className="sr-only peer"/>
                        <div className="w-9 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-700 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Suspendido</span>
                    </label>
             )}
            />
    </div>
  )
}

export default CheckInputComponent