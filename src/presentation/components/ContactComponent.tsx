import React from 'react';
import { TextInputComponent } from '.';

interface IProps{
    control:any
    errors?:any
    nombre:string
    telefono:string
    correo:string,
    dataNombre: any,
    dataCorreo:any,
    dataTelefono:any,
    label:string,
    isOptional?:boolean;
}

const ContactComponent:React.FC<IProps> = ({
    control,
    errors,
    nombre,
    correo,
    telefono,
    dataNombre,
    dataCorreo,
    dataTelefono,
    label,
    isOptional,
}) => {
  return (
    <div className=" relative mx-4 w-full flex ">
        {/* <h1 className="absolute z-20 top-[-23%] labelForm w-[32%] px-2">{label}</h1> */}
        <label className="absolute text-sm top-[-22px] left-2  labelForm w-[32%]">
            <span className="ml-[20px]  text-[16px]">{label}</span>
        </label>
                <div className="input-container items-center rowForm w-[25%]">
                    <div className="w-full mr-2 !mt-4">
                        <TextInputComponent
                            type="text"
                            label="Nombre"
                            name={nombre}
                            data={dataNombre}
                            control={control}
                            error={errors.administrador_nombre}
                            isOptional={true}
                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[25%]">
                    <div className="w-full mr-4 !mt-4">
                        <TextInputComponent
                            type="text"
                            label="telefono"
                            name={telefono}
                            data={dataTelefono}
                            control={control}
                            error={errors.administrador_telefono}
                            isOptional={true}
                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[50%]">
                    <div className="mr-4 !mt-4">
                        <TextInputComponent
                            type="text"
                            label="Correo"
                            name={correo}
                            data={dataCorreo}
                            control={control}
                            error={errors.administrador_correo}
                            isOptional={true}
                            />
                    </div>
                </div>

    </div>
  )
}

export default ContactComponent