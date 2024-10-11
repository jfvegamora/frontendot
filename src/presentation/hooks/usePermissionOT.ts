import { AppStore, useAppSelector } from "../../redux/store";

export const usePermissionOT = () => {
  // const OTAreas        = useAppSelector((store: AppStore) => store.OTAreas);

  // let OTAreaActual = OTAreas["areaActual"]
  // const permissions = (area:number) => OTAreaActual && OTAreas["areas"].find((permiso:any)=>permiso[1] === area)

  //?PERMISOS DEL USUARIO PARA EDITAR CAMPOS ESPECIFICOS DE OT
  const permisosCampos = useAppSelector(
    (store: AppStore) => store.user?.permisos_campos
  );
  console.log(permisosCampos);
};
