import * as yup from "yup";

// export const fechaActual = signal(new Date())
export const fechaActual = new Date();

const msg = "Requerido";

/*************** O T ***************/
//Schema OT
export const validationOTSchema = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    establecimiento: yup.string().required(`${msg}`),
    tipo: yup.string().required(`${msg}`),
    sexo: yup.string().required(`${msg}`),
    fecha_nacimiento: yup.string(),
    direccion: yup.string(),
    region: yup.string(),
    provincia: yup.string(),
    comuna: yup.string().required(`${msg}`),
    telefono: yup.string().required(`${msg}`),
    correo: yup.string(),
    establecimient: yup.string().required(`${msg}`),
  });

//Schema
export const validationBodegaSchema = () =>
  yup.object().shape({
    a1_od: yup.string().required(`${msg}`),
    a1_oi: yup.string().required(`${msg}`),
    a1_armazon: yup.string().required(`${msg}`),
    a2_od: yup.string().required(`${msg}`),
    a2_oi: yup.string().required(`${msg}`),
    a2_armazon: yup.string().required(`${msg}`),
  });

export const validationEmpaqueSchema = () =>
  yup.object().shape({
    nombre_beneficiario: yup.string().required(`${msg}`),
  });
export const validationUbicacionSchema = () =>
  yup.object().shape({
    ubicacion: yup.string().required(`${msg}`),
  });

//Schema OTHistorica Asignacion OC
export const validationOTOCSchema = () =>
  yup.object().shape({
    numero_doc: yup.string().required(`${msg}`),
    fecha_doc: yup.string().required(`${msg}`),
    valor_neto: yup.string().required(`${msg}`),
  });

export const validationFOTOrdenCompra = () =>
  yup.object().shape({
    numero_doc: yup.string().nullable(),
    fecha_doc: yup.string().required(`${msg}`),
    valor_neto: yup.string().required(`${msg}`),
  });
//Schema OTHistorica Asignacion Factura
export const validationOTFacturaSchema = () =>
  yup.object().shape({
    numero_doc: yup.string().required(`${msg}`),
    fecha_doc: yup.string().required(`${msg}`),
    valor_neto: yup.string().required(`${msg}`),
  });
//Schema OTHistorica Asignacion Guía Despacho
export const validationOTGuiaSchema = () =>
  yup.object().shape({
    numero_doc: yup.string().required(`${msg}`),
    fecha_doc: yup.string().required(`${msg}`),
  });

//Schema OT Asignacion numero envio
export const validationOTNumeroEnvio = () =>
  yup.object().shape({
    numero_doc: yup.string().required(`${msg}`),
    fecha_doc: yup.string().required(`${msg}`),
  });

// Schema CLIENTES
export const validationClientesSchema = (isEditting?: boolean) =>
  yup.object().shape({
    rut: yup.string().required(`${msg}`),
    nombre: yup.string().required(`${msg}`),
    tipo: yup.string().required(`${msg}`),
    sexo: yup.string().required(`${msg}`),
    fecha_nacimiento: yup.string(),
    direccion: yup.string(),
    region: yup.string(),
    provincia: yup.string(),
    comuna: isEditting ? yup.string() : yup.string().required(`${msg}`),
    telefono: yup.string().required(`${msg}`),
    correo: yup.string(),
    establecimiento: yup.string().required(`${msg}`),
  });

// Schema ESTABLECIMIENTOS
export const validationEstablecimientosSchema = (isEditting: boolean) =>
  yup.object().shape({
    codigo: yup.string(),
    nombre: yup.string().required(`${msg}`),
    mandante: yup.string().required(`${msg}`),
    tipo: yup.string().required(`${msg}`),
    region: yup.string(),
    provincia: yup.string(),
    comuna: isEditting ? yup.string() : yup.string().required(`${msg}`),
    destino: yup.string().required(`${msg}`),
  });

// Schema PUNTOS DE VENTA
export const validationPuntosVentaSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    tipo: yup.string().required(`${msg}`),
    direccion: yup.string(),
    telefono: yup.string(),
    almacen_armazones: yup.string().required(`${msg}`),
    almacen_cristales: yup.string().required(`${msg}`),
    almacen_accesorios: yup.string().required(`${msg}`),
    encargado: yup.string().required(`${msg}`),
    observaciones: yup.string(),
  });

// Schema MOTIVOS OT PENDIENTE - DERIVADAS - GARANTIA - ANULACION
export const validationMotivosOTSchema = () =>
  yup.object().shape({
    situacion: yup.string().required(`${msg}`),
    area_hasta: yup.string(),
  });
export const validationPendienteOTSchema = () =>
  yup.object().shape({
    situacion: yup.string().required(`${msg}`),
    // area_hasta : yup.string().required(`${msg}`),
  });

/*************** B O D E G A ***************/
// Schema ARMAZONES
export const validationArmazonesSchema = () =>
  yup.object().shape({
    codigo: yup.string().required(`${msg}`),
    tipo: yup.string().required(`${msg}`),
    material: yup.string().required(`${msg}`),
    marca: yup.string().required(`${msg}`),
    modelo: yup.string().required(`${msg}`),
    color: yup.string().required(`${msg}`),
    aro: yup.string().required(`${msg}`),
    puente: yup.string().required(`${msg}`),
    diagonal: yup.string().required(`${msg}`),
    brazo: yup.string().required(`${msg}`),
    uso: yup.string().required(`${msg}`),
    stock_minimo: yup.string().required(`${msg}`),
    codigo_fab: yup.string(),
    dp_minima: yup.string(),
    dp_maxima: yup.string(),
  });

//Schema Reserva Armazones
export const validationReservaArmazonesSchema = () =>
  yup.object().shape({
    rut_beneficiario: yup.string().required(`${msg}`),
    dp: yup.string().required(`${msg}`),
    tipo_anteojo: yup.string().required(`${msg}`),
    Armazon1: yup.string().required(`${msg}`),
    Armazon3: yup.string(),
    Armazon2: yup.string(),
  });

// Schema ACCESORIOS
export const validationAccesoriosSchema = () =>
  yup.object().shape({
    codigo: yup.string().required(`${msg}`),
    descripcion: yup.string().required(`${msg}`),
    marca: yup.string().required(`${msg}`),
    precio_neto: yup.string(),
    stock_minimo: yup.string().required(`${msg}`),
    stock_reservado: yup.string(),
    stock_disponible: yup.string(),
  });

// Schema CRISTALES
export const validationCristalesSchema = () =>
  yup.object().shape({
    codigo: yup.string().required(`${msg}`),
    marca: yup.string().required(`${msg}`),
    diseno: yup.string().required(`${msg}`),
    indice: yup.string().required(`${msg}`),
    material: yup.string().required(`${msg}`),
    color: yup.string().required(`${msg}`),
    tratamiento: yup.string().required(`${msg}`),
    diametro: yup.string().required(`${msg}`),
    esferico: yup.string().required(`${msg}`),
    cilindrico: yup.string().required(`${msg}`),
    stock_minimo: yup.string().required(`${msg}`),
    codigo_fab_1: yup.string(),
    codigo_fab_2: yup.string(),
    codigo_fab_3: yup.string(),
    codigo_fab_4: yup.string(),
  });

// Schema INGRESO INSUMOS KARDEX (CRISTALES-ARMAZONES-ACCESORIOS)
export const validationKardexINSchema = () =>
  yup.object().shape({
    insumo: yup.string().required(`${msg}`),
    descripcion: yup.string(),
    fecha: yup.string().required(`${msg}`),
    almacen: yup.string().required(`${msg}`),
    motivo_ingreso: yup.string().required(`${msg}`),
    cantidad: yup.string().required(`${msg}`),
    observaciones: yup.string(),
    usuario: yup.string(),
    fecha_mov: yup.string(),
    ubicacion: yup.string(),

    valor_neto: yup
      .string()
      .default("0")
      .test({
        test: function (value) {
          // Obtén el valor de 'motivo_ingreso' desde el contexto
          const motivoIngreso = this.resolve(yup.ref("motivo_ingreso"));

          // Realiza la lógica de validación basada en 'motivo_ingreso' y 'valor_neto'
          if (motivoIngreso === "2" && !value) {
            return this.createError({ message: `${msg}` });
          }

          return true;
        },
      }),

    proveedor: yup
      .string()
      .default("0")
      .test({
        test: function (value) {
          // Obtén el valor de 'motivo_ingreso' desde el contexto
          const motivoIngreso = this.resolve(yup.ref("motivo_ingreso"));
          console.log(motivoIngreso);
          console.log(value);
          // Realiza la lógica de validación basada en 'motivo_ingreso' y 'proveedor'
          if (motivoIngreso === "2" && !value) {
            return this.createError({ message: `${msg}` });
          }

          return true;
        },
      }),

    numero_factura: yup.string().test({
      test: function (value) {
        const motivoIngreso = this.resolve(yup.ref("motivo_ingreso"));

        if (motivoIngreso === "2" && !value) {
          return this.createError({ message: `${msg}` });
        }

        return true;
      },
    }),
  });

// Schema EGRESO INSUMOS KARDEX (CRISTALES-ARMAZONES-ACCESORIOS)
export const validationKardexOUTSchema = () =>
  yup.object().shape({
    insumo: yup.string().required(`${msg}`),
    descripcion: yup.string(),
    fecha: yup.string().required(`${msg}`),
    almacen: yup.string().required(`${msg}`),
    motivo_egreso: yup.string().required(`${msg}`),
    cantidad: yup.string().required(`${msg}`),
    observaciones: yup.string(),
    usuario: yup.string(),
    fecha_mov: yup.string(),
    ot: yup.string(),
    ubicacion: yup.string(),
    almacen_relacionado: yup.string().test({
      test: function (value) {
        const motivoEgreso = this.resolve(yup.ref("motivo_egreso"));
        // console.log(motivoEgreso)

        if (motivoEgreso === "2" && !value) {
          return this.createError({ message: `${msg}` });
        }

        return true;
      },
    }),
  });

// Schema ALMACENES
export const validationAlmacenesSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    tipo: yup.string().required(`${msg}`),
    categoria: yup.string().required(`${msg}`),
    usuario: yup.string().required(`${msg}`),
  });

// Schema MARCAS
export const validationMarcasSchema = () =>
  yup.object().shape({
    nombre: yup.string().required(`${msg}`),
    proveedor: yup.string().required(`${msg}`),
    categoria: yup.string(),
  });
// Schema PROVEEDORES
export const validationProveedoresSchema = () =>
  yup.object().shape({
    rut: yup.string(),
    nombre: yup.string().required(`${msg}`),
    direccion: yup.string(),
    telefono: yup.string(),
    correo: yup.string().email(),
    sitio_web: yup.string(),
  });

/*************** P R O Y E C T O S ***************/
// Schema MANDANTES
export const validationMandantesSchema = () =>
  yup.object().shape({
    codigo: yup.string().required(`${msg}`),
    rut: yup.string().required(`${msg}`),
    nombre: yup.string().required(`${msg}`),
    region: yup.string(),
    provincia: yup.string(),
    comuna: yup.string().required(`${msg}`),
  });

// Schema PROYECTOS
export const validationProyectosSchema = () =>
  yup.object().shape({
    codigo_proyecto: yup.string().required(`${msg}`),
    codigo_licitacion: yup.string(),
    titulo_proyecto: yup.string().required(`${msg}`),
    param_cristales: yup.string().required(`${msg}`),
    estado: yup.string().required(`${msg}`),
    empresa_adjudicada: yup.string().required(`${msg}`),
    mandante: yup.string().required(`${msg}`),
    unidad_compra: yup.string(),
    fecha_adjudicacion: yup.string(),
    fecha_inicio: yup.string().required(`${msg}`),
    fecha_termino: yup.string().required(`${msg}`),
    dias_entrega: yup.string().required(`${msg}`),
    avance: yup.string().default("0"),
    cantidad_requerida: yup.string().default("0"),
    presupuesto: yup.string().default("0"),
    cantidad_en_proceso: yup.string().default("0"),
    total_en_proceso: yup.string().default("0"),
    cantidad_facturada: yup.string().default("0"),
    total_facturado: yup.string().default("0"),
    cantidad_disponible: yup.string().default("0"),
    saldo_disponible: yup.string().default("0"),

    ejecutivo_proyecto: yup.string().required(`${msg}`),

    administrador_nombre: yup.string(),
    administrador_telefono: yup.string(),
    administrador_correo: yup.string(),
    contabilidad_nombre: yup.string(),
    contabilidad_telefono: yup.string(),
    contabilidad_correo: yup.string(),
    referente_nombre: yup.string(),
    referente_telefono: yup.string(),
    referente_correo: yup.string(),
    finanzas_nombre: yup.string(),
    finanzas_telefono: yup.string(),
    finanzas_correo: yup.string(),

    oftalmologo: yup.string().default("0"),
    observaciones: yup.string(),

    imprime_qr: yup.string().required(`${msg}`),
    imprime_ticket: yup.string().required(`${msg}`),
    permite_aproximar: yup.string().required(`${msg}`),
    requiere_guia: yup.string().required(`${msg}`),
  });

// Schema MUESTRARIOS
export const validationMuestrariosSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    punto_venta: yup.string().required(`${msg}`),
  });

// Schema VITRINAS
export const validationVitrinasSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    punto_venta: yup.string().required(`${msg}`),
  });

// Schema MUESTRARIOS ARMAZONES
export const validationMuestrariosArmazones = () =>
  yup.object().shape({
    muestrario: yup.string().required(`${msg}`),
    codigo_armazon: yup.string().required(`${msg}`),
    estado: yup.string().required(`${msg}`),
  });

export const validationMuestrariosArmazonesTraspaso = () =>
  yup.object().shape({
    muestrario: yup.string().required(`${msg}`),
    origen: yup.string().required(`${msg}`),
    cantidad: yup.string().required(`${msg}`),
    usuario: yup.string(),
  });

// Schema VITRINAS ARMAZONES
export const validationVitrinasArmazones = () =>
  yup.object().shape({
    vitrina: yup.string().required(`${msg}`),
    codigo_armazon: yup.string().required(`${msg}`),
    estado: yup.string().required(`${msg}`),
  });

// Schema PROYECTOS CRISTALES
export const validationProyectoCristalesSchema = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    cod_grupo: yup.string().required(`${msg}`),
    descripcion: yup.string().required(`${msg}`),
    marca: yup.string().required(`${msg}`),
    diseno: yup.string().required(`${msg}`),
    indice: yup.string().required(`${msg}`),
    material: yup.string().required(`${msg}`),
    color: yup.string().required(`${msg}`),
    tratamiento: yup.string().required(`${msg}`),
    esferico_desde: yup.string().required(`${msg}`),
    cilindrico_desde: yup.string().required(`${msg}`),
    esferico_hasta: yup.string().required(`${msg}`),
    cilindrico_hasta: yup.string().required(`${msg}`),
    diametro: yup.string().required(`${msg}`),
    precio_venta_neto: yup.string(),
    observaciones: yup.string(),
  });

// Schema PROYECTOS GRUPOS
export const validationProyectoGruposSchema = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    cod_grupo: yup.string().required(`${msg}`),
    descripcion: yup.string().required(`${msg}`),
    marca: yup.string().required(`${msg}`),
    diseno: yup.string().required(`${msg}`),
    indice: yup.string().required(`${msg}`),
    material: yup.string().required(`${msg}`),
    color: yup.string().required(`${msg}`),
    tratamiento: yup.string().required(`${msg}`),
    esferico_desde: yup.string().required(`${msg}`),
    cilindrico_desde: yup.string().required(`${msg}`),
    esferico_hasta: yup.string().required(`${msg}`),
    cilindrico_hasta: yup.string().required(`${msg}`),
    diametro: yup.string().required(`${msg}`),
    valor_neto_cristal: yup.string().required(`${msg}`),

    // armazon_tipo      : yup.string(),
    armazon_material: yup.string(),
    // armazon_marca     : yup.string(),
    // valor_neto_adulto_mayor    : yup.string(),
    valor_neto_armazon: yup.string().required(`${msg}`),
    valor_neto_total: yup.string().required(`${msg}`),
    observaciones: yup.string(),
  });

// Schema PROYECTOS ACCESORIOS
export const validationParametrizacionAccesorios = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    codigo_accesorio: yup.string().required(`${msg}`),
    estado: yup.string().required(`${msg}`),
    valor_neto: yup.string(),
  });

// Schema PROYECTOS ARMAZONES-CRISTALES-ACCESORIOS-USUARIOS-MUESTRARIOS-VITRINAS COPIAR
export const validationProyectoParametrizacionCopiar = () =>
  yup.object().shape({
    origen: yup.string().required(`${msg}`),
    destino: yup.string().required(`${msg}`),
  });

// Schema PROYECTOS DIRECCIONES
export const validationProyectoDireccionesSchema = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    titulo: yup.string(),
    establecimiento: yup.string().required(`${msg}`),
    lugar: yup.string().required(`${msg}`),
    direccion: yup.string(),
    telefono: yup.string(),
    observaciones: yup.string(),
  });

// Schema PROYECTOS DESTINOS
export const validationProyectoDestinosSchema = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
    direccion: yup.string().required(`${msg}`),
    contacto: yup.string(),
    telefono: yup.string(),
    correo: yup.string(),
    proyecto: yup.string(),
    observaciones: yup.string(),
  });

// Schema PROYECTOS PUNTOS DE VENTA
export const validationParametrizacionPuntosVenta = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    punto_venta: yup.string().required(`${msg}`),
  });

// Schema PROYECTOS USUARIOS
export const validationParametrizacionUsuarios = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    usuario: yup.string().required(`${msg}`),
    punto_venta: yup.string().required(`${msg}`),
    estado: yup.string().required(`${msg}`),
  });
// Schema PROYECTOS TRATAMIENTO ADICIONAL
export const validationParametrizacionTratamientoAdic = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    tratamiento_adicional: yup.string().required(`${msg}`),
    valor_neto: yup.string().required(`${msg}`),
  });
// Schema WHASTAPP FORM
export const validationWhastApp = () =>
  yup.object().shape({
    descripcion: yup.string().required(`${msg}`),
  });

// Schema REPORTE ATENCION
export const validationReporteAtencionSchema = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    titulo: yup.string(),
    licitacion: yup.string(),
    folio_reporte: yup.string().required(`${msg}`),
    fecha_desde: yup.string().required(`${msg}`),
    fecha_hasta: yup.string().required(`${msg}`),
    cantidad_lentes: yup.string(),
    total_atenciones: yup.string(),
    orden_compra_mandante: yup.string(),
    fecha_vb: yup.string(),
    factura: yup.string(),
    fecha_factura: yup.string(),
    total_factura: yup.string(),
    nota_credito: yup.string(),
    fecha_nota_credito: yup.string(),
    total_nota_credito: yup.string(),
    nota_debito: yup.string(),
    fecha_nota_debito: yup.string(),
    total_nota_debito: yup.string(),
    guia_despacho: yup.string(),
    fecha_guia_despacho: yup.string(),
    observaciones: yup.string(),
  });

// Schema REPORTE FIRMAS
export const validationReporteFirmasSchema = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    titulo: yup.string(),
    licitacion: yup.string(),
    folio_reporte: yup.string().required(`${msg}`),
    fecha_desde: yup.string().required(`${msg}`),
    fecha_hasta: yup.string().required(`${msg}`),
    observaciones: yup.string(),
  });

// Schema OFTALMÓLOGOS
export const validationOftalmologosSchema = () =>
  yup.object().shape({
    rut: yup.string().required(`${msg}`),
    nombre: yup.string().required(`${msg}`),
    telefono: yup.string(),
    correo: yup.string(),
    valor_consulta: yup.string().required(`${msg}`),
  });

// Schema PROYECTOS DOCUM
export const validationProyectosDocumSchema = () =>
  yup.object().shape({
    proyecto: yup.string().required(`${msg}`),
    tipo_doc: yup.string().required(`${msg}`),
    numero_doc: yup.string().required(`${msg}`),
    fecha_doc: yup.string().required(`${msg}`),
    total_neto: yup.string().required(`${msg}`),
    tipo_doc_ref: yup.string().required(`${msg}`),
    numero_doc_ref: yup.string().required(`${msg}`),
    observaciones: yup.string(),
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
    nombre: yup.string().required(`${msg}`),
    cargo: yup.string().required(`${msg}`),
    telefono: yup.string(),
    correo: yup.string().required(`${msg}`),
    estado: yup.string().required(`${msg}`),

    permiso_resolucion: yup.string().required(`${msg}`),
    permiso_compras: yup.string().required(`${msg}`),
    permiso_calculo: yup.string().required(`${msg}`),
    permiso_laboratorio: yup.string().required(`${msg}`),
    permiso_ingreso: yup.string().required(`${msg}`),
    permiso_control_produccion: yup.string().required(`${msg}`),
    permiso_bodega_insumos: yup.string().required(`${msg}`),
    permiso_biselado_1: yup.string().required(`${msg}`),
    permiso_biselado_2: yup.string().required(`${msg}`),
    permiso_montaje: yup.string().required(`${msg}`),
    permiso_qa: yup.string().required(`${msg}`),
    permiso_bodega_prod_term: yup.string().required(`${msg}`),
    permiso_empaque: yup.string().required(`${msg}`),

    permiso_editar_armazon: yup.string().required(`${msg}`),
    permiso_editar_cristal_opcion_vta: yup.string().required(`${msg}`),
    permiso_editar_estado_impresion: yup.string().required(`${msg}`),
    permiso_editar_validar_parametrizacion: yup.string().required(`${msg}`),
    permiso_editar_opcion_montaje: yup.string().required(`${msg}`),
    permiso_editar_grupo_dioptria: yup.string().required(`${msg}`),
    permiso_editar_receta: yup.string().required(`${msg}`),
    permiso_editar_validar_cristales: yup.string().required(`${msg}`),
    permiso_editar_validar_armazones: yup.string().required(`${msg}`),
    permiso_editar_worktracking: yup.string().required(`${msg}`),

    permiso_nguia: yup.string().required(`${msg}`),
    permiso_nenvio: yup.string().required(`${msg}`),
    permiso_nfirma: yup.string().required(`${msg}`),
    permiso_nreporte_entrega: yup.string().required(`${msg}`),
    permiso_noc: yup.string().required(`${msg}`),
    permiso_confirmar_entrega: yup.string().required(`${msg}`),
    permiso_pre_facturar: yup.string().required(`${msg}`),
    permiso_vb: yup.string().required(`${msg}`),
    permiso_facturar: yup.string().required(`${msg}`),
    permiso_confirmar_pago: yup.string().required(`${msg}`),

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
export const validationPerfilesSchema = () =>
  yup.object().shape({
    cargo: yup.string().required(`${msg}`),
    funcionalidad: yup.string().required(`${msg}`),
    permiso: yup.string().required(`${msg}`),
  });

//Schema PERMISOS DE USUARIO
export const validationPermisosSchema = () =>
  yup.object().shape({
    usuario: yup.string().required(`${msg}`),
    funcionalidad: yup.string().required(`${msg}`),
    permiso: yup.string().required(`${msg}`),
  });

//Schema PERMISOS DE OT
export const validationOTPermisosSchema = () =>
  yup.object().shape({
    usuario: yup.string().required(`${msg}`),
    permiso: yup.string().required(`${msg}`),
  });

export const validationPermisosAreasSchema = () =>
  yup.object().shape({
    usuario: yup.string().required(`${msg}`),
    area: yup.string().required(`${msg}`),
    permiso: yup.string().required(`${msg}`),
  });

// Schema EMPRESAS
export const validationEmpresasSchema = () =>
  yup.object().shape({
    rut: yup.string().default(""),
    nombre: yup.string().required(`${msg}`),
    razon_social: yup.string().required(`${msg}`),
    giro: yup.string().required(`${msg}`),
    direccion: yup.string().default(""),
    telefono: yup.string().default(""),
    correo: yup.string().email().default(""),
    sitio_web: yup.string().default(""),
    nombre_logo: yup.string().default(""),
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
