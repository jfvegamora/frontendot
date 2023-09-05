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

const MCargos = lazy(() => import("./presentation/views/mantenedores/MCargos"));
const MUsuarios = lazy(
  () => import("./presentation/views/mantenedores/MUsuarios")
);
const MFuncionalidades = lazy(
  () => import("./presentation/views/mantenedores/MFuncionalidades")
);
const MPerfiles = lazy(
  () => import("./presentation/views/mantenedores/MPerfiles")
);
const MProveedores = lazy(
  () => import("./presentation/views/mantenedores/MProveedores")
);
// const EmpresasMantenedor = lazy(
//   () => import("./presentation/views/mantenedores/EmpresasMantenedor")
// );

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
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route path={PrivateRoutes.PRIVATE} element={<MCargos />} />
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
                    path={PrivateRoutes.PROVEEDORES}
                    element={<MProveedores />}
                  />

                  <Route path={PrivateRoutes.HOME} element={<Home />} />
                </Route>
                <Route
                  path="/"
                  element={<Navigate to={PublicRoutes.LOGIN} />}
                />
              </RoutesWithNotFound>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
