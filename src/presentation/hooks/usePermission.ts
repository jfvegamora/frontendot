import { Permisos } from "../../interfaces";
import { AppStore, useAppSelector } from "../../redux/store";


interface UserPermissions {
    [Permisos.LECTURA]: boolean;
    [Permisos.ESCRITURA]: boolean;
}


export const usePermission = (): UserPermissions => {
    const userSate = useAppSelector((store:AppStore) => store.user);

    const hasWritePermission = userSate.permisos === Permisos.ESCRITURA;
    const hasReadPermission = userSate.permisos === Permisos.LECTURA;

    return {
        [Permisos.LECTURA]: hasReadPermission,
        [Permisos.ESCRITURA]: hasWritePermission,
    }
};


