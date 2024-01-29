/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { RadioButtonComponent, SelectInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationPermisosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MPermisos";
import {  MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const strBaseUrl = "/api/permisos/";
const strEntidad = "Perfil ";

export interface InputData {
  usuario: string | undefined;
  funcionalidad: string | undefined;
  permiso: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  // if (jsonData.password !== jsonData.password2) {
  //   alert(ERROR_MESSAGES.passwordNotMatch);
  // }

  const _p1 = `${jsonData.usuario}, ${jsonData.funcionalidad}, ${
    jsonData.permiso === "Lectura" ? 1 : 2
  }`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [`permiso=${jsonData.permiso === "Lectura" ? 1 : 2}`];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");

  return {
    query: "04",
    _p1,
    _p2: jsonData.usuario,
    _p3: jsonData.funcionalidad,
  };
}

interface IFormPrps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
  escritura_lectura?: boolean;
}

const FPermisos: React.FC<IFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationPermisosSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      focusFirstInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
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
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data)
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading)
        } catch (error: any) {
          console.log("error form:", error);
          toast.dismiss(toastLoading)
          show({
            message: error,
            type: "error",
          });
        }
      },
      [editEntity, createdEntity, handleApiResponse]
    );

    useEffect(() => {
      focusFirstInput("usuario");
    }, []);

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
        <div className="userFormBtnCloseContainer flex">
          <div className="w-[80%] mx-auto !text.center">
            <h1 className="userFormLabel">{label}</h1>
          </div>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="w-full items-center flex !mb-4">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <SelectInputComponent
                    label="Usuario"
                    name="usuario"
                    showRefresh={true}
                    data={data && data[EnumGrid.usuario_id]}
                    control={control}
                    entidad={["/api/usuarios/", "02"]}
                    error={errors.usuario}
                    readOnly={isEditting}
                    customWidth={"!ml-[1rem] "}
                    />
                </div>
              </div>
            </div>

            <div className="w-full items-center flex !mb-4">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                    <SelectInputComponent
                      label="Funcionalidad"
                      name="funcionalidad"
                      showRefresh={true}
                      data={data && data[EnumGrid.funcionalidad_id]}
                      control={control}
                      entidad={["/api/funcionalidades/", "02"]}
                      error={errors.funcionalidad}
                      readOnly={isEditting}
                      customWidth={"!ml-[1rem] "}
                      />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="items center flex !mb-2">
              <div className="input-container items-center rowForm  w-full">
                <div className="!ml-[1rem] !w-[25rem]">
                    <RadioButtonComponent
                      control={control}
                      label="Permiso"
                      name="permiso"
                      data={data && data[EnumGrid.permiso]}
                      options={["Lectura", "Lectura/Escritura"]}
                      error={errors.permiso}
                      horizontal={true}
                    />
                </div>
              </div>
            </div>

          

          <div className="w-full">
            <div className="mx-auto w-[60%]">
              <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                {`${TITLES.guardar}`}
              </Button>
            </div>
          </div>
        </form>
        <CustomModal />
      </div>
    );
  }
);

export default FPermisos;
function resetTextFields() {
  throw new Error("Function not implemented.");
}

