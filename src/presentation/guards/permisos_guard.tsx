import { Permisos, PublicRoutes } from "../../interfaces";
import { AppStore, useAppSelector } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  permiso: Permisos;
}

function PermisosGuard({ permiso }: Props) {
  const userState = useAppSelector((store: AppStore) => store.user);
  return userState.permisos === permiso ? (
    <Outlet />
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
}

export default PermisosGuard;
