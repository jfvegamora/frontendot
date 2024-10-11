import { AppStore, useAppSelector } from "../../redux/store";

export function usePermissionAreasUsuario() {
  const permisosAreasUsuario = useAppSelector(
    (store: AppStore) => store.user?.permisos_areas
  );
  let permisosAreasUsuario_editar_armazon =
    permisosAreasUsuario && permisosAreasUsuario[0] === "1" ? true : false;
  let permisosAreasUsuario_compras =
    permisosAreasUsuario && permisosAreasUsuario[1] === "1" ? true : false;
  let permisosAreasUsuario_calculo =
    permisosAreasUsuario && permisosAreasUsuario[2] === "1" ? true : false;
  let permisosAreasUsuario_laboratorio =
    permisosAreasUsuario && permisosAreasUsuario[3] === "1" ? true : false;
  let permisosAreasUsuario_ingreso =
    permisosAreasUsuario && permisosAreasUsuario[4] === "1" ? true : false;
  let permisosAreasUsuario_control_produccion =
    permisosAreasUsuario && permisosAreasUsuario[5] === "1" ? true : false;
  let permisosAreasUsuario_bodega_insumo =
    permisosAreasUsuario && permisosAreasUsuario[6] === "1" ? true : false;
  let permisosAreasUsuario_taller1 =
    permisosAreasUsuario && permisosAreasUsuario[7] === "1" ? true : false;
  let permisosAreasUsuario_taller2 =
    permisosAreasUsuario && permisosAreasUsuario[8] === "1" ? true : false;
  let permisosAreasUsuario_taller_moontaje =
    permisosAreasUsuario && permisosAreasUsuario[9] === "1" ? true : false;
  let permisosAreasUsuario_control_calidad =
    permisosAreasUsuario && permisosAreasUsuario[10] === "1" ? true : false;
  let permisosAreasUsuario_bod_prod_term =
    permisosAreasUsuario && permisosAreasUsuario[11] === "1" ? true : false;
  let permisosAreasUsuario_empaque =
    permisosAreasUsuario && permisosAreasUsuario[12] === "1" ? true : false;

  console.log(permisosAreasUsuario);

  return {
    permisosAreasUsuario_editar_armazon,
    permisosAreasUsuario_compras,
    permisosAreasUsuario_calculo,
    permisosAreasUsuario_laboratorio,
    permisosAreasUsuario_ingreso,
    permisosAreasUsuario_control_produccion,
    permisosAreasUsuario_bodega_insumo,
    permisosAreasUsuario_taller1,
    permisosAreasUsuario_taller2,
    permisosAreasUsuario_taller_moontaje,
    permisosAreasUsuario_control_calidad,
    permisosAreasUsuario_bod_prod_term,
    permisosAreasUsuario_empaque,
  };
}
