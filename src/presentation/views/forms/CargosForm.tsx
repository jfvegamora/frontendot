/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  validationCargosSchema,
} from "../../utils";
import { TextInputComponent } from "../../components";
import { useCrud } from "../../hooks";
import { toast } from "react-toastify";

const strBaseUrl = "/api/cargos/";
const strEntidad = "Cargo ";
// const strQuery = "01";

export interface ICargosInputData {
  nombre: string | undefined;
}
export enum EnumCargosGrid {
  id = 1,
  nombre = 2,
}
interface ICargosFormProps {
  closeModal: () => void;
  handleChange: SubmitHandler<ICargosInputData>;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedIds?: any;
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
  ({
    closeModal,
    setEntities,
    params,
    data,
    label,
    isEditting,
    selectedIds,
  }) => {
    const schema = validationCargosSchema(isEditting);
    const { editEntity, createdEntity, ListEntity } = useCrud(strBaseUrl);

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const handleApiResponse = React.useCallback(
      async (response: any, isEditting: boolean) => {
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
        closeModal();
        const newEntity = await ListEntity(params, "01");
        console.log("newEntity:", newEntity);
        setEntities(newEntity);
      },
      [setEntities, params, closeModal, ListEntity]
    );

    const handleSaveChange = React.useCallback(
      async (data: ICargosInputData, isEditting: boolean) => {
        try {
          console.log("isEdditing:", isEditting);
          const transformedData = isEditting
            ? transformUpdateQuery(data, selectedIds.toString())
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
      [selectedIds, editEntity, createdEntity, handleApiResponse]
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
              label="Nombre"
              name="nombre"
              data={data && data[EnumCargosGrid.nombre]}
              control={control}
              error={!isEditting && errors.nombre}
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
