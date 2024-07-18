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
}) => {
  return (
    <div className=" relative mx-4 !mt-4 w-full flex ">
        <label className="absolute text-sm left-2 frame3Options labelForm !-mt-2 w-full">
            <span className="ml-[20px] labelStyles">{label}</span>
        </label>
                <div className="input-container items-center rowForm w-[25%]">
                    <div className="w-full mr-2 !-mt-3">
                        <TextInputComponent
                            type="text"
                            label="Nombre"
                            name={nombre}
                            data={dataNombre}
                            control={control}
                            error={errors.administrador_nombre}
                            isOptional={true}
                            customWidth={"labelInput inputStyles"}

                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[25%]">
                    <div className="w-full mr-2 !-mt-3">
                        <TextInputComponent
                            type="text"
                            label="Teléfono"
                            name={telefono}
                            data={dataTelefono}
                            control={control}
                            error={errors.administrador_telefono}
                            isOptional={true}
                            customWidth={"labelInput inputStyles"}

                            />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[50%]">
                    <div className="mr-6 !-mt-3">
                        <TextInputComponent
                            type="text"
                            label="Correo"
                            name={correo}
                            data={dataCorreo}
                            control={control}
                            error={errors.administrador_correo}
                            isOptional={true}
                            customWidth={"labelInput inputStyles"}

                            />
                    </div>
                </div>

    </div>
  )
}

export default ContactComponent