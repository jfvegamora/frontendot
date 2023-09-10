import { Suspense, lazy } from "react";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Navigate } from "react-router-dom";

import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { RoutesWithNotFound } from "./presentation/utils";
import { PrivateRoutes, PublicRoutes } from "./interfaces";
import AuthGuard from "./presentation/guards/auth_guard";

//Lazy components
const Login = lazy(() => import("./presentation/pages/Login"));

const Home = lazy(() => import("./presentation/pages/Home"));

const Navbar = lazy(() => import("./presentation/components/ComplexNavbar"));

const ResetPassword = lazy(() => import("./presentation/pages/ResetPassword"));

const ForgotPassword = lazy(
  () => import("./presentation/pages/ForgotPassword")
);

// const pathMant = "./presentation/views/mantenedores/";

// MENU OT
//const MOT = lazy(() => import(pathMant + "MOT"));
//const MClientes = lazy(() => import(pathMant + "MClientes"));
//const MEstablecimientos = lazy(() => import(pathMant + "MEstablecimientos"));
//const MPuntosVenta = lazy(() => import(pathMant + "MPuntosVenta"));

// MENU BODEGA
// const MArmazones = lazy(() => import(pathMant + "MArmazones"));
// const MArmazonesKardex = lazy(() => import(pathMant + "MArmazonesKardex"));
// const MCristales = lazy(() => import(pathMant + "MCristales"));
// const MCristalesKardex = lazy(() => import(pathMant + "MCristalesKardex"));
// const MAccesorios = lazy(() => import(pathMant + "MAccesorios"));
// const MAccesoriosKardex = lazy(() => import(pathMant + "MAccesoriosKardex"));
// const MAlmacenes = lazy(() => import(pathMant + "MAlmacenes"));
// const MMarcas = lazy(() => import(pathMant + "MMarcas"));
const MProveedores = lazy(
  /* @vite-ignore */ () =>
    import("./presentation/views/mantenedores/MProveedores")
);

// MENU PROYECTOS
// const MMandantes = lazy(() => import(pathMant + "MMandantes"));
// const MProyectos = lazy(() => import(pathMant + "MProyectos"));
// const MParamArmazones = lazy(() => import(pathMant + "MParamArmazones"));
// const MParamGrupos = lazy(() => import(pathMant + "MParamGrupos"));
// const MParamDirecciones = lazy(() => import(pathMant + "MParamDirecciones"));
// const MReporteAtencion = lazy(() => import(pathMant + "MReporteAtencion"));
// const MReporteFirmas = lazy(() => import(pathMant + "MReporteFirmas"));
// const MOftalmologos = lazy(() => import(pathMant + "MOftalmologos"));

// MENU SISTEMA
const MFuncionalidades = lazy(
  () => import("./presentation/views/mantenedores/MFuncionalidades")
);
const MCargos = lazy(() => import("./presentation/views/mantenedores/MCargos"));
const MUsuarios = lazy(
  () => import("./presentation/views/mantenedores/MUsuarios")
);
const MPerfiles = lazy(
  () => import("./presentation/views/mantenedores/MPerfiles")
);
const MPermisos = lazy(
  () => import("./presentation/views/mantenedores/MPermisos")
);
//const MEmpresas = lazy(() => import(pathMant + "/MEmpresas"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Cargando.....</>}>
        <Provider store={store}>
          <ThemeProvider>
            <BrowserRouter>
              <ToastContainer />
              <Navbar />
              <RoutesWithNotFound>
                <Route
                  path={PublicRoutes.RESETPASSWORD}
                  element={<ResetPassword />}
                />
                <Route
                  path={PublicRoutes.FORGOTPASSWORD}
                  element={<ForgotPassword />}
                />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route path={PublicRoutes.LOGIN} element={<Login />} />
                  <Route
                    path="/"
                    element={<Navigate to={PublicRoutes.LOGIN} />}
                  />
                  <Route path={PrivateRoutes.HOME} element={<Home />} />

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
                  {/* <Route path={PrivateRoutes.CRISTALES} element={<MCristales />} />  */}
                </Route>
              </RoutesWithNotFound>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
