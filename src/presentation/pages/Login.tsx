/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { LOGIN, validationLoginSchema } from "../utils";
import { TextInputComponent } from "../components";
import { AppStore, useAppDispatch, useAppSelector } from "../../redux/store";
import { useCrud } from "../hooks";
import { login } from "../../redux/slices/userSlice";
import { fetchFuncionalidades } from "../../redux/slices/funcionalidadesSlice";
import useCustomToast from "../hooks/useCustomToast";
import { fetchOTAreas } from "../../redux/slices/OTAreasSlice";
import { fetchListBoxTipos } from "../../redux/slices/ListBoxTipoSlice";
import { fetchColores } from "../../redux/slices/OTSlice";
import { fetchRegProCom } from "../../redux/slices/utilsSlice";
import { toast } from "react-toastify";
import { Button, Spinner } from "@material-tailwind/react";
// import ToastNotification from "../components/ToastNotification";

interface LoginFormValues {
  _p1: string;
  _p3: string;
}

const Login: React.FC = React.memo(() => {
  const strBaseUrl = "/api/usuarios/";
  const userState = useAppSelector((store: AppStore) => store.user);
  const [isLoading, setIsLoading] = useState(false);

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
    // const toastLoading = toast.loading('Cargando...');
    setIsLoading(true)
    try {
      loginEntity(data)
      .then((user) => {
          if (user.length === 0){
            // toast.dismiss(toastLoading)
            return show({ message: LOGIN.loginError, type: "error" });
          }
          console.log(user)
          const response:any = jwtDecode(user[0]);
          const usuario = {...response, token: user[0]}
          dispatch(login(usuario));
          dispatch(fetchFuncionalidades(usuario.token));
          dispatch(fetchOTAreas(usuario.token))
          dispatch(fetchListBoxTipos(usuario.token))
          dispatch(fetchColores(usuario.token))
          dispatch(fetchRegProCom(usuario.token))
          const userAgent = navigator.userAgent
          const isMobile = /Mobi/.test(userAgent)
          
          if(isMobile){
            navigate("/operativo")
          }else{
            navigate("/landing");
          }
          // navigate("/landing");
          toast.success("Sesion Iniciada",{
            autoClose: 500
          });
          // show({ message: LOGIN.loginSuccess, type: "success" });
          // toast.dismiss(toastLoading)
          // toast.dismiss(toastLoading)
        })
        .catch((_e) => {
          // toast.dismiss(toastLoading)
          // toast.error(_e.toString() as string)
          show({ message: LOGIN.loginError, type: "error" })
        })
        .finally(() => {
          console.log('render')
          // toast.dismiss(toastLoading) 
        });
        // toast.dismiss(toastLoading)
      } catch (error: any) {
        // toast.dismiss(toastLoading)
        show({ message: LOGIN.loginError, type: "error" });
      }

      // toast.dismiss(toastLoading)
  };


  React.useEffect(()=>{
    if(userState?.id){
      navigate('/landing')
    }
  },[])


  if(isLoading){
    return (
      <div className="loginFormContainer mx-auto w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] !mt-[18vh]">
        <div className="flex items-center justify-center h-[20vh]"><Spinner className="h-20 w-20" style={{ color: '#f39c12' }} /></div>
    </div>
    )
  }

  return (
    <div className="loginFormContainer mx-auto w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] !mt-[18vh]">
          <h1 className="userFormLabel text-white pt-10 text-2xl md:text-2xl lg:text-3xl xl:text-3xl">Sistema Gestión OT</h1>
          <div className=" md:w-[100%] ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-white md:text-2xl dark:text-white">
                Iniciar Sesión
              </h1>
              <form
                className="userFormulario"
                onSubmit={handleSubmit(handleChange)}
              >
  
              <div className="w-full items-center flex !mb-2">
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
        
                <div className="input-container items-center  mt-4">
                  <div className="w-[90%] mx-auto">
                    <Button type="submit" tabIndex={1} className="userFormBtnSubmit !mt-8">
                      Entrar
                    </Button>
                    <Link className="text-white block text-center !mt-[1rem]" to="/forgotpassword">Recuperar Contraseña</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
});

export default Login;
