import * as yup from "yup";

const msg = "Requerido";

/*************** O T ***************/
// Schema CLIENTES
export const validationClientesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tipo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    sexo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    fecha_nacimiento: yup.string(),
    direccion: yup.string(),
    region: yup.string(),
    provincia: yup.string(),
    comuna: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    correo: yup.string(),
    establecimiento: !isEditting
      ? yup.string().required(`${msg}`)
      : yup.string(),
  });

// Schema ESTABLECIMIENTOS
export const validationEstablecimientosSchema = (
  isEditting: boolean | undefined
) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    mandante: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    region: yup.string(),
    provincia: yup.string(),
    comuna: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema PUNTOS DE VENTA
export const validationPuntosVentaSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    descripcion: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tipo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    direccion: yup.string(),
    almacen: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    encargado: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.string(),
  });

/*************** B O D E G A ***************/
// Schema ACCESORIOS
export const validationAccesoriosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    codigo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    descripcion: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    marca: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    precio_neto: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    stock_minimo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
  });

// Schema CRISTALES
export const validationCristalesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    codigo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    marca: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    diseno: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    indice: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    material: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    color: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tratamiento: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    diametro: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    esferico: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    cilindrico: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    stock_minimo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
  });

// Schema INGRESO INSUMOS KARDEX (CRISTALES-ARMAZONES-ACCESORIOS)
export const validationKardexINSchema = (
  isEditting: boolean | undefined
) =>
  yup.object().shape({
    insumo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    descripcion: yup.string(),
    fecha: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    // es: yup.number(),
    motivo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cantidad: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    almacen: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    numero_factura: yup.number(),
    proveedor: yup.string(),
    valor_neto: yup.number(),
    // ot: yup.number(),
    // almacen_relacionado: !isEditting  ? yup.string().required(`${msg}`) : yup.string(),
    observaciones: yup.string(),
    usuario: yup.number(),
    fecha_mov: yup.string(),
  });

// Schema EGRESO INSUMOS KARDEX (CRISTALES-ARMAZONES-ACCESORIOS)
export const validationKardexOUTSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    insumo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    // descripcion: yup.string(),
    fecha: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    // es: yup.number(),
    motivo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cantidad: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    almacen: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    // numero_factura: yup.number(),
    // proveedor: yup.string(),
    // valor_neto: yup.number(),
    // ot: yup.number(),
    almacen_relacionado: !isEditting  ? yup.string().required(`${msg}`) : yup.string(),
    observaciones: yup.string(),
    usuario: yup.number(),
    fecha_mov: yup.string(),
  });

// Schema ARMAZONES
export const validationArmazonesSchema = (isEditting: boolean | undefined) =>
  // "codigo","armazon_tipo_id","amazon_tipo","marca_id","marca","modelo","color", "armazon_material_id",
  // "armazon_material", "aro", "puente", "diagonal", "brazo", "armazon_uso_id", "armazon_uso", "stock_minimo",
  yup.object().shape({
    codigo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    tipo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    material: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    marca: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    modelo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    color: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    aro: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    puente: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    diagonal: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    brazo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    uso: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    stock_minimo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
  });

// Schema ALMACENES
export const validationAlmacenesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    descripcion: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tipo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema MARCAS
export const validationMarcasSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    proveedor: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });
// Schema PROVEEDORES
export const validationProveedoresSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut: yup.string(),
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    direccion: yup.string(),
    telefono: yup.string(),
    correo: yup.string().email(),
    sitio_web: yup.string(),
  });

/*************** P R O Y E C T O S ***************/
// Schema MANDANTES
export const validationMandantesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    codigo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    rut: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    region: yup.string(),
    provincia: yup.string(),
    comuna: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema PROYECTOS GRUPOS
export const validationProyectoGruposSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    proyecto          : yup.string().required(`${msg}`), 
    cristal           : !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    data_cristal      : yup.string(), 
    cod_grupo         : yup.string().required(`${msg}`), 
    descripcion       : yup.string().required(`${msg}`), 
    esferico_desde    : yup.string().required(`${msg}`), 
    cilindrico_desde  : yup.string().required(`${msg}`), 
    esferico_hasta    : yup.string().required(`${msg}`), 
    cilindrico_hasta  : yup.string().required(`${msg}`), 
    precio_venta_neto : yup.string(), 
    observaciones     : yup.string(), 
  });
  
// Schema PROYECTOS DIRECCIONES
export const validationProyectoDireccionesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    proyecto: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    titulo: yup.string(), 
    establecimiento: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    lugar: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    direccion: yup.string(), 
    telefono: yup.string(),
    observaciones: yup.string(), 
  });

// Schema REPORTE ATENCION
export const validationReporteAtencionSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    proyecto: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    titulo: yup.string(), 
    licitacion: yup.string(), 
    folio_reporte: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    fecha_desde: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    fecha_hasta: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    cantidad_lentes: yup.number(), 
    total_atenciones: yup.number(),
    orden_compra_mandante: yup.string(), 
    fecha_vb: yup.string(), 
    factura: yup.number(), 
    fecha_factura: yup.string(), 
    total_factura: yup.number(), 
    nota_credito: yup.number(), 
    fecha_ncredito: yup.string(), 
    total_ncredito: yup.number(), 
    nota_debito: yup.number(), 
    fecha_ndebito: yup.string(), 
    total_ndebito: yup.number(), 
    guia_despacho: yup.number(), 
    fecha_guia_despacho: yup.string(), 
    observaciones: yup.string(), 
  });

// Schema REPORTE FIRMAS
export const validationReporteFirmasSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    proyecto: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    titulo: yup.string(), 
    licitacion: yup.string(), 
    folio_reporte: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    fecha_desde: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    fecha_hasta: !isEditting ? yup.string().required(`${msg}`) : yup.string(), 
    observaciones: yup.string(), 
  });

  // Schema OFTALMÓLOGOS
export const validationOftalmologosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.string(),
    correo: yup.string(),
    valor_consulta: !isEditting
      ? yup.number().required(`${msg}`)
      : yup.number(),
  });

/*************** S I S T E M A ***************/
// Schema CARGOS
export const validationCargosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema FUNCIONALIDADES
export const validationFuncionalidadSchema = (
  isEditting: boolean | undefined
) =>
  yup.object().shape({
    descripcion: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema USUSARIOS
export const validationUsusariosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cargo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.string(),
    correo: !isEditting
      ? yup.string().email().required(`${msg}`)
      : yup.string(),
    estado: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

export const validationProfileUserSchema = () =>
  yup.object().shape({
    nombre: yup.string().required(`${msg}`),
    correo: yup.string().required(`${msg}`),
    telefono: yup.string().required(`${msg}`),
    password: yup.string().required(`${msg}`),
    newPassword: yup.string().required(`${msg}`),
    confirmNewPassword: yup.string().required(`${msg}`),
  });

//Schema PERFILES DE CARGOS
export const validationPerfilesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    cargo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    funcionalidad: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    permiso: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

//Schema PERMISOS DE USUARIO
export const validationPermisosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    usuario: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    funcionalidad: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    permiso: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema EMPRESAS
export const validationEmpresasSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut: yup.string(),
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    razon_social: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    giro: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    direccion: yup.string(),
    telefono: yup.string(),
    correo: yup.string().email(),
    sitio_web: yup.string(),
    nombre_logo: yup.string(),
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
