/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MODAL,
  SUCCESS_MESSAGES, TITLES,
  validationFuncionalidadSchema,
} from "../../utils";
import { TextInputComponent } from "../../components";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

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
  escritura_lectura?: boolean;
}

interface OutputData {
  query: string;
  _p1: string;
}

const transformInsertQuery = (jsonData: InputData): OutputData | null => {
  let _p1 = `"${jsonData.descripcion}"`;
  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1
  };
  return query;
};

const transformUpdateQuery = (
  jsonData: InputData,
  primaryKey: string
): OutputData | null => {
  let _p1 = `descripcion="${jsonData.descripcion}"`;
  _p1 = _p1.replace(/'/g, '!');

  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };

  return query;
};

const FFuncionalidad: React.FC<IFormProps> = React.memo(
  ({ closeModal, setEntities, params, data, label, isEditting, escritura_lectura }) => {
    const schema = validationFuncionalidadSchema();
    const { editEntity, createdEntity, ListEntity } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const { show } = useCustomToast();
    const { showModal, CustomModal } = useModal();
    const intId = data && data[EnumGrid.id];

    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema),
    });

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
        
        if(response.mensaje.includes('Creado')){
          toastSuccess(isEditting);
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

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
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
          show({
            message: error,
            type: "error",
          });
        }
      },
      [intId, editEntity, createdEntity, handleApiResponse]
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

            <div className="w-full items-center flex">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Descripción"
                    name="descripcion"
                    data={data && data[EnumGrid.descripcion]}
                    control={control}
                    error={errors.descripcion}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto w-[70%]">
                {escritura_lectura && (
                  <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                    {`${TITLES.guardar}`}
                  </button>
                )}
            </div>
          </div>
        </form>
        <CustomModal />
      </div>
    );
  }
);

export default FFuncionalidad;
function resetTextFields() {
  throw new Error("Function not implemented.");
}

