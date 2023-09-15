import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from "react-hook-form";
import { validationProfileUserSchema } from '../utils';
import { SelectInputComponent, TextInputComponent } from '../components';



import bcrypt from "bcryptjs-react";
import { AppStore, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';


const ProfileUser:React.FC = () => {
  const userState = useAppSelector((store: AppStore) => store.user);
  const navigate = useNavigate()
  
  const schema = validationProfileUserSchema()
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const handleChange = (data: { nombre: string; correo: string; telefono: string; password: string; newPassword: string; confirmNewPassword: string; }) => {
        console.log('data', data)
        const hash = bcrypt.hashSync(data.newPassword, 10)

        console.log('pass hash', hash)
    }
    React.useEffect(()=>{
      console.log(userState?.nombre)
      if(!userState?.nombre){
        return navigate("/login")
      }
    },[])

    return (
    <div className='useFormContainer'>
        <h1>Perfil de Usuario</h1>

        <form onSubmit={handleSubmit((data)=>handleChange(data))}>
            <div className='flex w-1/2'>
                <TextInputComponent
                type='text'
                label="Nombre"
                name="nombre"
                control={control}
                error={errors.nombre}
                />
                <TextInputComponent
                type='mail'
                label="Correo"
                name="correo"
                control={control}
                error={errors.correo}
                />
            </div>

            <div className="flex w-1/2">
            <SelectInputComponent
                label="Cargo"
                name="cargo"
                showRefresh={false}
                // data={data && data[EnumGrid.Cargo_id]}
                control={control}
                entidad={["/api/cargos/", "02"]}
                // readOnly={true}
                customWidth={"345px"}
              />

            <TextInputComponent
                type='text'
                label="Telefono"
                name="telefono"
                control={control}
                error={errors.telefono}
                />
            </div>

            <div className="flex w-1/2">
            <TextInputComponent
                type='password'
                label="Contraseña Actual"
                name="password"
                control={control}
                error={errors.password}
                />
            </div>


            <div className="flex">
            <TextInputComponent
                type='password'
                label="Nueva Contraseña"
                name="newPassword"
                control={control}
                error={errors.newPassword}
                />
                <TextInputComponent
                type='password'
                label="Password"
                name="confirmNewPassword"
                control={control}
                error={errors.confirmNewPassword}
                />
            </div>
            <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>
    </div>
  )
}

export default ProfileUser