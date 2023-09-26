/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationOftalmologosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MOftalmologos";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/oftalmologos/";
const strEntidad = "Oftalmólogo ";

export interface InputData {
  rut           : string | undefined;
  nombre        : string | undefined;
  telefono      : string | undefined;
  correo        : string | undefined;
  valor_consulta: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = ` '${jsonData.rut}', 
    '${jsonData.nombre}', 
    '${jsonData.telefono}', 
    '${jsonData.correo}', 
     ${jsonData.valor_consulta}`;

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
    `rut            ='${jsonData.rut}'`,
    `nombre         ='${jsonData.nombre}'`,
    `telefono       ='${jsonData.telefono}'`,
    `correo         ='${jsonData.correo}'`,
    `valor_consulta = ${jsonData.valor_consulta}`,
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
    _p3: "",
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

const FOftalmologos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationOftalmologosSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[EnumGrid.id];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("rut", "");
      setValue("nombre", "");
      setValue("telefono", "");
      setValue("correo", "");
      setValue("valor_consulta", "");

      if (firstInputRef.current) {
        const firstInput =
          firstInputRef.current.querySelector('input[name="rut"]');
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

    useEffect(() => {
      focusFirstInput("rut");
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
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <TextInputComponent
              type="text"
              label="RUT"
              name="rut"
              data={data && data[EnumGrid.rut]}
              control={control}
              error={errors.rut}
              inputRef={firstInputRef}
            />
            <TextInputComponent
              type="text"
              label="Nombre"
              name="nombre"
              data={data && data[EnumGrid.nombre]}
              control={control}
              error={errors.nombre}
            />
            <div className="w-full "> </div>

            <TextInputComponent
              type="text"
              label="Teléfono"
              name="telefono"
              data={data && data[EnumGrid.telefono]}
              control={control}
            />
            <TextInputComponent
              type="email"
              label="Correo"
              name="correo"
              data={data && data[EnumGrid.correo]}
              control={control}
              // onlyRead={isEditting}
            />
            <TextInputComponent
              type="number"
              label="Valor Consulta"
              name="valor_consulta"
              data={data && data[EnumGrid.valor_consulta]}
              control={control}
              error={errors.valor_consulta}
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

export default FOftalmologos;
