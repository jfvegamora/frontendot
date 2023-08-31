import * as yup from "yup";

const msg = "Requerido";

// Schema USER
export const validationUserSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    // password: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cargo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.number(),
    correo: yup.string().email(),
    estado: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    // password2: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
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

// Schema LOGIN
export const validationLoginSchema = () =>
  yup.object().shape({
    _p1: yup.string().required(`${msg}`), //NickName
    _p3: yup.string().required(`${msg}`), //Password
  });
