/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fechaActual,
  validationProyectosSchema,
} from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectos";
import {
  MODAL,
  SUCCESS_MESSAGES,
  TITLES,
  formatCurrencyNumber,
} from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from "react-toastify";
import ContactComponent from "../../components/ContactComponent";
import ProyectoComponent from "../../components/ProyectoComponent";
import FrameComponent from "../../components/FrameComponent";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/proyectos/";
const strEntidad = "Proyecto ";

interface InputData {
  codigo_proyecto: string | undefined;
  codigo_licitacion: string | undefined;
  titulo_proyecto: string | undefined;
  param_cristales: string | undefined;
  estado: string | undefined;
  empresa_adjudicada: string | undefined;
  mandante: string | undefined;
  unidad_compra: string | undefined;
  fecha_adjudicacion: string | undefined;
  fecha_inicio: string | undefined;
  fecha_termino: string | undefined;
  dias_entrega: string | undefined;
  avance: string | undefined;
  cantidad_requerida: string | undefined;
  presupuesto: string | undefined;
  cantidad_en_proceso: string | undefined;
  total_en_proceso: string | undefined;
  cantidad_facturada: string | undefined;
  total_facturado: string | undefined;
  cantidad_disponible: string | undefined;
  saldo_disponible: string | undefined;
  ejecutivo_proyecto: string | undefined;
  administrador_nombre: string | undefined;
  administrador_correo: string | undefined;
  administrador_telefono: string | undefined;
  referente_nombre: string | undefined;
  referente_correo: string | undefined;
  referente_telefono: string | undefined;
  contabilidad_nombre: string | undefined;
  contabilidad_correo: string | undefined;
  contabilidad_telefono: string | undefined;
  finanzas_nombre: string | undefined;
  finanzas_correo: string | undefined;
  finanzas_telefono: string | undefined;
  oftalmologo: string | 0;
  observaciones: string | undefined;
  imprime_qr: string | undefined;
  imprime_ticket: string | undefined;
  permite_aproximar: string | undefined;
  requiere_guia: string | undefined;
  requiere_reserva_armazon: string | undefined;
}

interface OutputData {
  query: string;
  _p1?: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  // (codigo, codigo_licitacion, titulo, estado, empresa, mandante, unidad_compra,
  //   fecha_adjudicacion, fecha_inicio, fecha_termino, cantidad_requerida, presupuesto, dias_de_entrega,
  //   ejecutivo, contacto_adm_nombre, contacto_adm_correo, contacto_adm_telefono,
  //   referente_tec_nombre, referente_tec_correo, referente_tec_telefono,
  //   contacto_conta_nombre, contacto_conta_correo, contacto_conta_telefono,
  //   contacto_fin_nombre, contacto_fin_correo, contacto_fin_telefono, punto_venta, oftalmologo, observaciones )

  //  ${jsonData.cantidad_requerida !== null ? jsonData.cantidad_requerida : 0},

  if (
    jsonData.fecha_adjudicacion &&
    jsonData.fecha_inicio &&
    jsonData.fecha_termino
  ) {
    if (fechaActual <= new Date(jsonData.fecha_adjudicacion as string)) {
      toast.error("Fecha de adjudicación mayor a Fecha actual");
      throw new Error();
    }

    if (jsonData.fecha_adjudicacion > jsonData.fecha_inicio) {
      toast.error("Fecha de inicio mayor a fecha de adjudicación");
      throw new Error();
    }

    if (jsonData.fecha_inicio > jsonData.fecha_termino) {
      toast.error("Fecha de inicio mayor a fecha de término ");
      throw new Error();
    }
  }

  let _p2 = ` 
      "${jsonData.codigo_proyecto}", 
      "${jsonData.codigo_licitacion || ""}", 
      "${jsonData.titulo_proyecto}", 
       ${jsonData.param_cristales === "Por anteojo" ? 1 : 2},
       ${jsonData.estado === "Abierto" ? 1 : 2},
       ${jsonData.empresa_adjudicada}, 
       ${jsonData.mandante}, 
      "${jsonData.unidad_compra || ""}", 
      "${jsonData.fecha_adjudicacion || "1900-01-01"}", 
      "${jsonData.fecha_inicio}", 
      "${jsonData.fecha_termino}", 
       ${jsonData.cantidad_requerida || 0}, 
       ${jsonData.presupuesto || 0}, 
       ${jsonData.dias_entrega}, 
       ${jsonData.ejecutivo_proyecto}, 
      "${jsonData.administrador_nombre || ""}", 
      "${jsonData.administrador_correo || ""}", 
      "${jsonData.administrador_telefono || ""}", 
      "${jsonData.referente_nombre || ""}", 
      "${jsonData.referente_correo || ""}", 
      "${jsonData.referente_telefono || ""}", 
      "${jsonData.contabilidad_nombre || ""}", 
      "${jsonData.contabilidad_correo || ""}", 
      "${jsonData.contabilidad_telefono || ""}", 
      "${jsonData.finanzas_nombre || ""}", 
      "${jsonData.finanzas_nombre || ""}", 
      "${jsonData.finanzas_telefono || ""}", 
       ${jsonData.oftalmologo || 0},
      "${jsonData.observaciones || ""}",
       ${jsonData.imprime_qr === "Si" ? 1 : 0},
       ${jsonData.imprime_ticket === "Si" ? 1 : 0},
       ${jsonData.permite_aproximar === "Si" ? 1 : 0},
       ${jsonData.requiere_guia === "Si" ? 1 : 0},
       ${jsonData.requiere_reserva_armazon === "Si" ? 1 : 0}`;

  _p2 = _p2.replace(/'/g, "!");

  const query: OutputData = {
    query: "03",
    _p2,
  };

  console.log("query", query);
  return query;
}

interface IUserFormPrps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
  escritura_lectura?: boolean;
}

const FProyectos: React.FC<IUserFormPrps> = React.memo(
  ({
    closeModal,
    setEntities,
    params,
    label,
    data,
    isEditting,
    escritura_lectura,
  }) => {
    const schema = validationProyectosSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[EnumGrid.CODIGO];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
      shouldUnregister: false,
    });

    function transformUpdateQuery(
      jsonData: InputData,
      primaryKey: string
    ): OutputData | null {
      const fields = [
        `codigo_licitacion          = "${jsonData.codigo_licitacion || ""}"`,
        `titulo                     = "${jsonData.titulo_proyecto}"`,
        `param_cristales            = ${
          jsonData.param_cristales === "Por anteojo" ? 1 : 2
        }`,
        `estado                     = ${jsonData.estado === "Abierto" ? 1 : 2}`,
        `empresa                    = ${jsonData.empresa_adjudicada}`,
        `mandante                   = ${jsonData.mandante}`,
        `unidad_compra              = "${jsonData.unidad_compra || ""}"`,
        `fecha_adjudicacion         = "${
          jsonData.fecha_adjudicacion || "1900-01-01"
        }"`,
        `fecha_inicio               = "${jsonData.fecha_inicio}"`,
        `fecha_termino              = "${jsonData.fecha_termino}"`,
        `cantidad_requerida         = ${
          jsonData.cantidad_requerida !== ""
            ? jsonData.cantidad_requerida
            : data
            ? data && data[EnumGrid.CANTIDAD_REQUERIDA]
            : 0
        }`,
        `presupuesto                = ${
          jsonData.presupuesto !== ""
            ? jsonData.presupuesto
            : data
            ? formatCurrencyNumber(data && data[EnumGrid.TOTAL_REQUERIDO])
            : 0
        }`,
        `dias_de_entrega            = ${jsonData.dias_entrega}`,
        `ejecutivo                  = ${jsonData.ejecutivo_proyecto}`,
        `contacto_adm_nombre        = "${jsonData.administrador_nombre || ""}"`,
        `contacto_adm_correo        = "${jsonData.administrador_correo || ""}"`,
        `contacto_adm_telefono      = "${jsonData.administrador_telefono || ""}"`,
        `referente_tec_nombre       = "${jsonData.referente_nombre || ""}"`,
        `referente_tec_correo       = "${jsonData.referente_correo || ""}"`,
        `referente_tec_telefono     = "${jsonData.referente_telefono || ""}"`,
        `contacto_conta_nombre      = "${jsonData.contabilidad_nombre || ""}"`,
        `contacto_conta_correo      = "${jsonData.contabilidad_correo || ""}"`,
        `contacto_conta_telefono    = "${jsonData.contabilidad_telefono || ""}"`,
        `contacto_fin_nombre        = "${jsonData.finanzas_nombre || ""}"`,
        `contacto_fin_correo        = "${jsonData.finanzas_correo || ""}"`,
        `contacto_fin_telefono      = "${jsonData.finanzas_telefono || ""}"`,
        `oftalmologo                =  ${jsonData.oftalmologo || 0}`,
        `observaciones              = "${jsonData.observaciones}"`,
        `imprime_qr                 =  ${jsonData.imprime_qr === "Si" ? 1 : 0}`,
        `imprime_ticket             =  ${jsonData.imprime_ticket === "Si" ? 1 : 0}`,
        `permite_aproximar          =  ${jsonData.permite_aproximar === "Si" ? 1 : 0}`,
        `requiere_guia              =  ${jsonData.requiere_guia === "Si" ? 1 : 0}`,
        `reserva_armazones          =  ${jsonData.requiere_reserva_armazon === "Si" ? 1 : 0}`,
      ];

      const filteredFields = fields.filter(
        (field) => field !== null && field !== ""
      );

      if (filteredFields.length === 0) {
        return null;
      }
      let _p2 = filteredFields.join(",");

      _p2 = _p2.replace(/'/g, "!");

      const query = {
        query: "04",
        _p2,
        _p3: primaryKey,
      };
      return query;
    }

    const resetTextFields = React.useCallback(() => {
      setValue("codigo_proyecto", "");
      setValue("codigo_licitacion", "");
      setValue("titulo_proyecto", "");
      setValue("unidad_compra", "");
      setValue("fecha_adjudicacion", "");
      setValue("fecha_inicio", "");
      setValue("fecha_termino", "");
      setValue("dias_entrega", "");
      setValue("cantidad_requerida", "");
      setValue("cantidad_en_proceso", "");
      setValue("total_en_proceso", "");
      setValue("cantidad_facturada", "");
      setValue("total_facturado", "");
      setValue("cantidad_disponible", "");
      setValue("saldo_disponible", "");
      setValue("avance", "");
      setValue("administrador_nombre", "");
      setValue("administrador_correo", "");
      setValue("administrador_telefono", "");
      setValue("contabilidad_nombre", "");
      setValue("contabilidad_correo", "");
      setValue("contabilidad_telefono", "");
      setValue("referente_nombre", "");
      setValue("referente_correo", "");
      setValue("referente_telefono", "");
      setValue("finanzas_nombre", "");
      setValue("finanzas_correo", "");
      setValue("finanzas_telefono", "");
      setValue("observaciones", "");

      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="codigo_proyecto"]'
        );
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, [setValue, firstInputRef]);

    const updateNewEntity = React.useCallback(async () => {
      const newEntityData = await ListEntity(params, "01");
      setEntities(newEntityData);
    }, [params, setEntities, ListEntity]);

    const toastSuccess = (isEditting: boolean) => {
      show({
        message: isEditting
          ? strEntidad.concat(SUCCESS_MESSAGES.edit)
          : strEntidad.concat(SUCCESS_MESSAGES.create),
        type: "success",
      });
    };

    const handleApiResponse = React.useCallback(
      async (response: any, isEditting: boolean) => {
        if (response.code === "ERR_BAD_RESPONSE" || response.stack) {
          const errorMessage = isEditting
            ? strEntidad.concat(": " + response.message)
            : strEntidad.concat(": " + response.message);
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });

          return;
        }

        if (response.mensaje.includes("Creado")) {
          toastSuccess(isEditting);
        }
        if (!blnKeep && !isEditting) {
          const result = await showModal(
            MODAL.keep,
            "",
            MODAL.keepYes,
            MODAL.kepNo
          );
          if (result) {
            setblnKeep(true);
            resetTextFields();
            updateNewEntity();
          } else {
            closeModal();
            updateNewEntity();
          }

          // toastSuccess(isEditting);
        }

        if (isEditting) {
          updateNewEntity();
          closeModal();
          toastSuccess(isEditting);
        }

        resetTextFields();
        updateNewEntity();
      },
      [closeModal, blnKeep, updateNewEntity, showModal]
    );

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [closeModal]);

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        const toastLoading = toast.loading("Cargando...");
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading);
        } catch (error: any) {
          toast.dismiss(toastLoading);
          show({
            message: error,
            type: "error",
          });
        }
      },
      [editEntity, createdEntity, handleApiResponse, intId]
    );

    console.log(data && data[EnumGrid.EJECUTIVO_ID]);

    const handleEnterKeyDown = React.useCallback((event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    }, []);

    useEffect(() => {
      isEditting
        ? focusSecondInput("codigo_licitacion")
        : focusFirstInput("codigo_proyecto");
    }, []);

    return (
      <div className="useFormContainer centered-div w-[100%]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario"
          onKeyDown={handleEnterKeyDown}
        >
          <div className="userFormularioContainer">
            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[10%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Adjudicante"
                    name="empresa_adjudicada"
                    showRefresh={true}
                    data={data && data[EnumGrid.EMPRESA_ID]}
                    control={control}
                    entidad={["/api/empresas/", "02"]}
                    error={errors.empresa_adjudicada}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[10%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Mandante"
                    name="mandante"
                    showRefresh={true}
                    data={data && data[EnumGrid.MANDANTE_ID]}
                    control={control}
                    entidad={["/api/mandantes/", "02"]}
                    error={errors.mandante}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[10%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Ejecutivo/a"
                    name="ejecutivo_proyecto"
                    showRefresh={true}
                    data={data && parseInt(data[EnumGrid.EJECUTIVO_ID])}
                    control={control}
                    entidad={["/api/usuarios/", "02"]}
                    error={errors.ejecutivo_proyecto}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <RadioButtonComponent
                    control={control}
                    label="Imprime QR"
                    name="imprime_qr"
                    data={data && data[EnumGrid.IMPRIME_QR]}
                    options={["Si", "No"]}
                    error={errors.imprime_qr}
                    horizontal={true}
                    labelProps={"frame2Options"}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <RadioButtonComponent
                    control={control}
                    label="Imprime Ticket Retiro"
                    name="imprime_ticket"
                    data={data && data[EnumGrid.IMPRIME_TICKET]}
                    options={["Si", "No"]}
                    error={errors.imprime_ticket}
                    horizontal={true}
                    labelProps={"frame2Options"}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <RadioButtonComponent
                    control={control}
                    label="Permite Aproximar"
                    name="permite_aproximar"
                    data={data && data[EnumGrid.PERMITE_APROXIMAR]}
                    options={["Si", "No"]}
                    error={errors.permite_aproximar}
                    horizontal={true}
                    labelProps={"frame2Options"}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <RadioButtonComponent
                    control={control}
                    label="Requiere Guía"
                    name="requiere_guia"
                    data={data && data[EnumGrid.REQUIERE_GUIA]}
                    options={["Si", "No"]}
                    error={errors.requiere_guia}
                    horizontal={true}
                    labelProps={"frame2Options"}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <RadioButtonComponent
                    control={control}
                    label="Reserva Armazón"
                    name="requiere_reserva_armazon"
                    data={data && data[EnumGrid.REQUIERE_RESERVA_ARMAZON]}
                    options={["Si", "No"]}
                    error={errors.requiere_reserva_armazon}
                    horizontal={true}
                    labelProps={"frame2Options"}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[20%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Código Proyecto"
                    name="codigo_proyecto"
                    data={data && data[EnumGrid.CODIGO]}
                    control={control}
                    error={errors.codigo_proyecto}
                    onlyRead={isEditting}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[35%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Título"
                    name="titulo_proyecto"
                    data={data && data[EnumGrid.TITULO]}
                    control={control}
                    error={errors.titulo_proyecto}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[13%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Código Licitación"
                    name="codigo_licitacion"
                    data={data && data[EnumGrid.CODIGO_LICITACION]}
                    control={control}
                    error={errors.codigo_licitacion}
                    isOptional={true}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm">
                <div className="labelInputDiv">
                  <RadioButtonComponent
                    control={control}
                    label="Param. de Cristales"
                    name="param_cristales"
                    data={data && data[EnumGrid.PARAM_CRISTALES]}
                    options={["Por anteojo", "Por ojo"]}
                    error={errors.param_cristales}
                    horizontal={true}
                    labelProps={"frame2Options"}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm">
                <div className="labelInputDiv">
                  <RadioButtonComponent
                    control={control}
                    label="Estado"
                    name="estado"
                    data={data && data[EnumGrid.ESTADO]}
                    options={["Abierto", "Cerrado"]}
                    error={errors.estado}
                    horizontal={true}
                    labelProps={"frame2Options"}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center pr-5">
              <div className="input-container items-center rowForm w-[10%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Días entrega"
                    name="dias_entrega"
                    data={data && data[EnumGrid.DIAS_DE_ENTREGA]}
                    control={control}
                    error={errors.dias_entrega}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[14%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="date"
                    label="Inicio"
                    name="fecha_inicio"
                    data={data && data[EnumGrid.FECHA_INICIO]}
                    control={control}
                    error={errors.fecha_inicio}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[14%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="date"
                    label="Término"
                    name="fecha_termino"
                    data={data && data[EnumGrid.FECHA_TERMINO]}
                    control={control}
                    error={errors.fecha_termino}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[23%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Unidad de Compra"
                    name="unidad_compra"
                    data={data && data[EnumGrid.UNIDAD_COMPRA]}
                    control={control}
                    error={errors.unidad_compra}
                    isOptional={true}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[14%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="date"
                    label="Adjudicación"
                    name="fecha_adjudicacion"
                    data={data && data[EnumGrid.FECHA_ADJUDICACION]}
                    control={control}
                    error={errors.fecha_adjudicacion}
                    isOptional={true}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[25%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ProyectoComponent
                      label="Presupuesto Convenio BBTT"
                      type="number"
                      control={control}
                      errors={errors}
                      cant="cantidad_requerida"
                      total="presupuesto"
                      porcentaje="%"
                      dataCant={data && data[EnumGrid.CANTIDAD_REQUERIDA]}
                      dataTotal={formatCurrencyNumber(
                        data && data[EnumGrid.TOTAL_REQUERIDO]
                      )}
                      dataPorcentaje={100}
                      onlyRead={false}
                      isOptional={true}
                      setValue={setValue}
                    />
                  </FrameComponent>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center pr-5">
              <div className="input-container items-center rowForm w-[25%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ProyectoComponent
                      label="OT en Proceso"
                      type="text"
                      control={control}
                      errors={errors}
                      cant="Cant."
                      total="$ Total"
                      porcentaje="%"
                      dataCant={data && data[EnumGrid.CANTIDAD_INGRESADA]}
                      dataTotal={data && data[EnumGrid.TOTAL_INGRESADO]}
                      dataPorcentaje={data && data[EnumGrid.PORC_INGRESADO]}
                      isOptional={true}
                      onlyRead={true}
                    />
                  </FrameComponent>
                </div>
              </div>

              <div className="input-container items-center rowForm w-[25%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ProyectoComponent
                      label="OT Despachadas"
                      type="text"
                      control={control}
                      errors={errors}
                      cant="Cant."
                      total="$ Total"
                      porcentaje="%"
                      dataCant={data && data[EnumGrid.CANTIDAD_EN_PROCESO]}
                      dataTotal={data && data[EnumGrid.TOTAL_EN_PROCESO]}
                      dataPorcentaje={data && data[EnumGrid.PORC_EN_PROCESO]}
                      isOptional={true}
                      onlyRead={true}
                    />
                  </FrameComponent>
                </div>
              </div>

              <div className="input-container items-center rowForm w-[25%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ProyectoComponent
                      label="OT Facturadas"
                      type="text"
                      control={control}
                      errors={errors}
                      cant="Cant."
                      total="$ Total"
                      porcentaje="%"
                      dataCant={data && data[EnumGrid.CANTIDAD_FACTURADA]}
                      dataTotal={data && data[EnumGrid.TOTAL_FACTURADO]}
                      dataPorcentaje={data && data[EnumGrid.PORC_FACTURADO]}
                      isOptional={true}
                      onlyRead={true}
                    />
                  </FrameComponent>
                </div>
              </div>

              <div className="input-container items-center rowForm w-[25%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ProyectoComponent
                      label="Saldo Convenio"
                      type="text"
                      control={control}
                      errors={errors}
                      cant="Cant."
                      total="$ Total"
                      porcentaje="%"
                      dataCant={data && data[EnumGrid.CANTIDAD_DISPONIBLE]}
                      dataTotal={data && data[EnumGrid.TOTAL_DISPONIBLE]}
                      dataPorcentaje={data && data[EnumGrid.PORC_DISPONIBLE]}
                      isOptional={true}
                      onlyRead={true}
                    />
                  </FrameComponent>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center pr-5">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ContactComponent
                      label="Contacto Administrativo"
                      control={control}
                      errors={errors}
                      nombre="administrador_nombre"
                      correo="administrador_correo"
                      telefono="administrador_telefono"
                      dataNombre={
                        data && data[EnumGrid.CONTACTO_ADMINISTRADOR_NOMBRE]
                      }
                      dataCorreo={
                        data && data[EnumGrid.CONTACTO_ADMINISTRADOR_CORREO]
                      }
                      dataTelefono={
                        data && data[EnumGrid.CONTACTO_ADMINISTRADOR_TELEFONO]
                      }
                      isOptional={true}
                    />
                  </FrameComponent>
                </div>
              </div>

              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ContactComponent
                      label="Contacto Contabilidad"
                      control={control}
                      errors={errors}
                      nombre="contabilidad_nombre"
                      correo="contabilidad_correo"
                      telefono="contabilidad_telefono"
                      dataNombre={
                        data && data[EnumGrid.CONTACTO_CONTABILIDAD_NOMBRE]
                      }
                      dataCorreo={
                        data && data[EnumGrid.CONTACTO_CONTABILIDAD_CORREO]
                      }
                      dataTelefono={
                        data && data[EnumGrid.CONTACTO_CONTABILIDAD_TELEFONO]
                      }
                      isOptional={true}
                    />
                  </FrameComponent>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center pr-5">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ContactComponent
                      label="Referente Técnico"
                      control={control}
                      errors={errors}
                      nombre="referente_nombre"
                      correo="referente_correo"
                      telefono="referente_telefono"
                      dataNombre={
                        data && data[EnumGrid.REFERENTE_TECNICO_NOMBRE]
                      }
                      dataCorreo={
                        data && data[EnumGrid.REFERENTE_TECNICO_CORREO]
                      }
                      dataTelefono={
                        data && data[EnumGrid.REFERENTE_TECNICO_TELEFONO]
                      }
                      isOptional={true}
                    />
                  </FrameComponent>
                </div>
              </div>

              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <FrameComponent>
                    <ContactComponent
                      label="Contacto Finanzas"
                      control={control}
                      errors={errors}
                      nombre="finanzas_nombre"
                      correo="finanzas_correo"
                      telefono="finanzas_telefono"
                      dataNombre={
                        data && data[EnumGrid.CONTACTO_FINANZAS_NOMBRE]
                      }
                      dataCorreo={
                        data && data[EnumGrid.CONTACTO_FINANZAS_CORREO]
                      }
                      dataTelefono={
                        data && data[EnumGrid.CONTACTO_FINANZAS_TELEFONO]
                      }
                      isOptional={true}
                    />
                  </FrameComponent>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center !-mt-3 !mb-5">
              <div className="input-container items-center rowForm w-[40%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Observaciones"
                    name="observaciones"
                    data={data && data[EnumGrid.OBSERVACIONES]}
                    control={control}
                    error={errors.observaciones}
                    customWidth={"labelInput inputStyles"}
                    isOptional={true}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[30%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Oftalmólogo (Canasta)"
                    name="oftalmologo"
                    showRefresh={true}
                    data={data && data[EnumGrid.OFTALMOLOGO_ID]}
                    control={control}
                    entidad={["/api/oftalmologos/", "02"]}
                    error={errors.oftalmologo}
                    customWidth={"labelInput inputStyles"}
                    isOptional={true}
                  />
                </div>
              </div>

              <div className="w-[30%] !mt-5">
                <div className="w-[50%] mx-auto">
                  {escritura_lectura && (
                    <Button
                      type="submit"
                      tabIndex={1}
                      className="userFormBtnSubmit"
                    >
                      {`${TITLES.guardar}`}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FProyectos;
