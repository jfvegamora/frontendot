import * as yup from "yup";

const msg = "Requerido";

// Schema USUSARIO
export const validationUserSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    // password: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cargo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.string(),
    correo: !isEditting
      ? yup.string().email().required(`${msg}`)
      : yup.string(),
    estado: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    // password2: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

export const validationResetPasswordSchema = () =>
  yup.object().shape({
    password: yup.string().required(`${msg}`),
    confirmPassword: yup.string().required(`${msg}`),
  });

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

//Schema PERFILES DE CARGOS
export const validationPerfilesSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    cargo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    funcionalidad: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    permiso: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
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

// Schema LOGIN
export const validationLoginSchema = () =>
  yup.object().shape({
    _p1: yup.string().required(`${msg}`), //NickName
    _p3: yup.string().required(`${msg}`), //Password
  });
