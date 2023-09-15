/************ MENU OT ************/

export const table_head_clientes = [
  {
    cell   : <input type="checkbox" />,
    key    : "checkbox",
    visible: true,
  },
  {
    cell   : "RUT",
    key    : "rut",
    visible: true,
  },
  {
    cell   : "Nombre",
    key    : "nombre",
    visible: true,
  },
  {
    cell   : "Tipo",
    key    : "tipo",
    visible: true,
  },
  {
    cell   : "Sexo",
    key    : "sexo",
    visible: true,
  },
  {
    cell   : "Fecha Nacimiento",
    key    : "fecha_nacimiento",
    visible: true,
  },
  {
    cell   : "Dirección",
    key    : "direccion",
    visible: true,
  },
  {
    cell   : "REGION_ID",
    key    : "region_id",
    visible: true,
  },
  {
    cell   : "Región",
    key    : "region",
    visible: true,
  },
  {
    cell   : "Provincia ID",
    key    : "provincia_id",
    visible: true,
  },
  {
    cell   : "Provincia",
    key    : "provincia",
    visible: true,
  },
  {
    cell   : "Comuna ID",
    key    : "comuna_id",
    visible: true,
  },
  {
    cell   : "Comuna",
    key    : "comuna",
    visible: true,
  },
  {
    cell   : "Teléfono",
    key    : "telefono",
    visible: true,
  },
  {
    cell   : "Correo",
    key    : "correo",
    visible: true,
  },
  {
    cell   : "Establecimiento ID",
    key    : "establecimiento_id",
    visible: true,
  },
  {
    cell   : "Establecimiento",
    key    : "establecimiento",
    visible: true,
  },
  {
    cell   : "",
    key    : "opciones",
    visible: true,
  },
];
                    
export const table_head_establecimientos = [
  {
    cell   : <input type="checkbox" />,
    key    : "checkbox",
    visible: true,
  },
  {
    cell   : "ID",
    key    : "id",
    visible: false,
  },
  {
    cell   : "Nombre",
    key    : "nombre",
    visible: true,
  },
  {
    cell   : "Mandante ID",
    key    : "mandante_id",
    visible: false,
  },
  {
    cell   : "Mandante",
    key    : "mandante",
    visible: true,
  },
  {
    cell   : "Región ID",
    key    : "region_id",
    visible: false,
  },
  {
    cell   : "Región",
    key    : "region",
    visible: true,
  },
  {
    cell   : "Provincia ID",
    key    : "provincia_id",
    visible: false,
  },
  {
    cell   : "Provincia",
    key    : "provincia",
    visible: true,
  },
  {
    cell   : "Comuna ID",
    key    : "comuna_id",
    visible: false,
  },
  {
    cell   : "Comuna",
    key    : "comuna",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_puntos_venta = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "Id",
    key: "Id",
    visible: false,
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: true,
  },
  {
    cell: "Tipo Id",
    key: "tipo_id",
    visible: false,
  },
  {
    cell: "Tipo",
    key: "tipo",
    visible: true,
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
  },
  {
    cell: "Encargado Id",
    key: "encargado_id",
    visible: false,
  },
  {
    cell: "Encargado",
    key: "encargado",
    visible: true,
  },
  {
    cell: "Almacén Id",
    key: "almacen_id",
    visible: false,
  },
  {
    cell: "Almacén",
    key: "almacen",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

/************ MENU BODEGA ************/
export const table_head_accesorios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "Código",
    key: "codigo",
    visible: true,
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: true,
  },
  {
    cell: "Proveedor Id",
    key: "proveedor_id",
    visible: true,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
  },
  {
    cell: "Precio Neto",
    key: "precio_neto",
    visible: true,
  },
  {
    cell: "Stock Mínimo",
    key: "stock_minimo",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_armazones = [
  {
    cell   : <input type="checkbox" />,
    key    : "checkbox",
    visible: true,
  },
  {
    cell   : "Código",
    key    : "codigo",
    visible: true,
  },
  {
    cell   : "Armazon Tipo ID",
    key    : "armazon_tipo_id",
    visible: false,
  },
  {
    cell   : "Tipo",
    key    : "amazon_tipo",
    visible: true,
  },
  {
    cell   : "Marca ID",
    key    : "marca_id",
    visible: false,
  },
  {
    cell   : "Marca",
    key    : "marca",
    visible: true,
  },
  {
    cell   : "Modelo",
    key    : "modelo",
    visible: true,
  },
  {
    cell   : "Color",
    key    : "color",
    visible: true,
  },
  {
    cell   : "Armazon Material ID",
    key    : "armazon_material_id",
    visible: false,
  },
  {
    cell   : "Armazon Material",
    key    : "armazon_material",
    visible: true,
  },
  {
    cell   : "Aro",
    key    : "aro",
    visible: true,
  },
  {
    cell   : "Puente",
    key    : "puente",
    visible: true,
  },
  {
    cell   : "Diagonal",
    key    : "diagonal",
    visible: true,
  },
  {
    cell   : "Brazo",
    key    : "brazo",
    visible: true,
  },
  {
    cell   : "Armazon Uso ID",
    key    : "armazon_uso_id",
    visible: false,
  },
  {
    cell   : "Armazon Uso",
    key    : "armazon_uso",
    visible: true,
  },
  {
    cell   : "Stock Mínimo",
    key    : "stock_minimo",
    visible: true,
  },
  {
    cell   : "",
    key    : "opciones",
    visible: true,
  },
];

export const table_head_cristales = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "Código",
    key: "codigo",
    visible: true,
  },
  {
    cell: "Marca ID",
    key: "marca_id",
    visible: false,
  },
  {
    cell: "Marca",
    key: "marca",
    visible: true,
  },
  {
    cell: "Proveedor ID",
    key: "proveedor_id",
    visible: false,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
  },
  {
    cell: "Diseño ID",
    key: "diseno_id",
    visible: false,
  },
  {
    cell: "Diseño",
    key: "diseno",
    visible: true,
  },
  {
    cell: "Índice ID",
    key: "indice_id",
    visible: false,
  },
  {
    cell: "Índice",
    key: "indice",
    visible: true,
  },
  {
    cell: "Material ID",
    key: "material_id",
    visible: false,
  },
  {
    cell: "Material",
    key: "material",
    visible: true,
  },
  {
    cell: "Color ID",
    key: "color_id",
    visible: false,
  },
  {
    cell: "Color",
    key: "color",
    visible: true,
  },
  {
    cell: "Tratamiento ID",
    key: "tratamiento_id",
    visible: false,
  },
  {
    cell: "Tratamiento",
    key: "tratamiento",
    visible: true,
  },
  {
    cell: "Diámetro",
    key: "diametro",
    visible: true,
  },
  {
    cell: "ESF",
    key: "esferico",
    visible: true,
  },
  {
    cell: "CIL",
    key: "cilindrico",
    visible: true,
  },
  {
    cell: "Stock Mínimo",
    key: "stock_minimo",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_cristaleskardex = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "Fecha",
    key: "fecha",
    visible: true,
  },
  {
    cell: "Cristal",
    key: "cristal",
    visible: true,
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: true,
  },
  {
    cell: "Almacén ID",
    key: "almacen_id",
    visible: false,
  },
  {
    cell: "Almacén",
    key: "almacen",
    visible: true,
  },
  {
    cell: "E/S",
    key: "es",
    visible: true,
  },
  {
    cell: "Motivo ID",
    key: "motivo_id",
    visible: false,
  },
  {
    cell: "Motivo",
    key: "motivo",
    visible: true,
  },
  {
    cell: "Entradas",
    key: "entradas",
    visible: true,
  },
  {
    cell: "Salidas",
    key: "salidas",
    visible: true,
  },
  {
    cell: "Valor Neto",
    key: "valor_neto",
    visible: true,
  },
  {
    cell: "Proveedor ID",
    key: "proveedor_id",
    visible: false,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
  },
  {
    cell: "Factura",
    key: "factura",
    visible: true,
  },
  {
    cell: "OT",
    key: "ot",
    visible: true,
  },
  {
    cell: "Almacen Relacionado ID",
    key: "almacen_relacionado_id",
    visible: false,
  },
  {
    cell: "Almacen Relacionado",
    key: "almacen_relacionado",
    visible: true,
  },
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_almacenes = [
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
    cell: "Descripción",
    key: "descripcion",
    visible: true,
  },
  {
    cell: "Tipo Almacén ID",
    key: "tipo_almacen_id",
    visible: false,
  },
  {
    cell: "Tipo Almacén",
    key: "tipo_almacen",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_marcas = [
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
    cell: "Proveedor ID",
    key: "proveedor_id",
    visible: false,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_proveedores = [
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
    cell: "RUT",
    key: "rut",
    visible: true,
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
  },
  {
    cell: "Dirección",
    key: "direccion",
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
    cell: "Sitio Web",
    key: "sitio_web",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

/************ MENU PROYECTOS ************/
export const table_head_oftalmologos = [
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
    cell: "RUT",
    key: "rut",
    visible: true,
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
    cell: "Valor Consulta",
    key: "valor_consulta",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];
export const table_head_mandantes = [
  {
    cell   : <input type="checkbox" />,
    key    : "checkbox",
    visible: true,
  },
  {
    cell   : "Código",
    key    : "codigo",
    visible: true,
  },
  {
    cell   : "RUT",
    key    : "rut",
    visible: true,
  },
  {
    cell   : "Nombre",
    key    : "nombre",
    visible: true,
  },
  {
    cell   : "Región ID",
    key    : "region_id",
    visible: false,
  },
  {
    cell   : "Región",
    key    : "region",
    visible: true,
  },
  {
    cell   : "Provincia ID",
    key    : "provincia_id",
    visible: false,
  },
  {
    cell   : "Provincia",
    key    : "provincia",
    visible: true,
  },
  {
    cell   : "Comuna ID",
    key    : "comuna_id",
    visible: false,
  },
  {
    cell   : "Comuna",
    key    : "comuna",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];



/************ MENU SISTEMA ************/
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
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_perfiles = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "ID_CARGO",
    key: "id_cargo",
    visible: false,
  },
  {
    cell: "Cargo",
    key: "cargo",
    visible: true,
  },
  {
    cell: "ID_FUNCIONALIDAD",
    key: "id_funcionalidad",
    visible: false,
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
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

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
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_permisos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
  },
  {
    cell: "ID_USUARIO",
    key: "id_usuario",
    visible: false,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: true,
  },
  {
    cell: "ID_FUNCIONALIDAD",
    key: "id_funcionalidad",
    visible: false,
  },
  {
    cell: "Funcionalidad",
    key: "funcionalidad",
    visible: true,
  },
  {
    cell: "PERMISO",
    key: "permiso",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_funcionalidades = [
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
    cell: "",
    key: "opciones",
    visible: true,
  },
];

export const table_head_empresas = [
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
    cell: "RUT",
    key: "rut",
    visible: true,
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
  },
  {
    cell: "Razón Social",
    key: "razon_social",
    visible: true,
  },
  {
    cell: "Giro",
    key: "giro",
    visible: true,
  },
  {
    cell: "Dirección",
    key: "direccion",
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
    cell: "Sitio Web",
    key: "sitio_web",
    visible: true,
  },
  {
    cell: "Logo",
    key: "nombre_logo",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
  },
];

