import { lazy } from "react";

//ot
const MEstablecimientos = lazy(
  () => import("../presentation/views/mantenedores/MEstablecimientos")
);
const MPuntosVenta = lazy(
  () => import("../presentation/views/mantenedores/MPuntosVenta")
);
const MClientes = lazy(
  () => import("../presentation/views/mantenedores/MClientes")
);

//BODEGA
const MArmazones = lazy(
  () => import("../presentation/views/mantenedores/MArmazones")
);
const MCristales = lazy(
  () => import("../presentation/views/mantenedores/MCristales")
);
const MCristalesKardes = lazy(
  () => import("../presentation/views/mantenedores/MCristalesKardex")
);
const MAccesorios = lazy(
  () => import("../presentation/views/mantenedores/MAccesorios")
);
const MAlmacenes = lazy(
  () => import("../presentation/views/mantenedores/MAlmacenes")
);
// const Marcas = lazy(
//   () => import("../presentation/views/mantenedores/MProveedores")
// );
// const MProveedores = lazy(
//   () => import("../presentation/views/mantenedores/MProveedores")
// );

//SISTEMA
const MUsuarios = lazy(
  () => import("../presentation/views/mantenedores/MUsuarios")
);
const MCargos = lazy(
  () => import("../presentation/views/mantenedores/MCargos")
);
const MFuncionalidades = lazy(
  () => import("../presentation/views/mantenedores/MFuncionalidades")
);
const MPerfiles = lazy(
  () => import("../presentation/views/mantenedores/MPerfiles")
);
const MPermisos = lazy(
  () => import("../presentation/views/mantenedores/MPermisos")
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
  OT: "ot",
  CLIENTES: "clientes",
  ESTABLECIMIENTOS: "establecimientos",
  PUNTOS_VENTA: "puntosventa",

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

  //PROYECTOS
  MANDANTES: "mandantes",
  PROYECTOS: "proyectos",
  PROYECTOS_ARMAZONES: "proyectos_armazones",
  PROYECTOS_GRUPOS: "proyectos_grupos",
  PROYECTOS_DIRECCIONES: "proyectos_direcciones",
  REPORTE_ATENCION: "reporte_atencion",
  REPORTE_FIRMAS: "reporte_firmas",
  OFTALMOLOGOS: "oftalmologos",

  //MENU SISTEMA
  CARGOS: "cargos",
  FUNCIONALIDADES: "funcionalidades",
  USUARIOS: "usuarios",
  PERFILES: "perfiles",
  PERMISOS: "permisos",
  EMPRESAS: "empresas",
};

export const privateRoutes = [
  //PROYECTOS
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  // {
  //   id:"22",
  //   path: PrivateRoutes.PROVEEDORES,
  //   component: MCargos,
  //   requiredPermissions: ['view_proveedores']
  // },
  //Menu OT
  {
    id: "2",
    path: PrivateRoutes.CLIENTES,
    component: MClientes,
    requiredPermissions: ["view_clientes"],
  },
  {
    id: "3",
    path: PrivateRoutes.ESTABLECIMIENTOS,
    component: MEstablecimientos,
    requiredPermissions: ["view_armazones"],
  },
  {
    id: "4",
    path: PrivateRoutes.PUNTOS_VENTA,
    component: MPuntosVenta,
    requiredPermissions: ["view_armazones"],
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
    component: MCristalesKardes,
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
    path: "cargos",
    component: MCargos,
    requiredPermissions: ["view_cargos"],
  },
  {
    id: "23",
    path: PrivateRoutes.FUNCIONALIDADES,
    component: MFuncionalidades,
    requiredPermissions: ["view_funcionalidades"],
  },
  {
    id: "26",
    path: PrivateRoutes.PERMISOS,
    component: MPermisos,
    requiredPermissions: ["view_permisos"],
  },
  {
    id: "25",
    path: PrivateRoutes.PERFILES,
    component: MPerfiles,
    requiredPermissions: ["view_perfiles"],
  },
  {
    id: "24",
    path: PrivateRoutes.USUARIOS,
    component: MUsuarios,
    requiredPermissions: ["view_usuarios"],
  },
];
