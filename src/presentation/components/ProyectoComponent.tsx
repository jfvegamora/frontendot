import React from 'react';
import TextInputInteractive from './forms/TextInputInteractive';

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
    onlyRead?:boolean;
    setValue?:any;
    type:string
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
    onlyRead,
    setValue,
    isOptional,
    type
}) => {

  return (
    <div className=" relative mx-4 w-full flex ">
        {/* <h1 className="absolute z-20 top-[-23%] labelForm w-[32%] px-2">{label}</h1> */}
        <label className="absolute text-sm top-[-22px] left-2   labelForm w-[60%]">
            <span className="ml-[20px]  labelStyles">{label}</span>
        </label>
                <div className="input-container items-center  rowForm w-[35%]">
                    <div className="w-[90%] mt-4 !p-0 -ml-4">
                        <TextInputInteractive
                            type={type}
                            className='text-center'
                            label="Cant."
                            name={cant}
                            data={dataCant}
                            control={control}
                            handleChange={(e)=>{
                                if(setValue){
                                    setValue('cantidad_requerida', e)
                                }
                            }}
                            error={errors.cant_proyecto}
                            onlyRead={onlyRead}
                            isOptional={isOptional}
                            customWidth={"labelInput inputStyles"}

                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[40%]">
                    <div className="w-[100%] mt-4 -ml-8 text-center">
                        <TextInputInteractive
                            type={type}
                            className='text-center'
                            label="$ Total"
                            name={total}
                            data={dataTotal}
                            handleChange={(e)=>{
                                if(setValue){
                                    setValue('presupuesto', e)
                                }
                            }}
                            control={control}
                            error={errors.total_proyecto}
                            onlyRead={onlyRead}
                            isOptional={isOptional}
                            customWidth={"labelInput inputStyles"}

                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[35%]">
                    <div className="w-[90%] mt-4 -ml-8">
                        <TextInputInteractive
                            type={type}
                            className='text-center'
                            label="%"
                            name={porcentaje}
                            data={dataPorcentaje}
                            control={control}
                            isOT={true}
                            onlyRead={true}
                            isOptional={isOptional}
                            customWidth={"labelInput inputStyles"}

                            />
                    </div>
                </div>
    </div>
  )
}

export default ProyectoComponent