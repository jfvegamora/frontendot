import { Suspense, lazy, useEffect } from "react";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, useNavigate } from "react-router-dom";

import { AppStore, useAppDispatch, useAppSelector } from "./redux/store";
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
import { logout } from "./redux/slices/userSlice";
import MovilReservaArmazones from "./presentation/pages/MovilReservaArmazones";
// import Interceptor from 'axios-interceptor';

// const AuthHOC = ({children}:any) => {
//   const [_isAuthorized, setIsAuthorized] = React.useState(true);
//   const {token} = useAppSelector((store: AppStore) => store.user) || "";

//   useEffect(() => {
//     const authInterceptor = axios.interceptors

//     const request = authInterceptor.request.use((config:any) => {
//       console.log(config)
//       return config;
//     });

//     const response = authInterceptor.response.use((response:any) => {
//       console.log(response)
//       return response;
//     },(e)=>{
//       console.log(e)
//       if(e.request.status === 401){
//         console.log(e.request)
//       }
//     });

//     setIsAuthorized(true)
//     return () => {  
//       authInterceptor.request.eject(request)
//       authInterceptor.request.eject(response)
//     };
//   }, []);

//   return  children 
// };




const validarExpirationToken = (token:string) => {
  // console.log(token)
  const tokenDecode:any = jwtDecode(token)
  const apiTime:any   = new Date(tokenDecode["expiracion"])
  const currentDate:any = new Date();

  const timeDifference = currentDate.getTime() - apiTime.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  const isGreaterThan72Hours = hoursDifference > 24;

  return isGreaterThan72Hours;
}


function App() {
  const userState = useAppSelector((store: AppStore) => store.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  // console.log(userState?.permisos)
  const permisosID = userState?.permisos ? 
                                       JSON.parse(userState?.permisos).map((id:any)=>(id.id).toString()) 
                                       : []
  console.log('permmisosID', permisosID)

  useEffect(() => {
    if(userState && userState.token){
      axios.defaults.headers.common['Authorization'] = userState.token ? `Bearer ${userState.token}` : ''; // Establece el token en el encabezado de autorización
      const expirado = validarExpirationToken(userState?.token)
      if(expirado === true){
        navigate("/login")
        dispatch(logout())
      }
    }
  }, [userState?.token || '']); 

  const redirectToLogin = () => {
    dispatch(logout())
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
      redirectToLogin();
    }
  }, []);

  // setInterval(()=>{
  //   try {
  //     axios('https://nodeexpress2-3.onrender.com/')
  //   } catch (error) {
  //     console.log(error)
  //   }
  //  }, 10 * 60 * 1000)




  return (

    // <AuthHOC>
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
              <Route path="/" element={<h1>Landing Page</h1>} />
              <Route path="/operativo" element={<FReservarArmazones/>} />
              <Route path="/mensajeria" element={<LandingPage/>} />
              <Route path="/movilarmazones" element={<MovilReservaArmazones/>} />
                {privateRoutes.map((route) => {
                  return(
                    (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          permisosID && hasRequiredPermissions(route.id, permisosID) ? (
                            <route.component />
                          ) : null
                        }
                      />
                    )
                  )
                })}
            </Route>
          </RoutesWithNotFound>
        </Suspense>
      </div>
    // </AuthHOC>
  );
}

export default App;

