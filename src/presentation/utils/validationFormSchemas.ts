import * as yup from "yup";

const msg = "Requerido";

/*************** O T ***************/
// Schema CLIENTES
export const validationClientesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut             : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    nombre          : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tipo            : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    sexo            : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    fecha_nacimiento: yup.string(),
    direccion       : yup.string(),
    region          : yup.string(),
    provincia       : yup.string(),
    comuna          : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono        : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    correo          : yup.string(),
    establecimiento : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

  // Schema ESTABLECIMIENTOS
export const validationEstablecimientosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre   : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    mandante : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    region   : yup.string(),
    provincia: yup.string(),
    comuna   : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema PUNTOS DE VENTA
export const validationPuntosVentaSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    descripcion: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tipo       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    direccion  : yup.string(),
    almacen    : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    encargado  : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono   : yup.string(),
  });

/*************** B O D E G A ***************/
// Schema ACCESORIOS
export const validationAccesoriosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    codigo      : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    descripcion : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    proveedor   : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    precio_neto : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    stock_minimo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
  });

// Schema CRISTALES
export const validationCristalesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    codigo      : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    marca       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    diseno      : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    indice      : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    material    : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    color       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tratamiento : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    diametro    : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    esferico    : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    cilindrico  : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    stock_minimo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
  });

  // Schema CRISTALES KARDEX
  export const validationCristalesKardexINSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    cristal             : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    fecha               : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    descripcion         :  yup.string(),
    almacen             : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    es                  : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    motivo              : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    entradas            : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    salidas             : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    numero_factura      :  yup.number(),
    proveedor           :  yup.string(),
    valor_neto          :  yup.number(),
    ot                  :  yup.number(),
    almacen_relacionado : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    observaciones       :  yup.string(),
  });
  // export const validationCristalesKardexSchema = (isEditting: boolean | undefined) =>
// yup.object().shape({
//   cristal             : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
//   fecha               : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
//   descripcion         :  yup.string(),
//   almacen             : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
//   es                  : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
//   motivo              : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
//   entradas            : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
//   salidas             : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
//   numero_factura      :  yup.number(),
//   proveedor           :  yup.string(),
//   valor_neto          :  yup.number(),
//   ot                  :  yup.number(),
//   almacen_relacionado : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
//   observaciones       :  yup.string(),
// });

// Schema ARMAZONES
export const validationArmazonesSchema = (isEditting: boolean | undefined) =>
  // "codigo","armazon_tipo_id","amazon_tipo","marca_id","marca","modelo","color", "armazon_material_id",
  // "armazon_material", "aro", "puente", "diagonal", "brazo", "armazon_uso_id", "armazon_uso", "stock_minimo",
  yup.object().shape({
    codigo      : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    tipo        : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    material    : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    marca       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    modelo      : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    color       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    aro         : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    puente      : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    diagonal    : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    brazo       : !isEditting ? yup.number().required(`${msg}`) : yup.number(),
    uso         : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    stock_minimo: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
  });

// Schema ALMACENES
export const validationAlmacenesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    descripcion : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    tipo        : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema MARCAS
export const validationMarcasSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    proveedor    : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });
// Schema PROVEEDORES
export const validationProveedoresSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut       : yup.string(),
    nombre    : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    direccion : yup.string(),
    telefono  : yup.string(),
    correo    : yup.string().email(),
    sitio_web : yup.string(),
  });

/*************** P R O Y E C T O S ***************/
// Schema MANDANTES
export const validationMandantesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    codigo   : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    rut      : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    nombre   : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    region   : yup.string(),
    provincia: yup.string(),
    comuna   : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema OFTALMÓLOGOS
export const validationOftalmologosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut           : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    nombre        : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono      : yup.string(),
    correo        : yup.string(),
    valor_consulta: !isEditting ? yup.number().required(`${msg}`) : yup.number(),
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
    nombre  : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cargo   : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.string(),
    correo  : !isEditting
              ? yup.string().email().required(`${msg}`)
              : yup.string(),
    estado  : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

export const validationProfileUserSchema = () => 
  yup.object().shape({
    nombre: yup.string().required(`${msg}`),
    correo: yup.string().required(`${msg}`),
    telefono: yup.string().required(`${msg}`),
    password: yup.string().required(`${msg}`),
    newPassword: yup.string().required(`${msg}`),
    confirmNewPassword: yup.string().required(`${msg}`),
  })

//Schema PERFILES DE CARGOS
export const validationPerfilesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    cargo         : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    funcionalidad : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    permiso       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

//Schema PERMISOS DE USUARIO
export const validationPermisosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    usuario       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    funcionalidad : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    permiso       : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

// Schema EMPRESAS
export const validationEmpresasSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    rut         : yup.string(),
    nombre      : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    razon_social: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    giro        : !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    direccion   : yup.string(),
    telefono    : yup.string(),
    correo      : yup.string().email(),
    sitio_web   : yup.string(),
    nombre_logo : yup.string(),
  });

/*************** L O G I N ***************/
export const validationResetPasswordSchema = () =>
  yup.object().shape({
    password        : yup.string().required(`${msg}`),
    confirmPassword : yup.string().required(`${msg}`),
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
