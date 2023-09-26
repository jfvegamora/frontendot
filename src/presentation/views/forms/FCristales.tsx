/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationCristalesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MCristales";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/cristales/";
const strEntidad = "Cristal ";

export interface InputData {
  codigo      : string | undefined;
  marca       : string | undefined;
  diseno      : string | undefined;
  indice      : string | undefined;
  material    : string | undefined;
  color       : string | undefined;
  tratamiento : string | undefined;
  diametro    : string | undefined;
  esferico    : string | undefined;
  cilindrico  : string | undefined;
  stock_minimo: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = ` ${jsonData.codigo}, 
    ${jsonData.marca}, 
    ${jsonData.diseno}, 
    ${jsonData.indice}, 
    ${jsonData.material}, 
    ${jsonData.color}, 
    ${jsonData.tratamiento}, 
    ${jsonData.diametro}, 
    ${jsonData.esferico}, 
    ${jsonData.cilindrico}, 
    ${jsonData.stock_minimo}`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `marca        = ${jsonData.marca}`,
    `diseno       = ${jsonData.diseno}`,
    `indice       = ${jsonData.indice}`,
    `material     = ${jsonData.material}`,
    `color        = ${jsonData.color}`,
    `tratamiento  = ${jsonData.tratamiento}`,
    `diametro     = ${jsonData.diametro}`,
    `esferico     = ${jsonData.esferico}`,
    `cilindrico   = ${jsonData.cilindrico}`,
    `stock_minimo = ${jsonData.stock_minimo}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("primaryKey", primaryKey);
  return {
    query: "04",
    _p1,
    _p2: primaryKey,
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

const FCristales: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationCristalesSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

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
    const intId = data && data[EnumGrid.codigo];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("codigo", "");
      setValue("diametro", "");
      setValue("esferico", "");
      setValue("cilindrico", "");
      setValue("stock_minimo", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="codigo"]'
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
        const errorResponse = response?.response?.data.error;
        console.log("response", response);
        if (errorResponse || response.code === "ERR_BAD_RESPONSE") {
          const errorMessage =
            errorResponse === "IntegrityError"
              ? isEditting
                ? strEntidad.concat(ERROR_MESSAGES.edit)
                : strEntidad.concat(ERROR_MESSAGES.create)
              : errorResponse;
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });
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
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
        } catch (error: any) {
          show({
            message: error,
            type: "error",
          });
        }
      },
      [editEntity, createdEntity, handleApiResponse, intId]
    );

    // useEffect(() => {
    //   focusFirstInput("codigo");
    // }, []);
    useEffect(() => {
      isEditting ? focusSecondInput("codigo") : focusFirstInput("marca");
    }, []);

    return (
      <div className="useFormContainer">
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
            <TextInputComponent
              type="number"
              label="Código"
              name="codigo"
              data={data && data[EnumGrid.codigo]}
              control={control}
              error={errors.codigo}
              inputRef={firstInputRef}
              onlyRead={isEditting}
            />
            <SelectInputComponent
              label="Marca"
              name="marca"
              showRefresh={true}
              data={data && data[EnumGrid.marca_id]}
              control={control}
              entidad={["/api/marcas/", "02"]}
              error={errors.marca}
              customWidth={""}
              inputRef={secondInputRef}
            />
            <SelectInputComponent
              label="Diseño"
              name="diseno"
              showRefresh={true}
              data={data && data[EnumGrid.diseno_id]}
              control={control}
              entidad={["/api/tipos/", "02", "CristalesDisenos"]}
              error={errors.diseno}
            />
            <div className="w-full ">
              <SelectInputComponent
                label="Índice"
                name="indice"
                showRefresh={true}
                data={data && data[EnumGrid.indice_id]}
                control={control}
                entidad={["/api/tipos/", "02", "CristalesIndices"]}
                error={errors.indice}
                customWidth={""}
              />
              <SelectInputComponent
                label="Material"
                name="material"
                showRefresh={true}
                data={data && data[EnumGrid.material_id]}
                control={control}
                entidad={["/api/tipos/", "02", "CristalesMateriales"]}
                error={errors.material}
              />
              <SelectInputComponent
                label="Color"
                name="color"
                showRefresh={true}
                data={data && data[EnumGrid.color_id]}
                control={control}
                entidad={["/api/tipos/", "02", "CristalesColores"]}
                error={errors.color}
                customWidth={""}
              />
              <SelectInputComponent
                label="Tratamiento"
                name="tratamiento"
                showRefresh={true}
                data={data && data[EnumGrid.tratamiento_id]}
                control={control}
                entidad={["/api/tipos/", "02", "CristalesTratamientos"]}
                error={errors.tratamiento}
                customWidth={""}
              />
            </div>
            <div className="input-container">
              <TextInputComponent
                type="number"
                label="Diámetro"
                name="diametro"
                data={data && data[EnumGrid.diametro]}
                control={control}
                error={errors.diametro}
                className="input"
              />
              <TextInputComponent
                type="number"
                label="Esférico"
                name="esferico"
                data={data && data[EnumGrid.esferico]}
                control={control}
                error={errors.esferico}
                className="input"
              />
              <TextInputComponent
                type="number"
                label="Cilíndrico"
                name="cilindrico"
                data={data && data[EnumGrid.cilindrico]}
                control={control}
                error={errors.cilindrico}
                className="input"
              />
            </div>
            <TextInputComponent
              type="number"
              label="Stock Mínimo"
              name="stock_minimo"
              data={data && data[EnumGrid.stock_minimo]}
              control={control}
              error={errors.stock_minimo}
            />
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

export default FCristales;
