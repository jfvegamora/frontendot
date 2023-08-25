import { Input } from '@material-tailwind/react';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface DateInputProps{
    label:string;
    name:string;
    defaultValue?:string;
    onlyRead?:boolean;
    type:string;
    control:Control<FieldValues>
    data?:any
}

const DateInputComponent:React.FC<DateInputProps> = ({
    label,
    name,
    onlyRead,
    type,
    control,
    data
}) => {
  return (
    <div className="flex items-center mb-2">
        <label  className="text-gray-700 text-sm font-bold w-1/3 text-center">{label}</label>
        <Controller
           name={name}
           control={control}
           defaultValue={data ? data : ""}
           render={({field})=>(
            <Input
             {...field}
             className='shadow appearance-none border rounded py-2 px-3 w-2/3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
             type={type}
             id={label}
             label={label}
             readOnly={onlyRead}
            
            />
           )}

        
        />
    </div>
  )
}

export default DateInputComponent