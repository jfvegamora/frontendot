/************ MENU OT ************/
export const table_head_OT_diaria2 = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[9rem]",
    alignment: "flex justify-center items-center"
  },
  //************ ÓPTICA */
  {
    cell: "Folio",
    key: "folio",
    visible: true,
    alignment: "text-center",
    width: "w-[5rem]",
    background: true
  },
  {
    cell: "Motivo",
    key: "motivo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "Estado ID",
    key: "estado_id",
    visible: false,
    alignment: "text-center",
    width: "w-[8rem]",
    color: true
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
    color: true
  },
  
  {
    cell: "Estado Impresion",
    key: "estado_impresion",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  {
    cell: "Codigo Proyecto",
    key: "codigo_proyecto",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  {
    cell: "Título Proyecto",
    key: "proyecto",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  {
    cell: "Establecimiento",
    key: "establecimiento",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]"
  },
  //************ CLIENTE */
  {
    cell: "RUT Cliente",
    key: "cliente_rut",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Nombre",
    key: "cliente_nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[14rem]"
  },
 //************ RECETA */
  {
    cell: "Fecha Atención",
    key: "fecha_atencion",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]"
  },
  {
    cell: "Tipo Anteojo ID ",
    key: "tipo_anteojo_id",
    visible: false,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Tipo Anteojo ",
    key: "tipo_anteojo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "A1 Armazón Código",
    key: "a1_armazon_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "A2 Armazón Código",
    key: "a2_armazon_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "A3 Armazón Código",
    key: "a3_armazon_codigo",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]"
  },

  {
    cell: "CRISTAL 1 OD Código",
    key: "cr1_od_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CRISTAL 1 OI Código",
    key: "cr1_oi_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },

  // ************** CRISTAL ANTEOJO 2
  {
    cell: "CRISTAL 2 OD Código",
    key: "cr2_od_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CRISTAL 2 OI Código",
    key: "cr2_oi_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "POR VENCER",
    key: "por_vencer",
    visible: false,
    alignment: "text-center",
    width: "w-[10trem]"
  },
  {
    cell: "E V",
    key: "estado_validacion",
    visible: false,
    alignment: "text-center",
    width: "w-[10trem]"
  },
  {
    cell: "N° Envío",
    key: "num_envio",
    visible: true,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "N° Rep. Firma",
    key: "num_rep_firma",
    visible: true,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "N° Rep. Atención",
    key: "num_rep_atencion",
    visible: false,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "N° OC",
    key: "num_oc",
    visible: false,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "N° Guía",
    key: "num_guia",
    visible: true,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "N° Factura",
    key: "num_factura",
    visible: false,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "IMPRIMRI QR",
    key: "imprimir_qr",
    visible: false,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "IMRIMIR TICKET",
    key: "imprimir_tiquet",
    visible: false,
    alignment: "text-left",
    width: "w-[6rem]"
  },
  {
    cell: "USUARIO ID",
    key: "usuario id",
    visible: false,
    alignment: "text-left",
    width: "w-[6rem]"
  }
];
export const table_head_OT_historica = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[9rem]",
    alignment: "flex justify-center items-center"
  },
  //************ ÓPTICA */
  {
    cell: "Folio",
    key: "folio",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "Motivo",
    key: "motivo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "Estado_id",
    key: "estado_id",
    visible: false,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
    color: true
  },
  {
    cell: "Área",
    key: "area",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "Codigo Proyecto",
    key: "codigo_proyecto",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  {
    cell: "N° Envío",
    key: "num_envio",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "N° Rep. Firma",
    key: "num_rep_firma",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "N° Rep. Entrega",
    key: "num_rep_entrega",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "N° OC",
    key: "num_oc",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "N° Guía",
    key: "num_guia",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "N° Factura",
    key: "num_factura",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "Título Proyecto",
    key: "proyecto",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  {
    cell: "Establecimiento",
    key: "establecimiento",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]"
  },
  //************ CLIENTE */
  {
    cell: "RUT Cliente",
    key: "cliente_rut",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Nombre",
    key: "cliente_nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[14rem]"
  },
 //************ RECETA */
  {
    cell: "Fecha Atención",
    key: "fecha_atencion",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]"
  },
  {
    cell: "Tipo Anteojo ",
    key: "tipo_anteojo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  //************ ARMAZONES */
  {
    cell: "A1 Armazón Código",
    key: "a1_armazon_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "A2 Armazón Código",
    key: "a2_armazon_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "A3 Armazón Código",
    key: "a3_armazon_codigo",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]"
  },

  // ************** CRISTAL ANTEOJO 1
  {
    cell: "CRISTAL 1 OD Código",
    key: "cr1_od_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CRISTAL 1 OI Código",
    key: "cr1_oi_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },

  // ************** CRISTAL ANTEOJO 2
  {
    cell: "CRISTAL 2 OD Código",
    key: "cr2_od_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CRISTAL 2 OI Código",
    key: "cr2_oi_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "POR VENCER",
    key: "por_vencer",
    visible: false,
  },
  {
    cell: "ESTADO VALIDACION",
    key: "estado_validacion",
    visible: false,
    alignment: "text-center",
    width: "w-[10trem]"
  },
];
export const table_head_OT_bitacora = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Fecha/Hora",
    key: "date",
    visible: true,
    width: "w-[12rem]"
  },
  {
    cell: "USUARIO ID",
    key: "usuario_id",
    visible: false,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]"
  },
  {
    cell: "ORIGEN_ID",
    key: "origen_id",
    visible: false,
  },
  {
    cell: "Origen",
    key: "origen",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "DESTINO_ID",
    key: "destino_id",
    visible: false,
  },
  {
    cell: "Destino",
    key: "destino",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "ESTADO ID",
    key: "estado_id",
    visible: false,
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "SITUACION ID",
    key: "situacion_id",
    visible: false,
  },
  {
    cell: "Situación",
    key: "situacion",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]"
  },
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[1rem]",
    alignment: "items-center"
  },
];
export const table_head_clientes = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center  items-center"
  },
  {
    cell: "RUT",
    key: "rut",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[24rem]",
  },
  {
    cell: "Tipo",
    key: "tipo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Sexo",
    key: "sexo",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Fecha Nacimiento",
    key: "fecha_nacimiento",
    visible: true,
    alignment: "text-center",
    width: "w-[9rem]",
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "REGION_ID",
    key: "region_id",
    visible: false,
  },
  {
    cell: "Región",
    key: "region",
    visible: false,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Provincia ID",
    key: "provincia_id",
    visible: false,
  },
  {
    cell: "Provincia",
    key: "provincia",
    visible: false,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Comuna ID",
    key: "comuna_id",
    visible: false,
  },
  {
    cell: "Comuna",
    key: "comuna",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-right",
    width: "w-[7rem]",
  },
  {
    cell: "Correo",
    key: "correo",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Establecimiento ID",
    key: "establecimiento_id",
    visible: false,
  },
  {
    cell: "Establecimiento",
    key: "establecimiento",
    visible: true,
    alignment: "text-left",
    width: "w-[20rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];

/************ MENU BODEGA ************/
export const table_head_almacenes = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
    width: "w-[22rem]",
  },
  {
    cell: "Tipo Almacén ID",
    key: "tipo_almacen_id",
    visible: false,
    width: "w-[10rem]",
  },
  {
    cell: "Tipo Almacén",
    key: "tipo_almacen",
    visible: true,
    alignment: "text-left"
  },
  {
    cell: "Categoria_id",
    key: "categoria_id",
    visible: false,
    alignment: "text-left"
  },
  {
    cell: "Categoría",
    key: "categoria",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Usuario_ID",
    key: "usuario_id",
    visible: false,
  },
  {
    cell: "Encargado",
    key: "usuario",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_armazones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código",
    key: "codigo",
    alignment: "text-left",
    visible: true,
    width: "w-[10rem]",
    color: true,
    background:true
  },
  {
    cell: "Uso Interno",
    key: "ubicacion",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Stock Mínimo",
    key: "stock_minimo",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Cantidad Exhibida",
    key: "cantidad_exhibida",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Cantidad Reservada",
    key: "cantidad_reservada",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Disponible",
    key: "stock_disponible",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Total",
    key: "stock_total",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Armazon Tipo ID",
    key: "armazon_tipo_id",
    visible: false,
  },
  {
    cell: "Tipo",
    key: "amazon_tipo",
    visible: true,
    alignment: "text-left",
    width: "w-[7rem]",
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
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Modelo",
    key: "modelo",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Color",
    key: "color",
    visible: true,
    alignment: "text-left",
    width: "w-[7rem]",
  },
  {
    cell: "Armazon Material ID",
    key: "armazon_material_id",
    visible: false,
  },
  {
    cell: "Material",
    key: "armazon_material",
    visible: true,
    alignment: "text-left",
    width: "w-[7rem]",
  },
  {
    cell: "Aro",
    key: "aro",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Puente",
    key: "puente",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Diagonal",
    key: "diagonal",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Brazo",
    key: "brazo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Armazon Uso ID",
    key: "armazon_uso_id",
    visible: false,
  },
  {
    cell: "Uso",
    key: "armazon_uso",
    visible: true,
    alignment: "text-left",
    width: "w-[6rem]",
  },
  {
    cell: "DP Mínima",
    key: "dp_minima",
    alignment: "text-right",
    visible: true,
    width: "w-[6rem]",
  },
  {
    cell: "DP Máxima",
    key: "dp_maxima",
    alignment: "text-right",
    visible: true,
    width: "w-[6rem]",
  },
  {
    cell: "Código FAB",
    key: "codigo_fab",
    alignment: "text-left",
    visible: true,
    width: "w-[6rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_cristales = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código",
    key: "codigo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
    color:true
  },
  {
    cell: "Uso Interno",
    key: "ubicacion",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Stock Mínimo",
    key: "stock_minimo",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Reservado",
    key: "stock_reservado",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Disponible",
    key: "stock_disponible",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
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
    alignment: "text-left",
    width: "w-[7rem]",
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
    alignment: "text-left",
    width: "w-[7rem]",
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
    alignment: "text-left",
    width: "w-[7rem]",
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
    alignment: "text-right",
    width: "w-[9rem]",
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
    alignment: "text-left",
    width: "w-[7rem]",
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
    alignment: "text-left",
    width: "w-[7rem]",
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
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Diámetro",
    key: "diametro",
    visible: true,
    alignment: "text-right",
    width: "w-[5rem]",
  },
  {
    cell: "ESF",
    key: "esferico",
    visible: true,
    alignment: "text-right",
    width: "w-[5rem]",
  },
  {
    cell: "CIL",
    key: "cilindrico",
    visible: true,
    alignment: "text-right",
    width: "w-[5rem]",
  },
  {
    cell: "CODFAB1",
    key: "codigo_fab_1",
    visible: false,
  },
  {
    cell: "CODFAB2",
    key: "codigo_fab_2",
    visible: false,
  },
  {
    cell: "CODFAB3",
    key: "codigo_fab_3",
    visible: false,
  },
  {
    cell: "CODFAB4",
    key: "codigo_fab_4",
    visible: false,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_accesorios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código",
    key: "codigo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
    color:true
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: true,
    alignment: "text-left"
  },
  {
    cell: "Uso Interno",
    key: "ubicacion",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Stock Mínimo",
    key: "stock_minimo",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Reservado",
    key: "stock_reservado",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Disponible",
    key: "stock_disponible",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Marca Id",
    key: "marca_id",
    visible: false,
  },
  {
    cell: "Marca",
    key: "marca",
    visible: true,
    alignment: "text-left"
  },
  {
    cell: "Proveedor Id",
    key: "proveedor_id",
    visible: false,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
    alignment: "text-left"
  },
  {
    cell: "Precio Neto",
    key: "precio_neto",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_marcas = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
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
    alignment: "text-left",
  },
  {
    cell: "Categoria_id",
    key: "categoria_id",
    visible: false,
    alignment: "text-left"
  },
  {
    cell: "Categoría",
    key: "categoria",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_proveedores = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
    alignment: "text-left",
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
    alignment: "text-left",
  },
  {
    cell: "Sitio Web",
    key: "sitio_web",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
/************ BODEGA -> KARDEX ************/
export const table_head_kardex = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Fecha/Hora",
    key: "fecha",
    visible: true,
    width: "w-[12rem]",
  },
  {
    cell: "Código Insumo",
    key: "insumo_id",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: false,
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
    width: "w-[12rem]",
  },
  {
    cell: "E/S",
    key: "es",
    visible: false,
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
    width: "w-[10rem]",
  },
  {
    cell: "Entradas",
    key: "entradas",
    visible: true,
    width: "w-[7rem]",
    alignment: "text-right",
  },
  {
    cell: "Salidas",
    key: "salidas",
    visible: true,
    width: "w-[7rem]",
    alignment: "text-right",
  },
  {
    cell: "Valor Neto",
    key: "valor_neto",
    visible: true,
    width: "w-[7rem]",
    alignment: "text-right",
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
    width: "w-[7rem]",
  },
  {
    cell: "Factura",
    key: "factura",
    visible: true,
    width: "w-[7rem]",
    alignment: "text-center",
  },
  {
    cell: "OT",
    key: "ot",
    visible: true,
    width: "w-[6rem]",
    alignment: "text-center",
  },
  {
    cell: "Almacen Relacionado ID",
    key: "almacen_relacionado_id",
    visible: false,
  },
  {
    cell: "Almacén Relacionado",
    key: "almacen_relacionado",
    visible: true,
    width: "w-[12rem]",
  },
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
    width: "w-[12rem]",
  },
  {
    cell: "Usuario ID",
    key: "usuario_id",
    visible: false,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: false,
  },
  {
    cell: "Fecha Mov",
    key: "fecha_mov",
    visible: false,
  },
  {
    cell: "",
    key: "opciones",
    visible: false,
  },
];
/************ BODEGA -> ASIGNACIÓN ************/
export const table_head_proyectos_accesorios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código Proyecto",
    key: "codigo",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Título Proyecto",
    key: "titulo_proyecto",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Código Licitación",
    key: "codigo_licitacion",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Código Accesorio",
    key: "codigo_accesorio",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Accesorio",
    key: "accesorio",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Proveedor Id",
    key: "proveedor_id",
    visible: false,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Marca Id",
    key: "marca_id",
    visible: false,
  },
  {
    cell: "Marca",
    key: "marca",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Valor Neto $",
    key: "valor_neto",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_muestrarios_armazones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Muestrario ID",
    key: "muestrario_id",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Muestrario",
    key: "muestrario",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Punto Venta ID",
    key: "punto_venta_id",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Código Armazón",
    key: "codigo_armazon",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Proveedor Id",
    key: "proveedor_id",
    visible: false,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
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
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Marca Id",
    key: "marca_id",
    visible: false,
  },
  {
    cell: "Marca",
    key: "marca",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Modelo",
    key: "modelo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Color",
    key: "color",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Material Id",
    key: "material_id",
    visible: false,
  },
  {
    cell: "Material",
    key: "material",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Aro",
    key: "aro",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Puente",
    key: "puente",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Diagonal",
    key: "diagonal",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Brazo",
    key: "brazo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Uso Id",
    key: "uso_id",
    visible: false,
  },
  {
    cell: "Uso",
    key: "uso",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Mínimo",
    key: "stock_minimo",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_vitrinas_armazones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Vitrina ID",
    key: "vitrina_id",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Vitrina",
    key: "vitrina",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Punto Venta ID",
    key: "punto_venta_id",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Código Armazón",
    key: "codigo_armazon",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Proveedor Id",
    key: "proveedor_id",
    visible: false,
  },
  {
    cell: "Proveedor",
    key: "proveedor",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
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
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Marca Id",
    key: "marca_id",
    visible: false,
  },
  {
    cell: "Marca",
    key: "marca",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Modelo",
    key: "modelo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Color",
    key: "color",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Material Id",
    key: "material_id",
    visible: false,
  },
  {
    cell: "Material",
    key: "material",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Aro",
    key: "aro",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Puente",
    key: "puente",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Diagonal",
    key: "diagonal",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Brazo",
    key: "brazo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Uso Id",
    key: "uso_id",
    visible: false,
  },
  {
    cell: "Uso",
    key: "uso",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Mínimo",
    key: "stock_minimo",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];

/************ MENU PROYECTOS ************/
export const table_head_mandantes = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Cod. Mercado Público",
    key: "codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "RUT",
    key: "rut",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Región ID",
    key: "region_id",
    visible: false,
  },
  {
    cell: "Región",
    key: "region",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Provincia ID",
    key: "provincia_id",
    visible: false,
  },
  {
    cell: "Provincia",
    key: "provincia",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Comuna ID",
    key: "comuna_id",
    visible: false,
  },
  {
    cell: "Comuna",
    key: "comuna",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_proyectos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código",
    key: "codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[9rem]",
  },
  {
    cell: "Código Licitación",
    key: "codigo_licitacion",
    visible: true,
    alignment: "text-center",
    width: "w-[9rem]",
  },
  {
    cell: "Título",
    key: "titulo",
    visible: true,
    alignment: "text-left",
    width: "w-[24rem]",
  },
  {
    cell: "Param Cristales",
    key: "param_cristales",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Empresa Id",
    key: "empresa_id",
    visible: false,
  },
  {
    cell: "Empresa",
    key: "empresa",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Mandante Id",
    key: "mandante_id",
    visible: false,
  },
  {
    cell: "Mandante",
    key: "mandante",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Unidad de Compra",
    key: "unidad_compra",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Fecha Adjudicación",
    key: "fecha_adjudicacion",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Inicio",
    key: "fecha_inicio",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Término",
    key: "fecha_termino",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Días de Entrega",
    key: "dias_entrega",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Cant. Presup",
    key: "cantidad_presupuesto",
    visible: true,
    alignment: "text-right",
    width: "w-[5rem]",
  },
  {
    cell: "$ Presupuesto",
    key: "total_presupuesto",
    visible: true,
    alignment: "text-right",
    width: "w-[7rem]",
  },
  {
    cell: "% Presup",
    key: "porc_presupuesto",
    visible: true,
    alignment: "text-center",
    width: "w-[5rem]",
  },
  {
    cell: "Cant. Ingresada",
    key: "cantidad_ingresada",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "$ Ingresado",
    key: "total_ingresado",
    visible: true,
    alignment: "text-right",
    width: "w-[7rem]",
  },  
  {
    cell: "% Ing",
    key: "porc_ingresado",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]",
  },
  {
    cell: "Cant. x Facturar",
    key: "cantidad_por_facturar",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "$ x Facturar",
    key: "total_por_facturar",
    visible: true,
    alignment: "text-right",
    width: "w-[7rem]",
  },  
  {
    cell: "% x Fact",
    key: "porc_por_facturar",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]",
  },
  {
    cell: "Cant. Facturada",
    key: "cantidad_facturada",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "$ Facturado",
    key: "total_facturado",
    visible: true,
    alignment: "text-right",
    width: "w-[7rem]",
  },
  {
    cell: "% Fact",
    key: "porc_facturado",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]",
  },
  {
    cell: "Cant. Saldo",
    key: "cantidad_saldo",
    visible: true,
    alignment: "text-right",
    width: "w-[5rem]",
  },
  {
    cell: "$ Saldo",
    key: "total_saldo",
    visible: true,
    alignment: "text-right",
    width: "w-[7rem]",
  },
  {
    cell: "% Saldo",
    key: "porc_saldo",
    visible: true,
    alignment: "text-center",
    width: "w-[5rem]",
  },
  {
    cell: "Ejecutivo ID",
    key: "ejecutivo_id",
    visible: false,
  },
  {
    cell: "Ejecutivo",
    key: "ejecutivo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Adm. Nombre",
    key: "contacto_administrador_nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Adm. Correo",
    key: "contacto_administrador_correo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Adm. Teléfono",
    key: "contacto_administrador_telefono",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Referente Técnico Nombre",
    key: "referente_tecnico_nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Referente Técnico Correo",
    key: "referente_tecnico_correo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Referente Técnico Teléfono",
    key: "referente_tecnico_telefono",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Contab. Nombre",
    key: "contacto_contabilidad_nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Contab. Correo",
    key: "contacto_contabilidad_correo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Contab. Teléfono",
    key: "contacto_contabilidad_telefono",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Finanzas Nombre",
    key: "contacto_finanzas_nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Finanzas Correo",
    key: "contacto_finanzas_correo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Contacto Finanzas Teléfono",
    key: "contacto_finanzas_telefono",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Oftalmólogo ID",
    key: "oftalmologo_id",
    visible: false,
  },
  {
    cell: "Oftalmólogo",
    key: "oftalmologo",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Imprime QR",
    key: "imprime_qr",
    visible: false,
    alignment: "text-center",
    width: "w-[4rem]",
  },
  {
    cell: "Imprime Ticket Retiro",
    key: "imprime_ticket",
    visible: false,
    alignment: "text-center",
    width: "w-[4rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_proyectos_docum = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Proyecto",
    key: "proyecto",
    visible: false,
  },
  {
    cell: "Proyecto",
    key: "titulo",
    visible: true,
    width: "w-[10rem]",
    alignment: "text-left"
  },
  {
    cell: "Fecha/Hora",
    key: "fecha_hora",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "TipoDocID",
    key: "tipo_doc_id",
    visible: false,
    excelIndividual:true
  },
  {
    cell: "Tipo Doc",
    key: "tipo_doc",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Número Doc",
    key: "numero_doc",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Fecha Doc",
    key: "fecha_doc",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Total Neto $",
    key: "total_neto",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Tipo Doc Ref ID",
    key: "tipo_doc_ref_id",
    visible: false,
  },
  {
    cell: "Tipo Doc Ref",
    key: "tipo_doc_ref",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Num Doc Ref Desc",
    key: "numero_doc_ref",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Usuario ID",
    key: "usuario_id",
    visible: false,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];

export const table_head_proyectos_tratam_adic = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "proyecto ID",
    key: "proyectoid",
    visible: false,
  },
  {
    cell: "Proyecto",
    key: "proyecto",
    visible: true,
  },
  {
    cell: "Tratamiento Adicional ID",
    key: "tratamiento_adiciona_id",
    visible: false,
  },
  {
    cell: "Tratamiento Adicional",
    key: "tratamiento_adicional",
    visible: true,
  },
  {
    cell: "Valor Neto",
    key: "valor_neto",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },

]
export const table_head_empresas = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Razón Social",
    key: "razon_social",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Giro",
    key: "giro",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
    alignment: "text-left",
    width: "w-[14rem]",
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Correo",
    key: "correo",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Sitio Web",
    key: "sitio_web",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_oftalmologos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Correo",
    key: "correo",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Valor Consulta",
    key: "valor_consulta",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_reserva_armazones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "RUT",
    key: "rut",
    visible: true,
    width: "w-[8rem]",
    alignment: "text-left"
  },
  {
    cell: "Proyecto",
    key: "proyecto",
    visible: false,
  },
  {
    cell: "Proyecto",
    key: "titulo",
    visible: true,
    width: "w-[18rem]",
    alignment: "text-left"
  },
  {
    cell: "Punto venta id",
    key: "punto_venta_id",
    visible: false,
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: true,
    width: "w-[16rem]",
    alignment: "text-left"
  },
  {
    cell: "Tipo Anteojo id",
    key: "tipo_anteojo_id",
    visible: false,
  },
  {
    cell: "Tipo Anteojo",
    key: "tipo_anteojo_id",
    visible: true,
    width: "w-[5rem]",
    alignment: "text-left"
  },
  {
    cell: "DP",
    key: "dp",
    visible: true,
    alignment: "text-left",
    width: "w-[4rem]",
  },
  {
    cell: "Armazon 1",
    key: "cod_armazon_1",
    visible: true,
    width: "w-[10rem]",
  },
  {
    cell: "Armazon 2",
    key: "cod_armazon_2",
    visible: true,
    width: "w-[10rem]",
    alignment: "text-left"
  },
  {
    cell: "Armazon 3",
    key: "cod_armazon_3",
    visible: true,
    width: "w-[10rem]",
    alignment: "text-left"
  },
  {
    cell: "Usuario ID",
    key: "usuario_id",
    visible: false,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: true,
    width: "w-[10rem]",
    alignment: "text-left"
  },


]

/************ PROYECTOS -> MOTIVOS DE OT ************/
export const table_head_motivos_ot = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    width: "w-[18rem]",
    alignment: "text-left"
  },
  {
    cell: "ID Area",
    key: "id_area",
    visible: false,
    width: "w-[9rem]",
    alignment: "text-left"
  },
  {
    cell: "Área Exclusiva",
    key: "area",
    visible: true,
    width: "w-[12rem]",
    alignment: "text-left"
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
    alignment: "items-center"
  },
];

/************ PROYECTOS -> PARAMETRIZACIÓN ************/
export const table_head_proyectos_grupos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código Proyecto",
    key: "proyecto",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Título Proyecto",
    key: "titulo",
    visible: false,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Código Licitación",
    key: "licitacion",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "ID",
    key: "cod_grupo",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]",
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: true,
    alignment: "text-left",
    width: "w-[16rem]",
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
    width: "w-[5rem]",
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
    alignment: "text-center",
    width: "w-[8rem]",
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
    alignment: "text-center",
    width: "w-[10rem]",
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
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Color_id",
    key: "color_id",
    visible: false,
  },
  {
    cell: "Color",
    key: "color",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
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
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Diámetro",
    key: "diametro",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "ESF desde",
    key: "esferico_desde",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "ESF hasta",
    key: "esferico_hasta",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "CIL desde",
    key: "cilindrico_desde",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "CIL hasta",
    key: "cilindrico_hasta",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "$ Cristales",
    key: "valor_neto_cristal",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  }, 	
  {
    cell: "Armazon Material ID",
    key: "armazon_material_id",
    visible: false,
  },
  {
    cell: "Armazón Material",
    key: "armazon_material",
    visible: true,
    alignment: "text-left",
    width: "w-[7rem]",
  },
  {
    cell: "$ Armazón",
    key: "valor_neto_armazon",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },

  // {
  //   cell: "Adulto Mayor",
  //   key: "adulto_mayor",
  //   visible: true,
  //   alignment: "text-right",
  //   width: "w-[6rem]",
  // },
  // {
  //   cell: "$ Adulto Mayor",
  //   key: "adulto_mayor",
  //   visible: true,
  //   alignment: "text-right",
  //   width: "w-[6rem]",
  // },

  {
    cell: "$ TOTAL",
    key: "valor_neto_total",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  }, 	
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
  cell: "",
  key: "opciones",
  visible: true,
  width: "w-[4rem]",
},
];
export const table_head_proyectos_puntos_venta = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Punto Venta ID",
    key: "punto_venta_id",
    visible: false,
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: true,
    alignment: "text-left",
    width: "w-[16rem]",
  },
  {
    cell: "Código Proyecto",
    key: "codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Título Proyecto",
    key: "titulo_proyecto",
    visible: true,
    alignment: "text-left",
    width: "w-[28rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[2rem]",
  },
];
export const table_head_proyectos_destinos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "ID",
    key: "id",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: true,
    alignment: "text-left",
    width: "w-[14rem]",
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
    alignment: "text-left",
    width: "w-[18rem]",
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_puntos_venta = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
    width: "w-[14rem]",
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
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
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
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Almacén armazones id",
    key: "almacen_armazones_id",
    visible: false,
  },
  {
    cell: "Almacén de Consumo Armazones",
    key: "almacen_armazones",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Almacén cristales id",
    key: "almacen_cristales_id",
    visible: false,
  },
  {
    cell: "Almacén de Consumo Cristales",
    key: "almacen_cristales",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Almacén accesorios id",
    key: "almacen_accesorios_id",
    visible: false,
  },
  {
    cell: "Almacén de Consumo Accesorios",
    key: "almacen_accesorios",
    visible: true,
    alignment: "text-left",
    width: "w-[14rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_establecimientos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "ID",
    key: "id",
    visible: false,
  },
  {
    cell: "Código / RBD",
    key: "codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Nombre",
    key: "nombre",
    visible: true,
    alignment: "text-left",
    width: "w-[26rem]",
  },
  {
    cell: "Establecimiento Tipo ID",
    key: "establecimiento_tipo_id",
    visible: false,
  },
  {
    cell: "Tipo",
    key: "establecimiento_tipo",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Mandante ID",
    key: "mandante_id",
    visible: false,
  },
  {
    cell: "Mandante",
    key: "mandante",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Región ID",
    key: "region_id",
    visible: false,
  },
  {
    cell: "Región",
    key: "region",
    visible: false,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Provincia ID",
    key: "provincia_id",
    visible: false,
  },
  {
    cell: "Provincia",
    key: "provincia",
    visible: false,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Comuna ID",
    key: "comuna_id",
    visible: false,
  },
  {
    cell: "Comuna",
    key: "comuna",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Destino ID",
    key: "destino_id",
    visible: false,
  },
  {
    cell: "Destino",
    key: "destino",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Despachar a",
    key: "despachar_a",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[8rem]",
  },
];
export const table_head_proyectos_usuarios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código Proyecto",
    key: "codigo",
    visible: false,
    alignment: "text-center",
    width: "w-[1rem]",
  },
  {
    cell: "Título Proyecto",
    key: "titulo_proyecto",
    visible: true,
    alignment: "text-left",
    width: "w-[18rem]",
  },
  {
    cell: "Punto Venta ID",
    key: "punto_venta_id",
    visible: false,
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: true,
    alignment: "text-left",
    width: "w-[16rem]",
  },
  {
    cell: "Usuario ID",
    key: "usuario_id",
    visible: false,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]",
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_muestrarios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left"
  },
  {
    cell: "Punto Venta ID",
    key: "punto_venta_id",
    visible: false,
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: true,
    alignment: "text-left"
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_vitrinas = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left"
  },
  {
    cell: "Punto Venta ID",
    key: "punto_venta_id",
    visible: false,
  },
  {
    cell: "Punto Venta",
    key: "punto_venta",
    visible: true,
    alignment: "text-left"
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];

/************ MENU SISTEMA ************/
export const table_head_cargos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Usuarios",
    key: "usuarios",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_funcionalidades = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_permisos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
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
    alignment: "text-left",
  },
  {
    cell: "Permiso",
    key: "permiso",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_perfiles = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
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
    alignment: "text-left",
  },
  {
    cell: "Permiso",
    key: "permiso",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_usuarios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[5rem]",
    alignment: "flex justify-center items-center"
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
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Correo",
    key: "correo",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
  },
  {
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[5rem]",
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
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "OT PERMISO DOC ID",
    key: "ot_permiso_doc_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "OT PERMISO DOC",
    key: "ot_permiso_doc",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "OT PERMISO POST VENTA ID",
    key: "ot_permiso_post_venta_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "OT PERMISO POST VENTA",
    key: "ot_permiso_post_venta",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "OT PERMISO ANULAR ID",
    key: "ot_permiso_anular_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "OT PERMISO ANULAR",
    key: "ot_permiso_anular",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "CON_ID",
    key: "permiso_con_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "CON",
    key: "permiso_con",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "ADQ_ID",
    key: "permiso_adq_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "ADQ",
    key: "permiso_adq",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "CAL_ID",
    key: "permiso_cal_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "CAL",
    key: "permiso_cal",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "LAB_ID",
    key: "permiso_lab_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "LAB",
    key: "permiso_lab",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "VTA_ID",
    key: "permiso_vta_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "VTA",
    key: "permiso_vta",
    visible:false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "BI_ID",
    key: "permiso_bi_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "BI",
    key: "permiso_bi",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "TC_ID",
    key: "permiso_tc_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "TC",
    key: "permiso_tc",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "TM_ID",
    key: "permiso_tm_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "TM",
    key: "permiso_tm",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },

  {
    cell: "BPT_ID",
    key: "permiso_bpt_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "BPT",
    key: "permiso_bpt",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "EMP_ID",
    key: "permiso_emp_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "EMP",
    key: "permiso_emp",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_armazon_id",
    key: "permiso_armazon_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_armazon",
    key: "permiso_armazon",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_cristal_id",
    key: "permiso_cristal_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_cristal",
    key: "permiso_cristal",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_estado_impresion_id",
    key: "permiso_estado_impresion_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_estado_impresion",
    key: "permiso_estado_impresion",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_validar_parametrizacion_id",
    key: "permiso_validar_parametrizacion_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_validar_parametrizacion",
    key: "permiso_validar_parametrizacion",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_resolucion_garantia_id",
    key: "permiso_resolucion_garantia_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_resolucion_garantia",
    key: "permiso_resolucion_garantia",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_grupo_dioptria_id",
    key: "permiso_grupo_dioptria_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_grupo_dioptria",
    key: "permiso_grupo_dioptria",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_receta_id",
    key: "permiso_receta_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_receta",
    key: "permiso_receta",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_validar_cristales_id",
    key: "permiso_validar_cristales_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_validar_cristales",
    key: "permiso_validar_cristales",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_validar_armazones_id",
    key: "permiso_validar_armazones_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_validar_armazones",
    key: "permiso_validar_armazones",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
 
  {
    cell: "editar_editar_worktracking_id",
    key: "permiso_editar_worktracking_id",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "editar_editar_worktracking",
    key: "permiso_editar_worktracking",
    visible: false,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[6rem]",
  },
];
export const table_head_funcionalidades_ot = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    alignment: "flex justify-center items-center"
  },
  {
    cell: "ID",
    key: "id",
    visible: false,
  },
  {
    cell: "Funcionalidad OT",
    key: "nombre",
    visible: true,
  },
  {
    cell: "",
    key: "opciones",
    visible: false,
  },
];

/************ LOGS ERRORES ************/
export const table_head_errors = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: false,
    width: "w-[6rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "ID",
    key: "id",
    visible: false,
  },
  {
    cell: "Errores",
    key: "errores",
    visible: true,
    width: "w-full",
    alignment: "text-left"
  },
  {
    cell: "",
    key: "opciones",
    visible: false,
    width: "w-[6rem]",
  },
];