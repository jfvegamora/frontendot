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
import { toast } from "react-toastify";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";

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
  const fields = [
    `permiso=${jsonData.permiso === "Lectura" ? 1 : 2}`,
  ];

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
}

const FPermisos: React.FC<IFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationPermisosSchema(isEditting);
    const { showModal, CustomModal } = useModal();
    const {
      editEntity,
      createdEntity,
      ListEntity,
      focusFirstInput,
      firstInputRef,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    // const resetTextFields = () => {
    //   reset({
    //     nombre: "",
    //     telefono: 0,
    //     correo: "",
    //   });
    // };

    const updateNewEntity = React.useCallback(async () => {
      const newEntityData = await ListEntity(params, "01");
      setEntities(newEntityData);
    }, [params, setEntities, ListEntity]);

    const toastSuccess = (isEditting: boolean) => {
      toast.success(
        isEditting
          ? strEntidad.concat(SUCCESS_MESSAGES.edit)
          : strEntidad.concat(SUCCESS_MESSAGES.create)
      );
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
          toast.error(errorMessage);
        }
        if (!blnKeep && !isEditting && !errorResponse) {
          // const result = window.confirm("¿Quieres continuar ingresando?");
          const result = await showModal(
            MODAL.keep,
            MODAL.keepYes,
            MODAL.kepNo
          );
          if (result) {
            setblnKeep(true);
            // resetTextFields();
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

        // resetTextFields();
        updateNewEntity();
      },
      [closeModal, blnKeep, updateNewEntity, showModal]
    );

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data)
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
        } catch (error: any) {
          console.log("error form:", error);
          toast.error(error);
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
    console.log('data',data)
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
          <div className="userFormularioContainer">
            <div className="w-full">
              <SelectInputComponent
                label="Usuario"
                name="usuario"
                showRefresh={true}
                data={data && data[EnumGrid.usuario_id]}
                control={control}
                entidad={["/api/usuarios/", "02"]}
                error={!isEditting && errors.usuario}
                readOnly={isEditting}
                customWidth={"345px"}
              />
              <SelectInputComponent
                label="Funcionalidad"
                name="funcionalidad"
                showRefresh={true}
                data={data && data[EnumGrid.funcionalidad_id]}
                control={control}
                entidad={["/api/funcionalidades/", "02"]}
                error={!isEditting && errors.funcionalidad}
                inputRef={firstInputRef}
                readOnly={isEditting}
                customWidth={"345px"}
              />
            </div>

            <RadioButtonComponent
              control={control}
              label="Permiso"
              name="permiso"
              data={data && data[EnumGrid.permiso]}
              options={["Lectura", "Lectura/Escritura"]}
              error={!isEditting && errors.permiso}
            />
            {/* <TextInputComponent/> */}
          </div>

          <button type="submit" className="userFormBtnSubmit">
            {`${TITLES.guardar}`}
          </button>
        </form>
        <CustomModal />
      </div>
    );
  }
);

export default FPermisos;