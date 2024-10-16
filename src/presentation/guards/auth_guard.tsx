import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PublicRoutes, privateRoutes } from "../../interfaces";
import { AppStore, useAppSelector } from "../../redux/store";

interface Props {
  privateValidation: boolean;
}

export const hasRequiredPermissions = (
  routeId: string,
  userPermissions: string[]
) => {
  if (!routeId) return true;

  const result = userPermissions.includes(routeId);
  return result;
};

const AuthGuard: React.FC<Props> = ({ privateValidation }) => {
  const userState = useAppSelector((store: AppStore) => store.user);
  const navigate = useNavigate();

  // if (!userState?.nombre) {
  //   console.log("render");
  //   navigate(`/${PublicRoutes.LOGIN}`);
  // }

  // const permisosIds = userState?.permisos
  //   ? JSON.parse(userState.permisos).map((id_ruta: any) =>
  //       id_ruta.id.toString()
  //     )
  //   : [];

  // if (privateValidation) {
  //   const currentRoute = privateRoutes.find(
  //     (route) => route.path === window.location.pathname.replace("/", "")
  //   )?.id;

  //   if (currentRoute) {
  //     const hasAccess = hasRequiredPermissions(currentRoute, permisosIds);

  //     if (!hasAccess) {
  //       navigate(`/${PublicRoutes.LOGIN}`);
  //     }
  //   }
  // }

  React.useEffect(() => {
    if (!userState?.nombre) {
      navigate(`/${PublicRoutes.LOGIN}`);
    } else if (privateValidation) {
      const currentRoute = privateRoutes.find(
        (route) => route.path === window.location.pathname.replace("/", "")
      )?.id;

      if (currentRoute) {
        const permisosUsuarios = JSON.parse(userState?.permisos);
        const hasAccess = hasRequiredPermissions(
          currentRoute,
          permisosUsuarios.map((id_ruta: any) => id_ruta.id.toString()) || []
        );

        if (!hasAccess) {
          navigate(`/${PublicRoutes.LOGIN}`);
        }
      }
    }
  }, [userState, navigate, privateValidation]);

  return <Outlet />;
};

export default AuthGuard;

// const PrivateValidationFragment = <Outlet />;
// const PublicValidationFragment = <Navigate replace to={PublicRoutes.LOGIN} />;

// export const AuthGuard: React.FC<Props> = ({ privateValidation }) => {
//   const userState = useAppSelector((store: AppStore) => store.user);
//   return userState?.nombre ? (
//     privateValidation ? (
//       PrivateValidationFragment
//     ) : (
//       PublicValidationFragment
//     )
//   ) : (
//     <Navigate replace to={PublicRoutes.LOGIN} />
//   );
// };

// export default AuthGuard;
