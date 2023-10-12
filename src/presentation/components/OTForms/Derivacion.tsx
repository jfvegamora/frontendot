import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';

interface FormData{
    folio_ot: number;
    proyecto:string;
    nombre_cliente: string;

    area_desde:string;
    area_hasta:string;
    situacion:string
    observaciones:string
}

const Derivacion:React.FC = () => {
    const {control, handleSubmit} = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        console.log('jsondata', jsonData)
    }



  return (
    <div className='useFormContainer h-[40%] w-[60%] left-[20%] top-[30%] z-30'>
        <div className=" flex justify-end w-full">
            <h2 className='text-2xl'>X</h2>
        </div>
        <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl mt-2'>Derivacion De OT</h1>

                <div className="flex  items-center w-full">
                    <div className="w-[25%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
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
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>

                <div className="w-full flex items-center">
                    <div className="w-[25%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Área desde"
                            name="area_desde"
                            control={control}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[35.2%] ml-4">
                        <SelectInputComponent
                            label="Área hasta"
                            name="area_hasta"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/tipos/", "02", "OTMotivoGarantia"]}
                            // error={errors.establecimiento}
                            // customWidth={"345px"}
                        />
                    </div>
                    <div className="w-[35.2%] ml-4">
                        <SelectInputComponent
                            label="Situacion"
                            name="situacion"
                            showRefresh={true}
                            isOT={true}
                            control={control}
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
                    <button  type="submit" className='w-[14%] text-xl bg-green-400'>Derivar</button>
                </div>
        </form>

    </div>
  )
}

export default Derivacion