// Para la tabla Cargos
export const table_head_cargos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "ID",
    key: "id",
    visible: false,
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
  },
  {
    cell: "Opciones",
    key: "opciones",
    visible: true,
  },
];

// Para la tabla Perfiles
export const table_head_perfiles = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "Cargo",
    key: "cargo",
    visible: true,
  },
  {
    cell: "Funcionalidad",
    key: "funcionalidad",
    visible: true,
  },
  {
    cell: "Permiso",
    key: "permiso",
    visible: true,
  },
];

// Para la tabla Usuarios
export const table_head_usuarios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "ID",
    key: "id",
    visible: false,
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
  },
  {
    cell: "Correo",
    key: "correo",
    visible: true,
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
  },
  {
    cell: "Cargo_id",
    key: "cargo_id",
    visible: false,
  },
  {
    cell: "Cargo",
    key: "cargo_descripcion",
    visible: true,
  },
  {
    cell: "Opciones",
    key: "opciones",
    visible: true,
  },
];

// Para la tabla Permisos
export const table_head_permisos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: true,
  },
  {
    cell: "Funcionalidad",
    key: "funcionalidad",
    visible: true,
  },
  {
    cell: "Permiso",
    key: "permiso",
    visible: true,
  },
];
