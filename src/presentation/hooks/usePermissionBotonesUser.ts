import { AppStore, useAppSelector } from "../../redux/store";
import { PermisosBotones as PermisosBotonesEnum } from "../Enums";

export function usePermissionBotonesUser() {
  const permisosBotones = useAppSelector(
    (store: AppStore) => store.user?.permisos_botones
  );

  let permiso_usuario_btn_nuevo =
    permisosBotones && permisosBotones[PermisosBotonesEnum.nuevo] === "1"
      ? true
      : false;

  let permiso_usuario_btn_check =
    permisosBotones && permisosBotones[PermisosBotonesEnum.check] === "1"
      ? true
      : false;

  let permiso_usaurio_btn_impresion =
    permisosBotones && permisosBotones[PermisosBotonesEnum.imprimir] === "1"
      ? true
      : false;

  let permiso_usuario_btn_exportar =
    permisosBotones && permisosBotones[PermisosBotonesEnum.exportar] === "1"
      ? true
      : false;

  let permiso_usuario_btn_importar =
    permisosBotones && permisosBotones[PermisosBotonesEnum.importar] === "1"
      ? true
      : false;

  let permiso_usuario_btn_whatsapp =
    permisosBotones && permisosBotones[PermisosBotonesEnum.whatsapp] === "1"
      ? true
      : false;

  let permiso_usuario_btn_procesar =
    permisosBotones && permisosBotones[PermisosBotonesEnum.procesar] === "1"
      ? true
      : false;
  let permiso_usuario_btn_pausar =
    permisosBotones && permisosBotones[PermisosBotonesEnum.pausar] === "1"
      ? true
      : false;
  let permiso_usuario_btn_derivar =
    permisosBotones && permisosBotones[PermisosBotonesEnum.derivar] === "1"
      ? true
      : false;
  let permiso_usuario_btn_anular =
    permisosBotones && permisosBotones[PermisosBotonesEnum.anular] === "1"
      ? true
      : false;
  let permiso_usuario_btn_ingresar =
    permisosBotones && permisosBotones[PermisosBotonesEnum.ingresar] === "1"
      ? true
      : false;
  let permiso_usuario_btn_postVenta =
    permisosBotones && permisosBotones[PermisosBotonesEnum.postVenta] === "1"
      ? true
      : false;
  let permiso_usuario_btn_guiaDespacho =
    permisosBotones && permisosBotones[PermisosBotonesEnum.guiaDespacho] === "1"
      ? true
      : false;
  let permiso_usuario_btn_numerEnvio =
    permisosBotones && permisosBotones[PermisosBotonesEnum.numeroEnvio] === "1"
      ? true
      : false;
  let permiso_usuario_btn_macroExcel =
    permisosBotones && permisosBotones[PermisosBotonesEnum.macroExcel] === "1"
      ? true
      : false;

  let permiso_usuario_btn_numeroFirma =
    permisosBotones && permisosBotones[PermisosBotonesEnum.numeroFirma] === "1"
      ? true
      : false;
  let permiso_usuario_btn_validarArmazones =
    permisosBotones &&
    permisosBotones[PermisosBotonesEnum.validarArmazones] === "1"
      ? true
      : false;
  let permiso_usuario_btn_validarCristales =
    permisosBotones &&
    permisosBotones[PermisosBotonesEnum.validarCristales] === "1"
      ? true
      : false;
  let permiso_usuario_btn_ubicacion =
    permisosBotones && permisosBotones[PermisosBotonesEnum.ubicacion] === "1"
      ? true
      : false;
  let permiso_usuario_btn_opcionBodegaInsumos =
    permisosBotones &&
    permisosBotones[PermisosBotonesEnum.opcionBodegaInsumos] === "1"
      ? true
      : false;
  let permiso_usuario_btn_reporteEntrega =
    permisosBotones &&
    permisosBotones[PermisosBotonesEnum.reporteEntrega] === "1"
      ? true
      : false;
  let permiso_usuario_btn_numeroOC =
    permisosBotones && permisosBotones[PermisosBotonesEnum.numeroOC] === "1"
      ? true
      : false;
  let permiso_usuario_btn_confirmarEntrega =
    permisosBotones &&
    permisosBotones[PermisosBotonesEnum.confirmarEntrega] === "1"
      ? true
      : false;
  let permiso_usuario_btn_preFacturar =
    permisosBotones && permisosBotones[PermisosBotonesEnum.preFacturar] === "1"
      ? true
      : false;
  let permiso_usuario_btn_vistoBueno =
    permisosBotones && permisosBotones[PermisosBotonesEnum.vistoBueno] === "1"
      ? true
      : false;
  let permiso_usuario_btn_numeroFactura =
    permisosBotones &&
    permisosBotones[PermisosBotonesEnum.numeroFactura] === "1"
      ? true
      : false;
  let permiso_usuario_btn_confirmaPago =
    permisosBotones && permisosBotones[PermisosBotonesEnum.confirmaPago] === "1"
      ? true
      : false;

  //011100011110000000100000000
  //010100000101100000001111111
  //111111111111111111111111111

  return {
    permiso_usuario_btn_nuevo,
    permiso_usuario_btn_check,
    permiso_usaurio_btn_impresion,
    permiso_usuario_btn_exportar,
    permiso_usuario_btn_importar,
    permiso_usuario_btn_whatsapp,
    permiso_usuario_btn_procesar,
    permiso_usuario_btn_pausar,
    permiso_usuario_btn_derivar,
    permiso_usuario_btn_anular,
    permiso_usuario_btn_ingresar,
    permiso_usuario_btn_postVenta,
    permiso_usuario_btn_guiaDespacho,
    permiso_usuario_btn_numerEnvio,
    permiso_usuario_btn_macroExcel,
    permiso_usuario_btn_numeroFirma,
    permiso_usuario_btn_validarArmazones,
    permiso_usuario_btn_validarCristales,
    permiso_usuario_btn_ubicacion,
    permiso_usuario_btn_opcionBodegaInsumos,
    permiso_usuario_btn_reporteEntrega,
    permiso_usuario_btn_numeroOC,
    permiso_usuario_btn_confirmarEntrega,
    permiso_usuario_btn_preFacturar,
    permiso_usuario_btn_vistoBueno,
    permiso_usuario_btn_numeroFactura,
    permiso_usuario_btn_confirmaPago,
  };
}
