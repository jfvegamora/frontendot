/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  MODAL,
  SUCCESS_MESSAGES,
  validationSituacionesSchema, TITLES
} from "../../utils";
import { TextInputComponent } from "../../components";
import { useCrud } from "../../hooks";
import { EnumGrid } from "../mantenedores/MSituaciones";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";

const strBaseUrl = "/api/otsituaciones/";
const strEntidad = "Situaciones ";
// const strQuery = "01";

export interface ISituacionesInputData {
  descripcion: string | undefined;
  area:   string | undefined;
}

interface ISituacionesFormProps {
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

const transformInsertQuery = (
  jsonData: ISituacionesInputData
): OutputData | null => {
  let  _p1 = `"${jsonData.descripcion}", ${jsonData.area} `;
  _p1 = _p1.replace(/'/g, '!');
  const query: OutputData = {
    query: "03",
    _p1
  };
  console.log("insert:", query);
  return query;
};

const transformUpdateQuery = (
  jsonData: ISituacionesInputData,
  primaryKey: string
): OutputData | null => {
  let _p1 = `descripcion="${jsonData.descripcion}", area=${jsonData.area}`;

  _p1 = _p1.replace(/'/g, '!');
  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };
console.log("update", query);
  return query;
};

const FSituaciones: React.FC<ISituacionesFormProps> = React.memo(
  ({ closeModal, setEntities, params, data, label, isEditting, escritura_lectura }) => {
    const schema = validationSituacionesSchema();
    const { showModal, CustomModal } = useModal();

    const { show } = useCustomToast();

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
      setValue("descripcion", "");
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
      async (data: ISituacionesInputData, isEditting: boolean) => {
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
      [editEntity, createdEntity, handleApiResponse, intId]
    );
    useEffect(() => {
      focusFirstInput("nombre");
    }, [focusFirstInput]);

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
      <div className="useFormContainer centered-div w-[30vw]">
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

          <div className="input-container items-center rowForm  ">
            <div className="w-[99%]">
              <TextInputComponent
                type="text"
                label="Descripcion"
                name="descripcion"
                data={data && data[EnumGrid.descripcion]}
                control={control}
                error={errors.descripcion}
                inputRef={firstInputRef}
              />
            </div>
          </div>

          <div className="input-container items-center rowForm  ">
            <div className="w-full !mt-4 ">
              <SelectInputTiposComponent
                label="Area"
                name="area"
                showRefresh={true}
                data={data && data[EnumGrid.area_id]}
                control={control}
                entidad={"OTAreas"}
                error={errors.area}
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

export default FSituaciones;
