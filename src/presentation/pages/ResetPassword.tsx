/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { TextInputComponent } from "../components";
import { validationResetPasswordSchema } from "../utils";
import jwt_decode from "jwt-decode";
import { useCrud } from "../hooks";
import { PublicRoutes } from "../../interfaces";

interface InputData {
  password: string | undefined;
  confirmPassword: string | undefined;
}

interface DecodedToken {
  id: string;
}
const strBaseUrl = "/api/usuarios/";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const schema = validationResetPasswordSchema();
  const { changePassword } = useCrud(strBaseUrl);

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

    try {
      decodedToken = jwt_decode(tokenOriginal);
      const updatePassword = {
        query: "04",
        _p1: `password='${password}'`,
        _p2: decodedToken?.id.toString(),
        _p3: "",
      };
      const response = await changePassword(updatePassword);
      toast.success("Nueva contraseña creada correctamente");
      <Navigate replace to={PublicRoutes.LOGIN} />;
      console.log(response);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="useFormContainer mt-8">
      <h1 className="mantenedorH1">Nueva Contraseña</h1>

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
