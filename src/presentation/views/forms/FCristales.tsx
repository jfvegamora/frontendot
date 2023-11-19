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
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";

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
  escritura_lectura?: boolean;
}

const FCristales: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
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
        if (response.code === "ERR_BAD_RESPONSE" || response.stack) {
          const errorMessage = isEditting
                ? strEntidad.concat(": " + response.message)
                : strEntidad.concat(": " + response.message)
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });

          return;
        }

        if (!blnKeep && !isEditting) {
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

 console.log(data && typeof data[EnumGrid.stock_reservado])
    return (
      <div className="useFormContainer centered-div use30rem">
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
            <div className="rowForm">
              <TextInputComponent
                type="text"
                label="Código"
                name="codigo"
                data={data && data[EnumGrid.codigo]}
                control={control}
                error={errors.codigo}
                inputRef={firstInputRef}
                onlyRead={isEditting}
                maxLength={20}
              />
            </div>
            <div className="rowForm">
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
                tabIndex={1}
              />
            </div>
            <div className="rowForm">
              <SelectInputTiposComponent
                label="Diseño"
                name="diseno"
                showRefresh={true}
                data={data && data[EnumGrid.diseno_id]}
                control={control}
                entidad={"CristalesDisenos"}
                error={errors.diseno}
              />
            </div>
            <div className="rowForm">
              <SelectInputTiposComponent
                label="Índice"
                name="indice"
                showRefresh={true}
                data={data && data[EnumGrid.indice_id]}
                control={control}
                entidad={"CristalesIndices"}
                error={errors.indice}              
              />
            </div>
            <div className="rowForm">
              <SelectInputTiposComponent
                label="Material"
                name="material"
                showRefresh={true}
                data={data && data[EnumGrid.material_id]}
                control={control}
                entidad="CristalesMateriales"
                error={errors.material}
              
              />
            </div>
            <div className="rowForm"> 
              <SelectInputTiposComponent
                label="Color"
                name="color"
                showRefresh={true}
                data={data && data[EnumGrid.color_id]}
                control={control}
                entidad="CristalesColores"
                error={errors.color}
              />
            </div>
            <div className="rowForm">
              <SelectInputTiposComponent
                label="Tratamiento"
                name="tratamiento"
                showRefresh={true}
                data={data && data[EnumGrid.tratamiento_id]}
                control={control}
                entidad="CristalesTratamientos"
                error={errors.tratamiento}
              />
            </div>
            <div className="flex items-center rowForm">
              <TextInputComponent
                type="number"
                label="Diámetro"
                name="diametro"
                data={data && data[EnumGrid.diametro]}
                control={control}
                error={errors.diametro}
              />
              <TextInputComponent
                type="number"
                label="Esférico"
                name="esferico"
                data={data && data[EnumGrid.esferico]}
                control={control}
                error={errors.esferico}
                step={0.01}
              />
              <TextInputComponent
                type="number"
                label="Cilíndrico"
                name="cilindrico"
                data={data && data[EnumGrid.cilindrico]}
                control={control}
                error={errors.cilindrico}
                step={0.01}
              />
            </div>
            <div className="flex items-center rowForm">
              <div className="w-[50%]">
                <TextInputComponent
                  type="number"
                  label="Stock Minimo"
                  name="stock_minimo"
                  data={data && data[EnumGrid.stock_minimo]}
                  control={control}
                  error={errors.stock_minimo}
                />
              </div>
              <div className="w-[50%]">
                <TextInputComponent
                  type="number"
                  label="Stock Reservado"
                  name="stock_reservado"
                  data={data && data[EnumGrid.stock_reservado]}
                  // data={100000}
                  control={control}
                  onlyRead={true}
                  tabIndex={-1}
                />
              </div>
              <div className="w-[50%]">
                <TextInputComponent
                  type="number"
                  label="Stock Disponible"
                  name="stock_disponible"
                  data={data && data[EnumGrid.stock_disponible]}
                  control={control}
                  onlyRead={true}
                  tabIndex={-1}
                />
              </div>

            </div>
          </div>
          {escritura_lectura && (
            <button type="submit" tabIndex={1} className="userFormBtnSubmit">
              {`${TITLES.guardar}`}
            </button>
          )}
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FCristales;
