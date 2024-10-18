import React, { useEffect, useState, Suspense, lazy } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { signal } from "@preact/signals-react";
import { Button, Checkbox } from "@material-tailwind/react";

import { EnumGrid } from "../mantenedores/MOTHistorica";
import {
  A1_ALT,
  A1_CR_OD,
  A1_CR_OI,
  A1_DP,
  A1_GRUPO_OD,
  A1_GRUPO_OI,
  A2_CR_OD,
  A2_CR_OI,
  A2_DP,
  A2_GRUPO_OD,
  A2_GRUPO_OI,
  MODAL,
  SEXO,
  TIPO_CLIENTE,
  a1_armazon,
  a1_oi_ad,
  a2_armazon,
  a2_od_cil,
  a2_od_eje,
  a2_od_esf,
  a2_oi_cil,
  a2_oi_eje,
  a2_oi_esf,
  a3_armazon,
  armazonesJSONsignal,
  clearArmazonesData,
  clearDioptrias,
  clearGrupos,
  clearSelectInput,
  codigoProyecto,
  cristalesJSONsignal,
  dioptrias_receta,
  fecha_atencion_signal,
  fecha_despacho,
  fecha_entrega_cliente,
  fecha_entrega_taller,
  getDatosOT,
  inputChangeActions,
  isExistClient,
  motivo_ot,
  numero_receta,
  oftalmologo_id,
  punto_venta,
  reiniciarDioptriasReceta,
  reiniciarValidationNivel1,
  reiniciarValidationNivel2,
  reiniciarValidationNivel3,
  secondProcessBodega,
  tipo_anteojo_title,
  tipo_anteojo_title_cristal2,
  tipo_de_anteojo,
  updateOT,
  validacionIncompleta,
  validarNumeroDocumento,
  validar_parametrizacion,
  validationNivel1,
} from "../../utils";
import {
  validationCliente,
  validationClienteComuna,
  validationClienteNombre,
  validationClienteSexo,
  validationClienteTelefono,
  validationClienteTipo,
  validationEstablecimientos,
  validationFechaAtencion,
  validationFechaDespacho,
  validationFechaEntregaCliente,
  validationFechaEntregaTaller,
  validationProyectos,
  validationPuntoVenta,
  validationTipoAnteojos,
  validation_A1_ALT,
  validation_A1_DP,
  validation_A1_OD_AD,
  validation_A1_OD_CILL,
  validation_A1_OD_EJE,
  validation_A1_OD_ESF,
  validation_A1_OI_AD,
  validation_A1_OI_CIL,
  validation_A1_OI_EJE,
  validation_A1_OI_ESF,
  validation_A1_armazon,
  validation_A2_DP,
  validation_A2_OD_CIL,
  validation_A2_OD_EJE,
  validation_A2_OD_ESF,
  validation_A2_OI_CIL,
  validation_A2_OI_EJE,
  validation_A2_OI_ESF,
  validation_A2_armazon,
  validation_Cristal1_od,
  validation_Cristal1_od_color,
  validation_Cristal1_od_diametro,
  validation_Cristal1_od_diseño,
  validation_Cristal1_od_indice,
  validation_Cristal1_od_marca,
  validation_Cristal1_od_material,
  validation_Cristal1_od_tratamiento,
  validation_Cristal1_oi,
  validation_Cristal1_oi_color,
  validation_Cristal1_oi_diametro,
  validation_Cristal1_oi_diseño,
  validation_Cristal1_oi_indice,
  validation_Cristal1_oi_marca,
  validation_Cristal1_oi_material,
  validation_Cristal1_oi_tratamiento,
  validation_Cristal2_od,
  validation_Cristal2_od_color,
  validation_Cristal2_od_diametro,
  validation_Cristal2_od_diseño,
  validation_Cristal2_od_indice,
  validation_Cristal2_od_material,
  validation_Cristal2_od_tratamiento,
  validation_Cristal2_oi,
  validation_cristal2_od_marca,
} from "../../utils/validationOT";
// import { inputName } from '../../components/OTForms/Otprueba';
// import { verificaCampos } from '../../utils/OTReceta_utils';
// import {transponer, transponer_a2 } from '../../utils/FOTReceta_utils';
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  addToArmazones,
  addToCristales,
  clearCodigos,
  fetchOT,
} from "../../../redux/slices/OTSlice";
import {
  combinaciones_validas_od,
  validation_tipo_anteojo,
} from "../../utils/OTReceta_utils";
import { usePermission } from "../../hooks";

import { useModal } from "../../hooks/useModal";
import { paramsOT } from "../mantenedores/MOT";
import {
  changeCodigoCristal_od_A1,
  changeCodigoCristal_od_A2,
  changeCodigoCristal_oi_A1,
  changeCodigoCristal_oi_A2,
  CR1_OD_LAB,
  CR1_OI_LAB,
  CR2_OD_LAB,
  CR2_OI_LAB,
  getGrupoCristales_od_A1,
  getGrupoCristales_od_A2,
  getGrupoCristales_oi_A1,
  getGrupoCristales_oi_A2,
  handleValidationCheckLab,
  isToggleMontajeValidation,
} from "../../utils/FOTCristales_utils";
import { URLBackend } from "../../utils/config";
import { PermisosBotones } from "../../Enums";
import { usePermissionBotonesUser } from "../../hooks/usePermissionBotonesUser";
import { usePermissionAreasUsuario } from "../../hooks/usePermissionAreasUsuario";
// import { EnumAreas } from '../../components/OTPrimaryButtons';
// import { usePermissionOT } from '../../hooks/usePermissionOT';
// import { EnumAreas } from '../../components/OTPrimaryButtons';

// import FOTPendiente from '../../components/OTForms/FOTPendiente';
// import FOTEmpaque from './FOTEmpaque';
// import FOTAnulacion from '../../components/OTForms/FOTAnulacion';
// import FOTGarantia from '../../components/OTForms/FOTGarantia';
// import FOTDerivacion from '../../components/OTForms/FOTDerivacion';

const FOTPendiente = lazy(
  () => import("../../components/OTForms/FOTPendiente")
);
const FOTAnulacion = lazy(
  () => import("../../components/OTForms/FOTAnulacion")
);
const FOTEmpaque = lazy(() => import("./FOTEmpaque"));
const FOTGarantia = lazy(() => import("../../components/OTForms/FOTGarantia"));
const FOTDerivacion = lazy(
  () => import("../../components/OTForms/FOTDerivacion")
);

const FOTArmazones = lazy(
  () => import("../../components/OTForms/FOTArmazones")
);
const FOTBitacora = lazy(() => import("../../components/OTForms/FOTBitacora"));
const FOTClientes = lazy(() => import("../../components/OTForms/FOTClientes"));
const FOTCristales = lazy(
  () => import("../../components/OTForms/FOTCristales")
);
const FOTOptica = lazy(() => import("../../components/OTForms/FOTOptica"));
const FOTReceta = lazy(() => import("../../components/OTForms/FOTReceta"));

const FOTErrorModal = lazy(() => import("../../components/ErrorOTModal"));

interface IFOTProps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
  isMOT?: boolean;
  onlyRead?: boolean;
  permisos_ot_historica?: any;
  idMenu?: any;
}

export const tipo_anteojo = signal(false);
export const onlyReadReceta = signal(false);
export const a1Grupo = signal(0);
export const tipo_lejos_cerca = signal(false);
export const keepForm = signal(false);
export const isNotFetching = signal(false);
export const disabledCristalDiseño = signal(false);
export const isLoadingOT = signal(false);
export const isShowErrorModal = signal(false);
export const dataErrorModal = signal({});
export const isLoadingArmazonValidation = signal(false);
export const isLoadingGetGrupoCristales = signal(false);

const FOT: React.FC<IFOTProps> = ({
  closeModal,
  data,
  isEditting,
  isMOT,
  onlyRead,
  permisos_ot_historica,
  idMenu,
}) => {
  //Estados locales
  const { control, handleSubmit, setValue, register, getValues } = useForm<any>(
    {
      defaultValues: {
        // cristal1_marca_id: "1",
        // cristal1_indice_id: "1",
        // cristal1_material_id: "1",
        // cristal1_diseno_id: "1",
        // cristal1_color_id: "1",
        // cristal1_tratamiento_id: "1",
        // cristal1_diametro: "65",
        // cristal2_marca_id: "1",
        // cristal2_indice_id: "1",
        // cristal2_material_id: "1",
        // cristal2_diseno_id: "1",
        // cristal2_color_id: "1",
        // cristal2_tratamiento_id: "1",
        // cristal2_diametro: "65",
      },
    }
  );

  const formValuesCompleto = getValues();

  const [formValues, setFormValues] = useState<any>({});

  const [_changeboolean, setChangeboolean] = useState(false);
  const [_isMotivo, setIsMotivo] = useState(false);

  const [isFOTEmpaque, setIsFOTEmpaque] = useState(false);

  const [FOTBooleanStates, setFOTBooleanStates] = useState({
    showGarantia: false,
    showDerivacion: false,
    showPendiente: false,
    showAnulacion: false,

    isFOTEmpaque: false,

    existCliente: false,
    changeBoolean: false,
    isMotivo: false,
  });

  const [errorGrupoDioptria_od_A1, setErrorGrupoDioptria_od_A1] = useState("");
  const [errorGrupoDioptria_oi_A1, setErrorGrupoDioptria_oi_A1] = useState("");
  const [errorGrupoDioptria_od_A2, setErrorGrupoDioptria_od_A2] = useState("");
  const [errorGrupoDioptria_oi_A2, setErrorGrupoDioptria_oi_A2] = useState("");
  const [submitAction, setSubmitAction] = useState("");
  const [_toggle, setToggle] = useState();
  const [OTPermissions, setOTPermissions] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const { showModal, CustomModal } = useModal();

  const { escritura_lectura } = usePermission(idMenu);
  const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
  const OTSlice: any = useAppSelector((store: AppStore) => store.OTS);
  const User: any = useAppSelector((store: AppStore) => store.user);
  const tipo_anteojo_array: any =
    useAppSelector((store: AppStore) => store.listBoxTipos.OTTipoAnteojo) || [];

  const dispatch = useAppDispatch();

  const { permisosAreasUsuario_resolucion } = usePermissionAreasUsuario();

  // const { OTAreas, OTSlice, User, tipo_anteojo_array, permisosCampos } =
  //   useAppSelector((state: AppStore) => ({
  //     OTAreas: state.OTAreas,
  //     OTSlice: state.OTS,
  //     User: state.user,
  //     tipo_anteojo_array: state.listBoxTipos.OTTipoAnteojo || [],
  //     permisosCampos: state.user.permisos_campos,
  //   }));

  // const permissionsOT = usePermissionOT();

  // const OT:any = useAppSelector((store: AppStore) => store.OTS.ot);

  let OTAreaActual: any = OTAreas["areaActual"];

  const {
    permiso_usuario_btn_pausar,
    permiso_usuario_btn_derivar,
    permiso_usuario_btn_anular,
    permiso_usuario_btn_postVenta,
  } = usePermissionBotonesUser();

  const permissions = (area: any) =>
    OTAreaActual &&
    OTAreas["areas"].find((permiso: any) => permiso[1] === area);

  //PERMISOS DE CAMPOS
  const permisosCampos = useAppSelector(
    (store: AppStore) => store.user?.permisos_campos
  );

  let permiso_usuario_grupo_dioptria =
    permisosCampos && isEditting
      ? permisosCampos[5] === "1"
        ? true
        : false
      : false;
  let permiso_usuario_cristales =
    permisosCampos && permisosCampos[1] === "1" ? true : false;
  let permiso_usuario_estado_impresion =
    permisosCampos && permisosCampos[2] === "1" ? true : false;
  let permiso_usuario_estado_validacion =
    permisosCampos && permisosCampos[3] === "1" ? true : false;
  let permiso_usuario_resolucion_garantia =
    permisosCampos && permisosCampos[4] === "1" ? true : false;
  let permiso_usuario_armazones =
    permisosCampos && isEditting
      ? permisosCampos[0] === "1"
        ? true
        : false
      : false;
  // let permiso_usuario_armazones      = permisosCampos && isEditting ? (data && data[EnumGrid.bodega_procesado] === 0  && permisosCampos[0] === "1" ? true : false) : false
  let permiso_usuario_receta =
    permisosCampos && isEditting
      ? data && permisosCampos[6] === "1"
        ? true
        : false
      : false;
  // let permiso_usuario_receta          = permisosCampos && isEditting ? (data && data[EnumGrid.bodega_procesado] === 0 && permisosCampos[6] === "1" ? true : false ) : false;
  // let permiso_usuario_receta = permisosCampos && isEditting ? data && data[EnumGrid.bodega_procesado] === 0 ? (permisosCampos[6] === "1" ? true : false) : (OTAreaActual === 10 ? true : false) : (permisosCampos[5] === "1" ? true : false)
  let permiso_usuario_verificar_cristal =
    permisosCampos && permisosCampos[7] === "1" ? true : false;
  let permiso_usuario_workTracking =
    permisosCampos && permisosCampos[9] === "1" ? true : false;

  //? VARIABLE QUE DETECTA SI LA OT YA SE HA PROCESADO 1 VEC DESDE BODEGAINSUMO
  secondProcessBodega.value =
    data && data[EnumGrid.bodega_procesado] === 1 ? true : false;

  let permiso_areas_armazones = false;
  let permiso_areas_cristales = false;
  let permiso_areas_estado_impresion = false;
  let permiso_areas_estado_validacion = false;
  let permiso_areas_resolucion_garantia = false;
  let permiso_areas_grupo_dioptria = false;
  let permiso_areas_receta = false;
  let permiso_area_verificar_cristal = false;
  let permiso_area_worktraking = false;

  if (!isMOT) {
    const permisosAreas = OTAreaActual && (permissions(OTAreaActual)[7] as any);
    console.log(permisosAreas);
    permiso_areas_armazones =
      permisosAreas && permisosAreas[0] === "1" ? true : false;
    permiso_areas_cristales =
      permisosAreas && permisosAreas[1] === "1" ? true : false;
    permiso_areas_estado_impresion =
      permisosAreas && permisosAreas[2] === "1" ? true : false;
    permiso_areas_estado_validacion =
      permisosAreas && permisosAreas[3] === "1" ? true : false;
    permiso_areas_resolucion_garantia =
      permisosAreas && permisosAreas[4] === "1" ? true : false;
    permiso_areas_grupo_dioptria =
      permisosAreas && permisosAreas[5] === "1" ? true : false;
    permiso_areas_receta =
      permisosAreas && permisosAreas[6] === "1" ? true : false;
    permiso_area_verificar_cristal =
      permisosAreas && permisosAreas[7] === "1" ? true : false;
    permiso_area_worktraking =
      permisosAreas && permisosAreas[9] === "1" ? true : false;
    // let permiso_area_verificar_armazon      = permisosAreas && permisosAreas[8] === "1" ? true : false;
  }

  React.useEffect(() => {
    isNotFetching.value = permiso_usuario_grupo_dioptria;
  }, [permiso_usuario_grupo_dioptria]);

  // console.log(permiso)

  const handleCloseForm = () => {
    closeModal();
    clearDioptrias(true);
    reiniciarDioptriasReceta();
    reiniciarValidationNivel2();
    reiniciarValidationNivel1();
    reiniciarValidationNivel3();
    clearArmazonesData();
    clearGrupos();
    dispatch(clearCodigos());
    clearSelectInput.value = false;
    disabledCristalDiseño.value = false;
    isLoadingOT.value = false;
    keepForm.value = false;
    isShowErrorModal.value = false;
    codigoProyecto.value = "";
  };

  const reiniciarFormOT = (
    keepForm: any,
    message: any,
    clearCliente: boolean
  ): void => {
    clearDioptrias(keepForm);
    reiniciarDioptriasReceta();
    reiniciarValidationNivel1(keepForm);
    reiniciarValidationNivel3();
    clearGrupos(keepForm);
    dispatch(clearCodigos());
    clearAllInputsOT(clearCliente);
    clearSelectInput.value = false;
    toast.success(message);
    reiniciarValidationNivel2(keepForm);

    setSelectedTab(1);
    if (paramsOT.value !== "") {
      dispatch(
        fetchOT({ OTAreas: OTAreaActual, searchParams: paramsOT.value })
      );
    } else {
      dispatch(fetchOT({ OTAreas: OTAreaActual }));
    }
  };

  const insertOT = async (
    jsonData: any,
    cristalesJSON: any,
    armazonesJSON: any
  ) => {
    const toastLoading = toast.loading("Cargando...");
    let estado = 10;
    let estado_impresion = 0;
    let validar_parametrizacion_id = 1;
    let rbd_ubicacion = 0;
    let rbd_cantidad = 0;
    let rep_cantidad = 0;
    let motivo = 1;

    let estado_validacion =
      validacionIncompleta.value.check === true
        ? 1
        : sumatoriaNivel1 === validationNivel1.value.length
        ? 2
        : 1;

    let _origen = OTAreaActual.toString();
    let _destino = OTAreaActual.toString();

    let _p3: any = "";
    let _rut = isExistClient.value
      ? `${jsonData.cliente_rut || formValues.cliente.cliente_rut}`
      : "";

    isExistClient.value
      ? (_p3 = [
          `nombre="${
            jsonData.cliente_nombre || formValues.cliente.cliente_nombre || ""
          }"`,
          `tipo=${
            formValues?.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario
              ? "1"
              : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.particular
              ? "2"
              : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.optica
              ? "3"
              : "0"
          }`,
          `sexo=${
            formValues?.cliente.cliente_sexo === SEXO.masculino
              ? "1"
              : formValues?.cliente.cliente_sexo === SEXO.femenino
              ? "2"
              : formValues?.cliente.cliente_sexo === SEXO.no_aplica
              ? "3"
              : "0"
          }`,
          `fecha_nacimiento="${
            jsonData.cliente_fecha_nacimiento ||
            formValues.cliente.cliente_fecha_nacimiento ||
            ""
          }"`,
          `direccion="${
            jsonData.cliente_direccion ||
            formValues.cliente.cliente_direccion ||
            ""
          }"`,
          `comuna=${
            jsonData.cliente_comuna || formValues.cliente.cliente_comuna || 0
          }`,
          `telefono="${
            jsonData.cliente_telefono ||
            formValues.cliente.cliente_telefono ||
            ""
          }"`,
          `correo="${
            jsonData.cliente_correo || formValues.cliente.cliente_correo || ""
          }"`,
          `establecimiento=${
            jsonData.establecimiento_id ||
            formValues.cliente.establecimiento_id ||
            0
          }`,
        ]
          .map((a) => a.split("="))
          .map((a) => a.join("="))
          .join(","))
      : (_p3 = `"${
          jsonData.cliente_rut.trim() ||
          formValues.cliente.cliente_rut.trim() ||
          ""
        }","${
          jsonData.cliente_nombre.trim() ||
          formValues.cliente.cliente_nombre.trim() ||
          ""
        }",${
          formValues?.cliente.cliente_tipo === TIPO_CLIENTE.beneficiario
            ? "1"
            : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.particular
            ? "2"
            : formValues?.cliente.cliente_tipo === TIPO_CLIENTE.optica
            ? "3"
            : "0"
        }, ${
          formValues?.cliente.cliente_sexo === SEXO.masculino
            ? "1"
            : formValues?.cliente.cliente_sexo === SEXO.femenino
            ? "2"
            : formValues?.cliente.cliente_sexo === SEXO.no_aplica
            ? "3"
            : "0"
        },"${
          jsonData.cliente_fecha_nacimiento ||
          formValues.cliente.cliente_fecha_nacimiento ||
          ""
        }","${formValues.cliente.cliente_direccion || ""}" ,${
          jsonData.cliente_comuna || formValues.cliente.cliente_comuna || 0
        }, "${
          jsonData.cliente_telefono ||
          formValues.cliente.cliente_telefono.trim() ||
          ""
        }","${
          jsonData.cliente_correo.trim() ||
          formValues.cliente.cliente_correo.trim() ||
          ""
        }", ${
          jsonData.establecimiento_id ||
          formValues.cliente.establecimiento_id ||
          0
        }`.replace(/'/g, "!"));

    let _p1 = `${motivo},${_destino},${estado},"${estado_impresion}","${validar_parametrizacion_id}", "${
      jsonData.proyecto_codigo || codigoProyecto.value
    }",${jsonData.establecimiento_id || 1},"${
      jsonData?.cliente_rut.trim() || formValues?.cliente.cliente_rut.trim()
    }" ,${oftalmologo_id.value || 0} ,"${
      jsonData.fecha_atencion || fecha_atencion_signal.value
    }","${jsonData.fecha_entrega_taller || fecha_entrega_taller.value}","${
      jsonData.fecha_despacho || fecha_despacho.value
    }","${jsonData.fecha_entrega_cliente || fecha_entrega_cliente.value}",${
      punto_venta.value || 0
    },"${
      numero_receta.value && numero_receta.value !== ""
        ? numero_receta.value
        : 0
    }","${formValues?.receta.fecha_receta ?? ""}",${
      jsonData.tipo_anteojo_id ?? 0
    },${
      typeof dioptrias_receta.value.a1_od.esf === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_od.esf)
        ? dioptrias_receta.value.a1_od.esf
        : 0
    },${
      typeof dioptrias_receta.value.a1_od.cil === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_od.cil)
        ? dioptrias_receta.value.a1_od.cil
        : 0
    },${
      typeof dioptrias_receta.value.a1_od.eje === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_od.eje)
        ? dioptrias_receta.value.a1_od.eje
        : 0
    },"${
      typeof dioptrias_receta.value.a1_od.ad === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_od.ad)
        ? dioptrias_receta.value.a1_od.ad
        : 0
    }",${
      typeof dioptrias_receta.value.a1_oi.esf === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.esf)
        ? dioptrias_receta.value.a1_oi.esf
        : 0
    },${
      typeof dioptrias_receta.value.a1_oi.cil === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.cil)
        ? dioptrias_receta.value.a1_oi.cil
        : 0
    },${
      typeof dioptrias_receta.value.a1_oi.eje === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.eje)
        ? dioptrias_receta.value.a1_oi.eje
        : 0
    },"${
      typeof dioptrias_receta.value.a1_oi.ad === "string" &&
      !Number.isNaN(dioptrias_receta.value.a1_oi.ad)
        ? dioptrias_receta.value.a1_oi.ad
        : 0
    }",${A1_DP.value !== "" ? A1_DP.value : 0},${
      formValues["receta"]["a1_alt"] > 0 ? formValues["receta"]["a1_alt"] : 0
    }, "${A1_GRUPO_OD.value.trim()}" ,"${A1_GRUPO_OI.value.trim()}" ,"${
      typeof a2_od_esf.value === "string" ? a2_od_esf.value : 0
    }","${typeof a2_od_cil.value === "string" ? a2_od_cil.value : 0}","${
      typeof a2_od_eje.value === "string" ? a2_od_eje.value : 0
    }","${typeof a2_oi_esf.value === "string" ? a2_oi_esf.value : 0}","${
      typeof a2_oi_cil.value === "string" ? a2_oi_cil.value : 0
    }","${typeof a2_oi_eje.value === "string" ? a2_oi_eje.value : 0}",${
      A2_DP.value.trim() || 0
    },"${A2_GRUPO_OD.value.trim()}","${A2_GRUPO_OI.value.trim()}" ,"${
      a1_armazon.value.trim() ?? 0
    }","${a2_armazon.value.trim() ?? 0}","${
      a3_armazon.value.trim() ?? 0
    }",${1},${jsonData.cristal1_marca_od_id || 0},${
      jsonData.cristal1_diseno_od_id || 0
    },${jsonData.cristal1_indice_od_id || 0},${
      jsonData.cristal1_material_od_id || 0
    },${jsonData.cristal1_color_od_id || 0},${
      jsonData.cristal1_tratamiento_od_id || 0
    },${jsonData.cristal1_od_diametro || 0},"${
      A1_CR_OD.value.trim() ?? ""
    }",${1},${jsonData.cristal1_marca_oi_id || 0},${
      jsonData.cristal1_diseno_oi_id || 0
    },${jsonData.cristal1_indice_oi_id || 0},${
      jsonData.cristal1_material_oi_id || 0
    },${jsonData.cristal1_color_oi_id || 0},${
      jsonData.cristal1_tratamiento_oi_id || 0
    },${jsonData.cristal1_oi_diametro || 0},"${A1_CR_OI.value.trim() ?? ""}",${
      jsonData.cristal1_tratamiento_adicional_id || 0
    },${1},${jsonData.cristal2_marca_od_id || 0},${
      jsonData.cristal2_diseno_od_id || 0
    },${jsonData.cristal2_indice_od_id || 0},${
      jsonData.cristal2_material_od_id || 0
    },${jsonData.cristal2_color_od_id || 0},${
      jsonData.cristal2_tratamiento_od_id || 0
    },${jsonData.cristal2_od_diametro || 0},"${
      A2_CR_OD.value.trim() ?? ""
    }",${1},${jsonData.cristal2_marca_oi_id || 0},${
      jsonData.cristal2_diseno_oi_id || 0
    },${jsonData.cristal2_indice_oi_id || 0},${
      jsonData.cristal2_material_oi_id || 0
    },${jsonData.cristal2_color_oi_id || 0},${
      jsonData.cristal2_tratamiento_oi_id || 0
    },${jsonData.cristal2_oi_diametro || 0},"${A2_CR_OI.value.trim() ?? ""}",${
      jsonData.cristal2_tratamiento_adicional_id || 0
    },${jsonData.motivo_garantia_id || 0},${jsonData.folio_asociado || 0},${
      isEditting
        ? 0
        : jsonData.resolucion_garantia_id === "Aceptada"
        ? "1"
        : "2"
    },"${jsonData.worktracking || 0}","${jsonData.nota_venta || 0}",${
      jsonData.numero_reporte_firma || 0
    },"${jsonData.numero_reporte_atencion || 0}","${
      jsonData.numero_orden_compra || 0
    }",${jsonData.numero_guia || 0},${jsonData.numero_factura || 0},"${
      jsonData.folio_interno_mandante || 0
    }","${jsonData.reporte_interno_mandante || 0}","${
      jsonData.numero_envio || 0
    }" ,${jsonData.total || 0},"${
      formValues?.receta.observaciones || ""
    }",${rbd_ubicacion},${rbd_cantidad}, ${rep_cantidad},"${estado_validacion}", "${
      isToggleMontajeValidation.value === true ? 1 : 0
    }"`;

    let dataJSON = [
      {
        rut: `${jsonData.cliente_rut || formValues.cliente.cliente_rut}`,
      },
    ];

    const query = {
      query: "03",
      _p1,
      _p3: `${_p3}`,
      _p2: `${jsonData.tipo_anteojo_id || tipo_de_anteojo.value}`,
      _rut: _rut.trim(),
      _proyecto: `${jsonData.proyecto_codigo}`,
      _origen,
      _destino,
      _estado: estado.toString(),
      _usuario: User.id.toString(),
      _obs: "OT INGRESADA",
      _estado_validacion: "1",
      _cristalJSONOri: cristalesJSON,
      _armazonJSONOri: armazonesJSON,
      _punto_venta: `${punto_venta.value}`,
      _dataJSON: encodeURIComponent(JSON.stringify(dataJSON)),
    };

    try {
      const response = await axios.post(`${URLBackend}/api/ot/crear/`, query);
      const message = `Nuevo Folio OT: ${response.data.datos[0][0]}`;
      if (response.status === 200) {
        if (keepForm.value === true) {
          toast.dismiss(toastLoading);
          reiniciarFormOT(keepForm.value, message, true);
          return;
        }
        const result = await showModal(
          MODAL.keep,
          "",
          MODAL.keepYes,
          MODAL.kepNo
        );
        if (result) {
          let clearCliente = true;
          keepForm.value = true;
          toast.success(message);
          toast.dismiss(toastLoading);
          reiniciarFormOT(keepForm.value, message, clearCliente);
          return;
        } else {
          toast.success(message);
          dispatch(
            fetchOT({
              OTAreas: OTAreaActual,
              searchParams: paramsOT.value || "",
            })
          );
          handleCloseForm();
          isExistClient.value = false;
        }
      }
      toast.dismiss(toastLoading);
    } catch (error) {
      toast.dismiss(toastLoading);
      toast.error("Error al Ingresar la OT");
    }
    toast.dismiss(toastLoading);
    return query;
  };
  const sumatoriaNivel1 = validationNivel1.value.reduce(
    (index, objeto) => index + objeto.valor,
    0
  );

  const clearAllInputsOT = (
    clearCliente?: boolean,
    _clearOptiLabl?: boolean
  ) => {
    //? A1-OJO-DERECHO
    dioptrias_receta.value.a1_od.esf = " ";
    dioptrias_receta.value.a1_od.cil = " ";
    dioptrias_receta.value.a1_od.eje = " ";
    dioptrias_receta.value.a1_od.ad = " ";

    dioptrias_receta.value.a1_oi.esf = " ";
    dioptrias_receta.value.a1_oi.cil = " ";
    dioptrias_receta.value.a1_oi.eje = " ";
    dioptrias_receta.value.a1_oi.ad = " ";

    A1_DP.value = " ";
    A2_DP.value = " ";
    A1_ALT.value = "  ";
    oftalmologo_id.value = "";

    handleFormChange({ worktracking: " " }, "optica");
    handleFormChange({ nota_venta: " " }, "optica");
    handleFormChange({ folio_interno_mandante: " " }, "optica");
    handleFormChange({ reporte_interno_mandante: " " }, "optica");
    handleFormChange({ numero_envio: " " }, "optica");

    if (clearCliente) {
      handleFormChange({ cliente_rut: " " }, "cliente");
      handleFormChange({ cliente_nombre: " " }, "cliente");
      handleFormChange({ cliente_sexo: " " }, "cliente");
      handleFormChange({ cliente_tipo: " " }, "cliente");
      handleFormChange({ cliente_fecha_nacimiento: "" }, "cliente");
      handleFormChange({ cliente_correo: "" }, "cliente");
      handleFormChange({ cliente_telefono: "" }, "cliente");
      handleFormChange({ cliente_region: 0 }, "cliente");
      handleFormChange({ cliente_comuna: 0 }, "cliente");
      handleFormChange({ cliente_provincia: 0 }, "cliente");
      handleFormChange({ cliente_direccion: "" }, "cliente");
      handleFormChange({ establecimiento_id: 0 }, "cliente");
    }

    handleFormChange({ a1_alt: " " }, "receta");
    handleFormChange({ a1_dp: " " }, "receta");
    handleFormChange({ a2_dp: " " }, "receta");

    handleFormChange({ observaciones: " " }, "receta");
    handleFormChange({ fecha_receta: " " }, "receta");
    handleFormChange({ numero_receta: " " }, "receta");

    handleFormChange({ a2_od_esf: " " }, "receta");
    handleFormChange({ a2_od_cil: " " }, "receta");
    handleFormChange({ a2_od_eje: " " }, "receta");
    handleFormChange({ a2_oi_esf: " " }, "receta");
    handleFormChange({ a2_oi_cil: " " }, "receta");
    handleFormChange({ a2_oi_eje: " " }, "receta");

    // handleFormChange({"cristal1_marca_id": ' '} , 'cristales')
    handleFormChange({ cristal1_marca_id: false }, "cristales");
    handleFormChange({ cristal1_diseno_id: false }, "cristales");
    handleFormChange({ cristal1_indice_id: false }, "cristales");
    handleFormChange({ cristal1_material_id: false }, "cristales");
    handleFormChange({ cristal1_color_id: false }, "cristales");
    handleFormChange({ cristal1_tratamiento_id: false }, "cristales");
    handleFormChange({ cristal1_tratamiento_adicional_id: false }, "cristales");
    handleFormChange({ cristal1_diametro: " " }, "cristales");
    handleFormChange({ criststal1_od: " " }, "cristales");
    handleFormChange({ criststal1_oi: " " }, "cristales");

    handleFormChange({ a1_armazon_id: " " }, "armazones");
    handleFormChange({ a2_armazon_id: " " }, "armazones");
    handleFormChange({ a3_armazon_id: " " }, "armazones");

    A1_CR_OD.value = "  ";
    A1_CR_OI.value = "  ";
    A1_GRUPO_OD.value = "  ";
    A1_GRUPO_OI.value = "  ";

    A2_GRUPO_OD.value = "";
    A2_GRUPO_OI.value = "";
    A2_CR_OD.value = "";
    A2_CR_OI.value = "";

    // onDataChange({[name]:value})

    //? A2-OJO-DERECHO
    a2_od_esf.value = "  ";
    a2_od_cil.value = "  ";
    a2_od_eje.value = "  ";

    a2_oi_esf.value = "  ";
    a2_oi_cil.value = "  ";
    a2_oi_eje.value = "  ";

    handleFormChange({ a2_dp: " " }, "receta");

    // handleFormChange({"cristal1_marca_id": ' '} , 'cristales')
    handleFormChange({ cristal2_marca_id: false }, "cristales");
    handleFormChange({ cristal2_marca_id: undefined }, "cristales");
    handleFormChange({ cristal2_diseno_id: false }, "cristales");
    handleFormChange({ cristal2_indice_id: false }, "cristales");
    handleFormChange({ cristal2_material_id: false }, "cristales");
    handleFormChange({ cristal2_color_id: false }, "cristales");
    handleFormChange({ cristal2_tratamiento_id: false }, "cristales");
    handleFormChange({ cristal2_tratamiento_adicional_id: false }, "cristales");
    handleFormChange({ cristal2_diametro: " " }, "cristales");

    handleFormChange({ cristal2_od: " " }, "cristales");
    handleFormChange({ cristal2_oi: " " }, "cristales");

    A2_CR_OD.value = "  ";
    A2_CR_OI.value = "  ";
    A2_GRUPO_OD.value = "  ";
    A2_GRUPO_OI.value = "  ";

    a1_armazon.value = "  ";
    a2_armazon.value = "  ";
    a3_armazon.value = "  ";

    //TODO: VALIDACION DE CAMPOS
    validation_A1_OD_ESF(undefined);
    validation_A1_OD_CILL(undefined);
    validation_A1_OD_EJE(undefined);
    validation_A1_OD_AD(undefined);

    validation_A1_OI_ESF(undefined);
    validation_A1_OI_CIL(undefined);
    validation_A1_OI_EJE(undefined);

    validation_A1_ALT(undefined);
    validation_A1_DP(undefined);

    validation_A2_OD_ESF(undefined);
    validation_A2_OD_CIL(undefined);
    validation_A2_OD_EJE(undefined);

    validation_A2_OI_ESF(undefined);
    validation_A2_OI_CIL(undefined);
    validation_A2_OI_EJE(undefined);

    validation_A2_DP(undefined);

    // if(clearOptiLabl){
    //   reiniciarValidationNivel1(true, false);
    // }else{
    //   reiniciarValidationNivel1(true, true);
    // }
  };

  const onSubmit: SubmitHandler<any> = async (jsonData, _type?: any) => {
    //? ========================================
    const cristales = [
      { codigo: `${A1_CR_OD.value}`, opcion_vta: "1" },
      { codigo: `${A1_CR_OI.value}`, opcion_vta: "1" },
      { codigo: `${A2_CR_OD.value}`, opcion_vta: "1" },
      { codigo: `${A2_CR_OI.value}`, opcion_vta: "1" },
    ]
      .map((item) => {
        const numero = parseFloat(item.codigo);
        if (
          !isNaN(numero) &&
          numero !== 0 &&
          numero !== null &&
          !Number.isNaN(numero)
        ) {
          return { codigo: `${numero}` };
        }
        return null;
      })
      .filter((item) => item !== null);

    const cristalesJSON = JSON.stringify(cristales);
    cristalesJSONsignal.value = cristales;

    const armazones = [
      { codigo: `${a1_armazon.value}` },
      { codigo: `${a2_armazon.value}` },
      // { codigo: `${ a3_armazon.value}` },
    ]
      .map((item) => {
        const numero = parseFloat(item.codigo);
        if (!isNaN(numero) && numero !== 0 && numero !== null) {
          return { codigo: `${numero}` };
        }
        return null;
      })
      .filter((item) => item !== null);

    const armazonesJSON = JSON.stringify(armazones);
    armazonesJSONsignal.value = armazones;

    if (submitAction === "pausar") {
    } else if (submitAction === "procesar") {
      let estado = OTAreaActual === 100 ? 50 : 20;

      if (OTAreaActual === 90) {
        const result: any = validarNumeroDocumento(data);
        if (!result) {
          setSubmitAction("");
          return;
        }
      }

      updateOT(
        jsonData,
        OTAreaActual,
        OTAreas["areaSiguiente"],
        estado,
        formValuesCompleto,
        data,
        OTSlice.cristales,
        OTSlice.armazones,
        User["id"].toString()
      ).then(() => {
        if (paramsOT.value !== "") {
          dispatch(
            fetchOT({ OTAreas: OTAreaActual, searchParams: paramsOT.value })
          );
        } else {
          dispatch(fetchOT({ OTAreas: OTAreaActual }));
        }

        handleCloseForm();
      });
      setSubmitAction("");
    } else if (submitAction === "ingresar") {
      insertOT(jsonData, cristalesJSON, armazonesJSON);
      setSubmitAction("");
    }
  };

  //Persistencia de datos
  const handleFormChange = async (dataForm: any, name: string) => {
    setChangeboolean((prev) => !prev);
    let clearCliente = false;
    const key = Object.keys(dataForm)[0];

    if (key === "tipo_anteojo_id" || key === "proyecto_codigo") {
      const value = Object.values(dataForm)[0];

      if (value === "3") {
        tipo_anteojo_title.value = "Lejos";
        tipo_anteojo_title_cristal2.value = "Cerca";
      } else {
        const filteredTipo = tipo_anteojo_array.filter(
          (tipo: any) => tipo[0].toString() === value
        );
        tipo_anteojo_title.value =
          filteredTipo.length > 0 ? filteredTipo[0][1] : "";
      }

      clearAllInputsOT(clearCliente, true);
    }

    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: {
        ...prevFormValues[name],
        ...dataForm,
      },
    }));

    if (key === "cristal1_tratamiento_adicional_id") {
      // setValue("cristal1_marca_od_id", "1");
      // setValue("cristal1_indice_od_id", "1");
      setValue("cristal1_material_od_id", "1");
      // setValue("cristal1_color_od_id", "1");
      // setValue("cristal1_tratamiento_od_id", "1");
      // setValue("cristal1_diseno_od_id", "1");
      // setValue("cristal1_od_diametro", "65");

      const formValores = getValues();

      const getGrupoCristalesData = await getGrupoCristales_od_A1(
        formValores,
        data,
        setErrorGrupoDioptria_od_A1,
        setChangeboolean,
        isEditting,
        setErrorGrupoDioptria_od_A2,
        setValue
      );

      console.log(getGrupoCristalesData);
    }
    if (key === "cristal1_tratamiento_adicional_id") {
      // setValue("cristal1_marca_oi_id", "1");
      // setValue("cristal1_indice_oi_id", "1");
      setValue("cristal1_material_oi_id", "1");
      // setValue("cristal1_color_oi_id", "1");
      // setValue("cristal1_tratamiento_oi_id", "1");
      // setValue("cristal1_diseno_oi_id", "1");
      // setValue("cristal1_oi_diametro", "65");

      const formValores = getValues();

      await getGrupoCristales_oi_A1(
        formValores,
        data,
        setErrorGrupoDioptria_oi_A1,
        setChangeboolean,
        isEditting,
        setErrorGrupoDioptria_oi_A2,
        setValue
      );
    }

    if (key === "cristal2_tratamiento_adicional_id") {
      // setValue("cristal2_marca_od_id", "1");
      // setValue("cristal2_indice_od_id", "1");
      setValue("cristal2_material_od_id", "1");
      // setValue("cristal2_color_od_id", "1");
      // setValue("cristal2_tratamiento_od_id", "1");
      // setValue("cristal2_diseno_od_id", "1");
      // setValue("cristal2_od_diametro", "65");

      const formValores = getValues();
      await getGrupoCristales_od_A2(
        formValores,
        data,
        setErrorGrupoDioptria_od_A2,
        setChangeboolean,
        setValue
      );
    }
    if (key === "cristal2_tratamiento_adicional_id") {
      // setValue("cristal2_marca_oi_id", "1");
      // setValue("cristal2_indice_oi_id", "1");
      setValue("cristal2_material_oi_id", "1");
      // setValue("cristal2_color_oi_id", "1");
      // setValue("cristal2_tratamiento_oi_id", "1");
      // setValue("cristal2_diseno_oi_id", "1");
      // setValue("cristal2_oi_diametro", "65");

      const formValores = getValues();
      await getGrupoCristales_oi_A2(
        formValores,
        data,
        setErrorGrupoDioptria_oi_A2,
        setChangeboolean,
        setValue
      );
    }

    //TODO: inputChangeAction
    if (inputChangeActions[key]) {
      inputChangeActions[key](dataForm);
      // if(name === 'tipo_anteojo_id'){
      //   console.log('tipo_anteojo_title:', dataForm)
      // }
    }

    //TODO: DIOPTRIAS CRISTALES SI ES TIPO 3(LEJOS/CERCA)
    if (tipo_de_anteojo.value === "3") {
      //? OJO DERECHO
      if (
        Object.keys(dataForm)[0] === "a1_od_esf" ||
        Object.keys(dataForm)[0] === "a1_od_cil" ||
        Object.keys(dataForm)[0] === "a1_od_eje" ||
        Object.keys(dataForm)[0] === "a1_od_ad" ||
        tipo_de_anteojo.value === "3"
      ) {
        if (
          typeof dioptrias_receta.value.a1_od.ad !== "object" &&
          dioptrias_receta.value.a1_od.ad > 0
        ) {
          a2_od_esf.value = (
            typeof dioptrias_receta.value.a1_od.esf !== "object" &&
            Number.isNaN(dioptrias_receta.value.a1_od.esf)
              ? 0
              : parseFloat(dioptrias_receta.value.a1_od.esf) +
                parseFloat(dioptrias_receta.value.a1_od.ad)
          ).toFixed(2);

          if (a2_od_esf.value > 0) {
            a2_od_esf.value = "+" + a2_od_esf.value;
          }

          a2_od_cil.value =
            typeof dioptrias_receta.value.a1_od.cil === "object"
              ? 0
              : dioptrias_receta.value.a1_od.cil;
          a2_od_eje.value =
            typeof dioptrias_receta.value.a1_od.eje === "object"
              ? 0
              : dioptrias_receta.value.a1_od.eje;
          validation_A2_OD_ESF(a2_od_esf.value);
          validation_A2_OD_CIL(a2_od_cil.value);
          validation_A2_OD_EJE(a2_od_eje.value);
          setValue("a2_od_esf", a2_od_esf.value);
          setValue("a2_od_cil", a2_od_cil.value);
          setValue("a2_od_eje", a2_od_eje.value);
        }
      }
      //? OJO IZQUIERDO
      if (
        Object.keys(dataForm)[0] === "a1_oi_esf" ||
        Object.keys(dataForm)[0] === "a1_oi_cil" ||
        Object.keys(dataForm)[0] === "a1_oi_eje" ||
        Object.keys(dataForm)[0] === "a1_oi_ad" ||
        tipo_de_anteojo.value === "3"
      ) {
        if (dioptrias_receta.value.a1_od.ad <= 0) {
          a2_od_esf.value = "";
          dioptrias_receta.value.a1_od.ad = "";
        }

        if (dioptrias_receta.value.a1_oi.ad !== " " && a1_oi_ad.value >= 0) {
          a2_oi_esf.value = (
            typeof dioptrias_receta.value.a1_oi.esf !== "object" &&
            Number.isNaN(dioptrias_receta.value.a1_oi.esf)
              ? 0
              : parseFloat(dioptrias_receta.value.a1_oi.esf) +
                parseFloat(dioptrias_receta.value.a1_oi.ad)
          ).toFixed(2);
          if (a2_oi_esf.value > 0) {
            a2_oi_esf.value = "+" + a2_oi_esf.value;
          }
          a2_oi_eje.value =
            typeof dioptrias_receta.value.a1_oi.eje === "object"
              ? 0
              : dioptrias_receta.value.a1_oi.eje;
          a2_oi_cil.value =
            typeof dioptrias_receta.value.a1_oi.cil === "object"
              ? 0
              : dioptrias_receta.value.a1_oi.cil;
        }

        setValue("a2_od_esf", a2_od_esf.value);
        setValue("a2_od_cil", a2_od_cil.value);
        setValue("a2_od_eje", a2_od_eje.value);
        setValue("a2_oi_esf", a2_oi_esf.value);
        setValue("a2_oi_cil", a2_oi_cil.value);
        setValue("a2_oi_eje", a2_oi_eje.value);

        if (
          parseFloat(a2_od_esf.value) < 0 ||
          parseFloat(a2_oi_esf.value) < 0
        ) {
          setValue("cristal2_diametro", 70);
        } else {
          setValue("cristal2_diametro", 65);
        }
      }

      validation_A2_OD_ESF(a2_od_esf.value);
      validation_A2_OD_CIL(a2_od_cil.value);
      validation_A2_OD_EJE(a2_od_eje.value);

      validation_A2_OI_ESF(a2_oi_esf.value);
      validation_A2_OI_CIL(a2_oi_cil.value);
      validation_A2_OI_EJE(a2_oi_eje.value);
    }
    // ? CODIGO CRISTALES Y GRUPO ANTEOJO 1:
    if (changeCodigoCristal_od_A1[key]) {
      const formValue = getValues();
      const getGrupoCristalesData = getGrupoCristales_od_A1(
        formValue,
        data,
        setErrorGrupoDioptria_od_A1,
        setChangeboolean,
        isEditting,
        setErrorGrupoDioptria_od_A2,
        setValue
      );
      console.log(getGrupoCristalesData);
    }

    if (changeCodigoCristal_oi_A1[key]) {
      const formValue = getValues();
      getGrupoCristales_oi_A1(
        formValue,
        data,
        setErrorGrupoDioptria_oi_A1,
        setChangeboolean,
        isEditting,
        setErrorGrupoDioptria_oi_A2,
        setValue
      );
    }

    //? CODIGO CRISTALES Y GRUPO  ANTEOJO 2:
    if (changeCodigoCristal_od_A2[key]) {
      const formValue = getValues();
      if (tipo_de_anteojo.value === "3") {
        getGrupoCristales_od_A2(
          formValue,
          data,
          setErrorGrupoDioptria_od_A2,
          setChangeboolean,
          setValue
        );
      }
    }
    //? CODIGO CRISTALES Y GRUPO  ANTEOJO 2:
    if (changeCodigoCristal_oi_A2[key]) {
      const formValue = getValues();
      if (tipo_de_anteojo.value === "3") {
        getGrupoCristales_oi_A2(
          formValue,
          data,
          setErrorGrupoDioptria_oi_A2,
          setChangeboolean,
          setValue
        );
      }
    }
  };

  const loadFormData = () => {
    if (formValues) {
      setValue("optica", formValues.optica);
      setValue("cliente", formValues.cliente);
      setValue("receta", formValues.receta);
      setValue("cristales", formValues.cristales);
    }
  };

  const handleIngresarClick = () => {
    setSubmitAction("ingresar");
  };

  React.useEffect(() => {
    if (!isEditting) {
      setValue("cristal1_marca_od_id", "1");
      setValue("cristal1_indice_od_id", "1");
      setValue("cristal1_material_od_id", "1");
      setValue("cristal1_color_od_id", "1");
      setValue("cristal1_tratamiento_od_id", "1");
      setValue("cristal1_diseno_od_id", "1");
      setValue("cristal1_od_diametro", "65");

      setValue("cristal1_marca_oi_id", "1");
      setValue("cristal1_indice_oi_id", "1");
      setValue("cristal1_material_oi_id", "1");
      setValue("cristal1_color_oi_id", "1");
      setValue("cristal1_tratamiento_oi_id", "1");
      setValue("cristal1_diseno_oi_id", "1");
      setValue("cristal1_oi_diametro", "65");

      setValue("cristal2_marca_od_id", "1");
      setValue("cristal2_indice_od_id", "1");
      setValue("cristal2_material_od_id", "1");
      setValue("cristal2_color_od_id", "1");
      setValue("cristal2_tratamiento_od_id", "1");
      setValue("cristal2_diseno_od_id", "1");
      setValue("cristal2_od_diametro", "65");

      setValue("cristal2_marca_oi_id", "1");
      setValue("cristal2_indice_oi_id", "1");
      setValue("cristal2_material_oi_id", "1");
      setValue("cristal2_color_oi_id", "1");
      setValue("cristal2_tratamiento_oi_id", "1");
      setValue("cristal2_diseno_oi_id", "1");
      setValue("cristal2_oi_diametro", "65");
    }
  }, [setValue, isEditting]);

  React.useEffect(() => {
    validar_parametrizacion.value =
      (data && data[EnumGrid.validar_parametrizacion_id]) || "1";
    const permiso = OTAreaActual && permissions(OTAreaActual);
    setOTPermissions(permiso && permiso[6]);
  }, [OTAreaActual]);

  React.useEffect(() => {
    dispatch(clearCodigos());

    if (data) {
      //TODO: OBTIENE LOS DATOS DE QUERY14 Y LO COLOCA EN VARIABLES GLOBALES DE LOS INPUTS
      getDatosOT(data);
      motivo_ot.value = data[EnumGrid.motivo] === "Garantía" ? false : true;
      dispatch(
        addToArmazones([
          { codigo: data && data[EnumGrid.a1_armazon_id] },
          { codigo: data && data[EnumGrid.a2_armazon_id] },
        ])
      );
      dispatch(
        addToCristales([
          { codigo: data && data[EnumGrid.cristal1_od] },
          { codigo: data && data[EnumGrid.cristal1_oi] },
          { codigo: data && data[EnumGrid.cristal2_od] },
          { codigo: data && data[EnumGrid.cristal2_oi] },
        ])
      );
    }

    if (isEditting) {
      validation_tipo_anteojo();
      // console.log('validaciones')
      //VALIDACIONES NIVEL 1
      handleValidationCheckLab(data && data);

      validationProyectos(data && data[EnumGrid.proyecto_codigo]);
      validationEstablecimientos(data && data[EnumGrid.establecimiento_id]);
      validationCliente(data && data[EnumGrid.cliente_rut]);
      validationClienteNombre(data && data[EnumGrid.cliente_nomnbre]);
      validationClienteTipo(data && data[EnumGrid.cliente_tipo]);
      validationClienteSexo(data && data[EnumGrid.cliente_sexo]);
      validationClienteTelefono(data && data[EnumGrid.cliente_sexo]);
      validationClienteComuna(data && data[EnumGrid.cliente_comuna_id]);
      validationFechaAtencion(data && data[EnumGrid.fecha_atencion]);
      validationPuntoVenta(data && data[EnumGrid.punto_venta_id]);
      validationTipoAnteojos(data && data[EnumGrid.tipo_anteojo_id]);

      //VALIDACIONES NIVEL 2
      validationFechaEntregaTaller(data && data[EnumGrid.fecha_entrega_taller]);
      validationFechaDespacho(data && data[EnumGrid.fecha_despacho]);
      validationFechaEntregaCliente(
        data && data[EnumGrid.fecha_entrega_cliente]
      );
      validation_A1_OD_ESF(data && data[EnumGrid.a1_od_esf]);
      validation_A1_OD_CILL(data && data[EnumGrid.a1_od_cil]);
      validation_A1_OD_EJE(data && data[EnumGrid.a1_od_eje]);
      validation_A1_OD_AD(data && data[EnumGrid.a1_od_ad]);
      validation_A1_OI_ESF(data && data[EnumGrid.a1_oi_esf]);
      validation_A1_OI_CIL(data && data[EnumGrid.a1_oi_cil]);
      validation_A1_OI_EJE(data && data[EnumGrid.a1_oi_eje]);
      validation_A1_OI_AD(data && data[EnumGrid.a1_oi_ad]);
      validation_A1_DP(data && data[EnumGrid.a1_dp]);

      validation_A1_ALT(data && data[EnumGrid.a1_alt]);
      validation_A1_armazon(data && data[EnumGrid.a1_armazon_id]);
      // validation_A2_armazon(data && data[EnumGrid.a2_armazon_id])

      validation_A2_OD_ESF(data && data[EnumGrid.a2_od_esf]);
      validation_A2_OD_CIL(data && data[EnumGrid.a2_od_cil]);
      validation_A2_OD_EJE(data && data[EnumGrid.a2_od_eje]);

      validation_A2_OI_ESF(data && data[EnumGrid.a2_oi_esf]);
      validation_A2_OI_CIL(data && data[EnumGrid.a2_oi_cil]);
      validation_A2_OI_EJE(data && data[EnumGrid.a2_oi_eje]);
      validation_A2_DP(data && data[EnumGrid.a2_dp]);

      validation_A1_armazon(data && data[EnumGrid.a1_armazon_id]);

      validation_Cristal1_od_marca(data && data[EnumGrid.cristal1_od_marca_id]);
      validation_Cristal1_od_diseño(
        data && data[EnumGrid.cristal1_od_diseno_id]
      );
      validation_Cristal1_od_indice(
        data && data[EnumGrid.cristal1_od_indice_id]
      );
      validation_Cristal1_od_material(
        data && data[EnumGrid.cristal1_od_material_id]
      );
      validation_Cristal1_od_tratamiento(
        data && data[EnumGrid.cristal1_od_tratamiento_id]
      );
      validation_Cristal1_od_color(data && data[EnumGrid.cristal1_od_color_id]);
      validation_Cristal1_od_diametro(
        data && data[EnumGrid.cristal1_od_diametro]
      );
      validation_Cristal1_od(data && data[EnumGrid.cristal1_od]);

      validation_Cristal1_oi_marca(data && data[EnumGrid.cristal1_oi_marca_id]);
      validation_Cristal1_oi_diseño(
        data && data[EnumGrid.cristal1_oi_marca_id]
      );
      validation_Cristal1_oi_indice(
        data && data[EnumGrid.cristal1_oi_marca_id]
      );
      validation_Cristal1_oi_material(
        data && data[EnumGrid.cristal1_oi_marca_id]
      );
      validation_Cristal1_oi_tratamiento(
        data && data[EnumGrid.cristal1_oi_marca_id]
      );
      validation_Cristal1_oi_color(data && data[EnumGrid.cristal1_oi_marca_id]);
      validation_Cristal1_oi_diametro(
        data && data[EnumGrid.cristal1_oi_marca_id]
      );
      validation_Cristal1_oi(data && data[EnumGrid.cristal1_oi]);

      combinaciones_validas_od(
        data && data[EnumGrid.a1_od_esf],
        data && data[EnumGrid.a1_od_cil],
        data && data[EnumGrid.a1_od_eje]
      );

      tipo_anteojo_title.value = data && data[EnumGrid.tipo_anteojo];
      validation_A2_armazon("32");
      if (data && data[EnumGrid.tipo_anteojo_id] === 3) {
        validation_cristal2_od_marca(
          data && data[EnumGrid.cristal2_od_marca_id]
        );
        validation_Cristal2_od_diseño(
          data && data[EnumGrid.cristal2_od_diseno_id]
        );
        validation_Cristal2_od_indice(
          data && data[EnumGrid.cristal2_od_indice_id]
        );
        validation_Cristal2_od_material(
          data && data[EnumGrid.cristal2_od_material_id]
        );
        validation_Cristal2_od_tratamiento(
          data && data[EnumGrid.cristal2_od_tratamiento_id]
        );
        validation_Cristal2_od_color(
          data && data[EnumGrid.cristal2_od_color_id]
        );
        validation_Cristal2_od_diametro(
          data && data[EnumGrid.cristal2_od_diametro]
        );
        validation_Cristal2_od(data && data[EnumGrid.cristal2_od]);

        validation_cristal2_od_marca(
          data && data[EnumGrid.cristal2_oi_marca_id]
        );
        validation_Cristal2_od_diseño(
          data && data[EnumGrid.cristal2_oi_diseno_id]
        );
        validation_Cristal2_od_indice(
          data && data[EnumGrid.cristal2_oi_indice_id]
        );
        validation_Cristal2_od_material(
          data && data[EnumGrid.cristal2_oi_material_id]
        );
        validation_Cristal2_od_tratamiento(
          data && data[EnumGrid.cristal2_oi_tratamiento_id]
        );
        validation_Cristal2_od_color(
          data && data[EnumGrid.cristal2_oi_color_id]
        );
        validation_Cristal2_od_diametro(
          data && data[EnumGrid.cristal2_oi_diametro]
        );

        validation_Cristal2_oi(data && data[EnumGrid.cristal2_oi]);
        tipo_anteojo_title_cristal2.value = "Cerca";
        tipo_anteojo_title.value = "Lejos";
        if (CR2_OD_LAB.value === true) {
          validation_Cristal2_od("32");
        }
        if (CR2_OI_LAB.value === true) {
          validation_Cristal2_oi("32");
        }
      }

      // console.log(data && data[EnumGrid.tipo_anteojo])

      // getGrupoCristales_A1({}, data, setErrorGrupoDioptriaA1, setFOTBooleanStates, isEditting, setErrorGrupoDioptriaA2)

      if (CR1_OD_LAB.value === true) {
        validation_Cristal1_od("32");
      }
      if (CR1_OI_LAB.value === true) {
        validation_Cristal1_oi("32");
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (
      submitAction === "pausar" ||
      submitAction === "procesar" ||
      submitAction === "derivar" ||
      submitAction === "ingresar"
    ) {
      handleSubmit(onSubmit)();
    }
  }, [submitAction]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseForm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    if (errorGrupoDioptria_od_A1) {
      toast.error(errorGrupoDioptria_od_A1);
      A1_CR_OD.value = " ";
      // A1_CR_OI.value = " ";
      A1_GRUPO_OD.value = "";
      // A1_GRUPO_OI.value = "";
      validation_Cristal1_od("");
      // validation_Cristal1_oi("");
      setErrorGrupoDioptria_od_A1("");
    }
  }, [errorGrupoDioptria_od_A1]);

  useEffect(() => {
    if (errorGrupoDioptria_oi_A1) {
      toast.error(errorGrupoDioptria_oi_A1);
      // A1_CR_OD.value = " ";
      A1_CR_OI.value = " ";
      // A1_GRUPO_OD.value = "";
      A1_GRUPO_OI.value = "";
      // validation_Cristal1_od("");
      validation_Cristal1_oi("");
      setErrorGrupoDioptria_oi_A1("");
    }
  }, [errorGrupoDioptria_oi_A1]);

  useEffect(() => {
    if (errorGrupoDioptria_od_A2 !== "") {
      toast.error(errorGrupoDioptria_od_A2);
      A2_CR_OD.value = " ";
      // A2_CR_OI.value = " ";
      A2_GRUPO_OD.value = " ";
      // A2_GRUPO_OI.value = " ";
      validation_Cristal2_od("");
      // validation_Cristal2_oi("");
    }
  }, [errorGrupoDioptria_od_A2]);

  useEffect(() => {
    if (errorGrupoDioptria_oi_A2 !== "") {
      toast.error(errorGrupoDioptria_oi_A2);
      // A2_CR_OD.value = " ";
      A2_CR_OI.value = " ";
      // A2_GRUPO_OD.value = " ";
      A2_GRUPO_OI.value = " ";
      // validation_Cristal2_od("");
      validation_Cristal2_oi("");
    }
  }, [errorGrupoDioptria_oi_A2]);

  useEffect(() => {
    const fechaHoraActual = new Date();
    const fechaFormateada = fechaHoraActual.toISOString().split("T")[0];
    fecha_atencion_signal.value = fechaFormateada;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "ArrowRight") {
        setSelectedTab((prevTab) => (prevTab + 1 + 6) % 6);
      } else if (event.ctrlKey && event.key === "ArrowLeft") {
        setSelectedTab((prevTab) => (prevTab - 1 + 6) % 6);
      }
    };

    // const scrollThreshold = 200; // Ajusta este valor según tus necesidades
    // let scrollAccumulator = 0; // Variable para acumular el desplazamiento

    // const handleScroll = (event: WheelEvent) => {
    //   const delta = event.deltaY; // Usar deltaY para scroll vertical
    //   scrollAccumulator += delta;

    //   if (Math.abs(scrollAccumulator) >= scrollThreshold) {
    //     if (scrollAccumulator > 0) {
    //       // Desplazamiento hacia abajo
    //       setSelectedTab((prevTab) => (prevTab + 1 + 6) % 6);
    //     } else {
    //       // Desplazamiento hacia arriba
    //       setSelectedTab((prevTab) => (prevTab - 1 + 6) % 6);
    //     }

    //     // Reinicia el acumulador de desplazamiento
    //     scrollAccumulator = 0;
    //   }
    // };
    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("wheel", handleScroll); // Para el scroll con el mouse

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("wheel", handleScroll); // Limpia el evento de scroll
    };
  }, []);

  const camposRequeridosCliente = [
    "cliente_rut",
    "cliente_nombre",
    "cliente_tipo",
    "cliente_sexo",
    "cliente_telefono",
    "cliente_comuna",
    "establecimiento_id",
  ];
  const camposRequeridosReceta = [
    "tipo_anteojo_id",
    "a1_od_esf",
    "a1_od_cil",
    "a1_od_eje",
    "a1_od_ad",
    "a1_oi_ad",
    "a1_oi_esf",
    "a1_oi_cil",
    "a1_oi_eje",
    "a1_dp",
    "a1_alt",
    "a2_od_esf",
    "a2_od_cil",
    "a2_od_eje",
    "a2_oi_esf",
    "a2_oi_cil",
    "a2_oi_eje",
    "a2_dp",
  ];
  const camposRequeridosCristales = [
    "cristal1_marca_id",
    "cristal1_diseno_id",
    "cristal1_indice_id",
    "cristal1_material_id",
    "cristal1_tratamiento_id",
    "cristal1_color_id",
    "cristal1_diametro",
    "cristal1_od",
    "cristal1_oi",
    "cristal2_marca_id",
    "cristal2_diseno_id",
    "cristal2_indice_id",
    "cristal2_material_id",
    "cristal2_tratamiento_id",
    "cristal2_color_id",
    "cristal2_diametro",
    "cristal2_od",
    "cristal2_oi",
  ];
  const camposRequeridosArmazones = ["a1_armazon_id", "a2_armazon_id"];

  const camposRequeridosOptica = [
    "proyecto",
    "punto_venta_id",
    "fecha_atencion",
  ];

  const checkOptica = camposRequeridosOptica.every((campo) => {
    const campoEncontrado = validationNivel1.value.find(
      (item: any) => item.campo === campo
    );
    return campoEncontrado && campoEncontrado.valor === 1;
  });

  const checkCliente = camposRequeridosCliente.every((campo) => {
    const campoEncontrado = validationNivel1.value.find(
      (item: any) => item.campo === campo
    );
    return campoEncontrado && campoEncontrado.valor === 1;
  });

  const checkReceta = camposRequeridosReceta.every((campo) => {
    const campoEncontrado = validationNivel1.value.find(
      (item: any) => item.campo === campo
    );
    return campoEncontrado && campoEncontrado.valor === 1;
  });

  const checkCristales = camposRequeridosCristales.every((campo) => {
    const campoEncontrado = validationNivel1.value.find(
      (item: any) => item.campo === campo
    );
    return campoEncontrado && campoEncontrado.valor === 1;
  });

  const checkArmazones = camposRequeridosArmazones.every((campo) => {
    const campoEncontrado = validationNivel1.value.find(
      (item: any) => item.campo === campo
    );
    return campoEncontrado && campoEncontrado.valor === 1;
  });

  console.log(isLoadingArmazonValidation);
  console.log(!isLoadingArmazonValidation);

  console.log(
    isMOT
      ? permisos_ot_historica.permisoAnular &&
          data?.[EnumGrid.area_id] === 110 &&
          permiso_usuario_btn_anular
      : permiso_usuario_btn_anular &&
          idMenu !== 200 &&
          OTPermissions[PermisosBotones.anular] === "1"
  );

  console.log(isMOT);
  console.log(escritura_lectura);
  console.log(permiso_usuario_btn_anular);
  console.log(OTPermissions[PermisosBotones.anular]);

  return (
    <div className="useFormContainerOT top-[0%]  w-full h-[100%] !z-40">
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}
      >
        <TabList className="flex items-center top-[10] ml-5">
          <Tab
            className="custom-tab items-center  flex relative"
            tabIndex={"-1"}
            disabled={isLoadingOT.value}
          >
            <span className="!text-[1vw]">ÓPTICA</span>
            {checkOptica && (
              <div
                className="absolute left-[7rem]  !w-[2vw] pointer-events-none"
                aria-disabled
              >
                <Checkbox color="green" defaultChecked className="text-sm" />
              </div>
            )}
          </Tab>
          <Tab
            className="custom-tab items-center flex relative"
            tabIndex={"-1"}
            disabled={isLoadingOT.value}
          >
            <span className="text-[1vw]">CLIENTE</span>
            {checkCliente && (
              <div
                className="absolute left-[5rem] pointer-events-none"
                aria-disabled
              >
                <Checkbox color="green" defaultChecked className="text-sm" />
              </div>
            )}
          </Tab>
          <Tab
            className="custom-tab items-center flex relative"
            tabIndex={"-1"}
            disabled={isLoadingOT.value}
          >
            <span className="text-[1vw]">RECETA</span>
            {checkReceta && (
              <div
                className="absolute left-[5rem] pointer-events-none"
                aria-disabled
              >
                <Checkbox color="green" defaultChecked className="text-sm" />
              </div>
            )}
          </Tab>
          <Tab
            className="custom-tab items-center flex relative"
            tabIndex={"-1"}
            disabled={isLoadingOT.value}
          >
            CRISTALES
            {checkCristales && (
              <div
                className="absolute left-[7.5rem] pointer-events-none !rounded-full"
                aria-disabled
              >
                {validacionIncompleta.value.check === true ? (
                  <Checkbox
                    color="red"
                    defaultChecked
                    className="text-sm !rounded-full"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    }
                  />
                ) : (
                  <Checkbox color="green" defaultChecked className="text-sm" />
                )}
              </div>
            )}
          </Tab>
          <Tab
            className="custom-tab items-center flex relative"
            tabIndex={"-1"}
            disabled={isLoadingOT.value}
          >
            ARMAZONES
            {checkArmazones && (
              <div
                className="absolute left-[7.5rem] pointer-events-none"
                aria-disabled
              >
                <Checkbox color="green" defaultChecked className="text-sm" />
              </div>
            )}
          </Tab>
          <Tab className="custom-tab " disabled={isLoadingOT.value}>
            BITÁCORA
          </Tab>
          {isEditting && (
            <h1 className="tabFolioNumber">
              Folio OT: {data && data[EnumGrid.folio]}
            </h1>
          )}
        </TabList>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <Spinner className="h-12 w-12" style={{ color: "#f39c12" }} />
            </div>
          }
        >
          <div
            className="top-0 absolute right-3 text-2xl cursor-pointert"
            onClick={() => {
              handleCloseForm();
            }}
          >
            <button
              onClick={closeModal}
              className="userFormBtnClose"
              tabIndex={-1}
            >
              X
            </button>
          </div>
          <TabPanel onSelect={loadFormData}>
            <FOTOptica
              control={control}
              data={data && data}
              isEditting={isEditting}
              onlyRead={onlyRead}
              formValues={formValues["optica"]}
              onDataChange={(data: any) => handleFormChange(data, "optica")}
              setIsMotivo={setIsMotivo}
              setToggle={setToggle}
              permiso_usuario_workTracking={permiso_usuario_workTracking}
              permiso_area_worktraking={permiso_area_worktraking}
              permiso_areas_resolucion_garantia={
                permiso_areas_resolucion_garantia
              }
              permisos_areas_estado_immpresion={permiso_areas_estado_impresion}
              permiso_areas_estado_validacion={permiso_areas_estado_validacion}
              permiso_usuario_estado_impresion={
                permiso_usuario_estado_impresion
              }
              permiso_usuario_estado_validacion={
                permiso_usuario_estado_validacion
              }
              permiso_usuario_resolucion_garantia={
                permiso_usuario_resolucion_garantia
              }
            />
          </TabPanel>

          <TabPanel onSelect={loadFormData}>
            <FOTClientes
              control={control}
              data={data && data}
              isEditting={isEditting}
              onlyRead={onlyRead}
              formValues={formValues["cliente"]}
              onDataChange={(data: any) => handleFormChange(data, "cliente")}
              register={register}
            />
          </TabPanel>

          <TabPanel>
            <FOTReceta
              permiso_usuario_receta={permiso_usuario_receta}
              permiso_areas_receta={permiso_areas_receta}
              onlyRead={onlyRead}
              isEditting={isEditting}
              data={data && data}
              setValue={setValue}
              formValues={formValuesCompleto}
              control={control}
              onDataChange={(data: any) => handleFormChange(data, "receta")}
            />
          </TabPanel>

          <TabPanel>
            <FOTCristales
              permiso_area_verificar_cristal={permiso_area_verificar_cristal}
              permiso_usuario_verificar_cristal={
                permiso_usuario_verificar_cristal
              }
              permiso_usuario_grupo_dioptria={permiso_usuario_grupo_dioptria}
              permiso_areas_grupo_dioptria={permiso_areas_grupo_dioptria}
              permiso_areas_cristales={permiso_areas_cristales}
              permiso_usuario_cristales={permiso_usuario_cristales}
              onlyRead={onlyRead}
              isEditting={isEditting}
              data={data && data}
              formValues={formValuesCompleto}
              formValuesCompleto={formValuesCompleto}
              setValue={setValue}
              control={control}
              onDataChange={(data: any) => handleFormChange(data, "cristales")}
            />
          </TabPanel>

          <TabPanel>
            <FOTArmazones
              formValuesCompleto={formValuesCompleto}
              setSelectedTab={setSelectedTab}
              permiso_areas_armazones={permiso_areas_armazones}
              isEditting={isEditting}
              permiso_usuario_armazones={permiso_usuario_armazones}
              onlyRead={onlyRead}
              data={data && data}
              formValues={formValues["armazones"]}
              control={control}
              onDataChange={(data: any) => handleFormChange(data, "armazones")}
            />
          </TabPanel>

          <TabPanel>
            <FOTBitacora isMOT={isMOT} otData={data && data} />
          </TabPanel>

          <Suspense>
            {FOTBooleanStates.showGarantia && (
              <div>
                <FOTGarantia
                  data={data && data}
                  onClose={() =>
                    setFOTBooleanStates((prev) => ({
                      ...prev,
                      showPendiente: false,
                    }))
                  }
                  closeModal={handleCloseForm}
                />
              </div>
            )}
          </Suspense>
          <Suspense>
            {FOTBooleanStates.showDerivacion && (
              <div>
                <FOTDerivacion
                  closeModal={handleCloseForm}
                  formValues={formValues}
                  data={data && data}
                  onClose={() =>
                    setFOTBooleanStates((prev) => ({
                      ...prev,
                      showDerivacion: false,
                    }))
                  }
                />
              </div>
            )}
          </Suspense>
          <Suspense>
            {FOTBooleanStates.showPendiente && (
              <div>
                <FOTPendiente
                  closeModal={handleCloseForm}
                  onClose={() =>
                    setFOTBooleanStates((prev) => ({
                      ...prev,
                      showPendiente: false,
                    }))
                  }
                  data={data && data}
                  formValues={formValues}
                />
              </div>
            )}
          </Suspense>
          <Suspense>
            {FOTBooleanStates.showAnulacion && (
              <div>
                <FOTAnulacion
                  otHistorica={isMOT}
                  closeModal={handleCloseForm}
                  onClose={() =>
                    setFOTBooleanStates((prev) => ({
                      ...prev,
                      showAnulacion: false,
                    }))
                  }
                  data={data && data}
                />
              </div>
            )}
          </Suspense>

          <Suspense>
            {isFOTEmpaque && (
              <FOTEmpaque closeModal={() => setIsFOTEmpaque(false)} />
            )}
          </Suspense>

          <Suspense>
            {isShowErrorModal.value === true && selectedTab === 3 && (
              <FOTErrorModal
                onClose={() => (isShowErrorModal.value = false)}
                caseUso={"Cristales"}
                data={dataErrorModal.value}
              />
            )}
          </Suspense>

          {/*************** BOTON POST VENTA/GARANTIA ***************/}
          {/* <div className='flex items-center mx-auto mt-[1.5rem] justify-around w-1/2 '> */}
          <div className="flex items-center mx-auto !mt-3 !mb-5">
            {isEditting &&
              data?.[EnumGrid.area_id] === 110 &&
              permiso_usuario_btn_postVenta &&
              isMOT &&
              escritura_lectura &&
              isMOT &&
              permisos_ot_historica.permisoPostVenta && (
                // isMotivo    &&  (
                <div className="mx-auto">
                  <Button
                    className="w-[12rem] text-[1.3rem] bg-green-500 otActionButtonForm  hover:bg-green-400"
                    onClick={() => {
                      setFOTBooleanStates((prev) => ({
                        ...prev,
                        showGarantia: !prev.showGarantia,
                      }));
                    }}
                  >
                    Post-Venta
                  </Button>
                </div>
              )}

            {/*************** BOTON PROCESAR INDIVIDUAL ***************/}

            {/* 
                {OTPermissions           && 
                !isMOT                   &&
                isEditting               &&
                escritura_lectura        &&
                User.permisos_areas[EnumAreas[OTAreaActual]] === "1" && 
                // OTPermissions[6] === "1" &&
                // sumatoriaNivel1  === validationNivel1.value.length &&
               (data && data[EnumGrid.area_id] > procesarRender.value) &&
               (sumatoriaNivel1  === validationNivel1.value.length || data && data[EnumGrid.validar_parametrizacion_id] === "0" ) &&
                (
                  ((permiso_area_verificar_cristal && permiso_area_verificar_armazon ) && sumatoriaNivel3 === validationNivel3.value.length && (!secondProcessBodega.value)) || 
                  (OTAreaActual !== 60)
                ) && 
               (
                  <Button className='otActionButton bg-green-400 hover:bg-green-700' onClick={handleProcesarClick}>Procesar</Button>
                )}

              */}

            {/*************** BOTON PAUSAR ***************/}
            {OTPermissions &&
              !isMOT &&
              isEditting &&
              escritura_lectura &&
              !isLoadingArmazonValidation.value &&
              !isLoadingGetGrupoCristales.value &&
              OTPermissions[PermisosBotones.pausar] === "1" &&
              permiso_usuario_btn_pausar && (
                <div className="mx-auto">
                  <Button
                    className="w-[12rem] text-[1.3rem] otActionButtonForm bg-yellow-700 hover:bg-yellow-600"
                    onClick={() => {
                      if (data && data[EnumGrid.estado_id] === 15) {
                        return toast.error(
                          `Folio ${
                            data[EnumGrid.folio]
                          } se encuentra en Stand-By.`
                        );
                      }
                      setFOTBooleanStates((prev) => ({
                        ...prev,
                        showPendiente: !prev.showPendiente,
                      }));
                    }}
                  >
                    Pausar
                  </Button>
                </div>
              )}

            {/*************** BOTON DERIVAR ***************/}
            {OTPermissions &&
              !isMOT &&
              isEditting &&
              !isLoadingArmazonValidation.value &&
              !isLoadingGetGrupoCristales.value &&
              escritura_lectura &&
              OTPermissions[PermisosBotones.derivar] === "1" &&
              OTAreas["areaActual"] !== 60 &&
              // sumatoriaNivel1  === validationNivel1.value.length &&
              permiso_usuario_btn_derivar &&
              data &&
              data[EnumGrid.estado_id] > 1 && (
                <div className="mx-auto">
                  <Button
                    className="w-[12rem] text-[1.3rem] otActionButtonForm bg-red-700 hover:bg-red-400"
                    onClick={() => {
                      if (data && data[EnumGrid.estado_id] === 15) {
                        return toast.error(
                          `Folio ${
                            data[EnumGrid.folio]
                          } se encuentra en Stand-By.`
                        );
                      }
                      setFOTBooleanStates((prev) => ({
                        ...prev,
                        showDerivacion: !prev.showDerivacion,
                      }));
                    }}
                  >
                    Derivar
                  </Button>
                </div>
              )}

            {/*************** BOTON ANULAR ***************/}

            {(escritura_lectura && isMOT
              ? permisos_ot_historica.permisoAnular &&
                data?.[EnumGrid.area_id] === 110 &&
                permiso_usuario_btn_anular
              : permiso_usuario_btn_anular &&
                permisosAreasUsuario_resolucion &&
                idMenu !== 200 &&
                OTPermissions[PermisosBotones.anular] === "1") && (
              // sumatoriaNivel1 === validationNivel1.value.length && (
              // (data && data[EnumGrid.estado_id] === 30 || data && data[EnumGrid.estado_id] === 40 ) &&
              // <Button className=' translate-y-[-2.7vw] text-[1vw] w-[10vw] bg-black' onClick={()=>{
              <div className="mx-auto">
                <Button
                  className="w-[12rem] text-[1.3rem] bg-black otActionButtonForm hover:bg-gray-800"
                  onClick={() => {
                    setFOTBooleanStates((prev) => ({
                      ...prev,
                      showAnulacion: !prev.showAnulacion,
                    }));
                  }}
                >
                  {" "}
                  Anular
                </Button>
              </div>
            )}

            {/*************** BOTON INGRESAR ***************/}

            {OTPermissions &&
              !isEditting &&
              !isLoadingArmazonValidation.value &&
              !isLoadingGetGrupoCristales.value &&
              // (!isEditting || (data && data[EnumGrid.area_id] === 40 && data && data[EnumGrid.motivo_garantia_id] === 2 ) )  &&
              escritura_lectura &&
              // OTPermissions[10] === "1" &&
              sumatoriaNivel1 === validationNivel1.value.length && (
                <div className="mx-auto">
                  <Button
                    className="w-[12rem] text-[1.3rem] bg-blue-500 otActionButtonForm  hover:bg-blue-400"
                    onClick={handleIngresarClick}
                  >
                    Guardar
                  </Button>
                </div>
              )}
          </div>

          <CustomModal />
        </Suspense>
      </Tabs>
    </div>
  );
};

export default FOT;
