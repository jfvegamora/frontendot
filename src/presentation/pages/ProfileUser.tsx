import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { validationProfileUserSchema } from "../utils";
import { SelectInputComponent, TextInputComponent } from "../components";

import bcrypt from "bcryptjs-react";
import { AppStore, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useCrud } from "../hooks";

const ProfileUser: React.FC = () => {
  const userState = useAppSelector((store: AppStore) => store.user);
  const navigate = useNavigate();
  const { loginEntity, editEntity } = useCrud("/api/usuarios/");

  const schema = validationProfileUserSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = async (data: {
    nombre: string;
    correo: string;
    telefono: string;
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    try {
      if (data.newPassword !== data.confirmNewPassword) {
        return alert("password deben coincidir");
      }
      const result = await loginEntity({
        _p1: data.correo,
        _p3: data.password,
      });

      if (!result[0]) return alert("Contraseña actual incorrecta");

      const hash = bcrypt.hashSync(data.newPassword, 10);

      const fields = [
        `nombre   ='${data.nombre}'`,
        `telefono ='${data.telefono}'`,
        `correo   ='${data.correo}'`,
        `password ='${hash}'`,
      ];

      const _p1 = fields.join(",");
      const updatePassword = {
        query: "04",
        _p1,
        _p2: userState?.id.toString(),
        _p3: "",
      };

      console.log(updatePassword);
      const resultPasswordChange = await editEntity(updatePassword);
      alert("contraseña cambiada correctamente");
      console.log(resultPasswordChange);
      console.log(fields);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    if (!userState?.nombre) {
      return navigate("/login");
    }
  }, []);
  console.log(userState);

  return (
    <div className="useFormContainer w-[35vw] mt-4 top-24 left-[33%]">
      <h1 className="userFormLabel text-white mt-8">Perfil de Usuario</h1>

      <form onSubmit={handleSubmit((data) => handleChange(data))}>

        <div className="w-full items-center rowForm flex">
          <div className="input-container items-center rowForm w-full">
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Nombre"
                  name="nombre"
                  data={userState && userState.nombre}
                  control={control}
                  error={errors.nombre}
                />
              </div>            
          </div>
        </div>
        <div className="w-full items-center rowForm flex">
          <div className="input-container items-center rowForm w-full">
            <div className="w-full">
              <TextInputComponent
                type="mail"
                label="Correo"
                name="correo"
                control={control}
                data={userState && userState.correo}
                error={errors.correo}
              />
            </div>
          </div>
        </div>
        <div className="w-full items-center rowForm flex ">
          <div className="input-container items-center rowForm w-full">
            <div className="mt-2 !ml-[1rem] !mr-[1rem]">
              <SelectInputComponent
                label="Cargo"
                name="cargo"
                showRefresh={false}
                data={userState && userState.cargo}
                control={control}
                entidad={["/api/cargos/", "02"]}
                readOnly={true}
                customWidth={"100%"}
              />
            </div>
          </div>
        </div>


        <div className="w-full items-center rowForm flex">
          <div className="input-container items-center rowForm w-full">
            <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Telefono"
                  name="telefono"
                  control={control}
                  data={userState && userState.telefono}
                  error={errors.telefono}
                />
            </div>
          </div>
        </div>

        <div className="w-full items-center rowForm flex">
          <div className="input-container items-center rowForm w-full">
            <div className="w-full">
              <TextInputComponent
                type="password"
                label="Contraseña actual"
                name="password"
                control={control}
                error={errors.password}
              />
            </div>
          </div>
        </div>


        <div className="w-full items-center flex">
          <div className="input-container items-center rowForm w-[50%]">
            <div className="w-full">
              <TextInputComponent
                type="password"
                label="Nueva contraseña"
                name="newPassword"
                control={control}
                error={errors.newPassword}
              />
            </div>
          </div>
          <div className="input-container items-center rowForm w-[50%]">
            <div className="w-full">
              <TextInputComponent
                type="password"
                label=" Confirmar nueva contraseña"
                name="confirmNewPassword"
                control={control}
                error={errors.confirmNewPassword}
              />
            </div>
          </div>
        </div>



        <div className="w-full">
          <div className="w-[80%] mx-auto">
            <button type="submit" tabIndex={1} className="userFormBtnSubmit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileUser;
