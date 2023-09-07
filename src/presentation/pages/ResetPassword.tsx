import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

import { TextInputComponent } from "../components";
import { validationResetPasswordSchema } from "../utils";
import { decodeToken } from "../utils/jwt_utils";

interface InputData {
  password: string | undefined;
  confirmPassword: string | undefined;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const schema = validationResetPasswordSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (data: InputData) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword)
      return toast.error("Contraseñas no coinciden");

    if (!token) return;
    const response = decodeToken(token);

    console.log("response", response);
  };

  return (
    <div className="useFormContainer mt-8">
      <h1>Nueva Contraseña</h1>
      <h1>TOKEN:{token}</h1>
      <form
        onSubmit={handleSubmit((data) => handleChange(data))}
        className="userFormulario"
      >
        <TextInputComponent
          type="password"
          label="Contraseña"
          name="password"
          control={control}
          error={errors.password}
        />
        <TextInputComponent
          type="password"
          label="Confirmar contraseña"
          name="confirmPassword"
          control={control}
          error={errors.confirmPassword}
        />
        <button type="submit" className="userFormBtnSubmit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
