3/************ MENU OT ************/
export const table_head_OT_diaria = [
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
    cell: "Area ID",
    key: "area_id",
    visible: false,
  },
  {
    cell: "Área",
    key: "area",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]"
  },
  {
    cell: "Estado ID",
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
    cell: "Valida Parametrización ID",
    key: "valida_parametrizacion_id",
    visible: false,
  },
  {
    cell: "Valida Parametrización",
    key: "valida_parametrizacion",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "Estado Impresión ID",
    key: "estado_impresion_id",
    visible: false,
  },
  {
    cell: "Estado Impresión",
    key: "estado_impresion",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "Código Proyecto",
    key: "proyecto_id",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "Título Proyecto",
    key: "proyecto",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]"
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
    width: "w-[10rem]"
  },
  {
    cell: "Establecimiento Tipo ID",
    key: "establecimiento_tipo_id",
    visible: false,
  },
  {
    cell: "Establecimiento Tipo",
    key: "establecimiento_tipo",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]",
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
  {
    cell: "Tipo",
    key: "tipo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Sexo",
    key: "sexo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Fecha Nacimiento",
    key: "fecha_nacimiento",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]"
  },
  {
    cell: "REGION_ID",
    key: "region_id",
    visible: false,
  },
  {
    cell: "Región",
    key: "region",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]"
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
    width: "w-[9rem]"
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
    width: "w-[9rem]"
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]"
  },
  {
    cell: "Correo",
    key: "correo",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]"
  },
  //************ RECETA */
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
    cell: "Fecha Atención",
    key: "fecha_atencion",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]"
  },
  {
    cell: "Fecha Entrega Taller",
    key: "fecha_entrega_taller",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]"
  },
  {
    cell: "Fecha Despacho",
    key: "fecha_despacho",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]"
  },
  {
    cell: "Fecha Entrega Cliente",
    key: "fecha_entrega_cliente",
    visible: true,
    alignment: "text-left",
    width: "w-[8rem]"
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
    width: "w-[12rem]"
  },
  {
    cell: "Número Receta",
    key: "numero_receta",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Fecha Receta",
    key: "fecha_receta",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Tipo anteojo ID",
    key: "tipo_anteojo_id",
    visible: false,
  },
  {
    cell: "Tipo Anteojo ",
    key: "tipo_anteojo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  //************ RECETA ANTEOJO 1 */
  {
    cell: "A1 OD ESF",
    key: "a1_od_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD CIL",
    key: "a1_od_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD EJE",
    key: "a1_od_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD AD",
    key: "a1_od_ad",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI ESF",
    key: "a1_oi_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI CIL",
    key: "a1_oi_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI EJE",
    key: "a1_oi_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI AD",
    key: "a1_oi_ad",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 DP",
    key: "a1_dp",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 ALT",
    key: "a1_alt",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 GRUPO",
    key: "a1_grupo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  //************ RECETA ANTEOJO 2 */  
  {
    cell: "A2 OD ESF",
    key: "a2_od_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OD CIL",
    key:"a2_od_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OD EJE",
    key: "a2_od_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI ESF",
    key: "a2_oi_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI CIL",
    key: "a2_oi_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI EJE",
    key: "a2_oi_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 DP",
    key: "a2_dp",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 Gupo",
    key: "a2_grupo",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },

  //************ ARMAZONES */
  {
    cell: "A1 Opcion venta ID",
    key: "a1_opcion_venta_id",
    visible: false,
  },
  {
    cell: "A1 Opción Venta",
    key: "a1_opcion_venta",
    visible: true,
    alignment: "text-center",
    width: "w-[9rem]"
  },
  {
    cell: "A1 Armazón Código",
    key: "a1_armazon_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "A1 Armazón",
    key: "a1_armazon",
    visible: true,
    alignment: "text-center",
    width: "w-[12rem]"
  },
  {
    cell: "A2 Opcion venta ID",
    key: "a2_opcion_venta_id",
    visible: false,
  },
  {
    cell: "A2 Opción Venta",
    key: "a2_opcion_venta",
    visible: true,
    alignment: "text-center",
    width: "w-[9rem]"
  },
  {
    cell: "A2 Armazón Código",
    key: "a2_armazon_codigo",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "A2 Armazón",
    key: "a2_armazon",
    visible: true,
    alignment: "text-center",
    width: "w-[12rem]"
  },
  {
    cell: "A3 Opcion venta ID",
    key: "a3_opcion_venta_id",
    visible: false,
  },
  {
    cell: "A3 Opción Venta",
    key: "a3_opcion_venta",
    visible: true,
    alignment: "text-center",
    width: "w-[9rem]"
  },
  {
    cell: "A3 Armazón Código",
    key: "a3_armazon_codigo",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "A3 Armazón",
    key: "a3_armazon",
    visible: true,
    alignment: "text-center",
    width: "w-[12rem]"
  },

  // ************** CRISTAL ANTEOJO 1
  {
    cell: "CR1 Opcion venta ID",
    key: "cr1_opcion_vta_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Opción Venta",
    key: "cr1_opcion_vta",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "CR1 Marca ID",
    key: "cr1_marca_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Marca",
    key: "cr1_marca",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "CR1 Diseño ID",
    key: "cr1_diseño_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Diseño",
    key: "cr1_diseño",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "CR1 Índice ID",
    key: "cr1_indice_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Índice",
    key: "cr1_indice",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CR1 material ID",
    key: "cr1_material_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Material",
    key: "cr1_material",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CR1 Tratamiento ID",
    key: "cr1_tratamiento_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Tratamiento",
    key: "cr1_tratamiento",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CR1 color ID",
    key: "cr1_color_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Color",
    key: "cr1_color",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]"
  },
  {
    cell: "CRISTAL 1 Diámetro",
    key: "cr1_diametro",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]"
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
  {
    cell: "CR1 Trat adic ID",
    key: "cr1_trat_adic_id",
    visible: false,
  },
  {
    cell: "CRISTAL 1 Tratamiento Adicional",
    key: "cr1_trat_adic",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },

  // ************** CRISTAL ANTEOJO 2
  {
    cell: "CR2 Opcion venta ID",
    key: "cr2_opcion_vta_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Opción Venta",
    key: "cr2_opcion_vta",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "CR12 Marca ID",
    key: "cr2_marca_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Marca",
    key: "cr2_marca",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "CR2 Diseño ID",
    key: "cr2_diseño_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Diseño",
    key: "cr2_diseño",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "CR2 Índice ID",
    key: "cr2_indice_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Índice",
    key: "cr2_indice",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CR2 matetial ID",
    key: "cr2_material_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Material",
    key: "cr2_material",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CR2 Tratamiento ID",
    key: "cr2_tratamiento_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Tratamiento",
    key: "cr2_tratamiento",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },
  {
    cell: "CR2 color ID",
    key: "cr2_color_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Color",
    key: "cr2_color",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]"
  },
  {
    cell: "CRISTAL 2 Diámetro",
    key: "cr2_diametro",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]"
  },
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
    cell: "CR2 Trat adic ID",
    key: "cr2_trat_adic_id",
    visible: false,
  },
  {
    cell: "CRISTAL 2 Tratamiento Adicional",
    key: "cr2_trat_adic",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]"
  },


// ************** ÓPTICA
  {
    cell: "Motivo Garantia ID",
    key: "motivo_gtia_id",
    visible: false,
  },
  {
    cell: "Motivo Garantía",
    key: "motivo_gtia",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "Folio OT Asociado",
    key: "folio_asociado",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Resolución garantia ID",
    key: "resolucion_gtia_id",
    visible: false,
  },
  {
    cell: "Resolución Garantía",
    key: "resolucion_garantia",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Worktracking",
    key: "worktracking",
    visible: true,
    alignment: "text-center",
    width: "w-[9rem]"
  },
  {
    cell: "Nota de Venta",
    key: "nota_venta",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "Número Factura",
    key: "numero_factura",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]"
  },
  {
    cell: "Folio Interno Mandante",
    key: "folio_interno_mandante",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Total $",
    key: "total",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
  },
  {
    cell: "Observaciones",
    key: "observaciones",
    visible: true,
    alignment: "text-left",
    width: "w-[12rem]"
  }
];
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
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
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
  //************ RECETA ANTEOJO 1 */
  {
    cell: "A1 OD ESF",
    key: "a1_od_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD CIL",
    key: "a1_od_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD EJE",
    key: "a1_od_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD AD",
    key: "a1_od_ad",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI ESF",
    key: "a1_oi_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI CIL",
    key: "a1_oi_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI EJE",
    key: "a1_oi_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI AD",
    key: "a1_oi_ad",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 DP",
    key: "a1_dp",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 ALT",
    key: "a1_alt",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  //************ RECETA ANTEOJO 2 */  
  {
    cell: "A2 OD ESF",
    key: "a2_od_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OD CIL",
    key:"a2_od_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OD EJE",
    key: "a2_od_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI ESF",
    key: "a2_oi_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI CIL",
    key: "a2_oi_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI EJE",
    key: "a2_oi_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 DP",
    key: "a2_dp",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
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
    alignment: "text-center",
    width: "w-[10trem]"
  },
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
    cell: "Estado",
    key: "estado",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]"
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
  //************ RECETA ANTEOJO 1 */
  {
    cell: "A1 OD ESF",
    key: "a1_od_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD CIL",
    key: "a1_od_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD EJE",
    key: "a1_od_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OD AD",
    key: "a1_od_ad",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI ESF",
    key: "a1_oi_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI CIL",
    key: "a1_oi_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI EJE",
    key: "a1_oi_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 OI AD",
    key: "a1_oi_ad",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 DP",
    key: "a1_dp",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A1 ALT",
    key: "a1_alt",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  //************ RECETA ANTEOJO 2 */  
  {
    cell: "A2 OD ESF",
    key: "a2_od_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OD CIL",
    key:"a2_od_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OD EJE",
    key: "a2_od_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI ESF",
    key: "a2_oi_esf",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI CIL",
    key: "a2_oi_cil",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 OI EJE",
    key: "a2_oi_eje",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
  },
  {
    cell: "A2 DP",
    key: "a2_dp",
    visible: true,
    alignment: "text-center",
    width: "w-[4rem]"
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
    alignment: "text-center",
    width: "w-[10trem]"
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
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
    width: "w-[3rem]",
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
    width: "w-[9rem]",
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
    width: "w-[4rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "ID",
    key: "id",
    visible: false,
  },
  {
    cell: "Código",
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
    width: "w-[16rem]",
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
    width: "w-[6rem]",
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
export const table_head_puntos_venta = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    alignment: "text-left"
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
    alignment: "text-left"
  },
  {
    cell: "Dirección",
    key: "direccion",
    visible: true,
    alignment: "text-left"
  },
  {
    cell: "Teléfono",
    key: "telefono",
    visible: true,
    alignment: "text-center"
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
    alignment: "text-left"
  },
  {
    cell: "Almacén Id",
    key: "almacen_id",
    visible: false,
  },
  {
    cell: "Almacén de Consumo",
    key: "almacen",
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
export const table_head_situaciones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[4rem]",
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
    width: "w-[25rem]",
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
    cell: "Área",
    key: "area",
    visible: true,
    width: "w-[8rem]",
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

/************ MENU BODEGA ************/
export const table_head_accesorios = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código",
    key: "codigo",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
  },
  {
    cell: "Descripción",
    key: "descripcion",
    visible: true,
    alignment: "text-left"
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
    cell: "Total Ingresos",
    key: "ingresos",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Total Egresos",
    key: "egresos",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Actual",
    key: "stock_actual",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
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
    width: "w-[3rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código",
    key: "codigo",
    alignment: "text-left",
    visible: true,
    width: "w-[9rem]",
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
    cell: "Total Ingresos",
    key: "ingresos",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Total Egresos",
    key: "egresos",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Actual",
    key: "stock_actual",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
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
    width: "w-[3rem]",
    alignment: "flex justify-center items-center"
  },
  {
    cell: "Código",
    key: "codigo",
    visible: true,
    alignment: "text-left",
    width: "w-[9rem]",
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
    cell: "Total Ingresos",
    key: "ingresos",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Total Egresos",
    key: "egresos",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
  },
  {
    cell: "Stock Actual",
    key: "stock_actual",
    visible: true,
    alignment: "text-right",
    width: "w-[6rem]",
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
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_kardex = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    visible: false,
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
    width: "w-[8rem]",
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
export const table_head_almacenes = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    cell: "Tipo Almacén ID",
    key: "tipo_almacen_id",
    visible: false,
  },
  {
    cell: "Tipo Almacén",
    key: "tipo_almacen",
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
export const table_head_marcas = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    width: "w-[3rem]",
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

/************ MENU PROYECTOS ************/
export const table_head_mandantes = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    width: "w-[3rem]",
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
    width: "w-[16rem]",
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
    cell: "% Avance",
    key: "avance",
    visible: true,
    alignment: "text-center",
    width: "w-[6rem]",
  },
  {
    cell: "Cantidad Requerida",
    key: "cantidad_requerida",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Presupuesto $",
    key: "presupuesto",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Cantidad Atendida",
    key: "cantidad_atendida",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Total Facturado",
    key: "total_facturado",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Cantidad Disponible",
    key: "cantidad_disponible",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Saldo Disponible",
    key: "saldo_disponible",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
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
    width: "w-[3rem]",
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
    width: "w-[3rem]",
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
export const table_head_muestrarios_armazones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    cell: "Stock Disponible",
    key: "stock_disponible",
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
    width: "w-[3rem]",
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
    cell: "Stock Disponible",
    key: "stock_disponible",
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
export const table_head_parametrizacion_accesorios = [
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
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_proyectos_cristales = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    cell: "Nro. Grupo",
    key: "cod_grupo",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
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
    cell: "$ Venta Neto",
    key: "precio_venta_neto",
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
export const table_head_proyectos_direcciones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    alignment: "text-center",
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
    cell: "Establecimiento ID",
    key: "establecimiento_id",
    visible: false,
  },
  {
    cell: "Establecimiento",
    key: "establecimiento",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
  },
  {
    cell: "Lugar",
    key: "lugar",
    visible: true,
    alignment: "text-left",
    width: "w-[10rem]",
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
    width: "w-[8rem]",
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
    width: "w-[6rem]",
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
    width: "w-[20rem]",
  },
  {
    cell: "Código Licitación",
    key: "codigo_licitacion",
    visible: false,
    alignment: "text-center",
    width: "w-[10rem]",
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
    width: "w-[10rem]",
  },
  {
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_proyectos_usuarios = [
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
    cell: "Usuario ID",
    key: "usuario_id",
    visible: false,
  },
  {
    cell: "Usuario",
    key: "usuario",
    visible: true,
    alignment: "text-left",
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
    cell: "",
    key: "opciones",
    visible: true,
    width: "w-[4rem]",
  },
];
export const table_head_proyectos_atenciones = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    cell: "Folio Reporte",
    key: "folio_reporte",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Desde",
    key: "fecha_desde",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Hasta",
    key: "fecha_hasta",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Cantidad Lentes",
    key: "cantidad_lentes",
    visible: true,
    alignment: "text-center",
    width: "w-[7rem]",
  },
  {
    cell: "Total de Atenciones",
    key: "total_atenciones",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Orden de Compra Mandante",
    key: "orden_compra_mandante",
    visible: true,
    alignment: "text-center",
    width: "w-[10rem]",
  },
  {
    cell: "Fecha VB",
    key: "fecha_vb",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Número Factura",
    key: "factura",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Factura",
    key: "fecha_factura",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Total Factura",
    key: "total_factura",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Nota Crédito",
    key: "nota_credito",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha N. Crédito",
    key: "fecha_ncredito",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Total N. Crédito",
    key: "total_ncredito",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Nota Débito",
    key: "nota_debito",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha N. Débito",
    key: "fecha_ndebito",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Total N. Débito",
    key: "total_ndebito",
    visible: true,
    alignment: "text-right",
    width: "w-[8rem]",
  },
  {
    cell: "Guía Despacho",
    key: "guia_despacho",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Guía Despacho",
    key: "fecha_guia_despacho",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
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
    width: "w-[7rem]",
  },
];
export const table_head_proyectos_firmas = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    cell: "Folio Reporte",
    key: "folio_reporte",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Desde",
    key: "fecha_desde",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
  },
  {
    cell: "Fecha Hasta",
    key: "fecha_hasta",
    visible: true,
    alignment: "text-center",
    width: "w-[8rem]",
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
    width: "w-[6rem]",
  },
];
export const table_head_oftalmologos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
export const table_head_empresas = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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

/************ MENU SISTEMA ************/
export const table_head_cargos = [
  {
    cell: <input type="checkbox" />,
    key: "checkbox",
    visible: true,
    width: "w-[3rem]",
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
    width: "w-[3rem]",
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
    width: "w-[3rem]",
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
    width: "w-[3rem]",
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
    width: "w-[3rem]",
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