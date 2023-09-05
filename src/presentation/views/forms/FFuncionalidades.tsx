/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  validationFuncionalidadSchema,
} from "../../utils";
import { TextInputComponent } from "../../components";
import { useCrud } from "../../hooks";
import { toast } from "react-toastify";

const strBaseUrl = "/api/funcionalidades/";
const strEntidad = "Funcionalidad ";
// const strQuery = "01";

export interface InputData {
  descripcion: string | undefined;
}
enum EnumGrid {
  id = 1,
  descripcion = 2,
}
interface IFormProps {
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

const transformInsertQuery = (jsonData: InputData): OutputData | null => {
  const _p1 = `'${jsonData.descripcion}'`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };
  return query;
};

const transformUpdateQuery = (
  jsonData: InputData,
  primaryKey: string
): OutputData | null => {
  const _p1 = `descripcion='${jsonData.descripcion}'`;

  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };

  return query;
};

const FFuncionalidad: React.FC<IFormProps> = React.memo(
  ({
    closeModal,
    setEntities,
    params,
    data,
    label,
    isEditting,
    selectedRows,
  }) => {
    const schema = validationFuncionalidadSchema(isEditting);
    const { editEntity, createdEntity, ListEntity } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });

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
            reset();
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

        reset();
        updateNewEntity();
      },
      [closeModal, blnKeep, reset, updateNewEntity]
    );

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        try {
          console.log("isEdditing:", isEditting);
          const transformedData = isEditting
            ? transformUpdateQuery(data, selectedRows.toString())
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
      [selectedRows, editEntity, createdEntity, handleApiResponse]
    );

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
              label="Descripción"
              name="descripcion"
              data={data && data[EnumGrid.descripcion]}
              control={control}
              error={!isEditting && errors.descripcion}
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

export default FFuncionalidad;
