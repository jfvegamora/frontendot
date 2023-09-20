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
import { useCrud } from "../hooks";

interface InputData {
  password: string;
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
        _p1: `password='${hashPassword}'`,
        _p2: decodedToken?.id.toString(),
        _p3: "",
      };
      await editEntity(updatePassword);
      toast.success("Nueva contraseña creada correctamente");
      navigate("/login");
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
