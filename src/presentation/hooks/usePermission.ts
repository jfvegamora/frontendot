import { AppStore, useAppSelector } from "../../redux/store";

interface UserPermissions {
  lectura: boolean;
  escritura_lectura: boolean;
}

export const usePermission = (id: number): UserPermissions => {
  const userState = useAppSelector((store: AppStore) => store.user);

  const permisos = JSON.parse(userState?.permisos)[id] || [];
  const escritura_lectura = permisos?.["permiso_tipo"] === "2" ? true : false;
  const lectura = permisos?.["permiso_tipo"] === "1" ? true : false;

  return { escritura_lectura, lectura };
};
