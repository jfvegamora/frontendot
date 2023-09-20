/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { LOGIN, validationLoginSchema } from "../utils";
import { TextInputComponent } from "../components";
import { useAppDispatch } from "../../redux/store";
import { useCrud } from "../hooks";
import { login } from "../../redux/slices/userSlice";
import { IUser } from "../../interfaces";
import { fetchFuncionalidades } from "../../redux/slices/funcionalidadesSlice";
import useCustomToast from "../hooks/useCustomToast";
// import ToastNotification from "../components/ToastNotification";

interface LoginFormValues {
  _p1: string;
  _p3: string;
}

const Login: React.FC = React.memo(() => {
  const strBaseUrl = "/api/usuarios/";
  // const strQuery = "06";
  const schema = validationLoginSchema();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { show } = useCustomToast();

  const { loginEntity } = useCrud(strBaseUrl);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange: SubmitHandler<LoginFormValues> = (data) => {
    try {
      loginEntity(data)
        .then((user) => {
          if (user.length === 0)
            return show({ message: LOGIN.loginError, type: "error" });
          const response: IUser = jwtDecode(user[0]);
          dispatch(login(response));
          dispatch(fetchFuncionalidades());
          // toast.success("Sesion Iniciada");
          show({ message: LOGIN.loginSuccess, type: "success" });
          navigate("/usuarios");
        })
        .catch((_e) => show({ message: LOGIN.loginError, type: "error" }));
    } catch (error: any) {
      show({ message: LOGIN.loginError, type: "error" });
    }
  };

  return (
    <div className="bg-black-500 w-full h-full">
      <section className="bg-gray-100 dark:bg-gray-900 h-full mt-[-2v6%]">
        <div className="flex flex-col items-center justify-centerlg:py-0">
          <a
            href="#"
            className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
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
                <Link to="/forgotpassword">Recupera Contraseña</Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Login;
