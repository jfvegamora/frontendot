import { lazy } from "react";

//landingPage
const Landing = lazy(() => import("../presentation/pages/LandingPage"));
const MovilReservaArmazones = lazy(
  () => import("../presentation/pages/MovilReservaArmazones")
);

const MOT = lazy(() => import("../presentation/views/mantenedores/MOT"));
const MOTHistorica = lazy(
  () => import("../presentation/views/mantenedores/MOTHistorica")
);
const MClientes = lazy(
  () => import("../presentation/views/mantenedores/MClientes")
);
const MOTBitacora = lazy(
  () => import("../presentation/views/mantenedores/MOTBitacora")
);
const MEstablecimientos = lazy(
  () => import("../presentation/views/mantenedores/MEstablecimientos")
);
const MPuntosVenta = lazy(
  () => import("../presentation/views/mantenedores/MPuntosVenta")
);
const MMotivosOTDerivada = lazy(
  () => import("../presentation/views/mantenedores/MMotivosOTDerivada")
);
const MMotivosOTPendiente = lazy(
  () => import("../presentation/views/mantenedores/MMotivosOTPendiente")
);
const MMotivosOTGarantia = lazy(
  () => import("../presentation/views/mantenedores/MMotivosOTGarantia")
);
const MMotivosOTAnulada = lazy(
  () => import("../presentation/views/mantenedores/MMotivosOTAnulada")
);

const MArmazones = lazy(
  () => import("../presentation/views/mantenedores/MArmazones")
);
const MArmazonesKardex = lazy(
  () => import("../presentation/views/mantenedores/MArmazonesKardex")
);
const MCristales = lazy(
  () => import("../presentation/views/mantenedores/MCristales")
);
const MCristalesKardex = lazy(
  () => import("../presentation/views/mantenedores/MCristalesKardex")
);
const MAccesorios = lazy(
  () => import("../presentation/views/mantenedores/MAccesorios")
);
const MAccesoriosKardex = lazy(
  () => import("../presentation/views/mantenedores/MAccesoriosKardex")
);
const MAlmacenes = lazy(
  () => import("../presentation/views/mantenedores/MAlmacenes")
);
const MMarcas = lazy(
  () => import("../presentation/views/mantenedores/MMarcas")
);
const MProveedores = lazy(
  () => import("../presentation/views/mantenedores/MProveedores")
);

const MMandantes = lazy(
  () => import("../presentation/views/mantenedores/MMandantes")
);
const MProyectos = lazy(
  () => import("../presentation/views/mantenedores/MProyectos")
);
const MMuestrarios = lazy(
  () => import("../presentation/views/mantenedores/MMuestrarios")
);
const MVitrinas = lazy(
  () => import("../presentation/views/mantenedores/MVitrinas")
);
const MMuestrariosArmazones = lazy(
  () => import("../presentation/views/mantenedores/MMuestrariosArmazones")
);
const MVitrinasArmazones = lazy(
  () => import("../presentation/views/mantenedores/MVitrinasArmazones")
);
const MProyectosAccesorios = lazy(
  () => import("../presentation/views/mantenedores/MProyectosAccesorios")
);
const MProyectosCristales = lazy(
  () => import("../presentation/views/mantenedores/MProyectosCristales")
);
const MProyectosDestinos = lazy(
  () => import("../presentation/views/mantenedores/MProyectosDestinos")
);
// const MProyectosPuntosVenta = lazy(()=>import("../presentation/views/mantenedores/MProyectosPuntosVenta"));
const MProyectosUsuarios = lazy(
  () => import("../presentation/views/mantenedores/MProyectosUsuarios")
);
// const MProyectosAtenciones  = lazy(()=>import("../presentation/views/mantenedores/MProyectosAtenciones"));
// const MProyectosFirmas      = lazy(()=>import("../presentation/views/mantenedores/MProyectosFirmas"));
const MProyectosDocum = lazy(
  () => import("../presentation/views/mantenedores/MProyectosDocum")
);
const MProyectoTratamAdic = lazy(
  () => import("../presentation/views/mantenedores/MProyectosTratamAdic")
);
const MOftalmologos = lazy(
  () => import("../presentation/views/mantenedores/MOftalmologos")
);
const MReservaArmazones = lazy(
  () => import("../presentation/views/mantenedores/MReservaArmazones")
);
const MTratamientosAdicionales = lazy(
  () => import("../presentation/views/mantenedores/MTratamientosAdicionales")
);

const MCargos = lazy(
  () => import("../presentation/views/mantenedores/MCargos")
);
const MFuncionalidades = lazy(
  () => import("../presentation/views/mantenedores/MFuncionalidades")
);
const MPermisos = lazy(
  () => import("../presentation/views/mantenedores/MPermisos")
);
// const MPermisosAreas        = lazy(()=>import("../presentation/views/mantenedores/MPermisosArea"));
const MUsuarios = lazy(
  () => import("../presentation/views/mantenedores/MUsuarios")
);
const MPerfiles = lazy(
  () => import("../presentation/views/mantenedores/MPerfiles")
);
const MEmpresas = lazy(
  () => import("../presentation/views/mantenedores/MEmpresas")
);

const MInformeCristales = lazy(
  () => import("../presentation/views/mantenedores/MInformeCristales")
);

const MPizarraDiaria = lazy(
  () => import("../presentation/views/mantenedores/MPizarraDiaria")
);

const MPizarraArchivo = lazy(
  () => import("../presentation/views/mantenedores/MPizarraArchivo")
);

export const PublicRoutes = {
  LOGIN: "login",
  RESETPASSWORD: "resetpassword/:token",
  FORGOTPASSWORD: "forgotpassword",
  PROFILE: "profile",
  // LOGOUT: "logout",
};

export const PrivateRoutes = {
  HOME: "home",
  PRIVATE: "private",
  PROFILE: "profile",

  //MENU OT
  OTHISTORICA: "othistorica",
  OT: "ot",
  CLIENTES: "clientes",
  BITACORA: "bitacora",
  PIZARRADIARIA: "pizarrareportesdiaria",
  PIZARRARCHIVO: "pizarrareportesarchivo",

  ESTABLECIMIENTOS: "establecimientos",
  PUNTOS_VENTA: "puntosventa",
  MOTIVOS_OT_DERIVADA: "motivootderivada",
  MOTIVOS_OT_PENDIENTE: "motivootpendiente",
  MOTIVOS_OT_GARANTIA: "motivootgarantia",
  MOTIVOS_OT_ANULADA: "motivootanulada",

  //BODEGA
  ARMAZONES: "armazones",
  ARMAZONES_KARDEX: "kardexarmazones",
  CRISTALES: "cristales",
  CRISTALES_KARDEX: "kardexcristales",
  ACCESORIOS: "accesorios",
  ACCESORIOS_KARDEX: "kardexaccesorios",
  ALMACENES: "almacenes",
  MARCAS: "marcas",
  PROVEEDORES: "proveedores",
  INFORMECRISTALES: "informecristales",

  //PROYECTOS
  MANDANTES: "mandantes",
  PROYECTOS: "proyectos",
  MUESTRARIOS: "muestrarios",
  VITRINAS: "vitrinas",
  MUESTRARIOS_ARMAZONES: "muestrariosarmazones",
  VITRINAS_ARMAZONES: "vitrinasarmazones",
  PROYECTOS_CRISTALES: "proyectocristales",
  PROYECTOS_ACCESORIOS: "proyectoaccesorios",
  PROYECTOS_DESTINOS: "proyectodestinos",
  PROYECTOS_PUNTOS_VENTA: "proyectopuntosventa",
  PROYECTOS_USUARIOS: "proyectousuarios",
  PROYECTOS_DOCUM: "proyectodocum",
  PROYECTOS_TRATAM_ADIC: "proyectotratamadic",
  REPORTE_ATENCION: "proyectoreporteatencion",
  REPORTE_FIRMAS: "proyectoreportefirma",
  RESERVA_ARMAZONES: "reservaarmazones",
  OFTALMOLOGOS: "oftalmologos",
  TRATAMIENTOS_ADICIONALES: "tratamientosadicionales",

  //MENU SISTEMA
  CARGOS: "cargos",
  FUNCIONALIDADES: "funcionalidades",
  USUARIOS: "usuarios",
  PERFILES: "perfiles",
  PERMISOS: "permisos",
  PERMISOS_AREAS: "permisosareas",
  EMPRESAS: "empresas",

  //landingpage
  LANDING: "",
  LANDINGPAGE: "landing",
  MOVIL_RESERVA_ARMAZONES: "movilarmazonesreserva",
};

export const privateRoutes = [
  {
    id: "1",
    path: PrivateRoutes.LANDING,
    component: Landing,
    requiredPermissions: ["view_" + PrivateRoutes.OT],
  },
  {
    id: "1",
    path: PrivateRoutes.LANDINGPAGE,
    component: Landing,
    requiredPermissions: ["view_" + PrivateRoutes.OT],
  },
  {
    id: "99",
    path: PrivateRoutes.MOVIL_RESERVA_ARMAZONES,
    component: MovilReservaArmazones,
    requiredPermissions: ["view_" + PrivateRoutes.MOVIL_RESERVA_ARMAZONES],
  },
  // MENU OT
  {
    id: "1",
    path: PrivateRoutes.OTHISTORICA,
    component: MOTHistorica,
    requiredPermissions: ["view_" + PrivateRoutes.OT],
  },
  {
    id: "28",
    path: PrivateRoutes.OT,
    component: MOT,
    requiredPermissions: ["view_" + PrivateRoutes.OT],
  },
  {
    id: "2",
    path: PrivateRoutes.CLIENTES,
    component: MClientes,
    requiredPermissions: ["view_" + PrivateRoutes.CLIENTES],
  },
  {
    id: "44",
    path: PrivateRoutes.BITACORA,
    component: MOTBitacora,
    requiredPermissions: ["view_" + PrivateRoutes.BITACORA],
  },
  {
    id: "3",
    path: PrivateRoutes.ESTABLECIMIENTOS,
    component: MEstablecimientos,
    requiredPermissions: ["view_" + PrivateRoutes.ESTABLECIMIENTOS],
  },
  {
    id: "4",
    path: PrivateRoutes.PUNTOS_VENTA,
    component: MPuntosVenta,
    requiredPermissions: ["view_" + PrivateRoutes.PUNTOS_VENTA],
  },
  {
    id: "29",
    path: PrivateRoutes.MOTIVOS_OT_DERIVADA,
    component: MMotivosOTDerivada,
    requiredPermissions: ["view_" + PrivateRoutes.MOTIVOS_OT_DERIVADA],
  },
  {
    id: "39",
    path: PrivateRoutes.MOTIVOS_OT_PENDIENTE,
    component: MMotivosOTPendiente,
    requiredPermissions: ["view_" + PrivateRoutes.MOTIVOS_OT_PENDIENTE],
  },
  {
    id: "40",
    path: PrivateRoutes.MOTIVOS_OT_GARANTIA,
    component: MMotivosOTGarantia,
    requiredPermissions: ["view_" + PrivateRoutes.MOTIVOS_OT_GARANTIA],
  },
  {
    id: "41",
    path: PrivateRoutes.MOTIVOS_OT_ANULADA,
    component: MMotivosOTAnulada,
    requiredPermissions: ["view_" + PrivateRoutes.MOTIVOS_OT_ANULADA],
  },
  {
    id: "47",
    path: PrivateRoutes.PIZARRADIARIA,
    component: MPizarraDiaria,
    requiredPermissions: ["view_" + PrivateRoutes.PIZARRADIARIA],
  },
  {
    id: "48",
    path: PrivateRoutes.PIZARRARCHIVO,
    component: MPizarraArchivo,
    requiredPermissions: ["view_" + PrivateRoutes.PIZARRARCHIVO],
  },

  //BODEGA
  {
    id: "5",
    path: PrivateRoutes.ARMAZONES,
    component: MArmazones,
    requiredPermissions: ["view_" + PrivateRoutes.ARMAZONES],
  },
  {
    id: "6",
    path: PrivateRoutes.ARMAZONES_KARDEX,
    component: MArmazonesKardex,
    requiredPermissions: ["view_" + PrivateRoutes.ARMAZONES_KARDEX],
  },
  {
    id: "7",
    path: PrivateRoutes.CRISTALES,
    component: MCristales,
    requiredPermissions: ["view_" + PrivateRoutes.CRISTALES],
  },
  {
    id: "8",
    path: PrivateRoutes.CRISTALES_KARDEX,
    component: MCristalesKardex,
    requiredPermissions: ["view_" + PrivateRoutes.CRISTALES_KARDEX],
  },
  {
    id: "9",
    path: PrivateRoutes.ACCESORIOS,
    component: MAccesorios,
    requiredPermissions: ["view_" + PrivateRoutes.ACCESORIOS],
  },
  {
    id: "10",
    path: PrivateRoutes.ACCESORIOS_KARDEX,
    component: MAccesoriosKardex,
    requiredPermissions: ["view_" + PrivateRoutes.ACCESORIOS_KARDEX],
  },
  {
    id: "11",
    path: PrivateRoutes.ALMACENES,
    component: MAlmacenes,
    requiredPermissions: ["view_" + PrivateRoutes.ALMACENES],
  },
  {
    id: "12",
    path: PrivateRoutes.MARCAS,
    component: MMarcas,
    requiredPermissions: ["view_" + PrivateRoutes.MARCAS],
  },
  {
    id: "13",
    path: PrivateRoutes.PROVEEDORES,
    component: MProveedores,
    requiredPermissions: ["view_" + PrivateRoutes.PROVEEDORES],
  },
  {
    id: "46",
    path: PrivateRoutes.INFORMECRISTALES,
    component: MInformeCristales,
    requiredPermissions: ["view_" + PrivateRoutes.INFORMECRISTALES],
  },

  //PROYECTOS
  {
    id: "36",
    path: PrivateRoutes.MUESTRARIOS,
    component: MMuestrarios,
    requiredPermissions: ["view_" + PrivateRoutes.MUESTRARIOS],
  },
  {
    id: "37",
    path: PrivateRoutes.VITRINAS,
    component: MVitrinas,
    requiredPermissions: ["view_" + PrivateRoutes.VITRINAS],
  },
  {
    id: "16",
    path: PrivateRoutes.MUESTRARIOS_ARMAZONES,
    component: MMuestrariosArmazones,
    requiredPermissions: ["view_" + PrivateRoutes.MUESTRARIOS_ARMAZONES],
  },
  {
    id: "35",
    path: PrivateRoutes.VITRINAS_ARMAZONES,
    component: MVitrinasArmazones,
    requiredPermissions: ["view_" + PrivateRoutes.VITRINAS_ARMAZONES],
  },
  {
    id: "14",
    path: PrivateRoutes.MANDANTES,
    component: MMandantes,
    requiredPermissions: ["view_" + PrivateRoutes.MANDANTES],
  },
  {
    id: "15",
    path: PrivateRoutes.PROYECTOS,
    component: MProyectos,
    requiredPermissions: ["view_" + PrivateRoutes.PROYECTOS],
  },
  {
    id: "17",
    path: PrivateRoutes.PROYECTOS_CRISTALES,
    component: MProyectosCristales,
    requiredPermissions: ["view_" + PrivateRoutes.PROYECTOS_CRISTALES],
  },
  {
    id: "30",
    path: PrivateRoutes.PROYECTOS_ACCESORIOS,
    component: MProyectosAccesorios,
    requiredPermissions: ["view_" + PrivateRoutes.PROYECTOS_ACCESORIOS],
  },
  {
    id: "18",
    path: PrivateRoutes.PROYECTOS_DESTINOS,
    component: MProyectosDestinos,
    requiredPermissions: ["view_" + PrivateRoutes.PROYECTOS_DESTINOS],
  },
  {
    id: "34",
    path: PrivateRoutes.PROYECTOS_USUARIOS,
    component: MProyectosUsuarios,
    requiredPermissions: ["view_" + PrivateRoutes.PROYECTOS_USUARIOS],
  },
  {
    id: "38",
    path: PrivateRoutes.PROYECTOS_DOCUM,
    component: MProyectosDocum,
    requiredPermissions: ["view_" + PrivateRoutes.PROYECTOS_DOCUM],
  },
  {
    id: "43",
    path: PrivateRoutes.PROYECTOS_TRATAM_ADIC,
    component: MProyectoTratamAdic,
    requiredPermissions: ["view_" + PrivateRoutes.PROYECTOS_TRATAM_ADIC],
  },
  {
    id: "21",
    path: PrivateRoutes.OFTALMOLOGOS,
    component: MOftalmologos,
    requiredPermissions: ["view_" + PrivateRoutes.OFTALMOLOGOS],
  },
  {
    id: "42",
    path: PrivateRoutes.RESERVA_ARMAZONES,
    component: MReservaArmazones,
    requiredPermissions: ["view_" + PrivateRoutes.RESERVA_ARMAZONES],
  },
  {
    id: "45",
    path: PrivateRoutes.TRATAMIENTOS_ADICIONALES,
    component: MTratamientosAdicionales,
    requiredPermissions: ["view_" + PrivateRoutes.TRATAMIENTOS_ADICIONALES],
  },

  //MENU DE BODEGA
  {
    id: "5",
    path: PrivateRoutes.ARMAZONES,
    component: MArmazones,
    requiredPermissions: ["view_armazones"],
  },
  {
    id: "7",
    path: PrivateRoutes.CRISTALES,
    component: MCristales,
    requiredPermissions: ["view_cristales"],
  },
  {
    id: "8",
    path: PrivateRoutes.CRISTALES_KARDEX,
    component: MCristalesKardex,
    requiredPermissions: ["view_cristales_kardex"],
  },
  {
    id: "9",
    path: PrivateRoutes.ACCESORIOS,
    component: MAccesorios,
    requiredPermissions: ["view_cristales_kardex"],
  },
  {
    id: "11",
    path: PrivateRoutes.ALMACENES,
    component: MAlmacenes,
    requiredPermissions: ["view_cristales_kardex"],
  },

  //MENU DE SISTEMA
  {
    id: "22",
    path: PrivateRoutes.CARGOS,
    component: MCargos,
    requiredPermissions: ["view_" + PrivateRoutes.CARGOS],
  },
  {
    id: "23",
    path: PrivateRoutes.FUNCIONALIDADES,
    component: MFuncionalidades,
    requiredPermissions: ["view_" + PrivateRoutes.FUNCIONALIDADES],
  },
  {
    id: "24",
    path: PrivateRoutes.USUARIOS,
    component: MUsuarios,
    requiredPermissions: ["view_" + PrivateRoutes.USUARIOS],
  },
  {
    id: "25",
    path: PrivateRoutes.PERFILES,
    component: MPerfiles,
    requiredPermissions: ["view_" + PrivateRoutes.PERFILES],
  },
  {
    id: "26",
    path: PrivateRoutes.PERMISOS,
    component: MPermisos,
    requiredPermissions: ["view_" + PrivateRoutes.PERMISOS],
  },
  {
    id: "27",
    path: PrivateRoutes.EMPRESAS,
    component: MEmpresas,
    requiredPermissions: ["view_" + PrivateRoutes.EMPRESAS],
  },
];
