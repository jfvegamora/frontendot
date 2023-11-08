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
    dataTelefono:any
    label:string
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
    label
}) => {
  return (
    <div className=" relative mx-4 w-full flex ">
        <h1 className="absolute z-20 top-[-23%] labelForm w-[32%] px-2">{label}</h1>
                    <div className="w-[55%] mr-8">
                        <TextInputComponent
                            type="text"
                            label="Nombre"
                            name={nombre}
                            data={dataNombre}
                            control={control}
                            error={errors.administrador_nombre}
                        />
                    </div>
                    <div className="w-[55%] mr-8">
                        <TextInputComponent
                            type="text"
                            label="telefono"
                            name={telefono}
                            data={dataTelefono}
                            control={control}
                            error={errors.administrador_telefono}
                        />
                    </div>
                    <div className="w-[55%] mr-8">
                        <TextInputComponent
                            type="text"
                            label="Correo"
                            name={correo}
                            data={dataCorreo}
                            control={control}
                            error={errors.administrador_correo}
                        />
                    </div>
    </div>
  )
}

export default ContactComponent