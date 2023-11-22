import * as yup from "yup";

import { signal } from "@preact/signals-react";
// export const fechaActual = signal(new Date())
export const fechaActual = new Date();

const msg = "Requerido";

/*************** O T ***************/
//Schema OT
export const validationOTSchema = () =>
  yup.object().shape({
    proyecto        : yup.string().required(`${msg}`),
    establecimiento : yup.string().required(`${msg}`),
    tipo            : yup.string().required(`${msg}`),
    sexo            : yup.string().required(`${msg}`),
    fecha_nacimiento: yup.string(),
    direccion       : yup.string(),
    region          : yup.string(),
    provincia       : yup.string(),
    comuna          : yup.string().required(`${msg}`),
    telefono        : yup.string().required(`${msg}`),
    correo          : yup.string(),
    establecimient : yup.string().required(`${msg}`),
  });
// Schema CLIENTES
export const validationClientesSchema = (isEditting?:boolean) =>
  yup.object().shape({
    rut             : yup.string().required(`${msg}`),
    nombre          : yup.string().required(`${msg}`),
    tipo            : yup.string().required(`${msg}`),
    sexo            : yup.string().required(`${msg}`),
    fecha_nacimiento: yup.string(),
    direccion       : yup.string(),
    region          : yup.string(),
    provincia       : yup.string(),
    comuna          : isEditting ? yup.string() : yup.string().required(`${msg}`),
    telefono        : yup.string().required(`${msg}`),
    correo          : yup.string(),
    establecimiento : yup.string().required(`${msg}`),
  });

// Schema ESTABLECIMIENTOS
export const validationEstablecimientosSchema = (isEditting:boolean) =>
  yup.object().shape({
    codigo   : yup.string(),
    nombre   : yup.string().required(`${msg}`),
    mandante : yup.string().required(`${msg}`),
    tipo     : yup.string().required(`${msg}`),
    region   : yup.string(),
    provincia: yup.string(),
    comuna   : isEditting ? yup.string() : yup.string().required(`${msg}`),
  });

// Schema PUNTOS DE VENTA
export const validationPuntosVentaSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    tipo       : yup.string().required(`${msg}`),
    direccion  : yup.string(),
    telefono   : yup.string(),
    almacen    : yup.string().required(`${msg}`),
    encargado  : yup.string().required(`${msg}`),
  });
// Schema SITUACIONES
export const validationSituacionesSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    area       : yup.string().default('0'),
  });

/*************** B O D E G A ***************/
// Schema ARMAZONES
export const validationArmazonesSchema = () =>
  yup.object().shape({
    codigo      : yup.string().required(`${msg}`),
    tipo        : yup.string().required(`${msg}`),
    material    : yup.string().required(`${msg}`),
    marca       : yup.string().required(`${msg}`),
    modelo      : yup.string().required(`${msg}`),
    color       : yup.string().required(`${msg}`),
    aro         : yup.string().required(`${msg}`),
    puente      : yup.string().required(`${msg}`),
    diagonal    : yup.string().required(`${msg}`),
    brazo       : yup.string().required(`${msg}`),
    uso         : yup.string().required(`${msg}`),
    stock_minimo: yup.string().required(`${msg}`),
  });

// Schema ACCESORIOS
export const validationAccesoriosSchema = () =>
  yup.object().shape({
    codigo          : yup.string().required(`${msg}`),
    descripcion     : yup.string().required(`${msg}`),
    marca           : yup.string().required(`${msg}`),
    precio_neto     : yup.string(),
    stock_minimo    : yup.string().required(`${msg}`),
    stock_reservado : yup.string(),
    stock_disponible: yup.string(),
  });

// Schema CRISTALES
export const validationCristalesSchema = () =>
  yup.object().shape({
    codigo      : yup.string().required(`${msg}`),
    marca       : yup.string().required(`${msg}`),
    diseno      : yup.string().required(`${msg}`),
    indice      : yup.string().required(`${msg}`),
    material    : yup.string().required(`${msg}`),
    color       : yup.string().required(`${msg}`),
    tratamiento : yup.string().required(`${msg}`),
    diametro    : yup.string().required(`${msg}`),
    esferico    : yup.string().required(`${msg}`),
    cilindrico  : yup.string().required(`${msg}`),
    stock_minimo: yup.string().required(`${msg}`),
  });

// Schema INGRESO INSUMOS KARDEX (CRISTALES-ARMAZONES-ACCESORIOS)
export const validationKardexINSchema = () =>
  yup.object().shape({
    insumo             : yup.string().required(`${msg}`),
    descripcion        : yup.string(),
    fecha              : yup.string().required(`${msg}`),
    almacen            : yup.string().required(`${msg}`),
    motivo_ingreso     : yup.string().required(`${msg}`),
    cantidad           : yup.string().required(`${msg}`),
    observaciones      : yup.string(),
    usuario            : yup.string(),
    fecha_mov          : yup.string(),

    valor_neto         : yup.string().default("0").test({
                          test: function(value) {
                          // Obtén el valor de 'motivo_ingreso' desde el contexto
                          const motivoIngreso = this.resolve(yup.ref('motivo_ingreso'));
                          
                          // Realiza la lógica de validación basada en 'motivo_ingreso' y 'valor_neto'
                          if (motivoIngreso === '2' && !value) {
                            return this.createError({ message:  `${msg}` });
                          }
                          
                          return true;
                        }}),


    proveedor          : yup.string().default("0").test({
                        test: function(value) {
                          // Obtén el valor de 'motivo_ingreso' desde el contexto
                          const motivoIngreso = this.resolve(yup.ref('motivo_ingreso'));
                          
                          // Realiza la lógica de validación basada en 'motivo_ingreso' y 'proveedor'
                          if (motivoIngreso === '2' && !value) {
                            return this.createError({ message: `${msg}` });
                          }
                          
                          return true;
                        }}),


    numero_factura      : yup.string().test({
                          test: function(value) {
                            const motivoIngreso = this.resolve(yup.ref('motivo_ingreso'));
                            
                            if (motivoIngreso === '2' && !value) {
                              return this.createError({ message: `${msg}` });
                            }
                            
                            return true;
                          },
  })});

// Schema EGRESO INSUMOS KARDEX (CRISTALES-ARMAZONES-ACCESORIOS)
export const validationKardexOUTSchema = () =>
  yup.object().shape({
    insumo               : yup.string().required(`${msg}`),
    descripcion          : yup.string(),
    fecha                : yup.string().required(`${msg}`),
    almacen              : yup.string().required(`${msg}`),
    motivo_egreso        : yup.string().required(`${msg}`),
    cantidad             : yup.string().required(`${msg}`),
    observaciones        : yup.string(),
    usuario              : yup.string(),
    fecha_mov            : yup.string(),
    almacen_relacionado  : yup.string().test({
                            test: function(value) {
                              const motivoEgreso = this.resolve(yup.ref('motivo_egreso'));
                              // console.log(motivoEgreso)
                              
                              if (motivoEgreso === '2' && !value) {
                                return this.createError({ message: `${msg}` });
                              }
                              
                              return true;
                            },
  })});

// Schema ALMACENES
export const validationAlmacenesSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    tipo       : yup.string().required(`${msg}`),
  });

// Schema MARCAS
export const validationMarcasSchema = () =>
  yup.object().shape({
    nombre   : yup.string().required(`${msg}`),
    proveedor: yup.string().required(`${msg}`),
  });
// Schema PROVEEDORES
export const validationProveedoresSchema = () =>
  yup.object().shape({
    rut      : yup.string(),
    nombre   : yup.string().required(`${msg}`),
    direccion: yup.string(),
    telefono : yup.string(),
    correo   : yup.string().email(),
    sitio_web: yup.string(),
  });

/*************** P R O Y E C T O S ***************/
// Schema MANDANTES
export const validationMandantesSchema = () =>
  yup.object().shape({
    codigo   : yup.string().required(`${msg}`),
    rut      : yup.string().required(`${msg}`),
    nombre   : yup.string().required(`${msg}`),
    region   : yup.string(),
    provincia: yup.string(),
    comuna   : yup.string().required(`${msg}`),
  });

// Schema PROYECTOS
export const validationProyectosSchema = () =>
  yup.object().shape({
    codigo_proyecto       : yup.string().required(`${msg}`),
    codigo_licitacion     : yup.string(),
    titulo_proyecto       : yup.string().required(`${msg}`),
    estado                : yup.string().required(`${msg}`),
    empresa_adjudicada    : yup.string().required(`${msg}`),
    mandante              : yup.string().required(`${msg}`),
    unidad_compra         : yup.string(),
    fecha_adjudicacion    : yup.string(),
    fecha_inicio          : yup.string().required(`${msg}`),
    fecha_termino         : yup.string().required(`${msg}`),
    cantidad_requerida    : yup.string().default("0"),

    cantidad_atendida     : yup.string().nullable().default("0"),
    cantidad_disponible   : yup.string().nullable().default("0"),
    total_facturado       : yup.string().nullable(),
    saldo_disponible      : yup.string().nullable(),
    avance                : yup.string().nullable(),

    presupuesto           : yup.string().default("0"),
    dias_entrega          : yup.string().required(`${msg}`),
    ejecutivo_proyecto    : yup.string().required(`${msg}`),

    administrador_nombre  : yup.string(),
    administrador_telefono: yup.string(),
    administrador_correo  : yup.string(),
    contabilidad_nombre   : yup.string(),
    contabilidad_telefono : yup.string(),
    contabilidad_correo   : yup.string(),
    referente_nombre      : yup.string(),
    referente_telefono    : yup.string(),
    referente_correo      : yup.string(),
    finanzas_nombre       : yup.string(),
    finanzas_telefono     : yup.string(),
    finanzas_correo       : yup.string(),

    oftalmologo           : yup.string().default("0"),
    observaciones         : yup.string(),
  });
 
// Schema PROYECTOS ARMAZONES
export const validationParametrizacionArmazones = () =>
  yup.object().shape({
    proyecto      : yup.string().required(`${msg}`),
    codigo_armazon: yup.string().required(`${msg}`),
    estado        : yup.string().required(`${msg}`),
});

// Schema PROYECTOS CRISTALES
export const validationProyectoCristalesSchema = () =>
  yup.object().shape({
    proyecto          : yup.string().required(`${msg}`), 
    cod_grupo         : yup.string().required(`${msg}`), 
    descripcion       : yup.string().required(`${msg}`), 
    marca             : yup.string().required(`${msg}`),
    diseno            : yup.string().required(`${msg}`),
    indice            : yup.string().required(`${msg}`),
    material          : yup.string().required(`${msg}`),
    color             : yup.string().required(`${msg}`),
    tratamiento       : yup.string().required(`${msg}`),
    esferico_desde    : yup.string().required(`${msg}`), 
    cilindrico_desde  : yup.string().required(`${msg}`), 
    esferico_hasta    : yup.string().required(`${msg}`), 
    cilindrico_hasta  : yup.string().required(`${msg}`), 
    diametro          : yup.string().required(`${msg}`), 
    precio_venta_neto : yup.string(), 
    observaciones     : yup.string(), 
  });
  
// Schema PROYECTOS ACCESORIOS
export const validationParametrizacionAccesorios = () =>
  yup.object().shape({
    proyecto        : yup.string().required(`${msg}`),
    codigo_accesorio: yup.string().required(`${msg}`),
    estado          : yup.string().required(`${msg}`),
});

// Schema PROYECTOS DIRECCIONES 
export const validationProyectoDireccionesSchema = () =>
  yup.object().shape({
    proyecto        : yup.string().required(`${msg}`), 
    titulo          : yup.string(), 
    establecimiento : yup.string().required(`${msg}`),
    lugar           : yup.string().required(`${msg}`),
    direccion       : yup.string(), 
    telefono        : yup.string(),
    observaciones   : yup.string(), 
  });

// Schema REPORTE ATENCION
export const validationReporteAtencionSchema = () =>
  yup.object().shape({
    proyecto             : yup.string().required(`${msg}`), 
    titulo               : yup.string(), 
    licitacion           : yup.string(), 
    folio_reporte        : yup.string().required(`${msg}`), 
    fecha_desde          : yup.string().required(`${msg}`), 
    fecha_hasta          : yup.string().required(`${msg}`), 
    cantidad_lentes      : yup.string(), 
    total_atenciones     : yup.string(),
    orden_compra_mandante: yup.string(), 
    fecha_vb             : yup.string(), 
    factura              : yup.string(), 
    fecha_factura        : yup.string(), 
    total_factura        : yup.string(), 
    nota_credito         : yup.string(), 
    fecha_ncredito       : yup.string(), 
    total_ncredito       : yup.string(), 
    nota_debito          : yup.string(), 
    fecha_ndebito        : yup.string(), 
    total_ndebito        : yup.string(), 
    guia_despacho        : yup.string(), 
    fecha_guia_despacho  : yup.string(), 
    observaciones        : yup.string(), 
  });

// Schema REPORTE FIRMAS
export const validationReporteFirmasSchema = () =>
  yup.object().shape({
    proyecto     : yup.string().required(`${msg}`), 
    titulo       : yup.string(), 
    licitacion   : yup.string(), 
    folio_reporte: yup.string().required(`${msg}`), 
    fecha_desde  : yup.string().required(`${msg}`), 
    fecha_hasta  : yup.string().required(`${msg}`), 
    observaciones: yup.string(), 
  });

  // Schema OFTALMÓLOGOS
export const validationOftalmologosSchema = () =>
  yup.object().shape({
    rut           : yup.string().required(`${msg}`),
    nombre        : yup.string().required(`${msg}`),
    telefono      : yup.string(),
    correo        : yup.string(),
    valor_consulta: yup.string().required(`${msg}`),
  });

/*************** S I S T E M A ***************/
// Schema CARGOS
export const validationCargosSchema = () =>
  yup.object().shape({
    nombre: yup.string().required(`${msg}`),
  });

// Schema FUNCIONALIDADES
export const validationFuncionalidadSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
  });

// Schema USUSARIOS
export const validationUsusariosSchema = () =>
  yup.object().shape({
    nombre  : yup.string().required(`${msg}`),
    cargo   : yup.string().required(`${msg}`),
    telefono: yup.string(),
    correo  : yup.string().required(`${msg}`),
    estado  : yup.string().required(`${msg}`),
  });

export const validationProfileUserSchema = () =>
  yup.object().shape({
    nombre               : yup.string().required(`${msg}`),
    correo               : yup.string().required(`${msg}`),
    telefono             : yup.string().required(`${msg}`),
    password             : yup.string().required(`${msg}`),
    newPassword          : yup.string().required(`${msg}`),
    confirmNewPassword   : yup.string().required(`${msg}`),
  });

//Schema PERFILES DE CARGOS
export const validationPerfilesSchema = () =>
  yup.object().shape({
    cargo        : yup.string().required(`${msg}`),
    funcionalidad: yup.string().required(`${msg}`),
    permiso      : yup.string().required(`${msg}`),
  }); 

//Schema PERMISOS DE USUARIO
export const validationPermisosSchema = () =>
  yup.object().shape({
    usuario      : yup.string().required(`${msg}`),
    funcionalidad: yup.string().required(`${msg}`),
    permiso      : yup.string().required(`${msg}`),
  });

//Schema PERMISOS DE OT
export const validationOTPermisosSchema = () =>
  yup.object().shape({
    usuario      : yup.string().required(`${msg}`),
    permiso      : yup.string().required(`${msg}`),
  });

  export const validationPermisosAreasSchema = () =>
  yup.object().shape({
    usuario      : yup.string().required(`${msg}`),
    area         : yup.string().required(`${msg}`),
    permiso      : yup.string().required(`${msg}`),
  });

// Schema EMPRESAS
export const validationEmpresasSchema = () =>
  yup.object().shape({
    rut         : yup.string().default(''),
    nombre      : yup.string().required(`${msg}`),
    razon_social: yup.string().required(`${msg}`),
    giro        : yup.string().required(`${msg}`),
    direccion   : yup.string().default(''),
    telefono    : yup.string().default(''),
    correo      : yup.string().email().default(''),
    sitio_web   : yup.string().default(''),
    nombre_logo : yup.string().default(''),
  });

/*************** L O G I N ***************/
export const validationResetPasswordSchema = () =>
  yup.object().shape({
    password: yup.string().required(`${msg}`),
    confirmPassword: yup.string().required(`${msg}`),
  });

export const validationForgotPasswordSchema = () =>
  yup.object().shape({
    correo: yup.string().required(`${msg}`),
  });

// Schema LOGIN
export const validationLoginSchema = () =>
  yup.object().shape({
    _p1: yup.string().required(`${msg}`), //NickName
    _p3: yup.string().required(`${msg}`), //Password
  });
