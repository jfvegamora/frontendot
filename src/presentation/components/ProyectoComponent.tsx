import React from 'react';
import { TextInputComponent } from '.';

interface IProps{
    control:any
    errors?:any
    cant:string
    total:string
    porcentaje: string
    dataCant: any,
    dataTotal:any,
    dataPorcentaje:any,
    label:string,
    isOptional?:boolean;
}

const ProyectoComponent:React.FC<IProps> = ({
    control,
    errors,
    cant,
    dataCant,
    total,
    dataTotal,
    porcentaje,
    dataPorcentaje,
    label,
}) => {
  return (
    <div className=" relative mx-4 w-full flex ">
        {/* <h1 className="absolute z-20 top-[-23%] labelForm w-[32%] px-2">{label}</h1> */}
        <label className="absolute text-sm top-[-22px] left-2  labelForm w-[60%]">
            <span className="ml-[20px]  text-[16px]">{label}</span>
        </label>
                <div className="input-container items-center rowForm w-[35%]">
                    <div className="w-[110%] mt-4 !p-0 -ml-4">
                        <TextInputComponent
                            type="number"
                            label="Cant."
                            name={cant}
                            data={dataCant}
                            control={control}
                            // error={errors.cant_proyecto}
                            isOptional={true}
                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[40%]">
                    <div className="w-[120%] mt-4 -ml-8">
                        <TextInputComponent
                            type="number"
                            label="$ Total"
                            name={total}
                            data={dataTotal}
                            control={control}
                            // error={errors.total_proyecto}
                            isOptional={true}
                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[35%]">
                    <div className="w-[110%] mt-4 -ml-8">
                        <TextInputComponent
                            type="number"
                            label="%"
                            name={porcentaje}
                            data={dataPorcentaje}
                            control={control}
                            // error={errors.total_proyecto}
                            isOptional={true}
                            />
                    </div>
                </div>
    </div>
  )
}

export default ProyectoComponent