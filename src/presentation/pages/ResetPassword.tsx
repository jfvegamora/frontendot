/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs-react";

import { TextInputComponent } from "../components";
import { validationResetPasswordSchema } from "../utils";
import axios from "axios";
import { URLBackend } from "../hooks/useCrud";

interface InputData {
  password: string;
  confirmPassword: string | undefined;
}

interface DecodedToken {
  id: string;
}
// const strBaseUrl = "/api/usuarios/";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const schema = validationResetPasswordSchema();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = async (data: InputData) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword)
      return toast.error("Contraseñas no coinciden");

    if (!token) return toast.error("redirigiendo a login");

    const tokenOriginal = token.replace(/@@@/g, ".");
    let decodedToken: DecodedToken | null = null;
    const hashPassword = bcrypt.hashSync(password, 10);

    try {
      decodedToken = jwt_decode(tokenOriginal);
      
      const updatePassword = {
        query: "04",
        _p1: `password="${hashPassword}"`,
        _p2: decodedToken?.id.toString(),
        _p3: `${""}` ,
      };

      await axios.post(`${URLBackend}/api/usuarios/changepasswrod/`,updatePassword)
      // await editEntity(updatePassword);

      // console.log(response)

      toast.success("Nueva contraseña creada correctamente");
      navigate("/login");
    } catch (error: any) {
      console.log(error)
      toast.error(error);
    }
  };

  return (
    <div className="loginFormContainer mt-8 mx-auto w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] !mt-[25vh] ">
          <h1 className="userFormLabel text-white pt-10 text-2xl md:text-2xl lg:text-3xl xl:text-3xl">Sistema Gestión OT</h1>
          <div className=" md:w-[100%] mt-8">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-white md:text-2xl dark:text-white">
Nueva Contraseña</h1>
      <form
        onSubmit={handleSubmit((data) => handleChange(data))}
        className="userFormulario"
      >
        <div className="w-full items-center flex">
          <div className="input-container items-center rowForm w-full mb-4">
            <div className="w-full">
              <TextInputComponent
                type="password"
                label="Contraseña"
                name="password"
                control={control}
                error={errors.password}
              />
            </div>
          </div>
        </div>
        <div className="w-full items-center flex">
          <div className="input-container items-center rowForm w-full mb-4">
            <div className="w-full">
              <TextInputComponent
                type="password"
                label="Confirmar contraseña"
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <button type="submit" tabIndex={1} className="userFormBtnSubmit w-full">
              Enviar
          </button>
        </div>
        

      </form>
      </div>
                </div>
    </div>
  );
};

export default ResetPassword;
