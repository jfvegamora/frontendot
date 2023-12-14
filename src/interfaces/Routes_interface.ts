import {lazy}             from 'react';


//landingPage
const Landing               = lazy(()=>import("../presentation/pages/LandingPage"))

const MOT                   = lazy(()=>import("../presentation/views/mantenedores/MOT"));
const MOTHistorica          = lazy(()=>import("../presentation/views/mantenedores/MOTHistorica"));
const MClientes             = lazy(()=>import("../presentation/views/mantenedores/MClientes"));
const MEstablecimientos     = lazy(()=>import("../presentation/views/mantenedores/MEstablecimientos"));
const MPuntosVenta          = lazy(()=>import("../presentation/views/mantenedores/MPuntosVenta"));
const MSituaciones          = lazy(()=>import("../presentation/views/mantenedores/MSituaciones"));

const MArmazones            = lazy(()=>import("../presentation/views/mantenedores/MArmazones"));
const MArmazonesKardex      = lazy(()=>import("../presentation/views/mantenedores/MArmazonesKardex"));
const MCristales            = lazy(()=>import("../presentation/views/mantenedores/MCristales"));
const MCristalesKardex      = lazy(()=>import("../presentation/views/mantenedores/MCristalesKardex"));
const MAccesorios           = lazy(()=>import("../presentation/views/mantenedores/MAccesorios"));
const MAccesoriosKardex     = lazy(()=>import("../presentation/views/mantenedores/MAccesoriosKardex"));
const MAlmacenes            = lazy(()=>import("../presentation/views/mantenedores/MAlmacenes"));
const MMarcas               = lazy(()=>import("../presentation/views/mantenedores/MMarcas"));
const MProveedores          = lazy(()=>import("../presentation/views/mantenedores/MProveedores"));

const MMandantes            = lazy(()=>import("../presentation/views/mantenedores/MMandantes"));
const MProyectos            = lazy(()=>import("../presentation/views/mantenedores/MProyectos"));
const MProyectosArmazones   = lazy(()=>import("../presentation/views/mantenedores/MProyectosArmazones"));
const MProyectosAccesorios  = lazy(()=>import("../presentation/views/mantenedores/MProyectosAccesorios"));
const MProyectosCristales   = lazy(()=>import("../presentation/views/mantenedores/MProyectosCristales"));
const MProyectosDirecciones = lazy(()=>import("../presentation/views/mantenedores/MProyectosDirecciones"));
const MProyectosPuntosVenta = lazy(()=>import("../presentation/views/mantenedores/MProyectosPuntosVenta"));
const MProyectosUsuarios    = lazy(()=>import("../presentation/views/mantenedores/MProyectosUsuarios"));
const MProyectosAtenciones  = lazy(()=>import("../presentation/views/mantenedores/MProyectosAtenciones"));
const MProyectosFirmas      = lazy(()=>import("../presentation/views/mantenedores/MProyectosFirmas"));
const MOftalmologos         = lazy(()=>import("../presentation/views/mantenedores/MOftalmologos"));

const MCargos               = lazy(()=>import("../presentation/views/mantenedores/MCargos"));
const MFuncionalidades      = lazy(()=>import("../presentation/views/mantenedores/MFuncionalidades"));
const MPermisos             = lazy(()=>import("../presentation/views/mantenedores/MPermisos"));
// const MPermisosAreas        = lazy(()=>import("../presentation/views/mantenedores/MPermisosArea"));
const MUsuarios             = lazy(()=>import("../presentation/views/mantenedores/MUsuarios")); 
const MPerfiles             = lazy(()=>import("../presentation/views/mantenedores/MPerfiles"));
const MEmpresas             = lazy(()=>import("../presentation/views/mantenedores/MEmpresas"));

export const PublicRoutes = {
  LOGIN                 : "login",
  RESETPASSWORD         : "resetpassword/:token",
  FORGOTPASSWORD        : "forgotpassword",
  PROFILE               : "profile"
  // LOGOUT: "logout",
};

export const PrivateRoutes = {
  HOME                  : "home",
  PRIVATE               : "private",
  PROFILE               : 'profile',

  //MENU OT
  OTHISTORICA           : "othistorica",
  OT                    : "ot",
  CLIENTES              : "clientes",
  ESTABLECIMIENTOS      : "establecimientos",
  PUNTOS_VENTA          : "puntosventa",
  SITUACIONES           : "situaciones",

  //BODEGA
  ARMAZONES             : "armazones",
  ARMAZONES_KARDEX      : "kardexarmazones",
  CRISTALES             : "cristales",
  CRISTALES_KARDEX      : "kardexcristales",
  ACCESORIOS            : "accesorios",
  ACCESORIOS_KARDEX     : "kardexaccesorios",
  ALMACENES             : "almacenes",
  MARCAS                : "marcas",
  PROVEEDORES           : "proveedores",

  //PROYECTOS
  MANDANTES             : "mandantes",
  PROYECTOS             : "proyectos",
  PROYECTOS_ARMAZONES   : "proyectoarmazones",
  PROYECTOS_CRISTALES   : "proyectocristales",
  PROYECTOS_ACCESORIOS  : "proyectoaccesorios",
  PROYECTOS_DIRECCIONES : "proyectodireccionesdespacho",
  PROYECTOS_PUNTOS_VENTA: "proyectopuntosventa",
  PROYECTOS_USUARIOS    : "proyectousuarios",
  REPORTE_ATENCION      : "proyectoreporteatencion",
  REPORTE_FIRMAS        : "proyectoreportefirma",
  OFTALMOLOGOS          : "oftalmologos",

  //MENU SISTEMA
  CARGOS                : "cargos",
  FUNCIONALIDADES       : "funcionalidades",
  USUARIOS              : "usuarios",
  PERFILES              : "perfiles",
  PERMISOS              : "permisos",
  PERMISOS_AREAS        : "permisosareas",
  EMPRESAS              : "empresas",


  //landingpage
  LANDING               : "landing"
};

export const privateRoutes = [
  
  {
    id                  : "1",
    path                : PrivateRoutes.LANDING,
    component           : Landing,
    requiredPermissions : ['view_' + PrivateRoutes.OT]
  },
  // MENU OT
  {
    id                  : "1",
    path                : PrivateRoutes.OTHISTORICA,
    component           : MOTHistorica,
    requiredPermissions : ['view_' + PrivateRoutes.OT]
  },
  {
    id                  : "28",
    path                : PrivateRoutes.OT,
    component           : MOT,
    requiredPermissions : ['view_' + PrivateRoutes.OT]
  },
  {
    id                  : "2",
    path                : PrivateRoutes.CLIENTES,
    component           : MClientes,
    requiredPermissions : ['view_' + PrivateRoutes.CLIENTES]
  },
  {
    id                  : "3",
    path                : PrivateRoutes.ESTABLECIMIENTOS,
    component           : MEstablecimientos,
    requiredPermissions : ['view_' + PrivateRoutes.ESTABLECIMIENTOS]
  },
  {
    id                  : "4",
    path                : PrivateRoutes.PUNTOS_VENTA,
    component           : MPuntosVenta,
    requiredPermissions : ['view_' + PrivateRoutes.PUNTOS_VENTA]
  },
  {
    id                  : "29",
    path                : PrivateRoutes.SITUACIONES,
    component           : MSituaciones,
    requiredPermissions : ['view_' + PrivateRoutes.SITUACIONES]
  },

  //BODEGA
  {
    id                  : "5",
    path                : PrivateRoutes.ARMAZONES,
    component           : MArmazones,
    requiredPermissions : ['view_' + PrivateRoutes.ARMAZONES]
  },
  {
    id                  : "6",
    path                : PrivateRoutes.ARMAZONES_KARDEX,
    component           : MArmazonesKardex,
    requiredPermissions : ['view_' + PrivateRoutes.ARMAZONES_KARDEX]
  },
  {
    id                  : "7",
    path                : PrivateRoutes.CRISTALES,
    component           : MCristales,
    requiredPermissions : ['view_' + PrivateRoutes.CRISTALES]
  },
  {
    id                  : "8",
    path                : PrivateRoutes.CRISTALES_KARDEX,
    component           : MCristalesKardex,
    requiredPermissions : ['view_' + PrivateRoutes.CRISTALES_KARDEX]
  },
  {
    id                  : "9",
    path                : PrivateRoutes.ACCESORIOS,
    component           : MAccesorios,
    requiredPermissions : ['view_' + PrivateRoutes.ACCESORIOS]
  },
  {
    id                  : "10",
    path                : PrivateRoutes.ACCESORIOS_KARDEX,
    component           : MAccesoriosKardex,
    requiredPermissions : ['view_' + PrivateRoutes.ACCESORIOS_KARDEX]
  },
  {
    id                  : "11",
    path                : PrivateRoutes.ALMACENES,
    component           : MAlmacenes,
    requiredPermissions : ['view_' + PrivateRoutes.ALMACENES]
  },
  {
    id                  : "12",
    path                : PrivateRoutes.MARCAS,
    component           : MMarcas,
    requiredPermissions : ['view_' + PrivateRoutes.MARCAS]
  },
  {
    id                  : "13",
    path                : PrivateRoutes.PROVEEDORES,
    component           : MProveedores,
    requiredPermissions : ['view_' + PrivateRoutes.PROVEEDORES]
  },

  //PROYECTOS
  {
    id                  : "14",
    path                : PrivateRoutes.MANDANTES,
    component           : MMandantes,
    requiredPermissions : ['view_' + PrivateRoutes.MANDANTES]
  },
  {
    id                  : "15",
    path                : PrivateRoutes.PROYECTOS,
    component           : MProyectos,
    requiredPermissions : ['view_' + PrivateRoutes.PROYECTOS]
  },
  {
    id                  : "16",
    path                : PrivateRoutes.PROYECTOS_ARMAZONES,
    component           : MProyectosArmazones,
    requiredPermissions : ['view_' + PrivateRoutes.PROYECTOS_ARMAZONES]
  },
  {
    id                  : "17",
    path                : PrivateRoutes.PROYECTOS_CRISTALES,
    component           : MProyectosCristales,
    requiredPermissions : ['view_' + PrivateRoutes.PROYECTOS_CRISTALES]
  },
  {
    id                  : "30",
    path                : PrivateRoutes.PROYECTOS_ACCESORIOS,
    component           : MProyectosAccesorios,
    requiredPermissions : ['view_' + PrivateRoutes.PROYECTOS_ACCESORIOS]
  },
  {
    id                  : "18",
    path                : PrivateRoutes.PROYECTOS_DIRECCIONES,
    component           : MProyectosDirecciones,
    requiredPermissions : ['view_' + PrivateRoutes.PROYECTOS_DIRECCIONES]
  },
  {
    id                  : "33",
    path                : PrivateRoutes.PROYECTOS_PUNTOS_VENTA,
    component           : MProyectosPuntosVenta,
    requiredPermissions : ['view_' + PrivateRoutes.PROYECTOS_PUNTOS_VENTA]
  },
  {
    id                  : "34",
    path                : PrivateRoutes.PROYECTOS_USUARIOS,
    component           : MProyectosUsuarios,
    requiredPermissions : ['view_' + PrivateRoutes.PROYECTOS_USUARIOS]
  },
  {
    id                  : "19",
    path                : PrivateRoutes.REPORTE_ATENCION,
    component           : MProyectosAtenciones,
    requiredPermissions : ['view_' + PrivateRoutes.REPORTE_ATENCION]
  },
  {
    id                  : "20",
    path                : PrivateRoutes.REPORTE_FIRMAS,
    component           : MProyectosFirmas,
    requiredPermissions : ['view_' + PrivateRoutes.REPORTE_FIRMAS]
  },
  {
    id                  : "21",
    path                : PrivateRoutes.OFTALMOLOGOS,
    component           : MOftalmologos,
    requiredPermissions : ['view_' + PrivateRoutes.OFTALMOLOGOS]
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
    id                  : "22",
    path                : PrivateRoutes.CARGOS,
    component           : MCargos,
    requiredPermissions : ['view_' + PrivateRoutes.CARGOS]
  },
  {
    id                  : "23",
    path                : PrivateRoutes.FUNCIONALIDADES,
    component           : MFuncionalidades,
    requiredPermissions : ['view_' + PrivateRoutes.FUNCIONALIDADES]
  },
  {
    id                  : "24",
    path                : PrivateRoutes.USUARIOS,
    component           : MUsuarios,
    requiredPermissions : ['view_' + PrivateRoutes.USUARIOS]
  },
  {
    id                  : "25",
    path                : PrivateRoutes.PERFILES,
    component           : MPerfiles,
    requiredPermissions : ['view_' + PrivateRoutes.PERFILES]
  },
  {
    id                  : "26",
    path                : PrivateRoutes.PERMISOS,
    component           : MPermisos,
    requiredPermissions : ['view_' + PrivateRoutes.PERMISOS]
  },
  {
    id                  : "27",
    path                : PrivateRoutes.EMPRESAS,
    component           : MEmpresas,
    requiredPermissions : ['view_' + PrivateRoutes.EMPRESAS]
  },
];
