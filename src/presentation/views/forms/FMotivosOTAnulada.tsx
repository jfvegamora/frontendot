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
  validationMotivosOTSchema, TITLES
} from "../../utils";
import { TextInputComponent } from "../../components";
import { useCrud } from "../../hooks";
import { EnumGrid } from "../mantenedores/MMotivosOTAnulada";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/otmotivoanulacion/";
const strEntidad = "Motivos de OT Anulada ";
// const strQuery = "01";

export interface ISituacionesInputData {
  situacion: string | undefined;
  area_hasta:   string | undefined;
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
  let  _p1 = `"${jsonData.situacion}", ${jsonData.area_hasta || 0} `;
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
  let _p1 = `descripcion="${jsonData.situacion}", area=${jsonData.area_hasta || 0}`;

  _p1 = _p1.replace(/'/g, '!');
  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };
console.log("update", query);
  return query;
};

const FMotivosOTAnulada: React.FC<ISituacionesFormProps> = React.memo(
  ({ closeModal, setEntities, params, data, label, isEditting, escritura_lectura }) => {
    const schema = validationMotivosOTSchema();
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
      setValue("situacion", "");
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
            '',
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
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading)
        } catch (error: any) {
          toast.dismiss(toastLoading)
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
      focusFirstInput("descripcion");
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
            <div className="w-[99%] mb-8">
              <TextInputComponent
                type="text"
                label="Descripción"
                name="situacion"
                data={data && data[EnumGrid.descripcion]}
                control={control}
                error={errors.situacion}
                inputRef={firstInputRef}
                customWidth={"!h-[3vw] !text-[1vw] !w-[27.5vw]"}

              />
            </div>
          </div>

          <div className="input-container items-center rowForm  ">
            <div className="w-full !mt-4 ml-4 ">
              <SelectInputTiposComponent
                label="Área exclusiva"
                name="area_hasta"
                showRefresh={true}
                data={data && data[EnumGrid.area_id]}
                control={control}
                entidad={"OTAreas"}
                customWidth={"!h-[2.5vw] text-[1vw] !w-[30vw]"}
                // error={errors.}
                isOptional={true}
                />
            </div>
          </div>
          </div>

          <div className="w-full">
            <div className="w-[70%] mx-auto">
              {escritura_lectura && (
                <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                  {`${TITLES.guardar}`}
                </Button>
              )}
            </div>
          </div>
        </form>
        <CustomModal />
      </div>
    );
  }
);

export default FMotivosOTAnulada