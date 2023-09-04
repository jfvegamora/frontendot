/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  validationCargosSchema,
} from "../../utils";
import { TextInputComponent } from "../../components";
import { useCrud } from "../../hooks";
import { toast } from "react-toastify";
import { EnumGrid } from "../mantenedores/CargosMantenedor";

const strBaseUrl = "/api/cargos/";
const strEntidad = "Cargo ";
// const strQuery = "01";

export interface ICargosInputData {
  nombre: string | undefined;
}

interface ICargosFormProps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
}

interface OutputData {
  query: string;
  _p1: string;
}

const transformInsertQuery = (
  jsonData: ICargosInputData
): OutputData | null => {
  const _p1 = `'${jsonData.nombre}'`;
  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };
  console.log("insert:", query);
  return query;
};

const transformUpdateQuery = (
  jsonData: ICargosInputData,
  primaryKey: string
): OutputData | null => {
  const _p1 = `nombre='${jsonData.nombre}'`;

  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };

  return query;
};

const CargosForm: React.FC<ICargosFormProps> = React.memo(
  ({ closeModal, setEntities, params, data, label, isEditting }) => {
    const schema = validationCargosSchema(isEditting);
    const {
      editEntity,
      createdEntity,
      ListEntity,
      focusFirstInput,
      firstInputRef,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[EnumGrid.ID];

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

    const handleApiResponse = React.useCallback(
      (response: any, isEditting: boolean) => {
        const errorResponse = response?.response?.data.error;
        if (errorResponse) {
          const errorMessage =
            errorResponse === "IntegrityError"
              ? isEditting
                ? strEntidad.concat(ERROR_MESSAGES.edit)
                : strEntidad.concat(ERROR_MESSAGES.create)
              : errorResponse;
          toast.error(errorMessage);
        } else {
          toast.success(
            isEditting
              ? strEntidad.concat(SUCCESS_MESSAGES.edit)
              : strEntidad.concat(SUCCESS_MESSAGES.create)
          );
        }
        if (!blnKeep && !isEditting) {
          const result = window.confirm("¿Quieres continuar ingresando?");
          if (result) {
            console.log("seguir");
            setblnKeep(true);
            resetTextFields();
            updateNewEntity();
          } else {
            console.log("salir");
            closeModal();
            updateNewEntity();
          }
        }
        if (isEditting) {
          updateNewEntity();
          closeModal();
        }

        resetTextFields();
        updateNewEntity();
      },
      [closeModal, blnKeep, resetTextFields, updateNewEntity]
    );

    const handleSaveChange = React.useCallback(
      async (data: ICargosInputData, isEditting: boolean) => {
        try {
          console.log("isEdditing:", isEditting);
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
        } catch (error: any) {
          console.log("error cargos form:", error);
          toast.error(error);
        }
      },
      [editEntity, createdEntity, handleApiResponse, intId]
    );
    useEffect(() => {
      focusFirstInput("nombre");
    }, [focusFirstInput]);
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
          <div className="userFormularioCont">
            <TextInputComponent
              type="text"
              label="Nombre"
              name="nombre"
              data={data && data[EnumGrid.nombre]}
              control={control}
              error={!isEditting && errors.nombre}
              inputRef={firstInputRef}
            />
          </div>

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>
      </div>
    );
  }
);

export default CargosForm;
