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

      await axios.post('https://mtoopticos.cl/api/usuarios/changepasswrod/',updatePassword)
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
    <div className="useFormContainer mt-8 right-[38%] top-[15%] w-[25vw] h-[40vh]">
      <h1 className="userFormLabel text-white mt-10">Nueva Contraseña</h1>

      <form
        onSubmit={handleSubmit((data) => handleChange(data))}
        className="userFormulario"
      >
        <div className="w-full items-center flex">
          <div className="input-container items-center rowForm w-full">
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
          <div className="input-container items-center rowForm w-full">
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

        <div className="w-full">
          <div className="w-[90%] mx-auto">
            <button type="submit" tabIndex={1} className="userFormBtnSubmit">
              Guardar
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
