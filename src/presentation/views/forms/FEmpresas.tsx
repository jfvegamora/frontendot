/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationEmpresasSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MEmpresas";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/empresas/";
const strEntidad = "Empresas ";

export interface InputData {
  rut         : string | undefined;
  nombre      : string | undefined;
  razon_social: string | undefined;
  giro        : string | undefined;
  direccion   : string | undefined;
  telefono    : string | undefined;
  correo      : string | undefined;
  sitio_web   : string | undefined;
  nombre_logo : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = ` '${jsonData.rut}', 
      '${jsonData.nombre}', 
      '${jsonData.razon_social}', 
      '${jsonData.giro}', 
      '${jsonData.direccion}', 
      '${jsonData.telefono}', 
      '${jsonData.correo}', 
      '${jsonData.sitio_web}', 
      '${jsonData.nombre_logo}'`;

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
    `rut          ='${jsonData.rut}'`,
    `nombre       ='${jsonData.nombre}'`,
    `razon_social ='${jsonData.razon_social}'`,
    `giro         ='${jsonData.giro}'`,
    `direccion    ='${jsonData.direccion}'`,
    `telefono     ='${jsonData.telefono}'`,
    `correo       ='${jsonData.correo}'`,
    `sitio_web    ='${jsonData.sitio_web}'`,
    `nombre_logo  ='${jsonData.nombre_logo}'`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");

  const query: OutputData = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };

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

const FEmpresas: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationEmpresasSchema();
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
      setValue("razon_social", "");
      setValue("giro", "");
      setValue("direccion", "");
      setValue("telefono", "");
      setValue("correo", "");
      setValue("sitio_web", "");
      setValue("nombre_logo", "");
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
      <div className="useFormContainer useFormContainer40rem">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="input-container">
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="RUT"
                  name="rut"
                  data={data && data[EnumGrid.rut]}
                  control={control}
                  error={errors.rut}
                  inputRef={firstInputRef}
                />
              </div>
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Nombre"
                  name="nombre"
                  data={data && data[EnumGrid.nombre]}
                  control={control}
                  error={errors.nombre}
                  inputRef={firstInputRef}
                />
              </div> 
            </div>

            <div className="input-container">
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Razón Social"
                  name="razon_social"
                  data={data && data[EnumGrid.razon_social]}
                  control={control}
                  error={errors.razon_social}
                />
              </div>
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Giro"
                  name="giro"
                  data={data && data[EnumGrid.giro]}
                  control={control}
                  error={errors.giro}
                />
              </div> 
            </div>

            <div className="input-container">
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Dirección"
                  name="direccion"
                  data={data && data[EnumGrid.direccion]}
                  control={control}
                  error={errors.direccion}
                />
              </div>
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Teléfono"
                  name="telefono"
                  data={data && data[EnumGrid.telefono]}
                  control={control}
                  error={errors.telefono}
                />
              </div> 
            </div>

            <div className="input-container">
              <div className="w-full">
                <TextInputComponent
                  type="email"
                  label="Correo"
                  name="correo"
                  data={data && data[EnumGrid.correo]}
                  control={control}
                  error={errors.correo}
                />
              </div>
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Sitio Web"
                  name="sitio_web"
                  data={data && data[EnumGrid.sitio_web]}
                  control={control}
                  error={errors.sitio_web}
                />
              </div> 
            </div>

            <div className="input-container">
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Logo"
                  name="nombre_logo"
                  data={data && data[EnumGrid.nombre_logo]}
                  control={control}
                  error={errors.nombre_logo}
                />
              </div> 
              <div className="w-full">
              </div> 
            </div>
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

export default FEmpresas;
