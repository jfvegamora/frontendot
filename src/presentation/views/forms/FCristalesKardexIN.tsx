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
import { validationCristalesKardexSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MCristalesKardex";
import { toast } from "react-toastify";
import {
  ERROR_MESSAGES,
  MODAL,
  SUCCESS_MESSAGES,
  MOTIVO_KARDEX,
} from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";

const strBaseUrl = "/api/cristaleskardex/";
const strEntidad = "Kardex de Cristal ";

export interface InputData {
  cristal: number | undefined;
  fecha: string | undefined;
  descripcion: string | undefined;
  almacen: string | undefined;
  es: string | undefined;
  motivo: string | undefined;
  cantidad: number | undefined;
  valor_neto: number | undefined;
  proveedor: string | undefined;
  numero_factura: number | undefined;
  ot: number | undefined;
  almacen_relacionado: string | undefined;
  observaciones: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: number;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const date = new Date();
  const _p1 = `'${jsonData.fecha + " " + date.toLocaleTimeString()}', 
    ${jsonData.cristal}, 
    ${jsonData.almacen}, 
    ${
      jsonData.es === MOTIVO_KARDEX.entrada
        ? 1
        : jsonData.es === MOTIVO_KARDEX.salida
        ? 2
        : 0
    }, 
    ${jsonData.motivo}, 
    ${jsonData.cantidad}, 
    ${jsonData.valor_neto}, 
    ${jsonData.proveedor}, 
    ${jsonData.numero_factura}, 
    ${jsonData.ot}, 
    ${jsonData.almacen_relacionado},
   '${jsonData.observaciones}'`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };
  console.log("p1", query);

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData
  // ,primaryKey: string
): OutputData | null {
  const fields = [
    `almacen            = ${jsonData.almacen}`,
    `es                 = ${
      jsonData.es === MOTIVO_KARDEX.entrada
        ? 1
        : jsonData.es === MOTIVO_KARDEX.salida
        ? 2
        : 0
    }`,
    `motivo             = ${jsonData.motivo}`,
    `cantidad           = ${jsonData.cantidad}`,
    `valor_neto         = ${jsonData.valor_neto}`,
    `proveedor          = ${jsonData.proveedor}`,
    `numero_factura     = ${jsonData.numero_factura}`,
    `ot                 = ${jsonData.ot}`,
    `almacen_relacionado= ${jsonData.almacen_relacionado}`,
    `observaciones      ='${jsonData.observaciones}'`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");

  return {
    query: "04",
    _p1,
    _p2: jsonData.cristal,
    _p3: jsonData.fecha,
  };
}

interface IUserFormPrps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
}

const FCristalesKardex: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationCristalesKardexSchema(isEditting);
    const { showModal, CustomModal } = useModal();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      secondInputRef,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    // const intId = data && data[EnumGrid.cristal];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("cristal", 0);
      setValue("fecha", "undefined");
      setValue("descripcion", "");
      setValue("cantidad", 0);
      setValue("numero_factura", 0);
      setValue("valor_neto", 0);
      setValue("ot", 0);
      setValue("observaciones", "");

      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="cristal"]'
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
      toast.success(
        isEditting
          ? strEntidad.concat(SUCCESS_MESSAGES.edit)
          : strEntidad.concat(SUCCESS_MESSAGES.create)
      );
    };

    const handleApiResponse = React.useCallback(
      async (response: any, isEditting: boolean) => {
        const errorResponse = response?.response?.data.error;
        console.log("response", response);
        if (errorResponse || response.code === "ERR_BAD_RESPONSE") {
          const errorMessage =
            errorResponse === "IntegrityError"
              ? isEditting
                ? strEntidad.concat(ERROR_MESSAGES.edit)
                : strEntidad.concat(ERROR_MESSAGES.create)
              : errorResponse;
          toast.error(errorMessage ? errorMessage : response.code);
          return;
        }

        if (!blnKeep && !isEditting && !errorResponse) {
          const result = await showModal(
            MODAL.keep,
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

          toastSuccess(isEditting);
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
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data)
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
        } catch (error: any) {
          toast.error(error);
        }
      },
      [editEntity, createdEntity, handleApiResponse]
    );

    // useEffect(() => {
    //   focusFirstInput("codigo");
    // }, []);
    useEffect(() => {
      isEditting ? focusSecondInput("es") : focusFirstInput("cristal");
    }, []);

    return (
      <div className="useFormContainer useFormContainer3">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <div className="input-container">
              <TextInputComponent
                type="number"
                label="Cristal"
                name="cristal"
                data={data && data[EnumGrid.cristal]}
                control={control}
                error={!isEditting && errors.cristal}
                inputRef={firstInputRef}
                onlyRead={isEditting}
              />
              <TextInputComponent
                type={isEditting ? "datetime" : "date"}
                label="Fecha"
                name="fecha"
                data={data && data[EnumGrid.fecha]}
                control={control}
                error={!isEditting && errors.fecha}
                onlyRead={isEditting}
              />
            </div>
            <div className="input-container">
              <TextInputComponent
                type="text"
                label="Descripcion"
                name="descripcion"
                data={data && data[EnumGrid.descripcion]}
                control={control}
                onlyRead={isEditting}
              />
              <div className="input-container">
                <RadioButtonComponent
                  control={control}
                  label="Tipo de Motivo"
                  name="es"
                  data={data && data[EnumGrid.es]}
                  options={[MOTIVO_KARDEX.entrada, MOTIVO_KARDEX.salida]}
                  error={!isEditting && errors.es}
                  horizontal={false}
                  inputRef={secondInputRef}
                />
              </div>
              <SelectInputComponent
                label="Motivo"
                name="motivo"
                showRefresh={true}
                data={data && data[EnumGrid.motivo_id]}
                control={control}
                entidad={["/api/tipos/", "02", "KardexMotivos"]}
                error={!isEditting && errors.motivo}
              />
              <SelectInputComponent
                label="Almacén"
                name="almacen"
                showRefresh={true}
                data={data && data[EnumGrid.almacen_id]}
                control={control}
                entidad={["/api/almacenes/", "02"]}
                error={!isEditting && errors.almacen}
              />
            </div>
            <div className="input-container">
              <TextInputComponent
                type="number"
                label="Factura"
                name="numero_factura"
                data={data && data[EnumGrid.numero_factura]}
                control={control}
                error={!isEditting && errors.numero_factura}
                className="input"
              />
              <SelectInputComponent
                label="Provedor"
                name="proveedor"
                showRefresh={true}
                data={data && data[EnumGrid.proveedor_id]}
                control={control}
                entidad={["/api/proveedores/", "02"]}
                error={!isEditting && errors.proveedor}
                customWidth={""}
              />
              <TextInputComponent
                type="number"
                label="$ Neto Unitario"
                name="valor_neto"
                data={data && data[EnumGrid.valor_neto]}
                control={control}
                error={!isEditting && errors.valor_neto}
                className="input"
              />
              <TextInputComponent
                type="number"
                label="Cantidad"
                name="cantidad"
                data={data && data[EnumGrid.almacen]}
                control={control}
                error={!isEditting && errors.cantidad}
              />
            </div>
            <div className="input-container">
              <SelectInputComponent
                label="Almacén Destino"
                name="almacen_relacionado"
                showRefresh={true}
                data={data && data[EnumGrid.almacen_relacionado_id]}
                control={control}
                entidad={["/api/almacenes/", "02"]}
                error={!isEditting && errors.almacen_relacionado}
              />
              <TextInputComponent
                type="number"
                label="OT"
                name="ot"
                data={data && data[EnumGrid.ot]}
                control={control}
                error={!isEditting && errors.ot}
              />
              <TextInputComponent
                type="text"
                label="Observaciones"
                name="observaciones"
                data={data && data[EnumGrid.observaciones]}
                control={control}
                error={!isEditting && errors.observaciones}
              />
            </div>
          </div>

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FCristalesKardex;
