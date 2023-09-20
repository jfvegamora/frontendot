/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationEstablecimientosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MEstablecimientos";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import RegProComponent from "../../components/forms/RegProComponent";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/establecimientos/";
const strEntidad = "Establecimiento ";

export interface InputData {
  nombre: string | undefined;
  mandante: string | undefined;
  region: string | undefined;
  provincia: string | undefined;
  comuna: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = `'${jsonData.nombre}', ${jsonData.comuna}, ${jsonData.mandante}`;

  console.log("p1:", _p1);
  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  console.log("queryy", query);
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `nombre   ='${jsonData.nombre}'`,
    `comuna   = ${jsonData.comuna}`,
    `mandante = ${jsonData.mandante}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("primaryKey", primaryKey);
  console.log("_p1: ", _p1);
  return {
    query: "04",
    _p1,
    _p2: ` '${primaryKey}'`,
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

const FEstablecimientos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationEstablecimientosSchema(isEditting);
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
      setValue("nombre", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="nombre"]'
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
      focusFirstInput("nombre");
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
            <div className="w-full ">
              <TextInputComponent
                type="text"
                label="Nombre"
                name="nombre"
                data={data && data[EnumGrid.nombre]}
                control={control}
                error={!isEditting && errors.nombre}
                inputRef={firstInputRef}
              />

              <SelectInputComponent
                label="Mandante"
                name="mandante"
                showRefresh={true}
                data={data && data[EnumGrid.mandante_id]}
                control={control}
                entidad={["/api/mandantes/", "02"]}
                error={!isEditting && errors.mandante}
                customWidth={"345px"}
              />
            </div>

            <RegProComponent
              control={control}
              EnumGrid={EnumGrid}
              isEditting={isEditting}
              errors={errors}
              data={data && data}
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

export default FEstablecimientos;
