export const PublicRoutes = {
  LOGIN: "login",
  RESETPASSWORD: "resetpassword/:token",
  FORGOTPASSWORD: "forgotpassword",
  // LOGOUT: "logout",
};

export const PrivateRoutes = {
  HOME: "home",
  PRIVATE: "private",

  //MENU OT
  OT:                 "ot",
  CLIENTES:           "clientes",
  ESTABLECIMIENTOS:   "establecimientos",
  PUNTOS_VENTA:       "puntosventa",

  //BODEGA
  ARMAZONES:          "armazones",
  ARMAZONES_KARDEX:   "kardexarmazones",
  CRISTALES:          "cristales",
  CRISTALES_KARDEX:   "kardexcristales",
  ACCESORIOS:         "accesorios",
  ACCESORIOS_KARDEX:  "kardexaccesorios",
  ALMACENES:          "almacenes",
  MARCAS:             "marcas",
  PROVEEDORES:        "proveedores",

  //PROYECTOS
  MANDANTES:              "mandantes",
  PROYECTOS:              "proyectos",
  PROYECTOS_ARMAZONES:    "proyectos_armazones",
  PROYECTOS_GRUPOS:       "proyectos_grupos",
  PROYECTOS_DIRECCIONES:  "proyectos_direcciones",
  REPORTE_ATENCION:       "reporte_atencion",
  REPORTE_FIRMAS:         "reporte_firmas",
  OFTALMOLOGOS:           "oftalmologos",

  //MENU SISTEMA
  CARGOS: "cargos",
  FUNCIONALIDADES: "funcionalidades",
  USUARIOS: "usuarios",
  PERFILES: "perfiles",
  PERMISOS: "permisos",
  EMPRESAS: "empresas",
};
