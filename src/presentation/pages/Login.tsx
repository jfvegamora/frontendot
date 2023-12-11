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
import { fetchOTAreas } from "../../redux/slices/OTAreasSlice";
import { fetchListBoxTipos } from "../../redux/slices/ListBoxTipoSlice";
import { fetchOT } from "../../redux/slices/OTSlice";
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
          console.log(response)
          dispatch(login(response));
          dispatch(fetchFuncionalidades());
          dispatch(fetchOTAreas())
          dispatch(fetchListBoxTipos())
      
          // toast.success("Sesion Iniciada");
          show({ message: LOGIN.loginSuccess, type: "success" });
          navigate("/landing");
        })
        .catch((_e) => show({ message: LOGIN.loginError, type: "error" }));
    } catch (error: any) {
      show({ message: LOGIN.loginError, type: "error" });
    }
  };

  return (
    <div className="loginFormContainer mt-8 mx-auto w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] !mt-[25vh]">
          <h1 className="userFormLabel text-white pt-10 text-2xl md:text-2xl lg:text-3xl xl:text-3xl">Sistema Gestión OT</h1>
          <div className=" md:w-[100%] mt-8">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-white md:text-2xl dark:text-white">
                Iniciar Sesión
              </h1>
              <form
                className="userFormulario"
                onSubmit={handleSubmit(handleChange)}
              >
  
              <div className="w-full items-center flex">
                <div className="input-container items-center rowForm w-full mb-4">
                  <div className="w-full">
                    <TextInputComponent
                      type="text"
                      label="Correo"
                      name="_p1"
                      control={control}
                      error={errors._p1}
                    />
                  </div>
                </div>
              </div>
                
                <div className="input-container items-center rowForm mb-4">
                    <div className="w-full">
                        <TextInputComponent
                          type="password"
                          label="Password"
                          name="_p3"
                          control={control}
                          error={errors._p3}
                        />
                    </div>
                </div>
        
                <div className="input-container items-center rowForm mt-4">
                  <div className="w-[90%] mx-auto">
                    <button type="submit" tabIndex={1} className="userFormBtnSubmit !mt-8">
                      Entrar
                    </button>
                  </div>
                </div>
                <Link className="forgotPwd text-white block text-center mt-4" to="/forgotpassword">Recupera Contraseña</Link>
              </form>
            </div>
          </div>
        </div>
  );
});

export default Login;
