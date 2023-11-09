import { Suspense, lazy, useEffect } from "react";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Navigate, useNavigate } from "react-router-dom";

import { AppStore, useAppSelector } from "./redux/store";
import { RoutesWithNotFound } from "./presentation/utils";
import { PublicRoutes, privateRoutes } from "./interfaces";
import AuthGuard, {
  hasRequiredPermissions,
} from "./presentation/guards/auth_guard";

//Lazy components
const Login = lazy(() => import("./presentation/pages/Login"));
const Navbar = lazy(() => import("./presentation/components/ComplexNavbar"));
const ResetPassword = lazy(() => import("./presentation/pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./presentation/pages/ForgotPassword"));
const ProfileUser = lazy(() => import("./presentation/pages/ProfileUser"))

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
      redirectToLogin();
    }
  }, []);

  
  return (
    <div className="App">
      <Suspense fallback={<>Cargando.....</>}>
        <ToastContainer />
        <Navbar />
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
          <Route path="/" element={<Navigate to={PublicRoutes.LOGIN} />} />
          <Route element={<AuthGuard privateValidation={true} />}>
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
  );
}

export default App;

