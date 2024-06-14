import { AppStore, useAppSelector } from "../../redux/store";

interface UserPermissions {
  lectura: boolean;
  escritura_lectura: boolean;
}

export const usePermission = (id: number): UserPermissions => {
  const userState = useAppSelector((store: AppStore) => store.user);

  const permisos = JSON.parse(userState?.permisos) || [];
  const findPermiso = permisos.find((permiso: any) => permiso.id === id);

  const escritura_lectura =
    findPermiso?.["permiso_tipo"] === "2" ? true : false;
  const lectura = findPermiso?.["permiso_tipo"] === "1" ? true : false;

  return { escritura_lectura, lectura };
};
