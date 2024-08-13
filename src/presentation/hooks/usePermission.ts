import { useMemo } from "react";
import { AppStore, useAppSelector } from "../../redux/store";
import { createSelector } from "reselect";

interface UserPermissions {
  lectura: boolean;
  escritura_lectura: boolean;
}

const selectUserState = (store: AppStore) => store.user;

const selectPermisos = createSelector([selectUserState], (userState) =>
  JSON.parse(userState?.permisos || [])
);

export const usePermission = (id: number): UserPermissions => {
  // const userState = useAppSelector((store: AppStore) => store.user);
  const permisos = useAppSelector(selectPermisos);

  // const permisos = JSON.parse(userState?.permisos) || [];
  // const findPermiso = permisos.find((permiso: any) => permiso.id === id);

  // const escritura_lectura =
  //   findPermiso?.["permiso_tipo"] === "2" ? true : false;
  // const lectura = findPermiso?.["permiso_tipo"] === "1" ? true : false;

  const { escritura_lectura, lectura } = useMemo(() => {
    const findPermiso = permisos.find((permiso: any) => permiso.id === id);
    return {
      escritura_lectura: findPermiso?.["permiso_tipo"] === "2" ? true : false,
      lectura: findPermiso?.["permiso_tipo"] === "1" ? true : false,
    };
  }, [permisos, id]);

  return { escritura_lectura, lectura };
};
