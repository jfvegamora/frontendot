/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { TextInputComponent } from "../components";
import { validationForgotPasswordSchema } from "../utils";
import { useCrud } from "../hooks";
import { Link } from "react-router-dom";


interface InputData {
  correo: string;
}

const strBaseUrl = "/api/usuarios/";

const ResetPassword: React.FC = () => {
  const schema = validationForgotPasswordSchema();
  const { verifyUserEmail, forgotPassword } = useCrud(strBaseUrl);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = async (data: InputData) => {
    console.log("data", data);
    const response = await verifyUserEmail(data.correo);
    if (response === "Correo no existe") return toast.error("Correo no existe");

    try {
      const result = await forgotPassword(data.correo);
      console.log("result", result);
      toast.success("Correo enviado");
      navigate("/login");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="loginFormContainer mt-8 mx-auto w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] !mt-[25vh]">
         <h1 className="userFormLabel text-white pt-10 text-2xl md:text-2xl lg:text-3xl xl:text-3xl">Sistema Gestión OT</h1>
          <div className=" md:w-[100%] mt-8">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-white md:text-2xl dark:text-white">
Recuperar Contraseña</h1>

      <form
        onSubmit={handleSubmit((data) => handleChange(data))}
        className="userFormulario"
      >
        <div className="w-full items-center flex">
          <div className="input-container items-center rowForm w-full mb-4">
            <div className="w-full">
              <TextInputComponent
                type="email"
                label="Correo"
                name="correo"
                control={control}
                error={errors.correo}
              />
            </div>
          </div>
        </div>

      <div className="w-full mt-4">
        <button type="submit" tabIndex={1} className="userFormBtnSubmit w-full">
            Enviar correo
        </button>
        <Link replace to="/login" className="text-white block text-center mt-2 pb-6">Login</Link>
      </div>
        
        
      </form>
      </div>
          </div>
    </div>
  );
};

export default ResetPassword;
