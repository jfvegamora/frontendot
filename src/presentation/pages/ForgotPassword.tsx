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
    <div className="useFormContainer mt-8 right-[38%] top-[15%] w-[25vw] h-[40vh]">
      <h1 className="userFormLabel text-white mt-10">Recuperar Contraseña</h1>

      <form
        onSubmit={handleSubmit((data) => handleChange(data))}
        className="userFormulario"
      >
        <div className="w-full items-center flex">
          <div className="input-container items-center rowForm w-full">
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

        <div className="w-full">
          <div className="w-[90%] mx-auto">
            <button type="submit" tabIndex={1} className="userFormBtnSubmit">
              Guardar
            </button>
      <Link replace to="/login" className="text-white">Login</Link>
          </div>
        </div>
        
        
      </form>
    </div>
  );
};

export default ResetPassword;
