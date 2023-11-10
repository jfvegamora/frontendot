/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProveedoresSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProveedores";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/proveedores/";
const strEntidad = "Proveedor ";

export interface InputData {
  nombre   : string | undefined;
  rut      : string | undefined;
  direccion: string | undefined;
  telefono : string | undefined;
  correo   : string | undefined;
  sitio_web: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `
     "${jsonData.rut}", 
     "${jsonData.nombre}", 
     "${jsonData.direccion}", 
     "${jsonData.telefono}", 
     "${jsonData.correo}", 
     "${jsonData.sitio_web}"`;
 _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };
  console.log("query", query);
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `rut       ="${jsonData.rut}"`,
    `nombre    ="${jsonData.nombre}"`,
    `direccion ="${jsonData.direccion}"`,
    `telefono  ="${jsonData.telefono}"`,
    `correo    ="${jsonData.correo}"`,
    `sitio_web ="${jsonData.sitio_web}"`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');

  //  console.log("primaryKey", primaryKey);
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
}

const FProveedores: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationProveedoresSchema();
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
      setValue("rut", "");
      setValue("nombre", "");
      setValue("telefono", "");
      setValue("nombre", "");
      setValue("sitio_web", "");
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
        if (errorResponse) {
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
      <div className="useFormContainer centered-div use30rem">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario">
          <div className="userFormularioContainer">
            
            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="RUT"
                    name="rut"
                    data={data && data[EnumGrid.Rut]}
                    control={control}
                    error={errors.rut}
                    inputRef={firstInputRef}
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
                    data={data && data[EnumGrid.Nombre]}
                    control={control}
                    error={errors.nombre}
                  />
                </div>
              </div>
            </div>


            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Dirección"
                    name="direccion"
                    data={data && data[EnumGrid.Direccion]}
                    control={control}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Teléfono"
                    name="telefono"
                    data={data && data[EnumGrid.Telefono]}
                    control={control}
                  />
                </div>
              </div>
            </div>


            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="email"
                    label="Correo"
                    name="correo"
                    data={data && data[EnumGrid.Correo]}
                    control={control}
                    error={errors.correo}
                  />
                </div>
              </div>
            </div>


            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Sitio Web"
                    name="sitio_web"
                    data={data && data[EnumGrid.Sitio_Web]}
                    control={control}
                    error={errors.sitio_web}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="w-full">
            <div className="w-[70%] mx-auto">
                <button type="submit" className="userFormBtnSubmit">
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

export default FProveedores;
