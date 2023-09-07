/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { TextInputComponent } from "../components";
import { validationResetPasswordSchema } from "../utils";
import jwt_decode from "jwt-decode";
import { useCrud } from "../hooks";

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
  const { editEntity } = useCrud(strBaseUrl);

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
      const response = await editEntity(updatePassword);
      toast.success("Nueva contraseña creada correctamente");
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log("decodedToken", decodedToken);
  };

  return (
    <div className="useFormContainer mt-8">
      <h1>Nueva Contraseña</h1>

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
