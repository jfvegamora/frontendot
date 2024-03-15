import React,{ Suspense, lazy, useEffect } from "react";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, useNavigate } from "react-router-dom";

import { AppStore, useAppSelector } from "./redux/store";
import { RoutesWithNotFound } from "./presentation/utils";
import { PublicRoutes, privateRoutes } from "./interfaces";
import AuthGuard, {
  hasRequiredPermissions,
} from "./presentation/guards/auth_guard";
import { Spinner } from "@material-tailwind/react";
import LandingPage from "./presentation/pages/LandingPage";
import FReservarArmazones from "./presentation/views/forms/FReservarArmazones";

import jwtDecode from "jwt-decode";

// import { clearLocalStorage } from "./redux/slices/ListBoxTipoSlice";
//Lazy components
const Login = lazy(() => import("./presentation/pages/Login"));
const Navbar = lazy(() => import("./presentation/components/ComplexNavbar"));
const ResetPassword = lazy(() => import("./presentation/pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./presentation/pages/ForgotPassword"));
const ProfileUser = lazy(() => import("./presentation/pages/ProfileUser"));

import axios from 'axios';
// import Interceptor from 'axios-interceptor';

const AuthHOC = ({children}:any) => {
  const [_isAuthorized, setIsAuthorized] = React.useState(true);
  const {token} = useAppSelector((store: AppStore) => store.user) || "";
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // console.log(token)

  useEffect(() => {
    // const handleUnauthorized = () => {
    //   setIsAuthorized(false);
    //   navigate('/login'); // Redirect to login on unauthorized access
    // };

    // Interceptor para las respuestas HTTP
    const authInterceptor = axios.interceptors

    const request = authInterceptor.request.use((config:any) => {
      console.log(config)
      config.headers.Authorization = `${token}`;
      return config;
    });

    const response = authInterceptor.response.use((response:any) => {
      console.log(response)
      return response;
    },(e)=>{
      console.log(e)
      if(e.request.status === 401){
        console.log(e.request)
        // dispatch(clearLocalStorage())
        // clearStorage('user')
        // dispatch(clearLocalStorage())
        // navigate('/login')
      }
    });

    // axios.interceptors.request.use(authInterceptor.request);
    // axios.interceptors.response.use(authInterceptor.response);
    setIsAuthorized(true)
    return () => {  
      authInterceptor.request.eject(request)
      authInterceptor.request.eject(response)
    };
  }, []);

  return  children 
};




const validarExpirationToken = (token:string) => {
  console.log(token)

  const tokenDecode:any = jwtDecode(token)
  const apiTime:any   = new Date(tokenDecode["expiracion"])
  const currentDate:any = new Date();


  console.log(tokenDecode["expiracion"])
  console.log(currentDate)

  const apiTimeString = '2024-03-15T11:45:3 0.688547-03:00';

  const timeDifference = currentDate - apiTime;

  const hoursDifference = timeDifference / (1000 * 60 * 60);

  const isGreaterThan72Hours = hoursDifference > 72;

  console.log(isGreaterThan72Hours);
}









function App() {
  const userState = useAppSelector((store: AppStore) => store.user);
  const navigate = useNavigate();

  const permisosID = userState && Object.keys(userState?.permisos);
  // console.log('permmisosID', permisosID)

  const redirectToLogin = () => {
    navigate(`/login`);
    return null;
  };

  useEffect(() => {
    const pathName = window.location.pathname.substring(1);
    
    const currentRoute = privateRoutes.find((route) => route.path === pathName);
    if (
      permisosID &&
      currentRoute &&
      !hasRequiredPermissions(currentRoute?.id, permisosID)
    ) {
      // console.log("no tiene permisos");
      console.log('render')
      redirectToLogin();
    }
  }, []);

  validarExpirationToken(userState.token)
  
  
  return (

    <AuthHOC>
      <div className="App">
        {/* <Suspense fallback={<><Spinner className="h-12 w-12"/></>}> */}
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spinner className="h-12 w-12" style={{ color: '#f39c12' }} /></div>}>
          <ToastContainer />
          {userState?.id && <Navbar/>}
          {/* <Navbar /> */}
          <RoutesWithNotFound>
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route
              path={PublicRoutes.RESETPASSWORD}
              element={<ResetPassword />}
            />
            <Route
              path={PublicRoutes.FORGOTPASSWORD}
              element={<ForgotPassword />}
            />
            <Route path={PublicRoutes.PROFILE} element={<ProfileUser />} />
            {/* <Route path="/" element={<Navigate to={PublicRoutes.LOGIN} />} /> */}
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/terreno" element={<FReservarArmazones/>} />
                {privateRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      permisosID && hasRequiredPermissions(route.id, permisosID) ? (
                        <route.component />
                      ) : null
                    }
                  />
                ))}
            </Route>
          </RoutesWithNotFound>
        </Suspense>
      </div>
    </AuthHOC>
  );
}

export default App;

