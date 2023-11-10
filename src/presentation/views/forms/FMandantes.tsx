/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationMandantesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MMandantes";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import RegProCom from "../../components/RegProCom";

const strBaseUrl = "/api/mandantes/";
const strEntidad = "Mandante ";

export interface InputData {
  codigo   : string | undefined;
  rut      : string | undefined;
  nombre   : string | undefined;
  region   : string | undefined;
  provincia: string | undefined;
  comuna   : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `${jsonData.codigo},"${jsonData.rut}","${jsonData.nombre}","${jsonData.comuna}"`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };

  console.log("query03", query);
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: number
): OutputData | null {
  const fields = [
    `rut    ="${jsonData.rut}"`,
    `nombre ="${jsonData.nombre}"`,
    `comuna = ${jsonData.comuna}`,
  ];


  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };
  console.log("query04", query);
  return query;

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
const FMandantes: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationMandantesSchema();
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
    const intId = data && data[EnumGrid.codigo];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      register
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("codigo", "");
      setValue("rut", "");
      setValue("nombre", "");
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
      focusFirstInput("codigo");
    }, []);

    // console.log('data', data)
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
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   if (!isModalOpen) {
          //     handleSubmit((data) => handleSaveChange(data, isEditting))(e);
          //   }
          // }}
          className="userFormulario"
        >
          <div className="userFormularioContainer h-[46vh]">

            <div className="w-full flex items-center h-[3rem]">
              <div className="input-container items-center rowForm w-full">
                  <div className="w-full">
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
                  </div>
              </div>
            </div>
            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                  <div className="w-full">
                    <TextInputComponent
                      type="text"
                      label="RUT"
                      name="rut"
                      data={data && data[EnumGrid.rut]}
                      control={control}
                      error={errors.rut}
                    />
                  </div>
              </div>
            </div>
            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                  <div className="w-full">
                    <TextInputComponent
                      type="text"
                      label="Nombre"
                      name="nombre"
                      data={data && data[EnumGrid.nombre]}
                      control={control}
                      error={errors.nombre}
                    />
                  </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                  <div className="w-full">
                      <RegProCom
                      name="comuna"
                      control={control}
                      register={register}
                      setValue={setValue}
                      defaultRegion={data && data[EnumGrid.region_id]}
                      defaultProvincia={data && data[EnumGrid.provincia_id]}
                      defaultComuna={data && data[EnumGrid.comuna_id]}
                      />
                  </div>
              </div>
            </div>
          </div>

            <div className="w-full">
              <div className="w-[70%] mx-auto">
                <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                {`${TITLES.guardar}`}
                </button>
              </div>
            </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FMandantes;
