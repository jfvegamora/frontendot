import React from 'react';
import TextInputInteractive from './forms/TextInputInteractive';

interface IProps {
    control: any
    errors?: any
    cant: string
    total: string
    porcentaje: string
    dataCant: any,
    dataTotal: any,
    dataPorcentaje: any,
    label: string,
    isOptional?: boolean;
    onlyRead?: boolean;
    setValue?: any;
    type: string
}

const ProyectoComponent: React.FC<IProps> = ({
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

    const [formatDataTotal, setFormatDataTotal] = React.useState('')


    React.useEffect(()=>{
        if(dataTotal){
            if(dataTotal?.toString().includes('$')){
                setFormatDataTotal(dataTotal.replace(/\$/g, ''))
            }else{
                setFormatDataTotal(dataTotal)
            }

        }
    },[dataTotal])


    return (
        <div className=" relative mx-4 w-full flex ">
            <label className="absolute text-sm top-[-22px] left-2 frame3Options labelForm w-full">
                <span className="ml-[20px]  labelStyles">{label}</span>
            </label>
            <div className="input-container items-center rowForm w-[30%] ">
                <div className="w-full mt-4 !p-0 -ml-4">
                    <TextInputInteractive
                        type={type}
                        label="Cant."
                        name={cant}
                        data={dataCant}
                        control={control}
                        handleChange={(e) => { if (setValue) { setValue('cantidad_requerida', e) } }}
                        error={errors.cant_proyecto}
                        onlyRead={onlyRead}
                        isOptional={isOptional}
                        customWidth={"labelInput inputStyles text-right"}
                    />
                </div>
            </div>

            <div className="input-container items-center rowForm w-[40%] ">
                <div className="w-full mt-4 -ml-6">
                    <TextInputInteractive
                        type={type}
                        label="$ Total"
                        name={total}
                        data={formatDataTotal}
                        handleChange={(e) => {
                            if (setValue) {
                                setValue('presupuesto', e)
                            }
                        }}
                        control={control}
                        error={errors.total_proyecto}
                        onlyRead={onlyRead}
                        isOptional={isOptional}
                        customWidth={"labelInput inputStyles w-[10.5vw] text-right"}

                    />
                </div>
            </div>

            <div className="input-container items-center rowForm w-[20%] ml-1">
                <div className="w-full ">
                    <TextInputInteractive
                        type={type}
                        label="%"
                        name={porcentaje}
                        data={dataPorcentaje}
                        control={control}
                        isOT={true}
                        onlyRead={true}
                        isOptional={isOptional}
                        customWidth={"labelInput inputStyles text-center !w-[4.8vw]"}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProyectoComponent