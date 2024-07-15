/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProyectoDestinosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosDestinos";
import {  MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
// import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const strBaseUrl = "/api/proyectodestinos/";
const strEntidad = "Parametrización de Destinos ";

export interface InputData {
  descripcion: string | undefined;
  direccion: string | undefined;
  contacto: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  proyecto: string | undefined;
  observaciones: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `"${jsonData.descripcion}", "${jsonData.direccion}", "${jsonData.contacto}", "${jsonData.telefono}", "${jsonData.correo}", "${jsonData.proyecto}", "${jsonData.observaciones}"`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `descripcion="${jsonData.descripcion}"`,
    `direccion= "${jsonData.direccion}"`,
    `contacto= "${jsonData.contacto}"`,
    `telefono= "${jsonData.telefono}"`,
    `correo= "${jsonData.correo}"`,
    `proyecto= "${jsonData.proyecto}"`,
    `observaciones= "${jsonData.observaciones}"`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');

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
  escritura_lectura?: boolean;
}

const FProyectoDestinos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationProyectoDestinosSchema();
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
      setValue("descripcion", "");
      setValue("direccion", "");
      setValue("contacto", "");
      setValue("telefono", "");
      setValue("correo", "");
      setValue("observaciones", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="descripcion"]'
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
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Descripción"
                    name="descripcion"
                    data={data && data[EnumGrid.descripcion]}
                    control={control}
                    error={errors.descripcion}
                    inputRef={firstInputRef}
                  />
                </div>
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
                    data={data && data[EnumGrid.direccion]}
                    control={control}
                    error={errors.direccion}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Nombre Contacto"
                    name="contacto"
                    data={data && data[EnumGrid.contacto]}
                    control={control}
                    isOptional={true}
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
                    data={data && data[EnumGrid.telefono]}
                    control={control}
                    isOptional={true}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Correo"
                    name="correo"
                    data={data && data[EnumGrid.correo]}
                    control={control}
                    isOptional={true}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                <SelectInputComponent
                  label="Proyecto"
                  name="proyecto"
                  showRefresh={true}
                  data={data && data[EnumGrid.proyecto_codigo]}
                  control={control}
                  entidad={["/api/proyectos/", "02"]}
                  error={errors.proyecto}
                  customWidth={"!ml-[1rem] ] "}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Observaciones"
                    name="observaciones"
                    data={data && data[EnumGrid.observaciones]}
                    control={control}
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

export default FProyectoDestinos;
