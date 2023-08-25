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

const CargosMantenedor = lazy(
  () => import("./presentation/views/mantenedores/CargosMantenedor")
);
const UsuariosMantenedor = lazy(
  () => import("./presentation/views/mantenedores/UsuariosMantenedor")
);
const Navbar = lazy(() => import("./presentation/components/ComplexNavbar"));
const FuncionalidadesMantenedor = lazy(
  () => import("./presentation/views/mantenedores/FuncionalidadesMantenedor")
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Cargandos.....</>}>
        <Provider store={store}>
          <ThemeProvider>
            <BrowserRouter>
              <ToastContainer />
              <Navbar />
              <RoutesWithNotFound>
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route
                    path={PrivateRoutes.PERSONAS}
                    element={<CargosMantenedor />}
                  />
                  <Route
                    path={PrivateRoutes.PRIVATE}
                    element={<CargosMantenedor />}
                  />
                  <Route
                    path={PrivateRoutes.CARGOS}
                    element={<CargosMantenedor />}
                  />
                  <Route
                    path={PrivateRoutes.USUARIOS}
                    element={<UsuariosMantenedor />}
                  />
                  <Route
                    path={PrivateRoutes.FUNCIONALIDADES}
                    element={<FuncionalidadesMantenedor />}
                  />
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
