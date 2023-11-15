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
    <div className="bg-black-500 w-full h-full">
      <section className=" dark:bg-gray-900 h-full mt-[-2v6%]">
        <div className="flex flex-col items-center justify-centerlg py-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('../../assets/desktop01.jpg')",
          }}
        ></div>          
          <h1 className="userFormLabel text-white">Sistema Gestión OT</h1>
          <div className="useFormContainer top-[20%] w-[25%]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Iniciar Sesión
              </h1>
              <form
                className="userFormulario"
                onSubmit={handleSubmit(handleChange)}
              >
  
   

                <div className="input-container items-center rowForm ">
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
                
                <div className="input-container items-center rowForm  ">
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
        
                <div className="input-container items-center rowForm ">
                  <div className="w-[90%] mx-auto">
                    <button type="submit" tabIndex={1} className="userFormBtnSubmit !mt-8">
                      Sign in
                    </button>
                  </div>
                </div>
                <Link className=" forgotPwd text-white" to="/forgotpassword">Recupera Contraseña</Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Login;
