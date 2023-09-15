import { AppStore, useAppSelector } from "../../redux/store";


interface UserPermissions {
    lectura: boolean;
    escritura_lectura: boolean;
}


export const usePermission = (id:number): UserPermissions => {
    const userState = useAppSelector((store: AppStore) => store.user);
    const Escritura = 2;
    const Lectura = 1;

  const permisos = userState?.permisos[id] || [];

  const escritura_lectura = permisos.some((permiso) => parseInt(permiso.permiso_tipo) === Escritura);
  const lectura = permisos.some((permiso) => parseInt(permiso.permiso_tipo) === Lectura);

  return { escritura_lectura, lectura };
};



