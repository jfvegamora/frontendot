/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { TextInputComponent } from "../components";
import { validationForgotPasswordSchema } from "../utils";
import { useCrud } from "../hooks";

interface InputData {
  correo: string;
}

const strBaseUrl = "/api/usuarios/";

const ResetPassword: React.FC = () => {
  const schema = validationForgotPasswordSchema();
  const { verifyUserEmail, forgotPassword } = useCrud(strBaseUrl);

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
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="useFormContainer mt-8">
      <h1 className="mantenedorH1">Recuperar Contraseña</h1>

      <form
        onSubmit={handleSubmit((data) => handleChange(data))}
        className="userFormulario"
      >
        <TextInputComponent
          type="email"
          label="Correo"
          name="correo"
          control={control}
          error={errors.correo}
        />
        <button type="submit" className="userFormBtnSubmit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
