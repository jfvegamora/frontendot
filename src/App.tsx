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

// const Home = lazy(() => import("./presentation/pages/Home"));

const Navbar = lazy(() => import("./presentation/components/ComplexNavbar"));

const ResetPassword = lazy(() => import("./presentation/pages/ResetPassword"));

const ForgotPassword = lazy(
  () => import("./presentation/pages/ForgotPassword")
);

const ProfileUser = lazy(() => import("./presentation/pages/ProfileUser"));

// const pathMant = "./presentation/views/mantenedores/";

// MENU OT
//const MOTHistorica = lazy(() => import(pathMant + "MOTHistorica"));
// const MClientes = lazy(() => import("./presentation/views/mantenedores/MClientes"));
// const MEstablecimientos = lazy(() => import("./presentation/views/mantenedores/MEstablecimientos"));
// const MPuntosVenta = lazy(() => import(pathMant + "MPuntosVenta"));

// MENU BODEGA
//  const MArmazones = lazy(() => import(pathMant + "MArmazones"));
// const MArmazonesKardex = lazy(() => import(pathMant + "MArmazonesKardex"));
// const MCristales = lazy(() => import(pathMant + "MCristales"));
// const MCristalesKardex = lazy(() => import(pathMant + "MCristalesKardex"));
//  const MAccesorios = lazy(() => import(pathMant + "MAccesorios"));
// const MAccesoriosKardex = lazy(() => import(pathMant + "MAccesoriosKardex"));
// const MAlmacenes = lazy(() => import(pathMant + "MAlmacenes"));
// const MMarcas = lazy(() => import(pathMant + "MMarcas"));

// MENU PROYECTOS
// const MMandantes = lazy(() => import(pathMant + "MMandantes"));
// const MProyectos = lazy(() => import(pathMant + "MProyectos"));
// const MParamArmazones = lazy(() => import(pathMant + "MParamArmazones"));
// const MParamGrupos = lazy(() => import(pathMant + "MParamGrupos"));
// const MParamDirecciones = lazy(() => import(pathMant + "MParamDirecciones"));
// const MReporteAtencion = lazy(() => import(pathMant + "MReporteAtencion"));
// const MReporteFirmas = lazy(() => import(pathMant + "MReporteFirmas"));
// const MOftalmologos = lazy(() => import(pathMant + "MOftalmologos"));

function App() {
  const userState = useAppSelector((store: AppStore) => store.user);
  const navigate = useNavigate();

  const permisosID = userState && Object.keys(userState?.permisos);

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
      console.log("no tiene permisos");
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

{
  /* <Route path={PrivateRoutes.HOME} element={<Home />} />

                  <Route path={PrivateRoutes.CARGOS} element={<MCargos />} />
                  <Route
                    path={PrivateRoutes.USUARIOS}
                    element={<MUsuarios />}
                  />

                  <Route
                    path={PrivateRoutes.FUNCIONALIDADES}
                    element={<MFuncionalidades />}
                  />



                  <Route
                    path={PrivateRoutes.PERFILES}
                    element={<MPerfiles />}
                  />
                  <Route
                    path={PrivateRoutes.PERMISOS}
                    element={<MPermisos />}
                  />

                  <Route
                    path={PrivateRoutes.PROVEEDORES}
                    element={<MProveedores />}
                  />
                  <Route
                    path={PrivateRoutes.PROFILE}
                    element={<ProfileUser />}
                  /> */
}
{
  /* <Route path={PrivateRoutes.CRISTALES} element={<MCristales />} />  */
}
