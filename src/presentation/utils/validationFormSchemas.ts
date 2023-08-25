import * as yup from "yup";

const msg = "Requerido";

export const validationUserSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    password: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    cargo: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    telefono: yup.number(),
    correo: yup.string().email(),
    estado: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
    password2: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

export const validationCargosSchema = (isEditting: boolean | undefined) =>
  yup.object().shape({
    nombre: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });

export const validationFuncionalidadSchema = (
  isEditting: boolean | undefined
) =>
  yup.object().shape({
    funcionalidad: !isEditting ? yup.string().required(`${msg}`) : yup.string(),
  });
