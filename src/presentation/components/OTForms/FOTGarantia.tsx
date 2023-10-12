import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOT';


interface IProps{
    data?:any
}

interface FormData{
    folio_ot: number;
    proyecto:string;
    nombre_cliente: string;
    motivo_garatia:string;
    observaciones:string
}

const FOTGarantia:React.FC<IProps> = ({
    data
}) => {
    const {control, handleSubmit} = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        console.log('jsondata', jsonData)
    }

    //LOGICA OT GARANTIA

    console.log(data)
  return (
    <div className='useFormContainer h-[50%] w-[60%] left-[20%] top-[30%] z-30'>
        <div className=" flex justify-end w-full">
            <h2 className='text-2xl'>X</h2>
        </div>
        <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl mt-2'>Nueva OT por garantía</h1> 

                <div className="flex  items-center w-full">
                    <div className="w-[25%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
                            data={data && data[EnumGrid.folio]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[35%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={data && data[EnumGrid.proyecto_titulo]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[35%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Nombre Cliente"
                            name="nombre_cliente"
                            control={control}
                            data={data && data[EnumGrid.cliente_nomnbre]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>

                <div className="w-full flex items-center">
                    <div className="w-[98.5%] ml-4">
                        <SelectInputComponent
                            label="Motivo Garantia"
                            name="motivo_garantia"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            data={data && data[EnumGrid.motivo_garantia_id]}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/tipos/", "02", "OTMotivoGarantia"]}
                            // error={errors.establecimiento}
                            // customWidth={"345px"}
                        />
                    </div>
                </div>

                <div className=" w-full flex items-center">
                    <div className="w-[98%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Observaciones"
                            name="observaciones"
                            control={control}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>

                <div className=' w-full flex justify-end mx-[-1.5rem]'>
                    <button  type="submit" className='w-[14%] text-xl text-white bg-green-400'>Nueva OT</button>
                </div>
        </form>

    </div>
  )
}

export default FOTGarantia