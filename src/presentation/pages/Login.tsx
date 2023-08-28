/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { TextInputComponent } from "../components";
import { validationLoginSchema } from "../utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCrud } from "../hooks";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  _p1: string;
  _p3: string;
}

const Login: React.FC = React.memo(() => {
  const strBaseUrl = "/api/usuarios/";
  const strQuery = "06";
  const schema = validationLoginSchema();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ListEntity } = useCrud(strBaseUrl);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleChange: SubmitHandler<LoginFormValues> = (data) => {
    try {
      //transformamos data en formato _p1=carlitos&_p3=carlos123
      const queryString = Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      //llamamos a la api
      ListEntity(queryString, strQuery)
        .then((user) => {
          console.log("usuario", user.length);
          if (user.length === 0) return toast.error("Credenciales incorrectas");

          dispatch(login(user));
          toast.success("Sesion Iniciada");
          navigate("/usuarios");
        })
        .catch((e) => toast.error(e));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black-500 w-full h-ful">
      <section className="bg-gray-100 dark:bg-gray-900 h-full mt-[-16%]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mt-[-20%] mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            MTOOpticos
          </a>
          <div className="useFormContainer">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form
                className="userFormulario"
                onSubmit={handleSubmit(handleChange)}
              >
                <div className="userFormularioContainer">
                  <TextInputComponent
                    type="text"
                    label="Correo"
                    name="_p1"
                    control={control}
                    error={errors._p1}
                  />
                  <TextInputComponent
                    type="password"
                    label="Password"
                    name="_p3"
                    control={control}
                    error={errors._p3}
                  />
                </div>

                <button type="submit" className="userFormBtnSubmit">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Login;
